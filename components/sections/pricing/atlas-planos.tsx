"use client";
import "./atlas-planos.css";

import type { LucideIcon } from "lucide-react";
import { CheckIcon, CrownIcon, GemIcon, MinusIcon, MessageCircleIcon } from "lucide-react";
import { BotIcon, CalendarCheckIcon, ChevronDownIcon, CoinsIcon, FileSpreadsheetIcon, GlobeIcon, InfinityIcon, KanbanIcon, LayersIcon, ListOrderedIcon, MegaphoneIcon, MessageSquareTextIcon, PhoneIcon, TargetIcon, UsersIcon, WalletIcon, WebhookIcon, ZapIcon } from "lucide-react";
// Cartões de planos iguais aos do sistema (atlas.escolhidospro.com.br/planos). Dados copiados de web/components/planos.tsx.
import { createElement, type MouseEvent, useState } from "react";

import { siteConfig } from "@/config/site";

const APP = "https://atlas.escolhidospro.com.br";
const EQUIPE = { min: 3, max: 20, base: 99700, porUsuario: 14700 };
const FAIXAS_EQUIPE = [{ de: 2, ate: 4, creditos: 2000 }, { de: 5, ate: 9, creditos: 2500 }, { de: 10, ate: 14, creditos: 3000 }, { de: 15, ate: 19, creditos: 4000 }, { de: 20, ate: 20, creditos: 5000 }];
const PRO_DOIS = 50000;
const equipeCalc = (n: number) => ({ centavos: EQUIPE.base + (n - EQUIPE.min) * EQUIPE.porUsuario, creditos: FAIXAS_EQUIPE.find((f) => n >= f.de && n <= f.ate)?.creditos ?? 2000 });
const skuEquipe = (n: number, anual = false) => `plano_equipe_v3_u${n}${anual ? "_anual" : ""}`;
const skuPro = (n: 1 | 2, anual = false) => `plano_pro_v2${n === 2 ? "_u2" : ""}${anual ? "_anual" : ""}`;
// Quem não tem conta cria uma; quem tem, entra e cai direto no pagamento do plano escolhido.
const assinar = (sku: string) => `${APP}/pagar?sku=${sku}`;

type Plano = {
  cor: string; sku?: string; skuAnual?: string; selo: string; destaque?: boolean; nome: string; tags: { t: string; agente?: boolean; tipo?: "ok" | "ouro" | "azul" | "violeta" | "rosa" | "laranja" | "ciano" | "vermelho" }[];
  para?: string; preco: string; precoAnual?: string; mensalAnual?: string; mes?: boolean; itens: string[]; mais: string[]; nota?: string; botao: string; desativado?: boolean; contato?: boolean;
};

const PLANOS: Plano[] = [
  {
    cor: "sky", selo: "Começar", nome: "Grátis", para: "Para conhecer: teste a qualificação sem cartão", tags: [{ t: "Testar hoje" }, { t: "Sem cartão", tipo: "ok" }], preco: "Grátis",
    itens: ["25 créditos para testar|25 decisores grátis", "Listas ordenadas por quem ligar primeiro", "Site, Instagram, Google e e-mail", "1 telefone por empresa (o do decisor)"],
    mais: ["Telefone da empresa e nome do sócio", "Roteiro da ligação na ficha"],
    botao: "Continuar no grátis",
  },
  {
    cor: "verde", selo: "Assinatura", sku: "plano_essencial_v2", skuAnual: "plano_essencial_v2_anual", nome: "Essencial", para: "Para quem está começando a prospectar todo dia", tags: [{ t: "CRM", tipo: "ouro" }, { t: "VoIP", tipo: "azul" }],
    preco: "R$ 97", precoAnual: "R$ 970", mensalAnual: "R$ 80,83", mes: true,
    itens: ["200 créditos por mês|200 decisores", "Até 3 telefones por empresa, com o do decisor", "CRM completo, sem limite de leads", "Revelar número do sócio"],
    mais: ["Follow-up e agenda no quadro", "Importação e exportação (Excel, CSV e PDF)"],
    botao: "Assinar Essencial",
  },
  {
    cor: "violeta", selo: "Mais escolhido", destaque: true, sku: "plano_pro_v2", skuAnual: "plano_pro_v2_anual", nome: "Pro", para: "Para quem vive de vendas: prospecta, conversa e fecha no mesmo lugar", tags: [{ t: "Agente Atlas", tipo: "azul", agente: true }, { t: "WhatsApp", tipo: "ok" }, { t: "Cadências inteligentes", tipo: "ouro" }, { t: "Integrações", tipo: "azul" }, { t: "Algoritmo de dados", tipo: "violeta" }, { t: "Scripts na tela", tipo: "rosa" }, { t: "Follow-up", tipo: "laranja" }],
    preco: "R$ 297", precoAnual: "R$ 2.970", mensalAnual: "R$ 247,50", mes: true,
    itens: ["Tudo do Essencial, mais:", "4x mais: 800 créditos por mês|800 decisores", "Todos os telefones + LinkedIn do decisor", "WhatsApp dentro do CRM", "Cadências inteligentes: Prospecção 3.0 multicanal", "Scripts de ligação na tela, com resultado de cada um", "Inteligência por nicho: dores, objeções e argumentos aplicados no roteiro", "Mensagem e follow-up programados"],
    mais: ["Onboarding com a equipe Atlas", "Pesquisa aprofundada de 2 sócios", "Lead do site e do Meta direto no quadro", "Etiquetas e status do CRM nas conversas", "Webhooks, Make e Zapier", "Espelho no CRM dos Escolhidos", "Suporte prioritário"],
    botao: "Assinar Pro",
  },
  {
    cor: "ambar", selo: "Para times", sku: "equipe", nome: "Equipe", para: "Para equipes em crescimento: escolha quantos vendedores", tags: [{ t: "Agente Atlas", tipo: "azul", agente: true }, { t: "3 a 20 usuários", tipo: "ouro" }, { t: "Painel do líder", tipo: "azul" }, { t: "Chat da equipe", tipo: "ok" }, { t: "Atlas Academy", tipo: "vermelho" }, { t: "Treinamentos", tipo: "laranja" }, { t: "Transferir leads", tipo: "ciano" }],
    preco: "R$ 997", mes: true,
    itens: ["Tudo do Pro, mais:", "10x mais: 2.000 a 5.000 créditos por mês|2.000 a 5.000 decisores", "Painel do líder em tempo real", "Conta de líder com os vendedores", "WhatsApp, cadências, scripts e inteligência por nicho para cada vendedor"],
    mais: ["Créditos distribuídos pelo líder para cada vendedor", "Cada vendedor vê só os próprios leads", "Quem está online agora, em tempo real", "Movimento da equipe ao vivo no painel", "Aviso no sino de cada reunião marcada", "Reuniões marcadas e realizadas por vendedor", "Pedidos de crédito dos vendedores", "Pesquisa completa do decisor e de mais 1 sócio", "Acesso ao Atlas Academy", "Treinamentos com equipes de vendas", "Onboarding com a equipe Atlas", "Um CRM para o time inteiro", "Suporte prioritário"],
    botao: "Assinar Equipe",
  },
  {
    cor: "sky", selo: "Sob medida", nome: "Enterprise", para: "Para operações grandes, com contrato e integração sob medida", tags: [{ t: "Personalizado" }, { t: "Volume", tipo: "ouro" }], preco: "Sob consulta",
    itens: ["Créditos e usuários sob medida", "Integração com o seu CRM e sistemas", "API e relatórios dedicados", "Gerente de conta dedicado"],
    mais: ["Condições de contrato e faturamento próprias"],
    botao: "Falar com a equipe", contato: true,
  },
];


const ICONES: [RegExp, LucideIcon][] = [
  [/lista|ordem/i, ListOrderedIcon], [/roteiro|abordagem|linguagem/i, MessageSquareTextIcon], [/qualifica|crédito/i, CoinsIcon],
  [/planilha|importa/i, FileSpreadsheetIcon], [/crm|quadro/i, KanbanIcon], [/telefone|voip|liga|api4com/i, PhoneIcon], [/meta do dia|meta /i, TargetIcon], [/anúncio|meta/i, MegaphoneIcon],
  [/site|formulário|google/i, GlobeIcon], [/webhook|make|zapier/i, WebhookIcon], [/time|usuário|operação/i, UsersIcon],
  [/follow-up|reunião/i, CalendarCheckIcon], [/expira|saldo|fica na conta/i, InfinityIcon], [/tudo do/i, LayersIcon], [/campanha|volume/i, ZapIcon],
  [/cartão|custo|grátis/i, WalletIcon],
];
const iconeDe = (t: string) => ICONES.find(([re]) => re.test(t))?.[1] ?? BotIcon;
const Item = ({ t }: { t: string }) => {
  const [txt, det] = t.split("|");
  const icon = createElement(iconeDe(txt));
  return <li><span className="plano-ico">{icon}</span><span>{txt}{det && <em className="plano-det">{det}</em>}</span></li>;
};
const luz = (e: MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};
const reais = (c: number) => (c / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

function Regua({ anual, n, setN }: { anual: boolean; n: number; setN: (n: number) => void }) {
  const { centavos, creditos } = equipeCalc(n);
  const pct = ((n - EQUIPE.min) / (EQUIPE.max - EQUIPE.min)) * 100;
  return (
    <div className="regua">
      <div className="plano-preco">{reais(anual ? centavos * 10 / 12 : centavos)}<small>/mês</small></div>
      <div className="plano-sub">{anual && <><s>{reais(centavos)}</s> · no anual · </>}{reais(Math.round((anual ? centavos * 10 / 12 : centavos) / n))} por usuário</div>
      <div className="regua-painel">
        <div className="regua-numeros">
          <span className="regua-n"><UsersIcon /><b key={n}>{n}</b> usuários</span>
          <span className="regua-cred" key={creditos}><CoinsIcon /> {creditos.toLocaleString("pt-BR")}<small>créditos/mês</small></span>
        </div>
        <input type="range" min={EQUIPE.min} max={EQUIPE.max} step={1} value={n} onChange={(e) => setN(Number(e.target.value))}
          style={{ ["--p" as string]: `${pct}%` }} aria-label="Quantidade de usuários" aria-valuetext={`${n} usuários, ${creditos} créditos`} />
        <div className="regua-faixas">
          {FAIXAS_EQUIPE.map((f) => {
            const on = n >= f.de && n <= f.ate;
            return (
              <button key={f.de} type="button" className={on ? "on" : n > f.ate ? "passou" : ""} onClick={() => setN(Math.max(f.de, EQUIPE.min))}>
                <b>{(f.creditos / 1000).toLocaleString("pt-BR")} mil</b><small>{f.de === f.ate ? `${f.de} us.` : `${Math.max(f.de, EQUIPE.min)} a ${f.ate}`}</small>
              </button>
            );
          })}
        </div>
      </div>
      <div className="regua-dica">+ {reais(EQUIPE.porUsuario)} por usuário extra · créditos sobem por faixa</div>
    </div>
  );
}

function ReguaPro({ anual, n, setN }: { anual: boolean; n: 1 | 2; setN: (n: 1 | 2) => void }) {
  const mensal = n === 2 ? PRO_DOIS : 29700;
  return (
    <div className="regua regua-pro">
      <div className="plano-preco">{reais(anual ? mensal * 10 / 12 : mensal)}<small>/mês</small></div>
      <div className="plano-sub">{anual && <><s>{reais(mensal)}</s> · no anual · </>}{n === 2 ? `${reais(mensal / 2)} por usuário` : "1 usuário"}</div>
      <div className="regua-painel">
        <div className="regua-faixas dois">
          {([1, 2] as const).map((x) => (
            <button key={x} type="button" className={n === x ? "on" : ""} onClick={() => setN(x)}><b>{x} usuário{x > 1 ? "s" : ""}</b></button>
          ))}
        </div>
      </div>
      <div className="regua-dica">{n === 2 ? "2 usuários: 1.000 créditos por mês, compartilhados." : "Precisa de mais uma pessoa? Com 2 usuários são 1.000 créditos."} Mais pessoas: plano Equipe.</div>
    </div>
  );
}

function Cartao({ p, anual }: { p: Plano; anual: boolean }) {
  const [aberto, setAberto] = useState(false);
  const [n, setN] = useState(EQUIPE.min);
  const [nPro, setNPro] = useState<1 | 2>(1);
  const itens = p.nome === "Pro" && nPro === 2 ? p.itens.map((i) => (i.startsWith("4x mais") ? "5x mais: 1.000 créditos por mês|1.000 decisores" : i)) : p.itens;
  const href = p.nome === "Grátis" ? siteConfig.getStartedUrl
    : p.sku === "equipe" ? assinar(skuEquipe(n, anual))
    : p.nome === "Pro" ? assinar(skuPro(nPro, anual))
    : assinar(anual && p.skuAnual ? p.skuAnual : p.sku ?? "");
  const rotulo = p.nome === "Grátis" ? "Testar grátis" : p.sku === "equipe" ? `Assinar com ${n} usuários` : p.nome === "Pro" && nPro === 2 ? "Assinar Pro com 2 usuários" : p.botao;
  return (
    <article className={`plano cor-${p.cor}${p.destaque ? " destaque" : ""}`} onMouseMove={luz}>
      {p.destaque && <span className="plano-selo">{p.selo}</span>}
      <span className="plano-cat">{p.destaque ? "Assinatura" : p.selo}</span>
      <h3>{p.nome}</h3>
      {p.para && <p className="plano-para">{p.para}</p>}
      <div className="plano-tags">{p.tags.map((t) => <span key={t.t} className={`plano-tag${t.tipo ? ` ${t.tipo}` : ""}${t.agente ? " agente-atlas" : ""}`}>{t.agente && <BotIcon aria-hidden="true" />}{t.t}</span>)}</div>
      {p.sku === "equipe" ? <Regua anual={anual} n={n} setN={setN} /> : p.nome === "Pro" ? <ReguaPro anual={anual} n={nPro} setN={setNPro} /> : <>
        <div className="plano-preco">{anual && p.mensalAnual ? p.mensalAnual : p.preco}{p.mes && <small>/mês</small>}</div>
        {anual && p.mensalAnual && <div className="plano-sub"><s>{p.preco}</s> · no plano anual, 2 meses grátis</div>}
      </>}
      {itens.length > 0 && <ul>{itens.map((i) => <Item key={i} t={i} />)}</ul>}
      {aberto && <ul>{p.mais.map((i) => <Item key={i} t={i} />)}</ul>}
      <button type="button" className="plano-ver" onClick={() => setAberto(!aberto)} aria-expanded={aberto}>
        {aberto ? "Ver menos" : "Ver tudo"} <ChevronDownIcon style={{ transform: aberto ? "rotate(180deg)" : undefined }} />
      </button>
      <div className="plano-espaco" />
      <a className={`plano-btn${p.destaque ? " primario" : ""}`} href={href}>{rotulo}</a>
    </article>
  );
}

/** Grátis, Essencial, Pro e Equipe, como no sistema. O Enterprise tem a sua própria seção logo abaixo. */
export function AtlasPlanos({ anual }: { anual: boolean }) {
  return (
    <div className="atlas-planos">
      {PLANOS.filter((p) => p.nome !== "Enterprise").map((p) => <Cartao key={p.nome} p={p} anual={anual} />)}
    </div>
  );
}

const RECARGAS: Plano[] = [
  { cor: "sky", selo: "Avulsa", sku: "pack_100", nome: "Recarga 100", tags: [{ t: "Não expira", tipo: "ok" }, { t: "Extra" }], preco: "R$ 97,00", itens: [], mais: ["Soma no saldo da conta", "Serve quando o mês aperta"], nota: "Não substitui o plano nem libera o CRM.", botao: "Recarregar" },
  { cor: "verde", selo: "Mais usada", destaque: true, sku: "pack_500", nome: "Recarga 500", tags: [{ t: "Não expira", tipo: "ok" }, { t: "Soma no saldo", tipo: "ouro" }], preco: "R$ 297,00", itens: [], mais: ["Extra no meio do mês", "Fica na conta quando o plano zera"], nota: "Não substitui o plano nem libera o CRM.", botao: "Recarregar" },
  { cor: "violeta", selo: "Volume", sku: "pack_2000", nome: "Recarga 2.000", tags: [{ t: "Não expira", tipo: "ok" }, { t: "Campanha", tipo: "azul" }], preco: "R$ 497,00", itens: [], mais: ["Volume para campanha pesada", "Soma no saldo da conta"], nota: "Não substitui o plano nem libera o CRM.", botao: "Recarregar" },
];
const CREDITOS = ["100 créditos", "500 créditos", "2.000 créditos"];
type Linha = [string, ...(string | boolean)[]];
const COMPARA: { grupo: string; linhas: Linha[] }[] = [
  { grupo: "Prospecção", linhas: [
    ["Créditos por mês (1 crédito = 1 decisor)", "25 (teste)", "200", "800 (2 usuários: 1.000)", "2.000 a 5.000", "Sob medida"],
    ["Listas, qualificação e ficha da empresa", true, true, true, true, true],
    ["Site, Instagram, Google Maps e e-mail", true, true, true, true, true],
    ["Número do decisor", true, true, true, true, true],
    ["Telefones por empresa", "1", "até 3", "todos", "todos", "todos"],
    ["Facebook e WhatsApp do site", false, true, true, true, true],
    ["LinkedIn da empresa e do decisor", false, false, true, true, true],
    ["Pesquisa aprofundada dos sócios", false, false, "decisor + 1 sócio", "decisor + 1 sócio, busca completa", "sob medida"],
    ["Revelar número do sócio (base licenciada)", true, true, true, true, true],
  ] },
  { grupo: "CRM e vendas", linhas: [
    ["CRM sem limite de leads", false, true, true, true, true],
    ["Tela Ligar com meta do dia", false, true, true, true, true],
    ["Follow-up, agenda e lembretes", false, true, true, true, true],
    ["Importação e exportação", false, true, true, true, true],
  ] },
  { grupo: "WhatsApp", linhas: [
    ["WhatsApp dentro do CRM", false, false, true, true, true],
    ["Mensagem e follow-up programados", false, false, true, true, true],
    ["Envio automático na hora marcada", false, false, true, true, true],
    ["Etiquetas e status do CRM nas conversas", false, false, true, true, true],
    ["Áudio, grupos, respostas rápidas e catálogo", false, false, true, true, true],
  ] },
  { grupo: "Cadências inteligentes", linhas: [
    ["Prospecção 3.0: ligação, WhatsApp, e-mail, Instagram e LinkedIn", false, false, true, true, true],
    ["Próximo follow-up liberado só se o lead não responder", false, false, true, true, true],
    ["Para sozinha quando o lead responde no WhatsApp", false, false, true, true, true],
    ["Cadências Atlas prontas e editor próprio", false, false, true, true, true],
    ["Follow-ups criativos com imagem do lead", false, false, true, true, true],
  ] },
  { grupo: "Scripts de ligação", linhas: [
    ["Roteiro na tela de Ligar, preenchido com o lead e a dor do nicho", false, false, true, true, true],
    ["Scripts Atlas prontos, inclusive o Convite para análise", false, false, true, true, true],
    ["Objeções com resposta em um clique", false, false, true, true, true],
    ["Qual script gera mais conversa com o decisor e mais reunião", false, false, true, true, true],
    ["Scripts próprios para criar e editar", false, false, true, true, true],
    ["Dores do nicho na ficha da empresa", true, true, true, true, true],
    ["Perguntas, objeções e argumentos de cada nicho, aplicados no roteiro e nas cadências", false, false, true, true, true],
    ["Qual dor abre mais conversa com o decisor", false, false, true, true, true],
  ] },
  { grupo: "Automação", linhas: [
    ["Integrações (site, Meta, webhooks)", false, false, true, true, true],
    ["Espelho no CRM dos Escolhidos", false, false, true, true, true],
  ] },
  { grupo: "Time e suporte", linhas: [
    ["Usuários", "1", "1", "1 ou 2", "3 a 20", "Sob medida"],
    ["Painel do líder", false, false, false, true, true],
    ["Onboarding com a equipe Atlas", false, false, true, true, true],
    ["Atlas Academy e treinamentos de vendas", false, false, false, true, true],
    ["Suporte", "—", "E-mail", "Prioritário", "Prioritário + onboarding", "Gerente dedicado"],
  ] },
];
const COLS = ["Grátis", "Essencial", "Pro", "Equipe", "Enterprise"];

const CTA: (string | null)[] = [null, "plano_essencial_v2", "plano_pro_v2", "equipe", null];
const WHATS = "5515996979750";
const POR_QUE: { I: LucideIcon; t: string; d: string; c: string }[] = [
  { I: TargetIcon, t: "800 decisores por mês", d: "Lista criada, qualificada e com o número de quem decide. Sem perder horas no Google e no Instagram.", c: "#8B5CF6" },
  { I: MessageCircleIcon, t: "WhatsApp dentro do CRM", d: "Converse com o lead sem trocar de tela: áudio, etiquetas, etapa do funil e notas sincronizadas.", c: "#25D366" },
  { I: CalendarCheckIcon, t: "Cadências inteligentes", d: "A rota de cada lead em todos os canais. Se ele não responder, o próximo follow-up já entra na agenda; se responder, para sozinha.", c: "#F5B94A" },
  { I: WebhookIcon, t: "Leads chegando no quadro", d: "Formulário do site e anúncios do Meta caem direto no CRM, prontos para abordar.", c: "#00A8FF" },
];

/** Enterprise, Por que o Pro, Compare os planos e Recargas: iguais à página de planos do sistema. */
export function AtlasPlanosExtras({ anual }: { anual: boolean }) {
  return (
    <div className="atlas-planos-extras atlas-planos">
      <section className="enterprise" onMouseMove={luz}>
        <div className="enterprise-txt">
          <span className="enterprise-selo"><GemIcon /> Enterprise · sob medida</span>
          <h2>Sua operação é grande? A gente monta o Atlas para ela.</h2>
          <p>Créditos e usuários sem teto, integração com o seu CRM e sistemas, API e relatórios dedicados, contrato e faturamento próprios.</p>
          <ul>{["Créditos e usuários sob medida", "Integração com o seu CRM", "API e relatórios dedicados", "Gerente de conta dedicado"].map((t) => <li key={t}><CheckIcon /> {t}</li>)}</ul>
        </div>
        <div className="enterprise-cta">
          <b>Sob consulta</b><span>Resposta em até 1 dia útil</span>
          <a className="plano-btn enterprise-btn" href={`https://wa.me/${WHATS}?text=${encodeURIComponent("Olá! Quero conhecer o plano Enterprise do Atlas.")}`} target="_blank" rel="noreferrer">Falar com a equipe</a>
        </div>
      </section>

      <section className="planos-sec por-que">
        <div className="por-que-cab">
          <span className="pt-selo"><CrownIcon /> Mais escolhido</span>
          <h2 className="planos-h2">Por que escolher o Pro?</h2>
          <p className="planos-intro">O plano para transformar lista em conversa e conversa em venda.</p>
        </div>
        <div className="por-que-grid">
          {POR_QUE.map(({ I, t, d, c }) => (
            <article key={t} className="por-que-item" style={{ ["--c" as string]: c }} onMouseMove={luz}>
              <span className="por-que-ico"><I /></span><h3>{t}</h3><p>{d}</p>
            </article>
          ))}
        </div>
        <div className="por-que-cta"><a href={assinar(anual ? "plano_pro_v2_anual" : "plano_pro_v2")} className="plano-btn primario">Quero o Pro</a><span className="muted small">4x mais créditos que o Essencial · cancele quando quiser</span></div>
      </section>

      <section className="planos-sec">
        <h2 className="planos-h2">Compare os planos</h2>
        <div className="planos-tabela">
          <table>
            <thead><tr><th />{COLS.map((n, i) => (
              <th key={n} className={i === 2 ? "destaque topo" : ""}>{i === 2 && <span className="pt-selo"><CrownIcon /> Mais escolhido</span>}{n}{i === 2 && <small>Melhor custo por lead</small>}</th>
            ))}</tr></thead>
            {COMPARA.map(({ grupo, linhas }) => (
              <tbody key={grupo}>
                <tr className="pt-grupo"><td>{grupo}</td>{COLS.map((_, i) => <td key={i} className={i === 2 ? "destaque" : ""} />)}</tr>
                {linhas.map(([rot, ...vs]) => (
                  <tr key={rot}><td>{rot}</td>{vs.map((v, i) => <td key={i} className={i === 2 ? "destaque" : ""}>{v === true ? <span className="sim" aria-label="Incluído"><CheckIcon /></span> : v === false ? <span className="nao" aria-label="Não incluído"><MinusIcon /></span> : v}</td>)}</tr>
                ))}
              </tbody>
            ))}
            <tfoot><tr><td />{CTA.map((sku, i) => (
              <td key={i} className={i === 2 ? "destaque fundo" : ""}>
                {sku ? <a href={sku === "equipe" ? "#planos" : assinar(anual ? `${sku}_anual` : sku)} className={`plano-btn${i === 2 ? " primario" : ""}`}>{i === 2 ? "Quero o Pro" : `Assinar ${COLS[i]}`}</a> : null}
              </td>
            ))}</tr></tfoot>
          </table>
        </div>
      </section>
      <p className="planos-rodape">Pix ou cartão (crédito ou débito) · Qualificar custa 1 crédito e só é cobrado se achar dados reais · O crédito do plano renova todo mês</p>

      <section className="planos-sec">
        <h2 className="planos-h2">Recarga de créditos</h2>
        <p className="planos-intro">Acabou no meio do mês? A recarga não expira e soma no saldo.</p>
        <div className="planos-grid tres">{RECARGAS.map((p, i) => <CartaoRecarga key={p.nome} p={p} sub={CREDITOS[i]} />)}</div>
      </section>
    </div>
  );
}

function CartaoRecarga({ p, sub }: { p: Plano; sub: string }) {
  const [aberto, setAberto] = useState(true);
  return (
    <article className={`plano cor-${p.cor}${p.destaque ? " destaque" : ""}`} onMouseMove={luz}>
      {p.destaque && <span className="plano-selo">{p.selo}</span>}
      <span className="plano-cat">{p.destaque ? "Recarga" : p.selo}</span>
      <h3>{p.nome}</h3>
      <div className="plano-tags">{p.tags.map((t) => <span key={t.t} className={`plano-tag${t.tipo ? ` ${t.tipo}` : ""}`}>{t.t}</span>)}</div>
      <div className="plano-preco">{p.preco}</div>
      <div className="plano-sub">{sub}</div>
      {aberto && <><ul>{p.mais.map((i) => <Item key={i} t={i} />)}</ul>{p.nota && <div className="plano-nota">{p.nota}</div>}</>}
      <button type="button" className="plano-ver" onClick={() => setAberto(!aberto)}>{aberto ? "Ver menos" : "Ver tudo"} <ChevronDownIcon style={{ transform: aberto ? "rotate(180deg)" : undefined }} /></button>
      <div className="plano-espaco" />
      <a className={`plano-btn${p.destaque ? " primario" : ""}`} href={assinar(p.sku ?? "")}>{p.botao}</a>
    </article>
  );
}
