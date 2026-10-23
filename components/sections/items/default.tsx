import {
  CalendarClockIcon,
  KanbanIcon,
  ListFilterIcon,
  ListOrderedIcon,
  PhoneCallIcon,
  ScanSearchIcon,
  TargetIcon,
  UserRoundCheckIcon,
} from "lucide-react";
import { ReactNode } from "react";

import { Bad, Good } from "../../ui/highlight";
import { Item, ItemDescription, ItemIcon, ItemTitle } from "../../ui/item";
import { Section } from "../../ui/section";

interface ItemProps {
  title: string;
  description: ReactNode;
  icon: ReactNode;
}

interface ItemsProps {
  title?: string;
  description?: ReactNode;
  items?: ItemProps[] | false;
  className?: string;
}

const DEFAULT_ITEMS: ItemProps[] = [
  {
    title: "Listas em 3 passos",
    description: (
      <>
        Escolha o nicho, a região e a qualidade. Mais de 200 segmentos, e{" "}
        <Good>a contagem é grátis</Good>.
      </>
    ),
    icon: <ListFilterIcon className="size-5 stroke-1" />,
  },
  {
    title: "Qualificação automática",
    description: (
      <>
        Site, Instagram, Facebook, LinkedIn, Google Maps e WhatsApp.{" "}
        <Good>Só marcamos o que prova ser da empresa</Good>.
      </>
    ),
    icon: <ScanSearchIcon className="size-5 stroke-1" />,
  },
  {
    title: "O número de quem decide",
    description: (
      <>
        Telefone e nome do decisor na ficha. Chega de{" "}
        <Bad>ligar para a recepção</Bad>.
      </>
    ),
    icon: <UserRoundCheckIcon className="size-5 stroke-1" />,
  },
  {
    title: "Prioridade P1, P2, P3",
    description: (
      <>
        A lista já vem na <Good>ordem de quem ligar primeiro</Good>, pelo
        score cadastral.
      </>
    ),
    icon: <ListOrderedIcon className="size-5 stroke-1" />,
  },
  {
    title: "Fila do dia",
    description: (
      <>
        Retornos atrasados, os de hoje e leads novos, com a{" "}
        <Good>dor provável do nicho</Good> na tela.
      </>
    ),
    icon: <PhoneCallIcon className="size-5 stroke-1" />,
  },
  {
    title: "CRM integrado",
    description: (
      <>
        Kanban da entrada de lista ao contrato. O lead{" "}
        <Good>entra sozinho</Good> quando você fala com o decisor.
      </>
    ),
    icon: <KanbanIcon className="size-5 stroke-1" />,
  },
  {
    title: "Meta que vira plano",
    description: (
      <>
        Diga quanto quer faturar. O Atlas calcula{" "}
        <Good>quantas ligações por dia</Good> você precisa.
      </>
    ),
    icon: <TargetIcon className="size-5 stroke-1" />,
  },
  {
    title: "WhatsApp e cadências",
    description: (
      <>
        Follow-up em ligação, WhatsApp, e-mail, Instagram e LinkedIn, que{" "}
        <Good>para quando o lead responde</Good>.
      </>
    ),
    icon: <CalendarClockIcon className="size-5 stroke-1" />,
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
      <div className="max-w-container mx-auto flex flex-col items-center gap-6 sm:gap-20">
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
          <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {items.map((item) => (
              <Item key={item.title} className=" motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1">
                <ItemTitle className="flex items-center gap-2">
                  <ItemIcon>{item.icon}</ItemIcon>
                  {item.title}
                </ItemTitle>
                <ItemDescription>
                  <p>{item.description}</p>
                </ItemDescription>
              </Item>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
