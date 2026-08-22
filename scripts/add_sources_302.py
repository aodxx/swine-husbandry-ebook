import json
from pathlib import Path
path=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json')
data=json.loads(path.read_text(encoding='utf-8')); existing={s['id'] for s in data['sources']}
items=[
 {'id':'SRC-145','title':'มาตรฐานสินค้าเกษตร เรื่อง การปฏิบัติทางการเกษตรที่ดีสำหรับฟาร์มสุกร มกษ. 6403-2565','organization':'มกอช.','url':'https://e-book.acfs.go.th/Book_view/312','publication_date':'2022','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.2'],'notes':'Capacity must be read with farm components and management requirements.'},
 {'id':'SRC-146','title':'การปฏิบัติทางการเกษตรที่ดีสำหรับฟาร์มสุกร','organization':'มกอช.','url':'https://agristandards.acfs.go.th/%E0%B8%9F%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%A1%E0%B8%AA%E0%B8%B8%E0%B8%81%E0%B8%A3/','publication_date':'2025','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.2'],'notes':'Official summary of site, management, health, welfare, environment and records.'},
 {'id':'SRC-147','title':'Biosecurity in pig farms: a review','organization':'Peer-reviewed review / PMC','url':'https://pmc.ncbi.nlm.nih.gov/articles/PMC7780598/','publication_date':'2020','accessed_date':'2026-08-23','tier':'C','language':'en','topics':['3.2'],'notes':'External and internal biosecurity review; not Thai legal guidance.'},
 {'id':'SRC-148','title':'Biosecurity for Today’s Swine Operation','organization':'University of Missouri Extension','url':'https://extension.missouri.edu/publications/g2340','publication_date':'2017','accessed_date':'2026-08-23','tier':'D','language':'en','topics':['3.2'],'notes':'Technical reinforcement only; not a Thai target or regulation.'}
]
for i in items:
 if i['id'] not in existing:data['sources'].append(i)
data['last_updated']='2026-08-23'; path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
