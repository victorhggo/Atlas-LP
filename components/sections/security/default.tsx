import { CheckIcon } from "lucide-react";

import { siteConfig } from "@/config/site";

import { Good } from "../../ui/highlight";
import { Reveal } from "../../ui/reveal";
import { Section } from "../../ui/section";

const ITEMS = [
  {
    title: "Dados protegidos e isolados",
    detail: "Listas e conversas isoladas. No Equipe, cada vendedor vê só os próprios leads.",
    badge: "Criptografado",
  },
  {
    title: "Base pública e página de privacidade",
    detail: "Apenas CNPJs ativos na Receita Federal e canais corporativos conferidos.",
    badge: "Receita Federal",
  },
  {
    title: "Remoção a pedido do titular",
    detail: "Canal direto para exclusão imediata de qualquer contato a pedido do titular.",
    badge: "LGPD",
  },
  {
    title: "Pagamentos pelo Asaas",
    detail: "Assinaturas e recargas via Pix ou cartão de crédito, sem fidelidade.",
    badge: "Pix e Cartão",
  },
];

export default function Security() {
  return (
    <Section id="seguranca" className="relative overflow-x-clip">
      <div className="max-w-container mx-auto">
        <Reveal>
          <div className="glass-2 dark:glass-3 grid items-center gap-8 rounded-3xl p-6 shadow-2xl sm:p-10 lg:grid-cols-[1fr_1.25fr] lg:gap-12">
            <div className="flex flex-col gap-4">
              <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">
                Segurança e LGPD
              </span>
              <h2 className="text-3xl leading-tight font-semibold text-balance sm:text-4xl">
                Dados protegidos, LGPD e pagamento pelo Asaas.
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
                Base pública conferida, <Good>remoção imediata a pedido do titular</Good>{" "}
                e cobrança segura por Pix ou cartão.
              </p>
              <a
                href={siteConfig.links.sales}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand mt-1 w-fit text-sm font-semibold hover:underline sm:text-base"
              >
                Solicitar remoção de contato como titular →
              </a>
            </div>

            <div className="border-border/15 bg-background/65 flex flex-col divide-y rounded-2xl border p-2 shadow-xl sm:p-4">
              {ITEMS.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col justify-between gap-2 p-3.5 sm:flex-row sm:items-center sm:gap-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-500">
                      <CheckIcon className="size-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold sm:text-base">
                        {item.title}
                      </span>
                      <span className="text-muted-foreground text-xs sm:text-sm">
                        {item.detail}
                      </span>
                    </div>
                  </div>
                  <span className="w-fit shrink-0 rounded-full bg-emerald-500/12 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
