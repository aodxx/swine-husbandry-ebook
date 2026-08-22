#!/usr/bin/env python3
from __future__ import annotations
import json, re, sys
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
VALID={'TODO','RESEARCHING','SOURCES_COLLECTED','FACTS_EXTRACTED','DRAFTED','FACT_CHECKED','EDITORIAL_REVIEW','APPROVED','PUBLISHED','BLOCKED','HIGH_RISK_REVIEW','PENDING_FARM_HISTORY','NEEDS_UPDATE'}

class ValidationError(Exception): pass

def load(name): return json.loads((ROOT/name).read_text(encoding='utf-8'))
def fail(errors):
    if errors:
        for e in errors: print('FAIL:',e)
        raise SystemExit(1)

def parse_frontmatter(path):
    text=path.read_text(encoding='utf-8')
    if not text.startswith('---\n'): raise ValidationError(f'{path}: missing YAML front matter')
    end=text.find('\n---',4)
    if end<0: raise ValidationError(f'{path}: unterminated front matter')
    raw=text[4:end].splitlines(); data={}; list_key=None
    for line in raw:
        if not line.strip(): continue
        if re.match(r'^\s+-\s+',line):
            if list_key is None: raise ValidationError(f'{path}: list item without key')
            data.setdefault(list_key,[]).append(line.split('-',1)[1].strip().strip('"\'')); continue
        if ':' not in line: raise ValidationError(f'{path}: malformed front matter line: {line}')
        k,v=line.split(':',1); k=k.strip(); v=v.strip(); list_key=None
        if not v: data[k]=[]; list_key=k; continue
        v=v.strip('"\'')
        if v=='true': v=True
        elif v=='false': v=False
        elif re.fullmatch(r'-?\d+',v): v=int(v)
        data[k]=v
    return data,text[end+4:]

def topics_by_id():
    toc=load('data/toc.json'); out={}; errors=[]
    for part in toc.get('parts',[]):
      for ch in part.get('chapters',[]):
       for topic in ch.get('topics',[]):
        tid=topic.get('id')
        if tid in out: errors.append(f'duplicate TOC topic ID: {tid}')
        out[tid]={'topic':topic,'part':part.get('part'),'chapter':ch.get('chapter')}
    return out,errors

def status_map():
    d=load('data/research-status.json'); out={}; errors=[]
    allowed=set(d.get('allowed_statuses',[]))
    if allowed != VALID: errors.append(f'allowed_statuses mismatch: expected {sorted(VALID)}, got {sorted(allowed)}')
    for t in d.get('topics',[]):
        tid=t.get('id')
        if tid in out: errors.append(f'duplicate status topic ID: {tid}')
        out[tid]=t
        if t.get('status') not in VALID: errors.append(f'{tid}: invalid status {t.get("status")}')
    return d,out,errors

def source_map():
    d=load('data/sources.json'); records=d.get('sources',d) if isinstance(d,dict) else d; out={}; errors=[]
    for s in records:
        sid=s.get('id')
        if sid in out: errors.append(f'duplicate source ID: {sid}')
        out[sid]=s
        for k in ('title','url','tier','accessed_date'):
            if not s.get(k): errors.append(f'{sid}: missing source field {k}')
    return out,errors

def content_files(): return sorted((ROOT/'content').glob('part-*/chapter-*/*.md'))

def validate_toc():
    toc=load('data/toc.json'); ids,errors=topics_by_id()
    if len(ids)!=338: errors.append(f'TOC topic count is {len(ids)}, expected 338')
    for tid,x in ids.items():
        expected=f'/book/{x["part"]}/{x["chapter"]}' if False else None
        # Existing path convention is /book/{chapter}/{topic-number}; verify syntax and uniqueness.
        path=x['topic'].get('path','')
        if not re.fullmatch(r'/book/\d+/\d+',path): errors.append(f'{tid}: invalid TOC path {path}')
    paths=[x['topic'].get('path') for x in ids.values()]
    if len(paths)!=len(set(paths)): errors.append('duplicate TOC paths')
    fail(errors); print(f'TOC VALIDATION: PASS ({len(ids)} unique topics)')

def validate_sources():
    sm,errors=source_map(); ids,te=topics_by_id(); errors+=te
    for sid,s in sm.items():
        if not re.match(r'^SRC-\d{3}$',sid): errors.append(f'invalid source ID: {sid}')
        if not isinstance(s.get('topics'),list): errors.append(f'{sid}: topics must be a list')
        for tid in s.get('topics',[]):
            if tid not in ids: errors.append(f'{sid}: references missing TOC topic {tid}')
    for p in content_files():
        try: fm,_=parse_frontmatter(p)
        except ValidationError as e: errors.append(str(e)); continue
        for sid in fm.get('source_ids',[]):
            if sid not in sm: errors.append(f'{p}: missing source {sid}')
    fail(errors); print(f'SOURCE VALIDATION: PASS ({len(sm)} unique sources)')

def validate_status():
    sd,states,errors=status_map(); toc,te=topics_by_id(); errors+=te
    if set(states)!=set(toc): errors.append(f'status/TOC ID set mismatch: status={len(states)} toc={len(toc)}')
    focus=sd.get('current_focus'); nxt=sd.get('next_topic')
    if focus not in toc: errors.append(f'current_focus missing from TOC: {focus}')
    if nxt not in toc: errors.append(f'next_topic missing from TOC: {nxt}')
    if focus=='1.2' and states.get('1.1',{}).get('subtopic_quality_gate')!='PASS': errors.append('cannot focus 1.2 before 1.1 Subtopic Quality Gate PASS')
    if focus=='1.1' and nxt!='1.2': errors.append('initial focus 1.1 must point to next topic 1.2')
    sm,se=source_map(); errors+=se
    for p in content_files():
        try: fm,_=parse_frontmatter(p)
        except ValidationError as e: errors.append(str(e)); continue
        tid=fm.get('id'); st=states.get(tid)
        if not st: errors.append(f'{p}: topic ID missing from status registry'); continue
        if fm.get('status') != st.get('status'): errors.append(f'{tid}: content status {fm.get("status")} != registry {st.get("status")}')
        for sid in fm.get('source_ids',[]):
            if sid not in sm: errors.append(f'{tid}: source {sid} missing')
        if fm.get('status') in {'APPROVED','PUBLISHED'} and not st.get('approved'):
            errors.append(f'{tid}: {fm.get("status")} requires approved date in registry')
        if 'PENDING_FARM_HISTORY' in fm.get('status','') and not fm.get('farm_context',False):
            errors.append(f'{tid}: heritage status requires farm_context=true')
        text=p.read_text(encoding='utf-8')
        if fm.get('farm_context') is True and any(x in text for x in ['นิพนธ์ฟาร์มเคย','เจ้าของฟาร์มกล่าว','ฟาร์มของเราเคย']):
            errors.append(f'{tid}: possible unsupported farm-history claim')
    fail(errors); print(f'STATE VALIDATION: PASS ({len(states)} topics, content statuses synchronized)')

def validate_content():
    _status_doc,states,st_errors=status_map(); toc,t_errors=topics_by_id(); sm,s_errors=source_map(); errors=st_errors+t_errors+s_errors
    for p in content_files():
        try: fm,body=parse_frontmatter(p)
        except ValidationError as e: errors.append(str(e)); continue
        req=['id','part','chapter','title','status','content_version','last_reviewed','reviewed_by','risk_level','farm_context','source_ids','tags']
        for k in req:
            if k not in fm: errors.append(f'{p}: missing front matter {k}')
        tid=fm.get('id'); st=states.get(tid); tx=toc.get(tid)
        if not st: errors.append(f'{p}: topic ID {tid} missing from status registry')
        if not tx: errors.append(f'{p}: topic ID {tid} missing from TOC')
        if st and fm.get('status')!=st.get('status'): errors.append(f'{tid}: status mismatch content={fm.get("status")} registry={st.get("status")}')
        if tx:
            if fm.get('title')!=tx['topic'].get('title'): errors.append(f'{tid}: title mismatch with TOC')
            expected=ROOT/'content'/f'part-{int(tx["part"]):02d}'/f'chapter-{int(tx["chapter"]):02d}'/f'{tid}.md'
            if p.resolve()!=expected.resolve(): errors.append(f'{tid}: TOC path mismatch; expected {expected.relative_to(ROOT)}')
        cites=set(int(x) for x in re.findall(r'(?<!\])\[([1-9]\d*)\]',body)); refs=set(int(x) for x in re.findall(r'^\[([1-9]\d*)\]:',body,re.M))
        if cites!=refs: errors.append(f'{tid}: citation/reference mismatch inline={sorted(cites)} refs={sorted(refs)}')
        for sid in fm.get('source_ids',[]):
            if sid not in sm: errors.append(f'{tid}: missing source {sid}')
        if fm.get('status') in {'APPROVED','PUBLISHED'} and (not st or not st.get('approved')): errors.append(f'{tid}: published/approved gate failed')
        if fm.get('farm_context') is True and any(x in body for x in ['นิพนธ์ฟาร์มเคย','เจ้าของฟาร์มกล่าว','ฟาร์มของเราเคย']): errors.append(f'{tid}: farm-history restriction failed')
    fail(errors); print(f'CONTENT VALIDATION: PASS ({len(content_files())} content files)')

def main(cmd):
    {'toc':validate_toc,'sources':validate_sources,'status':validate_status,'content':validate_content}[cmd]()
if __name__=='__main__': main(sys.argv[1])
