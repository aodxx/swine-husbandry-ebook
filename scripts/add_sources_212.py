import json
from pathlib import Path

path = Path('/home/ubuntu/swine-husbandry-ebook/data/sources.json')
data = json.loads(path.read_text())
existing = {item['id'] for item in data['sources']}
items = [
    {
        'id': 'SRC-125',
        'title': 'Gilt Management for Fertility and Longevity',
        'organization': 'University of Alberta / Animals',
        'url': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6680739/',
        'publication_date': '2019', 'accessed_date': '2026-08-23', 'tier': 'C', 'language': 'en',
        'topics': ['2.12'],
        'notes': 'Peer-reviewed review; principles are context-specific and not universal Thai benchmarks.'
    },
    {
        'id': 'SRC-126',
        'title': 'Genetic aspects of piglet survival and related traits: a review',
        'organization': 'Journal of Animal Science / Oxford Academic',
        'url': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9202567/',
        'publication_date': '2022', 'accessed_date': '2026-08-23', 'tier': 'C', 'language': 'en',
        'topics': ['2.12'],
        'notes': 'Peer-reviewed review; quantitative relationships depend on population and production system.'
    },
    {
        'id': 'SRC-127',
        'title': 'Traits Defining Sow Lifetime Maternal Performance',
        'organization': 'Animals / MDPI',
        'url': 'https://www.mdpi.com/2076-2615/12/18/2451',
        'publication_date': '2022', 'accessed_date': '2026-08-23', 'tier': 'C', 'language': 'en',
        'topics': ['2.12'],
        'notes': 'Peer-reviewed study; parity and environment affect interpretation; no universal Thai targets.'
    },
    {
        'id': 'SRC-128',
        'title': 'Selection Programs for Seedstock Producers',
        'organization': 'National Swine Improvement Federation / Pork Gateway',
        'url': 'https://porkgateway.org/resource/selection-programs-for-seedstock-producers/',
        'publication_date': None, 'accessed_date': '2026-08-23', 'tier': 'D', 'language': 'en',
        'topics': ['2.12'],
        'notes': 'Technical factsheet; used for selection objectives, EPD, accuracy and indexes; US context.'
    }
]
for item in items:
    if item['id'] not in existing:
        data['sources'].append(item)
data['last_updated'] = '2026-08-23'
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
