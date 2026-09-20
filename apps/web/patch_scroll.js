const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldEffect = `  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100); // slight delay to allow DOM to render
    }
  }, []);`;

const newEffect = `  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      // 50ms delay for DOM render
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 50);
    }
  }, [activeChatIdx]);`;

code = code.replace(oldEffect, newEffect);
fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Fixed auto-scroll dependency');
