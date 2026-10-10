# Lighthouse en todas las páginas (A5) — 10 oct 2026

Las 102 URLs del sitemap de `seo/preview-completa` (it/es/en), en móvil con la limitación de red estándar de Lighthouse, sobre la build local (`npm run build && npm run start`). Herramienta: Unlighthouse 0.13.5 (Lighthouse 13), una muestra por página. Datos completos: [`ci-result.json`](ci-result.json).

## Resultado

| Categoría | Antes | Después de `seo/a5-lighthouse` |
|---|---|---|
| Accesibilidad | mediana 100, **30 páginas por debajo** (mín. 94) | **100 en las 102** |
| SEO | 100 en todas | 100 en todas |
| Buenas prácticas | 96 en todas | 96 en todas (falso positivo, abajo) |
| Rendimiento | mediana 92 (84–98) | mediana 92 (87–99) |
| CLS / TBT | 0 / 0 ms en todas | 0 / 0 ms en todas |

## Arreglado (`seo/a5-lighthouse`, `939a4f7`)

| Auditoría | Páginas | Causa | Arreglo |
|---|---|---|---|
| `button-name` | 21 noticias con galería | Las flechas, el cierre y los puntos de `NewsGallery` eran botones solo con icono | `aria-label` traducidos (`NewsPage.gallery*`), iconos `aria-hidden`, `aria-current` en la imagen activa. "Ingrandisci" estaba fijo en italiano en los tres idiomas |
| `heading-order` | `/progetti`, `/news`, `/servizi` (×3 idiomas) | Saltaban de `h1` a `h3` | Las tarjetas aceptan `headingLevel` (`h3` por defecto, como en la home, que tiene `h2` de sección); los listados usan `h2`; los servicios del hub pasan a `h2`, sin cambio visual |

`button-name` es también una de las 33 reglas de `agent-accessibility-tree` ([A6](../2026-10-10-agentes/README.md)): antes del arreglo, las noticias con galería suspendían esa auditoría.

## No es un problema

- **`errors-in-console` (96 en buenas prácticas):** son `/_vercel/insights/script.js` y `/_vercel/speed-insights/script.js`, que solo existen en Vercel. En local devuelven 404. En la preview y en producción no aparecen.

## Rendimiento: el LCP simulado

- La mediana del LCP es **3,3 s simulados** (Lighthouse modela un 4G lento). El **observado** en la misma prueba es de 0,35 s en la home (igual al FCP): el contenido sale en el HTML y no hay retraso de render.
- La diferencia es el peso del JavaScript: ~240–255 KB comprimidos por página, que la simulación cobra antes del LCP. Lighthouse estima ~50 KB de JS sin usar y ~14 KB de polyfills antiguos.
- **No se toca ahora.** La forma de bajarlo es cargar Framer Motion bajo demanda (`LazyMotion` + `m`) y revisar qué componentes de cliente pueden ser de servidor: un cambio transversal que conviene medir antes con datos reales. **Speed Insights** (en producción desde el 10 oct) da el LCP real de los usuarios; si el p75 móvil supera 2,5 s, se abre como tarea.

## Cómo repetirlo

```bash
npm run build && PORT=3107 npm run start
# config con las rutas del sitemap, scanner.ignoreI18nPages: false (si no, al apuntar el x-default
# a mparchistudio.com y no a localhost, Unlighthouse descarta todas las páginas) y device: mobile
npx unlighthouse-ci@0.13.5 --config-file unlighthouse.config.mjs
```

Unlighthouse lee siempre `unlighthouse.config.mjs` del directorio actual, aunque `--config-file` apunte a otro archivo.
