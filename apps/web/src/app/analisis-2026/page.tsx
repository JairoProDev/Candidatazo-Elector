import type { Metadata } from "next";
import Analisis2026Client from "./Analisis2026Client";
import { RAW_CONTENT_ANALISIS_2026 } from "@/content/analisis-2026/raw11_more_info";
import { parseAnalisis2026 } from "@/lib/analisis-2026/parseDoc";

export const metadata: Metadata = {
  title: "Análisis 2026 | Candidatazo",
  description:
    "Guía estratégica sobre las Elecciones Generales de Perú 2026: seguridad, economía, minería, verificador y más.",
  openGraph: {
    title: "Análisis 2026 | Candidatazo",
    description:
      "Una guía estratégica para entender el panorama electoral (bicameralidad, ejes programáticos y verificación de datos).",
    type: "website",
  },
  alternates: {
    canonical: "/analisis-2026",
  },
  twitter: {
    card: "summary_large_image",
    title: "Análisis 2026 | Candidatazo",
    description:
      "Seguridad, economía, minería, bicameralidad y verificación: encuentra el hilo para decidir con datos.",
  },
};

export default function Analisis2026Page() {
  const sections = parseAnalisis2026(RAW_CONTENT_ANALISIS_2026);
  return <Analisis2026Client sections={sections} />;
}

