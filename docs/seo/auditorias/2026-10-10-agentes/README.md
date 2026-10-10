# Preparación para agentes de IA (A6) — 10 oct 2026

Si un agente que navega por la web (el navegador de ChatGPT, Gemini en Chrome, Claude in Chrome, Comet) puede leer el sitio y usarlo: árbol de accesibilidad, rendimiento, política de acceso y la capa de `llms.txt`. Método de `/seo agentic`, sobre la build local de `seo/preview-completa` (`localhost:3107`) y, para el firewall, sobre producción.

## Resumen

- **Lighthouse Agentic Browsing: 3/3** en las 6 páginas probadas (home, `/contatti`, `/en/contact`, ArchiAdvice, guía del baño, `/progetti`), en móvil y en escritorio. Lighthouse 13.5.0, Chrome 154 headless, 10 oct 2026.
- **P0 que fallan: 0.** Lo que más limita hoy a un agente: nada medible. Lo pendiente es opcional o una decisión de política.

## Lighthouse Agentic Browsing

| Auditoría | Resultado | Nota |
|---|---|---|
| `agent-accessibility-tree` | ✅ pasa | 33 reglas axe (nombres, etiquetas, ARIA). Las noticias con galería suspendían por `button-name` antes de [A5](../2026-10-10-lighthouse/README.md) |
| `cumulative-layout-shift` | ✅ pasa | CLS 0 en las 102 páginas |
| `llms-txt` | ✅ pasa | H1, enlaces Markdown y más de 50 caracteres (generado en `src/app/llms.txt/route.ts`) |
| `webmcp-form-coverage`, `webmcp-registered-tools`, `webmcp-schema-validity` | N/A | El Chrome de la prueba no tiene WebMCP; no es un defecto |
| `ard-schema` | N/A | No hay `ai-catalog.json` (no hace falta: no hay recursos para agentes) |

N = 3 porque las auditorías N/A no cuentan. La única forma de subir N sería WebMCP en el formulario de contacto o un `ai-catalog.json`; ninguna aporta hoy.

## Comprobaciones HTTP y de marcado

| Prioridad | Check | Resultado |
|---|---|---|
| P0 | Contenido sin JavaScript (`server-rendered`) | ✅ 438 palabras en el HTML de la home |
| P0 | `robots.txt` accesible | ✅ |
| P0 | Firewall (Vercel) con user agents de IA, **en producción** | ✅ GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot y Perplexity-User reciben lo mismo que un navegador (200, sin desafío). Es el trato a tráfico **no verificado**, no prueba de que el agente real pase |
| P0 | Grupos de `robots.txt` por agente de IA | ℹ️ Todos caen en `User-Agent: *` (todo permitido salvo `/api/`). Correcto si la política es la misma para todos |
| P1 | Rutas privadas | ✅ Solo `/api/`, y no hay contenido privado |
| P1 | URL inexistente → 404 real | ✅ |
| P1 | `llms.txt` | ✅ 200, `text/plain` (`llms-full.txt` no existe; es opcional) |
| P1 | `Content-Signal` | ℹ️ No declarado (decisión pendiente, abajo) |
| P1 | Markdown (`.md` o `Accept: text/markdown`) | ℹ️ No se ofrece. Ningún agente conocido lo pide; no se recomienda |
| P1 | Estados de confirmación visibles, menús sin hover obligatorio | No comprobado (no hay check automático) |
| P2–P3 | WebMCP, API Catalog, OAuth, A2A, UCP, `ai-catalog.json` | N/A: no hay API, tienda ni herramientas |

La comprobación del árbol con Playwright (`agent_ux_check.py`) no puede abrir `localhost`: su protección SSRF corta las peticiones a IPs privadas. Su función la cubre `agent-accessibility-tree` de Lighthouse.

## Política de acceso

- **Entrenamiento** (GPTBot, ClaudeBot…): permitido (grupo `*`).
- **Búsqueda con IA** (OAI-SearchBot, Claude-SearchBot, PerplexityBot): permitido.
- **Agentes a petición del usuario** (ChatGPT-User, Claude-User, Perplexity-User): permitido; además no siempre leen `robots.txt`.

**Decisión pendiente (Daniel/Martina):** ¿se permite usar los textos y fotos para **entrenar** modelos? Si no, se añade `Content-Signal: search=yes, ai-input=yes, ai-train=no` al grupo `*` y, si se quiere hacer cumplir, grupos `Disallow` para GPTBot, ClaudeBot y Google-Extended, sin tocar los de búsqueda. `Content-Signal` es una preferencia (borrador IETF y política de Cloudflare), no una obligación, y **no afecta a Google Search**.

## Estado de los estándares (10 oct 2026)

WebMCP: borrador de un Community Group del W3C (WebKit en contra, Mozilla neutral). Content-Signal: borrador IETF + política CC0 de Cloudflare. ARD/`ai-catalog.json`: propuesta. `llms.txt`: convención de la comunidad; Lighthouse lo valida, pero Google Search no lo usa.

## Cómo repetirlo

```bash
npm run build && PORT=3107 npm run start
CLAUDE_SEO_LOCAL_TARGETS=localhost:3107 claude-seo run agentic_check.py http://localhost:3107/ --json
npx lighthouse@13.5.0 http://localhost:3107/contatti --only-categories=agentic-browsing --output=json
claude-seo run agentic_check.py https://mparchistudio.com/ --ua-matrix --json   # firewall, solo producción
```
