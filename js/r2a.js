// Atlas: rodada 2, parte 2A. Player do vídeo "Como funciona", áreas com os clipes reais,
// jornada de três perguntas, "Por dentro do Atlas", mapa do AtlasLike (home e /atlaslike/)
// e as correções do botão de pausa do hero e da ilha sobre o vídeo.
// Regras: nada de vídeo antes da hora (0 bytes até chegar perto ou até o clique), só toca o que
// está visível, para com a aba oculta, respeita "menos movimento" e o botão de pausa do hero.

const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const ver = (el, fn, op = {}) => {
  const io = new IntersectionObserver((es) => es.forEach((e) => fn(e, io)), op);
  io.observe(el);
  return io;
};
const pausado = () => document.documentElement.classList.contains("mov-pausado");
const mmss = (t) => {
  t = Math.max(0, Math.floor(t || 0));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
};
const guardar = (k, v) => { try { localStorage.setItem(k, v); } catch { /* sem armazenamento: segue */ } };
const ler = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const largo = () => !matchMedia("(max-width: 760px)").matches && !navigator.connection?.saveData;
const fontes = (v, base) => {
  // WebM primeiro na tela grande; no celular só o MP4 de 720 (mais leve e com decodificador de hardware)
  const lista = largo() ? [[`${base}.webm`, "video/webm"], [`${base}.mp4`, "video/mp4"]] : [[`${base}-720.mp4`, "video/mp4"]];
  v.replaceChildren(...lista.map(([src, type]) => Object.assign(document.createElement("source"), { src, type })));
  v.load();
};
// troca de texto com uma pequena subida (reinicia a animação)
const trocar = (el) => { if (RM || !el) return; el.classList.remove("troca"); void el.offsetWidth; el.classList.add("troca"); };

/* ---------- correção A: o botão "Pausar animação" só aparece enquanto o hero está na tela ---------- */
const hero = $("[data-hero]");
const heroPausa = $("[data-pausa]");
if (hero && heroPausa) {
  ver(hero, (e) => heroPausa.classList.toggle("r2-fora", e.intersectionRatio < 0.35), { threshold: [0, 0.35, 0.6] });
}

/* ==========================================================================
   8. Player "Como o Atlas funciona"
   ========================================================================== */
const vsl = $("[data-vsl]");
if (vsl) {
  const tela = $("[data-vsl-tela]", vsl);
  const v = $("video", vsl);
  const play = $("[data-vsl-play]", vsl);
  const rotulo = $("[data-vsl-rotulo]", vsl);
  const sub = $("[data-vsl-sub]", vsl);
  const bAlt = $("[data-vsl-alternar]", vsl);
  const bSom = $("[data-vsl-som]", vsl);
  const bCheia = $("[data-vsl-cheia]", vsl);
  const barra = $("[data-vsl-barra]", vsl);
  const agoraTxt = $("[data-vsl-agora]", vsl);
  const capsLi = $$("[data-caps] li", vsl);
  const caps = capsLi.map((li) => $("button", li));
  const legenda = $("[data-caps-legenda]", vsl);
  const legendaBase = legenda.textContent;
  const marcas = caps.map((b) => Number(b.dataset.t));
  const DUR = 98.6;
  const CHAVE = "atlas-vsl-t";
  let carregado = false, arrastando = false, tOcioso = 0, capAtual = -1, naTela = false;

  // retomar: se a pessoa já assistiu parte, o botão oferece continuar de onde parou
  const salvo = Number(ler(CHAVE) || 0);
  if (salvo > 5 && salvo < DUR - 4) {
    rotulo.textContent = `Continuar de ${mmss(salvo)}`;
    sub.textContent = "Ou toque numa etapa abaixo para escolher outra";
  }

  const carregar = () => {
    if (carregado) return;
    carregado = true;
    const lista = largo()
      ? [[v.dataset.webm, "video/webm"], [v.dataset.mp4, "video/mp4"]]
      : [[v.dataset.mp4P, "video/mp4"]];
    v.replaceChildren(...lista.map(([src, type]) => Object.assign(document.createElement("source"), { src, type })));
    v.load();
  };
  const irPara = (t) => {
    if (v.readyState >= 1) v.currentTime = t;
    else v.addEventListener("loadedmetadata", () => { v.currentTime = t; }, { once: true });
  };
  const ilha = () => document.documentElement.classList.toggle("vsl-ativo", naTela && !v.paused);
  const acordar = () => {
    vsl.classList.remove("ocioso");
    clearTimeout(tOcioso);
    if (!v.paused) tOcioso = setTimeout(() => vsl.classList.add("ocioso"), 2600);
  };
  const tocar = (t) => {
    carregar();
    vsl.classList.add("iniciado");
    if (typeof t === "number") irPara(t);
    else if (!v.currentTime && salvo > 5 && salvo < DUR - 4) irPara(salvo);
    v.muted = false;
    v.play().catch(() => { v.muted = true; vsl.classList.add("mudo"); v.play().catch(() => {}); });
    // se o player estiver embaixo da dobra, ele sobe para o centro antes de tocar (a ilha some no play)
    const r = tela.getBoundingClientRect();
    if (r.bottom > innerHeight - 8 || r.top < 0) tela.scrollIntoView({ block: "center", behavior: RM ? "auto" : "smooth" });
    bAlt.focus({ preventScroll: true });
    acordar();
  };
  const alternar = () => (v.paused ? (carregar(), v.play().catch(() => {})) : v.pause());

  play.addEventListener("click", () => tocar());
  caps.forEach((b) => b.addEventListener("click", () => tocar(Number(b.dataset.t))));
  bAlt.addEventListener("click", alternar);
  // no toque, o primeiro toque com a barra escondida só mostra os controles
  let toque = false;
  v.addEventListener("pointerdown", (e) => { toque = e.pointerType !== "mouse"; });
  v.addEventListener("click", () => {
    if (toque && vsl.classList.contains("ocioso")) { acordar(); return; }
    alternar();
  });
  bSom.addEventListener("click", () => { v.muted = !v.muted; });
  bCheia.addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else if (tela.requestFullscreen) tela.requestFullscreen().catch(() => {});
    else v.webkitEnterFullscreen?.(); // iPhone: só o vídeo entra em tela cheia
  });
  document.addEventListener("fullscreenchange", () => {
    const cheia = document.fullscreenElement === tela;
    vsl.classList.toggle("cheia", cheia);
    bCheia.setAttribute("aria-label", cheia ? "Sair da tela cheia" : "Tela cheia");
  });
  // teclado dentro do player: espaço/k alterna, m som, f tela cheia, setas pulam 5 s
  tela.addEventListener("keydown", (e) => {
    if (!vsl.classList.contains("iniciado") || e.target === barra && /Arrow|Home|End|Page/.test(e.key)) return;
    const k = e.key.toLowerCase();
    if (k === " " || k === "k") { if (e.target.tagName === "BUTTON" && k === " ") return; e.preventDefault(); alternar(); }
    else if (k === "m") v.muted = !v.muted;
    else if (k === "f") bCheia.click();
    else if (k === "arrowright") v.currentTime = Math.min(DUR, v.currentTime + 5);
    else if (k === "arrowleft") v.currentTime = Math.max(0, v.currentTime - 5);
    else return;
    acordar();
  });
  tela.addEventListener("pointermove", acordar, { passive: true });
  tela.addEventListener("focusin", acordar);

  // barra de progresso (input range nativo: teclado, toque e leitor de tela de graça)
  const pintarBarra = (t) => {
    barra.style.setProperty("--prog", `${(t / DUR) * 100}%`);
    barra.setAttribute("aria-valuetext", `${mmss(t)} de 1:38`);
  };
  barra.addEventListener("input", () => {
    arrastando = true;
    carregar();
    const t = Number(barra.value);
    pintarBarra(t);
    agoraTxt.textContent = mmss(t);
    irPara(t);
    acordar();
  });
  barra.addEventListener("change", () => { arrastando = false; });

  const marcarCap = (t) => {
    let i = marcas.length - 1;
    while (i > 0 && t < marcas[i]) i--;
    capsLi.forEach((li, k) => {
      const ini = marcas[k], fim = marcas[k + 1] ?? DUR;
      li.classList.toggle("agora", k === i);
      li.classList.toggle("visto", k < i);
      li.style.setProperty("--p", k === i ? Math.min(1, (t - ini) / (fim - ini)).toFixed(3) : k < i ? "1" : "0");
      if (k === i) caps[k].setAttribute("aria-current", "step"); else caps[k].removeAttribute("aria-current");
    });
    if (i !== capAtual) {
      capAtual = i;
      legenda.textContent = `${caps[i].querySelector(".cap-nome").textContent}: ${caps[i].dataset.txt}`;
      trocar(legenda);
      // no celular a régua rola sozinha até a etapa atual
      const ol = capsLi[0].parentElement;
      if (ol.scrollWidth > ol.clientWidth + 4) ol.scrollTo({ left: capsLi[i].offsetLeft - ol.clientWidth / 2 + capsLi[i].offsetWidth / 2, behavior: RM ? "auto" : "smooth" });
    }
  };
  let ultimoSalvo = 0;
  v.addEventListener("timeupdate", () => {
    const t = v.currentTime;
    if (!arrastando) { barra.value = String(t); pintarBarra(t); }
    agoraTxt.textContent = mmss(t);
    marcarCap(t);
    if (Math.abs(t - ultimoSalvo) > 2) { ultimoSalvo = t; guardar(CHAVE, t.toFixed(1)); }
  });
  v.addEventListener("play", () => { vsl.classList.remove("pausado"); bAlt.setAttribute("aria-label", "Pausar o vídeo"); ilha(); acordar(); });
  v.addEventListener("pause", () => { vsl.classList.add("pausado"); bAlt.setAttribute("aria-label", "Continuar o vídeo"); ilha(); acordar(); });
  v.addEventListener("volumechange", () => {
    vsl.classList.toggle("mudo", v.muted);
    bSom.setAttribute("aria-label", v.muted ? "Ligar o som" : "Tirar o som");
  });
  v.addEventListener("ended", () => {
    guardar(CHAVE, "0");
    vsl.classList.remove("iniciado", "ocioso");
    if (document.fullscreenElement) document.exitFullscreen?.();
    rotulo.textContent = "Assistir de novo";
    sub.textContent = "Ou fale com a gente e veja com o seu nicho";
    capsLi.forEach((li) => { li.classList.remove("agora"); li.classList.add("visto"); li.style.removeProperty("--p"); });
    caps.forEach((b) => b.removeAttribute("aria-current"));
    legenda.textContent = legendaBase; capAtual = -1;
    v.currentTime = 0;
    play.focus({ preventScroll: true });
  });

  // a pré-visualização da etapa: passar o mouse mostra o que acontece nela
  caps.forEach((b) => {
    b.addEventListener("pointerenter", (e) => {
      if (e.pointerType !== "mouse" || vsl.classList.contains("iniciado")) return;
      legenda.textContent = `${b.querySelector(".cap-nome").textContent}: ${b.dataset.txt}`;
      trocar(legenda);
    });
  });
  $("[data-caps]", vsl).addEventListener("pointerleave", () => {
    if (!vsl.classList.contains("iniciado")) { legenda.textContent = legendaBase; trocar(legenda); }
  });

  // fora da tela: pausa; na tela tocando: a ilha de baixo sai da frente (correção B)
  ver(tela, (e) => {
    naTela = e.isIntersecting;
    if (!naTela && !v.paused && !document.fullscreenElement) v.pause();
    ilha();
  }, { threshold: 0.25 });
  document.addEventListener("visibilitychange", () => { if (document.hidden && !v.paused) v.pause(); });
  // um pulso (duas voltas) quando o player aparece pela primeira vez
  if (!RM) ver(tela, (e, io) => { if (e.isIntersecting) { vsl.classList.add("pulsar"); io.disconnect(); } }, { threshold: 0.6 });
}

/* ==========================================================================
   9. Áreas: um clipe por vez, a área ativa avança sozinha no fim do clipe
   ========================================================================== */
const dock = $("[data-ar-dock]");
const palcoAr = $("[data-ar-palco]");
if (dock && palcoAr) {
  const botoes = $$(".ar-app", dock);
  const v = $("[data-ar-video]", palcoAr);
  const capa = $("[data-ar-capa]", palcoAr);
  const url = $("[data-ar-url]", palcoAr);
  const legenda = $("[data-ar-legenda]");
  const titulo = $("[data-ar-titulo]", legenda);
  const txt = $("[data-ar-txt]", legenda);
  let atual = 0, perto = false, visivel = false, montado = false, raf = 0;

  const progresso = () => {
    raf = 0;
    if (v.duration) botoes[atual].querySelector(".ar-prog").style.setProperty("--p", (v.currentTime / v.duration).toFixed(3));
    if (!v.paused) raf = requestAnimationFrame(progresso);
  };
  const tentarTocar = () => {
    if (!montado || RM || !visivel || document.hidden || pausado()) return;
    v.play().then(() => { if (!raf) raf = requestAnimationFrame(progresso); }).catch(() => {});
  };
  const montar = (i) => {
    const area = botoes[i].dataset.area;
    v.classList.remove("rodando");
    fontes(v, `video/r2/${area}`);
    montado = true;
    tentarTocar();
  };
  v.addEventListener("playing", () => v.classList.add("rodando"));
  v.addEventListener("ended", () => ativar((atual + 1) % botoes.length, false));

  const ativar = (i, doUsuario) => {
    const b = botoes[i];
    botoes.forEach((x, k) => {
      x.setAttribute("aria-pressed", String(k === i));
      if (k !== i) x.querySelector(".ar-prog").style.setProperty("--p", "0");
    });
    atual = i;
    capa.src = `video/r2/${b.dataset.area}.webp`;
    url.textContent = b.dataset.url;
    titulo.textContent = b.querySelector(".ar-nome").textContent;
    txt.textContent = b.nextElementSibling.textContent;
    trocar(legenda);
    trocar(palcoAr);
    if (perto && !RM) montar(i);
    if (doUsuario && !RM && innerWidth <= 960) {
      // no celular a janela fica acima do dock: garante que ela esteja à vista
      const r = palcoAr.getBoundingClientRect();
      if (r.top < 70) palcoAr.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  };
  botoes.forEach((b, i) => b.addEventListener("click", () => ativar(i, true)));
  // teclado: setas andam pelo dock
  dock.addEventListener("keydown", (e) => {
    const k = botoes.indexOf(document.activeElement);
    if (k < 0) return;
    const d = { ArrowRight: 1, ArrowDown: 4, ArrowLeft: -1, ArrowUp: -4 }[e.key];
    if (!d) return;
    e.preventDefault();
    botoes[(k + d + botoes.length) % botoes.length].focus();
  });
  // links do menu (#area-crm etc.) escolhem a área
  const doHash = () => {
    const i = botoes.findIndex((b) => `#${b.parentElement.id}` === location.hash);
    if (i >= 0) ativar(i, false);
  };
  addEventListener("hashchange", doHash);
  doHash();

  // carrega quando chega perto (600px) e toca só com metade da janela visível
  ver(palcoAr, (e) => {
    if (!e.isIntersecting || perto) return;
    perto = true;
    if (!RM) montar(atual);
  }, { rootMargin: "600px 0px" });
  ver(palcoAr, (e) => {
    visivel = e.isIntersecting;
    if (visivel) tentarTocar(); else v.pause();
  }, { threshold: 0.4 });
  document.addEventListener("visibilitychange", () => { if (document.hidden) v.pause(); else tentarTocar(); });
  document.addEventListener("atlas:pausa", (e) => { if (e.detail) v.pause(); else tentarTocar(); });
}

/* ==========================================================================
   10. Jornada: três perguntas, uma por vez
   ========================================================================== */
const jr = $("[data-jr]");
if (jr) {
  const qs = $$(".jr-q", jr);
  const passos = $$(".jr-passo", jr);
  const res = $("[data-jr-resultado]", jr);
  const rTitulo = $("[data-jr-r-titulo]", jr);
  const rTxt = $("[data-jr-r-txt]", jr);
  const voltar = $("[data-jr-voltar]", jr);
  const respostas = [null, null, null];
  const telas = [...qs, res];
  let atual = 0;
  jr.classList.add("jr-pronto");
  if (RM) jr.classList.add("calmo");

  // cada palavra do título vira um <span> para subir uma a uma (o texto continua igual para o leitor de tela)
  const quebrar = (el) => {
    const palavras = el.textContent.trim().split(/\s+/);
    el.replaceChildren(...palavras.flatMap((p, i) => {
      const s = Object.assign(document.createElement("span"), { className: "w", textContent: p });
      s.style.setProperty("--w", i);
      return i < palavras.length - 1 ? [s, " "] : [s];
    }));
    el.closest(".jr-q, .jr-resultado")?.style.setProperty("--n", palavras.length);
  };
  $$(".jr-txt", jr).forEach(quebrar);
  qs.forEach((q) => $$(".jr-op", q).forEach((op, i) => op.style.setProperty("--o", i)));

  const mostrar = (i, foco = true) => {
    const antes = telas[atual];
    if (antes !== telas[i] && !RM) {
      antes.classList.add("sai");
      setTimeout(() => antes.classList.remove("sai"), 320);
    }
    telas.forEach((t, k) => t.classList.toggle("agora", k === i));
    telas.forEach((t, k) => { t.inert = k !== i; });
    atual = i;
    passos.forEach((p, k) => {
      p.classList.toggle("agora", k === i);
      p.classList.toggle("feito", respostas[k] != null && k !== i);
    });
    voltar.hidden = i === 0 || i === telas.length - 1;
    const sg = $(".jr-seguir", jr); if (sg) sg.hidden = true;
    if (foco) {
      const alvo = i === telas.length - 1 ? res : $("input:checked", telas[i]) || $("input", telas[i]);
      setTimeout(() => alvo.focus({ preventScroll: true }), RM ? 0 : 280);
    }
  };
  res.hidden = false;
  mostrar(0, false);

  const AREAS = [
    ["encontrar quem decide", "O <b>Prospectar</b> traz a lista do seu nicho com o telefone do decisor de cada empresa, conferido antes de entrar no seu CRM."],
    ["voltar a falar com quem não respondeu", "As <b>Cadências</b> colocam o próximo toque na agenda sozinhas, por ligação, WhatsApp, e-mail, Instagram ou LinkedIn, e param quando o lead responde."],
    ["transformar conversa em reunião", "A <b>Inbox</b> junta WhatsApp, Instagram e e-mail ao lado da ficha, o <b>Flow</b> responde por você e a tela <b>Ligar</b> traz o roteiro pronto."],
  ];
  const fechar = () => {
    const pior = Math.min(...respostas);
    const k = respostas.indexOf(pior);
    if (pior >= 2) {
      rTitulo.textContent = "A sua semana já anda bem nas três.";
      rTxt.innerHTML = "Na demonstração, a gente mostra quanto do trabalho repetido de cada etapa o Atlas tira das suas mãos, com o seu nicho na tela.";
    } else {
      rTitulo.textContent = `A sua conta travou em ${AREAS[k][0]}.`;
      rTxt.innerHTML = `${AREAS[k][1]} Leve essa resposta para a demonstração.`;
    }
    quebrar(rTitulo);
    mostrar(telas.length - 1);
  };
  // com toque ou clique a resposta já leva à próxima; com as setas do teclado a pessoa escolhe com calma
  // e segue com Enter ou com o botão "Próxima pergunta" (as setas também marcam o rádio)
  let ultimoPonteiro = 0;
  jr.addEventListener("pointerdown", () => { ultimoPonteiro = performance.now(); }, true);
  const seguir = Object.assign(document.createElement("button"), { type: "button", className: "jr-voltar jr-seguir", textContent: "Próxima pergunta", hidden: true });
  voltar.after(seguir);
  const avancar = (i) => { seguir.hidden = true; i < qs.length - 1 ? mostrar(i + 1) : fechar(); };
  qs.forEach((q, i) => {
    q.addEventListener("change", (e) => {
      respostas[i] = Number(e.target.value);
      passos[i].classList.add("feito");
      if (performance.now() - ultimoPonteiro < 800) setTimeout(() => avancar(i), RM ? 0 : 240);
      else seguir.hidden = false;
    });
    q.addEventListener("keydown", (e) => { if (e.key === "Enter" && respostas[i] != null) { e.preventDefault(); avancar(i); } });
  });
  seguir.addEventListener("click", () => avancar(atual));
  voltar.addEventListener("click", () => mostrar(Math.max(0, atual - 1)));
  $("[data-jr-refazer]", jr).addEventListener("click", () => {
    respostas.fill(null);
    $$("input", jr).forEach((r) => { r.checked = false; });
    mostrar(0);
  });
}

/* ==========================================================================
   11. Por dentro do Atlas: o passeio numa janela, com capítulos clicáveis
   ========================================================================== */
const dentro = $("[data-dentro]");
if (dentro) {
  const v = $("[data-dentro-video]", dentro);
  const url = $("[data-dentro-url]", dentro);
  const bts = $$("[data-dentro-caps] button", dentro);
  const tempos = bts.map((b) => Number(b.dataset.t));
  const bPausa = $("[data-r2-pausa]");
  let montado = false, visivel = false, raf = 0, cap = -1, pausaLocal = false;

  const pintar = () => {
    raf = 0;
    const t = v.currentTime, dur = v.duration || 37.1;
    let i = tempos.length - 1;
    while (i > 0 && t < tempos[i]) i--;
    if (i !== cap) {
      cap = i;
      bts.forEach((b, k) => b.setAttribute("aria-current", String(k === i)));
      url.textContent = bts[i].dataset.url;
    }
    const fim = tempos[i + 1] ?? dur;
    bts[i].style.setProperty("--p", Math.min(1, (t - tempos[i]) / (fim - tempos[i])).toFixed(3));
    if (!v.paused) raf = requestAnimationFrame(pintar);
  };
  const tocar = () => {
    if (!montado || RM || !visivel || document.hidden || pausado() || pausaLocal) return;
    v.play().then(() => { if (!raf) raf = requestAnimationFrame(pintar); }).catch(() => {});
  };
  // pôster e vídeo só quando chega perto (o pôster de <video> baixaria logo no carregamento)
  ver(v, (e, io) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    v.poster = v.dataset.poster;
    if (RM) return; // menos movimento: só o pôster; os capítulos ainda funcionam no clique
    fontes(v, v.dataset.src);
    montado = true;
    tocar();
  }, { rootMargin: "500px 0px" });
  ver(v, (e) => { visivel = e.isIntersecting; if (visivel) tocar(); else v.pause(); }, { threshold: 0.35 });
  document.addEventListener("visibilitychange", () => { if (document.hidden) v.pause(); else tocar(); });
  bts.forEach((b, i) => b.addEventListener("click", () => {
    if (!montado) { fontes(v, v.dataset.src); montado = true; }
    const ir = () => { v.currentTime = tempos[i]; pintar(); };
    v.readyState >= 1 ? ir() : v.addEventListener("loadedmetadata", ir, { once: true });
    if (RM || pausaLocal || pausado()) v.pause(); // mostra o quadro da parte escolhida, parado
    else tocar();
  }));
  // "Pausar os vídeos": vale para esta seção e para as áreas (mesmo estado do botão do hero quando ele existe)
  const aplicar = (p) => {
    pausaLocal = p;
    bPausa?.setAttribute("aria-pressed", String(p));
    if (bPausa) bPausa.textContent = p ? "Retomar os vídeos" : "Pausar os vídeos";
    if (p) v.pause(); else tocar();
  };
  bPausa?.addEventListener("click", () => {
    const novo = bPausa.getAttribute("aria-pressed") !== "true";
    if (heroPausa && heroPausa.getAttribute("aria-pressed") !== String(novo)) heroPausa.click();
    else document.dispatchEvent(new CustomEvent("atlas:pausa", { detail: novo }));
  });
  document.addEventListener("atlas:pausa", (e) => aplicar(Boolean(e.detail)));
}

/* ==========================================================================
   12. Mapa do AtlasLike (home): os apps giram e a legenda acompanha um passo por vez
   ========================================================================== */
const alh = $("[data-alh]");
if (alh) {
  const nos = $$(".alh-no", alh);
  const bts = nos.map((n) => $("button", n));
  const leg = $("[data-alh-legenda]", alh);
  let atual = 0, timer = 0, visivel = false, segurando = false;
  const marcar = (i) => {
    atual = i;
    nos.forEach((n, k) => n.classList.toggle("on", k === i));
    leg.replaceChildren(
      Object.assign(document.createElement("b"), { textContent: $(".alh-nome", bts[i]).textContent }),
      Object.assign(document.createElement("span"), { textContent: bts[i].dataset.txt }),
    );
    trocar(leg);
  };
  const ciclo = () => {
    clearInterval(timer);
    if (RM || !visivel || segurando || document.hidden || pausado()) return;
    timer = setInterval(() => marcar((atual + 1) % nos.length), 3200);
  };
  marcar(0);
  if (!RM) alh.classList.add("anima");
  // o raio da órbita em pixels (cqi como reserva)
  const orbe = $(".alh-orbe", alh);
  new ResizeObserver(([e]) => orbe.style.setProperty("--raio", `${(e.contentRect.width * 0.42).toFixed(1)}px`)).observe(orbe);
  bts.forEach((b, i) => {
    b.addEventListener("click", () => { marcar(i); });
    b.addEventListener("pointerenter", () => { segurando = true; marcar(i); ciclo(); });
    b.addEventListener("pointerleave", () => { segurando = false; ciclo(); });
    b.addEventListener("focus", () => { segurando = true; marcar(i); ciclo(); });
    b.addEventListener("blur", () => { segurando = false; ciclo(); });
  });
  ver(alh, (e) => {
    visivel = e.isIntersecting;
    if (visivel) alh.classList.add("visto");
    alh.classList.toggle("parado", !visivel || document.hidden);
    ciclo();
  }, { threshold: 0.2 });
  document.addEventListener("visibilitychange", () => { alh.classList.toggle("parado", document.hidden || !visivel); ciclo(); });
  document.addEventListener("atlas:pausa", ciclo);
}

/* ---------- página /atlaslike/: a árvore entra em sequência e o realce percorre os passos ---------- */
const arvore = $("[data-arvore]");
if (arvore) {
  const nos = $$(".arvore-no", arvore);
  nos.forEach((n, k) => n.style.setProperty("--k", k));
  if (!RM) arvore.classList.add("r2-anima");
  let i = -1, timer = 0, visivel = false, dentroMouse = false;
  const passo = () => {
    i = (i + 1) % nos.length;
    arvore.classList.add("focado");
    nos.forEach((n, k) => n.classList.toggle("on", k === i));
    $$(".arvore-svg path", arvore).forEach((p, k) => p.classList.toggle("on", k === i));
  };
  const ciclo = () => {
    clearInterval(timer);
    if (RM || !visivel || dentroMouse || document.hidden || pausado()) return;
    timer = setInterval(passo, 2600);
  };
  arvore.addEventListener("pointerenter", () => { dentroMouse = true; ciclo(); });
  arvore.addEventListener("pointerleave", () => { dentroMouse = false; ciclo(); });
  ver(arvore, (e) => {
    visivel = e.isIntersecting;
    if (visivel) arvore.classList.add("r2-visto");
    ciclo();
  }, { threshold: 0.25 });
  document.addEventListener("visibilitychange", ciclo);
  document.addEventListener("atlas:pausa", ciclo);
}
