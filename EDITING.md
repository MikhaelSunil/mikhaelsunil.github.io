# How to edit this site

Your site lives at **https://mikhaelsunil.github.io**

You only ever need to touch **two files**:

| File | What's in it |
|---|---|
| `content/site.js` | Your name, intro paragraph, portrait photo, social links, contact settings, and the CV pop-up |
| `content/sections.js` | Every section of the page — Projects, Experience, Tech Stack, Education, Research, Contact |
| `content/projects.js` | Every project: the cards, and the write-ups behind them |

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

> **If your change doesn't show up:** browsers cache CSS and JavaScript hard.
> Open `index.html` and find the six `?v=2` version stamps near the bottom
> (and one on the stylesheet in the `<head>`). Bump every one of them to
> `?v=3`, then `?v=4` next time, and commit. That tells every visitor's
> browser to fetch the new files immediately instead of waiting for its
> cache to expire. You only need this after editing files in `content/` or
> `assets/` — not for a text change you can already see.

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

Projects live in their own file now: **`content/projects.js`**. That one list
feeds three places:

- the **three featured cards** on the home page (the ones marked `featured: true`)
- the **showcase page** at `/projects/`, which lists all of them
- a **detail page** at `/projects/<slug>/`, for any project that has a `detail` block

Copy a project block, paste it where you want it in the order, and edit the text.

**To feature it on the home page**, add `featured: true`. Keep that to three —
more and the row stops being a row.

**To give it a picture on the card**, add:
```js
media: { src: "assets/media/my-project/hero.gif", alt: "what it shows" },
```
Image paths are always written from the site root like that, wherever they are
used. The page works out the rest.

**To give it a full write-up page:**

1. Fill in the `detail` block. The available block types are listed in a
   comment at the top of `content/projects.js` — prose, steps, figure,
   figures, table, callout, tags.
2. Copy the folder `projects/_template/` to `projects/<your-slug>/`.
3. Open the new `index.html` and change the one line near the bottom that
   says `renderDetail('your-slug', ...)` to your slug. Update the `<title>` and
   `<meta name="description">` at the top too.

A project **without** a `detail` block simply isn't clickable, which is the
right behaviour — no dead links.

### Hiding a project

Add `archived: true` to it in `content/projects.js`:

```js
{ slug: "something", archived: true, ... }
```

It drops off the home page, off the showcase, and out of the "other projects"
row, and its detail page stops serving the write-up. Remove the line to bring
it back.

> **This hides a project; it does not keep it confidential.** `content/projects.js`
> and everything in `assets/media/` are published with the site and can be
> downloaded by anyone who knows the path, archived or not. If something must
> stay private — unpublished research, anything under embargo — take it out of
> the repository rather than flagging it.

### The limitations callout

Research projects usually need caveats stated rather than buried. That is what
`callout` is for:

```js
{ type: "callout", tone: "warn", heading: "What these numbers do not show",
  body: ["..."], items: ["caveat", "caveat"] },
```
`tone: "warn"` gives an orange edge, `tone: "info"` a green one.

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

Used by `cards` blocks (not by Projects, which links to its own showcase page).
It hides everything past the first N behind a button; the hidden cards are
still in the file:

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

Delete the `showFirst`, `moreLabel` and `lessLabel` lines to show them all at once.

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

## Clips (.mp4) in figures

Any figure whose `src` ends in `.mp4` or `.webm` renders as a silent,
looping clip instead of an image. It only plays while it is on screen.

```js
{ type: "figure", src: "assets/media/swarm/p1-hw.mp4",
  poster: "assets/media/swarm/card-poster.webp",   // optional still
  alt: "...", caption: "..." }
```

The same holds for a card's `media.src`, so a project card can lead with a
clip. Give a `poster` there — it is what shows before the clip starts.

Animated GIFs are 5–10× larger than the same clip as MP4. Convert them:

```bash
ffmpeg -i in.gif -movflags +faststart -pix_fmt yuv420p -an \
  -vf "scale='min(1280,iw)':-2:flags=lanczos" -c:v libx264 -crf 26 out.mp4
```

## The photo band behind the hero

`heroSlideshow` in `content/site.js` drives it. Drop a picture in
`assets/img/hero/` and add a line:

```js
{ src: "assets/img/hero/new-thing.webp" }
```

`intervalMs` sets how long each photograph is held before the next fades in.
Pictures are shown whole at the band's height and pinned to the right, so
nothing is cropped — no need to pick a focal point.

The pictures sit at 50% opacity under a scrim, in both light and dark mode,
and the band is masked away at the bottom so it dissolves into the paper
rather than ending on a line. To turn the whole thing off, delete the
`images` list (or set it to `[]`).

Convert photos before adding them — a phone JPEG is several megabytes:

```bash
python3 -c "
from PIL import Image, ImageOps
im = ImageOps.exif_transpose(Image.open('IN.jpg')).convert('RGB')
if im.width > 1600: im = im.resize((1600, round(im.height*1600/im.width)))
im.save('assets/img/hero/OUT.webp','WEBP',quality=80,method=6)"
```
