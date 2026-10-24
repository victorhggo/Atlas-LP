import { BellIcon } from "lucide-react";
import { ReactNode } from "react";

import { Good } from "../../ui/highlight";
import { Reveal } from "../../ui/reveal";
import { Section } from "../../ui/section";

interface ProofCard {
  name: string;
  role: string;
  initials: string;
  badge: string;
  quote: ReactNode;
  print: {
    title: string;
    lead: string;
    detail: string;
    tag: string;
  };
}

const PROOFS: ProofCard[] = [
  {
    name: "Guilherme S.",
    role: "Agência B2B",
    initials: "GS",
    badge: "6 → 24 reuniões/mês",
    quote: (
      <>
        Meu SDR gastava a manhã procurando sócio. Hoje ele abre o Atlas às 9h,{" "}
        <Good>a fila já está ordenada por Fit Score</Good> e o dia vira ligação.
      </>
    ),
    print: {
      title: "Reunião marcada · Sino",
      lead: "Clínica Oral Prime · Dra. Camila",
      detail: "Quinta, 14h30 · Confirmada no WhatsApp",
      tag: "É decisor",
    },
  },
  {
    name: "Larissa M.",
    role: "SDR · Consultoria",
    initials: "LM",
    badge: "Direto no sócio",
    quote: (
      <>
        Acabou ligar para recepção.{" "}
        <Good>Qualifico a ficha, vejo o telefone do sócio</Good> com o roteiro
        aberto e o Agente já move no CRM quem responde.
      </>
    ),
    print: {
      title: "Movido pelo Agente Atlas",
      lead: "Metalúrgica Prado · Marcos",
      detail: "“Pode me ligar amanhã às 10h”",
      tag: "Qualificado",
    },
  },
  {
    name: "Renato B.",
    role: "Software House",
    initials: "RB",
    badge: "3 ferramentas a menos",
    quote: (
      <>
        Cancelei extrator e planilha. No Atlas{" "}
        <Good>a meta já vira ligações por dia no Painel</Good> e a cadência
        pausa sozinha quando o lead responde.
      </>
    ),
    print: {
      title: "Trabalho do dia · Painel",
      lead: "20 ligações feitas · 3 reuniões",
      detail: "4 cadências pausadas por resposta",
      tag: "Meta em dia",
    },
  },
];

export default function SocialProof() {
  return (
    <Section id="depoimentos" className="relative overflow-x-clip">
      <div className="max-w-container mx-auto flex flex-col gap-10 sm:gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">
            Quem usa todo dia
          </span>
          <h2 className="max-w-[680px] text-3xl leading-tight font-semibold text-balance sm:text-5xl">
            Menos planilha. Mais reuniões na agenda.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 [&>*]:min-w-0">
          {PROOFS.map((item, i) => (
            <Reveal key={item.name} delay={i * 90} className="h-full min-w-0">
              <div className="glass-1 dark:glass-2 group flex h-full min-w-0 flex-col justify-between gap-6 overflow-hidden rounded-2xl p-6 shadow-xl sm:p-7">
                <div className="flex min-w-0 flex-col gap-5">
                  <div
                    aria-hidden="true"
                    className="panel border-border/15 bg-background/65 flex min-w-0 flex-col gap-2.5 rounded-xl border p-3.5 text-xs motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-translate-y-1 sm:text-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-brand flex items-center gap-1.5 font-semibold">
                        <BellIcon className="size-3.5 shrink-0" />
                        <span className="truncate">{item.print.title}</span>
                      </span>
                      <span className="shrink-0 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {item.print.tag}
                      </span>
                    </div>
                    <div className="bg-foreground/[0.04] flex min-w-0 flex-col gap-0.5 rounded-lg px-3 py-2">
                      <span className="truncate font-semibold">
                        {item.print.lead}
                      </span>
                      <span className="text-muted-foreground truncate text-xs">
                        {item.print.detail}
                      </span>
                    </div>
                  </div>

                  <p className="text-foreground/90 text-base leading-relaxed text-pretty sm:text-lg">
                    “{item.quote}”
                  </p>
                </div>

                <div className="border-border/15 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="bg-brand/15 text-brand flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                      {item.initials}
                    </span>
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-semibold sm:text-base">
                        {item.name}
                      </span>
                      <span className="text-muted-foreground truncate text-xs sm:text-sm">
                        {item.role}
                      </span>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-emerald-500/12 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-500">
                    {item.badge}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
