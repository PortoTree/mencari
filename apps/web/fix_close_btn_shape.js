const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldButtonStr = `              {/* Sticky Close Button */}
              <div className="sticky top-3 z-50 w-full flex justify-end px-3 h-0 pointer-events-none">
                <button
                  onClick={() => setIsProfileSidebarOpen(false)}
                  className="pointer-events-auto p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors backdrop-blur-sm shadow-sm"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>`;

const newButtonStr = `              {/* Sticky Close Button */}
              <div className="sticky top-0 z-50 w-full h-0">
                <button
                  onClick={() => setIsProfileSidebarOpen(false)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>`;

code = code.replace(oldButtonStr, newButtonStr);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Fixed close button shape, position, and color.');
