// Atlas: comportamento do site (fase A). As seções 2 a 8 ficam em js/secoes.js (fase B).
// Barra com menus, menu do celular, palavra que troca no hero, Orbit (carregado
// depois do primeiro desenho), ilha flutuante e consentimento de cookies (LGPD).

const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINO = matchMedia("(hover: hover) and (pointer: fine)").matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const quandoOcioso = (fn, limite = 1500) =>
  "requestIdleCallback" in window ? requestIdleCallback(fn, { timeout: limite }) : setTimeout(fn, 300);

let modOrbe = null;
const carregarOrbe = () => (modOrbe ||= import("./orbe.js"));

/* ---------- barra: vidro ao rolar ---------- */
const barra = $("[data-barra]");
let rolouPendente = false;
function marcarRolagem() {
  rolouPendente = false;
  barra?.classList.toggle("rolou", scrollY > 8);
}
addEventListener("scroll", () => { if (!rolouPendente) { rolouPendente = true; requestAnimationFrame(marcarRolagem); } }, { passive: true });
marcarRolagem();

/* ---------- menus suspensos (desktop) ---------- */
const itensDrop = $$("[data-drop]");
let aberto = null, porHover = false, tAbrir = 0, tFechar = 0;

function partes(item) { return { btn: $(".nav-gatilho", item), drop: $(".drop", item) }; }

function abrir(item, hover = false) {
  clearTimeout(tFechar);
  if (aberto && aberto !== item) fechar(aberto, true);
  const { btn, drop } = partes(item);
  porHover = hover;
  if (aberto === item) return;
  aberto = item;
  drop.hidden = false;
  drop.style.setProperty("--dx", "0px");
  btn.setAttribute("aria-expanded", "true");
  requestAnimationFrame(() => {
    // mantém o painel dentro da tela
    const r = drop.getBoundingClientRect();
    let dx = 0;
    if (r.left < 12) dx = 12 - r.left;
    else if (r.right > innerWidth - 12) dx = innerWidth - 12 - r.right;
    drop.style.setProperty("--dx", `${Math.round(dx)}px`);
    drop.classList.add("aberto");
  });
}

function fechar(item, imediato = false) {
  const { btn, drop } = partes(item);
  drop.classList.remove("aberto");
  btn.setAttribute("aria-expanded", "false");
  if (aberto === item) { aberto = null; porHover = false; }
  if (imediato || RM) drop.hidden = true;
  else setTimeout(() => { if (!drop.classList.contains("aberto")) drop.hidden = true; }, 230);
}

for (const item of itensDrop) {
  const { btn } = partes(item);
  btn.addEventListener("click", () => {
    if (aberto === item && porHover) { porHover = false; return; } // clique fixa o que o hover abriu
    aberto === item ? fechar(item) : abrir(item);
  });
  item.addEventListener("pointerenter", (e) => {
    if (e.pointerType !== "mouse" || !FINO) return;
    clearTimeout(tFechar); clearTimeout(tAbrir);
    if (aberto === item) return;
    tAbrir = setTimeout(() => abrir(item, true), aberto ? 0 : 90);
  });
  item.addEventListener("pointerleave", (e) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(tAbrir);
    if (aberto === item && porHover) tFechar = setTimeout(() => fechar(item), 160);
  });
  item.addEventListener("focusout", (e) => {
    if (aberto === item && e.relatedTarget && !item.contains(e.relatedTarget)) fechar(item);
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && aberto) { const item = aberto; fechar(item); partes(item).btn.focus(); }
});
document.addEventListener("pointerdown", (e) => { if (aberto && !aberto.contains(e.target)) fechar(aberto); });
$$(".drop a").forEach((a) => a.addEventListener("click", () => aberto && fechar(aberto, true)));

/* ---------- menu do celular (dialog modal) ---------- */
const gaveta = $("#menu-celular");
const botaoMenu = $(".menu-botao");
if (gaveta && botaoMenu) {
  botaoMenu.addEventListener("click", () => { gaveta.showModal(); botaoMenu.setAttribute("aria-expanded", "true"); });
  gaveta.addEventListener("close", () => botaoMenu.setAttribute("aria-expanded", "false"));
  gaveta.addEventListener("click", (e) => {
    if (e.target.closest("[data-fecha-menu]")) gaveta.close();
  });
  $$(".gv-gatilho", gaveta).forEach((b) => b.addEventListener("click", () => {
    const lista = document.getElementById(b.getAttribute("aria-controls"));
    const abre = b.getAttribute("aria-expanded") !== "true";
    b.setAttribute("aria-expanded", String(abre));
    lista.hidden = !abre;
  }));
  matchMedia("(min-width: 1001px)").addEventListener("change", (m) => { if (m.matches && gaveta.open) gaveta.close(); });
}

/* ---------- hero: palavra que troca letra a letra ---------- */
const rot = $("[data-rot]");
const hero = $("[data-hero]");
let heroVisivel = true;
let pausado = false;          // botão "Pausar animação" do hero
const orbes = new Set();
const botaoPausa = $("[data-pausa]");
if (botaoPausa) {
  if (RM) botaoPausa.hidden = true;
  botaoPausa.addEventListener("click", () => {
    pausado = !pausado;
    botaoPausa.setAttribute("aria-pressed", String(pausado));
    $(".sr", botaoPausa).textContent = pausado ? "Retomar animação" : "Pausar animação";
    orbes.forEach((o) => o.pausar(pausado));
    document.documentElement.classList.toggle("mov-pausado", pausado);
    document.dispatchEvent(new CustomEvent("atlas:pausa", { detail: pausado }));
  });
}
if (rot && !RM) {
  const palavras = rot.dataset.palavras.split(",").map((p) => p + ".");
  let i = 0;
  const letras = (w, cls, passo, base = 0) => [...w].map((c, k) => `<span class="ch ${cls}" style="animation-delay:${base + k * passo}ms">${c}</span>`).join("");
  setInterval(() => {
    if (document.hidden || !heroVisivel || pausado) return;
    const velha = palavras[i];
    i = (i + 1) % palavras.length;
    $$(".rot-sai", rot).forEach((n) => n.remove());
    const atual = $(".rot-palavra", rot);
    atual.className = "rot-sai";
    atual.innerHTML = letras(velha, "ch-out", 14);
    const nova = document.createElement("span");
    nova.className = "rot-palavra";
    nova.innerHTML = letras(palavras[i], "ch-in", 30, 150);
    rot.append(nova);
    setTimeout(() => atual.remove(), 520);
  }, 2600);
}

/* ---------- hero: Atlas Orbit (depois do primeiro desenho) ---------- */
const canvasHero = $("[data-orbe-hero]");
const textoHero = $("[data-hero-texto]");
if (canvasHero) {
  const iniciar = () => carregarOrbe().then(({ criarOrbe }) => {
    const o = criarOrbe(canvasHero, {
      aoQuadro: FINO && !RM && textoHero
        ? (m) => { textoHero.style.transform = `translate3d(${(m.x * 10).toFixed(2)}px, ${(m.y * 7).toFixed(2)}px, 0)`; }
        : undefined,
    });
    orbes.add(o); if (pausado) o.pausar(true);
  });
  if (document.readyState === "complete") quandoOcioso(iniciar);
  else addEventListener("load", () => quandoOcioso(iniciar), { once: true });
}

/* ---------- 9. planos: abas (setas, Home e End; #plano-x abre o plano) ---------- */
const planos = $("[data-planos]");
if (planos) {
  const abas = $$('[role="tab"]', planos);
  const escolher = (aba, foco = false) => {
    abas.forEach((a) => {
      const sim = a === aba;
      a.setAttribute("aria-selected", String(sim));
      a.tabIndex = sim ? 0 : -1;
      document.getElementById(a.getAttribute("aria-controls"))?.classList.toggle("ativo", sim);
    });
    if (foco) aba.focus({ preventScroll: true });
    const lista = aba.parentElement; // no celular as abas rolam na horizontal
    if (lista.scrollWidth > lista.clientWidth) {
      const centro = aba.getBoundingClientRect().left - lista.getBoundingClientRect().left + lista.scrollLeft - (lista.clientWidth - aba.offsetWidth) / 2;
      lista.scrollTo({ left: Math.max(0, centro), behavior: RM ? "auto" : "smooth" });
    }
  };
  abas.forEach((a) => a.addEventListener("click", () => {
    escolher(a);
    try { history.replaceState(null, "", "#" + a.getAttribute("aria-controls")); } catch { /* sem histórico: segue sem link */ }
  }));
  $('[role="tablist"]', planos).addEventListener("keydown", (e) => {
    const i = abas.indexOf(document.activeElement);
    if (i < 0) return;
    const mapa = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: abas.length - 1 };
    if (!(e.key in mapa)) return;
    e.preventDefault();
    escolher(abas[(mapa[e.key] + abas.length) % abas.length], true);
  });
  const pedido = abas.find((a) => a.getAttribute("aria-controls") === location.hash.slice(1));
  if (pedido) escolher(pedido);
}

/* ---------- ilha flutuante ---------- */
// A ilha nunca cobre texto: depois que a rolagem para, ela confere o que está embaixo.
// Livre: pílula no centro. Texto no centro: fica compacta no canto. Texto no canto também: sai da frente.
const ilha = $("[data-ilha]");
if (ilha && hero) {
  const semIlha = new Set();
  let orbeIlha = null;
  let modo = "pilula", largura = 0, tChecar = 0, tTroca = 0;
  const zona = (m) => {
    const alto = 54, base = innerHeight - (innerWidth <= 400 ? 12 : 16);
    const w = m === "pilula" ? (largura || ilha.offsetWidth) : 104;
    const l = m === "pilula" ? innerWidth / 2 - w / 2 : innerWidth - 16 - w;
    return { l: l - 8, r: l + w + 8, t: base - alto - 8, b: base + 4 };
  };
  const cruza = (q, z) => q.width > 0 && q.right > z.l && q.left < z.r && q.bottom > z.t && q.top < z.b;
  const cobreTexto = (z) => {
    const vistos = new Set();
    for (let ix = 0; ix <= 8; ix++) for (let iy = 0; iy <= 2; iy++) {
      const x = Math.min(innerWidth - 1, Math.max(0, z.l + ((z.r - z.l) * ix) / 8));
      const y = Math.min(innerHeight - 1, z.t + ((z.b - z.t) * iy) / 2);
      for (const el of document.elementsFromPoint(x, y).slice(0, 5)) {
        if (vistos.has(el) || ilha.contains(el) || el.closest(".cookies, .jornada-arco")) continue;
        vistos.add(el);
        if (el.matches("a, button")) { if (cruza(el.getBoundingClientRect(), z)) return true; continue; }
        for (const n of el.childNodes) {
          if (n.nodeType !== 3 || !n.data.trim()) continue;
          const r = document.createRange(); r.selectNodeContents(n);
          for (const q of r.getClientRects()) if (cruza(q, z)) return true;
        }
      }
    }
    return false;
  };
  const aplicarModo = (novo) => {
    if (novo === modo) return;
    clearTimeout(tTroca);
    ilha.classList.add("trocando");
    tTroca = setTimeout(() => {
      modo = novo;
      ilha.classList.toggle("canto", modo === "canto");
      ilha.classList.toggle("fora", modo === "fora");
      ilha.inert = !ilha.classList.contains("on") || modo === "fora";
      requestAnimationFrame(() => ilha.classList.remove("trocando"));
    }, RM ? 0 : 170);
  };
  const checar = () => {
    if (!ilha.classList.contains("on")) return;
    if (modo === "pilula") largura = ilha.offsetWidth;
    if (!cobreTexto(zona("pilula"))) aplicarModo("pilula");
    else aplicarModo(cobreTexto(zona("canto")) ? "fora" : "canto");
  };
  const agendarChecagem = () => { clearTimeout(tChecar); tChecar = setTimeout(checar, 140); };
  addEventListener("scroll", agendarChecagem, { passive: true });
  addEventListener("resize", agendarChecagem, { passive: true });
  const atualizar = () => {
    const on = !heroVisivel && semIlha.size === 0;
    const mudou = on !== ilha.classList.contains("on");
    ilha.classList.toggle("on", on);
    ilha.inert = !on || modo === "fora";
    if (on && mudou) agendarChecagem();
    if (on && !orbeIlha) {
      orbeIlha = "carregando";
      carregarOrbe().then(({ criarOrbe }) => {
        orbeIlha = criarOrbe($("[data-orbe-ilha]", ilha), { lat: 18, lon: 44, raio: 0.4, mouse: false, ponto: 0.95, giro: 0.6 });
        orbes.add(orbeIlha); if (pausado) orbeIlha.pausar(true);
      });
    }
  };
  new IntersectionObserver(([e]) => { heroVisivel = e.isIntersecting; atualizar(); }, { threshold: 0, rootMargin: "0px 0px -35% 0px" }).observe(hero);
  const ioSem = new IntersectionObserver((es) => {
    es.forEach((e) => (e.isIntersecting ? semIlha.add(e.target) : semIlha.delete(e.target)));
    atualizar();
  });
  $$("[data-sem-ilha]").forEach((el) => ioSem.observe(el));
  const acordar = (sim) => { if (orbeIlha && orbeIlha.acordar) orbeIlha.acordar(sim); };
  ilha.addEventListener("pointerenter", () => acordar(true));
  ilha.addEventListener("pointerleave", () => acordar(false));
  ilha.addEventListener("focusin", () => acordar(true));
  ilha.addEventListener("focusout", (e) => { if (!ilha.contains(e.relatedTarget)) acordar(false); });
}

/* ---------- cookies (LGPD) ---------- */
// Categorias iguais às de www.atlaslike.com/privacidade: essenciais (sempre ativos) e medição (só com aceite).
const CHAVE = "atlas-cookies";
const banner = $("#cookies");
const lerEscolha = () => {
  try { const v = JSON.parse(localStorage.getItem(CHAVE) || "null"); return v && v.v === 1 ? v : null; } catch { return null; }
};
function aplicarConsentimento(c) {
  window.atlasConsentimento = c;
  if (c && c.medicao) {
    // ativa só agora as tags de medição que estiverem na página
    $$('script[type="text/plain"][data-consentimento="medicao"]').forEach((s) => {
      const n = document.createElement("script");
      if (s.dataset.src) { n.src = s.dataset.src; n.async = true; }
      n.text = s.text;
      s.replaceWith(n);
    });
  }
  document.dispatchEvent(new CustomEvent("atlas:consentimento", { detail: c }));
}
if (banner) {
  const config = $("#cookies-config", banner);
  const chave = $("#ck-medicao", banner);
  const bConfig = $('[data-ck="configurar"]', banner);
  const bSalvar = $('[data-ck="salvar"]', banner);
  const abrirConfig = (sim) => {
    config.hidden = !sim; bSalvar.hidden = !sim;
    $('[data-ck="essenciais"]', banner).hidden = sim; // com as opções abertas, desligar a medição e salvar faz o mesmo
    bConfig.setAttribute("aria-expanded", String(sim));
    bConfig.textContent = sim ? "Fechar opções" : "Configurar";
  };
  const mostrar = (comConfig = false) => {
    const atual = lerEscolha();
    chave.checked = !!(atual && atual.medicao);
    abrirConfig(comConfig);
    banner.hidden = false;
    document.documentElement.classList.add("ck-aberto");
  };
  const salvar = (medicao) => {
    const antes = lerEscolha();
    const c = { v: 1, medicao, em: new Date().toISOString() };
    try { localStorage.setItem(CHAVE, JSON.stringify(c)); } catch { /* navegação privada: vale só nesta visita */ }
    banner.hidden = true;
    document.documentElement.classList.remove("ck-aberto");
    if (antes && antes.medicao && !medicao) { location.reload(); return; } // tira a medição já carregada
    aplicarConsentimento(c);
  };
  banner.addEventListener("click", (e) => {
    const b = e.target.closest("[data-ck]");
    if (!b) return;
    const acao = b.dataset.ck;
    if (acao === "aceitar") salvar(true);
    else if (acao === "essenciais") salvar(false);
    else if (acao === "salvar") salvar(chave.checked);
    else if (acao === "configurar") abrirConfig(config.hidden);
  });
  $$("[data-abrir-cookies]").forEach((b) => b.addEventListener("click", () => { mostrar(true); chave.focus(); }));

  const escolha = lerEscolha();
  if (escolha) aplicarConsentimento(escolha);
  else {
    const exibir = () => quandoOcioso(() => mostrar(false), 2500);
    if (document.readyState === "complete") exibir();
    else addEventListener("load", exibir, { once: true });
  }
}

/* ---------- seções 2 a 8 (fase B): carregadas depois do primeiro desenho ---------- */
{
  const secoes = () => quandoOcioso(() => import("./secoes.js"), 800);
  if (document.readyState === "complete") secoes();
  else addEventListener("load", secoes, { once: true });
}
