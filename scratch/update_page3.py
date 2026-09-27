import re

with open(r"c:\mencari-online\apps\web\src\app\[locale]\mydash\page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

builder_product_item = """
function BuilderProductItem({ item, onMoveUp, onMoveDown, onEdit, onMoveCategory, onMoveCollection, isFirst, isLast }: { item: any, onMoveUp?: () => void, onMoveDown?: () => void, onEdit?: () => void, onMoveCategory?: () => void, onMoveCollection?: () => void, isFirst?: boolean, isLast?: boolean }) {
  const t = useTranslations();
  const [isSettingPopupOpen, setIsSettingPopupOpen] = useState(false);
  const [popupPos, setPopupPos] = useState<{top?: number, bottom?: number, right: number} | null>(null);
  const settingRef = useRef<HTMLDivElement>(null);
  const settingBtnRef = useRef<HTMLButtonElement>(null);

  const openSettingPopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSettingPopupOpen) {
      setIsSettingPopupOpen(false);
      setPopupPos(null);
      return;
    }
    if (settingBtnRef.current) {
      const rect = settingBtnRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      
      if (spaceBelow < 250) {
        setPopupPos({ bottom: window.innerHeight - rect.top + 6, right: window.innerWidth - rect.right });
      } else {
        setPopupPos({ top: rect.bottom + 6, right: window.innerWidth - rect.right });
      }
    }
    setIsSettingPopupOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (settingBtnRef.current && !settingBtnRef.current.closest('[data-setting-popup]') && !target.closest('[data-setting-popup]') && !settingBtnRef.current.contains(target)) {
        setIsSettingPopupOpen(false);
        setPopupPos(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-transparent p-3.5 rounded-xl shadow-sm border border-gray-200 dark:border-[#3E4042] flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-[#3A3B3C] transition-colors group ml-2" style={{ viewTransitionName: item.id ? `item-${item.id}` : undefined }}>
      <div className="flex-1 flex items-center gap-3 cursor-pointer group/itemclick min-w-0">
        <div className="w-9 h-9 shrink-0 bg-gray-100 dark:bg-[#E4E6EB] rounded-lg flex items-center justify-center overflow-hidden">
          <img src="/produk-placeholder.png" alt="Icon" className="w-full h-full object-cover opacity-80" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </div>
        <div className="flex-1 text-[13px] text-gray-700 dark:text-[#E4E6EB] font-medium leading-snug pr-2 truncate group-hover/itemclick:underline">
          {item.title}
        </div>
      </div>
      <div className="relative flex items-center shrink-0" ref={settingRef}>
        <button ref={settingBtnRef} onClick={openSettingPopup} className="text-gray-400 hover:text-gray-600 dark:hover:text-[#E4E6EB]">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
        </button>
        {isSettingPopupOpen && popupPos && createPortal(
          <div
            data-setting-popup
            className="fixed bg-white dark:bg-[#2A2B2C] border border-gray-200 dark:border-[#4E4F50] rounded-xl min-w-[200px] z-50 py-1"
            style={{ 
              ...(popupPos.top !== undefined ? { top: popupPos.top } : {}), 
              ...(popupPos.bottom !== undefined ? { bottom: popupPos.bottom } : {}), 
              right: popupPos.right, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.22)' 
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors"
              onClick={(e) => { e.stopPropagation(); onEdit?.(); setIsSettingPopupOpen(false); setPopupPos(null); }}
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              {t("mydash.edit_produk") || "Edit Produk"}
            </button>
            <div className="border-t border-gray-100 dark:border-[#3E4042] my-1" />
            <button
              disabled={isFirst}
              className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={(e) => { e.stopPropagation(); onMoveUp?.(); setIsSettingPopupOpen(false); setPopupPos(null); }}
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
              Geser ke Atas
            </button>
            <button
              disabled={isLast}
              className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={(e) => { e.stopPropagation(); onMoveDown?.(); setIsSettingPopupOpen(false); setPopupPos(null); }}
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              Geser ke Bawah
            </button>
            <div className="border-t border-gray-100 dark:border-[#3E4042] my-1" />
            <button
              className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors"
              onClick={(e) => { e.stopPropagation(); onMoveCategory?.(); setIsSettingPopupOpen(false); setPopupPos(null); }}
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
              Pindah Kategori
            </button>
            <button
              className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors"
              onClick={(e) => { e.stopPropagation(); onMoveCollection?.(); setIsSettingPopupOpen(false); setPopupPos(null); }}
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              {t("mydash.pindah_koleksi")}
            </button>
            <div className="border-t border-gray-100 dark:border-[#3E4042] my-1" />
            <button
              className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); setIsSettingPopupOpen(false); setPopupPos(null); }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              Hapus Produk
            </button>
          </div>,
          document.body
        )}
      </div>
    </div>
  );
}

"""

# Insert BuilderProductItem before BuilderCategoryItem
content = content.replace("function BuilderCategoryItem", builder_product_item + "function BuilderCategoryItem")

# Replace product item block in BuilderCollectionItem mapping
product_block_regex = r'if \(item\.type === "product"\) \{.*?return \(\s*<div key=\{itemIdx\}.*?</div>\s*\);\s*\} else if \(item\.type === "category"\)'
replacement = """if (item.type === "product") {
                return (
                  <BuilderProductItem
                    key={itemIdx}
                    item={item}
                    isFirst={itemIdx === 0}
                    isLast={itemIdx === collection.items.length - 1}
                    onMoveUp={() => moveItem(index, itemIdx, 'up')}
                    onMoveDown={() => moveItem(index, itemIdx, 'down')}
                    onEdit={() => console.log('Edit product')}
                    onMoveCategory={() => console.log('Move to Category')}
                    onMoveCollection={() => console.log('Move to Collection')}
                  />
                );
              } else if (item.type === "category")"""

content = re.sub(product_block_regex, replacement, content, flags=re.DOTALL)

# Add hapus_koleksi to json files
import json

updates_id = {
    'hapus_koleksi': 'Hapus Koleksi',
    'edit_produk': 'Edit Produk',
}

updates_en = {
    'hapus_koleksi': 'Delete Collection',
    'edit_produk': 'Edit Product',
}

paths = [
    r'c:\mencari-online\apps\web\messages\id.json',
    r'c:\mencari-online\apps\web\messages\en.json'
]

for p in paths:
    with open(p, 'r', encoding='utf-8') as file:
        data = json.load(file)
    
    if 'mydash' not in data:
        data['mydash'] = {}
        
    updates = updates_id if 'id.json' in p else updates_en
    for k, v in updates.items():
        data['mydash'][k] = v
        
    with open(p, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=2, ensure_ascii=False)


with open("scratch/page_temp3.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Phase 3 done")
