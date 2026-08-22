import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/research-status.json')
d=json.loads(p.read_text(encoding='utf-8'))
for t in d['topics']:
    if t['id']=='3.3':
        t.update({'status':'EDITORIAL_REVIEW','research_started':'2026-08-23','research_completed':'2026-08-23','draft_completed':'2026-08-23','fact_checked':'2026-08-23','last_reviewed':'2026-08-23','reviewed_by':'Manus AI','source_count':4,'subtopic_quality_gate':'PASS','remaining_questions':['ต้องทบทวนเป้าหมายเมื่อข้อมูลตลาด ต้นทุน หรือข้อกำหนดเปลี่ยน']})
d['current_focus']='3.4'; d['next_topic']='3.4'; d['chapter_3_production']['current_topic']='3.4'; d['chapter_3_production']['next_topic']='3.4'; d['last_updated']='2026-08-23'
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
