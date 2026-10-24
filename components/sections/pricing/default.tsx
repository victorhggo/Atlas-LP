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
import { PricingColumn } from "../../ui/pricing-column";
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

        {/* Card do Plano Grátis (Item 4) */}
        <Reveal className="w-full">
          <div className="glass-1 dark:glass-3 relative grid w-full items-center gap-6 overflow-hidden rounded-2xl p-6 shadow-xl sm:p-8 lg:grid-cols-[1.05fr_1.45fr] lg:gap-10">
            <hr className="via-foreground/40 absolute top-0 left-[10%] h-[1px] w-[80%] border-0 bg-linear-to-r from-transparent to-transparent" />
            <div className="flex flex-col items-start gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-bold sm:text-2xl">Grátis</h3>
                <span className="border-brand/30 bg-brand/10 text-brand rounded-full border px-3 py-1 text-xs font-semibold">
                  Testar hoje
                </span>
                <span className="rounded-full bg-emerald-500/12 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Sem cartão
                </span>
              </div>
              <div className="flex flex-wrap items-baseline gap-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-muted-foreground text-xl font-bold">R$</span>
                  <span className="text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">0</span>
                </div>
                <span className="rounded-full bg-emerald-500/12 px-3 py-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  25 créditos inclusos
                </span>
              </div>
              <LinkButton
                href={siteConfig.getStartedUrl}
                variant="glow"
                size="lg"
                iconRight={<ArrowRightIcon className="ml-2 size-4" />}
              >
                Testar grátis com 25 créditos
              </LinkButton>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-brand text-sm font-semibold sm:text-base">
                O que vem no plano Grátis:
              </p>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {FREE_FEATURES.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      <CheckIcon className="size-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* 3 Colunas Principais: Essencial · Pro · Equipe */}
        <div className="max-w-container mx-auto grid w-full grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3 lg:items-center">
          {/* ESSENCIAL */}
          <PricingColumn
            name="Essencial"
            description="Para prospectar todo dia com rotina pronta."
            tags={["CRM", "VoIP"]}
            price={isAnnual ? 80.83 : 97}
            priceDisplay={isAnnual ? "80,83" : "97"}
            variantNote={
              isAnnual ? (
                <>
                  <span className="text-foreground font-semibold">R$ 970 no ano</span> · 2 meses grátis
                </>
              ) : (
                <>
                  No anual: <span className="text-foreground font-semibold">R$ 80,83/mês</span> (R$ 970/ano)
                </>
              )
            }
            priceDetail="200 créditos por mês"
            guarantee="Sem fidelidade"
            priceNote="1 crédito = 1 decisor. Renova todo mês."
            cta={{ variant: "glow", label: "Assinar Essencial", href: siteConfig.getStartedUrl }}
            features={[
              "200 decisores por mês",
              "Revelar número do sócio e até 3 telefones",
              "“O que fazer hoje” (checklist do dia)",
              "Dores do nicho na ficha",
              "CRM completo + Tela Ligar com meta e agenda",
              "Importação e exportação em Excel, CSV e PDF",
            ]}
            variant="default"
          />

          {/* PRO (Destaque central) */}
          <PricingColumn
            name="Pro"
            badge="Mais escolhido"
            description="Prospecta, conversa e fecha no mesmo lugar."
            tags={[
              "Agente Atlas",
              "WhatsApp",
              "Cadências inteligentes",
              "Integrações",
              "Algoritmo de dados",
              "Scripts na tela",
              "Follow-up",
            ]}
            price={isAnnual ? 247.5 : 297}
            priceDisplay={isAnnual ? "247,50" : "297"}
            variantNote={
              <span className="flex flex-col gap-0.5">
                <span>
                  {isAnnual ? (
                    <>
                      <span className="text-foreground font-semibold">R$ 2.970 no ano</span> · 2 meses grátis
                    </>
                  ) : (
                    <>
                      No anual:{" "}
                      <span className="text-foreground font-semibold">R$ 247,50/mês</span> (R$ 2.970/ano)
                    </>
                  )}
                </span>
                <span>
                  Com 2 usuários: <span className="text-foreground font-semibold">R$ 500/mês</span> e 1.000 créditos
                </span>
              </span>
            }
            priceDetail="800 créditos por mês · 4x o Essencial"
            guarantee="Cancele quando quiser"
            priceNote="Inclui onboarding com a equipe e suporte prioritário."
            cta={{ variant: "default", label: "Quero o Pro", href: siteConfig.getStartedUrl }}
            featuresLabel="Tudo do Essencial, mais:"
            features={[
              "Agente Atlas: qualifica e move o lead no CRM",
              "800 decisores/mês + pesquisa aprofundada de 2 sócios",
              "Inteligência por nicho (dores, objeções e argumentos)",
              "WhatsApp no CRM + mensagem e follow-up programados",
              "Cadências multicanal e scripts de ligação na tela",
              "Transferência de leads com etiqueta de origem",
              "Lead do site e do Meta direto no quadro",
              "Webhooks, Make, Zapier e espelho no CRM dos Escolhidos",
              "Suporte prioritário",
            ]}
            variant="glow-brand"
          />

          {/* EQUIPE (Com Régua de 3 a 20 usuários) */}
          <PricingColumn
            name="Equipe"
            description="De 3 a 20 usuários com gestão completa."
            tags={[
              "Agente Atlas",
              "3 a 20 usuários",
              "Painel do líder",
              "Chat da equipe",
              "Atlas Academy",
              "Treinamentos",
              "Transferir leads",
            ]}
            pricePrefix={teamUsers === 3 && !isAnnual ? "a partir de" : `${teamUsers} usuários`}
            price={isAnnual ? Math.round(teamAnnualTotal / 12) : teamMonthlyPrice}
            priceDisplay={
              isAnnual ? teamAnnualMonthly : teamMonthlyPrice.toLocaleString("pt-BR")
            }
            variantNote={
              isAnnual ? (
                <>
                  <span className="text-foreground font-semibold">
                    R$ {teamAnnualTotal.toLocaleString("pt-BR")} no ano
                  </span>{" "}
                  · 2 meses grátis
                </>
              ) : (
                <>+ R$ 147 por usuário extra</>
              )
            }
            priceDetail={`${teamUsers} usuários · ${teamCredits.toLocaleString("pt-BR")} créditos/mês`}
            guarantee="Sem taxa de setup"
            priceNote="De 2.000 a 5.000 créditos conforme o tamanho do time."
            interactiveContent={
              <div className="border-border/15 bg-background/65 flex flex-col gap-3 rounded-xl border p-4 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Usuários na equipe</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      aria-label="Diminuir usuários"
                      disabled={teamUsers <= 3}
                      onClick={() => setTeamUsers((u) => Math.max(3, u - 1))}
                      className="border-border/25 hover:bg-foreground/10 flex size-7 cursor-pointer items-center justify-center rounded-md border disabled:opacity-30"
                    >
                      <MinusIcon className="size-3.5" />
                    </button>
                    <span className="text-brand w-20 text-center font-bold tabular-nums">
                      {teamUsers} usu.
                    </span>
                    <button
                      type="button"
                      aria-label="Aumentar usuários"
                      disabled={teamUsers >= 20}
                      onClick={() => setTeamUsers((u) => Math.min(20, u + 1))}
                      className="border-border/25 hover:bg-foreground/10 flex size-7 cursor-pointer items-center justify-center rounded-md border disabled:opacity-30"
                    >
                      <PlusIcon className="size-3.5" />
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min={3}
                  max={20}
                  step={1}
                  value={teamUsers}
                  onChange={(e) => setTeamUsers(Number(e.target.value))}
                  aria-label="Escolher número de usuários da equipe"
                  className="accent-[var(--brand)] h-2 w-full cursor-pointer"
                />
                <div className="grid grid-cols-5 gap-1 pt-0.5 text-center text-xs">
                  {CREDIT_TIERS.map((tier) => {
                    const active = teamUsers >= tier.min && teamUsers <= tier.max;
                    return (
                      <button
                        key={tier.label}
                        type="button"
                        onClick={() => setTeamUsers(tier.min)}
                        className={cn(
                          "cursor-pointer rounded-lg border px-1 py-1.5 transition-colors",
                          active
                            ? "border-brand/50 bg-brand/15 text-brand font-bold"
                            : "border-border/15 text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <span className="block">{tier.label}</span>
                        <span className="block font-semibold tabular-nums">
                          {tier.credits.toLocaleString("pt-BR")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            }
            cta={{
              variant: "default",
              label: `Assinar com ${teamUsers} usuários`,
              href: siteConfig.getStartedUrl,
            }}
            featuresLabel="Tudo do Pro, mais:"
            features={[
              "Painel do líder e créditos distribuídos pelo líder",
              "Cada vendedor vê só os próprios leads",
              "Chat da equipe com menção de leads",
              "Transferir lead entre vendedores",
              "“O que fazer hoje” e “O que fazer amanhã” por vendedor",
              "Pesquisa completa do decisor e de mais 1 sócio",
              "Atlas Academy e treinamentos",
            ]}
            variant="glow"
          />
        </div>

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

        {/* Empresas · proposta sob medida */}
        <div className="glass-1 dark:glass-2 flex w-full flex-col items-start justify-between gap-6 rounded-2xl p-6 shadow-xl sm:p-8 md:flex-row md:items-center">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-lg font-bold sm:text-xl">
              Empresas · proposta sob medida
            </h3>
            <p className="text-muted-foreground max-w-[580px] text-sm sm:text-base">
              Times grandes e operações de alto ticket com volume e fontes de dados personalizadas.
            </p>
          </div>
          <LinkButton
            variant="glow"
            size="lg"
            href={siteConfig.links.demo}
            icon={<CalendarClockIcon className="mr-2 size-4" />}
          >
            Agendar demonstração
          </LinkButton>
        </div>

        <p className="text-muted-foreground text-center text-sm sm:text-base">
          Pix ou cartão pelo Asaas · Qualificar custa 1 crédito e{" "}
          <Good>só é cobrado se trouxer dado novo</Good> · No upgrade você paga
          só a diferença.
        </p>
      </div>
    </Section>
  );
}
