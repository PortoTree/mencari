const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

if (!code.includes('const [floatingChatMessage, setFloatingChatMessage]')) {
  code = code.replace(
    'const floatingAttachmentMenuRef = useRef<HTMLDivElement>(null);',
    'const floatingAttachmentMenuRef = useRef<HTMLDivElement>(null);\n  const [floatingChatMessage, setFloatingChatMessage] = useState("");\n  const [mainChatMessage, setMainChatMessage] = useState("");'
  );
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('States injected');
} else {
  console.log('States already exist');
}
