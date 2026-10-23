import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, ShieldCheckIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";

const pricingColumnVariants = cva(
  "max-w-container relative flex flex-col gap-6 overflow-hidden rounded-2xl p-6 shadow-xl motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1 sm:p-8",
  {
    variants: {
      variant: {
        default: "glass-1 to-transparent dark:glass-3",
        glow: "glass-2 to-transparent dark:glass-3 after:content-[''] after:absolute after:-top-[128px] after:left-1/2 after:h-[128px] after:w-[100%] after:max-w-[960px] after:-translate-x-1/2 after:rounded-[50%] dark:after:bg-foreground/30 after:blur-[72px]",
        "glow-brand":
          "glass-3 from-card/100 to-card/100 dark:glass-4 ring-brand/60 ring-1 shadow-brand/20 shadow-2xl lg:-my-4 lg:py-12 after:content-[''] after:absolute after:-top-[128px] after:left-1/2 after:h-[128px] after:w-[100%] after:max-w-[960px] after:-translate-x-1/2 after:rounded-[50%] after:bg-brand-foreground/70 after:blur-[72px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface PricingColumnProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof pricingColumnVariants> {
  name: string;
  icon?: ReactNode;
  // Selo no topo do card, ex.: "Mais escolhido"
  badge?: string;
  description: string;
  price: number;
  pricePrefix?: string;
  pricePeriod?: string;
  // Destaque verde abaixo do preço, ex.: créditos inclusos
  priceDetail?: string;
  // Linha de segurança com cadeado verde, ex.: "Cancele quando quiser"
  guarantee?: string;
  priceNote: string;
  cta: {
    variant: "glow" | "default";
    label: string;
    href: string;
  };
  // Primeiro item pode ser um rótulo como "Tudo do Essencial, mais:"
  featuresLabel?: string;
  features: ReactNode[];
}

export function PricingColumn({
  name,
  icon,
  badge,
  description,
  price,
  pricePrefix,
  pricePeriod = "/mês",
  priceDetail,
  guarantee,
  priceNote,
  cta,
  featuresLabel,
  features,
  variant,
  className,
  ...props
}: PricingColumnProps) {
  return (
    <div
      className={cn(pricingColumnVariants({ variant, className }))}
      {...props}
    >
      <hr
        className={cn(
          "via-foreground/60 absolute top-0 left-[10%] h-[1px] w-[80%] border-0 bg-linear-to-r from-transparent to-transparent",
          variant === "glow-brand" && "via-brand",
        )}
      />
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="flex items-center gap-2 text-lg font-bold">
              {icon && (
                <span className="text-muted-foreground flex items-center">
                  {icon}
                </span>
              )}
              {name}
            </h3>
            {badge && (
              <span className="bg-brand text-background flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase shadow-lg">
                <SparklesIcon className="size-3.5" aria-hidden="true" />
                {badge}
              </span>
            )}
          </div>
          <p className="text-muted-foreground text-sm text-pretty">
            {description}
          </p>
        </header>
        <section className="flex flex-col gap-2">
          {pricePrefix && (
            <span className="text-muted-foreground text-sm">{pricePrefix}</span>
          )}
          <div className="flex items-baseline gap-1">
            <span className="text-muted-foreground text-xl font-bold">R$</span>
            <span className="text-5xl font-bold tracking-tight tabular-nums sm:text-6xl">
              {price.toLocaleString("pt-BR")}
            </span>
            {price > 0 && (
              <span className="text-muted-foreground text-base font-medium">
                {pricePeriod}
              </span>
            )}
          </div>
          {priceDetail && (
            <span className="w-fit rounded-full bg-emerald-500/12 px-3 py-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {priceDetail}
            </span>
          )}
        </section>
        <Button variant={cta.variant} size="lg" asChild>
          <Link href={cta.href}>{cta.label}</Link>
        </Button>
        <div className="flex flex-col gap-1.5">
          {guarantee && (
            <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              <ShieldCheckIcon className="size-4 shrink-0" aria-hidden="true" />
              {guarantee}
            </p>
          )}
          <p className="text-muted-foreground text-sm text-pretty">
            {priceNote}
          </p>
        </div>
        <hr className="border-input" />
      </div>
      <div className="flex flex-col gap-3">
        {featuresLabel && (
          <p className="text-brand text-sm font-semibold">{featuresLabel}</p>
        )}
        <ul className="flex flex-col gap-2.5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm">
              <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <CheckIcon className="size-3" strokeWidth={3} aria-hidden="true" />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { pricingColumnVariants };
