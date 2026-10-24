"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "./button";

// Alterna entre o tema claro (padrão) e o escuro. Os dois ícones ficam no HTML
// e o CSS mostra o certo, então não há "piscada" antes do JS carregar.
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      className="shrink-0"
      aria-label="Alternar entre tema claro e escuro"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <MoonIcon className="size-5 dark:hidden" aria-hidden="true" />
      <SunIcon className="hidden size-5 dark:block" aria-hidden="true" />
    </Button>
  );
}
