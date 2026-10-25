"use client";

import { ImageIcon, LayersIcon, MessagesSquareIcon, RouteIcon, UnlockIcon, ZapIcon } from "lucide-react";
import { useEffect, useRef } from "react";

import { Section } from "../../ui/section";

// Cadências inteligentes: gravação real da tela de Cadências do Atlas (clara e escura).
const PILARES = [
  { I: LayersIcon, t: "Prospecção multicanal", d: "Ligação, WhatsApp em texto, áudio e imagem, e-mail, Instagram e LinkedIn na mesma rota." },
  { I: RouteIcon, t: "8 cadências prontas", d: "Prospecção 3.0, Convite para análise, 6·1·1, Reativação, Pós no-show e mais." },
  { I: UnlockIcon, t: "Destravar proposta e reunião", d: "Rotas feitas para tirar a proposta do silêncio e fazer a reunião acontecer." },
  { I: ZapIcon, t: "Para sozinha quando responde", d: "Respondeu, a cadência pausa e vira conversa. Não respondeu, o próximo toque já está na agenda." },
  { I: ImageIcon, t: "Follow-ups criativos", d: "Banco com 20 ideias e imagens prontas com o nome do lead, para quem sumiu." },
  { I: MessagesSquareIcon, t: "Crie a sua", d: "Monte sua cadência dia a dia, com roteiro e variáveis que o Atlas preenche." },
];

export default function Cadencias() {
  const a = useRef<HTMLVideoElement>(null), b = useRef<HTMLVideoElement>(null);
  useEffect(() => { for (const v of [a.current, b.current]) { if (v) { v.muted = true; v.play().catch(() => {}); } } }, []);
  return (
    <Section id="cadencias">
      <div className="max-w-container mx-auto flex flex-col gap-12">
        <div className="flex max-w-[760px] flex-col gap-4">
          <span className="text-brand flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase"><RouteIcon className="size-4" /> Cadências inteligentes</span>
          <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">O follow-up que ninguém faz, o Atlas faz por você.</h2>
          <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">A maioria das vendas pede vários contatos, e quase todo mundo desiste no segundo. Escolha a rota, coloque os leads e deixe o Atlas lembrar, enviar e pausar na hora certa.</p>
        </div>
        <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <figure className="cad-video m-0">
            <div className="cad-barra"><span /><span /><span /><em>atlas.escolhidospro.com.br/cadencias</em><b><i /> Sistema real</b></div>
            {(["light", "dark"] as const).map((t) => (
              <video key={t} ref={t === "light" ? a : b} className={`block w-full ${t === "light" ? "dark:hidden" : "hidden dark:block"}`} autoPlay muted loop playsInline preload="metadata"
                poster={`/atlas/video/cadencias-${t}-poster.jpg`} aria-label="Tela de Cadências do Atlas: cadências prontas, minhas cadências e follow-ups criativos">
                <source src={`/atlas/video/cadencias-${t}.webm`} type="video/webm" />
                <source src={`/atlas/video/cadencias-${t}.mp4`} type="video/mp4" />
              </video>
            ))}
          </figure>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {PILARES.map(({ I, t, d }) => (
              <li key={t} className="cad-pilar">
                <span className="cad-pilar-ico"><I /></span>
                <div><b>{t}</b><p>{d}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
