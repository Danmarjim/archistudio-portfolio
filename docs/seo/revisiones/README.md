# Revisiones por rama

**Para Martina:** todo lo pendiente en una sola lista, en [PARA-MARTINA.md](PARA-MARTINA.md).

Cada tarea de SEO vive en su propia rama, que sale de `feat/seo-fase-2-pr2`, y se mergea a `main` sola cuando Martina da el visto bueno. Cada rama tiene aquí un documento con el mismo nombre (`seo/c4-…` → `c4-….md`) con:

- **Qué se ha hecho** y en qué archivos.
- **Cómo verlo**: URL de la preview de Vercel (cuando la rama esté subida) o ruta en local.
- **Qué validar**: checklist para Martina (contenido y datos) y para Daniel (técnico).
- **Dependencias** y **cómo mergear**.

Los textos con datos pendientes llevan `[DA CONFERMARE: …]`. En local y en las previews se ven resaltados en amarillo; en producción una página que los contenga no se publica.

`seo/preview-completa` junta todas las ramas para ver el resultado final. **Es la única rama `seo/*` que Vercel despliega** (`vercel.json`): las ramas de tarea no generan preview, para no ocupar espacio en el plan gratuito. El estado general (`docs/seo/ESTADO.md`) solo se actualiza en esa rama.

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
| `seo/preview-completa` | — | Integra todas las anteriores |

Orden de merge: primero `feat/seo-fase-2-pr2` (todas salen de ella); después, cualquier rama aprobada, en cualquier orden.
