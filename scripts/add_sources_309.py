import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json'); d=json.loads(p.read_text(encoding='utf-8')); e={s['id'] for s in d['sources']}
items=[
 {'id':'SRC-177','title':'มาตรฐานสินค้าเกษตร เรื่อง การปฏิบัติทางการเกษตรที่ดีสำหรับฟาร์มสุกร มกษ. 6403-2565','organization':'มกอช.','url':'https://e-book.acfs.go.th/Book_view/312','publication_date':'2022','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.9'],'notes':'Framework for farm facilities and management requirements, not construction prices.'},
 {'id':'SRC-178','title':'การปฏิบัติทางการเกษตรที่ดีสำหรับฟาร์มสุกร','organization':'มกอช.','url':'https://agristandards.acfs.go.th/%E0%B8%9F%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%A1%E0%B8%AA%E0%B8%B8%E0%B8%81%E0%B8%A3/','publication_date':'2025','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.9'],'notes':'Official component summary.'},
 {'id':'SRC-179','title':'ราคาเฉลี่ยสินค้าปศุสัตว์','organization':'กรมปศุสัตว์','url':'https://www.dld.go.th/webnew/index.php/service/livestock-price','publication_date':'2026','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.9'],'notes':'Dynamic livestock-price page; does not provide construction quotes.'},
 {'id':'SRC-180','title':'บริการสูตรอาหารสัตว์','organization':'สำนักพัฒนาอาหารสัตว์ กรมปศุสัตว์','url':'https://nutrition.dld.go.th/index.php/th/fomulafeed','publication_date':'2025','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.9'],'notes':'Feed formulation service; not current ingredient pricing.'},
 {'id':'SRC-181','title':'การวางแผนต้นทุนฟาร์มสุกร','organization':'Technical farm planning reference','url':'https://www.fao.org/','publication_date':None,'accessed_date':'2026-08-23','tier':'B','language':'en','topics':['3.9'],'notes':'Used only for cost-category logic; no Thai price or target.'}
]
for i in items:
 if i['id'] not in e:d['sources'].append(i)
d['last_updated']='2026-08-23'; p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
