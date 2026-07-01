# AetherVault — Next.js 15 + MDX

Blog personal estilo editorial inspirado en LessWrong: feed de posts, fondo dinámico
por post, sidebar colapsable con tags y filtros, buscador, y un panel admin con
editor MDX + preview en vivo. Sin login de usuarios, sin comentarios, sin karma.

## 0. Ubicación del proyecto

Este proyecto está pensado para vivir en `C:\APPs\aethervault`. Descomprimí el
zip directamente ahí, de forma que quede `C:\APPs\aethervault\package.json`,
`C:\APPs\aethervault\app\`, etc. (no metido un nivel más adentro en una
subcarpeta `aethervault\aethervault\...`).

## 1. Instalación

Necesitás Node.js 18.18+ instalado. Desde PowerShell o CMD:

```powershell
cd C:\APPs\aethervault
npm install
```

Esto va a instalar Next.js 15, React 19, Tailwind, Framer Motion, Fuse.js
(buscador), next-mdx-remote (render de MDX) y el resto de dependencias listadas
en `package.json`.

## 2. Configurar la contraseña del panel admin

Ya existe un archivo `.env.local` con una contraseña de prueba (`cambiame123`).
**Cambiala antes de subir esto a producción**:

```bash
# Editá .env.local y poné tu propia contraseña
ADMIN_PASSWORD=tu-contraseña-segura
```

## 3. Correr en desarrollo

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) — vas a ver el feed con los
dos posts de ejemplo que ya están en `content/posts/`.

Para entrar al panel de administración: [http://localhost:3000/admin](http://localhost:3000/admin)
Usá la contraseña que configuraste en `.env.local`.

## 4. Cómo escribir un post nuevo

**Opción A — desde el panel admin (recomendado):**
1. Entrá a `/admin`, ingresá la contraseña.
2. Te lleva a `/admin/editor`. Completá título, resumen, tags, elegí una imagen
   de portada de la galería, y escribí en el panel izquierdo (Markdown/MDX).
3. El panel derecho muestra un preview en vivo mientras escribís.
4. Click en **Publicar**. Esto crea/actualiza un archivo `.mdx` en `content/posts/`.

Para editar un post existente: `/admin/editor?slug=nombre-del-post`

**Opción B — a mano:**
Creá un archivo `content/posts/mi-post.mdx` con este formato:

```mdx
---
title: "Título del post"
excerpt: "Resumen corto que aparece en el feed."
date: "2026-07-01"
tags: ["tag1", "tag2"]
coverImage: "/images/covers/circuit.svg"
---

Contenido en Markdown normal acá.

<Callout type="idea">
  Podés usar componentes especiales dentro del contenido.
</Callout>

<VideoEmbed url="https://youtube.com/watch?v=..." caption="Una explicación visual" />
```

## 5. Componentes especiales disponibles en los posts

- `<Callout type="info|warning|idea">texto</Callout>` — recuadro destacado.
- `<VideoEmbed url="..." caption="...">` — embed de YouTube/Vimeo responsive.
- `<ImageGallery images={[{src:"...", alt:"..."}]} />` — galería con zoom click.

Podés agregar más componentes editando `components/MDXComponents.tsx`.

## 6. La galería de imágenes de fondo

Está definida en `lib/coverImages.ts`. Cada post elige una imagen de esa galería
(o vos podés poner cualquier URL/ruta directamente en el frontmatter `coverImage`).

Por ahora hay 4 placeholders SVG generados automáticamente en
`public/images/covers/`. **Reemplazalos por tus propias imágenes**:

1. Conseguí imágenes de alta calidad (Unsplash, Pexels, o generadas con IA).
2. Guardalas en `public/images/covers/` (ej: `circuit.jpg`, `ember.jpg`).
3. Actualizá las rutas en `lib/coverImages.ts`.

El fondo cambia con un crossfade animado cuando pasás el mouse sobre un post en
el feed (`components/HomeClient.tsx` + `components/DynamicBackground.tsx`), y
es estático (el cover del post) dentro de la página individual
(`components/PostBackground.tsx`).

## 7. Estructura del proyecto

```
app/
  page.tsx                 → home (feed de posts)
  posts/[slug]/page.tsx    → página individual de post
  admin/page.tsx           → login del panel admin
  admin/editor/page.tsx    → editor MDX con preview en vivo
  api/posts/               → API routes para leer/crear posts
  api/admin-login/         → API route de autenticación

components/
  Header.tsx               → header con search y toggle de sidebar
  Sidebar.tsx               → sidebar colapsable con tags y sorting
  PostCard.tsx              → tarjeta de post en el feed
  DynamicBackground.tsx     → fondo animado en el feed
  PostBackground.tsx        → fondo estático en página de post
  MDXComponents.tsx          → componentes custom usables en MDX
  SimpleMDXPreview.tsx        → preview liviano para el editor

lib/
  posts.ts                  → lectura y parsing de archivos MDX
  search.ts                 → búsqueda con Fuse.js
  coverImages.ts             → galería curada de imágenes de fondo

content/posts/               → tus posts en formato .mdx
public/images/covers/         → imágenes de fondo
```

## 8. Deploy a Vercel

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <tu-repo-de-github>
git push -u origin main
```

Después en [vercel.com](https://vercel.com):
1. Importá el repo.
2. En **Environment Variables**, agregá `ADMIN_PASSWORD` con tu contraseña real.
3. Deploy.

**Importante sobre el panel admin en producción:** el editor escribe archivos
directamente en el filesystem (`content/posts/`). Esto funciona perfecto en
desarrollo local, pero en Vercel el filesystem es de solo lectura en producción
(serverless). Para publicar posts una vez deployado tenés dos caminos:

- **Recomendado:** escribí/editá los posts localmente con el editor admin
  (`npm run dev`), después hacé `git add`, `git commit`, `git push` — Vercel
  redeploya automáticamente con el contenido nuevo.
- **Alternativo (a futuro):** conectar el editor a un repo de GitHub vía API
  para que el botón "Publicar" haga commit directo. Si querés esto, decímelo
  y lo armamos como mejora.

## 9. Próximos pasos sugeridos

- Reemplazar las imágenes placeholder SVG por tus fotos/ilustraciones reales.
- Ajustar la paleta de colores en `app/globals.css` (variables `--color-accent`, `--color-bg`, etc. para light y dark).
- Escribir 3-5 posts más para que el feed, los tags y el buscador se sientan vivos.
- Si en algún momento querés sumar comentarios, RSS, OG images dinámicas, o
  más ajustes de estética, decímelo y lo vamos agregando incrementalmente.

## 10. Sobre el tema claro/oscuro

El sitio arranca en modo claro por defecto, con un botón de sol/luna en el
header (al lado del buscador) para alternar a modo oscuro. La preferencia se
guarda en `localStorage` y respeta la preferencia del sistema operativo si no
elegiste nada todavía. Todos los colores están centralizados como variables
CSS en `app/globals.css` (bloques `:root` y `.dark`), así que para cambiar la
paleta completa alcanza con editar esos dos bloques.
