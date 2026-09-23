const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const searchStr = 'hover:bg-gray-50 dark:hover:bg-[#3A3B3C]"';
// Make sure we only change the one in the product sort dropdown.
// Let's use regex to be safe, targeting the mapping for product sort:

const regex = /className=\{\`w-full text-left px-4 py-2 text-\[13px\] transition-colors \\\$\{\r?\n\s*productSort === option\.id \r?\n\s*\? "bg-emerald-50 text-emerald-600 dark:bg-\[\#203D2E\] dark:text-emerald-400 font-medium" \r?\n\s*: "text-gray-700 dark:text-\[\#E4E6EB\] hover:bg-gray-50 dark:hover:bg-\[\#3A3B3C\]"\r?\n\s*\}\`\}/g;

const replaceStr = `className={\`w-full text-left px-4 py-2 text-[13px] transition-colors \${
                                  productSort === option.id 
                                    ? "bg-emerald-50 text-emerald-600 dark:bg-[#203D2E] dark:text-emerald-400 font-medium" 
                                    : "text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-200 dark:hover:bg-[#3A3B3C]"
                                }\`}`;

if (regex.test(code)) {
  code = code.replace(regex, replaceStr);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully updated hover background to gray-200');
} else {
  console.log('Regex did not match. Trying simple string replace if unique enough.');
  
  // If regex fails due to whitespace, we can just find the block by finding `productSort === option.id`
  const blockStart = code.indexOf('productSort === option.id');
  if (blockStart !== -1) {
    const snippet = code.substring(blockStart, blockStart + 250);
    if (snippet.includes('hover:bg-gray-50')) {
      const fixedSnippet = snippet.replace('hover:bg-gray-50', 'hover:bg-gray-200');
      code = code.substring(0, blockStart) + fixedSnippet + code.substring(blockStart + 250);
      fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
      console.log('Updated via fallback string replace.');
    }
  }
}
