
"use client";

import React, { useState, use } from "react";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string; username: string; id: string }>;
}) {
  const t = useTranslations();
  
  const unwrappedParams = use(params);
  const username = unwrappedParams.username ? decodeURIComponent(unwrappedParams.username) : "pampam";
  const id = unwrappedParams.id || "123";

  const [activeTab, setActiveTab] = useState("posts");
  const [currentUser, setCurrentUser] = useState<any>({ username: "Guest", id: "1" });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.username || payload.name) {
          setCurrentUser({
            id: payload.sub || payload.id || payload._id || payload.userId || "1",
            username: payload.username || payload.name || "User",
            displayName: payload.displayName || payload.username || payload.name || "User",
          });
        }
      } catch (e) {
        console.error("Failed to parse token");
      }
    }
    setThemeLoaded(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#F0F2F5] dark:bg-[#18191A] text-black dark:text-[#E4E6EB] pb-10 pt-[56px]">
      {/* Fake Navbar (Just to match layout) */}
      <Navbar activeTab={null} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} themeLoaded={themeLoaded} currentUser={currentUser} />

      {/* Header Container */}
      <div className="w-full bg-white dark:bg-[#242526] shadow-sm rounded-b-lg">
        <div className="max-w-[1095px] mx-auto">
          {/* Cover Photo */}
          <div className="w-full h-[350px] bg-gradient-to-b from-gray-300 to-gray-400 dark:from-[#3A3B3C] dark:to-[#18191A] relative rounded-b-lg overflow-hidden group border-x border-b border-gray-200 dark:border-[#3E4042]">
            <div className="absolute bottom-4 right-4 bg-white dark:bg-[#3A3B3C] px-3 py-1.5 rounded-lg flex items-center gap-2 font-semibold text-[14px] shadow-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-[#4E4F50] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
              Edit cover photo
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-8 pb-4 relative">
            <div className="flex flex-col md:flex-row items-end md:items-center justify-between">
              <div className="flex items-end gap-4 -mt-8 relative z-10 w-full md:w-auto">
                {/* Avatar */}
                <div className="w-[168px] h-[168px] rounded-full bg-white dark:bg-[#242526] p-1 border-4 border-white dark:border-[#242526] relative shrink-0">
                  <img src="/default-avatar.svg" className="w-full h-full rounded-full object-cover bg-gray-200 dark:bg-[#3A3B3C]" />
                  <div className="absolute bottom-2 right-2 bg-gray-200 dark:bg-[#3A3B3C] p-2 rounded-full cursor-pointer hover:bg-gray-300 dark:hover:bg-[#4E4F50] transition-colors shadow-sm">
                     <svg className="w-5 h-5 text-black dark:text-[#E4E6EB]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
                  </div>
                </div>

                {/* Name & Friends Count */}
                <div className="pb-4 w-full text-center md:text-left mt-2 md:mt-0">
                  <h1 className="text-[32px] font-bold text-black dark:text-[#E4E6EB]">{username}</h1>
                  <p className="text-[15px] font-semibold text-gray-500 dark:text-[#B0B3B8] hover:underline cursor-pointer">1.2K friends</p>
                  
                  {/* Mutual friends avatars dummy */}
                  <div className="flex items-center justify-center md:justify-start mt-1">
                    {[1,2,3,4,5].map((i) => (
                      <img key={i} src="/default-avatar.svg" className="w-8 h-8 rounded-full border-2 border-white dark:border-[#242526] -ml-2 first:ml-0 bg-gray-300 dark:bg-[#3A3B3C]" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pb-4 mt-4 md:mt-0 w-full md:w-auto justify-center md:justify-end">
                <button className="flex items-center gap-2 bg-[#0866FF] text-white px-3 py-1.5 rounded-lg font-semibold text-[15px] hover:bg-[#0759E6] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>
                  Add to story
                </button>
                <button className="flex items-center gap-2 bg-gray-200 dark:bg-[#3A3B3C] text-black dark:text-[#E4E6EB] px-3 py-1.5 rounded-lg font-semibold text-[15px] hover:bg-gray-300 dark:hover:bg-[#4E4F50] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                  Edit profile
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="px-4">
            <div className="border-t border-gray-300 dark:border-[#3E4042]"></div>
          </div>

          {/* Tabs */}
          <div className="px-4 flex items-center gap-1 mt-1 pb-1">
            {['Posts', 'About', 'Friends', 'Photos', 'Videos', 'Check-ins'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={"px-4 py-4 font-semibold text-[15px] rounded-lg transition-colors " + (activeTab === tab.toLowerCase() ? "text-[#0866FF] border-b-[3px] border-[#0866FF] rounded-none" : "text-gray-600 dark:text-[#B0B3B8] hover:bg-gray-100 dark:hover:bg-[#3A3B3C]")}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1095px] mx-auto mt-4 flex flex-col md:flex-row gap-4 px-4">
        {/* Left Column (Intro / Photos / Friends) */}
        <div className="w-full md:w-[40%] space-y-4">
          {/* Intro Card */}
          <div className="bg-white dark:bg-[#242526] p-4 rounded-xl shadow-sm border border-gray-200 dark:border-[#3E4042]">
            <h2 className="font-bold text-[20px] mb-4 text-black dark:text-[#E4E6EB]">Intro</h2>
            <div className="text-center mb-4">
              <p className="text-[15px] text-black dark:text-[#E4E6EB]">Hello, this is my dummy profile! ID: {id}</p>
              <button className="w-full mt-4 bg-gray-200 dark:bg-[#3A3B3C] hover:bg-gray-300 dark:hover:bg-[#4E4F50] text-black dark:text-[#E4E6EB] py-1.5 rounded-lg font-semibold text-[15px] transition-colors">Edit bio</button>
            </div>
            <div className="space-y-4 text-[15px] text-black dark:text-[#E4E6EB]">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9a1 1 0 00-1 1v4a1 1 0 102 0v-4a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                <span>Works at <span className="font-semibold">Mencari.online</span></span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                <span>Lives in <span className="font-semibold">Malang, Indonesia</span></span>
              </div>
            </div>
          </div>
          
          {/* Photos Card */}
          <div className="bg-white dark:bg-[#242526] p-4 rounded-xl shadow-sm border border-gray-200 dark:border-[#3E4042]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[20px] text-black dark:text-[#E4E6EB]">Photos</h2>
              <button className="text-[#0866FF] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] px-2 py-1 rounded-md transition-colors text-[15px]">See all photos</button>
            </div>
            <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden">
               {[1,2,3,4,5,6].map((i) => (
                 <div key={i} className="aspect-square bg-gray-300 dark:bg-[#3A3B3C]"></div>
               ))}
            </div>
          </div>
        </div>

        {/* Right Column (Feed) */}
        <div className="w-full md:w-[60%] space-y-4">
          {/* Create Post */}
          <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-200 dark:border-[#3E4042] p-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200 dark:border-[#3E4042]">
              <img src="/default-avatar.svg" className="w-10 h-10 rounded-full bg-gray-300" />
              <div className="flex-1 bg-[#F0F2F5] dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] cursor-pointer transition-colors rounded-full px-4 py-2 text-[15px] text-gray-500 dark:text-[#B0B3B8]">
                What's on your mind?
              </div>
            </div>
            <div className="flex items-center pt-3 gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-lg transition-colors text-[15px] font-semibold text-gray-600 dark:text-[#B0B3B8]">
                 <svg className="w-6 h-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" /></svg>
                 Vidio
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-lg transition-colors text-[15px] font-semibold text-gray-600 dark:text-[#B0B3B8]">
                 <svg className="w-6 h-6 text-[#45BD62]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
                 Photo
              </button>
              <button className="flex-1 hidden sm:flex items-center justify-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-lg transition-colors text-[15px] font-semibold text-gray-600 dark:text-[#B0B3B8]">
                 <svg className="w-6 h-6 text-[#F97316]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                 Events
              </button>
            </div>
          </div>

          {/* Dummy Post */}
          <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-200 dark:border-[#3E4042] pt-4">
             <div className="flex items-center justify-between px-4 mb-3">
               <div className="flex items-center gap-2">
                 <img src="/default-avatar.svg" className="w-10 h-10 rounded-full bg-gray-300" />
                 <div>
                   <h3 className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">{username}</h3>
                   <span className="text-[13px] text-gray-500">2 hrs • Public</span>
                 </div>
               </div>
             </div>
             <p className="px-4 text-[15px] text-black dark:text-[#E4E6EB] mb-3">
               Ini adalah postingan dummy di halaman profil. Welcome to my profile page! 👋
             </p>
             <div className="w-full h-[300px] bg-gray-200 dark:bg-[#3A3B3C]"></div>
             <div className="p-2">
                <div className="flex items-center gap-1 border-t border-gray-200 dark:border-[#3E4042] pt-1 mt-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-1.5 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-lg font-semibold text-gray-600 dark:text-[#B0B3B8] transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.514" /></svg>
                    Like
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-1.5 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-lg font-semibold text-gray-600 dark:text-[#B0B3B8] transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    Comment
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-1.5 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-lg font-semibold text-gray-600 dark:text-[#B0B3B8] transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                    Share
                  </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
