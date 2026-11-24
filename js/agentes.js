// Atlas: janela de cada agente da seção #agentes. Conteúdo copiado de web/lib/agentes-def.ts (AGENTES e AGENTES_INFO).
const AG = {
 "lis": {
  "nome": "Lis",
  "papel": "Listas e qualificação",
  "frase": "Eu encontro quem vai comprar de você.",
  "comeca": "Quando você pede uma lista ou chega o dia da lista da semana.",
  "entrega": "Leads qualificados no CRM, com nota, decisor e contato.",
  "planos": "Business e Scale",
  "grupos": [
   {
    "titulo": "O que ela faz",
    "itens": [
     [
      "Lista sob encomenda",
      "Você pede em texto, como \"clínicas odontológicas em Campinas com mais de 2 funcionários\", e ela monta os filtros sozinha."
     ],
     [
      "Qualificação em lote",
      "Confere site, Google, Instagram, sócios e telefone de cada empresa e descarta o que não bate: empresa fechada, ramo errado, telefone de contador."
     ],
     [
      "Nota de encaixe de 0 a 100",
      "Compara cada empresa com o seu cliente ideal e mostra o motivo da nota."
     ],
     [
      "Decisor encontrado",
      "Sócio, LinkedIn e o melhor telefone ou WhatsApp de quem decide."
     ],
     [
      "Entrega no CRM",
      "Coloca os leads na etapa certa, com etiqueta de origem, e passa os melhores para o Zac."
     ],
     [
      "Lista recorrente",
      "\"Toda segunda, 50 empresas novas\", sem repetir quem já está na sua base."
     ],
     [
      "Parecidos com seus melhores clientes",
      "Você informa 5 clientes que já fecharam e ela encontra empresas semelhantes."
     ],
     [
      "Alerta de empresa nova",
      "Avisa quando abre uma empresa no seu nicho."
     ]
    ]
   }
  ]
 },
 "zac": {
  "nome": "Zac",
  "papel": "WhatsApp, atendimento e agenda",
  "frase": "Eu começo a conversa e coloco a reunião na sua agenda.",
  "comeca": "Quando a Lis entrega um lead novo no CRM.",
  "entrega": "A primeira mensagem de cada lead pronta para você enviar com um toque.",
  "planos": "Pro, Business e Scale",
  "grupos": [
   {
    "titulo": "O que ele faz",
    "itens": [
     [
      "Primeira mensagem personalizada",
      "Para cada lead, usando o que a Lis descobriu: ramo, Instagram, algo do site."
     ],
     [
      "Cadência multicanal",
      "WhatsApp, e-mail e LinkedIn, com intervalos e limite diário seguros contra banimento."
     ],
     [
      "Atende quem chega",
      "Respostas, formulário do site, leads da Meta e webhooks, a qualquer hora."
     ],
     [
      "Triagem",
      "Pergunta necessidade, prazo, quem decide e faixa de orçamento, e atualiza a nota do lead."
     ],
     [
      "Responde objeções",
      "\"Está caro\", \"me manda por e-mail\", \"já tenho fornecedor\", a partir da memória da sua empresa."
     ],
     [
      "Agenda a reunião",
      "Oferece horários livres, marca, confirma, lembra 24 h e 1 h antes e remarca se o lead faltar."
     ],
     [
      "Passa para você",
      "Lead quente chega com um resumo de 3 linhas e o próximo passo sugerido."
     ],
     [
      "Briefing da reunião",
      "Antes de cada reunião: quem é a empresa, o que o lead falou e o que oferecer."
     ],
     [
      "Coach de vendas",
      "Lê as conversas do vendedor, mostra onde o lead esfriou e sugere a resposta melhor."
     ]
    ]
   }
  ]
 },
 "gab": {
  "nome": "Gab",
  "papel": "Instagram",
  "frase": "Eu transformo seguidores em clientes.",
  "comeca": "Quando chega mensagem direta ou comentário.",
  "entrega": "Leads do Instagram no CRM e conteúdo pronto para postar.",
  "planos": null,
  "grupos": [
   {
    "titulo": "Vendas pelo Instagram",
    "itens": [
     [
      "Directs e comentários",
      "Responde a qualquer hora, qualifica e manda o lead para o CRM. Quem pede reunião segue para o Zac."
     ],
     [
      "Resposta por palavra",
      "Quem comenta \"eu quero\" no post recebe a oferta por mensagem direta."
     ],
     [
      "Prospecção no Instagram",
      "Encontra perfis do seu nicho, interage e faz a primeira abordagem com ritmo seguro."
     ],
     [
      "Alerta de engajamento",
      "Avisa quando um lead do funil curte ou comenta, para o Polo puxar a conversa."
     ]
    ]
   },
   {
    "titulo": "Conteúdo",
    "itens": [
     [
      "Calendário de posts",
      "Ideias e legendas a partir do seu nicho e da memória da empresa."
     ],
     [
      "Roteiros de Reels e stories",
      "Prontos para você gravar."
     ],
     [
      "Prova social",
      "Transforma depoimentos e avaliações da Indy em posts."
     ],
     [
      "Relatório",
      "Quantos leads e vendas vieram do Instagram no mês."
     ]
    ]
   }
  ]
 },
 "polo": {
  "nome": "Polo",
  "papel": "Follow-up, reativação e proposta",
  "frase": "Ninguém some. Nem de ontem, nem de seis meses atrás.",
  "comeca": "Quando um lead fica parado 14 dias ou mais.",
  "entrega": "A mensagem de retomada de cada lead parado, pronta para você enviar.",
  "planos": "Business e Scale",
  "grupos": [
   {
    "titulo": "Follow-up",
    "itens": [
     [
      "Vigia o funil",
      "Encontra toda negociação sem resposta há X dias, com prazo próprio para cada etapa."
     ],
     [
      "Follow-up com contexto",
      "Retoma o assunto da última conversa, nunca um \"e aí, conseguiu ver?\". Alterna texto, áudio e conteúdo útil."
     ],
     [
      "Para sozinho",
      "Quando a pessoa responde, devolve a conversa ao Zac ou a você."
     ],
     [
      "Pós-reunião",
      "No mesmo dia, envia o resumo e o próximo passo combinado."
     ],
     [
      "Proposta",
      "Monta a proposta com os dados do lead e da oferta e envia por link."
     ],
     [
      "Aviso de proposta aberta",
      "Quando o lead abre e não responde, manda a mensagem certa na hora."
     ]
    ]
   },
   {
    "titulo": "Reativação da base",
    "itens": [
     [
      "Raio-X da base",
      "Leads parados há 30, 60 e 90 dias, negócios perdidos por motivo e contatos nunca trabalhados."
     ],
     [
      "Campanha com motivo",
      "Uma razão nova para voltar a falar com cada grupo: novidade, condição especial, conteúdo."
     ],
     [
      "Volta ao motivo da perda",
      "\"Na época estava caro; agora temos um plano menor.\""
     ],
     [
      "Envio em ondas pequenas",
      "Para proteger o seu número e medir o que funciona."
     ],
     [
      "Placar da reativação",
      "\"R$ X voltaram da base parada este mês.\""
     ]
    ]
   }
  ]
 },
 "indy": {
  "nome": "Indy",
  "papel": "Pós-venda e indicações",
  "frase": "Eu transformo seus clientes em vendedores da sua empresa.",
  "comeca": "Quando uma venda é marcada como ganha.",
  "entrega": "Indicações novas, avaliações, depoimentos e renovações.",
  "planos": "Scale",
  "grupos": [
   {
    "titulo": "O que ela faz",
    "itens": [
     [
      "Boas-vindas",
      "Assim que a venda é marcada como ganha, com os próximos passos."
     ],
     [
      "Pesquisa de satisfação",
      "De 7 a 15 dias depois: de 0 a 10, o quanto indicaria a sua empresa."
     ],
     [
      "Separa as respostas",
      "Fãs recebem pedido de avaliação e indicação; neutros, a pergunta \"o que faltou?\"; insatisfeitos geram aviso a você na hora."
     ],
     [
      "Pede indicação na hora certa",
      "O indicado entra no CRM com a etiqueta de quem indicou, e o Zac faz o contato."
     ],
     [
      "Programa de indicação",
      "Link próprio por cliente, recompensa e placar de quem mais indica."
     ],
     [
      "Avaliações e depoimentos",
      "Avaliações no Google e depoimentos com foto para o site e o Instagram."
     ],
     [
      "Renovação e mais vendas",
      "Avisa antes de vencer e oferece o próximo produto."
     ],
     [
      "Datas que aproximam",
      "Aniversário do cliente e um ano de parceria."
     ]
    ]
   }
  ]
 },
 "orbit": {
  "nome": "Orbit",
  "papel": "Chefe do time",
  "frase": "Eu coordeno o time e te digo o que importa hoje.",
  "comeca": "Está sempre ligado.",
  "entrega": "Visão do dia, CRM organizado e o time coordenado.",
  "planos": "Pro, Business e Scale",
  "grupos": [
   {
    "titulo": "O que ele faz",
    "itens": [
     [
      "Painel \"Meu time\"",
      "O que cada agente está fazendo agora, a fila de aprovações e os créditos usados."
     ],
     [
      "Bom dia do Orbit",
      "Às 8 h, no WhatsApp: reuniões, leads quentes e aprovações pendentes do dia."
     ],
     [
      "Relatório semanal",
      "Funil, metas, resultado de cada agente e o principal gargalo, com sugestão de ajuste."
     ],
     [
      "Distribui o trabalho",
      "Decide qual agente cuida de cada lead e evita que dois falem com a mesma pessoa."
     ],
     [
      "CRM limpo",
      "Tira duplicados, corrige etapa e nicho errados e completa dados faltando."
     ],
     [
      "Comando por conversa",
      "Você fala com ele por texto, voz ou print: \"pede pra Lis 30 restaurantes em BH\"."
     ],
     [
      "Alertas",
      "Número de WhatsApp em risco, créditos acabando, lead quente parado há horas."
     ]
    ]
   }
  ]
 }
};

const dlg = document.getElementById("ag-dialogo");
if (dlg && typeof dlg.showModal === "function") {
  const $ = (s) => dlg.querySelector(s);
  const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
  let origem = null;

  const preencher = (id) => {
    const a = AG[id];
    $(".ag-d-img").src = `img/agentes/${id}.webp`;
    $(".ag-d-nome").textContent = a.nome;
    $(".ag-d-papel").textContent = a.papel;
    $(".ag-d-frase").textContent = a.frase;
    $(".ag-d-comeca").textContent = a.comeca;
    $(".ag-d-entrega").textContent = a.entrega;
    const grupos = $(".ag-d-grupos");
    grupos.replaceChildren();
    a.grupos.forEach((g) => {
      grupos.append(el("h4", null, g.titulo));
      const ul = el("ul");
      g.itens.forEach(([t, d]) => {
        const li = el("li");
        li.innerHTML = '<svg class="ico" aria-hidden="true"><use href="img/icones.svg#i-check"/></svg>';
        const p = el("span");
        p.append(el("b", null, t + ". "), document.createTextNode(d));
        li.append(p);
        ul.append(li);
      });
      grupos.append(ul);
    });
    const plano = $(".ag-d-plano");
    plano.replaceChildren();
    if (a.planos) plano.append("Incluído nos planos ", el("b", null, a.planos), ".");
    else plano.append(el("b", null, "Em breve. "), "Chega junto com a integração do Instagram.");
  };

  document.querySelectorAll("[data-agente]").forEach((b) => b.addEventListener("click", () => {
    origem = b;
    preencher(b.dataset.agente);
    dlg.showModal();
    dlg.scrollTop = 0;
    $("[data-ag-fechar]").focus();
  }));
  dlg.addEventListener("close", () => { if (origem && document.contains(origem)) origem.focus({ preventScroll: true }); origem = null; });
  $("[data-ag-fechar]").addEventListener("click", () => dlg.close());
  // clique no fundo (fora da caixa) fecha
  dlg.addEventListener("click", (e) => {
    if (e.target !== dlg) return;
    const r = dlg.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dlg.close();
  });
  $("[data-ag-planos]").addEventListener("click", (e) => {
    e.preventDefault();
    origem = null;
    dlg.close();
    const alvo = document.getElementById("planos");
    alvo.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    history.replaceState(null, "", "#planos");
  });
}
