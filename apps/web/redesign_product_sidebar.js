const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const sidebarStart = code.indexOf('{/* Product Detail Right Sidebar */}');
const sidebarEnd = code.indexOf('{/* Overlay for product detail on mobile */}', sidebarStart);

if (sidebarStart === -1 || sidebarEnd === -1) {
  console.log('Markers not found'); process.exit(1);
}

// Replace the whole sidebar block
const newSidebarBlock = `{/* Product Detail Right Sidebar */}
      <div
        className={\`hidden lg:block fixed right-0 top-[56px] w-[340px] xl:w-[380px] overscroll-contain h-[calc(100vh-56px)] overflow-y-auto bg-[#F0F2F5] dark:bg-[#18191A] sidebar-scrollbar transition-transform duration-300 ease-in-out transform \${isProductDetailOpen ? "translate-x-0" : "translate-x-full"} z-[9999]\`}
      >
        {selectedProduct && (
          <div className="p-4">
            <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] overflow-hidden">
              {/* Image */}
              <div className="aspect-square bg-gray-100 dark:bg-[#3A3B3C] w-full flex items-center justify-center relative overflow-hidden">
                <svg className="w-12 h-12 text-gray-300 dark:text-[#4E4F50]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <button
                  onClick={() => setIsProductDetailOpen(false)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white z-10 transition-colors backdrop-blur-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {/* Body */}
              <div className="p-3 flex flex-col">
                {/* Store Row */}
                <div className="flex items-center gap-2 mb-2" onClick={(e) => e.stopPropagation()}>
                  <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-[#4E4F50] overflow-hidden shrink-0 flex items-center justify-center">
                    <img src="/default-avatar.svg" alt="Store" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  </div>
                  <span className="text-[12px] font-medium text-gray-500 dark:text-[#B0B3B8] truncate hover:underline hover:text-gray-700 dark:hover:text-[#E4E6EB] transition-colors cursor-pointer">{selectedProduct.store}</span>
                </div>

                {/* Name */}
                <h2 className="font-semibold text-[14px] text-black dark:text-[#E4E6EB] leading-snug mb-2">
                  {selectedProduct.name}
                </h2>

                {/* Description */}
                <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8] leading-relaxed mb-3">
                  {selectedProduct.description}
                </p>

                {/* Price */}
                <span className="font-bold text-emerald-500 text-[15px] mb-3">{selectedProduct.price}</span>

                {/* Buy Button */}
                <button className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[14px] rounded-lg transition-colors shadow-sm mb-2">
                  {t("product.buy_now")}
                </button>

                {/* Copyright */}
                <p className="text-center text-[11px] text-gray-400 dark:text-[#B0B3B8]">
                  {t("product.checkout_at")}{" "}
                  <span className="font-bold text-gray-500 dark:text-[#E4E6EB]">LYNK</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      `;

code = code.substring(0, sidebarStart) + newSidebarBlock + code.substring(sidebarEnd);
fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Successfully redesigned the product detail sidebar.');
