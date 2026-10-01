import os
import json

# Update id.json
id_path = r"c:\mencari-online\apps\web\messages\id.json"
with open(id_path, "r", encoding="utf-8") as f:
    id_data = json.load(f)

if "notif" not in id_data:
    id_data["notif"] = {}
id_data["notif"]["typePostTag"] = "telah menandai Anda dalam postingan. Klik untuk melihat."

with open(id_path, "w", encoding="utf-8") as f:
    json.dump(id_data, f, indent=2, ensure_ascii=False)


# Update en.json
en_path = r"c:\mencari-online\apps\web\messages\en.json"
with open(en_path, "r", encoding="utf-8") as f:
    en_data = json.load(f)

if "notif" not in en_data:
    en_data["notif"] = {}
en_data["notif"]["typePostTag"] = "tagged you in a post. Click to view."

with open(en_path, "w", encoding="utf-8") as f:
    json.dump(en_data, f, indent=2, ensure_ascii=False)


# Update Navbar.tsx
navbar_path = r"c:\mencari-online\apps\web\src\components\Navbar.tsx"
with open(navbar_path, "r", encoding="utf-8") as f:
    content = f.read()

# Update click handler
click_old = """                  onClick={async () => {
                    if (!notif.isRead) await handleMarkOneRead(notif.id);
                    setIsNotifPanelOpen(false);
                    router.push(`/${locale}/p/${notif.sender?.username}/${notif.senderId}`);
                  }}"""
click_new = """                  onClick={async () => {
                    if (!notif.isRead) await handleMarkOneRead(notif.id);
                    setIsNotifPanelOpen(false);
                    if (notif.postId) {
                      router.push(`/${locale}/home?post=${notif.postId}`);
                    } else {
                      router.push(`/${locale}/p/${notif.sender?.username}/${notif.senderId}`);
                    }
                  }}"""
content = content.replace(click_old, click_new)

# Update background color logic
bg_old = """                        notif.type === "FOLLOW" ? "bg-emerald-500" :
                        notif.type === "FRIEND_REQUEST" || notif.type === "FRIEND_ACCEPT" || notif.type === "FRIEND_NOW" ? "bg-blue-500" :
                        notif.type === "POST_LIKE" ? "bg-red-500" :
                        "bg-[#2D88FF]"
                      }`}>"""
bg_new = """                        notif.type === "FOLLOW" ? "bg-emerald-500" :
                        notif.type === "FRIEND_REQUEST" || notif.type === "FRIEND_ACCEPT" || notif.type === "FRIEND_NOW" ? "bg-blue-500" :
                        notif.type === "POST_LIKE" ? "bg-red-500" :
                        notif.type === "POST_TAG" ? "bg-purple-500" :
                        "bg-[#2D88FF]"
                      }`}>"""
content = content.replace(bg_old, bg_new)

# Update icon
icon_old = """                        {notif.type === "POST_LIKE" && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                        )}
                      </div>"""
icon_new = """                        {notif.type === "POST_LIKE" && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                        )}
                        {notif.type === "POST_TAG" && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
                        )}
                      </div>"""
content = content.replace(icon_old, icon_new)

# Update text rendering
text_old = """                        {notif.type === "POST_LIKE" && ` ${t("notif.typePostLike")}`}
                        {notif.type === "POST_COMMENT" && ` ${t("notif.typePostComment")}`}
                      </p>"""
text_new = """                        {notif.type === "POST_LIKE" && ` ${t("notif.typePostLike")}`}
                        {notif.type === "POST_COMMENT" && ` ${t("notif.typePostComment")}`}
                        {notif.type === "POST_TAG" && ` ${t("notif.typePostTag")}`}
                      </p>"""
content = content.replace(text_old, text_new)

with open(navbar_path, "w", encoding="utf-8") as f:
    f.write(content)
