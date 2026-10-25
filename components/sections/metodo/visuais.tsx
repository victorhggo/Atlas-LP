"use client";

import { BotIcon, BrainIcon, CheckIcon, DatabaseIcon, MessageSquareTextIcon, PhoneIcon, SparklesIcon, TargetIcon } from "lucide-react";
import { useEffect, useState } from "react";

// Animações do Método ATLAS feitas em código: leves, nítidas e no tema da página (claro ou escuro).
// Dados de exemplo: ilustram como o sistema se comporta.

/** Passa de um passo ao outro em loop (para quando sai da tela, para não gastar bateria). */
function usePasso(total: number, ms: number, ativo: boolean) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!ativo) return;
    const t = setInterval(() => setI((x) => (x + 1) % total), ms);
    return () => clearInterval(t);
  }, [total, ms, ativo]);
  return i;
}

const Cursor = ({ style }: { style?: React.CSSProperties }) => (
  <svg className="mt-cursor" style={style} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d="M3 2l7.5 19 2.6-7.8L21 10.6z" fill="#fff" stroke="#111" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

// ---------- T: Agente Atlas + inteligência do nicho ----------
const ABAS = [
  { nome: "Perguntas", itens: ["Quantas faltas vocês têm por semana?", "Quanto do faturamento é particular?", "Como o paciente novo chega hoje?"] },
  { nome: "Objeções", itens: ["“Já tenho quem cuide disso” → Ótimo. Quantos particulares novos vieram no mês?", "“Agora não é o momento” → Então vamos ver só o custo das faltas."] },
  { nome: "O que convence", itens: ["Mostrar quanto cada falta custa no mês", "Caso de clínica do mesmo porte na região", "Agenda previsível com paciente particular"] },
  { nome: "Palavras", itens: ["Use: agenda cheia, paciente particular, previsibilidade", "Evite: lead, funil, disparo em massa"] },
];
export function VisualTecnologia({ ativo }: { ativo: boolean }) {
  const aba = usePasso(ABAS.length, 2600, ativo);
  return (
    <div className="mt-stack">
      <div className="mt-agente">
        <div className="mt-agente-brilho" />
        <div className="mt-agente-ico">
          <span className="mt-anel" /><span className="mt-anel r" />
          <BotIcon className="mt-robo" />
          <i className="mt-bola b1" /><i className="mt-bola b2" /><i className="mt-bola b3" />
        </div>
        <div className="mt-agente-txt">
          <div className="flex flex-wrap items-center gap-2"><b>Agente Atlas</b><span className="mt-selo">Inteligência Atlas</span></div>
          <p>Conecta dados, histórico e o estudo do nicho à próxima ação.</p>
          <div className="mt-agente-grade">
            <span><BrainIcon /> Estudo do nicho</span>
            <span><DatabaseIcon /> Dados conferidos</span>
            <span><MessageSquareTextIcon /> Script na tela</span>
            <span><TargetIcon /> Segmentação e ICP</span>
          </div>
        </div>
      </div>
      <div className="mt-nicho">
        <div className="mt-nicho-cab"><span className="mt-nicho-ico"><BrainIcon /></span><div><small>Inteligência do nicho</small><b>Saúde e clínicas</b></div></div>
        <div className="mt-abas">
          {ABAS.map((a, k) => <span key={a.nome} className={k === aba ? "on" : ""}>{a.nome}</span>)}
          <Cursor style={{ left: `calc(${aba * 25}% + 12.5% - 4px)` }} />
        </div>
        <ul key={aba} className="mt-nicho-lista">{ABAS[aba].itens.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
    </div>
  );
}

// ---------- L: Agente qualifica a ECCOS e move no CRM ----------
const CRITERIOS = ["Imobiliária em Uberlândia · MG", "Site, Instagram e Maps ativos", "Sócio decisor identificado", "Respondeu no WhatsApp"];
export function VisualLead({ ativo }: { ativo: boolean }) {
  const p = usePasso(8, 900, ativo); // 0 parado · 1-4 critérios · 5 MQL · 6-7 card movido
  const marcados = Math.min(Math.max(p, 0), 4);
  const mql = p >= 5, movido = p >= 6;
  const card = (
    <div className={`mt-kcard${mql ? " mql" : ""}${p >= 1 && p <= 4 ? " lendo" : ""}`}>
      <b>Eccos Gestão</b><small>Daniel · Sócio</small>
      <span className="mt-kcard-tags">{mql ? <em className="mt-mql"><SparklesIcon /> MQL · nota 92</em> : <em>Novo lead</em>}</span>
    </div>
  );
  return (
    <div className="mt-crm">
      <div className="mt-crm-quadro">
        {["Entrada de lista", "Lead qualificado", "Reunião marcada"].map((c, k) => (
          <div key={c} className={`mt-col${k === 1 && movido ? " recebe" : ""}`}>
            <span className="mt-col-nome">{c}</span>
            {k === 0 && !movido && card}
            {k === 1 && movido && card}
            <div className="mt-kcard vazio" /><div className="mt-kcard vazio" />
          </div>
        ))}
      </div>
      <div className="mt-analise">
        <div className="mt-analise-cab"><BotIcon /><b>Agente Atlas</b><span>{mql ? "Qualificado" : p ? "Analisando…" : "Aguardando"}</span></div>
        <ul>{CRITERIOS.map((c, k) => <li key={c} className={k < marcados ? "ok" : ""}><CheckIcon /> {c}</li>)}</ul>
        <p className={movido ? "on" : ""}>Movido para Lead qualificado, com o trecho que prova.</p>
      </div>
    </div>
  );
}

// ---------- A: semana estilo Google Agenda, com vendas em verde ----------
const DIAS = ["SEG 26", "TER 27", "QUA 28", "QUI 29", "SEX 30"];
type Ev = [number, number, number, string, "azul" | "roxo" | "laranja" | "ciano" | "venda"];
const EVENTOS: Ev[] = [
  [0, 8, 1, "Reunião · Clínica Sorrir", "azul"], [0, 10, 1.5, "Demo · Imob. Prime", "roxo"], [0, 13, 1, "Venda fechada · Agência Norte", "venda"], [0, 15, 1, "Reunião · Indústria Vale", "laranja"], [0, 18, 1, "Follow-up · Studio Lis", "ciano"],
  [1, 9, 1, "Reunião · Eccos Gestão", "azul"], [1, 11, 1, "Demo · Contábil Max", "roxo"], [1, 14, 1.5, "Venda fechada · Orto Prime", "venda"], [1, 16.5, 1, "Reunião · Saúde Mais", "laranja"], [1, 19, 1, "Reunião · Construtora RX", "azul"],
  [2, 8, 1, "Demo · Clínica Bela", "roxo"], [2, 10, 1, "Reunião · SaaS Fluxo", "azul"], [2, 13, 1, "Follow-up · Imob. Centro", "ciano"], [2, 15, 1, "Venda fechada · Pet Care", "venda"], [2, 20, 1, "Reunião · Odonto Vida", "laranja"],
  [3, 9, 1.5, "Reunião · Agile Med", "azul"], [3, 11, 1, "Demo · Bozelli", "roxo"], [3, 14, 1, "Reunião · Rede Farma", "laranja"], [3, 16, 1, "Venda fechada · Escola Up", "venda"], [3, 18.5, 1, "Follow-up · Estética Pura", "ciano"],
  [4, 8, 1, "Reunião · Lab Center", "azul"], [4, 10, 1, "Venda fechada · Concession. Sul", "venda"], [4, 13, 1.5, "Demo · Imob. Vista", "roxo"], [4, 16, 1, "Reunião · Clínica Dr. Ana", "laranja"], [4, 19, 1, "Reunião · Academia Fit", "azul"],
];
export function VisualAgenda({ ativo }: { ativo: boolean }) {
  const p = usePasso(EVENTOS.length + 8, 200, ativo);
  const ini = 8, fim = 21, alt = 27; // px por hora
  const vendas = EVENTOS.slice(0, p).filter((e) => e[4] === "venda").length;
  return (
    <div className="gcal">
      <div className="gcal-topo">
        <span className="gcal-logo"><i /><i /><i /><i /></span><b>Agenda</b><span className="gcal-mes">Outubro 2026 · semana</span>
        <span className="gcal-resumo"><em>{Math.min(p, EVENTOS.length)}</em> reuniões · <em className="v">{vendas}</em> vendas</span>
      </div>
      <div className="gcal-cab"><span />{DIAS.map((d) => <span key={d}><small>{d.split(" ")[0]}</small><b>{d.split(" ")[1]}</b></span>)}</div>
      <div className="gcal-corpo" style={{ height: (fim - ini) * alt }}>
        <div className="gcal-horas">{Array.from({ length: fim - ini }, (_, k) => <span key={k} style={{ top: k * alt }}>{ini + k}h</span>)}</div>
        {DIAS.map((_, d) => (
          <div key={d} className="gcal-col" style={{ backgroundSize: `100% ${alt}px` }}>
            {EVENTOS.map((e, k) => e[0] === d && (
              <span key={k} className={`gcal-ev ${e[4]}${k < p ? " on" : ""}`} style={{ top: (e[1] - ini) * alt + 1, height: e[2] * alt - 2 }}>
                {e[4] === "venda" && <CheckIcon />}{e[3]}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-agora"><span className="mt-agora-ico"><PhoneIcon /></span><div><small>O que fazer agora</small><b>Rotina do dia: ligações, respostas e follow-ups no horário certo</b></div></div>
    </div>
  );
}

// ---------- S: scripts reais do sistema, com opção de criar o seu ----------
const SCRIPTS = [
  { nome: "Script A · Direto ao ponto", fala: "{nome}, aqui é o {seu_nome}. O motivo é rápido: trabalho com empresas de {setor} aqui de {cidade} e vi a {empresa}." },
  { nome: "Script B · Dor do setor", fala: "Estou falando com várias empresas de {setor} e quase todas comentam a mesma coisa: {dor}. Isso acontece aí também?" },
  { nome: "Script C · Prova social", fala: "Acabei de ajudar uma empresa de {setor} parecida com a {empresa} a resolver {dor}, e o resultado saiu rápido." },
  { nome: "Script D · Convite para análise", fala: "Quero te convidar para uma análise gratuita: em 20 minutos te mostro onde a {empresa} está perdendo cliente." },
  { nome: "+ Criar meu script", fala: "Escreva o seu roteiro com as variáveis do Atlas. Ele preenche nome, empresa, cidade e a dor do nicho sozinho.", meu: true },
];
const pinta = (t: string) => t.split(/(\{[a-z_]+\})/).map((x, k) => /^\{/.test(x) ? <mark key={k}>{x}</mark> : x);
export function VisualSucesso({ ativo }: { ativo: boolean }) {
  const k = usePasso(SCRIPTS.length, 2600, ativo);
  return (
    <div className="mt-script">
      <div className="mt-script-lead">
        <span className="mt-p1">P1</span>
        <div><b>Clínica Pura Pele</b><small>Dra. Camila · sócia que decide · telefone direto</small></div>
        <span className="mt-fit">Fit 96</span>
      </div>
      <div className="mt-script-opcoes">
        {SCRIPTS.map((s, i) => <span key={s.nome} className={`${i === k ? "on" : ""}${s.meu ? " meu" : ""}`}>{s.nome}</span>)}
        <Cursor style={{ left: "auto", right: 18, top: 8 + k * 36, transition: "top .6s cubic-bezier(.4,0,.2,1)" }} />
      </div>
      <div key={k} className="mt-script-fala"><small><MessageSquareTextIcon /> Roteiro na tela</small><p>{pinta(SCRIPTS[k].fala)}</p></div>
      <div className="mt-script-ganhos"><span><CheckIcon /> Fala direto com quem decide</span><span><CheckIcon /> Mais reuniões agendadas</span><span><CheckIcon /> Venda mais simples</span></div>
    </div>
  );
}
