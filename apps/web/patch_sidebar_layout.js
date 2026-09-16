const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldDrawer = `        {/* Profile Right Sidebar Drawer */}
        <>
          {/* Overlay */}
          <div 
            className={\`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 \${isProfileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}\`}
            onClick={() => setIsProfileSidebarOpen(false)}
          />
          
          {/* Drawer */}
          <div className={\`fixed top-0 right-0 h-full w-[350px] bg-white dark:bg-[#242526] shadow-xl z-[101] transition-transform duration-300 ease-in-out transform \${isProfileSidebarOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto\`}>`;

const newDrawer = `        {/* Profile Right Sidebar */}
        <div className={\`hidden lg:block fixed right-0 top-[56px] w-[280px] xl:w-[320px] h-[calc(100vh-56px)] overflow-y-auto pt-6 px-4 pb-10 transition-transform duration-300 ease-in-out transform \${isProfileSidebarOpen ? 'translate-x-0' : 'translate-x-full'} z-40 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]\`}>
          <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] overflow-hidden">`;

file = file.replace(oldDrawer, newDrawer);
file = file.replace(oldDrawer.replace(/\n/g, '\r\n'), newDrawer.replace(/\n/g, '\r\n'));

// Need to remove the closing `</>`
const oldDrawerEnd = `                </button>
              </div>
            )}
          </div>
        </>`;

const newDrawerEnd = `                </button>
              </div>
            )}
          </div>
        </div>`;

file = file.replace(oldDrawerEnd, newDrawerEnd);
file = file.replace(oldDrawerEnd.replace(/\n/g, '\r\n'), newDrawerEnd.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Updated drawer to sidebar');
