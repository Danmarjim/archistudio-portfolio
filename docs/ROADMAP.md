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

Actualmente el formulario `/contacto` tiene la UI lista pero no envía emails.

Implementación pendiente con [Resend](https://resend.com):
- Crear cuenta en Resend y verificar el dominio de envío
- Añadir variable de entorno `RESEND_API_KEY`
- Crear `src/app/api/contact/route.ts` que llame a la API de Resend
- Conectar el formulario existente con el endpoint

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
