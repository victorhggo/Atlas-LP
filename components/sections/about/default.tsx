import { Section } from "../../ui/section";

// Bloco discreto de credibilidade: a marca é o Atlas, não a pessoa.
// TODO: incluir números do método dos Escolhidos quando forem confirmados.
export default function About() {
  return (
    <Section className="py-10 sm:py-14 md:py-16">
      <div className="max-w-container border-border/10 mx-auto flex flex-col items-center gap-3 border-y py-8 text-center">
        <span className="text-muted-foreground text-xs font-semibold tracking-[0.16em] uppercase">
          Quem está por trás
        </span>
        <p className="text-foreground/85 max-w-[640px] text-balance sm:text-lg">
          O Atlas nasceu dentro dos Escolhidos, um método de prospecção usado na
          prática, ligação por ligação. Cada tela existe porque alguém precisou
          dela num dia de prospecção.
        </p>
      </div>
    </Section>
  );
}
