with open('scratch/diff.txt', 'r', encoding='utf-16') as f:
    diff_lines = f.readlines()

print("Lines in diff.txt:", len(diff_lines))
for line in diff_lines[:50]:
    print(line.strip())
