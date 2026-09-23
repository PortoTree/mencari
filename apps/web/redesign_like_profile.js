const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const startMarker = '{/* Product Detail Right Sidebar */}';
const endMarker = '{/* Overlay for product detail on mobile */}';

const startIdx = code.indexOf(startMarker);
const endIdx = code.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.log('Markers not found'); process.exit(1);
}

// Redesign to look EXACTLY like profile sidebar:
// - white/dark card with rounded-xl
// - cover area (emerald gradient) h-[110px]
// - store logo overlapping at bottom left like avatar
// - store name + product name
// - description
// - price
// - buy button + copyright
const newSidebar = `{/* Product Detail Right Sidebar */}
      <div
        className={\`hidden lg:block fixed right-0 top-[56px] w-[340px] xl:w-[380px] overscroll-contain h-[calc(100vh-56px)] overflow-y-auto pt-6 px-4 pb-32 sidebar-scrollbar transition-transform duration-300 ease-in-out transform \${isProductDetailOpen ? "translate-x-0" : "translate-x-full"} z-[9999]\`}
      >
        <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] overflow-hidden">
          {selectedProduct && (
            <>
              {/* Header — Cover + Store Logo Overlapping */}
              <div className="relative">
                {/* Close */}
                <button
                  onClick={() => setIsProductDetailOpen(false)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white z-10 transition-colors backdrop-blur-sm shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Product Image as Cover */}
                <div className="h-[160px] w-full bg-gray-200 dark:bg-[#3A3B3C] flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-300 dark:text-[#4E4F50]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>

                {/* Store Logo — overlapping like avatar */}
                <div className="absolute -bottom-8 left-4 w-[72px] h-[72px] rounded-full border-4 border-white dark:border-[#242526] bg-white dark:bg-[#242526] overflow-hidden shadow-sm flex items-center justify-center">
                  <img src="/default-avatar.svg" alt="Store" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>
              </div>

              {/* Product Info */}
              <div className="pt-10 px-4 pb-4 border-b border-gray-100 dark:border-[#3E4042]">
                {/* Store name */}
                <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8] mb-0.5 hover:underline cursor-pointer w-fit" onClick={(e) => e.stopPropagation()}>
                  {selectedProduct.store}
                </p>
                {/* Product name */}
                <h3 className="font-bold text-[18px] text-black dark:text-[#E4E6EB] leading-tight mb-2">
                  {selectedProduct.name}
                </h3>
                {/* Description */}
                <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8] leading-relaxed mb-4">
                  {selectedProduct.description}
                </p>
                {/* Price */}
                <p className="font-bold text-emerald-500 text-[22px] mb-4">{selectedProduct.price}</p>
                {/* Buy Button */}
                <button className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[15px] rounded-xl transition-colors shadow-sm mb-2">
                  {t("product.buy_now")}
                </button>
                {/* Copyright */}
                <p className="text-center text-[12px] text-gray-400 dark:text-[#B0B3B8] mt-1">
                  {t("product.checkout_at")}{" "}
                  <span className="font-bold text-gray-500 dark:text-[#E4E6EB]">LYNK</span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      `;

code = code.substring(0, startIdx) + newSidebar + code.substring(endIdx);
fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Product sidebar redesigned to match profile sidebar layout.');
