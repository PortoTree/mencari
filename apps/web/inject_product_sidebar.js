const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Inject states
const stateAnchor = '  const [productSort, setProductSort] = useState("popular");';
const stateAdd = `  const [productSort, setProductSort] = useState("popular");
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);`;

if (code.includes(stateAnchor)) {
  code = code.replace(stateAnchor, stateAdd);
  console.log('State injected.');
} else {
  console.log('State anchor not found');
}

// 2. Make the product card outer div clickable (but NOT for store row clicks)
// Current card: <div key={i} className="bg-white dark:bg-[#242526] rounded-xl shadow-sm ...
const oldCardDiv = '<div key={i} className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col group">';
const newCardDiv = `<div key={i} className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] overflow-hidden hover:shadow-md transition-shadow flex flex-col group" onClick={() => { setSelectedProduct({ index: i, name: \`Template Website Profesional \${i + 1}\`, store: \`Toko Digital Kreatif \${i + 1}\`, price: "Rp 150.000", description: "Template website profesional dengan desain modern, responsif, dan mudah dikustomisasi. Cocok untuk bisnis, portofolio, maupun landing page produk digital Anda." }); setIsProductDetailOpen(true); }}>`;

if (code.includes(oldCardDiv)) {
  code = code.replace(oldCardDiv, newCardDiv);
  console.log('Card div updated.');
} else {
  console.log('Card div not found');
}

// 3. Make the store row stop propagation (already has cursor-pointer + onClick stopPropagation? no)
// The store span has `onClick={(e) => e.stopPropagation()}` - let's wrap the whole store row with stopPropagation
const oldStoreContainer = '<div className="flex items-center gap-2 mb-2 cursor-pointer group/store w-fit" onClick={(e) => e.stopPropagation()}>';
// Check if already wrapped
if (!code.includes(oldStoreContainer)) {
  // wrap with stop propagation
  const oldStoreContainerPlain = '<div className="flex items-center gap-2 mb-2">';
  const newStoreContainerPlain = '<div className="flex items-center gap-2 mb-2" onClick={(e) => e.stopPropagation()}>';
  code = code.replace(oldStoreContainerPlain, newStoreContainerPlain);
  console.log('Store row stop propagation added.');
} else {
  console.log('Store row already wrapped.');
}

// 4. Add cursor-pointer to the clickable area (image area and product title)
const oldImgArea = '<div className="aspect-square bg-gray-100 dark:bg-[#3A3B3C] w-full flex items-center justify-center relative overflow-hidden">';
const newImgArea = '<div className="aspect-square bg-gray-100 dark:bg-[#3A3B3C] w-full flex items-center justify-center relative overflow-hidden cursor-pointer">';
code = code.replace(oldImgArea, newImgArea);

// 5. Add Product Detail Right Sidebar Panel (before the existing Profile Right Sidebar)
const sidebarAnchor = '{/* Profile Right Sidebar */}';
const productSidebar = `{/* Product Detail Right Sidebar */}
      <div
        className={\`hidden lg:block fixed right-0 top-[56px] w-[340px] xl:w-[380px] overscroll-contain h-[calc(100vh-56px)] overflow-y-auto bg-white dark:bg-[#18191A] sidebar-scrollbar transition-transform duration-300 ease-in-out transform \${isProductDetailOpen ? "translate-x-0" : "translate-x-full"} z-40\`}
      >
        {selectedProduct && (
          <div className="bg-white dark:bg-[#242526] h-full flex flex-col">
            {/* Product Image */}
            <div className="relative">
              <button
                onClick={() => setIsProductDetailOpen(false)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white z-10 transition-colors backdrop-blur-sm shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <div className="aspect-video w-full bg-gray-100 dark:bg-[#3A3B3C] flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-300 dark:text-[#4E4F50]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-1">
              {/* Store Row */}
              <div className="flex items-center gap-2 mb-3 cursor-pointer group/storedetail w-fit" onClick={(e) => e.stopPropagation()}>
                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-[#4E4F50] overflow-hidden shrink-0 flex items-center justify-center">
                  <img src="/default-avatar.svg" alt="Store" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>
                <span className="text-[12px] font-medium text-gray-500 dark:text-[#B0B3B8] group-hover/storedetail:underline group-hover/storedetail:text-gray-700 dark:group-hover/storedetail:text-[#E4E6EB] transition-colors">{selectedProduct.store}</span>
              </div>

              {/* Product Name */}
              <h2 className="font-bold text-[17px] text-black dark:text-[#E4E6EB] leading-snug mb-3">
                {selectedProduct.name}
              </h2>

              {/* Description */}
              <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8] leading-relaxed flex-1 mb-4">
                {selectedProduct.description}
              </p>

              {/* Price */}
              <div className="mb-4">
                <span className="font-bold text-emerald-500 text-[22px]">{selectedProduct.price}</span>
              </div>

              {/* Buy Button */}
              <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[15px] rounded-xl transition-colors shadow-sm">
                Beli Sekarang
              </button>

              {/* Copyright */}
              <p className="text-center text-[11px] text-gray-400 dark:text-[#B0B3B8] mt-3">
                Checkout produk di{" "}
                <span className="font-bold text-gray-500 dark:text-[#E4E6EB]">LYNK</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for product detail on mobile */}
      {isProductDetailOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-black/50" onClick={() => setIsProductDetailOpen(false)} />
      )}

      `;
      
if (code.includes(sidebarAnchor)) {
  code = code.replace(sidebarAnchor, productSidebar + sidebarAnchor);
  console.log('Product detail sidebar injected.');
} else {
  console.log('Sidebar anchor not found');
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
