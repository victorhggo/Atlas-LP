import {
  ArchiveIcon,
  ArrowRightIcon,
  BellIcon,
  CalendarDaysIcon,
  CheckIcon,
  ClockIcon,
  CopyIcon,
  FileSpreadsheetIcon,
  GlobeIcon,
  HistoryIcon,
  ImageIcon,
  KanbanIcon,
  Link2Icon,
  ListFilterIcon,
  ListOrderedIcon,
  LockIcon,
  MailIcon,
  MicIcon,
  PhoneIcon,
  PinIcon,
  PlayIcon,
  PlusIcon,
  QuoteIcon,
  Undo2Icon,
  UsersIcon,
  Volume2Icon,
  VolumeXIcon,
  XIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

import Atlas from "../../logos/atlas";
import {
  Facebook,
  GoogleMaps,
  Instagram,
  WhatsApp,
} from "../../logos/brands";

export const panel =
  "border-border/15 bg-background/75 rounded-2xl border p-4 text-xs shadow-xl sm:p-5 sm:text-sm";

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "text-muted-foreground text-xs font-semibold tracking-wider uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

function Check({ ok = true }: { ok?: boolean }) {
  return (
    <span
      className={cn(
        "flex size-4.5 shrink-0 items-center justify-center rounded-full",
        ok ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-500" : "bg-red-500/15 text-red-500",
      )}
    >
      {ok ? (
        <CheckIcon className="size-3" strokeWidth={3} />
      ) : (
        <XIcon className="size-3" strokeWidth={3} />
      )}
    </span>
  );
}

function RevealBlur({ children, className }: { children: string; className?: string }) {
  return (
    <span className={cn("relative inline-grid truncate", className)}>
      <span className="flow-reveal-blur col-start-1 row-start-1 blur-[5px]">{children}</span>
      <span className="flow-reveal col-start-1 row-start-1">{children}</span>
    </span>
  );
}

/* ---------- Agente Atlas (Item 2: qualifica e move no CRM) ---------- */
export function AgentMock() {
  return (
    <div className={cn(panel, "animate-shimmer flex flex-col gap-4")}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-2.5 font-semibold">
          <span className="bg-brand/15 relative flex size-8 items-center justify-center rounded-lg">
            <Atlas className="size-4.5" />
            <span className="ring-background absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-400 ring-2 motion-safe:animate-pulse" />
          </span>
          Agente · Clínicas de estética
        </span>
        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          Qualificado · Movido no CRM
        </span>
      </div>
      <div className="border-l-2 border-emerald-500/70 bg-emerald-500/[0.06] rounded-r-xl py-3 pr-3.5 pl-3.5">
        <span className="text-muted-foreground mb-1 flex items-center gap-1.5 text-xs">
          <WhatsApp className="size-3.5" /> Resposta no WhatsApp · 16:42
        </span>
        <p className="text-foreground text-sm leading-snug sm:text-base">
          <QuoteIcon className="text-muted-foreground mr-1 inline size-3.5 -translate-y-0.5" />
          Gostei.{" "}
          <mark className="rounded bg-emerald-500/25 px-1 text-emerald-800 dark:text-emerald-300">
            Consegue me mandar a proposta até sexta?
          </mark>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Por que ele qualificou e moveu</Label>
        {[
          "Pediu proposta com prazo definido",
          "Fala com a sócia → etapa “É decisor”",
        ].map((t) => (
          <span key={t} className="flex items-center gap-2 text-xs sm:text-sm">
            <Check /> {t}
          </span>
        ))}
      </div>
      <div className="border-border/15 flex flex-wrap items-center gap-2 border-t pt-3 text-xs">
        <span className="flow-drop bg-brand text-background flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold shadow-sm">
          Movido para: Lead qualificado
          <ArrowRightIcon className="size-3.5" />
        </span>
        <span className="border-border/25 text-muted-foreground flex items-center gap-1 rounded-lg border px-2.5 py-1.5 font-medium">
          <Undo2Icon className="size-3.5" /> Desfazer
        </span>
        <span className="text-muted-foreground flex items-center gap-1 text-xs">
          <HistoryIcon className="size-3.5" /> autorizado pelo líder · no histórico
        </span>
      </div>
    </div>
  );
}

/* ---------- Fit Score ---------- */
export function FitScoreMock() {
  const questions = ["Porte", "Tempo de mercado", "Capital social", "Tem site", "Tem WhatsApp"];
  const rows = [
    { n: "Clínica Pura Pele", s: 96, p: "P1" },
    { n: "Renova Estética", s: 91, p: "P1" },
    { n: "Studio Flor de Lis", s: 84, p: "P2" },
    { n: "Vivace Estética", s: 58, p: "P3" },
  ];
  return (
    <div className={cn(panel, "flex flex-col gap-4")}>
      <div className="flex flex-col gap-2">
        <Label>Seu cliente ideal · 5 critérios</Label>
        <div className="flex flex-wrap gap-1.5">
          {questions.map((q) => (
            <span key={q} className="border-brand/30 bg-brand/10 text-brand rounded-full border px-2.5 py-1 text-xs font-semibold">
              {q}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <Label>Lista ordenada por quem ligar primeiro</Label>
        {rows.map((r, idx) => (
          <div key={r.n} className="flex items-center gap-3">
            <span
              className={cn(
                "flex h-6 w-8 shrink-0 items-center justify-center rounded-md text-xs font-bold",
                r.p === "P1" ? "bg-brand text-background" : "bg-brand/15 text-brand",
              )}
            >
              {r.p}
            </span>
            <span className="w-32 shrink-0 truncate font-medium sm:w-36">{r.n}</span>
            <span className="bg-foreground/10 block h-2 flex-1 rounded-full">
              <span
                className={cn(
                  "animate-score-bar block h-full rounded-full",
                  r.s >= 85 ? "bg-emerald-500" : r.s >= 70 ? "bg-brand" : "bg-amber-400",
                )}
                style={{ width: `${r.s}%`, animationDelay: `${idx * 250}ms` }}
              />
            </span>
            <span className="w-8 shrink-0 text-right font-bold tabular-nums">{r.s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Dado conferido + Contato oculto até qualificar (Item 3) ---------- */
export function DataCheckMock() {
  const found = [
    { name: "Site oficial", icon: GlobeIcon },
    { name: "Instagram ativo", icon: Instagram },
    { name: "Google Maps · 4,7", icon: GoogleMaps },
    { name: "WhatsApp validado", icon: WhatsApp },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className={cn(panel, "flex flex-col gap-3 opacity-85")}>
        <Label className="text-red-600 dark:text-red-400">Antes de qualificar</Label>
        <span className="font-semibold">PURA PELE ESTÉTICA LTDA</span>
        <span className="flex items-center gap-2">
          <Check ok={false} /> Telefone do contador
        </span>
        <span className="flex items-center gap-2">
          <Check ok={false} /> Sem canais validados
        </span>
        <div className="border-border/15 mt-auto flex flex-col gap-1.5 border-t pt-3">
          <span className="text-muted-foreground flex items-center gap-2 font-medium">
            <LockIcon className="size-4 shrink-0 text-amber-500" />
            <span className="blur-[4px] select-none">Helena · (11) 98721-4321</span>
          </span>
          <span className="text-muted-foreground text-xs">
            Contato oculto · <strong className="text-foreground">0 crédito</strong>
          </span>
        </div>
      </div>
      <div className={cn(panel, "flex flex-col gap-2.5 border-emerald-500/30")}>
        <Label className="text-emerald-600 dark:text-emerald-400">Depois de qualificar</Label>
        {found.map(({ name, icon: Icon }) => (
          <span key={name} className="flex items-center gap-2">
            <Icon className="text-foreground size-4 shrink-0" /> {name}
            <span className="ml-auto">
              <Check />
            </span>
          </span>
        ))}
        <span className="text-muted-foreground flex items-center gap-2 text-xs line-through decoration-red-500/60">
          <Facebook className="size-3.5 shrink-0" /> Homônimo descartado
        </span>
        <div className="border-border/15 mt-auto flex flex-col gap-1 border-t pt-3">
          <span className="flex items-center gap-2 font-semibold">
            <PhoneIcon className="text-brand size-4 shrink-0" />
            <RevealBlur>Helena · (11) 98721-4321</RevealBlur>
          </span>
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            2 sócios revelados · 1 crédito
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Roteiro na tela ---------- */
function Fill({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-brand/15 text-brand rounded px-1.5 py-0.5 font-semibold">{children}</span>
  );
}

export function ScriptMock() {
  return (
    <div className={cn(panel, "flex flex-col gap-4")}>
      <div className="flex items-center justify-between">
        <Label>Roteiro · Na ficha</Label>
        <span className="flex items-center gap-1.5 rounded-full bg-red-500/12 px-2.5 py-1 text-xs font-semibold text-red-600 dark:text-red-400">
          <span className="size-2 rounded-full bg-red-400 motion-safe:animate-pulse" />
          Em ligação
        </span>
      </div>
      <p className="text-sm leading-relaxed sm:text-base">
        Oi, <Fill>Helena</Fill>, tudo bem? Vi que a <Fill>Clínica Pura Pele</Fill>{" "}
        em <Fill>Praia Grande</Fill> tem ótima avaliação, mas clínicas do setor me
        relatam dor com <Fill>faltas e remarcações na agenda</Fill>. Faz sentido
        aí hoje?
      </p>
      <div className="flex flex-col gap-2">
        <Label>Contorno de objeção em 1 clique</Label>
        <div className="flex flex-wrap gap-1.5 text-xs">
          <span className="border-brand bg-brand/15 text-brand rounded-lg border px-2.5 py-1 font-semibold">
            Já tenho agência
          </span>
          <span className="border-border/25 rounded-lg border px-2.5 py-1">Manda por WhatsApp</span>
          <span className="border-border/25 rounded-lg border px-2.5 py-1">Sem tempo agora</span>
        </div>
        <p className="text-muted-foreground border-brand/40 border-l-2 pl-3 text-xs leading-relaxed sm:text-sm">
          “Perfeito, não é para trocar agora. Em 10 minutos te mostro onde sua
          agenda perde retorno…”
        </p>
      </div>
    </div>
  );
}

/* ---------- Cadências e Follow-up (Item 13) ---------- */
export function FollowUpMock() {
  const steps = [
    { icon: PhoneIcon, label: "1ª Ligação", sub: "na agenda · enviada", state: "done" },
    { icon: WhatsApp, label: "WhatsApp criativo", sub: "na agenda · enviada", state: "done" },
    { icon: MicIcon, label: "Áudio como voz", sub: "na agenda · enviada", state: "done" },
    { icon: WhatsApp, label: "Lead respondeu", sub: "pausou sozinho", state: "reply" },
    { icon: MailIcon, label: "E-mail", sub: "aguardando decisão", state: "paused" },
  ] as const;

  return (
    <div className="grid gap-3 sm:grid-cols-[1.25fr_1fr]">
      <div className={cn(panel, "flex flex-col")}>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <Label>Cadência</Label>
          <span className="border-brand/30 bg-brand/10 text-brand flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold">
            <ListFilterIcon className="size-3" />
            Nunca contatado
          </span>
        </div>
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="flex items-stretch gap-2.5">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full",
                    s.state === "done" && "bg-brand/15 text-brand",
                    s.state === "reply" && "bg-emerald-500 text-white",
                    s.state === "paused" && "border-border/30 text-muted-foreground border",
                  )}
                >
                  <Icon className={cn("size-3", s.state === "reply" && "fill-white")} />
                </span>
                {i < steps.length - 1 && <span className="bg-border/20 w-px flex-1" />}
              </div>
              <span
                className={cn(
                  "flex flex-1 items-center justify-between gap-2 pb-2.5 text-xs sm:text-sm",
                  s.state === "reply" && "font-semibold text-emerald-600 dark:text-emerald-400",
                  s.state === "paused" && "text-muted-foreground line-through",
                )}
              >
                <span>{s.label}</span>
                <span
                  className={cn(
                    "text-xs no-underline",
                    s.state === "done" && "text-emerald-600 dark:text-emerald-400 font-medium",
                    s.state === "reply" && "rounded-md bg-emerald-500/15 px-2 py-0.5 font-bold",
                    s.state === "paused" && "text-muted-foreground",
                  )}
                >
                  {s.sub}
                </span>
              </span>
            </div>
          );
        })}
        <div className="border-border/15 mt-1 flex flex-wrap items-center justify-between gap-2 border-t pt-3 text-xs">
          <span className="text-muted-foreground font-medium">Ação:</span>
          <div className="flex items-center gap-1.5">
            <span className="bg-brand text-background flex items-center gap-1 rounded-md px-2.5 py-1 font-semibold">
              <PlayIcon className="size-3 fill-current" /> Retomar
            </span>
            <span className="border-border/25 text-muted-foreground rounded-md border px-2.5 py-1">
              Encerrar
            </span>
            <span className="border-border/25 text-muted-foreground rounded-md border p-1">
              <CopyIcon className="size-3.5" />
            </span>
          </div>
        </div>
      </div>

      <div className={cn(panel, "flex flex-col gap-3")}>
        <Label>O que fazer hoje</Label>
        {[
          { t: "3 retornos agendados", c: "text-red-600 dark:text-red-400", i: ClockIcon },
          { t: "2 respostas no WhatsApp", c: "text-emerald-600 dark:text-emerald-400", i: WhatsApp },
          { t: "12 “Nunca contatados”", c: "text-brand", i: PhoneIcon },
        ].map(({ t, c, i: Icon }) => (
          <span key={t} className="border-border/15 flex items-center gap-2 rounded-lg border px-3 py-2 text-xs sm:text-sm">
            <Icon className={cn("size-4 shrink-0", c)} /> {t}
          </span>
        ))}
        <div className="border-border/15 bg-foreground/[0.03] mt-auto rounded-xl border p-3 text-xs leading-snug">
          <span className="text-brand font-semibold">Follow-up criativo #3</span>
          <p className="text-muted-foreground mt-1">
            “Helena, separei 2 pontos do Google da clínica…”
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- WhatsApp dentro do CRM (Item 16) ---------- */
export function WhatsAppMock() {
  return (
    <div className="relative pt-2">
      <div className={cn(panel, "grid gap-4 sm:grid-cols-[1fr_1.4fr]")}>
        <div className="border-border/15 flex flex-col gap-2.5 sm:border-r sm:pr-4">
          <div className="flex items-center justify-between">
            <Label>Ficha</Label>
            <div className="text-muted-foreground flex items-center gap-2">
              <PinIcon className="text-brand size-3.5" />
              <ArchiveIcon className="size-3.5" />
              <VolumeXIcon className="size-3.5" />
            </div>
          </div>
          <span className="text-base font-semibold">Clínica Pura Pele</span>
          <span className="text-muted-foreground text-xs sm:text-sm">Helena Costa · sócia</span>
          <div className="flex flex-wrap gap-1.5 text-xs">
            <span className="bg-brand/12 text-brand rounded-md px-2 py-0.5 font-semibold">
              É decisor
            </span>
            <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 font-semibold text-emerald-600 dark:text-emerald-400">
              P1 · Estética
            </span>
          </div>
          <span className="text-muted-foreground border-border/15 mt-auto border-t pt-2.5 text-xs">
            Fixar · Arquivar · Silenciar · Grupos
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          <Label>Conversa · Envio instantâneo</Label>
          <div className="border-border/15 bg-foreground/[0.04] flex items-center gap-2 rounded-lg border px-3 py-2 text-xs">
            <Link2Icon className="text-brand size-4 shrink-0" />
            <span className="truncate">
              <strong className="text-foreground">atlas.app/diagnostico</strong> · Prévia de link
            </span>
          </div>
          <span className="bg-foreground/[0.06] flex max-w-[90%] items-center gap-2.5 rounded-xl rounded-tl-none px-3 py-2.5">
            <MicIcon className="text-brand size-4 shrink-0" />
            <span className="flex flex-1 items-center gap-1">
              {[5, 10, 7, 12, 6, 11, 8, 13, 7, 5, 9, 6].map((h, idx) => (
                <span
                  key={idx}
                  className="bg-brand/70 animate-wave-bar block w-1 rounded-full"
                  style={{ height: `${h}px`, animationDelay: `${idx * 90}ms` }}
                />
              ))}
            </span>
            <span className="text-xs font-medium tabular-nums">0:24</span>
          </span>
          <span className="flex max-w-[90%] items-center gap-2 self-end rounded-xl rounded-tr-none bg-emerald-500/20 px-3 py-2 text-xs font-medium text-emerald-950 sm:text-sm dark:text-emerald-100">
            <ImageIcon className="size-4 shrink-0" /> Vi sim! Podemos falar quinta às 14h?
          </span>
        </div>
      </div>
      <div className="glass-3 animate-float-badge absolute -top-2 right-3 flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium shadow-2xl sm:-top-3 sm:right-5">
        <Volume2Icon className="size-4 text-emerald-600 dark:text-emerald-400" />
        <span>
          <strong className="font-semibold">Som e aviso na tela</strong> · Nova mensagem
        </span>
      </div>
    </div>
  );
}

/* ---------- CRM Completo & Leads Qualificados (Itens 14 e 15) ---------- */
export function CrmMock() {
  const views = [
    { name: "Quadro", icon: KanbanIcon, active: true },
    { name: "Lista", icon: ListOrderedIcon, active: false },
    { name: "Processo", icon: ArrowRightIcon, active: false },
    { name: "Agenda", icon: CalendarDaysIcon, active: false },
  ];
  return (
    <div className={cn(panel, "flex flex-col gap-3.5")}>
      <div className="border-border/15 flex flex-wrap items-center justify-between gap-2 border-b pb-3">
        <div className="bg-foreground/[0.05] flex flex-wrap items-center gap-1 rounded-lg p-1">
          {views.map(({ name, icon: Icon, active }) => (
            <span
              key={name}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold",
                active ? "bg-brand text-background shadow-xs" : "text-muted-foreground",
              )}
            >
              <Icon className="size-3.5" />
              {name}
            </span>
          ))}
        </div>
        <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          <PlusIcon className="size-3.5" strokeWidth={3} />
          Criar lista com estas · 0 crédito
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        <div className="bg-foreground/[0.03] border-border/10 flex flex-col gap-2 rounded-xl border p-3">
          <span className="flex items-center justify-between text-xs font-bold uppercase">
            <span>Entrada</span>
            <span className="text-brand">14</span>
          </span>
          <div className="border-border/15 bg-background/80 flex flex-col gap-1.5 rounded-lg border p-2.5">
            <span className="truncate font-semibold">Studio Flor de Lis</span>
            <span className="w-fit rounded-md bg-amber-500/15 px-2 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
              Não contatado
            </span>
          </div>
        </div>

        <div className="bg-foreground/[0.03] border-border/10 flex flex-col gap-2 rounded-xl border p-3">
          <span className="flex items-center justify-between text-xs font-bold uppercase">
            <span className="text-brand">É decisor</span>
            <span className="text-brand">8</span>
          </span>
          <div className="border-brand/30 bg-brand/[0.06] flex flex-col gap-1.5 rounded-lg border p-2.5">
            <span className="truncate font-semibold">Clínica Pura Pele</span>
            <span className="text-brand text-xs font-semibold">Movido pelo Agente</span>
          </div>
        </div>

        <div className="bg-foreground/[0.03] border-border/10 flex flex-col gap-2 rounded-xl border p-3">
          <span className="flex items-center justify-between text-xs font-bold uppercase">
            <span className="text-emerald-600 dark:text-emerald-400">Qualificados</span>
            <span className="text-emerald-600 dark:text-emerald-400">38</span>
          </span>
          <div className="border-emerald-500/30 bg-emerald-500/[0.06] flex flex-col gap-1.5 rounded-lg border p-2.5">
            <span className="truncate font-semibold">Renova Estética</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Reunião quinta, 14h
            </span>
          </div>
        </div>
      </div>

      <div className="border-border/15 flex flex-wrap items-center justify-between gap-2 border-t pt-3 text-xs">
        <span className="flex items-center gap-1.5">
          <FileSpreadsheetIcon className="size-4 text-emerald-600 dark:text-emerald-400" />
          <span>
            <strong>Importar planilha</strong> por coluna e etapa
          </span>
        </span>
        <span className="rounded-md bg-amber-500/15 px-2.5 py-1 font-semibold text-amber-600 dark:text-amber-400">
          2 duplicados · Juntar
        </span>
      </div>
    </div>
  );
}

/* ---------- Painel do líder (Item 18) ---------- */
export function LeaderMock() {
  const sellers = [
    { i: "AN", online: true, calls: 18, meetings: 3, credits: "w-[68%]" },
    { i: "BR", online: true, calls: 14, meetings: 2, credits: "w-[45%]" },
    { i: "CM", online: false, calls: 9, meetings: 1, credits: "w-[82%]" },
  ];
  return (
    <div className={cn(panel, "flex flex-col gap-3.5")}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Label>Painel do líder · Funil do time</Label>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <BellIcon className="size-4" />
          Reunião marcada por AN
        </span>
      </div>
      <div className="text-muted-foreground grid grid-cols-[1fr_auto_auto_1fr] gap-x-4 text-xs font-semibold">
        <span>Vendedor</span>
        <span>Ligações</span>
        <span>Reuniões</span>
        <span>Créditos</span>
      </div>
      {sellers.map((s) => (
        <div key={s.i} className="grid grid-cols-[1fr_auto_auto_1fr] items-center gap-x-4">
          <span className="flex items-center gap-2">
            <span className="bg-brand/15 text-brand relative flex size-8 items-center justify-center rounded-full text-xs font-bold">
              {s.i}
              <span
                className={cn(
                  "ring-background absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full ring-2",
                  s.online ? "bg-emerald-400" : "bg-foreground/30",
                )}
              />
            </span>
          </span>
          <span className="text-center font-bold tabular-nums">{s.calls}</span>
          <span className="text-center font-bold text-emerald-600 tabular-nums dark:text-emerald-400">
            {s.meetings}
          </span>
          <span className="bg-foreground/10 block h-2 rounded-full">
            <span className={cn("bg-brand animate-score-bar block h-full rounded-full", s.credits)} />
          </span>
        </div>
      ))}
      <div className="border-border/15 flex flex-wrap items-center justify-between gap-2 border-t pt-3 text-xs">
        <span className="text-muted-foreground flex items-center gap-1.5">
          <UsersIcon className="text-brand size-4" />
          <strong className="text-foreground">Pedir ajuda:</strong> AN e BR juntos
        </span>
        <span className="bg-brand/12 text-brand rounded-md px-2.5 py-1 font-semibold">
          Pedido de crédito: +50 · Aprovar
        </span>
      </div>
    </div>
  );
}
