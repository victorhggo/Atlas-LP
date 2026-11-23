// Confere o Pixel da Meta nas 5 páginas e o comportamento do js/origem.js.
// Uso: node ferramentas/conferir-pixel.mjs
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const paginas = ["index.html", "atlaslike/index.html", "comparar/apollo/index.html", "comparar/econodata/index.html", "comparar/speedio/index.html"];
let falhas = 0;
const ok = (c, msg) => { if (!c) { falhas++; console.error("FALHA: " + msg); } else console.log("ok: " + msg); };

for (const p of paginas) {
  const h = readFileSync(join(raiz, p), "utf8");
  const blocos = [...h.matchAll(/<script type="text\/plain" data-consentimento="medicao">([\s\S]*?)<\/script>/g)];
  const comPixel = blocos.filter((b) => b[1].includes("fbq('init','1810036790207944')") && b[1].includes("fbq('track','PageView')") && b[1].includes("connect.facebook.net/en_US/fbevents.js"));
  ok(comPixel.length === 1, `${p}: um bloco do Pixel com consentimento de medição`);
  const bl = comPixel[0] ? comPixel[0][1] : "";
  ok(/fbq\('set','autoConfig',false,'1810036790207944'\)/.test(bl) && bl.indexOf("autoConfig") < bl.indexOf("fbq('init'"), `${p}: autoConfig desligado antes do init`);
  ok(/fbq\.disablePushState\s*=\s*true/.test(bl) && bl.indexOf("disablePushState") < bl.indexOf("fbq('init'"), `${p}: disablePushState ligado antes do init`);
  const fora = h.replace(/<script type="text\/plain" data-consentimento="medicao">[\s\S]*?<\/script>/g, "").replace(/<!--[\s\S]*?-->/g, "");
  ok(!/fbq\s*\(|fbevents|connect\.facebook\.net/.test(fora), `${p}: nenhum fbq/fbevents fora do bloco`);
  ok(/<script src="\/?js\/origem\.js(\?[^"]*)?" defer><\/script>/.test(h), `${p}: carrega js/origem.js`);
}

// ---- js/origem.js ----
const codigo = readFileSync(join(raiz, "js/origem.js"), "utf8");
function rodar(url, { cookies = {}, ls = null } = {}) {
  const u = new URL(url);
  const jar = { ...cookies };
  const ouvintes = {};
  const document = {
    get cookie() { return Object.entries(jar).map(([k, v]) => k + "=" + v).join("; "); },
    set cookie(s) { const [par] = s.split(";"); const i = par.indexOf("="); jar[par.slice(0, i)] = par.slice(i + 1); jar.__ultimo = s; },
    addEventListener: (n, f) => { ouvintes[n] = f; },
  };
  const localStorage = { getItem: () => ls };
  vm.runInNewContext(codigo, { document, location: u, localStorage, URLSearchParams, Date, JSON, encodeURIComponent, decodeURIComponent, String, Object });
  return { jar, ouvintes, ler: () => (jar["atlas-origem"] ? JSON.parse(decodeURIComponent(jar["atlas-origem"])) : null) };
}
const lp = "https://lp.atlaslike.com/";
let r = rodar(lp + "?utm_source=meta&utm_medium=cpc&utm_campaign=c1&utm_content=a1&utm_term=t1&adset_id=99&fbclid=ABC");
let o = r.ler();
ok(o && o.us === "meta" && o.um === "cpc" && o.uc === "c1" && o.ut === "a1" && o.uk === "t1" && o.as === "99", "grava utm_* e adset_id nos campos us/um/uc/ut/uk/as");
ok(o && o.fc === undefined, "sem consentimento: fbclid não é gravado");
ok(o && o.lp === "lp.atlaslike.com/" && !isNaN(Date.parse(o.em)), "grava lp e em");
ok(/domain=\.atlaslike\.com/.test(r.jar.__ultimo) && /max-age=7776000/.test(r.jar.__ultimo) && /secure/.test(r.jar.__ultimo) && /samesite=lax/.test(r.jar.__ultimo), "cookie em .atlaslike.com, 90 dias, secure, samesite=lax");
r.ouvintes["atlas:consentimento"]({ detail: { medicao: true } });
r.jar["atlas-cookies"] = "todos"; // o site.js grava o cookie antes de avisar; aqui simulamos e reenviamos o evento
r.ouvintes["atlas:consentimento"]({ detail: { medicao: true } });
ok(r.ler().fc === "ABC", "depois do aceite, regrava com o fbclid");
r = rodar(lp + "?fbclid=XYZ&utm_source=meta", { cookies: { "atlas-cookies": "todos" } });
ok(r.ler().fc === "XYZ", "consentimento todos (cookie): grava fbclid");
r = rodar(lp, { cookies: { "atlas-cookies": "todos" } });
ok(r.ler() === null, "visita sem parâmetro de anúncio e sem cookie: não grava nada");
const antigo = encodeURIComponent(JSON.stringify({ us: "google", lp: "lp.atlaslike.com/", em: "2026-01-01T00:00:00.000Z" }));
r = rodar(lp + "comparar/apollo/", { cookies: { "atlas-origem": antigo } });
ok(r.ler().us === "google", "visita sem parâmetro mantém o primeiro toque");
r = rodar(lp + "?utm_source=meta", { cookies: { "atlas-origem": antigo } });
ok(r.ler().us === "meta", "URL nova com parâmetro de anúncio troca a origem");
r = rodar(lp + "?fbclid=Q", { ls: JSON.stringify({ v: 1, medicao: true, em: "x" }) });
ok(r.ler().fc === "Q", "consentimento só no localStorage (medicao true) também vale");
r = rodar("http://localhost:5500/?utm_source=x");
ok(!/domain=/.test(r.jar.__ultimo) && !/secure/.test(r.jar.__ultimo), "localhost: sem domain e sem secure");

r = rodar(lp + "?fbclid=ZZZ", { cookies: { "atlas-origem": antigo } });
ok(r.ler().us === "google" && r.ler().fc === undefined, "so fbclid sem consentimento nao apaga a origem anterior");
r = rodar("https://evilatlaslike.com/?utm_source=x");
ok(!/domain=/.test(r.jar.__ultimo), "host parecido com atlaslike.com nao recebe domain");
r = rodar("https://atlaslike.com/?utm_source=x");
ok(/domain=\.atlaslike\.com/.test(r.jar.__ultimo), "dominio raiz atlaslike.com recebe domain=.atlaslike.com");
{
  let lancou = false;
  const doc = { get cookie() { throw new Error("SecurityError"); }, set cookie(v) { throw new Error("SecurityError"); }, addEventListener() {} };
  try { vm.runInNewContext(codigo, { document: doc, location: new URL(lp + "?utm_source=x"), localStorage: { getItem() { throw new Error("x"); } }, URLSearchParams, Date, JSON, encodeURIComponent, decodeURIComponent, String, Object }); } catch { lancou = true; }
  ok(!lancou, "document.cookie que lanca erro nao derruba o origem.js");
}
const sj = readFileSync(join(raiz, "js/site.js"), "utf8");
ok(/gravarCookieEscolha\(!!v\.medicao\)/.test(sj), "site.js: escolha antiga do localStorage vira cookie compartilhado");

console.log(falhas ? `\n${falhas} falha(s)` : "\ntudo certo");
process.exit(falhas ? 1 : 0);
