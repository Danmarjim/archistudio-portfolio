# Guía de Setup en Windows desde Cero

## Archistudio Portfolio - Configuración del Entorno de Desarrollo

---

## 1. Instalar Node.js

Node.js es el runtime de JavaScript necesario para ejecutar el proyecto.

1. Ve a **https://nodejs.org**
2. Descarga la versión **LTS** (Long Term Support) - actualmente 20.x o superior
3. Ejecuta el instalador `.msi`
4. Marca la opción **"Automatically install necessary tools"** durante la instalación
5. Completa el wizard con las opciones por defecto

**Verificar instalación** (abre PowerShell o CMD):

```bash
node --version
npm --version
```

---

## 2. Instalar Git

Git es necesario para control de versiones y clonar el repositorio.

1. Ve a **https://git-scm.com/download/win**
2. Descarga el instalador
3. Durante la instalación:
   - Editor por defecto: selecciona **VS Code** si lo vas a usar
   - Ajustar PATH: selecciona **"Git from the command line and also from 3rd-party software"**
   - El resto de opciones déjalas por defecto

**Verificar instalación:**

```bash
git --version
```

**Configurar identidad:**

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

---

## 3. Instalar y Configurar Windows Terminal

Windows Terminal es la mejor aplicación de terminal para Windows: soporta pestañas, temas, y múltiples shells.

### 3.1 Instalar Windows Terminal

1. Abre **Microsoft Store** (búscalo en el menú inicio)
2. Busca **"Windows Terminal"**
3. Haz clic en **"Obtener"** o **"Instalar"**
4. Espera a que termine la instalación

Alternativamente, puedes instalarlo desde: **https://aka.ms/terminal**

### 3.2 Configurar Git Bash como terminal por defecto

Git Bash te da acceso a comandos Unix (ls, cat, grep, etc.) que son los que aparecen en la mayoría de tutoriales de desarrollo web.

1. Abre **Windows Terminal**
2. Pulsa `Ctrl + ,` para abrir configuración
3. En **"Perfil predeterminado"** selecciona **Git Bash**
4. Guarda los cambios

> **Nota:** Git Bash aparecerá como opción después de instalar Git (sección 2).

### 3.3 Comparativa de terminales

| Terminal | Veredicto |
|----------|-----------|
| **CMD** | Muy limitado, comandos antiguos, sin pestañas |
| **PowerShell** | Mejor que CMD, pero interfaz básica |
| **Git Bash** | Comandos Unix, ideal para desarrollo web |
| **Windows Terminal** | La app que los une todos con pestañas y temas |

---

## 4. Configurar SSH para GitHub

Las claves SSH te permiten conectarte a GitHub sin introducir usuario y contraseña cada vez.

### 4.1 Generar una nueva clave SSH

Abre **Git Bash** (se instala con Git) y ejecuta:

```bash
ssh-keygen -t ed25519 -C "tu@email.com"
```

- Cuando pregunte dónde guardar el archivo, presiona **Enter** para usar la ubicación por defecto
- Introduce una passphrase segura (o déjala vacía si prefieres)

### 4.2 Iniciar el ssh-agent

```bash
eval "$(ssh-agent -s)"
```

### 4.3 Añadir la clave al ssh-agent

```bash
ssh-add ~/.ssh/id_ed25519
```

### 4.4 Copiar la clave pública

```bash
cat ~/.ssh/id_ed25519.pub
```

Selecciona y copia todo el contenido que aparece (empieza con `ssh-ed25519`).

### 4.5 Añadir la clave a GitHub

1. Ve a **https://github.com/settings/keys**
2. Haz clic en **"New SSH key"**
3. Título: ponle un nombre descriptivo (ej: "PC Windows Trabajo")
4. Key type: **Authentication Key**
5. Key: pega la clave que copiaste
6. Haz clic en **"Add SSH key"**

### 4.6 Verificar la conexión

```bash
ssh -T git@github.com
```

Deberías ver: `Hi username! You've successfully authenticated...`

---

## 5. Instalar Visual Studio Code

Editor de código recomendado.

1. Ve a **https://code.visualstudio.com**
2. Descarga e instala la versión para Windows
3. Instala estas extensiones esenciales:
   - **ES7+ React/Redux/React-Native snippets**
   - **Tailwind CSS IntelliSense**
   - **Prettier - Code formatter**
   - **ESLint**
   - **Markdown PDF** (para convertir este documento a PDF)

---

## 6. Clonar el Repositorio

Abre **Git Bash** o **PowerShell**:

```bash
# Navega a donde quieras guardar el proyecto
cd C:\Users\TuUsuario\Development

# Clona el repositorio usando SSH
git clone git@github.com:USUARIO/archistudio-portfolio.git

# Entra al directorio
cd archistudio-portfolio
```

---

## 7. Instalar Dependencias del Proyecto

```bash
npm install
```

Esto instalará todas las dependencias definidas en `package.json`.

---

## 8. Ejecutar el Proyecto

```bash
npm run dev
```

El servidor de desarrollo estará disponible en **http://localhost:3000**

---

## 9. (Opcional) Instalar Vercel CLI

Para hacer deploys a producción:

```bash
npm install -g vercel
vercel login
```

---

## Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run lint` | Ejecuta el linter |
| `vercel --prod` | Deploy a producción |

---

## Solución de Problemas Comunes

### Error de permisos en PowerShell

Si tienes problemas ejecutando scripts:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Puerto 3000 en uso

```bash
npm run dev -- -p 3001
```

### Limpiar caché de npm

```bash
npm cache clean --force
rm -rf node_modules
npm install
```

### Error "Permission denied (publickey)" en Git

Tu clave SSH no está configurada correctamente. Repite los pasos de la sección 3.

### El ssh-agent no arranca en Windows

Abre PowerShell como administrador y ejecuta:

```powershell
Get-Service ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent
```

---

## Checklist Final

- [ ] Node.js instalado (`node --version` funciona)
- [ ] npm instalado (`npm --version` funciona)
- [ ] Git instalado y configurado
- [ ] Windows Terminal instalado desde Microsoft Store
- [ ] Git Bash configurado como terminal por defecto
- [ ] Clave SSH generada y añadida a GitHub
- [ ] Conexión SSH verificada (`ssh -T git@github.com`)
- [ ] VS Code con extensiones instaladas
- [ ] Repositorio clonado correctamente
- [ ] `npm install` ejecutado sin errores
- [ ] `npm run dev` funciona y ves el sitio en localhost:3000

---

## Convertir este documento a PDF

1. Abre este archivo en VS Code
2. Instala la extensión **"Markdown PDF"**
3. Clic derecho en el archivo → **"Markdown PDF: Export (pdf)"**

---

*Generado para el proyecto Archistudio Portfolio*
