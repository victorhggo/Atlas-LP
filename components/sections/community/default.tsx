import { CheckIcon, PlayIcon } from "lucide-react";

import { Good } from "../../ui/highlight";
import { Reveal } from "../../ui/reveal";
import { Section } from "../../ui/section";

export default function Community() {
  return (
    <Section id="comunidade" className="relative overflow-x-clip">
      <div className="max-w-container mx-auto flex flex-col gap-10 sm:gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">
            Suporte e comunidade
          </span>
          <h2 className="max-w-[680px] text-3xl leading-tight font-semibold text-balance sm:text-5xl">
            Você nunca prospecta sozinho.
          </h2>
          <p className="text-muted-foreground max-w-[540px] text-base text-balance sm:text-lg">
            Grupo no WhatsApp, onboarding no Pro e Atlas Academy no Equipe.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 [&>*]:min-w-0">
          {/* Card 1: Grupo Suporte Atlas no WhatsApp */}
          <Reveal delay={0} className="h-full min-w-0">
            <div className="glass-1 dark:glass-2 group flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl p-6 shadow-xl sm:p-7">
              <div
                aria-hidden="true"
                className="panel border-border/15 bg-background/65 flex flex-col gap-2.5 rounded-xl border p-4 text-xs motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-translate-y-1 sm:text-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold">Suporte Atlas · WhatsApp</span>
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="size-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                    Assinantes
                  </span>
                </div>
                <div className="bg-foreground/[0.04] rounded-lg px-3 py-2 text-xs">
                  “Qual cadência vocês usam para quem não atendeu na 1ª ligação?”
                </div>
                <div className="bg-brand/12 text-brand rounded-lg px-3 py-2 text-xs font-medium">
                  Equipe: “Filtro Nunca contatado + áudio de 20s…”
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold sm:text-xl">
                    Grupo “Suporte Atlas”
                  </h3>
                  <span className="border-brand/30 bg-brand/10 text-brand rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                    Todos os planos
                  </span>
                </div>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Grupo de assinantes no WhatsApp para{" "}
                  <Good>tirar dúvidas rápidas</Good> e trocar abordagens que funcionam.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Onboarding com a equipe no Pro */}
          <Reveal delay={90} className="h-full min-w-0">
            <div className="glass-1 dark:glass-2 group flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl p-6 shadow-xl sm:p-7">
              <div
                aria-hidden="true"
                className="panel border-border/15 bg-background/65 flex flex-col gap-2 rounded-xl border p-4 text-xs motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-translate-y-1 sm:text-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold">Onboarding com a equipe</span>
                  <span className="text-brand text-xs font-semibold">
                    Suporte prioritário
                  </span>
                </div>
                {[
                  "Cliente ideal e Fit Score calibrados",
                  "WhatsApp e primeira cadência no ar",
                  "Meta do mês convertida no Painel",
                ].map((step) => (
                  <div
                    key={step}
                    className="bg-foreground/[0.04] flex items-center gap-2 rounded-lg px-3 py-2 text-xs"
                  >
                    <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-500">
                      <CheckIcon className="size-3" strokeWidth={3} />
                    </span>
                    <span className="truncate font-medium">{step}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold sm:text-xl">
                    Onboarding no Pro
                  </h3>
                  <span className="border-brand/30 bg-brand/10 text-brand rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                    Plano Pro
                  </span>
                </div>
                <p className="text-muted-foreground text-base leading-relaxed">
                  A equipe configura <Good>seu Fit Score e suas primeiras listas</Good> junto com você.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Card 3: Atlas Academy e treinamentos no Equipe */}
          <Reveal delay={180} className="h-full min-w-0">
            <div className="glass-1 dark:glass-2 group flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl p-6 shadow-xl sm:p-7">
              <div
                aria-hidden="true"
                className="panel border-border/15 bg-background/65 flex flex-col gap-2 rounded-xl border p-4 text-xs motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-translate-y-1 sm:text-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold">Atlas Academy</span>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Para o time
                  </span>
                </div>
                {[
                  { t: "Falando direto com o sócio", d: "12 min" },
                  { t: "Usando dores e objeções na linha", d: "15 min" },
                  { t: "Rotina do painel e follow-up", d: "10 min" },
                ].map((lesson) => (
                  <div
                    key={lesson.t}
                    className="bg-foreground/[0.04] flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-xs"
                  >
                    <span className="flex min-w-0 items-center gap-2 truncate font-medium">
                      <PlayIcon className="text-brand size-3.5 shrink-0 fill-current" />
                      <span className="truncate">{lesson.t}</span>
                    </span>
                    <span className="text-muted-foreground shrink-0 text-xs">
                      {lesson.d}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold sm:text-xl">
                    Atlas Academy
                  </h3>
                  <span className="border-brand/30 bg-brand/10 text-brand rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                    Plano Equipe
                  </span>
                </div>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Treinamentos práticos dentro do sistema para{" "}
                  <Good>capacitar seus vendedores</Good>.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
