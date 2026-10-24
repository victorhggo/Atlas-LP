"use client";

import { ArrowLeftIcon, ArrowRightIcon, PlayIcon, XIcon } from "lucide-react";
import { type ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "../../ui/button";

export interface TourStep {
  title: string;
  caption: string;
  path: string;
  content: ReactNode;
  // Mini-tela (centraliza com respiro) ou print (ocupa a janela toda)
  kind: "mock" | "image";
  // Onde fica o ponto pulsante, em % da janela
  hotspot?: { top: string; left: string };
}

interface DemoTourProps {
  steps: TourStep[];
  videoId?: string;
}

// Tour do produto: lista de etapas + janela do Atlas. Sem cadastro, sem iframe
// de terceiros. O vídeo do YouTube só carrega quando a pessoa clica nele.
export function DemoTour({ steps, videoId }: DemoTourProps) {
  const [index, setIndex] = useState(0);
  const [video, setVideo] = useState(false);
  const step = steps[index];
  const go = (i: number) => {
    setVideo(false);
    setIndex((i + steps.length) % steps.length);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr] lg:gap-8">
      <div
        role="tablist"
        aria-label="Etapas da demonstração"
        className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
      >
        {steps.map((s, i) => (
          <button
            key={s.title}
            role="tab"
            aria-selected={i === index}
            onClick={() => go(i)}
            className={cn(
              "flex shrink-0 snap-start items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand/60 lg:py-3",
              i === index
                ? "border-brand/50 bg-brand/10 text-foreground"
                : "border-border/10 text-muted-foreground hover:border-border/30 hover:text-foreground",
            )}
          >
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold tabular-nums",
                i === index ? "bg-brand text-background" : "bg-foreground/10",
              )}
            >
              {i + 1}
            </span>
            <span className="font-medium whitespace-nowrap lg:whitespace-normal">
              {s.title}
            </span>
          </button>
        ))}
        {videoId && (
          <button
            type="button"
            onClick={() => setVideo(true)}
            className={cn(
              "flex shrink-0 snap-start items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand/60 lg:mt-3 lg:py-3 cursor-pointer",
              video
                ? "border-red-500/50 bg-red-500/15 text-foreground ring-1 ring-red-500/30"
                : "border-red-500/30 bg-red-500/[0.05] text-foreground hover:border-red-500/50 hover:bg-red-500/10",
            )}
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-white shadow-sm">
              <PlayIcon className="size-3.5 fill-white" />
            </span>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold sm:text-sm">Vídeo de demonstração</span>
              <span className="text-muted-foreground text-xs">Assistir tour do Atlas</span>
            </div>
          </button>
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        <div className="glass-2 dark:glass-3 overflow-hidden rounded-2xl shadow-2xl">
          <div className="border-border/10 flex items-center gap-2 border-b px-4 py-3">
            <span className="size-2.5 rounded-full bg-red-400/70" />
            <span className="size-2.5 rounded-full bg-amber-400/70" />
            <span className="size-2.5 rounded-full bg-emerald-400/70" />
            <span className="bg-foreground/5 text-muted-foreground ml-2 min-w-0 flex-1 truncate rounded-md px-3 py-1 text-xs">
              atlas.escolhidospro.com.br{video ? "" : step.path}
            </span>
            {video && (
              <button
                onClick={() => setVideo(false)}
                aria-label="Fechar vídeo"
                className="text-muted-foreground hover:text-foreground"
              >
                <XIcon className="size-4" />
              </button>
            )}
          </div>
          <div
            role="tabpanel"
            className="bg-background/40 relative min-h-[380px] sm:min-h-[460px]"
          >
            {video && videoId ? (
              <iframe
                className="absolute inset-0 size-full"
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                title="Vídeo de demonstração do Atlas"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div key={index} className="animate-appear absolute inset-0">
                {step.kind === "image" ? (
                  <div className="absolute inset-0 overflow-hidden">{step.content}</div>
                ) : (
                  <div className="absolute inset-0 flex flex-col overflow-y-auto p-4 sm:p-8">
                    {/* m-auto centraliza sem cortar o topo quando a tela é mais alta que a janela */}
                    <div className="m-auto w-full max-w-[580px]">{step.content}</div>
                  </div>
                )}
                {step.hotspot && (
                  <span
                    className="pointer-events-none absolute flex size-5 -translate-x-1/2 -translate-y-1/2"
                    style={step.hotspot}
                  >
                    <span className="bg-brand absolute inline-flex size-full rounded-full opacity-60 motion-safe:animate-ping" />
                    <span className="bg-brand ring-background relative inline-flex size-5 rounded-full ring-4" />
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground max-w-[560px] text-sm sm:text-base" aria-live="polite">
            <span className="text-foreground font-semibold">
              {index + 1}/{steps.length} · {step.title}.
            </span>{" "}
            {step.caption}
          </p>
          <div className="flex shrink-0 gap-2">
            <Button variant="glow" size="icon" onClick={() => go(index - 1)} aria-label="Etapa anterior">
              <ArrowLeftIcon className="size-4" />
            </Button>
            <Button onClick={() => go(index + 1)}>
              {index === steps.length - 1 ? "Ver de novo" : "Próxima etapa"}
              <ArrowRightIcon className="ml-1 size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
