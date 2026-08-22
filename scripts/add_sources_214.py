import json
from pathlib import Path
path=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json')
data=json.loads(path.read_text())
existing={x['id'] for x in data['sources']}
items=[
 {'id':'SRC-133','title':'Genetic parameters for carcass composition and pork quality traits in two pig populations','organization':'Journal of Animal Science / PubMed','url':'https://pubmed.ncbi.nlm.nih.gov/15644503/','publication_date':'2005','accessed_date':'2026-08-23','tier':'C','language':'en','topics':['2.14'],'notes':'Peer-reviewed study; estimates are population- and protocol-specific.'},
 {'id':'SRC-134','title':'Estimation of Genetic Parameters for Pork Quality, Novel Carcass, Primal-Cut and Growth Traits in Duroc Pigs','organization':'Animals / MDPI','url':'https://www.mdpi.com/2076-2615/10/5/779','publication_date':'2020','accessed_date':'2026-08-23','tier':'C','language':'en','topics':['2.14'],'notes':'Peer-reviewed Duroc population study; no universal Thai targets.'},
 {'id':'SRC-135','title':'Genetic Improvement of Meat Quality Traits in Pigs','organization':'Iowa State University Pork Industry Center','url':'https://www.ipic.iastate.edu/genetic-improvement-meat-quality-traits-pigs','publication_date':None,'accessed_date':'2026-08-23','tier':'A','language':'en','topics':['2.14'],'notes':'University technical summary on real-time ultrasound and IMF selection.'},
 {'id':'SRC-136','title':'Pork Quality and Genetic Selection','organization':'North Carolina State University / Pork Gateway','url':'https://porkgateway.org/resource/pork-quality-and-genetic-selection/','publication_date':None,'accessed_date':'2026-08-23','tier':'D','language':'en','topics':['2.14'],'notes':'Technical reference on economic objectives and measurement constraints.'}
]
for item in items:
 if item['id'] not in existing:data['sources'].append(item)
data['last_updated']='2026-08-23'
path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
