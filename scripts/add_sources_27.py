import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json');d=json.loads(p.read_text(encoding='utf-8'));ids={x['id'] for x in d['sources']}
items=[
('SRC-105','Genotype-by-environment interactions for reproduction, body composition, and growth traits in maternal-line pigs based on single-step genomic reaction norms','BMC Genetics','https://pmc.ncbi.nlm.nih.gov/articles/PMC8212483/','G×E evidence; context-specific, not universal.'),
('SRC-106','Comparison and correlation analysis of different swine breeds meat quality','Asian-Australasian Journal of Animal Sciences','https://pmc.ncbi.nlm.nih.gov/articles/PMC4093505/','Breed/gender comparison; not Thai benchmark.'),
('SRC-107','Genetic diversity analysis of Thai indigenous pig population using microsatellite markers','Asian-Australasian Journal of Animal Sciences','https://pmc.ncbi.nlm.nih.gov/articles/PMC6718910/','Thai population study; sample and marker dependent.'),
('SRC-108','Genetic Divergence of Thai Indigenous Pigs from Three Distinct Geographic Regions','Animals / MDPI','https://www.mdpi.com/2076-2615/13/4/625','Thai population comparison; not performance ranking.'),
('SRC-109','Breed descriptions for Hampshire, Berkshire, Tamworth and Meishan','Oklahoma State University, Breeds of Livestock','https://breeds.okstate.edu/swine/','Breed descriptions used only as contextual phenotype references.')]
for i,title,org,url,note in items:
 if i not in ids:d['sources'].append({'id':i,'title':title,'organization':org,'url':url,'publication_date':None,'accessed_date':'2026-08-23','tier':'C','language':'en','topics':['2.7'],'notes':note})
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
