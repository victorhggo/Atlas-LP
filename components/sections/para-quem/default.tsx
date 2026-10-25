import { BriefcaseIcon, BuildingIcon, CarIcon, CodeIcon } from "lucide-react";

import { Section } from "../../ui/section";

const PUBLICOS = [
  { I: BriefcaseIcon, t: "Prestadores de serviço e agências", d: "Contabilidade, marketing, consultoria, energia solar. Você vende bem, só não tem tempo de procurar cliente." },
  { I: BuildingIcon, t: "Imobiliárias e corretoras", d: "Ticket alto, muita concorrência. Chegue no dono antes do concorrente, com o roteiro do nicho na tela." },
  { I: CarIcon, t: "Concessionárias e revendas", d: "Frotas, locadoras e empresas que compram em volume. Lista pronta por região e porte." },
  { I: CodeIcon, t: "SaaS e software B2B", d: "Encontre empresas pela tecnologia que usam no site e ligue para quem decide a compra." },
];

export default function ParaQuem() {
  return (
    <Section id="para-quem">
      <div className="max-w-container mx-auto flex flex-col gap-10">
        <div className="flex max-w-[680px] flex-col gap-3">
          <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">Para quem é</span>
          <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">Feito para quem vive de prospecção ativa e não quer viver de planilha.</h2>
          <p className="text-muted-foreground text-base sm:text-lg">PMEs e prestadores de serviço que precisam de reunião na agenda toda semana, sem contratar um time de SDR para isso.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PUBLICOS.map(({ I, t, d }) => (
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
