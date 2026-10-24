import { ClockIcon } from "lucide-react";

import { Mockup, MockupFrame } from "../../ui/mockup";
import { Reveal } from "../../ui/reveal";
import Screenshot from "../../ui/screenshot";
import { Section } from "../../ui/section";

interface StepProps {
  when: string;
  title: string;
  description: string;
  image: string;
  height: number;
  alt: string;
}

// Cronograma: o que acontece dentro do Atlas, do primeiro clique ao fechamento.
const STEPS: StepProps[] = [
  {
    when: "Agora",
    title: "Escolha o nicho",
    description:
      "Mais de 200 segmentos. Veja quantas empresas existem antes de gastar 1 crédito.",
    image: "/atlas/crop-busca.png",
    height: 840,
    alt: "Tela Criar nova lista do Atlas com os segmentos de Estética e beleza",
  },
  {
    when: "Em minutos",
    title: "Receba a lista com Fit Score",
    description:
      "O Atlas confere cada empresa, acha quem decide e ordena pelos melhores clientes.",
    image: "/atlas/crop-lista.png",
    height: 800,
    alt: "Lista qualificada no Atlas, em ordem de prioridade, com os ativos encontrados",
  },
  {
    when: "No mesmo dia",
    title: "Ligue com roteiro e cadência ativa",
    description:
      "Fila do dia na ordem certa, com a dor do nicho na tela e follow-up automático.",
    image: "/atlas/crop-ligar.png",
    height: 880,
    alt: "Fila de ligações do Atlas com a dor provável de cada lead",
  },
  {
    when: "Nos dias seguintes",
    title: "O Agente qualifica e move no CRM. Você fecha.",
    description:
      "Ele lê a conversa e move para 'Lead qualificado' ou 'É decisor', com autorização do líder, desfazer e histórico.",
    image: "/atlas/crop-crm.png",
    height: 880,
    alt: "Quadro do CRM do Atlas com as etapas do funil de prospecção",
  },
];

export default function HowItWorks() {
  return (
    <Section id="como-funciona" className="overflow-x-clip">
      <div className="max-w-container mx-auto flex flex-col gap-12 sm:gap-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">
            Como funciona
          </span>
          <h2 className="max-w-[720px] text-3xl leading-tight font-semibold text-balance sm:text-5xl">
            Do nicho escolhido à reunião marcada.
          </h2>
          <p className="text-muted-foreground max-w-[560px] text-balance sm:text-lg">
            O cronograma de uma lista dentro do Atlas, em 4 passos.
          </p>
        </div>

        <ol className="relative flex flex-col gap-8 sm:gap-10">
          {/* trilho do cronograma */}
          <span
            aria-hidden="true"
            className="from-brand/70 via-brand/30 absolute top-6 bottom-6 left-5 w-px bg-linear-to-b to-transparent sm:left-6"
          />
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="relative grid grid-cols-[40px_1fr] gap-3 sm:grid-cols-[48px_1fr] sm:gap-6"
            >
              <span className="bg-background ring-brand/40 text-brand relative z-10 flex size-10 items-center justify-center rounded-full font-bold tabular-nums ring-2 sm:size-12 sm:text-lg">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Reveal
                from="bottom"
                className="glass-1 dark:glass-2 grid min-w-0 items-center gap-6 overflow-hidden rounded-2xl p-5 shadow-xl sm:p-7 lg:grid-cols-[1fr_1.35fr] lg:gap-10"
              >
                <div className="flex flex-col items-start gap-3">
                  <span className="text-brand flex items-center gap-1.5 text-xs font-semibold tracking-[0.14em] uppercase">
                    <ClockIcon className="size-3.5" aria-hidden="true" />
                    {step.when}
                  </span>
                  <h3 className="text-xl leading-snug font-semibold sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-base text-pretty sm:text-lg">
                    {step.description}
                  </p>
                </div>
                <MockupFrame size="small" className="w-full">
                  <Mockup
                    type="responsive"
                    className="bg-background/90 w-full overflow-hidden rounded-xl border-0"
                  >
                    {/* No celular o print aparece ampliado (lado esquerdo) para dar para ler */}
                    <Screenshot
                      srcLight={step.image}
                      alt={step.alt}
                      width={2128}
                      height={step.height}
                      sizes="(max-width: 1024px) 170vw, 640px"
                      className="w-[170%] max-w-none shrink-0 lg:w-full lg:max-w-full"
                    />
                  </Mockup>
                </MockupFrame>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
