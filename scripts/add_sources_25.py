import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json')
d=json.loads(p.read_text(encoding='utf-8'));ids={x['id'] for x in d['sources']}
items=[
{'id':'SRC-096','title':'Pietrain Swine','organization':'Oklahoma State University, Breeds of Livestock','url':'https://breeds.okstate.edu/swine/pietrain-swine','publication_date':None,'accessed_date':'2026-08-23','tier':'C','language':'en','topics':['2.5'],'notes':'University source for phenotype, breed history context and use in crossbreeding; performance figures are historical comparisons, not Thai benchmarks.'},
{'id':'SRC-097','title':'SNP genotypes reveal breed substructure, selection signatures and highly inbred regions in Piétrain pigs','organization':'Animal Genetics / KU Leuven / PMC','url':'https://pmc.ncbi.nlm.nih.gov/articles/PMC7003864/','publication_date':'2020-02','accessed_date':'2026-08-23','tier':'C','language':'en','topics':['2.5'],'notes':'Peer-reviewed SNP/population study; results depend on sampled populations and do not certify individual animals.'},
{'id':'SRC-098','title':'OMIA:000621-9823: Malignant hyperthermia in Sus scrofa','organization':'Online Mendelian Inheritance in Animals (OMIA)','url':'https://omia.org/OMIA000621/9823/','publication_date':'2026','accessed_date':'2026-08-23','tier':'C','language':'en','topics':['2.5'],'notes':'Authoritative curated database for RYR1-related porcine malignant hyperthermia; not a veterinary diagnosis or individual DNA test.'}
]
for x in items:
 if x['id'] not in ids:d['sources'].append(x)
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
