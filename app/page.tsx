import Cadencias from "../components/sections/cadencias/default";
import Calculator from "../components/sections/calculator/default";
import Community from "../components/sections/community/default";
import CTA from "../components/sections/cta/default";
import FAQ from "../components/sections/faq/default";
import {
  CrmSection,
  DataCheckSection,
  FitScoreSection,
  ScriptSection,
  TeamsSection,
  WhatsAppSection,
} from "../components/sections/features/default";
import Footer from "../components/sections/footer/default";
import Hero from "../components/sections/hero/default";
import Integrations from "../components/sections/integrations/default";
import Metodo from "../components/sections/metodo/default";
import Navbar from "../components/sections/navbar/default";
import Pricing from "../components/sections/pricing/default";
import Referral from "../components/sections/referral/default";
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
      <Metodo />
      {/* Super Destaque: Agente Atlas */}
      {/* Triagem e Dado Conferido */}
      <FitScoreSection />
      <DataCheckSection />
      {/* Cadências Inteligentes */}
      <Cadencias />
      {/* Destaque: Roteiro na tela */}
      <ScriptSection />
      {/* Destaque: WhatsApp no CRM */}
      <WhatsAppSection />
      {/* Destaque: CRM e Funil */}
      <CrmSection />
      {/* Gestão de Equipes */}
      <TeamsSection />
      {/* Canais e Integrações */}
      <Integrations />
      {/* Calculadora de ROI */}
      <Calculator />
      {/* Planos com Enterprise integrado (sem recargas avulsas) */}
      <Pricing />
      {/* Suporte e Comunidade */}
      <Community />
      {/* Segurança e LGPD */}
      <Security />
      {/* Dúvidas Frequentes */}
      <FAQ />
      {/* Indique e Ganhe */}
      <Referral />
      {/* Fechamento */}
      <CTA />
      <Footer />
    </main>
  );
}
