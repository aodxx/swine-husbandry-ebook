import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/research-status.json')
d=json.loads(p.read_text(encoding='utf-8'))
t=next(x for x in d['topics'] if x['id']=='2.1')
t.update({'status':'EDITORIAL_REVIEW','research_started':'2026-08-23','research_completed':'2026-08-23','draft_completed':'2026-08-23','fact_checked':'2026-08-23','last_reviewed':'2026-08-23','reviewed_by':'Manus AI','source_count':7,'remaining_questions':['ทบทวนศัพท์ breed/line ใน breeding program ไทยเพิ่มเติมเมื่อมีแหล่งตรง'],'notes':'Subtopic Quality Gate passed: scope, research, source evaluation, facts, conflict check, numeric claim check, draft, fact check, citation, Thai editorial review, and scope-overlap check complete. No universal performance benchmark used.','subtopic_quality_gate':'PASS'})
d['current_focus']='2.1';d['next_topic']='2.2';d['workflow_state']='CHAPTER_2_CONTENT_PRODUCTION';d['chapter_2_production']['current_topic']='2.1';d['chapter_2_production']['next_topic']='2.2';d['last_updated']='2026-08-23'
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
