import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GRS Soluções | Análise de contratos bancários",
  description:
    "Análise técnica de contratos bancários para identificar possíveis juros abusivos, tarifas indevidas ou cobranças questionáveis.",
  openGraph: {
    title: "GRS Soluções | Análise de contratos bancários",
    description:
      "Entenda se seu financiamento pode estar custando mais do que deveria com uma análise técnica e responsável.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen antialiased">
        {/* Configure GTM, GA4 e Google Ads Conversion Tracking aqui com next/script quando os IDs estiverem definidos em variáveis de ambiente. */}
        {children}
      </body>
    </html>
  );
}
