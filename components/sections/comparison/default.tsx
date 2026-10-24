import { CheckIcon, MinusIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Section } from "../../ui/section";

const COLUMNS = ["Na mão", "Planilha + CRM comum", "Com o Atlas"] as const;

// [tarefa, na mão, planilha + CRM comum, com o Atlas]
const ROWS: [string, string, string, string][] = [
  ["Montar a lista", "Horas no Google", "Planilha comprada ou importada", "Por nicho e região, em minutos"],
  ["Achar quem decide", "Liga para a recepção", "Campo vazio no CRM", "Número do sócio na ficha"],
  ["Conferir os dados", "Tentativa e erro", "Dado desatualizado", "Conferido em cada canal"],
  ["Saber o que falar", "Improviso", "Script num documento à parte", "Roteiro na tela, preenchido"],
  ["Fazer o follow-up", "Na memória", "Lembrete manual", "Cadência que para quando ele responde"],
  ["Saber quem está quente", "Achismo", "Achismo organizado", "Agente Atlas qualifica e move no CRM"],
  ["Onde tudo fica", "5 abas abertas", "3 ferramentas", "Uma tela só"],
];

const ICONS = [XIcon, MinusIcon, CheckIcon];
const TONES = ["text-red-600 dark:text-red-400", "text-amber-600 dark:text-amber-400", "text-emerald-600 dark:text-emerald-400"];

function Cell({ col, text }: { col: number; text: string }) {
  const Icon = ICONS[col];
  return (
    <span className={cn("flex items-start gap-2", col === 2 && "font-semibold")}>
      <Icon className={cn("mt-0.5 size-4 shrink-0", TONES[col])} strokeWidth={2.5} aria-hidden="true" />
      {text}
    </span>
  );
}

export default function Comparison() {
  return (
    <Section>
      <div className="max-w-container mx-auto flex flex-col gap-10 sm:gap-14">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">
            Comparativo
          </span>
          <h2 className="max-w-[760px] text-3xl leading-tight font-semibold text-balance sm:text-5xl">
            CRMs comuns organizam o trabalho do SDR.{" "}
            <span className="text-brand">O Atlas faz o trabalho do SDR.</span>
          </h2>
        </div>

        {/* Desktop: tabela de 3 colunas */}
        <div className="glass-1 dark:glass-2 hidden overflow-hidden rounded-2xl shadow-xl md:block">
          <table className="w-full text-left text-sm lg:text-base">
            <thead>
              <tr className="border-border/15 border-b">
                <th className="text-muted-foreground p-5 font-medium" scope="col">
                  <span className="sr-only">Tarefa</span>
                </th>
                {COLUMNS.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={cn(
                      "p-5 font-semibold",
                      i === 2 && "bg-brand/10 text-brand",
                    )}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([task, ...cells]) => (
                <tr key={task} className="border-border/10 border-b last:border-0">
                  <th scope="row" className="p-5 font-semibold">
                    {task}
                  </th>
                  {cells.map((text, i) => (
                    <td
                      key={i}
                      className={cn("text-muted-foreground p-5", i === 2 && "bg-brand/[0.06] text-foreground")}
                    >
                      <Cell col={i} text={text} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Celular: um cartão por tarefa */}
        <div className="flex flex-col gap-3 md:hidden">
          {ROWS.map(([task, ...cells]) => (
            <div key={task} className="glass-1 dark:glass-2 flex flex-col gap-2.5 rounded-2xl p-5 text-sm shadow-lg">
              <span className="font-semibold">{task}</span>
              {cells.map((text, i) => (
                <span key={i} className={cn(i < 2 && "text-muted-foreground")}>
                  <span className="sr-only">{COLUMNS[i]}: </span>
                  <Cell col={i} text={text} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
