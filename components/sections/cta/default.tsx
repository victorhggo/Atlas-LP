import { CalendarCheckIcon, CheckIcon, GiftIcon, MonitorPlayIcon, UserRoundIcon } from "lucide-react";

import { siteConfig } from "@/config/site";

import Glow from "../../ui/glow";
import { LinkButton } from "../../ui/link-button";
import { Section } from "../../ui/section";

const GANHOS = [
  { I: MonitorPlayIcon, t: "O Atlas rodando ao vivo, com leads do seu nicho" },
  { I: UserRoundIcon, t: "Um especialista monta a estratégia com você" },
  { I: GiftIcon, t: "Conta gratuita liberada na própria reunião" },
];

export default function CTA() {
  return (
    <Section id="demonstracao" className="group relative overflow-hidden">
      <div className="max-w-container cta-demo relative z-10 mx-auto">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <span className="cta-demo-tag"><i />Agenda aberta esta semana</span>
          <h2 className="max-w-[620px] text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl sm:leading-[1.08]">
            Veja o Atlas encher a sua agenda, <span className="text-brand">ao vivo.</span>
          </h2>
          <p className="text-muted-foreground max-w-[520px] text-base sm:text-lg">
            Agende uma demonstração com o nosso especialista. Em 30 minutos você vê o sistema na prática e já sai com acesso gratuito à sua conta.
          </p>
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            <LinkButton size="lg" href={siteConfig.links.demo} icon={<CalendarCheckIcon className="size-5" />}>
              Agendar demonstração com especialista
            </LinkButton>
            <LinkButton size="lg" variant="glow" href={siteConfig.getStartedUrl}>
              Criar conta grátis
            </LinkButton>
          </div>
          <p className="text-muted-foreground text-sm">Sem compromisso e sem cartão.</p>
        </div>
        <div className="cta-demo-card" aria-hidden="true">
          <div className="cta-demo-topo">
            <span className="cta-demo-ava"><UserRoundIcon /></span>
            <div><b>Demonstração Atlas</b><p>Com especialista · 30 min · online</p></div>
          </div>
          <ul>
            {GANHOS.map(({ I, t }) => <li key={t}><span><I /></span>{t}<CheckIcon className="cta-demo-ok" /></li>)}
          </ul>
          <div className="cta-demo-rodape"><CalendarCheckIcon /> Escolha o melhor horário na agenda</div>
        </div>
      </div>
      <div className="absolute top-0 left-0 h-full w-full translate-y-[1rem] opacity-80 transition-[transform,opacity] duration-500 group-hover:opacity-100 motion-safe:group-hover:translate-y-[-2rem]">
        <Glow variant="bottom" />
      </div>
    </Section>
  );
}
