// Telas do sistema em vídeo leve (comportamento de GIF): carregam perto da tela, tocam em loop sem som,
// pausam fora dela e trocam junto com o tema. Com movimento reduzido, fica só o poster.
const reduzir = matchMedia("(prefers-reduced-motion: reduce)");
const tema = () => (document.documentElement.dataset.tema === "claro" ? "claro" : "escuro");
const videos = [];

for (const fig of document.querySelectorAll("figure.tela[data-video]")) {
  const moldura = fig.querySelector(".tela-moldura");
  const v = document.createElement("video");
  v.muted = true; v.loop = true; v.playsInline = true; v.preload = "none";
  v.setAttribute("muted", ""); v.setAttribute("playsinline", ""); v.setAttribute("aria-hidden", "true");
  v.dataset.nome = fig.dataset.video;
  // só o do topo nasce com poster; os outros ganham quando chegam perto da tela
  if (fig.dataset.video === "painel-topo") { v.poster = `video/${v.dataset.nome}-${tema()}.webp`; v.setAttribute("fetchpriority", "high"); }
  moldura.append(v);
  videos.push(v);
}

function fontes(v) {
  const base = `video/${v.dataset.nome}-${tema()}`;
  if (v.dataset.base === base) return false;
  v.dataset.base = base;
  v.poster = `${base}.webp`;
  v.replaceChildren(
    Object.assign(document.createElement("source"), { src: `${base}.webm`, type: "video/webm" }),
    Object.assign(document.createElement("source"), { src: `${base}.mp4`, type: "video/mp4" }),
  );
  return true;
}
function tocar(v) {
  if (reduzir.matches) { v.poster = `video/${v.dataset.nome}-${tema()}.webp`; return; }
  if (fontes(v)) v.load();
  v.play().catch(() => {});
}

const perto = new IntersectionObserver((itens) => {
  for (const it of itens) {
    const v = it.target;
    v.dataset.perto = it.isIntersecting ? "1" : "";
    if (it.isIntersecting) tocar(v); else v.pause();
  }
}, { rootMargin: "100% 0px" });
// o quadro horizontal anda por transform: a coluna conta como "perto" pelo eixo x também
const pertoX = new IntersectionObserver((itens) => {
  for (const it of itens) if (!it.isIntersecting) it.target.pause(); else if (it.target.dataset.perto) tocar(it.target);
}, { rootMargin: "0px 50% 0px 50%" });
for (const v of videos) { perto.observe(v); pertoX.observe(v); }

addEventListener("tema-mudou", () => {
  for (const v of videos) {
    if (reduzir.matches || !v.dataset.base) { if (v.poster) v.poster = `video/${v.dataset.nome}-${tema()}.webp`; continue; }
    const t = v.currentTime, tocando = !v.paused;
    fontes(v); v.load();
    v.addEventListener("loadedmetadata", () => { try { v.currentTime = t % (v.duration || 1); } catch {} if (tocando) v.play().catch(() => {}); }, { once: true });
  }
});
reduzir.addEventListener("change", () => { if (reduzir.matches) for (const v of videos) v.pause(); });
