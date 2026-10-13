# Reindexación tras el cambio de URLs (D0) — 12 oct 2026

Cuatro días después del cambio a URLs en italiano (PR 1, 8 oct), Search Console avisó por email de un motivo nuevo: **"Duplicada: Google ha elegido una versión canónica diferente a la del usuario"** (4 páginas). Informe de páginas: 53 indexadas y 32 sin indexar (4 motivos). Inspeccionadas con la API de URL Inspection las 63 URLs del sitemap de producción y 10 URLs antiguas. Datos completos: [`inspect.json`](inspect.json).

## Las 4 duplicadas

| URL nueva (canónica declarada) | Canónica que elige Google | Último rastreo |
|---|---|---|
| `/progetti` | `/proyectos` | 10 oct |
| `/servizi` | `/servicios` | 10 oct |
| `/contatti` | `/contacto` | 8 oct |
| `/chi-sono` | `/sobre-mi` | 8 oct |

**Causa:** Google conserva como canónica la URL antigua, que tiene en el índice desde antes ("Enviada e indexada", último rastreo el **8 oct**, el mismo día del cambio y antes del despliegue). Hasta que vuelva a rastrear la antigua y vea la redirección, sigue prefiriéndola.

**En la web está todo bien:**
- Las antiguas devuelven **308** a las nuevas.
- Las nuevas declaran su propia canónica, con `hreflang` correcto.
- No hay enlaces internos a las antiguas.
- Los perfiles externos (Spazi Belli, Homify) enlazan solo a la home.

No hace falta cambiar código: se resuelve cuando Google rastrea de nuevo las antiguas.

## Resto del informe

| Estado (API) | URLs | Qué es | Acción |
|---|---|---|---|
| Indexada | 48 | — | — |
| Desconocida para Google | 14 | Casi todas versiones `/en/` y `/es/` (p. ej. `/en/projects`, `/en/services`, `/es/news`) y `/progetti/cucina-parigina` | Normal en un sitio pequeño: entran poco a poco desde el sitemap. Pedir indexación de las prioritarias |
| Descubierta, sin indexar | 2 | `/es/contacto`, `/en/news/collezione-tappeti-sevilla` | Esperar |
| Rastreada, sin indexar | 2 | `/en/servicios` (antigua, redirige) y `/es/proyectos/casa-archi-colori` (rastreada el 19 sep, antes de las mejoras) | Pedir indexación de la segunda |
| Página con redirección (informe de GSC, 3) | — | URLs antiguas | Correcto |

El sitemap tiene 63 URLs enviadas, 0 errores.

## Qué hacer en Search Console (manual, ~10 solicitudes cada 24 horas)

**Día 1** — corregir las duplicadas. ✅ **Hecho el 12 oct**: las 8 solicitudes aceptadas ("Se ha añadido la URL a una cola de rastreo prioritaria") y validación iniciada el 12/10/26.
1. Inspeccionar cada URL **antigua** → **Solicitar indexación**: `/proyectos`, `/servicios`, `/contacto`, `/sobre-mi`. Al rastrearlas, Google ve el 308 y pasa la canónica a la nueva.
2. Inspeccionar cada URL **nueva** → **Solicitar indexación**: `/progetti`, `/servizi`, `/contatti`, `/chi-sono`.
3. Informe *Páginas* → "Duplicada: Google ha elegido…" → **Validar corrección**.

**Día 2 (13 oct)** — las que Google no conoce: ✅ `/progetti/cucina-parigina` y `/en/services`. Después, **"Cuota superada"**: el límite son **~10 solicitudes en 24 horas seguidas** (no por día natural), y las 8 del 12 oct contaban todavía.

**Día 3 (14 oct, a partir de ~10:00)** — las 6 que quedan: `/en/projects`, `/es/proyectos/casa-archi-colori`, `/es/proyectos/cucina-mite`, `/es/proyectos/cucina-parigina`, `/en/news`, `/es/news`.

Nota de proceso: esperar siempre al aviso verde "Se ha solicitado la indexación" antes de pasar a otra URL. Cerrar la prueba antes de tiempo la cancela (le pasó a `/en/projects` el 13 oct).

**Repetir la inspección** hacia el 19 oct (`/seo google inspect-batch` con las mismas URLs). Lo esperado: las 4 duplicadas pasan a indexadas y las antiguas a "Página con redirección".
