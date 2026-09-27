import json

paths = [
    r'c:\mencari-online\apps\web\messages\id.json',
    r'c:\mencari-online\apps\web\messages\en.json'
]

updates_id = {
    'hapus_koleksi': 'Hapus Koleksi',
    'edit_produk': 'Edit Produk',
    'geser_ke_atas': 'Geser ke Atas',
    'geser_ke_bawah': 'Geser ke Bawah',
    'pindah_kategori': 'Pindah Kategori',
    'hapus_produk': 'Hapus Produk'
}

updates_en = {
    'hapus_koleksi': 'Delete Collection',
    'edit_produk': 'Edit Product',
    'geser_ke_atas': 'Move Up',
    'geser_ke_bawah': 'Move Down',
    'pindah_kategori': 'Move to Category',
    'hapus_produk': 'Delete Product'
}

for p in paths:
    with open(p, 'r', encoding='utf-8') as f:
        data = json.load(f)
    if 'mydash' not in data:
        data['mydash'] = {}
    updates = updates_id if 'id.json' in p else updates_en
    for k, v in updates.items():
        data['mydash'][k] = v
    with open(p, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

print("Localization added")
