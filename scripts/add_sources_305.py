import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json'); d=json.loads(p.read_text(encoding='utf-8')); e={s['id'] for s in d['sources']}
items=[
 {'id':'SRC-158','title':'มาตรฐานสินค้าเกษตร เรื่อง การปฏิบัติทางการเกษตรที่ดีสำหรับฟาร์มสุกร มกษ. 6403-2565','organization':'มกอช.','url':'https://e-book.acfs.go.th/Book_view/312','publication_date':'2022','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.5'],'notes':'Official requirements for new pigs, entry/exit, health and records.'},
 {'id':'SRC-159','title':'การปฏิบัติทางการเกษตรที่ดีสำหรับฟาร์มสุกร','organization':'มกอช.','url':'https://agristandards.acfs.go.th/%E0%B8%9F%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%A1%E0%B8%AA%E0%B8%B8%E0%B8%81%E0%B8%A3/','publication_date':'2025','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['3.5'],'notes':'Official summary; not a zero-risk claim.'},
 {'id':'SRC-160','title':'A Review of Swine Breeding Herd Biosecurity in the United States','organization':'Animals / peer-reviewed review','url':'https://pmc.ncbi.nlm.nih.gov/articles/PMC11440104/','publication_date':'2024','accessed_date':'2026-08-23','tier':'C','language':'en','topics':['3.5'],'notes':'Breeding herd biosecurity review; no Thai legal targets.'},
 {'id':'SRC-161','title':'Biosecurity in pig farms: a review','organization':'Peer-reviewed review / PMC','url':'https://pmc.ncbi.nlm.nih.gov/articles/PMC7780598/','publication_date':'2021','accessed_date':'2026-08-23','tier':'C','language':'en','topics':['3.5'],'notes':'External/internal biosecurity and replacement risks.'},
 {'id':'SRC-162','title':'Purchasing vs. Closed Herd System','organization':'Pork Information Gateway','url':'https://porkgateway.org/resource/purchasing-vs-closed-herd-system/','publication_date':None,'accessed_date':'2026-08-23','tier':'D','language':'en','topics':['3.5'],'notes':'Conceptual comparison only; not Thai regulation.'}
]
for i in items:
 if i['id'] not in e:d['sources'].append(i)
d['last_updated']='2026-08-23'; p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
