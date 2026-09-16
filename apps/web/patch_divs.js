const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const badEnd = `          </div>

          </div>
        </div>
            </>
          )}
        </div>

        {/* Right Sidebar (Chat Panel) */}`;
const goodEnd = `          </div>
            </>
          )}
        </div>

        {/* Right Sidebar (Chat Panel) */}`;

file = file.split(badEnd).join(goodEnd);
file = file.split(badEnd.replace(/\n/g, '\r\n')).join(goodEnd.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Removed extra divs');
