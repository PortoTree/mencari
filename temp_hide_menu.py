import re

file_path = 'c:/mencari-online/apps/web/src/app/[locale]/home/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Hide options menu if selectedProfile.id === currentUser?.id
old_menu = '''                <div className="relative pointer-events-auto">
                  <button
                    onClick={() => setIsProfileSidebarOptionsOpen(!isProfileSidebarOptionsOpen)}'''

new_menu = '''                {selectedProfile.id !== currentUser?.id && (
                <div className="relative pointer-events-auto">
                  <button
                    onClick={() => setIsProfileSidebarOptionsOpen(!isProfileSidebarOptionsOpen)}'''

content = content.replace(old_menu, new_menu)

old_menu_end = '''                      </div>
                    </>
                  )}
                </div>
                <button
                  onClick={() => {
                    setIsProfileSidebarOpen(false);'''

new_menu_end = '''                      </div>
                    </>
                  )}
                </div>
                )}
                <button
                  onClick={() => {
                    setIsProfileSidebarOpen(false);'''

content = content.replace(old_menu_end, new_menu_end)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Hid options menu for own profile")
