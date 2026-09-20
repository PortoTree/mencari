const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Hapus state isNewChatPanelOpen
code = code.replace(
  "  const [isNewChatPanelOpen, setIsNewChatPanelOpen] = useState(false);\n",
  ""
);

// 2. Hapus button + (new chat) di left sidebar (seluruh wrapper div-nya)
code = code.replace(
  `                  <div className="relative group/newchat">\r\n                    <button onClick={() => setIsNewChatPanelOpen(true)} className="w-9 h-9 rounded-full bg-[#F0F2F5] dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] flex items-center justify-center transition-colors text-black dark:text-[#E4E6EB]">\r\n                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">\r\n                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />\r\n                      </svg>\r\n                    </button>\r\n                    <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-gray-800/90 text-[#E4E6EB] text-[13px] font-medium rounded-lg opacity-0 group-hover/newchat:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">\r\n                      {t('chat.newChatTooltip')}\r\n                    </div>\r\n                  </div>`,
  ``
);

// 3. Ganti tooltip "selectedUsers" jadi "Remove" di kedua list (online & offline) 
// Ganti semua kemunculan {isAdded ? t('chat.selectedUsers') : t('chat.addFriend')} 
code = code.replaceAll(
  "{isAdded ? t('chat.selectedUsers') : t('chat.addFriend')}",
  "{isAdded ? t('chat.removeFromList') : t('chat.addFriend')}"
);

// 4. Tambahkan state showAddIcons jika belum ada
if (!code.includes('showAddIcons')) {
  code = code.replace(
    "  const [selectedFriendsToAdd, setSelectedFriendsToAdd] = useState<number[]>([]);",
    "  const [selectedFriendsToAdd, setSelectedFriendsToAdd] = useState<number[]>([]);\n  const [showAddIcons, setShowAddIcons] = useState(false);"
  );
}

// 5. Update header sidebar kanan: tambah tombol +, ubah opacity icon jadi conditional
// Update div header sidebar kanan
code = code.replace(
  `              <div className="pt-4 px-4 border-b border-gray-200 dark:border-[#3E4042]">\r\n                <h2 className="font-bold text-[24px] text-black dark:text-[#E4E6EB]">\r\n                  {t('chat.yourFriends')}\r\n                </h2>\r\n                <div className="mt-3 relative pb-3">`,
  `              <div className="pt-4 px-4 border-b border-gray-200 dark:border-[#3E4042]">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-[24px] text-black dark:text-[#E4E6EB]">
                    {t('chat.yourFriends')}
                  </h2>
                  <div className="relative group/addtoggle">
                    <button
                      onClick={() => setShowAddIcons(!showAddIcons)}
                      className={\`w-9 h-9 rounded-full flex items-center justify-center transition-colors \${showAddIcons ? 'bg-[#1877F2] text-white' : 'bg-[#F0F2F5] dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] text-black dark:text-[#E4E6EB]'}\`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </button>
                    <div className="absolute -bottom-9 right-0 px-2.5 py-1.5 bg-gray-800/90 text-[#E4E6EB] text-[13px] font-medium rounded-lg opacity-0 group-hover/addtoggle:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {showAddIcons ? t('chat.hideAddIcons') : t('chat.showAddIcons')}
                    </div>
                  </div>
                </div>
                <div className="mt-3 relative pb-3">`
);

// 6. Ubah opacity-0 group-hover:opacity-100 jadi conditional showAddIcons
//    Karena ada 2 blok (online & offline), replaceAll
code = code.replaceAll(
  'className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"',
  'className={`flex items-center gap-1 transition-opacity shrink-0 ${showAddIcons ? \'opacity-100\' : \'opacity-0 group-hover:opacity-100\'}`}'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('All changes applied!');
