import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json'); d=json.loads(p.read_text(encoding='utf-8')); e={s['id'] for s in d['sources']}
items=[
 {'id':'SRC-163','title':'มาตรฐานสินค้าเกษตร เรื่อง การปฏิบัติทางการเกษตรที่ดีสำหรับฟาร์มสุกร มกษ. 6403-2565','organization':'มกอช.','url':'https://e-book.acfs.go.th/Book_view/312','publication_date':'2022','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.6'],'notes':'Official scope and shared requirements.'},
 {'id':'SRC-164','title':'การปฏิบัติทางการเกษตรที่ดีสำหรับฟาร์มสุกร','organization':'มกอช.','url':'https://agristandards.acfs.go.th/%E0%B8%9F%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%A1%E0%B8%AA%E0%B8%B8%E0%B8%81%E0%B8%A3/','publication_date':'2025','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.6'],'notes':'Official practical domains.'},
 {'id':'SRC-165','title':'Swine Production','organization':'Penn State Extension','url':'https://extension.psu.edu/swine-production/','publication_date':'2005','accessed_date':'2026-08-23','tier':'D','language':'en','topics':['3.6'],'notes':'System definitions; no Thai legal or economic target.'},
 {'id':'SRC-166','title':'Hogs & Pork: Sector at a Glance','organization':'USDA Economic Research Service','url':'https://www.ers.usda.gov/topics/animal-products/hogs-pork/sector-at-a-glance','publication_date':'2025','accessed_date':'2026-08-23','tier':'B','language':'en','topics':['3.6'],'notes':'System terminology only; no Thai benchmark.'}
]
for i in items:
 if i['id'] not in e:d['sources'].append(i)
d['last_updated']='2026-08-23'; p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
