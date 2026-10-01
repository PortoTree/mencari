import os

files = [
    r"c:\mencari-online\apps\web\src\app\api\users\search\route.ts",
    r"c:\mencari-online\apps\web\src\app\actions\connections.ts",
    r"c:\mencari-online\apps\web\src\app\actions\notifications.ts",
    r"c:\mencari-online\apps\web\src\app\actions\profile.ts",
    r"c:\mencari-online\apps\web\src\app\actions\posts.ts",
]

for filepath in files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # The exact imports might differ slightly, so let's do safe replaces
    # Remove `import { PrismaClient } from "@prisma/client";`
    # Replace `const prisma = new PrismaClient();` with `import prisma from "@/utils/prisma";`
    
    if 'import { PrismaClient } from "@prisma/client"' in content or 'import { PrismaClient } from "@prisma/client";' in content:
        content = content.replace('import { PrismaClient } from "@prisma/client";\n', '')
        content = content.replace('import { PrismaClient } from "@prisma/client"\n', '')
        
        content = content.replace('const prisma = new PrismaClient();', 'import prisma from "@/utils/prisma";')
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {filepath}")
    else:
        print(f"PrismaClient import not found in {filepath} (might be slightly different)")
