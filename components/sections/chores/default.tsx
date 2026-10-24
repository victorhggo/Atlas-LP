import { CheckIcon } from "lucide-react";

import { Bad } from "../../ui/highlight";
import { Reveal } from "../../ui/reveal";
import { Section } from "../../ui/section";

interface Chore {
  chore: string;
  atlas: string;
}

const CHORES: Chore[] = [
  {
    chore: "montar lista na mão",
    atlas: "Gera a lista do nicho e da região em segundos.",
  },
  {
    chore: "caçar telefone e Instagram",
    atlas: "Confere site, redes, Google e WhatsApp da empresa.",
  },
  {
    chore: "parar na recepção",
    atlas: "Entrega o nome e o telefone direto do sócio.",
  },
  {
    chore: "improvisar na ligação",
    atlas: "Abre o roteiro pronto com a dor e as objeções do nicho.",
  },
  {
    chore: "lembrar do follow-up",
    atlas: "Roda a cadência e pausa sozinho quando o lead responde.",
  },
  {
    chore: "adivinhar quem está quente",
    atlas: "O Agente qualifica e move o lead no CRM com histórico.",
  },
];

export default function Chores() {
  return (
    <Section>
      <div className="max-w-container mx-auto flex flex-col items-center gap-10 sm:gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">
            Prospecção sem braçal
          </span>
          <h2 className="max-w-[680px] text-3xl leading-tight font-semibold text-balance sm:text-5xl">
            O que você para de fazer hoje.
          </h2>
        </div>

        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHORES.map(({ chore, atlas }, i) => (
            <Reveal key={chore} delay={(i % 3) * 80} className="h-full">
              <div className="glass-1 dark:glass-2 group flex h-full flex-col justify-between gap-4 rounded-2xl p-6 shadow-xl transition-transform duration-300 motion-safe:hover:-translate-y-1">
                <span className="text-xl leading-snug font-semibold sm:text-2xl">
                  <Bad>{chore}</Bad>
                </span>
                <div className="border-border/15 flex items-start gap-2.5 border-t pt-3.5 text-base">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-500">
                    <CheckIcon className="size-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-foreground/90 leading-snug font-medium">
                    {atlas}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="text-center text-xl font-semibold sm:text-2xl">
          Você só liga. <span className="text-brand">O resto é com o Atlas.</span>
        </p>
      </div>
    </Section>
  );
}
