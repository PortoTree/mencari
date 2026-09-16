const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const newStyle = `
      {/* Inline Styles for Scrollbars to bypass HMR issues */}
      <style dangerouslySetInnerHTML={{__html: \`
        /* Firefox */
        .sidebar-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: transparent transparent;
        }
        .sidebar-scrollbar:hover {
          scrollbar-color: #d1d5db transparent;
        }
        .dark .sidebar-scrollbar:hover {
          scrollbar-color: #4E4F50 transparent;
        }

        /* WebKit / Chrome / Edge */
        .sidebar-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0); /* fully transparent */
          border-radius: 10px;
        }
        .sidebar-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #d1d5db; /* gray-300 */
        }
        .dark .sidebar-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #4E4F50;
        }
      \`}} />
`;

const oldStyleStart = file.indexOf('{/* Inline Styles for Scrollbars');
const oldStyleEnd = file.indexOf('</style>') + 8; // wait, there is no </style> because it's <style ... />

if (oldStyleStart !== -1) {
    const endTag = '/>';
    const oldStyleEndIdx = file.indexOf(endTag, oldStyleStart) + endTag.length;
    file = file.substring(0, oldStyleStart) + newStyle.trim() + '\n      ' + file.substring(oldStyleEndIdx);
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Updated style tag');
