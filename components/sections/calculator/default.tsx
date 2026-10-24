import { Section } from "../../ui/section";
import { SdrCalculator } from "./calculator";

export default function Calculator() {
  return (
    <Section id="calculadora">
      <div className="max-w-container mx-auto flex flex-col gap-10 sm:gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">
            SDR x Atlas
          </span>
          <h2 className="max-w-[700px] text-3xl leading-tight font-semibold text-balance sm:text-5xl">
            Quanto custa montar lista na mão todo mês?
          </h2>
          <p className="text-muted-foreground max-w-[540px] text-base text-balance sm:text-lg">
            Simule os números da sua operação e compare o custo por decisor.
          </p>
        </div>
        <SdrCalculator />
      </div>
    </Section>
  );
}
