import { LayersIcon, PhoneCallIcon, TimerIcon, UserCheckIcon } from "lucide-react";

import { Section } from "../../ui/section";

const BENEFICIOS = [
  { I: UserCheckIcon, t: "O número de quem decide", d: "Celular do sócio e do responsável na ficha. Sem passar pela recepção nem pedir para falar com o dono." },
  { I: TimerIcon, t: "Lista pronta em minutos", d: "Escolha o nicho e a região. Em menos de 5 minutos a lista está qualificada e ordenada por quem ligar primeiro." },
  { I: LayersIcon, t: "Todos os canais da empresa", d: "Site, Instagram, Google Maps, WhatsApp, e-mail e LinkedIn conferidos para você abordar em todos." },
  { I: PhoneCallIcon, t: "Prospecção multicanal", d: "Ligação, WhatsApp e cadência no mesmo lugar, com o roteiro na tela e o follow-up no horário certo." },
];

export default function ParaQuem() {
  return (
    <Section id="para-quem">
      <div className="max-w-container mx-auto flex flex-col gap-10">
        <div className="flex max-w-[760px] flex-col gap-3">
          <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">Por que o Atlas</span>
          <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">Você perde horas por dia caçando o número do decisor.</h2>
          <p className="text-muted-foreground text-base sm:text-lg">E normalmente só chega nele depois de 2 a 4 ligações. Com o Atlas, você qualifica uma lista inteira em menos de 5 minutos e já começa a prospectar em todos os canais.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFICIOS.map(({ I, t, d }) => (
            <div key={t} className="cad-pilar flex-col !items-start">
              <span className="cad-pilar-ico"><I /></span>
              <div><b>{t}</b><p>{d}</p></div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
