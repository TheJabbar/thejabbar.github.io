# thejabbar.github.io

Personal site of Muhammad Abdul Jabbar — MS Engineer (L2) Automation & AI @ NTT Data.
Built with Vite + TypeScript, deployed to GitHub Pages from `dist/`.

## Edit content

All skills and experience live in one file: [`src/data.ts`](src/data.ts).
Edit the `experiences` / `skillGroups` arrays — the timeline, filters, and badges re-render automatically.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build to dist/
npm run preview  # preview the production build
```

Deploys automatically on push to `main` via [`.github/workflows/pages.yml`](.github/workflows/pages.yml).
