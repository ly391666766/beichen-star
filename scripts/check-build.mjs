import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const html = await readFile(path.join(root, 'index.html'), 'utf8');
await access(path.join(root, '.nojekyll'));
let checked = 0;
async function checkUrl(ref, file) {
  if (/^(data:|https?:|#)/.test(ref)) return;
  assert(!ref.startsWith('/'), `Root-relative asset: ${ref}`);
  for (const prefix of ['/', '/beichen-star/']) {
    const documentUrl = `https://example.github.io${prefix}${file}`;
    const resolved = new URL(ref, documentUrl);
    assert(resolved.pathname.startsWith(prefix), `Asset escapes project path: ${ref}`);
    const relative = decodeURIComponent(resolved.pathname.slice(prefix.length));
    await access(path.join(root, relative));
  }
  checked++;
}
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) await checkUrl(match[1], 'index.html');
for (const filename of await readdir(path.join(root, 'assets'))) {
  const content = await readFile(path.join(root, 'assets', filename), 'utf8');
  if (filename.endsWith('.css')) {
    for (const match of content.matchAll(/url\(["']?([^"')]+)["']?\)/g)) await checkUrl(match[1], `assets/${filename}`);
  }
}
for (let index = 1; index <= 12; index++) await access(path.join(root, 'images', `mentor-${String(index).padStart(2, '0')}.png`));
const app = await readFile('src/App.tsx', 'utf8');
assert(app.includes('siteConfig.apiBaseUrl'));
assert(app.includes('siteConfig.adminUrl'));
assert(!app.includes('fetch("/api/'));
console.log(`Passed: ${checked} asset references at root and project paths; 12 portraits; external reservation and admin endpoints.`);
