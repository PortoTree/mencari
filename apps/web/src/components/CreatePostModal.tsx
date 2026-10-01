"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { createPost, updatePost } from "@/app/actions/posts";
import { uploadToCloudinary } from "@/utils/uploadImage";
import { MediaRenderer } from "./MediaRenderer";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  onSuccess?: () => void;
  initialPost?: any;
  startWithMediaModal?: boolean;
}

export default function CreatePostModal({ isOpen, onClose, currentUser, onSuccess, initialPost, startWithMediaModal }: CreatePostModalProps) {
  const t = useTranslations();
  const [postPrivacy, setPostPrivacy] = useState<"PUBLIC" | "FRIENDS" | "PRIVATE" | "COMMUNITY_ONLY">("PUBLIC");
  const [isPrivacyDropdownOpen, setIsPrivacyDropdownOpen] = useState(false);
  const privacyDropdownRef = useRef<HTMLDivElement>(null);
  
  const [postContent, setPostContent] = useState(initialPost?.content || "");
  const [isPosting, setIsPosting] = useState(false);
  const [postLabel, setPostLabel] = useState<"DEFAULT" | "MENCARI" | "LOKASI" | "PROFESI" | "SEKOLAH">("DEFAULT");
  const [mediaLayout, setMediaLayout] = useState<"GRID" | "CAROUSEL">("GRID");
  const [isLabelDropdownOpen, setIsLabelDropdownOpen] = useState(false);
  const labelDropdownRef = useRef<HTMLDivElement>(null);

  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [mediaPreviewList, setMediaPreviewList] = useState<{ type: 'file' | 'url'; url: string; file?: File }[]>([]);
  const [mediaTab, setMediaTab] = useState<"file" | "url">("file");
  const [mediaUrlInputs, setMediaUrlInputs] = useState<string[]>([""]);
  const [tempFilePreviews, setTempFilePreviews] = useState<{ url: string; file: File }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [linkPreviewData, setLinkPreviewData] = useState<any>(initialPost?.linkMetadata || null);
  const [isFetchingLink, setIsFetchingLink] = useState(false);

  const handleContentChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setPostContent(text);

    setLinkPreviewData((prev: any) => {
      if (prev && !text.includes(prev.url)) {
        return null;
      }
      return prev;
    });

    // Regex to find URL
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(urlRegex);

    if (matches && matches.length > 0) {
      const url = matches[0];
      
      // Check if it's a media URL
      const isMedia = !!url.match(/\.(mp4|webm|ogg|jpg|jpeg|png|webp|gif)$/i) || 
                      !!url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i) ||
                      !!url.match(/tiktok\.com\/@.*\/video\/(\d+)/i) ||
                      !!url.match(/instagram\.com\/(?:p|reel|tv)\/([^\/?#&]+)/i);

      if (isMedia) {
        if (!mediaPreviewList.some((m: any) => m.url === url) && mediaPreviewList.length < 8) {
          setMediaPreviewList(prev => [...prev, { type: 'url', url }]);
        }
      } else {
        if (!linkPreviewData && !isFetchingLink) {
          setIsFetchingLink(true);
          try {
            const res = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`);
            if (res.ok) {
              const data = await res.json();
              if (data.title || data.image) {
                setLinkPreviewData((current: any) => {
                  // Only set if the url is still in the text (in case they deleted it while fetching)
                  // We can't access latest text easily, but if they deleted it, 
                  // another onChange will fire and clear it. So just set it.
                  return data;
                });
              }
            }
          } catch (e) {
            console.error(e);
          } finally {
            setIsFetchingLink(false);
          }
        }
      }
    }
  };


  useEffect(() => {
    if (isOpen) {
      setPostContent(initialPost?.content || "");
      setPostPrivacy(initialPost?.visibility || "PUBLIC");
      setPostLabel(initialPost?.label || "DEFAULT");
      setMediaLayout(initialPost?.mediaLayout || "GRID");
      setMediaPreviewList(initialPost?.mediaUrls?.map((url: string) => ({ type: 'url', url })) || []);
      setIsMediaModalOpen(startWithMediaModal || false);
    }
  }, [isOpen, initialPost]);

  // Close dropdown on outside click

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (privacyDropdownRef.current && !privacyDropdownRef.current.contains(event.target as Node)) {
        setIsPrivacyDropdownOpen(false);
      }
      if (labelDropdownRef.current && !labelDropdownRef.current.contains(event.target as Node)) {
        setIsLabelDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    let newPreviews: { url: string; file: File }[] = [];
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 3 * 1024 * 1024) {
        alert(`Ukuran gambar ${file.name} melebihi 3MB!`);
        continue;
      }
      if (!validTypes.includes(file.type)) {
        alert(`Format gambar ${file.name} harus JPG, PNG, atau WEBP!`);
        continue;
      }
      newPreviews.push({ url: URL.createObjectURL(file), file });
    }

    const totalAfterUpload = mediaPreviewList.length + tempFilePreviews.length + newPreviews.length;
    if (totalAfterUpload > 8) {
      alert(`Maksimal 8 gambar yang diperbolehkan! Sisa kuota Anda: ${Math.max(0, 8 - (mediaPreviewList.length + tempFilePreviews.length))} gambar.`);
      const remainingSlots = 8 - (mediaPreviewList.length + tempFilePreviews.length);
      newPreviews = newPreviews.slice(0, Math.max(0, remainingSlots));
    }

    setTempFilePreviews([...tempFilePreviews, ...newPreviews]);
  };

  const confirmMedia = () => {
    if (mediaTab === "file" && tempFilePreviews.length > 0) {
      const newMedia = tempFilePreviews.map(p => ({ type: 'file' as const, url: p.url, file: p.file }));
      setMediaPreviewList([...mediaPreviewList, ...newMedia]);
    } else if (mediaTab === "url") {
      const validUrls = mediaUrlInputs.map(u => u.trim()).filter(Boolean);
      if (validUrls.length > 0) {
        if (mediaPreviewList.length + validUrls.length > 8) {
          alert(`Maksimal 8 gambar yang diperbolehkan! Sisa kuota Anda: ${Math.max(0, 8 - mediaPreviewList.length)} gambar.`);
          return;
        }
        const newUrls = validUrls.map(url => ({ type: 'url' as const, url }));
        setMediaPreviewList([...mediaPreviewList, ...newUrls]);
      }
    }
    setTempFilePreviews([]);
    setMediaUrlInputs([""]);
    setIsMediaModalOpen(false);
  };
  
  const removeMedia = (index: number) => {
    const newList = [...mediaPreviewList];
    newList.splice(index, 1);
    setMediaPreviewList(newList);
  };

  if (!isOpen) return null;

  const handlePost = async () => {
    if (!postContent.trim() && mediaPreviewList.length === 0) return;
    setIsPosting(true);

    try {
      const finalMediaUrls: string[] = [];
      for (const media of mediaPreviewList) {
        if (media.type === 'file' && media.url) {
          const cloudUrl = await uploadToCloudinary(media.url, "post-image");
          finalMediaUrls.push(cloudUrl);
        } else if (media.type === 'url') {
          finalMediaUrls.push(media.url);
        }
      }

      let res;
      if (initialPost) {
        res = await updatePost(initialPost.id, currentUser.id, postContent, postPrivacy, postLabel, mediaLayout); 
        // Update function doesn't support mediaUrls yet, but we will fix later
      } else {
        res = await createPost({
          authorId: currentUser.id,
          content: postContent,
          visibility: postPrivacy,
          label: postLabel,
          mediaUrls: finalMediaUrls,
          mediaLayout: mediaLayout,
          linkMetadata: linkPreviewData,
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
                <div className="relative" ref={labelDropdownRef}>
                  <button onClick={() => setIsLabelDropdownOpen(!isLabelDropdownOpen)} className="flex items-center gap-1 bg-gray-200 dark:bg-[#3A3B3C] px-2 py-0.5 rounded-md text-[12px] font-semibold text-gray-700 dark:text-[#E4E6EB]">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                    {postLabel === "DEFAULT" ? "Label" : postLabel === "MENCARI" ? "Mencari" : postLabel === "LOKASI" ? "Lokasi" : postLabel === "PROFESI" ? "Profesi" : "Sekolah"}
                    <svg className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  </button>
                  {isLabelDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-40 bg-white dark:bg-[#242526] rounded-lg shadow-xl border border-gray-200 dark:border-[#3E4042] py-2 z-50">
                      <button onClick={() => { setPostLabel("DEFAULT"); setIsLabelDropdownOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-left">
                        <span className="text-[14px] font-semibold text-black dark:text-[#E4E6EB]">Default</span>
                      </button>
                      <button onClick={() => { setPostLabel("MENCARI"); setPostPrivacy("PUBLIC"); setIsLabelDropdownOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-left">
                        <span className="text-[14px] font-semibold text-black dark:text-[#E4E6EB]">Mencari (Public)</span>
                      </button>
                      {currentUser?.profile?.locationName && (
                        <button onClick={() => { setPostLabel("LOKASI"); setIsLabelDropdownOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-left">
                          <span className="text-[14px] font-semibold text-black dark:text-[#E4E6EB]">Lokasi</span>
                        </button>
                      )}
                      {currentUser?.profile?.profession && (
                        <button onClick={() => { setPostLabel("PROFESI"); setIsLabelDropdownOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-left">
                          <span className="text-[14px] font-semibold text-black dark:text-[#E4E6EB]">Profesi</span>
                        </button>
                      )}
                      {currentUser?.profile?.school && (
                        <button onClick={() => { setPostLabel("SEKOLAH"); setIsLabelDropdownOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-left">
                          <span className="text-[14px] font-semibold text-black dark:text-[#E4E6EB]">Sekolah</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="relative" ref={privacyDropdownRef}>
                  <button 
                    onClick={() => postLabel !== "MENCARI" && setIsPrivacyDropdownOpen(!isPrivacyDropdownOpen)} 
                    className={`flex items-center gap-1 bg-gray-200 dark:bg-[#3A3B3C] px-2 py-0.5 rounded-md text-[12px] font-semibold text-gray-700 dark:text-[#E4E6EB] ${postLabel === "MENCARI" ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
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
          <div className="overflow-y-auto max-h-[300px] mt-2 mb-2">
            <textarea 
              placeholder={t("feed.whatsOnYourMind", { name: currentUser?.profile?.displayName || currentUser?.username })}
              className="w-full bg-transparent border-none outline-none text-[24px] text-black dark:text-[#E4E6EB] placeholder-gray-500 min-h-[120px] resize-none"
              value={postContent}
              onChange={handleContentChange}
            />
            {mediaPreviewList.length > 0 && (
              <div className={`grid gap-2 mb-4 ${mediaPreviewList.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {mediaPreviewList.map((media, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 aspect-video">
                    <div className="w-full h-full pointer-events-none">
                      <MediaRenderer url={media.url} alt="preview" className="w-full h-full object-cover" />
                    </div>
                    <button onClick={() => removeMedia(idx)} className="absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {mediaPreviewList.length > 1 && (
              <div className="mb-4">
                <label className="text-[13px] font-semibold text-gray-500 dark:text-[#B0B3B8] mb-2 block">{t("feed.mediaLayoutTitle")}</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setMediaLayout("GRID")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-[14px] transition-colors border ${mediaLayout === 'GRID' ? 'bg-[#E7F3FF] dark:bg-[#263951] text-[#1877F2] border-[#1877F2]/20' : 'bg-transparent text-gray-600 dark:text-[#B0B3B8] border-gray-300 dark:border-[#3E4042] hover:bg-gray-50 dark:hover:bg-[#3A3B3C]'}`}
                  >
                    <div className="w-4 h-4 bg-current" style={{ maskImage: "url('/grid.svg')", WebkitMaskImage: "url('/grid.svg')", maskSize: "contain", WebkitMaskSize: "contain", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "center", WebkitMaskPosition: "center" }} />
                    {t("feed.layoutGrid")}
                  </button>
                  <button 
                    onClick={() => setMediaLayout("CAROUSEL")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-[14px] transition-colors border ${mediaLayout === 'CAROUSEL' ? 'bg-[#E7F3FF] dark:bg-[#263951] text-[#1877F2] border-[#1877F2]/20' : 'bg-transparent text-gray-600 dark:text-[#B0B3B8] border-gray-300 dark:border-[#3E4042] hover:bg-gray-50 dark:hover:bg-[#3A3B3C]'}`}
                  >
                    <div className="w-4 h-4 bg-current" style={{ maskImage: "url('/carousel.svg')", WebkitMaskImage: "url('/carousel.svg')", maskSize: "contain", WebkitMaskSize: "contain", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "center", WebkitMaskPosition: "center" }} />
                    {t("feed.layoutCarousel")}
                  </button>
                </div>
              </div>
            )}

            {/* Link Preview Card */}
            {isFetchingLink && (
              <div className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-xl mb-4 bg-gray-50 dark:bg-[#242526]">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#1877F2] border-t-transparent"></div>
              </div>
            )}
            {!isFetchingLink && linkPreviewData && (
              <div className="relative mb-4 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-gray-50 dark:bg-[#242526] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors cursor-pointer">
                <button onClick={() => setLinkPreviewData(null)} className="absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center z-10 transition-opacity opacity-0 hover:opacity-100">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <a href={linkPreviewData.url} target="_blank" rel="noopener noreferrer" className="block">
                  {linkPreviewData.image && (
                    <div className="w-full h-48 bg-gray-200 dark:bg-[#3A3B3C] border-b border-gray-200 dark:border-gray-700">
                      <img src={linkPreviewData.image} alt={linkPreviewData.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8] uppercase tracking-wider mb-1 truncate">{linkPreviewData.domain}</p>
                    <h3 className="font-semibold text-[16px] text-black dark:text-[#E4E6EB] leading-tight mb-1 line-clamp-2">{linkPreviewData.title}</h3>
                    {linkPreviewData.description && (
                      <p className="text-[14px] text-gray-600 dark:text-[#B0B3B8] line-clamp-2">{linkPreviewData.description}</p>
                    )}
                  </div>
                </a>
              </div>
            )}
          </div>

          {/* Extras */}
          <div className="flex items-center justify-end mb-4">
            <button className="text-gray-400 hover:text-gray-500 dark:text-[#B0B3B8] dark:hover:text-[#E4E6EB] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>
          </div>

          {/* Add to your post */}
          <div className="flex items-center justify-between border border-gray-300 dark:border-[#4E4F50] rounded-xl p-3 mb-4 shadow-sm">
            <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">{t("feed.addToYourPost")}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setIsMediaModalOpen(true)} className="group relative p-1.5 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-full transition-colors">
                <svg className="w-6 h-6 text-[#45BD62]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {t("feed.addPhoto")}
                </span>
              </button>
              <button className="group relative p-1.5 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-full transition-colors opacity-50 cursor-not-allowed">
                <svg className="w-6 h-6 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {t("feed.comingSoon")}
                </span>
              </button>
              <button className="group relative p-1.5 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-full transition-colors opacity-50 cursor-not-allowed">
                <svg className="w-6 h-6 text-[#F97316]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {t("feed.comingSoon")}
                </span>
              </button>
              <button className="group relative p-1.5 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-full transition-colors opacity-50 cursor-not-allowed">
                <svg className="w-6 h-6 text-[#F5C33B]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {t("feed.comingSoon")}
                </span>
              </button>
            </div>
          </div>

          {/* Post Button */}
          <button 
            onClick={handlePost}
            disabled={(!postContent.trim() && mediaPreviewList.length === 0) || isPosting}
            className="w-full bg-[#1877F2] hover:bg-blue-600 disabled:bg-gray-200 disabled:dark:bg-[#4E4F50] text-white disabled:text-gray-400 disabled:dark:text-gray-500 font-semibold py-2 rounded-lg transition-colors flex justify-center items-center gap-2"
          >
            {isPosting ? (initialPost ? "Menyimpan..." : "Posting...") : (initialPost ? "Simpan" : "Post")}
          </button>
        </div>

        {/* Submodal for Media Upload */}
        {isMediaModalOpen && (
          <div className="absolute inset-0 bg-white dark:bg-[#242526] z-50 flex flex-col rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#3E4042]">
              <div className="flex items-center gap-3">
                <button onClick={() => setIsMediaModalOpen(false)} className="w-9 h-9 bg-gray-100 dark:bg-[#3A3B3C] rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#4E4F50] transition-colors text-gray-600 dark:text-[#B0B3B8]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
                <h2 className="text-[20px] font-bold text-black dark:text-[#E4E6EB]">{t("feed.addMedia")}</h2>
              </div>
            </div>
            
            <div className="p-4 flex-1 flex flex-col overflow-y-auto">
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4 shrink-0">
                <button onClick={() => setMediaTab('file')} className={`flex-1 pb-2 text-sm font-semibold transition-colors border-b-2 ${mediaTab === 'file' ? 'border-[#1877F2] text-[#1877F2]' : 'border-transparent text-gray-500'}`}>{t("feed.uploadImage")}</button>
                <button onClick={() => setMediaTab('url')} className={`flex-1 pb-2 text-sm font-semibold transition-colors border-b-2 ${mediaTab === 'url' ? 'border-[#1877F2] text-[#1877F2]' : 'border-transparent text-gray-500'}`}>{t("feed.linkUrl")}</button>
              </div>

              {mediaTab === 'file' ? (
                tempFilePreviews.length > 0 ? (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="flex-1 overflow-y-auto pr-2 min-h-0 mb-2">
                      <div className="grid grid-cols-2 gap-2">
                        {tempFilePreviews.map((p, idx) => (
                          <div key={idx} className="relative w-full h-[150px] bg-gray-100 dark:bg-black/50 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                            <img src={p.url} alt={`Preview ${idx+1}`} className="w-full h-full object-cover" />
                            <button onClick={() => setTempFilePreviews(tempFilePreviews.filter((_, i) => i !== idx))} className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg></button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-center shrink-0">
                      <button onClick={() => fileInputRef.current?.click()} className="text-sm text-[#1877F2] hover:underline font-semibold">{t("feed.addAnotherPhoto")}</button>
                    </div>
                    <input type="file" accept="image/jpeg, image/png, image/webp" multiple className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 min-h-[250px]">
                    <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    <p className="text-sm text-gray-500 mb-4 text-center">{t("feed.imageFormatInfo")}</p>
                    <input type="file" accept="image/jpeg, image/png, image/webp" multiple className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                    <button onClick={() => fileInputRef.current?.click()} className="bg-gray-100 dark:bg-[#3A3B3C] text-black dark:text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#4E4F50]">
                      {t("feed.chooseImage")}
                    </button>
                  </div>
                )
              ) : (
                <div className="flex-1 min-h-0 overflow-y-auto sidebar-scrollbar pr-2 pb-4">
                  <div className="space-y-4">
                    {mediaUrlInputs.map((urlInput, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder={t("feed.mediaUrlPlaceholder")} 
                            value={urlInput} 
                            onChange={(e) => {
                              const newInputs = [...mediaUrlInputs];
                              newInputs[index] = e.target.value;
                              setMediaUrlInputs(newInputs);
                            }} 
                            className="flex-1 min-w-0 bg-gray-100 dark:bg-[#3A3B3C] text-black dark:text-white rounded-lg px-4 py-3 outline-none" 
                          />
                          {mediaUrlInputs.length > 1 && (
                            <button 
                              onClick={() => {
                                const newInputs = [...mediaUrlInputs];
                                newInputs.splice(index, 1);
                                setMediaUrlInputs(newInputs);
                              }}
                              className="px-3 shrink-0 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          )}
                        </div>
                        {urlInput.match(/^https?:\/\/.*/i) && (
                          <div className="w-full h-[140px] rounded-xl overflow-hidden bg-gray-100 dark:bg-black/50 border border-gray-200 dark:border-gray-700 shrink-0">
                            <MediaRenderer url={urlInput} className="w-full h-full object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {mediaUrlInputs.length + mediaPreviewList.length < 8 && (
                    <button 
                      onClick={() => setMediaUrlInputs([...mediaUrlInputs, ""])}
                      className="mt-4 w-full py-2.5 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-[#3A3B3C] hover:text-[#1877F2] dark:hover:text-[#1877F2] transition-colors"
                    >
                      {t("feed.addUrl")}
                    </button>
                  )}

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 px-1 whitespace-pre-line leading-relaxed">
                    {t("feed.mediaUrlHelper")}
                  </p>
                </div>
              )}
              
              <button 
                onClick={confirmMedia}
                disabled={mediaTab === 'file' ? tempFilePreviews.length === 0 : !mediaUrlInputs.some(u => u.trim())}
                className="w-full mt-4 shrink-0 bg-[#1877F2] hover:bg-blue-600 disabled:bg-gray-200 disabled:dark:bg-[#4E4F50] text-white disabled:text-gray-400 disabled:dark:text-gray-500 font-semibold py-2 rounded-lg transition-colors"
              >
                {t("feed.confirm")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
