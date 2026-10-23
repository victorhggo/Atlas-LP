import { cn } from "@/lib/utils";

import { Badge } from "../../ui/badge";
import Glow from "../../ui/glow";
import { Mockup, MockupFrame } from "../../ui/mockup";
import { Reveal } from "../../ui/reveal";
import Screenshot from "../../ui/screenshot";
import { Section } from "../../ui/section";

interface StepProps {
  title: string;
  description: string;
  image: string;
  height: number;
  alt: string;
}

interface HowItWorksProps {
  title?: string;
  description?: string;
  steps?: StepProps[];
  className?: string;
}

const DEFAULT_STEPS: StepProps[] = [
  {
    title: "Escolha o nicho",
    description:
      "Mais de 200 segmentos B2B e B2C, de clínicas de estética a indústria. Defina região e qualidade, e veja quantas empresas existem antes de gastar um crédito.",
    image: "/atlas/crop-busca.png",
    height: 840,
    alt: "Tela Criar nova lista do Atlas com os segmentos de Estética e beleza",
  },
  {
    title: "Qualifique",
    description:
      "O Atlas encontra site, redes, Google e o contato do decisor de cada empresa, e coloca a lista na ordem de quem ligar primeiro.",
    image: "/atlas/crop-lista.png",
    height: 800,
    alt: "Lista qualificada no Atlas com prioridades P1, P2 e P3 e ativos encontrados",
  },
  {
    title: "Ligue pela fila",
    description:
      "Abra o dia com a fila pronta: retornos atrasados, os de hoje e leads novos, com a dor provável do nicho para abrir a conversa.",
    image: "/atlas/crop-ligar.png",
    height: 880,
    alt: "Tela Prospecção de hoje do Atlas com a fila de ligações e a meta do dia",
  },
  {
    title: "Feche no CRM",
    description:
      "Cada ligação registrada move o lead no quadro, da entrada de lista à reunião marcada e ao contrato.",
    image: "/atlas/crop-crm.png",
    height: 880,
    alt: "Quadro Kanban do CRM do Atlas com as etapas do funil de prospecção",
  },
];

export default function HowItWorks({
  title = "Da lista à reunião em 4 passos",
  description = "O mesmo fluxo que a sua operação já faz, só que num lugar só.",
  steps = DEFAULT_STEPS,
  className,
}: HowItWorksProps) {
  return (
    <Section id="como-funciona" className={cn("overflow-x-clip", className)}>
      <div className="max-w-container mx-auto flex flex-col gap-16 sm:gap-24">
        <div className="flex flex-col items-center gap-4 text-center sm:gap-6">
          <h2 className="max-w-[720px] text-3xl leading-tight font-semibold text-balance sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="text-md text-muted-foreground max-w-[600px] font-medium text-balance sm:text-xl">
            {description}
          </p>
        </div>
        {steps.map((step, index) => (
          <div
            key={step.title}
            className={cn(
              "grid items-center gap-8 md:gap-12",
              index % 2 === 1
                ? "md:grid-cols-[3fr_2fr]"
                : "md:grid-cols-[2fr_3fr]",
            )}
          >
            <Reveal
              from={index % 2 === 1 ? "right" : "left"}
              className={cn(
                "flex flex-col items-start gap-4",
                index % 2 === 1 && "md:order-2",
              )}
            >
              <div className="flex items-center gap-3">
                <span className="from-brand to-brand/30 bg-linear-to-b bg-clip-text text-5xl leading-none font-bold text-transparent tabular-nums drop-shadow-[0_0_24px_var(--brand-foreground)] sm:text-6xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Badge variant="outline" className="border-brand/30 text-brand">
                  Passo {index + 1} de {steps.length}
                </Badge>
              </div>
              <h3 className="text-2xl leading-tight font-semibold sm:text-4xl">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-md max-w-[440px] text-balance sm:text-lg">
                {step.description}
              </p>
            </Reveal>
            <Reveal
              from={index % 2 === 1 ? "left" : "right"}
              delay={150}
              className="relative"
            >
              <MockupFrame size="small">
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
                    sizes="(max-width: 768px) 170vw, 720px"
                    className="w-[170%] max-w-none shrink-0 md:w-full md:max-w-full"
                  />
                </Mockup>
              </MockupFrame>
              <Glow variant="center" className="opacity-40" />
            </Reveal>
          </div>
        ))}
      </div>
    </Section>
  );
}
