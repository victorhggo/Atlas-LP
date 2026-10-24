import { CheckIcon, PhoneIcon, ShieldCheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const card =
  "flow-step border-border/15 bg-background/70 relative flex flex-col gap-3 rounded-xl border p-4 shadow-lg";

function StepLabel({ n, children }: { n: number; children: string }) {
  return (
    <span className="text-muted-foreground flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
      <span className="bg-brand/15 text-brand flex size-5 items-center justify-center rounded-full text-xs font-bold">
        {n}
      </span>
      {children}
    </span>
  );
}

function Reveal2({ children, className }: { children: string; className?: string }) {
  return (
    <span className={cn("relative inline-grid truncate", className)}>
      <span className="flow-reveal-blur col-start-1 row-start-1 blur-[5px]">{children}</span>
      <span className="flow-reveal col-start-1 row-start-1">{children}</span>
    </span>
  );
}

export function HeroFlow({ className }: { className?: string }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "glass-2 dark:glass-3 relative w-full rounded-2xl p-3.5 shadow-2xl sm:p-5",
        className,
      )}
    >
      <div className="mb-3.5 flex items-center gap-2 overflow-hidden px-1">
        <span className="size-2.5 shrink-0 rounded-full bg-red-400/70" />
        <span className="size-2.5 shrink-0 rounded-full bg-amber-400/70" />
        <span className="size-2.5 shrink-0 rounded-full bg-emerald-400/70" />
        <span className="bg-foreground/5 text-muted-foreground ml-1 min-w-0 flex-1 truncate rounded-md px-2.5 py-1 text-xs font-medium">
          Clínicas de estética · SP · Fit Score
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 [&>*]:min-w-0">
        <div className={card} style={{ animationDelay: "0s" }}>
          <StepLabel n={1}>Lista</StepLabel>
          <span className="text-3xl font-bold tabular-nums sm:text-4xl">952</span>
          <span className="text-muted-foreground -mt-2 text-xs sm:text-sm">empresas ativas</span>
          <div className="flex flex-col gap-1.5">
            {["w-11/12", "w-4/5", "w-3/5"].map((w) => (
              <span key={w} className={cn("bg-foreground/12 block h-1.5 rounded-full", w)} />
            ))}
          </div>
        </div>
        <div className={card} style={{ animationDelay: "3s" }}>
          <StepLabel n={2}>Fit Score</StepLabel>
          <div className="flex items-center gap-3">
            <div className="relative size-16 shrink-0">
              <svg viewBox="0 0 64 64" className="size-full -rotate-90">
                <circle cx="32" cy="32" r={radius} fill="none" strokeWidth="6" className="stroke-foreground/10" />
                <circle
                  cx="32"
                  cy="32"
                  r={radius}
                  fill="none"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className="stroke-emerald-500"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * 0.08}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-bold tabular-nums">
                92
              </span>
            </div>
            <span className="text-muted-foreground text-xs leading-snug sm:text-sm">
              de 100 para o <span className="text-foreground font-semibold">seu</span> cliente ideal
            </span>
          </div>
        </div>
        <div className={card} style={{ animationDelay: "6s" }}>
          <StepLabel n={3}>Decisor</StepLabel>
          <div className="flex items-center gap-2.5">
            <span className="bg-brand/15 text-brand flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold">
              HC
            </span>
            <div className="flex min-w-0 flex-col">
              <Reveal2 className="text-sm font-semibold sm:text-base">Helena Costa</Reveal2>
              <span className="text-muted-foreground text-xs">Sócia · decide</span>
            </div>
          </div>
          <span className="flex items-center gap-1.5 text-xs sm:text-sm">
            <PhoneIcon className="text-brand size-4 shrink-0" />
            <Reveal2 className="font-medium tabular-nums">(11) 98721-4321</Reveal2>
            <ShieldCheckIcon className="ml-auto size-4 shrink-0 text-emerald-600 dark:text-emerald-500" />
          </span>
        </div>
        <div className={card} style={{ animationDelay: "9s" }}>
          <StepLabel n={4}>CRM</StepLabel>
          <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold">
            <span className="size-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
            Movido pelo Agente
          </span>
          <div className="flow-drop border-border/20 bg-foreground/[0.04] flex flex-col gap-1.5 rounded-lg border p-2.5">
            <span className="truncate text-sm font-semibold">Clínica Pura Pele</span>
            <span className="flex w-fit items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-500">
              <CheckIcon className="size-3" strokeWidth={3} />
              Lead qualificado
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
