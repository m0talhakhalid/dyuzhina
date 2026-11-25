# Дюжина: company website

A static multi-page site in Russian and English, published with GitHub Pages.
It has no runtime dependencies and makes no external requests: fonts and scripts are all in this repository.

## Editing content

All text, services, projects and contact details are in **`src/data.mjs`**. After editing it, rebuild the pages:

```sh
node src/build.mjs
```

This regenerates every HTML page, `css/site.css`, `sitemap.xml` and `robots.txt`. Commit the source change together with the regenerated files. The build needs Node.js 18 or newer and installs nothing.

Common changes:

| To change | Edit |
|---|---|
| Company name, email, phone, WhatsApp, Telegram | `site` at the top of `src/data.mjs` |
| A service, its skills or its tools | `services` in `src/data.mjs` |
| Delivered projects | `projects` in `src/data.mjs` (only real, completed work) |
| "What we can build" list | `capabilities` in `src/data.mjs` |
| Page layout and markup | `src/build.mjs` |
| Styles | `src/styles.css` (animated illustrations: `src/illustrations.css`) |
| Behaviour (language switch, animation, form) | `js/site.js` |

## Preview locally

Pages link to folders (`services/`, `contact/`), so open them through a local web server rather than as files:

```sh
python -m http.server 8000
```

Then visit http://localhost:8000/.

## Structure

| Path | What it is |
|---|---|
| `index.html` | Home: the name, the 12 services, short teasers |
| `services/`, `services/<slug>/` | Service list and one detail page per service |
| `projects/` | Delivered projects (filterable) and what we can build |
| `process/`, `about/` | How we work; why one team |
| `contact/` | Inquiry / demo form; sends through Gmail, WhatsApp or Telegram |
| `404.html` | Not-found page |
| `css/`, `fonts/` | Styles and fonts: Unbounded, Onest, JetBrains Mono (SIL Open Font Licence) |
| `js/site.js` | All front-end behaviour, plain JavaScript |
| `src/` | Content and the build script (not needed by visitors) |

## Publish on GitHub Pages

Settings > Pages > Build and deployment > Deploy from a branch > `main`, `/ (root)` > Save.
`.nojekyll` makes Pages serve the files as they are.
