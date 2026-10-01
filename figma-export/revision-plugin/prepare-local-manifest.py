"""Bind only an actual Figma-created development plugin ID to this package.

Usage: python3 prepare-local-manifest.py --figma-manifest /path/to/figma-generated/manifest.json
Does not install anything or overwrite the Figma-generated source folder.
"""
import argparse
import json
import pathlib
import re

parser=argparse.ArgumentParser()
parser.add_argument('--figma-manifest',required=True,type=pathlib.Path,help='manifest.json produced by Figma Create New Plugin')
args=parser.parse_args()
source=json.loads(args.figma_manifest.read_text())
plugin_id=source.get('id','')
if not re.fullmatch(r'[0-9]{8,}',str(plugin_id)):
    raise SystemExit('The supplied manifest does not contain a numeric Figma-assigned plugin ID; no files changed.')
destination=pathlib.Path(__file__).resolve().parent/'manifest.json'
target=json.loads(destination.read_text())
target['id']=str(plugin_id)
destination.write_text(json.dumps(target,ensure_ascii=False,indent=2)+'\n')
print('Assigned ID copied from '+str(args.figma_manifest))
print('Import this prepared local manifest: '+str(destination))
