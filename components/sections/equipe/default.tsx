"use client";

import { ArrowRightLeftIcon, CalendarClockIcon, CircleDotIcon, FunnelIcon, HandshakeIcon, MessagesSquareIcon, RefreshCwIcon, SendIcon, UsersIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Section } from "../../ui/section";

// Atlas para equipes: gravação real da transferência de lead e prints reais do painel do líder e do chat.
const VISOES = [
  { id: "funil", nome: "Funil do time", I: FunnelIcon, titulo: "O funil do time inteiro numa tela.", texto: "Ligações, conversas com o decisor e reuniões de cada vendedor, com a mensagem que mais converte e o CRM de cada um a um clique.", imgs: ["vends"] },
  { id: "amanha", nome: "O que fazer amanhã", I: CalendarClockIcon, titulo: "Você sabe o que cada um faz amanhã.", texto: "O Atlas monta o dia seguinte de cada vendedor pelos follow-ups: quem respondeu primeiro, quem está vencido, lead por lead.", imgs: ["amanha"] },
  { id: "online", nome: "Quem está online", I: CircleDotIcon, titulo: "Quem está trabalhando agora.", texto: "Online, offline, leads ativos, reuniões e follow-ups vencidos por pessoa. E você envia ou devolve créditos ali mesmo.", imgs: ["tabela"] },
  { id: "chat", nome: "Chat da equipe", I: MessagesSquareIcon, titulo: "A conversa do time gira em torno do lead.", texto: "O grupo da equipe já nasce pronto, com conversa individual com cada vendedor. Digite / para citar um lead do CRM e transferir direto da conversa.", imgs: ["chat1", "chat2"] },
];

const ITENS = [
  { I: RefreshCwIcon, t: "Rodízio de leads", d: "Não respondeu para um, passa para o outro. Voz nova, abordagem nova, mais resposta." },
  { I: HandshakeIcon, t: "Pedir ajuda sem perder o lead", d: "O lead continua com você e o colega trabalha junto, vendo todo o histórico." },
  { I: SendIcon, t: "Passa com o contexto inteiro", d: "Histórico, etapa, motivo e o recado vão junto. Ninguém começa do zero." },
];

export default function Equipe() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const a = useRef<HTMLVideoElement>(null), b = useRef<HTMLVideoElement>(null);
  useEffect(() => { for (const v of [a.current, b.current]) if (v) { v.muted = true; v.play().catch(() => {}); } }, []);
  useEffect(() => { if (!auto) return; const t = setInterval(() => setI((x) => (x + 1) % VISOES.length), 6000); return () => clearInterval(t); }, [auto]);
  const v = VISOES[i];
  return (
    <Section id="times">
      <div className="max-w-container mx-auto flex flex-col gap-14">
        <div className="flex max-w-[760px] flex-col gap-4">
          <span className="text-brand flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase"><UsersIcon className="size-4" /> Atlas para equipes</span>
          <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">Lead que ignorou um vendedor responde o outro.</h2>
          <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">Lead parado é dinheiro parado. No Atlas você transfere o lead para alguém do time em dois cliques, com todo o histórico, e faz o rodízio que dobra as chances de resposta. Você não controla planilha de quem está com quem. O Atlas controla.</p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <figure className="cad-video m-0 mx-auto w-full max-w-[720px]">
            <div className="cad-barra"><span /><span /><span /><em>atlas.escolhidospro.com.br/crm · Transferir lead</em><b><i /> Sistema real</b></div>
            {(["light", "dark"] as const).map((t) => (
              <video key={t} ref={t === "light" ? a : b} className={`block w-full ${t === "light" ? "dark:hidden" : "hidden dark:block"}`} autoPlay muted loop playsInline preload="metadata" poster={`/atlas/video/transferir-${t}-poster.jpg`} aria-label="Transferindo um lead para outro vendedor no Atlas">
                <source src={`/atlas/video/transferir-${t}.webm`} type="video/webm" />
                <source src={`/atlas/video/transferir-${t}.mp4`} type="video/mp4" />
              </video>
            ))}
          </figure>
          <div className="flex flex-col gap-3">
            <span className="flex items-center gap-2 text-sm font-semibold"><ArrowRightLeftIcon className="text-brand size-4" /> Transferir lead</span>
            <ul className="flex flex-col gap-3">
              {ITENS.map(({ I, t, d }) => <li key={t} className="cad-pilar"><span className="cad-pilar-ico"><I /></span><div><b>{t}</b><p>{d}</p></div></li>)}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground text-xs font-semibold tracking-[0.16em] uppercase">Painel do líder</span>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">Você lidera o time sem cobrar ninguém no grupo.</h3>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="crm-demo-abas" role="tablist">
              {VISOES.map((x, k) => (
                <button key={x.id} type="button" role="tab" aria-selected={k === i} className={k === i ? "on" : ""} onClick={() => { setI(k); setAuto(false); }}><x.I />{x.nome}</button>
              ))}
            </div>
          </div>
          <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div key={v.id} className="eq-txt flex flex-col gap-2">
              <b className="text-xl">{v.titulo}</b>
              <p className="text-muted-foreground leading-relaxed">{v.texto}</p>
            </div>
            <div key={v.id + "i"} className={`eq-prints ${v.imgs.length > 1 ? "duplo" : ""}`}>
              {v.imgs.map((n) => (
                <figure key={n} className="eq-print">
                  <img src={`/atlas/equipe/${n}-light.webp`} alt={v.titulo} loading="lazy" className="block w-full dark:hidden" />
                  <img src={`/atlas/equipe/${n}-dark.webp`} alt={v.titulo} loading="lazy" className="hidden w-full dark:block" />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
