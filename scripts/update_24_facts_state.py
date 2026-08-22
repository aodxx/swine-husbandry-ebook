import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/research-status.json')
d=json.loads(p.read_text(encoding='utf-8'));t=next(x for x in d['topics'] if x['id']=='2.4')
t.update({'status':'FACTS_EXTRACTED','research_started':'2026-08-23','research_completed':'2026-08-23','last_reviewed':'2026-08-23','reviewed_by':'Manus AI','source_count':5,'remaining_questions':['ไม่มีตัวเลข benchmark ที่เหมาะสม; ผล DLD เป็นของ crossbred prototype และต้องคงข้อจำกัด'],'notes':'Scope, source evaluation, fact extraction and conflict/uncertainty check complete. No universal Duroc performance benchmark used.'})
d['current_focus']='2.4';d['next_topic']='2.4';d['chapter_2_production']['current_topic']='2.4';d['chapter_2_production']['next_topic']='2.4';d['last_updated']='2026-08-23'
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
