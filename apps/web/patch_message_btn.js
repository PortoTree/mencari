const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const target = `                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button className="flex-[1.5] bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                      <span className="text-[14px]">{t('profileSidebar.addFriend')}</span>
                    </button>
                    <button className="flex-1 bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#D8DADF] dark:hover:bg-[#4E4F50] text-black dark:text-[#E4E6EB] font-semibold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center">
                      <span className="text-[14px]">{t('profileSidebar.openProfile')}</span>
                    </button>
                  </div>`;

const replacement = `                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <button className="flex-[1.5] bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                        <span className="text-[14px]">{t('profileSidebar.addFriend')}</span>
                      </button>
                      <button className="flex-1 bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#D8DADF] dark:hover:bg-[#4E4F50] text-black dark:text-[#E4E6EB] font-semibold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center">
                        <span className="text-[14px]">{t('profileSidebar.openProfile')}</span>
                      </button>
                    </div>
                    <button className="w-full bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#D8DADF] dark:hover:bg-[#4E4F50] text-black dark:text-[#E4E6EB] font-semibold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                      <span className="text-[14px]">{t('profileSidebar.message')}</span>
                    </button>
                  </div>`;

// Manual index replacement using string split to avoid regex issues
let parts = file.split(target);
if (parts.length === 1) {
  parts = file.split(target.replace(/\n/g, '\r\n'));
}

if (parts.length > 1) {
  file = parts.join(replacement.replace(/\n/g, parts[0].includes('\r\n') ? '\r\n' : '\n'));
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
  console.log('✅ Added send message button');
} else {
  console.log('⚠️ Could not find target');
}
