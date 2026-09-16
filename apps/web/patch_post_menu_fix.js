const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

function getPostDropdown(postId) {
  return `<div className="relative" \${activePostMenu === '${postId}' ? 'ref={postMenuRef}' : ''}>
                <button 
                  onClick={() => setActivePostMenu(activePostMenu === '${postId}' ? null : '${postId}')}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-500 dark:text-[#B0B3B8] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg>
                </button>

                {activePostMenu === '${postId}' && (
                  <div className="absolute right-0 mt-1 w-[260px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] p-2 z-[100]">
                    <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                      <svg className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                      {t('postMenu.savePost')}
                    </button>
                    <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                      <svg className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      {t('postMenu.reportPost')}
                    </button>
                    <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                      <svg className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      {t('postMenu.showProfile')}
                    </button>
                  </div>
                )}
              </div>`;
}

// Pengguna Post
const penggunaMatch = file.match(/<div className="flex items-center gap-3 pb-2 px-4">[\s\S]*?<h3 className="font-bold text-black dark:text-\[#E4E6EB\] text-\[15px\] leading-tight">Pengguna<\/h3>[\s\S]*?<\/div>\r?\n\s*<\/div>/);
if (penggunaMatch) {
  const orig = penggunaMatch[0];
  const newHTML = `<div className="flex items-center justify-between pb-2 px-4 relative">
              <div className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                    <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                <div>
                  <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight">Pengguna</h3>
                  <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8]">{formatPostTime(Date.now() - 3 * 60000, t, locale)}</p>
                </div>
              </div>
              ${getPostDropdown('post1')}
            </div>`;
  file = file.replace(orig, newHTML);
  console.log('✅ Replaced Pengguna post');
} else {
  console.log('⚠️ Failed to match Pengguna post');
}

// Naufal Post
const naufalMatch = file.match(/<div className="flex items-center gap-3 pb-2 px-4">[\s\S]*?<h3 className="font-bold text-black dark:text-\[#E4E6EB\] text-\[15px\] leading-tight">Naufal faiz<\/h3>[\s\S]*?<\/div>\r?\n\s*<\/div>/);
if (naufalMatch) {
  const orig = naufalMatch[0];
  const newHTML = `<div className="flex items-center justify-between pb-2 px-4 relative">
              <div className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                    <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                <div>
                  <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight">Naufal faiz</h3>
                  <div className="text-[13px] text-gray-500 dark:text-[#B0B3B8] flex items-center gap-1">
                    <span>Web Development</span>
                    <span>·</span>
                    <span>{formatPostTime(Date.now() - 2 * 3600000, t, locale)}</span>
                  </div>
                </div>
              </div>
              ${getPostDropdown('post2')}
            </div>`;
  file = file.replace(orig, newHTML);
  console.log('✅ Replaced Naufal post');
} else {
  console.log('⚠️ Failed to match Naufal post');
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
