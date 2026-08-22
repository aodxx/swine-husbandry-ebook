import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/research-status.json')
d=json.loads(p.read_text(encoding='utf-8'))
for t in d['topics']:
    if t['id'].startswith('3.'):
        t['chapter_status']='FULL_CHAPTER_AUDITED'
    if t['id'].startswith('4.'):
        t['status']='TODO'
        t.pop('locked_reason',None)
d['workflow_state']='CHAPTER_3_CLOSED_CHAPTER_4_LOCKED'
d['current_focus']='3.12'
d['next_topic']='4.1'
d['chapter_3_production'].update({'status':'FULL_CHAPTER_AUDITED','current_topic':'3.12','next_topic':'4.1','completed_subtopics':'3.1-3.12','audit_status':'DONE','do_not_start_chapter_4':True,'ready_for_owner_review':True})
d['chapter_4_locked']=True
d['chapter_4_lock_reason']='Chapter 3 closed after Full Chapter 3 Quality Audit; do not start Chapter 4 without owner instruction.'
d['last_updated']='2026-08-23'
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
