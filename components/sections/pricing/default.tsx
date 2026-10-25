"use client";

import {
  CalendarClockIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { Good } from "../../ui/highlight";
import { LinkButton } from "../../ui/link-button";
import { Reveal } from "../../ui/reveal";
import { Section } from "../../ui/section";
import { AtlasPlanos } from "./atlas-planos";

const SEALS = ["Sem fidelidade", "Cancele quando quiser", "Sem taxa de setup"];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <Section id="planos">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-4 px-4 text-center">
          <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">
            Planos
          </span>
          <h2 className="text-3xl leading-tight font-semibold sm:text-5xl">
            Menos que um dia de SDR por mês.
          </h2>
          <p className="text-muted-foreground max-w-[540px] text-base font-medium sm:text-xl">
            Comece grátis. Suba de plano quando a fila apertar.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {SEALS.map((seal) => (
              <li
                key={seal}
                className="flex items-center gap-1.5 rounded-full bg-emerald-500/12 px-3.5 py-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400"
              >
                <ShieldCheckIcon className="size-4" aria-hidden="true" />
                {seal}
              </li>
            ))}
          </ul>

          {/* Seletor Mensal / Anual */}
          <div
            role="group"
            aria-label="Ciclo de cobrança"
            className="glass-1 dark:glass-2 mt-1 inline-flex items-center gap-1 rounded-full p-1.5 shadow-lg"
          >
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={cn(
                "cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors sm:text-base",
                !isAnnual
                  ? "bg-brand text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Mensal
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors sm:text-base",
                isAnnual
                  ? "bg-brand text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span>Anual</span>
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-bold",
                  isAnnual
                    ? "bg-background/20 text-background"
                    : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
                )}
              >
                2 meses grátis
              </span>
            </button>
          </div>
        </div>

        {/* Mesmos cartões da página de planos do sistema */}
        <AtlasPlanos anual={isAnnual} />

        {/* Plano Enterprise em destaque abaixo dos 4 planos */}
        <Reveal className="w-full">
          <div className="glass-2 dark:glass-3 border-brand/35 relative grid w-full items-center gap-8 overflow-hidden rounded-3xl border p-6 shadow-2xl sm:p-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 -right-32 size-[28rem] bg-[radial-gradient(closest-side,var(--brand),transparent)] opacity-25"
            />
            <div className="relative flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-brand/15 text-brand rounded-full px-3 py-1 text-xs font-bold tracking-[0.14em] uppercase">
                  Sob medida
                </span>
                <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                  Para operações personalizadas
                </span>
              </div>
              <h3 className="text-2xl leading-tight font-bold text-balance sm:text-4xl">
                Plano Enterprise
              </h3>
              <p className="text-muted-foreground max-w-[540px] text-sm leading-relaxed sm:text-base">
                Precisa de mais volume, fontes de dados dedicadas ao seu nicho e acompanhamento próximo? Montamos o Plano Enterprise sob medida para a sua operação.
              </p>
              <ul className="grid gap-2.5 pt-1 sm:grid-cols-2">
                {[
                  "Créditos e usuários sob medida",
                  "Fontes de dados dedicadas ao seu nicho",
                  "Implementação e treinamento do time",
                  "Integração com seu CRM, API e gerente dedicado",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs font-medium sm:text-sm">
                    <span className="bg-brand size-1.5 shrink-0 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-border/25 bg-background/60 relative flex flex-col items-start justify-between gap-4 rounded-2xl border p-6 shadow-lg sm:items-center sm:text-center lg:items-end lg:text-right">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
                  Demonstração de 20 minutos
                </span>
                <p className="text-foreground text-base font-semibold sm:text-lg">
                  Veja o Atlas rodando no cenário da sua empresa
                </p>
                <span className="text-muted-foreground text-xs sm:text-sm">
                  Orçamento e escopo definidos direto com nosso especialista.
                </span>
              </div>
              <LinkButton
                href={siteConfig.links.demo}
                size="lg"
                variant="glow"
                className="w-full sm:w-auto"
                icon={<CalendarClockIcon className="mr-2 size-4" />}
              >
                Falar com consultor
              </LinkButton>
            </div>
          </div>
        </Reveal>

        <p className="text-muted-foreground text-center text-sm sm:text-base">
          Pix ou cartão pelo Asaas: Qualificar custa 1 crédito e{" "}
          <Good>só é cobrado se trouxer dado novo</Good>. No upgrade você paga
          apenas a diferença.
        </p>
      </div>
    </Section>
  );
}
