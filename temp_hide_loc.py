import re

file_path = 'c:/mencari-online/apps/web/src/app/[locale]/home/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_loc = '''                        <p className="text-[12px] text-gray-500 dark:text-gray-400 font-medium mt-0.5 flex items-center gap-1">
                          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          {selectedProfile.location || (t("profile.noLocation") || "Belum ada lokasi")}
                        </p>'''

new_loc = '''                        {selectedProfile.location && (
                          <p className="text-[12px] text-gray-500 dark:text-gray-400 font-medium mt-0.5 flex items-center gap-1">
                            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {selectedProfile.location}
                          </p>
                        )}'''
content = content.replace(old_loc, new_loc)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated location to hide when empty or private")
