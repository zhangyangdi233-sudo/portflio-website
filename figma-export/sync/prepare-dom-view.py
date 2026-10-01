"""Emit Plugin API code from the read-only DOM snapshot. No remote calls here.

Usage: python3 prepare-dom-view.py about-ja-desktop > /tmp/ciba-view.js
The generated script only writes under revision-state.json container IDs.
"""
import hashlib
import json
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).resolve().parent
view = sys.argv[1]
snapshot_path = HERE / 'dom' / (view + '.json')
if not snapshot_path.exists(): snapshot_path = HERE / 'dom-states' / (view + '.json')
snapshot = json.loads(snapshot_path.read_text())
is_state = snapshot_path.parent.name == 'dom-states'
if is_state:
    stage = next(n for n in snapshot['nodes'] if 'data-v3-cinema-stage' in n['attributes'])
    included = {stage['key']}
    for n in snapshot['nodes']:
        if n['parentKey'] in included: included.add(n['key'])
    snapshot['nodes'] = [n for n in snapshot['nodes'] if n['key'] in included]
    origin_x,origin_y = stage['bounds']['x'],stage['bounds']['y']
    for n in snapshot['nodes']:
        n['bounds']['x']-=origin_x;n['bounds']['y']-=origin_y
        for t in n['directText']:
            for b in t['boxes']: b['x']-=origin_x;b['y']-=origin_y
    snapshot['document']={'width':stage['bounds']['width'],'height':stage['bounds']['height']}
state = json.loads((HERE / 'revision-state.json').read_text())
baseline = json.loads((HERE / 'baseline-inventory-2026-09-28.json').read_text())
normalize = lambda s: s.replace('X.WHEEL', 'APHASIA').replace('X.Wheel', 'APHASIA')
images = {}
for frame in baseline['frames']:
    for image in frame['images']:
        label = image['name']
        label = label[7:-1] if label.startswith('Image (') else label.removeprefix('Video - ')
        images[normalize(label)] = image['imageHash']

nodes = []
index = {}
warnings = []
for raw in snapshot['nodes']:
    if not raw['rendered'] or raw['tag'] in ['source', 'svg', 'path']:
        continue
    if 'skip-link' in raw['classes'] or 'sr-only' in raw['classes']:
        continue
    if raw['bounds']['width'] <= 0 or raw['bounds']['height'] <= 0:
        if raw.get('image'): warnings.append('zero image bounds: ' + raw['image']['alt'])
        continue
    n = dict(raw)
    n['p'] = index.get(raw['parentKey'], 0 if nodes else -1)
    n['i'] = len(nodes)
    n['name'] = raw['tag'] + ('.' + '.'.join(raw['classes']) if raw['classes'] else '')
    n['imageHash'] = None
    if n.get('image'):
        n['imageHash'] = images.get(normalize(n['image']['alt']))
        if not n['imageHash']: warnings.append('unmapped image: ' + n['image']['alt'])
    if n.get('video'):
        n['imageHash'] = images.get(normalize(n['attributes'].get('aria-label', '')))
        if not n['imageHash']: warnings.append('unmapped video poster: ' + n['key'])
    index[raw['key']] = len(nodes)
    nodes.append(n)

for n in nodes:
    n['kids'] = [r['i'] for r in nodes if r['p'] == n['i']]
    # Real components are reused for identical header/footer/button source states.
    if n['tag'] in ['header', 'footer', 'button']:
        subtree = [r for r in nodes if r['key'] == n['key'] or r['key'].startswith(n['key'] + ' > ')]
        signature = [{
            'tag': r['tag'], 'classes': r['classes'], 'style': r['style'],
            'text': [t['text'] for t in r['directText']],
            'bounds': {**r['bounds'], 'x': round(r['bounds']['x']-n['bounds']['x'],3), 'y': round(r['bounds']['y']-n['bounds']['y'],3)}
        } for r in subtree]
        n['componentName'] = 'Swiss 2026/' + n['tag'].title() + '/' + hashlib.sha256(json.dumps(signature,sort_keys=True).encode()).hexdigest()[:10]

order = ['home','about','wake-up','works','x-wheel','university-coursework']
route = 'home' if is_state else re.sub(r'-(zh|en|ja)-(desktop|mobile)$','',view)
payload = {
    'view': view, 'title': snapshot['title'], 'url': snapshot['url'], 'lang': snapshot['lang'],
    'document': snapshot['document'], 'viewport': snapshot['viewport'],
    'fontsStatus': snapshot['fontsStatus'], 'nodes': nodes, 'warnings': warnings,
    'kind': 'state' if is_state else 'view', 'routeKey': route,
    'pageId': state['pageId'], 'containerId': state['existingViewsContainer'],
    'componentsId': state['componentsContainer'], 'x': 80 + (order.index(route) if route in order else 6)*1680, 'y': 100,
}
style_keys = ['background-color','opacity','border-radius','overflow-x','overflow-y','position','z-index','filter','object-fit','font-size','font-weight','line-height','letter-spacing','white-space','color','text-transform','padding-left','padding-right','transform-origin']
style_keys += ['border-'+side+'-'+part for side in ['top','right','bottom','left'] for part in ['width','color','style']]
styles = []
def style_id(s):
    values = [s.get(k,'') for k in style_keys]
    if values not in styles: styles.append(values)
    return styles.index(values)
def rect(b): return [b['x'],b['y'],b['width'],b['height']]
packed = []
for n in nodes:
    packed.append([n['i'],n['p'],n['name'],n['key'],rect(n['bounds']),style_id(n['style']),[[t['text'],[rect(b) for b in t['boxes']]] for t in n['directText']],n['kids'],[[p['content'],style_id(p['style'])] for p in n['pseudo'] if p['content']],n['imageHash'],n.get('componentName'),n['tag'],n['attributes'].get('href'),bool(n.get('video'))])
payload['nodes']=packed
payload['styles']=styles
payload['styleKeys']=style_keys
if '--json' in sys.argv:
    print(json.dumps(payload,ensure_ascii=False,separators=(',',':')))
    sys.exit(0)
# Compact repeated DOM data to stay below the connector's 50k-character code limit.
# The readable source of truth remains the original DOM JSON. LZW has no network use.
raw = json.dumps(payload,ensure_ascii=False,separators=(',',':')).encode('utf-8')
dictionary = {bytes([i]): i for i in range(256)}
codes = []
word = b''
for byte in raw:
    joined = word + bytes([byte])
    if joined in dictionary:
        word = joined
    else:
        codes.append(dictionary[word])
        dictionary[joined] = len(dictionary)
        word = bytes([byte])
if word: codes.append(dictionary[word])
assert max(codes) < 55296, 'Split the view into sections before exceeding UTF-16 safe dictionary range.'
encoded = ''.join(chr(n) for n in codes)
print('const PACKED=' + json.dumps(encoded,ensure_ascii=False) + ';')
print("const DI=Array.from({length:256},(_,i)=>String.fromCharCode(i));const CC=Array.from(PACKED,c=>c.charCodeAt(0));let WW=DI[CC[0]],RAW=WW;for(let i=1;i<CC.length;i++){const EE=DI[CC[i]]??(WW+WW[0]);RAW+=EE;DI.push(WW+EE[0]);WW=EE;}const DATA=JSON.parse(decodeURIComponent(Array.from(RAW,c=>'%'+c.charCodeAt(0).toString(16).padStart(2,'0')).join('')));")
print("const R=a=>({x:a[0],y:a[1],width:a[2],height:a[3]});const SS=DATA.styles.map(a=>Object.fromEntries(DATA.styleKeys.map((k,i)=>[k,a[i]])));DATA.nodes=DATA.nodes.map(a=>({i:a[0],p:a[1],name:a[2],key:a[3],bounds:R(a[4]),style:SS[a[5]],directText:a[6].map(t=>({text:t[0],boxes:t[1].map(R)})),kids:a[7],pseudo:a[8].map(p=>({content:p[0],style:SS[p[1]]})),imageHash:a[9],componentName:a[10],tag:a[11],attributes:{href:a[12]},video:a[13]}));")
print((HERE / 'dom-to-figma.js').read_text())
