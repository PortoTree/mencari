const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Remove the empty closing of ternary and `)}` that was accidentally placed before the feed
const badTernaryClose = `            <>

            </>
          )}
<div className="space-y-4 max-w-[590px] w-full px-4">`;
const fixedTernaryOpen = `            <>
<div className="space-y-4 max-w-[590px] w-full px-4">`;

file = file.split(badTernaryClose).join(fixedTernaryOpen);
file = file.split(badTernaryClose.replace(/\n/g, '\r\n')).join(fixedTernaryOpen.replace(/\n/g, '\r\n'));

// 2. Find where the feed ends and properly close the ternary there
const badFeedEnd = `                </div>
             </div>
          </div>
        </div>

    
        {/* Profile Right Sidebar */}`;
const fixedFeedEnd = `                </div>
             </div>
          </div>
        </div>
            </>
          )}

    
        {/* Profile Right Sidebar */}`;

file = file.split(badFeedEnd).join(fixedFeedEnd);
file = file.split(badFeedEnd.replace(/\n/g, '\r\n')).join(fixedFeedEnd.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Fixed ternary placement around feed');
