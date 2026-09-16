const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Add state for modal
file = file.replace(
  'const [isChatExpanded, setIsChatExpanded] = useState(false);',
  'const [isChatExpanded, setIsChatExpanded] = useState(false);\n  const [isShortcutModalOpen, setIsShortcutModalOpen] = useState(false);'
);

// 2. Replace the action buttons with the Add Shortcut button
const oldButtons = `{/* Google-style Action Buttons */}
              <div className="flex gap-3 mt-8">
                <button className="px-4 py-2 bg-[#F8F9FA] dark:bg-[#303134] hover:border-gray-300 dark:hover:border-gray-500 text-[#3C4043] dark:text-[#E8EAED] text-[14px] rounded border border-transparent transition-colors">
                  Penelusuran Mencari
                </button>
                <button className="px-4 py-2 bg-[#F8F9FA] dark:bg-[#303134] hover:border-gray-300 dark:hover:border-gray-500 text-[#3C4043] dark:text-[#E8EAED] text-[14px] rounded border border-transparent transition-colors">
                  Saya Sedang Beruntung
                </button>
              </div>`;

const newButton = `{/* Add Shortcut Button */}
              <div className="mt-8">
                <div onClick={() => setIsShortcutModalOpen(true)} className="flex flex-col items-center cursor-pointer group p-3 rounded-lg hover:bg-[#F2F2F2] dark:hover:bg-[#303134] transition-colors">
                  <div className="w-12 h-12 bg-[#F0F2F5] dark:bg-[#3A3B3C] rounded-full flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-medium text-black dark:text-[#E4E6EB]">Tambahkan pintasan</span>
                </div>
              </div>`;

file = file.split(oldButtons).join(newButton);
file = file.split(oldButtons.replace(/\n/g, '\r\n')).join(newButton.replace(/\n/g, '\r\n'));

// 3. Inject the modal at the end of the return statement, before </main>
const oldMainEnd = `    </main>
  );
}`;

const modal = `
      {/* Add Shortcut Modal */}
      {isShortcutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-[#242526] w-full max-w-[400px] rounded-lg shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200 dark:border-[#3E4042]">
              <h2 className="text-[16px] font-semibold text-black dark:text-[#E4E6EB]">Tambahkan pintasan</h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-[13px] text-gray-600 dark:text-[#B0B3B8] mb-1">Nama</label>
                <input type="text" className="w-full bg-[#F0F2F5] dark:bg-[#3A3B3C] text-black dark:text-[#E4E6EB] rounded px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-[13px] text-gray-600 dark:text-[#B0B3B8] mb-1">URL</label>
                <input type="text" className="w-full bg-[#F0F2F5] dark:bg-[#3A3B3C] text-black dark:text-[#E4E6EB] rounded px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="px-5 py-4 flex justify-end gap-2 bg-[#F8F9FA] dark:bg-[#303134] border-t border-gray-200 dark:border-[#3E4042]">
              <button 
                onClick={() => setIsShortcutModalOpen(false)}
                className="px-4 py-2 rounded-md text-[14px] font-medium text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-200 dark:hover:bg-[#4E4F50] transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={() => setIsShortcutModalOpen(false)}
                className="px-4 py-2 rounded-md text-[14px] font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}`;

file = file.split(oldMainEnd).join(modal);
file = file.split(oldMainEnd.replace(/\n/g, '\r\n')).join(modal.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Replaced buttons with Shortcut Icon and added Modal');
