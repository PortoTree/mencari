const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// ============================================================
// 1. Extract the inner content of the Right Friend List sidebar
// ============================================================
const rightFriendStart = file.indexOf('{/* Right Sidebar: Friend List (Friend Tab) */}');
const rightFriendEnd = file.indexOf('{/* Right Sidebar (Chat Panel) */}');
const rightFriendBlock = file.substring(rightFriendStart, rightFriendEnd);

// Extract just the inner list content (header + list)
const innerStart = rightFriendBlock.indexOf('<div className="flex items-center justify-between mb-2 px-2">');
const innerEnd = rightFriendBlock.lastIndexOf('</div>') + 6; // closing of space-y-1 parent div
const friendListInner = rightFriendBlock.substring(innerStart, innerEnd);

// Remove the right friend sidebar block
file = file.replace(rightFriendBlock, '');

// ============================================================
// 2. In the Left Sidebar, after the ternary for mencari/profile,
//    add a new condition for 'friend' tab showing friend list
// ============================================================

// The left sidebar currently is: 
//   {activeTab === 'mencari' ? (...CTA...) : (...ProfileCard...)}
//   {activeTab === 'home' && (...NavLinks...)}
//
// We will replace:  {/* Navigation Links */}
// to insert friend list BEFORE it

const insertPoint = '{/* Navigation Links */}';

const friendBlock = `{/* Friend List (Friend Tab) */}
            {activeTab === 'friend' && (
              <div>
                ${friendListInner}
              </div>
            )}

          ${insertPoint}`;

file = file.replace(insertPoint, friendBlock);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Moved Friend List to Left Sidebar');
