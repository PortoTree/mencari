const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Fix the span with underline hover
const oldSpan = `<span className="text-[12px] font-medium text-gray-500 dark:text-[#B0B3B8] truncate">Toko Digital Kreatif {i + 1}</span>`;
const newSpan = `<span className="text-[12px] font-medium text-gray-500 dark:text-[#B0B3B8] truncate hover:underline hover:text-gray-700 dark:hover:text-[#E4E6EB] transition-colors cursor-pointer">Toko Digital Kreatif {i + 1}</span>`;

// Fix the containing div to have separate hover group so logo gets ring on store hover
const oldDiv = `<div className="flex items-center gap-2 mb-2">`;
// There's only one with this exact pattern, but let's match the parent block of the store row
// The block includes the logo img and the span above

if (code.includes(oldSpan)) {
  code = code.replace(oldSpan, newSpan);

  // Also fix the logo div to have a hover ring
  const oldLogoDiv = `<div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-[#4E4F50] overflow-hidden shrink-0 flex items-center justify-center">
                           <img src="/default-avatar.svg" alt="Store" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        </div>`;
  const newLogoDiv = `<div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-[#4E4F50] overflow-hidden shrink-0 flex items-center justify-center">
                           <img src="/default-avatar.svg" alt="Store" className="w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        </div>`;
  code = code.replace(oldLogoDiv, newLogoDiv);

  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully added hover underline to store name text.');
} else {
  console.log('Could not find store span. String mismatch.');
}
