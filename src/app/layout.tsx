import type { Metadata } from "next";
import Script from "next/script";
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
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;

  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Google Tag Manager (noscript) */}
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
      </head>
      <body className="min-h-screen antialiased">
        {/* Google Tag Manager (gtag.js) */}
        {gtmId && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtmId}`}
            strategy="afterInteractive"
          />
        )}

        {/* GA4 & GTM initialization script */}
        {(gtmId || ga4Id) && (
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${gtmId ? `gtag('config', '${gtmId}');` : ""}
              ${ga4Id ? `gtag('config', '${ga4Id}');` : ""}
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

        {children}
      </body>
    </html>
  );
}
