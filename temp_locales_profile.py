import json
import os

files = {
    'id': 'c:/mencari-online/apps/web/messages/id.json',
    'en': 'c:/mencari-online/apps/web/messages/en.json'
}

keys_to_add = {
    'id': {
        'noLocation': 'Belum ada lokasi'
    },
    'en': {
        'noLocation': 'No location added'
    }
}

for locale, file_path in files.items():
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    if 'profile' not in data:
        data['profile'] = {}
        
    for k, v in keys_to_add[locale].items():
        if k not in data['profile']:
            data['profile'][k] = v
            
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"Updated {locale}.json for profile.noLocation")
