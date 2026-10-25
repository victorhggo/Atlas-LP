"use client";

import { BarChart3Icon, HeadsetIcon, ListOrderedIcon, MessageSquareTextIcon, PhoneCallIcon, ShieldQuestionIcon } from "lucide-react";

import { VideoSecao } from "../video-secao";

export default function Ligar() {
  return (
    <VideoSecao id="ligar" Icone={PhoneCallIcon} rotulo="Tela Ligar · roteiro na tela" video="ligar" caminho="atlas.escolhidospro.com.br/hoje"
      titulo="Ligue sabendo exatamente o que dizer."
      texto="A fila do dia mostra quem ligar agora. Você clica, liga, e o roteiro aparece palavra por palavra, já com o nome do sócio, a empresa, a cidade e a dor do nicho."
      itens={[
        { I: ListOrderedIcon, t: "Fila do dia em ordem", d: "Atrasados, os de hoje, amanhã e os novos da lista, com a dor provável de cada lead." },
        { I: MessageSquareTextIcon, t: "Script de ponta a ponta", d: "Abertura, motivo, pacto, perguntas e pedido. 4 scripts prontos ou o seu." },
        { I: ShieldQuestionIcon, t: "Objeção com resposta", d: "“Manda por WhatsApp”, “Quanto custa?”, “Fala com a secretária”: resposta pronta em 1 clique." },
        { I: BarChart3Icon, t: "Resultado de cada script", d: "Veja qual roteiro gera mais conversa com o decisor e mais reunião." },
        { I: HeadsetIcon, t: "Ligue pelo computador", d: "Integra com a sua operadora ou VoIP, como a Matteline, sem sair da tela." },
      ]} />
  );
}
