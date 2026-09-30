import re

# Update PostFeed.tsx
file_path_feed = 'c:/mencari-online/apps/web/src/components/PostFeed.tsx'
with open(file_path_feed, 'r', encoding='utf-8') as f:
    content_feed = f.read()

# Add onProfileClick to interface
content_feed = re.sub(
    r'interface PostFeedProps \{([\s\S]*?)\}',
    r'interface PostFeedProps {\1  onProfileClick?: (user: any) => void;\n}',
    content_feed
)

# Add onProfileClick to props
content_feed = re.sub(
    r'export default function PostFeed\(\{ currentUser \}: PostFeedProps\) \{',
    r'export default function PostFeed({ currentUser, onProfileClick }: PostFeedProps) {',
    content_feed
)

# Pass onProfileClick to PostCard
content_feed = content_feed.replace(
    '<PostCard key={post.id} post={post} currentUser={currentUser} />',
    '<PostCard key={post.id} post={post} currentUser={currentUser} onProfileClick={onProfileClick} />'
)

with open(file_path_feed, 'w', encoding='utf-8') as f:
    f.write(content_feed)


# Update PostCard.tsx
file_path_card = 'c:/mencari-online/apps/web/src/components/PostCard.tsx'
with open(file_path_card, 'r', encoding='utf-8') as f:
    content_card = f.read()

content_card = re.sub(
    r'interface PostCardProps \{([\s\S]*?)\}',
    r'interface PostCardProps {\1  onProfileClick?: (user: any) => void;\n}',
    content_card
)

content_card = re.sub(
    r'export default function PostCard\(\{ post, currentUser \}: PostCardProps\) \{',
    r'export default function PostCard({ post, currentUser, onProfileClick }: PostCardProps) {',
    content_card
)

click_old = '''          onClick={() => {
            router.push(`/${locale}/p/${post.author?.username}/${post.authorId}`);
          }}'''
click_new = '''          onClick={() => {
            if (onProfileClick) {
              onProfileClick(post.author);
            } else {
              router.push(`/${locale}/p/${post.author?.username}/${post.authorId}`);
            }
          }}'''
content_card = content_card.replace(click_old, click_new)

with open(file_path_card, 'w', encoding='utf-8') as f:
    f.write(content_card)

print("Updated PostFeed and PostCard")
