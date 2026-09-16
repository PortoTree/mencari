const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const regex1 = /(<button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-\[#F2F2F2\] dark:hover:bg-\[#3A3B3C\] transition-colors text-left text-black dark:text-\[#E4E6EB\] font-semibold text-\[15px\]">)(\s*<svg[\s\S]*?<\/svg>\s*\{t\('postMenu\.showProfile'\)\}\s*<\/button>)/;

// We need to replace it twice, once for post1 (Pengguna) and once for post2 (Naufal faiz)
// But how do we distinguish them?
// Actually, let's just do a string replacement targeting the exact blocks.

const btn1 = `<button 
                      onClick={() => {
                        setSelectedProfile({ name: 'Pengguna', role: 'Member', avatar: '/default-avatar.svg' });
                        setIsProfileSidebarOpen(true);
                        setActivePostMenu(null);
                      }}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">`;

const btn2 = `<button 
                      onClick={() => {
                        setSelectedProfile({ name: 'Naufal faiz', role: 'Web Development', avatar: '/default-avatar.svg' });
                        setIsProfileSidebarOpen(true);
                        setActivePostMenu(null);
                      }}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">`;

// Find all matches of the button start
let index = 0;
file = file.replace(/<button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-\[#F2F2F2\] dark:hover:bg-\[#3A3B3C\] transition-colors text-left text-black dark:text-\[#E4E6EB\] font-semibold text-\[15px\]">\s*<svg[\s\S]*?<\/svg>\s*\{t\('postMenu\.showProfile'\)\}\s*<\/button>/g, (match) => {
  index++;
  const newBtn = index === 1 ? btn1 : btn2;
  return match.replace(/<button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-\[#F2F2F2\] dark:hover:bg-\[#3A3B3C\] transition-colors text-left text-black dark:text-\[#E4E6EB\] font-semibold text-\[15px\]">/, newBtn);
});

// Now inject the Sidebar Drawer at the very end of <main>
const drawerHTML = `
        {/* Profile Right Sidebar Drawer */}
        <>
          {/* Overlay */}
          <div 
            className={\`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 \${isProfileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}\`}
            onClick={() => setIsProfileSidebarOpen(false)}
          />
          
          {/* Drawer */}
          <div className={\`fixed top-0 right-0 h-full w-[350px] bg-white dark:bg-[#242526] shadow-xl z-[101] transition-transform duration-300 ease-in-out transform \${isProfileSidebarOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto\`}>
            {/* Close Button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-[#3E4042]">
              <h2 className="font-bold text-lg text-black dark:text-[#E4E6EB]">{t('profileSidebar.title')}</h2>
              <button onClick={() => setIsProfileSidebarOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-500 dark:text-[#B0B3B8] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            {/* Profile Details */}
            {selectedProfile && (
              <div className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-500 mb-3 shadow-sm">
                    <img src={selectedProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-xl text-black dark:text-[#E4E6EB]">{selectedProfile.name}</h3>
                  <p className="text-[15px] text-gray-500 dark:text-[#B0B3B8] mt-1">{selectedProfile.role}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-[#F0F2F5] dark:bg-[#3A3B3C] p-4 rounded-xl border border-gray-100 dark:border-[#4E4F50]">
                    <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8] font-semibold mb-1">{t('profileSidebar.email')}</p>
                    <p className="text-[15px] text-black dark:text-[#E4E6EB]">{selectedProfile.name.toLowerCase().replace(/\\s/g, '')}@example.com</p>
                  </div>
                  <div className="bg-[#F0F2F5] dark:bg-[#3A3B3C] p-4 rounded-xl border border-gray-100 dark:border-[#4E4F50]">
                    <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8] font-semibold mb-1">{t('profileSidebar.joined')}</p>
                    <p className="text-[15px] text-black dark:text-[#E4E6EB]">2026</p>
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl transition-colors shadow-sm">
                  {t('profileSidebar.message')}
                </button>
              </div>
            )}
          </div>
        </>
`;

file = file.replace(/<\/main>\s*<style jsx global>/, drawerHTML + '\n    </main>\n    <style jsx global>');
if(!file.includes(drawerHTML.trim().split('\n')[0])) {
   file = file.replace(/<\/main>\s*\);\s*\}\s*$/, drawerHTML + '\n    </main>\n  );\n}\n');
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Added profile sidebar');
