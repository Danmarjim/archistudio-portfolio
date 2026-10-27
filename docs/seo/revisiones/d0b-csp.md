# Revisión — `seo/d0b-csp`

**✅ En producción desde el 15 oct** (`main`, `dc2b813`, cherry-pick de `c4441c7`). La Content Security Policy pasa de **observación** (`Content-Security-Policy-Report-Only`, desde el 8 oct) a **obligatoria** (`Content-Security-Policy`). Es la tarea D0b de la [fase 3](../planes/fase-3.md).

## Qué se ha hecho

`next.config.ts`:
- La misma política que en observación, ahora aplicada: solo se cargan recursos de `mparchistudio.com` (scripts, estilos, imágenes, fuentes, vídeo, conexiones). Se añade `frame-src 'self'`.
- **Solo en los despliegues de preview** (`VERCEL_ENV=preview`, leído al compilar) se permiten los orígenes de la [Vercel Toolbar](https://vercel.com/docs/vercel-toolbar/managing-toolbar) (`vercel.live`, `vercel.com`, `assets.vercel.com`, `ws-us3.pusher.com`). En producción y en local no aparecen.

## Antes de cambiarla

- **Producción, una semana en observación:** 11 páginas recorridas hasta el final (home, proyectos, ficha, servicios, sobre mí, contacto, noticias, dos artículos, tappeti y privacy): 0 violaciones. El método se validó provocando una violación, que sí apareció en la consola. Vercel Analytics se sirve desde `/_vercel`, el mismo dominio.
- **Código de la preview:** ningún script, iframe ni fuente externa. Calendly, Google Maps y las redes son enlaces; el vídeo de `/tappeti` es propio; el formulario envía a `/api/contact`, y Resend se llama desde el servidor.

## Verificación (15 oct, build de producción de `preview/seo-completa` en local)

- La cabecera es `Content-Security-Policy`, sin `vercel.live`.
- 39 páginas recorridas con la CSP aplicada: las 34 URLs en italiano del sitemap (servicios y guías incluidos), `/es`, `/en`, `/es/contacto`, `/en/services` y `/privacy`. Resultado: **0 violaciones**, todas hidratan y el vídeo de `/tappeti` carga.
- Build sin errores; lint sin problemas.

## Publicación (15 oct)

- Antes del push, build de `main` con el cambio en local: 27 páginas (todas las de `main` en italiano y varias en es/en) con **0 violaciones**, todas hidratan y el vídeo de `/tappeti` carga.
- Push a `main` → producción con la cabecera `Content-Security-Policy` en ~80 s, sin `vercel.live`.
- En vivo (home, ficha de proyecto, tappeti, contacto): consola sin errores, la página hidrata, el vídeo carga y Vercel Analytics sigue enviando visitas.
- Speed Insights también funciona con la CSP: en Vercel no se sirve desde `/_vercel/speed-insights/`, sino desde una ruta ofuscada del mismo dominio (`/c0ff2cb3790a0026/script.js` y `/c0ff2cb3790a0026/vitals`, para esquivar los bloqueadores de anuncios). Ambas responden 200 en producción. Como es el mismo dominio, `'self'` lo cubre.

## Qué validar

**Daniel**
- [x] Preview del 20 oct (`4057c19`): la cabecera incluye los orígenes de la barra de Vercel (`vercel.live`, `pusher`…) y home, un servicio, una guía, contacto, tappeti, `robots.txt`, `llms.txt` y el sitemap responden 200.
- [ ] Al abrir la preview con sesión de Vercel: la barra aparece y no hay errores de CSP en consola.

## Cómo mergear

Ya está en `main` por cherry-pick (decisión del 15 oct: es seguridad, no SEO, y no depende de Martina). Cuando se mergee la PR 2, `next.config.ts` ya tendrá el cambio y Git lo reconoce como aplicado. No hace falta nada más.
