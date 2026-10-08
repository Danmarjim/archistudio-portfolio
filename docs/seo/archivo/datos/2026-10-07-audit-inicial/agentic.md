# Agent-readiness audit — https://mparchistudio.com/

Checked 2026-10-07. Tool facts baseline (vendor-matrix.md): 2026-09-23.

## Lighthouse Agentic Browsing fraction

**Not available this run.** Both `psi-mobile` and `psi-desktop` calls to
`lighthouse_agentic.py` returned `HTTP 429 — Quota exceeded for quota metric
'Queries' and limit 'Queries per day'` for the shared anonymous PSI key.

- No Google API key is configured for this environment, so the fraction
  could not be measured (not a site defect).
- Expected shape once a key is configured or `npx lighthouse@latest
  https://mparchistudio.com/ --only-categories=agentic-browsing --output=json`
  is run locally: with no WebMCP and no `ai-catalog.json`, the baseline
  counted audits are `agent-accessibility-tree` + `cumulative-layout-shift`
  (N=2). Because `/llms.txt` currently returns HTTP 500 (not a 404), the
  Lighthouse `llms-txt` audit rule ("5xx or fetch error scores 0") means it
  would also be counted and would **fail**, giving an expected **X/3** until
  the 500 is fixed — this is a prediction from the documented scoring rule,
  not a measured result.
- Recommendation: configure a Google API key (`/seo google setup`) or rerun
  with `--from-json` against a local Lighthouse CLI report to get the real
  `X/N`.

## Agent-UX heuristic (accessibility-tree quality, local 0-100 scale)

Ran `agent_ux_check.py` on three pages. All three completed (`score_status:
complete`, Chromium render succeeded, no partial-run reasons).

| Page | Score | Buttons | Landmarks | Unnamed interactive | Inputs w/o label | Inputs w/o aria |
|---|---|---|---|---|---|---|
| `/` | 100/100 | 4 real `<button>` | 10 | 0 | 0 | 0 |
| `/contacto` (contact form) | 100/100 | 5 real `<button>` | 4 | 0 | 0 | 3 |
| `/servicios` (Calendly link page) | 100/100 | 4 real `<button>` | 11 | 0 | 0 | 0 |

Evidence detail:
- Zero `div_onclick_widgets` on every page checked — no fake buttons/links
  built from unlabelled `<div onclick>`, which is the most common agent trap.
- `/contacto`: 3 inputs lack `aria-*` attributes but all have an associated
  `<label>` (`inputs_without_label: 0`, `unnamed_interactive: 0`), so this is
  not an accessible-name failure — it is a minor note, not a defect. The
  accessibility tree reports 0 unnamed interactive nodes on the live render.
- `/servicios`: the Calendly booking link/embed did not register as an
  unnamed or orphaned interactive element in the rendered tree.

This heuristic is a local approximation of Lighthouse's
`agent-accessibility-tree` audit (33 axe rules), not a replacement for it.
Keep it reported separately from the Lighthouse fraction above.

## Findings by priority

### P0

- **PASS — Primary content present without JavaScript.**
  `server-rendered`: 419 words visible with JS disabled, no JS-shell marker.
  Content is server-rendered (consistent with Next.js App Router Server
  Components per the project's stack) and readable by fetch-only agents.
- **PASS — robots.txt reachable.** HTTP 200, 1 group found (`User-agent: *`).
- **INFO — No deliberate per-purpose robots.txt groups.** Every AI agent
  (training: GPTBot, ClaudeBot, CCBot; search: OAI-SearchBot,
  Claude-SearchBot, PerplexityBot; user-triggered: ChatGPT-User, Claude-User,
  Perplexity-User, Google-Agent) falls through to the single `*` group, which
  currently allows `/` for everyone. This is not a failure (a single
  permissive group is a valid, simple policy) but it means the site cannot
  currently express "allow search citation, block training" or similar
  per-purpose rules. Optional fix only if the policy should differ by
  purpose.
- **NOT TESTED — WAF treatment of agent traffic (`waf-ua-matrix`) and CLS.**
  `--ua-matrix` was not run (no explicit authorization on record for this
  task) and the Lighthouse CLS audit could not run (PSI quota). Both remain
  open P0 items to verify once a Lighthouse run or authorized UA-matrix test
  is available.

### P1

- **FAIL — `/llms.txt` returns HTTP 500**, not a 404/absence.
  `curl -o /dev/null -w "%{http_code}"` confirms `500`; content-type is
  `text/html; charset=utf-8` (5812 bytes — looks like a framework error page,
  not an llms.txt body). Under the documented Lighthouse rule ("4xx is N/A,
  5xx or fetch error scores 0"), a 500 is worse for the Lighthouse fraction
  than simply not having the file, because it turns an informative/N-A audit
  into a counted, failing one. **Fix**: either remove whatever route/handler
  is producing the 500 for `/llms.txt` so it correctly 404s (acceptable,
  N/A), or make the route return a valid `llms.txt` (H1 heading, one Markdown
  link, 50+ characters). Given this is a Next.js App Router site, check for a
  `app/llms.txt/route.ts` or a conflicting dynamic segment crashing on this
  path.
- **Same root cause likely — Markdown sibling `/index.md` also returns
  HTTP 500** (same content-type/size pattern as `/llms.txt`). No `Vary:
  Accept` negotiation and no `rel="alternate" type="text/markdown"` link
  either (both informational absences, not failures). Worth checking
  whether a single catch-all route or middleware is throwing on any
  non-HTML extension under `/`.
- **PASS — User-triggered agents are not blocked at the root** (`Claude-User`,
  `ChatGPT-User`, `Perplexity-User`, `Google-Agent` all resolve to the
  permissive `*` group).
- **PASS — Unknown URLs return a real 404**, no catch-all 200 (soft-404 risk
  checked at a random probe path; status 404, not 200).
- **INFO — No `Content-Signal` preference declared.** Optional, draft status
  (see Standards status below).
- **DATA QUALITY BUG (outside the agentic checklist, found incidentally) —
  `robots.txt` declares `Sitemap: https://example.com/sitemap.xml`**, a
  placeholder domain, not `https://mparchistudio.com/sitemap.xml`. This
  breaks sitemap-based discovery for every crawler that reads robots.txt —
  traditional search bots and the AI search crawlers (`OAI-SearchBot`,
  `Claude-SearchBot`, `PerplexityBot`) alike — since they will attempt to
  fetch a sitemap on a domain this site does not own. **Fix**: point the
  `Sitemap:` line at the real `https://mparchistudio.com/sitemap.xml` (or
  remove the line if no sitemap exists yet).
- **ACCESSIBILITY BUG (outside the agentic checklist, found incidentally) —
  `<html>` has no `lang` attribute.** Confirmed via `curl | grep -o
  '<html[^>]*>'` → `<html>`. The project uses `next-intl` with `it`/`es`/`en`
  locale routing, so each locale's root layout should render `<html
  lang={locale}>`. A missing `lang` attribute affects screen readers and any
  agent/assistive technology that uses document language to choose a
  pronunciation/translation model; it does not change rendered content but
  is a correctness gap worth fixing in `app/[locale]/layout.tsx`.

### P2 / P3 (all currently N/A — opportunities, not defects)

- No WebMCP tools registered (`registerTool_call_sites: 0`,
  `navigator.modelContext`/`document.modelContext` both false) on the
  homepage. The site has a contact form (`/contacto`) and a Calendly booking
  link (`/servicios`) — both are reasonable, optional candidates for an
  imperative WebMCP tool later, but WebMCP is a Community Group draft
  (WebKit opposes it, Mozilla neutral) and its absence is not a defect.
- No `/.well-known/api-catalog`, OAuth metadata, `ai-catalog.json`,
  `agent-card.json`, or `/.well-known/ucp` — all 404, all optional and only
  relevant if the site operates the matching service (it does not appear to
  operate an API, A2A agent, or commerce protocol).

## Access policy (reported separately per the skill's rule)

- **Training** (`GPTBot`, `ClaudeBot`, `CCBot`, `Google-Extended`,
  `Applebot-Extended`): allowed at root via the single `*` group (all
  "honour" robots.txt per vendor docs). No training-specific opt-out is
  declared.
- **Search** (`OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`): allowed
  at root via the same `*` group; all three vendors document honouring
  robots.txt for these tokens.
- **User-triggered** (`ChatGPT-User`, `Claude-User`, `Perplexity-User`,
  `Google-Agent`): allowed at root via the same `*` group, but per
  vendor-matrix.md (checked 2026-09-23) `ChatGPT-User` "may not apply",
  `Perplexity-User` and `Google-Agent` "generally ignore" robots.txt, and
  only `Claude-User` is documented to honour it. Since the group is fully
  permissive anyway, this has no practical effect today — but it means
  robots.txt cannot be relied on to protect any path from user-triggered
  agents acting on a person's request. Any path that should be off-limits to
  such agents (e.g. a future admin/account area) must be protected by
  authentication, not Disallow rules.

## Standards status (drafts/proposals, dated per vendor-matrix.md)

- **WebMCP** — W3C Community Group draft, not a standard. WebKit opposes it,
  Mozilla is neutral, Chrome origin trial M149–M156 (no ship milestone
  announced). Checked 2026-09-23. Not present on this site; its absence is
  an opportunity, not a defect.
- **Content-Signal** — Cloudflare CC0 policy + IETF individual draft
  (expired 2026-04-04); a preference, not enforcement. No Google statement
  found; Google's robots.txt spec does not list the field. Checked
  2026-09-23. Not present on this site.
- **ai-catalog.json (Agentic Resource Discovery, ARD)** — ARD spec 1.0,
  checked by Lighthouse 13.5's `ard-schema` audit. Checked 2026-09-23. Not
  present/signalled on this site; only relevant if the site later exposes an
  MCP server, A2A agent, or similar agent resource.
- **Web Bot Auth** — IETF draft `draft-ietf-webbotauth-httpsig-protocol-00`
  (2026-09-01). Not evaluated here (no signature verification requested);
  listed for completeness per the skill's standards-status rule.

## Recommendations (ordered, each with its evidence and how to confirm)

1. **Fix the HTTP 500 on `/llms.txt` (and likely `/index.md`).**
   Evidence: `curl -o /dev/null -w "%{http_code}" https://mparchistudio.com/llms.txt`
   → `500`; same pattern on `/index.md`. Unblocks: a clean N/A or pass on
   Lighthouse's `llms-txt` audit instead of a forced fail; also removes a
   generic server-error response being served to any crawler or agent that
   requests these paths. Confirm by rerunning `agentic_check.py` and
   checking `llms.status` is no longer 500 (404 if intentionally absent, or
   200 with valid content).
2. **Correct the `Sitemap:` URL in `robots.txt`** from
   `https://example.com/sitemap.xml` to the real
   `https://mparchistudio.com/sitemap.xml` (or remove the line until a
   sitemap exists). Evidence: `curl https://mparchistudio.com/robots.txt`.
   Confirm by rerunning `agentic_check.py` and checking
   `robots.parsed.sitemap`.
3. **Add `lang="it"`/`lang="es"`/`lang="en"` to `<html>`** per locale in the
   App Router root layout. Evidence: `curl | grep -o '<html[^>]*>'` →
   `<html>`. Confirm with the same curl check per locale path
   (`/`, `/es`, `/en`).
4. **Optional — decide and declare a Content-Signal policy** per robots.txt
   group once there is an explicit training/search/user-access policy to
   state (e.g. `Content-Signal: search=yes, ai-input=yes, ai-train=no`).
   This is a preference only; it does not enforce access and Google has not
   stated it acts on it.
5. **Re-run `lighthouse_agentic.py` once PSI quota resets or a Google API
   key is configured**, to get the real `X/N` Lighthouse fraction and the
   `cumulative-layout-shift` and `agent-accessibility-tree` results instead
   of the predicted value above.

No claim is made that any of the above will change ranking, citation, or
traffic; these are agent-access and agent-readability fixes only.
