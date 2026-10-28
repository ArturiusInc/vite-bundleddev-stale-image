// Overwrites every test image in place (same file name) with its other-color version.
import { readFileSync, writeFileSync } from 'node:fs'

const targets = {
  import: '../src/img-import.png',
  'new-url': '../src/img-new-url.png',
  css: '../src/img-css.png',
  public: '../public/img-public.png',
}

const read = (p) => readFileSync(new URL(p, import.meta.url))
const color = read(targets.import).equals(read('../fixtures/import-red.png')) ? 'blue' : 'red'

for (const [name, target] of Object.entries(targets)) {
  writeFileSync(new URL(target, import.meta.url), read(`../fixtures/${name}-${color}.png`))
}

console.log(`images are now ${color}`)
