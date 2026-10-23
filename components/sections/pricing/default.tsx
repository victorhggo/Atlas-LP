import { ArrowRightIcon, Building2, GiftIcon, User, Users, Zap } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { Good } from "../../ui/highlight";
import { LinkButton } from "../../ui/link-button";
import { PricingColumn, PricingColumnProps } from "../../ui/pricing-column";
import { Section } from "../../ui/section";

interface PricingProps {
  title?: string | false;
  description?: string | false;
  plans?: PricingColumnProps[] | false;
  className?: string;
}

// Preços e limites conforme a tela Planos do sistema
const DEFAULT_PRICING_PLANS: PricingColumnProps[] = [
  {
    name: "Essencial",
    icon: <User className="size-4" />,
    description: "Para quem está começando a prospectar todo dia",
    price: 97,
    priceDetail: "200 créditos por mês",
    guarantee: "Pagamento por Pix ou cartão",
    priceNote: "1 crédito = 1 decisor. O crédito do plano renova todo mês.",
    cta: {
      variant: "glow",
      label: "Assinar Essencial",
      href: siteConfig.getStartedUrl,
    },
    features: [
      "200 decisores por mês",
      "Até 3 telefones por empresa, com o do decisor",
      "CRM completo, sem limite de leads",
      "Tela Ligar com meta do dia",
      "Follow-up, agenda e lembretes",
      "Importação e exportação",
    ],
    variant: "default",
  },
  {
    name: "Pro",
    badge: "Mais escolhido",
    icon: <Zap className="size-4" />,
    description:
      "Para quem vive de vendas: prospecta, conversa e fecha no mesmo lugar",
    price: 297,
    priceDetail: "800 créditos por mês · 4x o Essencial",
    guarantee: "Cancele quando quiser",
    priceNote: "Melhor custo por lead. Suporte prioritário.",
    cta: {
      variant: "default",
      label: "Quero o Pro",
      href: siteConfig.getStartedUrl,
    },
    featuresLabel: "Tudo do Essencial, mais:",
    features: [
      "800 decisores por mês",
      "Todos os telefones + LinkedIn do decisor",
      "WhatsApp dentro do CRM",
      "Cadências multicanal (Prospecção 3.0)",
      "Scripts de ligação na tela",
      "Inteligência por nicho: dores, objeções e argumentos",
    ],
    variant: "glow-brand",
  },
  {
    name: "Equipe",
    icon: <Users className="size-4" />,
    description: "Para equipes em crescimento: escolha quantos vendedores",
    pricePrefix: "a partir de",
    price: 997,
    priceDetail: "3 usuários · R$ 332 por usuário",
    guarantee: "Suporte prioritário + onboarding",
    priceNote: "+ R$ 147 por usuário extra. Créditos sobem por faixa.",
    cta: {
      variant: "default",
      label: "Falar com vendas",
      href: siteConfig.links.sales,
    },
    featuresLabel: "Tudo do Pro, mais:",
    features: [
      "2.000 a 5.000 decisores por mês",
      "3 a 20 usuários",
      "Painel do líder em tempo real",
      "Cada vendedor com o próprio CRM",
      "Atlas Academy e treinamentos de vendas",
    ],
    variant: "glow",
  },
];

export default function Pricing({
  title = "Escolha o tamanho da sua operação",
  description = "Comece grátis. Suba de plano quando a fila apertar.",
  plans = DEFAULT_PRICING_PLANS,
  className = "",
}: PricingProps) {
  return (
    <Section id="planos" className={cn(className)}>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
        {(title || description) && (
          <div className="flex flex-col items-center gap-4 px-4 text-center sm:gap-8">
            {title && (
              <h2 className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-md text-muted-foreground max-w-[600px] font-medium sm:text-xl">
                {description}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/12 px-3 py-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                <GiftIcon className="size-4" aria-hidden="true" />
                No plano anual, 2 meses grátis
              </span>
              <a
                href={siteConfig.getStartedUrl}
                className="text-brand flex items-center gap-1 text-sm font-semibold"
              >
                Só quer conhecer? Teste com 25 decisores, sem cartão
                <ArrowRightIcon className="size-4" />
              </a>
            </div>
          </div>
        )}
        {plans !== false && plans.length > 0 && (
          <div className="max-w-container mx-auto grid w-full grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3 lg:items-center">
            {plans.map((plan) => (
              <PricingColumn key={plan.name} {...plan} />
            ))}
          </div>
        )}
        <div className="glass-1 dark:glass-2 flex w-full flex-col items-start justify-between gap-6 rounded-2xl p-8 shadow-xl md:flex-row md:items-center">
          <div className="flex flex-col gap-2">
            <h3 className="flex items-center gap-2 font-bold">
              <Building2 className="text-muted-foreground size-4" />
              Enterprise · sob medida
            </h3>
            <p className="text-muted-foreground max-w-[640px] text-sm">
              Sua operação é grande? Créditos e usuários sem teto, integração
              com o seu CRM e sistemas, API e relatórios dedicados, e gerente de
              conta dedicado.
            </p>
          </div>
          <LinkButton variant="glow" size="lg" href={siteConfig.links.sales}>
            Falar com a equipe
          </LinkButton>
        </div>
        <p className="text-muted-foreground text-center text-sm">
          Pix ou cartão (crédito ou débito) · Qualificar custa 1 crédito e{" "}
          <Good>só é cobrado se achar dados reais</Good> · Recarga avulsa{" "}
          <Good>não expira</Good>
        </p>
      </div>
    </Section>
  );
}
