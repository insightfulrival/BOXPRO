# BOXPRO - Modular Containers Website Design

## Overview

BOXPRO is a bilingual (RO/EN) website for selling modular containers. The primary conversion goal is getting users to call. The site showcases completed projects with prices in a gallery, and an admin panel allows 2-3 team members to manage photos and projects.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Server Components)
- **Styling:** Tailwind CSS v4
- **Animations:** Motion (framer-motion) - scroll reveals, 3D tilt, page transitions
- **Backend:** Supabase (Auth + PostgreSQL + Storage)
- **i18n:** next-intl (Romanian + English)
- **Deployment:** Vercel
- **Language:** TypeScript

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Landing page - conversion focused |
| `/gallery` | Portfolio of completed projects |
| `/admin` | Admin login |
| `/admin/photos` | Photo management |
| `/admin/projects` | Project management |

## Landing Page Sections

1. **Hero** - Full-screen image/video, animated text reveal, CTA "Suna acum" with phone number
2. **De ce BOXPRO** - 3-4 benefits with animated icons (scroll reveal)
3. **Ce oferim** - Categories: locuinte, birouri, depozite, custom (with images)
4. **Proiecte recente** - Carousel with 4-6 featured projects from gallery
5. **Cum functioneaza** - 3 steps: Suni → Discutam → Livram (animated)
6. **Testimoniale** - Optional, manageable from admin
7. **Footer** - Phone, email, social media, location

## Gallery Page

- Responsive grid: 1 col mobile, 2 tablet, 3 desktop
- Click project → modal with multiple photos + price + description
- Filter by category
- Layout animation on filter change

## Admin Panel

- Supabase Auth (email/password) for 2-3 team members
- Add/edit/delete projects
- Upload photos, assign placement (hero/gallery/section)
- Reorder with drag or order_index

## Database Schema

### projects table
- `id` uuid PK
- `title_ro` text
- `title_en` text
- `description_ro` text
- `description_en` text
- `category` text ('locuinta' | 'birou' | 'depozit' | 'custom')
- `price` numeric
- `currency` text ('EUR' | 'RON')
- `featured` boolean (show on landing)
- `order_index` integer
- `created_at` timestamptz
- `updated_at` timestamptz

### photos table
- `id` uuid PK
- `project_id` uuid FK → projects (nullable for standalone photos)
- `url` text (Supabase Storage URL)
- `alt_ro` text
- `alt_en` text
- `placement` text ('hero' | 'gallery' | 'section_offers' | 'project')
- `order_index` integer
- `created_at` timestamptz

### Storage
- `photos` bucket (public read, authenticated write)

### RLS Policies
- SELECT on projects/photos: public
- INSERT/UPDATE/DELETE on projects/photos: authenticated users only

## Visual Design

### Colors
- Primary: Black (#0A0A0A) + Industrial Yellow (#F5A623)
- Accent: White (#FFFFFF) + Light Gray (#F5F5F5)
- Vibe: industrial, bold, professional

### Typography
- Headings: Space Grotesk (bold, geometric)
- Body: Inter (clean, readable on mobile)

### Animations (Motion)
1. Hero text stagger reveal + parallax
2. Scroll reveal (fade-up) on each section
3. 3D tilt on project cards (desktop hover)
4. Smooth page transitions
5. Layout animation on gallery filter
6. Price counter animation
7. Pulse on CTA phone button

### Mobile-First
- Touch swipe on gallery
- Sticky "Suna" button in mobile footer
- Hamburger menu with smooth animation
- next/image with lazy loading + blur placeholder
- Target: most users on phone
