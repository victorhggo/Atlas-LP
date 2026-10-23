import {
  CalendarClockIcon,
  KanbanIcon,
    ListOrderedIcon,
  PhoneCallIcon,
  ScanSearchIcon,
  TargetIcon,
  UserRoundCheckIcon,
} from "lucide-react";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Bad, Good } from "../../ui/highlight";
import { Reveal } from "../../ui/reveal";
import { Section } from "../../ui/section";
import {
  AssetsVisual,
  CadenceVisual,
  DecisorVisual,
  FunnelVisual,
  KanbanVisual,
  PriorityVisual,
  QueueVisual,
} from "./visuals";

interface ItemProps {
  title: string;
  description: ReactNode;
  icon: ReactNode;
  visual?: ReactNode;
  // largura no grid de 6 colunas do desktop
  span?: string;
}

interface ItemsProps {
  title?: string;
  description?: ReactNode;
  items?: ItemProps[] | false;
  className?: string;
}

const DEFAULT_ITEMS: ItemProps[] = [
  {
    title: "O número de quem decide",
    visual: <DecisorVisual />,
    span: "lg:col-span-3",
    description: (
      <>
        Telefone e nome do decisor na ficha. Chega de{" "}
        <Bad>ligar para a recepção</Bad>.
      </>
    ),
    icon: <UserRoundCheckIcon className="size-4" />,
  },
  {
    title: "Prioridade P1, P2, P3",
    visual: <PriorityVisual />,
    span: "lg:col-span-3",
    description: (
      <>
        A lista já vem na <Good>ordem de quem ligar primeiro</Good>, pelo
        score cadastral.
      </>
    ),
    icon: <ListOrderedIcon className="size-4" />,
  },
  {
    title: "Qualificação automática",
    visual: <AssetsVisual />,
    span: "lg:col-span-2",
    description: (
      <>
        Site, Instagram, Facebook, LinkedIn, Google Maps e WhatsApp.{" "}
        <Good>Só marcamos o que prova ser da empresa</Good>.
      </>
    ),
    icon: <ScanSearchIcon className="size-4" />,
  },
  {
    title: "Fila do dia",
    visual: <QueueVisual />,
    span: "lg:col-span-2",
    description: (
      <>
        Retornos atrasados, os de hoje e leads novos, com a{" "}
        <Good>dor provável do nicho</Good> na tela.
      </>
    ),
    icon: <PhoneCallIcon className="size-4" />,
  },
  {
    title: "Meta que vira plano",
    visual: <FunnelVisual />,
    span: "lg:col-span-2",
    description: (
      <>
        Diga quanto quer faturar. O Atlas calcula{" "}
        <Good>quantas ligações por dia</Good> você precisa.
      </>
    ),
    icon: <TargetIcon className="size-4" />,
  },
  {
    title: "CRM integrado",
    visual: <KanbanVisual />,
    span: "lg:col-span-3",
    description: (
      <>
        Kanban da entrada de lista ao contrato. O lead{" "}
        <Good>entra sozinho</Good> quando você fala com o decisor.
      </>
    ),
    icon: <KanbanIcon className="size-4" />,
  },
  {
    title: "WhatsApp e cadências",
    visual: <CadenceVisual />,
    span: "lg:col-span-3",
    description: (
      <>
        Follow-up em ligação, WhatsApp, e-mail, Instagram e LinkedIn, que{" "}
        <Good>para quando o lead responde</Good>.
      </>
    ),
    icon: <CalendarClockIcon className="size-4" />,
  },
];

export default function Items({
  title = "Tudo o que a prospecção precisa, em um fluxo só",
  description = (
    <>
      Do nicho escolhido à reunião marcada: <Bad>sem planilha</Bad>,{" "}
      <Bad>sem aba perdida</Bad>, <Bad>sem achismo</Bad>.
    </>
  ),
  items = DEFAULT_ITEMS,
  className,
}: ItemsProps) {
  return (
    <Section id="funcionalidades" className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-10 sm:gap-16">
        <div className="flex flex-col items-center gap-4 text-center sm:gap-6">
          <h2 className="max-w-[720px] text-3xl leading-tight font-semibold text-balance sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          {description && (
            <p className="text-md text-muted-foreground max-w-[600px] font-medium text-balance sm:text-xl">
              {description}
            </p>
          )}
        </div>
        {items !== false && items.length > 0 && (
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
            {items.map((item, index) => (
              <Reveal
                key={item.title}
                delay={(index % 3) * 90}
                className={cn(
                  "glass-1 dark:glass-2 group flex flex-col gap-5 overflow-hidden rounded-2xl p-5 shadow-xl sm:p-6",
                  item.span,
                  index === items.length - 1 && "md:col-span-2",
                )}
              >
                <div className="flex flex-col gap-2">
                  <h3 className="flex items-center gap-2 text-base font-semibold sm:text-lg">
                    <span className="bg-brand/12 text-brand flex size-8 items-center justify-center rounded-lg">
                      {item.icon}
                    </span>
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm text-pretty sm:text-base">
                    {item.description}
                  </p>
                </div>
                {item.visual && (
                  <div className="mt-auto motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-translate-y-1">
                    {item.visual}
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
