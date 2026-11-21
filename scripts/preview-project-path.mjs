import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const prefix = '/beichen-star/';
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp' };
createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  if (!pathname.startsWith(prefix)) { response.writeHead(404).end(); return; }
  const file = path.resolve(root, pathname.slice(prefix.length) || 'index.html');
  if (!file.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
  try { response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }).end(await readFile(file)); }
  catch { response.writeHead(404).end(); }
}).listen(4174, '127.0.0.1', () => console.log('Project path preview: http://127.0.0.1:4174/beichen-star/'));
