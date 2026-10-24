import "@/app/globals.css";

import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";

import { inter } from "@/lib/fonts";

import { siteConfig } from "../config/site";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f8" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

// Favicon e apple-touch-icon vêm de app/icon.png e app/apple-icon.png (logo do Atlas)
export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | O CRM preguiçoso que faz o trabalho do seu SDR`,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "prospecção",
    "lista de empresas",
    "qualificação de leads",
    "CRM",
    "número do decisor",
    "prospecção ativa",
    "SDR",
    "vendas B2B",
    "agente de IA para vendas",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
    >
      <body className={`${inter.variable} bg-background font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <a
            href="#conteudo"
            className="bg-background text-foreground sr-only z-[100] rounded-md px-4 py-2 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
          >
            Pular para o conteúdo
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
