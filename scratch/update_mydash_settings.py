import sys

with open('apps/web/src/app/[locale]/mydash/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update import
content = content.replace(
    'import { useTranslations } from "next-intl";',
    'import { useTranslations, useLocale } from "next-intl";'
)

# 2. Add states to MyDashPage
target_state_hook = '  const [collections, setCollections] = useState<any[]>(initialCollections);'
new_states = '''  const [collections, setCollections] = useState<any[]>(initialCollections);
  const locale = useLocale();
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const settingsBtnRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (settingsBtnRef.current && !settingsBtnRef.current.contains(target) && !target.closest('.settings-popup-container')) {
        setIsSettingsMenuOpen(false);
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
'''
content = content.replace(target_state_hook, new_states)

# 3. Replace Settings Icon button in sidebar
settings_btn_target = '''            {/* Settings Icon */}
            <button 
              onClick={() => handleTabChange("settings")}
              className={`flex flex-col items-center justify-center gap-1.5 w-14 h-14 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-[#f3f4f6] dark:bg-[#3A3B3C] text-emerald-500 shadow-sm' : 'bg-transparent text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C]'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span className="text-[9px] font-bold">{t("mydash.settings")}</span>
            </button>'''

settings_btn_replacement = '''            {/* Settings Icon */}
            <div className="relative">
              <button 
                ref={settingsBtnRef}
                onClick={() => setIsSettingsMenuOpen(!isSettingsMenuOpen)}
                className={`flex flex-col items-center justify-center gap-1.5 w-14 h-14 rounded-xl transition-colors ${isSettingsMenuOpen ? 'bg-[#f3f4f6] dark:bg-[#3A3B3C] text-emerald-500 shadow-sm' : 'bg-transparent text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C]'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span className="text-[9px] font-bold">{t("mydash.settings")}</span>
              </button>

              {isSettingsMenuOpen && (
                <div className="absolute left-[calc(100%+8px)] bottom-0 mb-0 w-[300px] settings-popup-container bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] p-4 z-[10200]">
                  <div className="bg-[#F2F2F2] dark:bg-[#3A3B3C] rounded-xl p-3 flex items-center gap-3 mb-2 shadow-sm border border-gray-100 dark:border-[#3E4042]">
                    <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-emerald-600 dark:border-emerald-400">
                      <img
                        src="/default-avatar.svg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-[15px] text-black dark:text-[#E4E6EB] leading-tight">
                        {currentUser.username}
                      </h3>
                      <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8]">
                        Premium Plan
                      </p>
                    </div>
                  </div>

                  <div className="w-full h-[1px] bg-gray-200 dark:bg-[#3A3B3C] my-3"></div>

                  <div className="space-y-1">
                    {/* Theme Switcher */}
                    <button
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors group/item"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#E4E6EB] dark:bg-[#2A2B2C] flex items-center justify-center shrink-0 overflow-hidden text-gray-600 dark:text-[#E4E6EB] group-hover/item:text-black dark:group-hover/item:text-emerald-400">
                          {isDarkMode ? (
                            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.5-1.591a.75.75 0 10-1.061 1.06l1.5-1.591zM12 18.75a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM6.166 18.894a.75.75 0 001.06 1.06l1.5-1.591a.75.75 0 10-1.06-1.061l-1.591 1.59zM4.5 12a.75.75 0 01-.75.75H1.5a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM6.166 5.106a.75.75 0 00-1.06 1.06l1.591 1.59a.75.75 0 101.06-1.061l-1.5-1.59z" /></svg>
                          ) : (
                            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" /></svg>
                          )}
                        </div>
                        <span className="font-semibold text-[14px] text-gray-700 dark:text-[#E4E6EB]">
                          {isDarkMode ? "Light Mode" : "Dark Mode"}
                        </span>
                      </div>
                    </button>

                    {/* Language Menu Toggle */}
                    <div className="relative">
                      <button
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors group/item"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#E4E6EB] dark:bg-[#2A2B2C] flex items-center justify-center shrink-0 overflow-hidden">
                            {locale === "id" ? (
                              <svg className="w-[18px] h-[18px] rounded-sm shrink-0 shadow-[0_0_2px_rgba(0,0,0,0.2)]" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#ED2939" d="M0 0h36v18H0z" />
                                <path fill="#fff" d="M0 18h36v18H0z" />
                              </svg>
                            ) : (
                              <svg className="w-[18px] h-[18px] rounded-sm shrink-0 shadow-[0_0_2px_rgba(0,0,0,0.2)]" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#0A3161" d="M0 0h36v36H0z" />
                                <path fill="#B31942" d="M0 4.5h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0z" />
                                <path fill="#fff" d="M0 9h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0z" />
                                <path fill="#0A3161" d="M0 0h18v18H0z" />
                                <path fill="#fff" d="M3 3h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM3 7h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM3 11h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z" />
                              </svg>
                            )}
                          </div>
                          <span className="font-semibold text-[14px] text-gray-700 dark:text-[#E4E6EB]">
                            {locale === "id" ? "Bahasa Indonesia" : "English"}
                          </span>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>

                      {/* Language Dropdown */}
                      {isLangOpen && (
                        <div className="absolute left-[100%] top-[-20px] ml-2 w-[160px] bg-white dark:bg-[#1C1D1F] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.2)] border border-gray-200 dark:border-[#3E4042] p-2 z-[10300]">
                          <button
                            onClick={() => {
                              document.cookie = `NEXT_LOCALE=id; path=/; max-age=31536000; SameSite=Lax`;
                              localStorage.setItem("NEXT_LOCALE", "id");
                              const currentPath = window.location.pathname;
                              const pathWithoutLocale = currentPath.replace(/^\/(id|en)/, "");
                              window.location.href = "/id" + (pathWithoutLocale || "/home");
                            }}
                            className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${locale === "id" ? "bg-[#E4E6EB] dark:bg-[#3A3B3C]" : "hover:bg-gray-100 dark:hover:bg-[#3A3B3C]"}`}
                          >
                            <svg className="w-[16px] h-[16px] rounded-sm shrink-0 shadow-[0_0_2px_rgba(0,0,0,0.2)]" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill="#ED2939" d="M0 0h36v18H0z" />
                              <path fill="#fff" d="M0 18h36v18H0z" />
                            </svg>
                            <span className="font-semibold text-[13px] text-gray-700 dark:text-[#E4E6EB]">Indonesia</span>
                          </button>
                          <button
                            onClick={() => {
                              document.cookie = `NEXT_LOCALE=en; path=/; max-age=31536000; SameSite=Lax`;
                              localStorage.setItem("NEXT_LOCALE", "en");
                              const currentPath = window.location.pathname;
                              const pathWithoutLocale = currentPath.replace(/^\/(id|en)/, "");
                              window.location.href = "/en" + (pathWithoutLocale || "/home");
                            }}
                            className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors mt-1 ${locale === "en" ? "bg-[#E4E6EB] dark:bg-[#3A3B3C]" : "hover:bg-gray-100 dark:hover:bg-[#3A3B3C]"}`}
                          >
                            <svg className="w-[16px] h-[16px] rounded-sm shrink-0 shadow-[0_0_2px_rgba(0,0,0,0.2)]" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill="#0A3161" d="M0 0h36v36H0z" />
                              <path fill="#B31942" d="M0 4.5h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0z" />
                              <path fill="#fff" d="M0 9h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0z" />
                              <path fill="#0A3161" d="M0 0h18v18H0z" />
                              <path fill="#fff" d="M3 3h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM3 7h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM3 11h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z" />
                            </svg>
                            <span className="font-semibold text-[13px] text-gray-700 dark:text-[#E4E6EB]">English</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>'''

content = content.replace(settings_btn_target, settings_btn_replacement)

with open('apps/web/src/app/[locale]/mydash/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated page.tsx")
