import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/research-status.json'); d=json.loads(p.read_text(encoding='utf-8'))
for t in d['topics']:
 if t['id']=='3.10': t.update({'status':'DRAFTED','research_started':'2026-08-23','research_completed':'2026-08-23','draft_completed':'2026-08-23','source_count':6,'last_reviewed':'2026-08-23','reviewed_by':'Manus AI','risk_level':'high','remaining_questions':['ต้องใส่ราคาจริงจากเอกสาร ณ วันที่ตัดสินใจ และตรวจสมมติฐานกับผู้ทำบัญชี/ผู้เชี่ยวชาญ']})
d['current_focus']='3.10'; d['next_topic']='3.10'; d['chapter_3_production']['current_topic']='3.10'; d['chapter_3_production']['next_topic']='3.10'; d['last_updated']='2026-08-23'
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
