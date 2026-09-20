const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const regex = /onClick=\{\(\) => \{\s*if \(\!showAddIcons\) \{\s*setShowAddIcons\(true\);\s*\} else \{\s*setIsCreatingGroup\(false\);\s*if \(selectedFriendsToAdd\.length === 0\) \{\s*setShowAddIcons\(false\);\s*\} else \{\s*setSelectedFriendsToAdd\(\[\]\);\s*\}\s*\}\s*\}\}/;

if (regex.test(code)) {
  code = code.replace(
    regex,
    `onClick={() => {
                        if (!showAddIcons) {
                          setShowAddIcons(true);
                        } else {
                          if (selectedFriendsToAdd.length === 0) {
                            setShowAddIcons(false);
                            setIsCreatingGroup(false);
                          } else {
                            setSelectedFriendsToAdd([]);
                          }
                        }
                      }}`
  );
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully updated toggle click handler again!');
} else {
  console.log('Block not found');
}
