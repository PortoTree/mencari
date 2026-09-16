const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldWrapper = `{activeTab === 'friend' && (
            <div className="w-full flex flex-col items-center pt-6 max-w-[680px]">
              <div className="w-full max-w-[590px] px-4 space-y-4">
                
                {/* Create Post Input */}`;

const newWrapper = `{activeTab === 'friend' && (
            <div className="space-y-4 max-w-[590px] w-full px-4 pt-6 lg:pt-0">
                
                {/* Create Post Input */}`;

file = file.split(oldWrapper).join(newWrapper);
file = file.split(oldWrapper.replace(/\n/g, '\r\n')).join(newWrapper.replace(/\n/g, '\r\n'));

// Wait, I need to remove one closing div if I removed one from the opening!
const oldClose = `</div>
            </div>
          )}
          <div className={\`space-y-4 max-w-[590px] w-full px-4 \${activeTab !== 'home' ? 'hidden' : ''}\`}>`;

const newClose = `            </div>
          )}
          <div className={\`space-y-4 max-w-[590px] w-full px-4 \${activeTab !== 'home' ? 'hidden' : ''}\`}>`;

file = file.split(oldClose).join(newClose);
file = file.split(oldClose.replace(/\n/g, '\r\n')).join(newClose.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Removed extra wrapper on friend tab');
