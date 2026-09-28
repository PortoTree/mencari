import re

with open('apps/web/src/app/[locale]/mydash/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix toggleTheme
content = content.replace(
    'onClick={() => setIsDarkMode(!isDarkMode)}',
    'onClick={toggleTheme}'
)

# Fix body background
content = content.replace(
    'className="h-screen overflow-hidden bg-[#f3f4f6] dark:bg-[#18191A]"',
    'className="h-screen overflow-hidden bg-[#f2f2f2]"'
)

# Fix PhonePreviewMockup
start_idx = content.find('function PhonePreviewMockup')
end_idx = content.find('export default function MyDashPage')

if start_idx != -1 and end_idx != -1:
    preview_block = content[start_idx:end_idx]
    
    # Remove all dark: classes, including brackets and hashes.
    # Note: no \b at the end because ] is not a word boundary.
    preview_block = re.sub(r'\s*dark:[a-zA-Z0-9\-\[\]\#\/]+', '', preview_block)
    
    # Clean up double spaces
    preview_block = re.sub(r' +', ' ', preview_block)
    preview_block = preview_block.replace(' "', '"')
    
    content = content[:start_idx] + preview_block + content[end_idx:]

with open('apps/web/src/app/[locale]/mydash/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied static light mode to PhonePreviewMockup and body")
