import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json'); d=json.loads(p.read_text(encoding='utf-8')); e={s['id'] for s in d['sources']}
items=[
 {'id':'SRC-193','title':'มาตรฐานสินค้าเกษตร เรื่อง การปฏิบัติทางการเกษตรที่ดีสำหรับฟาร์มสุกร มกษ. 6403-2565','organization':'มกอช.','url':'https://e-book.acfs.go.th/Book_view/312','publication_date':'2022','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.12'],'notes':'Primary standard framework for readiness checks.'},
 {'id':'SRC-194','title':'การปฏิบัติทางการเกษตรที่ดีสำหรับฟาร์มสุกร','organization':'มกอช.','url':'https://agristandards.acfs.go.th/%E0%B8%9F%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%A1%E0%B8%AA%E0%B8%B8%E0%B8%81%E0%B8%A3/','publication_date':'2025','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.12'],'notes':'Official current explanatory page.'},
 {'id':'SRC-195','title':'หลักเกณฑ์การตรวจประเมินการปฏิบัติทางการเกษตรที่ดี','organization':'กรมปศุสัตว์','url':'https://certify.dld.go.th/index.php/th/thdsxb-menu/reuxng-den-thi-na-snci/farm-leiyng-satw/checklist','publication_date':'2022','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.12'],'notes':'Official GAP inspection checklist; verify current version.'},
 {'id':'SRC-196','title':'แบบฟอร์มการขอรับรองการปฏิบัติทางการเกษตรที่ดีด้านปศุสัตว์ ฉบับปรับปรุงครั้งที่ 2-2568','organization':'กรมปศุสัตว์','url':'https://certify.dld.go.th/index.php/th/thdsxb-menu/reuxng-den-thi-na-snci/farm-leiyng-satw/fm-gap','publication_date':'2025','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.12'],'notes':'Current form index; not a substitute for local permits.'},
 {'id':'SRC-197','title':'ราคาเฉลี่ยสินค้าปศุสัตว์','organization':'กรมปศุสัตว์','url':'https://www.dld.go.th/webnew/index.php/service/livestock-price','publication_date':'2026','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.12'],'notes':'Dynamic source reminder for prices.'},
 {'id':'SRC-198','title':'ชุดข้อมูลราคาสินค้าเกษตรกรรม ณ จุดรับซื้อหรือตลาดสำคัญ','organization':'สำนักงานเศรษฐกิจการเกษตร','url':'https://catalog.oae.go.th/th/dataset/?sort','publication_date':'2026','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.12'],'notes':'Dynamic source reminder for market checks.'}
]
for i in items:
 if i['id'] not in e:d['sources'].append(i)
d['last_updated']='2026-08-23'; p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
