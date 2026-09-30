import re

file_path = 'c:/mencari-online/apps/web/src/app/[locale]/home/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Cover Image
cover_old = '''                  <div className="h-20 bg-gray-200 dark:bg-[#3A3B3C] w-full relative">
                    {/* Profile image overlapping */}'''
cover_new = '''                  <div 
                    className="h-20 bg-gray-200 dark:bg-[#3A3B3C] w-full relative bg-cover bg-center"
                    style={currentUser?.profile?.coverUrl ? { backgroundImage: `url(${currentUser.profile.coverUrl})` } : {}}
                  >
                    {/* Profile image overlapping */}'''
content = content.replace(cover_old, cover_new)

# 2. Update Avatar Image
avatar_old = '''                        <img
                          src="/default-avatar.svg"
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />'''
avatar_new = '''                        <img
                          src={currentUser?.profile?.avatarUrl || "/default-avatar.svg"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />'''
content = content.replace(avatar_old, avatar_new)

# 3. Update Location and Remove Profession
profile_info_old = '''                    {/* Dummy Data */}
                    <div className="mt-1.5 mb-4 flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-[#B0B3B8] text-[13px]">
                        <svg
                          className="w-[16px] h-[16px] shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="truncate">Malang, Jawa timur</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 dark:text-[#B0B3B8] text-[13px]">
                        <svg
                          className="w-[16px] h-[16px] shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="truncate">Fullstack Developer</span>
                      </div>
                    </div>'''

profile_info_new = '''                    <div className="mt-1.5 mb-4 flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-[#B0B3B8] text-[13px]">
                        <svg
                          className="w-[16px] h-[16px] shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="truncate">{currentUser?.profile?.locationName || (t("profile.noLocation") || "Belum ada lokasi")}</span>
                      </div>
                    </div>'''

content = content.replace(profile_info_old, profile_info_new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated Profile Card in page.tsx')
