# Images

Put your photos in this folder, then point to them from the content files.

**Portrait** — in `content/site.js`:
```js
photo: "assets/img/portrait.jpg",
```

**A photo on a project card** — in `content/sections.js`, add to that card:
```js
image: "assets/img/geoscout.jpg",
```

**A gallery** — in `content/sections.js`, inside a `gallery` block:
```js
{ src: "assets/img/swarm-test.jpg", caption: "Crazyflie swarm test rig" },
```

Keep files reasonably small (under ~500 KB each, ideally 1600px wide max) so the
page stays fast. JPG for photos, PNG for screenshots, SVG for diagrams.
