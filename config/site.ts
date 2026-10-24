export const siteConfig = {
  name: "Atlas",
  // Endereço público da LP (usado na imagem de compartilhamento do WhatsApp).
  // Padrão: Netlify. Para o domínio próprio: npm run build:dominio
  url: process.env.SITE_URL ?? "https://atlas-system.netlify.app",
  getStartedUrl: "https://atlas.escolhidospro.com.br/criar-conta",
  loginUrl: "https://atlas.escolhidospro.com.br/entrar",
  ogImage: "/og.jpg",
  description:
    "O CRM preguiçoso que faz o trabalho do seu SDR: monta a lista, acha o decisor, confere cada dado, te diz o que falar e avisa quem está pronto para comprar. Você só liga.",
  links: {
    sales: "https://wa.me/5515996979750",
    demo: "https://wa.me/5515996979750",
    // ID do vídeo de demonstração no YouTube (ex.: "dQw4w9WgXcQ").
    // Suporta ID direto ou exibição de player embed/modal
    demoVideo: "", // vazio até existir o vídeo real do Atlas (o botão do tour some sozinho)
    matte: "https://www.matteline.com.br/",
    whatsappCommunity: "https://wa.me/5515996979750?text=Quero%20entrar%20no%20grupo%20do%20Suporte%20Atlas",
  },
};

export type SiteConfig = typeof siteConfig;
