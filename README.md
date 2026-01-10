# Vite Vanilla Multipage Template

A minimal, predictable multipage template for static sites and landing pages. Built with `vite`,
plain HTML/SCSS/JS, and an include-based HTML block system.

## Contents

- [Features](#features)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Adding pages and blocks](#adding-pages-and-blocks)
- [SCSS — architecture recommendations](#scss-architecture-recommendations)
- [Deployment](#deployment)

## Features

- Fast dev server and optimized production builds via `vite`.
- Multipage architecture — each folder under `src` maps to a page.
- Reusable HTML blocks (header/footer/sections) via `posthtml-include`.
- Clean, modular SCSS structure (variables, base, blocks, pages).
- Minimal vanilla JS — no frameworks or SPA logic.

## Requirements

- Node.js 18+ (recommended)
- npm, yarn, or pnpm

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Start the dev server (with HMR):

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview the production build locally:

```bash
npm run preview
```

## Scripts

- `dev` — start dev server
- `build` — production build
- `preview` — locally preview the `dist` folder

(Scripts are defined in `package.json`.)

## Project structure

Key folders and files (example):

```text
├── public/                # static files (favicon, manifest, etc.)
├── src/                   # Vite source root
│   ├── index.html         # root page
│   ├── about/index.html   # example subpage
│   ├── blocks/            # reusable HTML fragments (header, footer, ...)
│   ├── styles/            # SCSS: _variables, _base, blocks/, pages/, main.scss
│   ├── scripts/           # vanilla JS
│   └── assets/            # images, fonts
├── vite.config.js
├── package.json
└── README.md
```

## Adding pages and blocks

- New page: create `src/new-page/` with an `index.html` inside — it will be available at
  `/new-page`.
- Blocks: place shared fragments in `src/blocks/` and include them in pages using an include tag,
  e.g.:

```html
<include src="blocks/header.html"></include>
```

PostHTML replaces includes during dev/build.

## SCSS — architecture recommendations

- `src/styles/_variables.scss` — colors, spacing, and other variables.
- `src/styles/_base.scss` — base rules and utilities.
- `src/styles/blocks/` — styles for individual blocks.
- `src/styles/pages/` — page-specific styles.
- `src/styles/main.scss` — entry file that imports partials.

Follow BEM-like conventions for predictable, reusable styles.

## Deployment

Build the project with `npm run build` — the output folder is `dist/`. Deploy `dist/` to any static
host (Netlify, Vercel, GitHub Pages, S3, etc.).

## Author

Vladyslav — https://github.com/onndes

## License

MIT License.
