import Image from "next/image";

import { siteConfig } from "@/config/site";

import { Section } from "../../ui/section";
import {
  AgentMock,
  DataCheckMock,
  FitScoreMock,
  FollowUpMock,
  ScriptMock,
} from "../features/mocks";
import { DemoTour, type TourStep } from "./tour";

// Print real do Atlas (anonimizado) ocupando a janela da demo
function Shot({ src, alt, height }: { src: string; alt: string; height: number }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={2128}
      height={height}
      loading="lazy"
      sizes="(max-width: 1024px) 100vw, 860px"
      className="absolute inset-0 size-full object-cover object-left-top"
    />
  );
}

const STEPS: TourStep[] = [
  {
    title: "Escolha o nicho",
    caption: "Mais de 200 segmentos e a região que você quiser. A contagem é grátis.",
    path: "/busca",
    kind: "image",
    content: (
      <Shot
        src="/atlas/crop-busca.png"
        height={840}
        alt="Tela Criar nova lista do Atlas com os segmentos de Estética e beleza"
      />
    ),
    hotspot: { top: "52%", left: "24%" },
  },
  {
    title: "Lista com nota de fit",
    caption: "A lista já sai ordenada de 0 a 100 pelo seu cliente ideal.",
    path: "/listas",
    kind: "mock",
    content: <FitScoreMock />,
  },
  {
    title: "Dado conferido",
    caption: "Site, redes, Google e o número do sócio que decide, conferidos.",
    path: "/empresas",
    kind: "mock",
    content: <DataCheckMock />,
  },
  {
    title: "Ligue com o roteiro",
    caption: "A fila do dia na ordem certa, com a dor provável do nicho na tela.",
    path: "/hoje",
    kind: "image",
    content: (
      <Shot
        src="/atlas/crop-ligar.png"
        height={880}
        alt="Fila de ligações do Atlas com a dor provável de cada lead"
      />
    ),
    hotspot: { top: "37%", left: "22%" },
  },
  {
    title: "Roteiro e objeções",
    caption: "O roteiro chega preenchido. A objeção tem resposta em um clique.",
    path: "/hoje",
    kind: "mock",
    content: <ScriptMock />,
  },
  {
    title: "Cadência rodando",
    caption: "O follow-up sai sozinho e para quando o lead responde.",
    path: "/cadencias",
    kind: "mock",
    content: <FollowUpMock />,
  },
  {
    title: "Agente qualifica e move no CRM",
    caption: "Ele lê a conversa e move o lead para 'Lead qualificado' ou 'É decisor', com autorização do líder, desfazer e histórico.",
    path: "/crm",
    kind: "mock",
    content: <AgentMock />,
  },
  {
    title: "Feche no CRM",
    caption: "Cada ligação registrada move o lead no quadro até a reunião.",
    path: "/crm",
    kind: "image",
    content: (
      <Shot
        src="/atlas/crop-crm.png"
        height={880}
        alt="Quadro do CRM do Atlas com as etapas do funil"
      />
    ),
    hotspot: { top: "30%", left: "58%" },
  },
];

export default function Demo() {
  return (
    <Section id="demo" className="overflow-x-clip">
      <div className="max-w-container mx-auto flex flex-col gap-10 sm:gap-14">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">
            Demonstração
          </span>
          <h2 className="max-w-[760px] text-3xl leading-tight font-semibold text-balance sm:text-5xl">
            Veja uma lista virar reunião em minutos.
          </h2>
          <p className="text-muted-foreground max-w-[560px] text-balance sm:text-lg">
            Clique em cada etapa e veja o Atlas por dentro. Sem cadastro, sem
            instalar nada.
          </p>
        </div>
        <DemoTour steps={STEPS} videoId={siteConfig.links.demoVideo || undefined} />
      </div>
    </Section>
  );
}
