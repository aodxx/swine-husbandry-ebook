import json
from pathlib import Path
path=Path('/home/ubuntu/swine-husbandry-ebook/data/research-status.json')
data=json.loads(path.read_text())
for topic in data['topics']:
    if topic['id']=='2.12':
        topic.update({
            'status':'EDITORIAL_REVIEW',
            'research_started':'2026-08-23',
            'research_completed':'2026-08-23',
            'draft_completed':'2026-08-23',
            'fact_checked':'2026-08-23',
            'last_reviewed':'2026-08-23',
            'reviewed_by':'Manus AI',
            'source_count':4,
            'subtopic_quality_gate':'PASS',
            'remaining_questions':['ไม่มี benchmark ตัวเลขสากลที่ใช้แทน baseline ของทุกระบบไทยได้']
        })
data['current_focus']='2.12'
data['next_topic']='2.13'
data['chapter_2_production']['current_topic']='2.12'
data['chapter_2_production']['next_topic']='2.13'
data['last_updated']='2026-08-23'
path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
