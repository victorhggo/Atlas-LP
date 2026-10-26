// Servidor dos arquivos estáticos de out/ para hospedagens Node.js (Hostinger).
// O site é exportado como estático, e o "next start" não funciona com output: "export".
import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const RAIZ = join(process.cwd(), "out");
const TIPOS = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".txt": "text/plain; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".svg": "image/svg+xml", ".ico": "image/x-icon", ".mp4": "video/mp4", ".webm": "video/webm", ".woff2": "font/woff2", ".xml": "application/xml",
};

function arquivo(caminho) {
  const limpo = normalize(decodeURIComponent(caminho.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  for (const c of [limpo, `${limpo}.html`, join(limpo, "index.html")]) {
    const f = join(RAIZ, c);
    if (!f.startsWith(RAIZ)) return null;
    try { if (statSync(f).isFile()) return f; } catch { /* tenta o próximo */ }
  }
  return null;
}

createServer((req, res) => {
  const f = arquivo(req.url ?? "/") ?? join(RAIZ, "404.html");
  const status = f.endsWith("404.html") && !req.url?.startsWith("/404") ? 404 : 200;
  const longo = f.includes(`${join(RAIZ, "_next")}`) || f.includes(join(RAIZ, "_img"));
  res.writeHead(status, {
    "content-type": TIPOS[extname(f)] ?? "application/octet-stream",
    "cache-control": longo ? "public, max-age=31536000, immutable" : "public, max-age=300",
  });
  createReadStream(f).pipe(res);
}).listen(Number(process.env.PORT) || 3000, () => console.log("LP no ar na porta", process.env.PORT || 3000));
