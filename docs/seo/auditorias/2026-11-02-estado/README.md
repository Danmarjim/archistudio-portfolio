# Control de estado SEO — 2 nov 2026

Primera semana con la PR 2 en producción (publicada el 27 oct): indexación de las páginas nuevas y primeras búsquedas. Datos de Search Console (búsqueda web) del 7 al 31 oct, último día disponible. Ficheros: [`inspect.json`](inspect.json) (URL Inspection, las 99 URLs del sitemap en [`urls.txt`](urls.txt)), [`diario.json`](diario.json), [`paginas-despues.json`](paginas-despues.json), [`consultas-despues.json`](consultas-despues.json), [`consultas-paginas.json`](consultas-paginas.json) (27 oct – 1 nov), [`sitemaps.json`](sitemaps.json).

## 1. Indexación: 95 de 99

| | URLs | Indexadas |
|---|---|---|
| Ya estaban en producción | 63 | 62 |
| Nuevas con la PR 2 (servicios, guías, Homeadore) | 36 | **33** |

- Google rastreó casi todas las nuevas el mismo 27 oct, el día del envío del sitemap, y el resto entre el 28 y el 31.
- **Pendientes (4)**. Las cuatro responden 200, tienen `index, follow`, su propia canónica y enlaces internos. No hay nada que arreglar, solo falta que Google pase:
  - `/news/progettare-il-bagno-consigli-architetto` y `/news/progettare-la-cucina-consigli-architetto`: desconocidas. Son las únicas guías en italiano sin indexar; sus versiones en es/en sí están. Están enlazadas desde `/news` (y la de cocina, desde restyling).
  - `/es/servicios/consulenza-acquisto-casa`: descubierta, sin indexar.
  - `/en/services`: sigue desconocida, pese a haberse solicitado el 13 y el 20 oct. Está enlazada desde `/en`. No es grave: los 4 servicios en inglés ya están indexados.
- La entrevista de Archiboost en español, que el 20 oct estaba "rastreada, sin indexar", vuelve a estar indexada.
- **Sitemap:** 99 URLs, 0 errores, 0 advertencias.

## 2. Rendimiento: las impresiones se triplican

| | 12–26 oct | 28–31 oct |
|---|---|---|
| Impresiones al día | ~9 | **~28** (18, 43, 24, 26) |
| Clics al día | ~1 | ~1 |
| Posición media | ~8 | ~18 |

- La posición media baja porque la web aparece en búsquedas nuevas en posiciones bajas, no porque las de antes hayan caído. La home sigue en 2,5.
- **Primeras búsquedas de servicio** (hasta ahora todas eran de marca):
  - "ristrutturazione appartamento bergamo" (posiciones 43 y 59), "ristrutturazione appartamenti bergamo" (36), "preventivo ristrutturazione bergamo" (35), "ristrutturazione quadrilocale bergamo" (16), "ammodernamento appartamento bergamo" (41). Llevan casi siempre a la guía de costes.
  - "ristrutturazione zona notte bergamo" → servicio de reforma (36); "consulenza documentale ristrutturazione appartamento" → asesoría de compra (30).
  - Inglés y español: "architectural consultation" → servicio online (30), "quant costa un arquitecte per reforma", "como diseñar una cocina", "architect designed kitchen".
- **Páginas nuevas con impresiones:** las 6 guías y 5 páginas de servicio (3 en it, 2 en en; la consulta online en italiano, todavía no). La mejor es `/en/news/quanto-costa-un-architetto-ristrutturazione`, con 13 impresiones en posición 4.
- Todavía no hay clics en las páginas nuevas: con posiciones de 15 a 60 es lo normal en la primera semana. Google prueba las páginas nuevas antes de asentarlas, y en un dominio pequeño eso lleva de 2 a 6 semanas.
- `http://www.mparchistudio.com/` aún aparece como URL aparte (7 impresiones, 2 clics). Google todavía no ha vuelto a rastrearla con el 308 del 26 oct.

## Qué hacer

**Nosotros**
1. Solicitar la indexación de las 4 pendientes (cabe en la cuota diaria). Las dos guías en italiano, primero.
2. D2, informe mensual, hacia el 8 nov: comparar posiciones de las búsquedas de servicio, informe de IA generativa, posición en Maps y si `www` ya se ha consolidado.

**Martina:** sin cambios. Lo que más puede mover ahora son las reseñas y la ficha de Google ([`PENDIENTE-MARTINA.md`](../../PENDIENTE-MARTINA.md) §0).
