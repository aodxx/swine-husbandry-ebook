import json
from pathlib import Path
path=Path('/home/ubuntu/swine-husbandry-ebook/data/research-status.json')
data=json.loads(path.read_text())
for topic in data['topics']:
    if topic['id']=='2.12':
        topic.update({'status':'DRAFTED','research_started':'2026-08-23','research_completed':'2026-08-23','draft_completed':'2026-08-23','source_count':4,'last_reviewed':'2026-08-23','reviewed_by':'Manus AI'})
data['current_focus']='2.12'
data['next_topic']='2.13'
data['chapter_2_production']['current_topic']='2.12'
data['chapter_2_production']['next_topic']='2.13'
data['last_updated']='2026-08-23'
path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
