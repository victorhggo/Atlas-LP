import { ArrowRightIcon, PauseIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { WhatsApp } from "../logos/brands";

interface AnnouncementProps {
  href: string;
  className?: string;
}

// Selo do hero em formato de notificação do próprio produto: mostra a
// cadência pausando quando o lead responde, em vez de um "pill" genérico.
export function Announcement({ href, className }: AnnouncementProps) {
  return (
    <a
      href={href}
      className={cn(
        "group glass-2 dark:glass-3 relative flex w-full max-w-[540px] items-center gap-3 rounded-2xl p-2.5 pr-3 text-left shadow-xl ring-1 ring-white/5 transition-[box-shadow,background-color] duration-300 outline-none hover:shadow-emerald-500/10 focus-visible:ring-2 focus-visible:ring-emerald-400/60 sm:gap-4 sm:p-3 sm:pr-4",
        className,
      )}
    >
      <span className="relative flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/12 ring-1 ring-[#25D366]/25 sm:size-12">
        <WhatsApp className="size-6" aria-hidden="true" />
        {/* luz "ao vivo": o lead acabou de responder */}
        <span className="absolute -top-0.5 -right-0.5 flex size-3">
          <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
          <span className="ring-background relative inline-flex size-3 rounded-full bg-emerald-400 ring-2" />
        </span>
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-brand text-[11px] font-semibold tracking-[0.16em] uppercase">
          Novo · Cadências
        </span>
        <span className="text-foreground text-sm leading-snug font-semibold text-pretty sm:text-base">
          O WhatsApp para sozinho quando o lead responde
        </span>
        <span className="text-muted-foreground hidden items-center gap-1.5 text-xs sm:flex">
          <PauseIcon className="size-3 text-emerald-400" aria-hidden="true" />
          Lead respondeu · próximos follow-ups pausados
        </span>
      </span>
      <span className="border-border/60 text-muted-foreground group-hover:border-brand/50 group-hover:text-brand flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors">
        <ArrowRightIcon
          className="size-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </a>
  );
}
