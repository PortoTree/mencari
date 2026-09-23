const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const startMarker = '{/* Profile Right Sidebar */}';
const endMarker = '{/* Add Shortcut Modal */}';

const startIdx = code.indexOf(startMarker);
const endIdx = code.indexOf(endMarker, startIdx);

if (startIdx === -1 || endIdx === -1) {
  console.log('Markers not found');
  process.exit(1);
}

let section = code.substring(startIdx, endIdx);

// 1. Update outer div className
// Remove pt-6 px-4 pb-32, add bg-white dark:bg-[#242526] border-l border-gray-200 dark:border-[#3E4042]
section = section.replace(
  'overflow-y-auto pt-6 px-4 pb-32 transition-transform',
  'overflow-y-auto transition-transform'
);
section = section.replace(
  'z-40 sidebar-scrollbar`}',
  'z-40 sidebar-scrollbar bg-white dark:bg-[#242526] border-l border-gray-200 dark:border-[#3E4042]`}'
);

// 2. Remove the inner card div and its matching closing tag
section = section.replace(
  '<div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] overflow-hidden">\r\n          {selectedProfile && (',
  '{selectedProfile && ('
);
section = section.replace(
  '<div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] overflow-hidden">\n          {selectedProfile && (',
  '{selectedProfile && ('
);

// 3. The end of the section looks like this:
//             </>
//           )}
//         </div>
//       </div>
// We need to remove the `</div>` that closed the card wrapper.
section = section.replace(
  '            </>\r\n          )}\r\n        </div>\r\n      </div>',
  '            </>\r\n          )}\r\n      </div>'
);
section = section.replace(
  '            </>\n          )}\n        </div>\n      </div>',
  '            </>\n          )}\n      </div>'
);

code = code.substring(0, startIdx) + section + code.substring(endIdx);
fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Profile detail sidebar redesigned to full-panel style.');
