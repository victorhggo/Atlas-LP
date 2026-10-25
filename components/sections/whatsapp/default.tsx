"use client";

import { BotIcon, CalendarClockIcon, MessageCircleIcon, MicIcon, RouteIcon, TagIcon } from "lucide-react";

import { VideoSecao } from "../video-secao";

export default function WhatsApp() {
  return (
    <VideoSecao id="whatsapp" Icone={MessageCircleIcon} rotulo="WhatsApp integrado via API" video="whatsapp" caminho="atlas.escolhidospro.com.br/whatsapp" inverte
      titulo="Seu WhatsApp dentro do CRM, trabalhando sozinho."
      texto="Clique no ícone do WhatsApp no lead e a conversa abre aqui, com etapa do funil, etiquetas e histórico. Programe o follow-up e ele sai na hora marcada, mesmo com o Atlas fechado."
      itens={[
        { I: CalendarClockIcon, t: "Follow-up programado", d: "Mensagem ou áudio, em 1 hora, amanhã às 9h ou na data que você escolher." },
        { I: MicIcon, t: "Áudio, imagem e texto", d: "Grave o áudio uma vez e deixe ele sair sozinho no horário certo." },
        { I: RouteIcon, t: "Cadência no automático", d: "Coloque os leads numa cadência e as mensagens saem sozinhas, parando quando o lead responde." },
        { I: TagIcon, t: "Etiquetas e etapa do CRM", d: "Cada conversa mostra a etapa do lead e as etiquetas, sincronizadas com o quadro." },
        { I: BotIcon, t: "Resposta e autoatendimento", d: "Respostas rápidas e avisos de quem respondeu, para nenhum lead esfriar." },
      ]} />
  );
}
