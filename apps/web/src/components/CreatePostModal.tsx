"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { createPost, updatePost } from "@/app/actions/posts";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  onSuccess?: () => void;
  initialPost?: any;
}

export default function CreatePostModal({ isOpen, onClose, currentUser, onSuccess, initialPost }: CreatePostModalProps) {
  const t = useTranslations();
  const [postPrivacy, setPostPrivacy] = useState<"PUBLIC" | "FRIENDS" | "PRIVATE" | "COMMUNITY_ONLY">("PUBLIC");
  const [isPrivacyDropdownOpen, setIsPrivacyDropdownOpen] = useState(false);
  const privacyDropdownRef = useRef<HTMLDivElement>(null);
  
  const [postContent, setPostContent] = useState(initialPost?.content || "");
  const [isPosting, setIsPosting] = useState(false);


  useEffect(() => {
    if (isOpen) {
      setPostContent(initialPost?.content || "");
      setPostPrivacy(initialPost?.visibility || "PUBLIC");
    }
  }, [isOpen, initialPost]);

  // Close dropdown on outside click

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (privacyDropdownRef.current && !privacyDropdownRef.current.contains(event.target as Node)) {
        setIsPrivacyDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handlePost = async () => {
    if (!postContent.trim()) return;
    setIsPosting(true);

    try {
      let res;
      if (initialPost) {
        res = await updatePost(initialPost.id, currentUser.id, postContent, postPrivacy);
      } else {
        res = await createPost({
          authorId: currentUser.id,
          content: postContent,
          visibility: postPrivacy,
        });
      }

      if (res.success) {
        setPostContent("");
        onClose();
        if (onSuccess) onSuccess();
        // Dispatch custom event to trigger feed refresh
        window.dispatchEvent(new Event("refresh_feed"));
      } else {
        alert("Failed to create post: " + res.error);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to create post");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 dark:bg-black/70 px-4">
      <div className="w-full max-w-[500px] bg-white dark:bg-[#242526] rounded-xl shadow-xl flex flex-col relative border border-gray-200 dark:border-[#3E4042]">
        {/* Header */}
        <div className="flex items-center justify-center p-4 border-b border-gray-200 dark:border-[#3E4042] relative">
          <h2 className="text-[20px] font-bold text-black dark:text-[#E4E6EB]">{initialPost ? "Edit post" : "Create post"}</h2>
          <button onClick={onClose} className="absolute right-4 w-9 h-9 bg-gray-200 dark:bg-[#3A3B3C] rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-[#4E4F50] transition-colors text-gray-600 dark:text-[#B0B3B8]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-4">
            <img src={currentUser?.profile?.avatarUrl || "/default-avatar.svg"} className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-[#3E4042]" />
            <div>
              <h3 className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">{currentUser?.profile?.displayName || currentUser?.username}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="relative" ref={privacyDropdownRef}>
                  <button onClick={() => setIsPrivacyDropdownOpen(!isPrivacyDropdownOpen)} className="flex items-center gap-1 bg-gray-200 dark:bg-[#3A3B3C] px-2 py-0.5 rounded-md text-[12px] font-semibold text-gray-700 dark:text-[#E4E6EB]">
                    {postPrivacy === "PUBLIC" ? (
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" /></svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
                    )}
                    {postPrivacy === "PUBLIC" ? "Public" : postPrivacy === "FRIENDS" ? "Friends" : "Private"}
                    <svg className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  </button>
                  {isPrivacyDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-40 bg-white dark:bg-[#242526] rounded-lg shadow-xl border border-gray-200 dark:border-[#3E4042] py-2 z-50">
                      <button onClick={() => { setPostPrivacy("PUBLIC"); setIsPrivacyDropdownOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-left">
                        <svg className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" /></svg>
                        <span className="text-[14px] font-semibold text-black dark:text-[#E4E6EB]">Public</span>
                      </button>
                      <button onClick={() => { setPostPrivacy("FRIENDS"); setIsPrivacyDropdownOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-left">
                        <svg className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8]" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
                        <span className="text-[14px] font-semibold text-black dark:text-[#E4E6EB]">Friends</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Textarea */}
          <textarea 
            placeholder={`What's on your mind, ${currentUser?.username}?`} 
            className="w-full bg-transparent border-none outline-none text-[24px] text-black dark:text-[#E4E6EB] placeholder-gray-500 min-h-[150px] resize-none"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />

          {/* Extras */}
          <div className="flex items-center justify-end mb-4">
            <button className="text-gray-400 hover:text-gray-500 dark:text-[#B0B3B8] dark:hover:text-[#E4E6EB] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>
          </div>

          {/* Add to your post */}
          <div className="flex items-center justify-between border border-gray-300 dark:border-[#4E4F50] rounded-xl p-3 mb-4 shadow-sm">
            <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">Add to your post</span>
            <div className="flex items-center gap-1">
              <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-full transition-colors opacity-50 cursor-not-allowed" title="Coming soon">
                <svg className="w-6 h-6 text-[#45BD62]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
              </button>
              <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-full transition-colors opacity-50 cursor-not-allowed" title="Coming soon">
                <svg className="w-6 h-6 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
              </button>
              <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-full transition-colors opacity-50 cursor-not-allowed" title="Coming soon">
                <svg className="w-6 h-6 text-[#F97316]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
              </button>
              <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-full transition-colors opacity-50 cursor-not-allowed" title="Coming soon">
                <svg className="w-6 h-6 text-[#F5C33B]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
              </button>
            </div>
          </div>

          {/* Post Button */}
          <button 
            onClick={handlePost}
            disabled={!postContent.trim() || isPosting}
            className="w-full bg-[#1877F2] hover:bg-blue-600 disabled:bg-gray-200 disabled:dark:bg-[#4E4F50] text-white disabled:text-gray-400 disabled:dark:text-gray-500 font-semibold py-2 rounded-lg transition-colors flex justify-center items-center gap-2"
          >
            {isPosting ? (initialPost ? "Menyimpan..." : "Posting...") : (initialPost ? "Simpan" : "Post")}
          </button>
        </div>
      </div>
    </div>
  );
}
