const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Add LocalStorage Logic
const stateDeclaration = "const [showAddIcons, setShowAddIcons] = useState(false);";
const stateWithEffect = `${stateDeclaration}
  
  useEffect(() => {
    const saved = localStorage.getItem('selectedFriendsToAdd');
    if (saved) {
      try {
        setSelectedFriendsToAdd(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedFriendsToAdd', JSON.stringify(selectedFriendsToAdd));
  }, [selectedFriendsToAdd]);`;

if (!code.includes("localStorage.getItem('selectedFriendsToAdd')")) {
  code = code.replace(stateDeclaration, stateWithEffect);
  console.log("Added localStorage hooks");
}

// 2. Replace Header Button
const oldHeaderRegex = /<div className="relative group\/addtoggle">[\s\S]*?<\/div>\s*<\/div>/;

// Find the exact block
const addToggleIdx = code.indexOf('<div className="relative group/addtoggle">');
if (addToggleIdx !== -1) {
  const endIdx = code.indexOf('</div>', code.indexOf('</div>', addToggleIdx) + 1) + 6;
  const block = code.substring(addToggleIdx, endIdx);
  
  const newBlock = `<div className="relative group/addtoggle">
                    <button
                      onClick={() => {
                        if (!showAddIcons) {
                          setShowAddIcons(true);
                        } else {
                          if (selectedFriendsToAdd.length === 0) {
                            setShowAddIcons(false);
                          } else {
                            setSelectedFriendsToAdd([]);
                          }
                        }
                      }}
                      className={\`w-9 h-9 rounded-full flex items-center justify-center transition-colors \${showAddIcons ? (selectedFriendsToAdd.length > 0 ? 'bg-red-100 dark:bg-red-900/30 text-red-500 hover:bg-red-200 dark:hover:bg-red-900/50' : 'bg-gray-200 dark:bg-[#3A3B3C] hover:bg-gray-300 dark:hover:bg-[#4E4F50] text-gray-600 dark:text-[#B0B3B8]') : 'bg-[#F0F2F5] dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] text-black dark:text-[#E4E6EB]'}\`}
                    >
                      {!showAddIcons ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                      ) : selectedFriendsToAdd.length > 0 ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      )}
                    </button>
                    <div className="absolute -bottom-9 right-0 px-2.5 py-1.5 bg-gray-800/90 text-[#E4E6EB] text-[13px] font-medium rounded-lg opacity-0 group-hover/addtoggle:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {!showAddIcons 
                        ? t('chat.showAddIcons') 
                        : selectedFriendsToAdd.length > 0 
                          ? \`(\${selectedFriendsToAdd.length}) \${t('chat.removeAll')}\` 
                          : t('chat.cancel')}
                    </div>
                  </div>`;
  
  code = code.substring(0, addToggleIdx) + newBlock + code.substring(endIdx);
  console.log("Updated add toggle header button");
} else {
  console.log("add toggle not found");
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
