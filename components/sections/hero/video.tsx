"use client";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/** Demonstração real do CRM do Atlas: quadro, ficha do lead e Ficha Atlas. Vídeo curto, sem som, em loop. */
export function HeroVideo({ className }: { className?: string }) {
  // O React não escreve "muted" no HTML; sem ele alguns navegadores não deixam o vídeo tocar sozinho.
  const ref = useRef<HTMLVideoElement>(null);
  const ref2 = useRef<HTMLVideoElement>(null);
  useEffect(() => { for (const v of [ref.current, ref2.current]) { if (!v) continue; v.muted = true; v.play().catch(() => {}); } }, []);
  return (
    <figure className={cn("relative m-0 w-full", className)}>
      <div className="border-border/70 bg-background/80 shadow-[0_30px_80px_-30px_rgba(37,99,235,0.45)] overflow-hidden rounded-2xl border backdrop-blur">
        <div className="border-border/60 flex items-center gap-2 border-b px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
          <span className="bg-muted text-muted-foreground ml-2 flex-1 truncate rounded-md px-3 py-1 text-xs">
            atlas.escolhidospro.com.br/crm
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
            Sistema real
          </span>
        </div>
        {/* claro (padrão) e escuro: cada um toca no tema da página */}
        {(["light", "dark"] as const).map((t) => (
          <video
            key={t}
            ref={t === "light" ? ref : ref2}
            className={`aspect-[1600/1024] w-full object-cover ${t === "light" ? "block bg-white dark:hidden" : "hidden bg-[#0B1220] dark:block"}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={`/atlas/video/crm-demo${t === "light" ? "-light" : ""}-poster.jpg`}
            aria-label="Demonstração do CRM do Atlas: abrindo um lead no quadro, os canais encontrados e a Ficha Atlas"
          >
            <source src={`/atlas/video/crm-demo${t === "light" ? "-light" : ""}.webm`} type="video/webm" />
            <source src={`/atlas/video/crm-demo${t === "light" ? "-light" : ""}.mp4`} type="video/mp4" />
          </video>
        ))}
      </div>
      <figcaption className="text-muted-foreground mt-3 text-center text-sm">
        O CRM do Atlas por dentro: o lead no quadro, os canais encontrados e a Ficha Atlas completa.
      </figcaption>
    </figure>
  );
}
