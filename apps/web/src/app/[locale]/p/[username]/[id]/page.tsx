
"use client";

import React, { useState, useEffect, use } from "react";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import EditProfileModal from "@/components/EditProfileModal";
import CropModal from "@/components/CropModal";
import ImagePreviewModal from "@/components/ImagePreviewModal";
import { ShinyButton } from "@/components/ui/shiny-button";
import { uploadToCloudinary } from "@/utils/uploadImage";
import { updateProfileMedia, getProfile } from "@/app/actions/profile";
import { getConnectionStatus, handlePrimaryConnectionAction, toggleBlock } from "@/app/actions/connections";
import { getOptimizedUrl } from "@/utils/cloudinary";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string; username: string; id: string }>;
}) {
  const t = useTranslations("profile");
  const tEdit = useTranslations("editProfile");

  const unwrappedParams = use(params);
  const username = unwrappedParams.username ? decodeURIComponent(unwrappedParams.username) : "pampam";
  const id = unwrappedParams.id || "123";

  const [activeTab, setActiveTab] = useState("posts");
  const [currentUser, setCurrentUser] = useState<any>({ username: "Guest", id: "1" });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [isProfileOptionsOpen, setIsProfileOptionsOpen] = useState(false);
  
  // Media states
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<any>({
    isFollowing: false,
    friendshipStatus: null,
    friendshipRequestedBy: null,
    isBlocked: false,
    hasBlockedYou: false
  });
  const avatarInputRef = React.useRef<HTMLInputElement>(null);
  const coverInputRef = React.useRef<HTMLInputElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [needsExpansion, setNeedsExpansion] = useState(false);

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState("");
  const [cropType, setCropType] = useState<"avatar" | "cover">("avatar");

  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewImageSrc, setPreviewImageSrc] = useState("");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCropImageSrc(URL.createObjectURL(file));
      setCropType("avatar");
      setCropModalOpen(true);
      if (avatarInputRef.current) avatarInputRef.current.value = ''; // reset input
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCropImageSrc(URL.createObjectURL(file));
      setCropType("cover");
      setCropModalOpen(true);
      if (coverInputRef.current) coverInputRef.current.value = ''; // reset input
    }
  };

  const handleCropComplete = async (croppedUrl: string) => {
    if (cropType === "avatar") {
      setAvatarPreview(croppedUrl);
    } else {
      setCoverPreview(croppedUrl);
    }

    try {
      const cloudinaryUrl = await uploadToCloudinary(croppedUrl);
      const token = localStorage.getItem("token") || "";
      if (!token) return;

      // Decode fresh from token to avoid stale closure on currentUser state
      let userId: string | null = null;
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        userId = payload.sub || payload.id || payload._id || payload.userId || null;
      } catch (e) {
        console.error("Failed to decode token");
      }

      if (userId) {
        const res = await updateProfileMedia(token, userId, cropType, cloudinaryUrl);
        if (!res.success) {
          console.error("updateProfileMedia failed:", res.error);
        } else {
          // Dispatch event so Navbar avatar updates instantly without re-fetch
          window.dispatchEvent(new CustomEvent("avatar-updated", {
            detail: { url: cloudinaryUrl, type: cropType }
          }));
          // Also update local preview with the final Cloudinary URL
          if (cropType === "avatar") setAvatarPreview(cloudinaryUrl);
          else setCoverPreview(cloudinaryUrl);
        }
      }
    } catch (error) {
      console.error("Failed to save image:", error);
    }
  };

    const [activeAlbumIdx, setActiveAlbumIdx] = useState<number | null>(null);
    const [albumGridCols, setAlbumGridCols] = useState<number>(3);
    const [activeStatTab, setActiveStatTab] = useState<'friends' | 'followers' | 'following' | null>(null);
    const [expandedGroupTab, setExpandedGroupTab] = useState<'managed' | 'joined' | null>(null);
    const [statPage, setStatPage] = useState(1);
    const [groupPage, setGroupPage] = useState(1);
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const albumCarouselRef = React.useRef<HTMLDivElement>(null);
    
    const scrollAlbumCarousel = (direction: 'left' | 'right') => {
      if (albumCarouselRef.current) {
        const scrollAmount = 300;
        albumCarouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      }
    };
    
    const scrollCarousel = (direction: 'left' | 'right') => {
      if (carouselRef.current) {
        const scrollAmount = 300;
        carouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      }
    };

  const isOwnProfile = currentUser && currentUser.id === id;



  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.sub || payload.id || payload._id || payload.userId || "1";
        if (payload.username || payload.name) {
          setCurrentUser({
            id: userId,
            username: payload.username || payload.name || "User",
            displayName: payload.displayName || payload.username || payload.name || "User",
            token: token,
          });
        }
      } catch (e) {
        console.error("Failed to parse token");
      }
    }
    
    // Fetch real profile data to populate initial images and details
    // We use `id` from the URL, NOT `userId` from the token!
    getProfile(id).then(res => {
      if (res.success && res.profile) {
        if (res.profile.avatarUrl) setAvatarPreview(res.profile.avatarUrl);
        if (res.profile.coverUrl) setCoverPreview(res.profile.coverUrl);
        if (res.profile.displayName) setDisplayName(res.profile.displayName);
        setProfileData(res.profile);
      }
      setIsLoadingProfile(false);
    });

    const checkConnection = async (currentId: string) => {
      const status = await getConnectionStatus(currentId, id);
      setConnectionStatus(status);
    };

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const currentId = payload.sub || payload.id || payload._id || payload.userId || "1";
        checkConnection(currentId);
      } catch (e) {}
    }

    setThemeLoaded(true);
  }, [id]);

  const handlePrimaryAction = async () => {
    if (!currentUser || isProcessing) return;
    setIsProcessing(true);
    const token = localStorage.getItem("token") || "";

    const res = await handlePrimaryConnectionAction(token, currentUser.id, id);
    if (res.success) {
      // Manual component update to bypass ANY Next.js caching issues
      const newStatus = { ...connectionStatus };
      const newProfile = profileData ? JSON.parse(JSON.stringify(profileData)) : null;

      let newFollowers = newProfile?.user?._count?.followers || 0;

      if (connectionStatus.friendshipStatus === "ACCEPTED") {
        // 1. Remove Friend
        newStatus.friendshipStatus = null;
        newStatus.isFollowing = false;
        newFollowers = Math.max(0, newFollowers - 1);
        if (newProfile?.user?._count) {
          if ((newProfile.user._count.friendshipsAsUser || 0) > 0) {
            newProfile.user._count.friendshipsAsUser -= 1;
          } else if ((newProfile.user._count.friendshipsAsFriend || 0) > 0) {
            newProfile.user._count.friendshipsAsFriend -= 1;
          }
        }
      } else if (connectionStatus.friendshipStatus === "PENDING") {
        if (connectionStatus.friendshipRequestedBy !== currentUser.id) {
          // 2. Accept Request
          newStatus.friendshipStatus = "ACCEPTED";
          if (!connectionStatus.isFollowing) {
            newStatus.isFollowing = true;
            newFollowers += 1;
          }
          if (newProfile?.user?._count) {
            newProfile.user._count.friendshipsAsFriend = (newProfile.user._count.friendshipsAsFriend || 0) + 1;
          }
        } else {
          // 3. Cancel Request
          newStatus.friendshipStatus = null;
          newStatus.isFollowing = false;
          newFollowers = Math.max(0, newFollowers - 1);
        }
      } else {
        if (connectionStatus.isFollowing) {
          // 4. Unfollow
          newStatus.isFollowing = false;
          newFollowers = Math.max(0, newFollowers - 1);
        } else {
          // 5. Follow & Send Request
          newStatus.isFollowing = true;
          newStatus.friendshipStatus = "PENDING";
          newStatus.friendshipRequestedBy = currentUser.id;
          newFollowers += 1;
        }
      }

      setConnectionStatus(newStatus);
      if (newProfile?.user) {
        newProfile.user._count.followers = newFollowers;
        setProfileData(newProfile);
      }
    }
    setIsProcessing(false);
  };

  const handleToggleBlock = async () => {
    if (!currentUser) return;
    const token = localStorage.getItem("token") || "";
    const res = await toggleBlock(token, currentUser.id, id);
    if (res.success) {
      const status = await getConnectionStatus(currentUser.id, id);
      setConnectionStatus(status);
    }
    setIsProfileOptionsOpen(false);
  };

  useEffect(() => {
    if (isDetailModalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => { 
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isDetailModalOpen]);

  useEffect(() => {
    if (contentRef.current) {
      setNeedsExpansion(contentRef.current.scrollHeight > 180);
    }
  }, [profileData]);

  // Listen for friend-accepted event dispatched from Navbar notification panel
  useEffect(() => {
    const handleFriendAccepted = async (e: Event) => {
      const event = e as CustomEvent<{ senderId: string; currentUserId: string }>;
      const { senderId, currentUserId } = event.detail;

      // Update if we're on the sender's profile OR on our own profile
      const isOnSenderProfile = senderId === id;
      const isOnOwnProfile = currentUserId === id;
      if (!isOnSenderProfile && !isOnOwnProfile) return;

      // Re-fetch fresh data from server for accurate counts
      const [freshProfile, freshStatus] = await Promise.all([
        getProfile(id),
        getConnectionStatus(currentUserId, id),
      ]);

      if (freshProfile.success && freshProfile.profile) {
        setProfileData(freshProfile.profile);
        if (freshProfile.profile.avatarUrl) setAvatarPreview(freshProfile.profile.avatarUrl);
        if (freshProfile.profile.coverUrl) setCoverPreview(freshProfile.profile.coverUrl);
        if (freshProfile.profile.displayName) setDisplayName(freshProfile.profile.displayName);
      }
      if (freshStatus) {
        setConnectionStatus(freshStatus);
      }
    };

    window.addEventListener("friend-accepted", handleFriendAccepted);
    return () => window.removeEventListener("friend-accepted", handleFriendAccepted);
  }, [id]);

  const hasExpandableInfo = profileData?.websiteUrl || profileData?.education || profileData?.profession || profileData?.gender || profileData?.birthDate;
  const hasAnyInfo = profileData?.bio || profileData?.locationName || hasExpandableInfo;

  const isBlockedByMe = connectionStatus?.isBlocked;
  const isBlockedByThem = connectionStatus?.hasBlockedYou;
  const isProfileInaccessible = isBlockedByMe || isBlockedByThem;

  const dummyStatsUsers = [
    { name: 'John Doe', username: 'johndoe', isFriend: true, avatar: '/default-avatar.svg' },
    { name: 'Jane Smith', username: 'janesmith', isFriend: false, avatar: '/default-avatar.svg' },
    { name: 'Alice', username: 'alice', isFriend: true, avatar: '/default-avatar.svg' },
    { name: 'Bob', username: 'bob', isFriend: false, avatar: '/default-avatar.svg' },
    { name: 'Charlie', username: 'charlie', isFriend: true, avatar: '/default-avatar.svg' },
    { name: 'Dave', username: 'dave', isFriend: false, avatar: '/default-avatar.svg' },
    { name: 'Eve', username: 'eve', isFriend: true, avatar: '/default-avatar.svg' },
    { name: 'Frank', username: 'frank', isFriend: false, avatar: '/default-avatar.svg' },
    { name: 'Grace', username: 'grace', isFriend: true, avatar: '/default-avatar.svg' },
    { name: 'Heidi', username: 'heidi', isFriend: false, avatar: '/default-avatar.svg' },
    { name: 'Ivan', username: 'ivan', isFriend: true, avatar: '/default-avatar.svg' },
    { name: 'Judy', username: 'judy', isFriend: false, avatar: '/default-avatar.svg' }
  ];

  const dummyManagedGroups = [
    { name: 'Developer Indo', members: '12.5k', role: 'Owner', color: 'from-blue-500 to-cyan-400', initial: 'DI' },
    { name: 'UI/UX Enthusiast', members: '8.2k', role: 'Admin', color: 'from-purple-500 to-pink-500', initial: 'UX' },
    { name: 'Front-End Masters', members: '24k', role: 'Admin', color: 'from-orange-400 to-red-500', initial: 'FE' },
    { name: 'Backend Geeks', members: '15k', role: 'Owner', color: 'from-gray-600 to-gray-800', initial: 'BG' },
    { name: 'Data Science Id', members: '10k', role: 'Admin', color: 'from-green-400 to-emerald-600', initial: 'DS' },
    { name: 'Cyber Security', members: '5k', role: 'Owner', color: 'from-purple-600 to-purple-800', initial: 'CS' },
    { name: 'DevOps Indonesia', members: '18k', role: 'Admin', color: 'from-blue-600 to-indigo-600', initial: 'DO' }
  ];

  const dummyJoinedGroups = [
    { name: 'Next.js Masters', members: '45k', color: 'from-gray-800 to-black dark:from-gray-200 dark:to-gray-400', initial: 'NM' },
    { name: 'Tailwind CSS', members: '92k', color: 'from-teal-400 to-emerald-500', initial: 'TW' },
    { name: 'Framer Motion', members: '18k', color: 'from-fuchsia-500 to-pink-500', initial: 'FM' },
    { name: 'React Native', members: '32k', color: 'from-blue-500 to-blue-600', initial: 'RN' },
    { name: 'Vue.js Indo', members: '21k', color: 'from-emerald-400 to-green-500', initial: 'VJ' },
    { name: 'GraphQL Enthusiast', members: '14k', color: 'from-pink-500 to-rose-500', initial: 'GQ' },
    { name: 'Docker Users', members: '28k', color: 'from-blue-400 to-blue-600', initial: 'DU' }
  ];

  return (
    <main className="min-h-screen bg-[#F3F2EF] dark:bg-[#18191A] text-black dark:text-[#E4E6EB] pb-20 pt-[56px] font-sans">
      <Navbar activeTab={null} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} themeLoaded={themeLoaded} currentUser={currentUser} />

      {/* TOP LOADING BAR (YOUTUBE STYLE) */}
      {isProcessing && (
        <div className="fixed top-[56px] left-0 w-full h-[3px] bg-transparent z-50 overflow-hidden">
          <div className="h-full bg-blue-500 animate-[loadingBar_1s_ease-in-out_infinite]" style={{
            width: '30%',
            position: 'absolute',
            left: '-30%'
          }}></div>
        </div>
      )}
      
      <style>{`
        @keyframes loadingBar {
          0% { left: -30%; width: 30%; }
          50% { left: 50%; width: 50%; }
          100% { left: 100%; width: 30%; }
        }
      `}</style>

      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        
        {/* Cover Photo */}
        <div className="w-full aspect-[3/1] rounded-b-[40px] relative overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-sm">
          {isLoadingProfile ? (
            <div className="w-full h-full bg-gray-300 dark:bg-[#3E4042] animate-pulse" />
          ) : (
            <>
              <input type="file" ref={coverInputRef} onChange={handleCoverChange} className="hidden" accept="image/*" />
              <img 
                src={isProfileInaccessible ? "/sampul-placeholder.png" : (getOptimizedUrl(coverPreview, "cover") || "/sampul-placeholder.png")} 
                alt="Cover" 
                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity" 
                onClick={() => {
                  setPreviewImageSrc(coverPreview || "/sampul-placeholder.png");
                  setPreviewModalOpen(true);
                }}
              />
            </>
          )}
          {isOwnProfile && (
            <button onClick={() => coverInputRef.current?.click()} className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2.5 rounded-full backdrop-blur-sm transition-colors cursor-pointer shadow-md z-30">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col md:flex-row gap-6 -mt-[80px] px-2 md:px-6 relative z-10">
          
          {/* Left Sidebar */}
            <div className="w-full md:w-[320px] shrink-0 flex flex-col gap-6 relative z-20">
              {/* Actual Profile Card */}
              <div className="w-full bg-gradient-to-b from-white to-[#D9D9D9] dark:from-[#3A3B3C] dark:to-[#18191A] rounded-[40px] px-8 pt-8 pb-5 shadow-xl flex flex-col justify-between border border-white/20 dark:border-white/5 transition-all duration-300 min-h-[460px]">
              <div className="flex flex-col items-center w-full h-full">
            {/* Avatar */}
            <div className="relative mb-4">
              <div className="w-[120px] h-[120px] rounded-full border-[4px] border-white dark:border-[#3A3B3C] bg-white dark:bg-[#242526] flex items-center justify-center shadow-md overflow-hidden">
                {isLoadingProfile ? (
                  <div className="w-full h-full bg-gray-300 dark:bg-[#3E4042] animate-pulse" />
                ) : (
                  <>
                    <input type="file" ref={avatarInputRef} onChange={handleAvatarChange} className="hidden" accept="image/*" />
                    <img 
                      src={isProfileInaccessible ? "/default-avatar.svg" : (getOptimizedUrl(avatarPreview, "avatar") || "/default-avatar.svg")} 
                      alt="Avatar" 
                      className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity" 
                      onClick={() => {
                        setPreviewImageSrc(avatarPreview || "/default-avatar.svg");
                        setPreviewModalOpen(true);
                      }}
                    />
                  </>
                )}
              </div>
              {isOwnProfile && (
                <button onClick={() => avatarInputRef.current?.click()} className="absolute bottom-0 right-0 bg-gray-200 hover:bg-gray-300 dark:bg-[#4E4F50] dark:hover:bg-[#5E5F60] p-2 rounded-full border-[3px] border-white dark:border-[#3A3B3C] shadow-sm transition-colors text-black dark:text-white cursor-pointer z-10">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              )}
            </div>
            
            {isLoadingProfile ? (
              <div className="flex flex-col items-center gap-2 w-full mt-2">
                <div className="h-7 w-48 bg-gray-300 dark:bg-[#3E4042] rounded animate-pulse"></div>
                <div className="h-5 w-32 bg-gray-300 dark:bg-[#3E4042] rounded animate-pulse mb-3"></div>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-black dark:text-white">
                  {isProfileInaccessible ? (isBlockedByThem ? t("someone", { fallback: "Seseorang" }) : displayName || username) : (displayName || (username === "pampam" ? "nama akun" : username))}
                </h1>
                <p className="text-[15px] text-gray-700 dark:text-gray-300 font-medium mb-3">@{username}</p>
              </>
            )}
            {/* Social Media Icons */}
            {!isProfileInaccessible && profileData?.user?.socialLinks && profileData.user.socialLinks.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8 px-4">
                {profileData.user.socialLinks.map((social: any) => {
                  const getSocialUrl = (platform: string, username: string) => {
                    if (username.startsWith('http')) return username;
                    switch (platform) {
                      case "Instagram": return `https://instagram.com/${username}`;
                      case "Whatsapp": return `https://wa.me/${username}`;
                      case "Facebook": return `https://facebook.com/${username}`;
                      case "Tiktok": return `https://tiktok.com/@${username}`;
                      case "Github": return `https://github.com/${username}`;
                      case "Portotree": return `https://portotree.com/p/${username}`;
                      case "Linkedin": return `https://linkedin.com/in/${username}`;
                      case "Youtube": return `https://youtube.com/@${username}`;
                      case "Telegram": return `https://t.me/${username}`;
                      case "Twitter": return `https://twitter.com/${username}`;
                      default: return `https://${username}`;
                    }
                  };
                  return (
                  <a 
                    key={social.id} 
                    href={getSocialUrl(social.platform, social.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-gray-100 dark:bg-[#3A3B3C] flex items-center justify-center hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors shadow-sm border border-gray-200 dark:border-[#4E4F50] shrink-0 group relative z-10"
                  >
                    <img src={`/sosmed/${social.platform.toLowerCase()}.webp`} alt={social.platform} className="w-5 h-5 object-contain drop-shadow-sm group-hover:scale-110 transition-transform" />
                    
                    {/* Tooltip */}
                    <div className="absolute -top-11 left-1/2 -translate-x-1/2 bg-[#1C1E21] dark:bg-white text-[#E4E6EB] dark:text-black px-2.5 py-1.5 rounded-lg text-[12px] whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex items-center gap-1.5 shadow-xl z-50 pointer-events-none">
                      <img src={`/sosmed/${social.platform.toLowerCase()}.webp`} alt={social.platform} className="w-3.5 h-3.5 object-contain shrink-0" />
                      <span>{social.platform}</span>
                      <span className="font-bold">{social.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
                      {/* Tooltip arrow */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1C1E21] dark:bg-white rotate-45"></div>
                    </div>
                  </a>
                )})}
              </div>
            )}

            
              {/* Profile Details List */}
              <div className="w-full flex flex-col flex-1">
                {isProfileInaccessible ? null : isLoadingProfile ? (
                  <div className="flex flex-col gap-4 mt-4 w-full">
                    <div className="h-4 w-full bg-gray-300 dark:bg-[#3E4042] rounded animate-pulse"></div>
                    <div className="h-4 w-4/5 bg-gray-300 dark:bg-[#3E4042] rounded animate-pulse"></div>
                    <div className="h-4 w-2/3 bg-gray-300 dark:bg-[#3E4042] rounded animate-pulse"></div>
                  </div>
                ) : (
                  <div 
                    ref={contentRef}
                    className={`flex flex-col gap-4 ${!hasAnyInfo ? 'flex-1' : ''} mt-4 transition-all duration-300 ease-in-out relative ${isProfileExpanded ? "max-h-[1000px]" : "max-h-[180px] overflow-hidden"}`}
                  >
                    {!hasAnyInfo && (
                      <div className="flex-1 flex items-center justify-center text-[15px] font-bold text-gray-400 dark:text-gray-500 italic pb-12">
                        {t("noInfoPlaceholder")}
                      </div>
                    )}
                    {/* 1. Bio */}
                    {profileData?.bio && (
                      <div className="flex items-start gap-3 text-sm text-gray-800 dark:text-gray-200 font-semibold">
                        <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="leading-relaxed">{profileData.bio}</span>
                      </div>
                    )}

                    {/* 2. Lokasi */}
                    {profileData?.locationName && (
                      <div className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-200 font-semibold">
                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {profileData.locationName}
                      </div>
                    )}

                    {/* 3. Link web (External Links) */}
                  {(() => {
                    let links: {label: string, url: string}[] = [];
                    if (profileData?.externalLinks) {
                      try {
                         links = typeof profileData.externalLinks === 'string' ? JSON.parse(profileData.externalLinks) : profileData.externalLinks;
                      } catch(e) {}
                    } else if (profileData?.websiteUrl) {
                      links = [{label: "", url: profileData.websiteUrl}];
                    }
                    
                    if (!Array.isArray(links) || links.length === 0) return null;
                    
                    return (
                      <div className="flex items-start gap-3 text-sm text-gray-800 dark:text-gray-200 font-semibold">
                        <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                        <div className="flex flex-col gap-1.5 w-full">
                          {links.map((link, idx) => {
                            if (!link.url) return null;
                            const fullUrl = link.url.startsWith("http") ? link.url : `https://${link.url}`;
                            const displayLabel = link.label?.trim() ? link.label : link.url;
                            return (
                              <div key={idx} className="relative group/link w-fit max-w-full">
                                <a href={fullUrl} target="_blank" rel="noopener noreferrer" className="underline cursor-pointer hover:text-blue-500 transition-colors inline-block max-w-[220px] truncate relative z-10">
                                  {displayLabel}
                                </a>
                                {link.label?.trim() && (
                                  <div className="absolute bottom-full left-0 mb-1 bg-[#1C1E21] dark:bg-white text-[#E4E6EB] dark:text-black px-2.5 py-1.5 rounded-lg text-[11px] whitespace-nowrap opacity-0 invisible group-hover/link:opacity-100 group-hover/link:visible transition-all shadow-xl z-[999] pointer-events-none">
                                    {link.url}
                                    <div className="absolute -bottom-1 left-4 w-2 h-2 bg-[#1C1E21] dark:bg-white rotate-45"></div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  {/* 4. Profesi */}
                  {profileData?.profession && (
                    <div className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-200 font-semibold">
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      <span>{profileData.profession}</span>
                    </div>
                  )}

                  {/* 4.5 Pendidikan */}
                  {profileData?.education && (
                    <div className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-200 font-semibold">
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                      <span>{profileData.education}</span>
                    </div>
                  )}

                  {/* 5. Gender */}
                  {profileData?.gender && (
                    <div className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-200 font-semibold">
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      {profileData.gender}
                    </div>
                  )}

                  {/* 6. Tanggal lahir */}
                  {profileData?.birthDate && (
                    <div className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-200 font-semibold">
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {new Date(profileData.birthDate).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  )}
                </div>
                )}
              </div>
              
              {/* Expand / Collapse Button */}
              {needsExpansion && !isLoadingProfile && (
                <button 
                  onClick={() => setIsProfileExpanded(!isProfileExpanded)}
                  className="w-full mt-auto pt-4 pb-2 flex items-center justify-center gap-2 text-[15px] font-bold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors group cursor-pointer shrink-0"
                >
                  {isProfileExpanded ? t("showLess") : t("showMore")}
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${isProfileExpanded ? "rotate-180" : "group-hover:translate-y-1"}`} 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
              </div>
            </div>

              {/* Reputasi Card */}
              {!isProfileInaccessible && profileData?.type === "BUSINESS" && (
                <div className="w-full shrink-0 bg-gradient-to-br from-blue-900 to-slate-900 border border-blue-800/30 rounded-[30px] p-5 flex flex-col justify-between shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {/* Reputasi Logo */}
                      <div className="w-[70px] h-[70px] shrink-0">
                         <img src="/reputasi.png" alt={t("reputation")} className="w-full h-full object-contain drop-shadow-md" />
                      </div>
                    </div>
                    <div className="text-white flex flex-col justify-center">
                    <p className="font-bold text-[18px] leading-none mb-1.5 tracking-wide">{isOwnProfile ? t("yourPoints") : `@${username}`}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <p className="font-extrabold text-[22px] leading-none tracking-wide">1.238</p>
                      <img
                          src="/review.png"
                          alt="Star"
                          className="w-6 h-6 object-contain mb-0.5 shrink-0"
                        />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-1.5 rounded-full text-[13px] transition-colors">
                      {isOwnProfile ? t("howItWorks") : t("check")}
                    </button>
                    {isOwnProfile ? (
                      <div className="flex-1 flex items-center justify-center border border-red-500/70 rounded-full py-1.5">
                        <span className="text-red-500 font-medium text-[13px]">{t("notActive")}</span>
                      </div>
                    ) : (
                      <button className="flex-1 bg-gradient-to-b from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 border-t border-red-500 text-white font-semibold py-1.5 rounded-full text-[13px] shadow-sm transition-colors">
                        {t("report")}
                      </button>
                    )}
                  </div>
                  <ShinyButton
                    variant={isOwnProfile ? "green" : "reputation"}
                    hoverText={
                      isOwnProfile ? (
                        t("activateNow")
                      ) : (
                        <span className="inline-flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                          <span>{t("addReputation")}</span>
                        </span>
                      )
                    }
                  >
                    {isOwnProfile ? t("activate") : t("reputation")}
                  </ShinyButton>
                </div>
                </div>
              )}

              {/* View Details Button */}
              {!isLoadingProfile && !isProfileInaccessible && (
                <button 
                  onClick={() => setIsDetailModalOpen(true)}
                  className="w-full mt-4 bg-white dark:bg-[#242526] hover:bg-gray-50 dark:hover:bg-[#3A3B3C]/50 border border-gray-200 dark:border-[#3A3B3C] rounded-[24px] p-4 shadow-sm flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <span className="font-bold text-gray-800 dark:text-gray-200 text-[14px]">{t("viewDetails")}</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              )}


              </div>

            {/* Right Content Area */}
          <div className="flex-1 flex flex-col gap-4 md:mt-24 min-w-0">
            
            {/* Top Row: Friends & Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-4">
              <div className="flex items-center gap-6 sm:gap-10">
                  <div 
                    onClick={() => { setActiveStatTab(activeStatTab === 'friends' ? null : 'friends'); setStatPage(1); }}
                    className="flex flex-col items-center cursor-pointer group"
                  >
                    <span className={`text-[14px] font-medium transition-colors ${activeStatTab === 'friends' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white'}`}>{t("friends")}</span>
                    {isLoadingProfile ? (
                      <div className="w-6 h-6 bg-gray-300 dark:bg-[#3E4042] rounded animate-pulse mt-0.5"></div>
                    ) : (
                      <span className="text-[18px] font-bold mt-0.5 text-black dark:text-white">
                        {isProfileInaccessible ? "-" : (profileData?.user?._count?.friendshipsAsUser || 0) + (profileData?.user?._count?.friendshipsAsFriend || 0)}
                      </span>
                    )}
                  </div>
                  <div 
                    onClick={() => { setActiveStatTab(activeStatTab === 'followers' ? null : 'followers'); setStatPage(1); }}
                    className="flex flex-col items-center cursor-pointer group"
                  >
                    <span className={`text-[14px] font-medium transition-colors ${activeStatTab === 'followers' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white'}`}>{t("followers")}</span>
                    {isLoadingProfile ? (
                      <div className="w-6 h-6 bg-gray-300 dark:bg-[#3E4042] rounded animate-pulse mt-0.5"></div>
                    ) : (
                      <span className="text-[18px] font-bold mt-0.5 text-black dark:text-white">
                        {isProfileInaccessible ? "-" : profileData?.user?._count?.followers || 0}
                      </span>
                    )}
                  </div>
                  <div 
                    onClick={() => { setActiveStatTab(activeStatTab === 'following' ? null : 'following'); setStatPage(1); }}
                    className="flex flex-col items-center cursor-pointer group"
                  >
                    <span className={`text-[14px] font-medium transition-colors ${activeStatTab === 'following' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white'}`}>{t("following")}</span>
                    {isLoadingProfile ? (
                      <div className="w-6 h-6 bg-gray-300 dark:bg-[#3E4042] rounded animate-pulse mt-0.5"></div>
                    ) : (
                      <span className="text-[18px] font-bold mt-0.5 text-black dark:text-white">
                        {isProfileInaccessible ? "-" : profileData?.user?._count?.following || 0}
                      </span>
                    )}
                  </div>
                </div>
              <div className="flex items-center gap-3 mt-4 sm:mt-0">
                {isOwnProfile ? (
                  <button onClick={() => setIsEditModalOpen(true)} className="bg-gray-200 hover:bg-gray-300 dark:bg-[#4E4F50] dark:hover:bg-[#5E5F60] text-black dark:text-white font-bold py-2 px-5 rounded-full text-sm transition-colors shadow-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    {t("editProfile")}
                  </button>
                ) : (
                  <>
                    {!isProfileInaccessible && (
                      <>
                        <button 
                          onClick={handlePrimaryAction}
                          disabled={isProcessing}
                          className={`${
                            connectionStatus.friendshipStatus === "ACCEPTED" ? "bg-gray-200 hover:bg-red-500 text-black hover:text-white" :
                            connectionStatus.friendshipStatus === "PENDING" && connectionStatus.friendshipRequestedBy !== currentUser?.id ? "bg-yellow-500 hover:bg-yellow-600 text-white" :
                            (connectionStatus.friendshipStatus === "PENDING" || connectionStatus.isFollowing) ? "bg-transparent border border-gray-300 dark:border-[#4E4F50] text-black dark:text-[#E4E6EB] hover:bg-red-50 hover:border-red-500 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:border-red-500 dark:hover:text-red-400" :
                            "bg-[#10B981] hover:bg-emerald-600 text-white"
                          } font-bold py-2 px-4 rounded-full text-sm shadow-sm transition-colors ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          {connectionStatus.friendshipStatus === "ACCEPTED" ? t("friendBtn") :
                           connectionStatus.friendshipStatus === "PENDING" && connectionStatus.friendshipRequestedBy !== currentUser?.id ? t("acceptRequestBtn") :
                           (connectionStatus.friendshipStatus === "PENDING" || connectionStatus.isFollowing) ? t("following") :
                           t("followBtn")}
                        </button>
                        
                        <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full text-sm shadow-sm transition-colors">
                          {t("sendMessage", { fallback: "Pesan" })}
                        </button>
                      </>
                    )}
                    
                    {isBlockedByMe && (
                      <button 
                        onClick={handleToggleBlock}
                        disabled={isProcessing}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full text-sm shadow-sm transition-colors flex items-center gap-2"
                      >
                        {isProcessing ? "Loading..." : t("unblock", { fallback: "Buka Blokir" })}
                      </button>
                    )}

                    <div className="relative">
                      <button 
                        onClick={() => setIsProfileOptionsOpen(!isProfileOptionsOpen)}
                        className="w-9 h-9 flex shrink-0 items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-[#3A3B3C] dark:hover:bg-[#4E4F50] text-gray-700 dark:text-[#E4E6EB] rounded-full transition-colors shadow-sm cursor-pointer">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 12a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </button>
                      {isProfileOptionsOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setIsProfileOptionsOpen(false)} />
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#242526] rounded-xl shadow-lg border border-gray-100 dark:border-white/10 overflow-hidden z-50">
                            <button className="w-full px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] flex items-center gap-3 transition-colors">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              {t("activity")}
                            </button>
                            <button className="w-full px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] flex items-center gap-3 transition-colors border-t border-gray-100 dark:border-white/5">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                              {t("reportAccount")}
                            </button>
                            <button 
                              onClick={handleToggleBlock}
                              className="w-full px-4 py-3 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/10 flex items-center gap-3 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                              {connectionStatus.isBlocked ? "Buka Blokir (Unblock)" : (t("blockAccount") || "Blokir Akun")}
                            </button>
                          </div>
                        </>

                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

              
              {/* Main Profile Content Area */}
              {!isProfileInaccessible ? (
                <>
                  <div className="w-full max-w-[590px] mx-auto mt-4 mb-2 min-h-[480px] flex flex-col">
                    {activeStatTab ? (
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center px-1 mb-3">
                          <h3 className="text-[15px] font-bold text-black dark:text-white">
                            {activeStatTab === 'friends' ? (t("friends") || "Teman") : activeStatTab === 'followers' ? (t("followers") || "Pengikut") : (t("following") || "Diikuti")}
                          </h3>
                        </div>
                        <div className="flex items-center justify-between mb-4 px-1 sticky top-0 bg-[#F3F2EF] dark:bg-[#18191A] z-10 py-1">
                          <div className="relative flex-1 max-w-[240px]">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <input type="text" placeholder={t("search") || "Cari..."} className="w-full pl-9 pr-4 py-1.5 bg-white dark:bg-[#242526] border border-gray-200 dark:border-gray-700 rounded-full text-[13px] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow" />
                          </div>
                          <button onClick={() => { setActiveStatTab(null); setStatPage(1); }} className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-gray-500 transition-colors ml-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {dummyStatsUsers.slice((statPage - 1) * 8, statPage * 8).map((user, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white/40 dark:bg-[#242526]/40 border border-gray-100 dark:border-white/5 hover:bg-white dark:hover:bg-[#2A2B2C] hover:shadow-sm transition-all cursor-pointer group">
                              <div className="flex items-center gap-3">
                                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700" />
                                <div className="flex flex-col">
                                  <span className="text-[14px] font-bold text-gray-900 dark:text-white leading-tight">{user.name}</span>
                                  <span className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">@{user.username}</span>
                                </div>
                              </div>
                              <button className="flex items-center justify-center px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 font-semibold text-[13px] transition-colors">
                                {isOwnProfile || user.isFriend ? (t("see") || "Lihat") : (t("followBtn") || "+ Follow")}
                              </button>
                            </div>
                          ))}
                        </div>
                        {dummyStatsUsers.length > 8 && (
                          <div className="flex justify-center items-center mt-auto pt-6 px-2 gap-4">
                            <button 
                              disabled={statPage === 1}
                              onClick={() => setStatPage(p => p - 1)}
                              className="p-2 rounded-full bg-gray-200 dark:bg-[#3A3B3C] text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-[#4E4F50] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Halaman {statPage}</span>
                            <button 
                              disabled={statPage * 8 >= dummyStatsUsers.length}
                              onClick={() => setStatPage(p => p + 1)}
                              className="p-2 rounded-full bg-gray-200 dark:bg-[#3A3B3C] text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-[#4E4F50] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-6 flex-1">
                        {/* 1. Grup yang kamu buat */}
                        {(!expandedGroupTab || expandedGroupTab === 'managed') && (
                          <div className="flex flex-col flex-1">
                            <div className="flex items-center justify-between mb-3 px-1">
                              <h3 className="text-[15px] font-bold text-black dark:text-white flex items-center gap-2">
                                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                {t("managedGroups")}
                              </h3>
                              {expandedGroupTab === 'managed' ? (
                                <button onClick={() => { setExpandedGroupTab(null); setGroupPage(1); }} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-gray-500 transition-colors">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                              ) : (
                                dummyManagedGroups.length > 2 && (
                                  <button onClick={() => { setExpandedGroupTab('managed'); setGroupPage(1); }} className="text-[13px] font-bold text-[#10B981] hover:text-emerald-700 transition-colors">{t("seeAll") || "Lihat Semua"}</button>
                                )
                              )}
                            </div>
                            <div className="flex flex-col gap-2">
                              {dummyManagedGroups.slice(expandedGroupTab === 'managed' ? (groupPage - 1) * 5 : 0, expandedGroupTab === 'managed' ? groupPage * 5 : 2).map((group, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white/40 dark:bg-[#242526]/40 border border-gray-100 dark:border-white/5 hover:bg-white dark:hover:bg-[#2A2B2C] hover:shadow-sm transition-all cursor-pointer group">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform`}>
                                      {group.initial}
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <p className="text-[14px] font-bold text-gray-900 dark:text-white leading-tight">{group.name}</p>
                                        {group.role === 'Owner' ? (
                                          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-sm">
                                            <img src="/owner.svg" alt="Owner" className="w-3 h-3 invert dark:invert-0" style={{ filter: "brightness(0) invert(1)" }} />
                                            <span className="text-[10px] font-bold uppercase">{group.role}</span>
                                          </div>
                                        ) : (
                                          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-sm">
                                            <img src="/admin.svg" alt="Admin" className="w-3 h-3 invert dark:invert-0" style={{ filter: "brightness(0) invert(1)" }} />
                                            <span className="text-[10px] font-bold uppercase">{group.role}</span>
                                          </div>
                                        )}
                                      </div>
                                      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">{group.members} Member</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 font-semibold text-[13px] transition-colors">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                                      {t("joinGroup")}
                                    </button>
                                    <div className="relative flex items-center justify-center">
                                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors peer focus:outline-none">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                                      </button>
                                      <div className="absolute right-0 top-6 mt-1 w-48 bg-white dark:bg-[#242526] rounded-xl shadow-lg border border-gray-100 dark:border-white/10 opacity-0 invisible peer-focus:opacity-100 peer-focus:visible hover:opacity-100 hover:visible transition-all z-50 overflow-hidden">
                                        <button className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-2 transition-colors border-b border-gray-100 dark:border-white/5">
                                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                          {t("viewGroup")}
                                        </button>
                                        <button className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-2 transition-colors">
                                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                          {t("reportCommunity")}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {expandedGroupTab === 'managed' && dummyManagedGroups.length > 5 && (
                              <div className="flex justify-center items-center mt-auto pt-6 px-2 gap-4">
                                <button 
                                  disabled={groupPage === 1}
                                  onClick={() => setGroupPage(p => p - 1)}
                                  className="p-2 rounded-full bg-gray-200 dark:bg-[#3A3B3C] text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-[#4E4F50] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Halaman {groupPage}</span>
                                <button 
                                  disabled={groupPage * 5 >= dummyManagedGroups.length}
                                  onClick={() => setGroupPage(p => p + 1)}
                                  className="p-2 rounded-full bg-gray-200 dark:bg-[#3A3B3C] text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-[#4E4F50] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* 2. Komunitas yang diikuti */}
                        {(!expandedGroupTab || expandedGroupTab === 'joined') && (
                          <div className={`flex flex-col flex-1 ${expandedGroupTab ? "" : "w-full mt-2"}`}>
                            <div className="flex items-center justify-between mb-3 px-1">
                              <h3 className="text-[15px] font-bold text-black dark:text-white flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                                {t("joinedGroups")}
                              </h3>
                              {expandedGroupTab === 'joined' ? (
                                <button onClick={() => { setExpandedGroupTab(null); setGroupPage(1); }} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-gray-500 transition-colors">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                              ) : (
                                dummyJoinedGroups.length > 2 && (
                                  <button onClick={() => { setExpandedGroupTab('joined'); setGroupPage(1); }} className="text-[13px] font-bold text-[#10B981] hover:text-emerald-700 transition-colors">{t("seeAll") || "Lihat Semua"}</button>
                                )
                              )}
                            </div>
                            
                            <div className="flex flex-col gap-2">
                              {dummyJoinedGroups.slice(expandedGroupTab === 'joined' ? (groupPage - 1) * 5 : 0, expandedGroupTab === 'joined' ? groupPage * 5 : 2).map((group, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white/40 dark:bg-[#242526]/40 border border-gray-100 dark:border-white/5 hover:bg-white dark:hover:bg-[#2A2B2C] hover:shadow-sm transition-all cursor-pointer group">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform`}>
                                      {group.initial}
                                    </div>
                                    <div>
                                      <p className="text-[14px] font-bold text-gray-900 dark:text-white leading-tight">{group.name}</p>
                                      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">{group.members} Member</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-4">
                                    {/* Visit Button */}
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-emerald-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 font-semibold text-[13px] transition-colors">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                      {t("visit")}
                                    </button>
                                    
                                    {/* 3-dots Dropdown */}
                                    <div className="relative flex items-center justify-center">
                                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors peer focus:outline-none">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                                      </button>
                                      <div className="absolute right-0 top-6 mt-1 w-48 bg-white dark:bg-[#242526] rounded-xl shadow-lg border border-gray-100 dark:border-white/10 opacity-0 invisible peer-focus:opacity-100 peer-focus:visible hover:opacity-100 hover:visible transition-all z-50 overflow-hidden">
                                        <button className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-2 transition-colors border-b border-gray-100 dark:border-white/5">
                                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                                          {t("joinOnly") || "Gabung"}
                                        </button>
                                        <button className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-2 transition-colors">
                                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                          {t("reportCommunity")}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {expandedGroupTab === 'joined' && dummyJoinedGroups.length > 5 && (
                              <div className="flex justify-center items-center mt-auto pt-6 px-2 gap-4">
                                <button 
                                  disabled={groupPage === 1}
                                  onClick={() => setGroupPage(p => p - 1)}
                                  className="p-2 rounded-full bg-gray-200 dark:bg-[#3A3B3C] text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-[#4E4F50] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Halaman {groupPage}</span>
                                <button 
                                  disabled={groupPage * 5 >= dummyJoinedGroups.length}
                                  onClick={() => setGroupPage(p => p + 1)}
                                  className="p-2 rounded-full bg-gray-200 dark:bg-[#3A3B3C] text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-[#4E4F50] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

              {/* Divider */}
              <div className="w-full max-w-[590px] mx-auto border-t border-gray-300 dark:border-gray-700 mt-4"></div>

              {/* Tabs Navigation - Gradient Pill Style */}
              <div className="flex justify-center w-full relative z-10">
                <ul className="flex gap-3 p-2">
                  {[
                    { id: 'posts', label: 'Post', gradientFrom: '#a955ff', gradientTo: '#ea51ff',
                      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    },
                    { id: 'media', label: 'Media', gradientFrom: '#56CCF2', gradientTo: '#2F80ED',
                      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    },
                    { id: 'project', label: 'Project', gradientFrom: '#FF9966', gradientTo: '#FF5E62',
                      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                    }
                  ].map(({ id, label, icon, gradientFrom, gradientTo }) => (
                    <li
                      key={id}
                      onClick={() => setActiveTab(id)}
                      style={{ '--gradient-from': gradientFrom, '--gradient-to': gradientTo } as React.CSSProperties}
                      className={`relative h-[52px] bg-white dark:bg-[#3A3B3C] shadow-lg dark:shadow-black/40 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer overflow-hidden ${activeTab === id ? 'w-[140px] shadow-none' : 'w-[52px] group hover:w-[140px]'}`}
                    >
                      {/* Gradient background */}
                      <span className={`absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] transition-opacity duration-500 ${activeTab === id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
                      {/* Blur glow */}
                      <span className={`absolute top-[10px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[15px] -z-10 transition-opacity duration-500 ${activeTab === id ? 'opacity-50' : 'opacity-0 group-hover:opacity-50'}`}></span>
                      {/* Icon */}
                      <span className={`relative z-10 text-gray-500 dark:text-gray-300 transition-all duration-300 ${activeTab === id ? 'scale-0 w-0 overflow-hidden' : 'scale-100 group-hover:scale-0 group-hover:w-0 group-hover:overflow-hidden'}`}>
                        {icon}
                      </span>
                      {/* Label */}
                      <span className={`absolute text-white uppercase tracking-wide text-sm font-bold transition-all duration-300 ${activeTab === id ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`} style={{ transitionDelay: activeTab === id ? '0ms' : '100ms' }}>
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>


            


              {/* Tab Content Area */}
              <div className="mt-2 flex flex-col gap-4 max-w-[590px] w-full mx-auto">
                {activeTab === 'posts' ? (
                  <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] pt-4 px-0">
                    <div className="flex items-center justify-between pb-2 px-4 relative">
                      <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                          <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight hover:underline">
                            {username}
                          </h3>
                          <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8]">
                            2 jam lalu
                          </p>
                        </div>
                      </div>
                      <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-gray-500 dark:text-[#B0B3B8] transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg>
                      </button>
                    </div>
                    <p className="text-black dark:text-[#E4E6EB] text-[15px] mb-4 px-4 leading-relaxed">
                      Halo semuanya! Ini adalah contoh dummy postingan untuk tab <span className="capitalize font-semibold">{activeTab}</span>. Desain ini udah disesuaikan 100% dengan komponen postingan yang ada di halaman beranda. Jangan lupa ngopi hari ini ya! ☕🚀
                    </p>
                    <div className="w-full bg-[#F0F2F5] dark:bg-[#3A3B3C] h-[300px] mb-2 flex items-center justify-center overflow-hidden">
                      <img src="/sampul-placeholder.png" alt="Post media" className="w-full h-full object-cover" />
                    </div>
                    <div className="px-4 pb-2">
                      <div className="flex items-center gap-1 pt-2 border-t border-gray-100 dark:border-[#3E4042]">
                        <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                          Suka
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                          Komentar
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                          Bagikan
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}

                {activeTab === 'media' ? (
                  <>
                  <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] p-4">
                    {isOwnProfile && (
                      <div className="flex justify-end mb-4">
                        <button className="flex items-center gap-1.5 border-[2px] border-[#10B981] bg-transparent text-[#10B981] hover:bg-[#10B981] hover:text-white px-3 py-1 rounded-lg font-bold text-[13px] transition-colors shadow-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                          Tambah Gallery
                        </button>
                      </div>
                    )}
                    <div className="relative group/album">
                        {/* Left Arrow */}
                        <button 
                          onClick={() => scrollAlbumCarousel('left')}
                          className="absolute -left-3 top-1/2 -translate-y-[80%] z-10 w-8 h-8 flex items-center justify-center bg-white dark:bg-[#3A3B3C] rounded-full shadow-md border border-gray-200 dark:border-[#4E4F50] text-gray-600 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#4E4F50] transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        
                        {/* Carousel Container */}
                        <div ref={albumCarouselRef} className="flex overflow-x-auto gap-4 sidebar-scrollbar snap-x snap-mandatory py-2 px-1">

                      {[...Array(8)].map((_, i) => (
                        <div key={i} onClick={() => setActiveAlbumIdx(activeAlbumIdx === i ? null : i)} className={`shrink-0 w-[140px] snap-start flex flex-col gap-1.5 group cursor-pointer p-1 rounded-xl transition-colors ${activeAlbumIdx === i ? 'bg-gray-100 dark:bg-[#3A3B3C]' : 'hover:bg-gray-200 dark:hover:bg-[#3A3B3C]/50'}`}>
                          <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden relative border border-gray-100 dark:border-[#3E4042]">
                            <img src="/sampul-placeholder.png" alt={`Media ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                          </div>
                          <p className="text-[13px] font-semibold text-gray-700 dark:text-[#E4E6EB] truncate px-1">
                            Foto Liburan {i + 1}
                          </p>
                        </div>
                      ))}
                    
                        </div>
                        
                        {/* Right Arrow */}
                        <button 
                          onClick={() => scrollAlbumCarousel('right')}
                          className="absolute -right-3 top-1/2 -translate-y-[80%] z-10 w-8 h-8 flex items-center justify-center bg-white dark:bg-[#3A3B3C] rounded-full shadow-md border border-gray-200 dark:border-[#4E4F50] text-gray-600 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#4E4F50] transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                        </button>
                      </div>
                    </div>
                    
                    {activeAlbumIdx !== null && (
                    <div className="animate-in slide-in-from-top-2 fade-in duration-300 w-full mt-2">
                      <div className="flex items-center justify-between mb-4 px-1">
                         <h3 className="font-bold text-[17px] text-black dark:text-[#E4E6EB]">Isi Album: Foto Liburan {activeAlbumIdx + 1}</h3>
                         
                         <div className="flex items-center gap-4">
                           {/* Grid toggles */}
                           <div className="flex items-center bg-gray-200/60 dark:bg-[#242526] rounded-lg p-1 border border-gray-300/50 dark:border-[#3E4042]">
                              {[1, 3, 5].map((cols) => (
                                 <button 
                                    key={cols} 
                                    onClick={() => setAlbumGridCols(cols)} 
                                    className={`w-8 h-7 flex items-center justify-center rounded-md text-[13px] font-bold transition-all ${albumGridCols === cols ? 'bg-white dark:bg-[#4E4F50] text-black dark:text-white shadow-sm' : 'text-gray-500 dark:text-[#B0B3B8] hover:text-black dark:hover:text-white'}`}
                                 >
                                   {cols === 1 ? (
                                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="2" /></svg>
                                   ) : cols === 3 ? (
                                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 500 500"><g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
 stroke="none">
<path d="M270 4921 c-74 -23 -127 -69 -159 -141 -20 -44 -21 -62 -21 -772 l0
-728 745 0 745 0 0 825 0 825 -642 -1 c-354 0 -654 -4 -668 -8z"/>
<path d="M1680 4105 l0 -825 815 0 815 0 0 825 0 825 -815 0 -815 0 0 -825z"/>
<path d="M3420 4105 l0 -825 745 0 745 0 0 728 c0 710 -1 728 -21 772 -25 55
-62 95 -114 123 -40 22 -46 22 -697 25 l-658 3 0 -826z"/>
<path d="M90 2455 l0 -725 745 0 745 0 -2 723 -3 722 -742 3 -743 2 0 -725z"/>
<path d="M1680 2455 l0 -725 815 0 815 0 0 725 0 725 -815 0 -815 0 0 -725z"/>
<path d="M3420 2455 l0 -725 745 0 745 0 0 725 0 725 -745 0 -745 0 0 -725z"/>
<path d="M90 943 c0 -660 1 -679 21 -723 25 -55 62 -95 114 -123 40 -22 46
-22 698 -25 l657 -3 0 776 0 775 -745 0 -745 0 0 -677z"/>
<path d="M1680 845 l0 -775 815 0 815 0 0 775 0 775 -815 0 -815 0 0 -775z"/>
<path d="M3420 845 l0 -776 658 3 c651 3 657 3 697 25 52 28 89 68 114 123 20
44 21 63 21 723 l0 677 -745 0 -745 0 0 -775z"/>
</g></svg>
                                   ) : (
                                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 500 500"><g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
 stroke="none">
<path d="M270 4921 c-77 -24 -148 -90 -168 -160 -9 -27 -12 -241 -12 -760 l0
-721 410 0 410 0 0 825 0 825 -307 -1 c-170 0 -319 -4 -333 -8z"/>
<path d="M1020 4105 l0 -825 475 0 475 0 0 825 0 825 -475 0 -475 0 0 -825z"/>
<path d="M2070 4105 l0 -825 475 0 475 0 0 825 0 825 -475 0 -475 0 0 -825z"/>
<path d="M3120 4105 l0 -825 455 0 455 0 0 825 0 825 -455 0 -455 0 0 -825z"/>
<path d="M4140 4106 l0 -826 385 0 385 0 0 721 c0 519 -3 733 -12 760 -15 51
-69 114 -122 142 -39 21 -54 22 -338 25 l-298 3 0 -825z"/>
<path d="M90 2455 l0 -725 410 0 410 0 0 725 0 725 -410 0 -410 0 0 -725z"/>
<path d="M1020 2455 l0 -725 475 0 475 0 -2 723 -3 722 -472 3 -473 2 0 -725z"/>
<path d="M2077 3173 c-4 -3 -7 -330 -7 -725 l0 -718 475 0 475 0 -2 723 -3
722 -466 3 c-256 1 -469 -1 -472 -5z"/>
<path d="M3127 3173 c-4 -3 -7 -330 -7 -725 l0 -718 455 0 455 0 0 725 0 725
-448 0 c-247 0 -452 -3 -455 -7z"/>
<path d="M4140 2455 l0 -725 385 0 385 0 0 725 0 725 -385 0 -385 0 0 -725z"/>
<path d="M90 943 c0 -660 1 -679 21 -723 25 -55 62 -95 114 -123 38 -21 54
-22 363 -25 l322 -3 0 775 0 776 -410 0 -410 0 0 -677z"/>
<path d="M1020 845 l0 -775 475 0 475 0 0 775 0 775 -475 0 -475 0 0 -775z"/>
<path d="M2070 845 l0 -775 475 0 475 0 0 775 0 775 -475 0 -475 0 0 -775z"/>
<path d="M3120 845 l0 -775 455 0 455 0 0 775 0 775 -455 0 -455 0 0 -775z"/>
<path d="M4140 844 l0 -775 298 3 c282 3 299 4 337 25 52 28 89 68 114 123 20
44 21 63 21 723 l0 677 -385 0 -385 0 0 -776z"/>
</g></svg>
                                   )}
                                 </button>
                              ))}
                           </div>
                           
                           {/* Close button */}
                           <button onClick={() => setActiveAlbumIdx(null)} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#3A3B3C] flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white transition-colors shadow-sm">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                           </button>
                         </div>
                      </div>
                      <div 
                         className={`grid gap-2 transition-all duration-300 ${albumGridCols === 1 ? 'grid-cols-1' : albumGridCols === 3 ? 'grid-cols-3' : 'grid-cols-5'}`}
                      >
                        {[...Array(10)].map((_, idx) => (
                           <div key={idx} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden group relative cursor-pointer">
                              <img src="/sampul-placeholder.png" alt={`Album item ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                           </div>
                        ))}
                      </div>
                    </div>
                  )}
                  </>
                ) : null}

                {activeTab === 'project' ? (
                  <div className="bg-white dark:bg-[#242526] rounded-[20px] shadow-sm border border-gray-100 dark:border-[#3A3B3C] p-8 text-center flex flex-col items-center justify-center min-h-[250px]">
                     <div className="w-16 h-16 bg-gray-100 dark:bg-[#3A3B3C] rounded-full flex items-center justify-center mb-4">
                       <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                     </div>
                     <p className="text-gray-800 dark:text-[#E4E6EB] font-bold text-[16px] mb-1">Belum ada project</p>
                     <p className="text-gray-500 dark:text-[#B0B3B8] text-[14px] max-w-[250px]">Saat ini {username} belum mempublikasikan project apapun.</p>
                  </div>
                ) : null}
              </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center w-full max-w-[590px] mx-auto mt-4">
                 <div className="w-24 h-24 mb-4 text-gray-300 dark:text-gray-600">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-2.12.83-4.06 2.19-5.52l11.33 11.33C16.06 19.17 14.12 20 12 20zm5.81-2.48L6.48 6.19C7.94 4.83 9.88 4 12 4c4.41 0 8 3.59 8 8 0 1.9-.7 3.65-1.81 5.06z"/></svg>
                 </div>
                 <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                   {isBlockedByMe ? t("youBlockedThisAccount", { fallback: "Anda telah memblokir akun ini" }) : t("accountNotAvailable", { fallback: "Akun ini tidak tersedia" })}
                 </h2>
                 <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                   {isBlockedByMe ? t("unblockToSeeContent", { fallback: "Buka blokir untuk melihat postingan, teman, dan berinteraksi kembali dengan akun ini." }) : t("linkMightBeBroken", { fallback: "Tautan yang Anda ikuti mungkin rusak, atau halaman mungkin telah dihapus." })}
                 </p>
                </div>
              )}


              
          </div>
      </div>
      </div>

      
      {/* Detail Modal */}
      {isDetailModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-200" onClick={() => setIsDetailModalOpen(false)}>
          <div 
            className="w-full max-w-xl bg-white dark:bg-[#242526] rounded-[28px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-white/5 shrink-0">
              <h2 className="text-[18px] font-bold text-gray-900 dark:text-white">{t("profileDetails")}</h2>
              <button 
                onClick={() => setIsDetailModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className={`p-6 overflow-y-auto custom-scrollbar flex flex-col ${(!profileData?.hardSkills?.length && !profileData?.softSkills?.length && !profileData?.softwareSkills?.length && !profileData?.hobbies?.length && !profileData?.music?.length && !profileData?.tvShows?.length && !profileData?.movies?.length && !profileData?.games?.length && !profileData?.sports?.length) ? 'min-h-[200px] items-center justify-center' : 'gap-8'}`}>
              
              {(!profileData?.hardSkills?.length && !profileData?.softSkills?.length && !profileData?.softwareSkills?.length && !profileData?.hobbies?.length && !profileData?.music?.length && !profileData?.tvShows?.length && !profileData?.movies?.length && !profileData?.games?.length && !profileData?.sports?.length) && (
                <span className="text-[15px] font-bold text-gray-400 dark:text-gray-500 italic text-center">
                  {t("noInfoPlaceholder") || "Tidak ada informasi"}
                </span>
              )}
              {/* Skills */}
              {(profileData?.hardSkills?.length > 0 || profileData?.softSkills?.length > 0 || profileData?.softwareSkills?.length > 0) && (
              <div>
                <h3 className="text-[16px] font-bold text-gray-900 dark:text-gray-100 mb-4">{t("skills")}</h3>
                <div className="flex flex-col gap-5">
                  
                  {profileData?.hardSkills && profileData.hardSkills.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <svg className="w-4.5 h-4.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                      <span className="text-[14px] font-bold text-gray-700 dark:text-gray-300">Hard Skill</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profileData.hardSkills.map((skill: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 bg-gray-50 dark:bg-[#3A3B3C]/40 text-gray-700 dark:text-gray-300 rounded-lg text-[13px] font-semibold border border-gray-200 dark:border-white/5 cursor-default">{skill}</span>
                      ))}
                    </div>
                  </div>
                  )}

                  {profileData?.softSkills && profileData.softSkills.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <svg className="w-4.5 h-4.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                      <span className="text-[14px] font-bold text-gray-700 dark:text-gray-300">Soft Skill</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profileData.softSkills.map((skill: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 bg-gray-50 dark:bg-[#3A3B3C]/40 text-gray-700 dark:text-gray-300 rounded-lg text-[13px] font-semibold border border-gray-200 dark:border-white/5 cursor-default">{skill}</span>
                      ))}
                    </div>
                  </div>
                  )}

                  {profileData?.softwareSkills && profileData.softwareSkills.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <svg className="w-4.5 h-4.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                      <span className="text-[14px] font-bold text-gray-700 dark:text-gray-300">Software Skill</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profileData.softwareSkills.map((skill: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 bg-gray-50 dark:bg-[#3A3B3C]/40 text-gray-700 dark:text-gray-300 rounded-lg text-[13px] font-semibold border border-gray-200 dark:border-white/5 cursor-default">{skill}</span>
                      ))}
                    </div>
                  </div>
                  )}

                </div>
              </div>
              )}

              {/* Hobbies */}
              {profileData?.hobbies && profileData.hobbies.length > 0 && (
              <div>
                <h3 className="text-[16px] font-bold text-gray-900 dark:text-gray-100 mb-4">{t("hobbies")}</h3>
                <div className="flex flex-col gap-2.5">
                  {profileData.hobbies.map((hobby: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-3.5 bg-gray-50/50 dark:bg-[#3A3B3C]/20 border border-gray-100 dark:border-white/5 rounded-2xl cursor-default">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      <span className="text-[14px] font-semibold text-gray-800 dark:text-gray-200">{hobby}</span>
                    </div>
                  ))}
                </div>
              </div>
              )}

              {/* Ketertarikan */}
              {(profileData?.music?.length > 0 || profileData?.tvShows?.length > 0 || profileData?.movies?.length > 0 || profileData?.games?.length > 0 || profileData?.sports?.length > 0) && (
              <div>
                <h3 className="text-[16px] font-bold text-gray-900 dark:text-gray-100 mb-4">{t("interests")}</h3>
                <div className="flex flex-col gap-2.5">
                  {[
                    ...(profileData?.music?.length > 0 ? [{ type: 'Music', value: profileData.music.join(', '), icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3', color: 'text-pink-500' }] : []),
                    ...(profileData?.tvShows?.length > 0 ? [{ type: 'TV Shows', value: profileData.tvShows.join(', '), icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'text-indigo-500' }] : []),
                    ...(profileData?.movies?.length > 0 ? [{ type: 'Films', value: profileData.movies.join(', '), icon: 'M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z', color: 'text-red-500' }] : []),
                    ...(profileData?.games?.length > 0 ? [{ type: 'Games', value: profileData.games.join(', '), icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z', color: 'text-amber-500' }] : []),
                    ...(profileData?.sports?.length > 0 ? [{ type: 'Sports', value: profileData.sports.join(', '), icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'text-teal-500' }] : [])
                  ].map((interest, i) => (
                    <div key={i} className="flex items-start gap-3.5 p-3.5 bg-gray-50/50 dark:bg-[#3A3B3C]/20 border border-gray-100 dark:border-white/5 rounded-2xl cursor-default">
                      <svg className={`w-5 h-5 mt-0.5 shrink-0 ${interest.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={interest.icon} /></svg>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{interest.type}</span>
                        <span className="text-[14px] font-medium text-gray-800 dark:text-gray-200 mt-0.5 leading-snug">{interest.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              )}

            </div>
          </div>
        </div>
      )}



      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        currentUser={currentUser} 
      />
      
      <CropModal
        isOpen={cropModalOpen}
        imageSrc={cropImageSrc}
        onClose={() => setCropModalOpen(false)}
        onCropComplete={handleCropComplete}
        aspect={cropType === "avatar" ? 1 : 3 / 1}
        cropShape={cropType === "avatar" ? "round" : "rect"}
      />
      
      <ImagePreviewModal
        isOpen={previewModalOpen}
        imageSrc={getOptimizedUrl(previewImageSrc, "preview")}
        onClose={() => setPreviewModalOpen(false)}
      />
    </main>
  );
}
