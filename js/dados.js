// Dados da LP: grade de 100 pontos, gráficos que crescem ao entrar na tela e a simulação de quanto a demora custa.
// Sem JS, os gráficos aparecem no estado final (o CSS só esconde com html.js e sem .visto).
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduzir = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- grade de 100 pontos ----------
  for (const g of $$("[data-pontos]")) {
    const partes = g.dataset.pontos.split(",").map(Number);
    let i = 0, html = "";
    partes.forEach((n, k) => { for (let j = 0; j < n; j++, i++) html += `<i class="c${k + 1}" style="--i:${i}"></i>`; });
    g.innerHTML = html;
  }

  // ---------- acende quando entra na tela ----------
  const alvos = $$(".pontos, .queda, .semana, .dm-viz, [data-dor], [data-cascata], .est-vendas");
  if (reduzir || !("IntersectionObserver" in window)) alvos.forEach((a) => a.classList.add("visto"));
  else {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visto"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -12% 0px" });
    alvos.forEach((a) => io.observe(a));
  }

  // ---------- simulação ----------
  const raiz = $("[data-estimativa]");
  if (!raiz) return;
  const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  const num = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });
  const ent = (n) => $(`input[name="${n}"]`, raiz);
  const sai = (n) => $(`[data-saida="${n}"]`, raiz);

  // leads e ticket andam em escala logarítmica: o começo da régua fica fácil de ajustar
  const LOG = { leads: [20, 5000], ticket: [200, 100000] };
  const arred = { leads: (v) => (v < 100 ? Math.round(v / 5) * 5 : v < 1000 ? Math.round(v / 10) * 10 : Math.round(v / 50) * 50),
                  ticket: (v) => (v < 1000 ? Math.round(v / 50) * 50 : v < 10000 ? Math.round(v / 100) * 100 : Math.round(v / 1000) * 1000) };
  for (const [n, [a, b]] of Object.entries(LOG)) {
    const el = ent(n), inicial = +el.value;
    el.min = "0"; el.max = "1000"; el.step = "1";
    el.value = String(Math.round((Math.log(inicial / a) / Math.log(b / a)) * 1000));
  }
  const ler = (n) => {
    const el = ent(n);
    let v = Number(el.value);
    if (!Number.isFinite(v)) v = Number(el.min) || 0;
    if (LOG[n]) { const [a, b] = LOG[n]; v = arred[n](a * Math.pow(b / a, Math.min(1000, Math.max(0, v)) / 1000)); }
    return Math.max(0, v);
  };

  // exportado para o teste: calcular({ leads, ticket, fechamento, melhora }) com fechamento e melhora em %
  function calcular({ leads, ticket, fechamento, melhora }) {
    const ok = (x) => (Number.isFinite(+x) && +x > 0 ? +x : 0);
    const L = ok(leads), T = ok(ticket), f = Math.min(ok(fechamento), 100) / 100, m = Math.min(ok(melhora), 200) / 100;
    const hoje = L * f, atlas = Math.min(L, hoje * (1 + m));
    const mes = (atlas - hoje) * T;
    return { hoje, atlas, mes, ano: mes * 12 };
  }
  window.__estimativa = calcular;

  let mostrado = 0, anim = 0, primeira = true;
  function contar(alvo) {
    cancelAnimationFrame(anim);
    const de = mostrado, t0 = performance.now(), dur = reduzir || primeira ? 0 : 500;
    primeira = false;
    const passo = (t) => {
      const k = dur ? Math.min(1, (t - t0) / dur) : 1, e = 1 - Math.pow(1 - k, 3);
      mostrado = de + (alvo - de) * e;
      sai("mes").textContent = moeda.format(Math.round(mostrado));
      if (k < 1) anim = requestAnimationFrame(passo);
    };
    anim = requestAnimationFrame(passo);
  }

  const qHoje = $('[data-q="hoje"]', raiz), qAtlas = $('[data-q="atlas"]', raiz);
  function quadros(el, n, base) {
    let h = "";
    for (let i = 0; i < n; i++) h += `<i class="${i >= base ? "novo" : ""}" style="--i:${i}"></i>`;
    el.innerHTML = h;
  }

  function atualizar() {
    const v = { leads: ler("leads"), ticket: ler("ticket"), fechamento: ler("fechamento"), melhora: ler("melhora") };
    const r = calcular(v);
    sai("leads").textContent = num.format(v.leads);
    sai("ticket").textContent = moeda.format(v.ticket);
    sai("fechamento").textContent = num.format(v.fechamento) + "%";
    sai("melhora").textContent = "+" + num.format(v.melhora) + "%";
    sai("vhoje").textContent = num.format(r.hoje) + (r.hoje === 1 ? " venda" : " vendas");
    sai("vatlas").textContent = num.format(r.atlas) + (r.atlas === 1 ? " venda" : " vendas");
    sai("ano").textContent = moeda.format(Math.round(r.ano)) + " em um ano";
    // até 40 quadrados por linha: cada um vale 1 venda ou mais
    const unidade = Math.max(1, Math.ceil(r.atlas / 40));
    const nh = Math.round(r.hoje / unidade), na = Math.max(nh, Math.round(r.atlas / unidade));
    quadros(qHoje, nh, nh);
    quadros(qAtlas, na, nh);
    sai("escala").textContent = unidade === 1 ? "Cada quadrado é 1 venda por mês." : `Cada quadrado são ${num.format(unidade)} vendas por mês.`;
    sai("leitor").textContent = `Hoje: ${num.format(r.hoje)} vendas por mês. Com o Atlas: ${num.format(r.atlas)}. Venda que fica na mesa: ${moeda.format(Math.round(r.mes))} por mês e ${moeda.format(Math.round(r.ano))} em um ano.`;
    for (const n of ["leads", "ticket", "fechamento", "melhora"]) {
      const el = ent(n);
      el.style.setProperty("--p", ((el.value - el.min) / (el.max - el.min)) * 100 + "%");
      el.setAttribute("aria-valuetext", sai(n).textContent);
    }
    contar(r.mes);
  }
  raiz.addEventListener("input", atualizar);
  // só monta quando a seção chega perto da tela: nada disso pesa na abertura da página
  if (!("IntersectionObserver" in window)) atualizar();
  else {
    const perto = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { perto.disconnect(); atualizar(); } }, { rootMargin: "900px 0px" });
    perto.observe(raiz);
  }
})();
