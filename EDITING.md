# How to edit this site

Your site lives at **https://mikhaelsunil.github.io**

You only ever need to touch **two files**:

| File | What's in it |
|---|---|
| `content/site.js` | Your name, intro paragraph, portrait photo, social links, contact settings, and the CV pop-up |
| `content/sections.js` | Every section of the page — Projects, Experience, Tech Stack, Education, Research, Contact |

Everything else (`index.html`, `assets/`) is the machinery. You can leave it alone.

---

## The fastest way to edit: straight on GitHub

You don't need to install anything. You can do all of this from a browser, even on your phone.

1. Go to https://github.com/MikhaelSunil/mikhaelsunil.github.io
2. Click the file you want to change, e.g. `content/sections.js`
3. Click the **pencil icon** (top right of the file)
4. Make your change
5. Scroll down, click **Commit changes**

Your site updates in **about 30–60 seconds**. Refresh the page (Ctrl+Shift+R / Cmd+Shift+R) to see it.

> **Tip:** there's also a one-key shortcut. On any page of the repo, press `.` (full stop) on your keyboard. A full code editor opens right in the browser, which is much nicer for bigger edits.

---

## The three rules

These files are *lists of settings*. The text is yours to change; the punctuation around it is not.

```js
title: "GeoScout — 6WD Autonomous Mine-Mapping Rover",
 ↑        ↑                                          ↑
 label    your text, inside the quotes               comma at the end
```

1. **Keep the quotes.** Change what's *between* them, not the `"` marks themselves.
2. **Keep the commas.** Every line ends with `,` except the last one in a group.
3. **If you need a `"` inside your text, write `\"`** — for example `the \"Best Poster\" award`.

If the page ever comes up blank after an edit, you broke one of those three. Press `F12`, click **Console**, and it will tell you which line. Or just undo your commit on GitHub (Commits → your commit → Revert).

---

## Common jobs

### Change some text

Find it in `content/sections.js` and type over it. That's it.

### Change your intro paragraph

`content/site.js`, near the top — the `intro` line.

### The waving smiley in the heading

Write `{wave}` anywhere in `heroHeading` and it becomes the little smiley with
the waving hand:

```js
heroHeading: "Glad you wandered in {wave} I'm Mikhael",
```

Remove `{wave}` and it's gone. It's drawn in the site's own colours, so it
follows dark mode; to redraw it, edit `WAVE_SVG` near the top of
`assets/js/render.js`.

### The job-title line under your name

There isn't one, by design. The `tagline` in `content/site.js` still feeds the
CV pop-up and what search engines show, but it's hidden on the page itself by
`showTaglineInHero: false`. Change that to `true` if you ever want it back
under your name.

### Add your portrait photo

1. Put the image in the `assets/img/` folder.
   *On GitHub: open `assets/img/`, click **Add file → Upload files**, drag it in, commit.*
2. In `content/site.js`, change:
   ```js
   photo: "",
   ```
   to
   ```js
   photo: "assets/img/portrait.jpg",
   ```
   (use your actual filename)

Leave `photo: ""` and you get the illustrated placeholder instead.

### Add a photo to a project

Upload it to `assets/img/`, then add an `image` line to that project in `content/sections.js`:

```js
{
  badge: "PRJ-03",
  kicker: "FIELD ROBOTICS",
  title: "GeoScout — 6WD Autonomous Mine-Mapping Rover",
  image: "assets/img/geoscout.jpg",      // <-- add this line
  body: "Six-wheel-drive GPS-denied exploration rover...",
  tags: ["ROS 2 SLAM", "Jetson / Teensy 4.0"]
},
```

### Add a new project

Copy an existing project block — from its opening `{` to its closing `},` — paste it below, and edit the text. Keep it inside the `items: [ ... ]` brackets.

### Add a whole new section

Open `content/sections.js` and paste this anywhere in the list, between two existing sections:

```js
{
  id: "talks",                    // no spaces; this becomes the #link
  nav: "Talks",                   // the tab label at the top
  number: "07",
  kicker: "SPEAKING",
  title: "Talks & Workshops",
  meta: "CONFERENCES",
  blocks: [
    {
      type: "cards",
      columns: 2,
      items: [
        {
          badge: "TALK-01",
          badgeColor: "scope",
          kicker: "ICAART 2026",
          title: "Binary-Measurement Consensus in Practice",
          body: "Twenty-minute talk on what breaks when you take consensus control off the simulator.",
          tags: ["Marbella", "Spain"]
        }
      ]
    }
  ]
},
```

**The nav tab appears by itself.** You don't have to add it anywhere else.

### Add a photo gallery section

There's a ready-made one already written in `content/sections.js`, just switched off. Search for `EXAMPLE — A PHOTO GALLERY SECTION`, delete the `/*` line above it and the `*/` line below it, then point the filenames at your own images.

### Reorder sections

Cut a whole section block (from `{` to `},`) and paste it higher or lower in the list. The page and the nav both follow.

### Delete a section

Delete the whole block, from its `{` to its `},`.

### Turn off the drone loading screen or the robot arms

In `content/site.js`:

```js
bootScreen: false,
armRobot: false,
```

### Make the contact form actually reach you

Right now the form shows a thank-you but doesn't send anything. Pick one:

**Option A — your email (30 seconds).** In `content/site.js`:
```js
email: "you@example.com",
```
The form then opens the visitor's own mail app with the message filled in.

**Option B — a real inbox form (5 minutes, free).** Sign up at [formspree.io](https://formspree.io), create a form, copy its endpoint URL, and put it in `content/site.js`:
```js
formEndpoint: "https://formspree.io/f/abcdwxyz",
```
Messages then land in your inbox and the visitor never leaves the page.

### Change the colours

All colours live in **one place now**: `assets/css/style.css`, at the top. There
are two blocks — `:root` for light mode and `[data-theme="dark"]` for dark.

They're written as red/green/blue numbers rather than hex codes, because that's
what lets the site fade between the two themes and keeps see-through shades
(like faint borders) working:

```css
:root {
  --c-signal: 217 78 40;   /* the orange */
  --c-ink:     28 27 24;   /* text and borders */
  --c-paper:  242 237 226; /* page background */
}
```

Change a number and it changes everywhere — cards, buttons, nav, even the
drone and the robot arms. You don't need to touch `index.html`.

To convert a hex code: `#D94E28` becomes `217 78 40`. Search for "hex to rgb"
and any converter will give you the three numbers.

### Dark mode

Visitors toggle it with the switch at the top right. Their choice is
remembered, and on a first visit the site follows whatever their device is set
to. To change how dark mode looks, edit the `[data-theme="dark"]` block in
`assets/css/style.css`.

To remove dark mode entirely, delete the `.theme-zone` block from
`index.html` — the switch disappears and everyone gets light mode.

---

## Reference

### Section recipe

```js
{
  id: "projects",       // the #anchor. letters and dashes only
  nav: "Projects",      // nav tab label — keep it short
  number: "02",         // the small "SECTION 02" marker
  kicker: "DOSSIER",    // small orange text above the heading
  title: "Projects",    // the big heading
  meta: "05 BUILDS",    // small grey text on the right
  blocks: [ ... ]       // the content
}
```

### Block types for `blocks:`

| `type` | What it makes | Options |
|---|---|---|
| `cards` | A grid of cards | `columns: 1`–`4`, `items: [...]` |
| `ledger` | The striped table used by Experience | `headers: [...]`, `rows: [...]` |
| `publications` | Papers with a copyable BibTeX box | `items: [...]` |
| `gallery` | A grid of photos | `columns: 1`–`4`, `items: [{src, caption}]` |
| `contact` | The contact links + message form | *(no options — pulls from `site.js`)* |
| `heading` | A small sub-label between blocks | `label: "..."` |
| `html` | Anything you want, as raw HTML | `html: "..."`, `class: "..."` |

A section can stack several blocks — look at the Research section, which uses `publications`, then `heading`, then `cards`, then `heading`, then `cards`.

### Card options

Every one is optional except `title`.

| Option | What it does |
|---|---|
| `badge` | The pill in the top-left, e.g. `"PRJ-02"` |
| `badgeColor` | `"signal"` (orange), `"scope"` (green), `"amber"`, `"ink"`, `"paper"` |
| `kicker` | Small text in the top-right |
| `kickerColor` | `"muted"` (default), `"scope"`, `"signal"`, `"ink"` |
| `title` | The card heading |
| `subtitle` | A line under the title |
| `body` | The paragraph. Basic HTML like `<strong>` works |
| `image` | A photo above the title, e.g. `"assets/img/rover.jpg"` |
| `tags` | The small boxes along the bottom: `["ROS 2", "Docker"]` |
| `list` | Instead of a body — `[{title: "...", meta: "..."}]`. Used by the certifications card |
| `stamp` | A dashed green stamp top-left. Used by the award cards |
| `footer` | A bottom bar: `{left: "NATIONAL FINALS", right: "✓"}` |
| `span` | Make the card wider: `2` means it takes two columns |
| `link` | A button: `{label: "Read paper", url: "https://..."}` |
| `steps` | A numbered workflow list: `[{n: "01.", color: "signal", label: "Design:", text: "..."}]` |
| `bodyClass` | Override the body styling, e.g. `"text-sm sm:text-base text-ink/90 leading-relaxed"` |

`body` can also be a **list of strings** instead of one string, which gives you
several paragraphs in the same card:

```js
body: [
  "First paragraph.",
  "Second paragraph."
],
```

### Show only the first few cards

A `cards` block can hide everything past the first N behind a button. The
hidden cards are still in the file — nothing is deleted:

```js
{
  type: "cards",
  columns: 3,
  showFirst: 3,
  moreLabel: "View All Projects",
  lessLabel: "Show Fewer",
  items: [ /* ...all of them... */ ]
}
```

Delete the `showFirst`, `moreLabel` and `lessLabel` lines to show them all at
once. That's what the Projects section uses.

### Uneven card widths

By default `columns: 2` makes two equal halves. For a wide card beside a narrow
one, use `widths` instead — the numbers are columns out of 12, so `[7, 5]` is
roughly 60/40:

```js
{
  type: "cards",
  widths: [7, 5],
  items: [ /* ...two cards... */ ]
}
```

Handy for pairing a wide explanatory card with a narrow list beside it.

### Sub-heading colour

A `heading` block's little square is amber by default. `color` accepts
`"signal"`, `"scope"`, `"ink"` or `"amber"`:

```js
{ type: "heading", color: "signal", label: "03 // WHAT I BUILD &amp; RESEARCH" },
```

---

## Previewing before you publish

Want to check a change before it goes live? Download the folder and double-click `index.html` — it opens straight in your browser, no server needed. (That's why the content files are `.js` and not `.json`.)

## If something goes wrong

Every change you make is a commit, and every commit can be undone:

1. Go to https://github.com/MikhaelSunil/mikhaelsunil.github.io/commits/master
2. Click the commit that broke it
3. Click **Revert**

The site goes back to how it was a minute later.
