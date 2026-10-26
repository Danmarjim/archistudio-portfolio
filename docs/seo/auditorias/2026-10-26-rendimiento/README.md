# Rendimiento en búsqueda tras la reindexación — 26 oct 2026

¿Ha cambiado algo desde que se reindexaron las páginas (12–15 oct)? Datos de Search Console (búsqueda web) del 7 oct, primer día con datos de la propiedad, al 24 oct, último disponible. Ficheros: [`diario.json`](diario.json), `paginas-*.json`, `consultas-*.json`, [`paises.json`](paises.json).

## Antes y después

| | Antes (7–11 oct, 5 días) | Después (12–24 oct, 13 días) |
|---|---|---|
| Clics | 6 (1,2 al día) | 15 (1,2 al día) |
| Impresiones | 40 (8 al día) | 125 (9,6 al día) |
| CTR | 15 % | 12 % |
| Posición media | 5,7 | 8,2 |
| **Páginas con impresiones** | **20** | **35** |

- **El volumen no ha cambiado**: ~1 clic y ~9 impresiones al día. La posición media empeora en apariencia porque ahora aparecen más páginas en posiciones bajas, no porque las de antes hayan bajado.
- **Lo que sí ha mejorado es la presencia**: casi el doble de páginas aparecen en Google. Entran fichas de proyecto en inglés e italiano (`/en/projects/bagno-italian-summer`, `/progetti/bagno-italian-summer` en posición 1,8, `bagno-casa-peonia`, `cucina-parigina`…), `/en/tappeti`, `/es/tappeti` y las URLs nuevas en italiano (`/contatti`, `/chi-sono`).
- La home pasa de 19 a 40 impresiones y concentra 6 de los 15 clics. `/en` recibe 4 clics.
- **Búsquedas**: todas de marca o de nombre: "panizza tappeti" (17 impresiones, posición 9), "martina pozzi", "casa peonia", "panizzastudio.com", "archi milano". **Ninguna búsqueda de servicio** ("architetto Bergamo", "ristrutturazione"…).
- **Países**: Italia 120 de 165 impresiones (17 de 21 clics); España 10.

## Por qué no ha subido

La reindexación arregló el **acceso** (que Google conozca y muestre las URLs nuevas), no la **demanda**. El contenido en producción es el mismo que antes del 8 oct: portfolio, sobre mí, noticias y tappeti. No hay páginas que respondan a búsquedas de servicio en Bergamo, así que Google solo enseña la web a quien ya busca a Martina o a Panizza. Las páginas que atacan esas búsquedas (4 servicios, 8 guías, home y chi sono nuevas) están en la PR 2, pendiente de Martina.

## Incidencia encontrada: `www` redirige con 307

- `https://www.mparchistudio.com/` → `https://mparchistudio.com/` con **307 (temporal)**. Debería ser **308 (permanente)**: con un 307, Google puede seguir tratando `www` como una URL aparte.
- Search Console lo confirma: `http://www.mparchistudio.com/` aparece en los resultados (15 impresiones antes, 8 después), separado de la home.
- **Causa**: `www` no estaba asignado al proyecto. Resolvía por el comodín DNS (`* ALIAS`) y Vercel aplicaba su redirección por defecto, un 307.
- ✅ **Arreglado el 26 oct**: `www.mparchistudio.com` añadido al proyecto en Vercel como redirección a `mparchistudio.com` con **308** (API de Vercel; sin cambios de código). Comprobado: `https://www.mparchistudio.com/` y `/progetti` → 308 a la misma ruta sin `www`; `http://www` → 308 a `https://www` → 308 al dominio principal; la web principal sigue en 200. Google consolidará `www` en la home cuando vuelva a rastrearla.

## Qué esperar

- Con la web actual, el tráfico seguirá en ~1 clic al día, casi todo de marca.
- El salto vendrá al publicar la PR 2. A partir de ahí, Google tarda 2–6 semanas en posicionar páginas nuevas en un dominio pequeño.
- Siguiente medición: informe mensual (D2) hacia el 8 nov.
