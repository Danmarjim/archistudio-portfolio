# Revisión — `seo/d0b-csp`

La Content Security Policy pasa de **observación** (`Content-Security-Policy-Report-Only`, desde el 8 oct) a **obligatoria** (`Content-Security-Policy`). Es la tarea D0b de la [fase 3](../planes/fase-3.md).

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

## Qué validar

**Daniel**
- [ ] En la preview desplegada: la cabecera incluye `vercel.live` y la barra de Vercel funciona.
- [ ] En la preview: consola sin errores de CSP en home, un servicio, una guía y contacto.
- [ ] Tras publicar: consola limpia en producción y Speed Insights sigue recibiendo datos.

## Cómo mergear

El cambio es solo `next.config.ts` y no depende del contenido de las demás ramas. Dos opciones:
- **Junto con la PR 2:** se mergea después de `feat/seo-fase-2-pr2`, como el resto.
- **Antes, sola:** `git cherry-pick c4441c7` sobre `main`, como se hizo con Speed Insights. Comprobado: se aplica sin conflictos. La rama sale de la base, así que mergearla entera en `main` arrastraría la PR 2.
