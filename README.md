# Sakunthaladevi Krishnan — Portfolio

A premium, animated dark-themed portfolio built with React + Vite, Framer Motion,
React Three Fiber (Three.js), GSAP, and tsParticles.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Project structure

```
src/
  components/       shared UI (navbar, footer, cursor, particles, GSAP blobs, 3D hero, etc.)
  components/3d/     React Three Fiber scene
  data/              all editable site content (name, skills, projects, experience...)
  pages/             one file per route (Home, About, Skills, Projects, Experience,
                      Resume, CodingProfiles, Articles, Contact, NotFound)
```

## Things to personalize before deploying

1. **Content** — edit `src/data/portfolioData.js`: email, links (GitHub, LeetCode,
   SkillRack, HackerRank, LinkedIn, Instagram, YouTube, Twitter), project demo/GitHub
   URLs, and article text.
2. **Resume PDF** — drop your real resume at
   `public/resume-sakunthaladevi-krishnan.pdf` (the Hero and Resume page both link
   to this file for "Download Resume" / "View Resume").
3. **Contact form** — `src/pages/Contact.jsx` currently simulates a submit. Wire it
   to EmailJS or Formspree:
   - **EmailJS**: `npm install @emailjs/browser`, then call
     `emailjs.send(SERVICE_ID, TEMPLATE_ID, values, PUBLIC_KEY)` inside `onSubmit`.
   - **Formspree**: point the form's `action` at your Formspree endpoint and POST
     the form data (or use `fetch`).
4. **Favicon** — `public/favicon.svg` is a placeholder "SK" mark; swap for your own.
5. **Deploying** — `npm run build` outputs a static site in `dist/`. Deploy to
   Vercel, Netlify, GitHub Pages, or any static host.

## Notes

- Respects `prefers-reduced-motion`.
- The custom cursor and particle layer auto-disable on touch/narrow screens.
- 3D scene is capped at a modest device-pixel ratio for smooth performance on
  mid-range laptops and phones.
