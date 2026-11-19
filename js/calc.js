// Atlas: calculadora de custo da prospecção manual (#calculadora). Tudo roda na página; nada é enviado.
const raiz = document.querySelector("[data-calc]");
if (raiz) {
  // médias usadas na conta (explicadas na nota abaixo da calculadora)
  const DIAS_UTEIS = 22, LIG_HORA = 12, LIG_CONVERSA = 19, CONVERSAS_REUNIAO = 3, ATLAS_DEVOLVE = 0.9;
  const form = raiz.querySelector("[data-calc-form]");
  const brl = (n) => "R$ " + Math.round(n).toLocaleString("pt-BR");
  const brlCurto = (n) => {
    if (n >= 1e6) return "R$ " + (n / 1e6).toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + (n >= 2e6 ? " milhões" : " milhão");
    if (n >= 1e4) return "R$ " + Math.round(n / 1e3).toLocaleString("pt-BR") + " mil";
    return brl(n);
  };
  const int = (n) => Math.floor(n).toLocaleString("pt-BR");
  const saidas = {
    pessoas: (v) => String(v),
    horas: (v) => v.toLocaleString("pt-BR") + " h",
    custo: brl,
    ticket: brl,
    fecha: (v) => `${v} de 10`,
  };

  const pintar = (chave, texto) => {
    const el = raiz.querySelector(`[data-calc="${chave}"]`);
    if (!el || el.textContent === texto) return;
    el.textContent = texto;
    el.classList.remove("calc-mudou");
    void el.offsetWidth;
    el.classList.add("calc-mudou");
  };

  const calcular = () => {
    const v = {};
    for (const input of form.querySelectorAll("input[type=range]")) {
      const n = Number(input.value);
      v[input.name] = n;
      input.style.setProperty("--p", ((n - input.min) / (input.max - input.min)) * 100 + "%");
      const txt = saidas[input.name](n);
      form.querySelector(`[data-calc-saida="${input.name}"]`).textContent = txt;
      input.setAttribute("aria-valuetext", txt);
    }
    const horasMes = v.pessoas * v.horas * DIAS_UTEIS;
    const custoHoras = v.pessoas * v.custo * (v.horas / 8);
    const devolvidas = horasMes * ATLAS_DEVOLVE;
    const conversas = Math.floor((devolvidas * LIG_HORA) / LIG_CONVERSA);
    const reunioes = Math.floor(conversas / CONVERSAS_REUNIAO);
    const vendas = reunioes * (v.fecha / 10) * v.ticket;
    const total = custoHoras + vendas;
    const dias = Math.max(1, Math.round(horasMes / 8));

    pintar("horasMes", int(horasMes) + " h");
    pintar("dias", dias === 1 ? "1 dia de trabalho inteiro" : `${int(dias)} dias de trabalho inteiros`);
    pintar("custoHoras", brl(custoHoras));
    pintar("conversas", int(conversas));
    pintar("reunioes", int(reunioes));
    pintar("vendas", brl(vendas));
    pintar("total", brl(total));
    pintar("ano", brlCurto(total * 12));
    pintar("devolvidas", int(devolvidas) + " h");
  };

  form.addEventListener("submit", (e) => e.preventDefault());
  form.addEventListener("input", calcular);
  calcular();
}
