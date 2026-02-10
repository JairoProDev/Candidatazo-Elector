import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Candidatazo - Descubre tu candidato ideal | Elecciones Peru 2026",
    template: "%s | Candidatazo",
  },
  description:
    "Plataforma de informacion electoral. Descubre tu perfil politico, compara candidatos con IA y verifica datos en tiempo real. Elecciones Peru 2026.",
  keywords: [
    "elecciones peru 2026",
    "candidatos peru",
    "test politico",
    "fact checking",
    "verificador de datos",
    "DNA politico",
  ],
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: "Candidatazo",
    title: "Candidatazo - Tu guia electoral inteligente",
    description:
      "Descubre tu perfil politico, compara candidatos y verifica datos. Elecciones Peru 2026.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Candidatazo - Elecciones Peru 2026",
    description:
      "Descubre tu perfil politico con IA. Compara candidatos. Verifica datos.",
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
