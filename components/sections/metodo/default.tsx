"use client";

import Image from "next/image";
import { BrainIcon, CalendarCheckIcon, RadarIcon, TrophyIcon, UserCheckIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Section } from "../../ui/section";
import { VisualAgenda, VisualLead, VisualSucesso, VisualTecnologia } from "./visuais";

const ICONES = [RadarIcon, BrainIcon, UserCheckIcon, CalendarCheckIcon, TrophyIcon];

// Método ATLAS: cada letra explica, em uma linha, o que o sistema faz por você, com uma demonstração ao lado.
const ETAPAS = [
  { letra: "A", nome: "Algoritmo de busca", texto: "Acha a empresa certa e todos os canais de venda dela, antes de você ligar.", selos: ["8+ canais por empresa", "Perfil no Google"] },
  { letra: "T", nome: "Tecnologia de dados", texto: "Inteligência que estuda o nicho por você: perguntas, objeções e o que convence.", selos: ["Estudo do nicho", "Script na tela"] },
  { letra: "L", nome: "Lead qualificado", texto: "O Agente Atlas confere o lead, marca como MQL e move no CRM sozinho.", selos: ["Fit Score 0 a 100", "Agente Atlas"] },
  { letra: "A", nome: "Agenda cheia", texto: "Reunião atrás de reunião na semana, e as vendas aparecendo em verde. A rotina do dia diz o que fazer agora.", selos: ["Rotina do dia", "Follow-up no horário"] },
  { letra: "S", nome: "Sucesso em vendas", texto: "Você chega no decisor com muito mais facilidade e agenda mais reuniões. Escolha um dos scripts do Atlas ou crie o seu.", selos: ["4 scripts prontos", "Crie o seu"] },
];

/** Marca quando o bloco está na tela (liga a animação só ali). */
function useNaTela<T extends Element>() {
  const ref = useRef<T>(null);
  const [na, setNa] = useState(false);
  const [visto, setVisto] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setNa(e.isIntersecting);
      if (e.isIntersecting) {
        setVisto(true);
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, na, visto] as const;
}

function Visual({ i, ativo }: { i: number; ativo: boolean }) {
  if (i === 0) return (
    <figure className="metodo-print m-0">
      <Image src="/atlas/metodo/a-light.webp" alt="Canais encontrados de uma empresa no Atlas" width={1040} height={600} loading="lazy" className="block w-full dark:hidden rounded-xl" />
      <Image src="/atlas/metodo/a-dark.webp" alt="Canais encontrados de uma empresa no Atlas" width={1040} height={600} loading="lazy" className="hidden w-full dark:block rounded-xl" />
    </figure>
  );
  if (i === 1) return <VisualTecnologia ativo={ativo} />;
  if (i === 2) return <VisualLead ativo={ativo} />;
  if (i === 3) return <VisualAgenda ativo={ativo} />;
  return <VisualSucesso ativo={ativo} />;
}

function Bloco({ e, i }: { e: (typeof ETAPAS)[number]; i: number }) {
  const [ref, na, visto] = useNaTela<HTMLDivElement>();
  const inverte = i % 2 === 1;
  return (
    <div id={`metodo-${i}`} ref={ref} className={`metodo-bloco${visto ? " visto" : ""} grid items-center gap-8 lg:grid-cols-[0.85fr_1fr] lg:gap-16`}>
      <div className={`flex flex-col gap-4 ${inverte ? "lg:order-2" : ""}`}>
        <div className="metodo-cab">
          <span className="metodo-letra-g" aria-hidden="true">{e.letra}</span>
          <span className="metodo-num">0{i + 1}<i /></span>
        </div>
        <h3 className="-mt-2 flex items-center gap-3 text-2xl font-semibold tracking-tight sm:text-[34px]">
          {(() => { const I = ICONES[i]; return (
            <span className={`metodo-ico pequeno m${i}`} aria-hidden="true">
              <span className="mt-anel" />
              {i === 0 && <span className="metodo-radar" />}
              <I className="metodo-ico-i" />
            </span>
          ); })()}
          {e.nome}
        </h3>
        <p className="text-muted-foreground max-w-[420px] text-base leading-relaxed">{e.texto}</p>
        <ul className="flex flex-wrap gap-2">
          {e.selos.map((s) => <li key={s} className="bg-brand/10 text-brand rounded-full px-3 py-1 text-[13px] font-semibold">{s}</li>)}
        </ul>
      </div>
      <div className={`mx-auto w-full max-w-[520px] ${inverte ? "lg:order-1" : ""}`}>
        <Visual i={i} ativo={na} />
      </div>
    </div>
  );
}

export default function Metodo() {
  return (
    <Section id="metodo">
      <div className="max-w-container mx-auto flex flex-col gap-16 sm:gap-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex max-w-[560px] flex-col gap-3">
            <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">Método ATLAS</span>
            <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">Do primeiro dado à venda fechada.</h2>
            <p className="text-muted-foreground text-base">Cinco passos que o Atlas faz por você, todos os dias.</p>
          </div>
          <nav className="metodo-sigla" aria-label="Passos do método">
            {ETAPAS.map((e, i) => <a key={i} href={`#metodo-${i}`} title={e.nome}>{e.letra}</a>)}
          </nav>
        </div>
        {ETAPAS.map((e, i) => <Bloco key={i} e={e} i={i} />)}
      </div>
    </Section>
  );
}
