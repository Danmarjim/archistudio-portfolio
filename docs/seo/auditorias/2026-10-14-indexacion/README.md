# Indexación, segunda inspección (D0) — 14 oct 2026

Misma inspección que la del [12 oct](../2026-10-12-indexacion/README.md): las 63 URLs del sitemap de producción y 10 URLs antiguas, con la API de URL Inspection. Datos completos: [`inspect.json`](inspect.json); lista de URLs: [`urls.txt`](urls.txt).

## Resumen (63 URLs del sitemap)

| Estado | URLs |
|---|---|
| Indexada | **48** |
| Duplicada (Google elige otra canónica) | 4 |
| Descubierta, sin indexar | 4 |
| Desconocida para Google | 7 (14 el 12 oct) |

**Entraron en el índice desde el 12 oct** (rastreadas el 13 oct): `/en/projects` (sin solicitud), y tras la solicitud `/progetti/cucina-parigina`, `/es/proyectos/casa-archi-colori`, `/es/proyectos/cucina-mite`, `/es/proyectos/cucina-parigina`, `/es/news`, `/en/news`.

## Las 4 duplicadas: aún sin cambios

`/progetti`, `/servizi`, `/contatti` y `/chi-sono` siguen con la URL antigua como canónica. Google rastreó las **nuevas** el 12 oct, pero las **antiguas** (`/proyectos`, `/servicios`, `/contacto`, `/sobre-mi`) siguen con el último rastreo del **8 oct**: las solicitudes del 12 oct todavía no se han procesado. Hasta que Google las rastree y vea el 308, no cambia. No hay nada que hacer en la web; volver a solicitarlas no adelanta la cola.

## Sin indexar (11)

Todas responden 200 y están en el sitemap.

| URL | Estado | Nota |
|---|---|---|
| `/en/services` | Desconocida | Solicitada el 13 oct, aún en cola |
| `/es/contacto` | Desconocida | |
| `/en/contact` | Desconocida | |
| `/en/projects/bagno-casa-peonia` | Desconocida | |
| `/en/projects/bagno-casa-archi-colori` | Desconocida | |
| `/en/news/collezione-tappeti-sevilla` | Desconocida | |
| `/en/news/archiadvice-lancio` | Desconocida | |
| `/es/tappeti` | Descubierta, sin indexar | |
| `/en/projects/appartamento-lovingcolors` | Descubierta, sin indexar | |
| `/en/projects/bagno-italian-summer` | Descubierta, sin indexar | |
| `/en/projects/cucina-mite` | Descubierta, sin indexar | |

Dos pasaron de "Descubierta" a "Desconocida" (`/es/contacto`, `/en/news/collezione-tappeti-sevilla`): es ruido habitual de la API, no un retroceso.

## Siguiente

- ✅ **14 oct, mañana:** solicitada la indexación de los 5 proyectos en inglés (`cucina-mite`, `appartamento-lovingcolors`, `bagno-italian-summer`, `bagno-casa-peonia`, `bagno-casa-archi-colori`), todas con el aviso verde.
- **14 oct, tarde** (cuando caduquen las 5 del 13 oct por la tarde): `/es/contacto`, `/en/contact`, `/en/news/archiadvice-lancio`, `/en/news/collezione-tappeti-sevilla`, `/es/tappeti`.
- Las 21 URLs en italiano del sitemap están todas en el índice: 17 con su URL y las 4 duplicadas con la antigua (no necesitan solicitud).
- Repetir la inspección hacia el 19 oct, junto con el informe de Enlaces (D3).
