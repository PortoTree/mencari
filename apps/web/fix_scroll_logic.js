const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldLogicMain = `  const handleMainChatScroll = (e: React.UIEvent<HTMLDivElement>) => {
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
  };`;

const newLogicMain = `  const handleMainChatScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const dateElements = container.querySelectorAll('.chat-date-separator');
    let currentText = "9/9/2026";
    let found = false;
    const containerRect = container.getBoundingClientRect();

    for (let i = dateElements.length - 1; i >= 0; i--) {
      const el = dateElements[i] as HTMLElement;
      const elRect = el.getBoundingClientRect();
      // If the date separator has scrolled above the top of the container (+ threshold)
      if (elRect.top <= containerRect.top + 60) {
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
  };`;

const oldLogicFloating = `  const handleFloatingChatScroll = (e: React.UIEvent<HTMLDivElement>) => {
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

const newLogicFloating = `  const handleFloatingChatScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const dateElements = container.querySelectorAll('.chat-date-separator');
    let currentText = "9/9/2026";
    let found = false;
    const containerRect = container.getBoundingClientRect();

    for (let i = dateElements.length - 1; i >= 0; i--) {
      const el = dateElements[i] as HTMLElement;
      const elRect = el.getBoundingClientRect();
      if (elRect.top <= containerRect.top + 60) {
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

code = code.replace(oldLogicMain, newLogicMain);
code = code.replace(oldLogicFloating, newLogicFloating);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Fixed scroll logic');
