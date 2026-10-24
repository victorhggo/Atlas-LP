import { ArrowUpRightIcon, HeadsetIcon } from "lucide-react";

import { siteConfig } from "@/config/site";

import { FeatureRow } from "../../ui/feature-row";
import { Bad, Good } from "../../ui/highlight";
import {
  AgentMock,
  CrmMock,
  DataCheckMock,
  FitScoreMock,
  FollowUpMock,
  LeaderMock,
  ScriptMock,
  WhatsAppMock,
} from "./mocks";

export function AgentSection() {
  return (
    <FeatureRow
      id="agente"
      eyebrow="Agente Atlas"
      tag="Pro e Equipe"
      className="relative"
      title={
        <>
          Ele qualifica e <span className="text-brand">move o lead no CRM.</span>
        </>
      }
      description="Analisa a conversa inteira, mostra o trecho que prova e leva o lead para a etapa certa."
      bullets={[
        <>
          Move para <Good>Lead qualificado</Good> ou <Good>É decisor</Good> com a prova na tela.
        </>,
        <>
          Exige autorização do líder e tem <Good>desfazer e histórico</Good>.
        </>,
        "Um agente por nicho, calibrado para o seu cliente ideal.",
      ]}
      visual={<AgentMock />}
    />
  );
}

export function FitScoreSection() {
  return (
    <FeatureRow
      eyebrow="Fit Score"
      reverse
      title="Seu cliente ideal vira uma nota de 0 a 100."
      description="Responda 5 perguntas e a lista já sai ordenada por quem ligar primeiro."
      bullets={[
        "Filtra porte, tempo de mercado, capital e canais ativos.",
        <>
          Ordem <Good>exclusiva para você</Good>: dois assinantes nunca veem a mesma fila.
        </>,
        "Listas grátis de até 10 mil empresas em vários estados.",
      ]}
      visual={<FitScoreMock />}
    />
  );
}

export function DataCheckSection() {
  return (
    <FeatureRow
      eyebrow="Dado conferido duas vezes"
      title="Você só vê e paga pelo contato que vai usar."
      description="Telefone, decisor e sócios ficam ocultos até qualificar. Só entra na ficha o que prova ser da empresa."
      bullets={[
        "Site, Instagram, Google, LinkedIn e WhatsApp conferidos.",
        <>
          Perfil de outro ramo com o mesmo nome? <Bad>Descartado.</Bad>
        </>,
        <>
          Contato oculto até qualificar: <Good>cobrado só se trouxer dado novo.</Good>
        </>,
      ]}
      visual={<DataCheckMock />}
    />
  );
}

export function ScriptSection() {
  return (
    <FeatureRow
      eyebrow="Roteiro na tela"
      reverse
      title="Ligue sabendo exatamente o que dizer."
      description="Dores, objeções e argumentos de cada nicho já preenchidos na ficha do lead."
      bullets={[
        "Roteiro com o nome do sócio, a empresa, a cidade e a dor do nicho.",
        <>
          Objeção na linha? <Good>Resposta pronta em 1 clique.</Good>
        </>,
        "Mede qual script agenda mais reuniões na sua operação.",
      ]}
      footer={
        <a
          href={siteConfig.links.matte}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-1 dark:glass-2 group mt-1 flex w-full max-w-[460px] items-center gap-3 rounded-xl p-4 shadow-lg transition-transform duration-300 motion-safe:hover:-translate-y-0.5"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-pink-500/15 text-pink-600 dark:text-pink-400">
            <HeadsetIcon className="size-5" aria-hidden="true" />
          </span>
          <span className="flex flex-1 flex-col text-sm sm:text-base">
            <span className="font-semibold">Ligue pelo PC com a Matteline VoIP</span>
            <span className="text-muted-foreground text-xs sm:text-sm">
              Cupom <span className="text-foreground font-semibold">OSESCOLHIDOS</span>
            </span>
          </span>
          <ArrowUpRightIcon className="text-muted-foreground group-hover:text-foreground size-4 transition-colors" />
        </a>
      }
      visual={<ScriptMock />}
    />
  );
}

export function FollowUpSection() {
  return (
    <FeatureRow
      eyebrow="Cadências inteligentes"
      title={
        <>
          Respondeu, pausa. <span className="text-brand">Não respondeu, lembra.</span>
        </>
      }
      description="Quando o lead responde, a cadência pausa sozinha e espera você retomar ou encerrar."
      bullets={[
        <>
          Filtro <Good>“Nunca contatado”</Good> e mensagem marcada como{" "}
          <Good>“enviada” na agenda</Good>.
        </>,
        "Banco de follow-ups criativos + áudio enviado como gravação de voz.",
        "Duplicar, pausar e encerrar cadência a qualquer momento.",
      ]}
      visual={<FollowUpMock />}
    />
  );
}

export function WhatsAppSection() {
  return (
    <FeatureRow
      eyebrow="WhatsApp no CRM"
      reverse
      title="A conversa mora na ficha do lead."
      description="Envio instantâneo com aviso sonoro e notificação em qualquer tela do computador."
      bullets={[
        <>
          Áudio, fotos, grupos, etiquetas e <Good>prévia de link</Good>.
        </>,
        <>
          Menu da conversa: <Good>fixar, arquivar e silenciar</Good>.
        </>,
        "Mensagem e follow-up programados direto no quadro.",
      ]}
      visual={<WhatsAppMock />}
    />
  );
}

export function CrmSection() {
  return (
    <FeatureRow
      id="crm"
      eyebrow="CRM e Leads qualificados"
      title={
        <>
          Quatro visões. <span className="text-brand">Zero lead esquecido.</span>
        </>
      }
      description="Quadro, Lista, Processo e Agenda, com todas as empresas já qualificadas salvas para reutilizar."
      bullets={[
        <>
          Selo <Good>“Não contatado”</Good>, campanha “Ainda não contatados” e ações em massa.
        </>,
        <>
          <Good>Aviso e junção de duplicados</Good> + importar planilha por coluna e etapa.
        </>,
        <>
          Tela de Leads qualificados com <Good>“Criar lista com estas” (0 crédito)</Good>.
        </>,
      ]}
      visual={<CrmMock />}
    />
  );
}

export function TeamsSection() {
  return (
    <FeatureRow
      id="times"
      eyebrow="Para equipes"
      reverse
      title="Veja o time trabalhando em tempo real."
      description="Funil do time, cartão por vendedor e aviso no sino a cada reunião marcada."
      bullets={[
        <>
          <Good>Pedir ajuda</Good> num lead (2 vendedores juntos) e{" "}
          <Good>pedidos de crédito</Good> ao líder.
        </>,
        "Créditos distribuídos pelo líder e cada vendedor vendo só os próprios leads.",
        "Chat da equipe com menção de leads, transferir lead e Atlas Academy.",
      ]}
      visual={<LeaderMock />}
    />
  );
}
