# BOXPRO Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a bilingual (RO/EN) modular containers sales website with landing page, gallery, and admin panel.

**Architecture:** Next.js 15 App Router with Server Components for public pages, Client Components for interactive elements. Supabase for auth, database, and image storage. Motion for animations. next-intl for i18n with [locale] route prefix.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Motion (framer-motion), Supabase, next-intl

**Team:** 2 agents working in parallel
- **Agent 1 (frontend):** Project scaffold, layout, landing page, gallery, animations
- **Agent 2 (backend):** Supabase setup, admin panel, auth, CRUD operations

---

## Phase 1: Project Setup (Sequential - Agent 1)

### Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`

**Step 1: Create Next.js app**

Run:
```bash
cd /home/catalin/Desktop/BOXPRO
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

**Step 2: Install dependencies**

Run:
```bash
npm install motion @supabase/supabase-js @supabase/ssr next-intl
npm install -D @types/node
```

**Step 3: Verify dev server starts**

Run: `npm run dev`
Expected: Server running on localhost:3000

---

### Task 2: Configure i18n with next-intl

**Files:**
- Create: `src/i18n/request.ts`
- Create: `src/i18n/routing.ts`
- Create: `src/messages/ro.json`
- Create: `src/messages/en.json`
- Create: `src/middleware.ts`
- Modify: `next.config.ts`
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/page.tsx`
- Remove: `src/app/layout.tsx`, `src/app/page.tsx` (replaced by [locale] versions)

**Step 1: Create routing config**

```typescript
// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ro', 'en'],
  defaultLocale: 'ro'
});
```

**Step 2: Create request config**

```typescript
// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
```

**Step 3: Create middleware**

```typescript
// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(ro|en)/:path*']
};
```

**Step 4: Create initial message files**

```json
// src/messages/ro.json
{
  "nav": {
    "home": "Acasa",
    "gallery": "Galerie",
    "contact": "Contact",
    "callNow": "Suna Acum"
  },
  "hero": {
    "title": "Containere Modulare",
    "subtitle": "Construim viitorul, modul cu modul",
    "cta": "Suna Acum"
  },
  "whyUs": {
    "title": "De ce BOXPRO?",
    "speed": "Livrare Rapida",
    "speedDesc": "Proiectul tau gata in saptamani, nu luni",
    "quality": "Calitate Premium",
    "qualityDesc": "Materiale certificate si finisaje de top",
    "custom": "100% Personalizabil",
    "customDesc": "Adaptat exact nevoilor tale",
    "price": "Pret Competitiv",
    "priceDesc": "Solutii accesibile fara compromisuri"
  },
  "offers": {
    "title": "Ce Oferim",
    "housing": "Locuinte",
    "offices": "Birouri",
    "storage": "Depozite",
    "custom": "Custom"
  },
  "recentProjects": {
    "title": "Proiecte Recente",
    "viewAll": "Vezi Toate Proiectele",
    "from": "de la"
  },
  "howItWorks": {
    "title": "Cum Functioneaza",
    "step1": "Suni",
    "step1Desc": "Ne contactezi si discutam despre nevoile tale",
    "step2": "Discutam",
    "step2Desc": "Cream solutia perfecta pentru tine",
    "step3": "Livram",
    "step3Desc": "Montam si predăm la cheie"
  },
  "footer": {
    "phone": "Telefon",
    "email": "Email",
    "address": "Adresa",
    "rights": "Toate drepturile rezervate"
  },
  "gallery": {
    "title": "Galeria Noastra",
    "all": "Toate",
    "housing": "Locuinte",
    "offices": "Birouri",
    "storage": "Depozite",
    "custom": "Custom",
    "price": "Pret"
  }
}
```

```json
// src/messages/en.json
{
  "nav": {
    "home": "Home",
    "gallery": "Gallery",
    "contact": "Contact",
    "callNow": "Call Now"
  },
  "hero": {
    "title": "Modular Containers",
    "subtitle": "Building the future, module by module",
    "cta": "Call Now"
  },
  "whyUs": {
    "title": "Why BOXPRO?",
    "speed": "Fast Delivery",
    "speedDesc": "Your project ready in weeks, not months",
    "quality": "Premium Quality",
    "qualityDesc": "Certified materials and top finishes",
    "custom": "100% Customizable",
    "customDesc": "Tailored exactly to your needs",
    "price": "Competitive Price",
    "priceDesc": "Affordable solutions without compromise"
  },
  "offers": {
    "title": "What We Offer",
    "housing": "Housing",
    "offices": "Offices",
    "storage": "Storage",
    "custom": "Custom"
  },
  "recentProjects": {
    "title": "Recent Projects",
    "viewAll": "View All Projects",
    "from": "from"
  },
  "howItWorks": {
    "title": "How It Works",
    "step1": "Call",
    "step1Desc": "Contact us and discuss your needs",
    "step2": "Discuss",
    "step2Desc": "We create the perfect solution for you",
    "step3": "Deliver",
    "step3Desc": "We install and hand over turnkey"
  },
  "footer": {
    "phone": "Phone",
    "email": "Email",
    "address": "Address",
    "rights": "All rights reserved"
  },
  "gallery": {
    "title": "Our Gallery",
    "all": "All",
    "housing": "Housing",
    "offices": "Offices",
    "storage": "Storage",
    "custom": "Custom",
    "price": "Price"
  }
}
```

**Step 5: Update next.config.ts**

```typescript
// next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
```

**Step 6: Create root locale layout**

```typescript
// src/app/[locale]/layout.tsx
import type { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Space_Grotesk } from 'next/font/google';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'BOXPRO - Containere Modulare',
  description: 'Containere modulare de calitate premium. Locuinte, birouri, depozite - personalizate pentru tine.',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#0A0A0A] text-white font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Step 7: Create placeholder page**

```typescript
// src/app/[locale]/page.tsx
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('hero');
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-5xl font-bold font-heading">{t('title')}</h1>
    </main>
  );
}
```

**Step 8: Verify i18n works**

Run: `npm run dev`
Check: `localhost:3000/ro` shows "Containere Modulare", `localhost:3000/en` shows "Modular Containers"

---

### Task 3: Setup Supabase client and env

**Files:**
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/middleware.ts`
- Create: `.env.local.example`
- Modify: `src/middleware.ts` (add Supabase middleware)

**Step 1: Create .env.local.example**

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Step 2: Create browser client**

```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

**Step 3: Create server client**

```typescript
// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component - ignore
          }
        },
      },
    }
  );
}
```

**Step 4: Create Supabase middleware helper**

```typescript
// src/lib/supabase/middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  await supabase.auth.getUser();
  return supabaseResponse;
}
```

**Step 5: Update middleware to combine i18n + Supabase**

```typescript
// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { updateSession } from './lib/supabase/middleware';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Update Supabase session
  await updateSession(request);
  // Handle i18n
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(ro|en)/:path*']
};
```

---

### Task 4: Create Supabase database schema

**Files:**
- Create: `supabase/schema.sql`

**Step 1: Write SQL migration**

```sql
-- supabase/schema.sql
-- Run this in Supabase SQL Editor

-- Projects table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  title_ro text not null,
  title_en text not null,
  description_ro text default '',
  description_en text default '',
  category text not null check (category in ('locuinta', 'birou', 'depozit', 'custom')),
  price numeric,
  currency text default 'EUR' check (currency in ('EUR', 'RON')),
  featured boolean default false,
  order_index integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Photos table
create table public.photos (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  url text not null,
  alt_ro text default '',
  alt_en text default '',
  placement text not null check (placement in ('hero', 'gallery', 'section_offers', 'project')),
  order_index integer default 0,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.projects enable row level security;
alter table public.photos enable row level security;

-- Public read
create policy "Projects are publicly readable" on public.projects
  for select using (true);

create policy "Photos are publicly readable" on public.photos
  for select using (true);

-- Authenticated write
create policy "Authenticated users can insert projects" on public.projects
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update projects" on public.projects
  for update using (auth.role() = 'authenticated');

create policy "Authenticated users can delete projects" on public.projects
  for delete using (auth.role() = 'authenticated');

create policy "Authenticated users can insert photos" on public.photos
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update photos" on public.photos
  for update using (auth.role() = 'authenticated');

create policy "Authenticated users can delete photos" on public.photos
  for delete using (auth.role() = 'authenticated');

-- Storage bucket
insert into storage.buckets (id, name, public)
  values ('photos', 'photos', true);

create policy "Photos are publicly accessible" on storage.objects
  for select using (bucket_id = 'photos');

create policy "Authenticated users can upload photos" on storage.objects
  for insert with check (bucket_id = 'photos' and auth.role() = 'authenticated');

create policy "Authenticated users can delete photos" on storage.objects
  for delete using (bucket_id = 'photos' and auth.role() = 'authenticated');

-- Updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on public.projects
  for each row execute function public.handle_updated_at();
```

---

## Phase 2: Frontend Public Pages (Agent 1) + Admin Backend (Agent 2) — PARALLEL

### Task 5 (Agent 1): Tailwind config + global styles + shared components

**Files:**
- Modify: `src/app/globals.css`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/SectionWrapper.tsx`
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/MobileCallButton.tsx`

**Step 1: Setup globals.css with Tailwind v4 and custom properties**

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-heading: var(--font-space-grotesk), system-ui, sans-serif;

  --color-primary: #F5A623;
  --color-primary-dark: #D4901E;
  --color-dark: #0A0A0A;
  --color-dark-lighter: #1A1A1A;
  --color-gray-light: #F5F5F5;
  --color-gray-medium: #888888;
}
```

**Step 2: Create Button component**

```typescript
// src/components/ui/Button.tsx
'use client';

import { motion } from 'motion/react';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'outline';
  className?: string;
  onClick?: () => void;
}

export function Button({ children, href, variant = 'primary', className = '', onClick }: ButtonProps) {
  const base = 'inline-flex items-center justify-center px-6 py-3 rounded-lg font-bold text-lg transition-colors';
  const variants = {
    primary: 'bg-primary text-dark hover:bg-primary-dark',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-dark',
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </Component>
  );
}
```

**Step 3: Create SectionWrapper with scroll animation**

```typescript
// src/components/ui/SectionWrapper.tsx
'use client';

import { motion } from 'motion/react';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className = '', id }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`px-4 py-16 md:py-24 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </motion.section>
  );
}
```

**Step 4: Create Navbar**

```typescript
// src/components/layout/Navbar.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const switchLocale = () => {
    const newLocale = locale === 'ro' ? 'en' : 'ro';
    router.replace(pathname, { locale: newLocale });
  };

  const links = [
    { href: '/', label: t('home') },
    { href: '/gallery', label: t('gallery') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-heading font-bold text-primary">
          BOXPRO
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-white hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
          <button onClick={switchLocale} className="text-sm text-gray-medium hover:text-white transition-colors">
            {locale === 'ro' ? 'EN' : 'RO'}
          </button>
          <a href="tel:+40700000000" className="bg-primary text-dark px-4 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors">
            {t('callNow')}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
          <div className="w-6 flex flex-col gap-1.5">
            <motion.span animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }} className="block h-0.5 w-full bg-white" />
            <motion.span animate={{ opacity: isOpen ? 0 : 1 }} className="block h-0.5 w-full bg-white" />
            <motion.span animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }} className="block h-0.5 w-full bg-white" />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-white text-lg">
                  {link.label}
                </Link>
              ))}
              <button onClick={switchLocale} className="text-gray-medium text-left">
                {locale === 'ro' ? 'English' : 'Romana'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
```

**Step 5: Create Footer**

```typescript
// src/components/layout/Footer.tsx
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-dark-lighter border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-heading font-bold text-primary mb-4">BOXPRO</h3>
          <p className="text-gray-medium">Containere modulare de calitate premium.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">{t('phone')}</h4>
          <a href="tel:+40700000000" className="text-primary text-lg font-bold">+40 700 000 000</a>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">{t('email')}</h4>
          <a href="mailto:contact@boxpro.ro" className="text-gray-medium hover:text-primary">contact@boxpro.ro</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-white/10 text-center text-gray-medium text-sm">
        &copy; {new Date().getFullYear()} BOXPRO. {t('rights')}.
      </div>
    </footer>
  );
}
```

**Step 6: Create Mobile sticky call button**

```typescript
// src/components/layout/MobileCallButton.tsx
'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export function MobileCallButton() {
  const t = useTranslations('nav');

  return (
    <motion.a
      href="tel:+40700000000"
      className="fixed bottom-4 left-4 right-4 z-50 md:hidden bg-primary text-dark py-4 rounded-xl font-bold text-center text-lg shadow-lg shadow-primary/20"
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      📞 {t('callNow')} - +40 700 000 000
    </motion.a>
  );
}
```

---

### Task 6 (Agent 1): Landing Page - Hero Section

**Files:**
- Create: `src/components/landing/Hero.tsx`
- Modify: `src/app/[locale]/page.tsx`

**Step 1: Create Hero with animated text reveal**

```typescript
// src/components/landing/Hero.tsx
'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

export function Hero() {
  const t = useTranslations('hero');

  const titleWords = t('title').split(' ');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient placeholder - replace with image from Supabase */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-lighter to-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,166,35,0.1),transparent_70%)]" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
        <motion.div className="overflow-hidden mb-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.33, 1, 0.68, 1] }}
                className="inline-block mr-4"
              >
                <span className={i === 0 ? 'text-primary' : 'text-white'}>{word}</span>
              </motion.span>
            ))}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-medium mb-8"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Button href="tel:+40700000000" variant="primary" className="text-xl px-8 py-4">
            {t('cta')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
```

---

### Task 7 (Agent 1): Landing Page - WhyUs + Offers + HowItWorks sections

**Files:**
- Create: `src/components/landing/WhyUs.tsx`
- Create: `src/components/landing/Offers.tsx`
- Create: `src/components/landing/HowItWorks.tsx`

**Step 1: Create WhyUs section**

```typescript
// src/components/landing/WhyUs.tsx
'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const benefits = [
  { key: 'speed', icon: '⚡' },
  { key: 'quality', icon: '🏆' },
  { key: 'custom', icon: '🔧' },
  { key: 'price', icon: '💰' },
] as const;

export function WhyUs() {
  const t = useTranslations('whyUs');

  return (
    <SectionWrapper>
      <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-12">
        {t('title')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((b, i) => (
          <motion.div
            key={b.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-dark-lighter border border-white/10 rounded-2xl p-6 text-center hover:border-primary/50 transition-colors"
          >
            <div className="text-4xl mb-4">{b.icon}</div>
            <h3 className="text-xl font-bold text-primary mb-2">{t(b.key)}</h3>
            <p className="text-gray-medium">{t(`${b.key}Desc`)}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
```

**Step 2: Create Offers section**

```typescript
// src/components/landing/Offers.tsx
'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const categories = [
  { key: 'housing', gradient: 'from-orange-500/20 to-transparent' },
  { key: 'offices', gradient: 'from-blue-500/20 to-transparent' },
  { key: 'storage', gradient: 'from-green-500/20 to-transparent' },
  { key: 'custom', gradient: 'from-purple-500/20 to-transparent' },
] as const;

export function Offers() {
  const t = useTranslations('offers');

  return (
    <SectionWrapper className="bg-dark-lighter/50 rounded-3xl">
      <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-12">
        {t('title')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.key}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`relative aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br ${cat.gradient} border border-white/10 flex items-end p-6 cursor-pointer`}
          >
            <h3 className="text-2xl font-heading font-bold text-white">{t(cat.key)}</h3>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
```

**Step 3: Create HowItWorks section**

```typescript
// src/components/landing/HowItWorks.tsx
'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const steps = ['step1', 'step2', 'step3'] as const;

export function HowItWorks() {
  const t = useTranslations('howItWorks');

  return (
    <SectionWrapper>
      <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-12">
        {t('title')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="text-center"
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-primary text-dark text-2xl font-bold flex items-center justify-center mx-auto mb-4"
              whileInView={{ scale: [0, 1.2, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 + 0.2 }}
            >
              {i + 1}
            </motion.div>
            <h3 className="text-2xl font-heading font-bold mb-2">{t(step)}</h3>
            <p className="text-gray-medium">{t(`${step}Desc`)}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
```

---

### Task 8 (Agent 1): Landing Page - Recent Projects carousel

**Files:**
- Create: `src/components/landing/RecentProjects.tsx`
- Create: `src/components/ui/ProjectCard.tsx`

**Step 1: Create ProjectCard with 3D tilt**

```typescript
// src/components/ui/ProjectCard.tsx
'use client';

import { motion, useMotionValue, useTransform } from 'motion/react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

interface ProjectCardProps {
  project: {
    id: string;
    title_ro: string;
    title_en: string;
    category: string;
    price: number | null;
    currency: string;
    photos: { url: string; alt_ro: string; alt_en: string }[];
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const locale = useLocale();
  const t = useTranslations('recentProjects');
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const title = locale === 'ro' ? project.title_ro : project.title_en;
  const photo = project.photos[0];

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="bg-dark-lighter border border-white/10 rounded-2xl overflow-hidden cursor-pointer group"
      whileHover={{ scale: 1.02 }}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        {photo ? (
          <Image
            src={photo.url}
            alt={locale === 'ro' ? photo.alt_ro : photo.alt_en}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-dark-lighter flex items-center justify-center text-gray-medium">
            BOXPRO
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-heading font-bold text-lg mb-1">{title}</h3>
        {project.price && (
          <p className="text-primary font-bold">
            {t('from')} {project.price.toLocaleString()} {project.currency}
          </p>
        )}
      </div>
    </motion.div>
  );
}
```

**Step 2: Create RecentProjects section**

```typescript
// src/components/landing/RecentProjects.tsx
import { createClient } from '@/lib/supabase/server';
import { useTranslations } from 'next-intl';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/routing';

// This is a Server Component that fetches data
async function getFeaturedProjects() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('projects')
    .select('*, photos(*)')
    .eq('featured', true)
    .order('order_index')
    .limit(6);
  return data || [];
}

export async function RecentProjects() {
  const projects = await getFeaturedProjects();

  return <RecentProjectsClient projects={projects} />;
}

// Client wrapper for translations and animations
'use client';

function RecentProjectsClient({ projects }: { projects: any[] }) {
  const t = useTranslations('recentProjects');

  return (
    <SectionWrapper>
      <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-12">
        {t('title')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <div className="text-center">
        <Link href="/gallery">
          <Button variant="outline">{t('viewAll')}</Button>
        </Link>
      </div>
    </SectionWrapper>
  );
}
```

> NOTE: Task 8's RecentProjects has a server/client split issue - the implementing agent should separate these into two files: `RecentProjects.tsx` (server) and `RecentProjectsClient.tsx` (client).

---

### Task 9 (Agent 1): Assemble Landing Page + Gallery Page

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Create: `src/app/[locale]/gallery/page.tsx`
- Create: `src/components/gallery/GalleryGrid.tsx`
- Create: `src/components/gallery/ProjectModal.tsx`

**Step 1: Assemble landing page**

```typescript
// src/app/[locale]/page.tsx
import { Hero } from '@/components/landing/Hero';
import { WhyUs } from '@/components/landing/WhyUs';
import { Offers } from '@/components/landing/Offers';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileCallButton } from '@/components/layout/MobileCallButton';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <Offers />
        {/* RecentProjects will be added when Supabase is connected */}
        <HowItWorks />
      </main>
      <Footer />
      <MobileCallButton />
    </>
  );
}
```

**Step 2: Create Gallery page with filter + modal**

The implementing agent should create:
- `GalleryGrid.tsx` - client component with category filter tabs, animated layout grid using Motion's `layout` prop
- `ProjectModal.tsx` - client component, modal overlay with image carousel, project details, price
- `gallery/page.tsx` - server component that fetches all projects from Supabase, passes to GalleryGrid

---

### Task 10 (Agent 2): Admin Panel - Auth + Layout

**Files:**
- Create: `src/app/[locale]/admin/page.tsx` (login page)
- Create: `src/app/[locale]/admin/layout.tsx` (protected layout)
- Create: `src/app/[locale]/admin/dashboard/page.tsx`
- Create: `src/components/admin/LoginForm.tsx`
- Create: `src/components/admin/AdminSidebar.tsx`
- Create: `src/lib/supabase/auth.ts`

**Step 1: Create login form**

Client component with email/password fields, calls `supabase.auth.signInWithPassword()`. On success, redirect to `/admin/dashboard`.

**Step 2: Create admin layout**

Server component that checks auth with `supabase.auth.getUser()`. If not authenticated, redirect to `/admin`. If authenticated, render sidebar + children.

**Step 3: Create admin sidebar**

Links to Dashboard, Projects, Photos. Active state highlighting. Logout button that calls `supabase.auth.signOut()`.

---

### Task 11 (Agent 2): Admin Panel - Projects CRUD

**Files:**
- Create: `src/app/[locale]/admin/projects/page.tsx`
- Create: `src/app/[locale]/admin/projects/new/page.tsx`
- Create: `src/app/[locale]/admin/projects/[id]/edit/page.tsx`
- Create: `src/components/admin/ProjectForm.tsx`
- Create: `src/components/admin/ProjectsTable.tsx`

**Step 1: Projects list page**

Server component fetching all projects. Table with columns: title, category, price, featured, actions (edit/delete).

**Step 2: Project form component**

Client component with fields for: title_ro, title_en, description_ro, description_en, category (select), price, currency, featured (checkbox), order_index. Handles both create and edit via prop.

**Step 3: Create/Edit pages**

New page uses empty form. Edit page fetches project by ID and populates form.

---

### Task 12 (Agent 2): Admin Panel - Photo Upload + Management

**Files:**
- Create: `src/app/[locale]/admin/photos/page.tsx`
- Create: `src/components/admin/PhotoUpload.tsx`
- Create: `src/components/admin/PhotoGrid.tsx`

**Step 1: Photo upload component**

Client component with drag-and-drop area. Uploads to Supabase Storage bucket `photos`. On upload, creates record in `photos` table with URL, placement select (hero/gallery/section_offers/project), project_id select (optional).

**Step 2: Photo grid with management**

Grid of all photos with filters by placement. Each photo shows thumbnail, placement badge, delete button. Click to edit alt text and placement.

---

## Phase 3: Polish + Integration

### Task 13: Connect everything + final polish

- Wire RecentProjects to real Supabase data on landing page
- Add hero background image from Supabase (placement='hero')
- Add offer section images from Supabase (placement='section_offers')
- Test full flow: admin uploads photo → appears on landing/gallery
- Test i18n switching on all pages
- Test mobile responsiveness
- Run `npm run build` to verify no errors

---

## Execution Notes

**Agent 1 (frontend)** works on: Tasks 1-2, then 5-9 (scaffold, i18n, layout, landing page, gallery)
**Agent 2 (backend)** works on: Tasks 3-4, then 10-12 (Supabase setup, admin panel)
**Task 13** is done together after both agents complete.

Both agents work in the same repo. Agent 1 owns `src/components/landing/`, `src/components/gallery/`, `src/components/layout/`, `src/components/ui/`. Agent 2 owns `src/components/admin/`, `src/app/[locale]/admin/`, `src/lib/supabase/`.
