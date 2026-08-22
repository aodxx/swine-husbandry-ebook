import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json'); d=json.loads(p.read_text(encoding='utf-8')); e={s['id'] for s in d['sources']}
items=[
 {'id':'SRC-172','title':'มาตรฐานสินค้าเกษตร เรื่อง การปฏิบัติทางการเกษตรที่ดีสำหรับฟาร์มสุกร มกษ. 6403-2565','organization':'มกอช.','url':'https://e-book.acfs.go.th/Book_view/312','publication_date':'2022','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.8'],'notes':'Official hygiene, health, welfare and environment framework.'},
 {'id':'SRC-173','title':'คู่มือปฏิบัติงานด้านสุขภาพสัตว์ในสุกร','organization':'กรมปศุสัตว์','url':'https://dcontrol.dld.go.th/index.php/th/news-head/khumux-phaen/khumux-ptibati-ngan-dan-sukhphaph-satw-ni-sukr','publication_date':'2025','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.8'],'notes':'Official health-risk context.'},
 {'id':'SRC-174','title':'Biosecurity in pig farms: a review','organization':'Peer-reviewed review / PMC','url':'https://pmc.ncbi.nlm.nih.gov/articles/PMC7780598/','publication_date':'2021','accessed_date':'2026-08-23','tier':'C','language':'en','topics':['3.8'],'notes':'AIAO and cross-group biosecurity principles.'},
 {'id':'SRC-175','title':'Biosecurity for alternative pig farms','organization':'University of Minnesota Extension','url':'https://extension.umn.edu/small-scale-swine-production/biosecurity-alternative-pig-farms','publication_date':None,'accessed_date':'2026-08-23','tier':'D','language':'en','topics':['3.8'],'notes':'Operational explanation only; not Thai regulation.'},
 {'id':'SRC-176','title':'Scheduling All-In-All-Out Swine Production','organization':'Pork Information Gateway','url':'https://porkgateway.org/resource/scheduling-all-in-all-out-swine-production/','publication_date':None,'accessed_date':'2026-08-23','tier':'D','language':'en','topics':['3.8'],'notes':'Batch-flow concepts; no universal target.'}
]
for i in items:
 if i['id'] not in e:d['sources'].append(i)
d['last_updated']='2026-08-23'; p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
