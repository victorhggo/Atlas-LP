// Troca de tema claro/escuro com a mesma varredura diagonal do Atlas (View Transitions).
// O tema inicial é aplicado pelo script inline do <head>, antes da primeira pintura.
const CHAVE = "atlas-lp-tema";
const html = document.documentElement;
const atual = () => (html.dataset.tema === "claro" ? "claro" : "escuro");

function aplicar(novo) {
  html.dataset.tema = novo;
  try { localStorage.setItem(CHAVE, novo); } catch {}
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", novo === "claro" ? "#F3F5F8" : "#0B1322");
  window.dispatchEvent(new CustomEvent("tema-mudou", { detail: novo }));
}

export function trocarTema(novo = atual() === "claro" ? "escuro" : "claro") {
  if (novo === atual()) return;
  const reduzir = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduzir) {
    html.classList.add("tema-trans");
    aplicar(novo);
    setTimeout(() => html.classList.remove("tema-trans"), 450);
    return;
  }
  html.classList.add("tema-varrendo");
  const t = document.startViewTransition(() => aplicar(novo));
  t.finished.finally(() => html.classList.remove("tema-varrendo"));
}
window.trocarTema = trocarTema;

for (const b of document.querySelectorAll("[data-trocar-tema]")) b.addEventListener("click", () => trocarTema());

// sem escolha salva, acompanha o sistema ao vivo
matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => {
  let salvo = null;
  try { salvo = localStorage.getItem(CHAVE); } catch {}
  if (!salvo) { html.dataset.tema = e.matches ? "claro" : "escuro"; window.dispatchEvent(new CustomEvent("tema-mudou", { detail: atual() })); }
});
