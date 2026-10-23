import { type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  from?: "left" | "right" | "bottom";
  delay?: number;
  className?: string;
}

// Entra na tela conforme a rolagem, só com CSS (animation-timeline: view(),
// ver .reveal em globals.css). Zero JavaScript: não pesa no carregamento.
// Onde o navegador não suporta, ou com movimento reduzido, aparece direto.
export function Reveal({
  children,
  from = "bottom",
  delay = 0,
  className,
}: RevealProps) {
  return (
    <div
      className={cn("reveal", `reveal-${from}`, className)}
      // o "atraso" vira um deslocamento no trecho da rolagem que anima
      style={{ "--reveal-start": `${delay / 10}%` } as CSSProperties}
    >
      {children}
    </div>
  );
}
