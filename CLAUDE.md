# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
pnpm dev     # Start Next.js dev server on :3000 with hot reload
pnpm build   # Production build; fails on type or lint errors
pnpm start   # Start production server from last build
pnpm lint    # Run ESLint (Next.js + TypeScript rules)
```

**Package Manager**: Use `pnpm` exclusively to stay in sync with the lockfile.

## Architecture Overview

### Framework & Routing
- **Next.js 16.0.3** with **App Router** architecture
- All routes live in `app/` directory
- `app/page.tsx` is the landing page (client component with `"use client"`)
- `app/layout.tsx` is the root layout (server component)
- `app/globals.css` contains global styles and Tailwind directives

### Styling System
- **Tailwind CSS v4** using modern setup (no separate config file)
- PostCSS integration via `@tailwindcss/postcss` plugin
- Global styles in `app/globals.css` with CSS custom properties and `@theme` inline
- Custom utility: `.no-scrollbar` hides scrollbars across browsers
- All component styling uses Tailwind utilities; avoid adding new global CSS

### TypeScript Configuration
- **Strict mode enabled** - all code must be fully typed
- Path alias: `@/*` maps to root directory
- Target: ES2017 with ESNext modules
- JSX mode: `react-jsx` (React 19 compatibility)

### Font Optimization
- Uses `next/font/google` for automatic font optimization
- Two font families loaded:
  - **Geist** (sans-serif) - Primary UI font
  - **Geist Mono** (monospace) - Code/technical display
- Font variables injected as CSS custom properties into `<body>` via `layout.tsx`

### State Management
- **React hooks only** - no external state management library
- Component-level state with `useState` for rendering state
- `useRef` for non-rendering state (e.g., drag tracking in MarqueeStrip)
- `useMemo` for expensive computations

## Code Patterns & Conventions

### File Naming
- Components: `PascalCase.tsx`
- Hooks: `useThing.ts`
- Route segments: `slug-case`
- Tests (when added): `*.test.ts` or `*.test.tsx`

### Component Pattern: MarqueeStrip
The homepage features a sophisticated infinite-scrolling marquee component (`app/page.tsx:19`) demonstrating advanced patterns:

**Animation**: Uses `requestAnimationFrame` for smooth 60fps scroll at 0.6px/frame
**Drag Handling**: Implements pointer capture API for smooth drag-to-scroll:
- `onPointerDown` → captures pointer and records start position
- `onPointerMove` → calculates delta and updates scroll
- `onPointerUp/Cancel/Leave` → releases pointer capture
**Infinite Loop**: Duplicates image array via `useMemo(() => [...IMAGES, ...IMAGES], [])`
**Pause on Hover**: Animation stops when `isHovered` or `isDragging` is true

When building similar interactive components, follow this pattern of combining `useState`, `useRef`, and `useEffect` with `requestAnimationFrame`.

### Next.js Image Component
- Use `next/image` with `fill` prop for responsive images
- Always specify `sizes` attribute for proper responsive loading
- Set `draggable={false}` on images inside draggable containers
- Static assets reference from `/images/` (served from `public/`)

## Project Structure

```
app/
  layout.tsx        # Root layout, metadata, font setup
  page.tsx          # Landing page (client component)
  globals.css       # Global styles, Tailwind, CSS variables

public/
  images/           # Static image assets (logos, portfolio images)
  *.svg             # Icon assets

Configuration files at root:
  next.config.ts        # Next.js config (currently minimal)
  tsconfig.json         # TypeScript config with strict mode
  eslint.config.mjs     # ESLint flat config (v9+)
  postcss.config.mjs    # Tailwind PostCSS setup
```

## Testing (Not Yet Configured)

No test harness is present. When adding tests:
- Use `*.test.ts`/`*.test.tsx` co-located with code or under `__tests__/`
- Add a `pnpm test` script to `package.json`
- Consider Vitest or Jest as the test runner

## Commit Guidelines

- Short, imperative commit messages: `Add hero copy`, `Fix layout shift`
- Keep related changes together; avoid multi-topic commits
- Before pushing: ensure `pnpm build` and `pnpm lint` pass locally
- For UI changes: include screenshots and note how you tested

## Security & Environment

- Never commit secrets; use `.env.local` for private variables
- Add required env keys to `.env.example` when introducing environment-based config
- Review external dependencies before adding; prefer Next.js/Tailwind first-party solutions

## Module Organization

- Keep feature-specific code close to routes: `app/feature/...`
- Share cross-route utilities via small, focused files
- Avoid deep directory nesting
- Place shared UI assets in `public/` rather than `app/`
