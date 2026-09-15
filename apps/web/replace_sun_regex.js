const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

const regex = /<svg className="w-\[20px\] h-\[20px\] text-black dark:text-\[#E4E6EB\]" fill="currentColor" viewBox="0 0 20 20">\s*<path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm[^>]+ clipRule="evenodd" \/>\s*<\/svg>/g;

const cleanSun = \<svg className="w-[20px] h-[20px] text-black dark:text-[#E4E6EB]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18.75a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM6.166 18.894a.75.75 0 001.06 1.06l1.59-1.591a.75.75 0 10-1.06-1.061l-1.591 1.59zM4.5 12a.75.75 0 01-.75.75H1.5a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM6.166 5.106a.75.75 0 00-1.06 1.06l1.591 1.59a.75.75 0 101.06-1.061l-1.59-1.59z" />
                          </svg>\;

if (regex.test(file)) {
  file = file.replace(regex, cleanSun);
  fs.writeFileSync('src/app/beranda/page.tsx', file);
  console.log('Regex replace successful');
} else {
  console.log('Regex not match');
}
