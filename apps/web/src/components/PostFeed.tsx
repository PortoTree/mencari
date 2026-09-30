"use client";

import { useEffect, useState, useCallback } from "react";
import { getFeedPosts } from "@/app/actions/posts";
import PostCard from "./PostCard";
import { useTranslations } from "next-intl";

interface PostFeedProps {
  currentUser: any;
  onProfileClick?: (user: any) => void;
}

export default function PostFeed({ currentUser, onProfileClick }: PostFeedProps) {
  const t = useTranslations();
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    if (!currentUser?.id) return;
    try {
      setIsLoading(true);
      const res = await getFeedPosts(currentUser.id);
      if (res.success && res.posts) {
        setPosts(res.posts);
      } else {
        setError(res.error || "Failed to load posts");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser?.id]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Optionally listen for a custom event if we want to refresh when a post is created from the modal
  useEffect(() => {
    const handleRefresh = () => fetchPosts();
    window.addEventListener("refresh_feed", handleRefresh);
    return () => window.removeEventListener("refresh_feed", handleRefresh);
  }, [fetchPosts]);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] py-12 flex flex-col items-center justify-center text-center">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
        <p className="text-[14px] text-gray-500 dark:text-[#B0B3B8]">Memuat postingan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-red-100 dark:border-red-900/30 py-8 flex flex-col items-center justify-center text-center">
        <p className="text-[14px] text-red-500">Gagal memuat postingan: {error}</p>
        <button onClick={fetchPosts} className="mt-2 text-blue-500 hover:underline text-[14px]">Coba Lagi</button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] py-12 flex flex-col items-center justify-center text-center">
        <svg className="w-16 h-16 text-gray-300 dark:text-[#4E4F50] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <p className="text-[16px] font-bold text-gray-700 dark:text-[#E4E6EB]">Belum ada postingan</p>
        <p className="text-[14px] text-gray-500 dark:text-[#B0B3B8] mt-1">Belum ada postingan untuk ditampilkan saat ini.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} currentUser={currentUser} onProfileClick={onProfileClick} />
      ))}
    </div>
  );
}
