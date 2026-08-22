import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json')
d=json.loads(p.read_text(encoding='utf-8')); ids={x['id'] for x in d['sources']}
items=[
{'id':'SRC-093','title':'Duroc Swine','organization':'Oklahoma State University, Breeds of Livestock','url':'https://breeds.okstate.edu/swine/duroc-swine','publication_date':None,'accessed_date':'2026-08-23','tier':'C','language':'en','topics':['2.4'],'notes':'University source for Duroc history and phenotype description; no Thai benchmark.'},
{'id':'SRC-094','title':'Characterization of genomic diversity and population structure of worldwide Duroc subpopulations and other pig breeds','organization':'Genetics Selection Evolution / PMC','url':'https://pmc.ncbi.nlm.nih.gov/articles/PMC12781363/','publication_date':'2025-12-16','accessed_date':'2026-08-23','tier':'C','language':'en','topics':['2.4'],'notes':'Peer-reviewed genomic study; results concern sampled subpopulations and are not universal breed targets.'},
{'id':'SRC-095','title':'ลักษณะทางเศรษฐกิจของสุกรลูกผสมดูร็อค 75% เปียแตรง 25%','organization':'กรมปศุสัตว์ สำนักพัฒนาพันธุ์สัตว์','url':'https://e-wichakarn.dld.go.th/e-journal/?p=3400','publication_date':'2019-06-17','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['2.4'],'notes':'Thai government study metadata and accessible abstract; any numbers are specific to the tested crossbred prototype and must not become Duroc-wide targets.'}
]
for x in items:
 if x['id'] not in ids:d['sources'].append(x)
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
