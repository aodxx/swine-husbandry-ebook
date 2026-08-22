import json
from pathlib import Path

p = Path('/home/ubuntu/swine-husbandry-ebook/data/research-status.json')
d = json.loads(p.read_text(encoding='utf-8'))
for topic_id, source_count, note in [
    ('1.10', 7, 'Subtopic Quality Gate passed: scope, research, source evaluation, facts, conflict check, draft, fact check, citation check, editorial self-review, and validation complete.'),
    ('1.11', 8, 'Subtopic Quality Gate passed: scope, research, source evaluation, facts, conflict check, draft, fact check, citation check, editorial self-review, glossary sync, and validation complete.'),
]:
    topic = next(t for t in d['topics'] if t['id'] == topic_id)
    topic.update({
        'status': 'EDITORIAL_REVIEW',
        'research_started': '2026-08-23',
        'research_completed': '2026-08-23',
        'draft_completed': '2026-08-23',
        'fact_checked': '2026-08-23',
        'approved': None,
        'last_reviewed': '2026-08-23',
        'reviewed_by': 'Manus AI',
        'source_count': source_count,
        'remaining_questions': [],
        'notes': note,
        'subtopic_quality_gate': 'PASS',
    })
d['current_focus'] = '1.11'
d['next_topic'] = '1.11'
d['last_updated'] = '2026-08-23'
p.write_text(json.dumps(d, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
