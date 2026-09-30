import re

file_path = 'c:/mencari-online/apps/web/src/app/[locale]/home/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update useEffect to fetch profile data
use_effect_old = '''  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.username || payload.name) {
          setCurrentUser({
            id: payload.sub || payload.id || payload._id || payload.userId || "1",
            username: payload.username || payload.name || "User",
            displayName:
              payload.displayName || payload.username || payload.name || "User",
          });
        }
      } catch (e) {
        console.error("Failed to parse token");
      }
    }
  }, []);'''

use_effect_new = '''  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.username || payload.name) {
          const userId = payload.sub || payload.id || payload._id || payload.userId || "1";
          setCurrentUser({
            id: userId,
            username: payload.username || payload.name || "User",
            displayName:
              payload.displayName || payload.username || payload.name || "User",
          });
          import("@/app/actions/profile").then(({ getProfile }) => {
            getProfile(userId).then(res => {
              if (res.success && res.profile) {
                setCurrentUser((prev: any) => ({ ...prev, profile: res.profile }));
              }
            });
          });
        }
      } catch (e) {
        console.error("Failed to parse token");
      }
    }
  }, []);'''

content = content.replace(use_effect_old, use_effect_new)

# 2. Update cover photo
# It's currently `<div className="h-[95px] bg-[#333333] ...` maybe?
# I need to see the exact structure of the profile card. Let's find it.
