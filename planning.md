# Mencari.online — Product & Engineering Planning

> **Status:** Living planning document  
> **Purpose:** Menjadi dokumen utama untuk perencanaan produk, UX, arsitektur software, database, infrastructure, development flow, dan roadmap Mencari.online.
>
> **Core principle:** Mencari.online adalah **social network terlebih dahulu**. Search/discovery adalah fitur penting dan DNA pembeda, tetapi bukan identitas visual utama produk.

---

# 1. Product Vision

## 1.1 Konsep utama

Mencari.online adalah social network yang memungkinkan orang:

- membangun identitas digital,
- terhubung dengan orang lain,
- membuat dan menemukan konten,
- mengikuti orang, halaman, dan komunitas,
- berkomunikasi,
- membentuk komunitas,
- mencari sesuatu yang mereka butuhkan,
- menawarkan sesuatu yang mereka miliki,
- dan pada tahap berikutnya melakukan matching serta transaksi.

Konsep besarnya:

**Social Network + Discovery + Opportunity**

Mencari.online harus terasa seperti platform sosial ketika pertama kali digunakan, tetapi memiliki sistem discovery/search yang lebih kuat sebagai fondasi diferensiasi.

## 1.2 Prinsip produk

1. **Social first**
2. **Discovery by design**
3. **Search tidak mendominasi homepage**
4. **User intent harus jelas**
5. **Modular sejak awal**
6. **Mulai sederhana, scale secara bertahap**
7. **Post adalah pusat aktivitas sosial**
8. **Identity dan social graph adalah fondasi**
9. **Mencari adalah DNA pembeda**
10. **Marketplace datang setelah social graph dan discovery cukup kuat**

---

# 2. Product Layers

Mencari.online dibangun dengan beberapa layer utama.

```text
┌─────────────────────────────────────────────┐
│                  SOCIAL                     │
│ Feed / Post / Comment / Like / Share        │
├─────────────────────────────────────────────┤
│                DISCOVERY                    │
│ Search / Explore / Hashtag / Trending       │
├─────────────────────────────────────────────┤
│                 IDENTITY                    │
│ Profile / Follow / Friend / Verification    │
├─────────────────────────────────────────────┤
│              COMMUNICATION                  │
│ Chat / Notification                         │
├─────────────────────────────────────────────┤
│            COMMUNITY SYSTEM                 │
│ Groups / Pages                              │
├─────────────────────────────────────────────┤
│              MARKET SYSTEM                  │
│ Mencari / Offering / Project / Matching     │
├─────────────────────────────────────────────┤
│              CORE PLATFORM                  │
│ Auth / Database / Storage / Moderation      │
└─────────────────────────────────────────────┘
```

---

# 3. Technology Stack

## 3.1 Primary language

**TypeScript**

Digunakan untuk:

- frontend,
- backend,
- API,
- shared types,
- validation,
- WebSocket,
- tooling.

Tujuan: mengurangi context switching dan menjaga type safety antar layer.

## 3.2 Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

Frontend bertanggung jawab atas:

- UI,
- routing,
- rendering,
- state UI,
- interaction,
- accessibility,
- responsive design,
- API consumption,
- WebSocket client.

## 3.3 Backend

- NestJS
- TypeScript

Backend bertanggung jawab atas:

- business logic,
- authentication,
- authorization,
- validation,
- database access,
- search orchestration,
- notifications,
- messaging,
- moderation,
- media orchestration,
- background jobs.

## 3.4 Database

Primary database:

**PostgreSQL**

PostgreSQL adalah source of truth untuk data aplikasi.

## 3.5 ORM

**Prisma**

Digunakan untuk:

- schema,
- migrations,
- typed queries,
- database access.

## 3.6 Cache

**Redis**

Digunakan untuk:

- caching,
- rate limiting,
- temporary state,
- feed cache,
- search cache,
- online presence,
- queue backend,
- distributed coordination yang memang diperlukan.

## 3.7 Search

**OpenSearch**

Digunakan sebagai search/read-optimized index, bukan source of truth.

Search index dapat berisi:

- users,
- posts,
- groups,
- pages,
- hashtags,
- offerings,
- projects.

## 3.8 Queue

**BullMQ + Redis**

Untuk pekerjaan asynchronous:

- notification jobs,
- email,
- media processing,
- thumbnail generation,
- search indexing,
- moderation jobs,
- recommendation jobs,
- cleanup jobs.

## 3.9 Object storage

Gunakan object storage S3-compatible, misalnya:

- Cloudflare R2,
- atau provider S3-compatible lain.

Digunakan untuk:

- avatar,
- image,
- video,
- document,
- attachment.

Binary file tidak disimpan langsung di PostgreSQL.

## 3.10 CDN / edge

Cloudflare atau layanan CDN setara.

Digunakan untuk:

- CDN,
- DNS,
- TLS,
- caching,
- security,
- rate limiting tambahan,
- static/media delivery.

## 3.11 Container

**Docker**

Docker digunakan untuk environment yang konsisten.

Development infrastructure dapat dijalankan dengan Docker Compose:

```text
docker compose
├── PostgreSQL
├── Redis
└── OpenSearch
```

---

# 4. Architecture Strategy

## 4.1 Modular monolith

Mencari.online **tidak dimulai sebagai microservices**.

Backend menggunakan modular monolith:

```text
NestJS Application
│
├── Auth Module
├── Users Module
├── Profiles Module
├── Posts Module
├── Comments Module
├── Reactions Module
├── Follows Module
├── Friendships Module
├── Feed Module
├── Search Module
├── Groups Module
├── Pages Module
├── Messaging Module
├── Notifications Module
├── Media Module
├── Moderation Module
├── Mencari Module
└── Admin Module
```

Keuntungan:

- development lebih cepat,
- deployment lebih sederhana,
- debugging lebih mudah,
- database transaction lebih sederhana,
- belum perlu distributed-system complexity,
- tetap memiliki boundary domain yang jelas.

## 4.2 Prinsip pemisahan

Walaupun satu deployment, setiap domain harus memiliki:

- controller,
- service,
- repository/data access,
- DTO,
- validation,
- domain logic,
- tests.

Tujuannya agar suatu hari modul besar dapat diekstrak menjadi service terpisah jika memang dibutuhkan.

## 4.3 Kapan microservices dipertimbangkan?

Bukan berdasarkan tren.

Microservices baru dipertimbangkan ketika ada kebutuhan nyata seperti:

- messaging memiliki load yang sangat besar,
- search membutuhkan scaling independen,
- media processing membutuhkan worker cluster,
- deployment domain tertentu perlu independen,
- organizational/team boundary membutuhkan service boundary.

---

# 5. High-Level System Architecture

```text
                         INTERNET
                            │
                            ▼
                       CLOUDFLARE
                            │
             ┌──────────────┴──────────────┐
             │                             │
             ▼                             ▼
        NEXT.JS WEB                  NESTJS API
             │                             │
             │                    ┌────────┼─────────┐
             │                    │        │         │
             │                    ▼        ▼         ▼
             │               PostgreSQL Redis   OpenSearch
             │
             │
             └──────────────► Object Storage

NestJS
  │
  ├── REST API
  ├── WebSocket
  └── Background Jobs
           │
           ▼
       BullMQ / Redis
           │
           ▼
         Workers
```

---

# 6. Repository / Project Structure

Recommended monorepo:

```text
mencari/
│
├── apps/
│   │
│   ├── web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── lib/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── styles/
│   │
│   ├── api/
│   │   └── src/
│   │       ├── modules/
│   │       ├── common/
│   │       ├── config/
│   │       └── main.ts
│   │
│   └── worker/
│       └── src/
│           ├── jobs/
│           ├── processors/
│           └── main.ts
│
├── packages/
│   │
│   ├── shared-types/
│   ├── validation/
│   ├── config/
│   └── utils/
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed/
│
├── infrastructure/
│   ├── docker/
│   ├── nginx/
│   ├── scripts/
│   └── deployment/
│
├── docs/
│   ├── architecture/
│   ├── api/
│   ├── product/
│   └── database/
│
├── .env.example
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

# 7. Frontend Structure

```text
apps/web/
│
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── login/
│   │   └── register/
│   │
│   ├── (authenticated)/
│   │   ├── home/
│   │   ├── search/
│   │   ├── notifications/
│   │   ├── messages/
│   │   ├── groups/
│   │   ├── pages/
│   │   └── settings/
│   │
│   ├── u/
│   │   └── [username]/
│   │
│   ├── post/
│   │   └── [id]/
│   │
│   └── layout.tsx
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── navigation/
│   ├── post/
│   ├── profile/
│   ├── search/
│   ├── group/
│   └── page/
│
├── features/
│   ├── auth/
│   ├── feed/
│   ├── posts/
│   ├── profile/
│   ├── search/
│   ├── messaging/
│   └── notifications/
│
├── lib/
├── hooks/
├── services/
└── styles/
```

---

# 8. Backend Structure

```text
apps/api/src/
│
├── modules/
│   │
│   ├── auth/
│   ├── users/
│   ├── profiles/
│   │
│   ├── posts/
│   ├── comments/
│   ├── reactions/
│   ├── shares/
│   ├── saves/
│   │
│   ├── follows/
│   ├── friendships/
│   ├── blocks/
│   ├── mutes/
│   │
│   ├── feed/
│   ├── search/
│   ├── hashtags/
│   ├── trending/
│   │
│   ├── groups/
│   ├── pages/
│   │
│   ├── messaging/
│   ├── notifications/
│   │
│   ├── media/
│   ├── moderation/
│   ├── mencarii/
│   └── admin/
│
├── common/
│   ├── guards/
│   ├── interceptors/
│   ├── filters/
│   ├── decorators/
│   ├── pipes/
│   └── errors/
│
├── config/
└── main.ts
```

---

# 9. Core Product Modules

## 9.1 Auth

Fungsi:

- register,
- login,
- logout,
- refresh token,
- password reset,
- email verification,
- session management,
- optional future social login.

Security:

- password hashing,
- refresh token rotation,
- rate limiting,
- brute-force protection,
- suspicious-login detection.

---

# 10. User & Identity

Entity utama:

```text
User
Profile
Username
Verification
PrivacySettings
BlockedUser
MutedUser
```

User identity harus stabil walaupun profile terus berkembang.

Contoh:

```text
User
├── username
├── email
├── password_hash
├── status
└── created_at

Profile
├── user_id
├── display_name
├── bio
├── avatar
├── cover
├── location
└── website
```

---

# 11. Social Graph

## Follow

```text
User A ──follows──> User B
```

## Friendship

Friendship bersifat dua arah dan memerlukan mekanisme request/accept.

```text
A ──friend request──> B
B ──accept──────────> A
```

## Block

Jika A memblokir B:

- B tidak dapat berinteraksi sesuai policy,
- B tidak muncul pada discovery yang dibatasi,
- komunikasi dapat dihentikan,
- detail behavior ditentukan privacy/moderation policy.

## Mute

Mute menyembunyikan konten tertentu tanpa memutus relasi.

---

# 12. Posts

Post adalah pusat aktivitas social network.

Jenis post awal:

```text
NORMAL
SEARCHING
OFFERING
QUESTION
POLL
ANNOUNCEMENT
```

## Post lifecycle

```text
Create
  ↓
Validate
  ↓
Moderation check
  ↓
Store PostgreSQL
  ↓
Store media reference
  ↓
Index OpenSearch
  ↓
Feed distribution
  ↓
Notification if needed
```

Post dapat memiliki:

- text,
- media,
- link,
- hashtag,
- mention,
- location,
- visibility.

---

# 13. Comments

Comment harus mendukung:

- comment,
- reply,
- reaction,
- edit,
- delete,
- moderation.

Struktur:

```text
Post
└── Comment
    ├── Reply
    ├── Reply
    └── Reply
```

Untuk tahap awal, kedalaman reply sebaiknya dibatasi agar query dan UX tetap sederhana.

---

# 14. Reactions

Awal:

```text
LIKE
```

Future:

```text
LIKE
LOVE
CARE
HAHA
WOW
SAD
ANGRY
```

Reaction harus unik per user/entity.

Contoh constraint:

```text
(user_id, post_id) UNIQUE
```

---

# 15. Feed

Feed adalah salah satu komponen terpenting.

Awal:

**fan-out/query-based hybrid sederhana.**

Sumber feed:

- following,
- friends,
- groups,
- pages,
- recommendation ringan.

Urutan awal dapat menggunakan:

```text
recency
+
relationship
+
engagement
+
content quality
```

Jangan membangun AI recommendation engine besar di MVP.

---

# 16. Discovery

Discovery layer:

```text
Search
Explore
Hashtag
Trending
Recommendation
```

Discovery bukan sekadar search bar.

Tujuan:

**membantu user menemukan orang, konten, komunitas, dan peluang yang relevan.**

---

# 17. Native Mencari Search

Search internal Mencari mencari:

```text
People
Posts
Groups
Pages
Hashtags
Offerings
Projects
```

Architecture:

```text
User
 ↓
Search UI
 ↓
Search API
 ↓
Search Service
 ↓
OpenSearch
 ↓
Ranking
 ↓
Filters
 ↓
Results
```

PostgreSQL tetap menjadi source of truth.

---

# 18. Search Philosophy

Mencari tidak perlu terlihat seperti Google.

Homepage tetap social network.

Search berada sebagai utility dalam navigation.

Contoh:

```text
┌──────────────────────────────────────────────┐
│ Mencari   [ Cari di Mencari... ]   🔔  💬 👤 │
├──────────────────────────────────────────────┤
│                                              │
│                 SOCIAL FEED                  │
│                                              │
└──────────────────────────────────────────────┘
```

Ketika search diklik, baru tampil Search Hub / Overlay.

---

# 19. Platform Search

Selain search internal, user dapat memilih sumber/platform.

Contoh:

```text
Mencari
Instagram
TikTok
YouTube
LinkedIn
X
GitHub
Website
```

UX:

```text
Search
 ↓
Choose platform
 ↓
Platform-specific search UI
 ↓
Query
 ↓
Platform-specific provider
 ↓
Normalize result
 ↓
Display
```

Tujuan utama:

- intent jelas,
- query lebih fokus,
- backend lebih modular,
- provider tidak perlu dipanggil semuanya,
- sistem lebih mudah dikembangkan.

---

# 20. Platform Search Architecture

```text
search/
│
├── core/
│   ├── search.gateway
│   ├── search.types
│   ├── search-cache
│   └── search-ranking
│
├── mencari/
│   ├── controller
│   ├── service
│   ├── provider
│   └── mapper
│
├── instagram/
│   ├── controller
│   ├── service
│   ├── provider
│   └── mapper
│
├── tiktok/
├── youtube/
├── linkedin/
├── github/
└── web/
```

Provider eksternal harus diperlakukan sebagai dependency yang dapat berubah.

Jangan mengikat business logic inti langsung ke provider.

---

# 21. External Search Rules

External search harus:

- menggunakan provider/API yang legal dan sesuai terms,
- memiliki timeout,
- memiliki retry policy,
- memiliki cache,
- memiliki rate limit,
- melakukan normalization,
- menangani provider failure,
- tidak membuat satu provider menjadi single point of failure.

Jika provider tidak tersedia:

```text
Provider unavailable
 ↓
Graceful error
 ↓
Inform user
```

Bukan membuat seluruh Mencari down.

---

# 22. Entity Resolution

Future feature.

Jika ditemukan:

```text
Instagram: @andi
TikTok: @andi
LinkedIn: Andi Saputra
```

sistem boleh menganggapnya sebagai:

**possible match**

bukan otomatis:

**same person**

Entity resolution membutuhkan:

- confidence score,
- evidence,
- privacy consideration,
- manual correction,
- anti-abuse mechanism.

---

# 23. Groups

Group digunakan untuk komunitas.

Entity:

```text
Group
GroupMember
GroupRole
GroupPost
GroupModeration
```

Role awal:

```text
OWNER
ADMIN
MODERATOR
MEMBER
```

Future:

- private group,
- public group,
- invite-only,
- group chat,
- group events.

---

# 24. Pages

Pages digunakan untuk:

- brand,
- organization,
- creator,
- business,
- community/public entity.

Entity:

```text
Page
PageMember/Admin
PagePost
PageFollower
PageRole
```

Page harus berbeda secara konsep dari personal profile.

---

# 25. Messaging

MVP:

```text
1-on-1 conversation
```

Future:

```text
Group chat
Media attachment
Message reaction
Reply
Typing indicator
Read receipt
Voice/video
```

Architecture:

```text
Client
 ↓
WebSocket
 ↓
Messaging Gateway
 ↓
Message Service
 ↓
PostgreSQL
 ↓
Notification
```

Redis digunakan untuk ephemeral real-time state.

---

# 26. Notifications

Notification types:

```text
FOLLOW
FRIEND_REQUEST
FRIEND_ACCEPTED
LIKE
COMMENT
REPLY
MENTION
SHARE
GROUP_INVITE
MESSAGE
SYSTEM
```

Notification harus asynchronous bila tidak harus blocking request utama.

---

# 27. Media System

Media flow:

```text
User selects file
 ↓
Frontend requests upload permission
 ↓
Backend issues signed upload URL
 ↓
Client uploads directly to object storage
 ↓
Backend receives metadata
 ↓
Media processing job
 ↓
Thumbnail / optimization
 ↓
Database update
 ↓
Ready
```

Keuntungan:

- API tidak menjadi bottleneck upload,
- lebih scalable,
- bandwidth backend lebih kecil.

---

# 28. Moderation

Moderation adalah core platform, bukan fitur tambahan.

Minimal:

```text
Report User
Report Post
Report Comment
Report Group
Report Page
Block
Mute
Admin Review
```

Status report:

```text
OPEN
UNDER_REVIEW
ACTIONED
REJECTED
RESOLVED
```

Future:

- automated moderation,
- spam detection,
- abuse detection,
- content classification.

---

# 29. Admin

Admin panel diperlukan untuk:

- user management,
- report management,
- moderation,
- content removal,
- suspension,
- bans,
- verification,
- system health,
- audit logs.

Admin actions harus memiliki audit trail.

---

# 30. Database — Core Entities

Initial relational model:

```text
users
profiles
sessions
verification_requests

posts
post_media
post_hashtags
comments
reactions
shares
saves

follows
friendships
friend_requests
blocks
mutes

groups
group_members
group_posts

pages
page_members
page_posts
page_followers

conversations
conversation_members
messages
message_media

notifications

media
hashtags

search_index_jobs

searching
offering
projects

reports
moderation_actions
audit_logs
```

---

# 31. Database Principles

1. PostgreSQL adalah source of truth.
2. Gunakan foreign key untuk relasi penting.
3. Gunakan unique constraints untuk identity/relationship yang memang unik.
4. Gunakan index berdasarkan query nyata.
5. Jangan menambah index tanpa alasan.
6. Gunakan migration.
7. Backup otomatis.
8. Jangan menyimpan binary media di database.
9. Search index dapat dibangun ulang dari PostgreSQL.
10. Redis boleh kehilangan cache tanpa kehilangan data utama.

---

# 32. Important Database Indexes

Contoh awal:

```text
users(username)
users(email)

posts(author_id, created_at)
posts(created_at)

comments(post_id, created_at)

follows(follower_id)
follows(following_id)

friendships(user_id)
friendships(friend_id)

notifications(user_id, created_at)

messages(conversation_id, created_at)

group_members(group_id)
group_members(user_id)
```

Index final harus ditentukan setelah query pattern diketahui.

---

# 33. Data Consistency

Untuk operasi kritis:

```text
Post creation
Friend request
Friend acceptance
Reaction
Follow
Message persistence
```

gunakan transaction PostgreSQL bila beberapa perubahan harus atomic.

Untuk operasi asynchronous:

```text
Post saved
 ↓
Queue indexing
 ↓
OpenSearch updated
```

Jika indexing gagal, data PostgreSQL tetap aman dan job dapat di-retry.

---

# 34. Search Indexing

Flow:

```text
Post created
 ↓
PostgreSQL
 ↓
Event / Queue
 ↓
Search Index Worker
 ↓
OpenSearch
```

Jika OpenSearch mati:

```text
Post creation
      ↓
PostgreSQL succeeds
      ↓
Index job waits/retries
```

Search boleh mengalami temporary delay; database utama tidak boleh kehilangan data.

---

# 35. API Design

Gunakan REST untuk mayoritas API.

Contoh:

```text
POST   /auth/register
POST   /auth/login
POST   /auth/refresh

GET    /users/:username
PATCH  /profile

GET    /feed
POST   /posts
GET    /posts/:id
PATCH  /posts/:id
DELETE /posts/:id

POST   /posts/:id/reactions
DELETE /posts/:id/reactions

POST   /users/:id/follow
DELETE /users/:id/follow

POST   /friend-requests
POST   /friend-requests/:id/accept

GET    /search
GET    /search/people
GET    /search/posts

GET    /groups
POST   /groups

GET    /notifications
GET    /messages/conversations
```

API versioning:

```text
/api/v1/...
```

---

# 36. Authentication Architecture

Recommended:

```text
Access Token
+
Refresh Token
+
Server-side session record
```

Access token:

- short-lived.

Refresh token:

- longer-lived,
- rotation,
- revocation.

Password:

- never plaintext,
- strong password hashing.

Cookie/token strategy harus ditentukan berdasarkan deployment dan security model final.

---

# 37. Authorization

Gunakan:

```text
Authentication
≠
Authorization
```

Contoh:

```text
User authenticated
        ↓
Can user edit this post?
        ↓
Is user the author/admin?
        ↓
Allow / Deny
```

Permission harus dicek di backend.

Frontend hiding button bukan security mechanism.

---

# 38. Caching Strategy

Cache candidates:

```text
User profile
Popular posts
Trending hashtags
Search results
Feed fragments
Public pages
```

Jangan cache semua hal.

Cache harus memiliki:

- TTL,
- invalidation strategy,
- fallback.

---

# 39. Rate Limiting

Endpoint sensitif:

```text
/login
/register
/password-reset
/search
/messages
/posts
/comments
/reactions
/follows
```

Gunakan Redis untuk distributed rate limiting jika diperlukan.

---

# 40. Security Baseline

Wajib:

- HTTPS,
- secure headers,
- input validation,
- output sanitization,
- CSRF protection bila applicable,
- rate limiting,
- brute-force protection,
- authorization checks,
- secret management,
- audit logs,
- dependency updates,
- database backup,
- least privilege,
- file upload validation.

File upload harus memvalidasi:

- MIME type,
- extension,
- file size,
- actual file signature,
- image dimensions bila relevan.

---

# 41. Observability

Minimal:

```text
Application logs
Error tracking
Request latency
Database metrics
Redis metrics
Search metrics
Queue metrics
```

Monitoring yang harus diperhatikan:

```text
API error rate
p95 latency
database connection
Redis memory
OpenSearch health
queue backlog
storage usage
```

---

# 42. Development Environments

Gunakan:

```text
development
staging
production
```

Flow:

```text
Developer
   ↓
Development
   ↓
Pull Request
   ↓
CI
   ↓
Staging
   ↓
QA
   ↓
Production
```

Jangan mengembangkan langsung di production.

---

# 43. Git Strategy

Recommended:

```text
main
develop
feature/*
fix/*
hotfix/*
```

Setiap perubahan:

```text
feature
 ↓
Pull Request
 ↓
Review
 ↓
CI
 ↓
Merge
```

Commit harus jelas.

Contoh:

```text
feat: add follow system
fix: prevent duplicate reactions
feat: add post search
refactor: separate search providers
```

---

# 44. Testing Strategy

## Unit test

Untuk:

- business logic,
- services,
- ranking,
- permission,
- validation.

## Integration test

Untuk:

- PostgreSQL,
- Redis,
- search,
- module interaction.

## E2E test

Untuk flow:

```text
Register
Login
Create post
Like
Comment
Follow
Search
Send message
Create group
```

---

# 45. CI/CD

Pipeline:

```text
Push / Pull Request
        ↓
Install dependencies
        ↓
Lint
        ↓
Typecheck
        ↓
Unit tests
        ↓
Integration tests
        ↓
Build
        ↓
Deploy staging
        ↓
E2E
        ↓
Production
```

Production deployment harus bisa rollback.

---

# 46. MVP Scope

MVP tidak perlu semua fitur.

Prioritas:

## Phase 1 — Social Core

```text
Auth
Profile
Post
Comment
Like
Follow
Feed
Notification
```

## Phase 2 — Social Graph

```text
Friend
Search internal
Explore
Hashtag
Share
Save
Block
Mute
```

## Phase 3 — Community

```text
Groups
Pages
Group membership
Group moderation
```

## Phase 4 — Mencari DNA

```text
Searching
Offering
Matching
Location
Budget
Deadline
```

## Phase 5 — Marketplace

```text
Services
Products
Projects
Transactions
Reviews
Payments
```

---

# 47. Mencari Feature

## Searching

Konsep:

> Saya Mencari...

Data:

```text
category
title
description
budget
location
deadline
status
```

Status:

```text
OPEN
IN_PROGRESS
FOUND
CLOSED
```

Example:

```text
Saya mencari:
"Desainer logo untuk brand makanan"

Budget:
Rp1.500.000

Location:
Remote

Deadline:
14 hari
```

---

# 48. Offering

Supply-side dari Searching.

Konsep:

> Saya Menawarkan...

Contoh:

```text
Saya menawarkan:
- Jasa desain
- Jasa coding
- Fotografi
- Konsultasi
- Produk digital
```

Offering dapat menjadi fondasi marketplace.

---

# 49. Matching

Future matching engine:

```text
Searching
       │
       │ requirements
       ▼
Matching Engine
       │
       ├── location
       ├── category
       ├── budget
       ├── skill
       ├── availability
       └── relevance
       │
       ▼
Potential Matches
```

Awal cukup rule-based.

Tidak perlu AI kompleks.

---

# 50. Marketplace

Marketplace baru dibangun setelah:

- social graph,
- identity,
- trust,
- discovery,
- searching,
- offering

sudah cukup matang.

Future:

```text
Offering
 ↓
Project
 ↓
Proposal
 ↓
Agreement
 ↓
Payment
 ↓
Delivery
 ↓
Review
```

---

# 51. Search UI Flow

Homepage:

```text
User enters Mencari
        ↓
Social Home
        ↓
Navigation search
        ↓
Search Overlay
        ↓
┌───────────────────────────────┐
│ Search Mencari                 │
│                               │
│ Mencari     Instagram         │
│ TikTok      YouTube            │
│ LinkedIn    X                  │
│ GitHub      Website            │
└───────────────────────────────┘
```

Jika pilih Instagram:

```text
Instagram
 ↓
Cari username / nama
 ↓
Results
```

Jika pilih Mencari:

```text
Mencari Search
 ↓
People / Posts / Groups / Pages
 ↓
Results
```

---

# 52. Homepage UX

Homepage bukan search engine.

Struktur:

```text
┌───────────────────────────────────────────────┐
│ Logo | Search | Home | Explore | 🔔 | 💬 | 👤 │
├──────────────┬──────────────────┬─────────────┤
│              │                  │             │
│ Profile /    │ Feed             │ Suggestions │
│ shortcuts    │                  │ Trending    │
│              │ Post composer    │             │
│              │                  │             │
│              │ Posts            │             │
└──────────────┴──────────────────┴─────────────┘
```

Search hanya salah satu utility.

---

# 53. Product Navigation

Potential navigation:

```text
Home
Explore
Search
Groups
Pages
Messages
Notifications
Profile
```

Desktop dan mobile dapat memiliki navigation yang berbeda.

---

# 54. Responsive Strategy

Target:

- desktop,
- tablet,
- mobile.

Mobile bukan sekadar desktop yang diperkecil.

Mobile navigation dapat:

```text
Home
Explore
Create
Notifications
Profile
```

Search dapat dibuka melalui navigation/header.

---

# 55. Performance Strategy

Target prinsip:

- fast initial load,
- minimal JavaScript,
- optimized images,
- lazy loading,
- pagination/infinite scrolling yang terkendali,
- caching,
- database indexing.

Feed tidak boleh mengambil ribuan post sekaligus.

Gunakan pagination/cursor pagination.

---

# 56. Pagination

Untuk feed, posts, comments, messages:

**Cursor pagination** lebih disukai untuk data yang terus berubah.

Contoh:

```text
GET /feed?cursor=abc&limit=20
```

Bukan mengandalkan offset besar:

```text
?page=5000
```

---

# 57. Feed Architecture Evolution

## Stage 1

Query database sederhana.

## Stage 2

Redis caching.

## Stage 3

Precomputed feed / fan-out.

## Stage 4

Recommendation ranking.

## Stage 5

Personalized feed infrastructure.

Jangan membangun stage 5 sebelum diperlukan.

---

# 58. Search Architecture Evolution

## MVP

```text
PostgreSQL
+
basic search
```

## V2

```text
OpenSearch
Autocomplete
Typo tolerance
```

## V3

```text
External platform search
Social discovery
```

## V4

```text
Entity resolution
Semantic search
Personalized ranking
Recommendation
Trending
```

---

# 59. External Provider Abstraction

Provider interface harus seragam.

Contoh konsep:

```text
SearchProvider

search(query, options)
getProfile(identifier)
normalize(result)
```

Kemudian:

```text
InstagramProvider
TikTokProvider
YouTubeProvider
LinkedInProvider
GitHubProvider
WebProvider
```

Business logic tidak perlu tahu detail provider.

---

# 60. Failure Handling

Setiap external dependency harus dianggap bisa gagal.

Contoh:

```text
Mencari API
 ├── PostgreSQL → critical
 ├── Redis → recoverable
 ├── OpenSearch → recoverable
 ├── Storage → important
 └── External Search Provider → optional
```

External search failure tidak boleh membuat social network ikut mati.

---

# 61. Infrastructure Scaling

## Small scale

```text
1 web deployment
1 API deployment
1 PostgreSQL
1 Redis
1 OpenSearch
1 object storage
```

## Growing scale

```text
Multiple web instances
Multiple API instances
Managed PostgreSQL
Redis cluster/replica if needed
OpenSearch cluster
Dedicated workers
CDN
```

## Large scale

Baru evaluasi:

```text
load balancer
read replicas
partitioning
dedicated services
service extraction
regional deployment
advanced queue infrastructure
```

---

# 62. Database Scaling

Urutan:

```text
Optimize query
 ↓
Add correct indexes
 ↓
Connection pooling
 ↓
Caching
 ↓
Read replica
 ↓
Partitioning
 ↓
Sharding (only if truly required)
```

Jangan langsung sharding.

---

# 63. Redis Scaling

Awal:

```text
Single Redis
```

Kemudian:

```text
Replica
Sentinel / managed Redis
```

Skala besar:

```text
Redis Cluster
```

Hanya bila diperlukan.

---

# 64. OpenSearch Scaling

Awal:

```text
Single node / managed small cluster
```

Kemudian:

```text
Dedicated nodes
Replica shards
Multiple nodes
```

Search index harus bisa di-rebuild dari PostgreSQL.

---

# 65. Backup & Disaster Recovery

Minimal:

- automated PostgreSQL backup,
- point-in-time recovery jika tersedia,
- object storage versioning/backup strategy,
- database restore test,
- backup retention policy.

Backup yang belum pernah diuji restore belum dapat dianggap aman.

---

# 66. Secrets

Jangan commit:

```text
DATABASE_URL
JWT_SECRET
REDIS_PASSWORD
API_KEYS
STORAGE_SECRET
```

Gunakan environment/secrets management.

Repository hanya memiliki:

```text
.env.example
```

---

# 67. Configuration

Configuration dipisahkan dari code.

Contoh:

```text
APP_ENV
APP_URL

DATABASE_URL
REDIS_URL
OPENSEARCH_URL

STORAGE_ENDPOINT
STORAGE_BUCKET
STORAGE_ACCESS_KEY
STORAGE_SECRET_KEY

JWT_SECRET
JWT_EXPIRATION

EXTERNAL_SEARCH_API_KEY
```

---

# 68. Domain Events

Internal event dapat digunakan untuk decoupling.

Contoh:

```text
PostCreated
CommentCreated
UserFollowed
FriendAccepted
MessageCreated
ReportCreated
```

Event dapat memicu:

```text
notification
search indexing
analytics
recommendation
```

Tidak semua harus memakai event bus kompleks di MVP.

---

# 69. Analytics

Data yang penting:

```text
DAU
MAU
retention
posts/day
comments/day
reactions/day
searches/day
search success rate
follow rate
friend acceptance
group creation
message activity
Mencari post usage
Offering usage
```

Search-specific:

```text
query volume
zero-result rate
click-through rate
provider success
latency
```

---

# 70. Product Metrics

North Star metric dapat diarahkan ke:

**Successful meaningful connections/discoveries**

Contoh indikator:

- user menemukan orang yang dicari,
- user menemukan komunitas relevan,
- user menemukan jawaban,
- user menemukan offering,
- user berhasil menemukan kebutuhan melalui Mencari.

Jangan hanya mengejar jumlah page views.

---

# 71. SEO

Public pages yang berpotensi SEO:

```text
Profile
Public Page
Public Group
Public Post
Public Mencari listing
```

Private content harus tidak terindeks.

Gunakan:

- metadata,
- canonical,
- sitemap,
- robots,
- structured data jika relevan.

---

# 72. Privacy

User harus memiliki kontrol atas:

- profile visibility,
- post visibility,
- messaging,
- follow,
- friend requests,
- search discoverability.

Potential visibility:

```text
PUBLIC
FRIENDS
FOLLOWERS
PRIVATE
```

Detail final ditentukan pada privacy specification.

---

# 73. Moderation & Trust

Trust system future:

```text
Account age
Verification
Activity history
Reports
Community reputation
Successful transactions
Reviews
```

Trust tidak boleh hanya berdasarkan follower count.

---

# 74. Recommended Development Order

## Step 1 — Repository

```text
Monorepo
Next.js
NestJS
Prisma
PostgreSQL
Docker
```

## Step 2 — Auth

```text
Register
Login
Logout
Refresh
Session
```

## Step 3 — Identity

```text
User
Profile
Username
Avatar
```

## Step 4 — Social Graph

```text
Follow
Friend
Block
Mute
```

## Step 5 — Posts

```text
Create
Read
Edit
Delete
```

## Step 6 — Engagement

```text
Like
Comment
Reply
Share
Save
```

## Step 7 — Feed

```text
Home feed
Pagination
Basic ranking
```

## Step 8 — Notifications

```text
Follow
Like
Comment
Friend
Mention
```

## Step 9 — Search

```text
People
Posts
Groups
Pages
Hashtags
```

## Step 10 — Groups / Pages

```text
Create
Join
Post
Moderate
```

## Step 11 — Messaging

```text
Conversation
Message
WebSocket
```

## Step 12 — Mencari

```text
Searching
Offering
Matching
```

## Step 13 — Platform Search

```text
Instagram
TikTok
YouTube
LinkedIn
...
```

## Step 14 — Marketplace

```text
Projects
Transactions
Payments
Reviews
```

---

# 75. MVP Definition of Done

MVP dianggap usable jika user dapat:

```text
Register
 ↓
Create profile
 ↓
Find people
 ↓
Follow / friend
 ↓
Create post
 ↓
See feed
 ↓
Like
 ↓
Comment
 ↓
Receive notification
 ↓
Search Mencari
 ↓
Join group
 ↓
Send message
```

MVP belum wajib memiliki:

- marketplace payment,
- complex recommendation AI,
- entity resolution,
- full external search,
- video call,
- microservices,
- Kubernetes.

---

# 76. Engineering Principles

## Principle 1

**PostgreSQL = source of truth.**

## Principle 2

**Redis = cache/state, bukan primary database.**

## Principle 3

**OpenSearch = search index, bukan primary database.**

## Principle 4

**Object storage = binary media.**

## Principle 5

**Queue = asynchronous work.**

## Principle 6

**Frontend tidak dipercaya untuk security.**

## Principle 7

**External providers dapat gagal.**

## Principle 8

**Modular monolith sebelum microservices.**

## Principle 9

**Optimize after measuring.**

## Principle 10

**Build the simplest system that can evolve.**

---

# 77. Final Architecture

```text
                           USER
                            │
                            ▼
                       CLOUDFLARE
                            │
                            ▼
                      NEXT.JS / WEB
                            │
                 REST + WebSocket
                            │
                            ▼
                     NESTJS BACKEND
                            │
        ┌───────────────────┼────────────────────┐
        │                   │                    │
        ▼                   ▼                    ▼
   PostgreSQL             Redis             OpenSearch
   SOURCE OF TRUTH        CACHE              SEARCH
        │                   │                    │
        │                   │                    │
        └──────────────┬────┴────────────┬───────┘
                       │                 │
                       ▼                 ▼
                  BullMQ Queue       External Search
                       │              Providers
                       ▼
                    Workers
                       │
                       ▼
                 Object Storage
```

---

# 78. Long-Term Product Architecture

```text
                         MENCARI.ONLINE
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
       SOCIAL              DISCOVERY            IDENTITY
          │                    │                    │
          │                    │                    │
     ┌────┼────┐         ┌─────┼─────┐        ┌────┼────┐
     │    │    │         │     │     │        │    │    │
    Feed Post Community Search Explore Trend Profile Follow
     │    │    │         │     │     │        │    │
     └────┴────┘         └─────┴─────┘        └────┘
          │                    │
          └──────────┬─────────┘
                     ▼
                MENCARI DNA
                     │
              ┌──────┴──────┐
              │             │
          SEARCHING       OFFERING
              │             │
              └──────┬──────┘
                     ▼
                  MATCHING
                     │
                     ▼
                MARKETPLACE
                     │
          ┌──────────┼──────────┐
          │          │          │
       Services   Projects    Products
          │          │          │
          └──────────┼──────────┘
                     ▼
                 TRANSACTION
                     │
                     ▼
                  TRUST
               Reviews / Rating
```

---

# 79. Technology Decision Summary

| Area | Decision |
|---|---|
| Language | TypeScript |
| Frontend | Next.js + React |
| Styling | Tailwind CSS |
| Backend | NestJS |
| API | REST |
| Real-time | WebSocket |
| Main Database | PostgreSQL |
| ORM | Prisma |
| Cache | Redis |
| Search | OpenSearch |
| Queue | BullMQ |
| Storage | S3-compatible Object Storage |
| CDN / Edge | Cloudflare |
| Container | Docker |
| Architecture | Modular Monolith |
| Deployment | Cloud / VPS / Managed Services |
| Scaling | Horizontal scaling when needed |
| Search Model | Native Mencari Search + Platform-specific Search |
| Product Identity | Social Network |
| Differentiator | Discovery + Mencari |
| Long-term | Social + Community + Opportunity + Marketplace |

---

# 80. Things Explicitly NOT to Build Too Early

Jangan memulai dengan:

```text
Microservices
Kubernetes
Kafka
Graph database
Complex AI recommendation
AI semantic search
Multi-region infrastructure
Blockchain
Advanced payment architecture
Massive event streaming
```

Semua teknologi tersebut mungkin berguna di masa depan, tetapi hanya jika ada kebutuhan nyata.

Prioritas:

```text
Product-market fit
        ↓
Reliable core
        ↓
Good UX
        ↓
Correct data model
        ↓
Search/discovery
        ↓
Scale
        ↓
Advanced infrastructure
```

---

# 81. Immediate Next Planning Tasks

Setelah dokumen ini, pekerjaan engineering berikutnya:

1. Finalize product requirements.
2. Finalize MVP feature list.
3. Design PostgreSQL schema.
4. Define entity relationships.
5. Define API contract.
6. Define authentication/session strategy.
7. Define frontend routes.
8. Define component system.
9. Create monorepo.
10. Create Docker development environment.
11. Configure PostgreSQL.
12. Configure Prisma.
13. Configure Redis.
14. Build Auth module.
15. Build User/Profile module.
16. Build Post module.
17. Build Social Graph.
18. Build Feed.
19. Build Notification.
20. Build Search.
21. Build Community.
22. Build Messaging.
23. Build Mencari.
24. Add external platform search.
25. Add marketplace features only after the social/discovery foundation is stable.

---

# 82. Core Product Rule

**Mencari.online bukan search engine yang kebetulan punya social feature.**

Mencari.online adalah:

> **Social network yang dibangun dengan discovery sebagai salah satu kemampuan inti, dan “Mencari” sebagai DNA yang nantinya dapat berkembang menjadi opportunity/marketplace ecosystem.**

Karena itu:

```text
Homepage
    ↓
SOCIAL

Navigation
    ↓
DISCOVERY

Search
    ↓
NATIVE MENCARI + PLATFORM SEARCH

Mencari
    ↓
SEARCHING + OFFERING

Future
    ↓
MATCHING + MARKETPLACE
```

Ini menjadi prinsip utama yang harus menjaga keputusan UX, database, backend, dan infrastructure selama development.
