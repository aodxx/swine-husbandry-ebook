import json
from pathlib import Path
path=Path('/home/ubuntu/swine-husbandry-ebook/data/research-status.json')
data=json.loads(path.read_text())
data['last_updated']='2026-08-23'
data['workflow_state']='CHAPTER_3_CONTENT_PRODUCTION'
data['current_focus']='3.1'
data['next_topic']='3.1'
data['chapter_2_production']['do_not_start_chapter_3']=False
data['chapter_2_production']['next_topic_locked']=False
data['chapter_3_production']={
    'status':'IN_PROGRESS',
    'current_topic':'3.1',
    'next_topic':'3.1',
    'one_subtopic_at_a_time':True,
    'golden_chapter_reference':'1',
    'golden_chapter_2_reference':'2',
    'stop_after':'3.12',
    'do_not_start_chapter_4':True,
    'legal_dynamic_review_required':True,
    'cost_claim_policy':'EXAMPLE_ONLY unless current Thai source is verified'
}
path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
