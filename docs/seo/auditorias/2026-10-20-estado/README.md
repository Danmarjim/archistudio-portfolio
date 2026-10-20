# Control de estado SEO — 20 oct 2026

Revisión de la tercera semana tras el cambio de URLs: indexación (D0, tercera inspección), backlinks (D3), rendimiento en búsqueda, sitemap y Core Web Vitals. Producción = `main` (`dc2b813`): fase 1, PR 1, Speed Insights y CSP obligatoria. La PR 2 y las ramas `seo/*` siguen esperando a Martina.

Datos: [`inspect.json`](inspect.json) (URL Inspection, 73 URLs), [`gsc.json`](gsc.json) (rendimiento), [`sitemaps.json`](sitemaps.json), [`pagespeed-home.json`](pagespeed-home.json).

## 1. Indexación (D0): 61 de 63

| Estado (63 URLs del sitemap) | 14 oct | 20 oct |
|---|---|---|
| Indexada | 48 | **61** |
| Duplicada (Google elige otra canónica) | 4 | **0** |
| Descubierta, sin indexar | 4 | 0 |
| Desconocida para Google | 7 | 1 |
| Rastreada, sin indexar | 0 | 1 |

- **Las 4 duplicadas, resueltas**: `/progetti`, `/servizi`, `/contatti` y `/chi-sono` ya son canónicas de sí mismas. `/proyectos` ya figura como "Página con redirección" (rastreada el 18 oct); `/servicios`, `/contacto` y `/sobre-mi` siguen indexadas con el rastreo del 8 oct y caerán solas cuando Google vuelva a pasar.
- **Las 10 solicitadas el 14 y 15 oct entraron todas** (rastreadas el 14–15 oct). De las anteriores, solo falta `/en/services`.
- **Pendientes (2):**
  - `/en/services`: sigue desconocida pese a la solicitud del 13 oct. La página está bien (200, `index, follow`, canónica propia, enlazada desde `/en`). Volver a solicitarla; si sigue igual, no es grave: en producción es solo el listado de servicios en inglés.
  - `/es/news/intervista-archiboost-luglio-2026`: pasa de indexada a **rastreada, sin indexar** (último rastreo, 18 jul). Google la ha retirado del índice, probablemente por ser una traducción corta de la versión italiana, que sí está indexada. Página correcta (200, canónica propia). Solicitar indexación una vez; no requiere cambios.

## 2. Backlinks (D3)

Informe **Enlaces** de Search Console (ya con datos; el 12 oct aún se estaba procesando):
- **40 enlaces externos desde 21 dominios, todos a la home.** 19 son Homify (it, de, com.br, ar, eg, fr, no, hu, in, ph, rs, sg, tw, ua, vn…: el mismo perfil replicado en cada país), más **Pinterest** y **Spazi Belli**.
- Textos de enlace: "website", "mparchistudio com apre una nuova scheda", "sito web". Ninguno con palabras clave, como es normal en perfiles de directorio.
- **Ninguna página interna recibe enlaces externos.** La prensa no enlaza: **Homeadore cita a Martina Pozzi en sus dos artículos (junio y agosto 2026) sin enlace a la web.** Pedírselo es el backlink editorial más fácil que hay ahora mismo (→ Martina).
- Enlaces internos: 308. El informe aún muestra las URLs antiguas (`/proyectos`, `/servicios`…) porque se basa en rastreos anteriores al cambio; se actualizará solo.

## 3. Rendimiento en búsqueda (22 sep – 17 oct)

| Clics | Impresiones | CTR | Posición media |
|---|---|---|---|
| 15 | 106 | 14,2 % | 7,1 |

- Casi todo es búsqueda de marca o de nombre: "martina pozzi" (posición 6–10), "panizza tappeti" (19 impresiones, posición 9 en `/tappeti`), "casa peonia", "archi milano". Los clics no aparecen por consulta (Google anonimiza las de poco volumen).
- **Todavía no hay impresiones en búsquedas de servicio** ("architetto Bergamo", "ristrutturazione appartamento Bergamo"…): las páginas que las atacan (4 servicios, 8 guías, home nueva) están en la PR 2 sin publicar. Es lo esperado, y es lo que más va a mover esta métrica.
- Sin "quick wins" (consultas en posición 4–10 con volumen).

## 4. Técnico

- **Sitemap:** 63 URLs enviadas, 0 errores, 0 advertencias.
- **PageSpeed (home, laboratorio, Lighthouse 13.5):** móvil 97 / 100 / 100 / 100 (rendimiento, accesibilidad, buenas prácticas, SEO); LCP 2,6 s, TBT 10 ms, CLS 0. Escritorio 99; LCP 0,6 s, CLS 0,061.
- **CrUX (datos reales de Chrome):** sin datos, por tráfico insuficiente. Para datos reales, Speed Insights de Vercel (funciona; ver [D0b](../../revisiones/d0b-csp.md)).
- **CSP obligatoria** en producción desde el 15 oct, sin incidencias.
- Producción aún redirige `/` según el idioma del navegador (`localeDetection: false` está en la PR 2). Ya conocido.

## Qué hacer

**Nosotros**
1. ✅ **20 oct:** solicitada la indexación de `/en/services` y `/es/news/intervista-archiboost-luglio-2026`, las dos con el aviso verde.
2. D2, informe mensual: hacia el 8 nov (un mes con Search Console).

**Martina** (añadido a [`PENDIENTE-MARTINA.md`](../../PENDIENTE-MARTINA.md))
- Pedir a Homeadore que enlace `mparchistudio.com` en los dos artículos.

**Lo que más impacto tiene ahora:** publicar la PR 2 (servicios, guías, home, chi sono). Indexación y técnica están bien; sin esas páginas no hay con qué posicionar búsquedas de servicio en Bergamo. Depende del visto bueno de Martina y de sus datos (47 puntos abiertos en su lista).
