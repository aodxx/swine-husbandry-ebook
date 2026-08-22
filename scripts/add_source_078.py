import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json')
d=json.loads(p.read_text(encoding='utf-8'))
if not any(s['id']=='SRC-078' for s in d['sources']):
 d['sources'].append({'id':'SRC-078','title':'Formulating farm-specific swine diets','organization':'University of Minnesota Extension','url':'https://extension.umn.edu/agriculture/animals-and-livestock/swine/formulating-farm-specific-swine-diets','publication_date':None,'accessed_date':'2026-08-23','tier':'A-contextual','language':'en','topics':['1.11'],'notes':'Extension source explaining farm-specific performance goals and ADG measurement; numeric examples are contextual.'})
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
