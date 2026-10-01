"""Build the offline native Figma plugin from DOM snapshots and existing importer.

No calls to Figma, browsers, remote services or package installers.
"""
import base64
import datetime
import hashlib
import json
import pathlib
import re
import subprocess
import sys
import zipfile

HERE = pathlib.Path(__file__).resolve().parent
SYNC = HERE.parent / 'sync'
REPO = HERE.parents[1]
route_order = ['home','works','about','x-wheel','emida','wake-up','escape-project','university-coursework']
ja_six = [r+'-ja-desktop' for r in ['home','about','wake-up','works','x-wheel','university-coursework']]
media = json.loads((HERE/'media-manifest.json').read_text()) if (HERE/'media-manifest.json').exists() else {'sources':{}}
sources = media['sources']

def source_path(url):
    return re.sub(r'^https?://[^/]+','',url or '').split('?')[0]

def build_data(path):
    data = json.loads(subprocess.check_output([sys.executable,str(SYNC/'prepare-dom-view.py'),path.stem,'--json'],text=True))
    snapshot=json.loads(path.read_text())
    data['fontValidation']=snapshot.get('fontValidation')
    records={n['key']:n for n in snapshot['nodes']}
    # Source paths are stable across languages, unlike alt text.
    for packed in data['nodes']:
        raw=records[packed[3]]
        src=source_path(raw.get('image',{}).get('src') or raw.get('video',{}).get('currentSrc') or raw.get('video',{}).get('src'))
        asset=sources.get(src,{})
        if asset.get('hash'): packed[9]=asset['hash']
        packed.append(src or None)
    mapped={n[3] for n in data['nodes'] if n[9]}
    data['warnings']=[w for w in data['warnings'] if not w.startswith(('unmapped image:','unmapped video poster:'))]
    for packed in data['nodes']:
        if packed[14] and not packed[9] and not sources.get(packed[14],{}).get('localPath'):
            data['warnings'].append('No source bytes or file image hash: '+packed[14])
    data['snapshotSha256']=hashlib.sha256(path.read_bytes()).hexdigest()
    return data

paths=sorted((SYNC/'dom').glob('*.json'))
assert len(paths)==48, f'Expected all48 DOM snapshots, found {len(paths)}'
states=sorted((SYNC/'dom-states').glob('home-*-chapter-*.json')) if (SYNC/'dom-states').exists() else []
views=[build_data(path) for path in paths+states]
known={'about-ja-desktop':{'nodeId':'77:38','status':'editable-revision'}}
progress=json.loads((SYNC/'capture-progress.json').read_text()) if (SYNC/'capture-progress.json').exists() else []
for item in progress:
    if item.get('status')!='completed' or not item.get('nodeId'):continue
    parts=item.get('key','').split(':')
    if len(parts)!=3 or parts[2] not in ['390','1440']:continue
    lang,route,width=parts
    name=f"{route}-{lang}-{'desktop' if width=='1440' else 'mobile'}"
    known[name]={'nodeId':item['nodeId'],'status':'first-capture'}
meta={'builtAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'targetFileKey':'xyINqLy60s9MELHd2HmViK','viewCount':48,'stateCount':len(states),'routeOrder':route_order,'jaSix':ja_six,'knownViews':known,'baselineFrames':['28:2','29:2','30:2','31:2','32:2','33:2','34:2']}

engine=(SYNC/'dom-to-figma.js').read_text()
def replace(old,new):
    global engine
    assert old in engine, 'Importer changed; update native adapter: '+old[:80]
    engine=engine.replace(old,new)
replace('figma.createAutoLayout(', 'createAutoLayout(')
replace('const addText=(parent,record,entry)=>{','const addText=async (parent,record,entry)=>{')
replace('t.textStyleId=styleFor(s).id;', 'await t.setTextStyleIdAsync(styleFor(s).id);')
replace('const build=(i,parent,parentBounds,asMain=false)=>{','const build=async (i,parent,parentBounds,asMain=false)=>{')
replace('component=build(i,componentArea,{x:0,y:0},true);','component=await build(i,componentArea,{x:0,y:0},true);')
replace('const ownText=r.directText.map(entry=>addText(node,r,entry)).filter(Boolean);', 'const ownText=[];for(const entry of r.directText){const t=await addText(node,r,entry);if(t)ownText.push(t);}')
replace("const children=r.kids.slice().sort((a,z)=>(num(DATA.nodes[a].style['z-index'])-num(DATA.nodes[z].style['z-index']))||a-z).map(k=>({node:build(k,node,b),record:DATA.nodes[k]}));", "const children=[];for(const k of r.kids.slice().sort((a,z)=>(num(DATA.nodes[a].style['z-index'])-num(DATA.nodes[z].style['z-index']))||a-z)){children.push({node:await build(k,node,b),record:DATA.nodes[k]});}")
replace('addText(node,{...r,style:p.style}', 'await addText(node,{...r,style:p.style}')
replace('build(0,wrapper,{x:0,y:0});','await build(0,wrapper,{x:0,y:0});')
replace('  return node;\n};\nconst wrapper=', "  if(asMain){let count=0;for(const t of node.findAllWithCriteria({types:['TEXT']})){let owner=t.parent;while(owner&&owner!==node&&owner.type!=='INSTANCE')owner=owner.parent;if(owner!==node)continue;const prop=node.addComponentProperty('Label '+(++count),'TEXT',t.characters);t.componentPropertyReferences={characters:prop};}}\n  return node;\n};\nlet wrapper;try{wrapper=")
replace("wrapper.name=DATA.view;", "wrapper.name=DATA.view+' · IMPORTING';")
replace("const allTexts=wrapper.findAllWithCriteria", "wrapper.name=DATA.view;const allTexts=wrapper.findAllWithCriteria")
engine += "\n}catch(error){if(wrapper)wrapper.name=DATA.view+' · INCOMPLETE';return{status:'failed',frameId:wrapper?.id,error:error.message,createdNodeIds,mutatedNodeIds,createdStyleIds,createdVariableIds,createdCollectionIds,warnings:DATA.warnings};}\n"
code='// @ts-nocheck -- Generated native Figma runtime, separate from the Astro application.\n(()=>{\nconst META='+json.dumps(meta,ensure_ascii=False,separators=(',',':'))+';\nconst VIEW_DATA='+json.dumps(views,ensure_ascii=False,separators=(',',':'))+';\n'+(HERE/'controller.js').read_text()+'\nconst FINALIZATION_DATA='+((HERE/'finalization-data.json').read_text())+';\n'+'const LAYOUT_REPAIRS='+((HERE/'layout-repairs.json').read_text())+';\n'+(HERE/'finalization.js').read_text()+'\nasync function importDomView(DATA){\n'+engine+'\n}\n})();\n'
(HERE/'code.js').write_text(code)
(HERE/'view-data.json').write_text(json.dumps({'meta':meta,'views':views},ensure_ascii=False,separators=(',',':'))+'\n')

assets={}
missing=[]
used_sources={n[14] for view in views for n in view['nodes'] if n[14]}
for src,asset in sources.items():
    if src not in used_sources: continue
    local=asset.get('localPath')
    if asset.get('kind')=='video':
        poster=pathlib.Path(asset['posterPath']) if asset.get('posterPath') else None
        if poster and poster.is_file():assets[src+'#figma-poster']={'mime':'image/png','width':asset['width'],'height':asset['height'],'base64':base64.b64encode(poster.read_bytes()).decode('ascii')}
        continue
    if not local: missing.append(src);continue
    path=pathlib.Path(local)
    if not path.is_absolute():path=REPO/path
    if not path.is_file():missing.append(src);continue
    mime=asset.get('mime') or asset.get('mimeType') or 'application/octet-stream'
    assets[src]={'mime':mime,'width':asset.get('width') or 0,'height':asset.get('height') or 0,'base64':base64.b64encode(path.read_bytes()).decode('ascii')}
ui=(HERE/'ui.template.html').read_text().replace('__ASSET_DATA__',json.dumps(assets,separators=(',',':')))
(HERE/'ui.html').write_text(ui)
runtime_path=HERE/'runtime-validation.json'
runtime=json.loads(runtime_path.read_text()) if runtime_path.exists() else {}
source_fingerprint=hashlib.sha256(b''.join((HERE/name).read_bytes() for name in ['controller.js','finalization.js','ui.template.html'])+(SYNC/'dom-to-figma.js').read_bytes()).hexdigest()
summary={'mainViews':len(paths),'supplementalStates':len(states),'knownReferenceCaptures':sum(v['status']=='first-capture' for v in known.values()),'knownComponentizedViews':sum(v['status']=='editable-revision' for v in known.values()),'all48Policy':'Create parallel componentized frames; preserve raw captures; skip only completed componentized frames.','imageAssetsEmbedded':len(assets),'embeddedBytes':sum(len(v['base64'])*3//4 for v in assets.values()),'missingImageBytes':missing,'snapshotWarnings':{v['view']:v['warnings'] for v in views if v['warnings']},'fontsPending':[v['view'] for v in views if v['fontsStatus']!='loaded' and (v.get('fontValidation') or {}).get('status')!='loaded'],'fontsSeparatelyVerified':{v['view']:v['fontValidation'] for v in views if v['fontsStatus']!='loaded' and (v.get('fontValidation') or {}).get('status')=='loaded'},'nativePluginRuntimeVerified':runtime.get('sourceFingerprint')==source_fingerprint,'nativeRuntimeEvidence':runtime.get('evidence'),'sourceFingerprint':source_fingerprint,'codeSha256':hashlib.sha256(code.encode()).hexdigest()}
(HERE/'build-report.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n')
manifest=json.loads((HERE/'manifest.json').read_text())
summary['manifestHasAssignedId']=bool(re.fullmatch(r'[0-9]{8,}',str(manifest.get('id',''))))
summary['setupRequired']='Bind the actual ID from Figma Create New Plugin using prepare-local-manifest.py before import.' if not summary['manifestHasAssignedId'] else None
(HERE/'build-report.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n')
with zipfile.ZipFile(HERE/'CIBA-Swiss-Revision-Plugin.zip','w',zipfile.ZIP_DEFLATED) as archive:
    for name in ['manifest.json','prepare-local-manifest.py','code.js','ui.html','README.md','build-report.json','media-manifest.json','runtime-validation.json','VALIDATION.json']:
        if (HERE/name).exists():archive.write(HERE/name,arcname='ciba-swiss-revision/'+name)
print(json.dumps(summary,ensure_ascii=False,indent=2))
