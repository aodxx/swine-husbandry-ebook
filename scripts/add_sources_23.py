import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json')
d=json.loads(p.read_text(encoding='utf-8')); ids={x['id'] for x in d['sources']}
items=[
{'id':'SRC-090','title':'American Landrace Swine','organization':'Oklahoma State University, Breeds of Livestock','url':'https://breeds.okstate.edu/swine/american-landrace-swine','publication_date':None,'accessed_date':'2026-08-23','tier':'C','language':'en','topics':['2.3'],'notes':'University source for history and American Landrace description; no Thai benchmark.'},
{'id':'SRC-091','title':'Animal genetic resources of the USSR — Pig breeds','organization':'FAO','url':'https://www.fao.org/4/ah759e/AH759E10.htm','publication_date':None,'accessed_date':'2026-08-23','tier':'B','language':'en','topics':['2.3'],'notes':'International historical source for breed adaptation and breeding-system context; old regional context.'},
{'id':'SRC-092','title':'การศึกษาความแปรปรวนของลักษณะทางเศรษฐกิจของสุกรพันธุ์แลนด์เรซสายพันธุ์ปากช่อง 1','organization':'กรมปศุสัตว์ สำนักพัฒนาพันธุ์สัตว์','url':'https://e-wichakarn.dld.go.th/e-journal/?p=92','publication_date':'2012-06-18','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['2.3'],'notes':'Thai government metadata/article page; no numeric results cited because full file was not accessible.'}
]
for x in items:
 if x['id'] not in ids:d['sources'].append(x)
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
