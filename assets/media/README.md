# Media

Photos, GIFs and result figures for the project pages. One folder per project,
e.g. `ncf/`.

Reference them from `content/projects.js` with a path written from the site
root, whichever page uses them:

```js
media: { src: "assets/media/ncf/real-flight.gif", alt: "..." },
```

**Keep them small.** These load on the page, not from a repo browser:

- Result plots and screenshots → **WebP**, quality ~90, max 1800px wide.
  A matplotlib figure usually drops from ~900 KB to ~180 KB with no visible
  loss, even on small axis text.
- Photos → JPEG.
- Animations → GIF, or better an MP4 if it is more than a few seconds.

To convert a plot:

```python
from PIL import Image
im = Image.open("plot.png").convert("RGB")
im.thumbnail((1800, 1800))
im.save("plot.webp", "WEBP", quality=90, method=6)
```
