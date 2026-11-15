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

/* ---------- ilha flutuante ---------- */
const ilha = $("[data-ilha]");
if (ilha && hero) {
  const semIlha = new Set();
  let orbeIlha = null;
  const atualizar = () => {
    const on = !heroVisivel && semIlha.size === 0;
    ilha.classList.toggle("on", on);
    ilha.inert = !on;
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
