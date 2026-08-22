import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json'); d=json.loads(p.read_text(encoding='utf-8')); e={s['id'] for s in d['sources']}
items=[
 {'id':'SRC-182','title':'ราคาเฉลี่ยสินค้าปศุสัตว์','organization':'กรมปศุสัตว์','url':'https://www.dld.go.th/webnew/index.php/service/livestock-price','publication_date':'2026','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.10'],'notes':'Dynamic price source; cite date and market, never a fixed target.'},
 {'id':'SRC-183','title':'ชุดข้อมูลราคาสินค้าเกษตรกรรม ณ จุดรับซื้อหรือตลาดสำคัญ','organization':'สำนักงานเศรษฐกิจการเกษตร','url':'https://catalog.oae.go.th/th/dataset/?sort','publication_date':'2026','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.10'],'notes':'Dynamic Thai market data; dataset must be checked at decision date.'},
 {'id':'SRC-184','title':'ข่าวเปิดมุมมองอนาคตปศุสัตว์ไทย ปี 69','organization':'สำนักงานเศรษฐกิจการเกษตร','url':'https://zone11.oae.go.th/news-press/4927/','publication_date':'2026','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.10'],'notes':'Supports price transmission and cost volatility context.'},
 {'id':'SRC-185','title':'บริการสูตรอาหารสัตว์','organization':'สำนักพัฒนาอาหารสัตว์ กรมปศุสัตว์','url':'https://nutrition.dld.go.th/index.php/th/fomulafeed','publication_date':'2025','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.10'],'notes':'Feed formulation context, not a current price list.'},
 {'id':'SRC-186','title':'มาตรฐานสินค้าเกษตร เรื่อง การปฏิบัติทางการเกษตรที่ดีสำหรับฟาร์มสุกร มกษ. 6403-2565','organization':'มกอช.','url':'https://e-book.acfs.go.th/Book_view/312','publication_date':'2022','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.10'],'notes':'Requirements affecting operating cash needs.'},
 {'id':'SRC-187','title':'Farm cash-flow planning principles','organization':'FAO technical reference','url':'https://www.fao.org/','publication_date':None,'accessed_date':'2026-08-23','tier':'B','language':'en','topics':['3.10'],'notes':'Cash-flow category logic only; no Thai price or profitability claim.'}
]
for i in items:
 if i['id'] not in e:d['sources'].append(i)
d['last_updated']='2026-08-23'; p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
