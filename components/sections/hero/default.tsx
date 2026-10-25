import { ArrowRightIcon, PlayIcon } from "lucide-react";

import { siteConfig } from "@/config/site";

import { Announcement } from "../../ui/announcement";
import Glow from "../../ui/glow";
import { Good } from "../../ui/highlight";
import { LinkButton } from "../../ui/link-button";
import { Section } from "../../ui/section";
import { HeroVideo } from "./video";

export default function Hero() {
  return (
    <Section className="relative overflow-hidden pb-16 sm:pb-24">
      <div className="max-w-container relative z-10 mx-auto grid grid-cols-1 items-center gap-12 pt-10 lg:grid-cols-[0.92fr_1.18fr] lg:gap-14 lg:pt-16 [&>*]:min-w-0">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-7 lg:items-start lg:text-left">
          <Announcement href="#metodo-2" className="animate-appear" />
          <h1 className="from-foreground to-foreground dark:to-muted-foreground relative inline-block bg-linear-to-r bg-clip-text text-4xl leading-[1.06] font-semibold tracking-tight text-balance text-transparent sm:text-6xl lg:text-[56px]">
            O CRM preguiçoso que faz o trabalho do SDR.
          </h1>
          <p className="text-muted-foreground max-w-[560px] text-lg leading-relaxed font-medium text-balance sm:text-xl">
            Para PMEs e prestadores de serviço: escolha o nicho e o Atlas monta a
            lista, acha o sócio que decide, te dá o roteiro e move quem está
            pronto no CRM.{" "}
            <Good>Você só liga.</Good>
          </p>
          <div className="flex flex-wrap justify-center gap-3.5 lg:justify-start">
            <LinkButton
              href={siteConfig.getStartedUrl}
              size="lg"
              iconRight={<ArrowRightIcon className="ml-2 size-4" />}
            >
              Testar grátis com 25 créditos
            </LinkButton>
            <LinkButton
              href={siteConfig.links.demo}
              variant="glow"
              size="lg"
              icon={<PlayIcon className="mr-2 size-4" />}
            >
              Ver demonstração ao vivo
            </LinkButton>
          </div>
          <p className="text-muted-foreground -mt-1 text-sm sm:text-base">
            <Good>Sem cartão.</Good> 25 créditos com a pesquisa completa do Pro.
          </p>
        </div>
        <HeroVideo className="animate-appear mx-auto max-w-[640px] lg:max-w-none" />
      </div>
      <Glow variant="top" className="opacity-60" />
    </Section>
  );
}
