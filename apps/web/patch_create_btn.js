const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const searchRegex = /<button onClick=\{\(\) => \{\s*setIsCreatingGroup\(false\);\s*setSelectedFriendsToAdd\(\[\]\);\s*setActiveChatIdx\(0\);\s*\}\} className="bg-\[\#1877F2\][^"]+"[^>]*>[\s\S]*?\{t\('chat\.createGroupBtn'\)\}\s*<\/button>/;

const replacement = `<button 
                      onClick={() => {
                        setIsCreatingGroup(false);
                        setSelectedFriendsToAdd([]);
                        setActiveChatIdx(0); 
                      }} 
                      disabled={selectedFriendsToAdd.length === 0}
                      className={\`font-semibold text-[15px] py-2.5 px-8 rounded-xl transition-colors flex items-center justify-center \${
                        selectedFriendsToAdd.length === 0
                          ? 'bg-gray-200 dark:bg-[#3A3B3C] text-gray-400 dark:text-gray-500 cursor-not-allowed'
                          : 'bg-[#1877F2] hover:bg-blue-600 text-white shadow-sm'
                      }\`}
                    >
                      {t('chat.createGroupBtn')}
                    </button>`;

if (searchRegex.test(code)) {
  code = code.replace(searchRegex, replacement);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully updated button via regex');
} else {
  console.log('Regex failed!');
}
