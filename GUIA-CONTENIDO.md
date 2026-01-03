# Guía de Gestión de Contenido

Guía completa para añadir y modificar el contenido del portfolio **sin necesidad de conocimientos de programación**.

> **Nota para desarrolladores:** Si buscas información técnica sobre instalación, configuración, i18n o deployment, consulta `GUIA-DESARROLLO.md`.

---

## Índice

1. [Antes de empezar](#antes-de-empezar)
2. [Estructura del contenido](#estructura-del-contenido)
3. [Sistema de idiomas](#sistema-de-idiomas)
4. [Gestionar proyectos](#gestionar-proyectos)
5. [Campos de un proyecto](#campos-de-un-proyecto)
6. [Gestionar imágenes](#gestionar-imágenes)
7. [Proyectos destacados](#proyectos-destacados)
8. [Editar textos del sitio](#editar-textos-del-sitio)
9. [Buenas prácticas](#buenas-prácticas)
10. [Ejemplos prácticos](#ejemplos-prácticos)
11. [Preguntas frecuentes](#preguntas-frecuentes)
12. [Glosario](#glosario)

---

## Antes de empezar

### Qué puedes hacer con esta guía

- Añadir nuevos proyectos al portfolio
- Editar proyectos existentes
- Subir y organizar imágenes
- Gestionar proyectos en varios idiomas
- Elegir qué proyectos aparecen destacados
- Modificar textos de la interfaz

### Qué necesitas

- Acceso a la carpeta del proyecto
- Un editor de texto (recomendado: Visual Studio Code, pero sirve cualquiera)
- Las imágenes que quieras subir

### Herramientas de ayuda

**Visual Studio Code** es el editor recomendado porque:
- Resalta el código con colores para facilitar la lectura
- Detecta errores de formato automáticamente
- Tiene vista previa de imágenes

---

## Estructura del contenido

El contenido del portfolio se organiza así:

```
portfolio/
│
├── content/
│   └── projects/              ← Carpeta de proyectos
│       ├── es/                ← Proyectos en español (idioma principal)
│       │   ├── casa-del-bosque.mdx
│       │   ├── loft-chamberi.mdx
│       │   └── ...
│       ├── en/                ← Proyectos en inglés
│       │   └── (traducciones)
│       └── it/                ← Proyectos en italiano
│           └── (traducciones)
│
├── public/
│   └── images/
│       ├── projects/          ← Imágenes de proyectos
│       │   ├── casa-bosque-cover.jpg
│       │   ├── casa-bosque-salon.jpg
│       │   └── ...
│       └── about/             ← Foto de la arquitecta
│           └── placeholder.jpg
│
└── messages/                  ← Textos de la interfaz
    ├── es.json                ← Textos en español
    ├── en.json                ← Textos en inglés
    └── it.json                ← Textos en italiano
```

### Resumen de carpetas

| Carpeta | Contenido | Formato de archivos |
|---------|-----------|---------------------|
| `content/projects/es/` | Proyectos en español | `.mdx` |
| `content/projects/en/` | Proyectos en inglés | `.mdx` |
| `content/projects/it/` | Proyectos en italiano | `.mdx` |
| `public/images/projects/` | Imágenes de proyectos | `.jpg`, `.png`, `.webp` |
| `public/images/about/` | Foto personal | `.jpg` |
| `messages/` | Textos de interfaz | `.json` |

---

## Sistema de idiomas

El portfolio soporta **tres idiomas**: español (es), inglés (en) e italiano (it).

### Idioma principal: Español

El español (`es`) es el idioma principal y **canónico**. Esto significa:

1. Los proyectos en español son **obligatorios**
2. Si un proyecto no tiene traducción a otro idioma, se muestra el contenido en español
3. Los slugs (URLs) se definen desde los archivos en español

### Cómo funcionan las traducciones de proyectos

```
content/projects/
├── es/
│   ├── casa-del-bosque.mdx     ← Proyecto original (obligatorio)
│   └── loft-chamberi.mdx       ← Proyecto original (obligatorio)
├── en/
│   ├── casa-del-bosque.mdx     ← Traducción al inglés (opcional)
│   └── (loft-chamberi.mdx)     ← Si no existe, se usa el español
└── it/
    └── (vacío)                  ← Si no hay traducciones, se usa español
```

### Regla de oro

**El nombre del archivo debe ser IDÉNTICO en todos los idiomas.**

Si el proyecto en español se llama `casa-del-bosque.mdx`:
- La traducción inglesa debe llamarse `casa-del-bosque.mdx` (en la carpeta `en/`)
- La traducción italiana debe llamarse `casa-del-bosque.mdx` (en la carpeta `it/`)

### Crear un proyecto multiidioma

1. **Paso 1:** Crea el proyecto en español en `content/projects/es/`
2. **Paso 2:** Cuando tengas la traducción, crea un archivo con el mismo nombre en `content/projects/en/` o `content/projects/it/`
3. **Paso 3:** Traduce el contenido (título, descripción, excerpt)

**Importante:** Las imágenes son compartidas entre idiomas. No necesitas duplicar las imágenes.

---

## Gestionar proyectos

### Dónde están los proyectos

Los proyectos se encuentran en `content/projects/es/` (idioma principal).

Cada proyecto es un archivo con extensión `.mdx`, que es un formato especial que combina texto y datos estructurados.

### Crear un nuevo proyecto

#### Paso 1: Crear el archivo

1. Navega a la carpeta `content/projects/es/`
2. Crea un nuevo archivo con el nombre del proyecto
3. Usa **minúsculas** y **guiones** en lugar de espacios

**Ejemplos de nombres correctos:**
- `casa-playa-valencia.mdx`
- `reforma-integral-centro.mdx`
- `oficinas-startup-tech.mdx`

**Nombres incorrectos:**
- ❌ `Casa Playa Valencia.mdx` (tiene espacios y mayúsculas)
- ❌ `casa_playa_valencia.mdx` (usa guiones bajos)
- ❌ `casaplayavalencia.mdx` (difícil de leer)

#### Paso 2: Copiar la plantilla

Copia y pega esta plantilla en el archivo:

```mdx
---
title: Nombre del Proyecto
category: Vivienda unifamiliar
location: Ciudad, País
year: 2024
client: Privado
surface: 150 m²
status: Construido
featured: false
coverImage: /images/projects/nombre-proyecto-cover.jpg
images:
  - /images/projects/nombre-proyecto-1.jpg
  - /images/projects/nombre-proyecto-2.jpg
  - /images/projects/nombre-proyecto-3.jpg
excerpt: Una descripción corta del proyecto en 1-2 frases que aparecerá en las tarjetas.
tags:
  - minimalismo
  - sostenible
  - luz natural
---

Aquí va la descripción completa del proyecto. Este texto aparece en la página individual del proyecto.

Puedes escribir varios párrafos separándolos con una línea en blanco.

Describe el concepto del diseño, los materiales utilizados, los retos del proyecto, las soluciones adoptadas y cualquier detalle relevante que quieras compartir con los visitantes.
```

#### Paso 3: Rellenar los campos

Sustituye los valores de ejemplo por la información real de tu proyecto. Consulta la siguiente sección para entender cada campo.

#### Paso 4: Guardar el archivo

Guarda el archivo. Si estás en modo desarrollo, verás los cambios automáticamente en el navegador.

### Editar un proyecto existente

1. Abre el archivo `.mdx` del proyecto en `content/projects/es/`
2. Modifica los campos que necesites
3. Guarda el archivo

### Eliminar un proyecto

1. Elimina el archivo `.mdx` del proyecto
2. (Recomendado) Elimina también las imágenes asociadas de `public/images/projects/`
3. Si existe traducción, elimina también los archivos en `en/` e `it/`

---

## Campos de un proyecto

Cada proyecto tiene dos partes:

1. **Frontmatter**: Los datos estructurados entre `---` (obligatorios)
2. **Contenido**: El texto descriptivo después del frontmatter

### Campos del frontmatter

| Campo | Obligatorio | Tipo | Descripción |
|-------|-------------|------|-------------|
| `title` | Sí | Texto | Nombre del proyecto que se muestra públicamente |
| `category` | Sí | Texto | Categoría del proyecto (ver opciones abajo) |
| `location` | Sí | Texto | Ubicación del proyecto |
| `year` | Sí | Número | Año de finalización |
| `client` | Sí | Texto | Tipo o nombre del cliente |
| `surface` | Sí | Texto | Superficie del proyecto |
| `status` | Sí | Texto | Estado actual del proyecto |
| `featured` | Sí | Booleano | Si aparece en proyectos destacados |
| `coverImage` | Sí | Ruta | Imagen principal del proyecto |
| `images` | Sí | Lista | Lista de imágenes de la galería |
| `excerpt` | Sí | Texto | Descripción corta (1-2 frases) |
| `tags` | No | Lista | Etiquetas para filtrado y SEO |

### Categorías disponibles

Usa una de estas categorías para mantener consistencia:

| Categoría | Descripción |
|-----------|-------------|
| `Vivienda unifamiliar` | Casas independientes |
| `Reforma integral` | Renovación completa de espacios |
| `Interiorismo comercial` | Locales, tiendas, restaurantes |
| `Interiorismo residencial` | Decoración de viviendas |
| `Edificio plurifamiliar` | Bloques de viviendas |
| `Oficinas` | Espacios de trabajo |
| `Equipamiento` | Edificios públicos, escuelas, hospitales |

### Estados del proyecto

| Estado | Cuándo usarlo |
|--------|---------------|
| `Construido` | Proyecto terminado y entregado |
| `En construcción` | Obra en curso |
| `Proyecto` | En fase de diseño |
| `Concurso` | Participación en concurso |

### Ejemplos de cada campo

```mdx
---
title: Casa del Bosque
category: Vivienda unifamiliar
location: Sierra de Madrid
year: 2023
client: Familia García-López
surface: 280 m²
status: Construido
featured: true
coverImage: /images/projects/casa-bosque-cover.jpg
images:
  - /images/projects/casa-bosque-cover.jpg
  - /images/projects/casa-bosque-salon.jpg
  - /images/projects/casa-bosque-cocina.jpg
  - /images/projects/casa-bosque-dormitorio.jpg
  - /images/projects/casa-bosque-exterior.jpg
excerpt: Vivienda integrada en el entorno natural de la Sierra de Madrid, donde la arquitectura dialoga con el paisaje.
tags:
  - sostenible
  - madera
  - integración paisajística
  - luz natural
---
```

---

## Gestionar imágenes

### Organización de imágenes

Las imágenes se guardan en la carpeta `public/images/`:

```
public/images/
├── projects/              ← Imágenes de proyectos
│   ├── casa-bosque-cover.jpg
│   ├── casa-bosque-salon.jpg
│   ├── loft-chamberi-cover.jpg
│   └── ...
└── about/                 ← Foto de la arquitecta
    └── placeholder.jpg
```

### Preparar imágenes antes de subir

#### Formato recomendado

| Formato | Cuándo usarlo |
|---------|---------------|
| **JPG** | Fotografías (recomendado para la mayoría de casos) |
| **WebP** | Alternativa más ligera a JPG |
| **PNG** | Imágenes con transparencia |

#### Tamaños recomendados

| Tipo de imagen | Dimensiones | Peso máximo |
|----------------|-------------|-------------|
| Imagen de portada | 1920 x 1280 px | 500 KB |
| Imágenes de galería | 1600 x 1200 px | 400 KB |
| Foto personal | 800 x 1000 px | 300 KB |

**Consejo:** Usa herramientas online gratuitas como [TinyPNG](https://tinypng.com/) o [Squoosh](https://squoosh.app/) para optimizar las imágenes antes de subirlas.

#### Convención de nombres

Nombra las imágenes de forma descriptiva y consistente:

**Estructura:** `nombre-proyecto-descripcion.jpg`

**Ejemplos buenos:**
- `casa-bosque-cover.jpg` (imagen de portada)
- `casa-bosque-salon.jpg`
- `casa-bosque-cocina-detalle.jpg`
- `casa-bosque-exterior-atardecer.jpg`

**Nombres a evitar:**
- ❌ `IMG_20240115_143022.jpg` (nombre de cámara)
- ❌ `foto1.jpg` (no descriptivo)
- ❌ `Casa Bosque Salón.jpg` (espacios y mayúsculas)

### Añadir imágenes a un proyecto

1. **Prepara las imágenes** siguiendo las recomendaciones anteriores
2. **Cópialas** a la carpeta `public/images/projects/`
3. **Actualiza el archivo del proyecto** con las rutas

```mdx
coverImage: /images/projects/casa-bosque-cover.jpg
images:
  - /images/projects/casa-bosque-cover.jpg
  - /images/projects/casa-bosque-salon.jpg
  - /images/projects/casa-bosque-cocina.jpg
  - /images/projects/casa-bosque-exterior.jpg
```

**Importante:**
- La ruta siempre empieza con `/images/` (NO incluyas `public` en la ruta)
- Las mayúsculas y minúsculas importan: `Casa-Bosque.jpg` ≠ `casa-bosque.jpg`

### Orden de las imágenes

Las imágenes aparecen en la galería en el orden que las listes:

```mdx
images:
  - /images/projects/proyecto-cover.jpg      ← Primera en la galería
  - /images/projects/proyecto-general.jpg    ← Segunda
  - /images/projects/proyecto-detalle-1.jpg  ← Tercera
  - /images/projects/proyecto-detalle-2.jpg  ← Cuarta
```

**Consejo:** Coloca primero las imágenes más impactantes o representativas.

### Cambiar la foto personal

1. Prepara la foto (vertical, aprox. 800 x 1000 px)
2. Renómbrala a `placeholder.jpg`
3. Reemplaza el archivo en `public/images/about/`

---

## Proyectos destacados

Los proyectos destacados aparecen en la página de inicio.

### Marcar un proyecto como destacado

1. Abre el archivo `.mdx` del proyecto
2. Cambia `featured: false` a `featured: true`
3. Guarda el archivo

```mdx
---
title: Casa del Bosque
featured: true    ← Este proyecto aparecerá en inicio
...
---
```

### Límite de proyectos destacados

Se recomienda tener entre **3 y 6 proyectos destacados** para mantener el equilibrio visual en la página de inicio.

### Orden de proyectos destacados

Los proyectos destacados se ordenan automáticamente por año (más recientes primero). Si dos proyectos tienen el mismo año, el orden depende del orden alfabético del archivo.

---

## Editar textos del sitio

Los textos de la interfaz (menú, botones, títulos de sección) se encuentran en la carpeta `messages/`.

### Archivos de traducción

| Archivo | Idioma |
|---------|--------|
| `messages/es.json` | Español |
| `messages/en.json` | Inglés |
| `messages/it.json` | Italiano |

### Estructura de un archivo de traducción

```json
{
  "Navigation": {
    "home": "Inicio",
    "projects": "Proyectos",
    "about": "Sobre mí",
    "services": "Servicios",
    "contact": "Contacto"
  },
  "Hero": {
    "title": "Arquitectura con alma",
    "subtitle": "Diseños que conectan personas y espacios",
    "cta": "Ver proyectos"
  },
  "Footer": {
    "rights": "Todos los derechos reservados",
    "contact": "Contacto"
  }
}
```

### Editar un texto

1. Abre el archivo de idioma que quieras editar (ej: `messages/es.json`)
2. Busca el texto que quieres cambiar
3. Modifica solo el texto entre comillas
4. Guarda el archivo

**Ejemplo:** Cambiar el título del hero de "Arquitectura con alma" a "Diseño arquitectónico"

```json
// Antes
"title": "Arquitectura con alma"

// Después
"title": "Diseño arquitectónico"
```

### Cuidado con el formato JSON

El formato JSON es estricto. Errores comunes:

**Correcto:**
```json
{
  "texto1": "valor1",
  "texto2": "valor2"
}
```

**Incorrecto:**
```json
{
  "texto1": "valor1",
  "texto2": "valor2",   ← Coma extra al final
}
```

**Incorrecto:**
```json
{
  "texto1": "valor1"    ← Falta coma
  "texto2": "valor2"
}
```

---

## Buenas prácticas

### Para proyectos

1. **Usa descripciones únicas:** Evita copiar y pegar la misma descripción en varios proyectos
2. **Sé conciso en el excerpt:** 1-2 frases que capturen la esencia del proyecto
3. **Mantén los años actualizados:** El orden depende del año
4. **Usa etiquetas relevantes:** Ayudan al SEO y posible filtrado futuro

### Para imágenes

1. **Calidad sobre cantidad:** Es mejor tener 5 buenas fotos que 15 mediocres
2. **Optimiza antes de subir:** Reduce el peso sin perder calidad
3. **Consistencia visual:** Intenta que las fotos de un proyecto tengan un estilo similar
4. **Primera imagen impactante:** La imagen de portada es la primera impresión

### Para traducciones

1. **No uses traductores automáticos sin revisar:** Pueden producir textos poco naturales
2. **Mantén el mismo tono:** El estilo debe ser consistente en todos los idiomas
3. **Adapta, no traduzcas literalmente:** Algunas expresiones no funcionan en otros idiomas

---

## Ejemplos prácticos

### Ejemplo 1: Añadir un nuevo proyecto completo

**Objetivo:** Añadir el proyecto "Villa Mediterránea" al portfolio

**Paso 1:** Prepara las imágenes
- Optimiza las fotos
- Nómbralas: `villa-mediterranea-cover.jpg`, `villa-mediterranea-terraza.jpg`, etc.
- Cópialas a `public/images/projects/`

**Paso 2:** Crea el archivo del proyecto
- Crea `content/projects/es/villa-mediterranea.mdx`
- Copia la plantilla y rellena los campos

**Paso 3:** Contenido del archivo

```mdx
---
title: Villa Mediterránea
category: Vivienda unifamiliar
location: Costa Brava, Girona
year: 2024
client: Privado
surface: 320 m²
status: Construido
featured: true
coverImage: /images/projects/villa-mediterranea-cover.jpg
images:
  - /images/projects/villa-mediterranea-cover.jpg
  - /images/projects/villa-mediterranea-terraza.jpg
  - /images/projects/villa-mediterranea-piscina.jpg
  - /images/projects/villa-mediterranea-salon.jpg
  - /images/projects/villa-mediterranea-dormitorio.jpg
excerpt: Casa de vacaciones que abraza el paisaje mediterráneo con terrazas escalonadas y materiales locales.
tags:
  - mediterráneo
  - piedra natural
  - sostenible
  - piscina infinity
---

La Villa Mediterránea nace del deseo de crear un refugio que se integre naturalmente en el paisaje costero de la Costa Brava.

El diseño aprovecha la topografía del terreno mediante terrazas escalonadas que siguen la pendiente natural, creando diferentes niveles de intimidad y conexión con el exterior.

Los materiales locales—piedra, madera y cal—establecen un diálogo respetuoso con el entorno, mientras que los grandes ventanales capturan las vistas al mar desde cada estancia.

La piscina infinity se funde visualmente con el horizonte, creando una continuidad entre arquitectura y paisaje que define la esencia de este proyecto.
```

### Ejemplo 2: Traducir un proyecto al inglés

**Objetivo:** Crear la versión inglesa de "Villa Mediterránea"

**Paso 1:** Crea el archivo
- Crea `content/projects/en/villa-mediterranea.mdx`
- ⚠️ El nombre debe ser IDÉNTICO al español

**Paso 2:** Traduce el contenido

```mdx
---
title: Mediterranean Villa
category: Single-family home
location: Costa Brava, Girona
year: 2024
client: Private
surface: 320 m²
status: Built
featured: true
coverImage: /images/projects/villa-mediterranea-cover.jpg
images:
  - /images/projects/villa-mediterranea-cover.jpg
  - /images/projects/villa-mediterranea-terraza.jpg
  - /images/projects/villa-mediterranea-piscina.jpg
  - /images/projects/villa-mediterranea-salon.jpg
  - /images/projects/villa-mediterranea-dormitorio.jpg
excerpt: A vacation home embracing the Mediterranean landscape with terraced levels and local materials.
tags:
  - mediterranean
  - natural stone
  - sustainable
  - infinity pool
---

Mediterranean Villa was born from the desire to create a retreat that naturally integrates into the coastal landscape of Costa Brava.

The design takes advantage of the terrain's topography through stepped terraces that follow the natural slope, creating different levels of privacy and connection with the outdoors.

Local materials—stone, wood, and lime—establish a respectful dialogue with the surroundings, while large windows capture sea views from every room.

The infinity pool visually merges with the horizon, creating a continuity between architecture and landscape that defines the essence of this project.
```

**Nota:** Las imágenes son las mismas. Solo se traducen los textos.

### Ejemplo 3: Cambiar el orden de proyectos destacados

**Problema:** Quiero que "Villa Mediterránea" (2024) aparezca antes que "Casa del Bosque" (2023)

**Solución:** El orden se determina por el año. Como Villa Mediterránea ya tiene `year: 2024` y es más reciente que 2023, aparecerá primero automáticamente.

Si quisieras cambiar el orden entre proyectos del mismo año, tendrías que modificar el año de uno de ellos.

---

## Preguntas frecuentes

### General

**¿Por qué no aparece mi proyecto?**

1. Verifica que el archivo tiene extensión `.mdx` (no `.txt` o `.md`)
2. Verifica que está en la carpeta correcta: `content/projects/es/`
3. Verifica que no hay errores en el formato (los campos entre `---` deben estar correctos)
4. Verifica que el nombre del archivo usa minúsculas y guiones

**¿Cómo veo los cambios antes de publicar?**

Pide al desarrollador que inicie el modo desarrollo. Verás los cambios en tiempo real en el navegador.

**¿Los cambios afectan la web en producción?**

No. Los cambios locales solo afectan tu ordenador. La web pública solo se actualiza cuando el desarrollador hace un despliegue.

### Imágenes

**¿Por qué no se ve una imagen?**

1. Verifica que la imagen está en `public/images/projects/`
2. Verifica que la ruta en el archivo `.mdx` es correcta
3. La ruta debe empezar con `/images/` (sin `public`)
4. Verifica que el nombre coincide exactamente (mayúsculas/minúsculas importan)

**¿Puedo usar otros formatos de imagen?**

Sí, puedes usar JPG, PNG o WebP. JPG es el más recomendado para fotografías.

**¿Hay límite de imágenes por proyecto?**

No hay límite técnico, pero se recomienda entre 5-10 imágenes por proyecto para mantener una buena experiencia de usuario.

### Idiomas

**¿Qué pasa si un proyecto no tiene traducción?**

Se muestra automáticamente el contenido en español. Los visitantes del sitio en inglés o italiano verán el proyecto en español hasta que se añada la traducción.

**¿Puedo tener un proyecto solo en inglés?**

No. Todos los proyectos deben existir primero en español (es el idioma canónico). Luego puedes añadir traducciones.

**¿Cómo sé qué proyectos están traducidos?**

Revisa las carpetas `content/projects/en/` y `content/projects/it/`. Los archivos presentes son los proyectos traducidos.

### Proyectos destacados

**¿Cómo cambio el orden de los proyectos?**

Los proyectos se ordenan por año (más recientes primero). Para cambiar el orden, modifica el campo `year` en cada proyecto.

**¿Cuántos proyectos destacados puedo tener?**

Técnicamente no hay límite, pero se recomienda entre 3 y 6 para mantener el equilibrio visual.

---

## Glosario

| Término | Significado |
|---------|-------------|
| **MDX** | Formato de archivo que combina Markdown (texto) con datos estructurados |
| **Frontmatter** | Los datos entre `---` al inicio del archivo MDX |
| **Slug** | La parte de la URL que identifica un proyecto (ej: `casa-del-bosque`) |
| **Excerpt** | Descripción corta que aparece en las tarjetas de proyectos |
| **Featured** | Marcado como destacado para aparecer en la página de inicio |
| **Locale** | Código de idioma (es, en, it) |
| **Cover image** | Imagen principal que representa al proyecto |

---

## Contacto técnico

Si encuentras problemas que no puedes resolver, contacta al desarrollador con:

- Una descripción clara del problema
- Capturas de pantalla si es posible
- El nombre del archivo que estabas editando
- Los pasos que seguiste antes del error

---

*Última actualización: Enero 2026*
