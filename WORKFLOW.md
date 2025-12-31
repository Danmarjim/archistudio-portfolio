# Flujo de Trabajo - Portfolio Arquitectura

Este documento describe el proceso de desarrollo colaborativo entre el desarrollador y Claude Code.

---

## Proceso de Desarrollo por Tarea

### 1. Crear Rama

Para cada tarea, se crea una rama especifica desde `main`:

```bash
git checkout main
git checkout -b feature/nombre-de-la-tarea
```

**Convenciones de nombres de rama:**
- `feature/` - Nueva funcionalidad
- `fix/` - Correccion de errores
- `docs/` - Documentacion
- `refactor/` - Refactorizacion de codigo

### 2. Desarrollo

- Implementar la tarea en la rama creada
- Hacer commits atomicos y descriptivos
- Verificar que el build pasa: `npm run build`

**Formato de commits:**
```
tipo(scope): descripcion breve

Descripcion detallada si es necesario

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

**Tipos de commit:**
- `feat` - Nueva funcionalidad
- `fix` - Correccion de bug
- `docs` - Documentacion
- `style` - Formato, sin cambios de codigo
- `refactor` - Refactorizacion
- `test` - Tests
- `chore` - Tareas de mantenimiento

### 3. Actualizar Bitacora

Antes de solicitar revision, actualizar `BITACORA.md`:

- Marcar tarea como completada en la tabla de fases
- Anadir entrada al log de desarrollo con:
  - Nombre de la rama
  - Descripcion de lo implementado
  - Detalles tecnicos relevantes
- Actualizar tabla de archivos clave si hay nuevos
- Actualizar proximos pasos

### 4. Solicitar Revision

Avisar al usuario que la rama esta lista para revision:

- Mostrar resumen de commits
- Indicar como probar los cambios
- Esperar confirmacion del usuario

### 5. Mergear a Main

Una vez aprobado por el usuario:

```bash
git checkout main
git merge feature/nombre-de-la-tarea --no-ff -m "Merge branch 'feature/nombre-de-la-tarea'"
```

**Nota:** Usar `--no-ff` para mantener historial de la rama.

### 6. Limpiar (Opcional)

Eliminar la rama local si ya no se necesita:

```bash
git branch -d feature/nombre-de-la-tarea
```

### 7. Siguiente Tarea

Si hay mas tareas pendientes, repetir el proceso desde el paso 1.

---

## Diagrama de Flujo

```
┌─────────────────┐
│   main branch   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Crear rama     │
│  feature/xxx    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Desarrollar    │
│  + Commits      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Actualizar     │
│  BITACORA.md    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Avisar usuario │
│  para revision  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Usuario prueba │
│  y aprueba      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Merge a main   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Siguiente tarea │
│   (si existe)   │
└─────────────────┘
```

---

## Archivos de Control del Proyecto

| Archivo | Proposito |
|---------|-----------|
| `BITACORA.md` | Log de desarrollo, estado de tareas, progreso |
| `WORKFLOW.md` | Este documento - flujo de trabajo |
| `CLAUDE.md` | Contexto del proyecto para Claude Code |
| `README.md` | Documentacion general del proyecto |

---

## Comandos Utiles

```bash
# Ver estado de git
git status

# Ver ramas
git branch

# Ver historial de commits
git log --oneline -10

# Desarrollo
npm run dev

# Build de verificacion
npm run build

# Linting
npm run lint
```

---

## Notas

- **Nunca hacer push directo a main** - Siempre usar ramas
- **Siempre verificar build** antes de solicitar merge
- **Mantener BITACORA.md actualizada** en cada tarea
- **Esperar aprobacion** del usuario antes de mergear
