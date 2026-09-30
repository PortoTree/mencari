"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deletePost } from "@/app/actions/posts";
import CreatePostModal from "./CreatePostModal";

export function formatPostTime(timestamp: number | Date, t: any, locale: string) {
  const ts = new Date(timestamp).getTime();
  const now = Date.now();
  const diff = now - ts;
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
    const d = new Date(ts);
    const day = d.getDate();
    const month = new Intl.DateTimeFormat(locale, { month: "short" }).format(d);
    const year = d.getFullYear();
    const h = d.getHours().toString().padStart(2, "0");
    const m = d.getMinutes().toString().padStart(2, "0");
    return `${day} ${month} ${year} | ${h}.${m}`;
  }
}

export default function PostCard({ post, currentUser, onProfileClick, isHighlighted = false }: { post: any; currentUser: any; onProfileClick?: (user: any) => void; isHighlighted?: boolean }) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [activePostMenu, setActivePostMenu] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await deletePost(post.id, currentUser.id);
    if (res.success) {
      window.dispatchEvent(new Event("refresh_feed"));
    } else {
      alert(res.error || "Failed to delete post");
    }
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
  };

  // Fallbacks
  const authorName = post.author?.profile?.displayName || post.author?.username || "Pengguna";
  const authorAvatar = post.author?.profile?.avatarUrl || "/default-avatar.svg";
  
  // Custom Post Subtitle based on Label
  let postSubtitle = null;
  if (post.label === "MENCARI") {
    postSubtitle = (
      <span className="font-bold flex items-center gap-1">
        <svg className="w-3 h-3 text-emerald-700 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <span className="bg-gradient-to-r from-emerald-800 to-emerald-500 dark:from-emerald-400 dark:to-emerald-200 bg-clip-text text-transparent">
          Mencari...
        </span>
      </span>
    );
  } else if (post.label === "LOKASI" && post.author?.profile?.locationName) {
    postSubtitle = (
      <span className="flex items-center gap-1">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
        {post.author.profile.locationName}
      </span>
    );
  } else if (post.label === "PROFESI" && post.author?.profile?.profession) {
    postSubtitle = (
      <span className="flex items-center gap-1">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" /><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" /></svg>
        {post.author.profile.profession}
      </span>
    );
  } else if (post.label === "SEKOLAH" && post.author?.profile?.school) {
    postSubtitle = (
      <span className="flex items-center gap-1">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" /></svg>
        {post.author.profile.school}
      </span>
    );
  }

  return (
    <>
    <div className={`bg-white dark:bg-[#242526] rounded-xl shadow-sm border pt-4 px-0 transition-all duration-1000 ${isHighlighted ? "border-yellow-400 dark:border-yellow-500 shadow-[0_0_15px_rgba(250,204,21,0.4)]" : "border-gray-100 dark:border-[#3E4042]"}`}>
      {isHighlighted && (
        <div className="px-4 pb-2 mb-2 border-b border-gray-100 dark:border-[#3E4042] text-xs font-bold text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
          Postingan yang Anda cari
        </div>
      )}
      <div className="flex items-center justify-between pb-2 px-4 relative">
        <div
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => {
            if (onProfileClick) {
              onProfileClick(post.author);
            } else {
              router.push(`/${locale}/p/${post.author?.username}/${post.authorId}`);
            }
          }}
        >
          <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
            <img
              src={authorAvatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight hover:underline">
              {authorName}
            </h3>
            <div className="text-[12px] text-gray-500 dark:text-[#B0B3B8] flex items-center gap-1">
              {postSubtitle && (
                <>
                  {postSubtitle}
                  <span>·</span>
                </>
              )}
              <span>
                {formatPostTime(post.createdAt, t, locale)}
              </span>
              {/* Privacy Icon */}
              <span>·</span>
              {post.visibility === "PUBLIC" ? (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" /></svg>
              ) : post.visibility === "FRIENDS" ? (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
              ) : (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
              )}
            </div>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setActivePostMenu(!activePostMenu)}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-gray-500 dark:text-[#B0B3B8] transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>

          {activePostMenu && (
            <>
              {/* Overlay for clicking outside to close menu */}
              <div className="fixed inset-0 z-[10100]" onClick={() => setActivePostMenu(false)}></div>
              
              <div className="absolute right-0 mt-1 w-[260px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] p-2 z-[10200]">
                <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                  <svg className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  {t("postMenu.savePost") || "Simpan Postingan"}
                </button>
                <button
                  onClick={() => {
                    router.push(`/${locale}/p/${post.author?.username}/${post.authorId}`);
                    setActivePostMenu(false);
                  }}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]"
                >
                  <svg className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {t("postMenu.showProfile") || "Lihat Profil"}
                </button>
                
                {post.authorId === currentUser?.id && (
                  <>
                    <button onClick={() => { setIsEditModalOpen(true); setActivePostMenu(false); }} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                      <svg className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      {t("postMenu.editPost") || "Edit Postingan"}
                    </button>
                    <button onClick={() => { setIsDeleteModalOpen(true); setActivePostMenu(false); }} disabled={isDeleting} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-red-500 font-semibold text-[15px]">
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      {isDeleting ? "Menghapus..." : (t("postMenu.deletePost") || "Hapus Postingan")}
                    </button>
                  </>
                )}

                {post.authorId !== currentUser?.id && (
                  <>
                    <div className="h-[1px] bg-gray-200 dark:bg-[#3E4042] my-1 mx-2" />
                    <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-red-500 font-semibold text-[15px]">
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {t("postMenu.reportPost") || "Laporkan"}
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Content */}
      <p className="text-black dark:text-[#E4E6EB] text-[15px] mb-3 px-4 whitespace-pre-wrap">
        {post.content}
      </p>

      {/* Media (If any) */}
      {post.mediaUrls && post.mediaUrls.length > 0 && (
        <div className="w-full bg-[#F0F2F5] dark:bg-[#3A3B3C] max-h-[500px] mb-2 flex items-center justify-center overflow-hidden">
          <img src={post.mediaUrls[0]} alt="Post media" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Footer Actions */}
      <div className="px-4 pb-4 mt-2">
        <div className="flex items-center gap-1 pt-2 border-t border-gray-100 dark:border-[#3E4042]">
          <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            {t("feed.like") || "Suka"} {post._count?.likes > 0 && <span className="ml-1">({post._count.likes})</span>}
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            {t("feed.comment") || "Komentar"} {post._count?.comments > 0 && <span className="ml-1">({post._count.comments})</span>}
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            {t("feed.share") || "Bagikan"}
          </button>
        </div>
      </div>
    </div>
      
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 dark:bg-black/70 px-4">
          <div className="w-full max-w-[400px] bg-white dark:bg-[#242526] rounded-xl shadow-xl flex flex-col relative border border-gray-200 dark:border-[#3E4042] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#3E4042]">
              <h2 className="text-[20px] font-bold text-black dark:text-[#E4E6EB]">
                {t("postMenu.deletePost") || "Hapus Postingan"}
              </h2>
              <button onClick={() => setIsDeleteModalOpen(false)} className="w-9 h-9 bg-gray-200 dark:bg-[#3A3B3C] rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-[#4E4F50] transition-colors text-gray-600 dark:text-[#B0B3B8]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-4">
              <p className="text-[15px] text-gray-600 dark:text-[#B0B3B8] mb-6">
                {t("postMenu.confirmDelete") || "Apakah Anda yakin ingin menghapus postingan ini?"}
              </p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setIsDeleteModalOpen(false)} className="px-5 py-2 rounded-lg font-semibold text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors">
                  {t("postMenu.cancel") || "Batal"}
                </button>
                <button onClick={handleDelete} disabled={isDeleting} className="px-5 py-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 transition-colors flex items-center gap-2">
                  {isDeleting ? (t("postMenu.deleting") || "Menghapus...") : (t("postMenu.delete") || "Hapus")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <CreatePostModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} currentUser={currentUser} initialPost={post} />
    </>
  );
}
