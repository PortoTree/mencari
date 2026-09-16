const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const rightSidebarStart = file.indexOf('{/* Right Sidebar: History (Mencari) */}');
const rightSidebarEnd = file.indexOf('{/* Chat Bubbles (Always Rendered) */}');
const rightSidebarBlock = file.substring(rightSidebarStart, rightSidebarEnd);

const innerStart = rightSidebarBlock.indexOf('<div className="flex items-center justify-between mb-2 px-2">');
const innerEnd = rightSidebarBlock.lastIndexOf('</div>', rightSidebarBlock.lastIndexOf('</div>') - 1) + 6;
const innerContent = rightSidebarBlock.substring(innerStart, innerEnd);

// Find the CTA block
const ctaStart = file.indexOf('{/* Profile Card / Bookmarks Area */}');
const ctaEndStr = `</button>
                </div>
              </div>
            ) : (`;
const ctaEnd = file.indexOf(ctaEndStr) + ctaEndStr.indexOf(') : (');

const ctaBlock = file.substring(ctaStart, ctaEnd);
const newCtaBlock = ctaBlock.replace(
    "{activeTab === 'mencari' ? (",
    "{activeTab === 'mencari' ? (\n              <>\n"
) + `\n                {/* History Block (Moved from Right) */}\n                <div>\n                  ${innerContent}\n                </div>\n              </>`;

file = file.replace(ctaBlock, newCtaBlock);
file = file.replace(rightSidebarBlock, '');

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Safely moved History block');
