import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json');d=json.loads(p.read_text(encoding='utf-8'));ids={x['id'] for x in d['sources']}
items=[
('SRC-099','Hampshire Swine','Oklahoma State University, Breeds of Livestock','https://breeds.okstate.edu/swine/hampshire-swine','Hampshire history and breed description.'),
('SRC-100','Berkshire Swine','Oklahoma State University, Breeds of Livestock','https://breeds.okstate.edu/swine/berkshire-swine','Berkshire history and breed description.'),
('SRC-101','Tamworth Swine','Oklahoma State University, Breeds of Livestock','https://breeds.okstate.edu/swine/tamworth-swine','Tamworth history and phenotype description.'),
('SRC-102','Meishan Swine','Oklahoma State University, Breeds of Livestock','https://breeds.okstate.edu/swine/meishan-swine','Meishan origin and description; no numeric claims used.'),
('SRC-103','Genetic diversity analysis of Thai indigenous pig population using microsatellite markers','Asian-Australasian Journal of Animal Sciences','https://pmc.ncbi.nlm.nih.gov/articles/PMC6718910/','Peer-reviewed Thai population study; results depend on sample and markers.'),
('SRC-104','Genetic Divergence of Thai Indigenous Pigs from Three Distinct Geographic Regions Revealed by Microsatellite Marker Analysis','Animals / MDPI','https://www.mdpi.com/2076-2615/13/4/625','Peer-reviewed Thai indigenous population study; not a universal phenotype or performance target.')]
for i,title,org,url,note in items:
 if i not in ids:d['sources'].append({'id':i,'title':title,'organization':org,'url':url,'publication_date':None,'accessed_date':'2026-08-23','tier':'C','language':'en','topics':['2.6'],'notes':note})
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
