import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Efeitos } from "@/components/Efeitos";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFlutuante } from "@/components/WhatsAppFlutuante";
import { JsonLd } from "@/components/ui";
import { site } from "@/content/site";
import { organizationJsonLd } from "@/lib/seo";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-sora", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nome} | Consignado e Crédito em Jaguaquara – BA`,
    template: `%s | ${site.nomeCurto} Soluções em Crédito`,
  },
  description: site.descricao,
  applicationName: site.nome,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    url: "/",
    title: site.nome,
    description: site.descricao,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#082343",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* marca que o JS está ativo antes da pintura, para as animações de entrada não piscarem */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#conteudo" className="sr-only z-[60] rounded-full bg-laranja px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <WhatsAppFlutuante />
        <Efeitos />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
