import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface HighlightProps {
  children: ReactNode;
  className?: string;
}

// Destaque positivo: texto verde com marca-texto suave por baixo
function Good({ children, className }: HighlightProps) {
  return (
    <span
      className={cn(
        "rounded-sm bg-[linear-gradient(transparent_62%,rgb(16_185_129/0.2)_62%)] px-0.5 font-semibold text-emerald-600 dark:text-emerald-400",
        className,
      )}
    >
      {children}
    </span>
  );
}

// Destaque negativo: texto vermelho riscado, para a dor que o Atlas elimina
function Bad({ children, className }: HighlightProps) {
  return (
    <span
      className={cn(
        "font-semibold text-red-600 line-through decoration-red-500/70 decoration-2 dark:text-red-400",
        className,
      )}
    >
      {children}
    </span>
  );
}

// Destaque de marca: azul do Atlas
function Brand({ children, className }: HighlightProps) {
  return (
    <span className={cn("text-brand font-semibold", className)}>
      {children}
    </span>
  );
}

export { Bad, Brand, Good };
