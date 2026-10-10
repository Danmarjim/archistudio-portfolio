# Fase Martina — visto bueno, datos y publicación

10 oct 2026. Reúne **todo lo que depende de Martina**, que antes estaba repartido entre las fases 2 y 3. Así las fases 2 y 3 se pueden cerrar con lo que hacemos nosotros, y esta queda abierta hasta que ella responda.

Cuando Martina conteste algo, el trabajo que genera (pasar el dato a los textos, quitar el `[DA CONFERMARE]`, publicar) se hace aquí y se marca en [`PENDIENTE-MARTINA.md`](../PENDIENTE-MARTINA.md).

## 1. Visto bueno de las ramas

Cada rama tiene su documento de revisión con lo que hay que validar: [`revisiones/`](../revisiones/README.md). Se ven todas juntas en la preview de `preview/seo-completa`. Nada va a `main` sin este visto bueno.

## 2. Datos, decisiones y textos

La lista completa y priorizada está en [`PENDIENTE-MARTINA.md`](../PENDIENTE-MARTINA.md). Los códigos de la [fase 2](fase-2.md) que esperan algo de ella:

| Código | Qué falta |
|---|---|
| D2 | Precios de la consulenza acquisto, restyling y reforma (ArchiAdvice ya tiene: 100 €) |
| D3 | Número de colegiada (`hasCredential`) |
| D4 | Texto del premio Piranesi 2009 (`award`) |
| D5 | H1 de la home |
| D8 | Email de dominio (decidir Google Workspace) |
| C1–C4, C6, C7, C11 | Validar los textos redactados y completar sus `[DA CONFERMARE]` |
| C8–C14 | Validar los borradores de las guías |
| C5 | 2–3 testimonios con permiso (la sección ya estará preparada y oculta: fase 3, B4) |
| C15 | Proyectos más completos: encargo, materiales, plazos, presupuesto, cita del cliente |
| F1 paso 2 | Una descripción corta por foto de galería |
| F7 | ¿Las fotos `restyling-casa-peonia-*` de `bagno-italian-summer` son de la misma casa? |
| — | Ubicación de `bagno-casa-archi-colori` (Bergamo) frente a `casa-archi-colori` (Milano) |
| — | Bloquear o no los bots de entrenamiento de IA (GPTBot, ClaudeBot, Google-Extended) |

## 3. Fuera de la web

Ficha de Google (D-1), reseñas (D-2), mismo nombre en todos los perfiles (D-3) y directorios (D-4): [`PENDIENTE-MARTINA.md`](../PENDIENTE-MARTINA.md) §1 y [`FICHA-GOOGLE.md`](../../martina/FICHA-GOOGLE.md).

## 4. El día de publicar (tras el visto bueno)

| # | Tarea | Comando |
|---|---|---|
| P0 | Repetir el [simulacro de merge](../auditorias/2026-10-10-simulacro-merge/README.md) con las ramas aprobadas: sin conflictos, las URLs de producción en 200, 0 enlaces rotos | `bash docs/seo/auditorias/2026-10-10-simulacro-merge/simulacro.sh` |
| P1 | Foto de producción antes del merge, para comparar después | `/seo drift baseline https://mparchistudio.com/` |
| P2 | Merge a `main` (primero `feat/seo-fase-2-pr2`, después las ramas aprobadas) y deploy. **`seo/c10-colore-architettura` solo sin `[DA CONFERMARE]`**: el artículo ya está publicado y con marcadores daría 404 | — |
| P3 | Comparar después del merge: títulos, canonical, hreflang, schema | `/seo drift compare https://mparchistudio.com/` |
| P4 | Reenviar `sitemap.xml` y pedir indexación de los servicios, la home y las guías | `/seo google` (Search Console) |
| P5 | Bing Webmaster + IndexNow: Bing indexa en horas y alimenta ChatGPT Search y Copilot | `/seo bing` |
| P6 | Audit sobre producción, con PageSpeed y CrUX reales | `/seo audit https://mparchistudio.com/` |
| P7 | Repetir el benchmark frente a la competencia de la [fase 2](fase-2.md#benchmark-frente-a-la-competencia-8-oct-2026) | — |

## 5. Cuando Martina actualice la ficha de Google

| Tarea | Comando |
|---|---|
| SEO local completo: ficha, coherencia de nombre, dirección y teléfono en directorios, reseñas | `/seo local https://mparchistudio.com/` |
| Añadir la ficha a `sameAs` y un botón "Recensioni / Come arrivare" en contacto | — |
