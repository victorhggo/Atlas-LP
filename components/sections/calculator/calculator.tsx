"use client";

import { useId, useState } from "react";

// Base da comparação: plano Pro (R$ 297 por 800 créditos) e 22 dias úteis.
const PRO_PRICE = 297;
const PRO_CREDITS = 800;
const WORKDAYS = 22;
const ATLAS_PER_LEAD = PRO_PRICE / PRO_CREDITS;

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: n < 10 ? 2 : 0 });

function Field({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
}: {
  label: string;
  hint: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-base font-semibold">
          {label}
        </label>
        <span className="text-brand text-lg font-bold tabular-nums sm:text-xl">
          {prefix}
          {value.toLocaleString("pt-BR")}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="accent-[var(--brand)] h-2 w-full cursor-pointer"
      />
      <span className="text-muted-foreground text-sm">{hint}</span>
    </div>
  );
}

export function SdrCalculator() {
  const [salary, setSalary] = useState(5000);
  const [leadsPerDay, setLeadsPerDay] = useState(15);
  const [minutes, setMinutes] = useState(6);

  const leadsPerMonth = leadsPerDay * WORKDAYS;
  const sdrPerLead = salary / leadsPerMonth;
  const times = sdrPerLead / ATLAS_PER_LEAD;
  const hoursSaved = (leadsPerMonth * minutes) / 60;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="glass-1 dark:glass-2 flex flex-col gap-7 rounded-2xl p-6 shadow-xl sm:p-8">
        <Field
          label="Quanto você paga por SDR"
          hint="Salário e encargos por mês"
          value={salary}
          onChange={setSalary}
          min={1500}
          max={15000}
          step={250}
          prefix="R$ "
        />
        <Field
          label="Leads que ele acha por dia"
          hint="Empresas pesquisadas e com contato encontrado"
          value={leadsPerDay}
          onChange={setLeadsPerDay}
          min={5}
          max={60}
          step={1}
        />
        <Field
          label="Minutos para achar cada lead"
          hint="Google, Instagram, site, descobrir quem decide"
          value={minutes}
          onChange={setMinutes}
          min={2}
          max={20}
          step={1}
        />
      </div>
      <div className="flex flex-col gap-4" aria-live="polite">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 rounded-2xl border border-red-500/25 bg-red-500/[0.06] p-5">
            <span className="text-sm text-red-600 dark:text-red-400">Custo por lead com SDR</span>
            <span className="text-3xl font-bold tabular-nums sm:text-4xl">{brl(sdrPerLead)}</span>
          </div>
          <div className="flex flex-col gap-1 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.07] p-5">
            <span className="text-sm text-emerald-600 dark:text-emerald-400">Custo por lead com o Atlas</span>
            <span className="text-3xl font-bold tabular-nums sm:text-4xl">{brl(ATLAS_PER_LEAD)}</span>
          </div>
        </div>
        <div className="glass-1 dark:glass-2 flex flex-col gap-3 rounded-2xl p-6 shadow-xl">
          <p className="text-lg leading-snug sm:text-xl">
            Cada lead sai{" "}
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {times >= 2 ? `${Math.round(times)}x mais barato` : "mais barato"}
            </span>{" "}
            no Atlas e economiza{" "}
            <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {Math.round(hoursSaved)}h/mês
            </span>{" "}
            de pesquisa manual.
          </p>
          <p className="text-muted-foreground text-sm sm:text-base">
            Base: plano Pro ({brl(PRO_PRICE)} por {PRO_CREDITS} créditos) em {WORKDAYS} dias úteis.
          </p>
        </div>
      </div>
    </div>
  );
}
