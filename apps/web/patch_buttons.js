const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Remove Back button
const backBtnRegex = /<button onClick=\{\(\) => \{setIsCreatingGroup\(false\); setSelectedFriendsToAdd\(\[\]\);\}\} className=\"w-9 h-9 rounded-full[^>]+>[\s\S]*?<\/button>\s*<h2/;
if (backBtnRegex.test(code)) {
  code = code.replace(backBtnRegex, '<h2');
  console.log('Back button removed');
} else {
  console.log('Back button not found');
}

// 2. Add Cancel button next to Create Group
const createBtnRegex = /(<div className="flex justify-end pt-2">\s*)<button onClick=\{\(\) => \{/;
if (createBtnRegex.test(code)) {
  code = code.replace(createBtnRegex, `<div className="flex justify-end gap-3 pt-2">
                    <button onClick={() => {
                      setIsCreatingGroup(false);
                      setSelectedFriendsToAdd([]);
                      setShowAddIcons(false);
                    }} className="hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-600 dark:text-gray-300 font-semibold text-[15px] py-2.5 px-6 rounded-xl transition-colors">
                      {t('chat.cancel')}
                    </button>
                    <button onClick={() => {`);
  console.log('Cancel button added');
} else {
  console.log('Create button container not found');
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
