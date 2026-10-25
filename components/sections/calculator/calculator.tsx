"use client";

import { useId, useState } from "react";

// Base: plano Pro (R$ 297 por 800 créditos), 22 dias úteis e médias de prospecção ativa.
const PRO_PRICE = 297;
const PRO_CREDITS = 800;
const WORKDAYS = 22;
const ATLAS_PER_LEAD = PRO_PRICE / PRO_CREDITS;
const MIN_POR_LEAD = 6; // pesquisar empresa, canais e decisor na mão
const LIGACOES_HORA = 12;
const LIGACOES_POR_REUNIAO = 20;
const REUNIOES_POR_VENDA = 5;

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
  const [salario, setSalario] = useState(4000);
  const [horas, setHoras] = useState(3);
  const [ticket, setTicket] = useState(3000);

  const horasMes = horas * WORKDAYS;
  const dinheiroPerdido = salario * (horas / 8);
  const leadsMes = Math.round((horasMes * 60) / MIN_POR_LEAD);
  const custoAtlas = Math.max(PRO_PRICE, leadsMes * ATLAS_PER_LEAD);
  const economia = Math.max(0, dinheiroPerdido - custoAtlas);
  const ligacoes = horasMes * LIGACOES_HORA;
  const reunioes = Math.floor(ligacoes / LIGACOES_POR_REUNIAO);
  const vendas = Math.floor(reunioes / REUNIOES_POR_VENDA);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.2fr]">
      <div className="glass-1 dark:glass-2 flex flex-col gap-7 rounded-2xl p-6 shadow-xl sm:p-8">
        <span className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">Sua operação hoje</span>
        <Field label="Salário de quem prospecta" hint="Seu vendedor, SDR ou você mesmo" value={salario} onChange={setSalario} min={1500} max={15000} step={250} prefix="R$ " />
        <Field label="Horas por dia montando lista" hint="Google, Instagram, site, descobrir quem decide" value={horas} onChange={setHoras} min={1} max={8} step={0.5} />
        <Field label="Quanto vale uma venda sua" hint="Ticket médio de um cliente fechado" value={ticket} onChange={setTicket} min={300} max={50000} step={100} prefix="R$ " />
      </div>
      <div className="flex flex-col gap-4" aria-live="polite">
        <div className="flex flex-col gap-2 rounded-2xl border border-red-500/25 bg-red-500/[0.06] p-6">
          <span className="text-sm font-semibold text-red-600 dark:text-red-400">O que você perde hoje, todo mês</span>
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
            <span className="text-3xl font-bold tabular-nums sm:text-4xl">{horasMes.toLocaleString("pt-BR")}h</span>
            <span className="text-3xl font-bold tabular-nums sm:text-4xl">{brl(dinheiroPerdido)}</span>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">Pagos para copiar e colar dado do Google, em vez de ligar para quem compra.</p>
        </div>
        <div className="flex flex-col gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.07] p-6">
          <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Com o Atlas fazendo a parte chata</span>
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
            <span className="text-3xl font-bold tabular-nums sm:text-4xl">+{horasMes.toLocaleString("pt-BR")}h livres</span>
            <span className="text-3xl font-bold tabular-nums sm:text-4xl">{brl(economia)} a menos</span>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">Os mesmos {leadsMes.toLocaleString("pt-BR")} leads prontos em minutos, por cerca de {brl(custoAtlas)} no mês.</p>
        </div>
        <div className="glass-1 dark:glass-2 flex flex-col gap-4 rounded-2xl p-6 shadow-xl">
          <span className="text-brand text-sm font-semibold">E essas horas viram o quê?</span>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[[ligacoes, "ligações"], [reunioes, "reuniões"], [vendas, "vendas"]].map(([n, t]) => (
              <div key={t} className="rounded-xl bg-[color-mix(in_oklab,var(--brand)_7%,transparent)] p-3">
                <div className="text-2xl font-bold tabular-nums sm:text-3xl">{Number(n).toLocaleString("pt-BR")}</div>
                <div className="text-muted-foreground text-sm">{t} a mais/mês</div>
              </div>
            ))}
          </div>
          <p className="text-lg leading-snug sm:text-xl">
            Até <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">{brl(vendas * ticket)}</span> a mais por mês que hoje ficam na mesa.
          </p>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Estimativa com médias de mercado: {LIGACOES_HORA} ligações por hora, 1 reunião a cada {LIGACOES_POR_REUNIAO} ligações e 1 venda a cada {REUNIOES_POR_VENDA} reuniões. Atlas no plano Pro ({brl(PRO_PRICE)} por {PRO_CREDITS} créditos).
          </p>
        </div>
      </div>
    </div>
  );
}
