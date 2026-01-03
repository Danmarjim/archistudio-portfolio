# Roadmap - Portfolio Arquitectura

Documento de planificación para futuras iteraciones del proyecto.

---

## Estado Actual (Enero 2026)

### ✅ Completado

#### Fase 1-8: Fundamentos
- [x] Setup inicial con Next.js 15 + TypeScript + Tailwind CSS
- [x] Sistema de componentes (ui, sections, layout)
- [x] Páginas principales (inicio, proyectos, sobre-mí, servicios, contacto)
- [x] Sistema de proyectos con MDX
- [x] Galería de imágenes mejorada
- [x] Dark mode (pausado - requiere contenido real)

#### Fase 9: Carrusel de Proyectos
- [x] Componente ProjectsCarousel con Framer Motion
- [x] Navegación (flechas, dots, thumbnails)
- [x] Gestos (swipe, drag)
- [x] Autoplay con progress bar
- [x] A/B testing con query params (?variant=carousel|grid)

#### Fase 11: Internacionalización
- [x] Implementación next-intl
- [x] Routing multiidioma ([locale])
- [x] Estructura de proyectos MDX multiidioma (es/en/it)
- [x] Sistema de fallback a español
- [x] Traducción de componentes principales
- [x] LanguageSwitcher

#### Documentación
- [x] GUIA-DESARROLLO.md - Guía técnica exhaustiva
- [x] GUIA-CONTENIDO.md - Guía para gestión de contenido
- [x] CLAUDE.md - Contexto para Claude Code
- [x] BITACORA.md - Historial de desarrollo

---

## 🎯 Próximos Pasos Inmediatos

### 1. Configuración del Dominio

**Prioridad: ALTA**

#### Acciones:
1. **Decidir nombre de dominio**
   - Registrar `.it` (principal)
   - Registrar `.com` (opcional, redirige a .it)

2. **Registrar dominio**
   - Opción recomendada: Cloudflare o Namecheap
   - Ver `GUIA-DESARROLLO.md` sección "Dominio personalizado"

3. **Configurar en Vercel**
   ```bash
   vercel domains add tudominio.it
   vercel domains add www.tudominio.it
   ```

4. **Configurar DNS en registrador**
   - Copiar nameservers o registros A/CNAME de Vercel
   - Tiempo de propagación: 24-48 horas

5. **Verificar SSL**
   - Vercel genera certificado SSL automáticamente
   - Verificar HTTPS funcionando

#### Recursos:
- GUIA-DESARROLLO.md → Sección "Despliegue"
- Vercel Docs: https://vercel.com/docs/projects/domains

---

### 2. Contenido Real

**Prioridad: ALTA**

El sitio actualmente usa contenido mock. Necesita reemplazarse con contenido real.

#### Proyectos
- [ ] Definir 6-10 proyectos principales
- [ ] Fotografía profesional de proyectos
- [ ] Redactar descripciones únicas
- [ ] Marcar 3-4 como destacados
- [ ] Traducir proyectos principales a inglés e italiano

**Ubicación:** `content/projects/es/`
**Guía:** `GUIA-CONTENIDO.md`

#### Imágenes
- [ ] Optimizar imágenes de proyectos (TinyPNG, Squoosh)
- [ ] Formato: JPG, 1920x1280px, <500KB
- [ ] Nomenclatura: `nombre-proyecto-descripcion.jpg`
- [ ] 5-8 imágenes por proyecto

**Ubicación:** `public/images/projects/`

#### Textos de interfaz
- [ ] Revisar traducciones en `messages/es.json`
- [ ] Completar traducciones en `messages/en.json`
- [ ] Completar traducciones en `messages/it.json`

#### Información personal
- [ ] Actualizar biografía en página "Sobre mí"
- [ ] Foto profesional de la arquitecta
- [ ] Actualizar datos de contacto en `src/lib/constants.ts`
- [ ] Configurar email real de contacto

---

### 3. Formulario de Contacto Funcional

**Prioridad: MEDIA**

Actualmente el formulario es solo UI, no envía emails.

#### Opciones:

**Opción A: Resend (Recomendado)**
- API moderna y sencilla
- 100 emails gratis/día
- Configuración en 10 minutos

```bash
npm install resend
```

**Opción B: SendGrid**
- Más completo pero más complejo
- 100 emails gratis/día

**Opción C: Formspree**
- No requiere código backend
- Plan gratuito limitado

#### Acciones:
1. [ ] Elegir proveedor de email
2. [ ] Crear API route en `src/app/api/contact/route.ts`
3. [ ] Integrar con formulario en `src/app/[locale]/contacto/page.tsx`
4. [ ] Configurar variables de entorno
5. [ ] Testear envío de emails

---

### 4. SEO y Metadata

**Prioridad: MEDIA**

Optimizar para motores de búsqueda.

#### Acciones:
- [ ] Actualizar metadata en cada página
- [ ] Añadir Open Graph images
- [ ] Configurar Google Analytics o Plausible
- [ ] Crear `robots.txt` personalizado (ya existe básico)
- [ ] Mejorar `sitemap.xml` con metadata adicional
- [ ] Añadir Schema.org markup para proyectos

#### Archivo a modificar:
- Cada `page.tsx` tiene su `metadata` object
- `src/app/sitemap.ts` para sitemap

---

### 5. Performance y Optimización

**Prioridad: BAJA (para después del contenido real)**

#### Acciones:
- [ ] Audit con Lighthouse
- [ ] Optimizar imágenes con next/image (ya implementado)
- [ ] Implementar lazy loading donde corresponda
- [ ] Revisar bundle size
- [ ] Añadir analytics de performance (Vercel Analytics)

---

## 🚀 Mejoras Futuras (Post-MVP)

### Fase 10: CMS (Opcional)
Si se desea gestionar contenido sin tocar archivos:
- Sanity.io (recomendado)
- Contentful
- Strapi

**Estado:** No prioritario, MDX es suficiente para MVP

### Blog/Noticias
- Sistema similar a proyectos
- `content/blog/[locale]/`
- Página de listado y detalle

### Animaciones Avanzadas
- Scroll-triggered animations
- Page transitions con Framer Motion
- Parallax effects

### Filtrado de Proyectos
- Filtros por categoría
- Filtros por año
- Búsqueda por tags

### Modo Oscuro (Retomar Fase 8)
- Implementar dark mode completo
- Toggle en Header
- Persistencia de preferencia
- Respeto a preferencia del sistema

### Galería Mejorada
- Lightbox avanzado
- Zoom en imágenes
- Galería fullscreen
- Comparación antes/después

### Testimonios
- Sección de reseñas de clientes
- Carrusel de testimonios

### Mapa Interactivo
- Ubicación del estudio
- Mapa de proyectos realizados

---

## 📋 Checklist Pre-Launch

Antes de lanzar el sitio oficialmente:

### Contenido
- [ ] Todos los proyectos tienen contenido real
- [ ] Todas las imágenes están optimizadas
- [ ] Textos revisados sin errores ortográficos
- [ ] Traducciones completas (al menos es + en)
- [ ] Información de contacto actualizada

### Técnico
- [ ] Dominio configurado y funcionando
- [ ] SSL/HTTPS activo
- [ ] Formulario de contacto envía emails
- [ ] Todos los links funcionan
- [ ] Responsive en móvil/tablet/desktop
- [ ] Testeado en Chrome, Safari, Firefox
- [ ] Lighthouse score >90 en todas las métricas

### SEO
- [ ] Metadata completa en todas las páginas
- [ ] Sitemap generado correctamente
- [ ] Google Search Console configurado
- [ ] Analytics configurado
- [ ] Favicon en todos los tamaños

### Legal
- [ ] Política de privacidad (si aplica)
- [ ] Cookies consent (si usa cookies de terceros)
- [ ] Términos de uso (opcional)

---

## 🛠️ Decisiones Técnicas Pendientes

### A/B Testing: Carousel vs Grid
**Estado:** Implementado sistema A/B con `?variant=carousel|grid`
**Default actual:** `grid`

**Acción requerida:**
1. Recolectar feedback de usuarios
2. Decidir cuál desplegar definitivamente
3. Eliminar variante no usada del código

**Ubicación:** `src/app/[locale]/page.tsx` → `DEFAULT_VARIANT`

### Dark Mode
**Estado:** Pausado en Fase 8
**Razón:** Esperar a tener contenido real para definir paleta de oscuros

**Acción futura:**
- Con contenido real, definir si dark mode aporta valor
- Si sí, retomar desde branch `feature/dark-mode-implementation`

---

## 📊 Métricas de Éxito

Objetivos post-lanzamiento:

- [ ] 100+ visitas/mes en primer mes
- [ ] 5+ consultas por formulario en primer mes
- [ ] Lighthouse score >90
- [ ] Tiempo de carga <2 segundos
- [ ] 0 errores de consola en producción

---

## 🔄 Flujo de Trabajo Recomendado

Cuando retomes el proyecto:

1. **Revisar este documento (ROADMAP.md)**
2. **Leer BITACORA.md** para contexto de últimos cambios
3. **Actualizar dependencias** (si ha pasado tiempo)
   ```bash
   npm outdated
   npm update
   ```
4. **Verificar que el sitio funciona localmente**
   ```bash
   npm run dev
   ```
5. **Elegir tarea de "Próximos Pasos"**
6. **Crear branch para la feature**
   ```bash
   git checkout -b feature/nombre-tarea
   ```
7. **Desarrollar y testear**
8. **Merge a main y deploy**

---

## 📞 Recursos y Contactos

### Documentación del proyecto
- `GUIA-DESARROLLO.md` - Setup y desarrollo
- `GUIA-CONTENIDO.md` - Gestión de contenido
- `CLAUDE.md` - Contexto para Claude Code
- `BITACORA.md` - Historial de cambios

### Stack principal
- Next.js 16: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion
- next-intl: https://next-intl-docs.vercel.app

### Servicios externos
- Vercel (hosting): https://vercel.com
- Cloudflare (opcional, DNS): https://cloudflare.com
- Resend (emails): https://resend.com

---

## 🎨 Decisiones de Diseño Pendientes

Con contenido real, revisar:

- [ ] Paleta de colores definitiva
- [ ] Tipografía (¿mantener Playfair Display + Inter?)
- [ ] Espaciados y sizing
- [ ] Animaciones (¿más sutiles o más evidentes?)
- [ ] Orden de secciones en homepage

---

*Última actualización: Enero 2026*
*Proyecto en fase: MVP funcional - Pendiente contenido real y dominio*
