# Future Plan

A personal, checked guide for one Class 12 Humanities student in Delhi who wants a career in psychology. Nine short sections cover the degree, the entrance exams, the licence, the money, teaching as an alternative, and the sources behind every number.

Live site: https://kavy-codes.github.io/future-plan/

## Local development

```bash
npm install
npm run dev
```

Build and preview the production bundle:

```bash
npm run build
npm run preview
```

`npm run typecheck` runs TypeScript without emitting files.

## Structure

- `src/data/content.ts` holds all copy, figures, questions, glossary entries, and source links.
- `src/sections/` has one component per section.
- `src/App.tsx` is the shell: header, sidebar, search, notes, and hash routing.
- `src/styles.css` is the design system, with light and dark tokens.
- `src/lib/hooks.ts` has local storage, theme, hash routing, and scroll helpers.

## Notes

- No backend and no tracking. Progress, pins, notes, and theme stay in the browser under the `futureplan.v1.` prefix.
- Routing is hash based, so every section has a shareable URL.
- The build uses a relative base, which lets it run at a repository subpath on GitHub Pages.
- Every claim is tied to an official document in the Sources section. Figures change yearly, so confirm anything that decides money or a year of your life.

## Deploy

Pushes to `main` deploy through GitHub Actions to GitHub Pages. The workflow is in `.github/workflows/deploy.yml`.
