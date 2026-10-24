"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

import { Button } from "./button";

// Alterna entre o tema claro (padrão) e o escuro com a mesma animação do sistema Atlas:
// o novo tema cresce num círculo a partir do botão. Sem View Transitions, as cores fazem fade.
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const alternar = (e: React.MouseEvent) => {
    const novo = resolvedTheme === "dark" ? "light" : "dark";
    const doc = document as Document & { startViewTransition?: (f: () => void) => { ready: Promise<void> } };
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduzir) {
      document.documentElement.classList.add("tema-trans");
      setTheme(novo);
      setTimeout(() => document.documentElement.classList.remove("tema-trans"), 450);
      return;
    }
    const x = e.clientX, y = e.clientY;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    doc.startViewTransition(() => flushSync(() => setTheme(novo))).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "cubic-bezier(.4,0,.2,1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };
  return (
    <Button variant="ghost" size="icon" className="shrink-0" aria-label="Alternar entre tema claro e escuro" onClick={alternar}>
      <MoonIcon className="size-5 dark:hidden" aria-hidden="true" />
      <SunIcon className="hidden size-5 dark:block" aria-hidden="true" />
    </Button>
  );
}
