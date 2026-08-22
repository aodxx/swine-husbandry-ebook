import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json'); d=json.loads(p.read_text(encoding='utf-8')); e={s['id'] for s in d['sources']}
items=[
 {'id':'SRC-167','title':'มาตรฐานสินค้าเกษตร เรื่อง การปฏิบัติทางการเกษตรที่ดีสำหรับฟาร์มสุกร มกษ. 6403-2565','organization':'มกอช.','url':'https://e-book.acfs.go.th/Book_view/312','publication_date':'2022','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.7'],'notes':'Official requirements for nursery/finishing and shared management.'},
 {'id':'SRC-168','title':'การปฏิบัติทางการเกษตรที่ดีสำหรับฟาร์มสุกร','organization':'มกอช.','url':'https://agristandards.acfs.go.th/%E0%B8%9F%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%A1%E0%B8%AA%E0%B8%B8%E0%B8%81%E0%B8%A3/','publication_date':'2025','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.7'],'notes':'Official practical domains.'},
 {'id':'SRC-169','title':'คู่มือปฏิบัติงานด้านสุขภาพสัตว์ในสุกร','organization':'กรมปศุสัตว์','url':'https://dcontrol.dld.go.th/index.php/th/news-head/khumux-phaen/khumux-ptibati-ngan-dan-sukhphaph-satw-ni-sukr','publication_date':'2025','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.7'],'notes':'Official health-risk and farm assessment context.'},
 {'id':'SRC-170','title':'Wean-To-Finish Production Systems Evolve for Healthy Pigs','organization':'South Dakota State University Extension','url':'https://extension.sdstate.edu/wean-finish-production-systems-evolve-healthy-pigs','publication_date':'2020','accessed_date':'2026-08-23','tier':'D','language':'en','topics':['3.7'],'notes':'System design and movement concepts only.'},
 {'id':'SRC-171','title':'Biosecurity in pig farms: a review','organization':'Peer-reviewed review / PMC','url':'https://pmc.ncbi.nlm.nih.gov/articles/PMC7780598/','publication_date':'2021','accessed_date':'2026-08-23','tier':'C','language':'en','topics':['3.7'],'notes':'Biosecurity and movement concepts; not Thai regulation.'}
]
for i in items:
 if i['id'] not in e:d['sources'].append(i)
d['last_updated']='2026-08-23'; p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
