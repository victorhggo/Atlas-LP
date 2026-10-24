import {
  ArrowRightIcon,
  BellIcon,
  CheckIcon,
  GlobeIcon,
  HeadsetIcon,
  PhoneCallIcon,
  RefreshCwIcon,
  WebhookIcon,
} from "lucide-react";
import { type ComponentType, type ReactNode, type SVGProps } from "react";

import { cn } from "@/lib/utils";

import {
  Facebook,
  GoogleMaps,
  Instagram,
  LinkedIn,
  Meta,
  TikTok,
  WhatsApp,
  YouTube,
} from "../../logos/brands";
import { Good } from "../../ui/highlight";
import { Reveal } from "../../ui/reveal";
import { Section } from "../../ui/section";
import { panel } from "../features/mocks";

interface ChannelProps {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  hoverClass: string;
  iconHoverClass: string;
}

const CHANNELS: ChannelProps[] = [
  {
    name: "WhatsApp",
    icon: WhatsApp,
    hoverClass:
      "hover:border-[#25D366]/60 hover:bg-linear-to-r hover:from-[#25D366]/22 hover:via-[#25D366]/10 hover:to-transparent hover:text-[#128C7E] dark:hover:text-[#25D366] hover:shadow-[0_10px_28px_-6px_rgba(37,211,102,0.38)]",
    iconHoverClass: "group-hover/pill:text-[#25D366]",
  },
  {
    name: "Meta Ads",
    icon: Meta,
    hoverClass:
      "hover:border-[#0081FB]/60 hover:bg-linear-to-r hover:from-[#0081FB]/22 hover:via-[#0081FB]/10 hover:to-transparent hover:text-[#0064E0] dark:hover:text-[#3897F0] hover:shadow-[0_10px_28px_-6px_rgba(0,129,251,0.38)]",
    iconHoverClass: "group-hover/pill:text-[#0081FB]",
  },
  {
    name: "Google Maps",
    icon: GoogleMaps,
    hoverClass:
      "hover:border-[#4285F4]/60 hover:bg-linear-to-r hover:from-[#4285F4]/22 hover:via-[#34A853]/12 hover:to-transparent hover:text-[#1A73E8] dark:hover:text-[#669DF6] hover:shadow-[0_10px_28px_-6px_rgba(66,133,244,0.38)]",
    iconHoverClass: "group-hover/pill:text-[#4285F4]",
  },
  {
    name: "Instagram",
    icon: Instagram,
    hoverClass:
      "hover:border-[#E1306C]/60 hover:bg-linear-to-r hover:from-[#F58529]/22 hover:via-[#E1306C]/16 hover:to-[#8134AF]/12 hover:text-[#C13584] dark:hover:text-[#F77737] hover:shadow-[0_10px_28px_-6px_rgba(225,48,108,0.38)]",
    iconHoverClass: "group-hover/pill:text-[#E1306C]",
  },
  {
    name: "LinkedIn",
    icon: LinkedIn,
    hoverClass:
      "hover:border-[#0A66C2]/60 hover:bg-linear-to-r hover:from-[#0A66C2]/22 hover:via-[#0A66C2]/10 hover:to-transparent hover:text-[#0A66C2] dark:hover:text-[#378FE9] hover:shadow-[0_10px_28px_-6px_rgba(10,102,194,0.38)]",
    iconHoverClass: "group-hover/pill:text-[#0A66C2]",
  },
  {
    name: "Facebook",
    icon: Facebook,
    hoverClass:
      "hover:border-[#1877F2]/60 hover:bg-linear-to-r hover:from-[#1877F2]/22 hover:via-[#1877F2]/10 hover:to-transparent hover:text-[#1877F2] dark:hover:text-[#4599FF] hover:shadow-[0_10px_28px_-6px_rgba(24,119,242,0.38)]",
    iconHoverClass: "group-hover/pill:text-[#1877F2]",
  },
  {
    name: "YouTube",
    icon: YouTube,
    hoverClass:
      "hover:border-[#FF0000]/60 hover:bg-linear-to-r hover:from-[#FF0000]/22 hover:via-[#FF0000]/10 hover:to-transparent hover:text-[#CC0000] dark:hover:text-[#FF4E45] hover:shadow-[0_10px_28px_-6px_rgba(255,0,0,0.38)]",
    iconHoverClass: "group-hover/pill:text-[#FF0000]",
  },
  {
    name: "TikTok",
    icon: TikTok,
    hoverClass:
      "hover:border-[#FE2C55]/60 hover:bg-linear-to-r hover:from-[#25F4EE]/22 hover:via-[#FE2C55]/16 hover:to-transparent hover:text-[#FE2C55] dark:hover:text-[#25F4EE] hover:shadow-[0_10px_28px_-6px_rgba(254,44,85,0.35)]",
    iconHoverClass: "group-hover/pill:text-[#FE2C55]",
  },
  {
    name: "Matteline VoIP",
    icon: HeadsetIcon,
    hoverClass:
      "hover:border-[#EC4899]/60 hover:bg-linear-to-r hover:from-[#EC4899]/22 hover:via-[#8B5CF6]/12 hover:to-transparent hover:text-[#DB2777] dark:hover:text-[#F472B6] hover:shadow-[0_10px_28px_-6px_rgba(236,72,153,0.38)]",
    iconHoverClass: "group-hover/pill:text-[#EC4899]",
  },
  {
    name: "Webhooks",
    icon: WebhookIcon,
    hoverClass:
      "hover:border-[#F59E0B]/60 hover:bg-linear-to-r hover:from-[#F59E0B]/22 hover:via-[#F97316]/12 hover:to-transparent hover:text-[#D97706] dark:hover:text-[#FBBF24] hover:shadow-[0_10px_28px_-6px_rgba(245,158,11,0.38)]",
    iconHoverClass: "group-hover/pill:text-[#F59E0B]",
  },
];

/* ---------- Mini-telas do Bento ---------- */

function InboundMock() {
  return (
    <div className={cn(panel, "flex flex-col gap-3")}>
      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
        <span className="border-border/20 bg-foreground/[0.04] flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-medium">
          <Meta className="size-4 text-[#0081FB]" /> Meta Ads
        </span>
        <span className="border-border/20 bg-foreground/[0.04] flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-medium">
          <GlobeIcon className="text-brand size-4" /> Site
        </span>
        <ArrowRightIcon className="text-muted-foreground size-4" />
        <span className="bg-brand/15 text-brand rounded-lg px-2.5 py-1.5 font-semibold">
          Quadro do CRM
        </span>
      </div>
      <div className="flow-drop border-emerald-500/30 bg-emerald-500/[0.06] flex items-center justify-between gap-2 rounded-xl border p-3">
        <div className="flex min-w-0 flex-col">
          <span className="truncate font-semibold">Clínica Bela Vista</span>
          <span className="text-muted-foreground text-xs">Caiu agora na etapa Entrada</span>
        </div>
        <span className="shrink-0 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          Origem: Meta Ads
        </span>
      </div>
    </div>
  );
}

function AutomationsMock() {
  const tools = ["Webhooks", "Make", "Zapier"];
  return (
    <div className={cn(panel, "flex flex-col gap-3")}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5 text-xs sm:text-sm">
          {tools.map((t) => (
            <span
              key={t}
              className="border-brand/30 bg-brand/10 text-brand rounded-lg border px-3 py-1 font-semibold"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="size-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
          Ativo
        </span>
      </div>
      <div className="border-border/15 bg-foreground/[0.03] flex items-center justify-between gap-2 rounded-xl border p-3">
        <span className="flex items-center gap-2 font-medium">
          <RefreshCwIcon className="text-brand size-4 shrink-0" />
          Espelho no CRM dos Escolhidos
        </span>
        <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          <CheckIcon className="size-3" strokeWidth={3} /> Sincronizado
        </span>
      </div>
    </div>
  );
}

function GoalPanelMock() {
  const steps = [
    { label: "Meta no mês", value: "R$ 30.000", width: "w-full", tone: "bg-brand/20 text-foreground" },
    { label: "Contratos", value: "12", width: "w-[74%]", tone: "bg-brand/30 text-foreground" },
    { label: "Reuniões", value: "30", width: "w-[58%]", tone: "bg-brand/40 text-foreground" },
    { label: "No Painel", value: "20 ligações/dia", width: "w-[88%]", tone: "bg-emerald-500 text-white" },
  ];
  return (
    <div className={cn(panel, "flex flex-col gap-2.5")}>
      {steps.map((s) => (
        <div key={s.label} className="flex items-center gap-3">
          <span className="text-muted-foreground w-28 shrink-0 truncate text-xs font-medium sm:w-32">
            {s.label}
          </span>
          <span className="flex-1">
            <span
              className={cn(
                "animate-score-bar flex h-6 items-center justify-end rounded-md px-2.5 text-xs font-bold tabular-nums",
                s.width,
                s.tone,
              )}
            >
              {s.value}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

function PhoneMock() {
  return (
    <div className={cn(panel, "mx-auto flex max-w-[360px] flex-col gap-3 rounded-2xl border-2")}>
      <div className="bg-foreground/15 mx-auto h-1 w-12 rounded-full" />
      <div className="flex items-center justify-between text-xs">
        <span className="text-brand font-bold tracking-wider">ATLAS NO CELULAR</span>
        <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
          <BellIcon className="size-3.5" /> 1 reunião hoje
        </span>
      </div>
      <div className="border-border/15 bg-foreground/[0.04] flex items-center justify-between gap-2 rounded-xl border p-3">
        <div className="flex min-w-0 flex-col">
          <span className="truncate font-semibold">Helena · Clínica Pura Pele</span>
          <span className="text-muted-foreground text-xs">Fila do dia · Decisora P1</span>
        </div>
        <span className="bg-brand text-background flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold">
          <PhoneCallIcon className="size-3.5" /> Ligar
        </span>
      </div>
    </div>
  );
}

interface BentoCard {
  title: string;
  description: ReactNode;
  visual: ReactNode;
  span: string;
}

const BENTO_CARDS: BentoCard[] = [
  {
    title: "Lead do site e do Meta Ads direto no quadro",
    span: "lg:col-span-3",
    description: (
      <>
        Formulários do site e do Meta Ads <Good>caem sozinhos no CRM</Good> com etiqueta de origem.
      </>
    ),
    visual: <InboundMock />,
  },
  {
    title: "Webhooks, Make, Zapier e Espelho nos Escolhidos",
    span: "lg:col-span-3",
    description: (
      <>
        Integre com Webhooks, Make e Zapier, mais{" "}
        <Good>espelho direto no CRM dos Escolhidos</Good>.
      </>
    ),
    visual: <AutomationsMock />,
  },
  {
    title: "Meta de faturamento vira ligações no Painel",
    span: "lg:col-span-3",
    description: (
      <>
        Sua meta em reais vira <Good>número de ligações por dia</Good> no Painel.
      </>
    ),
    visual: <GoalPanelMock />,
  },
  {
    title: "Funciona no celular",
    span: "lg:col-span-3",
    description: (
      <>
        Veja a fila, responda o WhatsApp e <Good>ligue com 1 toque</Good> pelo navegador do telefone.
      </>
    ),
    visual: <PhoneMock />,
  },
];

export default function Integrations() {
  return (
    <Section id="integracoes">
      <div className="max-w-container mx-auto flex flex-col items-center gap-10 sm:gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">
            Integrações, Meta e Celular
          </span>
          <h2 className="max-w-[720px] text-3xl leading-tight font-semibold text-balance sm:text-5xl">
            Conectado aos seus canais.{" "}
            <span className="text-brand">No PC e no celular.</span>
          </h2>
          <p className="text-muted-foreground max-w-[540px] text-base text-balance sm:text-lg">
            Passe o mouse nos canais e veja como o Atlas centraliza a operação.
          </p>
        </div>

        {/* Faixa de canais com degradê de marca ao passar o mouse */}
        <ul className="flex max-w-[960px] flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
          {CHANNELS.map(({ name, icon: Icon, hoverClass, iconHoverClass }) => (
            <li
              key={name}
              className={cn(
                "group/pill glass-1 dark:glass-2 border-border/20 flex cursor-default items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-semibold shadow-md transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 sm:px-5 sm:py-3 sm:text-base",
                hoverClass,
              )}
            >
              <Icon
                aria-hidden="true"
                className={cn(
                  "text-foreground size-4.5 shrink-0 transition-colors duration-300 sm:size-5",
                  iconHoverClass,
                )}
              />
              {name}
            </li>
          ))}
        </ul>

        {/* Bento Grid */}
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
          {BENTO_CARDS.map((item, index) => (
            <Reveal
              key={item.title}
              delay={(index % 2) * 90}
              className={cn(
                "glass-1 dark:glass-2 group flex flex-col gap-5 overflow-hidden rounded-2xl p-6 shadow-xl sm:p-7",
                item.span,
              )}
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold sm:text-xl">{item.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed text-pretty">
                  {item.description}
                </p>
              </div>
              <div className="mt-auto motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-translate-y-1">
                {item.visual}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
