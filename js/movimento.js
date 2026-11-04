// Movimento da LP: revelação na rolagem, o quadro (o lead anda de coluna em coluna), palavras que acendem e o menu.
const html = document.documentElement;
const reduzir = matchMedia("(prefers-reduced-motion: reduce)");

// ---------- revelação ----------
if (!reduzir.matches && "IntersectionObserver" in window) {
  html.classList.add("revela-pronto");
  const io = new IntersectionObserver((itens) => {
    for (const it of itens) if (it.isIntersecting) { it.target.classList.add("visto"); io.unobserve(it.target); }
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  // irmãos revelados em cascata curta
  for (const el of document.querySelectorAll("[data-revela]")) {
    const irmaos = [...el.parentElement.children].filter((c) => c.hasAttribute("data-revela"));
    el.style.setProperty("--atraso", `${Math.min(irmaos.indexOf(el), 5) * 70}ms`);
    io.observe(el);
  }
  // o que já está na tela ao carregar aparece sem esperar
  requestAnimationFrame(() => {
    for (const el of document.querySelectorAll("[data-revela]")) if (el.getBoundingClientRect().top < innerHeight) el.classList.add("visto");
  });
}

// ---------- menu e botão flutuante ----------
const menu = document.querySelector("[data-menu]");
const flutuante = document.querySelector(".flutuante");
const topo = document.getElementById("topo");
function rolagemGeral() {
  menu?.classList.toggle("rolou", scrollY > 12);
  if (flutuante && topo) flutuante.classList.toggle("visivel", scrollY > topo.offsetHeight * 0.7 && innerHeight + scrollY < document.body.scrollHeight - 200);
}

// ---------- palavras que acendem ----------
const frases = [...document.querySelectorAll("[data-frase]")].map((el) => {
  const partes = [];
  const quebrar = (no) => {
    for (const filho of [...no.childNodes]) {
      if (filho.nodeType === 3) {
        const frag = document.createDocumentFragment();
        for (const pedaco of filho.textContent.split(/(\s+)/)) {
          if (!pedaco) continue;
          if (/^\s+$/.test(pedaco)) { frag.append(pedaco); continue; }
          const s = document.createElement("span"); s.className = "palavra"; s.textContent = pedaco; frag.append(s); partes.push(s);
        }
        filho.replaceWith(frag);
      } else if (filho.nodeType === 1) quebrar(filho);
    }
  };
  quebrar(el);
  return { el, partes };
});
function acender() {
  if (reduzir.matches) return;
  for (const { el, partes } of frases) {
    const r = el.getBoundingClientRect();
    // começa quando o topo da frase passa 85% da tela e termina em 40%
    const p = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (innerHeight * 0.45 + r.height * 0.5)));
    partes.forEach((s, i) => { const local = Math.min(1, Math.max(0, p * partes.length - i)); s.style.setProperty("--p", local.toFixed(3)); });
  }
}

// ---------- o quadro ----------
const quadro = document.querySelector("[data-quadro]");
const trilha = quadro?.querySelector("[data-trilha]");
const colunas = quadro ? [...quadro.querySelectorAll(".coluna")] : [];
const links = quadro ? [...quadro.querySelectorAll(".trilho a")] : [];
const luz = quadro?.querySelector(".trilho-luz");
const lead = quadro?.querySelector(".lead");
const leadEtapa = quadro?.querySelector("[data-lead-etapa]");
const horizontal = matchMedia("(min-width: 1100px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)");
let agora = -1;

function marcar(i) {
  if (i === agora) return;
  agora = i;
  links.forEach((a, k) => { a.classList.toggle("agora", k === i); a.classList.toggle("feito", k < i); if (k === i) a.setAttribute("aria-current", "step"); else a.removeAttribute("aria-current"); });
  if (leadEtapa) leadEtapa.textContent = links[i]?.textContent.trim() ?? "";
  lead?.classList.toggle("ganho", i === links.length - 1);
  posicionarLuz();
  // no celular, mantém a etapa ativa visível no trilho
  // (só a fila do trilho rola; scrollIntoView arrastaria a página inteira)
  if (!horizontal.matches && links[i]) {
    const ol = links[i].closest("ol");
    const alvo = links[i].offsetLeft - (ol.clientWidth - links[i].offsetWidth) / 2;
    ol.scrollTo({ left: Math.max(0, alvo), behavior: reduzir.matches ? "auto" : "smooth" });
  }
}
function posicionarLuz() {
  if (!horizontal.matches || agora < 0) return;
  const a = links[agora], base = quadro.querySelector(".trilho").getBoundingClientRect(), r = a.getBoundingClientRect();
  luz?.style.setProperty("--luz-x", `${r.left - base.left}px`);
  luz?.style.setProperty("--luz-w", `${r.width}px`);
  const palco = quadro.querySelector(".quadro-palco").getBoundingClientRect();
  const larguraLead = lead?.offsetWidth ?? 0;
  const x = Math.min(Math.max(r.left + r.width / 2 - larguraLead / 2 - palco.left, 16), palco.width - larguraLead - 16);
  lead?.style.setProperty("--lead-x", `${x}px`);
}
function progressoQuadro() {
  const r = quadro.getBoundingClientRect();
  const curso = quadro.offsetHeight - innerHeight;
  return curso > 0 ? Math.min(1, Math.max(0, -r.top / curso)) : 0;
}
function rolarQuadro() {
  if (!quadro) return;
  if (horizontal.matches) {
    const p = progressoQuadro();
    // cada coluna para no centro da tela; entre duas, a trilha anda em degraus suaves
    const n = colunas.length, bruto = p * (n - 1), base = Math.min(n - 1, Math.floor(bruto)), frac = bruto - base;
    const suave = frac < 0.18 ? 0 : frac > 0.82 ? 1 : (frac - 0.18) / 0.64;
    const t = suave * suave * (3 - 2 * suave);
    const centro = (i) => -(colunas[i].offsetLeft - (innerWidth - colunas[i].offsetWidth) / 2);
    const x = centro(base) + (base < n - 1 ? (centro(base + 1) - centro(base)) * t : 0);
    trilha.style.setProperty("--trilha-x", `${x}px`);
    marcar(Math.min(n - 1, Math.round(bruto)));
  } else {
    // vertical: a etapa ativa é a coluna que cruza 40% da tela
    let i = 0;
    colunas.forEach((c, k) => { if (c.getBoundingClientRect().top < innerHeight * 0.4) i = k; });
    marcar(i);
  }
}
function irPara(i) {
  if (horizontal.matches) {
    const alvo = quadro.offsetTop + (i / (colunas.length - 1)) * (quadro.offsetHeight - innerHeight);
    scrollTo({ top: alvo + 2, behavior: reduzir.matches ? "auto" : "smooth" });
  } else colunas[i]?.scrollIntoView({ behavior: reduzir.matches ? "auto" : "smooth" });
}
if (quadro) {
  quadro.style.setProperty("--colunas", colunas.length);
  const modificado = (e) => e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
  links.forEach((a, i) => a.addEventListener("click", (e) => { if (modificado(e)) return; e.preventDefault(); irPara(i); history.replaceState(null, "", a.hash); }));
  // links do menu e do rodapé que apontam para uma coluna
  for (const a of document.querySelectorAll('a[href^="#"]')) {
    const i = colunas.findIndex((c) => `#${c.id}` === a.getAttribute("href"));
    if (i >= 0 && !links.includes(a)) a.addEventListener("click", (e) => { if (modificado(e)) return; e.preventDefault(); irPara(i); history.replaceState(null, "", a.hash); });
  }
  // teclado: foco dentro de uma coluna fora da tela leva o quadro até ela
  colunas.forEach((c, i) => c.addEventListener("focusin", () => { if (horizontal.matches && agora !== i) irPara(i); }));
  horizontal.addEventListener("change", () => { agora = -1; trilha.style.removeProperty("--trilha-x"); rolarQuadro(); });
  if (location.hash) { const i = colunas.findIndex((c) => `#${c.id}` === location.hash); if (i >= 0) requestAnimationFrame(() => irPara(i)); }
}

// ---------- v2: a tela do topo começa inclinada e se endireita com a rolagem ----------
const palco = document.querySelector("[data-palco] .tela-topo");
function endireitar() {
  if (!palco || reduzir.matches) return;
  const r = palco.getBoundingClientRect();
  const k = Math.min(1, Math.max(0, (r.top - innerHeight * 0.15) / (innerHeight * 0.75)));
  palco.style.setProperty("--inclina", k.toFixed(3));
}

// ---------- v2: passo a passo que avança sozinho enquanto está na tela ----------
const passos = [...document.querySelectorAll("[data-passos] li")];
let passoAtual = 0, relogio = null;
const marcarPasso = (i) => { passoAtual = i; passos.forEach((li, k) => li.classList.toggle("agora", k === i)); };
passos.forEach((li, i) => li.addEventListener("mouseenter", () => { marcarPasso(i); clearInterval(relogio); relogio = null; }));
if (passos.length && "IntersectionObserver" in window) {
  new IntersectionObserver(([it]) => {
    if (it.isIntersecting && !relogio && !reduzir.matches) relogio = setInterval(() => marcarPasso((passoAtual + 1) % passos.length), 3200);
    if (!it.isIntersecting) { clearInterval(relogio); relogio = null; }
  }, { threshold: 0.4 }).observe(passos[0].parentElement);
}

let pedido = false;
function quadroAquadro() {
  pedido = false;
  rolagemGeral(); acender(); rolarQuadro(); endireitar();
}
addEventListener("scroll", () => { if (!pedido) { pedido = true; requestAnimationFrame(quadroAquadro); } }, { passive: true });
addEventListener("resize", () => { agora = -1; quadroAquadro(); posicionarLuz(); });
document.fonts?.ready.then(() => { agora = -1; quadroAquadro(); });
quadroAquadro();
