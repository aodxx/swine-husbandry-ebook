import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json')
d=json.loads(p.read_text(encoding='utf-8'))
existing={x['id'] for x in d['sources']}
items=[
{'id':'SRC-079','title':'Swine Breeding Systems for Alternative Pork Chains: Breeding Programs','organization':'Michigan State University Extension','url':'https://www.canr.msu.edu/resources/swine_breeding_systems_for_alternative_pork_chains_breeding_programs','publication_date':'2012-04-02','accessed_date':'2026-08-23','tier':'A-contextual','language':'en','topics':['2.1'],'notes':'Crossbreeding, purebred/crossbred and heterosis; numeric tables are U.S.-specific examples.'},
{'id':'SRC-080','title':'Improvement of pigs in the tropics: General principles','organization':'FAO','url':'https://www.fao.org/4/ah806e/AH806E19.htm','publication_date':None,'accessed_date':'2026-08-23','tier':'B','language':'en','topics':['2.1'],'notes':'Tropical adaptation and breeding principles; older general review.'},
{'id':'SRC-081','title':'The purebred-crossbred correlation in pigs: A review of theory, estimates, and implications','organization':'Journal of Animal Science / PubMed','url':'https://pubmed.ncbi.nlm.nih.gov/28805893/','publication_date':'2017','accessed_date':'2026-08-23','tier':'C','language':'en','topics':['2.1'],'notes':'Abstract accessed; no claims beyond abstract.'},
{'id':'SRC-082','title':'Effects of heterozygosity on performance of purebred and crossbred pigs','organization':'Animal / PubMed','url':'https://pubmed.ncbi.nlm.nih.gov/30819106/','publication_date':'2019','accessed_date':'2026-08-23','tier':'C','language':'en','topics':['2.1'],'notes':'Peer-reviewed study; demonstrates trait/breed-dependent effects, not universal benchmarks.'},
{'id':'SRC-083','title':'ผลงานวิจัยสุกรลูกผสมและประสิทธิภาพในสภาพแวดล้อมต่างกัน','organization':'กรมปศุสัตว์ สำนักพัฒนาพันธุ์สัตว์','url':'https://e-wichakarn.dld.go.th/?view=article&id=70:two-crossbred-pig-productive-performance-of-department-of-livestock-development-in-difference-of-environments&catid=31','publication_date':None,'accessed_date':'2026-08-23','tier':'A','language':'th','topics':['2.1'],'notes':'Thai government research page; page extraction was incomplete, so use only metadata-supported claims.'},
{'id':'SRC-084','title':'คู่มือการปรับปรุงพันธุ์สุกร','organization':'มหาวิทยาลัยแม่โจ้','url':'https://rae.mju.ac.th/wtms_documentDownload.aspx?id=MTc0NzE=','publication_date':'2014-03-26','accessed_date':'2026-08-23','tier':'A','language':'th','topics':['2.1'],'notes':'Thai academic PDF; direct extraction returned encoded PDF content, so do not cite unverified page details.'},
{'id':'SRC-085','title':'Swine Breeding Systems for Alternative Pork Chains — target-market guidance','organization':'Michigan State University Extension','url':'https://www.canr.msu.edu/resources/swine_breeding_systems_for_alternative_pork_chains_breeding_programs','publication_date':'2012-04-02','accessed_date':'2026-08-23','tier':'A-contextual','language':'en','topics':['2.1'],'notes':'Same document, registered separately only for target-market/production-system claim mapping.'}
]
for x in items:
 if x['id'] not in existing:d['sources'].append(x)
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
