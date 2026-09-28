import re

with open('apps/web/src/app/[locale]/mydash/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find PhonePreviewMockup component block
start = content.find('function PhonePreviewMockup({ collections }:')
if start == -1:
    print("Could not find PhonePreviewMockup")
    exit(1)

end = content.find('export default function MyDashPage() {', start)

preview_code = content[start:end]

# Regex to remove all dark: classes (e.g. dark:bg-[#18191A], dark:text-white, dark:hover:bg-[#3A3B3C], etc.)
# A class starts with dark:, followed by alphanumeric, -, [, ], #, etc.
# Actually we can just match dark:[a-zA-Z0-9\-\[\]\#]+
# and carefully remove them. We need to handle trailing/leading spaces.

def remove_dark_classes(text):
    # Match dark:something
    return re.sub(r'\s*dark:[a-zA-Z0-9\-\[\]\#]+', '', text)

new_preview_code = remove_dark_classes(preview_code)

content = content[:start] + new_preview_code + content[end:]

with open('apps/web/src/app/[locale]/mydash/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Removed dark classes from PhonePreviewMockup")
