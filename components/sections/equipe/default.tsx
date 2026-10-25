"use client";

import { BellRingIcon, CalendarClockIcon, CheckIcon, CircleDotIcon, FunnelIcon, HandshakeIcon, HistoryIcon, MessagesSquareIcon, RefreshCwIcon, TrendingUpIcon, UsersIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Section } from "../../ui/section";

// Atlas para equipes: gravações e prints reais do Atlas (rodízio de leads, painel do líder e chat da equipe).
type Midia = { video: string; temas: boolean } | { img: string };
const VISOES: { id: string; nome: string; I: typeof FunnelIcon; titulo: string; texto: string; itens: string[]; selo?: string; midia: Midia; estreito?: boolean }[] = [
  {
    id: "funil", nome: "Funil do time", I: FunnelIcon, midia: { video: "lider-funil", temas: true },
    titulo: "Um clique e você está dentro do CRM de cada vendedor.",
    texto: "Ligações, conversas com o decisor, reuniões e a mensagem que mais converte de cada pessoa. Clique em Ver CRM e veja o funil do Lucas ou da Marina como se fosse o seu.",
    itens: ["Funil do time inteiro numa tela", "CRM de cada vendedor a um clique", "Qual mensagem está convertendo mais"],
  },
  {
    id: "amanha", nome: "O que fazer amanhã", I: CalendarClockIcon, midia: { video: "lider-amanha", temas: true }, selo: "Essencial, Pro e Equipe",
    titulo: "O Atlas monta o dia de amanhã. De cada um.",
    texto: "Pelos follow-ups, respostas e ligações de hoje, o Atlas diz o que cada vendedor precisa fazer amanhã, lead por lead e na ordem certa. Ninguém chega de manhã perguntando por onde começar.",
    itens: ["Quem respondeu vem primeiro: é a conversa mais quente", "Follow-up vencido aparece antes de lead novo", "Recomendação do Atlas para cada pessoa", "O líder cobra com dado, não com achismo"],
  },
  {
    id: "online", nome: "Quem está online", I: CircleDotIcon, midia: { img: "tabela" },
    titulo: "Você sabe quem está trabalhando agora.",
    texto: "Online agora ou nunca entrou, leads ativos, reuniões, ações do dia e follow-ups vencidos de cada vendedor. E os créditos você envia ou devolve ali mesmo.",
    itens: ["Status ao vivo de cada pessoa", "Follow-ups vencidos por vendedor", "Créditos distribuídos pelo líder"],
  },
  {
    id: "chat", nome: "Chat da equipe", I: MessagesSquareIcon, midia: { video: "lider-chat", temas: false }, estreito: true,
    titulo: "A conversa do time gira em torno do lead.",
    texto: "O grupo da equipe já nasce pronto, com conversa individual com cada vendedor. Digite / para citar um lead do CRM, escreva o recado e mande. Quem recebe abre ou assume o lead direto da conversa.",
    itens: ["Grupo da equipe criado sozinho", "Digite / e cite qualquer lead do CRM", "Abrir ou transferir o lead pela própria mensagem", "Nada de print de WhatsApp para passar contato"],
  },
];

const RODIZIO = [
  { I: TrendingUpIcon, t: "Mais resposta com a mesma lista", d: "Voz nova, horário novo, abordagem nova. O lead que ignorou um atende o outro." },
  { I: HistoryIcon, t: "Ninguém começa do zero", d: "Histórico, etapa, motivo e recado vão junto com o lead." },
  { I: HandshakeIcon, t: "Pedir ajuda sem soltar o lead", d: "O lead continua com você e o colega trabalha junto, vendo tudo." },
  { I: BellRingIcon, t: "Nenhum lead esquecido", d: "Quem recebe é avisado na hora e o lead entra no CRM dele." },
];

function Video({ nome, temas, label }: { nome: string; temas: boolean; label: string }) {
  const a = useRef<HTMLVideoElement>(null), b = useRef<HTMLVideoElement>(null);
  useEffect(() => { for (const v of [a.current, b.current]) if (v) { v.muted = true; v.currentTime = 0; v.play().catch(() => {}); } }, [nome]);
  const lista = temas ? (["light", "dark"] as const) : ([null] as const);
  return <>{lista.map((t) => {
    const arq = t ? `${nome}-${t}` : nome;
    return (
      <video key={arq} ref={t === "dark" ? b : a} className={`block w-full ${t === "light" ? "dark:hidden" : t === "dark" ? "hidden dark:block" : ""}`} autoPlay muted loop playsInline preload="metadata" poster={`/atlas/video/${arq}-poster.jpg`} aria-label={label}>
        <source src={`/atlas/video/${arq}.webm`} type="video/webm" />
        <source src={`/atlas/video/${arq}.mp4`} type="video/mp4" />
      </video>
    );
  })}</>;
}

export default function Equipe() {
  const [i, setI] = useState(0);
  const v = VISOES[i];
  return (
    <Section id="times">
      <div className="max-w-container mx-auto flex flex-col gap-16">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-5">
            <span className="rz-selo"><span className="rz-ico"><RefreshCwIcon /></span> Rodízio de leads</span>
            <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">O lead esfriou com um vendedor? <span className="text-brand">Esquenta com o outro.</span></h2>
            <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">Lead parado é dinheiro parado. No Atlas você marca o motivo, escolhe o colega e o lead muda de mão com todo o histórico, em dois cliques. Sem planilha de quem está com quem: o CRM preguiçoso controla por você.</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {RODIZIO.map(({ I, t, d }) => <li key={t} className="cad-pilar"><span className="cad-pilar-ico"><I /></span><div><b>{t}</b><p>{d}</p></div></li>)}
            </ul>
          </div>
          <figure className="cad-video m-0 mx-auto w-full max-w-[680px]">
            <div className="cad-barra"><span /><span /><span /><em>atlas.escolhidospro.com.br/crm · Transferir lead</em><b><i /> Sistema real</b></div>
            <Video nome="transferir" temas label="Transferindo um lead para outro vendedor no Atlas" />
          </figure>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-brand flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase"><UsersIcon className="size-4" /> Painel do líder</span>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">Você lidera o time sem cobrar ninguém no grupo.</h3>
          </div>
          <div className="crm-demo-abas w-fit" role="tablist">
            {VISOES.map((x, k) => (
              <button key={x.id} type="button" role="tab" aria-selected={k === i} className={k === i ? "on" : ""} onClick={() => setI(k)}><x.I />{x.nome}</button>
            ))}
          </div>
          <div className={`grid items-center gap-10 ${v.estreito ? "lg:grid-cols-[1.2fr_0.8fr]" : "lg:grid-cols-[0.8fr_1.2fr]"}`}>
            <div key={v.id} className="eq-txt flex flex-col gap-4">
              {v.selo && <span className="eq-selo"><CheckIcon /> Disponível no {v.selo}</span>}
              <b className="text-xl leading-snug sm:text-2xl">{v.titulo}</b>
              <p className="text-muted-foreground leading-relaxed">{v.texto}</p>
              <ul className="flex flex-col gap-2">
                {v.itens.map((t) => <li key={t} className="flex items-start gap-2 text-[15px]"><CheckIcon className="mt-0.5 size-4 flex-none text-emerald-500" />{t}</li>)}
              </ul>
            </div>
            <div key={v.id + "m"} className={`eq-prints ${v.estreito ? "estreito" : ""}`}>
              {"img" in v.midia ? (
                <figure className="eq-print">
                  <img src={`/atlas/equipe/${v.midia.img}-light.webp`} alt={v.titulo} loading="lazy" className="block w-full dark:hidden" />
                  <img src={`/atlas/equipe/${v.midia.img}-dark.webp`} alt={v.titulo} loading="lazy" className="hidden w-full dark:block" />
                </figure>
              ) : (
                <figure className="cad-video m-0">
                  <div className="cad-barra"><span /><span /><span /><em>atlas.escolhidospro.com.br/lider</em><b><i /> Sistema real</b></div>
                  <Video nome={v.midia.video} temas={v.midia.temas} label={v.titulo} />
                </figure>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
