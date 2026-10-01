async function finalizeDelivery() {
  if(running)return;
  running=true;
  const result={startedAt:new Date().toISOString(),views:[],createdNodeIds:[],mutatedNodeIds:[],warnings:[],previousPositions:[],posterUpdates:[]};
  const changed=node=>result.mutatedNodeIds.push(node.id);
  try{
    const page=await figma.getNodeByIdAsync('6:6');await figma.setCurrentPageAsync(page);
    await Promise.all([figma.loadFontAsync({family:'Noto Sans JP'}),figma.loadFontAsync({family:'Noto Sans SC'})]);
    const roots=new Map();
    for(const data of VIEW_DATA){
      const id=FINALIZATION_DATA.views[data.view];
      const node=id?await figma.getNodeByIdAsync(id):null;
      if(!node||node.type!=='FRAME')throw new Error('Missing completed view: '+data.view);
      roots.set(data.view,node);
      result.mutatedNodeIds.push(...settleImportedView(node));
      for(const layer of node.findAll(n=>n.type==='FRAME'&&n.name.startsWith('article.v3-cinema-layer'))){layer.opacity=layer.name.includes('.is-active')?1:0;changed(layer);}
      result.views.push({view:data.view,nodeId:node.id,status:'verified-present'});
    }
    for(const entry of FINALIZATION_DATA.videoNodes){
      send({type:'message',message:'更新视频封面 '+entry.view});
      const node=await figma.getNodeByIdAsync(entry.nodeId);
      if(!node||!('fills'in node))throw new Error('Missing video layer '+entry.nodeId);
      const hash=await requestMedia(entry.src+'#figma-poster');
      node.fills=node.fills.map(p=>p.type==='IMAGE'?{...p,imageHash:hash}:p);
      changed(node);result.posterUpdates.push({...entry,imageHash:hash});
    }
    for(const lang of ['zh','en','ja']){
      const home=roots.get('home-'+lang+'-desktop');
      const scroll=home.findOne(n=>n.type==='FRAME'&&n.name==='div.v3-cinema__scroll');
      if(!scroll)throw new Error('Missing home scroll container: '+lang);
      for(let chapter=2;chapter<=5;chapter++){
        const name='Expanded chapter '+String(chapter).padStart(2,'0');
        if(scroll.children.some(n=>n.name===name))continue;
        const source=roots.get('home-'+lang+'-chapter-'+String(chapter).padStart(2,'0'));
        const clone=source.clone();scroll.appendChild(clone);clone.layoutPositioning='ABSOLUTE';clone.name=name;clone.x=0;clone.y=(chapter-1)*900;
        result.createdNodeIds.push(clone.id,...clone.findAll(()=>true).map(n=>n.id));
      }
    }
    let rowY=0;
    for(const lang of ['zh','en','ja']){
      const groups=[];
      for(const width of [1440,390]){
        const section=roots.get('home-'+lang+'-'+(width===1440?'desktop':'mobile')).parent;
        result.previousPositions.push({id:section.id,x:section.x,y:section.y});
        section.x=width===1440?0:14000;section.y=rowY;
        for(const data of VIEW_DATA.filter(v=>v.lang===lang&&v.kind!=='state'&&v.viewport.width===width)){
          const node=roots.get(data.view);node.x=80+META.routeOrder.indexOf(data.routeKey)*(width+240);node.y=100;changed(node);
        }
        section.resizeWithoutConstraints(8*(width+240)+160,Math.max(...section.children.filter(n=>n.visible).map(n=>n.y+n.height))+80);
        changed(section);groups.push(section);
      }
      const stateSection=roots.get('home-'+lang+'-chapter-02').parent;
      result.previousPositions.push({id:stateSection.id,x:stateSection.x,y:stateSection.y});
      stateSection.x=0;stateSection.y=rowY+Math.max(...groups.map(s=>s.height))+320;changed(stateSection);
      rowY=stateSection.y+stateSection.height+600;
    }
    const components=await figma.getNodeByIdAsync('67:4');components.x=20000;components.y=0;changed(components);
    const refs=await figma.getNodeByIdAsync('67:3');refs.name='Reference captures · 54 browser views';refs.x=23000;refs.y=0;changed(refs);
    let index=0;const fontLoaded=new Set();
    for(const id of FINALIZATION_DATA.rawCaptureNodeIds){
      const node=await figma.getNodeByIdAsync(id);if(!node||node.parent===refs)continue;
      try{
        if(node.type!=='FRAME')throw new Error('Expected reference frame wrapper');
        // Reparent only the frame wrapper; leave every captured text layer unchanged.
        result.previousPositions.push({id:node.id,parentId:node.parent.id,x:node.x,y:node.y});
        refs.appendChild(node);node.x=80+(index%6)*1680;node.y=100+Math.floor(index/6)*13000;changed(node);index++;
      }catch(e){result.warnings.push('Reference preserved in place '+id+': '+(e.message||String(e)));}
    }
    refs.resizeWithoutConstraints(10240,Math.max(300,...refs.children.map(n=>n.y+n.height+80)));
    let guide=page.children.find(n=>n.type==='FRAME'&&n.name==='START HERE · CIBA Swiss Website');
    if(!guide){
      guide=createAutoLayout('VERTICAL');guide.name='START HERE · CIBA Swiss Website';guide.x=0;guide.y=-760;guide.resize(1440,600);guide.primaryAxisSizingMode='FIXED';guide.counterAxisSizingMode='FIXED';guide.paddingLeft=64;guide.paddingRight=64;guide.paddingTop=56;guide.itemSpacing=28;guide.fills=[{type:'SOLID',color:{r:9/255,g:10/255,b:8/255}}];result.createdNodeIds.push(guide.id);
      const copy=[['CIBA · 可编辑网页',64,900],['ZH / EN / JA    ·    DESKTOP 1440 / MOBILE 390',20,700],['48 个完整视图，12 个首页章节。文字、图片、框架与共享组件均可编辑。',24,400],['桌面首页已展开五个作品章节，方便连续调整。网页原有的拖拽、悬停、动画、游戏和视频继续在网站中运行。',24,400],['原七个画板保留在 00 Cover。浏览器参考稿集中在右侧 Reference captures 区域。',20,400]];
      for(const [value,size,weight] of copy){const t=figma.createText();guide.appendChild(t);t.fontName={family:'Noto Sans SC',variationSettings:{wght:weight}};t.fontSize=size;t.lineHeight={unit:'PIXELS',value:size*1.45};t.characters=value;t.textAutoResize='HEIGHT';t.resize(1312,t.height);t.fills=[{type:'SOLID',color:{r:244/255,g:240/255,b:221/255}}];result.createdNodeIds.push(t.id);}
    }
    result.guideId=guide.id;result.homeZhId=roots.get('home-zh-desktop').id;
    result.baseline=[];for(const id of META.baselineFrames){const n=await figma.getNodeByIdAsync(id);result.baseline.push(n?{id:n.id,name:n.name,width:n.width,height:n.height,parentId:n.parent.id}:{id,missing:true});}
    figma.commitUndo();figma.currentPage.selection=[guide];figma.viewport.scrollAndZoomIntoView([guide]);
    result.finishedAt=new Date().toISOString();send({type:'finished',report:result});
  }catch(error){result.warnings.push(error.message);send({type:'failed',message:error.message,report:result});}
  finally{running=false;}
}

async function repairImportedLayout() {
  if(running)return;running=true;
  const result={startedAt:new Date().toISOString(),views:[],mutatedNodeIds:[],createdNodeIds:[],warnings:[]};
  try {
    await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('6:6'));
    const loaded=new Set();
    async function ready(t){for(const s of t.getStyledTextSegments(['fontName'])){const key=JSON.stringify(s.fontName);if(!loaded.has(key)){await figma.loadFontAsync(s.fontName);loaded.add(key);}}}
    for(const rule of LAYOUT_REPAIRS.texts){const t=await figma.getNodeByIdAsync(rule.id);if(!t||t.type!=='TEXT')throw new Error('Missing text '+rule.id);await ready(t);t.textAutoResize=rule.mode;result.mutatedNodeIds.push(t.id);}
    for(const rule of LAYOUT_REPAIRS.flows){const n=await figma.getNodeByIdAsync(rule.id);n.paddingLeft=rule.paddingLeft;n.paddingTop=rule.paddingTop;result.mutatedNodeIds.push(n.id);}
    for(const lang of ['zh','en','ja']){
      const root=await figma.getNodeByIdAsync(FINALIZATION_DATA.views['home-'+lang+'-desktop']);
      for(let chapter=2;chapter<=5;chapter++){
        const nn=String(chapter).padStart(2,'0');
        const source=await figma.getNodeByIdAsync(FINALIZATION_DATA.views['home-'+lang+'-chapter-'+nn]);
        const clone=root.findOne(n=>n.name==='Expanded chapter '+nn);
        const from=source.findAllWithCriteria({types:['TEXT']}),to=clone.findAllWithCriteria({types:['TEXT']});
        if(from.length!==to.length)throw new Error('Chapter text mismatch '+lang+nn);
        for(let i=0;i<from.length;i++){if(from[i].characters!==to[i].characters)throw new Error('Chapter copy mismatch');await ready(to[i]);to[i].textAutoResize=from[i].textAutoResize;result.mutatedNodeIds.push(to[i].id);}
      }
    }
    result.mobileTitle=[];
    for(const [id,word] of [['131:5434','University'],['131:5495','Coursework']]){
      const frame=await figma.getNodeByIdAsync(id);
      let title=frame.children.find(n=>n.type==='TEXT'&&n.name===word+' · editable title');
      if(!title){
        const sample=frame.findAllWithCriteria({types:['TEXT']})[0];await ready(sample);
        const y=sample.absoluteTransform[1][2]-frame.absoluteTransform[1][2];
        title=sample.clone();frame.appendChild(title);title.layoutPositioning='ABSOLUTE';title.x=0;title.y=y;
        title.name=word+' · editable title';result.createdNodeIds.push(title.id);
      }
      await ready(title);title.characters=word;title.textCase='ORIGINAL';title.textAutoResize='WIDTH_AND_HEIGHT';
      title.letterSpacing={unit:'PIXELS',value:-1.755};
      for(let i=0;i<3&&title.width>frame.width;i++)title.letterSpacing={unit:'PIXELS',value:title.letterSpacing.value-(title.width-frame.width)/word.length-.03};
      for(const child of frame.children)if(child!==title&&child.visible){child.visible=false;result.mutatedNodeIds.push(child.id);}
      result.mutatedNodeIds.push(title.id);result.mobileTitle.push({id:title.id,text:word,fontSize:title.fontSize,width:title.width,availableWidth:frame.width,letterSpacing:title.letterSpacing});
    }
    result.finishedAt=new Date().toISOString();figma.commitUndo();send({type:'finished',report:result});
  }catch(e){result.warnings.push(e.message);send({type:'failed',message:e.message,report:result});}
  finally{running=false;}
}
