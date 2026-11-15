// Atlas: rodada 2, parte 2B (números, tecnologias, integrações, planos, fecho e redes).
// Só liga estados e interações; o conteúdo já está todo no HTML e aparece sem script.
// Entradas uma vez só, ao entrar na tela. Nada roda em laço fora da tela.
// Movimento reduzido: sem entradas, sem inclinação, sem parallax.

const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
const PONTEIRO = matchMedia("(hover: hover) and (pointer: fine)").matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

if (!RM) document.documentElement.classList.add("r2b");

/* ---------- entradas: marca .r2-viu uma vez quando o bloco aparece ---------- */
const entrar = (el, fn) => {
  if (!el) return;
  if (RM || !("IntersectionObserver" in window)) { el.classList.add("r2-viu"); fn?.(el); return; }
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    el.classList.add("r2-viu");
    fn?.(el);
  }), { threshold: 0.22, rootMargin: "0px 0px -8% 0px" });
  io.observe(el);
};
$$("[data-r2-entra]").forEach((el) => entrar(el));
entrar($(".r2-al"));

/* números: cada traço da régua de ligações entra em sequência */
$$(".r2-ticks").forEach((t) => [...t.children].forEach((i, n) => i.style.setProperty("--t", n)));

/* ---------- 14. o que roda por dentro: passar o mouse na lista acende o app na órbita ---------- */
const tecLista = $("[data-r2-tec]");
const orbita = $(".r2-orbita");
if (tecLista && orbita) {
  const apps = $$(".r2-orb-app", orbita);
  const acender = (ids) => {
    orbita.classList.toggle("r2-foco", !!ids);
    apps.forEach((a) => a.classList.toggle("r2-acende", !!ids && ids.includes(a.dataset.tec)));
  };
  $$("li", tecLista).forEach((li) => {
    li.addEventListener("pointerenter", () => acender(li.dataset.tec.split(" ")));
    li.addEventListener("pointerleave", () => acender(null));
  });
}

/* ---------- 15. integrações: o ícone inclina para o cursor e a luz segue o ponteiro ---------- */
if (PONTEIRO && !RM) {
  $$("[data-r2-tilt] .r2-app").forEach((app) => {
    const ico = $(".app-icone", app);
    if (!ico) return;
    let raf = 0;
    app.addEventListener("pointermove", (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = ico.getBoundingClientRect();
        const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
        const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
        ico.style.setProperty("--ry", `${((x - 0.5) * 22).toFixed(1)}deg`);
        ico.style.setProperty("--rx", `${((0.5 - y) * 22).toFixed(1)}deg`);
        ico.style.setProperty("--mx", `${(x * 100).toFixed(0)}%`);
        ico.style.setProperty("--my", `${(y * 100).toFixed(0)}%`);
      });
    });
    app.addEventListener("pointerleave", () => {
      cancelAnimationFrame(raf);
      ["--rx", "--ry", "--mx", "--my"].forEach((p) => ico.style.removeProperty(p));
    });
  });
}

/* ---------- 16. planos: tela de início que enche, app que acende nos outros planos, carrossel ---------- */
const pl = $("[data-r2-planos]");
if (pl) {
  const trilho = $(".r2-pl-trilho", pl);
  const cartoes = $$(".r2-plano", trilho);
  cartoes.forEach((c, i) => c.style.setProperty("--c", i));
  entrar(trilho, () => setTimeout(() => trilho.classList.add("r2-pronto"), RM ? 0 : 2400));

  // o mesmo app acende em todos os planos que o têm
  const todos = $$(".r2-pl-apps li", trilho);
  const focar = (app) => {
    trilho.classList.toggle("r2-foco-app", !!app);
    todos.forEach((li) => li.classList.toggle("r2-par", !!app && li.dataset.app === app));
  };
  todos.forEach((li) => {
    li.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") focar(li.dataset.app); });
    li.addEventListener("pointerleave", () => focar(null));
  });

  // carrossel (só quando o trilho rola: telas abaixo de 1180px)
  const setas = $$(".r2-pl-seta", pl);
  const status = $(".r2-pl-status", pl);
  const atual = () => {
    const base = trilho.getBoundingClientRect().left + parseFloat(getComputedStyle(trilho).scrollPaddingInlineStart || 0);
    let melhor = 0, dist = Infinity;
    cartoes.forEach((c, i) => { const d = Math.abs(c.getBoundingClientRect().left - base); if (d < dist) { dist = d; melhor = i; } });
    return melhor;
  };
  let alvo = null, ultimo = 0;
  const ir = (i) => {
    i = Math.max(0, Math.min(cartoes.length - 1, i));
    alvo = i;
    trilho.scrollTo({ left: cartoes[i].offsetLeft - cartoes[0].offsetLeft, behavior: RM ? "auto" : "smooth" });
  };
  const assentou = () => {
    alvo = null;
    const fim = trilho.scrollLeft + trilho.clientWidth >= trilho.scrollWidth - 4;
    const i = fim ? cartoes.length - 1 : atual();
    setas[0].disabled = trilho.scrollLeft <= 4;
    setas[1].disabled = fim;
    if (i !== ultimo && status) status.textContent = `${$(".r2-pl-nome", cartoes[i]).textContent}, plano ${i + 1} de ${cartoes.length}`;
    ultimo = i;
  };
  setas.forEach((b) => b.addEventListener("click", () => ir((alvo ?? atual()) + Number(b.dataset.dir))));
  if ("onscrollend" in trilho) trilho.addEventListener("scrollend", assentou);
  else { let t; trilho.addEventListener("scroll", () => { clearTimeout(t); t = setTimeout(assentou, 120); }, { passive: true }); }
  setas[0].disabled = true;

  // #plano-x no endereço leva até o plano
  const pedido = location.hash && cartoes.find((c) => "#" + c.id === location.hash);
  if (pedido) requestAnimationFrame(() => ir(cartoes.indexOf(pedido)));
}

/* ---------- 18. fecho: entrada em sequência e a tecla que acompanha o cursor ---------- */
const fecho = $("[data-r2-fecho]");
if (fecho) {
  entrar(fecho, () => setTimeout(() => fecho.classList.add("r2-solto"), RM ? 0 : 1500));
  if (PONTEIRO && !RM) {
    const tecla = $(".fecho-tecla", fecho);
    const aura = $(".r2-fecho-aura", fecho);
    let alvoX = 0, alvoY = 0, x = 0, y = 0, raf = 0;
    const passo = () => {
      x += (alvoX - x) * 0.12; y += (alvoY - y) * 0.12;
      const ang = Math.hypot(x, y) * 7;
      tecla.style.setProperty("--rv", ang < 0.01 ? "0 0 1 0deg" : `${(-y).toFixed(3)} ${x.toFixed(3)} 0 ${ang.toFixed(2)}deg`);
      aura.style.setProperty("--px", `${(-x * 28).toFixed(1)}px`);
      aura.style.setProperty("--py", `${(-y * 20).toFixed(1)}px`);
      raf = Math.abs(alvoX - x) + Math.abs(alvoY - y) > 0.002 ? requestAnimationFrame(passo) : 0;
    };
    const mexer = () => { if (!raf) raf = requestAnimationFrame(passo); };
    fecho.addEventListener("pointermove", (e) => {
      if (!fecho.classList.contains("r2-solto")) return;
      const r = tecla.getBoundingClientRect();
      alvoX = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (innerWidth / 2)));
      alvoY = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (innerHeight / 2)));
      mexer();
    });
    fecho.addEventListener("pointerleave", () => { alvoX = 0; alvoY = 0; mexer(); });
  }
}
