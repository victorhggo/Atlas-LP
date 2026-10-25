"use client";

import { CalendarDaysIcon, KanbanIcon, ListIcon, MousePointerClickIcon, WorkflowIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Section } from "../../ui/section";

// CRM demonstrativo: prints reais do CRM do Atlas, clicáveis entre as quatro visões (claro e escuro).
const VISOES = [
  { id: "quadro", nome: "Quadro", I: KanbanIcon, titulo: "Bate o olho e sabe onde cada venda está.", texto: "As etapas do funil lado a lado. Arraste o card, veja os canais do lead e o próximo retorno sem abrir nada." },
  { id: "lista", nome: "Lista", I: ListIcon, titulo: "Todas as informações numa linha.", texto: "Temperatura, nível de engajamento, valor, retorno e responsável. Filtre, ordene e aja em massa." },
  { id: "processo", nome: "Processo", I: WorkflowIcon, titulo: "O CRM que avisa você.", texto: "Saúde do funil, quanto tempo cada lead está parado na etapa, quem precisa de atenção agora e as últimas atualizações." },
  { id: "agenda", nome: "Agenda", I: CalendarDaysIcon, titulo: "Hoje, amanhã e depois, já organizados.", texto: "Follow-ups e reuniões em formato de agenda. Você abre e sabe exatamente o que fazer no dia." },
];

export default function CrmDemo() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => { if (!auto) return; const t = setInterval(() => setI((x) => (x + 1) % VISOES.length), 5000); return () => clearInterval(t); }, [auto]);
  const v = VISOES[i];
  return (
    <Section id="crm">
      <div className="max-w-container mx-auto flex flex-col gap-10">
        <div className="flex max-w-[780px] flex-col gap-4">
          <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">O CRM preguiçoso</span>
          <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">Você não organiza o CRM. Ele se organiza e te diz o que fazer.</h2>
          <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">Lead entra, o Atlas qualifica, move de etapa, lembra o retorno e aponta quem está esfriando. Quatro jeitos de ver a mesma operação. Clique e veja o CRM real.</p>
        </div>
        <div className="crm-demo">
          <div className="crm-demo-topo">
            <div className="crm-demo-abas" role="tablist">
              {VISOES.map((x, k) => (
                <button key={x.id} type="button" role="tab" aria-selected={k === i} className={k === i ? "on" : ""} onClick={() => { setI(k); setAuto(false); }}>
                  <x.I /> {x.nome}
                </button>
              ))}
            </div>
            <span className="crm-demo-dica"><MousePointerClickIcon /> Clique para trocar de visão</span>
          </div>
          <div className="crm-demo-legenda" key={v.id}><b>{v.titulo}</b><span>{v.texto}</span></div>
          <figure className="cad-video m-0">
            <div className="cad-barra"><span /><span /><span /><em>atlas.escolhidospro.com.br/crm · {v.nome}</em><b><i /> Sistema real</b></div>
            <div className="crm-demo-tela">
              {VISOES.map((x, k) => (
                <div key={x.id} className={`crm-demo-img${k === i ? " on" : ""}`}>
                  <img src={`/atlas/crm/${x.id}-light.webp`} alt={`CRM do Atlas na visão ${x.nome}`} loading={k ? "lazy" : "eager"} className="block w-full dark:hidden" />
                  <img src={`/atlas/crm/${x.id}-dark.webp`} alt={`CRM do Atlas na visão ${x.nome}`} loading="lazy" className="hidden w-full dark:block" />
                </div>
              ))}
            </div>
          </figure>
        </div>
      </div>
    </Section>
  );
}
