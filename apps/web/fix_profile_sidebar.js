const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Remove outer padding from the sidebar container
code = code.replace(
  'overflow-y-auto pt-6 px-4 pb-32 transition-transform duration-300 ease-in-out transform ${isProfileSidebarOpen ? "translate-x-0" : "translate-x-full"} z-40 sidebar-scrollbar`}',
  'overflow-y-auto transition-transform duration-300 ease-in-out transform ${isProfileSidebarOpen ? "translate-x-0" : "translate-x-full"} z-40 sidebar-scrollbar bg-white dark:bg-[#242526] border-l border-gray-200 dark:border-[#3E4042]`}'
);

// 2. Remove the card wrapper div: `<div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] overflow-hidden">`
// and its matching closing tag before the next sibling (friend list section)
code = code.replace(
  '<div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] overflow-hidden">\r\n          {selectedProfile && (',
  '{selectedProfile && ('
);

// 3. Find the closing div of that card wrapper — it's right before the next section inside the sidebar
// The card's closing </div> comes after the last Account Activity section ends
// and then </> closes selectedProfile, then </div> closes the outer sidebar.
// Pattern: `            </>\r\n          </div>\r\n        </div>\r\n      </div>`
// We remove one level of closing div (the card wrapper)
code = code.replace(
  '            </>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      {/* Add Shortcut Modal',
  '            </>\r\n          )}\r\n        </div>\r\n\r\n      {/* Add Shortcut Modal'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Done');
