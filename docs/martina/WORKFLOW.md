# Workflow con Cowork

Cómo trabajar en el portfolio usando Cowork.

---

## Flujo habitual

```
Abrir Cowork → Decirle a Claude qué cambiar → Claude edita los archivos → Push → Vercel despliega
```

No hace falta saber código. Claude entiende instrucciones en lenguaje natural y edita directamente los archivos del proyecto.

---

## Paso a paso

### 1. Abrir Cowork con la carpeta del proyecto

Asegúrate de que Cowork tiene acceso a la carpeta:

```
D:\MP_ARCHISTUDIO\WEB-MP_archistudio\archistudio-portfolio
```

### 2. Describir el cambio

Algunos ejemplos de lo que puedes pedir:

- "Añade el proyecto X con estas fotos y este texto..."
- "Traduce al inglés la descripción del proyecto cucina-parigina"
- "Cambia el título de la sección hero en español"
- "Añade una noticia sobre la publicación en la revista Y"
- "Corrige el texto del footer en italiano"
- "Marca el proyecto Z como destacado"

### 3. Revisar los cambios

Claude te mostrará qué archivos ha modificado. Si algo no te convence, díselo:

> "El texto en inglés suena demasiado formal, hazlo más cercano"

### 4. Publicar

Cuando estés de acuerdo con los cambios, dile a Claude:

> "Haz commit y push"

Claude ejecutará:

```bash
git add -A
git commit -m "descripción del cambio"
git push
```

Vercel detecta el push automáticamente y despliega en 1-2 minutos.

---

## Verificar el deploy

Puedes ver el estado del deploy en:

- **Vercel dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)
- **Proyecto activo:** `portfolio-mparchistudio` (el otro proyecto en Vercel ya no se usa)

---

## Repositorio Git

El código está en GitHub:

```
https://github.com/Danmarjim/archistudio-portfolio
```

La rama principal es `main`. Todos los cambios van directamente a `main`.

---

## Si algo va mal

Si el deploy falla o el sitio da error tras un push, dile a Claude:

> "El último deploy ha fallado, revisa qué ha pasado"

Claude puede leer los logs de Vercel (si tienes el conector conectado) o revisar los archivos modificados para encontrar el problema.

---

## Archivos que Claude nunca debe tocar

- `next.config.ts` — contiene `outputFileTracingExcludes` crítico para Vercel. Si se elimina, el deploy falla con error de 250 MB.
- `src/i18n/routing.ts` — define los locales del sitio
- `middleware.ts` — maneja la redirección por idioma

Estos archivos solo se modifican si hay un cambio técnico concreto y justificado.
