import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json')
d=json.loads(p.read_text(encoding='utf-8'))
if not any(s['id']=='SRC-070' for s in d['sources']):
 d['sources'].append({
  'id':'SRC-070','title':'Biosecurity for alternative pig farms','organization':'University of Minnesota Extension','url':'https://extension.umn.edu/small-scale-swine-production/biosecurity-alternative-pig-farms','publication_date':None,'accessed_date':'2026-08-23','tier':'A-contextual','language':'en','topics':['1.10'],'notes':'Extension guidance on group flow and AIAO; contextual source, not a Thai veterinary protocol.'})
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
