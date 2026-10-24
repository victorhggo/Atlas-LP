"use client";

import {
  ArrowRightIcon,
  CalendarClockIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { Good } from "../../ui/highlight";
import { LinkButton } from "../../ui/link-button";
import { AtlasPlanos } from "./atlas-planos";
import { Reveal } from "../../ui/reveal";
import { Section } from "../../ui/section";

const SEALS = ["Sem fidelidade", "Cancele quando quiser", "Sem taxa de setup"];

const FREE_FEATURES = [
  "25 créditos com a pesquisa completa do Pro",
  "Listas ordenadas por quem ligar primeiro",
  "Site, Instagram, Google e e-mail",
  "Telefone da empresa e nome do sócio",
  "Roteiro na ficha",
];

const CREDIT_TIERS = [
  { label: "3–4", min: 3, max: 4, credits: 2000 },
  { label: "5–9", min: 5, max: 9, credits: 2500 },
  { label: "10–14", min: 10, max: 14, credits: 3000 },
  { label: "15–19", min: 15, max: 19, credits: 4000 },
  { label: "20", min: 20, max: 20, credits: 5000 },
];

function getTeamCredits(users: number): number {
  if (users <= 4) return 2000;
  if (users <= 9) return 2500;
  if (users <= 14) return 3000;
  if (users <= 19) return 4000;
  return 5000;
}

const RECARGAS = [
  { credits: 100, price: 97, perLead: "R$ 0,97 por decisor" },
  { credits: 500, price: 297, perLead: "R$ 0,59 por decisor", popular: true },
  { credits: 2000, price: 497, perLead: "R$ 0,25 por decisor" },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [teamUsers, setTeamUsers] = useState(3);

  const extraUsers = Math.max(0, teamUsers - 3);
  const teamMonthlyPrice = 997 + extraUsers * 147;
  const teamAnnualTotal = teamMonthlyPrice * 10;
  const teamAnnualMonthly = (teamAnnualTotal / 12).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const teamCredits = getTeamCredits(teamUsers);

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

        {/* Recargas que não expiram (Item 11) */}
        <Reveal className="w-full">
          <div className="glass-1 dark:glass-2 flex w-full flex-col gap-5 rounded-2xl p-6 shadow-xl sm:p-8">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-bold sm:text-xl">
                  Recargas avulsas que <span className="text-brand">não expiram</span>
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Compre créditos avulsos quando precisar — eles ficam na conta até usar.
                </p>
              </div>
              <span className="w-fit rounded-full bg-emerald-500/12 px-3.5 py-1.5 text-xs font-semibold text-emerald-600 sm:text-sm dark:text-emerald-400">
                Sem validade · entram na hora
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {RECARGAS.map((rec) => (
                <div
                  key={rec.credits}
                  className={cn(
                    "border-border/15 bg-background/60 flex items-center justify-between gap-4 rounded-xl border p-4 transition-transform duration-300 motion-safe:hover:-translate-y-0.5",
                    rec.popular && "border-brand/40 bg-brand/[0.04]",
                  )}
                >
                  <div className="flex flex-col">
                    <span className="text-lg font-bold tabular-nums sm:text-xl">
                      {rec.credits.toLocaleString("pt-BR")} créditos
                    </span>
                    <span className="text-muted-foreground text-xs sm:text-sm">{rec.perLead}</span>
                  </div>
                  <span className="text-brand text-2xl font-bold tabular-nums">
                    R$ {rec.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>


        <p className="text-muted-foreground text-center text-sm sm:text-base">
          Pix ou cartão pelo Asaas · Qualificar custa 1 crédito e{" "}
          <Good>só é cobrado se trouxer dado novo</Good> · No upgrade você paga
          só a diferença.
        </p>
      </div>
    </Section>
  );
}
