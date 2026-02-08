# LiteTech Challenge - Progress Log

## Project Overview
A tech blog application with frontend (Next.js) and backend (NestJS) for the LiteTech challenge.

---

## Completed Tasks

### 1. Backend Setup (NestJS)
- **Location:** `backend/`
- **Database:** SQLite (Prisma ORM) - `prisma/dev.db`
- **Image Storage:** Local filesystem with S3 fallback
- **Endpoints:**
  - `GET /api/posts/related` - Fetch user-created posts
  - `POST /api/posts/related` - Create post with image upload

**Key Files:**
- `src/posts/posts.controller.ts` - API routes
- `src/posts/posts.service.ts` - Business logic
- `src/upload/upload.service.ts` - Image upload (local/S3)
- `prisma/schema.prisma` - Database schema

### 2. Frontend Setup (Next.js 16)
- **Location:** `frontend/`
- **Styling:** Tailwind CSS with custom design system
- **Font:** Space Grotesk (from Google Fonts)

**Pages:**
- `/` - Main page with 9 article cards from LiteTech API
- `/post/[id]` - Article detail with static markdown content

**Components:**
- `Header.tsx` - Logo + "New post" button
- `Footer.tsx` - Purple footer with social icons
- `PostCard.tsx` - Article card with image, tag, title, read time
- `NewPostModal.tsx` - Green modal with image upload + title input
- `RelatedPosts.tsx` - Grid of 3 user-created posts
- `RelatedPostCard.tsx` - Simple card for related posts

### 3. Design System (from Figma)
**Colors:**
| Name | Hex | Usage |
|------|-----|-------|
| Black | `#000000` | Text, buttons |
| White | `#FFFFFF` | Backgrounds |
| Green | `#D8F34E` | Tags, modal background |
| Purple | `#9C73F7` | Footer, accents |
| Gray Light | `#8C8C8C` | Icons |
| Gray Dark | `#595959` | Secondary text |
| Red | `#FF2F2F` | Error states |

**Typography:**
- Font: Space Grotesk
- Card title: 18px, weight 700
- Tag: 14px, weight 600
- Body: 16px, weight 400

**Components:**
- Tags: `border-radius: 35px`, green background
- Buttons: `border-radius: 8px`, black background
- Modal: Green BG, 3px black border, `box-shadow: 10px 10px 0px #000`
- Inputs: `border-radius: 8px`, black border

---

## In Progress

### 6. Pixel-Perfect Styling
- Base design system implemented from Figma CSS export
- Need to fine-tune spacing, hover states, animations

---

## Pending

### 7. Responsive Design
- Desktop: 1440px+ (current implementation)
- Tablet: 768px - 1439px
- Mobile: < 768px

---

## How to Run

### Backend
```bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
# Runs on http://localhost:3000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3001
```

---

## Environment Variables

### Backend (`backend/.env`)
```
DATABASE_URL="file:./dev.db"
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_S3_BUCKET=your_bucket_name
AWS_REGION=us-east-1
FRONTEND_URL=http://localhost:3001
```

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_LITETECH_API=https://lite-tech-api.litebox.ai/api
NEXT_PUBLIC_BACKEND_API=http://localhost:3000/api
```

---

## API Integration

### External API (LiteTech)
- `GET /posts` - List of articles for main page
- `GET /posts/{id}` - Single article details

### Custom API (Our Backend)
- `GET /api/posts/related` - User-created posts
- `POST /api/posts/related` - Create new post (multipart form: image + title)

---

## Files Structure

```
challenge/
├── backend/
│   ├── src/
│   │   ├── posts/          # Posts module
│   │   ├── prisma/         # Database service
│   │   ├── upload/         # S3/local upload service
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── dev.db          # SQLite database
│   ├── uploads/            # Local image storage
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx           # Main page
│   │   │   ├── post/[id]/page.tsx # Detail page
│   │   │   ├── layout.tsx
│   │   │   └── globals.css        # Design system
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── PostCard.tsx
│   │   │   ├── NewPostModal.tsx
│   │   │   ├── RelatedPosts.tsx
│   │   │   └── RelatedPostCard.tsx
│   │   └── lib/
│   │       └── api.ts             # API client
│   └── package.json
│
├── Challenge.fig           # Figma design file
├── design.txt              # Exported CSS from Figma
└── progress.md             # This file
```

---

## Next Steps

1. Fine-tune pixel-perfect styling based on Figma screenshots
2. Implement responsive breakpoints (tablet/mobile)
3. Add hover animations and transitions
4. Deploy to Vercel (frontend) and Railway (backend)
5. Push to GitLab repositories:
   - Frontend: `https://gitlab.com/litebox/internal/challenges/dev-Martin-Casas-frontend`
   - Backend: `https://gitlab.com/litebox/internal/challenges/dev-Martin-Casas-backend`
