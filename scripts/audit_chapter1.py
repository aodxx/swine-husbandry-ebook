import re, json
from pathlib import Path
root=Path('/home/ubuntu/swine-husbandry-ebook')
status=json.loads((root/'data/research-status.json').read_text(encoding='utf-8'))
files=sorted((root/'content/part-01/chapter-01').glob('*.md'), key=lambda p: float(p.stem))
print('CHAPTER 1 FILES', len(files))
for f in files:
 text=f.read_text(encoding='utf-8')
 fm=text.split('---',2)[1] if text.startswith('---') else ''
 title=re.search(r'^title:\s*["\']?(.*?)["\']?$',fm,re.M)
 st=re.search(r'^status:\s*["\']?(.*?)["\']?$',fm,re.M)
 ids=re.findall(r'^\s*-\s*["\'](SRC-\d+)["\']',fm,re.M)
 cites=sorted(set(re.findall(r'\[(\d+)\]',text)))
 print(f.name, 'status='+str(st.group(1) if st else None), 'sources='+str(ids), 'numeric_cites='+str(cites), 'chars='+str(len(text)))
# selected overlap terms across files
terms=['farrow-to-finish','multi-site','AIAO','อาหาร','สุขภาพ','ตลาด','พ่อแม่พันธุ์','ลูกสุกร','สุกรขุน','ข้อมูล']
for term in terms:
 hits=[]
 for f in files:
  n=f.read_text(encoding='utf-8').count(term)
  if n: hits.append(f'{f.stem}:{n}')
 print('TERM',term,' '.join(hits))
