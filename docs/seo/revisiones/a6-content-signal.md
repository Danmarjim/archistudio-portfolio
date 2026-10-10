# Revisión — `seo/a6-content-signal`

Política de uso por la IA en `robots.txt`, decidida tras A6 ([informe de agentes](../auditorias/2026-10-10-agentes/README.md)): los textos y fotos se pueden usar para **buscar** y para **responder** con IA, pero **no para entrenar** modelos.

## Qué se ha hecho

```
User-Agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /
Disallow: /api/

Sitemap: https://mparchistudio.com/sitemap.xml
```

- `src/app/robots.ts` → `src/app/robots.txt/route.ts`: el formato de Next (`MetadataRoute.Robots`) no admite líneas propias. Mismas reglas y mismo sitemap que antes; se genera al compilar.
- `Content-Signal` es una **preferencia declarada** (borrador IETF y política de Cloudflare), no un bloqueo, y **no afecta a Google Search**. No se han añadido `Disallow` para GPTBot, ClaudeBot ni Google-Extended: si algún día se quiere hacer cumplir, se añaden grupos con nombre.

## Qué validar

**Daniel**
- [ ] `/robots.txt` en la preview: el texto de arriba, `Content-Type: text/plain`.
- [ ] Tras publicar: Search Console → Configuración → robots.txt sin errores.

## Cómo mergear

Después de `feat/seo-fase-2-pr2`. Independiente de las demás ramas.
