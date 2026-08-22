import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/research-status.json')
d=json.loads(p.read_text(encoding='utf-8'))
t=next(x for x in d['topics'] if x['id']=='2.2')
t.update({'status':'DRAFTED','research_started':'2026-08-23','research_completed':'2026-08-23','draft_completed':'2026-08-23','last_reviewed':'2026-08-23','reviewed_by':'Manus AI','source_count':6,'remaining_questions':['ตรวจข้อความต้นฉบับของหน้า DLD Large White เมื่อเว็บไซต์เข้าถึงได้'],'notes':'Scope, research questions, source evaluation, facts, conflicts and draft complete. DLD pages were retained as contextual leads only because direct retrieval was unavailable. No universal performance benchmark used.'})
d['current_focus']='2.2';d['next_topic']='2.2';d['chapter_2_production']['current_topic']='2.2';d['chapter_2_production']['next_topic']='2.2';d['last_updated']='2026-08-23'
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
