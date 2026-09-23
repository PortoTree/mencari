const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const startStr = '{/* Filters / Chips */}';
const startIdx = code.indexOf(startStr);

if (startIdx !== -1) {
  // Find the closing </div> of this block
  // It ends after the .map() block: `                      </button>\n                    ))}\n                  </div>`
  
  const endSearchStr = '                  </div>';
  let endIdx = code.indexOf(endSearchStr, startIdx + 1000); // give it some room to skip the first lines
  
  // Actually, to be safe, let's just find the exact string that ends the block.
  const exactEndStr = `                      </button>\r\n                    ))}\r\n                  </div>`;
  const exactEndIdx = code.indexOf(exactEndStr, startIdx);
  
  if (exactEndIdx !== -1) {
    const blockToRemove = code.substring(startIdx, exactEndIdx + exactEndStr.length);
    code = code.replace(blockToRemove, '');
    fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
    console.log('Successfully removed the center filter chips.');
  } else {
    console.log('Could not find the exact end of the filter block.');
    console.log(code.substring(startIdx + 1000, startIdx + 1200));
  }
} else {
  console.log('Could not find start of filter block');
}
