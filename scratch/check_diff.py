import re

# Read diff.txt
with open('scratch/diff.txt', 'r', encoding='utf-8') as f:
    diff_content = f.read()

# Let's check what functions were modified in the diff
functions = set(re.findall(r'@@ -[0-9]+,[0-9]+ \+[0-9]+,[0-9]+ @@ (.*)', diff_content))
print(functions)
