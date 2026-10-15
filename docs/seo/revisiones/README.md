# Revisiones por rama

**Para Martina:** todo lo pendiente en una sola lista, en [PENDIENTE-MARTINA.md](../PENDIENTE-MARTINA.md).

Cada tarea de SEO vive en su propia rama, que sale de `feat/seo-fase-2-pr2`, y se mergea a `main` sola cuando Martina da el visto bueno. Cada rama tiene aquí un documento con el mismo nombre (`seo/c4-…` → `c4-….md`) con:

- **Qué se ha hecho** y en qué archivos.
- **Cómo verlo**: URL de la preview de Vercel (cuando la rama esté subida) o ruta en local.
- **Qué validar**: checklist para Martina (contenido y datos) y para Daniel (técnico).
- **Dependencias** y **cómo mergear**.

Los textos con datos pendientes llevan `[DA CONFERMARE: …]`. En local y en las previews se ven resaltados en amarillo; en producción una página que los contenga no se publica.

`preview/seo-completa` junta todas las ramas para ver el resultado final y **es la única que Vercel despliega**. Las ramas `seo/*` y la base no crean despliegues (`git.deploymentEnabled` en `vercel.json`): así no ocupan espacio ni gastan el límite diario de despliegues del plan gratuito. Hasta el 10 oct la integración se llamaba `seo/preview-completa`. El estado general (`docs/seo/ESTADO.md`) solo se actualiza en esa rama.

## Ramas

| Rama | Documento | Estado |
|---|---|---|
| `feat/seo-fase-2-pr2` | [feat-seo-fase-2-pr2.md](feat-seo-fase-2-pr2.md) | Pendiente de revisión |
| `seo/ficha-google-textos` | [ficha-google-textos.md](ficha-google-textos.md) | Pendiente de revisión |
| `seo/c4-ristrutturazione-bergamo` | [c4-ristrutturazione-bergamo.md](c4-ristrutturazione-bergamo.md) | Pendiente de revisión (7 datos de Martina) |
| `seo/c2-consulenza-online` | [c2-consulenza-online.md](c2-consulenza-online.md) | Pendiente de revisión (5 datos de Martina) |
| `seo/c3-acquisto-casa` | [c3-acquisto-casa.md](c3-acquisto-casa.md) | Pendiente de revisión (10 datos de Martina) |
| `seo/c6-restyling` | [c6-restyling.md](c6-restyling.md) | Pendiente de revisión (7 datos de Martina) |
| `seo/a4-enlazado-interno` | [a4-enlazado-interno.md](a4-enlazado-interno.md) | Pendiente de revisión |
| `seo/a3-home` | [a3-home.md](a3-home.md) | Pendiente de revisión (H1 y testimonios) |
| `seo/c1-chi-sono` | [c1-chi-sono.md](c1-chi-sono.md) | Pendiente de revisión (premio, colegiada, Sevilla) |
| `seo/c11-costo-ristrutturazione` | [c11-costo-ristrutturazione.md](c11-costo-ristrutturazione.md) | Pendiente de revisión (4 datos de Martina) |
| `seo/c7-costo-architetto` | [c7-costo-architetto.md](c7-costo-architetto.md) | Pendiente de revisión (5 datos; decidir si publica sus honorarios) |
| `seo/llms-dinamico` | [llms-dinamico.md](llms-dinamico.md) | Pendiente de revisión |
| `seo/meta-titulos-descripciones` | [meta-titulos-descripciones.md](meta-titulos-descripciones.md) | Pendiente de revisión |
| `seo/og-servicios` | [og-servicios.md](og-servicios.md) | Pendiente de revisión |
| `seo/geo-autoria` | [geo-autoria.md](geo-autoria.md) | Pendiente de revisión |
| `seo/contraste` | [contraste.md](contraste.md) | Pendiente de revisión |
| `seo/a5-lighthouse` | [a5-lighthouse.md](a5-lighthouse.md) | Pendiente de revisión (solo Daniel: galería y encabezados) |
| `seo/a6-content-signal` | [a6-content-signal.md](a6-content-signal.md) | Pendiente de revisión (solo Daniel: `robots.txt`) |
| `seo/b4-testimonios` | [b4-testimonios.md](b4-testimonios.md) | Lista y oculta; se activa con los testimonios de Martina (sale de `seo/a3-home`) |
| `seo/mensajes-cliente` | [mensajes-cliente.md](mensajes-cliente.md) | Pendiente de revisión |
| `seo/d0b-csp` | [d0b-csp.md](d0b-csp.md) | ✅ En `main` (15 oct, cherry-pick) |
| `seo/c12-scegliere-architetto` | [c12-scegliere-architetto.md](c12-scegliere-architetto.md) | Pendiente de revisión (4 datos; tono de la tabla comparativa) |
| `seo/c9-progettare-bagno` | [c9-progettare-bagno.md](c9-progettare-bagno.md) | Pendiente de revisión (6 datos; cómo eran antes los baños) |
| `seo/c13-progettare-cucina` | [c13-progettare-cucina.md](c13-progettare-cucina.md) | Pendiente de revisión (3 datos) |
| `seo/c10-colore-architettura` | [c10-colore-architettura.md](c10-colore-architettura.md) | Pendiente de revisión (3 datos; **ya publicado: no mergear con marcadores**; sale de `meta-titulos-descripciones`) |
| `seo/c14-colori-pareti` | [c14-colori-pareti.md](c14-colori-pareti.md) | Pendiente de revisión (1 dato; validar la lectura 60-30-10) |
| `seo/c8-conformita-urbanistica` | [c8-conformita-urbanistica.md](c8-conformita-urbanistica.md) | Pendiente de revisión técnica (normativa) y 4 datos |
| `preview/seo-completa` | — | Integra todas las anteriores |

Orden de merge: primero `feat/seo-fase-2-pr2` (todas salen de ella); después, cualquier rama aprobada, en cualquier orden.
