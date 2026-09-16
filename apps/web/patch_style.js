const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const styleTag = `
      {/* Inline Styles for Scrollbars to bypass HMR issues */}
      <style dangerouslySetInnerHTML={{__html: \`
        .sidebar-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .sidebar-scrollbar::-webkit-scrollbar-thumb {
          background-color: transparent;
          border-radius: 9999px;
        }
        .sidebar-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
        }
        .dark .sidebar-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #4E4F50;
        }
      \`}} />
`;

// Insert it right after the Navbar or at the top of Main Container
const insertPoint = file.indexOf('{/* Main Container */}');
file = file.substring(0, insertPoint) + styleTag + file.substring(insertPoint);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Injected style tag');
