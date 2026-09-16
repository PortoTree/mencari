const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// The problem: there's a double closing </div> because the patch extracted
// innerEnd wrong. We have:
//   </div>      <- closes space-y-1
// </div>        <- closes outer div (from rightFriendBlock)
//   </div>      <- extra leftover from patch
// 
// Fix: replace the duplicated closing tag pattern
const bad = `            </div>
          </div>
              </div>
            )}`;

const good = `            </div>
              </div>
            )}`;

file = file.replace(bad, good);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Fixed extra closing div');
