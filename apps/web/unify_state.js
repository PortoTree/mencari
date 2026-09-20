const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Remove selectedNewChatUsers state declaration
code = code.replace(
  /const \[selectedNewChatUsers, setSelectedNewChatUsers\] = useState<number\[\]>\(\[\]\);\r?\n/,
  ''
);

// 2. Replace all selectedNewChatUsers usages with selectedFriendsToAdd
code = code.replaceAll('selectedNewChatUsers', 'selectedFriendsToAdd');
code = code.replaceAll('setSelectedNewChatUsers', 'setSelectedFriendsToAdd');

// 3. Clean up the Sticky Footer onClick which would now be setSelectedFriendsToAdd(selectedFriendsToAdd)
const oldFooterLogic = `setSelectedFriendsToAdd(selectedFriendsToAdd);
                      setSelectedFriendsToAdd([]);
                      setIsCreatingGroup(true);`;
const newFooterLogic = `setIsCreatingGroup(true);`;
code = code.replaceAll(oldFooterLogic, newFooterLogic);

// 4. In the MiniListPreview, there is a "Create Chat" logic for 1 user
// onClick={() => { setActiveChatIdx(selectedFriendsToAdd[0]); setSelectedFriendsToAdd([]); ; setIsCreatingGroup(false); }}
// Need to make sure this is clean
code = code.replaceAll('setSelectedFriendsToAdd([]); ; setIsCreatingGroup(false);', 'setSelectedFriendsToAdd([]); setIsCreatingGroup(false); setShowAddIcons(false);');

// 5. Also, any place where we do `setSelectedFriendsToAdd([])` maybe we should also turn off `showAddIcons(false)`?
// Let's leave that for now, just the MiniListPreview one is fine.

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Unification applied successfully!');
