"use client";

import { CheckIcon, type LucideIcon } from "lucide-react";
import { useEffect, useRef } from "react";

import { Section } from "../ui/section";

/** Seção com gravação real do Atlas (clara e escura) ao lado do texto e dos destaques. */
export function VideoSecao({ id, Icone, rotulo, titulo, texto, itens, video, caminho, inverte }: {
  id: string; Icone: LucideIcon | ((p: { className?: string }) => React.ReactNode); rotulo: string; titulo: string; texto: string;
  itens: { I: LucideIcon; t: string; d: string }[]; video: string; caminho: string; inverte?: boolean;
}) {
  const a = useRef<HTMLVideoElement>(null), b = useRef<HTMLVideoElement>(null);
  useEffect(() => { for (const v of [a.current, b.current]) if (v) { v.muted = true; v.play().catch(() => {}); } }, []);
  return (
    <Section id={id}>
      <div className="max-w-container mx-auto flex flex-col gap-10">
        <div className="flex max-w-[760px] flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="cad-logo vs-ico" aria-hidden="true"><span className="mt-anel" /><span className="mt-anel r" /><Icone /><i className="cad-orbita"><b /></i></span>
            <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">{rotulo}</span>
          </div>
          <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">{titulo}</h2>
          <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">{texto}</p>
        </div>
        <div className={`grid items-start gap-10 ${inverte ? "lg:grid-cols-[0.85fr_1.15fr]" : "lg:grid-cols-[1.15fr_0.85fr]"}`}>
          <figure className={`cad-video m-0 mx-auto w-full max-w-[760px] ${inverte ? "lg:order-2" : ""}`}>
            <div className="cad-barra"><span /><span /><span /><em>{caminho}</em><b><i /> Sistema real</b></div>
            {(["light", "dark"] as const).map((t) => (
              <video key={t} ref={t === "light" ? a : b} className={`block w-full ${t === "light" ? "dark:hidden" : "hidden dark:block"}`} autoPlay muted loop playsInline preload="metadata" poster={`/atlas/video/${video}-${t}-poster.jpg`} aria-label={titulo}>
                <source src={`/atlas/video/${video}-${t}.webm`} type="video/webm" />
                <source src={`/atlas/video/${video}-${t}.mp4`} type="video/mp4" />
              </video>
            ))}
          </figure>
          <ul className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-1 ${inverte ? "lg:order-1" : ""}`}>
            {itens.map(({ I, t, d }) => (
              <li key={t} className="cad-pilar"><span className="cad-pilar-ico"><I /></span><div><b>{t}</b><p>{d}</p></div></li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
export { CheckIcon };
