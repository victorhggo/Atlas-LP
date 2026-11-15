# Clipes r2 do Atlas para o site (2026-11-15)

Gravados no Atlas de produção (www.atlaslike.com) com a conta demo@atlaslike.com, no tema vidro claro.
O navegador era um Chromium invisível aberto só para isso. Nenhuma porta CDP foi usada (nem a 9333 nem a 9334).

Câmera rápida estilo Screen Studio:
- entra a 1,9-2,35x (o máximo permitido é 2,6x) em cerca de 0,3 s, com mola dura e sem passar do ponto;
- segura no alvo, depois sai em cerca de 0,3 s;
- fora das ações fica parada na tela inteira, sem deriva;
- ações a menos de 0,45 s uma da outra viram uma ponte: a câmera fica perto e acompanha o cursor.

Formato de saída:
- 60 qps;
- nenhum trecho foi acelerado;
- os tempos de carregamento entre telas viraram corte seco (o tempo de espera não entra no vídeo).

## Arquivos

Cada área tem quatro arquivos:
- `<área>.webm`: VP9, 1280x800;
- `<área>.mp4`: H.264 com faststart, 1280x800;
- `<área>-720.mp4`: 1152x720;
- `<área>.webp`: capa.

Nenhum arquivo tem áudio. Todos estão dentro dos limites: 1,5 MB a cada 10 s em 1280, 1,1 MB a cada 10 s em 720 e capa até 40 KB.

| Clipe | Duração | WebM | MP4 | MP4 720 | Capa | Captura da página (qps nas partes com movimento) |
|---|---|---|---|---|---|---|
| prospectar | 13,8 s | 1713 KB | 1773 KB | 1297 KB | 37 KB | ~47 |
| crm | 13,5 s | 1852 KB | 1618 KB | 1252 KB | 38 KB | ~58 |
| inbox | 11,2 s | 1555 KB | 1610 KB | 1034 KB | 34 KB | ~65 |
| orbit | 13,3 s | 650 KB | 1134 KB | 828 KB | 13 KB | ~38 |
| flow | 13,9 s | 1689 KB | 1918 KB | 1413 KB | 36 KB | ~39 |
| cadencias | 13,9 s | 1670 KB | 1765 KB | 1314 KB | 35 KB | ~52 |
| ligar | 12,0 s | 1573 KB | 1650 KB | 1058 KB | 35 KB | ~53 |
| dashboard | 10,4 s | 1210 KB | 1241 KB | 927 KB | 35 KB | ~47 |
| tour | 37,1 s | 4392 KB | 5060 KB | 3776 KB | 17 KB | ~42 |

Os arquivos de saída estão todos a 60 qps; a câmera e o cursor são desenhados quadro a quadro em 60 qps.

A coluna de captura mede só a página. Quando a página fica parada, o último quadro se repete. Nenhum trecho ficou com 5 a 10 qps.

## O que cada clipe mostra

1. **prospectar**:
   - card "Minhas listas" e abertura da lista Odontologia · São Paulo;
   - filtro "Com sócio";
   - zoom na linha da 1ª empresa (situação, decisor, contato);
   - abertura da ficha da Odonto Vila Rica, com zoom em "Sócios e decisores" (Decisor) e em "Ligue primeiro" (celular do decisor).
2. **crm**:
   - funil por nicho ("Prospecção ativa");
   - zoom em dois cartões de lead;
   - abertura da ficha lateral do lead, com zoom em "Registro rápido" e nas abas;
   - fechamento com Esc.
3. **inbox**:
   - busca "Helena" digitada na caixa de conversas do WhatsApp;
   - abertura da conversa;
   - zoom nas mensagens e no botão "Criar lead".
4. **orbit**:
   - a esfera real do /atlas com os leads em órbita;
   - os atalhos ("52 retornos atrasados", "8 propostas paradas");
   - o pedido "Quais leads eu devo ligar hoje?" digitado na barra, sem enviar.
5. **flow**:
   - os cards Agentes de IA (conversa de exemplo) e Bots;
   - abertura de Bots e do bot "Prospecção · Odontologia SP";
   - zoom nos blocos Gatilho e Enviar texto.
6. **cadencias**:
   - aba Cadências e abertura da Prospecção 3.0 (25 toques);
   - "Mariana" digitado em "Ver com o nome do lead": o roteiro da ligação fica personalizado;
   - rolagem pelos toques.
7. **ligar**:
   - cards do dia ("Atrasados");
   - zoom na "Dor provável" e na anotação do 1º lead da fila;
   - abertura dos Scripts de ligação, com zoom no Script A.
8. **dashboard**:
   - Receita;
   - dica do gráfico "Leads e vendas por dia";
   - leitura "Gargalo em Proposta enviada";
   - aba Tráfego pago, com zoom no ROAS.
9. **tour**: Orbit, Prospectar (leads qualificados e lista), CRM (cartão e ficha lateral), Inbox (WhatsApp, conversa com a Helena), Flow e Dashboard, nessa ordem, pelo menu.

## Segurança (banco de produção)

Todas as interações foram só de leitura: navegar, passar o mouse, abrir painéis, digitar em caixas de busca e rolar.

A gravação tinha uma guarda (`estudio/guarda.mjs`) que respondia localmente a qualquer POST, PUT, PATCH ou DELETE para o Atlas ou para o Supabase. O login era a única exceção. A única escrita barrada em todas as gravações foi `POST /api/presenca`, o sinal de "online" da sessão. Ela foi respondida localmente e não chegou ao servidor.

O WhatsApp é fictício e servido só na aba de gravação (`preparo.mjs`). Nada foi enviado.

### Tomadas mudadas ou cortadas
- **CRM**: o arrasto de cartão entre colunas foi tirado, porque mudaria a etapa do lead no banco. No lugar entrou a abertura da ficha do lead.
- **Orbit**: a pergunta é digitada e não é enviada. Enviar criaria uma conversa e gastaria a cota de IA, então o clipe não mostra resposta da IA.
- **Inbox**: só WhatsApp. As conversas do Instagram não foram abertas, porque abrir uma conversa pode marcar a mensagem como lida.
- **Prospectar**: só a lista já qualificada e a ficha. Nenhuma busca nova nem qualificação, para não gastar crédito.
- **Dicas e avisos**: o balão "Diga para mim" (dica do Orbit flutuante) foi escondido por CSS só na aba de gravação. Cookies, tour, recepção e dicas foram dispensados pelo localStorage, como antes.

## Pontos de atenção
- **Captura entre 38 e 42 qps em orbit, flow e tour.** A página animada (a esfera e a transição dos cards) foi capturada a cerca de 38-42 qps, então a animação da própria página roda nesse ritmo. A câmera e o cursor ficam em 60 qps lisos.
- **Dados vazios ou não conectados na conta demo**, que aparecem como estão:
  - no Flow: "Nenhum agente ainda" e contadores 0/0/0;
  - no editor do bot: o aviso "Os blocos agora se ligam pela lateral";
  - no Tráfego pago: Meta e Google com o botão "Conectar";
  - no Ligar: um aviso vermelho "CRM 52 retornos atrasados".
- **Loop**: os 0,4 s finais de cada clipe fundem no primeiro quadro, para o loop não ter corte. No dashboard e no tour essa fusão é entre telas diferentes.
- **Tour**: precisou de CRF mais alto (WebM 50, MP4 31, 720p 32) para caber em 1,5 MB a cada 10 s. Os clipes de área usam CRF 37-46 (VP9) e 26-30 (H.264).

## Como refazer
Ferramentas na pasta `C:\Users\VK\Desktop\LP Atlaslike`, com commits locais d6673b1, 552a5b1 e c91bdb3, sem push:
1. `node estudio/gravar-site-r2.mjs [nome...]` grava e gera o mestre 60 qps em `estudio/bruto/r2-mestre`;
2. `python estudio/exportar-r2.py "C:/Users/VK/Desktop/Site Atlas/video/r2" [nome...]` gera os quatro arquivos de cada clipe.
