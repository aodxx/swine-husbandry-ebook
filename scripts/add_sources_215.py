import json
from pathlib import Path
path=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json')
data=json.loads(path.read_text())
existing={x['id'] for x in data['sources']}
items=[
 {'id':'SRC-137','title':'Genetic Strategies for Improving Pig Robustness: Reducing Antibiotic Use Through Enhanced Resilience and Disease Resistance','organization':'Animals / Széchenyi István University','url':'https://pmc.ncbi.nlm.nih.gov/articles/PMC12466542/','publication_date':'2025','accessed_date':'2026-08-23','tier':'C','language':'en','topics':['2.15'],'notes':'Peer-reviewed review; robustness definitions and traits are context-dependent.'},
 {'id':'SRC-138','title':'Selection of pigs for improved coping with health and environmental challenges: breeding for resistance or tolerance?','organization':'Frontiers in Genetics / University of Sydney','url':'https://www.frontiersin.org/journals/genetics/articles/10.3389/fgene.2012.00281/full','publication_date':'2012','accessed_date':'2026-08-23','tier':'C','language':'en','topics':['2.15'],'notes':'Peer-reviewed review; genotype, challenge and environment must be considered.'},
 {'id':'SRC-139','title':'Behavioral genetics in pigs and relations to welfare','organization':'Swedish University of Agricultural Sciences / Elsevier','url':'https://research.slu.se/en/publications/behavioral-genetics-in-pigs-and-relations-to-welfare/','publication_date':'2022','accessed_date':'2026-08-23','tier':'C','language':'en','topics':['2.15'],'notes':'Academic chapter metadata/abstract; used only for supported behavioral genetics and welfare claims.'},
 {'id':'SRC-140','title':'Methodologies for assessing disease tolerance in pigs','organization':'Frontiers in Veterinary Science','url':'https://www.frontiersin.org/journals/veterinary-science/articles/10.3389/fvets.2018.00329/full','publication_date':'2018','accessed_date':'2026-08-23','tier':'C','language':'en','topics':['2.15'],'notes':'Peer-reviewed veterinary review; no diagnostic or treatment advice.'}
]
for item in items:
 if item['id'] not in existing:data['sources'].append(item)
data['last_updated']='2026-08-23'
path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
