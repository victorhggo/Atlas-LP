import { ArrowRightIcon, CheckIcon, XIcon } from "lucide-react";

import { siteConfig } from "@/config/site";

import { Reveal } from "../../ui/reveal";
import { Section } from "../../ui/section";

const FOR = [
  {
    who: "Dono de empresa que prospecta sozinho",
    pain: "Vende de dia e monta lista de noite.",
    fix: "O Atlas monta a lista e o roteiro. Você só reserva a hora de ligar.",
  },
  {
    who: "Prestador que vive de indicação",
    pain: "Mês bom depende de alguém lembrar de você.",
    fix: "Uma fila de decisores do seu nicho todo dia, sem esperar indicação.",
  },
  {
    who: "SDR ou vendedor que perde o dia em lista",
    pain: "Metade do dia vai em Google, Instagram e planilha.",
    fix: "O dia vira ligação: lista, decisor e follow-up já prontos.",
  },
  {
    who: "Gestor que quer acompanhar o time",
    pain: "Descobre só no fim do mês quem ligou.",
    fix: "Painel do líder ao vivo com ligações, reuniões e funil por vendedor.",
  },
];

const NOT_FOR = [
  {
    who: "Quem não vai ligar nem mandar mensagem",
    why: "O Atlas faz o braçal, mas a conversa de fechamento é com você.",
  },
  {
    who: "Quem procura base de dados sob encomenda",
    why: "Isso é desenhado na proposta sob medida para empresas.",
    link: { label: "Agendar demonstração", href: siteConfig.links.demo },
  },
];

export default function ForWhom() {
  return (
    <Section id="para-quem">
      <div className="max-w-container mx-auto flex flex-col gap-10 sm:gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">
            Para quem é
          </span>
          <h2 className="max-w-[680px] text-3xl leading-tight font-semibold text-balance sm:text-5xl">
            Feito para quem vende para outras empresas.
          </h2>
          <p className="text-muted-foreground max-w-[560px] text-base text-balance sm:text-lg">
            Agências, consultorias, clínicas, contabilidades, software houses e
            representantes.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {FOR.map((item, i) => (
            <Reveal key={item.who} delay={(i % 2) * 90} className="h-full">
              <div className="glass-1 dark:glass-2 flex h-full flex-col gap-3.5 rounded-2xl p-6 shadow-xl transition-transform duration-300 motion-safe:hover:-translate-y-0.5">
                <span className="flex items-center gap-2.5 text-base font-semibold sm:text-lg">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-500">
                    <CheckIcon className="size-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {item.who}
                </span>
                <span className="text-muted-foreground text-sm sm:text-base">
                  <span className="font-semibold text-red-600 dark:text-red-400">Hoje: </span>
                  {item.pain}
                </span>
                <span className="text-base leading-snug">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Com o Atlas: </span>
                  {item.fix}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-muted-foreground text-center text-sm font-semibold tracking-wider uppercase">
            Não é para
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {NOT_FOR.map((item) => (
              <div
                key={item.who}
                className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-5"
              >
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-600 dark:text-red-400">
                  <XIcon className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="flex flex-col gap-1 text-base">
                  <span className="font-semibold">{item.who}</span>
                  <span className="text-muted-foreground text-sm sm:text-base">{item.why}</span>
                  {item.link && (
                    <a
                      href={item.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand mt-1 flex w-fit items-center gap-1 font-semibold hover:underline"
                    >
                      {item.link.label}
                      <ArrowRightIcon className="size-4" />
                    </a>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
