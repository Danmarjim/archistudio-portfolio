# Guía de Contenido

Cómo añadir y editar contenido del portfolio a través de Cowork.

---

## Añadir un proyecto nuevo

### 1. Subir las fotos

Copia las fotos del proyecto a la carpeta:

```
public/images/projects/
```

Nombra los archivos con este formato:

```
nombre-del-proyecto-01.jpg
nombre-del-proyecto-02.jpg
nombre-del-proyecto-03.jpg
...
```

El "slug" del proyecto (nombre técnico) debe coincidir con el prefijo de las fotos. Por ejemplo, el proyecto `cucina-parigina` usa las fotos `cucina-parigina-01.jpg`, `cucina-parigina-02.jpg`, etc.

La primera foto (`-01`) se usa automáticamente como imagen de portada.

### 2. Crear el contenido en Cowork

Dile a Claude en Cowork algo como:

> "Añade un proyecto nuevo llamado [nombre]. Es una [categoría], en [ciudad], año [año], superficie [m²]. El cliente es [privato/empresa]. El estado es [realizzato/in corso]. Texto en italiano: [descripción]. Destacado: sí/no."

Claude creará los tres archivos MDX necesarios (italiano, español, inglés) en:

```
content/projects/it/nombre-del-proyecto.mdx
content/projects/es/nombre-del-proyecto.mdx
content/projects/en/nombre-del-proyecto.mdx
```

### 3. Verificar y publicar

Después de que Claude guarde los archivos, dile:

> "Haz commit y push con el mensaje 'feat: add proyecto [nombre]'"

Vercel desplegará automáticamente en 1-2 minutos.

---

## Editar un proyecto existente

Dile a Claude lo que quieres cambiar:

> "En el proyecto cucina-parigina, actualiza el texto en español con: [nuevo texto]"

> "Cambia el año del proyecto bagno-casa-peonia a 2024"

> "Marca el proyecto restyling-casa-peonia como destacado"

Claude editará el archivo correspondiente y tú confirmas el push.

---

## Proyectos actuales

| Slug | Nombre visible |
|------|----------------|
| `casa-archi-colori` | Casa Archi Colori |
| `appartamento-lovingcolors` | Appartamento LovingColors |
| `restyling-casa-peonia` | Restyling Casa Peonia |
| `bagno-italian-summer` | Bagno Italian Summer |
| `bagno-casa-peonia` | Bagno Casa Peonia |
| `bagno-casa-archi-colori` | Bagno Casa Archi Colori |
| `cucina-parigina` | Cucina PARIGINA |

---

## Categorías disponibles (en italiano, uso interno)

| Valor interno | Qué es |
|---------------|--------|
| `Cucine` | Cocinas |
| `Bagni` | Baños |
| `Living` | Salones y estares |
| `Camere` | Dormitorios |
| `Ristrutturazione integrale` | Reforma completa |
| `Restyling` | Renovación parcial |

---

## Añadir una noticia

### 1. Subir imagen de portada (si aplica)

```
public/images/news/nombre-noticia-cover.jpg
```

### 2. Crear la noticia en Cowork

> "Añade una noticia llamada [título]. Categoría: [pubblicazioni/riflessioni/annunci/interviste]. Fecha: [fecha]. Texto: [contenido]."

Si es una publicación en una revista o medio:

> "Añade una noticia sobre la publicación en [nombre revista]. URL del artículo: [url]. Incluye estas imágenes de la revista: [lista de archivos]."

Claude creará los archivos en:

```
content/news/it/slug-noticia.mdx
content/news/es/slug-noticia.mdx
content/news/en/slug-noticia.mdx
```

### 3. Publicar

> "Haz commit y push: 'feat: add noticia [título]'"

---

## Noticias actuales

| Slug | Título |
|------|--------|
| `il-colore-nell-architettura` | El color en la arquitectura |
| `archiadvice-lancio` | Lanzamiento ArchiAdvice |
| `cose-di-casa-ottobre-2022` | Cose di Casa — oct. 2022 |

---

## Categorías de noticias (en italiano, uso interno)

| Valor | Descripción |
|-------|-------------|
| `pubblicazioni` | Apariciones en medios o revistas |
| `riflessioni` | Artículos de opinión o reflexión |
| `annunci` | Novedades y anuncios del estudio |
| `interviste` | Entrevistas |

---

## Editar textos de la interfaz

Los textos del menú, botones, pies de página y etiquetas de categoría están en:

```
messages/it.json   ← italiano
messages/es.json   ← español
messages/en.json   ← inglés
```

Dile a Claude:

> "Cambia el texto del botón 'Ver todos los proyectos' a 'Explorar proyectos' en español"

---

## Reglas importantes

- Las fotos van siempre en `public/images/` — nunca dentro de `src/` o `content/`
- Los valores de `category`, `status` y `client` en los archivos MDX siempre quedan en **italiano** (son claves de sistema)
- Los títulos, textos y descripciones se traducen en cada idioma
- Nunca elimines ni modifiques `next.config.ts` — contiene configuración crítica para Vercel
