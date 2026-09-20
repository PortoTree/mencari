const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

if (!code.includes('createPortal')) {
  code = code.replace(
    `import { useState, useEffect, useRef } from "react";`,
    `import { useState, useEffect, useRef } from "react";\nimport { createPortal } from "react-dom";`
  );
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Import added');
} else {
  console.log('Already imported');
}
