# BOXPRO - De Facut

## SEO
- [ ] Creeaza `og-image.png` (1200x630px) si pune-l in `/public/` - folosit pentru preview social media (Facebook, LinkedIn, WhatsApp)
- [ ] Inlocuieste domain-ul placeholder `boxpro.ro` cu domeniul real in `src/app/layout.tsx` (metadataBase)
- [ ] Configureaza Google Business Profile cu datele firmei (adresa, telefon, program, poze)
- [ ] Inregistreaza site-ul in Google Search Console si trimite sitemap-ul
- [ ] Inregistreaza site-ul in Bing Webmaster Tools

## Supabase / Admin
- [ ] Creeaza un proiect Supabase (https://supabase.com)
- [ ] Copiaza `.env.local.example` in `.env.local` si completeaza cu URL-ul si cheia Supabase
- [ ] Creeaza un user admin din Supabase Dashboard > Authentication > Users > Add User (email + parola)

## Contact (placeholder-uri de inlocuit)
- [ ] Inlocuieste `contact@boxpro.ro` cu emailul real (in Hero.tsx si CTASection.tsx)
- [ ] Inlocuieste `0740 000 000` cu numarul real (in ro.json si en.json, cheile `hero.phone` si `cta.phone`)
- [ ] Inlocuieste `+40740000000` cu numarul real in format international (in Hero.tsx, CTASection.tsx, Navbar.tsx)

## Deploy
- [ ] Cumpara domeniu
- [ ] Deploy pe Vercel (sau alt hosting)
- [ ] Configureaza DNS
- [ ] Activeaza HTTPS (automat pe Vercel)
