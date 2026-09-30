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
      <div className="flex flex-col gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] p-4 flex flex-col gap-3">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-[40px] h-[40px] rounded-full bg-gray-200 dark:bg-white/10 animate-pulse shrink-0"></div>
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="h-3 w-1/3 bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
                <div className="h-2.5 w-1/4 bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
              </div>
            </div>
            {/* Content */}
            <div className="flex flex-col gap-2 mt-2">
              <div className="h-3 w-full bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
              <div className="h-3 w-5/6 bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
              <div className="h-3 w-4/6 bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
            </div>
            {/* Media Placeholder */}
            {i === 1 && (
              <div className="h-48 w-full bg-gray-200 dark:bg-white/10 rounded-xl mt-2 animate-pulse"></div>
            )}
            {/* Actions */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
              <div className="flex gap-4">
                <div className="h-4 w-12 bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
                <div className="h-4 w-12 bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-10 bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-red-100 dark:border-red-900/30 py-8 flex flex-col items-center justify-center text-center">
        <p className="text-[14px] text-red-500">{t("feed.loadError")} {error}</p>
        <button onClick={fetchPosts} className="mt-2 text-blue-500 hover:underline text-[14px]">{t("feed.tryAgain")}</button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] py-12 flex flex-col items-center justify-center text-center">
        <svg className="w-16 h-16 text-gray-300 dark:text-[#4E4F50] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <p className="text-[16px] font-bold text-gray-700 dark:text-[#E4E6EB]">{t("feed.noPosts")}</p>
        <p className="text-[14px] text-gray-500 dark:text-[#B0B3B8] mt-1">{t("feed.noPostsDesc")}</p>
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
