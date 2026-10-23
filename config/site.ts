export const siteConfig = {
  name: "Atlas",
  // Endereço público da LP (usado na imagem de compartilhamento do WhatsApp).
  // Padrão: Netlify. Para o domínio próprio: npm run build:dominio
  url: process.env.SITE_URL ?? "https://atlas-system.netlify.app",
  // TODO: trocar pelo link de cadastro quando estiver definido
  getStartedUrl: "#planos",
  loginUrl: "https://atlas.escolhidospro.com.br/entrar",
  ogImage: "/og.jpg",
  description:
    "Gere listas de qualquer nicho, qualifique cada empresa com o número do decisor e ligue pela fila do dia com o CRM integrado. A prospecção inteira num lugar só.",
  links: {
    // TODO: trocar pelo WhatsApp de vendas
    sales: "#planos",
  },
};

export type SiteConfig = typeof siteConfig;
