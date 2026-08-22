import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json')
d=json.loads(p.read_text(encoding='utf-8'))
ids={s['id'] for s in d['sources']}
items=[
('SRC-071','Pork Production Glossary','EPA Ag 101 / P2 InfoHouse','https://p2infohouse.org/ref/02/01244/www.epa.gov/agriculture/ag101/porkglossary.html','2018','A-contextual','en','Government glossary; U.S. terminology and numeric definitions are contextual.'),
('SRC-072','Hogs & Pork: Sector at a Glance','USDA Economic Research Service','https://www.ers.usda.gov/topics/animal-products/hogs-pork/sector-at-a-glance','2025','A','en','Government source for production phases and gilt/sow terms; U.S. context.'),
('SRC-073','Animal welfare and pig production systems, Chapter 7.13','WOAH','https://www.woah.org/fileadmin/Home/eng/Health_standards/tahc/2018/en_chapitre_aw_pigs.htm','2018','B','en','International standard for commercial pig production and outcome indicators.'),
('SRC-074','Scheduling All-In All-Out Swine Production','Pork Information Gateway','https://porkgateway.org/resource/scheduling-all-in-all-out-swine-production/',None,'B','en','Technical source for group flow and AIAO terminology.'),
('SRC-075','Biosecurity for alternative pig farms','University of Minnesota Extension','https://extension.umn.edu/small-scale-swine-production/biosecurity-alternative-pig-farms','2018','A-contextual','en','Extension source for group movement and multi-stage flow; not veterinary advice.'),
('SRC-076','Utilizing productivity and health breeding-to-market data','Frontiers in Veterinary Science / Magalhães et al.','https://www.frontiersin.org/journals/veterinary-science/articles/10.3389/fvets.2023.1301392/full','2024','C','en','Peer-reviewed system-specific data terminology; no universal benchmark.'),
('SRC-077','ผลการค้นกรมปศุสัตว์/มหาวิทยาลัยไทยด้านศัพท์สุกร','Research log — Thai authoritative-source search','https://www.dld.go.th/','2026-08-23','A-search-not-verified','th','No single directly verifiable Thai Tier A glossary covering all selected terms was found.'),
]
for id,title,org,url,year,tier,lang,note in items:
 if id not in ids:
  d['sources'].append({'id':id,'title':title,'organization':org,'url':url,'publication_date':year,'accessed_date':'2026-08-23','tier':tier,'language':lang,'topics':['1.11'],'notes':note})
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('added', [x[0] for x in items if x[0] not in ids])
