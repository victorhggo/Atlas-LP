// Atlas Orbit: a esfera real do sistema (pacote prism-orb, MIT, em js/vendor/prism-orb/).
// Mesma paleta clara ("tarde", o azul da marca) e os mesmos AJUSTES de Atlas/web/components/orbit-esfera.ts.
// Um renderizador WebGL só para o hero e para a ilha (o pacote divide um contexto entre todas as esferas
// e pausa as que saem da tela). Este módulo só é carregado depois do primeiro desenho, em tempo ocioso.
//
// Mouse no hero: a esfera se inclina e vem na direção do cursor com inércia de mola, a luz do vidro segue
// o ponteiro e o fluxo de cor corre para o lado do cursor. Quanto mais rápido o mouse, mais a luz se
// divide (dispersão) e mais o fluxo acelera. Em cima da esfera ela "escuta" (ondas para dentro, no ritmo
// do movimento). Um clique faz ela "pensar" e depois "responder". Sem mouse, ela deriva sozinha, devagar.

import { createOrb, orbRenderer } from "./vendor/prism-orb/prism-orb.min.js";

const s = (l, c, h) => ({ l, c, h });
export const PALETA = [s(0.96, 0.05, 210), s(0.84, 0.13, 224), s(0.68, 0.19, 246), s(0.56, 0.21, 258)];
export const AJUSTES = { speed: 0.85, flow: 0.55, softness: 0.7, dispersion: 0.55, grain: 0.12, rim: 0.55, rimSoftness: 0.55, whiteSpread: 0.35, toneMap: 0.75, vignette: 0.08 };

orbRenderer.setDprCap(matchMedia("(max-width: 700px)").matches ? 1.25 : 1.5);
export const suportado = () => orbRenderer.isSupported();

const limitar = (v, a, b) => (v < a ? a : v > b ? b : v);
/* só troca o quadro parado pela esfera viva quando ela já desenhou de verdade
   (o shader compila em paralelo e pode levar alguns quadros) */
function quandoDesenhar(canvas, fn) {
  const amostra = document.createElement("canvas");
  amostra.width = amostra.height = 1;
  const ctx = amostra.getContext("2d", { willReadFrequently: true });
  let tentativas = 0;
  const checar = () => {
    if (++tentativas > 120) return; // ~30 s sem desenhar: fica o quadro parado
    const w = canvas.width;
    if (w > 2 && ctx) {
      ctx.clearRect(0, 0, 1, 1);
      ctx.drawImage(canvas, w >> 1, w >> 1, 1, 1, 0, 0, 1, 1);
      if (ctx.getImageData(0, 0, 1, 1).data[3] > 0) return fn();
    }
    setTimeout(checar, 250);
  };
  setTimeout(checar, 120);
}

/** mola amortecida (um eixo): segue o alvo com inércia e um leve passo além */
function mola(rigidez = 90, amortece = 0.72) {
  const c = 2 * Math.sqrt(rigidez) * amortece;
  return { x: 0, v: 0, alvo: 0, passo(dt) { this.v += (rigidez * (this.alvo - this.x) - c * this.v) * dt; this.x += this.v * dt; return this.x; } };
}

/**
 * A esfera grande do hero.
 * @param {HTMLElement} cena  .orbit (com .orbit-corpo e canvas.orbit-vivo dentro)
 */
export function orbitHero(cena) {
  const vivo = cena.querySelector(".orbit-vivo");
  const fino = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const orb = createOrb(vivo, { palette: PALETA, params: AJUSTES, audio: "simulated", seed: 7, transitionSpeed: 0.9, fps: fino ? 60 : 30 });
  vivo.removeAttribute("role"); vivo.removeAttribute("aria-label"); // decorativa: a cena já é aria-hidden
  quandoDesenhar(vivo, () => { if (!pausado) cena.classList.add("vivo"); });

  const rx = mola(), ry = mola(), tx = mola(70), ty = mola(70);
  const p = { x: 0, y: 0, tem: false, ultimo: 0, vel: 0 };
  let energia = 0, prox = 0, t = Math.random() * 10, ant = 0, raf = 0, visivel = true, pausado = false, ativo = !document.hidden;
  let estado = "idle", sequencia = 0, ultimoSet = 0, enviado = "";
  const nivel = () => limitar(0.22 + energia * 0.85, 0, 1);

  function aplicarEstado(novo) {
    if (novo === estado) return;
    estado = novo;
    orb.set({ state: novo, level: novo === "listening" ? nivel : undefined });
  }

  function quadro(agora) {
    raf = 0;
    if (!visivel || !ativo || pausado) return;
    const dt = ant ? Math.min(0.05, (agora - ant) / 1000) : 1 / 60;
    ant = agora; t += dt;
    const r = cena.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2, R = r.width / 2;
    const parado = !p.tem || agora - p.ultimo > 3200;
    let nx, ny;
    if (parado) {
      // sem cursor: deriva lenta, como se olhasse em volta
      nx = Math.sin(t * 0.32) * 0.34; ny = Math.cos(t * 0.23) * 0.22;
      prox += (0 - prox) * 0.04;
    } else {
      const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy);
      nx = limitar(dx / (innerWidth * 0.5), -1, 1); ny = limitar(dy / (innerHeight * 0.5), -1, 1);
      prox += (limitar(1 - (d - R * 0.9) / (R * 2.6), 0, 1) - prox) * 0.12;
    }
    // energia: sobe rápido com a velocidade do ponteiro, cai devagar
    const alvoE = limitar(p.vel / 2600, 0, 1);
    energia += (alvoE - energia) * (alvoE > energia ? 0.22 : 0.035);
    p.vel *= 0.86;

    ry.alvo = nx * 18; rx.alvo = -ny * 13; tx.alvo = nx * 26; ty.alvo = ny * 16;
    const s1 = ry.passo(dt), s2 = rx.passo(dt), s3 = tx.passo(dt), s4 = ty.passo(dt);
    const st = cena.style;
    st.setProperty("--ry", s1.toFixed(2) + "deg");
    st.setProperty("--rx", s2.toFixed(2) + "deg");
    st.setProperty("--tx", s3.toFixed(1) + "px");
    st.setProperty("--ty", s4.toFixed(1) + "px");
    st.setProperty("--lx", (50 + nx * 30).toFixed(1) + "%");
    st.setProperty("--ly", (34 + ny * 26).toFixed(1) + "%");
    st.setProperty("--brilho", (prox * 0.6 + energia * 0.5).toFixed(3));

    // o shader acompanha a 12 Hz (o pacote suaviza cada mudança com as molas dele)
    if (agora - ultimoSet > 80) {
      ultimoSet = agora;
      const ang = (Math.atan2(-ny, nx) * 180) / Math.PI;
      const params = {
        ...AJUSTES,
        direction: Math.round((ang + 360) % 360),
        drift: +(0.2 + prox * 0.55 + energia * 0.15).toFixed(2),
        flow: +(0.55 + energia * 0.28).toFixed(2),
        speed: +(0.85 + energia * 1.3 + prox * 0.35).toFixed(2),
        dispersion: +(0.55 + energia * 0.4).toFixed(2),
        intensity: +(1 + energia * 0.3).toFixed(2),
        rim: +(0.55 + prox * 0.25).toFixed(2),
      };
      const chave = JSON.stringify(params);
      if (chave !== enviado) { enviado = chave; orb.set({ params }); }
      if (!sequencia) aplicarEstado(prox > 0.82 && !parado ? "listening" : "idle");
    }
    raf = requestAnimationFrame(quadro);
  }
  const rodar = () => { if (!raf && visivel && ativo && !pausado) { ant = 0; raf = requestAnimationFrame(quadro); } };
  const parar = () => { if (raf) cancelAnimationFrame(raf); raf = 0; };

  const mover = (e) => {
    const agora = performance.now();
    if (p.tem) {
      const dt = Math.max(8, agora - p.ultimo);
      const v = (Math.hypot(e.clientX - p.x, e.clientY - p.y) / dt) * 1000;
      p.vel = Math.max(p.vel * 0.6, v);
    }
    p.x = e.clientX; p.y = e.clientY; p.tem = true; p.ultimo = agora;
  };
  if (fino) addEventListener("pointermove", mover, { passive: true });
  document.documentElement.addEventListener("pointerleave", () => { p.tem = false; });

  // clique (ou toque) na esfera: pensa e depois responde
  const conversar = (e) => {
    const r = cena.getBoundingClientRect();
    if (Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)) > r.width * 0.55) return;
    clearTimeout(sequencia);
    energia = Math.max(energia, 0.6);
    aplicarEstado("thinking");
    sequencia = setTimeout(() => {
      aplicarEstado("speaking");
      sequencia = setTimeout(() => { sequencia = 0; aplicarEstado("idle"); }, 2600);
    }, 1300);
  };
  cena.addEventListener("pointerdown", conversar);

  const io = new IntersectionObserver(([e]) => { visivel = e.isIntersecting; visivel ? rodar() : parar(); });
  io.observe(cena);
  const aoVis = () => { ativo = !document.hidden; ativo ? rodar() : parar(); };
  document.addEventListener("visibilitychange", aoVis);
  rodar();

  return {
    /** botão de pausa do hero: para o WebGL (some da tela, o renderizador para) e volta ao quadro parado */
    pausar(sim) {
      pausado = sim;
      vivo.style.display = sim ? "none" : "";
      cena.classList.toggle("vivo", !sim);
      sim ? parar() : rodar();
    },
    destruir() {
      parar(); io.disconnect(); orb.destroy();
      removeEventListener("pointermove", mover);
      document.removeEventListener("visibilitychange", aoVis);
    },
  };
}

/**
 * A mesma esfera em miniatura na ilha de baixo (30 fps, o pacote já limita abaixo de 48px).
 * @param {HTMLElement} moldura  .ilha-orbe-moldura (com canvas.orbit-vivo)
 */
export function orbitIlha(moldura) {
  const vivo = moldura.querySelector(".orbit-vivo");
  const orb = createOrb(vivo, { palette: PALETA, params: { ...AJUSTES, speed: 0.7 }, audio: "simulated", seed: 3, fps: 30 });
  vivo.removeAttribute("role"); vivo.removeAttribute("aria-label");
  quandoDesenhar(vivo, () => moldura.classList.add("vivo"));
  return {
    /** hover/foco na ilha: o Orbit acorda e "fala" */
    acordar(sim) {
      orb.set({ state: sim ? "speaking" : "idle", params: { ...AJUSTES, speed: sim ? 1.1 : 0.7, intensity: sim ? 1.2 : 1 } });
    },
    pausar(sim) { vivo.style.display = sim ? "none" : ""; moldura.classList.toggle("vivo", !sim); },
  };
}
