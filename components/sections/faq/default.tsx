import { ReactNode } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Good } from "../../ui/highlight";
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
      <div className="max-w-container mx-auto flex flex-col items-center gap-8">
        <h2 className="text-center text-3xl font-semibold sm:text-5xl">
          {title}
        </h2>
        {items !== false && items.length > 0 && (
          <Accordion type="single" collapsible className="w-full max-w-[800px]">
            {items.map((item, index) => (
              <AccordionItem
                key={item.value ?? item.question}
                value={item.value || `item-${index + 1}`}
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </Section>
  );
}
