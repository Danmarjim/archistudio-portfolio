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

### Formulario de contacto funcional

Código implementado: `src/app/api/contact/route.ts` (endpoint que llama a [Resend](https://resend.com)) y el formulario en `/contacto` ya está conectado a él.

Falta solo la configuración de la cuenta:
- Crear cuenta en Resend y verificar el dominio de envío (`mparchistudio.it`/`.com`)
- Añadir `RESEND_API_KEY` en `.env.local` (local) y en las variables de entorno de Vercel (producción)
- Opcional: `CONTACT_TO_EMAIL` (destinatario, por defecto `siteConfig.email`) y `CONTACT_FROM_EMAIL` (remitente verificado; hasta verificar el dominio se usa `onboarding@resend.dev` de Resend)
- Ejecutar `npm install` para instalar la dependencia `resend` añadida a `package.json`

---

### Analytics

Instalar analíticas para ver tráfico y páginas más visitadas.

Opciones:
- **Vercel Analytics** (integrado, sin cookies) — recomendado para empezar
- **Plausible** (privacidad, pago)
- **Google Analytics** (gratuito, más completo)

---

## Completado

- Portfolio trilingüe (IT/ES/EN) con next-intl
- 7 proyectos con galería lightbox y auto-discovery de imágenes
- 3 noticias con categorías y galería
- Deploy automático en Vercel
- Sitemap y robots.txt estáticos
- Fix de Lambda 250MB (`outputFileTracingExcludes`)
- Documentación actualizada (README, CLAUDE.md, docs/)
