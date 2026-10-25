import { Section } from "../../ui/section";
import { SdrCalculator } from "./calculator";

export default function Calculator() {
  return (
    <Section id="calculadora">
      <div className="mx-auto flex max-w-[1080px] flex-col gap-8 sm:gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">
            Lista na mão x Atlas
          </span>
          <h2 className="max-w-[700px] text-3xl leading-tight font-semibold text-balance sm:text-4xl">
            Quanto custa montar lista na mão?
          </h2>
          <p className="text-muted-foreground max-w-[540px] text-base text-balance sm:text-lg">
            Mexa nos três números e veja o tempo e o dinheiro que escapam todo mês, e quantas vendas o Atlas devolve.
          </p>
        </div>
        <SdrCalculator />
      </div>
    </Section>
  );
}
