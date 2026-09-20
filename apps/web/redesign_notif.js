const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

// Find the portal block start (the comment line)
let portalStart = -1;
for (let i = 6035; i < 6055; i++) {
  if (lines[i] && lines[i].includes('Notification Panel Portal')) {
    portalStart = i;
    break;
  }
}

// Find where the portal ends (the closing )} after document.body)
let portalEnd = -1;
for (let i = 6170; i < 6195; i++) {
  if (lines[i] && lines[i].trim() === ')}') {
    portalEnd = i;
    break;
  }
}

console.log('Portal start:', portalStart + 1, 'end:', portalEnd + 1);

if (portalStart !== -1 && portalEnd !== -1) {
  // Replace entire portal block with the new popup panel design
  const newPortal = [
    `  {/* Notification Popup Panel — positioned below navbar, right side */}`,
    `  {isMounted && createPortal(`,
    `    <>`,
    `      {/* Click-outside invisible backdrop (no dark overlay) */}`,
    `      {isNotifPanelOpen && (`,
    `        <div`,
    `          onClick={() => setIsNotifPanelOpen(false)}`,
    `          className="fixed inset-0 z-[290]"`,
    `        />`,
    `      )}`,
    `      {/* Popup Panel */}`,
    `      <div`,
    `        ref={notifPanelRef}`,
    `        className={\`fixed top-[56px] right-4 w-[380px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-72px)] bg-white dark:bg-[#242526] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] z-[300] flex flex-col overflow-hidden transition-all duration-200 origin-top-right \${isNotifPanelOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}\`}`,
    `      >`,
    `        {/* Header */}`,
    `        <div className="flex items-center justify-between px-5 pt-4 pb-3 shrink-0">`,
    `          <h2 className="text-[20px] font-bold text-black dark:text-[#E4E6EB]">Pemberitahuan</h2>`,
    `          <button`,
    `            onClick={() => setIsNotifPanelOpen(false)}`,
    `            className="w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center justify-center transition-colors text-gray-500 dark:text-[#B0B3B8]"`,
    `          >`,
    `            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>`,
    `          </button>`,
    `        </div>`,
    `        {/* Filter Tabs */}`,
    `        <div className="flex gap-1 px-4 pb-2 shrink-0">`,
    `          {["Semua", "Belum Dibaca"].map((tab, idx) => (`,
    `            <button key={tab} className={\`px-3 py-1.5 rounded-full text-[13px] font-semibold transition-colors \${idx === 0 ? "bg-[#E7F3FF] dark:bg-[#263951] text-[#2D88FF]" : "bg-gray-100 dark:bg-[#3A3B3C] text-black dark:text-[#E4E6EB] hover:bg-gray-200 dark:hover:bg-[#4E4F50]"}\`}>{tab}</button>`,
    `          ))}`,
    `        </div>`,
    `        {/* Notification List */}`,
    `        <div className="flex-1 overflow-y-auto sidebar-scrollbar overscroll-none py-1">`,
    `          {/* Friend Request */}`,
    `          <div className="flex items-start gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors rounded-xl mx-1">`,
    `            <div className="relative shrink-0">`,
    `              <img src="/default-avatar.svg" className="w-14 h-14 rounded-full border border-gray-200 dark:border-[#3E4042] object-cover" />`,
    `              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white dark:border-[#242526]">`,
    `                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" /></svg>`,
    `              </div>`,
    `            </div>`,
    `            <div className="flex-1 min-w-0">`,
    `              <p className="text-[14px] text-black dark:text-[#E4E6EB] leading-snug"><span className="font-semibold">Budi Santoso</span> mengirimkan permintaan pertemanan kepada kamu.</p>`,
    `              <p className="text-[12px] text-[#00B47A] font-semibold mt-1">5 menit yang lalu</p>`,
    `              <div className="flex gap-2 mt-2">`,
    `                <button className="px-4 py-1.5 bg-[#00B47A] hover:bg-[#009E6B] text-white text-[13px] font-semibold rounded-lg transition-colors">Konfirmasi</button>`,
    `                <button className="px-4 py-1.5 bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] text-black dark:text-[#E4E6EB] text-[13px] font-semibold rounded-lg transition-colors">Hapus</button>`,
    `              </div>`,
    `            </div>`,
    `            <div className="w-3 h-3 rounded-full bg-[#00B47A] shrink-0 mt-1"></div>`,
    `          </div>`,
    `          {/* Like */}`,
    `          <div className="flex items-start gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors rounded-xl mx-1">`,
    `            <div className="relative shrink-0">`,
    `              <img src="/default-avatar.svg" className="w-14 h-14 rounded-full border border-gray-200 dark:border-[#3E4042] object-cover" />`,
    `              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white dark:border-[#242526]">`,
    `                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>`,
    `              </div>`,
    `            </div>`,
    `            <div className="flex-1 min-w-0">`,
    `              <p className="text-[14px] text-black dark:text-[#E4E6EB] leading-snug"><span className="font-semibold">Siti Aminah</span> menyukai postingan kamu.</p>`,
    `              <p className="text-[12px] text-[#00B47A] font-semibold mt-1">23 menit yang lalu</p>`,
    `            </div>`,
    `            <div className="w-3 h-3 rounded-full bg-[#00B47A] shrink-0 mt-1"></div>`,
    `          </div>`,
    `          {/* Comment */}`,
    `          <div className="flex items-start gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors rounded-xl mx-1">`,
    `            <div className="relative shrink-0">`,
    `              <img src="/default-avatar.svg" className="w-14 h-14 rounded-full border border-gray-200 dark:border-[#3E4042] object-cover" />`,
    `              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#2D88FF] rounded-full flex items-center justify-center border-2 border-white dark:border-[#242526]">`,
    `                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg>`,
    `              </div>`,
    `            </div>`,
    `            <div className="flex-1 min-w-0">`,
    `              <p className="text-[14px] text-black dark:text-[#E4E6EB] leading-snug"><span className="font-semibold">Agus Pratama</span> mengomentari postingan kamu: <span className="italic">"Keren banget bro!"</span></p>`,
    `              <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8] font-semibold mt-1">2 jam yang lalu</p>`,
    `            </div>`,
    `          </div>`,
    `          {/* Group Invite */}`,
    `          <div className="flex items-start gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors rounded-xl mx-1">`,
    `            <div className="relative shrink-0">`,
    `              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">`,
    `                <svg className="w-7 h-7 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>`,
    `              </div>`,
    `            </div>`,
    `            <div className="flex-1 min-w-0">`,
    `              <p className="text-[14px] text-black dark:text-[#E4E6EB] leading-snug"><span className="font-semibold">Dewi Lestari</span> mengundangmu ke grup <span className="font-semibold">Programmer Jakarta</span>.</p>`,
    `              <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8] font-semibold mt-1">Kemarin 14:30</p>`,
    `            </div>`,
    `          </div>`,
    `          {/* Mention */}`,
    `          <div className="flex items-start gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors rounded-xl mx-1 opacity-60">`,
    `            <div className="relative shrink-0">`,
    `              <img src="/default-avatar.svg" className="w-14 h-14 rounded-full border border-gray-200 dark:border-[#3E4042] object-cover" />`,
    `              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center border-2 border-white dark:border-[#242526]">`,
    `                <span className="text-white text-[11px] font-bold">@</span>`,
    `              </div>`,
    `            </div>`,
    `            <div className="flex-1 min-w-0">`,
    `              <p className="text-[14px] text-black dark:text-[#E4E6EB] leading-snug"><span className="font-semibold">Andi Wijaya</span> menyebutmu di sebuah komentar.</p>`,
    `              <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8] font-semibold mt-1">3 hari yang lalu</p>`,
    `            </div>`,
    `          </div>`,
    `        </div>`,
    `      </div>`,
    `    </>,`,
    `    document.body`,
    `  )}`,
  ];

  lines.splice(portalStart, portalEnd - portalStart + 1, ...newPortal);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
  console.log('Notification popup panel redesigned');
} else {
  console.log('Could not find portal block', portalStart, portalEnd);
}
