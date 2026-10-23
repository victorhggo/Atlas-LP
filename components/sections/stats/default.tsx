import { type ReactNode } from "react";

import { CountUp } from "../../ui/count-up";
import { Good } from "../../ui/highlight";
import { Section } from "../../ui/section";

interface StatItemProps {
  label?: string;
  value: number;
  suffix?: string;
  description?: ReactNode;
}

interface StatsProps {
  title?: string;
  items?: StatItemProps[] | false;
  className?: string;
}

// Números tirados do próprio sistema (tela Criar lista e Dúvidas)
const DEFAULT_STATS: StatItemProps[] = [
  {
    label: "mais de",
    value: 200,
    suffix: "+",
    description: "segmentos prontos para virar lista",
  },
  {
    label: "até",
    value: 10000,
    description: "empresas por lista, em ordem de prioridade",
  },
  {
    label: "verifica",
    value: 8,
    suffix: "+",
    description: "ativos digitais por empresa",
  },
  {
    label: "custa",
    value: 1,
    suffix: "crédito",
    description: (
      <>
        por decisor. Sem dado real, <Good>não cobra</Good>
      </>
    ),
  },
];

export default function Stats({
  title = "Feito para quem prospecta todo dia",
  items = DEFAULT_STATS,
  className,
}: StatsProps) {
  return (
    <Section className={className}>
      <div className="container mx-auto flex max-w-[960px] flex-col gap-12 sm:gap-16">
        {title && (
          <h2 className="text-center text-2xl leading-tight font-semibold sm:text-4xl">
            {title}
          </h2>
        )}
        {items !== false && items.length > 0 && (
          <div className="grid grid-cols-2 gap-12 sm:grid-cols-4">
            {items.map((item) => (
              <div
                key={`${item.label}-${item.value}`}
                className="flex flex-col items-start gap-3 text-left"
              >
                {item.label && (
                  <div className="text-muted-foreground text-sm font-semibold">
                    {item.label}
                  </div>
                )}
                <div className="flex items-baseline gap-2">
                  <div className="from-foreground to-foreground dark:to-brand bg-linear-to-r bg-clip-text text-4xl font-medium text-transparent drop-shadow-[2px_1px_24px_var(--brand-foreground)] sm:text-5xl md:text-6xl">
                    <CountUp value={item.value} />
                  </div>
                  {item.suffix && (
                    <div className="text-brand text-2xl font-semibold">
                      {item.suffix}
                    </div>
                  )}
                </div>
                {item.description && (
                  <div className="text-muted-foreground text-sm font-semibold text-pretty">
                    {item.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
