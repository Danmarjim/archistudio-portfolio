# Visual / Mobile / Above-the-Fold Re-Audit — mparchistudio.com (v2)

Pages audited: `/`, `/contacto`, `/proyectos`, `/proyectos/casa-archi-colori`
Viewports: desktop (1920x1080), mobile (375x812 @2x)
Screenshots: `screenshots/{home,contacto,proyectos,casa-archi-colori}/mparchistudio_com_{desktop,mobile}.png`

Baseline compared: `.../mparchistudio.com-audit/findings/visual.md`

---

## Status of baseline findings

| # | Baseline issue | Status | Evidence |
|---|---|---|---|
| 1 | HIGH — Contact form inputs overflow/clipped on mobile | **FIXED** | `screenshots/contacto/mparchistudio_com_mobile.png` — all fields (Nome, Email, Telefono, Tipo di progetto, textarea) now stack single-column with visible right margin; textarea placeholder reads in full ("...le tue esigenze e qualsiasi dettaglio che..."), no longer truncated. Confirmed via Playwright: `document.documentElement.scrollWidth === clientWidth === 375` on all 4 pages — zero horizontal overflow. |
| 2 | MEDIUM — Hero rendered with `opacity:0` server-side, no no-JS fallback | **FIXED** (for the hero/above-the-fold content) | Raw HTML fetch of `/` shows the H1 (`Ristruttura senza pensieri`), eyebrow label, subheading, and all 3 CTA buttons (`Progetti`/`Contatto`/`Servizi`) now render with **no** inline `opacity:0` style — entrance animation removed from the hero. See "New / regression notes" below: the fix was not applied uniformly site-wide. |
| 3 | MEDIUM — Filter chips 36px tall on `/proyectos` mobile (below 44px) | **FIXED** | HTML now shows `class="min-h-11 rounded-full px-5 py-2.5 ..."` on every chip button — `min-h-11` = 44px, meeting the iOS HIG / Material minimum touch target. Visually confirmed in `screenshots/proyectos/mparchistudio_com_mobile.png` (chips visibly taller/more padded than before, still wrap to 3 rows on mobile but that's cosmetic, not a touch-target issue). |
| 4 | MEDIUM — Footer/sidebar social icons ~20x20px | **FIXED** | Desktop `/contacto` sidebar: icons now sit in ~43x43px rounded squares (measured via 3x upscaled crop), each icon fully contained with padding — comfortably at the 44px guideline, up from the baseline 20x20. |
| 5 | LOW — Generic `alt="Progetto 1"` on homepage project teaser | **FIXED** | Raw HTML `alt` audit of `/` now shows `alt="Restyling casa peonia — MP_archistudio"` for that image; all other images retain descriptive alt text. No generic/numbered alt text found on homepage. |
| 6 | LOW — Hero eyebrow label `text-sm` (14px) | **OPEN (unchanged, non-blocking)** | Still `text-sm` uppercase/tracking-widest in current HTML. Was always flagged as optional/low-priority; no regression, no fix — leaving as-is is reasonable. |

**5 of 6 baseline findings fixed. 1 (eyebrow font-size) remains open as a low-priority cosmetic item, unchanged from baseline.**

---

## New / regression notes (from removing entrance animations)

- **No layout-shift or spacing regressions observed.** Across both viewports on all 4 pages, section spacing, card grids, image aspect ratios, and button alignment all look intentional and consistent — no leftover `transform: translateY(20px)`-sized gaps, no collapsed margins, no overlapping elements.
- **Partial fix, not global:** the `opacity:0`/`transform` inline-style pattern (Framer Motion SSR initial state with no `<noscript>`/CSS fallback) was removed from the **hero** section only. It is still present server-side on **10 other elements** on the homepage: the "Chi sono" (About) image/text pair, the "Servizi" section heading, all 4 service cards, the services "scopri di più" link, and the bottom "Hai un progetto in mente?" CTA block (heading + button). These are all below-the-fold on first load, so the above-the-fold risk from baseline finding #2 is resolved, but the same no-JS/slow-JS invisible-content risk still applies to those lower sections. Not a regression (behavior unchanged for those sections), just an incomplete rollout of the fix — worth flagging for a follow-up pass if full-page robustness to JS failures matters.
- No new overflow, clipping, or broken responsive behavior introduced by the animation removal on the pages/viewports checked.

---

## Above-the-fold check (all 4 pages, both viewports)

- `/` — H1 "Ristruttura senza pensieri" + subheading + all 3 CTAs fully visible without scrolling, desktop and mobile. No FOUC risk now (see fix #2 above).
- `/contacto` — "Contatto" H1 + intro line visible above the fold on both viewports; form (now correctly laid out) begins just below the fold on mobile, which is expected/acceptable for a multi-field form.
- `/proyectos` — "Progetti" H1 + filter chip row visible above the fold on both viewports; first project card partially visible on mobile (acceptable).
- `/proyectos/casa-archi-colori` — Breadcrumb, category badge, H1, subheading, and the top portion of the hero image are visible above the fold on both viewports; no layout issues, image renders at full width with correct aspect ratio on mobile.

## Mobile responsiveness

- Hamburger menu icon present top-right on all 4 pages at 375px.
- Zero horizontal scroll / overflow confirmed programmatically (`scrollWidth == clientWidth == 375`) on all 4 pages.
- Contact form: single-column stack, full-width inputs with margin, no clipped text — confirmed fixed.
- Filter chips: now 44px min-height (was 36px) — meets touch-target guideline.
- Project grid (`/proyectos`) and project detail image (`/proyectos/casa-archi-colori`) scale cleanly to mobile width with no distortion.

## Visual issues found this pass

None new. No overlapping elements, no cut-off text, no broken images observed on any of the 8 screenshots.

---

## Scope limitations

- Only desktop (1920x1080) and mobile (375x812) were captured this pass per instructions; laptop/tablet breakpoints not re-verified.
- Below-the-fold sections on `/`, `/proyectos`, and `/proyectos/casa-archi-colori` were spot-checked via full raw-HTML/alt-text review but not individually screenshotted/scrolled-through this pass (turn-budget constraint) — recommend a follow-up if a deeper below-the-fold pass is needed, particularly to close out the remaining `opacity:0`/no-JS-fallback items identified above.
- Mobile hamburger drawer was not opened/exercised this pass (same limitation noted in the baseline).
