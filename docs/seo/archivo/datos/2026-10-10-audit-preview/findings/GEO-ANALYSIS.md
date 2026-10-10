# Buscadores con IA (GEO) — A2

10 oct 2026, con `claude-seo:seo-geo` sobre la build local de `seo/preview-completa`. Google lo resume así: optimizar para la búsqueda con IA **sigue siendo SEO**; no hacen falta archivos, marcado ni reescrituras especiales para IA. Las notas son heurísticas de la skill; las plataformas no se han medido con herramienta (sin DataForSEO), así que no se puntúan por separado.

## Nota GEO: 76/100

| Criterio | Peso | Nota | Comentario |
|---|---|---|---|
| Citabilidad | 25 % | 70 | Las guías responden en la primera frase con cifra, fuente y fecha. Los servicios aún no tienen datos citables (precios, plazos: pendientes de Martina) |
| Estructura | 20 % | 88 | H1 → H2 limpio, tablas, listas; **preguntas frecuentes convertidas en H3** (antes eran párrafos en negrita) |
| Multimedia | 15 % | 60 | Fotos de proyectos y vídeo en /tappeti; sin vídeo ni gráficos en servicios y guías |
| Autoridad y marca | 20 % | 62 | **Firma visible en las guías** (nueva), fechas, fuentes citadas, `Person` con credenciales y perfiles; sin reseñas, sin presencia en YouTube, Reddit o Wikipedia |
| Accesibilidad técnica | 20 % | 95 | Todo el texto está en el HTML sin JavaScript; robots permite todos los bots; sitemap y hreflang correctos |

## Acceso de los rastreadores (robots.txt: `Allow: /` para todos)

**Búsqueda y citas** (deciden si te pueden citar):

| Bot | Para qué | Estado |
|---|---|---|
| Googlebot | Google Search, AI Overviews y AI Mode | Permitido |
| OAI-SearchBot | Citas en ChatGPT Search | Permitido |
| Claude-SearchBot | Citas en la búsqueda de Claude | Permitido |
| PerplexityBot | Perplexity | Permitido |
| Applebot | Siri, Spotlight, Safari | Permitido |

**Entrenamiento de modelos** (no afectan a las citas; es una decisión de licencia):

| Bot | Para qué | Estado |
|---|---|---|
| GPTBot | Entrenamiento de OpenAI | Permitido |
| ClaudeBot | Entrenamiento de Anthropic | Permitido |
| Google-Extended | Entrenamiento de Gemini y Vertex | Permitido |
| CCBot | Common Crawl | Permitido |
| Applebot-Extended | Apple Intelligence | Permitido |

Si Martina no quiere que sus textos e imágenes entrenen modelos, se pueden bloquear solo estos cinco sin perder visibilidad en las búsquedas.

**llms.txt:** presente y generado desde el contenido. Google dice expresamente que no ayuda ni perjudica en su buscador; puede servir a otros sistemas. No cuenta en la nota.

## Cambios hechos

| Cambio | Rama |
|---|---|
| Firma "Di Martina Pozzi, architetta a Bergamo" con enlace a chi sono y fecha de actualización en los artículos propios | `seo/geo-autoria` |
| 84 preguntas frecuentes (28 por idioma) pasan de negrita a H3 en 4 servicios y 2 guías | `seo/c2`, `c3`, `c4`, `c6`, `c11`, `c7` |

## Las 5 mejoras de más impacto (pendientes)

1. **Datos propios citables:** precios, plazos y rangos de Martina en servicios y guías. Lo que más citan los buscadores con IA son datos de primera mano que no están en otra parte.
2. **Reseñas en la ficha de Google:** confianza para Google y para AI Mode en búsquedas locales.
3. **Presencia de marca fuera de la web:** vídeos cortos de los proyectos (YouTube, Instagram) que enlacen a las guías; menciones en prensa local. Las menciones pesan más que los enlaces para salir en respuestas de IA.
4. **Actualizar las guías cada año** (`updated` en el frontmatter): el contenido reciente se cita mucho más.
5. **Bing + IndexNow al publicar** (`/seo bing`): Bing alimenta ChatGPT Search y Copilot.

**No recomendado:** marcado FAQPage (Google retiró esos resultados el 7 may 2026), trocear o reescribir textos "para IA", usar `llms.txt` como palanca para Google.
