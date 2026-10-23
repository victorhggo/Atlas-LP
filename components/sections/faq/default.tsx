import { MessageCircleQuestionIcon } from "lucide-react";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Good } from "../../ui/highlight";
import { LinkButton } from "../../ui/link-button";
import { Section } from "../../ui/section";

interface FAQItemProps {
  question: string;
  answer: ReactNode;
  value?: string;
}

interface FAQProps {
  title?: string;
  items?: FAQItemProps[] | false;
  className?: string;
}

export default function FAQ({
  title = "Dúvidas frequentes",
  items = [
    {
      question: "De onde vêm as empresas?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
          Da base pública de CNPJ da Receita Federal, atualizada todo mês. Só entram empresas ativas.
        </p>
      ),
    },
    {
      question: "Quanto custa montar uma lista?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
          <Good>Nada.</Good> Buscar, contar, gerar e exportar listas é grátis. Só
          a qualificação usa crédito.
        </p>
      ),
    },
    {
      question: "O que a qualificação encontra?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
          Site, Instagram, Facebook, LinkedIn, YouTube, TikTok, Google Maps e Perfil no Google, WhatsApp, telefones do site e ferramentas de marketing (Meta Pixel, GTM, GA4). Só marcamos como encontrado o que prova ser da empresa.
        </p>
      ),
    },
    {
      question: "Quanto custa qualificar?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
          1 crédito por empresa. Se a qualificação falhar por erro técnico,{" "}
          <Good>o crédito volta sozinho</Good>. Empresa já qualificada{" "}
          <Good>não é cobrada de novo</Good>.
        </p>
      ),
    },
    {
      question: "O que significa P1, P2, P3?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
          É a ordem sugerida de abordagem, pelo score cadastral: telefone próprio, celular, e-mail próprio, sócio, idade e porte da empresa. Você sempre sabe por onde começar.
        </p>
      ),
    },
    {
      question: "Como a meta do dia é calculada?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
          Você informa quanto quer faturar, o ticket médio e o prazo. O Atlas calcula as ligações por dia pelas suas taxas de conversão e pelos dias úteis de prospecção, sem contar feriados.
        </p>
      ),
    },
    {
      question: "Preciso de cartão para testar?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
          <Good>Não.</Good> O plano Grátis vem com 25 créditos para você testar
          a qualificação, sem cartão.
        </p>
      ),
    },
    {
      question: "Posso cancelar quando quiser?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
          <Good>Sim.</Good> Os créditos do plano renovam todo mês, e a recarga
          avulsa <Good>não expira</Good>: ela soma no saldo.
        </p>
      ),
    },
  ],
  className,
}: FAQProps) {
  return (
    <Section id="duvidas" className={className}>
      <div className="max-w-container mx-auto grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div className="flex flex-col items-center gap-6 text-center lg:sticky lg:top-28 lg:items-start lg:self-start lg:text-left">
          <h2 className="text-3xl font-semibold sm:text-5xl">{title}</h2>
          <p className="text-muted-foreground max-w-[420px] text-balance">
            As respostas vêm direto da central de dúvidas do Atlas.
          </p>
          <div className="glass-1 dark:glass-2 flex w-full max-w-[420px] flex-col gap-3 rounded-2xl p-5 text-left shadow-xl">
            <span className="flex items-center gap-2 font-semibold">
              <MessageCircleQuestionIcon
                className="text-brand size-5"
                aria-hidden="true"
              />
              Ficou alguma dúvida?
            </span>
            <span className="text-muted-foreground text-sm">
              Fale com a equipe e veja o Atlas rodando no seu nicho.
            </span>
            <LinkButton variant="glow" size="default" href={siteConfig.links.sales}>
              Falar com vendas
            </LinkButton>
          </div>
        </div>
        {items !== false && items.length > 0 && (
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
              <AccordionItem
                key={item.value ?? item.question}
                value={item.value || `item-${index + 1}`}
              >
                <AccordionTrigger className="text-base sm:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </Section>
  );
}
