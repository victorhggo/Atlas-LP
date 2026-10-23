export const siteConfig = {
  name: "Atlas",
  url: "https://atlas.escolhidospro.com.br",
  // TODO: trocar pelo link de cadastro quando estiver definido
  getStartedUrl: "#planos",
  loginUrl: "https://atlas.escolhidospro.com.br/entrar",
  ogImage: "/atlas/lista.png",
  description:
    "Gere listas de qualquer nicho, qualifique cada empresa com o número do decisor e ligue pela fila do dia com o CRM integrado. A prospecção inteira num lugar só.",
  links: {
    // TODO: trocar pelo WhatsApp de vendas
    sales: "#planos",
  },
};

export type SiteConfig = typeof siteConfig;
