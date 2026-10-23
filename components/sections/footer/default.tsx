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
        { text: "Funcionalidades", href: "#funcionalidades" },
        { text: "Como funciona", href: "#como-funciona" },
        { text: "Planos", href: "#planos" },
        { text: "Dúvidas", href: "#duvidas" },
      ],
    },
    {
      title: "Conta",
      links: [
        { text: "Entrar", href: siteConfig.loginUrl },
        { text: "Testar grátis", href: siteConfig.getStartedUrl },
      ],
    },
    {
      title: "Contato",
      links: [{ text: "Falar com vendas", href: siteConfig.links.sales }],
    },
  ],
  copyright = "© 2026 Atlas. Todos os direitos reservados.",
  // TODO: links das páginas de termos e privacidade
  policies = [
    { text: "Privacidade", href: "#" },
    { text: "Termos de uso", href: "#" },
  ],
  // O seletor de tema do template é em inglês e a LP é pensada no escuro
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
            </FooterColumn>
            {columns.map((column) => (
              <FooterColumn key={column.title}>
                <h3 className="text-md pt-1 font-semibold">{column.title}</h3>
                {column.links.map((link) => (
                  <a
                    key={`${link.href}-${link.text}`}
                    href={link.href}
                    className="text-muted-foreground text-sm"
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
                <a key={`${policy.href}-${policy.text}`} href={policy.href}>
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
