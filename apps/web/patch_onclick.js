const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// The incorrect savePost button for Pengguna:
const badBtn1 = `<button 
                      onClick={() => {
                        setSelectedProfile({ name: 'Pengguna', role: 'Member', avatar: '/default-avatar.svg' });
                        setIsProfileSidebarOpen(true);
                        setActivePostMenu(null);
                      }}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                      <svg className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                      {t('postMenu.savePost')}
                    </button>`;

const goodBtn1 = `<button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                      <svg className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                      {t('postMenu.savePost')}
                    </button>`;

// The incorrect savePost button for Naufal:
const badBtn2 = `<button 
                      onClick={() => {
                        setSelectedProfile({ name: 'Naufal faiz', role: 'Web Development', avatar: '/default-avatar.svg' });
                        setIsProfileSidebarOpen(true);
                        setActivePostMenu(null);
                      }}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                      <svg className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                      {t('postMenu.savePost')}
                    </button>`;

// The showProfile button that SHOULD have the onClick:
const showProfileBtn = `<button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                      <svg className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      {t('postMenu.showProfile')}
                    </button>`;

const newShowProfileBtn1 = `<button 
                      onClick={() => {
                        setSelectedProfile({ name: 'Pengguna', role: 'Member', avatar: '/default-avatar.svg' });
                        setIsProfileSidebarOpen(true);
                        setActivePostMenu(null);
                      }}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                      <svg className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      {t('postMenu.showProfile')}
                    </button>`;

const newShowProfileBtn2 = `<button 
                      onClick={() => {
                        setSelectedProfile({ name: 'Naufal faiz', role: 'Web Development', avatar: '/default-avatar.svg' });
                        setIsProfileSidebarOpen(true);
                        setActivePostMenu(null);
                      }}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                      <svg className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      {t('postMenu.showProfile')}
                    </button>`;

// Normalize whitespace for replacing
function replaceIgnoringWhitespace(source, oldStr, newStr) {
  const escapeRegex = (string) => string.replace(/[.*+?^$\{value}()|[\]\\]/g, '\\$&');
  const normalizedRegex = new RegExp(escapeRegex(oldStr).replace(/\\s+/g, '\\s+'), 'g');
  return source.replace(normalizedRegex, newStr);
}

// 1. Revert the bad buttons
let replaced1 = false;
let replaced2 = false;

// Custom replacement because replaceIgnoringWhitespace is too strict with \s+ matching newlines vs spaces
function flexReplace(source, bad, good) {
   let s = bad.split('\\n').map(l => l.trim()).join('\\s*');
   let r = new RegExp(s.replace(/[.*+?^$\{value}()|[\]\\]/g, '\\$&').replace(/\\s\\\*/g, '\\s*'), 'g');
   return source.replace(r, good);
}

// We'll just split and join to be safe
file = file.split(badBtn1).join(goodBtn1);
file = file.split(badBtn1.replace(/\n/g, '\r\n')).join(goodBtn1.replace(/\n/g, '\r\n'));
file = file.split(badBtn2).join(goodBtn1); // wait, goodBtn1 is just generic savePost
file = file.split(badBtn2.replace(/\n/g, '\r\n')).join(goodBtn1.replace(/\n/g, '\r\n'));

// 2. Add the correct onClick to showProfile
let index = 0;
file = file.replace(/<button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-\[#F2F2F2\] dark:hover:bg-\[#3A3B3C\] transition-colors text-left text-black dark:text-\[#E4E6EB\] font-semibold text-\[15px\]">\s*<svg className="w-6 h-6 text-gray-600 dark:text-\[#B0B3B8\]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" \/><\/svg>\s*\{t\('postMenu\.showProfile'\)\}\s*<\/button>/g, (match) => {
  index++;
  return index === 1 ? newShowProfileBtn1 : newShowProfileBtn2;
});

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Fixed onClick targets');
