import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GRS Soluções — Análise de Contratos Bancários",
    short_name: "GRS Soluções",
    description:
      "Análise técnica e gratuita de contratos bancários, juros abusivos e tarifas indevidas.",
    lang: "pt-BR",
    start_url: "/",
    display: "standalone",
    background_color: "#0E1116",
    theme_color: "#C31230",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
  };
}
