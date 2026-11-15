// Atlas: comportamento das seções 2 a 8 (fase B).
// Carregado pelo site.js depois do primeiro desenho. Tudo que é pesado espera a
// seção chegar perto; tudo que se mexe para fora da tela e com a aba oculta.

const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const ver = (el, fn, op = {}) => {
  const io = new IntersectionObserver((es) => es.forEach((e) => fn(e, io)), op);
  io.observe(el);
  return io;
};
const fmt = (n, casas) => n.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });

/* ---------- 2. player "Como o Atlas funciona" (0 bytes até o clique) ---------- */
const player = $("[data-player]");
if (player) {
  const v = $("video", player);
  const botao = $("[data-play]", player);
  const chips = $$(".etapas button");
  const marcas = chips.map((b) => Number(b.dataset.t));
  let carregado = false;

  const carregar = () => {
    if (carregado) return;
    carregado = true;
    const pequeno = matchMedia("(max-width: 760px)").matches || (navigator.connection && navigator.connection.saveData);
    const fontes = pequeno
      ? [[v.dataset.mp4P, "video/mp4"]]
      : [[v.dataset.webm, "video/webm"], [v.dataset.mp4, "video/mp4"]];
    for (const [src, type] of fontes) {
      const s = document.createElement("source");
      s.src = src; s.type = type;
      v.append(s);
    }
    v.load();
  };
  const tocar = (t) => {
    carregar();
    v.controls = true;
    player.classList.add("tocando");
    if (typeof t === "number") {
      if (v.readyState >= 1) v.currentTime = t;
      else v.addEventListener("loadedmetadata", () => { v.currentTime = t; }, { once: true });
    }
    v.play().catch(() => {});
    v.focus({ preventScroll: true });
  };
  botao.addEventListener("click", () => tocar());
  chips.forEach((b) => b.addEventListener("click", () => tocar(Number(b.dataset.t))));

  v.addEventListener("timeupdate", () => {
    const t = v.currentTime;
    chips.forEach((b, i) => {
      const ini = marcas[i], fim = marcas[i + 1] ?? (v.duration || 98.6);
      const agora = t >= ini && t < fim;
      b.classList.toggle("agora", agora);
      b.classList.toggle("visto", t >= fim);
      b.style.setProperty("--p", agora ? ((t - ini) / (fim - ini)).toFixed(3) : t >= fim ? "0" : "0");
      if (agora) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
    });
  });
  v.addEventListener("ended", () => {
    v.controls = false;
    player.classList.remove("tocando");
    chips.forEach((b) => { b.classList.remove("agora"); b.style.removeProperty("--p"); b.removeAttribute("aria-current"); });
    botao.focus({ preventScroll: true });
  });
  // pausa se sair da tela
  ver(player, (e) => { if (!e.isIntersecting && !v.paused) v.pause(); });
  // o pulso do botão roda 3 vezes, uma vez só, quando o player aparece
  if (!RM) ver(player, (e, io) => { if (e.isIntersecting) { player.classList.add("pulsar"); io.disconnect(); } }, { threshold: 0.6 });
}

/* ---------- 3. áreas: a tela recortada acompanha a área ---------- */
const lista = $("[data-areas]");
const palco = $("[data-areas-palco]");
if (lista && palco) {
  const areas = $$(".area", lista);
  const telas = new Map($$("picture[data-tela]", palco).map((p) => [p.dataset.tela, p]));
  let atual = null;
  const ativar = (li) => {
    if (!li || li === atual) return;
    atual?.classList.remove("ativa");
    li.classList.add("ativa");
    atual = li;
    telas.forEach((p, k) => p.classList.toggle("ativa", k === li.dataset.area));
  };
  ativar(areas[0]);
  const largo = matchMedia("(min-width: 901px)");
  areas.forEach((li) => li.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") ativar(li); }));
  // ao rolar, a área que passa pela faixa do meio da tela fica ativa
  const io = new IntersectionObserver((es) => {
    if (!largo.matches) return;
    es.forEach((e) => { if (e.isIntersecting) ativar(e.target); });
  }, { rootMargin: "-45% 0px -45% 0px" });
  areas.forEach((li) => io.observe(li));
}

/* ---------- 4. jornada: palco fixo, arco e uma pergunta por vez ---------- */
const jornada = $("[data-jornada]");
if (jornada && !RM) {
  jornada.classList.add("palco-ativo");
  jornada.dataset.passo = "0";
  let raf = 0, perto = false;
  const medir = () => {
    raf = 0;
    const r = jornada.getBoundingClientRect();
    const vh = innerHeight;
    const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)));
    const passo = p < 0.24 ? 0 : p < 0.5 ? 1 : p < 0.74 ? 2 : 3;
    if (jornada.dataset.passo !== String(passo)) {
      jornada.dataset.passo = String(passo);
      jornada.style.setProperty("--passo", passo);
    }
  };
  const pedir = () => { if (perto && !raf) raf = requestAnimationFrame(medir); };
  ver(jornada, (e) => { perto = e.isIntersecting; if (perto) pedir(); }, { rootMargin: "100px 0px" });
  addEventListener("scroll", pedir, { passive: true });
  addEventListener("resize", pedir, { passive: true });
}

/* ---------- 5. lampejos: monta a 600px, toca só visível ---------- */
const trilho = $("[data-lampejos]");
if (trilho) {
  const figs = $$(".lampejo", trilho);
  if (!RM) trilho.classList.add("anima");
  figs.forEach((fig) => {
    const v = $("video", fig);
    const base = v.dataset.src;
    if (RM) return; // movimento reduzido: só o pôster
    ver(fig, (e, io) => {
      if (!e.isIntersecting) return;
      for (const [ext, type] of [["webm", "video/webm"], ["mp4", "video/mp4"]]) {
        const s = document.createElement("source");
        s.src = `${base}.${ext}`; s.type = type;
        v.append(s);
      }
      v.load();
      io.disconnect();
    }, { rootMargin: "600px 0px" });
    ver(fig, (e) => {
      if (e.isIntersecting) {
        fig.classList.add("visto");
        if (!document.hidden && !pausadoAgora()) v.play().catch(() => {});
      } else v.pause();
    }, { threshold: 0.35 });
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) figs.forEach((f) => $("video", f).pause());
  });
  // "Pausar os vídeos" usa o mesmo estado do botão de pausa do hero (WCAG 2.2.2)
  const bPausa = $("[data-pausa-videos]");
  const heroPausa = $("[data-pausa]");
  bPausa?.addEventListener("click", () => {
    if (heroPausa) heroPausa.click();
    else document.dispatchEvent(new CustomEvent("atlas:pausa", { detail: bPausa.getAttribute("aria-pressed") !== "true" }));
  });
  document.addEventListener("atlas:pausa", (e) => {
    bPausa?.setAttribute("aria-pressed", String(e.detail));
    if (bPausa) bPausa.textContent = e.detail ? "Retomar os vídeos" : "Pausar os vídeos";
    figs.forEach((f) => {
      const v = $("video", f);
      if (e.detail) v.pause(); else if (f.classList.contains("visto") && !document.hidden) v.play().catch(() => {});
    });
  });
}
const pausadoAgora = () => document.documentElement.classList.contains("mov-pausado");

/* ---------- 6. AtlasLike: o mapa se desenha ao entrar; cometas param fora da tela ---------- */
const mapa = $("[data-mapa]");
if (mapa) {
  const svg = $("svg", mapa);
  if (!RM) mapa.classList.add("anima");
  if (RM && svg.pauseAnimations) svg.pauseAnimations();
  ver(mapa, (e) => {
    if (e.isIntersecting) mapa.classList.add("visto");
    if (RM || !svg.pauseAnimations) return;
    if (e.isIntersecting && !document.hidden && !pausadoAgora()) svg.unpauseAnimations(); else svg.pauseAnimations();
  }, { threshold: 0.2 });
  document.addEventListener("atlas:pausa", (e) => { if (!RM && svg.pauseAnimations) e.detail ? svg.pauseAnimations() : svg.unpauseAnimations(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden && svg.pauseAnimations) svg.pauseAnimations(); });
}

/* ---------- 7. números: contam uma vez ao entrar (o valor final já está no HTML) ---------- */
const numeros = $("[data-numeros]");
if (numeros && !RM) {
  const alvos = $$("[data-contar]", numeros);
  ver(numeros, (e, io) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    const t0 = performance.now(), dur = 1200;
    const passo = (t) => {
      const k = Math.min(1, (t - t0) / dur), ease = 1 - Math.pow(1 - k, 3);
      alvos.forEach((el) => {
        const fim = Number(el.dataset.contar), casas = Number(el.dataset.casas || 0);
        el.textContent = fmt(fim * ease, casas);
      });
      if (k < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  }, { threshold: 0.4 });
}

/* ---------- 8. órbita das tecnologias: para fora da tela ---------- */
const orbita = $("[data-orbita]");
if (orbita) {
  orbita.classList.add("fora");
  ver(orbita, (e) => orbita.classList.toggle("fora", !e.isIntersecting || document.hidden));
}

/* ---------- página AtlasLike: árvore com realce (linhas ortogonais medidas) ---------- */
const arvore = $("[data-arvore]");
if (arvore) {
  const svg = $(".arvore-svg", arvore);
  const hub = $(".arvore-hub", arvore);
  const nos = $$(".arvore-no", arvore);
  let ativo = null;
  const realcar = (i) => {
    ativo = i;
    arvore.classList.toggle("focado", i != null);
    nos.forEach((n, k) => n.classList.toggle("on", k === i));
    $$("path", svg).forEach((p, k) => p.classList.toggle("on", k === i));
  };
  const desenhar = () => {
    if (getComputedStyle(svg).display === "none") return;
    const b = arvore.getBoundingClientRect();
    const h = hub.getBoundingClientRect();
    const v = h.right - b.left, y0 = h.top + h.height / 2 - b.top;
    const caixas = nos.map((n) => n.getBoundingClientRect());
    const esquerda = Math.min(...caixas.map((r) => r.left)) - b.left;
    const f = v + (esquerda - v) * 0.5;
    svg.setAttribute("viewBox", `0 0 ${b.width.toFixed(1)} ${b.height.toFixed(1)}`);
    svg.innerHTML = caixas.map((r) => {
      const y = r.top + r.height / 2 - b.top, x1 = r.left - b.left, d = y - y0;
      if (Math.abs(d) < 1) return `<path d="M${v},${y0} H${x1}"/>`;
      const s = Math.sign(d), q = Math.min(12, Math.abs(d) / 2);
      return `<path d="M${v},${y0} H${f - q} Q${f},${y0} ${f},${y0 + s * q} V${y - s * q} Q${f},${y} ${f + q},${y} H${x1}"/>`;
    }).join("");
    if (ativo != null) realcar(ativo);
  };
  nos.forEach((n, i) => {
    n.addEventListener("pointerenter", () => realcar(i));
    n.addEventListener("pointerleave", () => realcar(null));
  });
  new ResizeObserver(desenhar).observe(arvore);
}

/* ---------- página AtlasLike: linha do tempo (o traço enche com CSS; aqui só as bolinhas) ---------- */
const linha = $("[data-linha]");
if (linha) {
  const etapas = $$(".etapa", linha);
  const trilho = $(".linha-trilho i", linha);
  const nativo = CSS.supports("animation-timeline: view()") && !RM;
  const pintar = () => {
    const corte = innerHeight * 0.6;
    let vivas = 0;
    etapas.forEach((e) => {
      const viva = RM || e.getBoundingClientRect().top < corte;
      e.classList.toggle("viva", viva);
      if (viva) vivas++;
    });
    if (!nativo && trilho) trilho.style.transform = `scaleY(${RM ? 1 : vivas / etapas.length})`;
  };
  let pendente = false;
  const aoRolar = () => {
    if (pendente) return;
    pendente = true;
    requestAnimationFrame(() => { pendente = false; pintar(); });
  };
  let ouvindo = false;
  ver(linha, (e) => {
    if (e.isIntersecting && !ouvindo) { addEventListener("scroll", aoRolar, { passive: true }); ouvindo = true; }
    else if (!e.isIntersecting && ouvindo) { removeEventListener("scroll", aoRolar); ouvindo = false; }
    pintar();
  }, { rootMargin: "20% 0px" });
  if (!nativo && trilho) trilho.style.transition = "transform 420ms cubic-bezier(.22,1,.36,1)";
  pintar();
}
