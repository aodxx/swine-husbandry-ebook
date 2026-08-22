import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/research-status.json')
d=json.loads(p.read_text(encoding='utf-8'));t=next(x for x in d['topics'] if x['id']=='2.5')
t.update({'status':'DRAFTED','research_started':'2026-08-23','research_completed':'2026-08-23','draft_completed':'2026-08-23','last_reviewed':'2026-08-23','reviewed_by':'Manus AI','source_count':5,'remaining_questions':['ยังต้องตรวจ high-risk content เรื่อง RYR1/porcine malignant hyperthermia เพิ่มหนึ่งรอบก่อนปิด Quality Gate'],'notes':'Scope, source evaluation, fact extraction, conflict check and draft complete. RYR1/stress susceptibility is handled as high-risk genetics content with no diagnosis or treatment advice; no universal Pietrain benchmark used.'})
d['current_focus']='2.5';d['next_topic']='2.5';d['chapter_2_production']['current_topic']='2.5';d['chapter_2_production']['next_topic']='2.5';d['last_updated']='2026-08-23'
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
