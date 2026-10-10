# Roadmap

Funcionalidades pendientes de implementar.

---

## Pendiente

### Dominio `mparchistudio.it`

`mparchistudio.com` ya está en producción. Si también se tiene `mparchistudio.it`, conviene añadirlo en Vercel (Project Settings → Domains) como **redirect 308 a `mparchistudio.com`**, nunca como segundo sitio con el mismo contenido.

### SEO

Ver `docs/seo/ESTADO.md`.

---

## Completado

- Formulario de contacto funcional: `src/app/api/contact/route.ts` envía emails vía Resend, conectado al formulario de `/contacto`. `RESEND_API_KEY` configurada en `.env.local` y en Vercel (producción). Emails llegando correctamente al email personal
- Portfolio trilingüe (IT/ES/EN) con next-intl
- 8 proyectos con galería lightbox y auto-discovery de imágenes
- 8 noticias con categorías y galería
- Deploy automático en Vercel
- Sitemap (con hreflang) y robots.txt estáticos
- Fix de Lambda 250MB (`outputFileTracingExcludes`)
- Documentación actualizada (README, CLAUDE.md, docs/)
- Dominio `mparchistudio.com` en producción (DNS gestionado en Vercel) y verificado en Google Search Console
- Vercel Analytics instalado
- SEO fase 1 y PR 1 de la fase 2 (oct 2026): ver `docs/seo/ESTADO.md`
