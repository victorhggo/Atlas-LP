"use client";

import { CheckIcon, ClockIcon, MailIcon, MessageCircleIcon, MicIcon, PauseIcon, PhoneIcon, RouteIcon, SparklesIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Section } from "../../ui/section";

// Demonstração das Cadências inteligentes (nomes e resumos iguais aos do sistema; leads de exemplo).
const PRONTAS = [
  ["Prospecção 3.0", "Lead novo · 14 dias úteis · ligação, WhatsApp, e-mail, Instagram e LinkedIn"],
  ["Convite para análise", "WhatsApp · convite, áudio e reativação até ele responder"],
  ["Cadência 6·1·1", "2 dias por semana · 6 ligações, 1 ligação e 1 WhatsApp"],
  ["Reativação", "Lead que não respondeu · 8 toques no WhatsApp"],
  ["Destravar proposta", "Proposta sem resposta · texto, áudio e saída honesta"],
  ["Pós no-show", "Agendou e não apareceu · 7 dias úteis sem cobrança"],
];
const ROTA = [
  { lead: "Clínica Pura Pele", cad: "Prospecção 3.0", toque: 3, total: 9, status: "na agenda" },
  { lead: "Eccos Gestão", cad: "Convite para análise", toque: 2, total: 5, status: "respondeu" },
  { lead: "Agile Medicina", cad: "Cadência 6·1·1", toque: 5, total: 8, status: "saindo sozinha" },
  { lead: "Studio Lis", cad: "Reativação", toque: 1, total: 8, status: "na agenda" },
];
const FOLLOWUPS = [
  ["Garrafa no mar", "Joguei essa mensagem como quem joga uma garrafa no mar. Se chegar até você, me responde?"],
  ["Mensagem apagada", "Apaguei 3 mensagens antes dessa pra não parecer chato. Ficou só ela: ainda faz sentido conversar?"],
  ["Preciso de um favor", "Pode me ajudar com uma coisa rápida? Só me diz se devo continuar tentando ou encerrar por aqui."],
];
const ABAS = ["Cadências Atlas", "Minhas cadências", "Rota dos leads", "Follow-ups criativos"];
const TOQUES = [[PhoneIcon, "1ª ligação"], [MessageCircleIcon, "WhatsApp"], [MicIcon, "Áudio"], [MailIcon, "E-mail"], [MessageCircleIcon, "WhatsApp imagem"]] as const;

export default function Cadencias() {
  const [aba, setAba] = useState(0);
  const [auto, setAuto] = useState(true);
  const [toque, setToque] = useState(0);
  useEffect(() => { if (!auto) return; const t = setInterval(() => setAba((a) => (a + 1) % ABAS.length), 4500); return () => clearInterval(t); }, [auto]);
  useEffect(() => { const t = setInterval(() => setToque((x) => (x + 1) % 7), 900); return () => clearInterval(t); }, []);
  return (
    <Section id="cadencias">
      <div className="max-w-container mx-auto grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="flex flex-col gap-4">
          <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">Cadências inteligentes</span>
          <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">Respondeu, pausa. Não respondeu, o próximo toque já está na agenda.</h2>
          <p className="text-muted-foreground text-base leading-relaxed">Escolha uma cadência pronta ou crie a sua. O Atlas alterna ligação, WhatsApp, áudio, e-mail e redes, e para sozinho quando o lead responde.</p>
          <ul className="flex flex-col gap-2 text-sm">
            {["8 cadências prontas do Atlas", "Mensagens que saem sozinhas no horário", "Banco de follow-ups criativos"].map((t) => <li key={t} className="flex items-center gap-2"><CheckIcon className="text-brand size-4" />{t}</li>)}
          </ul>
        </div>
        <div className="cd-demo">
          <div className="cd-kpis">
            <div><b>12</b><span>leads em rota</span></div><div><b>5</b><span>para fazer hoje</span></div><div><b>8</b><span>saindo sozinhas</span></div><div className="ok"><b>3</b><span>responderam</span></div>
          </div>
          <div className="cd-abas" role="tablist">
            {ABAS.map((a, i) => <button key={a} type="button" role="tab" aria-selected={aba === i} className={aba === i ? "on" : ""} onClick={() => { setAba(i); setAuto(false); }}>{a}</button>)}
          </div>
          <div className="cd-corpo" key={aba}>
            {aba === 0 && <div className="cd-grade">{PRONTAS.map(([n, r]) => <div key={n} className="cd-card"><RouteIcon /><b>{n}</b><small>{r}</small></div>)}</div>}
            {aba === 1 && (
              <div className="cd-minha">
                <div className="cd-minha-cab"><b>Minha cadência · Clínicas SP</b><span>{TOQUES.length} toques · 10 dias</span></div>
                <ol>{TOQUES.map(([I, t], i) => <li key={t} className={i < toque ? "feito" : i === toque ? "agora" : ""}><span><I /></span>Dia {i * 2 + 1} · {t}<em>{i < toque ? "enviado" : i === toque ? "agora" : "na agenda"}</em></li>)}</ol>
              </div>
            )}
            {aba === 2 && <div className="cd-rota">{ROTA.map((r) => (
              <div key={r.lead} className={`cd-lead ${r.status === "respondeu" ? "resp" : ""}`}>
                <div><b>{r.lead}</b><small>{r.cad} · toque {r.toque} de {r.total}</small></div>
                <div className="cd-barra"><i style={{ width: `${(r.toque / r.total) * 100}%` }} /></div>
                <span>{r.status === "respondeu" ? <><PauseIcon /> pausou: respondeu</> : r.status === "saindo sozinha" ? <><SparklesIcon /> saindo sozinha</> : <><ClockIcon /> na agenda</>}</span>
              </div>
            ))}</div>}
            {aba === 3 && <div className="cd-fu">{FOLLOWUPS.map(([t, m]) => <div key={t} className="cd-bolha"><small>{t}</small><p>{m}</p></div>)}</div>}
          </div>
        </div>
      </div>
    </Section>
  );
}
