import ParaQuem from "../components/sections/para-quem/default";
import Qualificar from "../components/sections/qualificar/default";
import Ligar from "../components/sections/ligar/default";
import WhatsApp from "../components/sections/whatsapp/default";
import CrmDemo from "../components/sections/crm-demo/default";
import Cadencias from "../components/sections/cadencias/default";
import Calculator from "../components/sections/calculator/default";
import CTA from "../components/sections/cta/default";
import FAQ from "../components/sections/faq/default";
import {
  TeamsSection,
} from "../components/sections/features/default";
import Footer from "../components/sections/footer/default";
import Hero from "../components/sections/hero/default";
import Metodo from "../components/sections/metodo/default";
import Navbar from "../components/sections/navbar/default";
import Pricing from "../components/sections/pricing/default";
import Security from "../components/sections/security/default";
import { CursorGlow } from "../components/ui/cursor-glow";
import { LayoutLines } from "../components/ui/layout-lines";

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen w-full">
      <LayoutLines />
      <CursorGlow />
      <Navbar />
      <div id="conteudo" />
      <Hero />
      <ParaQuem />
      <Metodo />
      {/* Super Destaque: Agente Atlas */}
      {/* Triagem e Dado Conferido */}
      <WhatsApp />
      <Qualificar />
      {/* Cadências Inteligentes */}
      <Cadencias />
      {/* Destaque: Roteiro na tela */}
      <Ligar />
      {/* Destaque: CRM e Funil */}
      <CrmDemo />
      {/* Gestão de Equipes */}
      <TeamsSection />
      {/* Calculadora de ROI */}
      <Calculator />
      {/* Planos com Enterprise integrado (sem recargas avulsas) */}
      <Pricing />
      {/* Suporte e Comunidade */}
      {/* Segurança e LGPD */}
      <Security />
      {/* Dúvidas Frequentes */}
      <FAQ />
      {/* Indique e Ganhe */}
      {/* Fechamento */}
      <CTA />
      <Footer />
    </main>
  );
}
