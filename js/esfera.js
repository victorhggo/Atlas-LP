// A esfera do Atlas Orbit numa seção branca, só para demonstração (sem áudio).
// É a esfera real do sistema (prism-orb, mesma paleta e ajustes), gravada em vídeo: calma e agitada.
// Ao vivo em WebGL ela travava a rolagem no primeiro desenho; em vídeo é leve e igual.
// Com o mouse em cima ela se desfaz em partículas e fica agitada; quando o mouse sai, as partículas voltam e ela se refaz.
(() => {
  const palco = document.querySelector("[data-esfera]");
  if (!palco) return;
  const alvo = palco.querySelector(".esfera");
  const reduzir = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const video = (nome) => {
    const v = document.createElement("video");
    v.muted = true; v.loop = true; v.playsInline = true; v.preload = "none";
    v.setAttribute("muted", ""); v.setAttribute("playsinline", ""); v.setAttribute("aria-hidden", "true");
    v.poster = `video/orbe/${nome}.webp`; v.className = `esfera-video esfera-${nome}`;
    v.append(Object.assign(document.createElement("source"), { src: `video/orbe/${nome}.webm`, type: "video/webm" }),
      Object.assign(document.createElement("source"), { src: `video/orbe/${nome}.mp4`, type: "video/mp4" }));
    alvo.append(v); return v;
  };
  const calma = video("calmo"), agitada = video("agitado");
  new IntersectionObserver(([it]) => {
    if (reduzir) return;
    if (it.isIntersecting) { calma.preload = "auto"; agitada.preload = "auto"; calma.play().catch(() => {}); }
    else { calma.pause(); agitada.pause(); }
  }, { rootMargin: "300px 0px" }).observe(palco);

  // ---------- partículas que se soltam da esfera ----------
  const tela = palco.querySelector(".esfera-particulas");
  const ctx = tela.getContext("2d");
  const N = 420, CORES = ["#3DB4FF", "#007BFF", "#7C9BFF", "#9BD4FF", "#0062D6"];
  let pts = [], w = 0, h = 0, r = 0, dpr = 1, fora = 0, alvoFora = 0, mx = 0, my = 0, rodando = false;
  function medir() {
    const b = palco.getBoundingClientRect();
    dpr = Math.min(2, devicePixelRatio || 1); w = b.width; h = b.height;
    tela.width = w * dpr; tela.height = h * dpr; tela.style.width = `${w}px`; tela.style.height = `${h}px`;
    r = alvo.getBoundingClientRect().width / 2;
    pts = Array.from({ length: N }, (_, i) => {
      const a = Math.random() * Math.PI * 2, d = Math.sqrt(Math.random()) * r * 0.9;
      const ang = Math.random() * Math.PI * 2, longe = r * (1.25 + Math.random() * 1.1);
      return { hx: w / 2 + Math.cos(a) * d, hy: h / 2 + Math.sin(a) * d, fx: w / 2 + Math.cos(ang) * longe, fy: h / 2 + Math.sin(ang) * longe * 0.8,
        z: Math.random(), cor: CORES[i % CORES.length], t: Math.random() * 1000, x: 0, y: 0 };
    });
  }
  function quadro(t) {
    fora += (alvoFora - fora) * (alvoFora > fora ? 0.07 : 0.045);   // sai rápido, volta devagar
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    if (fora > 0.004) {
      const k = fora * fora * (3 - 2 * fora);
      for (const p of pts) {
        const dx = p.fx - mx, dy = p.fy - my, dist = Math.hypot(dx, dy) || 1, empurra = Math.max(0, 1 - dist / 220) * 60 * k;
        p.x = p.hx + (p.fx - p.hx) * k + (dx / dist) * empurra + Math.sin(t / 900 + p.t) * 10 * k;
        p.y = p.hy + (p.fy - p.hy) * k + (dy / dist) * empurra + Math.cos(t / 1100 + p.t) * 8 * k;
        ctx.globalAlpha = (0.35 + p.z * 0.65) * Math.min(1, k * 1.6);
        ctx.fillStyle = p.cor;
        ctx.beginPath(); ctx.arc(p.x, p.y, 0.8 + p.z * 2.2, 0, Math.PI * 2); ctx.fill();
      }
    }
    const k = Math.min(1, fora * 1.25);
    alvo.style.opacity = String(1 - k * 0.92);
    alvo.style.transform = `scale(${1 + k * 0.18})`;
    alvo.style.filter = `blur(${k * 14}px)`;
    if (Math.abs(alvoFora - fora) > 0.002 || fora > 0.004) requestAnimationFrame(quadro); else rodando = false;
  }
  const animar = () => { if (!rodando) { rodando = true; requestAnimationFrame(quadro); } };
  medir();
  addEventListener("resize", medir);
  if (reduzir) return;
  palco.addEventListener("pointerenter", () => {
    alvoFora = 1; palco.classList.add("desfeita"); animar();
    agitada.currentTime = 0; agitada.play().catch(() => {}); alvo.classList.add("agitada");
  });
  palco.addEventListener("pointermove", (e) => { const b = palco.getBoundingClientRect(); mx = e.clientX - b.left; my = e.clientY - b.top; });
  palco.addEventListener("pointerleave", () => {
    alvoFora = 0; palco.classList.remove("desfeita"); animar();
    alvo.classList.remove("agitada"); setTimeout(() => { if (!palco.classList.contains("desfeita")) agitada.pause(); }, 900);
  });
})();
