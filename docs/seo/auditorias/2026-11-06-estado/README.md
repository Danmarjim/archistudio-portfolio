# Control de estado SEO — 6 nov 2026

Segundo control tras publicar la PR 2 (27 oct), a raíz del correo de Search Console "30 clics en los últimos 28 días". Datos de búsqueda web: diarios del 7 oct al 4 nov; los acumulados de 28 días van del 9 oct al 3 nov, que es lo que Google tiene cerrado. Ficheros: [`inspect.json`](inspect.json) (99 URLs, en [`urls.txt`](urls.txt)), [`diario.json`](diario.json), [`paginas-28d.json`](paginas-28d.json), [`consultas-28d.json`](consultas-28d.json), [`paginas-desde-27oct.json`](paginas-desde-27oct.json), [`consultas-paginas-desde-27oct.json`](consultas-paginas-desde-27oct.json), [`paises.json`](paises.json), [`dispositivos.json`](dispositivos.json), [`sitemaps.json`](sitemaps.json).

## 1. Los 30 clics

| 28 días (9 oct – 3 nov) | Clics | Impresiones | CTR | Posición media |
|---|---|---|---|---|
| Total | **30** | 363 | 8,3 % | 12,8 |

Es el primer periodo completo de 28 días con datos: la propiedad empezó a registrar el 7 oct, así que no hay un periodo anterior con el que comparar. Por eso, la comparación útil es antes y después de publicar:

| | 7–26 oct (20 días) | 28 oct – 4 nov (8 días) |
|---|---|---|
| Clics al día | 1,1 | **1,4** |
| Impresiones al día | 8,8 | **29,1** (×3,3) |
| Posición media | 8,6 | 17,6 |

- **Las impresiones siguen subiendo:** 22–36 al día en noviembre, frente a 18–43 la primera semana. No ha sido un pico puntual.
- Unas **4 de cada 5 impresiones desde el 27 oct son de páginas nuevas** (guías y servicios).
- **Primer clic en una página de servicio:** `/servizi/restyling-casa`, en posición 5,3.
- Los clics siguen viniendo sobre todo de la home (15 de 30) y de búsquedas de marca. La posición media baja porque la web aparece en muchas más búsquedas, aún lejos de la primera página.
- **Países:** Italia, 23 clics y 235 impresiones. España, 28 impresiones, casi todas de las guías en español. EE. UU. y Reino Unido, 26, de las guías en inglés.
- **Dispositivos:** móvil, 18 clics en posición 6,7; escritorio, 12 clics en posición 18,9.

## 2. Búsquedas

- **Marca:** "panizza tappeti" (19 impresiones, posición 9), "martina pozzi" (7), "casa peonia" (7,5), "panizzastudio.com".
- **Servicio en Bergamo:**

  | Búsqueda | Pos. media (28 días) | Página |
  |---|---|---|
  | ristrutturazione quadrilocale bergamo | 14 | guía de costes; también el servicio (45) |
  | ristrutturazione zona notte bergamo | 33 | servicio de reforma |
  | preventivo ristrutturazione bergamo | 35 | guía de costes |
  | ristrutturazione appartamenti bergamo | 38 | guía de costes |
  | ammodernamento appartamento bergamo | 42–45 | guía de costes |
  | ristrutturazione appartamento bergamo | 43–59 | guía de costes y servicio |
  | interior design studio bergamo | 54 | — |

- **Búsquedas nuevas desde el 2 nov:**
  - Online: "consulenza architetto online" (37–40), "architetto on line low cost" (41).
  - Honorarios: "ristrutturare casa parcella architetto" (16), "quanto costa un architetto per ristrutturare casa" (60).
  - Colores: varias búsquedas sobre el color de las paredes, entre las posiciones 59 y 98.
  - En español: "como elegir un arquitecto" (80).
- **Mejor posición de una página nueva:** `/en/news/quanto-costa-un-architetto-ristrutturazione`, con 25 impresiones en posición 3,6, seguida de la guía del baño en inglés (3,5) y la reforma en inglés (5,5).

## 3. Indexación: 96 de 99

- Entra **`/en/services`**, que llevaba sin indexar desde el 13 oct.
- **Faltan 3**, todas técnicamente correctas (200, `index, follow`, canónica propia, enlazadas):
  - `/news/progettare-il-bagno-consigli-architetto`: pasa de desconocida a **descubierta, sin indexar**.
  - `/news/progettare-la-cucina-consigli-architetto`: sigue desconocida para Google.
  - `/es/servicios/consulenza-acquisto-casa`: descubierta, sin indexar.

  Las dos guías en italiano son las únicas en ese idioma sin indexar. Las versiones en es/en sí lo están, y la del baño en inglés ya está en posición 3,5.
- **Sitemap:** 99 URLs, 0 errores, 0 advertencias.
- **Restos de las URLs antiguas:** Google aún muestra algunas en italiano (`/sobre-mi` con 35 impresiones, `/servicios`, `/contacto`) y `http://www.mparchistudio.com/` (26 impresiones, 3 clics). Todas redirigen con 308 a la URL buena, así que el clic llega igual. Desaparecerán cuando Google las vuelva a rastrear.

## Qué hacer

**Nosotros**
1. Solicitar la indexación de las dos guías en italiano (baño y cocina) y de la asesoría de compra en español.
2. D2, informe mensual, ~8 nov: con este control ya está casi hecho. Queda mirar en Search Console el informe de IA generativa (no está en la API) y la posición en Maps.
3. Siguiente medición útil: ~20 nov, cuando las páginas nuevas lleven 3–4 semanas. Ahí se verá si las búsquedas de servicio pasan del puesto 30–50 a la primera o la segunda página.

**Martina:** sin cambios. Reseñas y ficha de Google ([`PENDIENTE-MARTINA.md`](../../PENDIENTE-MARTINA.md) §0) son lo que más puede mover las búsquedas locales ("architetto bergamo") mientras las páginas maduran.
