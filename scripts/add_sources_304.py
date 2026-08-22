import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json'); d=json.loads(p.read_text(encoding='utf-8')); e={s['id'] for s in d['sources']}
items=[
 {'id':'SRC-153','title':'มาตรฐานสินค้าเกษตร เรื่อง การปฏิบัติทางการเกษตรที่ดีสำหรับฟาร์มสุกร มกษ. 6403-2565','organization':'มกอช.','url':'https://e-book.acfs.go.th/Book_view/312','publication_date':'2022','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.4'],'notes':'Official scope includes breeder, nursery and finishing farms.'},
 {'id':'SRC-154','title':'การปฏิบัติทางการเกษตรที่ดีสำหรับฟาร์มสุกร','organization':'มกอช.','url':'https://agristandards.acfs.go.th/%E0%B8%9F%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%A1%E0%B8%AA%E0%B8%B8%E0%B8%81%E0%B8%A3/','publication_date':'2025','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.4'],'notes':'Official practical domains shared across systems.'},
 {'id':'SRC-155','title':'สุกรขุน — งานวิชาการสำนักพัฒนาพันธุ์สัตว์','organization':'กรมปศุสัตว์','url':'https://e-wichakarn.dld.go.th/e-journal/?tag=%E0%B8%AA%E0%B8%B8%E0%B8%81%E0%B8%A3%E0%B8%82%E0%B8%B8%E0%B8%99','publication_date':None,'accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.4'],'notes':'Official DLD technical index; no universal performance target.'},
 {'id':'SRC-156','title':'Swine Production','organization':'Penn State Extension','url':'https://extension.psu.edu/swine-production','publication_date':'2005','accessed_date':'2026-08-23','tier':'D','language':'en','topics':['3.4'],'notes':'System definitions only; not Thai regulation.'},
 {'id':'SRC-157','title':'Managing Feeder Pigs','organization':'Alabama Cooperative Extension System','url':'https://www.aces.edu/blog/topics/farming/managing-feeder-pigs/','publication_date':'2018','accessed_date':'2026-08-23','tier':'D','language':'en','topics':['3.4'],'notes':'Technical comparison of finishing labor/management; not Thai target.'}
]
for i in items:
 if i['id'] not in e:d['sources'].append(i)
d['last_updated']='2026-08-23'; p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
