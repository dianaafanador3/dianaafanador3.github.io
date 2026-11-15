# DiAfanador

Personal portfolio of Diana Afanador, live at **https://dianaafanador3.github.io**.

Built with Vue 3, TypeScript and Vite. Available in English, Spanish and Catalan.

## Develop

```sh
npm ci            # install dependencies
npm run dev       # local dev server
npm run build     # type-check and build to dist/
npm run preview   # serve the production build
npm run format    # format code with Prettier
```

Pushing to `main` deploys the site with GitHub Actions (`.github/workflows/static.yml`).

## Structure

```
src/
  assets/styles/   tokens.css (design tokens) and global.css (base styles, utilities)
  components/
    layout/        AppNav (with the mobile menu) and AppFooter
    ui/            SectionLabel, PillButton, LinkCard, PageHero, LanguageSwitch
    portfolio/     ProjectCard
  data/            projects.ts and resume.ts (content, translated per language)
  i18n/            messages.ts (all UI text) and the useI18n() helper
  pages/           Home, About, Writing, Resume, and System (style guide)
public/
  project2/        Motlle, a standalone generative art page
  favicon.svg, apple-touch-icon.png
```

## Content

- **UI text:** `src/i18n/messages.ts`, with one block per language (`en`, `es`, `ca`).
- **Resume:** `src/data/resume.ts`. Dates are `YYYY-MM` and are formatted for each language.
- **Projects:** `src/data/projects.ts`. Each project links to a page in `public/`.

The visitor's language is picked from their browser and remembered in `localStorage` (key `locale`). The Motlle page reads the same key.

## Design system

Paper and ink: warm off-white surfaces, near-black text, and one orange accent (`#e8590c`). Fonts are Inter Tight, Inter, Geist Mono and Instrument Serif. The tokens live in `src/assets/styles/tokens.css`. To see the colours, type scale, spacing and components, open the style guide at `/#/system`.
