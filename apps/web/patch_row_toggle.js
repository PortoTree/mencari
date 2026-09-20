const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const regex = /onClick=\{\(\) => \{\s*setActiveChatIdx\(realIdx\);\s*setIsChatInfoOpen\(true\);\s*setProfileViewIdx\(null\);\s*setIsCreatingGroup\(false\);\s*setSelectedFriendsToAdd\(\[\]\);\s*setShowAddIcons\(false\);\s*\}\}/g;

const replacement = `onClick={() => {
                        if (showAddIcons) {
                          const isAdded = selectedFriendsToAdd.includes(realIdx);
                          setSelectedFriendsToAdd(prev => isAdded ? prev.filter(i => i !== realIdx) : [...prev, realIdx]);
                        } else {
                          setActiveChatIdx(realIdx);
                          setIsChatInfoOpen(true);
                          setProfileViewIdx(null);
                          setIsCreatingGroup(false);
                          setSelectedFriendsToAdd([]);
                          setShowAddIcons(false);
                        }
                      }}`;

if (regex.test(code)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully updated row click handler!');
} else {
  console.log('Row click handler not found.');
}
