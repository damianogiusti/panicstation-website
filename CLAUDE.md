# CLAUDE.md

Guidance for working in this repository.

## What this is

Static marketing site for **Panic Station**, a pop rock live band, served at
https://www.panicstation.it via **GitHub Pages** (custom domain in `CNAME`).

Hand-written HTML/CSS/JS — **no framework, no build step**. The site was
originally a Mobirise export and has since been fully rewritten into plain
static files. Do not reintroduce Bootstrap, Mobirise, or any bundler.

## Files

- `index.html` — the single page. Sections in order: navbar, hero, social bar,
  band (bio + photo carousel), gigs, downloads, contact, footer.
- `styles.css` — all styles. CSS custom properties for the palette, CSS grid /
  flexbox for layout, `IntersectionObserver`-driven scroll reveals (`[data-reveal]`).
- `script.js` — one IIFE. Inline SVG icons, i18n (`setLang`), gig fetch/render,
  band carousel, mobile navbar toggle, copyright year.
- `translations.js` — `var TRANSLATIONS = { it, en, de }` string dictionary read
  by `script.js` (plain global, no imports).
- `CNAME`, `sitemap.xml`, `robots.txt` — GitHub Pages / SEO. Keep in sync with
  the live domain.
- `assets/images/` — WebP images only referenced by the page. Keep it lean;
  delete unused assets.

## Internationalization

Three languages: **it / en / de**. Mechanism:

- Text nodes carry `data-i18n="key"` (set via `textContent`) or
  `data-i18n-html="key"` (set via `innerHTML`, for strings containing markup).
- `translations.js` holds the dictionary; every key must exist in all three
  languages.
- `setLang(lang)` in `script.js` walks the attributes, sets `<html lang>`, and
  persists the choice to `localStorage`.
- First visit auto-detects `navigator.language`: `it*` → IT, `de*` → DE,
  everything else → EN. A remembered choice overrides detection.
- Gig rendering is language-aware (month names, "add to calendar" label, teaser).

When adding user-visible text, add the key to **all three** language blocks.

## Gigs

Gigs are fetched at runtime from a Supabase edge function
(`GIGS_ENDPOINT` in `script.js`); the response is
`{ gigs: [{ date, eventName, location }], isTeaserEnabled }`. This is
self-contained — do not add a dependency on any external management repo. The
container element must keep `id="next_gigs"`.

## Band photo carousel

The band section shows a fade carousel (`.band-carousel` in `index.html`, styled
in `styles.css`, driven by `initCarousel()` in `script.js`): 3s autoplay, prev/next
arrows, dot nav, pauses on hover and when the tab is hidden, honours
`prefers-reduced-motion`. Slide filenames follow display order
(`band.webp` first, then `band-01.webp`…`band-10.webp`).

## Images

Source photos are compressed to WebP before committing. Live band shots are
1800×1200 (3:2). Use `cwebp` (roughly `-q 72`–`80`); for a portrait source,
cover-crop top-anchored so the subject's head is kept. Never commit multi-MB
originals.

## Git / deploy workflow

- `main` is the deployed branch. Development happens on a **feature branch
  created per user request** (e.g. `band-carousel`), with small, incremental
  commits. `de-mobirise-rewrite` was a one-off migration branch, not the ongoing
  dev branch — don't treat it as the default.
- Deploy = merge the feature branch into `main` with `--no-ff` (keeps history
  revertable), push both branches, then switch back to the feature branch. Keep
  it around for reverts.
- GitHub Pages redeploys automatically on push to `main`.
- End commit messages with the `Co-Authored-By` trailer.

## Local preview

```
python3 -m http.server 8000
```
then open http://localhost:8000/.
