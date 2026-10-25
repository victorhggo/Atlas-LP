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
import { AtlasPlanos, AtlasPlanosExtras } from "./atlas-planos";

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
        <AtlasPlanosExtras anual={isAnnual} />

        <p className="text-muted-foreground text-center text-sm sm:text-base">
          Pix ou cartão pelo Asaas: Qualificar custa 1 crédito e{" "}
          <Good>só é cobrado se trouxer dado novo</Good>. No upgrade você paga
          apenas a diferença.
        </p>
      </div>
    </Section>
  );
}
