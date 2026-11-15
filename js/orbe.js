// Atlas Orbit em partículas (Canvas 2D). Usado no hero e na ilha.
// Esfera de pontos em anéis de latitude, deformada por ondas senoidais,
// que segue o mouse com inércia e incha na direção do cursor.
// Cores do Orbit: navy -> azul -> branco azulado. Sem roxo.

const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;

// cores por faixa de brilho (de trás para frente)
const FAIXAS = [
  { cor: "rgb(190 210 244)", alfa: 0.5 },  // branco azulado (fundo da esfera)
  { cor: "rgb(150 184 240)", alfa: 0.6 },  // azul gelo
  { cor: "rgb(96 146 236)", alfa: 0.75 },  // azul claro
  { cor: "rgb(47 103 214)", alfa: 0.88 },  // azul Orbit
  { cor: "rgb(36 64 128)", alfa: 0.85 },   // navy médio
  { cor: "rgb(30 43 71)", alfa: 0.88 },    // navy (frente, cristas)
];

function gerarPontos(lat, lon) {
  const xs = [];
  for (let i = 0; i < lat; i++) {
    const th = Math.PI * (i + 0.5) / lat;
    const n = Math.max(6, Math.round(Math.sin(th) * lon));
    const off = i * 0.37;
    for (let j = 0; j < n; j++) {
      const ph = (Math.PI * 2 * j) / n + off;
      xs.push(Math.sin(th) * Math.cos(ph), Math.cos(th), Math.sin(th) * Math.sin(ph));
    }
  }
  return new Float32Array(xs);
}

function spriteBrilho() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  r.addColorStop(0, "rgba(79,132,230,.9)");
  r.addColorStop(0.3, "rgba(79,132,230,.35)");
  r.addColorStop(1, "rgba(79,132,230,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 64, 64);
  return c;
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{lat?:number, lon?:number, raio?:number, mouse?:boolean, ponto?:number, giro?:number, aoQuadro?:(m:{x:number,y:number})=>void}} op
 */
export function criarOrbe(canvas, op = {}) {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return { acordar() {}, destruir() {} };
  const fino = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const pequeno = innerWidth < 700;
  const lat = op.lat ?? (pequeno ? 38 : 56);
  const lon = op.lon ?? (pequeno ? 110 : 160);
  const P = gerarPontos(lat, lon);
  const N = P.length / 3;
  const raioRel = op.raio ?? 0.36;
  const tamPonto = op.ponto ?? 1;
  const giroBase = op.giro ?? 1;
  const usaMouse = op.mouse !== false;
  const dprMax = pequeno ? 1.5 : 2;

  // buffers por faixa (x, y, tamanho)
  const nf = FAIXAS.length;
  const buf = FAIXAS.map(() => new Float32Array(N * 3));
  const cont = new Int32Array(nf);
  const sprite = spriteBrilho();

  let W = 0, H = 0, dpr = 1;
  let t = Math.random() * 10, ultimo = 0, raf = 0, visivel = false, ativo = !document.hidden, pausado = false;
  const alvo = { x: 0, y: 0 }, suave = { x: 0, y: 0 }, antes = { x: 0, y: 0 };
  let morphBase = 0.09, morph = 0.09, morphAlvo = 0.09, giro = giroBase, giroAlvo = giroBase, puxa = 0, rolar = 0;

  function medir() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, dprMax);
    W = Math.max(1, Math.round(r.width * dpr));
    H = Math.max(1, Math.round(r.height * dpr));
    canvas.width = W; canvas.height = H;
    if (RM || !visivel) desenhar(0);
  }

  function desenhar(dt) {
    t += dt * giro;
    // inércia do mouse (ou deriva lenta no toque)
    if (usaMouse && !fino) { alvo.x = Math.sin(t * 0.21) * 0.55; alvo.y = Math.cos(t * 0.17) * 0.4; }
    suave.x += (alvo.x - suave.x) * 0.05;
    suave.y += (alvo.y - suave.y) * 0.05;
    const vel = Math.hypot(suave.x - antes.x, suave.y - antes.y);
    antes.x = suave.x; antes.y = suave.y;
    if (usaMouse) morphAlvo = Math.max(morphAlvo, morphBase + Math.min(0.11, vel * 9));
    morph += (morphAlvo - morph) * 0.06;
    morphAlvo += (morphBase - morphAlvo) * 0.03;
    giro += (giroAlvo - giro) * 0.08;
    puxa += ((usaMouse ? Math.min(1, Math.hypot(suave.x, suave.y) * 1.4) : 0) - puxa) * 0.05;
    if (op.aoQuadro) op.aoQuadro(suave);

    const yaw = t * 0.2 + suave.x * 0.5, pitch = -0.25 + suave.y * 0.35;
    const cy0 = Math.cos(yaw), sy0 = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const R = Math.min(W, H) * raioRel;
    const cx = W / 2 + suave.x * 30 * dpr, cy = H / 2 + suave.y * 22 * dpr - rolar * 0.08 * H;
    // direção do cursor no espaço da tela (y para baixo, z para o leitor)
    let ux = suave.x, uy = suave.y, uz = 0.7;
    const ul = Math.hypot(ux, uy, uz); ux /= ul; uy /= ul; uz /= ul;
    const tt = t;
    cont.fill(0);

    for (let i = 0; i < N; i++) {
      const px = P[i * 3], py = P[i * 3 + 1], pz = P[i * 3 + 2];
      // ondas (deformação viva)
      const s = 0.4 * Math.sin(2.6 * (px + py * 0.6) + tt * 0.9)
              + 0.25 * Math.sin(4.3 * (py - pz * 0.7) + tt * 1.3)
              + 0.15 * Math.sin(6.7 * (pz + px * 0.4) - tt * 1.7)
              + 0.08 * Math.sin(9.1 * (px - py) + tt * 2.1);
      // rotação (yaw, depois pitch)
      const x1 = px * cy0 + pz * sy0;
      const z1 = -px * sy0 + pz * cy0;
      const y2 = py * cp - z1 * sp;
      const z2 = py * sp + z1 * cp;
      // incha na direção do cursor
      let d = x1 * ux + y2 * uy + z2 * uz; d = d > 0 ? d * d * d * d : 0;
      const r = 1 + morph * s + puxa * d * 0.16;
      const X = x1 * r, Y = y2 * r, Z = z2 * r;
      const k = 3.2 / (3.2 - Z);
      const prof = (Z + 1) * 0.5; // 0 atrás, 1 frente
      let b = prof * 0.78 + (s > 0 ? s * 0.45 : 0) + puxa * d * 0.5;
      let f = b < 0.3 ? 0 : b < 0.46 ? 1 : b < 0.62 ? 2 : b < 0.78 ? 3 : b < 0.93 ? 4 : 5;
      if (f > nf - 1) f = nf - 1;
      const o = cont[f]++ * 3, bf = buf[f];
      bf[o] = cx + X * R * k;
      bf[o + 1] = cy + Y * R * k;
      bf[o + 2] = (0.7 + prof * 1.5) * dpr * tamPonto * k;
    }

    ctx.clearRect(0, 0, W, H);
    for (let f = 0; f < nf; f++) {
      const n = cont[f], bf = buf[f];
      if (!n) continue;
      ctx.globalAlpha = FAIXAS[f].alfa;
      ctx.fillStyle = FAIXAS[f].cor;
      for (let j = 0; j < n; j++) {
        const o = j * 3, z = bf[o + 2];
        ctx.fillRect(bf[o] - z / 2, bf[o + 1] - z / 2, z, z);
      }
    }
    // brilho só nos realces (poucos, alfa baixo)
    const n5 = cont[nf - 1], b5 = buf[nf - 1];
    if (n5) {
      ctx.globalAlpha = 0.16;
      for (let j = 0; j < n5; j += 3) {
        const o = j * 3, z = b5[o + 2] * 5;
        ctx.drawImage(sprite, b5[o] - z / 2, b5[o + 1] - z / 2, z, z);
      }
    }
    ctx.globalAlpha = 1;
  }

  function quadro(agora) {
    raf = 0;
    if (!visivel || !ativo || RM || pausado) return;
    const dt = ultimo ? Math.min(0.05, (agora - ultimo) / 1000) : 0.016;
    ultimo = agora;
    desenhar(dt);
    raf = requestAnimationFrame(quadro);
  }
  function rodar() { if (!raf && visivel && ativo && !RM && !pausado) { ultimo = 0; raf = requestAnimationFrame(quadro); } }
  function parar() { if (raf) cancelAnimationFrame(raf); raf = 0; }

  const io = new IntersectionObserver(([e]) => { visivel = e.isIntersecting; visivel ? rodar() : parar(); }, { rootMargin: "120px" });
  io.observe(canvas);
  const ro = new ResizeObserver(medir);
  ro.observe(canvas);
  const aoVis = () => { ativo = !document.hidden; ativo ? rodar() : parar(); };
  document.addEventListener("visibilitychange", aoVis);
  const aoMover = (e) => { alvo.x = e.clientX / innerWidth * 2 - 1; alvo.y = e.clientY / innerHeight * 2 - 1; };
  if (usaMouse && fino) addEventListener("pointermove", aoMover, { passive: true });
  let ultimoScroll = scrollY;
  const aoRolar = () => {
    rolar = Math.min(1.2, scrollY / innerHeight);
    const v = Math.abs(scrollY - ultimoScroll); ultimoScroll = scrollY;
    if (usaMouse) morphAlvo = Math.max(morphAlvo, Math.min(0.2, 0.09 + v * 0.0006));
  };
  if (usaMouse) addEventListener("scroll", aoRolar, { passive: true });

  medir();
  desenhar(0);
  canvas.classList.add("pronto");

  return {
    /** acorda o orbe (hover da ilha): mais deformação e giro mais rápido */
    acordar(sim) {
      morphBase = sim ? 0.22 : 0.09; morphAlvo = morphBase;
      giroAlvo = sim ? giroBase * 2.2 : giroBase;
      if (sim) puxa = 0;
      if (RM) desenhar(0);
    },
    /** pausa e retoma o movimento (botão de pausa do hero) */
    pausar(sim) { pausado = sim; sim ? parar() : rodar(); },
    destruir() {
      parar(); io.disconnect(); ro.disconnect();
      document.removeEventListener("visibilitychange", aoVis);
      removeEventListener("pointermove", aoMover);
      removeEventListener("scroll", aoRolar);
    },
  };
}
