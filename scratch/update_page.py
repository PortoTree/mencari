import re

with open(r"c:\mencari-online\apps\web\src\app\[locale]\mydash\page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace the BuilderCategoryItem move icon manually:
cat_move_regex = r'<div className="relative flex items-center shrink-0 move-popup-container".*?alt="Move".*?</button>.*?isMovePopupOpen && \(.*?<div.*?>.*?<button disabled=\{isFirst\} onClick=\{.*?onMoveUp\?\.\(\).*?</button>.*?<button disabled=\{isLast\} onClick=\{.*?onMoveDown\?\.\(\).*?</button>.*?</div>.*?\).*?</div>'
content = re.sub(cat_move_regex, '', content, flags=re.DOTALL)

# Add move options to BuilderCategoryItem popup
cat_popup_addition = """                {/* Move Category */}
                <button
                  disabled={isFirst}
                  className="w-full flex items-center justify-between gap-2 px-3 py-2.5 text-[13px] text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={(e) => { e.stopPropagation(); onMoveUp?.(); setIsSettingPopupOpen(false); setPopupPos(null); }}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
                    Geser ke Atas
                  </span>
                </button>
                <button
                  disabled={isLast}
                  className="w-full flex items-center justify-between gap-2 px-3 py-2.5 text-[13px] text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={(e) => { e.stopPropagation(); onMoveDown?.(); setIsSettingPopupOpen(false); setPopupPos(null); }}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                    Geser ke Bawah
                  </span>
                </button>
                <div className="border-t border-gray-100 dark:border-[#3E4042]" />"""
content = content.replace('{/* Pindah Koleksi */}', cat_popup_addition + '\n                {/* Pindah Koleksi */}')

# 2. BuilderCollectionItem: Remove move icon and change delete to setting icon
col_move_regex = r'<div className="relative flex items-center shrink-0 move-popup-container".*?alt="Move".*?</button>.*?isMovePopupOpen && \(.*?<div.*?>.*?<button disabled=\{isFirst\} onClick=\{.*?moveCollection\(index, \'up\'\).*?</button>.*?<button disabled=\{isLast\} onClick=\{.*?moveCollection\(index, \'down\'\).*?</button>.*?</div>.*?\).*?</div>'
content = re.sub(col_move_regex, '', content, flags=re.DOTALL)

with open("scratch/page_temp.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Phase 1 done")
