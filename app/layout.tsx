import "@/app/globals.css";

import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";

import { inter } from "@/lib/fonts";

import { siteConfig } from "../config/site";

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

// Favicon e apple-touch-icon vêm de app/icon.png e app/apple-icon.png (logo do Atlas)
export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Da lista ao contrato, sem sair do Atlas`,
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
      className="dark"
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body className={`${inter.variable} bg-background font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
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
