import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import Atlas from "../logos/atlas";

interface AnnouncementProps {
  href: string;
  className?: string;
}

export function Announcement({ href, className }: AnnouncementProps) {
  return (
    <a
      href={href}
      className={cn(
        "group glass-2 dark:glass-3 animate-shimmer relative flex w-full max-w-[520px] items-center gap-3.5 rounded-2xl p-3 pr-4 text-left shadow-xl ring-1 ring-white/5 transition-all duration-300 outline-none hover:-translate-y-0.5 hover:shadow-emerald-500/10 focus-visible:ring-2 focus-visible:ring-emerald-400/60",
        className,
      )}
    >
      <span className="bg-brand/12 ring-brand/25 relative flex size-11 shrink-0 items-center justify-center rounded-xl ring-1 sm:size-12">
        <Atlas className="size-6" />
        <span className="absolute -top-0.5 -right-0.5 flex size-3">
          <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
          <span className="ring-background relative inline-flex size-3 rounded-full bg-emerald-400 ring-2" />
        </span>
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-brand text-xs font-semibold tracking-wider uppercase">
          Novo · Agente Atlas
        </span>
        <span className="text-foreground text-sm leading-snug font-semibold sm:text-base">
          Qualifica e move seus leads no CRM sozinho
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
