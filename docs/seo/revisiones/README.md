# Revisiones por rama

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
| `seo/c4-ristrutturazione-bergamo` | [c4-ristrutturazione-bergamo.md](c4-ristrutturazione-bergamo.md) | En curso |
| `seo/c2-consulenza-online` | [c2-consulenza-online.md](c2-consulenza-online.md) | Pendiente de empezar |

Orden de merge: primero `feat/seo-fase-2-pr2` (todas salen de ella); después, cualquier rama aprobada, en cualquier orden.
