const fs = require('fs');

let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

// 1. Left sidebar card
// Look for "w-20 h-20 rounded-full"
const leftSidebarCardRegex = /<div className="w-20 h-20 rounded-full border-4 border-white dark:border-\[\#242526\] overflow-hidden bg-white dark:bg-\[\#242526\] relative z-10 mx-4 shrink-0 shadow-sm">[\s\S]*?<img src="\/default-avatar\.svg" alt="Toko" className="w-full h-full object-cover"/;
const matchLeft = code.match(leftSidebarCardRegex);

if (matchLeft) {
    let replaced = matchLeft[0].replace(/rounded-full/g, 'rounded-xl');
    replaced = replaced.replace(/\/default-avatar\.svg/g, '/produk-placeholder.png');
    code = code.replace(matchLeft[0], replaced);
} else {
    // try fallback string replacements for left sidebar
    const oldContainer = '<div className="w-20 h-20 rounded-full border-4 border-white dark:border-[#242526] overflow-hidden bg-white dark:bg-[#242526] relative z-10 mx-4 shrink-0 shadow-sm">';
    const newContainer = '<div className="w-20 h-20 rounded-xl border-4 border-white dark:border-[#242526] overflow-hidden bg-white dark:bg-[#242526] relative z-10 mx-4 shrink-0 shadow-sm">';
    code = code.replace(oldContainer, newContainer);
    
    const oldInner = '<div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-[#3A3B3C]">';
    const newInner = '<div className="w-full h-full rounded-xl flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-[#3A3B3C]">';
    code = code.replace(oldInner, newInner);
}


// 2. Right sidebar detail
const rightSidebarRegex = /<div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-\[\#4E4F50\] overflow-hidden shrink-0 flex items-center justify-center">\s*<img src="\/default-avatar\.svg" alt="Store" className="w-full h-full object-cover"/g;
const matchRight = code.match(rightSidebarRegex);
if (matchRight) {
    let replaced = matchRight[0].replace(/rounded-full/g, 'rounded');
    replaced = replaced.replace(/\/default-avatar\.svg/g, '/produk-placeholder.png');
    code = code.replace(matchRight[0], replaced);
} else {
    // Just blindly replace any remaining rounded-full store logos just in case
    code = code.replace(/<div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-\[\#4E4F50\] overflow-hidden shrink-0 flex items-center justify-center">\s*<img src="\/default-avatar\.svg" alt="Store"/g, 
                        '<div className="w-5 h-5 rounded bg-gray-200 dark:bg-[#4E4F50] overflow-hidden shrink-0 flex items-center justify-center">\n                    <img src="/produk-placeholder.png" alt="Store"');
}

// 3. Main feed (I already changed rounded-full to rounded here, so just change the img src)
const mainFeedRegex = /<div className="w-5 h-5 rounded bg-gray-200 dark:bg-\[\#4E4F50\] overflow-hidden shrink-0 flex items-center justify-center">\s*<img src="\/default-avatar\.svg" alt="Store"/g;
code = code.replace(mainFeedRegex, '<div className="w-5 h-5 rounded bg-gray-200 dark:bg-[#4E4F50] overflow-hidden shrink-0 flex items-center justify-center">\n                           <img src="/produk-placeholder.png" alt="Store"');

// And one more check for Toko left sidebar just in case the img src didn't replace
code = code.replace(/<img src="\/default-avatar\.svg" alt="Toko" className="w-full h-full object-cover"/g, '<img src="/produk-placeholder.png" alt="Toko" className="w-full h-full object-cover"');

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
console.log('Updated avatars to placeholders.');
