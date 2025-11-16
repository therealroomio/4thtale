# Repository Guidelines

## Project Structure & Module Organization
- Next.js App Router lives in `app/`; `page.tsx` is the landing view and `layout.tsx` wraps all pages. Global styles and Tailwind layer entries sit in `app/globals.css`.
- Static assets go in `public/` (served from `/`); keep shared UI assets (logos, favicons) there rather than under `app/`.
- Root configs (`next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `tailwind.config` via Tailwind v4 defaults) define build, lint, and styling behavior. Adjust them before introducing new tooling.
- Keep feature-specific modules close to their routes inside `app/feature/...`; share cross-route utilities via small files rather than large grab-bag helpers.

## Build, Test, and Development Commands
```bash
pnpm dev     # run the Next.js dev server on :3000 with hot reload
pnpm build   # production build; fails on type or lint errors
pnpm start   # start production server from the last build
pnpm lint    # run ESLint (uses Next.js + TypeScript rules)
```
Use `pnpm` to stay in sync with the lockfile; `npm`/`yarn` are acceptable only if you regenerate the lockfile intentionally.

## Coding Style & Naming Conventions
- TypeScript-first, ES modules, 2-space indentation. Prefer functional React components.
- Components and files: `PascalCase.tsx` for components, `useThing.ts` for hooks, and `slug-case` for route segments. Avoid deep directory nesting.
- Styling: Tailwind utilities are preferred for layout and spacing; keep any bespoke CSS in `app/globals.css`. Co-locate component-specific styles via modern CSS features rather than global overrides.
- Lint before pushing; fix or justify any lint suppressions inline.

## Testing Guidelines
- No test harness is present yet. When adding tests, use `*.test.ts`/`*.test.tsx` alongside the code or under `__tests__/`.
- Aim for fast unit coverage on utilities and light component tests for critical UI/logic. Add a `pnpm test` script once a runner (e.g., Vitest or Jest) is introduced.

## Commit & Pull Request Guidelines
- Commit messages: short, imperative mood (`Add hero copy`, `Fix layout shift`). Keep related changes together; avoid multi-topic commits.
- Pull requests: start with a brief summary and rationale; list changes and risks. Link tracking issues or tickets. Include screenshots or recordings for UI-visible changes and note how you tested (commands run).
- Before requesting review: ensure `pnpm build` and `pnpm lint` pass locally and new files conform to the structure above.

## Security & Configuration Tips
- Do not commit secrets. Use `.env.local` for private vars; add new required env keys to `.env.example` if/when introduced.
- Review external dependencies before adding them; prefer first-party Next/Tailwind solutions when possible.
