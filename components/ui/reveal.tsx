"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  from?: "left" | "right" | "bottom";
  delay?: number;
  className?: string;
}

const HIDDEN = {
  left: "-translate-x-10",
  right: "translate-x-10",
  bottom: "translate-y-10",
};

// Entra na tela quando o bloco fica visível. O HTML do servidor já vem
// visível: só esconde no cliente o que ainda está abaixo da dobra.
export function Reveal({
  children,
  from = "bottom",
  delay = 0,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setHidden(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setHidden(false);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-hidden={hidden}
      style={{ transitionDelay: hidden ? "0ms" : `${delay}ms` }}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out",
        hidden && cn("opacity-0", HIDDEN[from]),
        className,
      )}
    >
      {children}
    </div>
  );
}
