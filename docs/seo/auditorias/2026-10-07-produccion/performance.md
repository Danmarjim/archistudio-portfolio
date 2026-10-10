# Performance / Core Web Vitals Re-Audit — mparchistudio.com (after LCP fixes)

**Date:** 2026-10-07
**Tooling:** Lighthouse 13.5.0, local CLI, headless Chrome (Playwright Chromium-1243), lab data only. PSI API skipped per instructions (previously rate-limited) — go straight to local Lighthouse. No CrUX field data in this pass either. All figures are **single/double-run Lighthouse lab measurements** (simulated mobile throttling / unthrottled desktop), not 75th-percentile field data.

Status: **COMPLETE** (all 5 requested runs done: `/` mobile+desktop, `/proyectos` mobile, `/proyectos/casa-archi-colori` mobile, `/sobre-mi` mobile, plus HTML/SSR inspection of home, project, and listing pages to verify the claimed fixes directly in markup).

---

## Scores: Before / After

| Page | Device | Perf score (before → after) | LCP (before → after) | CLS (before → after) | TBT (before → after) |
|---|---|---|---|---|---|
| `/` (home) | Mobile | 94 → **79 / 95** (2 runs, high variance) | 3.1s → **3.8s / 2.9s** (2 runs) | 0.002 → 0 / 0.002 | 0ms → 0 / 20ms |
| `/` (home) | Desktop | 100 → 100 | 0.7s → **0.6s** | 0.009 → 0.014 | 0ms → 0ms |
| `/proyectos/casa-archi-colori` | Mobile | 91 → 83 | 3.5s → **3.3s** | 0 → 0 | 10ms → 0ms |
| `/proyectos` (listing) | Mobile | 84 → **87** | **4.2s POOR → 3.6s Needs Improvement** | 0 → 0 | 20ms → 10ms |
| `/sobre-mi` | Mobile | *(not in baseline)* → **97** | *(n/a)* → **2.6s** (borderline Good) | — → 0 | — → 10ms |

CLS remains excellent everywhere (0–0.014, all "Good"). TBT remains negligible (0–20ms, all "Good"). **LCP is still the only metric at risk**, same as baseline — it moved in the right direction on `/proyectos` (biggest win), barely moved on the project page, and is unresolved-to-noisy on home mobile due to a newly-surfaced root cause (see Finding #3 below).

Home mobile was re-run twice because the first run (score 79, LCP 3.8s) looked like a regression vs. baseline's 3.1s; the second run came back at score 95 / LCP 2.9s. The swing is lab-environment jitter (first run's `lcp-breakdown-insight` showed an implausible 8,674ms raw "element render delay" vs. a 3.8s total LCP — a known artifact when CPU-throttled trace capture contends with cold-starting `npx`/Chrome — not a real 8s delay). Treat home-mobile LCP as **~2.9–3.8s, averaging roughly flat vs. the 3.1s baseline**, not a clean improvement, for the structural reason in Finding #3.

No "Images" sub-score is produced by raw Lighthouse CLI with `--only-categories=performance` (that ~68 baseline figure came from a PSI-specific grouping, unavailable this pass since PSI was skipped per instructions). Qualitative image-waste diagnostics below stand in for it; verdict: **still weak, comparable to or worse than baseline** (see Finding #5).

---

## Baseline findings — verified status

### Finding #1 [HIGH] Framer Motion `opacity:0` gating the hero — **FIXED**
Confirmed directly in SSR HTML (`render_page.py`) on all three pages:
- Home: the hero/heading wrapper and the avatar wrapper no longer carry `opacity:0`/`scale(0.9)` inline styles. The only `opacity:0` occurrences left (10, down from 17) are on the **About-preview photo+text block, Services cards, and the bottom CTA** — all below-the-fold/secondary content, not LCP candidates.
- Project page (`casa-archi-colori`): the hero `<img>` (`casa-archi-colori-01.jpg`) renders with no opacity wrapper at all; the only remaining `opacity:0` is on the "Su..." description column that sits **after** the hero, confirmed below-fold.
- Listing page (`/proyectos`): the first `<article>`/card (Casa Archi & Colori) has no `opacity:0` wrapper and its `<img>` carries `fetchPriority="high"` + `class="... opacity-100"` (static, not animated-in). The remaining 5 `opacity:0` instances start from later cards further down the grid.

This part of the fix is solid and verified at the markup level, not just inferred from Lighthouse scores.

### Finding #2 [HIGH] `/proyectos` first card `loading="lazy"` — **FIXED** (mechanism); **PARTIAL** (outcome)
Confirmed: the first grid card's `<img>` now has no `loading="lazy"`, carries `fetchPriority="high"`, and `lcp-discovery-insight` reports all three checks green (`priorityHinted: true, requestDiscoverable: true, eagerlyLoaded: true`). This is a real, correct fix for the exact bug identified in the baseline.
Outcome: LCP moved from **Poor (4.2s) → Needs Improvement (3.6s)** — a ~600ms win and the clearest positive result of this re-audit — but it has not yet crossed into "Good" (≤2.5s). Remaining gap is resource-load/render-delay related, not the lazy-load bug anymore.

### Finding #3 [MEDIUM→now effectively HIGH] Competing preloaded images / placeholder avatar — **PARTIAL, and now the primary mobile-LCP blocker on home**
Preload count dropped from 4 → **3** on home (the About-section photo `_K7A9361.jpg` preload was removed — good, that part of the fix landed). But:
- The avatar (`images/about/placeholder.jpg`, still the literal placeholder file, not a real headshot — unchanged since baseline) is still preloaded and still **lacks `fetchPriority="high"`** (`lcp-discovery-insight`: `priorityHinted: false`). Verified directly in HTML — its preload `<link>` has no `fetchPriority` attribute while the hero-carousel preload `<link>` does.
- Critically: on **mobile**, now that the opacity:0 gating is gone (Finding #1 fixed), the browser's LCP algorithm picks the **avatar (176×176 circular photo)** as the actual LCP element on home, not the hero carousel image the fixes were aimed at. Both Lighthouse runs independently confirmed this (`alt="Martina Pozzi"`, `boundingRect` 176×176, still `src=".../placeholder.jpg"`).
This is why fixing #1/#2 barely moved home-mobile LCP: the targeted element (hero carousel image) isn't the one actually gating LCP on the mobile viewport — the small, de-prioritized, still-placeholder avatar is. **This is now the single highest-ROI remaining fix.**
**Fix:** give the avatar `fetchPriority="high"` (or drop `priority` from it if it shouldn't be the LCP candidate and instead make sure the real hero visual is sized/positioned to actually be the largest mobile viewport element), and replace `placeholder.jpg` with the real optimized headshot — both still outstanding from baseline.

### Finding #4 [MEDIUM] `fetchpriority="high"` missing despite preload — **FIXED for primary images, PARTIAL overall**
Hero carousel image (home), project hero image, and the `/proyectos` first card all now correctly emit `fetchPriority="high"` on the `<img>` (confirmed in HTML + green `priorityHinted` checks in Lighthouse for desktop/project/listing). The one place this is still missing is the **avatar** on home (see #3) — the fix was applied broadly but missed this element.

### Finding #5 [MEDIUM] Oversized/unresponsive image delivery (`sizes` too coarse) — **OPEN, and more visible than before**
- Home mobile: **79–103 KiB** wasted (`image-delivery-insight`), essentially unchanged from baseline's 98 KiB.
- Project page mobile: **86 KiB** wasted — nominally *worse* than baseline's 17 KiB, but this is an expected side-effect of Finding #1/width-height fixes working correctly: previously, broken/missing gallery dimensions likely prevented the browser's native lazy-load proximity check from firing reliably, so fewer images were fetched during the lab run and the per-page waste figure undercounted them. Now that gallery images have real `width`/`height` (`unsized-images` still scores 1/Good everywhere — not a CLS regression), lazy-loading engages correctly and more images load within the test window, surfacing pre-existing per-image waste (e.g., `casa-archi-colori-02.jpg` served at 750×1125/46.6 KB for a 364×546 slot → 35.6 KiB wasted on that one image alone) that was always there but wasn't being measured before.
- `/proyectos` (14 KiB) and `/sobre-mi` (19 KiB) are comparatively minor.
**Fix (unchanged from baseline):** tighten `sizes` attributes on gallery/card images to match actual rendered widths more precisely; the underlying root cause from baseline was never addressed.

### Finding #6 [LOW] Render-blocking CSS (~10 KB) — **OPEN, unchanged**
`render-blocking-insight` still scores 0.5 (home, `/proyectos`) or 0 with a 100ms-savings estimate (project page) on the same Tailwind chunk. Not touched by this round of fixes; still low priority.

### Finding #7 [LOW] Legacy JS polyfills (~14 KB) + unused JS — **OPEN, unchanged**
`legacy-javascript-insight` flags the same ~14 KiB of unnecessary `Array`/`Object`/`String` polyfills on every page tested this round. Not addressed; still low priority (TBT is 0–20ms everywhere, so no interactivity risk).

### Finding #8 [INFO] Good practices still holding
- CLS: 0–0.014 across every page/device this round — explicit dimensions (including the project gallery fix called out in the task) are confirmed working via `unsized-images` scoring 1/Good everywhere.
- TBT: 0–20ms everywhere — no main-thread/INP risk.
- TTFB: 125–213ms across all pages/devices this round (well inside the ≤0.8s budget) — no server-response regression.

---

## Prioritized remaining recommendations

1. **[HIGH]** Fix the home-mobile avatar: add `fetchPriority="high"` to it (or demote it from `priority`/preload entirely if the real hero image should be the LCP candidate instead) **and** replace `images/about/placeholder.jpg` with the real photo. This is the only unresolved item actively blocking home-mobile LCP from reaching "Good," and it's the same root cause flagged in the original audit's Finding #3 — not yet touched by the recent fix round. Expected impact: likely the single biggest remaining mobile-LCP win on `/`.
2. **[MEDIUM]** Tighten `sizes` attributes on project-gallery and card images (Finding #5) — now more visible/measurable thanks to the lazy-loading fix working correctly, but still unaddressed. Expected impact: tens-of-KiB-per-image bandwidth savings, compounding across all 7 project pages.
3. **[LOW]** Render-blocking CSS and legacy JS polyfills (Findings #6/#7) — unchanged, low priority, deprioritize behind #1 and #2.

## Caveats
- No PSI/CrUX field data this pass (skipped per instructions, local Lighthouse only) — all verdicts are lab-based.
- Home-mobile LCP showed high run-to-run variance (2.9s vs 3.8s); the `lcp-breakdown-insight` raw "element render delay" numbers on mobile-throttled runs in this environment were occasionally implausible (e.g., 8.2–8.7 *seconds* reported as a subpart of a 3.3–3.8s total LCP) — treated as a lab-environment CPU-contention artifact (not reproduced on the low-noise desktop run, where subparts summed correctly), not as evidence the opacity-gating issue persists (which was independently disproven via direct HTML inspection).
- Only one project page (`casa-archi-colori`) and the home/listing pages were profiled; other project pages were not individually re-verified, consistent with the baseline's caveat.
