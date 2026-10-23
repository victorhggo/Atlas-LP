import { ArrowRightIcon } from "lucide-react";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { Announcement } from "../../ui/announcement";
import Glow from "../../ui/glow";
import { Bad, Good } from "../../ui/highlight";
import { LinkButton, type LinkButtonProps } from "../../ui/link-button";
import { Mockup, MockupFrame } from "../../ui/mockup";
import Screenshot from "../../ui/screenshot";
import { Section } from "../../ui/section";

interface HeroButtonProps extends Omit<LinkButtonProps, "children"> {
  text: string;
}

interface HeroProps {
  title?: string;
  description?: ReactNode;
  mockup?: ReactNode | false;
  badge?: ReactNode | false;
  buttons?: HeroButtonProps[] | false;
  className?: string;
}

const DEFAULT_HERO_BUTTONS: HeroButtonProps[] = [
  {
    href: siteConfig.getStartedUrl,
    text: "Testar grátis sem cartão",
    variant: "default",
    iconRight: <ArrowRightIcon className="ml-2 size-4" />,
  },
  {
    href: "#planos",
    text: "Ver planos",
    variant: "glow",
  },
];

const DEFAULT_HERO_BADGE = (
  <Announcement href="#funcionalidades" className="animate-appear" />
);

const DEFAULT_HERO_MOCKUP = (
  <Screenshot
    srcLight="/atlas/hero-lista.png"
    alt="Lista de clínicas qualificada no Atlas, em ordem de prioridade P1, P2, P3, com os ativos digitais e o contato do decisor"
    width={2560}
    height={1520}
    preload
    className="w-full"
  />
);

export default function Hero({
  title = "Da lista ao contrato, sem sair do Atlas.",
  description = (
    <>
      Gere listas de qualquer nicho, qualifique cada empresa com site,
      Instagram, Google e <Good>o número de quem decide</Good>, e ligue pela
      fila do dia com o CRM integrado. <Bad>Planilha</Bad> e{" "}
      <Bad>ligação para a recepção</Bad> ficam para trás.
    </>
  ),
  mockup = DEFAULT_HERO_MOCKUP,
  badge = DEFAULT_HERO_BADGE,
  buttons = DEFAULT_HERO_BUTTONS,
  className,
}: HeroProps) {
  return (
    <Section
      className={cn(
        "fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0",
        className,
      )}
    >
      <div className="max-w-container mx-auto flex flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          {badge !== false && badge}
          <h1 className="animate-appear from-foreground to-foreground dark:to-muted-foreground relative z-10 inline-block bg-linear-to-r bg-clip-text text-4xl leading-tight font-semibold text-balance text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight">
            {title}
          </h1>
          <p className="text-md text-muted-foreground relative z-10 max-w-[740px] font-medium text-balance sm:text-xl">
            {description}
          </p>
          {buttons !== false && buttons.length > 0 && (
            <div className="animate-appear relative z-10 flex flex-wrap justify-center gap-4 opacity-0 delay-300">
              {buttons.map((button) => (
                <LinkButton
                  key={`${button.href}-${button.text}`}
                  variant={button.variant || "default"}
                  size="lg"
                  href={button.href}
                  icon={button.icon}
                  iconRight={button.iconRight}
                >
                  {button.text}
                </LinkButton>
              ))}
            </div>
          )}
          {buttons !== false && (
            <p className="animate-appear text-muted-foreground relative z-10 -mt-2 text-sm opacity-0 delay-300 sm:-mt-6">
              <Good>25 decisores grátis</Good> para testar · sem cartão de
              crédito
            </p>
          )}
          {mockup !== false && (
            <div className="relative w-full pt-12">
              {/* Sem fade de entrada: o print é o LCP da página */}
              <MockupFrame size="small">
                <Mockup
                  type="responsive"
                  className="bg-background/90 w-full rounded-xl border-0"
                >
                  {mockup}
                </Mockup>
              </MockupFrame>
              <Glow
                variant="top"
                className="animate-appear-zoom opacity-0 delay-1000"
              />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
