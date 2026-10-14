# Doon Builders — Corporate Website

Multi-page corporate website for **Doon Builders**, a three-generation construction and infrastructure company building since 1968.

It is a static React site: there is **no backend and no database**. Every word, number, project and photo on the site comes from plain data files in `src/data/`. To change the content you edit those files; you rarely need to touch the components.

---

## Quick start

Requires Node.js 18 or newer.

```bash
npm install        # install dependencies (once)
npm run dev        # start the site at http://localhost:5173 — changes appear instantly
npm run build      # make the production version in /dist
npm run preview    # serve /dist locally to check the production version
```

---

## How the code is organised (start here)

A page is built in layers. Read them top to bottom:

```
index.html                  the single HTML page; loads src/main.jsx
└─ src/main.jsx             starts React and the router
   └─ src/App.jsx           the list of pages (routes)
      └─ src/layout/MainLayout.jsx   frame around every page: intro, navbar, footer, call buttons
         └─ src/pages/*.jsx          one file per page (Home, About, Projects …)
            └─ src/sections/home/*   the blocks that make up the Home page
               └─ src/components/*   reusable pieces: buttons, cards, image, lightbox …
                  └─ src/data/*      ALL the content (text, numbers, projects, images)
```

| Folder | What is inside | Typical reason to open it |
| --- | --- | --- |
| `src/data/` | Content: company details, projects, machinery, timeline, archive records, image list, SEO text | Changing anything a visitor reads or sees |
| `src/pages/` | One file per URL | Changing the layout of a page |
| `src/sections/home/` | The 13 blocks of the Home page, in story order (see `src/pages/Home.jsx`) | Changing a Home-page block |
| `src/components/` | Shared building blocks used on many pages | Changing how every card / button / image behaves |
| `src/layout/` | The shared page frame | Adding something to every page |
| `src/hooks/` | Smooth scrolling (Lenis) and scroll-reveal animation helpers | Animation behaviour |
| `src/lib/` | GSAP set-up, theme (light/dark), intro state | Rarely |
| `src/services/` | Contact-form sending | Connecting the form to an email service |
| `src/styles/globals.css` | Colours (light + dark), typography, shared CSS classes | Colours and fonts |
| `public/` | Files served as-is: images, video, favicons, robots.txt, sitemap.xml | Adding photos |
| `documents/` | The typed PDF of the original records (`Doon-Builders-Original-Records.pdf`) and its HTML source | Not part of the website build |

Imports use `@/` as a shortcut for `src/` — `@/data/company` means `src/data/company.js`.

### Pages (routes)

| URL | File |
| --- | --- |
| `/` | `src/pages/Home.jsx` |
| `/projects` (`?filter=government`, `private`, `roads-highways`, `bridges`, `dams`, `irrigation`, `buildings`) | `src/pages/Projects.jsx` |
| `/projects/<slug>` | `src/pages/ProjectDetail.jsx` |
| `/ongoing-projects` | `src/pages/OngoingProjects.jsx` |
| `/projects-delivered` | `src/pages/DeliveredProjects.jsx` |
| `/experience` (original records at `/experience#archive`) | `src/pages/Experience.jsx` |
| `/machineries` (`?category=earthmoving`, `road`, `lifting`, `concrete`, `transport`) | `src/pages/Machinery.jsx` |
| `/about` | `src/pages/About.jsx` |
| `/contact` | `src/pages/Contact.jsx` |
| anything else | `src/pages/NotFound.jsx` |

To add a page: create it in `src/pages/`, add a `<Route>` in `src/App.jsx`, and add the link in `src/data/navigation.js`.

---

## Where do I change …?

| I want to change … | File |
| --- | --- |
| Phone, email, WhatsApp, address, map link, stats (58+, 180+, 3), social links, logo | `src/data/company.js` |
| Menu and footer links | `src/data/navigation.js` |
| Projects (add / edit / remove) | `src/data/projects.js` |
| Original records: work orders, tenders, licence, their scans and typed copies | `src/data/archive.js` |
| The three generations: years, names, stories | `src/data/timeline.js` |
| Machinery list and Home fleet block | `src/data/machinery.js` |
| "What we build", "Why us", philosophy | `src/data/capabilities.js` |
| Home "From Our Sites" photos | `src/data/siteGallery.js` |
| Home showcase slides | `src/data/showcase.js` |
| Which image file is used where | `src/data/images.js` |
| Page titles and descriptions for Google / sharing | `src/data/seo.js` |
| Home hero video | `public/videos/` + `heroVideo` in `src/data/images.js` |
| Opening animation (building drawing) | `src/components/Intro.jsx` |
| Colours | `src/styles/globals.css` (`:root` and dark theme) and `tailwind.config.js` |

Fields left empty (`''`, `null` or `[]`) are hidden automatically — the site never shows a label without a value.

---

## Content guide

### Projects — `src/data/projects.js`

The first three records are **real projects documented by original papers** (Kolar Dam 1990, Tarana 1980, P.K. Tank 1976). They have `isPlaceholder: false` and an `archiveId` that links them to their scanned record.

The records made with `sample({...})` below them are **development samples** that only demonstrate the layouts. They show a "Sample entry" badge. Replace or delete them before launch, and never publish invented names, clients or figures.

```js
{
  id: 'p20',
  slug: 'example-bridge-project',          // URL: /projects/example-bridge-project
  name: 'Official project name',
  location: 'District, State',
  category: 'bridges',                     // roads-highways | bridges | dams | irrigation | railways |
                                           // pwd | hospitality | healthcare | commercial | other
  sector: 'infrastructure',
  ownershipType: 'government',             // government | private
  year: 2019,                              // or '' if unknown
  status: 'completed',                     // completed | ongoing
  stage: 'completed',                      // planning | execution | finishing | completed
  progress: null,                          // a verified % only, otherwise null
  client: '',
  authority: 'Authority name',
  shortDescription: 'One-line summary.',
  description: 'Overview paragraph.',
  heroImage: responsive('/images/projects/example-bridge'),
  gallery: [responsive('/images/projects/example-bridge-2')],
  scope: ['Item of work', 'Item of work'],
  featured: true,                          // show on the Home page
  isPlaceholder: false,
  archiveId: '',                           // optional: id of a record in archive.js
}
```

`status: 'ongoing'` puts a project on the Ongoing page; `completed` puts it in the Delivered archive. When you publish a real project, also add its URL to `public/sitemap.xml`.

### Original records — `src/data/archive.js`

Each record has a generation (1, 2 or 3), the facts read from the paper, the scanned images (`scans`) and an optional typed **digital copy** (`transcript`). Records appear:

- on **Experience → From the Archives**, grouped by generation,
- on **About**, under each generation ("On record"),
- on the matching **project page** ("Original Record").

Scans live in `public/images/archive/` as `<name>-480/960` (full pages) or `<name>-640/1280` (close-ups), in WebP and AVIF.

### Machinery — `src/data/machinery.js`

```js
{ id: 'm20', name: 'Machine name', category: 'earthmoving', model: '', capacity: '',
  year: '', application: '', image: responsive('/images/machinery/machine-name'), isPlaceholder: false }
```

Categories: `earthmoving`, `road`, `lifting`, `concrete`, `transport`. `fleetGroups` controls the Home fleet block.

### Generations and portraits — `src/data/timeline.js`, `src/data/images.js`

The timeline is shared by Home, Experience and About. Put portraits in `public/images/people/` and set them in `portraits` in `images.js`. Until then an architectural placeholder frame is shown — never a stand-in face.

---

## Images

1. Export each photo at up to three widths: **640, 1280 and 1920** (portraits and site photos use fewer — see `images.js`).
2. Save as WebP, plus AVIF if possible: `name-640.webp`, `name-1280.webp`, `name-1920.webp`.
3. Put them in the right folder under `public/images/` (`projects/`, `machinery/`, `people/`, `brand/` …).
4. Reference them with `responsive('/images/<folder>/name')`, or use a single file: `heroImage: '/images/projects/site.jpg'`.

The `<Media>` component then serves the best size and format, lazy-loads below the fold and reserves the space so nothing jumps.

| Folder | Contents |
| --- | --- |
| `public/images/site/` | Real Doon Builders site photographs |
| `public/images/archive/` | Scans of the original records |
| `public/images/placeholder/`, `public/images/stock/` | **Temporary** stock photography (credits in `stock/CREDITS.md`). Large images using it show a "Representative image" tag. Replace with real photography before launch, then delete these folders. |
| `public/videos/` | Home hero video — currently representative 4K stock footage (Pexels licence), served at 720p / 1080p / 2160p |

---

## Contact form

The form validates in the browser and **never pretends to have sent a message**. Until a provider is configured it tells the visitor that online enquiries are not connected yet and shows the phone number and email.

Copy `.env.example` to `.env` and choose a provider:

| Provider | Settings |
| --- | --- |
| Web3Forms | `VITE_CONTACT_PROVIDER=web3forms`, `VITE_CONTACT_FORM_KEY=<access key>` |
| FormSubmit | `VITE_CONTACT_PROVIDER=formsubmit`, `VITE_CONTACT_ENDPOINT=https://formsubmit.co/ajax/<email-or-token>` |
| Netlify Forms | `VITE_CONTACT_PROVIDER=netlify` (the hidden detection form is already in `index.html`) |
| Custom API | `VITE_CONTACT_PROVIDER=custom`, `VITE_CONTACT_ENDPOINT=https://your-api/contact` (receives JSON) |

On Netlify or Vercel, set the same variables in the dashboard. Only public, browser-safe keys belong in `VITE_` variables. Never commit `.env`.

---

## Deployment

The site is a static single-page app; the `dist/` folder can be hosted anywhere.

- **Netlify:** connect the repository. `netlify.toml` sets the build command and publish folder; `public/_redirects` makes deep links such as `/about` work.
- **Vercel:** import with the Vite preset; `vercel.json` adds the same rewrite.

### Before launch — checklist

- [ ] Set `VITE_SITE_URL` (canonical and sharing URLs) and confirm the domain in `public/robots.txt` and `public/sitemap.xml`
- [ ] Configure the contact-form provider (see above)
- [ ] Replace the sample projects and sample machinery with real records
- [ ] Replace placeholder/stock photos and the hero video with real Doon Builders media
- [ ] Add the logo (`company.logo`), registered name, office address and map link in `company.js`
- [ ] Add portraits and the third-generation names
- [ ] Add social links, company profile PDF and legal pages

---

## Animation and accessibility

- **Intro:** a blueprint drawing of a building under construction, then the wordmark (`src/components/Intro.jsx`). It plays once per browser session, a click or key press fast-forwards it, and it is skipped entirely for visitors who prefer reduced motion.
- **Scroll reveals** are declarative: add `data-reveal="lines" | "fade" | "stagger" | "image" | "rule"` or `data-parallax` to elements inside a section that calls `useReveal(ref)`.
- **Reduced motion:** smooth scrolling is off, nothing is hidden or animated, the pinned Three Generations section becomes a normal stack, and the hero video does not autoplay.
- Semantic landmarks, a skip link, visible focus states, labelled form fields with inline errors; the mobile menu and lightboxes close with Escape and return focus.
- Light and dark themes follow the device setting and can be switched with the toggle in the navbar.

## SEO

Each page sets its own title, description, Open Graph and Twitter tags (`src/data/seo.js`, `src/components/Seo.jsx`). `index.html` carries the defaults, the web-app manifest and an Organization schema with verified details only.

## Tech stack

React 19 · Vite 8 · Tailwind CSS 3 · React Router 7 · GSAP + ScrollTrigger · Lenis smooth scroll · Lucide icons.
