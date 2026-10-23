import { CheckIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Section } from "../../ui/section";

interface CompareProps {
  title?: string;
  before?: string[];
  after?: string[];
  className?: string;
}

const DEFAULT_BEFORE = [
  "Horas no Google e no Instagram montando lista",
  "Ligação que cai na recepção",
  "Planilha que ninguém atualiza",
  "Follow-up que fica esquecido",
  "Meta do dia no achismo",
];

const DEFAULT_AFTER = [
  "Lista pronta em 3 passos, com a contagem grátis",
  "O número do decisor na ficha da empresa",
  "CRM que se atualiza a cada ligação registrada",
  "Cadência que lembra e para sozinha quando o lead responde",
  "Ligações por dia calculadas a partir da sua meta",
];

function Column({
  label,
  items,
  positive,
}: {
  label: string;
  items: string[];
  positive?: boolean;
}) {
  const Icon = positive ? CheckIcon : XIcon;
  return (
    <div
      className={cn(
        "relative flex flex-col gap-5 overflow-hidden rounded-2xl border p-6 shadow-xl sm:p-8",
        positive
          ? "border-emerald-500/30 bg-emerald-500/[0.06]"
          : "border-red-500/25 bg-red-500/[0.05]",
      )}
    >
      <h3
        className={cn(
          "text-sm font-semibold tracking-[0.14em] uppercase",
          positive
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-red-600 dark:text-red-400",
        )}
      >
        {label}
      </h3>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-base sm:text-lg">
            <span
              className={cn(
                "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full",
                positive
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                  : "bg-red-500/15 text-red-600 dark:text-red-400",
              )}
            >
              <Icon className="size-4" strokeWidth={2.5} aria-hidden="true" />
            </span>
            <span
              className={cn(
                !positive &&
                  "text-muted-foreground decoration-red-500/50 decoration-1 line-through",
              )}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Compare({
  title = "A prospecção que você faz hoje, e a que você pode fazer amanhã",
  before = DEFAULT_BEFORE,
  after = DEFAULT_AFTER,
  className,
}: CompareProps) {
  return (
    <Section className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-10 sm:gap-16">
        <h2 className="max-w-[760px] text-center text-3xl leading-tight font-semibold text-balance sm:text-5xl sm:leading-tight">
          {title}
        </h2>
        <div className="grid w-full max-w-[980px] gap-6 md:grid-cols-2">
          <Column label="Sem o Atlas" items={before} />
          <Column label="Com o Atlas" items={after} positive />
        </div>
      </div>
    </Section>
  );
}
