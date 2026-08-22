import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json')
d=json.loads(p.read_text(encoding='utf-8'))
ids={x['id'] for x in d['sources']}
items=[
{'id':'SRC-086','title':'Large White','organization':'British Pig Association','url':'https://www.britishpigs.org.uk/breed-information/large-white','publication_date':None,'accessed_date':'2026-08-23','tier':'D','language':'en','topics':['2.2'],'notes':'Breed organization source for name, history and breed description; not used as sole source for universal claims.'},
{'id':'SRC-087','title':'Yorkshire Swine','organization':'Oklahoma State University, Breeds of Livestock','url':'https://breeds.okstate.edu/swine/american-yorkshire-swine','publication_date':None,'accessed_date':'2026-08-23','tier':'C','language':'en','topics':['2.2'],'notes':'University source for historical name and herd-book context; historical narrative and no Thai benchmark.'},
{'id':'SRC-088','title':'สุกรพันธุ์ลาร์จไวท์ สายพันธุ์อเมริกา และอังกฤษ','organization':'กรมปศุสัตว์ ศูนย์วิจัยและบำรุงพันธุ์สัตว์','url':'https://lctk-sbr.dld.go.th/animal/pig/largewhite-american-and-british.html','publication_date':None,'accessed_date':'2026-08-23','tier':'A','language':'th','topics':['2.2'],'notes':'Search-discovered Thai government page; direct retrieval unavailable in this round, contextual lead only.'},
{'id':'SRC-089','title':'สุกรพันธุ์ลาร์จไวท์ สายพันธุ์ไอร์แลนด์','organization':'กรมปศุสัตว์ ศูนย์วิจัยและบำรุงพันธุ์สัตว์','url':'https://lctk-sbr.dld.go.th/animal/pig/largewhite-ireland.html','publication_date':None,'accessed_date':'2026-08-23','tier':'A','language':'th','topics':['2.2'],'notes':'Search-discovered Thai government page; direct retrieval unavailable in this round, contextual lead only.'}
]
for x in items:
 if x['id'] not in ids:d['sources'].append(x)
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
