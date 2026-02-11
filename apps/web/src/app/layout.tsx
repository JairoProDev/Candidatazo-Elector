import type { Metadata } from "next";
// Force rebuild test 1
import { Header } from "@/components/layout/Header";

import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Candidatazo - Descubre tu candidato ideal | Elecciones Perú 2026",
    template: "%s | Candidatazo",
  },
  description:
    "Plataforma de información electoral. Descubre tu perfil político, compara candidatos con IA y verifica datos en tiempo real. Elecciones Perú 2026.",
  keywords: [
    "elecciones perú 2026",
    "candidatos perú",
    "test político",
    "fact checking",
    "verificador de datos",
    "ADN político",
  ],
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: "Candidatazo",
    title: "Candidatazo - Tu guía electoral inteligente",
    description:
      "Descubre tu perfil político, compara candidatos y verifica datos. Elecciones Perú 2026.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Candidatazo - Elecciones Perú 2026",
    description:
      "Descubre tu perfil político con IA. Compara candidatos. Verifica datos.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
