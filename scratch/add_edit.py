def create_product_edit_form():
    return '''
function ProductEditForm({ product, onClose }: { product: any, onClose: () => void }) {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [platform, setPlatform] = useState("g-drive");
  
  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1C1D1F] animate-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 px-6 pt-8">
        <button onClick={onClose} className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-lg transition-colors text-gray-500 dark:text-[#B0B3B8]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-[16px] font-bold text-gray-800 dark:text-[#E4E6EB]">Detail</h2>
      </div>

      <div className="flex-1 overflow-y-auto sidebar-scrollbar px-6 pb-10 space-y-6">
        
        {/* Gambar */}
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-gray-700 dark:text-[#E4E6EB]">Gambar</label>
          <div className="w-[80px] h-[80px] border border-dashed border-gray-300 dark:border-[#4E4F50] rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#3A3B3C] transition-colors">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span className="text-[10px] text-gray-400 text-center leading-tight">Tambahkan<br/>Gambar</span>
          </div>
        </div>

        {/* Video */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <label className="text-[13px] font-semibold text-gray-700 dark:text-[#E4E6EB]">Tambahkan video</label>
              <svg className="w-3.5 h-3.5 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <button 
              onClick={() => setIsVideoEnabled(!isVideoEnabled)}
              className={`w-9 h-5 rounded-full relative transition-colors ${isVideoEnabled ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-[#4E4F50]'}`}
            >
              <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-transform ${isVideoEnabled ? 'left-[19px]' : 'left-[3px]'}`}></div>
            </button>
          </div>
          {isVideoEnabled && (
            <input type="text" placeholder="Tempel URL YouTube di sini" className="w-full border border-gray-300 dark:border-[#4E4F50] bg-white dark:bg-[#242526] text-[13px] rounded-lg px-3 py-2 text-gray-700 dark:text-[#E4E6EB] outline-none focus:border-emerald-500 placeholder-gray-400" />
          )}
        </div>

        {/* Judul */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[13px] font-semibold text-gray-700 dark:text-[#E4E6EB]">Judul</label>
            <span className="text-[11px] text-gray-400">0/100</span>
          </div>
          <input type="text" placeholder="Judul" defaultValue={product?.title || ""} className="w-full border border-gray-300 dark:border-[#4E4F50] bg-white dark:bg-[#242526] text-[13px] rounded-lg px-3 py-2 text-gray-700 dark:text-[#E4E6EB] outline-none focus:border-emerald-500 placeholder-gray-400" />
        </div>

        {/* Keterangan */}
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-gray-700 dark:text-[#E4E6EB]">Keterangan</label>
          <div className="border border-gray-200 dark:border-[#4E4F50] rounded-lg overflow-hidden bg-[#F4F9F7] dark:bg-[#2A2B2C]">
            <div className="p-2 border-b border-gray-200 dark:border-[#4E4F50] flex flex-wrap gap-x-4 gap-y-2 items-center text-gray-600 dark:text-[#B0B3B8]">
              <div className="flex items-center gap-1 cursor-pointer hover:text-emerald-600"><span className="text-[13px]">🪄</span><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></div>
              <div className="flex items-center gap-1 cursor-pointer hover:text-emerald-600"><span className="text-[13px]">16</span><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></div>
              <div className="font-bold text-[14px] cursor-pointer text-emerald-800 dark:text-emerald-500 hover:text-emerald-600">B</div>
              <div className="font-bold text-[14px] cursor-pointer hover:text-emerald-600 text-emerald-700 dark:text-emerald-400 underline">U</div>
              <div className="cursor-pointer hover:text-emerald-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></div>
              <div className="flex items-center gap-1 cursor-pointer hover:text-emerald-600 font-bold text-yellow-400">A<svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></div>
              <div className="cursor-pointer hover:text-emerald-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></div>
              <div className="cursor-pointer hover:text-emerald-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg></div>
              <div className="cursor-pointer hover:text-emerald-600 flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" /></svg><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></div>
              <div className="w-full flex gap-4 pt-1">
                <div className="cursor-pointer hover:text-emerald-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg></div>
                <div className="cursor-pointer hover:text-emerald-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>
                <div className="cursor-pointer hover:text-emerald-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></div>
                <div className="cursor-pointer hover:text-emerald-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg></div>
                <div className="cursor-pointer hover:text-emerald-600 font-bold text-[13px]">&lt;/&gt;</div>
                <div className="cursor-pointer hover:text-emerald-600 text-[12px]">Emoji</div>
              </div>
            </div>
            <textarea className="w-full h-[150px] bg-white dark:bg-[#18191A] resize-none outline-none p-3 text-[13px] text-gray-700 dark:text-[#E4E6EB]" placeholder="Tuliskan keterangan produk di sini..."></textarea>
            <div className="flex justify-center bg-gray-100 dark:bg-[#242526] py-0.5 border-t border-gray-200 dark:border-[#4E4F50] cursor-row-resize">
              <div className="w-6 h-1 bg-gray-300 dark:bg-[#4E4F50] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Platform */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5">
            <label className="text-[13px] font-semibold text-gray-700 dark:text-[#E4E6EB]">Platform</label>
            <svg className="w-3.5 h-3.5 text-emerald-500 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          
          <div className="border border-dashed border-gray-300 dark:border-[#4E4F50] rounded-xl p-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              {["Mengunggah", "PDF/Ebook", "G-drive", "Lainnya"].map(p => (
                <button 
                  key={p} 
                  onClick={() => setPlatform(p.toLowerCase())}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors border ${platform === p.toLowerCase() ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white dark:bg-[#242526] text-emerald-600 dark:text-emerald-400 border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'}`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="relative pt-1">
              <input 
                type="text" 
                placeholder="drive.google.com/file/lynkid" 
                className="w-full bg-transparent border-b border-gray-300 dark:border-[#4E4F50] text-[13px] px-1 py-2 text-gray-700 dark:text-[#E4E6EB] outline-none focus:border-emerald-500 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
'''

with open('apps/web/src/app/[locale]/mydash/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Insert ProductEditForm right before `export default function MyDashPage`
if "function ProductEditForm" not in content:
    content = content.replace("export default function MyDashPage", create_product_edit_form() + "\nexport default function MyDashPage")

# Add state
if "const [editingProduct, setEditingProduct] = useState<any | null>(null);" not in content:
    content = content.replace(
        "const [isDarkMode, setIsDarkMode] = useState(true);",
        "const [isDarkMode, setIsDarkMode] = useState(true);\n  const [editingProduct, setEditingProduct] = useState<any | null>(null);"
    )

# Fix signatures
content = content.replace(
    "function BuilderCategoryItem({ item, onMoveUp, onMoveDown, isFirst, isLast, onMoveSubItemUp, onMoveSubItemDown, onChangeCategory, onDeleteCategory }",
    "function BuilderCategoryItem({ item, onMoveUp, onMoveDown, isFirst, isLast, onMoveSubItemUp, onMoveSubItemDown, onChangeCategory, onDeleteCategory, onEditProduct }"
)
content = content.replace(
    "onChangeCategory?: (newCategory: string) => void, onDeleteCategory?: () => void }) {",
    "onChangeCategory?: (newCategory: string) => void, onDeleteCategory?: () => void, onEditProduct?: (product: any) => void }) {"
)

content = content.replace(
    "function BuilderCollectionItem({ collection, index, updateTitle, deleteCollection, moveCollection, moveItem, moveSubItem, changeCategoryTitle, deleteCategoryItem, isFirst, isLast }",
    "function BuilderCollectionItem({ collection, index, updateTitle, deleteCollection, moveCollection, moveItem, moveSubItem, changeCategoryTitle, deleteCategoryItem, isFirst, isLast, onEditProduct }"
)
content = content.replace(
    "changeCategoryTitle: (colIdx: number, itemIdx: number, newTitle: string) => void, deleteCategoryItem: (colIdx: number, itemIdx: number) => void, isFirst: boolean, isLast: boolean }) {",
    "changeCategoryTitle: (colIdx: number, itemIdx: number, newTitle: string) => void, deleteCategoryItem: (colIdx: number, itemIdx: number) => void, isFirst: boolean, isLast: boolean, onEditProduct?: (product: any) => void }) {"
)

# Pass down onEditProduct in Collection
content = content.replace(
    "onDeleteCategory={() => deleteCategoryItem(index, itemIdx)}",
    "onDeleteCategory={() => deleteCategoryItem(index, itemIdx)}\n                  onEditProduct={onEditProduct}"
)

# Pass down onEditProduct in Category
content = content.replace(
    "onEdit={() => console.log('Edit product')}",
    "onEdit={() => onEditProduct?.(subItem)}"
)

# Pass down from main page
content = content.replace(
    "isLast={colIdx === collections.length - 1}",
    "isLast={colIdx === collections.length - 1}\n                        onEditProduct={setEditingProduct}"
)

# Button + Tambah Produk
content = content.replace(
    "onClick={(e) => e.stopPropagation()}",
    "onClick={(e) => { e.stopPropagation(); onEditProduct?.({ type: 'product', title: '', isNew: true }); }}"
)
content = content.replace(
    "+ Produk",
    "+ Produk"
)

# Add conditional rendering in main page
# Find the start of `activeTab === "store"`
import re
store_tab_regex = r'\{activeTab === "store" && \(\s*<div className="flex flex-col gap-6">'
replacement = '''{activeTab === "store" && (
              editingProduct ? (
                <ProductEditForm product={editingProduct} onClose={() => setEditingProduct(null)} />
              ) : (
              <div className="flex flex-col gap-6">'''
content = re.sub(store_tab_regex, replacement, content)

# And close the conditional
# We need to find where the `activeTab === "store"` block ends, which is at the very end of the left column before the right column.
# Let's do it by finding `)}` right before `{/* Right Column (Preview) */}`
block_end_regex = r'(\s*</div>\s*</div>\s*</div>\s*)\)}\s*</div>\s*\{/\* Right Column \(Preview\) \*/\}'
replacement_end = r'\1)}\n              )}\n            </div>\n\n            {/* Right Column (Preview) */}'
content = re.sub(block_end_regex, replacement_end, content)

# Handle the main Tambah Produk button
content = content.replace(
    '''<svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                          {t("mydash.add_product")}
                        </button>''',
    '''<svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                          {t("mydash.add_product")}
                        </button>'''.replace('</button>', '</button>').replace('button className', 'button onClick={() => setEditingProduct({ type: \'product\', title: \'\', isNew: true })} className')
)

with open('apps/web/src/app/[locale]/mydash/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
