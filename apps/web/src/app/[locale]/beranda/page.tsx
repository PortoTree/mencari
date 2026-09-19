"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Lottie } from "lottie-react";
// @ts-ignore
import animationDataLight from "../../../../public/search-bar.json";
// @ts-ignore
import animationDataDark from "../../../../public/search-bar-putih.json";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import React from "react";

function formatPostTime(timestamp: number, t: any, locale: string) {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 5) {
    return t("time.justNow");
  } else if (hours < 1) {
    return t("time.minsAgo", { min: minutes });
  } else if (days < 1) {
    return t("time.hoursAgo", { hour: hours });
  } else if (days < 7) {
    return t("time.daysAgo", { day: days });
  } else {
    const d = new Date(timestamp);
    const day = d.getDate();
    const month = new Intl.DateTimeFormat(locale, { month: "short" }).format(d);
    const year = d.getFullYear();
    const h = d.getHours().toString().padStart(2, "0");
    const m = d.getMinutes().toString().padStart(2, "0");
    return `${day} ${month} ${year} | ${h}.${m}`;
  }
}

const dummyChats = [
  {
    name: "Budi Santoso",
    ts: Date.now() - 15 * 86400000,
    msg: "Halo bro, apa kabar? Udah la...",
    isOnline: false,
  },
  {
    name: "Siti Aminah",
    ts: Date.now() - 3 * 86400000,
    msg: "Project kemarin gimana kelanjutannya?",
    isOnline: true,
  },
  {
    name: "Agus Pratama",
    ts: Date.now() - 2 * 86400000,
    msg: "Wkwk siap bro ntar malam ya",
    isOnline: true,
  },
  {
    name: "Dewi Lestari",
    ts: Date.now() - 6 * 86400000,
    msg: "Oke, dokumennya udah aku kirim ke email.",
    isOnline: false,
  },
  {
    name: "Andi Wijaya",
    ts: Date.now() - 4 * 86400000,
    msg: "Jadi nongkrong nggak nih hari ini?",
    isOnline: true,
  },
  {
    name: "Rina Kusuma",
    ts: Date.now() - 5 * 86400000,
    msg: "Thanks ya buat bantuannya kemarin!",
    isOnline: false,
  },
  {
    name: "Fajar Nugroho",
    ts: Date.now() - 3 * 86400000,
    msg: "Jangan lupa meeting jam 2 siang bro.",
    isOnline: true,
  },
  {
    name: "Maya Indah",
    ts: Date.now() - 1 * 86400000,
    msg: "Sipp, nanti aku kabarin lagi.",
    isOnline: false,
  },
  {
    name: "Reza Pahlevi",
    ts: Date.now() - 1 * 86400000,
    msg: "Tugas bagian backend udah aman?",
    isOnline: true,
  },
  {
    name: "Nina Marlina",
    ts: Date.now() - 16 * 86400000,
    msg: "Wah mantap tuh idenya, boleh dicoba.",
    isOnline: false,
  },
  {
    name: "Eko Susilo",
    ts: Date.now() - 17 * 86400000,
    msg: "Kirim aja linknya kesini bro",
    isOnline: true,
  },
  {
    name: "Fitri Yani",
    ts: Date.now() - 18 * 86400000,
    msg: "Haha bener banget",
    isOnline: false,
  },
];

// Format tanggal chat sesuai locale (seperti WhatsApp/Facebook):
// - Hari ini: tampilkan jam (e.g., "14:30")
// - Dalam 7 hari: nama hari singkat (e.g., "Wed" / "Rab")
// - Lebih lama: tanggal singkat (e.g., "1 Jun" / "Jun 1")
function formatChatDate(ts: number, locale: string): string {
  const now = Date.now();
  const diff = now - ts;
  const oneDay = 86400000;
  const sevenDays = 7 * oneDay;

  const date = new Date(ts);

  if (diff < oneDay && new Date(now).getDate() === date.getDate()) {
    // Hari ini: tampilkan jam
    return new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } else if (diff < sevenDays) {
    // Dalam 7 hari: nama hari singkat
    return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
  } else {
    // Lebih dari 7 hari: tanggal + bulan singkat
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "short",
    }).format(date);
  }
}

export default function Beranda() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations();
  console.log("[Beranda] locale:", locale);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentUser, setCurrentUser] = useState<any>({
    username: "User",
    displayName: "",
  });
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [isShortcutModalOpen, setIsShortcutModalOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isFriendSearchExpanded, setIsFriendSearchExpanded] = useState(false);
  const friendSearchRef = useRef<HTMLDivElement>(null);
  const [isGroupSearchExpanded, setIsGroupSearchExpanded] = useState(false);
  const groupSearchRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<
    "home" | "mencari" | "friend" | "group" | "groups" | "chat"
  >(() => {
    if (pathname.includes("/obrolan")) return "chat";
    if (pathname.includes("/mencari")) return "mencari";
    if (pathname.includes("/friend")) return "friend";
    if (pathname.includes("/group")) return "group";
    if (pathname.includes("/groups")) return "groups";
    return "home";
  });
  const lottieRef = useRef<any>(null);
  const [chatSidebarView, setChatSidebarView] = useState<"chats" | "friends">(
    "chats",
  );
  const [isChatInfoOpen, setIsChatInfoOpen] = useState(true);
  const [isChatMoreMenuOpen, setIsChatMoreMenuOpen] = useState(false);
  const chatMoreMenuRef = useRef<HTMLDivElement>(null);
  const roomSearchRef = useRef<HTMLDivElement>(null);
  const roomSearchToggleRef = useRef<HTMLButtonElement>(null);
  const attachmentMenuRef = useRef<HTMLDivElement>(null);
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
  const handleAnimationComplete = () => {
    setTimeout(() => {
      if (lottieRef.current) {
        lottieRef.current.seek(0);
        lottieRef.current.play();
      }
    }, 5000);
  };
  const [isChatSettingsOpen, setIsChatSettingsOpen] = useState(false);
  const [isChatListSettingsOpen, setIsChatListSettingsOpen] = useState(false);
  const chatListSettingsRef = useRef<HTMLDivElement>(null);
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [isChatFilterOpen, setIsChatFilterOpen] = useState(false);
  const [chatListFilter, setChatListFilter] = useState<
    "all" | "unread" | "favorite" | "group" | "archive"
  >("all");
  const [activeChatMenu, setActiveChatMenu] = useState<number | null>(null);
  const [isRoomSearchOpen, setIsRoomSearchOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0 });
  const chatMenuRef = useRef<HTMLDivElement | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const chatSettingsRef = useRef<HTMLDivElement>(null);
  const chatFilterRef = useRef<HTMLDivElement>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activePostMenu, setActivePostMenu] = useState<string | null>(null);
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const postMenuRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
    setThemeLoaded(true);
  }, []);

  useEffect(() => {
    if (!themeLoaded) return;

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode, themeLoaded]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchExpanded(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        chatSettingsRef.current &&
        !chatSettingsRef.current.contains(event.target as Node)
      ) {
        setIsChatSettingsOpen(false);
      }
      if (
        chatListSettingsRef.current &&
        !chatListSettingsRef.current.contains(event.target as Node)
      ) {
        setIsChatListSettingsOpen(false);
      }
      if (
        chatFilterRef.current &&
        !chatFilterRef.current.contains(event.target as Node)
      ) {
        setIsChatFilterOpen(false);
      }
      if (
        chatMenuRef.current &&
        !chatMenuRef.current.contains(event.target as Node)
      ) {
        setActiveChatMenu(null);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (
        postMenuRef.current &&
        !postMenuRef.current.contains(event.target as Node)
      ) {
        setActivePostMenu(null);
      }
      if (
        friendSearchRef.current &&
        !friendSearchRef.current.contains(event.target as Node)
      ) {
        setIsFriendSearchExpanded(false);
      }
      if (
        groupSearchRef.current &&
        !groupSearchRef.current.contains(event.target as Node)
      ) {
        setIsGroupSearchExpanded(false);
      }
      if (
        chatMoreMenuRef.current &&
        !chatMoreMenuRef.current.contains(event.target as Node)
      ) {
        setIsChatMoreMenuOpen(false);
      }
      if (
        roomSearchRef.current &&
        !roomSearchRef.current.contains(event.target as Node) &&
        roomSearchToggleRef.current &&
        !roomSearchToggleRef.current.contains(event.target as Node)
      ) {
        setIsRoomSearchOpen(false);
      }
      if (
        attachmentMenuRef.current &&
        !attachmentMenuRef.current.contains(event.target as Node)
      ) {
        setIsAttachmentMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeChatMenu, isChatMoreMenuOpen, isRoomSearchOpen, isAttachmentMenuOpen]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.username || payload.name) {
          setCurrentUser({
            username: payload.username || payload.name || "User",
            displayName:
              payload.displayName || payload.username || payload.name || "User",
          });
        }
      } catch (e) {
        console.error("Failed to parse token");
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#F3F2EF] dark:bg-[#18191A] text-black dark:text-[#E4E6EB] pb-10">
      {/* Navbar Fixed Top */}
      <nav className="bg-white dark:bg-[#242526] shadow-sm sticky top-0 z-[100] h-[56px] px-4 flex items-center justify-between border-b border-gray-200 dark:border-[#3E4042]">
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-2">
          {/* Logo - dark text for light mode, white text for dark mode */}
          <img
            src="/logo-horizontal.png"
            alt="Mencari"
            className="h-[40px] w-auto object-contain dark:hidden"
          />
          <img
            src="/logo-horizontal2.png"
            alt="Mencari"
            className="h-[40px] w-auto object-contain hidden dark:block"
          />
        </div>

        {/* Center: Tabs */}
        <div className="hidden md:flex items-center justify-center gap-2 absolute left-1/2 -translate-x-1/2 h-full">
          <div
            onClick={() => {
              setActiveTab("home");
              window.history.pushState(null, "", `/${locale}/beranda`);
            }}
            className={`flex flex-col items-center justify-center w-[110px] h-full cursor-pointer ${activeTab === "home" ? "border-b-[3px] border-emerald-500 text-emerald-500 dark:text-emerald-400 dark:border-emerald-400" : "border-b-[3px] border-transparent text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg my-1 transition-colors"}`}
          >
            <div
              className="w-7 h-7 bg-current"
              style={{
                WebkitMask: `url(${activeTab === "home" ? "/navigasi/home-aktif.svg" : "/navigasi/home.svg"}) center/contain no-repeat`,
                mask: `url(${activeTab === "home" ? "/navigasi/home-aktif.svg" : "/navigasi/home.svg"}) center/contain no-repeat`,
              }}
            />
            <span className="text-[11px] font-semibold mt-0.5">
              {t("tabs.home")}
            </span>
          </div>
          <div
            onClick={() => {
              setActiveTab("mencari");
              window.history.pushState(null, "", `/${locale}/mencari`);
            }}
            className={`flex flex-col items-center justify-center w-[110px] h-full cursor-pointer transition-colors ${activeTab === "mencari" ? "border-b-[3px] border-emerald-500 text-emerald-500 dark:text-emerald-400 dark:border-emerald-400 my-0 h-full rounded-none" : "border-b-[3px] border-transparent text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg my-1"}`}
          >
            {activeTab === "mencari" ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
            <span className="text-[11px] font-semibold mt-1">Mencari</span>
          </div>
          <div
            onClick={() => {
              setActiveTab("friend");
              window.history.pushState(null, "", `/${locale}/friend`);
            }}
            className={`flex flex-col items-center justify-center w-[110px] h-full cursor-pointer transition-colors ${activeTab === "friend" ? "border-b-[3px] border-emerald-500 text-emerald-500 dark:text-emerald-400 dark:border-emerald-400 my-0 h-full rounded-none" : "border-b-[3px] border-transparent text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg my-1"}`}
          >
            <div
              className="w-7 h-7 bg-current"
              style={{
                WebkitMask: `url(${activeTab === "friend" ? "/navigasi/teman-aktif.svg" : "/navigasi/teman.svg"}) center/contain no-repeat`,
                mask: `url(${activeTab === "friend" ? "/navigasi/teman-aktif.svg" : "/navigasi/teman.svg"}) center/contain no-repeat`,
              }}
            />
            <span className="text-[11px] font-semibold mt-0.5">
              {t("tabs.friends")}
            </span>
          </div>
          <div
            onClick={() => {
              setActiveTab("group");
              window.history.pushState(null, "", `/${locale}/group`);
            }}
            className={`flex flex-col items-center justify-center w-[110px] h-full cursor-pointer transition-colors ${activeTab === "group" ? "border-b-[3px] border-emerald-500 text-emerald-500 dark:text-emerald-400 dark:border-emerald-400 my-0 h-full rounded-none" : "border-b-[3px] border-transparent text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg my-1"}`}
          >
            <div
              className="w-7 h-7 bg-current"
              style={{
                WebkitMask: `url(${activeTab === "group" || activeTab === "groups" ? "/navigasi/grub-aktif.svg" : "/navigasi/grub.svg"}) center/contain no-repeat`,
                mask: `url(${activeTab === "group" || activeTab === "groups" ? "/navigasi/grub-aktif.svg" : "/navigasi/grub.svg"}) center/contain no-repeat`,
              }}
            />
            <span className="text-[11px] font-semibold mt-0.5">
              {t("tabs.groups")}
            </span>
          </div>
        </div>

        {/* Right: Icons & Avatar */}
        <div className="flex items-center gap-2 relative">
          <div className="relative group">
            <button
              onClick={() => {
                setActiveTab("chat");
                window.history.pushState(null, "", `/${locale}/obrolan`);
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors overflow-hidden ${activeTab === "chat" ? "bg-[#D8F0E2] dark:bg-[#203D2E] text-emerald-600 dark:text-emerald-400" : "bg-[#E4E6EB] dark:bg-[#3A3B3C] text-black dark:text-[#E4E6EB] hover:bg-[#F3F2EF] dark:hover:bg-[#18191A]"}`}
            >
              <img
                src="/logo-chat.svg"
                alt="Chat"
                className="w-[22px] h-[22px] object-contain"
              />
            </button>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-[13px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[60]">
              {t("nav.chat")}
            </div>
          </div>

          <div className="relative group">
            <button className="w-10 h-10 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] flex items-center justify-center text-black dark:text-[#E4E6EB] hover:bg-[#F3F2EF] dark:hover:bg-[#18191A] transition-colors overflow-hidden">
              <img
                src="/pemberitahuan.svg"
                alt={t("nav.notifications")}
                className="w-[22px] h-[22px] object-contain"
              />
            </button>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-[13px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[60]">
              {t("nav.notifications")}
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="w-[1px] h-6 bg-gray-300 dark:bg-[#3E4042] mx-1"></div>

          {/* Language Switcher */}
          <div className="relative group mx-1" ref={langRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#D8D9DB] dark:hover:bg-[#4E4F50] transition-colors text-black dark:text-[#E4E6EB] text-[13px] font-semibold"
            >
              {locale === "id" ? (
                <svg
                  className="w-5 h-5 rounded-[2px] shrink-0 shadow-[0_0_2px_rgba(0,0,0,0.2)]"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="#ED2939" d="M0 0h36v18H0z" />
                  <path fill="#fff" d="M0 18h36v18H0z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 rounded-[2px] shrink-0 shadow-[0_0_2px_rgba(0,0,0,0.2)]"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="#0A3161" d="M0 0h36v36H0z" />
                  <path
                    fill="#B31942"
                    d="M0 4.5h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0z"
                  />
                  <path
                    fill="#fff"
                    d="M0 9h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0z"
                  />
                  <path fill="#0A3161" d="M0 0h18v18H0z" />
                  <path
                    fill="#fff"
                    d="M3 3h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM3 7h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM3 11h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"
                  />
                </svg>
              )}
              {locale === "id" ? "ID" : "EN"}
            </button>

            <div
              className={`absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-[13px] rounded-lg opacity-0 ${!isLangOpen ? "group-hover:opacity-100" : ""} transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[60]`}
            >
              {t("common.language")}
            </div>

            {isLangOpen && (
              <div className="absolute top-12 right-0 w-[140px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] p-2 z-[100]">
                <button
                  onClick={() => {
                    document.cookie = `NEXT_LOCALE=id; path=/; max-age=31536000; SameSite=Lax`;
                    localStorage.setItem("NEXT_LOCALE", "id");
                    const currentPath = window.location.pathname;
                    const pathWithoutLocale = currentPath.replace(
                      /^\/(id|en)/,
                      "",
                    );
                    window.location.href =
                      "/id" + (pathWithoutLocale || "/beranda");
                  }}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${locale === "id" ? "bg-[#E4E6EB] dark:bg-[#3A3B3C]" : "hover:bg-gray-200 dark:hover:bg-[#3A3B3C]"}`}
                >
                  <svg
                    className="w-[18px] h-[18px] rounded-sm shrink-0 shadow-[0_0_2px_rgba(0,0,0,0.2)]"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="#ED2939" d="M0 0h36v18H0z" />
                    <path fill="#fff" d="M0 18h36v18H0z" />
                  </svg>
                  <span className="font-semibold text-[14px] text-black dark:text-[#E4E6EB]">
                    Indonesia
                  </span>
                </button>
                <button
                  onClick={() => {
                    document.cookie = `NEXT_LOCALE=en; path=/; max-age=31536000; SameSite=Lax`;
                    localStorage.setItem("NEXT_LOCALE", "en");
                    const currentPath = window.location.pathname;
                    const pathWithoutLocale = currentPath.replace(
                      /^\/(id|en)/,
                      "",
                    );
                    window.location.href =
                      "/en" + (pathWithoutLocale || "/beranda");
                  }}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors mt-1 ${locale === "en" ? "bg-[#E4E6EB] dark:bg-[#3A3B3C]" : "hover:bg-gray-200 dark:hover:bg-[#3A3B3C]"}`}
                >
                  <svg
                    className="w-[18px] h-[18px] rounded-sm shrink-0 shadow-[0_0_2px_rgba(0,0,0,0.2)]"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="#0A3161" d="M0 0h36v36H0z" />
                    <path
                      fill="#B31942"
                      d="M0 4.5h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0z"
                    />
                    <path
                      fill="#fff"
                      d="M0 9h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0z"
                    />
                    <path fill="#0A3161" d="M0 0h18v18H0z" />
                    <path
                      fill="#fff"
                      d="M3 3h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM3 7h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM3 11h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"
                    />
                  </svg>
                  <span className="font-semibold text-[14px] text-black dark:text-[#E4E6EB]">
                    English
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* MENU ICON - NO CIRCLE */}
          <div className="relative group flex items-center justify-center mr-2 ml-1">
            <button className="flex items-center justify-center transition-transform hover:scale-105 active:scale-95">
              <img
                src="/menu.svg"
                alt="Menu"
                className="w-[34px] h-[34px] object-contain"
              />
            </button>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-[13px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[60]">
              {t("nav.menu")}
            </div>
          </div>

          <div className="relative ml-1" ref={dropdownRef}>
            <div
              className="relative cursor-pointer group"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <button className="w-10 h-10 rounded-full hover:brightness-95 transition-all flex items-center justify-center overflow-hidden border border-emerald-600 dark:border-emerald-400 shrink-0">
                <img
                  src="/default-avatar.svg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>
              {/* Arrow Down Badge */}
              <div className="absolute -bottom-0.5 -right-0.5 w-[16px] h-[16px] bg-[#E4E6EB] dark:bg-[#3A3B3C] rounded-full flex items-center justify-center border-2 border-white dark:border-[#242526]">
                <svg
                  className="w-3 h-3 text-black dark:text-[#E4E6EB]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="absolute top-12 right-0 px-3 py-1.5 bg-black/80 text-white text-[13px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[60]">
                Informasi
              </div>
            </div>

            {/* Dropdown Profile Panel */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-[340px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] p-4 z-[100]">
                <div className="bg-[#F2F2F2] dark:bg-[#3A3B3C] rounded-xl p-3 flex items-center gap-3 mb-2 hover:bg-[#E4E6EB] dark:hover:bg-[#4E4F50] cursor-pointer transition-colors shadow-sm border border-gray-100 dark:border-[#3E4042]">
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-emerald-600 dark:border-emerald-400">
                    <img
                      src="/default-avatar.svg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[16px] text-black dark:text-[#E4E6EB] leading-tight">
                      {currentUser.username}
                    </h3>
                    <p className="text-[14px] text-gray-500 dark:text-[#B0B3B8]">
                      {t("dropdown.viewAllProfiles")}
                    </p>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-gray-200 dark:bg-[#3A3B3C] my-3"></div>

                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors group/item">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] flex items-center justify-center shrink-0 overflow-hidden">
                        <svg
                          className="w-[20px] h-[20px] text-black dark:text-[#E4E6EB]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                        {t("dropdown.settings")}
                      </span>
                    </div>
                    <svg
                      className="w-6 h-6 text-gray-500 dark:text-[#B0B3B8] group-hover/item:text-black dark:text-[#E4E6EB] transition-colors"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors group/item">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] flex items-center justify-center shrink-0 overflow-hidden">
                        <svg
                          className="w-[20px] h-[20px] text-black dark:text-[#E4E6EB]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                        {t("dropdown.help")}
                      </span>
                    </div>
                    <svg
                      className="w-6 h-6 text-gray-500 dark:text-[#B0B3B8] group-hover/item:text-black dark:text-[#E4E6EB] transition-colors"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors">
                    <div className="w-9 h-9 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] flex items-center justify-center shrink-0 overflow-hidden">
                      <svg
                        className="w-[20px] h-[20px] text-black dark:text-[#E4E6EB]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                      {t("dropdown.report")}
                    </span>
                  </button>

                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] flex items-center justify-center shrink-0 overflow-hidden">
                      {isDarkMode ? (
                        <svg
                          className="w-[20px] h-[20px] text-black dark:text-[#E4E6EB]"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.5-1.591a.75.75 0 10-1.061 1.06l1.5-1.591zM12 18.75a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM6.166 18.894a.75.75 0 001.06 1.06l1.5-1.591a.75.75 0 10-1.06-1.061l-1.591 1.59zM4.5 12a.75.75 0 01-.75.75H1.5a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM6.166 5.106a.75.75 0 00-1.06 1.06l1.591 1.59a.75.75 0 101.06-1.061l-1.5-1.59z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-[20px] h-[20px] text-black dark:text-[#E4E6EB]"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                      {isDarkMode
                        ? t("dropdown.lightMode")
                        : t("dropdown.darkMode")}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      document.cookie =
                        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                      window.location.href = `/login`;
                    }}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] flex items-center justify-center shrink-0 overflow-hidden">
                      <svg
                        className="w-5 h-5 text-black dark:text-[#E4E6EB] ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                      {t("dropdown.logout")}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Inline Styles for Scrollbars to bypass HMR issues */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Firefox */
        .sidebar-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: transparent transparent;
        }
        .sidebar-scrollbar:hover {
          scrollbar-color: #d1d5db transparent;
        }
        .dark .sidebar-scrollbar:hover {
          scrollbar-color: #4E4F50 transparent;
        }

        /* WebKit / Chrome / Edge */
        .sidebar-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0); /* fully transparent */
          border-radius: 10px;
        }
        .sidebar-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #d1d5db; /* gray-300 */
        }
        .dark .sidebar-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #4E4F50;
        }
      `,
        }}
      />

      {/* Main Container */}
      <div
        className={`flex w-full pt-6 ${activeTab === "chat" ? "hidden" : ""}`}
      >
        {/* Left Sidebar */}
        <div className="hidden lg:block fixed left-0 top-[56px] w-[280px] xl:w-[320px] overscroll-contain h-[calc(100vh-56px)] overflow-y-auto pt-6 px-4 pb-24 sidebar-scrollbar">
          <div className="space-y-4">
            {/* Profile Card / Bookmarks Area */}
            {activeTab === "mencari" ? (
              <>
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-sm border border-transparent overflow-hidden p-5 text-white relative">
                  {/* Decorative circles */}
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-white opacity-10 rounded-full"></div>
                  <div className="absolute right-12 -top-2 w-8 h-8 bg-white opacity-10 rounded-full"></div>

                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                      <svg
                        className="w-7 h-7 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    </div>
                    <h3 className="font-bold text-[17px] mb-2 leading-snug">
                      {t("mencari.cta_title")}
                    </h3>
                    <p className="text-[13px] text-emerald-50 mb-4 leading-relaxed opacity-90">
                      {t("mencari.cta_desc")}
                    </p>
                    <button className="w-full bg-white text-emerald-600 hover:bg-emerald-700 hover:text-white font-bold text-[14px] py-2.5 px-4 rounded-lg transition-colors shadow-sm">
                      {t("mencari.cta_button")}
                    </button>
                  </div>
                </div>

                {/* History Block (Moved from Right) */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2 px-2">
                    <h3 className="font-semibold text-gray-500 dark:text-[#B0B3B8] text-[15px]">
                      {t("mencari.history")}
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {[
                      { title: "Google", url: "google.com" },
                      {
                        title:
                          "Stack Overflow - Where Developers Learn, Share, & Build Careers",
                        url: "stackoverflow.com",
                      },
                      {
                        title: "GitHub: Let's build from here",
                        url: "github.com",
                      },
                      {
                        title: "Next.js by Vercel - The React Framework",
                        url: "nextjs.org",
                      },
                      {
                        title: "Tailwind CSS - Rapidly build modern websites",
                        url: "tailwindcss.com",
                      },
                      { title: "MDN Web Docs", url: "developer.mozilla.org" },
                      { title: "YouTube", url: "youtube.com" },
                      {
                        title: "Reddit - Dive into anything",
                        url: "reddit.com",
                      },
                      {
                        title: "Figma: The Collaborative Interface Design Tool",
                        url: "figma.com",
                      },
                      {
                        title: "Vercel: Develop. Preview. Ship.",
                        url: "vercel.com",
                      },
                      {
                        title:
                          "React – A JavaScript library for building user interfaces",
                        url: "reactjs.org",
                      },
                      { title: "OpenAI", url: "openai.com" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors"
                      >
                        <div className="w-8 h-8 rounded bg-white dark:bg-[#242526] border border-gray-200 dark:border-[#3E4042] flex items-center justify-center shrink-0 overflow-hidden">
                          <img
                            src={`https://www.google.com/s2/favicons?domain=${item.url}&sz=64`}
                            alt={item.url}
                            className="w-4 h-4 object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col">
                          <span className="text-[13.5px] font-medium text-black dark:text-[#E4E6EB] truncate">
                            {item.title}
                          </span>
                          <span className="text-[12px] text-gray-500 dark:text-[#B0B3B8] truncate">
                            {item.url}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : activeTab === "friend" ? (
              <div ref={friendSearchRef} className="relative z-10">
                {/* Title - samain style dengan header Friends di bawahnya */}
                <h3 className="font-semibold text-gray-500 dark:text-[#B0B3B8] text-[15px] mb-2 px-2">
                  {t("friend.searchTitle")}
                </h3>

                {/* Container: fixed height so it doesn't shift layout */}
                <div className="relative w-full h-[42px]">
                  {/* Absolute box tumbuh ke bawah, overlay di atas friendlist */}
                  <div
                    className={`absolute top-0 left-0 w-full bg-white dark:bg-[#242526] ${isFriendSearchExpanded ? "rounded-[21px] shadow-[0_4px_12px_rgba(32,33,36,0.28)] pb-3" : "rounded-full shadow-[0_1px_6px_rgba(32,33,36,0.28)] hover:shadow-[0_1px_6px_rgba(32,33,36,0.4)]"} dark:shadow-[0_1px_6px_rgba(0,0,0,0.5)] transition-shadow duration-200 border border-transparent dark:border-[#3E4042] flex flex-col`}
                  >
                    {/* Input Row */}
                    <div className="flex items-center px-4 py-2.5 min-h-[42px] w-full">
                      <svg
                        className="w-4 h-4 text-gray-400 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder={t("friend.searchPlaceholder")}
                        className="w-full bg-transparent border-none outline-none ml-3 text-[14px] text-black dark:text-[#E4E6EB] placeholder-gray-400 dark:placeholder-[#B0B3B8]"
                        onFocus={() => setIsFriendSearchExpanded(true)}
                      />
                    </div>

                    {/* Expanded Dropdown */}
                    {isFriendSearchExpanded && (
                      <div className="w-full border-t border-gray-100 dark:border-[#3E4042] pt-1 mt-1">
                        <div className="flex flex-col w-full">
                          <p className="text-[11px] font-semibold text-gray-400 dark:text-[#B0B3B8] px-4 py-1.5 uppercase tracking-wide">
                            {t("friend.recentSearch")}
                          </p>
                          {[
                            "Budi Santoso",
                            "Siti Aminah",
                            "Agus Pratama",
                            "Dewi Lestari",
                          ].map((name, i) => (
                            <div
                              key={i}
                              className="px-4 py-2.5 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] cursor-pointer flex items-center justify-between group transition-colors shrink-0"
                            >
                              <div className="flex items-center gap-3">
                                <svg
                                  className="w-4 h-4 text-gray-400 shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <span className="text-[14px] text-black dark:text-[#E4E6EB]">
                                  {name}
                                </span>
                              </div>
                              <div
                                className="hidden group-hover:flex items-center justify-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-[#4E4F50] text-gray-400 hover:text-gray-600 dark:hover:text-[#E4E6EB] transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : activeTab === "group" || activeTab === "groups" ? (
              <div ref={groupSearchRef} className="relative z-10">
                <div className="flex flex-col gap-3 mb-4">
                  <h3 className="font-semibold text-gray-500 dark:text-[#B0B3B8] text-[15px] px-2">
                    {t("group.yourGroups")}
                  </h3>
                  <div className="px-2">
                    <button className="w-full text-emerald-500 hover:text-emerald-600 font-semibold text-[15px] bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                      {t("group.createGroup")}
                    </button>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-500 dark:text-[#B0B3B8] text-[15px] mb-2 px-2">
                  {t("group.searchTitle")}
                </h3>
                <div className="relative w-full h-[42px]">
                  <div
                    className={`absolute top-0 left-0 w-full bg-white dark:bg-[#242526] ${isGroupSearchExpanded ? "rounded-[21px] shadow-[0_4px_12px_rgba(32,33,36,0.28)] pb-3" : "rounded-full shadow-[0_1px_6px_rgba(32,33,36,0.28)] hover:shadow-[0_1px_6px_rgba(32,33,36,0.4)]"} dark:shadow-[0_1px_6px_rgba(0,0,0,0.5)] transition-shadow duration-200 border border-transparent dark:border-[#3E4042] flex flex-col`}
                  >
                    <div className="flex items-center px-4 py-2.5 min-h-[42px] w-full">
                      <svg
                        className="w-4 h-4 text-gray-400 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder={t("group.searchPlaceholder")}
                        className="w-full bg-transparent border-none outline-none ml-3 text-[14px] text-black dark:text-[#E4E6EB] placeholder-gray-400 dark:placeholder-[#B0B3B8]"
                        onFocus={() => setIsGroupSearchExpanded(true)}
                      />
                    </div>
                    {isGroupSearchExpanded && (
                      <div className="w-full border-t border-gray-100 dark:border-[#3E4042] pt-1 mt-1">
                        <div className="flex flex-col w-full">
                          <p className="text-[11px] font-semibold text-gray-400 dark:text-[#B0B3B8] px-4 py-1.5 uppercase tracking-wide">
                            {t("group.recentSearch")}
                          </p>
                          {[
                            "Web Developers Indo",
                            "ReactJS Indonesia",
                            "Lowongan IT",
                          ].map((name, i) => (
                            <div
                              key={i}
                              className="px-4 py-2.5 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] cursor-pointer flex items-center justify-between group transition-colors shrink-0"
                            >
                              <div className="flex items-center gap-3">
                                <svg
                                  className="w-4 h-4 text-gray-400 shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <span className="text-[14px] text-black dark:text-[#E4E6EB]">
                                  {name}
                                </span>
                              </div>
                              <div
                                className="hidden group-hover:flex items-center justify-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-[#4E4F50] text-gray-400 hover:text-gray-600 dark:hover:text-[#E4E6EB] transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] overflow-hidden">
                <div className="h-20 bg-gray-200 dark:bg-[#3A3B3C] w-full relative">
                  {/* Profile image overlapping */}
                  <div className="absolute -bottom-8 left-4 w-[72px] h-[72px] bg-white dark:bg-[#242526] rounded-full p-1 shadow-sm">
                    <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                      <img
                        src="/default-avatar.svg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-10 pb-4 px-4 text-left">
                  <h3 className="font-bold text-[17px] text-black dark:text-[#E4E6EB]">
                    {currentUser.username}
                  </h3>

                  {/* Dummy Data */}
                  <div className="mt-1.5 mb-4 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-[#B0B3B8] text-[13px]">
                      <svg
                        className="w-[16px] h-[16px] shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="truncate">Malang, Jawa timur</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-[#B0B3B8] text-[13px]">
                      <svg
                        className="w-[16px] h-[16px] shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="truncate">Fullstack Developer</span>
                    </div>
                  </div>

                  {/* View Profile Badge */}
                  <div className="flex justify-center w-full mt-2">
                    <button className="w-[70%] py-1.5 px-3 bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] text-black dark:text-[#E4E6EB] font-semibold text-[13.5px] rounded-full transition-colors truncate">
                      {t("sidebar.viewProfile")}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Friend List (Friend Tab) */}
            {activeTab === "friend" && (
              <div>
                <div className="flex items-center justify-between mb-2 px-2">
                  <h3 className="font-semibold text-gray-500 dark:text-[#B0B3B8] text-[15px]">
                    {t("profileSidebar.friends") || "Daftar Teman"}
                  </h3>
                </div>
                <div className="space-y-1">
                  {[
                    "Budi Santoso",
                    "Siti Aminah",
                    "Agus Pratama",
                    "Dewi Lestari",
                    "Rudi Hermawan",
                    "Rina Marlina",
                    "Andi Wijaya",
                    "Bagas Pangestu",
                    "Citra Kirana",
                    "Dian Sastro",
                    "Eko Patrio",
                    "Fahri Hamzah",
                    "Gita Gutawa",
                    "Hasan Basri",
                    "Intan Nuraini",
                    "Joko Anwar",
                    "Kaesang Pangarep",
                    "Luna Maya",
                  ].map((name, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedProfile({
                          name,
                          role: "Member",
                          avatar: `https://i.pravatar.cc/150?u=${i + 20}`,
                          relation: "friend",
                        });
                        setIsProfileSidebarOpen(true);
                      }}
                    >
                      <div className="relative">
                        <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-[#4E4F50] overflow-hidden shrink-0">
                          <img
                            src={`https://i.pravatar.cc/150?u=${i + 20}`}
                            alt={name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#242526] rounded-full"></div>
                      </div>
                      <span className="text-[14px] font-medium text-black dark:text-[#E4E6EB] flex-1 truncate">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Group List (Group Tab) */}
            {(activeTab === "group" || activeTab === "groups") && (
              <div>
                <div className="flex items-center justify-between mb-2 px-2 mt-2">
                  <h3 className="font-semibold text-gray-500 dark:text-[#B0B3B8] text-[15px]">
                    {t("group.listTitle")}
                  </h3>
                </div>
                <div className="space-y-1">
                  {[
                    "Web Developers Indo",
                    "ReactJS Indonesia",
                    "Lowongan IT",
                    "UI/UX Designer ID",
                    "Node.js Developer",
                    "Frontend Masters",
                    "Belajar Programming",
                  ].map((name, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="relative">
                        <div className="w-10 h-10 rounded-lg bg-gray-300 dark:bg-[#4E4F50] overflow-hidden shrink-0">
                          <img
                            src={`https://picsum.photos/seed/${i + 100}/150/150`}
                            alt={name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-[14px] font-medium text-black dark:text-[#E4E6EB] truncate">
                          {name}
                        </span>
                        <span className="text-[12px] text-gray-500 dark:text-[#B0B3B8] truncate">
                          {t("group.publicGroup")} • {(i + 1) * 12}K{" "}
                          {t("group.members")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Links */}
            {activeTab === "home" && (
              <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] p-2 space-y-1">
                <button
                  onClick={() => {
                    setActiveTab("mencari");
                    window.history.pushState(null, "", `/${locale}/mencari`);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                    Mencari
                  </span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors">
                  <svg
                    className="w-6 h-6 text-cyan-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                    {t("nav.webpage")}
                  </span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab("friend");
                    window.history.pushState(null, "", `/${locale}/friend`);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors"
                >
                  <div
                    className="w-6 h-6 bg-current text-black dark:text-[#E4E6EB]"
                    style={{
                      WebkitMask:
                        "url(/navigasi/teman.svg) center/contain no-repeat",
                      mask: "url(/navigasi/teman.svg) center/contain no-repeat",
                    }}
                  />
                  <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                    {t("sidebar.friends")}
                  </span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors">
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                  <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                    {t("sidebar.saved")}
                  </span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors">
                  <div
                    className="w-6 h-6 bg-current text-green-500"
                    style={{
                      WebkitMask:
                        "url(/navigasi/grub.svg) center/contain no-repeat",
                      mask: "url(/navigasi/grub.svg) center/contain no-repeat",
                    }}
                  />
                  <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                    {t("tabs.groups")}
                  </span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors">
                  <svg
                    className="w-6 h-6 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                    {t("sidebar.events")}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Center Main Feed */}
        <div className="flex-1 flex justify-center lg:ml-[340px] xl:ml-[380px] lg:mr-[340px] xl:mr-[380px]">
          {activeTab === "mencari" && (
            <div className="w-full flex flex-col items-center pt-24 max-w-[680px]">
              {/* Lottie Animation (Logo) */}
              <div className="w-[400px] h-[140px] mb-4 flex items-center justify-center [&>div]:w-full [&>div]:h-full">
                <Lottie
                  lottieRef={lottieRef}
                  src={isDarkMode ? animationDataDark : animationDataLight}
                  loop={false}
                  autoplay={true}
                  subscriptions={{ complete: handleAnimationComplete }}
                />
              </div>

              {/* Google-style Search Box with Expand Behavior */}
              <div className="relative w-full z-40 h-[48px]" ref={searchRef}>
                <div
                  className={`absolute top-0 left-0 w-full bg-white dark:bg-[#242526] ${isSearchExpanded ? "rounded-[24px] shadow-[0_4px_12px_rgba(32,33,36,0.28)] pb-4" : "rounded-full shadow-[0_1px_6px_rgba(32,33,36,0.28)] hover:shadow-[0_1px_6px_rgba(32,33,36,0.4)]"} dark:shadow-[0_1px_6px_rgba(0,0,0,0.5)] transition-shadow duration-200 border border-transparent dark:border-[#3E4042] flex flex-col`}
                >
                  {/* Input Row */}
                  <div className="flex items-center px-4 py-3 min-h-[48px] w-full">
                    <svg
                      className="w-5 h-5 text-gray-400 shrink-0 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder={t("nav.searchPlaceholder")}
                      className="w-full bg-transparent border-none outline-none ml-4 text-[16px] text-black dark:text-[#E4E6EB] placeholder-gray-500 dark:placeholder-[#B0B3B8]"
                      onFocus={() => setIsSearchExpanded(true)}
                    />
                  </div>

                  {/* Expanded Dropdown Content */}
                  {isSearchExpanded && (
                    <div className="w-full border-t border-gray-100 dark:border-[#3E4042] pt-2 mt-1">
                      <div className="flex flex-col w-full max-h-[195px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-[#4E4F50] [&::-webkit-scrollbar-thumb]:rounded-full">
                        {[
                          "translate - Google Search",
                          "portotree",
                          "eraser bg",
                          "png to svg",
                          "compress foto",
                          "compress video",
                          "upscale image",
                        ].map((text, i) => (
                          <div
                            key={i}
                            className="px-4 py-2.5 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] cursor-pointer flex items-center justify-between group transition-colors shrink-0"
                          >
                            <div className="flex items-center gap-3">
                              <svg
                                className="w-4 h-4 text-gray-400 shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span className="text-[15px] text-black dark:text-[#E4E6EB]">
                                {text}
                              </span>
                            </div>
                            <div
                              className="hidden group-hover:flex items-center justify-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-[#4E4F50] text-gray-400 hover:text-gray-600 dark:hover:text-[#E4E6EB] transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log("Hapus riwayat:", text);
                              }}
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Add Shortcut Button */}
              <div className="mt-8">
                <div
                  onClick={() => setIsShortcutModalOpen(true)}
                  className="flex flex-col items-center cursor-pointer group p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#303134] transition-colors"
                >
                  <div className="w-12 h-12 bg-[#F0F2F5] dark:bg-[#3A3B3C] rounded-full flex items-center justify-center mb-2">
                    <svg
                      className="w-6 h-6 text-black dark:text-[#E4E6EB]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <span className="text-[13px] font-medium text-black dark:text-[#E4E6EB]">
                    {t("mencari.shortcut_add")}
                  </span>
                </div>
              </div>
            </div>
          )}
          {activeTab === "friend" && (
            <div className="space-y-4 max-w-[590px] w-full px-4">
              {/* Create Post Input */}
              <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] p-4 w-full">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-[#3E4042]">
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                    <img
                      src="/default-avatar.svg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder={t("feed.createPost")}
                    className="w-full bg-[#F0F2F5] dark:bg-[#3A3B3C] hover:bg-[#E4E6EB] dark:hover:bg-[#4E4F50] transition-colors rounded-full px-4 py-2.5 focus:outline-none cursor-pointer text-gray-600 dark:text-[#B0B3B8] text-[17px]"
                    readOnly
                  />
                </div>
                <div className="flex justify-between items-center pt-3 px-1">
                  <button className="flex items-center gap-2 text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] p-2 rounded-lg flex-1 justify-center transition-colors">
                    <svg
                      className="w-[24px] h-[24px] text-[#45BD62]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t("feed.photo")}
                  </button>
                  <button className="flex items-center gap-2 text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] p-2 rounded-lg flex-1 justify-center transition-colors">
                    <svg
                      className="w-[24px] h-[24px] text-[#1877F2]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Link
                  </button>
                  <button className="flex items-center gap-2 text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] p-2 rounded-lg flex-1 justify-center transition-colors">
                    <svg
                      className="w-[24px] h-[24px] text-[#F5C33B]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t("feed.events")}
                  </button>
                  <button className="flex items-center gap-2 text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] p-2 rounded-lg flex-1 justify-center transition-colors">
                    <svg
                      className="w-[24px] h-[24px] text-[#F35369]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                    {t("feed.more")}
                  </button>
                </div>
              </div>

              {/* Post 1 */}
              <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] pt-4 px-0">
                <div className="flex items-center justify-between pb-2 px-4 relative">
                  <div
                    className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => {
                      setSelectedProfile({
                        name: "Budi Santoso",
                        role: "Member",
                        avatar: "https://i.pravatar.cc/150?u=20",
                      });
                      setIsProfileSidebarOpen(true);
                    }}
                  >
                    <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                      <img
                        src="https://i.pravatar.cc/150?u=20"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight hover:underline">
                        Budi Santoso
                      </h3>
                      <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8]">
                        {formatPostTime(Date.now() - 3 * 60000, t, locale)}
                      </p>
                    </div>
                  </div>
                  <div
                    className="relative"
                    {...(activePostMenu === "friendPost1"
                      ? { ref: postMenuRef }
                      : {})}
                  >
                    <button
                      onClick={() =>
                        setActivePostMenu(
                          activePostMenu === "friendPost1"
                            ? null
                            : "friendPost1",
                        )
                      }
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-500 dark:text-[#B0B3B8] transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>

                    {activePostMenu === "friendPost1" && (
                      <div className="absolute right-0 mt-1 w-[260px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] p-2 z-[100]">
                        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                          <svg
                            className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                          </svg>
                          {t("postMenu.savePost")}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProfile({
                              name: "Budi Santoso",
                              role: "Member",
                              avatar: "https://i.pravatar.cc/150?u=20",
                            });
                            setIsProfileSidebarOpen(true);
                            setActivePostMenu(null);
                          }}
                          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]"
                        >
                          <svg
                            className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          {t("postMenu.showProfile")}
                        </button>
                        <div className="h-[1px] bg-gray-200 dark:bg-[#3E4042] my-1 mx-2" />
                        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-red-500 font-semibold text-[15px]">
                          <svg
                            className="w-6 h-6 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                          {t("postMenu.reportPost")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-black dark:text-[#E4E6EB] text-[15px] mb-3 px-4">
                  Akhirnya selesai juga project e-commerce bulan ini! 🚀
                  Waktunya istirahat sejenak sebelum lanjut ke fase berikutnya.
                </p>

                <div className="px-4 pb-4">
                  <div className="flex items-center gap-1 pt-2 border-t border-gray-100 dark:border-[#3E4042]">
                    <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      {t("feed.like")}
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {t("feed.comment")}
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg>
                      {t("feed.share")}
                    </button>
                  </div>
                </div>
              </div>

              {/* Post 2 */}
              <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] pt-4 px-0">
                <div className="flex items-center justify-between pb-2 px-4 relative">
                  <div
                    className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => {
                      setSelectedProfile({
                        name: "Siti Aminah",
                        role: "Member",
                        avatar: "https://i.pravatar.cc/150?u=21",
                      });
                      setIsProfileSidebarOpen(true);
                    }}
                  >
                    <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                      <img
                        src="https://i.pravatar.cc/150?u=21"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight hover:underline">
                        Siti Aminah
                      </h3>
                      <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8]">
                        {formatPostTime(Date.now() - 5 * 3600000, t, locale)}
                      </p>
                    </div>
                  </div>
                  <div
                    className="relative"
                    {...(activePostMenu === "friendPost2"
                      ? { ref: postMenuRef }
                      : {})}
                  >
                    <button
                      onClick={() =>
                        setActivePostMenu(
                          activePostMenu === "friendPost2"
                            ? null
                            : "friendPost2",
                        )
                      }
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-500 dark:text-[#B0B3B8] transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>

                    {activePostMenu === "friendPost2" && (
                      <div className="absolute right-0 mt-1 w-[260px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] p-2 z-[100]">
                        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                          <svg
                            className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                          </svg>
                          {t("postMenu.savePost")}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProfile({
                              name: "Siti Aminah",
                              role: "Member",
                              avatar: "https://i.pravatar.cc/150?u=21",
                            });
                            setIsProfileSidebarOpen(true);
                            setActivePostMenu(null);
                          }}
                          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]"
                        >
                          <svg
                            className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          {t("postMenu.showProfile")}
                        </button>
                        <div className="h-[1px] bg-gray-200 dark:bg-[#3E4042] my-1 mx-2" />
                        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-red-500 font-semibold text-[15px]">
                          <svg
                            className="w-6 h-6 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                          {t("postMenu.reportPost")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-black dark:text-[#E4E6EB] text-[15px] mb-3 px-4">
                  Ada yang tau tempat ngopi enak di sekitar Jakarta Selatan buat
                  WFC? Butuh suasana baru nih. ☕💻
                </p>

                <div className="px-4 pb-4">
                  <div className="flex items-center gap-1 pt-2 border-t border-gray-100 dark:border-[#3E4042]">
                    <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      {t("feed.like")}
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {t("feed.comment")}
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg>
                      {t("feed.share")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {(activeTab === "group" || activeTab === "groups") && (
            <div className="space-y-4 max-w-[590px] w-full px-4 pt-4">
              {/* Group Post 1 */}
              <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] pt-4 px-0">
                <div className="flex items-center justify-between pb-2 px-4 relative">
                  <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="w-[40px] h-[40px] rounded-lg flex items-center justify-center shrink-0 overflow-hidden border border-gray-200 dark:border-[#3E4042]">
                      <img
                        src="https://picsum.photos/seed/reactjs/150/150"
                        alt="Group"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight hover:underline">
                        ReactJS Indonesia
                      </h3>
                      <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8]">
                        {formatPostTime(Date.now() - 10 * 60000, t, locale)}
                      </p>
                    </div>
                  </div>
                  <div
                    className="relative"
                    {...(activePostMenu === "groupPost1"
                      ? { ref: postMenuRef }
                      : {})}
                  >
                    <button
                      onClick={() =>
                        setActivePostMenu(
                          activePostMenu === "groupPost1" ? null : "groupPost1",
                        )
                      }
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-500 dark:text-[#B0B3B8] transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>

                    {activePostMenu === "groupPost1" && (
                      <div className="absolute right-0 mt-1 w-[260px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] p-2 z-[100]">
                        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                          <svg
                            className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                            />
                          </svg>
                          {t("group.joinGroup")}
                        </button>
                        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                          <svg
                            className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                            />
                          </svg>
                          {t("group.enterGroup")}
                        </button>
                        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                          <svg
                            className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          {t("group.viewPost")}
                        </button>
                        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                          <svg
                            className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                          </svg>
                          {t("postMenu.savePost")}
                        </button>
                        <div className="h-[1px] bg-gray-200 dark:bg-[#3E4042] my-1 mx-2" />
                        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-red-500 font-semibold text-[15px]">
                          <svg
                            className="w-6 h-6 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                          {t("postMenu.reportPost")}
                        </button>
                        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-red-500 font-semibold text-[15px]">
                          <svg
                            className="w-6 h-6 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                          {t("group.reportGroup")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-black dark:text-[#E4E6EB] text-[15px] mb-3 px-4">
                  Ada yang pernah ngalamin hydration error di Next.js 14 pas
                  pakai custom hook? Mohon pencerahannya suhu-suhu 🙏
                </p>
                <div className="px-4 pb-4">
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-[#3E4042]">
                    <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-[14px] font-semibold py-2 px-4 rounded-lg transition-colors">
                      {t("group.joinGroup")}
                    </button>
                    <button className="flex-1 bg-gray-200 dark:bg-[#3A3B3C] hover:bg-gray-300 dark:hover:bg-[#4E4F50] text-black dark:text-[#E4E6EB] text-[14px] font-semibold py-2 px-4 rounded-lg transition-colors">
                      {t("group.viewPost")}
                    </button>
                  </div>
                </div>
              </div>

              {/* Group Post 2 */}
              <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] pt-4 px-0">
                <div className="flex items-center justify-between pb-2 px-4 relative">
                  <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="w-[40px] h-[40px] rounded-lg flex items-center justify-center shrink-0 overflow-hidden border border-gray-200 dark:border-[#3E4042]">
                      <img
                        src="https://picsum.photos/seed/webdev/150/150"
                        alt="Group"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight hover:underline">
                        Web Developers Indo
                      </h3>
                      <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8]">
                        {formatPostTime(Date.now() - 45 * 60000, t, locale)}
                      </p>
                    </div>
                  </div>
                  <div
                    className="relative"
                    {...(activePostMenu === "groupPost2"
                      ? { ref: postMenuRef }
                      : {})}
                  >
                    <button
                      onClick={() =>
                        setActivePostMenu(
                          activePostMenu === "groupPost2" ? null : "groupPost2",
                        )
                      }
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-500 dark:text-[#B0B3B8] transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>

                    {activePostMenu === "groupPost2" && (
                      <div className="absolute right-0 mt-1 w-[260px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] p-2 z-[100]">
                        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                          <svg
                            className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                            />
                          </svg>
                          {t("group.joinGroup")}
                        </button>
                        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                          <svg
                            className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                            />
                          </svg>
                          {t("group.enterGroup")}
                        </button>
                        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                          <svg
                            className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          {t("group.viewPost")}
                        </button>
                        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                          <svg
                            className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                          </svg>
                          {t("postMenu.savePost")}
                        </button>
                        <div className="h-[1px] bg-gray-200 dark:bg-[#3E4042] my-1 mx-2" />
                        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-red-500 font-semibold text-[15px]">
                          <svg
                            className="w-6 h-6 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                          {t("postMenu.reportPost")}
                        </button>
                        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-red-500 font-semibold text-[15px]">
                          <svg
                            className="w-6 h-6 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                          {t("group.reportGroup")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-black dark:text-[#E4E6EB] text-[15px] mb-3 px-4">
                  Info loker frontend dong! Kalau bisa remote ya. Makasih 🙏
                </p>
                <div className="px-4 pb-4">
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-[#3E4042]">
                    <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-[14px] font-semibold py-2 px-4 rounded-lg transition-colors">
                      {t("group.joinGroup")}
                    </button>
                    <button className="flex-1 bg-gray-200 dark:bg-[#3A3B3C] hover:bg-gray-300 dark:hover:bg-[#4E4F50] text-black dark:text-[#E4E6EB] text-[14px] font-semibold py-2 px-4 rounded-lg transition-colors">
                      {t("group.viewPost")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div
            className={`space-y-4 max-w-[590px] w-full px-4 ${activeTab !== "home" ? "hidden" : ""}`}
          >
            {/* Create Post Input */}
            <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] p-4">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-[#3E4042]">
                <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                  <img
                    src="/default-avatar.svg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <input
                  type="text"
                  placeholder={t("feed.createPost")}
                  className="w-full bg-[#F0F2F5] dark:bg-[#3A3B3C] hover:bg-[#E4E6EB] dark:hover:bg-[#4E4F50] transition-colors rounded-full px-4 py-2.5 focus:outline-none cursor-pointer text-gray-600 dark:text-[#B0B3B8] text-[17px]"
                  readOnly
                />
              </div>
              <div className="flex justify-between items-center pt-3 px-1">
                <button className="flex items-center gap-2 text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] p-2 rounded-lg flex-1 justify-center transition-colors">
                  <svg
                    className="w-[24px] h-[24px] text-[#45BD62]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t("feed.photo")}
                </button>
                <button className="flex items-center gap-2 text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] p-2 rounded-lg flex-1 justify-center transition-colors">
                  <svg
                    className="w-[24px] h-[24px] text-[#1877F2]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Link
                </button>
                <button className="flex items-center gap-2 text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] p-2 rounded-lg flex-1 justify-center transition-colors">
                  <svg
                    className="w-[24px] h-[24px] text-[#F5C33B]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t("feed.events")}
                </button>
                <button className="flex items-center gap-2 text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] p-2 rounded-lg flex-1 justify-center transition-colors">
                  <svg
                    className="w-[24px] h-[24px] text-[#F35369]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  {t("feed.more")}
                </button>
              </div>
            </div>

            {/* Dummy Post 1 */}
            <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] pt-4 px-0">
              <div className="flex items-center justify-between pb-2 px-4 relative">
                <div
                  className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => {
                    setSelectedProfile({
                      name: "Pengguna",
                      role: "Member",
                      avatar: "/default-avatar.svg",
                    });
                    setIsProfileSidebarOpen(true);
                  }}
                >
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                    <img
                      src="/default-avatar.svg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight hover:underline">
                      Pengguna
                    </h3>
                    <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8]">
                      {formatPostTime(Date.now() - 3 * 60000, t, locale)}
                    </p>
                  </div>
                </div>
                <div
                  className="relative"
                  {...(activePostMenu === "post1" ? { ref: postMenuRef } : {})}
                >
                  <button
                    onClick={() =>
                      setActivePostMenu(
                        activePostMenu === "post1" ? null : "post1",
                      )
                    }
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-500 dark:text-[#B0B3B8] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>

                  {activePostMenu === "post1" && (
                    <div className="absolute right-0 mt-1 w-[260px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] p-2 z-[100]">
                      <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                        <svg
                          className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                          />
                        </svg>
                        {t("postMenu.savePost")}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProfile({
                            name: "Pengguna",
                            role: "Member",
                            avatar: "/default-avatar.svg",
                          });
                          setIsProfileSidebarOpen(true);
                          setActivePostMenu(null);
                        }}
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]"
                      >
                        <svg
                          className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        {t("postMenu.showProfile")}
                      </button>
                      <div className="h-[1px] bg-gray-200 dark:bg-[#3E4042] my-1 mx-2" />
                      <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-red-500 font-semibold text-[15px]">
                        <svg
                          className="w-6 h-6 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        {t("postMenu.reportPost")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-black dark:text-[#E4E6EB] text-[15px] mb-4 px-4">
                saya mencari web development
              </p>
              <div className="px-4 pb-4">
                <div className="flex items-center gap-1 pt-2 border-t border-gray-100 dark:border-[#3E4042]">
                  <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    {t("feed.like")}
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t("feed.comment")}
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                    {t("feed.share")}
                  </button>
                </div>
              </div>
            </div>

            {/* Dummy Post 2 */}
            <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] pt-4 px-0">
              <div className="flex items-center justify-between pb-2 px-4 relative">
                <div
                  className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => {
                    setSelectedProfile({
                      name: "Naufal faiz",
                      role: "Web Development",
                      avatar: "/default-avatar.svg",
                    });
                    setIsProfileSidebarOpen(true);
                  }}
                >
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                    <img
                      src="/default-avatar.svg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight hover:underline">
                      Naufal faiz
                    </h3>
                    <div className="text-[13px] text-gray-500 dark:text-[#B0B3B8] flex items-center gap-1">
                      <span>Web Development</span>
                      <span>·</span>
                      <span>
                        {formatPostTime(Date.now() - 2 * 3600000, t, locale)}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="relative"
                  {...(activePostMenu === "post2" ? { ref: postMenuRef } : {})}
                >
                  <button
                    onClick={() =>
                      setActivePostMenu(
                        activePostMenu === "post2" ? null : "post2",
                      )
                    }
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-500 dark:text-[#B0B3B8] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>

                  {activePostMenu === "post2" && (
                    <div className="absolute right-0 mt-1 w-[260px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] p-2 z-[100]">
                      <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                        <svg
                          className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                          />
                        </svg>
                        {t("postMenu.savePost")}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProfile({
                            name: "Naufal faiz",
                            role: "Web Development",
                            avatar: "/default-avatar.svg",
                          });
                          setIsProfileSidebarOpen(true);
                          setActivePostMenu(null);
                        }}
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]"
                      >
                        <svg
                          className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        {t("postMenu.showProfile")}
                      </button>
                      <div className="h-[1px] bg-gray-200 dark:bg-[#3E4042] my-1 mx-2" />
                      <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-red-500 font-semibold text-[15px]">
                        <svg
                          className="w-6 h-6 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        {t("postMenu.reportPost")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-black dark:text-[#E4E6EB] text-[15px] mb-3 px-4">
                Saya web development mencari client🥰
              </p>
              <div className="w-full bg-[#F0F2F5] dark:bg-[#3A3B3C] h-[300px] mb-2 flex items-center justify-center overflow-hidden">
                {/* Placeholder for Image */}
                <div className="w-full h-full bg-[#E4E6EB] dark:bg-[#3A3B3C] relative">
                  <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-500 dark:text-[#B0B3B8]">
                    <svg
                      className="w-12 h-12 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4">
                <div className="flex items-center gap-1 pt-2 border-t border-gray-100 dark:border-[#3E4042]">
                  <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    Like
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Coment
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Bubbles (Always Rendered) */}
      <>
        {/* Right Sidebar: Ads (Mencari Tab) */}
        {activeTab === "mencari" && (
          <div className="hidden lg:block fixed right-0 top-[56px] w-[280px] xl:w-[320px] overscroll-contain h-[calc(100vh-56px)] overflow-y-auto pt-6 px-4 pb-24 sidebar-scrollbar">
            <div className="space-y-3">
              <a
                href="https://resume.portotree.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <img
                  src="/ads/portotree-cv.png"
                  alt="Portotree CV"
                  className="w-full h-auto object-cover"
                />
              </a>
              <a
                href="https://surat.portotree.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <img
                  src="/ads/portotree-surat.png"
                  alt="Portotree Surat"
                  className="w-full h-auto object-cover"
                />
              </a>
              <a
                href="https://portofolio.portotree.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <img
                  src="/ads/portotree-portofolio.png"
                  alt="Portotree Portofolio"
                  className="w-full h-auto object-cover"
                />
              </a>
            </div>
          </div>
        )}

        {/* Right Sidebar: Friend Tab - Permintaan Teman & Grup Bersama */}
        {activeTab === "friend" && (
          <div className="hidden lg:block fixed right-0 top-[56px] w-[280px] xl:w-[320px] overscroll-contain h-[calc(100vh-56px)] overflow-y-auto pt-6 px-4 pb-24 sidebar-scrollbar">
            <div className="space-y-4">
              {/* Permintaan Teman */}
              <div>
                <h3 className="font-semibold text-gray-500 dark:text-[#B0B3B8] text-[15px] mb-2 px-2">
                  {t("friend.friendRequests")}
                </h3>
                <div className="space-y-1">
                  {[
                    { name: "Raka Pradana", mutual: 5 },
                    { name: "Nadia Putri", mutual: 3 },
                    { name: "Farhan Maulana", mutual: 8 },
                    { name: "Larasati Dewi", mutual: 2 },
                  ].map((user, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedProfile({
                          name: user.name,
                          role: "Member",
                          avatar: `https://i.pravatar.cc/150?u=req${i + 50}`,
                          relation: "request",
                        });
                        setIsProfileSidebarOpen(true);
                      }}
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-[#4E4F50] overflow-hidden shrink-0">
                        <img
                          src={`https://i.pravatar.cc/150?u=req${i + 50}`}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13.5px] font-semibold text-black dark:text-[#E4E6EB] truncate">
                          {user.name}
                        </p>
                        <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8]">
                          {user.mutual} {t("friend.mutualFriends")}
                        </p>
                        <div className="flex gap-1.5 mt-1.5">
                          <button
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-[12px] font-semibold py-1 px-2 rounded-md transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {t("friend.confirm")}
                          </button>
                          <button
                            className="flex-1 bg-gray-200 dark:bg-[#3A3B3C] hover:bg-gray-300 dark:hover:bg-[#4E4F50] text-black dark:text-[#E4E6EB] text-[12px] font-semibold py-1 px-2 rounded-md transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {t("friend.delete")}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right Sidebar: Group Tab - Permintaan Bergabung */}
        {(activeTab === "group" || activeTab === "groups") && (
          <div className="hidden lg:block fixed right-0 top-[56px] w-[280px] xl:w-[320px] overscroll-contain h-[calc(100vh-56px)] overflow-y-auto pt-6 px-4 pb-24 sidebar-scrollbar">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-500 dark:text-[#B0B3B8] text-[15px] mb-2 px-2">
                  {t("group.joinRequests")}
                </h3>
                <div className="space-y-1">
                  {[
                    { name: "Andi Susanto", group: "Web Developers Indo" },
                    { name: "Dewi Anggraini", group: "ReactJS Indonesia" },
                    { name: "Fajar Ramadhan", group: "Web Developers Indo" },
                    { name: "Sarah Utami", group: "Lowongan IT" },
                  ].map((req, i) => (
                    <div
                      key={i}
                      className="flex gap-3 p-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedProfile({
                          name: req.name,
                          role: "Member",
                          avatar: `https://i.pravatar.cc/150?u=${i + 60}`,
                          relation: "request",
                        });
                        setIsProfileSidebarOpen(true);
                      }}
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-[#4E4F50] overflow-hidden shrink-0">
                        <img
                          src={`https://i.pravatar.cc/150?u=${i + 60}`}
                          alt={req.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="text-[14px] font-medium text-black dark:text-[#E4E6EB]">
                          {req.name}
                        </span>
                        <span className="text-[12px] text-gray-500 dark:text-[#B0B3B8] mb-2 line-clamp-1 text-ellipsis">
                          {t("group.requestToJoin")} {req.group}
                        </span>
                        <div className="flex gap-2">
                          <button
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-[12px] font-semibold py-1 px-2 rounded-md transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {t("friend.confirm")}
                          </button>
                          <button
                            className="flex-1 bg-gray-200 dark:bg-[#3A3B3C] hover:bg-gray-300 dark:hover:bg-[#4E4F50] text-black dark:text-[#E4E6EB] text-[12px] font-semibold py-1 px-2 rounded-md transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {t("friend.delete")}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Undangan Grub */}
              <div>
                <h3 className="font-semibold text-gray-500 dark:text-[#B0B3B8] text-[15px] mb-2 px-2 mt-4">
                  {t("group.groupInvites")}
                </h3>
                <div className="space-y-1">
                  {[
                    { inviter: "Budi Santoso", group: "Programmer Jakarta" },
                    { inviter: "Rina Marlina", group: "Desain Grafis ID" },
                  ].map((invite, i) => (
                    <div
                      key={i}
                      className="flex gap-3 p-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedProfile({
                          name: invite.inviter,
                          role: "Member",
                          avatar: `https://i.pravatar.cc/150?u=${i + 80}`,
                          relation: "request",
                        });
                        setIsProfileSidebarOpen(true);
                      }}
                    >
                      <div className="w-12 h-12 rounded-lg bg-gray-300 dark:bg-[#4E4F50] overflow-hidden shrink-0">
                        <img
                          src={`https://picsum.photos/seed/${i + 200}/150/150`}
                          alt={invite.group}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="text-[14px] font-medium text-black dark:text-[#E4E6EB] truncate">
                          {invite.group}
                        </span>
                        <span className="text-[12px] text-gray-500 dark:text-[#B0B3B8] mb-2 line-clamp-1 text-ellipsis">
                          Diundang oleh {invite.inviter}
                        </span>
                        <div className="flex gap-2">
                          <button
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-[12px] font-semibold py-1 px-2 rounded-md transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {t("group.join")}
                          </button>
                          <button
                            className="flex-1 bg-gray-200 dark:bg-[#3A3B3C] hover:bg-gray-300 dark:hover:bg-[#4E4F50] text-black dark:text-[#E4E6EB] text-[12px] font-semibold py-1 px-2 rounded-md transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {t("friend.delete")}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right Sidebar (Chat Panel) */}
        <div
          className={`hidden lg:block relative z-50 ${activeTab === "chat" ? "!hidden" : ""}`}
        >
          {/* Chat Bubble Fixed bottom right */}
          <div
            className={`fixed bottom-0 right-[80px] w-[300px] bg-white dark:bg-[#242526] rounded-t-xl shadow-[0_0_15px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] flex flex-col transition-all duration-300 ease-in-out ${isChatExpanded ? "h-[500px]" : "h-[48px]"}`}
          >
            {/* Header */}
            <div
              onClick={() => setIsChatExpanded(!isChatExpanded)}
              className="px-3 py-2 flex items-center justify-between border-b border-gray-100 dark:border-[#3E4042] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] cursor-pointer rounded-t-xl transition-colors shrink-0 h-[48px]"
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                    <img
                      src="/default-avatar.svg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#31A24C] rounded-full border-2 border-white dark:border-[#242526]"></div>
                </div>
                <span className="font-semibold text-black dark:text-[#E4E6EB] text-[15px]">
                  {t("chat.title")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-[#B0B3B8]">
                <div
                  className={`relative ${isChatExpanded ? "block" : "hidden"}`}
                  ref={chatSettingsRef}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsChatSettingsOpen(!isChatSettingsOpen);
                    }}
                    className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#4E4F50] dark:bg-[#3A3B3C] rounded-full transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>

                  {/* Chat Settings Dropdown */}
                  {isChatSettingsOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-[#242526] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-[#3E4042] py-1.5 z-50">
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[14px] font-semibold text-gray-700 dark:text-[#E4E6EB] transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        {t("chat.manage")}
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[14px] font-semibold text-gray-700 dark:text-[#E4E6EB] transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {t("chat.settings")}
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsNewMessageOpen(!isNewMessageOpen);
                  }}
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#4E4F50] dark:bg-[#3A3B3C] rounded-full transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#4E4F50] dark:bg-[#3A3B3C] rounded-full transition-colors pointer-events-none"
                >
                  {isChatExpanded ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Expanded Content */}
            <div
              className={`flex-1 flex flex-col overflow-hidden transition-opacity duration-300 ${isChatExpanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              {/* Tabs */}
              <div className="flex items-center gap-1 px-3 pt-1 border-b border-gray-200 dark:border-[#3E4042] shrink-0">
                <button className="px-3 py-1.5 font-semibold text-[14px] text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400">
                  {t("chat.all")}
                </button>
                <button className="px-3 py-1.5 font-semibold text-[14px] text-gray-500 dark:text-[#B0B3B8] hover:text-gray-800 dark:hover:text-[#E4E6EB] transition-colors">
                  {t("chat.unread")}
                </button>

                <div className="ml-auto relative" ref={chatFilterRef}>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsChatFilterOpen(!isChatFilterOpen);
                    }}
                    className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-full cursor-pointer transition-colors"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600 dark:text-[#B0B3B8]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M7 12h10M10 18h4"
                      />
                    </svg>
                  </div>

                  {/* Filter Dropdown */}
                  {isChatFilterOpen && (
                    <div className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-[#242526] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-[#3E4042] py-1.5 z-50">
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[14px] font-semibold text-gray-700 dark:text-[#E4E6EB] transition-colors"
                      >
                        {t("filter.favorite")}
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[14px] font-semibold text-gray-700 dark:text-[#E4E6EB] transition-colors"
                      >
                        {t("filter.groupChat")}
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[14px] font-semibold text-gray-700 dark:text-[#E4E6EB] transition-colors"
                      >
                        {t("filter.chatList")}
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[14px] font-semibold text-gray-700 dark:text-[#E4E6EB] transition-colors"
                      >
                        {t("filter.archived")}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat List */}
              <div className="overscroll-contain flex-1 overflow-y-auto sidebar-scrollbar">
                {dummyChats.map((chat, idx) => (
                  <div
                    key={idx}
                    className="relative group flex items-center gap-3 p-3 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors"
                  >
                    <div className="relative w-12 h-12 shrink-0">
                      <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden border border-emerald-600 dark:border-emerald-400">
                        <img
                          src="/default-avatar.svg"
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {chat.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#31A24C] rounded-full border-2 border-white dark:border-[#242526]"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-semibold text-[14px] text-black dark:text-[#E4E6EB] truncate">
                          {chat.name}
                        </h4>
                        <span
                          className={
                            "text-[12px] text-gray-500 dark:text-[#B0B3B8] shrink-0 " +
                            (activeChatMenu === idx ? "opacity-0" : "")
                          }
                        >
                          {formatChatDate(chat.ts, locale)}
                        </span>
                      </div>
                      <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8] truncate mt-0.5">
                        {chat.msg}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const rect = e.currentTarget.getBoundingClientRect();
                        setMenuPosition({ top: rect.top });
                        setActiveChatMenu(activeChatMenu === idx ? null : idx);
                      }}
                      className={
                        "absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#E4E6EB] dark:bg-[#4E4F50] flex items-center justify-center text-gray-600 dark:text-[#B0B3B8] hover:bg-[#D8D9DB] dark:hover:bg-[#5A5B5C] transition-all z-10 " +
                        (activeChatMenu === idx
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100")
                      }
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="5" cy="12" r="1.5" />
                        <circle cx="12" cy="12" r="1.5" />
                        <circle cx="19" cy="12" r="1.5" />
                      </svg>
                    </button>
                      {activeChatMenu === idx && (
                        <div
                          ref={chatMenuRef}
                          onClick={(e) => e.stopPropagation()}
                          className="fixed z-[200] w-[280px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.25)] border border-gray-100 dark:border-[#3E4042] overflow-hidden py-2"
                          style={{
                            right: "388px",
                            top: Math.min(
                              menuPosition.top,
                              window.innerHeight - 520,
                            ),
                          }}
                        >
                          <button className="w-full text-left px-5 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-4 text-[15px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                            <svg className="w-6 h-6 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {t("chat.viewProfile")}
                          </button>
                          <button className="w-full text-left px-5 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-4 text-[15px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                            <svg className="w-6 h-6 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                            {t("chat.archiveChat")}
                          </button>
                          <button className="w-full text-left px-5 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-4 text-[15px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                            <svg className="w-6 h-6 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                            {t("chat.pinChat")}
                          </button>
                          <button className="w-full text-left px-5 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-4 text-[15px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                            <svg className="w-6 h-6 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {t("chat.markUnread")}
                          </button>
                          <button className="w-full text-left px-5 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-4 text-[15px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                            <svg className="w-6 h-6 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {t("chat.addFavorite")}
                          </button>
                          <button className="w-full text-left px-5 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center justify-between text-[15px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                            <div className="flex items-center gap-4">
                              <svg className="w-6 h-6 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                              </svg>
                              {t("chat.addToList")}
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                          <div className="border-t border-gray-100 dark:border-[#3E4042] my-2" />
                          <button className="w-full text-left px-5 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-4 text-[15px] font-semibold text-red-500 transition-colors">
                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            {t("chat.report")}
                          </button>
                          <button className="w-full text-left px-5 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-4 text-[15px] font-semibold text-red-500 transition-colors">
                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                            {t("chat.block")}
                          </button>
                          <button className="w-full text-left px-5 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-4 text-[15px] font-semibold text-[#F15C00] transition-colors">
                            <svg className="w-6 h-6 text-[#F15C00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {t("chat.clearChat")}
                          </button>
                          <button className="w-full text-left px-5 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-4 text-[15px] font-semibold text-[#F15C00] transition-colors">
                            <svg className="w-6 h-6 text-[#F15C00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            {t("chat.deleteChat")}
                          </button>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* New Message Panel */}
        <div
          className={`hidden lg:flex fixed bottom-0 right-[396px] w-[300px] bg-white dark:bg-[#242526] rounded-t-xl shadow-[0_0_15px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] flex-col z-50 transition-all duration-300 ease-in-out transform origin-bottom ${isNewMessageOpen ? "scale-y-100 opacity-100 h-[420px]" : "scale-y-0 opacity-0 h-0 pointer-events-none"}`}
        >
          {/* Header */}
          <div className="px-3 py-2 flex items-center justify-between border-b border-gray-100 dark:border-[#3E4042] shrink-0 h-[48px]">
            <span className="font-semibold text-black dark:text-[#E4E6EB] text-[15px] pl-1">
              {t("chat.newMessage")}
            </span>
            <button
              onClick={() => setIsNewMessageOpen(false)}
              className="p-1 hover:bg-gray-200 dark:hover:bg-[#4E4F50] dark:bg-[#3A3B3C] rounded-full transition-colors text-gray-500 dark:text-[#B0B3B8] hover:text-gray-700 dark:hover:text-[#E4E6EB]"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* To: Input */}
          <div className="px-4 py-3 border-b border-gray-100 dark:border-[#3E4042] flex items-center gap-2">
            <span className="text-gray-500 dark:text-[#B0B3B8] text-[15px]">
              {t("chat.to")}
            </span>
            <input
              type="text"
              className="flex-1 outline-none text-[15px] bg-transparent text-black dark:text-[#E4E6EB] placeholder-gray-400"
            />
          </div>

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto sidebar-scrollbar">
            {/* Pam Faiz */}
            <div className="flex items-center gap-3 p-3 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                <img
                  src="/default-avatar.svg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB] truncate">
                  Pam Faiz
                </span>
              </div>
            </div>
          </div>
        </div>
      </>

      {/* Profile Right Sidebar */}
      <div
        className={`hidden lg:block fixed right-0 top-[56px] w-[340px] xl:w-[380px] overscroll-contain h-[calc(100vh-56px)] overflow-y-auto pt-6 px-4 pb-32 transition-transform duration-300 ease-in-out transform ${isProfileSidebarOpen ? "translate-x-0" : "translate-x-full"} z-40 sidebar-scrollbar`}
      >
        <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] overflow-hidden">
          {selectedProfile && (
            <>
              {/* Header (Cover Photo & Avatar) */}
              <div className="relative">
                {/* Close Button on top of cover */}
                <button
                  onClick={() => setIsProfileSidebarOpen(false)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white z-10 transition-colors backdrop-blur-sm shadow-sm"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Cover Photo */}
                <div className="h-[110px] w-full bg-gray-300 dark:bg-[#3A3B3C]">
                  <img
                    src="/default-cover.jpg"
                    alt="Cover"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement?.classList.add(
                        "bg-gradient-to-r",
                        "from-emerald-500",
                        "to-teal-600",
                      );
                    }}
                  />
                </div>

                {/* Avatar */}
                <div className="absolute -bottom-8 left-4 w-[80px] h-[80px] rounded-full border-4 border-white dark:border-[#242526] bg-white dark:bg-[#242526] overflow-hidden shadow-sm">
                  <img
                    src={selectedProfile.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Profile Info */}
              <div className="pt-10 px-4 pb-4 border-b border-gray-100 dark:border-[#3E4042]">
                <h3 className="font-bold text-[18px] text-black dark:text-[#E4E6EB] leading-tight">
                  {selectedProfile.name}
                </h3>
                <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8] mb-3">
                  {selectedProfile.role}
                </p>

                {/* Bio */}
                <p className="text-[14px] text-black dark:text-[#E4E6EB] mb-4">
                  Ini adalah bio singkat dari {selectedProfile.name}. Selalu
                  semangat ngoding dan belajar hal baru setiap hari! 🚀
                </p>

                {/* Friends Count */}
                <div className="flex items-center gap-1.5 text-[14px] text-gray-500 dark:text-[#B0B3B8] mb-4 hover:underline cursor-pointer w-max">
                  <span className="font-bold text-black dark:text-[#E4E6EB]">
                    1.2K
                  </span>
                  <span>{t("profileSidebar.friends")}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  {selectedProfile.relation === "friend" ? (
                    // Sudah berteman: Teman + Buka Profil + Kirim Pesan
                    <>
                      <div className="flex items-center gap-2">
                        <button className="flex-[1.5] bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#D8DADF] dark:hover:bg-[#4E4F50] text-black dark:text-[#E4E6EB] font-semibold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center">
                          <span className="text-[14px]">
                            {t("friend.alreadyFriend")}
                          </span>
                        </button>
                        <button className="flex-1 bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#D8DADF] dark:hover:bg-[#4E4F50] text-black dark:text-[#E4E6EB] font-semibold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center">
                          <span className="text-[14px]">
                            {t("profileSidebar.openProfile")}
                          </span>
                        </button>
                      </div>
                      <button className="w-full bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#D8DADF] dark:hover:bg-[#4E4F50] text-black dark:text-[#E4E6EB] font-semibold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span className="text-[14px]">
                          {t("profileSidebar.message")}
                        </span>
                      </button>
                    </>
                  ) : selectedProfile.relation === "request" ? (
                    // Permintaan teman masuk: Terima + Buka Profil
                    <>
                      <div className="flex items-center gap-2">
                        <button className="flex-[1.5] bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center shadow-sm">
                          <span className="text-[14px]">
                            {t("friend.accept")}
                          </span>
                        </button>
                        <button className="flex-1 bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#D8DADF] dark:hover:bg-[#4E4F50] text-black dark:text-[#E4E6EB] font-semibold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center">
                          <span className="text-[14px]">
                            {t("profileSidebar.openProfile")}
                          </span>
                        </button>
                      </div>
                      <button className="w-full bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#D8DADF] dark:hover:bg-[#4E4F50] text-black dark:text-[#E4E6EB] font-semibold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span className="text-[14px]">
                          {t("profileSidebar.message")}
                        </span>
                      </button>
                    </>
                  ) : (
                    // Default (stranger): Add Friend + Open Profile + Send Message
                    <>
                      <div className="flex items-center gap-2">
                        <button className="flex-[1.5] bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                            />
                          </svg>
                          <span className="text-[14px]">
                            {t("profileSidebar.addFriend")}
                          </span>
                        </button>
                        <button className="flex-1 bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#D8DADF] dark:hover:bg-[#4E4F50] text-black dark:text-[#E4E6EB] font-semibold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center">
                          <span className="text-[14px]">
                            {t("profileSidebar.openProfile")}
                          </span>
                        </button>
                      </div>
                      <button className="w-full bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#D8DADF] dark:hover:bg-[#4E4F50] text-black dark:text-[#E4E6EB] font-semibold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span className="text-[14px]">
                          {t("profileSidebar.message")}
                        </span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Account Details / Lists */}
              <div className="p-4 border-b border-gray-100 dark:border-[#3E4042]">
                {/* Aktivitas Akun */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-[15px] text-black dark:text-[#E4E6EB]">
                      {t("profileSidebar.activity")}
                    </h4>
                    <a
                      href="#"
                      className="text-[13px] text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      Lihat Semua
                    </a>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[13px] text-black dark:text-[#E4E6EB]">
                          Membuat postingan di grup{" "}
                          <span className="font-semibold">
                            Web Dev Indonesia
                          </span>
                        </p>
                        <p className="text-[11px] text-gray-500 dark:text-[#B0B3B8] mt-0.5">
                          2 jam lalu
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 text-blue-600 dark:text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[13px] text-black dark:text-[#E4E6EB]">
                          Bergabung dengan grup{" "}
                          <span className="font-semibold">
                            UI/UX Enthusiast
                          </span>
                        </p>
                        <p className="text-[11px] text-gray-500 dark:text-[#B0B3B8] mt-0.5">
                          Kemarin
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pemilik Grup */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-[15px] text-black dark:text-[#E4E6EB]">
                      {t("profileSidebar.ownedGroups")}
                    </h4>
                    <a
                      href="#"
                      className="text-[13px] text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      Lihat Semua
                    </a>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-[#3A3B3C] shrink-0 overflow-hidden">
                        <img
                          src="/default-cover.jpg"
                          alt="Group"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-[14px] text-black dark:text-[#E4E6EB] leading-tight hover:underline cursor-pointer">
                          Web Dev Indonesia
                        </p>
                        <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8] mt-0.5">
                          15.2K Member
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-[#3A3B3C] shrink-0 overflow-hidden">
                        <img
                          src="/default-cover.jpg"
                          alt="Group"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-[14px] text-black dark:text-[#E4E6EB] leading-tight hover:underline cursor-pointer">
                          Freelance Programmer ID
                        </p>
                        <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8] mt-0.5">
                          8.1K Member
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grup yang diikuti */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-[15px] text-black dark:text-[#E4E6EB]">
                      {t("profileSidebar.joinedGroups")}
                    </h4>
                    <a
                      href="#"
                      className="text-[13px] text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      Lihat Semua
                    </a>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-[#3A3B3C] shrink-0 overflow-hidden">
                        <img
                          src="/default-cover.jpg"
                          alt="Group"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-[14px] text-black dark:text-[#E4E6EB] leading-tight hover:underline cursor-pointer">
                          Next.js Indonesia
                        </p>
                        <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8] mt-0.5">
                          30.5K Member
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-[#3A3B3C] shrink-0 overflow-hidden">
                        <img
                          src="/default-cover.jpg"
                          alt="Group"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-[14px] text-black dark:text-[#E4E6EB] leading-tight hover:underline cursor-pointer">
                          Tailwind CSS Community
                        </p>
                        <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8] mt-0.5">
                          25.3K Member
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Posts */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-[15px] text-black dark:text-[#E4E6EB]">
                    {t("profileSidebar.recentPosts")}
                  </h4>
                </div>

                {/* Dummy Post 1 */}
                <div className="mb-3 bg-white dark:bg-[#242526] p-3 rounded-xl border border-gray-200 dark:border-[#4E4F50] shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-gray-100 dark:border-[#3A3B3C]">
                      <img
                        src={selectedProfile.avatar}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[13px] text-black dark:text-[#E4E6EB] leading-none">
                        {selectedProfile.name}
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-[#B0B3B8] mt-0.5">
                        2 jam lalu
                      </span>
                    </div>
                  </div>
                  <p className="text-[13px] text-black dark:text-[#E4E6EB] line-clamp-3">
                    Wah seru banget hari ini nyobain bikin Sidebar UI! Semangat
                    terus buat semua teman-teman developer 🔥🚀
                  </p>
                </div>

                {/* Dummy Post 2 */}
                <div className="bg-white dark:bg-[#242526] p-3 rounded-xl border border-gray-200 dark:border-[#4E4F50] shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-gray-100 dark:border-[#3A3B3C]">
                      <img
                        src={selectedProfile.avatar}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[13px] text-black dark:text-[#E4E6EB] leading-none">
                        {selectedProfile.name}
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-[#B0B3B8] mt-0.5">
                        Kemarin
                      </span>
                    </div>
                  </div>
                  <p className="text-[13px] text-black dark:text-[#E4E6EB] line-clamp-3">
                    Ada yang punya rekomendasi tutorial framework JS yang lagi
                    ngetrend? Kasih saran dong! 🤔
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add Shortcut Modal */}
      {isShortcutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-[#242526] w-full max-w-[400px] rounded-lg shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200 dark:border-[#3E4042]">
              <h2 className="text-[16px] font-semibold text-black dark:text-[#E4E6EB]">
                {t("mencari.shortcut_title")}
              </h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-[13px] text-gray-600 dark:text-[#B0B3B8] mb-1">
                  {t("mencari.name")}
                </label>
                <input
                  type="text"
                  className="w-full bg-[#F0F2F5] dark:bg-[#3A3B3C] text-black dark:text-[#E4E6EB] rounded px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[13px] text-gray-600 dark:text-[#B0B3B8] mb-1">
                  {t("mencari.url")}
                </label>
                <input
                  type="text"
                  className="w-full bg-[#F0F2F5] dark:bg-[#3A3B3C] text-black dark:text-[#E4E6EB] rounded px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="px-5 py-4 flex justify-end gap-2 bg-[#F8F9FA] dark:bg-[#303134] border-t border-gray-200 dark:border-[#3E4042]">
              <button
                onClick={() => setIsShortcutModalOpen(false)}
                className="px-4 py-2 rounded-md text-[14px] font-medium text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-200 dark:hover:bg-[#4E4F50] transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => setIsShortcutModalOpen(false)}
                className="px-4 py-2 rounded-md text-[14px] font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
      {activeTab === "chat" && (
        <div className="fixed top-[56px] left-0 right-0 bottom-0 flex w-full bg-[#F0F2F5] dark:bg-[#18191A] z-40 overflow-hidden">
          
          <div className="w-[360px] bg-white dark:bg-[#242526] border-r border-gray-200 dark:border-[#3E4042] flex flex-col shrink-0">
            <div className="pt-4 px-4 border-b border-gray-200 dark:border-[#3E4042]">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-[24px] text-black dark:text-[#E4E6EB]">
                  {chatSidebarView === 'friends' ? t('chat.yourFriends') : t('chat.title')}
                </h2>
                <div className="flex items-center gap-2">
                  {chatSidebarView === "chats" && (
                    <div className="relative group/options" ref={chatListSettingsRef}>
                      <button onClick={() => setIsChatListSettingsOpen(!isChatListSettingsOpen)} className="w-9 h-9 rounded-full bg-[#F0F2F5] dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] flex items-center justify-center transition-colors text-black dark:text-[#E4E6EB]">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg>
                      </button>
                      <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-gray-800/90 text-[#E4E6EB] text-[13px] font-medium rounded-lg opacity-0 group-hover/options:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                        {t('chat.optionsTooltip')}
                      </div>
                      {isChatListSettingsOpen && (
                        <div className="absolute left-0 top-full mt-2 w-56 bg-white dark:bg-[#242526] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-[#3E4042] py-1.5 z-50">
                          <button onClick={(e) => { e.stopPropagation(); setIsChatListSettingsOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[14px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                            <svg className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                            {t('chat.manage')}
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); setIsChatListSettingsOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[14px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                            <svg className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {t('chat.settings')}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="relative group/newchat">
                    <button className="w-9 h-9 rounded-full bg-[#F0F2F5] dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] flex items-center justify-center transition-colors text-black dark:text-[#E4E6EB]">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                      </svg>
                    </button>
                    <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-gray-800/90 text-[#E4E6EB] text-[13px] font-medium rounded-lg opacity-0 group-hover/newchat:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {t('chat.newChatTooltip')}
                    </div>
                  </div>
                  <div className="relative group/friendlist">
                    <button 
                      onClick={() => setChatSidebarView(chatSidebarView === 'chats' ? 'friends' : 'chats')} 
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${chatSidebarView === 'friends' ? 'bg-gray-300 dark:bg-[#4E4F50]' : 'bg-[#F0F2F5] dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50]'}`}
                    >
                      {chatSidebarView === "chats" ? (
                        <img src="/navigasi/teman.svg" className="w-5 h-5 dark:invert" />
                      ) : (
                        <svg className="w-5 h-5 text-gray-700 dark:text-[#E4E6EB]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.06 4.94a1.5 1.5 0 00-2.12 0L12 9.88 7.06 4.94a1.5 1.5 0 00-2.12 2.12L9.88 12l-4.94 4.94a1.5 1.5 0 102.12 2.12L12 14.12l4.94 4.94a1.5 1.5 0 002.12-2.12L14.12 12l4.94-4.94a1.5 1.5 0 000-2.12z" />
                        </svg>
                      )}
                    </button>
                    <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-gray-800/90 text-[#E4E6EB] text-[13px] font-medium rounded-lg opacity-0 group-hover/friendlist:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {chatSidebarView === "friends" ? t('chat.closeTooltip') : t('chat.friendlistTooltip')}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 relative">
                <input 
                  type="text" 
                  placeholder={chatSidebarView === 'friends' ? t('chat.searchUsername') : t('chat.searchChat')} 
                  className="w-full bg-[#F0F2F5] dark:bg-[#3A3B3C] text-black dark:text-[#E4E6EB] px-4 py-2 rounded-full outline-none text-[15px]" 
                />
              </div>
              {chatSidebarView === "chats" ? (
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => setChatListFilter('all')}
                      className={`px-3 py-2 text-[14px] font-medium border-b-2 -mb-[1px] transition-colors ${chatListFilter === 'all' ? 'text-[#00A884] border-[#00A884]' : 'text-gray-500 dark:text-[#A8ABAF] border-transparent hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                      {t('chat.filterAll')}
                    </button>
                    <button 
                      onClick={() => setChatListFilter('unread')}
                      className={`px-3 py-2 text-[14px] font-medium border-b-2 -mb-[1px] transition-colors ${chatListFilter === 'unread' ? 'text-[#00A884] border-[#00A884]' : 'text-gray-500 dark:text-[#A8ABAF] border-transparent hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                      {t('chat.filterUnread')}
                    </button>
                    <button 
                      onClick={() => setChatListFilter('favorite')}
                      className={`px-3 py-2 text-[14px] font-medium border-b-2 -mb-[1px] transition-colors ${chatListFilter === 'favorite' ? 'text-[#00A884] border-[#00A884]' : 'text-gray-500 dark:text-[#A8ABAF] border-transparent hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                      {t('chat.filterFavorite')}
                    </button>
                  </div>
                  <div className="relative" ref={chatFilterRef}>
                    <button onClick={() => setIsChatFilterOpen(!isChatFilterOpen)} className={`p-2 rounded-full transition-colors mb-1 mr-1 ${isChatFilterOpen ? 'bg-gray-200 dark:bg-[#4E4F50] text-[#00A884]' : 'text-gray-500 dark:text-[#A8ABAF] hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'}`}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
                      </svg>
                    </button>
                    {isChatFilterOpen && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-[#242526] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-[#3E4042] py-1.5 z-50">
                        <button onClick={(e) => { e.stopPropagation(); setChatListFilter('group'); setIsChatFilterOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[14px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                          <svg className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8]" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
                          {t('chat.filterGroup')}
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); setChatListFilter('archive'); setIsChatFilterOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[14px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                          <svg className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12.14l.84 1H5.12z" /></svg>
                          {t('chat.filterArchive')}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="pb-4"></div>
              )}
            </div>
              <div className="overscroll-contain flex-1 overflow-y-auto sidebar-scrollbar p-2">
                {chatSidebarView === "chats" ? (
                  dummyChats.map((chat, idx) => (
                    <div
                      key={idx}
                      className="relative group flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors mb-1"
                    >
                      <div className="relative w-14 h-14 shrink-0">
                        <img
                          src="/default-avatar.svg"
                          className="w-full h-full rounded-full object-cover border border-emerald-600 dark:border-emerald-400"
                        />
                        {chat.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#31A24C] rounded-full border-2 border-white dark:border-[#242526]"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold text-[15px] text-black dark:text-[#E4E6EB] truncate">
                            {chat.name}
                          </h4>
                          <span className="text-[12px] text-gray-500">
                            {formatChatDate(chat.ts, locale)}
                          </span>
                        </div>
                        <p className="text-[13px] text-gray-500 truncate mt-0.5">
                          {chat.msg}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const rect = e.currentTarget.getBoundingClientRect();
                          setMenuPosition({ top: rect.top });
                          setActiveChatMenu(activeChatMenu === idx ? null : idx);
                        }}
                        className={
                          "absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#E4E6EB] dark:bg-[#4E4F50] flex items-center justify-center text-gray-600 dark:text-[#B0B3B8] hover:bg-[#D8D9DB] dark:hover:bg-[#5A5B5C] transition-all z-10 " +
                          (activeChatMenu === idx
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100")
                        }
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="5" cy="12" r="1.5" />
                          <circle cx="12" cy="12" r="1.5" />
                          <circle cx="19" cy="12" r="1.5" />
                        </svg>
                      </button>
                      {activeChatMenu === idx && (
                        <div
                          ref={chatMenuRef}
                          onClick={(e) => e.stopPropagation()}
                          className="fixed z-[200] w-[280px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.25)] border border-gray-100 dark:border-[#3E4042] overflow-hidden py-2"
                          style={{
                            left: "360px",
                            top: Math.min(
                              menuPosition.top,
                              window.innerHeight - 520,
                            ),
                          }}
                        >
                          <button className="w-full text-left px-5 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-4 text-[15px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                            <svg className="w-6 h-6 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {t("chat.viewProfile")}
                          </button>
                          <button className="w-full text-left px-5 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-4 text-[15px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                            <svg className="w-6 h-6 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                            {t("chat.archiveChat")}
                          </button>
                          <button className="w-full text-left px-5 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-4 text-[15px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                            <svg className="w-6 h-6 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                            {t("chat.pinChat")}
                          </button>
                          <button className="w-full text-left px-5 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-4 text-[15px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                            <svg className="w-6 h-6 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {t("chat.markUnread")}
                          </button>
                          <button className="w-full text-left px-5 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-4 text-[15px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                            <svg className="w-6 h-6 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {t("chat.addFavorite")}
                          </button>
                          <button className="w-full text-left px-5 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center justify-between text-[15px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                            <div className="flex items-center gap-4">
                              <svg className="w-6 h-6 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                              </svg>
                              {t("chat.addToList")}
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                          <div className="border-t border-gray-100 dark:border-[#3E4042] my-2" />
                          <button className="w-full text-left px-5 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-4 text-[15px] font-semibold text-red-500 transition-colors">
                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            {t("chat.report")}
                          </button>
                          <button className="w-full text-left px-5 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-4 text-[15px] font-semibold text-red-500 transition-colors">
                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                            {t("chat.block")}
                          </button>
                          <button className="w-full text-left px-5 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-4 text-[15px] font-semibold text-[#F15C00] transition-colors">
                            <svg className="w-6 h-6 text-[#F15C00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {t("chat.clearChat")}
                          </button>
                          <button className="w-full text-left px-5 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-4 text-[15px] font-semibold text-[#F15C00] transition-colors">
                            <svg className="w-6 h-6 text-[#F15C00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            {t("chat.deleteChat")}
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <>
                    <div className="px-2 pt-2 pb-1 text-[13px] font-semibold text-gray-500 dark:text-[#B0B3B8]">
                      {t('chat.activeFriends')} ({dummyChats.filter(c => c.isOnline).length})
                    </div>
                    {dummyChats.filter(c => c.isOnline).map((chat, idx) => (
                      <div
                        key={'online-'+idx}
                        className="relative group flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors mb-1"
                      >
                        <div className="relative w-14 h-14 shrink-0">
                          <img
                            src="/default-avatar.svg"
                            className="w-full h-full rounded-full object-cover border border-emerald-600 dark:border-emerald-400"
                          />
                          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#31A24C] rounded-full border-2 border-white dark:border-[#242526]"></div>
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <h4 className="font-semibold text-[15px] text-black dark:text-[#E4E6EB] truncate">
                            {chat.name}
                          </h4>
                        </div>
                      </div>
                    ))}

                    <div className="px-2 pt-4 pb-1 text-[13px] font-semibold text-gray-500 dark:text-[#B0B3B8]">
                      {t('chat.offlineFriends')} ({dummyChats.filter(c => !c.isOnline).length})
                    </div>
                    {dummyChats.filter(c => !c.isOnline).map((chat, idx) => (
                      <div
                        key={'offline-'+idx}
                        className="relative group flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors mb-1"
                      >
                        <div className="relative w-14 h-14 shrink-0">
                          <img
                            src="/default-avatar.svg"
                            className="w-full h-full rounded-full object-cover border border-emerald-600 dark:border-emerald-400"
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <h4 className="font-semibold text-[15px] text-gray-500 dark:text-[#A8ABAF] truncate">
                            {chat.name}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
          </div>

          {/* TENGAH: Chat Room */}
          <div className="flex-1 bg-transparent flex flex-col relative">
            <div className="h-[60px] bg-white dark:bg-[#242526] border-b border-gray-200 dark:border-[#3E4042] flex items-center px-4 shadow-sm shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 shrink-0">
                  <img
                    src="/default-avatar.svg"
                    className="w-full h-full rounded-full object-cover border border-emerald-600 dark:border-emerald-400"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                    Budi Santoso
                  </h3>
                  <p className="text-[12px] text-gray-500">
                    {t("chat.activeNow")}
                  </p>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <button 
                  ref={roomSearchToggleRef}
                  onClick={() => setIsRoomSearchOpen(!isRoomSearchOpen)}
                  className={`text-[#00B47A] w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isRoomSearchOpen ? 'bg-gray-100 dark:bg-[#3A3B3C]' : 'hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'}`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="relative" ref={chatMoreMenuRef}>
                  <button
                    onClick={() => setIsChatMoreMenuOpen(!isChatMoreMenuOpen)}
                    className={`text-[#00B47A] w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isChatMoreMenuOpen ? 'bg-gray-100 dark:bg-[#3A3B3C]' : 'hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>
                  {isChatMoreMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-[280px] bg-white dark:bg-[#242526] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-[#3E4042] py-1.5 z-50">
                      <button
                        onClick={() => {
                          setIsChatMoreMenuOpen(false);
                          setIsChatInfoOpen(true);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[15px] font-semibold text-black dark:text-[#E4E6EB] transition-colors"
                      >
                        <svg
                          className="w-6 h-6 text-black dark:text-[#E4E6EB]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Lihat profil
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsChatMoreMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[15px] font-semibold text-black dark:text-[#E4E6EB] transition-colors"
                      >
                        <svg
                          className="w-6 h-6 text-black dark:text-[#E4E6EB]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        Cari
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsChatMoreMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[15px] font-semibold text-black dark:text-[#E4E6EB] transition-colors"
                      >
                        <svg
                          className="w-6 h-6 text-black dark:text-[#E4E6EB]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Pilih pesan
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsChatMoreMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[15px] font-semibold text-black dark:text-[#E4E6EB] transition-colors"
                      >
                        <svg
                          className="w-6 h-6 text-black dark:text-[#E4E6EB]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Pesan sementara
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsChatMoreMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[15px] font-semibold text-black dark:text-[#E4E6EB] transition-colors"
                      >
                        <svg
                          className="w-6 h-6 text-black dark:text-[#E4E6EB]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        Tambah ke favorit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsChatMoreMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center justify-between text-[15px] font-semibold text-black dark:text-[#E4E6EB] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <svg
                            className="w-6 h-6 text-black dark:text-[#E4E6EB]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 6h16M4 10h16M4 14h16M4 18h16"
                            />
                          </svg>
                          Tambah ke daftar
                        </div>
                        <svg
                          className="w-4 h-4 text-black dark:text-[#E4E6EB]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsChatMoreMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[15px] font-semibold text-black dark:text-[#E4E6EB] transition-colors"
                      >
                        <svg
                          className="w-6 h-6 text-black dark:text-[#E4E6EB]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Tutup obrolan
                      </button>

                      <div className="my-1.5 border-t border-gray-200 dark:border-[#3E4042]"></div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsChatMoreMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[15px] font-semibold text-red-500 dark:text-red-500 transition-colors"
                      >
                        <svg
                          className="w-6 h-6 text-red-500 dark:text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2"
                          />
                        </svg>
                        Laporkan
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsChatMoreMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[15px] font-semibold text-red-500 dark:text-red-500 transition-colors"
                      >
                        <svg
                          className="w-6 h-6 text-red-500 dark:text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                          />
                        </svg>
                        Blokir
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsChatMoreMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[15px] font-semibold text-orange-500 dark:text-orange-500 transition-colors"
                      >
                        <svg
                          className="w-6 h-6 text-orange-500 dark:text-orange-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Bersihkan obrolan
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsChatMoreMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[15px] font-semibold text-orange-500 dark:text-orange-500 transition-colors"
                      >
                        <svg
                          className="w-6 h-6 text-orange-500 dark:text-orange-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Hapus obrolan
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {isRoomSearchOpen && (
              <div ref={roomSearchRef} className="absolute top-[60px] right-0 max-w-md w-full z-10 pr-6 pl-4 py-3 flex items-center gap-2 bg-transparent pointer-events-none">
                <div className="flex-1 relative pointer-events-auto">
                  <input type="text" placeholder={t("chat.searchInChat") || "Cari di obrolan..."} className="w-full bg-white dark:bg-[#18191A] text-black dark:text-[#E4E6EB] border border-gray-300 dark:border-[#4E4F50] shadow-md px-4 py-2.5 rounded-full focus:outline-none text-[15px]" />
                </div>
                <button className="w-10 h-10 rounded-full bg-white dark:bg-[#18191A] border border-gray-300 dark:border-[#4E4F50] shadow-md flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#242526] transition-colors shrink-0 pointer-events-auto">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
              <div className="flex flex-col items-center justify-center pt-8 pb-16">
                <div className="w-[100px] h-[100px] mb-4 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                  <img src="/default-avatar.svg" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-[20px] font-semibold text-black dark:text-[#E4E6EB] mb-2">Budi Santoso</h2>
                <p className="text-gray-500 dark:text-[#B0B3B8] text-[15px] mb-8">{t("chat.youCreatedThisChat")}</p>
                <div className="max-w-[400px] text-center text-[13px] text-gray-500 dark:text-[#B0B3B8] leading-relaxed px-4">
                  <svg className="w-3.5 h-3.5 inline-block mr-1 align-baseline text-gray-400 dark:text-[#B0B3B8]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                  {t("chat.e2eEncryptionText")}{" "}
                  <a href="#" className="text-[#2D88FF] hover:underline cursor-pointer">{t("chat.learnMore")}</a>
                </div>
              </div>
              <div className="flex items-start gap-2 max-w-[70%]">
                <img
                  src="/default-avatar.svg"
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
                <div className="bg-white dark:bg-[#3A3B3C] px-4 py-2 rounded-2xl rounded-tl-none shadow-sm">
                  <p className="text-[14px] text-black dark:text-[#E4E6EB]">
                    Halo bro, apa kabar? Udah lama gak nongkrong nih.
                  </p>
                </div>
              </div>
              <div className="flex items-end justify-end gap-2 max-w-[70%] self-end">
                <div className="bg-emerald-600 dark:bg-emerald-500 px-4 py-2 rounded-2xl rounded-tr-none shadow-sm">
                  <p className="text-[14px] text-white">
                    Baik bro! Iyak nih kapan ya terakhir ketemu, sibuk parah
                    wkwk.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-[#242526] border-t border-gray-200 dark:border-[#3E4042] shrink-0">
              <div className="flex items-center gap-2">
                <div className="relative" ref={attachmentMenuRef}>
                  <button 
                    onClick={() => setIsAttachmentMenuOpen(!isAttachmentMenuOpen)}
                    className="bg-[#00B47A] text-white hover:bg-[#009E6B] p-2 rounded-full transition-colors flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  
                  {isAttachmentMenuOpen && (
                    <div className="absolute bottom-full left-0 mb-3 w-[220px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.25)] border border-gray-100 dark:border-[#3E4042] overflow-hidden py-2 z-50">
                      <button className="w-full text-left px-5 py-3 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[15px] font-medium text-black dark:text-[#E4E6EB] transition-colors">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-[#2D88FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        {t("chat.uploadImage")}
                      </button>
                      <button className="w-full text-left px-5 py-3 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[15px] font-medium text-black dark:text-[#E4E6EB] transition-colors">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        {t("chat.uploadFile")}
                      </button>
                    </div>
                  )}
                </div>
                <button className="text-gray-500 dark:text-[#A8ABAF] hover:text-[#00B47A] transition-colors p-2 shrink-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="flex-1 flex items-center bg-[#F0F2F5] dark:bg-[#3A3B3C] rounded-full px-4 py-2 ml-1">
                  <input
                    type="text"
                    placeholder={t("chat.typeMessage")}
                    className="flex-1 bg-transparent outline-none text-[15px] text-black dark:text-[#E4E6EB]"
                  />
                  <button className="text-[#00B47A] hover:text-[#009E6B] ml-2 transition-colors shrink-0">
                    <svg className="w-5 h-5 translate-x-[2px]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
                <button className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full transition-colors ml-1 font-bold text-[15px] shadow-sm">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                  >
                    <g
                      transform="translate(0,512) scale(0.1,-0.1)"
                      stroke="none"
                    >
                      <path d="M2256 5104 c-140 -34 -288 -147 -353 -269 -49 -94 -66 -167 -65 -275 2 -215 153 -2686 167 -2744 51 -199 230 -368 429 -405 141 -26 291 -6 405 54 135 71 253 228 281 375 6 30 46 661 90 1402 71 1228 77 1353 65 1422 -38 221 -198 389 -420 441 -83 20 -515 19 -599 -1z" />
                      <path d="M414 3206 c-42 -18 -71 -60 -137 -191 -130 -260 -208 -507 -253 -800 -26 -169 -26 -541 0 -710 23 -151 74 -359 121 -495 41 -119 172 -397 212 -448 77 -101 228 -72 261 51 14 49 9 64 -80 242 -108 220 -176 432 -215 680 -24 153 -24 497 0 650 39 248 107 460 215 680 89 178 94 193 80 242 -24 90 -119 136 -204 99z" />
                      <path d="M4596 3210 c-58 -18 -96 -73 -96 -140 0 -30 19 -79 78 -198 112 -227 175 -424 218 -687 26 -154 26 -496 0 -650 -43 -263 -106 -460 -218 -687 -88 -177 -96 -219 -55 -278 59 -87 177 -91 240 -9 40 53 161 309 206 436 214 601 197 1264 -46 1848 -40 95 -133 277 -160 314 -40 53 -99 71 -167 51z" />
                      <path d="M934 2906 c-43 -19 -74 -63 -138 -196 -222 -463 -256 -981 -95 -1465 45 -136 142 -344 183 -392 66 -78 194 -64 241 27 29 56 19 106 -44 232 -88 175 -141 346 -167 537 -43 327 17 667 172 972 42 82 54 116 54 151 0 106 -108 176 -206 134z" />
                      <path d="M4063 2900 c-25 -11 -51 -33 -63 -52 -35 -58 -27 -103 44 -250 120 -250 176 -482 176 -738 0 -256 -56 -488 -176 -738 -74 -153 -80 -194 -39 -254 34 -50 100 -76 154 -59 65 19 89 47 155 181 270 546 274 1171 11 1718 -68 142 -88 170 -139 193 -52 23 -71 23 -123 -1z" />
                      <path d="M1475 2613 c-66 -16 -133 -122 -198 -308 -56 -164 -71 -258 -71 -445 0 -122 4 -188 18 -255 39 -190 139 -423 200 -470 47 -35 95 -41 150 -17 98 44 110 122 42 265 -56 117 -83 199 -101 312 -36 221 1 450 106 656 45 88 51 145 19 197 -31 51 -105 80 -165 65z" />
                      <path d="M3577 2610 c-58 -10 -108 -65 -114 -124 -5 -41 0 -60 40 -144 58 -124 84 -205 102 -317 36 -221 4 -424 -102 -645 -39 -82 -45 -100 -40 -143 10 -112 144 -168 236 -99 58 43 159 284 198 472 13 61 18 131 18 250 0 119 -5 189 -18 250 -39 186 -140 429 -197 471 -35 26 -78 36 -123 29z" />
                      <path d="M2455 1090 c-198 -44 -352 -180 -417 -368 -32 -95 -32 -249 0 -344 56 -164 180 -288 348 -350 85 -31 263 -31 348 0 168 62 292 186 348 350 32 -95 32 -249 0 -344 -57 -164 -183 -291 -348 -349 -67 23 -215 33 -279 19z" />
                    </g>
                  </svg>
                  PING
                </button>
              </div>
            </div>
          </div>

          {/* KANAN: Chat Info Sidebar */}
          {isChatInfoOpen && (
            <div className="w-[360px] bg-white dark:bg-[#242526] border-l border-gray-200 dark:border-[#3E4042] flex flex-col shrink-0">
              <div className="p-4 border-b border-gray-200 dark:border-[#3E4042] flex justify-between items-center">
                <h2 className="font-bold text-[20px] text-black dark:text-[#E4E6EB]">
                  Chat Info
                </h2>
                <button
                  onClick={() => setIsChatInfoOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center justify-center transition-colors text-gray-500"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto sidebar-scrollbar p-4 flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 dark:border-[#3E4042]">
                  <img
                    src="/default-avatar.svg"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-[20px] text-black dark:text-[#E4E6EB]">
                  Budi Santoso
                </h3>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-1 cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 flex items-center justify-center transition-colors">
                      <svg
                        className="w-5 h-5 text-black dark:text-[#E4E6EB]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-[12px] text-black dark:text-[#E4E6EB]">
                      Pesan
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 flex items-center justify-center transition-colors">
                      <svg
                        className="w-5 h-5 text-black dark:text-[#E4E6EB]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <span className="text-[12px] text-black dark:text-[#E4E6EB]">
                      Panggil
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
