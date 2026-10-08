# Visual / Mobile / Above-the-Fold Audit — mparchistudio.com

Pages audited: `/` (home, IT default locale), `/proyectos`, `/contacto`
Viewports captured: desktop (1920x1080), laptop (1366x768), tablet (768x1024), mobile (375x812 @2x)

Screenshots: `screenshots/home/`, `screenshots/proyectos/`, `screenshots/contacto/` (each with `_desktop.png`, `_laptop.png`, `_tablet.png`, `_mobile.png`)

---

## Findings

### 1. HIGH — Contact form inputs overflow / are clipped on mobile (`/contacto`)
On the 375px mobile viewport, every form field (`Nome completo`, `Email`, `Telefono`, `Tipo di progetto`, `Raccontaci il tuo progetto`) has its right edge and border flush against (or past) the screen edge — no right padding/margin is visible, and the textarea's placeholder text is visibly truncated ("...le tue esig[enze]..." cut mid-word). This is a strong visual signal that the input/select/textarea elements are wider than the available content column on mobile, causing a horizontal overflow of the form grid.
- Evidence: `screenshots/contacto/mparchistudio_com_mobile.png`, cropped detail confirming the clipped right border at the image edge (right 80px strip, full form height).
- Likely cause: the two-column form grid (`Nome completo`/`Email`, `Telefono`/`Tipo di progetto`) is not collapsing to 100%-width single column at the mobile breakpoint, or a fixed/min-width utility class on the inputs is wider than the container, or the page itself scrolls horizontally and the fields are simply positioned past the right edge of the viewport.
- Fix: verify the contact form grid wrapper uses `grid-cols-1 md:grid-cols-2` (or equivalent) and that input/textarea elements use `w-full` with no fixed `min-width`. Also check the page `<body>`/container for `overflow-x: hidden` masking an actual wider content track — confirm there is no horizontal scrollbar on real mobile devices, since masking would hide content rather than fix the layout.

### 2. MEDIUM — Above-the-fold hero content is server-rendered with `opacity:0` and no no-JS fallback (`/`)
The raw (no-JS) HTML response for the homepage ships the hero eyebrow label, H1 ("Ristruttura senza pensieri"), subheading, and the 3-button CTA row with inline `style="opacity:0;transform:translateY(20px)"`. This pattern repeats 13 times across the page (hero + likely other fade-in-on-scroll sections), consistent with a Framer Motion `initial={{opacity:0,y:20}}` setup with no CSS/noscript fallback.
- Evidence: `curl`-equivalent raw fetch (`--mode never`) of `/` shows the H1 wrapped in `style="opacity:0;transform:translateY(20px)"` in the literal server response, before any JS executes.
- Risk: on slow connections, JS errors, blocked/delayed hydration, or no-JS environments (some crawlers, Lighthouse "no-JS" audits, reader modes), the primary H1 value proposition and all 3 CTAs are invisible — a real above-the-fold content/FOUC risk, not just a cosmetic animation delay.
- Fix: add a `<noscript>` CSS override forcing `opacity:1;transform:none` on these elements, or switch the entrance animation to a pattern that defaults to visible (e.g., CSS `@keyframes` with `animation-fill-mode` rather than JS-driven `initial` opacity), or ensure the motion library's SSR output defaults to the "animate" (visible) state rather than "initial" (hidden) state.

### 3. MEDIUM — Filter-chip tap targets below recommended minimum on `/proyectos` (mobile)
Measured via rendered bounding boxes at 375px viewport: all category filter chips ("Tutti", "Ristrutturazione integrale", "Bagni", "Cucine", "Restyling", "Commerciale") are **36px tall** (widths 70–208px). This is below the 44–48px touch-target guideline (iOS HIG / Material) and close to but still under the WCAG 2.5.8 AA minimum of 24x24 (chips pass the WCAG floor but fail the common 48px best-practice target, and with wrapping to 3 rows on mobile, mis-taps between adjacent chips are plausible).
- Evidence: `screenshots/proyectos/mparchistudio_com_mobile.png` (chips visibly wrap to 3 rows) + measured box heights of 36px for every chip.
- Fix: increase vertical padding on the chip buttons to reach ~48px height on mobile (e.g., `py-3` instead of `py-2`), or increase row/column gap to reduce accidental adjacent-chip taps.

### 4. MEDIUM — Social icon links in footer are ~20x20px (`/contacto`, shared footer)
One footer social icon link measured 20x20 CSS px (no padding beyond the icon glyph itself) in a row of 8 social icons (Instagram, LinkedIn, Pinterest, Threads/asterisk, and others) visible in `screenshots/contacto/mparchistudio_com_desktop.png`. 20x20 is below both the Material (48px) and iOS HIG (44px) guidance, and only marginally above the WCAG 2.5.8 AA floor (24x24) — likely to fail it depending on the exact icon.
- Fix: wrap each icon in a link with `min-w-[44px] min-h-[44px]` (icon centered inside), rather than sizing the tappable area to the icon's intrinsic dimensions.

### 5. LOW — Generic/non-descriptive alt text on homepage project teaser image
The single "Progetti" teaser image on the homepage uses `alt="Progetto 1"`, which is technically present (no missing-alt violation) but not descriptive of the actual project shown. All other images on home/`/proyectos`/`/contacto` have meaningful alt text ("MP_archistudio", "Martina Pozzi", "Martina C.M. Pozzi", project titles).
- Fix: replace with the project title/description (e.g., alt of the featured project's name), consistent with how the `/proyectos` grid cards are labelled.

### 6. LOW — Eyebrow label font-size under 16px
The hero eyebrow text ("STUDIO DI PROGETTAZIONE ARCHITETTONICA SARTORIALE D'INTERNI A BERGAMO") uses Tailwind `text-sm` (14px) with `uppercase tracking-widest`. Purely decorative/supporting label, not body copy, so impact is minor, but combined with uppercase+wide tracking it's the smallest text in the hero and could be a touch hard to read on small phones.
- Fix: optional — bump to `text-base` (16px) on mobile only if legibility complaints arise; not blocking.

---

## What passed (no issues found)

- **H1 and value proposition above the fold**: Confirmed on both desktop (1920x1080) and mobile (375x812) — "Ristruttura senza pensieri" + supporting subheading are fully visible without scrolling, alongside the eyebrow label and profile photo.
- **Primary CTA visibility**: The filled "Progetti" button (primary CTA) and the two secondary CTAs ("Contatto", "Servizi") are all visible above the fold on both desktop and mobile — none are cut off at the mobile viewport's bottom edge.
<br> (Desktop: `screenshots/home/mparchistudio_com_desktop.png`, Mobile: `screenshots/home/mparchistudio_com_mobile.png`)
- **No overlapping elements** detected on `/`, `/proyectos`, or `/contacto` across desktop/mobile screenshots.
- **No missing `alt` attributes**: all `<img>` tags on all 3 pages/viewports checked carry a non-empty `alt` (see item 5 above for a *quality*, not *presence*, nit).
- **Mobile navigation**: hamburger icon present and visible top-right on all 3 pages at 375px — accessible pattern in place (menu-open interaction itself wasn't exercised in this pass).
- **No console errors** during headless render of the homepage.
- **Responsive image grid** on `/proyectos`: desktop 3-column grid collapses cleanly to a single column of full-width cards on mobile with no distortion or cropping artifacts.

---

## Notes / Scope limitations

- The mobile hamburger drawer's internal nav-link tap targets were measured via DOM bounding boxes without first clicking the hamburger open (not a new capture was taken after the turn-limit instruction), so the ~24px heights picked up for nav `<a>` elements may reflect an off-canvas/closed-drawer layout box rather than the true on-screen tap target once the drawer is open. Treat as unverified — recommend a follow-up pass that opens the mobile menu before measuring.
- Tablet/laptop screenshots were captured but not individually analyzed in this pass (only desktop + mobile were required per the task); they're available in the `screenshots/` folders for reference if needed.
