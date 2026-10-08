# Agent-readiness re-audit — https://mparchistudio.com/

Checked 2026-10-07. Tool facts baseline (vendor-matrix.md): 2026-09-23.
Re-audit of baseline findings in
`.../mparchistudio.com-audit/findings/agentic.md` (checked 2026-10-07, same
day, earlier pass).

## Lighthouse Agentic Browsing fraction

PSI (`lighthouse_agentic.py`) was not attempted this run per the task's
instruction to use a local CLI run instead (PSI was rate-limited in the prior
pass). Ran `npx -y lighthouse@latest https://mparchistudio.com/
--only-categories=agentic-browsing --output=json --chrome-flags="--headless=new"`
twice: once default (mobile form factor) and once with `--preset=desktop`.
The `agentic-browsing` category exists in this Lighthouse build (**13.5.0**,
matches vendor-matrix.md's dated fact for the same version).

**Result: 3/3 (mobile, Lighthouse 13.5.0) and 3/3 (desktop, Lighthouse
13.5.0).**

| Audit | Mobile | Desktop | Counted? |
|---|---|---|---|
| `agent-accessibility-tree` | pass (score 1, binary) | pass (score 1, binary) | yes |
| `cumulative-layout-shift` | pass (score 1, numeric, CLS = 0.0002) | pass (score 1, numeric) | yes |
| `llms-txt` | pass (score 1, binary) | pass (score 1, binary) | yes |
| `webmcp-form-coverage` | not applicable | not applicable | no |
| `webmcp-registered-tools` | not applicable | not applicable | no |
| `webmcp-schema-validity` | not applicable | not applicable | no |
| `ard-schema` | not applicable | not applicable | no |

Paths that would add a counted audit: registering a WebMCP tool
(`navigator.modelContext`/`document.modelContext`) would bring in the three
`webmcp-*` audits; publishing a signalled `ai-catalog.json` would bring in
`ard-schema`. Both are optional, stated as options not goals.

**Environment note (not a site defect):** both runs' `mainDocumentUrl` was
`https://mparchistudio.com/es`, not `/`, with the warning "test URL ...
was redirected". Root cause confirmed: this sandbox's `LANG=es_ES.UTF-8`
makes headless Chrome send `Accept-Language: es`, and the site's `next-intl`
locale-negotiation middleware issues a `307` to `/es` for that header
(confirmed independently: `curl -H "Accept-Language: en-US,en;q=0.9"
https://mparchistudio.com/` → `307` to `/en`; plain `curl` with no
Accept-Language header → `200` directly on `/` serving the `it` default, with
`Set-Cookie: NEXT_LOCALE=it`). `/es`, `/en` and `/it`(default) share the same
Next.js template, so the pass/fail results generalize across locales, but a
future run should either unset `LANG`/send no `Accept-Language`, or target
`https://mparchistudio.com/it` directly, to audit the default locale without
a redirect hop.

## Agent-UX heuristic (accessibility-tree quality, local 0-100 scale)

Ran `agent_ux_check.py` on the same three pages as the baseline. All three
completed (`score_status: complete`, no partial-run reasons). Results are
unchanged from baseline and all remain in the pass band.

| Page | Score | Buttons | Landmarks | Unnamed interactive | Inputs w/o label | Inputs w/o aria |
|---|---|---|---|---|---|---|
| `/` | 100/100 | 4 real `<button>` | 11 | 0 | 0 | 0 |
| `/contacto` | 100/100 | 5 real `<button>` | 4 | 0 | 0 | 3 |
| `/servicios` | 100/100 | 4 real `<button>` | 11 | 0 | 0 | 0 |

Zero `div_onclick_widgets` on every page (no fake buttons/links built from
unlabelled `<div onclick>`). `/contacto`'s 3 inputs without `aria-*` all have
an associated `<label>` and 0 unnamed-interactive nodes in the rendered
tree — a minor note, not a defect, same as baseline. This heuristic is a
local approximation of Lighthouse's `agent-accessibility-tree` (33 axe
rules), reported separately from the Lighthouse fraction above, consistent
with both agreeing (pass) this run.

## Baseline items — FIXED / OPEN

| # | Baseline finding | Status | Evidence this run |
|---|---|---|---|
| 1 | `/llms.txt` returned HTTP 500 | **FIXED** | `curl -o /dev/null -w "%{http_code}"` → `200`; `content-type: text/plain; charset=utf-8`; 1709 bytes; body starts with a valid `# MP_archistudio — Martina Pozzi, architetta a Bergamo` H1 and includes Markdown links. Lighthouse `llms-txt` audit passes (mobile and desktop); `agentic_check.py`'s `llms-txt` check status is `pass`. |
| 2 | `/index.md` returned HTTP 500 | **FIXED (error removed); file still absent**  | Now returns a clean `404` (same content-type/size pattern as a normal Next.js not-found page), not a 500. Per the skill's rule, an absent Markdown sibling is informational, not a defect — `agentic_check.py`'s `markdown-delivery` check status is `info`, same as a site that never had one. |
| 3 | `<html>` had no `lang` attribute | **FIXED** | `curl -sL https://mparchistudio.com/ \| grep -o '<html[^>]*>'` → `<html lang="it">` (default locale); `/es` → `<html lang="es">`; `/en` → `<html lang="en">`. All three locale variants now render per-locale `lang`. |
| 4 | `robots.txt` `Sitemap:` pointed at `https://example.com/sitemap.xml` | **FIXED** | `curl https://mparchistudio.com/robots.txt` now shows `Sitemap: https://mparchistudio.com/sitemap.xml`; confirmed that URL itself resolves (`200`, `application/xml`). `agentic_check.py`'s parsed `robots.sitemap` is `["https://mparchistudio.com/sitemap.xml"]`. |

All four baseline defects are resolved. No regressions found elsewhere:
`server-rendered` still passes (434 words visible with JS disabled, up from
434 — consistent with baseline's description, no JS-shell marker),
`robots-reachable` still passes (200, 1 group), unknown URLs still return a
real 404 (`catch_all_200: false`), and user-triggered agents are still not
blocked at the root.

## Findings by priority (current state)

### P0

- **PASS — robots.txt reachable.** HTTP 200, 1 group (`User-agent: *`).
- **PASS — Primary content present without JavaScript.** 434 words visible
  with JS disabled, no JS-shell marker.
- **PASS — CLS.** Lighthouse `cumulative-layout-shift` scores 1 (CLS ≈
  0.0002) on both mobile and desktop, on the `/es` page actually fetched.
- **PASS — Accessibility tree.** Lighthouse `agent-accessibility-tree` scores
  1 (binary, "All audits passed") on both form factors; corroborated by the
  local Agent-UX heuristic (100/100 on all three pages checked).
- **INFO — No deliberate per-purpose robots.txt groups.** Unchanged from
  baseline: every AI agent (training, search, user-triggered) falls through
  to the single permissive `*` group. Not a failure — a single group is a
  valid policy — but it means the site cannot currently express different
  rules by purpose (e.g. allow search citation, block training) if that
  policy is ever wanted.
- **NOT TESTED — WAF treatment of agent traffic (`--ua-matrix`).** Not run;
  no explicit authorization on record for this task. Remains open to verify
  once authorized.

### P1

- **PASS — `llms-txt` (fixed, see table above).**
- **PASS — Sitemap URL in robots.txt (fixed, see table above).**
- **PASS — User-triggered agents are not blocked at the root** (`Claude-User`,
  `ChatGPT-User`, `Perplexity-User`, `Google-Agent` all resolve to the
  permissive `*` group).
- **PASS — Unknown URLs return a real 404**, no catch-all 200.
- **INFO — No `Content-Signal` preference declared.** Unchanged, optional,
  draft status (see Standards status below).
- **INFO — No Markdown sibling / negotiation** (`/index.md` is a clean 404,
  no `Vary: Accept`, no `rel="alternate" type="text/markdown"`). Unchanged
  from baseline in substance (previously it was a 500, now correctly absent);
  still an opportunity, not a defect, per the skill's rule that no consumer
  agent is confirmed to request Markdown.
- **PASS — `<html lang>` present (fixed, see table above).**

### P2 / P3 (unchanged — opportunities, not defects)

- No WebMCP tools registered (`registerTool_call_sites: 0`,
  `navigator.modelContext`/`document.modelContext` both false; Lighthouse
  `webmcp-*` audits all `notApplicable`). The contact form (`/contacto`) and
  Calendly booking link (`/servicios`) remain reasonable, optional
  candidates for a later imperative WebMCP tool. WebMCP is a W3C Community
  Group draft (WebKit opposes it, Mozilla neutral); its absence is not a
  defect.
- No `/.well-known/api-catalog`, OAuth metadata, `ai-catalog.json`,
  `agent-card.json`, or `/.well-known/ucp` — all 404, all optional and only
  relevant if the site operates the matching service.

## Access policy (reported separately per the skill's rule)

- **Training** (`GPTBot`, `ClaudeBot`, `CCBot`, `Google-Extended`,
  `Applebot-Extended`): allowed at root via the single `*` group. No
  training-specific opt-out declared. Unchanged from baseline.
- **Search** (`OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`): allowed
  at root via the same `*` group; all three vendors document honouring
  robots.txt for these tokens. Unchanged from baseline.
- **User-triggered** (`ChatGPT-User`, `Claude-User`, `Perplexity-User`,
  `Google-Agent`): allowed at root via the same `*` group. Per
  vendor-matrix.md (checked 2026-09-23), `ChatGPT-User` "may not apply",
  `Perplexity-User` and `Google-Agent` "generally ignore" robots.txt, and
  only `Claude-User` is documented to honour it. The group is fully
  permissive anyway, so this has no practical effect today, but robots.txt
  still cannot be relied on to protect any path from user-triggered agents —
  any future admin/account area must use authentication, not Disallow rules.

## Standards status (drafts/proposals, dated per vendor-matrix.md, checked 2026-09-23)

- **WebMCP** — W3C Community Group draft, not a standard. WebKit opposes it,
  Mozilla is neutral, Chrome origin trial M149–M156 (no ship milestone
  announced). Not present on this site; absence is an opportunity, not a
  defect.
- **Content-Signal** — Cloudflare CC0 policy + IETF individual draft
  (expired 2026-04-04); a preference, not enforcement. No Google statement
  found. Not present on this site.
- **ai-catalog.json (Agentic Resource Discovery, ARD)** — ARD spec 1.0,
  checked by Lighthouse 13.5's `ard-schema` audit (confirmed `notApplicable`
  this run, consistent with no catalog signalled). Only relevant if the site
  later exposes an MCP server, A2A agent, or similar resource.
- **Web Bot Auth** — IETF draft `draft-ietf-webbotauth-httpsig-protocol-00`
  (2026-09-01). Not evaluated here (no signature verification requested).

## Recommendations (remaining, ordered)

1. **No P0/P1 action required right now** — all four baseline defects are
   fixed and no new P0/P1 failures were found. Treat this as a clean
   re-audit pass.
2. **Optional — decide and declare a Content-Signal policy** per robots.txt
   group once there is an explicit training/search/user-access policy to
   state (e.g. `Content-Signal: search=yes, ai-input=yes, ai-train=no`).
   Preference only; does not enforce access and Google has not stated it
   acts on it.
3. **Optional — re-run Lighthouse without the `es_ES` locale artifact** (unset
   `LANG` or target `https://mparchistudio.com/it` directly) to confirm the
   3/3 result holds on the default-locale page with no redirect hop; this
   run already shows no reason to expect a different result, since the same
   Next.js template and llms.txt (domain-root, not locale-scoped) serve all
   three locales.
4. **Optional — WAF/UA-matrix test** once the site owner authorizes it, to
   verify verified AI agent user agents are not blocked or CAPTCHA'd
   (currently "not tested", not "failed").
5. **Optional, longer-term** — if `/contacto` or the Calendly booking flow on
   `/servicios` should become directly actionable by agents (not just
   readable), consider an imperative WebMCP tool bound to the existing form
   handler. Purely optional; WebMCP remains a draft with mixed browser
   support.

No claim is made that any of the above will change ranking, citation, or
traffic; these are agent-access and agent-readability observations only.
