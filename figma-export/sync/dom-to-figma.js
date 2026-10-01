// Plugin API template. DATA is supplied by prepare-dom-view.py.
// Exact DOM geometry is kept for overlapping artwork/windows; linear groups use auto-layout.
const [page, container, componentArea, localVariables, collections, localStyles] = await Promise.all([
  figma.getNodeByIdAsync(DATA.pageId), figma.getNodeByIdAsync(DATA.containerId),
  figma.getNodeByIdAsync(DATA.componentsId), figma.variables.getLocalVariablesAsync(),
  figma.variables.getLocalVariableCollectionsAsync(), figma.getLocalTextStylesAsync()
]);
await figma.setCurrentPageAsync(page);
await Promise.all([figma.loadFontAsync({family:'Noto Sans JP'}),figma.loadFontAsync({family:'Noto Sans SC'})]);
const createdNodeIds=[],mutatedNodeIds=[],createdStyleIds=[],createdVariableIds=[],createdCollectionIds=[];
const existing=container.children.find(n=>n.name===DATA.view);
if(existing) return {status:'exists',frameId:existing.id,name:existing.name,createdNodeIds,mutatedNodeIds};
const num=(x)=>Number.parseFloat(x)||0;
const rgb=(str)=>{
  if(!str||str==='transparent')return null;
  const a=str.match(/[\d.]+/g);if(!a)return null;const vals=a.map(Number);
  if(str.startsWith('color(srgb'))return {r:vals[0],g:vals[1],b:vals[2],a:vals[3]??1};
  if(str.startsWith('rgb'))return {r:vals[0]/255,g:vals[1]/255,b:vals[2]/255,a:vals[3]??1};
  return null;
};
const colorKey=(c)=>[c.r,c.g,c.b,c.a].map(v=>v.toFixed(5)).join('/');
let primitiveCollection=collections.find(c=>c.name==='CIBA Swiss 2026 / Primitives');
let semanticCollection=collections.find(c=>c.name==='CIBA Swiss 2026 / Color');
if(!primitiveCollection){primitiveCollection=figma.variables.createVariableCollection('CIBA Swiss 2026 / Primitives');createdCollectionIds.push(primitiveCollection.id);}
if(!semanticCollection){semanticCollection=figma.variables.createVariableCollection('CIBA Swiss 2026 / Color');createdCollectionIds.push(semanticCollection.id);}
const colorVariables=new Map();
const tokenNames=[
  ['night','rgb(9, 10, 8)','--ciba-night'],['paper','rgb(244, 240, 221)','--ciba-paper'],['acid','rgb(198, 255, 0)','--ciba-acid'],
  ['surface','color(srgb 0.0629411 0.0662745 0.0564313)','--ciba-surface'],
  ['surface-raised','color(srgb 0.0721569 0.0752941 0.0647843)','--ciba-surface-raised'],
  ['rule','rgba(244, 240, 221, 0.26)','--ciba-rule'],['rule-soft','rgba(244, 240, 221, 0.14)','--ciba-rule-soft'],
  ['signal-rule','rgba(198, 255, 0, 0.6)','--ciba-signal-rule'],['muted-soft','rgba(244, 240, 221, 0.68)','--ciba-muted-soft'],
  ['muted','rgba(244, 240, 221, 0.72)','--ciba-muted'],['caption','rgba(244, 240, 221, 0.86)','--ciba-caption']
];
for(const [name,css,syntax] of tokenNames){
  const color=rgb(css),key=colorKey(color);
  let primitive=localVariables.find(v=>v.variableCollectionId===primitiveCollection.id&&v.name===name);
  if(!primitive){primitive=figma.variables.createVariable(name,primitiveCollection,'COLOR');primitive.scopes=[];primitive.setValueForMode(primitiveCollection.defaultModeId,color);primitive.setVariableCodeSyntax('WEB',`var(${syntax})`);createdVariableIds.push(primitive.id);localVariables.push(primitive);}
  let semantic=localVariables.find(v=>v.variableCollectionId===semanticCollection.id&&v.name===name);
  if(!semantic){semantic=figma.variables.createVariable(name,semanticCollection,'COLOR');semantic.scopes=['FRAME_FILL','SHAPE_FILL','TEXT_FILL','STROKE_COLOR'];semantic.setValueForMode(semanticCollection.defaultModeId,{type:'VARIABLE_ALIAS',id:primitive.id});semantic.setVariableCodeSyntax('WEB',`var(${syntax})`);createdVariableIds.push(semantic.id);localVariables.push(semantic);}
  colorVariables.set(key,semantic);
}
const paint=(css)=>{const c=rgb(css);if(!c||c.a===0)return [];let p={type:'SOLID',color:{r:c.r,g:c.g,b:c.b},opacity:c.a};const v=colorVariables.get(colorKey(c));if(v)p=figma.variables.setBoundVariableForPaint(p,'color',v);return[p];};
const styleMap=new Map(localStyles.map(s=>[s.name,s]));
const family=DATA.lang==='ja'?'Noto Sans JP':'Noto Sans SC';
const styleFor=(s)=>{
  const size=num(s['font-size']),weight=num(s['font-weight'])||400,lh=num(s['line-height'])||size*1.45,ls=num(s['letter-spacing']);
  const name=`Swiss 2026/${DATA.lang}/${size}px · ${weight} · ${lh}lh · ${ls}ls`;
  let style=styleMap.get(name);if(!style){style=figma.createTextStyle();style.name=name;style.fontName={family,variationSettings:{wght:weight}};style.fontSize=size;style.lineHeight={unit:'PIXELS',value:lh};style.letterSpacing={unit:'PIXELS',value:ls};style.description='Exact computed DOM typography; source '+DATA.url;createdStyleIds.push(style.id);styleMap.set(name,style);}return style;
};
// Resolve every actual text style before constructing components.
for(const n of DATA.nodes){if(n.directText.length)styleFor(n.style);for(const p of n.pseudo||[])if(p.content&&p.content!=='""')styleFor(p.style);}
const track=(n)=>{createdNodeIds.push(n.id);return n;};
const mount=(parent,node,x,y)=>{parent.appendChild(node);if('layoutMode'in parent&&parent.layoutMode!=='NONE')node.layoutPositioning='ABSOLUTE';node.x=x;node.y=y;};
const decorate=(node,record)=>{
  const s=record.style;node.fills=paint(s['background-color']);node.opacity=Math.max(0,Math.min(1,num(s.opacity)));node.cornerRadius=num(s['border-radius']);node.clipsContent=['hidden','clip','scroll','auto'].includes(s['overflow-x'])||['hidden','clip','scroll','auto'].includes(s['overflow-y']);
  const sides=['top','right','bottom','left'],active=sides.filter(k=>num(s['border-'+k+'-width'])>0&&s['border-'+k+'-style']!=='none'&&(rgb(s['border-'+k+'-color'])?.a??0)>0);
  if(active.length){node.strokes=paint(s['border-'+active[0]+'-color']);node.strokeAlign='INSIDE';for(const k of sides)node['stroke'+k[0].toUpperCase()+k.slice(1)+'Weight']=active.includes(k)?num(s['border-'+k+'-width']):0;}
  else node.strokes=[];
};
const components=new Map(componentArea.children.filter(n=>n.type==='COMPONENT').map(n=>[n.name,n]));
const textMap=[],imageMap=[],nodeMap={};
const addText=(parent,record,entry)=>{
  if(!entry.boxes.length)return;
  const s=record.style,b=record.bounds,first=entry.boxes[0],lh=num(s['line-height'])||num(s['font-size'])*1.45;
  const t=track(figma.createText());parent.appendChild(t);if('layoutMode'in parent&&parent.layoutMode!=='NONE')t.layoutPositioning='ABSOLUTE';
  t.fontName={family,variationSettings:{wght:num(s['font-weight'])||400}};
  t.textStyleId=styleFor(s).id;t.characters=s['white-space'].startsWith('pre')?entry.text:entry.text.replace(/\s+/g,' ').trim();
  t.name=t.characters.slice(0,72);t.fills=paint(s.color);t.textCase=s['text-transform']==='uppercase'?'UPPER':s['text-transform']==='lowercase'?'LOWER':'ORIGINAL';
  const left=Math.min(...entry.boxes.map(r=>r.x));const maxRight=Math.max(...entry.boxes.map(r=>r.x+r.width));
  const contentWidth=b.width-num(s['padding-left'])-num(s['padding-right'])-num(s['border-left-width'])-num(s['border-right-width']);
  const width=entry.boxes.length>1?Math.max(maxRight-left,contentWidth):maxRight-left+0.25;
  t.resize(Math.max(0.1,width),Math.max(0.1,lh));t.textAutoResize=entry.boxes.length===1?'WIDTH_AND_HEIGHT':'HEIGHT';t.x=left-b.x;t.y=first.y-b.y+(first.height-lh)/2;
  t.textAlignHorizontal='LEFT';if(record.attributes.href){const href=record.attributes.href;const origin=DATA.url.match(/^https?:\/\/[^/]+/)[0];t.hyperlink={type:'URL',value:/^(https?:|mailto:)/.test(href)?href:href.startsWith('/')?origin+href:DATA.url.split('#')[0]+href};}
  textMap.push({id:t.id,key:record.key,text:t.characters,font:t.fontName,size:t.fontSize,width:t.width,height:t.height});return t;
};
const flow=(parent,items,b)=>{
  if(items.length<2||items.some(x=>x.record.style.position==='absolute'||x.record.style.position==='fixed'))return;
  const x0=items[0].record.bounds.x,y0=items[0].record.bounds.y;
  let vertical=items.every(x=>Math.abs(x.record.bounds.x-x0)<0.6),horizontal=items.every(x=>Math.abs(x.record.bounds.y-y0)<0.6);
  if(!vertical&&!horizontal)return;const axis=vertical?'y':'x',size=vertical?'height':'width';
  const ordered=items.slice().sort((a,z)=>a.record.bounds[axis]-z.record.bounds[axis]);
  const gaps=ordered.slice(1).map((x,i)=>x.record.bounds[axis]-(ordered[i].record.bounds[axis]+ordered[i].record.bounds[size]));
  if(gaps.some(g=>g<-.5)||Math.max(...gaps)-Math.min(...gaps)>0.6)return;
  parent.layoutMode=vertical?'VERTICAL':'HORIZONTAL';parent.primaryAxisSizingMode='FIXED';parent.counterAxisSizingMode='FIXED';parent.itemSpacing=Math.max(0,gaps[0]);
  parent.paddingLeft=Math.max(0,ordered[0].record.bounds.x-b.x);parent.paddingTop=Math.max(0,ordered[0].record.bounds.y-b.y);parent.paddingRight=0;parent.paddingBottom=0;
  for(const item of ordered){parent.appendChild(item.node);item.node.layoutPositioning='AUTO';}
};
const build=(i,parent,parentBounds,asMain=false)=>{
  const r=DATA.nodes[i],b=r.bounds;let component;
  if(r.componentName&&!asMain){
    component=components.get(r.componentName);
    if(!component){component=build(i,componentArea,{x:0,y:0},true);component.x=80;component.y=80+components.size*220;components.set(r.componentName,component);}
    const instance=track(component.createInstance());createdNodeIds.push(...instance.findAll(()=>true).map(n=>n.id));mount(parent,instance,b.x-parentBounds.x,b.y-parentBounds.y);instance.name=r.name;nodeMap[r.key]=instance.id;return instance;
  }
  const node=track(asMain?figma.createComponent():figma.createAutoLayout('VERTICAL'));
  node.name=asMain?r.componentName:r.name;
  if(asMain){node.layoutMode='VERTICAL';node.description='Editable DOM-derived '+r.tag+' from '+DATA.url+'; Noto family and original computed sizes.';}
  node.resize(Math.max(.1,b.width),Math.max(.1,b.height));node.primaryAxisSizingMode='FIXED';node.counterAxisSizingMode='FIXED';
  mount(parent,node,b.x-parentBounds.x,b.y-parentBounds.y);decorate(node,r);nodeMap[r.key]=node.id;
  if(r.imageHash){let p={type:'IMAGE',imageHash:r.imageHash,scaleMode:r.style['object-fit']==='contain'?'FIT':'FILL'};if(r.style.filter.includes('grayscale(1)'))p.filters={saturation:-1};node.fills=[...node.fills,p];imageMap.push({id:node.id,hash:r.imageHash,key:r.key,video:!!r.video});}
  const ownText=r.directText.map(entry=>addText(node,r,entry)).filter(Boolean);
  const children=r.kids.slice().sort((a,z)=>(num(DATA.nodes[a].style['z-index'])-num(DATA.nodes[z].style['z-index']))||a-z).map(k=>({node:build(k,node,b),record:DATA.nodes[k]}));
  if(!ownText.length)flow(node,children,b);
  // Pseudo geometry is taken from the corresponding CSS rules and measured transform-origin.
  for(const p of r.pseudo||[]){
    if(p.content==='"STATEMENT / CV / CONTACT"'||p.content==='"MOVE / FOCUS / OPEN"'){
      const w=num(p.style['transform-origin'].split(' ')[0])*2,h=num(p.style['line-height']);
      const right=p.content.includes('STATEMENT')?Math.min(64,Math.max(16,DATA.viewport.width*.05)):12;
      const y=p.content.includes('STATEMENT')?b.y+b.height-32-h:b.y+12;
      addText(node,{...r,style:p.style},{text:JSON.parse(p.content),boxes:[{x:b.x+b.width-right-w,y,width:w,height:h}]});
    }
  }
  return node;
};
const wrapper=track(figma.createAutoLayout('VERTICAL'));wrapper.name=DATA.view;container.appendChild(wrapper);wrapper.resize(DATA.document.width,DATA.document.height);wrapper.primaryAxisSizingMode='FIXED';wrapper.counterAxisSizingMode='FIXED';wrapper.x=DATA.x;wrapper.y=DATA.y;wrapper.fills=paint('rgb(9, 10, 8)');wrapper.clipsContent=true;
build(0,wrapper,{x:0,y:0});
const allTexts=wrapper.findAllWithCriteria({types:['TEXT']});const mismatches=allTexts.filter(t=>t.fontName.family!==family).map(t=>({id:t.id,font:t.fontName}));
return {status:'created',frameId:wrapper.id,name:wrapper.name,width:wrapper.width,height:wrapper.height,createdNodeIds,mutatedNodeIds,createdStyleIds,createdVariableIds,createdCollectionIds,textCount:allTexts.length,imageCount:imageMap.length,fontMismatches:mismatches,nodeMap,textMap,imageMap,warnings:DATA.warnings,componentIds:[...components.values()].map(c=>c.id)};
