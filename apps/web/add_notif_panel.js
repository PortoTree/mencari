const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Add state + ref after isFloatingAttachmentMenuOpen
code = code.replace(
  `  const [isFloatingAttachmentMenuOpen, setIsFloatingAttachmentMenuOpen] = useState(false);`,
  `  const [isFloatingAttachmentMenuOpen, setIsFloatingAttachmentMenuOpen] = useState(false);
  const [isNotifPanelOpen, setIsNotifPanelOpen] = useState(false);`
);

// 2. Add ref after floatingAttachmentMenuRef
code = code.replace(
  `  const floatingAttachmentMenuRef = useRef<HTMLDivElement>(null);`,
  `  const floatingAttachmentMenuRef = useRef<HTMLDivElement>(null);
  const notifPanelRef = useRef<HTMLDivElement>(null);
  const notifBtnRef = useRef<HTMLButtonElement>(null);`
);

// 3. Add click-outside handler in the handleClickOutside useEffect (before closing brace of last if block)
code = code.replace(
  `      if (
        chatMoreMenuRef.current &&
        !chatMoreMenuRef.current.contains(event.target as Node)
      ) {
        setIsChatMoreMenuOpen(false);
      }`,
  `      if (
        chatMoreMenuRef.current &&
        !chatMoreMenuRef.current.contains(event.target as Node)
      ) {
        setIsChatMoreMenuOpen(false);
      }
      if (
        notifPanelRef.current &&
        !notifPanelRef.current.contains(event.target as Node) &&
        notifBtnRef.current &&
        !notifBtnRef.current.contains(event.target as Node)
      ) {
        setIsNotifPanelOpen(false);
      }`
);

// 4. Add onClick to the notification button
code = code.replace(
  `            <button className="w-10 h-10 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] flex items-center justify-center text-black dark:text-[#E4E6EB] hover:bg-[#F3F2EF] dark:hover:bg-[#18191A] transition-colors overflow-hidden">
              <img
                src="/pemberitahuan.svg"
                alt={t("nav.notifications")}
                className="w-[22px] h-[22px] object-contain"
              />
            </button>`,
  `            <button
              ref={notifBtnRef}
              onClick={() => setIsNotifPanelOpen(!isNotifPanelOpen)}
              className={\`w-10 h-10 rounded-full flex items-center justify-center transition-colors overflow-hidden \${isNotifPanelOpen ? "bg-[#D8F0E2] dark:bg-[#203D2E]" : "bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#F3F2EF] dark:hover:bg-[#18191A]"}\`}
            >
              <img
                src="/pemberitahuan.svg"
                alt={t("nav.notifications")}
                className="w-[22px] h-[22px] object-contain"
              />
            </button>`
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Step 1-4 done');
