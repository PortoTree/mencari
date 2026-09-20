const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Use regex to find the auto-scroll useEffect
const regex = /\/\/ Auto-scroll chat to bottom\s*useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);/;

if (regex.test(code)) {
  code = code.replace(regex, `// Auto-scroll chat to bottom
  useEffect(() => {
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    };
    
    // Call immediately in case it's ready
    scrollToBottom();
    
    // Call after a short delay to wait for DOM updates (rendering messages)
    const timeout = setTimeout(scrollToBottom, 50);
    const timeout2 = setTimeout(scrollToBottom, 200);
    
    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
    };
  }, [activeChatIdx]);`);
  
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Replaced correctly!');
} else {
  console.log('Could not find the pattern with regex.');
}
