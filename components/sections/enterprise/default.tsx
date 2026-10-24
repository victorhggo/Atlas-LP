import { CalendarClockIcon } from "lucide-react";

import { siteConfig } from "@/config/site";

import { LinkButton } from "../../ui/link-button";
import { Section } from "../../ui/section";

const SEGMENTS = ["SaaS", "Imobiliárias", "Concessionárias", "Indústrias", "Times grandes"];
const ENTREGAS = [
  "Créditos e usuários sob medida",
  "Mais fontes de dados e algoritmo dedicado ao seu nicho",
  "Implementação e treinamento do time",
  "Integração com o seu CRM e API",
  "Gerente de conta dedicado",
];

export default function Enterprise() {
  return (
    <Section id="empresas">
      <div className="max-w-container glass-2 dark:glass-3 relative mx-auto grid items-center gap-8 overflow-hidden rounded-3xl p-6 shadow-2xl sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 size-[28rem] opacity-25 bg-[radial-gradient(closest-side,var(--brand),transparent)]"
        />
        <div className="relative flex flex-col gap-5">
          <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">
            Atlas Enterprise
          </span>
          <h2 className="text-3xl leading-tight font-semibold text-balance sm:text-4xl">
            O plano feito sob medida para a sua operação.
          </h2>
          <p className="text-muted-foreground max-w-[520px] text-base sm:text-lg">
            Para empresas que precisam de mais volume, dados exclusivos e um time
            inteiro prospectando. Orçamento em uma demonstração de 20 minutos.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {ENTREGAS.map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm">
                <span className="bg-brand mt-1.5 size-1.5 shrink-0 rounded-full" />
                {t}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {SEGMENTS.map((label) => (
              <span
                key={label}
                className="border-border/25 bg-foreground/[0.03] rounded-full border px-3.5 py-1.5 text-sm font-medium"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="relative flex flex-col items-start gap-3 lg:items-end">
          <LinkButton
            href={siteConfig.links.demo}
            icon={<CalendarClockIcon className="mr-2 size-4" />}
          >
            Montar meu plano Enterprise
          </LinkButton>
          <span className="text-muted-foreground text-sm">
            Atendimento direto com o comercial.
          </span>
        </div>
      </div>
    </Section>
  );
}
