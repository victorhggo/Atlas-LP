import { CheckIcon } from "lucide-react";
import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Reveal } from "./reveal";
import { Section } from "./section";

interface FeatureRowProps {
  id?: string;
  eyebrow: string;
  tag?: string;
  title: ReactNode;
  description?: ReactNode;
  bullets?: ReactNode[];
  visual: ReactNode;
  footer?: ReactNode;
  reverse?: boolean;
  className?: string;
}

export function FeatureRow({
  id,
  eyebrow,
  tag,
  title,
  description,
  bullets,
  visual,
  footer,
  reverse,
  className,
}: FeatureRowProps) {
  return (
    <Section id={id} className={cn("overflow-x-clip", className)}>
      <div
        className={cn(
          "max-w-container mx-auto grid grid-cols-1 items-center gap-10 lg:gap-16 [&>*]:min-w-0",
          reverse ? "lg:grid-cols-[1.15fr_1fr]" : "lg:grid-cols-[1fr_1.15fr]",
        )}
      >
        <Reveal
          from={reverse ? "right" : "left"}
          className={cn("flex flex-col items-start gap-5", reverse && "lg:order-2")}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">
              {eyebrow}
            </span>
            {tag && (
              <span className="border-brand/30 bg-brand/10 text-brand rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                {tag}
              </span>
            )}
          </div>
          <h2 className="text-3xl leading-[1.12] font-semibold tracking-tight text-balance sm:text-4xl lg:text-[42px]">
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground max-w-[520px] text-base leading-relaxed text-pretty sm:text-lg">
              {description}
            </p>
          )}
          {bullets && bullets.length > 0 && (
            <ul className="flex flex-col gap-3">
              {bullets.map((bullet, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-base leading-snug sm:text-lg"
                >
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-500">
                    <CheckIcon className="size-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-foreground/90 text-pretty">{bullet}</span>
                </li>
              ))}
            </ul>
          )}
          {footer}
        </Reveal>
        <Reveal
          from={reverse ? "left" : "right"}
          delay={120}
          className="group relative"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-x-6 top-1/2 -z-10 h-[120%] -translate-y-1/2 bg-[radial-gradient(closest-side,var(--brand),transparent)] opacity-25 transition-opacity duration-500 group-hover:opacity-40"
          />
          <div className="motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-translate-y-1">
            {visual}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
