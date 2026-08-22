import json
p='/home/ubuntu/swine-husbandry-ebook/data/sources.json';d=json.load(open(p));ids={x['id'] for x in d['sources']}
items=[('SRC-121','Swine Genetic Evaluation Programs','Purdue/NSIF','https://www.extension.purdue.edu/extmedia/NSIF/NSIF-FS12.html','C'),('SRC-122','Boar Management','Merck Veterinary Manual','https://www.merckvetmanual.com/management-and-nutrition/management-of-reproduction-pigs/boar-management','C'),('SRC-123','Genetic selection of boars','PubMed','https://pubmed.ncbi.nlm.nih.gov/18672281/','C'),('SRC-124','Selection Programs for Seedstock Producers','Pork Gateway/NSIF','https://porkgateway.org/resource/selection-programs-for-seedstock-producers/','D')]
for i,t,o,u,tier in items:
 if i not in ids:d['sources'].append({'id':i,'title':t,'organization':o,'url':u,'publication_date':None,'accessed_date':'2026-08-23','tier':tier,'language':'en','topics':['2.11'],'notes':'Context-specific; no universal Thai benchmark. Veterinary evaluation requires qualified professional.'})
json.dump(d,open(p,'w'),ensure_ascii=False,indent=2);open(p,'a').write('\n')
