// @ts-nocheck -- Native Figma runtime; isolated from the Astro browser globals.
// Local development plugin. No MCP, network calls, account changes, or publishing.
// build-plugin.py prepends VIEW_DATA and META and appends the importer function.
figma.showUI(__html__, { width: 470, height: 620, themeColors: true });
let running = false;
let cancelled = false;
const mediaPending = new Map();
const mediaCache = new Map();
let mediaSequence = 0;
const report = { package: META, startedAt: null, finishedAt: null, views: [], warnings: [] };
const send = (message) => figma.ui.postMessage(message);

function unpackView(packed) {
  const data = JSON.parse(JSON.stringify(packed));
  const rect = a => ({ x: a[0], y: a[1], width: a[2], height: a[3] });
  const styles = data.styles.map(a => Object.fromEntries(data.styleKeys.map((k, i) => [k, a[i]])));
  data.nodes = data.nodes.map(a => ({
    i: a[0], p: a[1], name: a[2], key: a[3], bounds: rect(a[4]), style: styles[a[5]],
    directText: a[6].map(t => ({ text: t[0], boxes: t[1].map(rect) })), kids: a[7],
    pseudo: a[8].map(p => ({ content: p[0], style: styles[p[1]] })), imageHash: a[9],
    componentName: a[10], tag: a[11], attributes: { href: a[12] }, video: a[13], mediaSrc: a[14]
  }));
  return data;
}

function createAutoLayout(direction) {
  const node = figma.createFrame();
  node.layoutMode = direction;
  node.primaryAxisSizingMode = 'AUTO';
  node.counterAxisSizingMode = 'AUTO';
  node.fills = [];
  return node;
}

async function requestMedia(src) {
  if (mediaCache.has(src)) return mediaCache.get(src);
  const id = String(++mediaSequence);
  const result = new Promise((resolve, reject) => {
    const timer = setTimeout(() => { mediaPending.delete(id); reject(new Error('Media preparation timed out: ' + src)); }, 60000);
    mediaPending.set(id, { resolve, reject, timer });
    send({ type: 'prepare-media', id, src });
  });
  const bytes = await result;
  const hash = figma.createImage(new Uint8Array(bytes)).hash;
  mediaCache.set(src, hash);
  return hash;
}

async function resolveMedia(data) {
  for (const node of data.nodes) {
    if (!node.mediaSrc) continue;
    if (node.imageHash && figma.getImageByHash(node.imageHash)) continue;
    if (node.video) {
      data.warnings.push('Video poster unavailable in this file: ' + node.mediaSrc);
      node.imageHash = null;
      continue;
    }
    try { node.imageHash = await requestMedia(node.mediaSrc); }
    catch (error) { node.imageHash = null; data.warnings.push(error.message); }
  }
}

function belongsToRevision(node) {
  let current = node;
  while (current && current.type !== 'PAGE') current = current.parent;
  return current && current.id !== '0:1';
}

async function existingView(data, page, targetConfirmed) {
  const names = page.findAllWithCriteria({ types: ['FRAME'] }).filter(n => n.name === data.view);
  if (names.length) return { node: names[0], evidence: 'exact revision frame name' };
  if (!targetConfirmed) return null;
  const known = META.knownViews[data.view];
  if (!known) return null;
  // Raw browser captures are reference material, not proof of componentization.
  if (known.status === 'first-capture') return null;
  const node = await figma.getNodeByIdAsync(known.nodeId);
  if (!node || !belongsToRevision(node)) return null;
  return { node, evidence: 'recorded current-revision node ID', dimensionMatch: Math.abs(node.width - data.document.width) < 2 && Math.abs(node.height - data.document.height) < 3 };
}

function getOrCreateSection(page, name, width, height, x, y) {
  let section = page.children.find(n => n.type === 'SECTION' && n.name === name);
  if (!section) {
    section = figma.createSection();
    section.name = name;
    section.resizeWithoutConstraints(width, height);
    section.x = x;
    section.y = y;
    report.createdSectionIds = (report.createdSectionIds || []).concat(section.id);
  }
  return section;
}

function settleImportedView(root) {
  const changed=[];
  for(const node of root.findAll(()=>true)) {
    if(node.type==='FRAME'&&node.name==='span.v3-letter-track'&&Math.abs(node.y)>0.01){node.y=0;changed.push(node.id);}
    if(!('fills'in node)||!Array.isArray(node.fills)||!node.fills.some(p=>p.type==='IMAGE'))continue;
    let ancestor=node.parent,floating=false;
    while(ancestor&&ancestor!==root){if(ancestor.name==='figure.v3-floating-media')floating=true;ancestor=ancestor.parent;}
    if(floating){node.fills=node.fills.map(p=>p.type==='IMAGE'?{...p,filters:{...(p.filters||{}),saturation:-1}}:p);changed.push(node.id);}
  }
  return changed;
}

async function run(mode) {
  if (running) return;
  running = true;
  cancelled = false;
  report.startedAt = new Date().toISOString();
  report.views = [];
  const selected = VIEW_DATA.filter(v => mode === 'all48' ? v.kind !== 'state' : mode === 'states' ? v.kind === 'state' : META.jaSix.includes(v.view));
  try {
    // Font failure is explicit and occurs before drawing; no silent substitution.
    await Promise.all([figma.loadFontAsync({ family: 'Noto Sans JP' }), figma.loadFontAsync({ family: 'Noto Sans SC' })]);
    if(typeof figma.getFontFamilyVariationAxes !== 'function')throw new Error('当前 Figma 客户端不支持变量字重 API，请更新客户端后再运行。');
    for(const family of ['Noto Sans JP','Noto Sans SC'])if(!(figma.getFontFamilyVariationAxes(family)||[]).includes('wght'))throw new Error(family+' 缺少 wght 轴，无法准确保留网页字重。');
    const marker = await figma.getNodeByIdAsync('67:2');
    const confirmed = marker && marker.type === 'SECTION' && marker.name === '2026-09-28 · Swiss Revision · JA Desktop';
    const page = confirmed ? marker.parent : figma.currentPage;
    await figma.setCurrentPageAsync(page);
    // Preserve the exact incomplete frame from the first native run, away from final views.
    const incomplete = confirmed ? await figma.getNodeByIdAsync('131:365') : null;
    if (incomplete && incomplete.name === 'university-coursework-ja-desktop · INCOMPLETE') {
      incomplete.visible = false;
      report.preservedIncompleteNodeIds = ['131:365'];
    }
    const maxRight = Math.max(0, ...page.children.map(n => n.x + n.width));
    let componentArea = confirmed ? await figma.getNodeByIdAsync('67:4') : null;
    if (!componentArea || componentArea.type !== 'SECTION') componentArea = getOrCreateSection(page, 'CIBA Swiss 2026 · Local Plugin Components', 1800, 1800, maxRight + 240, 160);
    const groups = new Map();
    let newGroupCount = 0;
    for (let index = 0; index < selected.length; index++) {
      if (cancelled) { report.warnings.push('Stopped by user between views; completed views retained.'); break; }
      const data = unpackView(selected[index]);
      send({ type: 'progress', index, total: selected.length, message: '准备 ' + data.view });
      const found = await existingView(data, page, confirmed);
      if (found) {
        const settledIds=settleImportedView(found.node);
        const row = { mutatedNodeIds:settledIds,view: data.view, status: 'skipped-existing', nodeId: found.node.id, evidence: found.evidence, dimensionMatch: found.dimensionMatch };
        if (found.dimensionMatch === false) row.warning = 'Existing capture bounds differ from current DOM; preserved for review.';
        report.views.push(row);
        send({ type: 'progress', index: index + 1, total: selected.length, message: '已存在，保留 ' + data.view });
        continue;
      }
      const groupKey = data.lang + '-' + data.viewport.width + (data.kind === 'state' ? '-states' : '');
      let section = groups.get(groupKey);
      if (!section) {
        if (confirmed && data.lang === 'ja' && data.viewport.width === 1440 && data.kind !== 'state') section = marker;
        else section = getOrCreateSection(page, 'CIBA Swiss 2026 · ' + data.lang.toUpperCase() + ' · ' + data.viewport.width + (data.kind === 'state' ? ' · Home States' : ''), 8 * (data.viewport.width + 240) + 160, Math.max(...selected.filter(v => v.lang === data.lang && v.viewport.width === data.viewport.width).map(v => v.document.height)) + 300, maxRight + 240, 2200 + newGroupCount++ * 12500);
        groups.set(groupKey, section);
      }
      data.pageId = page.id;
      data.containerId = section.id;
      data.componentsId = componentArea.id;
      data.x = 80 + META.routeOrder.indexOf(data.routeKey) * (data.viewport.width + 240);
      data.y = 100;
      if (data.kind === 'state') data.x = 80 + selected.filter(v => v.kind === 'state' && v.lang === data.lang).findIndex(v => v.view === data.view) * (data.document.width + 240);
      if (confirmed && data.kind !== 'state' && data.lang === 'ja' && data.viewport.width === 1440) data.x = 80 + META.jaSix.concat(['emida-ja-desktop','escape-project-ja-desktop']).indexOf(data.view) * 1680;
      await resolveMedia(data);
      const result = await importDomView(data);
      if(result.status==='created'){const frame=await figma.getNodeByIdAsync(result.frameId);result.mutatedNodeIds=(result.mutatedNodeIds||[]).concat(settleImportedView(frame));}
      report.views.push({ view: data.view, ...result });
      if (result.status === 'failed') throw new Error(data.view + ': ' + result.error);
      if (data.x + data.document.width + 80 > section.width || data.document.height + 200 > section.height) section.resizeWithoutConstraints(Math.max(section.width,data.x+data.document.width+80),Math.max(section.height,data.document.height+200));
      const componentBottom=Math.max(0,...componentArea.children.map(n=>n.y+n.height));
      if(componentBottom+80>componentArea.height)componentArea.resizeWithoutConstraints(componentArea.width,componentBottom+80);
      figma.commitUndo();
      send({ type: 'progress', index: index + 1, total: selected.length, message: '已建立 ' + data.view + ' · ' + result.textCount + ' 个文字层' });
    }
    report.finishedAt = new Date().toISOString();
    send({ type: 'finished', report });
  } catch (error) {
    report.warnings.push(error.message);
    report.finishedAt = new Date().toISOString();
    send({ type: 'failed', message: error.message, report });
  } finally { running = false; }
}

async function exportReview(mode) {
  if(running)return;
  running=true;
  try {
    const marker=await figma.getNodeByIdAsync('67:2');
    if(!marker)throw new Error('Revision section not found');
    const page=marker.parent;await figma.setCurrentPageAsync(page);
    const selected=VIEW_DATA.filter(v=>mode==='all48'?v.kind!=='state':mode==='states'?v.kind==='state':META.jaSix.includes(v.view));
    const rows=[];
    for(const data of selected){
      send({type:'message',message:'导出校对图 '+data.view});
      const found=await existingView(data,page,true);
      if(!found){rows.push({view:data.view,status:'missing'});continue;}
      const node=found.node;
      const texts=node.findAllWithCriteria({types:['TEXT']});
      const all=node.findAll(()=>true);
      const fonts=[...new Set(texts.flatMap(t=>t.getStyledTextSegments(['fontName']).map(s=>s.fontName.family)))];
      let png=null,renderError=null;
      try {
        const renderWidth=Math.max(1,Math.floor(Math.min(720,node.width,4000*node.width/node.height)));
        png=await Promise.race([node.exportAsync({format:'PNG',constraint:{type:'WIDTH',value:renderWidth}}),new Promise((_,reject)=>setTimeout(()=>reject(new Error('Render exceeded 20 seconds')),20000))]);
      }catch(error){renderError=error.message;}
      rows.push({view:data.view,nodeId:node.id,width:node.width,height:node.height,expectedWidth:data.document.width,expectedHeight:data.document.height,textCount:texts.length,fonts,missingFontCount:texts.filter(t=>t.hasMissingFont).length,imageCount:all.filter(n=>'fills'in n&&Array.isArray(n.fills)&&n.fills.some(f=>f.type==='IMAGE')).length,instanceCount:all.filter(n=>n.type==='INSTANCE').length,texts:texts.map(t=>({id:t.id,text:t.characters,width:t.width,height:t.height,font:t.fontName,size:t.fontSize,bounds:t.absoluteBoundingBox})),png:png?figma.base64Encode(png):null,renderError});
    }
    send({type:'review-ready',review:{exportedAt:new Date().toISOString(),mode,views:rows}});
  }catch(error){send({type:'message',message:'校对图导出失败：'+error.message});}
  finally{running=false;}
}

figma.ui.onmessage = message => {
  if (message.type === 'media-ready' || message.type === 'media-error') {
    const pending = mediaPending.get(message.id);
    if (!pending) return;
    clearTimeout(pending.timer);
    mediaPending.delete(message.id);
    message.type === 'media-ready' ? pending.resolve(message.bytes) : pending.reject(new Error(message.error));
  } else if (message.type === 'start') run(message.mode);
  else if (message.type === 'finalize') finalizeDelivery();
  else if (message.type === 'review') exportReview(message.mode);
  else if (message.type === 'repair-layout') repairImportedLayout();
  else if (message.type === 'cancel') { cancelled = true; send({ type: 'message', message: '将在当前视图完成后停止。' }); }
  else if (message.type === 'close') figma.closePlugin();
};
