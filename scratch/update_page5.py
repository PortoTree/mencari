import re

with open(r"c:\mencari-online\apps\web\src\app\[locale]\mydash\page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace BuilderCategoryItem popup rendering
old_cat_popup = """                {/* Ubah Kategori */}
                <button
                  className="w-full flex items-center justify-between gap-2 px-3 py-2.5 text-[13px] text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors rounded-t-xl"
                  onClick={(e) => { e.stopPropagation(); setIsChangeCategoryOpen(v => !v); if (!isChangeCategoryOpen) { setTimeout(() => searchInputRef.current?.focus(), 50); setCategorySearch(''); } }}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-gray-500 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    {t("mydash.ubah_kategori")}
                  </span>
                  <svg className={`w-3 h-3 text-gray-400 transition-transform duration-150 ${isChangeCategoryOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </button>
                {isChangeCategoryOpen && (
                  <div className="border-t border-gray-100 dark:border-[#3E4042]">
                    <div className="px-2 py-1.5">
                      <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-[#3A3B3C] rounded-lg px-2 py-1.5">
                        <svg className="w-3 h-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" /></svg>
                        <input
                          ref={searchInputRef}
                          type="text"
                          placeholder={t("mydash.cari_kategori")}
                          value={categorySearch}
                          onChange={(e) => setCategorySearch(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          onMouseDown={(e) => e.stopPropagation()}
                          className="flex-1 bg-transparent text-[12px] text-gray-700 dark:text-[#E4E6EB] placeholder-gray-400 dark:placeholder-[#8B8D90] outline-none min-w-0"
                        />
                        {categorySearch && (
                          <button onClick={(e) => { e.stopPropagation(); setCategorySearch(''); searchInputRef.current?.focus(); }} className="text-gray-400 hover:text-gray-600 dark:hover:text-[#E4E6EB]">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="overflow-y-auto" style={{maxHeight: '180px'}}>
                      {PRODUCT_CATEGORIES.filter(cat => cat.toLowerCase().includes(categorySearch.toLowerCase())).length === 0 ? (
                        <div className="px-4 py-3 text-[12px] text-gray-400 dark:text-[#8B8D90] text-center">{t("mydash.tidak_ada_hasil")}</div>
                      ) : (
                        PRODUCT_CATEGORIES.filter(cat => cat.toLowerCase().includes(categorySearch.toLowerCase())).map((cat) => (
                          <button
                            key={cat}
                            className={`w-full text-left px-4 py-2 text-[12.5px] transition-colors hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-2 ${
                              item.title === cat
                                ? 'text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-900/20'
                                : 'text-gray-600 dark:text-[#B0B3B8]'
                            }`}
                            onClick={(e) => { e.stopPropagation(); onChangeCategory?.(cat); setIsSettingPopupOpen(false); setIsChangeCategoryOpen(false); setCategorySearch(''); setPopupPos(null); }}
                          >
                            {item.title === cat && <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                            <span className={item.title === cat ? '' : 'pl-5'}>{cat}</span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
                {/* Move Up */}
                <button
                  disabled={isFirst}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-[13px] text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={(e) => { e.stopPropagation(); onMoveUp?.(); setIsSettingPopupOpen(false); setPopupPos(null); }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
                  {t("mydash.geser_ke_atas")}
                </button>
                {/* Move Down */}
                <button
                  disabled={isLast}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-[13px] text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={(e) => { e.stopPropagation(); onMoveDown?.(); setIsSettingPopupOpen(false); setPopupPos(null); }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                  {t("mydash.geser_ke_bawah")}
                </button>
                <div className="border-t border-gray-100 dark:border-[#3E4042]" />
                {/* Pindah Koleksi */}
                <button
                  className="w-full flex items-center justify-between gap-2 px-3 py-2.5 text-[13px] text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors"
                  onClick={(e) => { e.stopPropagation(); /* TODO: Implement Pindah Koleksi */ setIsSettingPopupOpen(false); setPopupPos(null); }}
                >
                  <span className="flex items-center gap-2">
                    <img src="/move.svg" alt="Move" className="w-3.5 h-3.5 opacity-50 dark:invert" />
                    {t("mydash.pindah_koleksi")}
                  </span>
                </button>
                <div className="border-t border-gray-100 dark:border-[#3E4042]" />
                <button
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-[13px] text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-b-xl"
                  onClick={(e) => { e.stopPropagation(); onDeleteCategory?.(); setIsSettingPopupOpen(false); setPopupPos(null); }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  {t("mydash.hapus_kategori")}
                </button>"""

new_cat_popup = """                {!isChangeCategoryOpen ? (
                  <div className="flex flex-col py-1">
                    {/* Ubah Kategori */}
                    <button
                      className="w-full flex items-center justify-between gap-2 px-3 py-2 text-[13px] text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors"
                      onClick={(e) => { e.stopPropagation(); setIsChangeCategoryOpen(true); setTimeout(() => searchInputRef.current?.focus(), 50); setCategorySearch(''); }}
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-gray-500 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        {t("mydash.ubah_kategori")}
                      </span>
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <div className="border-t border-gray-100 dark:border-[#3E4042] my-1" />
                    {/* Move Up */}
                    <button
                      disabled={isFirst}
                      className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      onClick={(e) => { e.stopPropagation(); onMoveUp?.(); setIsSettingPopupOpen(false); setPopupPos(null); }}
                    >
                      <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
                      {t("mydash.geser_ke_atas")}
                    </button>
                    {/* Move Down */}
                    <button
                      disabled={isLast}
                      className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      onClick={(e) => { e.stopPropagation(); onMoveDown?.(); setIsSettingPopupOpen(false); setPopupPos(null); }}
                    >
                      <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                      {t("mydash.geser_ke_bawah")}
                    </button>
                    <div className="border-t border-gray-100 dark:border-[#3E4042] my-1" />
                    {/* Pindah Koleksi */}
                    <button
                      className="w-full flex items-center justify-between gap-2 px-3 py-2 text-[13px] text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors"
                      onClick={(e) => { e.stopPropagation(); /* TODO: Implement Pindah Koleksi */ setIsSettingPopupOpen(false); setPopupPos(null); }}
                    >
                      <span className="flex items-center gap-2">
                        <img src="/move.svg" alt="Move" className="w-3.5 h-3.5 opacity-50 dark:invert" />
                        {t("mydash.pindah_koleksi")}
                      </span>
                    </button>
                    <div className="border-t border-gray-100 dark:border-[#3E4042] my-1" />
                    <button
                      className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      onClick={(e) => { e.stopPropagation(); onDeleteCategory?.(); setIsSettingPopupOpen(false); setPopupPos(null); }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      {t("mydash.hapus_kategori")}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col h-full max-h-[250px] min-w-[220px]">
                    <div className="flex items-center gap-2 px-2 py-2 border-b border-gray-100 dark:border-[#3E4042] shrink-0">
                      <button onClick={(e) => { e.stopPropagation(); setIsChangeCategoryOpen(false); }} className="p-1 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-lg text-gray-500 dark:text-gray-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <span className="text-[13px] font-bold text-gray-700 dark:text-[#E4E6EB]">{t("mydash.ubah_kategori")}</span>
                    </div>
                    <div className="px-2 py-2 border-b border-gray-100 dark:border-[#3E4042] shrink-0">
                      <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-[#3A3B3C] rounded-lg px-2 py-1.5">
                        <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" /></svg>
                        <input
                          ref={searchInputRef}
                          type="text"
                          placeholder={t("mydash.cari_kategori")}
                          value={categorySearch}
                          onChange={(e) => setCategorySearch(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          onMouseDown={(e) => e.stopPropagation()}
                          className="flex-1 bg-transparent text-[12px] text-gray-700 dark:text-[#E4E6EB] placeholder-gray-400 dark:placeholder-[#8B8D90] outline-none min-w-0"
                        />
                        {categorySearch && (
                          <button onClick={(e) => { e.stopPropagation(); setCategorySearch(''); searchInputRef.current?.focus(); }} className="text-gray-400 hover:text-gray-600 dark:hover:text-[#E4E6EB]">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="overflow-y-auto flex-1 p-1 sidebar-scrollbar">
                      {PRODUCT_CATEGORIES.filter(cat => cat.toLowerCase().includes(categorySearch.toLowerCase())).length === 0 ? (
                        <div className="px-4 py-4 text-[12px] text-gray-400 dark:text-[#8B8D90] text-center">{t("mydash.tidak_ada_hasil")}</div>
                      ) : (
                        PRODUCT_CATEGORIES.filter(cat => cat.toLowerCase().includes(categorySearch.toLowerCase())).map((cat) => (
                          <button
                            key={cat}
                            className={`w-full text-left px-3 py-2 rounded-md text-[12.5px] transition-colors hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-2 ${
                              item.title === cat
                                ? 'text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-900/20'
                                : 'text-gray-600 dark:text-[#B0B3B8]'
                            }`}
                            onClick={(e) => { e.stopPropagation(); onChangeCategory?.(cat); setIsSettingPopupOpen(false); setIsChangeCategoryOpen(false); setCategorySearch(''); setPopupPos(null); }}
                          >
                            {item.title === cat && <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                            <span className={item.title === cat ? '' : 'pl-5'}>{cat}</span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}"""

content = content.replace(old_cat_popup, new_cat_popup)

with open("scratch/update_page5.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Updated BuilderCategoryItem popup")
