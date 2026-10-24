import About from "../components/sections/about/default";
import Calculator from "../components/sections/calculator/default";
import Chores from "../components/sections/chores/default";
import Community from "../components/sections/community/default";
import Comparison from "../components/sections/comparison/default";
import CTA from "../components/sections/cta/default";
import Demo from "../components/sections/demo/default";
import Enterprise from "../components/sections/enterprise/default";
import FAQ from "../components/sections/faq/default";
import {
  AgentSection,
  CrmSection,
  DataCheckSection,
  FitScoreSection,
  FollowUpSection,
  ScriptSection,
  TeamsSection,
  WhatsAppSection,
} from "../components/sections/features/default";
import Footer from "../components/sections/footer/default";
import ForWhom from "../components/sections/for-whom/default";
import Hero from "../components/sections/hero/default";
import HowItWorks from "../components/sections/how-it-works/default";
import Integrations from "../components/sections/integrations/default";
import Navbar from "../components/sections/navbar/default";
import Pricing from "../components/sections/pricing/default";
import Referral from "../components/sections/referral/default";
import Security from "../components/sections/security/default";
import SocialProof from "../components/sections/social-proof/default";
import Stats from "../components/sections/stats/default";
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
      <Demo />
      <Chores />
      <AgentSection />
      <FitScoreSection />
      <DataCheckSection />
      <ScriptSection />
      <FollowUpSection />
      <WhatsAppSection />
      <CrmSection />
      <TeamsSection />
      <Integrations />
      <Calculator />
      <ForWhom />
      <Comparison />
      <HowItWorks />
      <Stats />
      <SocialProof />
      <Pricing />
      <Enterprise />
      <Community />
      <Security />
      <FAQ />
      <Referral />
      <About />
      <CTA />
      <Footer />
    </main>
  );
}
