// Mini-telas do bento de funcionalidades. Cada uma reproduz, em HTML leve,
// um elemento real do Atlas (ficha do decisor, fila, funil da Meta, CRM...).
// Os nomes e números são ilustrativos; nenhum dado de cliente aparece aqui.
import {
  CheckIcon,
  GlobeIcon,
  PauseIcon,
  PhoneIcon,
  ShieldCheckIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Facebook,
  GoogleMaps,
  Instagram,
  LinkedIn,
  WhatsApp,
} from "../../logos/brands";

const panel =
  "border-border/15 bg-background/70 rounded-xl border p-3 text-xs shadow-lg sm:p-4";

// Barras cinza no lugar de texto: deixa claro que é ilustração
function Bar({ className }: { className?: string }) {
  return <span className={cn("bg-foreground/15 block h-2 rounded-full", className)} />;
}

export function DecisorVisual() {
  return (
    <div className={panel}>
      <div className="flex items-center gap-3">
        <span className="bg-brand/15 text-brand flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold">
          HC
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <Bar className="w-32" />
          <span className="text-muted-foreground">Sócia-administradora</span>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-emerald-500/12 px-2 py-1 font-semibold text-emerald-500">
          <ShieldCheckIcon className="size-3.5" aria-hidden="true" />
          Decisor
        </span>
      </div>
      <div className="border-border/15 mt-3 flex flex-wrap gap-2 border-t pt-3">
        <span className="border-border/20 flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5">
          <PhoneIcon className="text-brand size-3.5" aria-hidden="true" />
          (11) 9••••-••21
        </span>
        <span className="border-border/20 flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5">
          <WhatsApp className="size-3.5" aria-hidden="true" />
          WhatsApp
        </span>
        <span className="text-muted-foreground flex items-center px-1 line-through decoration-red-500/70">
          Recepção
        </span>
      </div>
    </div>
  );
}

export function PriorityVisual() {
  const rows = [
    { p: "P1", score: "w-[92%]", reason: "celular próprio · sócio" },
    { p: "P2", score: "w-[74%]", reason: "telefone próprio · e-mail" },
    { p: "P3", score: "w-[51%]", reason: "empresa jovem · porte ME" },
  ];
  return (
    <div className={cn(panel, "flex flex-col gap-2.5")}>
      {rows.map((row, i) => (
        <div key={row.p} className="flex items-center gap-3">
          <span
            className={cn(
              "flex h-6 w-8 shrink-0 items-center justify-center rounded-md font-bold",
              i === 0 ? "bg-brand text-background" : "bg-brand/15 text-brand",
            )}
          >
            {row.p}
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="bg-foreground/10 block h-1.5 rounded-full">
              <span className={cn("bg-brand block h-full rounded-full", row.score)} />
            </span>
            <span className="text-muted-foreground truncate">{row.reason}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AssetsVisual() {
  const assets = [
    { name: "Site", icon: GlobeIcon, found: true },
    { name: "Instagram", icon: Instagram, found: true },
    { name: "Maps", icon: GoogleMaps, found: true },
    { name: "WhatsApp", icon: WhatsApp, found: true },
    { name: "LinkedIn", icon: LinkedIn, found: true },
    { name: "Facebook", icon: Facebook, found: false },
  ];
  return (
    <div className={cn(panel, "grid grid-cols-3 gap-2")}>
      {assets.map(({ name, icon: Icon, found }) => (
        <span
          key={name}
          className={cn(
            "relative flex flex-col items-center gap-1.5 rounded-lg border px-1 py-2.5",
            found ? "border-emerald-500/25" : "border-amber-500/30 border-dashed",
          )}
        >
          <Icon className="text-foreground size-5" aria-hidden="true" />
          <span className="text-muted-foreground text-[11px]">{name}</span>
          <span
            className={cn(
              "absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full text-[10px] font-bold",
              found
                ? "bg-emerald-500 text-white"
                : "bg-amber-500 text-black",
            )}
            role="img"
            aria-label={found ? "encontrado" : "confira"}
          >
            {found ? <CheckIcon className="size-3" strokeWidth={3} /> : "?"}
          </span>
        </span>
      ))}
    </div>
  );
}

// Taxas padrão da tela Meta do Atlas
export function FunnelVisual() {
  const steps = [
    { label: "Contatos", value: 120, width: "w-full" },
    { label: "Agendadas", value: 30, width: "w-[78%]", rate: "25%" },
    { label: "R1", value: 21, width: "w-[62%]", rate: "70%" },
    { label: "R2", value: 10, width: "w-[46%]", rate: "50%" },
    { label: "Negociação", value: 6, width: "w-[34%]", rate: "60%" },
    { label: "Contratos", value: 2, width: "w-[22%]", rate: "40%" },
  ];
  return (
    <div className={cn(panel, "flex flex-col gap-1.5")}>
      {steps.map((s, i) => (
        <div key={s.label} className="flex items-center gap-2">
          <span className="text-muted-foreground w-[74px] shrink-0">{s.label}</span>
          <span className="flex-1">
            <span
              className={cn(
                "flex h-4 items-center justify-end rounded-sm pr-1.5 text-[10px] font-bold",
                s.width,
                i === steps.length - 1
                  ? "bg-emerald-500 text-white"
                  : "bg-brand/25 text-foreground",
              )}
            >
              {s.value}
            </span>
          </span>
          <span className="w-8 shrink-0 text-right text-[10px] text-emerald-500">
            {s.rate}
          </span>
        </div>
      ))}
    </div>
  );
}

export function QueueVisual() {
  return (
    <div className={cn(panel, "flex flex-col gap-3")}>
      <div className="flex items-center justify-between">
        <span className="font-semibold">Ligações hoje</span>
        <span className="text-foreground text-sm font-bold tabular-nums">
          7<span className="text-muted-foreground font-normal">/20</span>
        </span>
      </div>
      <span className="bg-foreground/10 block h-1.5 rounded-full">
        <span className="bg-brand block h-full w-[35%] rounded-full" />
      </span>
      <div className="flex flex-wrap gap-1.5">
        <span className="rounded-md bg-red-500/12 px-2 py-1 font-semibold text-red-500">
          Atrasados 2
        </span>
        <span className="bg-brand/12 text-brand rounded-md px-2 py-1 font-semibold">
          Hoje 5
        </span>
        <span className="rounded-md bg-emerald-500/12 px-2 py-1 font-semibold text-emerald-500">
          Novos 13
        </span>
      </div>
    </div>
  );
}

export function KanbanVisual() {
  const cols = [
    { name: "Entrada", cards: 3, color: "bg-sky-400" },
    { name: "Tentando", cards: 2, color: "bg-brand" },
    { name: "Decisor", cards: 2, color: "bg-amber-400" },
    { name: "Reunião", cards: 1, color: "bg-emerald-500" },
  ];
  return (
    <div className={cn(panel, "grid grid-cols-4 gap-2")}>
      {cols.map((col) => (
        <div key={col.name} className="flex min-w-0 flex-col gap-1.5">
          <span className="flex min-w-0 items-center gap-1 text-[9px] font-semibold tracking-wide uppercase sm:text-[10px]">
            <span className={cn("size-1.5 shrink-0 rounded-full", col.color)} />
            <span className="min-w-0 truncate">{col.name}</span>
          </span>
          <span className={cn("block h-0.5 rounded-full", col.color)} />
          {Array.from({ length: col.cards }).map((_, i) => (
            <span
              key={i}
              className="border-border/15 bg-foreground/[0.04] flex flex-col gap-1 rounded-md border p-1.5"
            >
              <Bar className="h-1.5 w-4/5" />
              <Bar className="bg-brand/30 h-1.5 w-1/2" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function CadenceVisual() {
  const steps = [
    { day: "Dia 1", label: "Ligação", state: "done" },
    { day: "Dia 2", label: "WhatsApp", state: "done" },
    { day: "Dia 3", label: "Lead respondeu", state: "reply" },
    { day: "Dia 4", label: "E-mail", state: "paused" },
    { day: "Dia 6", label: "Instagram", state: "paused" },
  ] as const;
  return (
    <div className={cn(panel, "flex flex-col")}>
      {steps.map((s, i) => (
        <div key={s.day} className="flex items-stretch gap-3">
          <div className="flex flex-col items-center">
            <span
              className={cn(
                "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
                s.state === "done" && "bg-brand/20 text-brand",
                s.state === "reply" && "bg-emerald-500 text-white",
                s.state === "paused" && "border-border/30 border border-dashed",
              )}
            >
              {s.state === "done" && <CheckIcon className="size-2.5" strokeWidth={3} />}
              {s.state === "reply" && <WhatsApp className="size-2.5 fill-white" />}
            </span>
            {i < steps.length - 1 && <span className="bg-border/20 w-px flex-1" />}
          </div>
          <div className="flex flex-1 items-center justify-between gap-2 pb-2.5">
            <span
              className={cn(
                s.state === "reply" && "font-semibold text-emerald-500",
                s.state === "paused" && "text-muted-foreground line-through",
              )}
            >
              {s.label}
            </span>
            <span className="text-muted-foreground flex items-center gap-1 text-[10px]">
              {s.state === "paused" && <PauseIcon className="size-3" aria-hidden="true" />}
              {s.state === "paused" ? "pausado" : s.day}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
