const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const startMarker = '{/* Product Detail Right Sidebar */}';
const endMarker = '{/* Overlay for product detail on mobile */}';

const startIdx = code.indexOf(startMarker);
const endIdx = code.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.log('Markers not found'); process.exit(1);
}

const newSidebar = `{/* Product Detail Right Sidebar */}
      <div
        className={\`hidden lg:block fixed right-0 top-[56px] w-[340px] xl:w-[380px] overscroll-contain h-[calc(100vh-56px)] overflow-y-auto bg-white dark:bg-[#242526] sidebar-scrollbar transition-transform duration-300 ease-in-out transform \${isProductDetailOpen ? "translate-x-0" : "translate-x-full"} z-[9999] border-l border-gray-200 dark:border-[#3E4042]\`}
      >
        {selectedProduct && (
          <>
            {/* Cover / Image Area */}
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={() => setIsProductDetailOpen(false)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white z-10 transition-colors backdrop-blur-sm shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              {/* Product Image (square, full width) */}
              <div className="w-full aspect-square bg-gray-100 dark:bg-[#3A3B3C] flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-300 dark:text-[#4E4F50]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
            </div>

            {/* Content Area */}
            <div className="px-4 py-4 flex flex-col gap-3">

              {/* Store Row */}
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-[#4E4F50] overflow-hidden shrink-0 flex items-center justify-center">
                  <img src="/default-avatar.svg" alt="Store" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>
                <span className="text-[13px] font-medium text-gray-500 dark:text-[#B0B3B8] hover:underline hover:text-gray-700 dark:hover:text-[#E4E6EB] transition-colors cursor-pointer">{selectedProduct.store}</span>
              </div>

              {/* Product Name */}
              <h2 className="font-bold text-[20px] text-black dark:text-[#E4E6EB] leading-snug">
                {selectedProduct.name}
              </h2>

              {/* Description */}
              <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8] leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Divider */}
              <div className="h-px bg-gray-200 dark:bg-[#3E4042]" />

              {/* Price */}
              <span className="font-bold text-emerald-500 text-[24px]">{selectedProduct.price}</span>

              {/* Buy Button */}
              <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[15px] rounded-xl transition-colors shadow-sm">
                {t("product.buy_now")}
              </button>

              {/* Copyright */}
              <p className="text-center text-[12px] text-gray-400 dark:text-[#B0B3B8]">
                {t("product.checkout_at")}{" "}
                <span className="font-bold text-gray-500 dark:text-[#E4E6EB]">LYNK</span>
              </p>
            </div>
          </>
        )}
      </div>

      `;

code = code.substring(0, startIdx) + newSidebar + code.substring(endIdx);
fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Product detail sidebar redesigned to full-panel style.');
