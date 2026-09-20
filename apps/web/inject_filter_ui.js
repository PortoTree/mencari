const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldTabs = `        {/* Filter Tabs */}
        <div className="flex gap-1 px-4 pb-2 shrink-0">
          {[t("notif.all"), t("notif.unread")].map((tab, idx) => (
            <button key={tab} className={\`px-3 py-1.5 rounded-full text-[13px] font-semibold transition-colors \${idx === 0 ? "bg-[#E7F3FF] dark:bg-[#263951] text-[#2D88FF]" : "bg-gray-100 dark:bg-[#3A3B3C] text-black dark:text-[#E4E6EB] hover:bg-gray-200 dark:hover:bg-[#4E4F50]"}\`}>{tab}</button>
          ))}
        </div>`;

const newTabs = `        {/* Filter Tabs */}
        <div className="flex items-center justify-between px-4 pb-2 shrink-0">
          <div className="flex gap-1">
            {[t("notif.all"), t("notif.unread")].map((tab, idx) => (
              <button key={tab} className={\`px-3 py-1.5 rounded-full text-[13px] font-semibold transition-colors \${idx === 0 ? "bg-[#E7F3FF] dark:bg-[#263951] text-[#2D88FF]" : "bg-gray-100 dark:bg-[#3A3B3C] text-black dark:text-[#E4E6EB] hover:bg-gray-200 dark:hover:bg-[#4E4F50]"}\`}>{tab}</button>
            ))}
          </div>
          <div className="relative" ref={notifFilterRef}>
            <button
              onClick={(e) => { e.stopPropagation(); setIsNotifFilterOpen(!isNotifFilterOpen); }}
              className={\`w-8 h-8 rounded-full flex items-center justify-center transition-colors text-black dark:text-[#E4E6EB] \${isNotifFilterOpen ? "bg-[#E7F3FF] dark:bg-[#263951] text-[#2D88FF]" : "hover:bg-gray-200 dark:hover:bg-[#3A3B3C]"}\`}
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
            {isNotifFilterOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-10 w-[240px] bg-white dark:bg-[#3A3B3C] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-gray-100 dark:border-[#4E4F50] overflow-hidden z-10"
              >
                <button
                  onClick={() => setIsNotifFilterOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-200 dark:hover:bg-[#4E4F50] transition-colors text-left text-[14px] text-black dark:text-[#E4E6EB]"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#4E4F50] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <span className="font-medium">{t("notif.filterMessage")}</span>
                </button>
                <button
                  onClick={() => setIsNotifFilterOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-200 dark:hover:bg-[#4E4F50] transition-colors text-left text-[14px] text-black dark:text-[#E4E6EB]"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#4E4F50] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <span className="font-medium">{t("notif.filterFriend")}</span>
                </button>
                <button
                  onClick={() => setIsNotifFilterOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-200 dark:hover:bg-[#4E4F50] transition-colors text-left text-[14px] text-black dark:text-[#E4E6EB]"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#4E4F50] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className="font-medium">{t("notif.filterGroup")}</span>
                </button>
              </div>
            )}
          </div>
        </div>`;

code = code.replace(oldTabs, newTabs);
fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('UI Filter injected');
