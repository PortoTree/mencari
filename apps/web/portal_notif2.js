const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

// Find what's currently where notif panel should go (end of file)
// Find </main>
let mainClose = -1;
for (let i = lines.length - 1; i >= lines.length - 20; i--) {
  if (lines[i] && lines[i].includes('</main>')) {
    mainClose = i;
    break;
  }
}

// Also find the Notif panel block (it's still in the file, we need to check)
let notifStart = -1;
for (let i = 6000; i < lines.length; i++) {
  if (lines[i] && lines[i].includes('Notification Sidebar Panel')) {
    notifStart = i - 1;
    break;
  }
}

console.log('mainClose:', mainClose + 1, 'notifStart:', notifStart !== -1 ? notifStart + 1 : 'not found');

if (notifStart !== -1) {
  // Panel is still in file, just need to wrap with portal
  // Find end of notif block
  let notifEnd = -1;
  for (let i = notifStart; i < notifStart + 200; i++) {
    if (lines[i] && lines[i].includes('3 hari yang lalu')) {
      for (let j = i; j < i + 20; j++) {
        if (lines[j] && lines[j].trim() === '</div>') {
          notifEnd = j;
        }
      }
      break;
    }
  }
  
  console.log('notifEnd:', notifEnd + 1);
  
  // Extract
  const extracted = lines.splice(notifStart, notifEnd - notifStart + 1);
  
  // Re-find mainClose after splice
  mainClose = -1;
  for (let i = lines.length - 1; i >= lines.length - 20; i--) {
    if (lines[i] && lines[i].includes('</main>')) {
      mainClose = i;
      break;
    }
  }
  
  const portalBlock = [
    '',
    '  {/* Notification Panel Portal — mounts directly on document.body */',
    '  typeof window !== "undefined" && createPortal(',
    '    <>',
    ...extracted,
    '    </>,',
    '    document.body',
    '  )}',
  ];
  
  lines.splice(mainClose, 0, ...portalBlock);
} else {
  // Panel already removed, need to re-add it inside portal
  // This means the previous splice succeeded. The notif panel content is gone.
  // Let's just add a minimal portal wrapper with the content
  const portalBlock = [
    '',
    '{/* Notification Panel Portal */}',
    '{typeof window !== "undefined" && createPortal(',
    '  <>',
    '    <div onClick={() => setIsNotifPanelOpen(false)} className={`fixed inset-0 bg-black/30 backdrop-blur-[1px] z-[290] transition-opacity duration-300 ${isNotifPanelOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} />',
    '    <div ref={notifPanelRef} className={`fixed top-0 right-0 h-full w-[380px] max-w-[95vw] bg-white dark:bg-[#242526] shadow-2xl z-[300] flex flex-col transition-transform duration-300 ease-in-out ${isNotifPanelOpen ? "translate-x-0" : "translate-x-full"}`}>',
    '      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-[#3E4042] shrink-0">',
    '        <h2 className="text-[20px] font-bold text-black dark:text-[#E4E6EB]">Pemberitahuan</h2>',
    '        <button onClick={() => setIsNotifPanelOpen(false)} className="w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center justify-center transition-colors text-gray-500 dark:text-[#B0B3B8]">',
    '          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>',
    '        </button>',
    '      </div>',
    '      <div className="flex-1 overflow-y-auto sidebar-scrollbar overscroll-none p-4">',
    '        <p className="text-gray-400 text-center mt-8">Belum ada pemberitahuan</p>',
    '      </div>',
    '    </div>',
    '  </>,',
    '  document.body',
    ')}',
  ];
  lines.splice(mainClose, 0, ...portalBlock);
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Done - portal notif written');
