import json
from pathlib import Path
p=Path('/home/ubuntu/swine-husbandry-ebook/data/research-status.json')
d=json.loads(p.read_text(encoding='utf-8'))
d['last_updated']='2026-08-23'
d['current_focus']='2.1'
d['next_topic']='2.1'
d['workflow_state']='CHAPTER_2_CONTENT_PRODUCTION'
d['chapter_closures']['1']['next_topic_locked']=False
d['chapter_closures']['1']['notes']='Chapter 1 closure completed and Owner Review passed. Chapter 2 content production is now authorized.'
d['chapter_2_production']={'status':'IN_PROGRESS','current_topic':'2.1','next_topic':'2.1','one_subtopic_at_a_time':True,'golden_chapter_reference':'1','stop_after':'2.15','do_not_start_chapter_3':True}
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
