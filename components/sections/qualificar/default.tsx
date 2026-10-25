"use client";

import { CheckIcon, CoinsIcon, ScanSearchIcon } from "lucide-react";
import { useEffect, useRef } from "react";

import { Section } from "../../ui/section";

// Qualificação ao vivo: gravação real no Atlas (Imobiliárias · MG, 1 crédito, Ficha Atlas aberta no fim).
export default function Qualificar() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => { const v = ref.current; if (v) { v.muted = true; v.play().catch(() => {}); } }, []);
  return (
    <Section id="qualificar">
      <div className="max-w-container mx-auto grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="flex flex-col gap-4">
          <span className="text-brand flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase"><ScanSearchIcon className="size-4" /> Qualificação ao vivo</span>
          <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">Pule a recepção. Ligue direto para o dono.</h2>
          <p className="text-muted-foreground text-base leading-relaxed">Gravado no Atlas: imobiliárias de Minas Gerais, lista com nota de fit, 1 crédito e a ficha volta com site, Instagram, Google Maps, WhatsApp e o celular do sócio.</p>
          <ul className="flex flex-col gap-2 text-sm">
            {["Lista montada na hora, sem planilha", "Todos os canais de venda da empresa", "Número de quem decide, não da recepção"].map((t) => <li key={t} className="flex items-center gap-2"><CheckIcon className="text-brand size-4" />{t}</li>)}
            
          </ul>
          <div className="qualif-credito">
            <span className="qualif-credito-ico"><CoinsIcon /></span>
            <div><b>1 crédito = 1 empresa qualificada</b><p>Vários canais ativos (site, Instagram, Maps, WhatsApp, e-mail) e o número do responsável. Sem dado novo, o crédito volta.</p></div>
          </div>
        </div>
        <figure className="cad-video m-0 mx-auto w-full max-w-[720px]">
          <div className="cad-barra"><span /><span /><span /><em>atlas.escolhidospro.com.br/busca</em><b><i /> Sistema real</b></div>
          <video ref={ref} className="block w-full" autoPlay muted loop playsInline preload="metadata" poster="/atlas/video/qualificar-poster.jpg" aria-label="Criando uma lista de imobiliárias em MG e qualificando uma empresa no Atlas">
            <source src="/atlas/video/qualificar.webm" type="video/webm" />
            <source src="/atlas/video/qualificar.mp4" type="video/mp4" />
          </video>
        </figure>
      </div>
    </Section>
  );
}
