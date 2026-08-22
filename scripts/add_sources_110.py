import json
from pathlib import Path

path = Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json')
data = json.loads(path.read_text(encoding='utf-8'))
existing = {s['id'] for s in data['sources']}
new_sources = [
    {
        'id': 'SRC-064',
        'title': 'Scheduling All-In All-Out Swine Production',
        'organization': 'Pork Information Gateway',
        'url': 'https://porkgateway.org/resource/scheduling-all-in-all-out-swine-production/',
        'publication_date': None,
        'accessed_date': '2026-08-23',
        'tier': 'B',
        'language': 'en',
        'topics': ['1.10'],
        'notes': 'Technical production-flow source on AIAO, group movement, and farrow-to-finish phases; U.S. context and no Thai targets.'
    },
    {
        'id': 'SRC-065',
        'title': 'Hogs & Pork: Sector at a Glance',
        'organization': 'USDA Economic Research Service',
        'url': 'https://www.ers.usda.gov/topics/animal-products/hogs-pork/sector-at-a-glance',
        'publication_date': '2025',
        'accessed_date': '2026-08-23',
        'tier': 'A',
        'language': 'en',
        'topics': ['1.10'],
        'notes': 'Government source defining U.S. production enterprises and biological cycle; all numeric claims are U.S.-specific.'
    },
    {
        'id': 'SRC-066',
        'title': 'What is the Lifecycle of a Pig in Market Production?',
        'organization': 'UC Davis CLEAR Center',
        'url': 'https://clear.ucdavis.edu/explainers/what-lifecycle-pig-market-production',
        'publication_date': '2023',
        'accessed_date': '2026-08-23',
        'tier': 'A-contextual',
        'language': 'en',
        'topics': ['1.10'],
        'notes': 'University extension explainer for birth-to-market lifecycle; supplemental U.S. context and Pork Checkoff support disclosed.'
    },
    {
        'id': 'SRC-067',
        'title': 'Animal welfare and pig production systems, Terrestrial Animal Health Code Chapter 7.13',
        'organization': 'WOAH',
        'url': 'https://www.woah.org/fileadmin/Home/eng/Health_standards/tahc/2018/en_chapitre_aw_pigs.htm',
        'publication_date': '2018',
        'accessed_date': '2026-08-23',
        'tier': 'B',
        'language': 'en',
        'topics': ['1.10'],
        'notes': 'International standard defining commercial pig production systems and context-dependent welfare indicators; not a production-flow manual.'
    },
    {
        'id': 'SRC-068',
        'title': 'Utilizing productivity and health breeding-to-market data to identify risk factors associated with wean-to-finish mortality',
        'organization': 'Frontiers in Veterinary Science / Magalhães et al.',
        'url': 'https://www.frontiersin.org/journals/veterinary-science/articles/10.3389/fvets.2023.1301392/full',
        'publication_date': '2024',
        'accessed_date': '2026-08-23',
        'tier': 'C',
        'language': 'en',
        'topics': ['1.10'],
        'notes': 'Peer-reviewed U.S. retrospective study supporting linked breeding-to-market data; findings are system-specific and not Thai benchmarks.'
    },
    {
        'id': 'SRC-069',
        'title': 'การค้นเอกสารไทยด้าน taxonomy ระบบการผลิตสุกร',
        'organization': 'Research log — Thai authoritative-source search',
        'url': 'https://moopakchong.org/knowledge/pig-farming.html',
        'publication_date': None,
        'accessed_date': '2026-08-23',
        'tier': 'A-search-not-verified',
        'language': 'th',
        'topics': ['1.10'],
        'notes': 'Search result/log: no single Thai Tier A document with directly verifiable full production-flow taxonomy was found; not used as core evidence.'
    }
]
for source in new_sources:
    if source['id'] not in existing:
        data['sources'].append(source)
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print('added', [s['id'] for s in new_sources if s['id'] not in existing])
