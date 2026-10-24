import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import Glow from "../../ui/glow";
import { Good } from "../../ui/highlight";
import { LinkButton, type LinkButtonProps } from "../../ui/link-button";
import { Section } from "../../ui/section";

interface CTAButtonProps extends Omit<LinkButtonProps, "children"> {
  text: string;
}

interface CTAProps {
  title?: string;
  buttons?: CTAButtonProps[] | false;
  className?: string;
}

const DEFAULT_CTA_BUTTONS: CTAButtonProps[] = [
  {
    href: siteConfig.getStartedUrl,
    text: "Testar grátis com 25 créditos",
    variant: "default",
  },
];

export default function CTA({
  title = "Sua próxima reunião já está na base do Atlas.",
  buttons = DEFAULT_CTA_BUTTONS,
  className,
}: CTAProps) {
  return (
    <Section className={cn("group relative overflow-hidden", className)}>
      <div className="max-w-container relative z-10 mx-auto grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-7 lg:items-start lg:text-left">
          <h2 className="max-w-[640px] text-3xl leading-tight font-semibold text-balance sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          {buttons !== false && buttons.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4">
              {buttons.map((button) => (
                <LinkButton
                  key={`${button.href}-${button.text}`}
                  variant={button.variant || "default"}
                  size="lg"
                  href={button.href}
                  icon={button.icon}
                  iconRight={button.iconRight}
                >
                  {button.text}
                </LinkButton>
              ))}
            </div>
          )}
          <p className="text-muted-foreground text-sm sm:text-base">
            <Good>Sem cartão.</Good>{" "}
            <a
              href={siteConfig.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand font-semibold hover:underline"
            >
              Prefere agendar uma demonstração?
            </a>
          </p>
        </div>
        <DayWidget />
      </div>
      <div className="absolute top-0 left-0 h-full w-full translate-y-[1rem] opacity-80 transition-[transform,opacity] duration-500 ease-in-out group-hover:opacity-100 motion-safe:group-hover:translate-y-[-2rem]">
        <Glow variant="bottom" />
      </div>
    </Section>
  );
}

function DayWidget() {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  return (
    <div
      aria-hidden="true"
      className="glass-2 dark:glass-3 mx-auto flex w-full max-w-[420px] flex-col gap-5 rounded-2xl p-6 shadow-2xl"
    >
      <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        Ritmo do mês
      </span>
      <div className="flex items-center gap-5">
        <div className="relative size-24 shrink-0">
          <svg viewBox="0 0 100 100" className="size-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              strokeWidth="8"
              className="stroke-foreground/10"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              className="stroke-brand"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * 0}
            />
          </svg>
          <span className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold tabular-nums">105%</span>
            <span className="text-muted-foreground text-xs uppercase">da meta</span>
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-lg leading-snug font-semibold">
            No ritmo atual, você bate a meta.
          </span>
          <span className="w-fit rounded-full bg-emerald-500/12 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-500">
            21 de 20 reuniões previstas
          </span>
        </div>
      </div>
      <div className="border-border/15 flex items-center justify-between border-t pt-4 text-sm sm:text-base">
        <span className="text-muted-foreground">Próximo bloco: 14:00 · ligação</span>
        <span className="text-brand font-semibold">Ligar agora</span>
      </div>
    </div>
  );
}
