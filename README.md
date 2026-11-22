# mikhaelsunil.github.io

Personal portfolio of **Mikhael Sunil** — Robotics & Autonomous Systems Engineer.
Live at **https://mikhaelsunil.github.io**

Static site, no build step, no dependencies to install. GitHub Pages serves it
straight from the `master` branch.

## Editing

All the content lives in two plain settings files:

- **`content/site.js`** — name, intro, portrait, social links, contact, CV pop-up
- **`content/sections.js`** — every section on the page, in order

Change those and the page follows; the navigation tabs are generated from
`sections.js`, so adding a section adds its tab automatically.

**→ See [EDITING.md](EDITING.md) for a step-by-step guide.**

## Layout

```
index.html              page shell + design tokens (colours, fonts)
content/site.js         ← your details
content/sections.js     ← your sections
assets/css/style.css    retro hardware-manual styling
assets/js/render.js     builds the page from the content files
assets/js/ui.js         boot screen, forklift nav, CV pop-up, contact form
assets/js/armbot.js     cloth-folding robot arms (bottom right)
assets/img/             photos go here
```

Tailwind CSS and Google Fonts load from their CDNs; everything else is local.

## Running it locally

Double-click `index.html`. That's all — it works from the filesystem.
