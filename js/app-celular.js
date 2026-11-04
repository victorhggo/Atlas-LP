// O Atlas dentro do iPhone: gravações reais do app no celular (uma por tela, no tema da página).
// As abas de baixo trocam a gravação com uma fusão suave; o passo a passo também troca (efeitos.js chama window.atlasApp.ir).
// Só baixa quando o celular chega perto da tela, toca só a tela visível e, com movimento reduzido, fica no poster.
(() => {
  const app = document.querySelector("[data-app]");
  if (!app) return;
  const reduzir = matchMedia("(prefers-reduced-motion: reduce)");
  const tema = () => (document.documentElement.dataset.tema === "claro" ? "claro" : "escuro");
  const telas = new Map([...app.querySelectorAll(".app-tela")].map((t) => [t.dataset.tela, t]));
  let atual = app.querySelector(".app-tela.agora")?.dataset.tela ?? "lista";
  let perto = false;

  const video = (nome) => telas.get(nome)?.querySelector("video");
  function fontes(v) {
    const base = `video/app/${v.dataset.nome}-${tema()}`;
    if (v.dataset.base === base) return false;
    v.dataset.base = base;
    v.poster = `${base}.webp`;
    v.replaceChildren(
      Object.assign(document.createElement("source"), { src: `${base}.webm`, type: "video/webm" }),
      Object.assign(document.createElement("source"), { src: `${base}.mp4`, type: "video/mp4" }),
    );
    return true;
  }
  function mostrar(nome, doComeco) {
    const v = video(nome);
    if (!v || !perto) return;
    if (reduzir.matches) { v.poster = `video/app/${v.dataset.nome}-${tema()}.webp`; return; }
    if (fontes(v)) v.load();
    if (doComeco) { try { v.currentTime = 0; } catch {} }
    tocar(v);
  }
  // se o play falhar (vídeo ainda carregando), tenta de novo quando der para tocar
  function tocar(v) {
    v.play().catch(() => v.addEventListener("canplay", () => { if (perto && telas.get(atual)?.contains(v)) v.play().catch(() => {}); }, { once: true }));
  }
  function parar(nome) { video(nome)?.pause(); }

  function ir(nome) {
    if (nome === atual || !telas.has(nome)) return;
    const de = telas.get(atual), para = telas.get(nome);
    de?.classList.remove("agora");
    para.classList.add("agora");
    const antes = atual;
    atual = nome;
    mostrar(nome, true);
    setTimeout(() => { if (atual !== antes) parar(antes); }, 500);   // a anterior some na fusão e depois para
    for (const b of app.querySelectorAll("[data-ir]")) b.setAttribute("aria-pressed", String(b.dataset.ir === (nome === "lista" ? "crm" : nome)));
  }
  for (const b of app.querySelectorAll("[data-ir]")) b.addEventListener("click", () => ir(b.dataset.ir));

  // perto da tela: carrega e toca a gravação visível; longe: pausa tudo
  new IntersectionObserver(([it]) => {
    perto = it.isIntersecting;
    if (perto) {
      // os posters das outras telas também, para a troca nunca mostrar um quadro vazio
      for (const [n, t] of telas) { const v = t.querySelector("video"); if (!v.poster) v.poster = `video/app/${n}-${tema()}.webp`; }
      mostrar(atual);
    } else for (const n of telas.keys()) parar(n);
  }, { rootMargin: "60% 0px" }).observe(app);

  addEventListener("tema-mudou", () => {
    for (const [n, t] of telas) {
      const v = t.querySelector("video");
      if (!v.dataset.base) { if (v.poster) v.poster = `video/app/${n}-${tema()}.webp`; continue; }
      const tempo = v.currentTime, tocando = n === atual && perto && !reduzir.matches;
      fontes(v); v.load();
      v.addEventListener("loadedmetadata", () => { try { v.currentTime = tempo % (v.duration || 1); } catch {} if (tocando) tocar(v); }, { once: true });
    }
  });
  reduzir.addEventListener("change", () => { if (reduzir.matches) for (const n of telas.keys()) parar(n); else mostrar(atual); });

  window.atlasApp = { ir, get atual() { return atual; } };
})();
