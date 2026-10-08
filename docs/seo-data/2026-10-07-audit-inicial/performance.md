# Performance / Core Web Vitals Audit — mparchistudio.com

**Date:** 2026-10-07
**Tooling:** Lighthouse 13.5.0 (local CLI, Chrome headless, lab data only). PSI API (no key) returned `"PSI rate limit exceeded (240 QPM / 25,000 QPD)"` on every attempt (retried once after 20s, same result) — **no CrUX field data available**, no Google API credentials configured. All figures below are **lab data from a single Lighthouse run per page/device**, not 75th-percentile field data. Treat the "pass/fail" calls as lab-based risk indicators, not an official CrUX verdict.

## Scores (Lighthouse Performance category, lab)

| Page | Device | Perf score | LCP | CLS | TBT |
|---|---|---|---|---|---|
| `/` (home) | Mobile (simulated throttle) | 94 | 3.1 s — Needs Improvement | 0.002 — Good | 0 ms |
| `/` (home) | Desktop | 100 | 0.7 s — Good | 0.009 — Good | 0 ms |
| `/proyectos/casa-archi-colori` | Mobile | 91 | 3.5 s — Needs Improvement | 0 — Good | 10 ms |
| `/proyectos` (listing) | Mobile | 84 | **4.2 s — POOR** | 0 — Good | 20 ms |

**Performance score (representative, mobile): ~90/100** (range 84–94 across the three mobile pages tested; desktop is 100). The /proyectos listing page is the weakest and is the one page that would fail LCP outright even on lab data.

**Images score: ~68/100.** Solid foundation (automatic AVIF/WebP via `next/image`, responsive `srcset`, explicit dimensions → CLS is excellent everywhere), but undermined by priority/lazy-loading misconfiguration, preload contention, and oversized delivery (see findings).

CLS is not a concern anywhere (0–0.009, all "Good"). No INP field data exists (no CrUX); lab proxy TBT is 0–20 ms everywhere, so main-thread blocking is not currently a risk. The entire problem surface is LCP.

---

## Findings (by severity)

### 1. [HIGH] Framer Motion `initial={{opacity:0}}` on above-the-fold hero wrappers delays LCP paint by ~0.9–1.0 s on mobile
**Evidence:** The raw SSR HTML (via `render_page.py`, confirmed `is_spa:false`, this is literally what the server sends) shows the **entire hero section** on `/` wrapped in `<div style="opacity:0;transform:translateY(20px)">`, with a nested `<div style="opacity:0;transform:scale(0.9)">` around the avatar photo, and 17 total `opacity:0` inline-styled nodes on the homepage. The project page hero (`/proyectos/casa-archi-colori`) shows the identical pattern: `<div class="... aspect-[16/9] ..." style="opacity:0;transform:translateY(20px)">` wrapping the hero `<img>`.

Chrome's LCP algorithm **excludes elements with `opacity:0`** from candidacy until they become visible, so the recorded LCP timestamp is gated on Framer Motion's JS hydrating and flipping the inline style — not on image bytes arriving. Lighthouse's `lcp-breakdown-insight` confirms this directly:

- Home (mobile): `elementRenderDelay: 992.6 ms` (of 3,067 ms total LCP) — by far the largest subpart.
- Project page (mobile): `elementRenderDelay: 896.9 ms` (of 3,503 ms total LCP).
- Home (**desktop**, no throttle): `elementRenderDelay: 15.5 ms` — confirms the delay is CPU/JS-hydration-bound, invisible on fast desktop hardware, and purely a mobile problem.

On mobile, `elementRenderDelay` consistently accounts for ~28–35% of total LCP time, more than resource load duration itself.

**Fix:** Do not gate the hero's initial paint behind a JS-driven opacity animation. Specifically:
- Remove `initial={{opacity:0}}` (or equivalent CSS-in-JS opacity 0 state) from the hero section wrapper and the hero image/avatar wrapper — the first viewport should render at `opacity:1` by default.
- If an entrance animation is wanted, apply it only to secondary/below-fold content via `whileInView`, or use a CSS `@media (prefers-reduced-motion: no-preference)` transition that doesn't require JS to reach `opacity:1` (e.g., CSS `animation` with `animation-fill-mode` defaulting visible, or simply drop the fade-in on the LCP element only).
- Expected impact: recovers ~900 ms–1 s of mobile LCP — moves home from 3.1 s → ~2.1–2.2 s and the project page from 3.5 s → ~2.6 s, both crossing into "Good"/near-Good territory.

### 2. [HIGH] `/proyectos` listing page: the first visible project card image is `loading="lazy"` — LCP is POOR (4.2 s)
**Evidence:** Lighthouse's `lcp-discovery-insight` on `/proyectos` (mobile) flags all three checks red for the actual LCP element:
```
priorityHinted: false, requestDiscoverable: false, eagerlyLoaded: false
```
and the live DOM snippet confirms: `<img alt="Casa Archi & Colori" loading="lazy" ... >` — this image sits at `top:348,bottom:621` (well inside the mobile viewport, the first grid card). `lcp-breakdown-insight` shows `resourceLoadDelay: 1,209 ms` — the single largest subpart — because the lazy-load intersection check/JS discovery adds roughly 1.2 s before the request even starts. Total LCP: **4,154.8 ms**, score 0.45, the only "Poor" result across the whole audit.

**Fix:** The project grid component should mark the first N above-the-fold cards (first 2–4, depending on breakpoint) as `priority` on `next/image` (removes `loading="lazy"`, adds `fetchpriority="high"` + preload), while keeping `loading="lazy"` for cards further down. This is the single highest-ROI fix found in this audit — it should take `/proyectos` from Poor to Good/Needs-Improvement on its own.

### 3. [MEDIUM] Multiple competing `priority`-preloaded images on the homepage dilute the hero's priority
**Evidence:** The homepage `<head>` contains **4** `<link rel="preload" as="image">` tags (confirmed via `grep -c`): the header logo (`MP_ARCHISTUDIO LOGO S.png`, `imageSizes="100vw"`), an avatar `placeholder.jpg` (`imageSizes="176px"`), the hero carousel image `casa-archi-colori-22.jpg` (`imageSizes="(max-width:768px) 90vw, 70vw"`), and an About-section photo `_K7A9361.jpg` (`imageSizes="(max-width:1024px) 100vw, 50vw"`). Each corresponds to a separate `<Image priority>` usage. Preloading 4 images simultaneously means the browser's limited early-fetch priority budget is split across competitors instead of being dedicated to the true LCP candidate, and on mobile the actual recorded LCP element ends up being the smallest of the four — a 176×176 circular avatar that is literally still pointing at `images/about/placeholder.jpg` (a stock placeholder, not Martina's real photo) rather than the large hero visual intended to be the page's focal point.

**Fix:** Audit every `<Image priority>` usage across homepage sections (Header logo, About-preview avatar, Featured-project carousel, About photo) and keep `priority` **only** on the single element that is actually the largest visible content for the initial viewport (almost certainly the project carousel image, once finding #1 is fixed so it's not hidden at `opacity:0`). Remove `priority` from the rest; they will still load quickly since they're small and above the fold, but without competing for preload bandwidth. Also replace `images/about/placeholder.jpg` with the real optimized headshot — serving a placeholder file as production content is also a content-quality issue, independent of CWV.

### 4. [MEDIUM] `fetchpriority="high"` missing on all `priority`-flagged images despite preload links being emitted
**Evidence:** Across home, project, and listing pages, every `<link rel="preload" as="image">` is present, but the corresponding `<img>` elements never carry a `fetchpriority`/`fetchPriority` attribute (checked case-insensitively on all 5 `<img>` tags on the homepage SSR HTML — none matched; the only `fetchPriority` attribute found anywhere was `fetchPriority="low"` on a deferred script preload). Lighthouse's `lcp-discovery-insight` explicitly flags `priorityHinted: false` as a failing check on both the project page and the listing page. This weakens the resource-priority signal the browser uses to schedule the request early relative to other network activity.

**Fix:** Confirm the `next/image` version in use emits `fetchpriority="high"` on `priority` images (this should be automatic in recent Next.js `next/image`); if a custom `Image` wrapper component intercepts/strips props before forwarding to `next/image`, check it isn't dropping `fetchPriority`. This is a quick, low-risk fix with a small-but-free LCP improvement.

### 5. [MEDIUM] Oversized/unresponsive image delivery — ~98 KiB wasted on home (mobile), ~17 KiB on project page
**Evidence:** Lighthouse's `image-delivery-insight` (mobile) itemizes real waste against *displayed* dimensions, e.g.:
- Home: `restyling-casa-peonia-15.jpg` served at 750×1125 (60,046 bytes) for a 329×494 slot → 48.5 KiB wasted; `cucina-MITE-08.jpg` 646×1149 for 278×494 slot → 24.2 KiB wasted; `_K7A9361.jpg` 750×999 for 364×546 → 14.9 KiB wasted; avatar `placeholder.jpg` 384×385 for 176×270 → 13.2 KiB wasted. Total: **Est. savings of 98 KiB**.
- Project page: hero `casa-archi-colori-01.jpg` served 23,110 bytes where ~17,667 bytes (76%) is estimated waste relative to displayed size.

Separately confirmed via `curl`: the optimizer **is** doing its job format-wise — `casa-archi-colori-22.jpg?w=750&q=75` returns `image/webp` at 34.5 KB (vs. 1.28 MB original JPEG), so AVIF/WebP negotiation and compression are working correctly; the waste here is purely about the `sizes` attribute/breakpoint selection choosing a larger `w=` bucket than the element's actual rendered box.

**Fix:** Tighten the `sizes` attribute on the flagged components to match actual rendered widths more precisely (the Next.js default `deviceSizes`/`imageSizes` breakpoint array is coarse — e.g. jumping 640→750→828 — so a slightly-too-wide `sizes` value causes the srcset selection to round up to a bucket well above the real box). Low effort, consistent few-hundred-ms-of-bytes win, compounds across every project gallery page (image-heavy site).

### 6. [LOW] Render-blocking CSS (~9.9 KB) on every page
**Evidence:** `render-blocking-insight` (score 0.5) on home, project, and listing pages all point to the same file: `/_next/static/chunks/a5ead1b63a702fa1.css` (~9.9–9.94 KB), blocking first paint on all three pages.
**Fix:** This is Tailwind's single global stylesheet; given the small size (~10 KB) the ROI of critical-CSS extraction is modest, but confirm it isn't render-blocking unnecessarily (e.g., via `next/head` ordering) — low priority relative to findings 1–3.

### 7. [LOW] Legacy JS polyfills shipped unconditionally (~14 KB) + unused JS (~48–51 KB per page)
**Evidence:** `legacy-javascript-insight` flags one chunk (`30ea11065999f7ac.js`) transpiling/polyfilling `Array.prototype.at/flat/flatMap`, `Object.fromEntries/hasOwn`, `String.prototype.trimStart/trimEnd` — all natively supported in every evergreen browser Next.js 16 targets by default — for an estimated 14 KB savings. `unused-javascript` separately flags ~48 KB (home) / ~51 KB (project page) of dead code in the initial bundle.
**Fix:** Check the project's `browserslist`/`.babelrc`/`next.config.ts` target — if it's broader than Next's default modern target, narrow it. Not currently a measured TBT/INP problem (TBT is 0–20 ms everywhere), so this is a bandwidth/parse-cost optimization rather than an interactivity fix; deprioritize behind findings 1–3.

### 8. [INFO] Good practices already in place (do not regress)
- Self-hosted fonts via `next/font` with `<link rel="preload" as="font" crossorigin>` at the very top of `<head>` — `font-display-insight` scores 1 (Good) everywhere.
- CLS is excellent on every page tested (0–0.009) — explicit `width`/`height` or `fill` + sized containers are working; `unsized-images` audit passes (score 1).
- No third-party scripts/tags found on home or project page (grepped for GTM/GA/Facebook/Hotjar/Clarity — none present) — nothing hijacking the main thread from third parties.
- 55 of 58 images on the project detail page are correctly `loading="lazy"` (only the hero + maybe 2 are eager) — DOM size is modest (973 nodes on the project page, 395 on `/proyectos`, well under the 1,500-node INP risk threshold).
- TTFB is consistently 330–570 ms across pages (within the ≤0.8 s "Good" budget), server response time audit scores 1 everywhere; Vercel edge cache (`x-vercel-cache: HIT`) is serving the HTML and optimized images from edge (`fra1`).
- Automatic AVIF/WebP image format negotiation confirmed via direct `curl -H "Accept: image/webp"` test (1.28 MB JPEG → 34.5 KB WebP).

---

## Caveats
- **No CrUX/field data**: PSI API returned a rate-limit error on every attempt (public, keyless quota exhausted); no Google API credentials were configured for this run. All verdicts above are single-run Lighthouse lab measurements (simulated mobile throttling / unthrottled desktop), not the 75th-percentile field data Google actually uses for ranking. Recommend re-running `pagespeed_check.py`/`crux_history.py` later (or with an API key) to confirm against real-user data, especially given that this is a low/medium-traffic portfolio site where CrUX may not have enough samples anyway (would 404).
- Only one project page (`casa-archi-colori`) was profiled in depth; given the identical Framer Motion wrapper pattern was found site-wide (home + this project page), it is reasonable to expect the same `opacity:0` LCP delay on the other 6 project pages, but this was not individually verified.
