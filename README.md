# Дюжина: company website

A static site with no build step and no external requests. Fonts and scripts are all in this folder.

## Publish on GitHub Pages

Upload everything in this folder to the root of a GitHub repository, then turn on Pages:
Settings > Pages > Build and deployment > Deploy from a branch > main, / (root) > Save.

## Where things live

| Path | What it is |
|---|---|
| `index.html` | The page, already rendered so it shows even before scripts load |
| `css/site.css` | Colours, type, layout and animations |
| `css/fonts.css`, `fonts/` | Unbounded, Onest and JetBrains Mono (SIL Open Font Licence) |
| `js/site.js` | Page template, language switch and all animations |
| `js/react*.js` | React 18 (MIT licence), used to run the page |

The page opens in Russian; the RU / EN switch in the top bar changes the language.
