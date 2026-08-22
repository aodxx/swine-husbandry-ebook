import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json'); d=json.loads(p.read_text(encoding='utf-8')); e={s['id'] for s in d['sources']}
items=[
 {'id':'SRC-188','title':'ราคาเฉลี่ยสินค้าปศุสัตว์','organization':'กรมปศุสัตว์','url':'https://www.dld.go.th/webnew/index.php/service/livestock-price','publication_date':'2026','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.11'],'notes':'Dynamic farm-gate livestock price signal; not a guaranteed buyer quote.'},
 {'id':'SRC-189','title':'ชุดข้อมูลราคาสินค้าเกษตรกรรม ณ จุดรับซื้อหรือตลาดสำคัญ','organization':'สำนักงานเศรษฐกิจการเกษตร','url':'https://catalog.oae.go.th/th/dataset/?sort','publication_date':'2026','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.11'],'notes':'Dynamic Thai market data; use date, location and definition.'},
 {'id':'SRC-190','title':'โครงการศึกษาและวิเคราะห์โครงสร้างตลาดสินค้าสุกรตลอดห่วงโซ่อุปทาน ปี 2569','organization':'กรมการค้าภายใน','url':'https://www.dit.go.th/th/service/procurement/invite/','publication_date':'2026','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.11'],'notes':'Official market-chain context; not an individual sales contract.'},
 {'id':'SRC-191','title':'มาตรฐานสินค้าเกษตร เรื่อง การปฏิบัติทางการเกษตรที่ดีสำหรับฟาร์มสุกร มกษ. 6403-2565','organization':'มกอช.','url':'https://e-book.acfs.go.th/Book_view/312','publication_date':'2022','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.11'],'notes':'Traceability, records and farm practices relevant to sale.'},
 {'id':'SRC-192','title':'Market and contract planning for small livestock farms','organization':'Technical planning reference','url':'https://www.fao.org/','publication_date':None,'accessed_date':'2026-08-23','tier':'B','language':'en','topics':['3.11'],'notes':'Buyer checklist logic only; no Thai price or buyer recommendation.'}
]
for i in items:
 if i['id'] not in e:d['sources'].append(i)
d['last_updated']='2026-08-23'; p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
