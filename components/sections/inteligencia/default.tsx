"use client";

import { BrainIcon, ChevronUpIcon, CrownIcon, FlameIcon, LightbulbIcon, MessageCircleQuestionIcon, ShieldCheckIcon, SpellCheck2Icon, TargetIcon, TrendingUpIcon } from "lucide-react";
import { useState } from "react";

import { Section } from "../../ui/section";

// Mesmo cartão "Inteligência do nicho" da ficha do Atlas, com dados reais do nicho de odontologia.
const NICHOS = {
  Odontologia: {
    decide: "O dentista dono ou a gestora da clínica. Secretária filtra muito: peça a gestora pelo nome.",
    dores: ["Avaliação que não vira tratamento", "Depender de convênio odontológico", "Paciente que some no meio do tratamento"],
    pergunta: "De cada 10 avaliações do último mês, quantas fecharam tratamento?",
    abas: {
      Perguntas: ["Quantas avaliações por mês?", "Quantas viram tratamento?", "Quem apresenta o orçamento: o dentista ou a recepção?"],
      Objeções: ["“Já temos agência” → Ótimo. Quantos pacientes particulares ela trouxe no mês?", "“Agora não é o momento” → Vamos só ver o custo das avaliações perdidas."],
      "O que convence": ["Número de avaliações que viraram tratamento em clínicas parecidas", "Agenda cheia sem depender de convênio"],
      Palavras: ["Use: tratamento, avaliação, agenda, particular", "Evite: marketing, seguidores, curtidas"],
    },
  },
  Imobiliárias: {
    decide: "O corretor dono ou o gerente comercial. Em rede, peça o responsável pela captação.",
    dores: ["Lead de portal que não responde", "Captação de imóvel parada", "Corretor sem rotina de follow-up"],
    pergunta: "Quantos leads de portal do mês passado viraram visita?",
    abas: {
      Perguntas: ["Quantos leads chegam por mês?", "Quanto tempo leva o primeiro contato?", "Quem faz o follow-up depois da visita?"],
      Objeções: ["“Já usamos CRM” → Ele te diz quem ligar agora ou só guarda o contato?", "“Os portais já trazem lead” → E quantos viram visita?"],
      "O que convence": ["Visitas agendadas a mais por corretor", "Follow-up que sai sozinho no WhatsApp"],
      Palavras: ["Use: visita, captação, carteira, VGV", "Evite: anúncio, impulsionar, engajamento"],
    },
  },
} as const;

type Nicho = keyof typeof NICHOS;
type Aba = keyof (typeof NICHOS)[Nicho]["abas"];
const ICONE_ABA = { Perguntas: MessageCircleQuestionIcon, Objeções: ShieldCheckIcon, "O que convence": LightbulbIcon, Palavras: SpellCheck2Icon } as const;

const BENEFICIOS = [
  { I: FlameIcon, t: "As dores de cada segmento", d: "O que tira o sono do dono, antes de você ligar." },
  { I: TargetIcon, t: "A pergunta que faz a dor pesar", d: "Uma pergunta só, que leva o decisor a querer a reunião." },
  { I: ShieldCheckIcon, t: "Objeções já contornadas", d: "“Já tenho”, “agora não”, “manda por WhatsApp”: resposta pronta." },
  { I: TrendingUpIcon, t: "Mais conversão em reunião", d: "Você fala a língua do nicho e agenda mais com a mesma lista." },
];

export default function Inteligencia() {
  const [nicho, setNicho] = useState<Nicho>("Odontologia");
  const [aba, setAba] = useState<Aba>("Perguntas");
  const n = NICHOS[nicho];
  return (
    <Section id="inteligencia">
      <div className="max-w-container mx-auto grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="ic-ico" aria-hidden="true"><BrainIcon /></span>
            <span className="text-xs font-semibold tracking-[0.16em] text-amber-600 uppercase dark:text-amber-400">Inteligência comercial automática</span>
          </div>
          <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">Você liga já sabendo o que dói no cliente.</h2>
          <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">Para cada segmento que você prospecta, o Atlas entrega o estudo do nicho pronto: quem decide, as dores, a pergunta que faz a dor pesar e como contornar cada objeção.</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {BENEFICIOS.map(({ I, t, d }) => (
              <li key={t} className="cad-pilar ic-pilar"><span className="cad-pilar-ico"><I /></span><div><b>{t}</b><p>{d}</p></div></li>
            ))}
          </ul>
        </div>
        <div className="mx-auto w-full max-w-[560px]">
          <div className="ic-nichos" role="tablist" aria-label="Nicho">
            {(Object.keys(NICHOS) as Nicho[]).map((k) => (
              <button key={k} type="button" role="tab" aria-selected={nicho === k} className={nicho === k ? "on" : ""} onClick={() => setNicho(k)}>{k}</button>
            ))}
          </div>
          <div className="ic-card">
            <div className="ic-topo">
              <span className="ic-ico peq" aria-hidden="true"><BrainIcon /></span>
              <div className="flex-1"><small>Inteligência do nicho</small><b>{nicho}</b></div>
              <span className="ic-selo">Método Escolhidos</span>
              <ChevronUpIcon className="text-muted-foreground size-4" />
            </div>
            <div className="ic-corpo">
              <p className="ic-decide"><CrownIcon /> <span><b>Quem decide:</b> {n.decide}</span></p>
              <span className="ic-rot"><FlameIcon /> O que tira o sono desse dono</span>
              <div className="ic-dores">{n.dores.map((d, i) => <div key={d}><i>{i + 1}</i>{d}</div>)}</div>
              <div className="ic-pergunta"><TargetIcon /><div><small>Pergunta que faz a dor pesar</small><p>{n.pergunta}</p></div></div>
              <div className="ic-abas">
                {(Object.keys(n.abas) as Aba[]).map((k) => { const I = ICONE_ABA[k]; return (
                  <button key={k} type="button" className={aba === k ? "on" : ""} onClick={() => setAba(k)}><I />{k}</button>
                ); })}
              </div>
              <ol className="ic-lista">{n.abas[aba].map((t) => <li key={t}>{t}</li>)}</ol>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
