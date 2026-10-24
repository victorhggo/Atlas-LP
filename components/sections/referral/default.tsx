import { ArrowRightIcon, CheckIcon, CopyIcon } from "lucide-react";

import { Good } from "../../ui/highlight";
import { LinkButton } from "../../ui/link-button";
import { Reveal } from "../../ui/reveal";
import { Section } from "../../ui/section";

export default function Referral() {
  return (
    <Section id="indique-e-ganhe" className="relative py-8 sm:py-12">
      <div className="max-w-container mx-auto">
        <Reveal>
          <div className="glass-2 dark:glass-3 group relative overflow-hidden rounded-3xl p-6 shadow-2xl sm:p-10">
            <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
              <div className="flex flex-col gap-4">
                <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">
                  Indique e Ganhe · Para assinantes
                </span>
                <h3 className="text-2xl leading-tight font-semibold text-balance sm:text-4xl">
                  Assinou um plano? Indique amigos e ganhe créditos.
                </h3>
                <p className="text-muted-foreground max-w-[520px] text-base leading-relaxed text-balance sm:text-lg">
                  Depois de assinar qualquer plano do Atlas, você libera seu link
                  no painel. Quando o seu indicado{" "}
                  <Good>também assinar um plano pago</Good>, os créditos de bônus
                  entram na sua conta na hora.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <LinkButton
                    variant="default"
                    size="lg"
                    href="#planos"
                    iconRight={<ArrowRightIcon className="ml-1 size-4" />}
                  >
                    Ver planos e assinar
                  </LinkButton>
                  <span className="text-muted-foreground text-xs sm:text-sm">
                    Liberado após assinar Essencial, Pro ou Equipe.
                  </span>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="panel border-border/15 bg-background/65 flex flex-col gap-3 rounded-2xl border p-5 text-xs shadow-xl motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-translate-y-1 sm:text-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                    Painel · Indique e Ganhe
                  </span>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Assinante ativo
                  </span>
                </div>

                <div className="border-border/15 bg-foreground/[0.04] flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5">
                  <span className="truncate font-mono text-xs sm:text-sm">
                    atlas.escolhidospro.com.br/r/seu-link
                  </span>
                  <span className="bg-brand/15 text-brand flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold">
                    <CopyIcon className="size-3.5" />
                    Copiar
                  </span>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  {[
                    "1. Você assina um plano do Atlas",
                    "2. Seu indicado assina um plano pelo seu link",
                    "3. Seus créditos extras caem no saldo na hora",
                  ].map((step) => (
                    <div
                      key={step}
                      className="bg-foreground/[0.04] flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs sm:text-sm"
                    >
                      <CheckIcon
                        className="size-4 shrink-0 text-emerald-500"
                        strokeWidth={3}
                      />
                      <span className="font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
