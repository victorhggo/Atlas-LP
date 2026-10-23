"use client";

import { type VariantProps } from "class-variance-authority";
import { Menu } from "lucide-react";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import Atlas from "../../logos/atlas";
import { Button, buttonVariants } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../ui/sheet";

interface NavbarLink {
  text: string;
  href: string;
}

interface NavbarActionProps {
  text: string;
  href: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
  isButton?: boolean;
}

interface NavbarProps {
  logo?: ReactNode;
  name?: string;
  homeUrl?: string;
  mobileLinks?: NavbarLink[];
  actions?: NavbarActionProps[];
  showNavigation?: boolean;
  customNavigation?: ReactNode;
  className?: string;
}

export default function Navbar({
  logo = <Atlas />,
  name = "ATLAS",
  homeUrl = "#",
  mobileLinks = [
    { text: "Funcionalidades", href: "#funcionalidades" },
    { text: "Como funciona", href: "#como-funciona" },
    { text: "Planos", href: "#planos" },
    { text: "Dúvidas", href: "#duvidas" },
    { text: "Entrar", href: siteConfig.loginUrl },
  ],
  actions = [
    { text: "Entrar", href: siteConfig.loginUrl, isButton: false },
    {
      text: "Testar grátis",
      href: siteConfig.getStartedUrl,
      isButton: true,
      variant: "default",
    },
  ],
  showNavigation = true,
  customNavigation,
  className,
}: NavbarProps) {
  return (
    <header className={cn("sticky top-0 z-50 -mb-4 px-4 pb-4", className)}>
      <div className="fade-bottom bg-background/15 absolute left-0 h-24 w-full backdrop-blur-lg"></div>
      <div className="max-w-container relative mx-auto">
        <NavbarComponent>
          <NavbarLeft>
            <a
              href={homeUrl}
              className="flex items-center gap-2 text-xl font-bold tracking-[0.18em]"
            >
              {logo}
              {name}
            </a>
            {showNavigation &&
              (customNavigation || (
                <nav aria-label="Seções" className="hidden items-center md:flex">
                  {mobileLinks
                    .filter((link) => link.href.startsWith("#"))
                    .map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="hover:bg-foreground/10 focus-visible:ring-ring/50 rounded-md px-4 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-[3px]"
                      >
                        {link.text}
                      </a>
                    ))}
                </nav>
              ))}
          </NavbarLeft>
          <NavbarRight>
            {actions.map((action) =>
              action.isButton ? (
                <Button
                  key={`${action.href}-${action.text}`}
                  variant={action.variant || "default"}
                  asChild
                >
                  <a href={action.href}>
                    {action.icon}
                    {action.text}
                    {action.iconRight}
                  </a>
                </Button>
              ) : (
                <a
                  key={`${action.href}-${action.text}`}
                  href={action.href}
                  className="hidden text-sm md:block"
                >
                  {action.text}
                </a>
              ),
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <nav className="grid gap-6 text-lg font-medium">
                  <a
                    href={homeUrl}
                    className="flex items-center gap-2 text-xl font-bold"
                  >
                    <span>{name}</span>
                  </a>
                  {mobileLinks.map((link) => (
                    <a
                      key={`${link.href}-${link.text}`}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.text}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
