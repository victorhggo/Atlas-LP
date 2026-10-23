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
    text: "Testar grátis com 25 decisores",
    variant: "default",
  },
];

export default function CTA({
  title = "Sua próxima reunião está numa lista que você ainda não montou.",
  buttons = DEFAULT_CTA_BUTTONS,
  className,
}: CTAProps) {
  return (
    <Section className={cn("group relative overflow-hidden", className)}>
      <div className="max-w-container relative z-10 mx-auto grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-8 lg:items-start lg:text-left">
          <h2 className="max-w-[720px] text-3xl leading-tight font-semibold text-balance sm:text-5xl sm:leading-tight">
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
          <p className="text-muted-foreground text-sm">
            <Good>Sem cartão.</Good> Monte a primeira lista agora.
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

// Réplica do card "Trabalho do dia" do Painel do Atlas: é o que a pessoa vê
// no primeiro dia depois de montar a lista.
function DayWidget() {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  return (
    <div
      aria-hidden="true"
      className="glass-2 dark:glass-3 mx-auto flex w-full max-w-[420px] flex-col gap-5 rounded-2xl p-6 shadow-2xl"
    >
      <span className="text-muted-foreground text-[11px] font-semibold tracking-[0.16em] uppercase">
        Trabalho do dia
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
              strokeDashoffset={circumference * 0.65}
            />
          </svg>
          <span className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold tabular-nums">7/20</span>
            <span className="text-muted-foreground text-[10px] tracking-wider uppercase">
              hoje
            </span>
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-lg leading-snug font-semibold">
            Faltam 13 ligações hoje.
          </span>
          <span className="w-fit rounded-full bg-emerald-500/12 px-2.5 py-1 text-xs font-semibold text-emerald-500">
            2 reuniões agendadas
          </span>
        </div>
      </div>
      <div className="border-border/15 flex items-center justify-between border-t pt-4 text-sm">
        <span className="text-muted-foreground">Meta de hoje: 20 ligações</span>
        <span className="text-brand font-semibold">Ligar agora</span>
      </div>
    </div>
  );
}
