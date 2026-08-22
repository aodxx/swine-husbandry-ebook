import json
from pathlib import Path
path=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json')
data=json.loads(path.read_text(encoding='utf-8')); existing={s['id'] for s in data['sources']}
items=[
 {'id':'SRC-149','title':'มาตรฐานสินค้าเกษตร เรื่อง การปฏิบัติทางการเกษตรที่ดีสำหรับฟาร์มสุกร มกษ. 6403-2565','organization':'มกอช.','url':'https://e-book.acfs.go.th/Book_view/312','publication_date':'2022','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.3'],'notes':'Official standard framework for food safety, health, welfare, environment and records.'},
 {'id':'SRC-150','title':'การปฏิบัติทางการเกษตรที่ดีสำหรับฟาร์มสุกร','organization':'มกอช.','url':'https://agristandards.acfs.go.th/%E0%B8%9F%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%A1%E0%B8%AA%E0%B8%B8%E0%B8%81%E0%B8%A3/','publication_date':'2025','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.3'],'notes':'Official explanatory page for practical domains.'},
 {'id':'SRC-151','title':'การประชุมขับเคลื่อนงานด้านมาตรฐานสินค้าปศุสัตว์','organization':'กรมปศุสัตว์','url':'https://certify.dld.go.th/images/training%20documents/2566/data-b/651206b8.pdf','publication_date':'2022','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.3'],'notes':'Official DLD material on farm standard implementation; used as context, not current KPI.'},
 {'id':'SRC-152','title':'Welfare, Health and Productivity in Commercial Pig Herds','organization':'Animals / peer-reviewed review','url':'https://pmc.ncbi.nlm.nih.gov/articles/PMC8074599/','publication_date':'2021','accessed_date':'2026-08-23','tier':'C','language':'en','topics':['3.3'],'notes':'Supports integrated goals across production, health and welfare.'}
]
for i in items:
 if i['id'] not in existing:data['sources'].append(i)
data['last_updated']='2026-08-23'; path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
