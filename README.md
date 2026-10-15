# ATLAS Fizioterapi

Website for **ATLAS Fizioterapi**, a physiotherapy clinic in Viti, Kosovo.
One-page, mobile-first, Albanian by default with an English toggle. Appointments are made **only via WhatsApp or phone**; there is no online booking.

- **Address:** 14 Qershori, përballë Xhamisë, Viti
- **Phone / WhatsApp:** 045 207 056
- **Instagram:** [@atlas.fizioterapi](https://www.instagram.com/atlas.fizioterapi/)
- **Facebook:** [ATLAS Fizioterapi](https://www.facebook.com/p/ATLAS-Fizioterapi-61591298853529/)

## Sections

Hero (photo or video background) · About · Services (with "and more" card) · Conditions we treat · Why ATLAS · Credentials · First visit (animated steps) · How to book (animated WhatsApp demo) · Gallery with lightbox · Team · Client testimonials · Social · FAQ · Contact with map · Footer.

Sections with no data (credentials, testimonials, stats, social posts) are hidden automatically, so nothing placeholder-like is ever shown.

## Tech stack

- [TanStack Start](https://tanstack.com/start) + React 19 + TypeScript
- Tailwind CSS v4 and shadcn/ui components
- Vite, Vitest
- Built with [Lovable](https://lovable.dev), synced with this repository

## Getting started

Requires Node.js 20+.

```sh
npm install
npm run dev      # http://localhost:8080
npm run build    # production build
npm test         # unit tests
npm run lint
```

## Editing content

**Almost everything the clinic may want to change is in one file: `src/content/siteContent.ts`.**
All texts have an Albanian (`sq`) and an English (`en`) version.

| What | Where in `siteContent.ts` |
| --- | --- |
| Phone, WhatsApp number, address, hours, email, map | `business` |
| Instagram / Facebook links | `socials` |
| Instagram / Facebook posts | `socialPosts` (a post shows only when `real: true`) |
| Services and the "And more…" card | `services`, `moreServices` |
| Conditions treated | `conditions` |
| "Why ATLAS" benefits | `benefits` |
| First-visit steps | `firstVisit` |
| FAQ | `faq` |
| Team (name, role, bio, photo) | `team` |
| Gallery photos | `gallery` |
| Client testimonials | `testimonials` |
| Certifications, stats | `credentials`, `stats` |
| Hero video | `heroVideo` |

Leave a field empty (`""` or `[]`) to hide it.

### Business hours

```ts
hours: [{ days: { sq: "Hën–Sht", en: "Mon–Sat" }, time: "08:00–18:00" }],
```

Hours also feed the Google structured data (`openingHours`) automatically.

### Photos

1. Put the file in `public/` (e.g. `public/galeria-1.jpg`, ideally under ~400 KB, 1600 px wide).
2. Reference it as `"/galeria-1.jpg"` in `gallery`, `team[].photo` or `socialPosts[].image`.
3. Always write a meaningful `alt` text.

The first gallery photo is displayed largest, so use the best wide photo of the clinic there.

### Social posts

Add real posts only:

```ts
{ real: true, platform: "instagram", url: "https://www.instagram.com/p/XXXX/",
  image: "/post-1.jpg", caption: { sq: "…", en: "…" }, alt: { sq: "…", en: "…" } }
```

If `socialPosts` is empty, only the follow buttons are shown.

### Testimonials

Add only real client quotes, with permission:

```ts
testimonials: [{ quote: { sq: "…", en: "…" }, name: "Name or initials" }],
```

### Hero video (optional)

Compress the drone clip first (target 3–5 MB, 8–12 s, no audio), for example with ffmpeg:

```sh
ffmpeg -i drone.mp4 -t 12 -vf "scale=1280:-2,fps=24" -an -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart public/hero.mp4
ffmpeg -i drone.mp4 -t 12 -vf "scale=1280:-2,fps=24" -an -c:v libvpx-vp9 -crf 36 -b:v 0 public/hero.webm
ffmpeg -i drone.mp4 -ss 2 -frames:v 1 -vf scale=1600:-2 -q:v 4 public/hero-poster.jpg
```

Then set:

```ts
heroVideo: { mp4: "/hero.mp4", webm: "/hero.webm", poster: "/hero-poster.jpg" },
```

With an empty `mp4`, the site keeps the photo hero. The video is muted, loops, and falls back to the poster for visitors with reduced-motion or data-saver settings.

## Project structure

```
public/                  logo, favicons, manifest, images, video
src/
  content/siteContent.ts all editable content (sq/en)
  components/site/       Header, HeroAbout, Services, Booking, Sections (the rest), Cta, icons
  components/ui/         shadcn/ui primitives
  lib/site.tsx           language provider, WhatsApp link, scroll-reveal, clean anchor links
  routes/                __root.tsx (head, fonts, favicons), index.tsx (page + SEO)
  styles.css             design tokens and animations
```

## Design

| Token | Value | Use |
| --- | --- | --- |
| Brand blue | `#1769b0` | primary |
| Deep blue | `#123f78` | dark sections, logo, theme color |
| Sage | `#8ec7b3` / `#e7f3ef` | small accents only |

Fonts: Fraunces (headings) and Manrope (body), loaded from Google Fonts.
Colors are defined as tokens in `src/styles.css`; avoid hard-coded colors in components.

## Logo and icons

Everything is in `public/`:

- `logo-mark.svg` / `.png`: navy logo for light backgrounds
- `logo-mark-white.svg` / `.png`: white logo for dark backgrounds
- `favicon.ico`, `favicon.svg`, `favicon-16x16.png`, `favicon-32x32.png`, `favicon-48x48.png`
- `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, `site.webmanifest`

The tab icon is a simplified, bolder version of the logo so it stays readable at 16 px.

## WhatsApp booking

All "Rezervo në WhatsApp" buttons open `https://wa.me/38345207056` with a prefilled message (it includes the service name when started from a service card). The animated chat in "How to book" is purely illustrative and labelled as such.

## SEO

`src/routes/index.tsx` sets the title, description, Open Graph / Twitter tags and `Physiotherapy` JSON-LD (address, coordinates, map, social links, hours when provided). The share image is the hero photo.

## Accessibility and performance

- Keyboard-accessible menu, modals and lightbox; skip link; visible focus states
- `prefers-reduced-motion` respected (animations, video, count-up)
- Lazy-loaded images and map, and responsive layout from 360 px up

## Before going live

- [ ] Replace the temporary AI-generated photos with real photos of the team and clinic
- [ ] Add real social posts and (if available) real client testimonials
- [ ] Confirm the FAQ answers with the clinic (session length, referral, same-day treatment, cancellations); look for `// TODO confirm with clinic`
- [ ] Add opening hours and an email address if the clinic wants them shown
- [ ] Add team bios and real certifications
- [ ] Connect the domain and check the WhatsApp link preview

## Working with Lovable

This repository is synced with Lovable. Avoid force-pushing or rewriting published history, and keep the main branch in a working state. Changes pushed to `main` appear in the Lovable editor, and changes made in Lovable are committed here.
