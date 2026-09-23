const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const targetStr = `            <>
              {/* Header (Cover Photo & Avatar) */}
              <div className="relative">
                {/* Close Button on top of cover */}
                <button
                  onClick={() => setIsProfileSidebarOpen(false)}
                  className="fixed top-[64px] right-4 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white z-50 transition-colors backdrop-blur-sm shadow-sm"
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
                </button>`;

const newStr = `            <>
              {/* Sticky Close Button */}
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
              </div>

              {/* Header (Cover Photo & Avatar) */}
              <div className="relative">`;

code = code.replace(targetStr, newStr);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Sticky close button applied.');
