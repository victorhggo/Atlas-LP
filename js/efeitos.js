// Efeitos da LP v2: rolagem suave (Lenis), abertura, títulos palavra por palavra, moldura que se endireita,
// painel de números que cresce e conta, passo a passo preso na tela com o celular girando, parallax das telas,
// painel noturno que abre, bento que chega de longe, luz que segue o cursor, menu que some e volta e rodapé que sobe.
// Com movimento reduzido (ou sem as bibliotecas), nada se mexe e tudo fica visível.
(() => {
  const html = document.documentElement;
  const reduzir = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktop = matchMedia("(min-width: 1024px)");
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // ---------- coisas que valem mesmo sem animação ----------
  const flutuante = $(".flutuante"), topo = $("#topo"), menu = $("[data-menu]");
  function aoRolar(y) {
    menu?.classList.toggle("rolou", y > 12);
    if (flutuante && topo) flutuante.classList.toggle("visivel", y > topo.offsetHeight * 0.7 && innerHeight + y < document.body.scrollHeight - 200);
  }
  addEventListener("scroll", () => aoRolar(scrollY), { passive: true });
  aoRolar(scrollY);

  const g = window.gsap, ST = window.ScrollTrigger;
  if (reduzir || !g || !ST) { html.classList.remove("com-abertura"); return; }
  g.registerPlugin(ST);
  html.classList.add("efeitos");

  // ---------- rolagem suave ----------
  let lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95 });
    lenis.on("scroll", (e) => { ST.update(); aoRolar(e.scroll); });
    g.ticker.add((t) => lenis.raf(t * 1000));
    g.ticker.lagSmoothing(0);
    for (const a of $$('a[href^="#"]')) a.addEventListener("click", (e) => {
      const alvo = $(a.getAttribute("href"));
      if (!alvo || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      lenis.scrollTo(alvo, { offset: -96, duration: 1.4 });
      history.replaceState(null, "", a.hash);
    });
  }

  // ---------- títulos: as palavras sobem de dentro de uma máscara ----------
  function dividir(el) {
    const palavras = [];
    const andar = (no) => {
      for (const f of [...no.childNodes]) {
        if (f.nodeType === 3) {
          const frag = document.createDocumentFragment();
          for (const parte of f.textContent.split(/(\s+)/)) {
            if (!parte) continue;
            if (/^\s+$/.test(parte)) { frag.append(parte); continue; }
            const m = document.createElement("span"); m.className = "mascara";
            const w = document.createElement("span"); w.className = "palavra-sobe"; w.textContent = parte;
            m.append(w); frag.append(m); palavras.push(w);
          }
          f.replaceWith(frag);
        } else if (f.nodeType === 1) andar(f);
      }
    };
    andar(el);
    return palavras;
  }

  // ---------- abertura + entrada do topo ----------
  const h1 = $("#topo h1"), palavrasH1 = dividir(h1);
  const entrada = g.timeline({ paused: true, defaults: { ease: "power4.out" } })
    .from(palavrasH1, { yPercent: 115, rotate: 5, duration: 1.1, stagger: 0.035 })
    .from(["#topo .topo-sub", "#topo .topo-acoes"], { y: 26, opacity: 0, duration: 0.9, stagger: 0.12 }, "-=0.75")
    .from(".topo-palco", { y: 90, opacity: 0, duration: 1.3 }, "-=0.7")
    .from(".topo-chip", { y: 24, opacity: 0, scale: 0.9, duration: 0.8, stagger: 0.12 }, "-=0.6")
    .from(".conecta", { opacity: 0, y: 16, duration: 0.8 }, "-=0.5");
  const abertura = $(".abertura");
  if (html.classList.contains("com-abertura") && abertura) {
    lenis?.stop();
    const fim = () => { html.classList.remove("com-abertura"); lenis?.start(); };
    const tl = g.timeline({ onComplete: fim })
      .fromTo(".abertura-logo", { scale: 0.6, opacity: 0, filter: "blur(10px)" }, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" })
      .to(".abertura-logo", { scale: 1.08, duration: 0.5, ease: "sine.inOut" })
      .to(".abertura-logo", { opacity: 0, scale: 0.9, duration: 0.35, ease: "power2.in" })
      .to(abertura, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "power4.inOut" }, "-=0.1")
      .add(() => entrada.play(), "-=0.55");
    // trava de segurança: nunca fica presa
    setTimeout(() => { if (tl.progress() < 1) { tl.progress(1); entrada.progress(1); } }, 5000);
  } else entrada.play();

  // o resto (abaixo da dobra) é montado em pedaços curtos, cedendo a vez ao navegador entre eles
  const pausa = () => new Promise((r) => (window.scheduler?.yield ? scheduler.yield().then(r) : setTimeout(r, 0)));
  (async () => {
  await pausa();
  for (const h of $$("[data-titulo]")) {
    const ps = dividir(h);
    g.from(ps, { yPercent: 110, rotate: 4, duration: 1, ease: "power4.out", stagger: 0.045, scrollTrigger: { trigger: h, start: "top 86%" } });
    await pausa();
  }
  // ---------- barra de progresso ----------
  g.to(".progresso i", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

  await pausa();
  // ---------- menu: some ao descer, volta ao subir; o destaque desliza até a seção ----------
  let ultimo = 0;
  ST.create({ start: 0, end: "max", onUpdate: (s) => {
    const y = s.scroll(), descendo = y > ultimo && y > 300;
    menu?.classList.toggle("escondido", descendo);
    ultimo = y;
  } });
  const ind = $(".menu-indicador"), linksMenu = $$("[data-menu-links] a");
  function moverIndicador(a) {
    if (!ind) return;
    if (!a) { ind.style.opacity = "0"; return; }
    ind.style.opacity = "1"; ind.style.width = `${a.offsetWidth + 24}px`; ind.style.transform = `translateX(${a.offsetLeft - 12}px)`;
    linksMenu.forEach((l) => l.classList.toggle("ativo", l === a));
  }
  for (const a of linksMenu) {
    const sec = $(a.getAttribute("href"));
    if (sec) ST.create({ trigger: sec, start: "top 45%", end: "bottom 45%", onToggle: (s) => { if (s.isActive) moverIndicador(a); } });
  }
  ST.create({ trigger: "#topo", start: "top top", end: "bottom 45%", onToggle: (s) => { if (s.isActive) moverIndicador(null); } });

  await pausa();
  // ---------- moldura do produto: 12° quando baixa, 0° no terço de cima ----------
  g.fromTo(".tela-topo", { rotateX: 14, scale: 0.92 }, { rotateX: 0, scale: 1, ease: "none", scrollTrigger: { trigger: ".topo-palco", start: "top 92%", end: "top 25%", scrub: 0.6 } });
  g.to(".chip-a", { y: -60, ease: "none", scrollTrigger: { trigger: ".topo-palco", start: "top bottom", end: "bottom top", scrub: true } });
  g.to(".chip-b", { y: -110, ease: "none", scrollTrigger: { trigger: ".topo-palco", start: "top bottom", end: "bottom top", scrub: true } });
  g.to(".chip-c", { y: -35, ease: "none", scrollTrigger: { trigger: ".topo-palco", start: "top bottom", end: "bottom top", scrub: true } });

  await pausa();
  // ---------- números: o painel cresce, cada cartão sobe no seu ritmo, os números contam ----------
  g.fromTo("[data-cresce]", { scale: 0.88 }, { scale: 1, ease: "none", scrollTrigger: { trigger: "[data-cresce]", start: "top 95%", end: "top 35%", scrub: 0.6 } });
  $$("[data-cartao]").forEach((c, i) => g.from(c, { y: 70 + i * 45, opacity: 0, ease: "none", scrollTrigger: { trigger: "[data-cresce]", start: "top 80%", end: "top 30%", scrub: 0.8 } }));
  for (const b of $$("[data-conta]")) {
    const alvo = +b.dataset.conta, suf = b.dataset.sufixo ?? "", o = { v: 0 };
    ST.create({ trigger: b, start: "top 85%", once: true, onEnter: () => g.to(o, { v: alvo, duration: 1.6, ease: "power2.out", onUpdate: () => { b.textContent = Math.round(o.v) + suf; } }) });
  }

  await pausa();
  // ---------- "A sua próxima venda": palavras acendem com a rolagem ----------
  for (const f of $$("[data-frase]")) {
    const ps = dividir(f);
    g.fromTo(ps, { opacity: 0.16 }, { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: f, start: "top 85%", end: "bottom 45%", scrub: true } });
  }

  await pausa();
  // ---------- passo a passo: o navegador prende o palco (sticky); a rolagem acende os passos e troca a tela do app ----------
  const passos = $("[data-passos-secao]"), itens = $$("[data-passos] li");
  const TELA_DO_PASSO = ["lista", "inbox", "flow", "crm"];
  let passoAtual = -1;
  const acender = (i) => {
    if (i === passoAtual) return; passoAtual = i;
    itens.forEach((li, k) => li.classList.toggle("agora", k === i));
    window.atlasApp?.ir(TELA_DO_PASSO[i]);
  };
  itens.forEach((li, i) => li.addEventListener("click", () => acender(i)));
  if (passos) ST.create({ trigger: passos, start: "top top", end: "bottom bottom", onUpdate: (st) => acender(Math.min(itens.length - 1, Math.floor(st.progress * itens.length * 0.999))) });
  g.fromTo(".iphone", { rotateY: -22, rotateX: 8, rotateZ: -3, scale: 0.9 }, { rotateY: 0, rotateX: 0, rotateZ: 0, scale: 1, ease: "none",
    scrollTrigger: { trigger: passos, start: "top 90%", end: "top 10%", scrub: 0.8 } });

  await pausa();
  // ---------- recursos: texto sobe, a tela flutua em parallax ----------
  for (const r of $$(".recurso")) {
    g.from($$(".recurso-texto > :not(h2)", r), { y: 34, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: r, start: "top 75%" } });
    const palco = $("[data-parallax]", r);
    g.fromTo(palco, { y: 90, scale: 0.94, rotate: r.classList.contains("recurso-dir") ? -1.5 : 1.5 }, { y: -40, scale: 1, rotate: 0, ease: "none", scrollTrigger: { trigger: r, start: "top bottom", end: "bottom top", scrub: 0.8 } });
  }

  await pausa();
  // ---------- Orbit: o painel escuro abre e os módulos sobem em sequência ----------
  g.fromTo("[data-abre]", { scale: 0.86, y: 40 }, { scale: 1, y: 0, ease: "none", scrollTrigger: { trigger: "[data-abre]", start: "top 90%", end: "top 25%", scrub: 0.7 } });
  g.from("[data-sequencia] li", { y: 30, opacity: 0, scale: 0.92, duration: 0.7, ease: "back.out(1.6)", stagger: 0.12, scrollTrigger: { trigger: "[data-sequencia]", start: "top 85%" } });
  g.fromTo(".tela-orbit", { y: 120, scale: 0.9 }, { y: 0, scale: 1, ease: "none", scrollTrigger: { trigger: ".tela-orbit", start: "top bottom", end: "top 35%", scrub: 0.8 } });

  await pausa();
  // ---------- conheça o Atlas: o painel branco cresce e a esfera chega ----------
  g.fromTo(".painel-branco", { scale: 0.9, y: 60 }, { scale: 1, y: 0, ease: "none", scrollTrigger: { trigger: ".painel-branco", start: "top 95%", end: "top 35%", scrub: 0.8 } });
  g.from(".esfera-palco", { scale: 0.7, opacity: 0, rotate: -12, duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: ".esfera-palco", start: "top 80%" } });
  g.from(".esfera-bolha", { y: 30, opacity: 0, scale: 0.9, duration: 0.8, ease: "back.out(1.6)", stagger: 0.15, scrollTrigger: { trigger: ".esfera-palco", start: "top 70%" } });
  // integrações: os apps nascem do centro
  ST.create({ trigger: ".hub", start: "top 78%", once: true, onEnter: () => $(".hub")?.classList.add("aceso") });
  g.from(".hub-anel", { scale: 0.4, opacity: 0, duration: 1.2, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: ".hub", start: "top 80%" } });

  await pausa();
  // ---------- bento: os blocos chegam de longe e se encaixam ----------
  $$("[data-bento]").forEach((b, i) => {
    const lado = i % 2 ? 1 : -1;
    g.from(b, { x: lado * (80 + i * 20), y: 140, rotate: lado * (6 - i), scale: 0.82, opacity: 0, ease: "power3.out", duration: 1.2, delay: i * 0.06,
      scrollTrigger: { trigger: ".bento", start: "top 82%" } });
    g.from($(".recorte", b), { y: 60, ease: "none", scrollTrigger: { trigger: b, start: "top bottom", end: "bottom top", scrub: 0.8 } });
  });
  // luz que segue o cursor nos blocos e nos planos
  if (matchMedia("(hover: hover)").matches) for (const c of $$(".bento-item, .plano, .times-grade li, .lgpd-grade li")) {
    c.addEventListener("pointermove", (e) => { const r = c.getBoundingClientRect(); c.style.setProperty("--mx", `${e.clientX - r.left}px`); c.style.setProperty("--my", `${e.clientY - r.top}px`); });
  }

  await pausa();
  // ---------- planos: os cartões chegam em leque (inclinados e espalhados) e se alinham com a rolagem ----------
  const planos = $$(".planos-grade .plano:not(.plano-enterprise)"), meio = (planos.length - 1) / 2;
  planos.forEach((p, i) => {
    const d = i - meio;
    g.fromTo(p, { rotate: d * 7, y: 140 + Math.abs(d) * 70, x: d * -40, scale: 0.9 },
      { rotate: 0, y: 0, x: 0, scale: 1, ease: "none", scrollTrigger: { trigger: "[data-ceu]", start: "top 88%", end: "top 18%", scrub: 0.9 } });
  });
  g.from(".plano-enterprise", { y: 90, opacity: 0, ease: "none", scrollTrigger: { trigger: ".plano-enterprise", start: "top 100%", end: "top 70%", scrub: 0.8 } });
  g.from("[data-ceu] .nuvem", { scale: 0.7, opacity: 0, ease: "none", scrollTrigger: { trigger: "[data-ceu]", start: "top 95%", end: "top 40%", scrub: 1 } });

  await pausa();
  // ---------- botões: a luz segue o mouse ----------
  // plano-luz: um holofote na cor do plano segue o mouse
  if (matchMedia("(hover: hover)").matches) for (const c of $$(".plano")) {
    c.addEventListener("pointermove", (e) => { const r = c.getBoundingClientRect(); c.style.setProperty("--mx", (e.clientX - r.left) + "px"); c.style.setProperty("--my", (e.clientY - r.top) + "px"); });
  }
  if (matchMedia("(hover: hover)").matches) for (const b of $$(".cta-grande, .cta-menu, .cta-plano")) {
    b.addEventListener("pointermove", (e) => { const r = b.getBoundingClientRect(); b.style.setProperty("--bx", `${e.clientX - r.left}px`); b.style.setProperty("--by", `${e.clientY - r.top}px`); });
  }

  $$(".lgpd-grade li, .times-grade li").forEach((li, i) => g.from(li, { y: 60 + (i % 3) * 30, opacity: 0, ease: "none", scrollTrigger: { trigger: li, start: "top 98%", end: "top 70%", scrub: 0.8 } }));
  g.from(".duvidas details", { y: 26, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.06, scrollTrigger: { trigger: ".duvidas-lista", start: "top 82%" } });

  await pausa();
  // ---------- fim: o painel azul cresce e o rodapé sobe por baixo ----------
  g.fromTo(".painel-final", { scale: 0.9 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".painel-final", start: "top 95%", end: "top 40%", scrub: 0.7 } });
  g.from(".painel-final > p", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.1, scrollTrigger: { trigger: ".painel-final", start: "top 60%" } });
  g.from(".final-acoes > *", { y: 46, opacity: 0, scale: 0.9, filter: "blur(8px)", duration: 1, ease: "back.out(1.4)", stagger: 0.18, clearProps: "filter", scrollTrigger: { trigger: ".final-acoes", start: "top 88%" } });
  g.fromTo(".final-marca", { yPercent: 18, rotate: -8 }, { yPercent: -12, rotate: 6, ease: "none", scrollTrigger: { trigger: ".painel-final", start: "top bottom", end: "bottom top", scrub: 1 } });
  g.from(".rodape-cartao", { y: 80, ease: "none", scrollTrigger: { trigger: ".rodape", start: "top bottom", end: "bottom bottom", scrub: 0.6 } });
  // a palavra gigante sobe por trás da borda do cartão, mais devagar que a página (parallax)
  g.fromTo(".rodape-gigante span", { yPercent: 55 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: ".rodape-gigante", start: "top bottom", end: "bottom bottom", scrub: 0.8 } });

  ST.refresh();
  })();
  // recalcula quando fontes e imagens mudam as alturas
  document.fonts?.ready.then(() => ST.refresh());
  addEventListener("load", () => ST.refresh());
  for (const d of $$("details")) d.addEventListener("toggle", () => ST.refresh());
})();
