import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/research-status.json')
d=json.loads(p.read_text(encoding='utf-8'));t=next(x for x in d['topics'] if x['id']=='2.5')
t.update({'status':'EDITORIAL_REVIEW','research_started':'2026-08-23','research_completed':'2026-08-23','draft_completed':'2026-08-23','fact_checked':'2026-08-23','last_reviewed':'2026-08-23','reviewed_by':'Manus AI','source_count':5,'remaining_questions':['ยังไม่มีข้อมูลไทยที่เปรียบเทียบ Pietrain ทุก line และยังไม่ควรสรุป prevalence/risk ของ RYR1 ในประชากรไทยจากแหล่งต่างประเทศ'],'notes':'Subtopic Quality Gate passed with additional high-risk review. RYR1/porcine malignant hyperthermia is limited to genetics and evidence interpretation; no diagnosis, treatment, medication or vaccine advice. No universal Pietrain performance benchmark used.','subtopic_quality_gate':'PASS'})
d['current_focus']='2.5';d['next_topic']='2.6';d['chapter_2_production']['current_topic']='2.5';d['chapter_2_production']['next_topic']='2.6';d['last_updated']='2026-08-23'
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
