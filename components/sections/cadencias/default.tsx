"use client";

import { ClockIcon, PauseIcon } from "lucide-react";
import { useState } from "react";

import { Section } from "../../ui/section";

const CADENCIAS_PRONTAS = [
  {
    nome: "Prospecção 3.0",
    foco: "Lead novo",
    duracao: "14 dias úteis · 25 toques",
    descricao: "Alterna ligação, WhatsApp (texto, áudio e imagem), e-mail, Instagram e LinkedIn no ritmo ideal.",
    toques: ["Ligação", "LinkedIn", "WhatsApp", "Instagram", "E-mail", "Áudio WhatsApp"],
    recomendada: true,
  },
  {
    nome: "Convite para análise",
    foco: "WhatsApp exclusivo",
    duracao: "11 dias úteis · 8 toques",
    descricao: "Método focado em fazer o decisor responder no WhatsApp e aceitar uma análise rápida.",
    toques: ["WhatsApp texto", "Áudio curto", "WhatsApp imagem", "Follow-up leve"],
    recomendada: false,
  },
  {
    nome: "Reativação de orçamentos",
    foco: "Proposta sem resposta",
    duracao: "7 dias úteis · 5 toques",
    descricao: "Mensagens com abordagem criativa e saída honesta para destravar decisões pendentes.",
    toques: ["WhatsApp texto", "Imagem de humor", "Check de prioridade"],
    recomendada: false,
  },
];

const FOLLOW_UPS = [
  {
    tipo: "Mensagem direta",
    texto: "Fulano, vi que você ainda não conseguiu me responder. Ainda faz sentido conversarmos esta semana ou prefere que eu encerre por aqui?",
  },
  {
    tipo: "Humor leve",
    texto: "Fulano, apaguei três mensagens antes dessa para não parecer chato. Ficou só essa pergunta rápida: o projeto ainda é prioridade?",
  },
];

export default function Cadencias() {
  const [copiado, setCopiado] = useState<number | null>(null);

  const copiar = (idx: number, texto: string) => {
    navigator.clipboard?.writeText(texto);
    setCopiado(idx);
    setTimeout(() => setCopiado(null), 2000);
  };

  return (
    <Section id="cadencias" className="py-12 sm:py-20">
      <div className="max-w-container mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center gap-3.5 max-w-[760px] mx-auto">
          <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">
            Cadências inteligentes
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-balance">
            Respondeu, pausa. Não respondeu, o próximo toque já está na agenda.
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg text-balance">
            Coloque a rotina de prospecção no ritmo certo. O Atlas alterna ligação, WhatsApp, áudio e e-mail, e para sozinho quando o decisor responde.
          </p>
        </div>

        {/* Demonstração Visual das Cadências (GIF do Sistema) */}
        <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-border/40 bg-card/60 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-border/30 bg-muted/30 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-red-500/80" />
              <span className="size-3 rounded-full bg-amber-500/80" />
              <span className="size-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-medium text-muted-foreground">
                Atlas • Visão Geral de Cadências e Follow-ups
              </span>
            </div>
            <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-[11px] font-semibold text-brand">
              Interface real do Atlas
            </span>
          </div>

          <div className="relative aspect-[1440/900] w-full overflow-hidden bg-white">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/atlas/cadencias-poster.jpg?v=light60"
              className="size-full object-contain"
            >
              <source src="/atlas/cadencias.mp4?v=light60" type="video/mp4" />
              <img
                src="/atlas/cadencias.gif?v=light60"
                alt="Demonstração prática das Cadências Inteligentes no Atlas"
                className="size-full object-contain"
              />
            </video>
          </div>
        </div>

        {/* Grade de Cadências do Sistema */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CADENCIAS_PRONTAS.map((c) => (
            <div
              key={c.nome}
              className={`glass-1 dark:glass-2 flex flex-col justify-between gap-5 rounded-2xl border p-6 shadow-xl transition-transform duration-200 hover:-translate-y-0.5 ${
                c.recomendada ? "border-brand/40 bg-brand/[0.03]" : "border-border/30"
              }`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold tracking-wider uppercase text-muted-foreground">
                    {c.foco}
                  </span>
                  {c.recomendada && (
                    <span className="rounded-full bg-brand/12 text-brand px-2.5 py-0.5 text-xs font-semibold">
                      Recomendada
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-foreground">{c.nome}</h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <ClockIcon className="size-3.5" />
                  {c.duracao}
                </span>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {c.descricao}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/20">
                {c.toques.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-foreground/[0.04] border border-border/15 px-2 py-1 text-xs font-medium text-foreground/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Faixa inferior: Pausa Automática e Banco de Follow-ups Criativos */}
        <div className="glass-2 dark:glass-3 grid items-center gap-6 rounded-2xl border border-border/30 p-6 sm:p-8 shadow-xl lg:grid-cols-[1fr_1.2fr] lg:gap-10">
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-3 py-1 text-xs font-bold uppercase tracking-wider">
              <PauseIcon className="size-3.5" />
              Pausa inteligente
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              Se o decisor responder no WhatsApp, a cadência para na hora.
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Você não corre o risco de mandar mensagem automática depois que o cliente já te atendeu. A rota pausa sozinha e o lead é direcionado para a conversa humana.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Banco de follow-ups criativos prontos para usar:
            </span>
            {FOLLOW_UPS.map((f, idx) => (
              <div
                key={f.tipo}
                className="bg-background/70 border border-border/25 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-brand">{f.tipo}</span>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-snug">
                    “{f.texto}”
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copiar(idx, f.texto)}
                  className="shrink-0 self-start sm:self-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-foreground/[0.06] hover:bg-brand hover:text-white transition-colors cursor-pointer"
                >
                  {copiado === idx ? "Copiado!" : "Copiar"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
