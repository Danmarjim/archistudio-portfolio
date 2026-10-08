# Backlink Profile — mparchistudio.com

**Data sources available:** Tier 0 only (Common Crawl Web Graph + local verification crawler). No Moz, Bing Webmaster, or DataForSEO credentials configured.

**Backlink Health Score: INSUFFICIENT DATA — not assessed.**
At Tier 0, only 1 of 7 scoring factors (verification of known links) has any real data; referring-domain count, domain quality distribution, anchor naturalness at scale, toxic-link ratio, link velocity, and follow/nofollow distribution all require Moz/Bing/DataForSEO. A numeric score would be misleading and is deliberately withheld (validated by `validate_backlink_report.py`, status: REVIEW, 0 errors, 1 warning, 1 info).

## 1. Common Crawl domain-level metrics (confidence: 0.50)
Source: Common Crawl Web Graph, release `cc-main-2026-jan-feb-mar` — https://commoncrawl.org/web-graphs (quarterly snapshot, not real-time).

| Metric | Value |
|---|---|
| In crawl | No |
| In rankings | No |
| PageRank / rank | null |
| Harmonic centrality / rank | null |

**Interpretation:** The domain was not found in this Common Crawl release. Per validator guidance, this must **not** be read as "low authority" — it means CC has not crawled/indexed the domain in this snapshot yet. Consistent with the site being newly launched. Re-check in 3-6 months against a newer CC release.

## 2. Known-profile backlink verification (confidence: 0.70-0.95, mixed — see per-row notes)

Ran `verify_backlinks.py` (static HTML crawler) against every profile, then manually re-checked every "link_removed" / "unverifiable_js" / "error" result with Playwright rendering (`render_page.py --mode always`) because several of these platforms are JS-rendered SPAs where the static crawler produces false negatives. Static-only results are noted as such.

| Source | Static crawler result | Manual JS-render re-check | Verdict |
|---|---|---|---|
| Houzz — houzz.it/pro/martina-pozzi | `link_removed` (200, static HTML has no link) | **Found**: profile is JS-rendered (`is_spa: true`). The "Website" field resolves to a Houzz tracking redirect (`houzz.it/trk/...`) whose base64 payload decodes to `https://www.mparchistudio.com`. `rel="noopener"` only (no explicit `nofollow` in the anchor itself; redirect-wrapped, so real link-equity treatment is uncertain). | **Confirmed backlink** (confidence 0.80 — manual decode, not tool-verified) |
| Archilovers — archilovers.com/mparchistudio/ | `link_removed` (200) | **Not found.** Full rendered HTML (78 KB) has zero outbound links to mparchistudio.com. The only "mparchistudio" occurrences are the profile's own slug/canonical self-references. The profile's social section links out to Instagram and LinkedIn, but there is **no "website" field populated**. | **No backlink exists — missed opportunity**, not a false negative. |
| Homify — homify.it/esperti/10014002/... | `error` (HTTP 503 on static GET — likely bot-blocked) | **Found** on Playwright re-check (200): explicit `<a rel="nofollow" href="http://www.mparchistudio.com">Website</a>`. Note: target is `http://` (not https) and uses `www.` — verify this matches your canonical URL (see Critical issue below). | **Confirmed backlink, nofollow** (confidence 0.85) |
| Spazi Belli — spazibelli.com/professionisti/arch-martina-pozzi-mp_archistudio | `verified` (200), anchor "Sito web", `rel="follow"` | n/a — confirmed directly by the tool | **Confirmed dofollow backlink** (confidence 0.95, tool-verified) |
| LinkedIn — linkedin.com/in/martinachiaramariapozzi/ | `error` (HTTP 405) | Playwright re-check hit LinkedIn's **authentication wall** (HTTP 999, `pageKey: auth_wall_desktop_profile`) — the "Contact info" panel where a website link would live is not visible without a logged-in session. | **Unverifiable with free tools** — not a confirmed backlink, not a confirmed absence either. |
| Instagram — instagram.com/mp_archistudio/ | `unverifiable_js` (200, correctly flagged as JS-rendered) | **Found**: bio link resolves through Instagram's `l.instagram.com` redirect to `mparchistudio.com/`. Instagram bio links are conventionally `nofollow`/UGC. | **Confirmed backlink, nofollow (by platform convention)** (confidence 0.80) |
| Linktree — linktr.ee/Arch.MartinaPozzi | `unverifiable_js` (200) | **Not found** on full render (264 KB rendered page, this is the real, live "Martina Pozzi Architetta Official" Linktree). It links to Instagram, LinkedIn, Pinterest, WhatsApp, Calendly, and two Spazi Belli project pages — but has **no link to mparchistudio.com at all**. The page is also heavily loaded with unrelated affiliate/monetization links (health, beauty, subscription-box affiliate programs via sjv.io/pxf.io/wk5q.net networks) that have nothing to do with architecture — worth a brand-hygiene look independent of SEO. | **No backlink exists — missed opportunity** |

**Reciprocal link note (validator warning):** mparchistudio.com links out to spazibelli.com, and spazibelli.com links back (dofollow). This is a normal, expected pattern for a professional-directory listing, not a link scheme — flagging per validator policy, no action needed.

## 3. Critical finding outside strict backlink scope (directly observed, confidence 0.95)

While fetching the homepage to enumerate outbound links, the raw HTML `<link rel="canonical">` and `<link rel="alternate" hreflang="...">` tags point to **`https://example.com/{it,es,en}`** instead of `https://mparchistudio.com/{it,es,en}`:

```html
<link rel="canonical" href="https://example.com/it"/>
<link rel="alternate" hrefLang="es" href="https://example.com/es"/>
<link rel="alternate" hrefLang="en" href="https://example.com/en"/>
<link rel="alternate" hrefLang="it" href="https://example.com/it"/>
```

This almost certainly comes from an unset/placeholder `metadataBase` or site-URL environment variable in the Next.js `generateMetadata`/root layout config. **Impact:** any canonical/hreflang signal search engines read currently points authority and indexing away from the real domain, to a domain you don't own. This would blunt the value of every backlink listed above regardless of source quality, and could also be a contributing factor (beyond "just new") to the Common Crawl non-presence. This is a technical-SEO issue, not a backlink one — recommend `/seo technical https://mparchistudio.com` for full remediation, but it is flagged here as **Critical** because it directly undermines backlink/authority accrual.

## Summary table

| Finding | Severity | Fix |
|---|---|---|
| Canonical/hreflang tags point to `example.com`, not the real domain | **Critical** | Set the real production URL (e.g. `NEXT_PUBLIC_SITE_URL=https://mparchistudio.com`) as `metadataBase` in the Next.js root layout/metadata config; redeploy and re-validate with `view-source` or `/seo technical`. |
| Archilovers profile has no outbound website link | High | Log into Archilovers and add `https://mparchistudio.com` to the profile's website field — likely a quick manual fix, zero-cost dofollow-or-nofollow citation. |
| Linktree has no link to mparchistudio.com and is cluttered with unrelated affiliate links | Medium | Add the website as a primary Linktree tile; consider removing unrelated affiliate links to keep the professional brand page clean. |
| Homify link target uses `http://www.mparchistudio.com` (not canonical https, no-www per this repo's config) | Low | Update the URL on the Homify profile to the canonical `https://mparchistudio.com` once the canonical-domain fix above ships, so the live backlink points at the correct canonical form. |
| LinkedIn backlink status unverifiable without authenticated session | Low / informational | No action required from an SEO standpoint; LinkedIn profile links carry minimal direct link-equity value in any case. |
| Domain absent from Common Crawl | Info | Expected for a newly launched site. Re-check against a future CC release; not evidence of low authority. |
| No Moz/Bing/DataForSEO credentials — referring-domain count, spam score, anchor-text distribution, link velocity all unmeasured | Info | Add a free Moz API key (`moz_api_key` in `/Users/danmarjim/.config/claude-seo/backlinks-api.json`) to raise this audit to Tier 1 and get an actual numeric Backlink Health Score. |

## Validator run
`validate_backlink_report.py` → status **REVIEW** (0 errors, 1 warning: reciprocal-link pattern with spazibelli.com — expected/benign; 1 info: CC absence correctly not interpreted as low authority).
