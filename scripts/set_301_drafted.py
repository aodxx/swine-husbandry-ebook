import json
from pathlib import Path
path=Path('/home/ubuntu/swine-husbandry-ebook/data/research-status.json')
data=json.loads(path.read_text(encoding='utf-8'))
for topic in data['topics']:
    if topic['id']=='3.1':
        topic.update({'status':'DRAFTED','research_started':'2026-08-23','research_completed':'2026-08-23','draft_completed':'2026-08-23','source_count':4,'last_reviewed':'2026-08-23','reviewed_by':'Manus AI','risk_level':'high','remaining_questions':['ต้องตรวจข้อกำหนดท้องถิ่นและกฎหมายสิ่งแวดล้อมฉบับปัจจุบันตามที่ตั้งจริงก่อนลงทุน']})
data['current_focus']='3.1'
data['next_topic']='3.1'
data['workflow_state']='CHAPTER_3_CONTENT_PRODUCTION'
data['chapter_3_production']['current_topic']='3.1'
data['chapter_3_production']['next_topic']='3.1'
data['last_updated']='2026-08-23'
path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
