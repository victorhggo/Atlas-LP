import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, ShieldCheckIcon } from "lucide-react";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";

const pricingColumnVariants = cva(
  "max-w-container relative flex flex-col gap-6 overflow-hidden rounded-2xl p-6 shadow-xl motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1 sm:p-8",
  {
    variants: {
      variant: {
        default: "glass-1 to-transparent dark:glass-3",
        glow: "glass-2 to-transparent dark:glass-3 after:content-[''] after:absolute after:-top-[160px] after:left-1/2 after:h-[256px] after:w-[100%] after:max-w-[960px] after:-translate-x-1/2 after:bg-[radial-gradient(closest-side,var(--foreground),transparent)] after:opacity-10 dark:after:opacity-25",
        "glow-brand":
          "glass-3 from-card/100 to-card/100 dark:glass-4 ring-brand/60 ring-1 shadow-brand/20 shadow-2xl lg:-my-4 lg:py-12 after:content-[''] after:absolute after:-top-[160px] after:left-1/2 after:h-[256px] after:w-[100%] after:max-w-[960px] after:-translate-x-1/2 after:bg-[radial-gradient(closest-side,var(--brand-foreground),transparent)] after:opacity-70",
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
  badge?: string;
  tag?: string;
  tags?: string[];
  variantNote?: ReactNode;
  description: string;
  price: number;
  priceDisplay?: ReactNode;
  pricePrefix?: string;
  pricePeriod?: string;
  priceDetail?: string;
  guarantee?: string;
  priceNote: ReactNode;
  cta: {
    variant: "glow" | "default";
    label: string;
    href: string;
  };
  interactiveContent?: ReactNode;
  featuresLabel?: string;
  features: ReactNode[];
}

export function PricingColumn({
  name,
  badge,
  tag,
  tags,
  variantNote,
  description,
  price,
  priceDisplay,
  pricePrefix,
  pricePeriod = "/mês",
  priceDetail,
  guarantee,
  priceNote,
  cta,
  interactiveContent,
  featuresLabel,
  features,
  variant,
  className,
  ...props
}: PricingColumnProps) {
  const isExternal = cta.href.startsWith("http://") || cta.href.startsWith("https://");
  const allTags = tags && tags.length > 0 ? tags : tag ? [tag] : [];

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
        <header className="flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl font-bold sm:text-2xl">{name}</h3>
            {badge && (
              <span className="bg-brand text-background rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase shadow-lg">
                {badge}
              </span>
            )}
          </div>
          <p className="text-muted-foreground text-base text-pretty">
            {description}
          </p>
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {allTags.map((t) => {
                const isAgent = t === "Agente Atlas";
                return (
                  <span
                    key={t}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
                      isAgent
                        ? "border-brand/35 bg-brand/12 text-brand"
                        : "border-border/20 bg-foreground/[0.04] text-foreground/85 font-medium",
                    )}
                  >
                    {isAgent && (
                      <span className="size-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                    )}
                    {t}
                  </span>
                );
              })}
            </div>
          )}
        </header>

        <section className="flex flex-col gap-2">
          {pricePrefix && (
            <span className="text-muted-foreground text-sm font-medium">{pricePrefix}</span>
          )}
          <div className="flex items-baseline gap-1">
            <span className="text-muted-foreground text-xl font-bold">R$</span>
            <span className="text-5xl font-bold tracking-tight tabular-nums sm:text-6xl">
              {priceDisplay ?? price.toLocaleString("pt-BR")}
            </span>
            {price > 0 && pricePeriod && (
              <span className="text-muted-foreground text-base font-medium">
                {pricePeriod}
              </span>
            )}
          </div>
          {variantNote && (
            <span className="text-muted-foreground text-sm sm:text-base">{variantNote}</span>
          )}
          {priceDetail && (
            <span className="w-fit rounded-full bg-emerald-500/12 px-3 py-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {priceDetail}
            </span>
          )}
        </section>

        {interactiveContent}

        <Button variant={cta.variant} size="lg" asChild>
          <a
            href={cta.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            {cta.label}
          </a>
        </Button>

        <div className="flex flex-col gap-1.5">
          {guarantee && (
            <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
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
          <p className="text-brand text-sm font-semibold sm:text-base">{featuresLabel}</p>
        )}
        <ul className="flex flex-col gap-2.5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm leading-snug sm:text-base">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
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
