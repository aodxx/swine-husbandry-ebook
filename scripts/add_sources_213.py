import json
from pathlib import Path
path=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json')
data=json.loads(path.read_text())
existing={x['id'] for x in data['sources']}
items=[
 {'id':'SRC-129','title':'Unintended consequences of selection for increased production on the health and welfare of livestock','organization':'Archives of Animal Breeding / University of Pretoria','url':'https://pmc.ncbi.nlm.nih.gov/articles/PMC8182664/','publication_date':'2021','accessed_date':'2026-08-23','tier':'C','language':'en','topics':['2.13'],'notes':'Peer-reviewed review; contextual principles, not universal Thai targets.'},
 {'id':'SRC-130','title':'Selection of pigs for improved coping with health and environmental challenges: breeding for resistance or tolerance?','organization':'Frontiers in Genetics / University of Sydney','url':'https://pmc.ncbi.nlm.nih.gov/articles/PMC3522143/','publication_date':'2012','accessed_date':'2026-08-23','tier':'C','language':'en','topics':['2.13'],'notes':'Peer-reviewed review; resistance/tolerance depend on genotype and environment.'},
 {'id':'SRC-131','title':'Multiple Trait Selection For Pork Improvement','organization':'National Swine Improvement Federation / Pork Gateway','url':'https://porkgateway.org/resource/multiple-trait-selection-for-pork-improvement/','publication_date':None,'accessed_date':'2026-08-23','tier':'D','language':'en','topics':['2.13'],'notes':'Technical factsheet; selection objective and correlated response, US context.'},
 {'id':'SRC-132','title':'Terrestrial Animal Health Code — animal welfare principles','organization':'WOAH','url':'https://www.woah.org/en/what-we-do/standards/codes-and-manuals/terrestrial-code-online-access/','publication_date':None,'accessed_date':'2026-08-23','tier':'B','language':'en','topics':['2.13'],'notes':'International welfare framework; no numeric farm benchmark used.'}
]
for item in items:
 if item['id'] not in existing:data['sources'].append(item)
data['last_updated']='2026-08-23'
path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
