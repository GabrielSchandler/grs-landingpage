import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { googleAdsConversionId } from "@/lib/google-ads";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Defina NEXT_PUBLIC_SITE_URL nas variáveis de ambiente (Vercel) com o domínio REAL desta landing.
// O fallback abaixo evita OG/canonical quebrados em build sem a env configurada.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.grssolucao.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Análise de Contratos Bancários e Revisão de Juros | GRS Soluções",
    template: "%s | GRS Soluções",
  },
  description:
    "Análise técnica e gratuita do seu contrato bancário: entenda juros, tarifas e condições do seu financiamento ou empréstimo. Fale com um especialista da GRS.",
  keywords: [
    "análise de contrato bancário",
    "revisão de juros",
    "juros abusivos",
    "financiamento de veículo",
    "crédito consignado",
    "revisão de contrato",
    "GRS Soluções",
  ],
  authors: [{ name: "GRS Soluções" }],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "GRS Soluções",
    title: "Análise de Contratos Bancários e Revisão de Juros | GRS Soluções",
    description:
      "Entenda cada cobrança do seu contrato bancário com uma análise técnica gratuita e em linguagem clara.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Análise de Contratos Bancários e Revisão de Juros | GRS Soluções",
    description:
      "Entenda cada cobrança do seu contrato bancário com uma análise técnica gratuita e em linguagem clara.",
  },
};

export const viewport: Viewport = {
  themeColor: "#C31230",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  const gtagId = ga4Id || googleAdsConversionId;

  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {gtmId && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
        )}
      </head>
      <body className="min-h-screen antialiased">
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        {/* GA4 / Google Ads global site tag. GTM can be used instead if preferred. */}
        {gtagId && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
            strategy="afterInteractive"
          />
        )}

        {gtagId && (
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${ga4Id ? `gtag('config', '${ga4Id}');` : ""}
              ${googleAdsConversionId ? `gtag('config', '${googleAdsConversionId}');` : ""}
            `}
          </Script>
        )}

        {/* Meta Pixel (Facebook) */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <Script id="fb-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        {/* Dados estruturados (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LegalService",
                  "@id": `${siteUrl}/#organization`,
                  name: "GRS Soluções",
                  description:
                    "Análise técnica de contratos bancários, revisão de juros abusivos, tarifas indevidas e negociação com instituições financeiras.",
                  url: siteUrl,
                  telephone: "+5511940394084",
                  email: "gerencia@grssolucao.com.br",
                  priceRange: "$$",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "R. Evangelina, 321 - Vila Carrão",
                    addressLocality: "São Paulo",
                    addressRegion: "SP",
                    postalCode: "03421-000",
                    addressCountry: "BR",
                  },
                  areaServed: { "@type": "Country", name: "Brasil" },
                  sameAs: [
                    "https://www.instagram.com/grssolucaoltda/",
                    "https://www.facebook.com/profile.php?id=61584917309422",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl,
                  name: "GRS Soluções",
                  inLanguage: "pt-BR",
                  publisher: { "@id": `${siteUrl}/#organization` },
                },
              ],
            }),
          }}
        />

        {children}
      </body>
    </html>
  );
}
