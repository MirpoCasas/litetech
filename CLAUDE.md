# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LiteTech Challenge - A tech blog application with separate frontend (Next.js 16) and backend (NestJS) applications.

## Development Commands

### Backend (NestJS) - runs on port 3000
```bash
cd backend
npm install
npx prisma migrate dev    # Run database migrations
npm run start:dev         # Development server with hot reload
npm run build             # Production build
npm run lint              # ESLint with auto-fix
npm run test              # Unit tests
npm run test:watch        # Watch mode
npm run test:e2e          # E2E tests
```

### Frontend (Next.js) - runs on port 3001
```bash
cd frontend
npm install
npm run dev               # Development server (http://localhost:3001)
npm run build             # Production build
npm run lint              # ESLint
```

## Architecture

### Monorepo Structure
- `backend/` - NestJS REST API with Prisma ORM and SQLite
- `frontend/` - Next.js 16 with React 19 and Tailwind CSS v4

### Backend Architecture
- **Database**: SQLite via Prisma ORM (`backend/prisma/schema.prisma`)
- **Image Storage**: Local filesystem (`backend/uploads/`) with S3 fallback
- **Global API Prefix**: All routes under `/api`
- **CORS**: Configured for frontend at `http://localhost:3001`

**Modules**:
- `PostsModule` - Handles related posts CRUD (`/api/posts/related`)
- `PrismaModule` - Database connection service
- `UploadModule` - File upload handling (local/S3)

### Frontend Architecture
- **External API**: LiteTech API (`https://lite-tech-api.litebox.ai/api`) for main blog posts
- **Internal API**: Backend at `http://localhost:3000/api` for user-created related posts
- **API Client**: `src/lib/api.ts` - Typed functions for all API calls

**Pages**:
- `/` - Main page displaying 9 articles from LiteTech API + related posts section
- `/post/[id]` - Article detail page with markdown content

### Data Flow
1. Main posts fetched from external LiteTech API (read-only)
2. User-created "related posts" stored in local SQLite via backend API
3. Image uploads go to `backend/uploads/` and are served statically at `/uploads`

## Design System

Based on Figma design (`Challenge.fig`). Key specifications:
- **Font**: Space Grotesk
- **Colors**: Black (#000), White (#FFF), Green (#D8F34E), Purple (#9C73F7)
- **Modal Style**: Green background, 3px black border, `box-shadow: 10px 10px 0px #000`
- **Tags**: `border-radius: 35px`, green background
- **Buttons/Inputs**: `border-radius: 8px`

## Environment Variables

### Backend (`backend/.env`)
```
DATABASE_URL="file:./dev.db"
FRONTEND_URL=http://localhost:3001
AWS_ACCESS_KEY_ID=...        # Optional, for S3
AWS_SECRET_ACCESS_KEY=...    # Optional, for S3
AWS_S3_BUCKET=...            # Optional, for S3
AWS_REGION=us-east-1         # Optional, for S3
```

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_LITETECH_API=https://lite-tech-api.litebox.ai/api
NEXT_PUBLIC_BACKEND_API=http://localhost:3000/api
```

## API Endpoints

### Backend (Custom)
- `GET /api/posts/related` - List user-created posts
- `POST /api/posts/related` - Create post (multipart: `image` file + `title` field, max 5MB)

### External (LiteTech)
- `GET /posts` - List articles
- `GET /posts/{id}` - Article detail
