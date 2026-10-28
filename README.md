# bundledDev: imported image stays stale after it is replaced on disk

With `experimental.bundledDev: true`, overwriting an image that is imported from JS
(`import url from './img.png'`) is never picked up by the dev server. The bundle keeps the old
hashed URL and the in-memory asset keeps the old bytes, so even a full page reload shows the old
image. Only restarting the dev server helps.

Vite 8.3.5. Works correctly without `bundledDev`.

## Steps

```sh
npm install
npm run dev          # open the page: all four images are red
npm run swap         # overwrites every image in place (same file name) with a blue version
```

Reload the page.

| How the image is referenced                       | Expected | Actual                                   |
| ------------------------------------------------- | -------- | ---------------------------------------- |
| `import url from './img-import.png'`              | blue     | **red**: same `/assets/img-import-<hash>.png` URL, old content |
| `new URL('./img-new-url.png', import.meta.url)`   | blue     | blue                                     |
| CSS `background-image: url('./img-css.png')`      | blue     | blue                                     |
| `public/img-public.png`                           | blue     | blue                                     |

Also observed:

- Replacing only `src/img-import.png` triggers no rebuild at all.
- Editing `src/main.js` afterwards rebuilds and reloads the page, but the image URL and content stay old.
- Restarting the dev server serves the new image.

Images are larger than `build.assetsInlineLimit` (4 KB), so they are emitted as files, not inlined.
