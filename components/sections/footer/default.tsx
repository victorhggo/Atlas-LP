import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import Atlas from "../../logos/atlas";
import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContent,
} from "../../ui/footer";
import { ModeToggle } from "../../ui/mode-toggle";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: ReactNode;
  name?: string;
  columns?: FooterColumnProps[];
  copyright?: string;
  policies?: FooterLink[];
  showModeToggle?: boolean;
  className?: string;
}

export default function FooterSection({
  logo = <Atlas />,
  name = "ATLAS",
  columns = [
    {
      title: "Produto",
      links: [
        { text: "Método ATLAS", href: "#metodo" },
        { text: "WhatsApp e Cadências", href: "#cadencias" },
        { text: "CRM & Funil", href: "#crm" },
        { text: "Calculadora", href: "#calculadora" },
        { text: "Planos & Preços", href: "#planos" },
        { text: "Dúvidas frequentes", href: "#duvidas" },
      ],
    },
    {
      title: "Conta & Recursos",
      links: [
        { text: "Entrar na conta", href: siteConfig.loginUrl },
        { text: "Testar grátis (25 créditos)", href: siteConfig.getStartedUrl },
      ],
    },
    {
      title: "Contato & Demonstração",
      links: [
        { text: "Falar no WhatsApp", href: siteConfig.links.sales },
        { text: "Agendar demonstração", href: siteConfig.links.demo },
        { text: "Matteline VoIP", href: siteConfig.links.matte },
      ],
    },
  ],
  copyright = "© 2026 Atlas. Todos os direitos reservados.",
  policies = [
    { text: "Segurança e LGPD", href: "#seguranca" },
    { text: "Privacidade", href: "#seguranca" },
    { text: "Termos de uso", href: "#seguranca" },
  ],
  showModeToggle = false,
  className,
}: FooterProps) {
  return (
    <footer className={cn("bg-background w-full px-4", className)}>
      <div className="max-w-container mx-auto">
        <Footer>
          <FooterContent>
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
                {logo}
                <h3 className="text-xl font-bold tracking-[0.18em]">{name}</h3>
              </div>
              <p className="text-muted-foreground text-xs mt-3 max-w-[260px] leading-relaxed">
                O CRM preguiçoso para PMEs e prestadores de serviço: acha o decisor, organiza o funil e lembra o follow-up. Você só liga.
              </p>
            </FooterColumn>
            {columns.map((column) => (
              <FooterColumn key={column.title}>
                <h3 className="text-md pt-1 font-semibold">{column.title}</h3>
                {column.links.map((link) => (
                  <a
                    key={`${link.href}-${link.text}`}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.text}
                  </a>
                ))}
              </FooterColumn>
            ))}
          </FooterContent>
          <FooterBottom>
            <div>{copyright}</div>
            <div className="flex items-center gap-4">
              {policies.map((policy) => (
                <a
                  key={`${policy.href}-${policy.text}`}
                  href={policy.href}
                  className="hover:text-foreground transition-colors"
                >
                  {policy.text}
                </a>
              ))}
              {showModeToggle && <ModeToggle />}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
