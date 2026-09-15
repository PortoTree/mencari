const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

const replacements = [
  ['bg-[#F3F2EF]', 'bg-[#F3F2EF] dark:bg-[#18191A]'],
  ['bg-[#F0F2F5]', 'bg-[#F0F2F5] dark:bg-[#3A3B3C]'],
  ['bg-white', 'bg-white dark:bg-[#242526]'],
  ['bg-[#E4E6EB]', 'bg-[#E4E6EB] dark:bg-[#3A3B3C]'],
  ['bg-[#F2F2F2]', 'bg-[#F2F2F2] dark:bg-[#3A3B3C]'],
  ['hover:bg-[#F2F2F2]', 'hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C]'],
  ['hover:bg-[#E4E6EB]', 'hover:bg-[#E4E6EB] dark:hover:bg-[#4E4F50]'],
  ['border-[#E4E6EB]', 'border-[#E4E6EB] dark:border-[#3E4042]'],
  ['border-gray-200', 'border-gray-200 dark:border-[#3E4042]'],
  ['border-gray-100', 'border-gray-100 dark:border-[#3E4042]'],
  ['border-white', 'border-white dark:border-[#242526]'],
  ['text-black', 'text-black dark:text-[#E4E6EB]'],
  ['text-gray-500', 'text-gray-500 dark:text-[#B0B3B8]'],
  ['text-gray-600', 'text-gray-600 dark:text-[#B0B3B8]'],
  ['text-[#65676B]', 'text-[#65676B] dark:text-[#B0B3B8]'],
  ['placeholder-gray-500', 'placeholder-gray-500 dark:placeholder-[#B0B3B8]'],
  ['bg-gray-100', 'bg-gray-100 dark:bg-[#3A3B3C]'],
  ['bg-gray-200', 'bg-gray-200 dark:bg-[#3A3B3C]'],
  ['hover:bg-gray-100', 'hover:bg-gray-100 dark:hover:bg-[#4E4F50]'],
  ['hover:bg-gray-200', 'hover:bg-gray-200 dark:hover:bg-[#4E4F50]'],
  ['hover:bg-gray-50', 'hover:bg-gray-50 dark:hover:bg-[#3A3B3C]'],
];

for (const [search, replace] of replacements) {
  file = file.split(search).join(replace);
}

// deduplicate classes from previous runs (e.g. `dark:bg-[#18191A] dark:bg-[#18191A]`)
// We can use a simple regex for words starting with dark:
const cleanDups = (str) => {
  return str.replace(/class(?:Name)?="([^"]+)"/g, (match, p1) => {
    const classes = p1.split(' ');
    const unique = [...new Set(classes)];
    return 'className="' + unique.join(' ') + '"';
  });
};

file = cleanDups(file);

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Replaced successfully');
