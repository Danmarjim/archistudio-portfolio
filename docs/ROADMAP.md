# Roadmap

Funcionalidades pendientes de implementar.

---

## Pendiente

### Dominio personalizado

Configurar `mparchistudio.it` y `mparchistudio.com` apuntando a Vercel.

Pasos:
1. En Vercel → Project Settings → Domains → añadir dominio
2. En el registrador del dominio, añadir los DNS records que indica Vercel
3. Actualizar `NEXT_PUBLIC_SITE_URL` en las variables de entorno de Vercel

---

### Analytics

Instalar analíticas para ver tráfico y páginas más visitadas.

Opciones:
- **Vercel Analytics** (integrado, sin cookies) — recomendado para empezar
- **Plausible** (privacidad, pago)
- **Google Analytics** (gratuito, más completo)

---

## Completado

- Formulario de contacto funcional: `src/app/api/contact/route.ts` envía emails vía Resend, conectado al formulario de `/contacto`. `RESEND_API_KEY` configurada en `.env.local` y en Vercel (producción). Emails llegando correctamente al email personal
- Portfolio trilingüe (IT/ES/EN) con next-intl
- 7 proyectos con galería lightbox y auto-discovery de imágenes
- 3 noticias con categorías y galería
- Deploy automático en Vercel
- Sitemap y robots.txt estáticos
- Fix de Lambda 250MB (`outputFileTracingExcludes`)
- Documentación actualizada (README, CLAUDE.md, docs/)
