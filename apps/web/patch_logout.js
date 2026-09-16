const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldLogoutStr = `<button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors">
                    <div className="w-9 h-9 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] flex items-center justify-center shrink-0 overflow-hidden">
                      <svg className="w-[20px] h-[20px] text-black dark:text-[#E4E6EB]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>
                    </div>
                    <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">{t('dropdown.logout')}</span>
                  </button>`;

const newLogoutStr = `<button 
                    onClick={() => {
                      localStorage.removeItem("token");
                      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                      window.location.href = \`/\${locale}/login\`;
                    }}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] flex items-center justify-center shrink-0 overflow-hidden">
                      <svg className="w-5 h-5 text-black dark:text-[#E4E6EB] ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">{t('dropdown.logout')}</span>
                  </button>`;

if (file.includes(oldLogoutStr)) {
  file = file.replace(oldLogoutStr, newLogoutStr);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
  console.log('✅ Updated logout button (icon + function)');
} else {
  console.log('⚠️ Could not find exact oldLogoutStr. Trying to find it using split.');
  // More robust fallback
  const startIdx = file.indexOf('<button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors">');
  const searchStr = "{t('dropdown.logout')}</span>\r\n                  </button>";
  const searchStrLF = "{t('dropdown.logout')}</span>\n                  </button>";
  
  let endIdx = file.indexOf(searchStr, startIdx);
  let lengthToAdd = searchStr.length;
  
  if (endIdx === -1) {
    endIdx = file.indexOf(searchStrLF, startIdx);
    lengthToAdd = searchStrLF.length;
  }
  
  if (startIdx !== -1 && endIdx !== -1) {
    const chunk = file.substring(startIdx, endIdx + lengthToAdd);
    // double check it's the right chunk
    if (chunk.includes("dropdown.logout")) {
      file = file.replace(chunk, newLogoutStr);
      fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
      console.log('✅ Updated logout button using fallback strategy');
    }
  } else {
    console.log('❌ Still could not find logout block!');
  }
}
