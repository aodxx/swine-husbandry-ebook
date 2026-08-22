import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/research-status.json')
d=json.loads(p.read_text(encoding='utf-8'))
t=next(x for x in d['topics'] if x['id']=='2.1')
t.update({'status':'FACTS_EXTRACTED','research_started':'2026-08-23','research_completed':'2026-08-23','last_reviewed':'2026-08-23','reviewed_by':'Manus AI','source_count':7,'remaining_questions':['ตรวจรายละเอียดการใช้คำ breed/line ใน breeding program ไทยเพิ่มเติมเมื่อมีแหล่งตรง'],'notes':'Scope, authoritative source research, source evaluation, fact extraction, conflict/uncertainty check complete. No universal performance benchmark used.','subtopic_quality_gate':None})
d['current_focus']='2.1'; d['next_topic']='2.1'; d['workflow_state']='CHAPTER_2_CONTENT_PRODUCTION'
d['chapter_2_production']['current_topic']='2.1'; d['chapter_2_production']['next_topic']='2.1'
d['last_updated']='2026-08-23'
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
