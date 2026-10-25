import { DatabaseIcon, LockKeyholeIcon, ShieldCheckIcon, UserXIcon } from "lucide-react";

import { Section } from "../../ui/section";

const ITENS = [
  { I: LockKeyholeIcon, t: "Dados protegidos e isolados", d: "Cada conta tem seus dados separados. No plano Equipe, cada vendedor vê só os próprios leads." },
  { I: DatabaseIcon, t: "Base pública e conferida", d: "Apenas CNPJs ativos da Receita Federal e canais corporativos verificados." },
  { I: UserXIcon, t: "Remoção a pedido do titular", d: "Qualquer pessoa pode pedir a exclusão do seu contato, e ele sai na hora." },
];

export default function Security() {
  return (
    <Section id="seguranca">
      <div className="max-w-container lgpd mx-auto">
        <div className="lgpd-selo"><ShieldCheckIcon /><span>LGPD</span></div>
        <div className="lgpd-txt">
          <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">Segurança e LGPD</span>
          <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">Prospecção ativa, dentro da lei.</h2>
          <p className="text-muted-foreground">O Atlas trabalha só com dados públicos de empresas e segue a Lei Geral de Proteção de Dados.</p>
          <a href="https://atlas.escolhidospro.com.br/remover-contato" className="text-brand text-sm font-semibold">Solicitar remoção de contato como titular →</a>
        </div>
        <ul className="lgpd-itens">
          {ITENS.map(({ I, t, d }) => <li key={t}><span><I /></span><div><b>{t}</b><p>{d}</p></div></li>)}
        </ul>
      </div>
    </Section>
  );
}
