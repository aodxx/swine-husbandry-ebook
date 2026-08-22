import json
from pathlib import Path
path=Path('/home/ubuntu/swine-husbandry-ebook/data/research-status.json')
data=json.loads(path.read_text())
sources=json.loads(Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json').read_text())
data['last_updated']='2026-08-23'
data['current_focus']='3.1'
data['next_topic']='3.1'
data['workflow_state']='CHAPTER_2_CLOSED_CHAPTER_3_LOCKED'
data['chapter_closures']['2']={
    'status':'FULL_CHAPTER_AUDITED',
    'closed_date':'2026-08-23',
    'subtopics':[f'2.{i}' for i in range(1,16)],
    'source_count':sum(1 for s in sources['sources'] if any(t.startswith('2.') and int(t.split('.')[1]) <= 15 for t in s.get('topics',[]))),
    'audit_report':'docs/audits/chapter-02-full-audit.md',
    'validation':'PASS',
    'owner_review_required':True,
    'next_topic':'3.1',
    'next_topic_locked':True,
    'notes':'Full Chapter 2 Quality Audit completed. Chapter 3 must not start until separately authorized.'
}
data['chapter_2_production'].update({
    'status':'FULL_CHAPTER_AUDITED',
    'current_topic':'2.15',
    'next_topic':'3.1',
    'next_topic_locked':True,
    'do_not_start_chapter_3':True,
    'audit_report':'docs/audits/chapter-02-full-audit.md'
})
path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
