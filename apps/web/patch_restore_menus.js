const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const missingMenus = `                  <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors">
                    <div className="w-9 h-9 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] flex items-center justify-center shrink-0 overflow-hidden">
                      <svg className="w-[20px] h-[20px] text-black dark:text-[#E4E6EB]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    </div>
                    <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">{t('dropdown.report')}</span>
                  </button>

                  <button 
                    onClick={() => setIsDarkMode(!isDarkMode)} 
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] flex items-center justify-center shrink-0 overflow-hidden">
                      {isDarkMode ? (
                        <svg className="w-[20px] h-[20px] text-black dark:text-[#E4E6EB]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.5-1.591a.75.75 0 10-1.061 1.06l1.5-1.591zM12 18.75a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM6.166 18.894a.75.75 0 001.06 1.06l1.5-1.591a.75.75 0 10-1.06-1.061l-1.591 1.59zM4.5 12a.75.75 0 01-.75.75H1.5a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM6.166 5.106a.75.75 0 00-1.06 1.06l1.591 1.59a.75.75 0 101.06-1.061l-1.5-1.59z" />
                        </svg>
                      ) : (
                        <svg className="w-[20px] h-[20px] text-black dark:text-[#E4E6EB]" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">{isDarkMode ? t('dropdown.lightMode') : t('dropdown.darkMode')}</span>
                  </button>\n\n`;

const targetAnchor = '<button \n                    onClick={() => {\n                      localStorage.removeItem("token");';
const targetAnchorWindows = '<button \r\n                    onClick={() => {\r\n                      localStorage.removeItem("token");';
const altAnchor = '<button \n                    onClick={() => {';
const altAnchorWindows = '<button \r\n                    onClick={() => {';

if (file.includes(targetAnchor)) {
  file = file.replace(targetAnchor, missingMenus + targetAnchor);
  console.log('✅ Restored missing menus');
} else if (file.includes(targetAnchorWindows)) {
  file = file.replace(targetAnchorWindows, missingMenus + targetAnchorWindows);
  console.log('✅ Restored missing menus (Windows CRLF)');
} else {
  // Let's just find the logout by the svg
  const logoutSvg = '<svg className="w-5 h-5 text-black dark:text-[#E4E6EB] ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">';
  const btnStart = file.lastIndexOf('<button', file.indexOf(logoutSvg));
  if (btnStart !== -1) {
    const p1 = file.substring(0, btnStart);
    const p2 = file.substring(btnStart);
    file = p1 + missingMenus + p2;
    console.log('✅ Restored missing menus using fallback');
  } else {
    console.log('⚠️ Could not find logout button to insert before');
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
