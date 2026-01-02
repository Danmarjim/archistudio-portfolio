# Guía de Gestión de Contenido

Esta guía explica cómo añadir y modificar el contenido del portfolio sin necesidad de conocimientos de programación.

---

## Índice

1. [Estructura del contenido](#estructura-del-contenido)
2. [Gestionar proyectos](#gestionar-proyectos)
3. [Gestionar imágenes](#gestionar-imágenes)
4. [Editar información del sitio](#editar-información-del-sitio)
5. [Publicar cambios](#publicar-cambios)
6. [Preguntas frecuentes](#preguntas-frecuentes)

---

## Estructura del contenido

El contenido del portfolio se organiza en dos carpetas principales:

```
portfolio/
├── content/
│   └── projects/          ← Aquí van los proyectos (archivos .mdx)
│
└── public/
    └── images/
        ├── projects/      ← Imágenes de proyectos
        └── about/         ← Foto de la arquitecta
```

---

## Gestionar proyectos

### Dónde están los proyectos

Los proyectos se guardan en la carpeta `content/projects/`. Cada proyecto es un archivo con extensión `.mdx`.

Proyectos actuales:
- `casa-del-bosque.mdx`
- `loft-chamberi.mdx`
- `clinica-dental-sonrie.mdx`
- `villa-mediterranea.mdx`
- `apartamento-malasana.mdx`
- `oficinas-creativas.mdx`

### Crear un nuevo proyecto

1. **Crea un nuevo archivo** en `content/projects/` con el nombre del proyecto en minúsculas, usando guiones en lugar de espacios:
   - Ejemplo: `casa-playa-valencia.mdx`

2. **Copia esta plantilla** y pégala en el archivo:

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
excerpt: Una descripción corta del proyecto (1-2 frases).
tags:
  - etiqueta1
  - etiqueta2
---

Aquí va la descripción larga del proyecto. Puedes escribir varios párrafos.

Cada párrafo se separa con una línea en blanco.

Puedes describir el concepto, los materiales, el proceso de diseño, etc.
```

3. **Rellena los campos** con la información del proyecto:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `title` | Nombre del proyecto | `Casa del Bosque` |
| `category` | Tipo de proyecto | `Vivienda unifamiliar`, `Reforma integral`, `Interiorismo comercial` |
| `location` | Ubicación | `Sierra de Madrid` |
| `year` | Año de finalización | `2024` |
| `client` | Tipo de cliente | `Privado`, `Empresa X` |
| `surface` | Superficie | `280 m²` |
| `status` | Estado actual | `Construido`, `En construcción`, `Proyecto` |
| `featured` | ¿Mostrar en inicio? | `true` o `false` |
| `coverImage` | Imagen principal | `/images/projects/mi-proyecto-cover.jpg` |
| `images` | Galería de imágenes | Lista de rutas a imágenes |
| `excerpt` | Descripción corta | Texto breve (1-2 frases) |
| `tags` | Etiquetas | Lista de palabras clave |

4. **Guarda el archivo**

### Editar un proyecto existente

1. Abre el archivo `.mdx` del proyecto en `content/projects/`
2. Modifica los campos que necesites
3. Guarda el archivo

### Eliminar un proyecto

1. Elimina el archivo `.mdx` del proyecto
2. (Opcional) Elimina las imágenes asociadas de `public/images/projects/`

### Proyectos destacados en la página de inicio

Para que un proyecto aparezca en la sección "Proyectos destacados" de la página de inicio:

1. Abre el archivo del proyecto
2. Cambia `featured: false` a `featured: true`
3. Guarda el archivo

**Nota:** Se muestran máximo 3 proyectos destacados en el inicio.

---

## Gestionar imágenes

### Dónde guardar las imágenes

- **Imágenes de proyectos:** `public/images/projects/`
- **Foto de la arquitecta:** `public/images/about/`

### Añadir imágenes a un proyecto

1. **Prepara las imágenes:**
   - Formato recomendado: JPG
   - Tamaño recomendado: 1200x800 píxeles (horizontal) o 800x1200 (vertical)
   - Peso máximo recomendado: 500 KB por imagen

2. **Nombra las imágenes** de forma descriptiva:
   - `casa-bosque-cover.jpg` (imagen principal)
   - `casa-bosque-salon.jpg`
   - `casa-bosque-cocina.jpg`
   - `casa-bosque-exterior.jpg`

3. **Copia las imágenes** a la carpeta `public/images/projects/`

4. **Actualiza el archivo del proyecto** con las rutas de las imágenes:

```mdx
coverImage: /images/projects/casa-bosque-cover.jpg
images:
  - /images/projects/casa-bosque-cover.jpg
  - /images/projects/casa-bosque-salon.jpg
  - /images/projects/casa-bosque-cocina.jpg
  - /images/projects/casa-bosque-exterior.jpg
```

**Importante:** La ruta siempre empieza con `/images/projects/` (no incluyas `public` en la ruta).

### Cambiar la foto de la arquitecta

1. Prepara la foto:
   - Tamaño recomendado: 800x1000 píxeles (vertical)
   - Formato: JPG

2. Guárdala como `public/images/about/placeholder.jpg` (reemplaza la existente)

---

## Editar información del sitio

### Datos de contacto y redes sociales

Los datos del sitio se encuentran en `src/lib/constants.ts`. Busca la sección `siteConfig`:

```typescript
export const siteConfig = {
  name: 'María García',
  title: 'María García | Arquitectura con alma',
  description: 'Estudio de arquitectura...',
  url: 'https://portfolio-mparchistudio.vercel.app',
  email: 'contacto@ejemplo.com',
  social: [
    { platform: 'instagram', url: 'https://instagram.com/tu-usuario' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/tu-usuario' },
  ],
}
```

Modifica los valores entre comillas según necesites.

### Servicios ofrecidos

En el mismo archivo `src/lib/constants.ts`, busca la sección `services` para modificar los servicios que ofreces.

---

## Publicar cambios

Después de hacer cambios, necesitas publicarlos para que aparezcan en la web.

### Opción 1: Desde la terminal (recomendado)

1. **Abre la terminal** en la carpeta del proyecto

2. **Verifica que todo funciona** ejecutando:
   ```bash
   npm run build
   ```
   Si ves errores, revisa los cambios que hiciste.

3. **Publica los cambios:**
   ```bash
   vercel --prod
   ```

4. **Espera** a que termine (unos 30-60 segundos)

5. **Verifica** abriendo la URL del sitio en el navegador

### Opción 2: Guardar cambios con Git (para historial)

Si quieres mantener un historial de los cambios:

1. **Guarda los cambios:**
   ```bash
   git add .
   git commit -m "Añadir nuevo proyecto: Casa de la Playa"
   ```

2. **Publica:**
   ```bash
   vercel --prod
   ```

---

## Preguntas frecuentes

### ¿Por qué no aparece mi proyecto?

1. Verifica que el archivo tiene extensión `.mdx` (no `.txt` o `.md`)
2. Verifica que está en la carpeta correcta: `content/projects/`
3. Verifica que no hay errores en el formato del archivo (los campos entre `---` deben estar correctos)
4. Ejecuta `npm run build` para ver si hay errores

### ¿Por qué no se ve una imagen?

1. Verifica que la imagen está en `public/images/projects/`
2. Verifica que la ruta en el archivo `.mdx` es correcta
3. La ruta debe empezar con `/images/` (sin `public`)
4. Verifica que el nombre del archivo coincide exactamente (mayúsculas/minúsculas importan)

### ¿Cómo cambio el orden de los proyectos?

Los proyectos se ordenan por año (más recientes primero). Para cambiar el orden, modifica el campo `year` en cada proyecto.

### ¿Puedo usar otros formatos de imagen?

Sí, puedes usar JPG, PNG o WebP. JPG es el más recomendado por su balance entre calidad y tamaño.

### ¿Cómo veo los cambios antes de publicar?

Ejecuta en la terminal:
```bash
npm run dev
```

Luego abre `http://localhost:3000` en el navegador. Los cambios se reflejan automáticamente mientras editas.

Para parar el servidor, presiona `Ctrl + C` en la terminal.

### ¿Qué hago si algo sale mal?

1. No te preocupes, los cambios no publicados no afectan la web en producción
2. Si publicaste algo incorrecto, corrige el error y vuelve a publicar
3. Si usas Git, puedes volver a una versión anterior con `git checkout .`

---

## Resumen de comandos útiles

| Comando | Qué hace |
|---------|----------|
| `npm run dev` | Inicia el servidor de desarrollo (para ver cambios localmente) |
| `npm run build` | Verifica que todo está correcto |
| `vercel --prod` | Publica los cambios en la web |

---

## Contacto técnico

Si tienes problemas técnicos que no puedes resolver, contacta al desarrollador con:
- Una descripción del problema
- Capturas de pantalla si es posible
- Los pasos que seguiste antes del error
