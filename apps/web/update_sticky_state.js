const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const handlersOld = `  const [showMainStickyDate, setShowMainStickyDate] = useState(false);
  const [showFloatingStickyDate, setShowFloatingStickyDate] = useState(false);
  const mainStickyDateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const floatingStickyDateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMainChatScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop > 60) {
      setShowMainStickyDate(true);
      if (mainStickyDateTimeout.current) clearTimeout(mainStickyDateTimeout.current);
      mainStickyDateTimeout.current = setTimeout(() => setShowMainStickyDate(false), 5000);
    } else {
      setShowMainStickyDate(false);
    }
  };

  const handleFloatingChatScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop > 60) {
      setShowFloatingStickyDate(true);
      if (floatingStickyDateTimeout.current) clearTimeout(floatingStickyDateTimeout.current);
      floatingStickyDateTimeout.current = setTimeout(() => setShowFloatingStickyDate(false), 5000);
    } else {
      setShowFloatingStickyDate(false);
    }
  };`;

const handlersNew = `  const [showMainStickyDate, setShowMainStickyDate] = useState(false);
  const [showFloatingStickyDate, setShowFloatingStickyDate] = useState(false);
  const [mainStickyDateText, setMainStickyDateText] = useState("9/9/2026");
  const [floatingStickyDateText, setFloatingStickyDateText] = useState("9/9/2026");
  const mainStickyDateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const floatingStickyDateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMainChatScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const dateElements = container.querySelectorAll('.chat-date-separator');
    let currentText = "9/9/2026";
    let found = false;

    for (let i = dateElements.length - 1; i >= 0; i--) {
      const el = dateElements[i] as HTMLElement;
      // if the separator has scrolled past the top (with 20px padding)
      if (el.offsetTop <= container.scrollTop + 20) {
        currentText = el.textContent || "";
        found = true;
        break;
      }
    }

    if (found) {
      setMainStickyDateText(currentText);
      setShowMainStickyDate(true);
      if (mainStickyDateTimeout.current) clearTimeout(mainStickyDateTimeout.current);
      mainStickyDateTimeout.current = setTimeout(() => setShowMainStickyDate(false), 5000);
    } else {
      setShowMainStickyDate(false);
    }
  };

  const handleFloatingChatScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const dateElements = container.querySelectorAll('.chat-date-separator');
    let currentText = "9/9/2026";
    let found = false;

    for (let i = dateElements.length - 1; i >= 0; i--) {
      const el = dateElements[i] as HTMLElement;
      if (el.offsetTop <= container.scrollTop + 20) {
        currentText = el.textContent || "";
        found = true;
        break;
      }
    }

    if (found) {
      setFloatingStickyDateText(currentText);
      setShowFloatingStickyDate(true);
      if (floatingStickyDateTimeout.current) clearTimeout(floatingStickyDateTimeout.current);
      floatingStickyDateTimeout.current = setTimeout(() => setShowFloatingStickyDate(false), 5000);
    } else {
      setShowFloatingStickyDate(false);
    }
  };`;

code = code.replace(handlersOld, handlersNew);

// Main Chat Sticky Date render logic
code = code.replace(
  `{/* Main Chat Sticky Date */}
            <div className={\`absolute top-[70px] left-1/2 transform -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-300 \${showMainStickyDate ? "opacity-100" : "opacity-0"}\`}>
              <span className="bg-[#E5E5E5] dark:bg-[#242526] text-gray-600 dark:text-[#A8ABAF] px-3 py-1 rounded-lg text-[12.5px] font-semibold tracking-wide shadow-md">
                9/9/2026
              </span>
            </div>`,
  `{/* Main Chat Sticky Date */}
            <div className={\`absolute top-[70px] left-1/2 transform -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-300 \${showMainStickyDate ? "opacity-100" : "opacity-0"}\`}>
              <span className="bg-[#E5E5E5] dark:bg-[#242526] text-gray-600 dark:text-[#A8ABAF] px-3 py-1 rounded-lg text-[12.5px] font-semibold tracking-wide shadow-md">
                {mainStickyDateText}
              </span>
            </div>`
);

// Floating Chat Sticky Date render logic
code = code.replace(
  `{/* Floating Chat Sticky Date */}
          <div className={\`absolute top-[60px] left-1/2 transform -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-300 \${showFloatingStickyDate ? "opacity-100" : "opacity-0"}\`}>
            <span className="bg-[#E5E5E5] dark:bg-[#242526] text-gray-600 dark:text-[#A8ABAF] px-3 py-1 rounded-lg text-[12.5px] font-semibold tracking-wide shadow-md">
              9/9/2026
            </span>
          </div>`,
  `{/* Floating Chat Sticky Date */}
          <div className={\`absolute top-[60px] left-1/2 transform -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-300 \${showFloatingStickyDate ? "opacity-100" : "opacity-0"}\`}>
            <span className="bg-[#E5E5E5] dark:bg-[#242526] text-gray-600 dark:text-[#A8ABAF] px-3 py-1 rounded-lg text-[12.5px] font-semibold tracking-wide shadow-md">
              {floatingStickyDateText}
            </span>
          </div>`
);

// We must also add the class 'chat-date-separator' to existing date elements
// And add the new dummy bubbles!
// It's safer to just split into lines and parse.

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Fixed states');
