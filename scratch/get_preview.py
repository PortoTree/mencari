import re

with open('scratch/diff.txt', 'r', encoding='utf-16') as f:
    diff_lines = f.readlines()

# find PhonePreviewMockup hunk
# PhonePreviewMockup starts around line 83
hunk = []
for line in diff_lines:
    if line.startswith('@@'):
        parts = line.split()
        if int(parts[1].split(',')[0][1:]) < 180: # It's a PhonePreviewMockup hunk
            continue
    if len(hunk) == 0 and 'PhonePreviewMockup' in line:
        hunk.append(line)
    elif len(hunk) > 0 and 'function BuilderCollectionItem' not in line:
        hunk.append(line)
    elif len(hunk) > 0 and 'function BuilderCollectionItem' in line:
        break

# I just need the original PhonePreviewMockup from the diff.
# But diff has context lines, - lines and + lines.
original_lines = []
for line in hunk:
    if line.startswith('+') and not line.startswith('+++'):
        continue
    elif line.startswith('-') and not line.startswith('---'):
        original_lines.append(line[1:])
    else:
        # Context line (starts with space)
        if line.startswith(' '):
            original_lines.append(line[1:])

with open('scratch/original_preview.tsx', 'w', encoding='utf-8') as f:
    f.writelines(original_lines)
