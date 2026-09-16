const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// The structure is:
// line 537: </div>   <- closes space-y-1
// line 538: </div>   <- closes outer div (from <div>)
// line 539: </div>   <- EXTRA/WRONG closing tag
// line 540: )}       <- closes the {activeTab === 'friend' && (

// We need to remove line 539 (the extra </div>)
file = file.replace(
    `            </div>\n\`              </div>\n            )}`,
    `            </div>\n            )}`
);

// Try simpler approach: remove the extra </div> that appears between the two blocks
const bad = `          </div>
              </div>
            )}`;
const good = `          </div>
            )}`;

file = file.replace(bad, good);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Fixed extra closing div');
