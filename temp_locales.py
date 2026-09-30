import json
import os

files = {
    'id': 'c:/mencari-online/apps/web/messages/id.json',
    'en': 'c:/mencari-online/apps/web/messages/en.json'
}

keys_to_add = {
    'id': {
        'editPost': 'Edit Postingan',
        'deletePost': 'Hapus Postingan',
        'confirmDelete': 'Apakah Anda yakin ingin menghapus postingan ini?'
    },
    'en': {
        'editPost': 'Edit Post',
        'deletePost': 'Delete Post',
        'confirmDelete': 'Are you sure you want to delete this post?'
    }
}

for locale, file_path in files.items():
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    if 'postMenu' not in data:
        data['postMenu'] = {}
        
    for k, v in keys_to_add[locale].items():
        if k not in data['postMenu']:
            data['postMenu'][k] = v
            
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"Updated {locale}.json")
