import json
from pathlib import Path
path=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json')
data=json.loads(path.read_text(encoding='utf-8'))
existing={s['id'] for s in data['sources']}
items=[
 {'id':'SRC-141','title':'มาตรฐานสินค้าเกษตร เรื่อง การปฏิบัติทางการเกษตรที่ดีสำหรับฟาร์มสุกร มกษ. 6403-2565','organization':'สำนักงานมาตรฐานสินค้าเกษตรและอาหารแห่งชาติ (มกอช.)','url':'https://e-book.acfs.go.th/Book_view/312','publication_date':'2022','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.1'],'notes':'Official ACFS e-book entry; current standard title and edition verified 2026-08-23.'},
 {'id':'SRC-142','title':'การปฏิบัติทางการเกษตรที่ดีสำหรับฟาร์มสุกร','organization':'สำนักงานมาตรฐานสินค้าเกษตรและอาหารแห่งชาติ (มกอช.)','url':'https://agristandards.acfs.go.th/%E0%B8%9F%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%A1%E0%B8%AA%E0%B8%B8%E0%B8%81%E0%B8%A3/','publication_date':'2025','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.1'],'notes':'Official ACFS explanatory page; use for scope and practical domains, not as sole substitute for local permits.'},
 {'id':'SRC-143','title':'ฟาร์มเลี้ยงสัตว์ — สำนักพัฒนาระบบและรับรองมาตรฐานสินค้าปศุสัตว์','organization':'กรมปศุสัตว์','url':'https://certify.dld.go.th/index.php/th/thdsxb-menu/reuxng-den-thi-na-snci/farm-leiyng-satw/farm','publication_date':'2025','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.1'],'notes':'Official DLD certification information page; reviewed for current agency channel.'},
 {'id':'SRC-144','title':'แบบฟอร์มการขอรับรองการปฏิบัติทางการเกษตรที่ดีด้านปศุสัตว์สำหรับฟาร์มเลี้ยงสัตว์ FM-GAP-FAM-01','organization':'กรมปศุสัตว์','url':'https://certify.dld.go.th/index.php/th/thdsxb-menu/reuxng-den-thi-na-snci/farm-leiyng-satw/fm-gap','publication_date':'2025','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.1'],'notes':'Official DLD forms page; confirms application channel, not a complete legal checklist.'}
]
for item in items:
 if item['id'] not in existing:data['sources'].append(item)
data['last_updated']='2026-08-23'
path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
