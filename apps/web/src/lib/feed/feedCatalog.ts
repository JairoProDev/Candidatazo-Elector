import type { FeedCardModel, FeedCardType, FeedPreviewKey } from "./feedTypes";

export type FeedCardTemplate = Omit<
  FeedCardModel,
  "id" | "rankingReason" | "score" | "variant"
>;

const tpl = (t: FeedCardType): FeedCardTemplate => {
  switch (t) {
    case "match":
      return {
        type: "match",
        title: "Mi Match (calibra tu criterio)",
        benefit: "Ajusta tus prioridades y mira qué candidato “favorece” tu modelo.",
        proof: "Demo educativa basada en datos y heurística (no es pronóstico oficial).",
        cta: { label: "Abrir Mi Match", href: "/quiz" },
        preview: { key: "LandingPriorityGame", props: {} },
      };
    case "cedula":
      return {
        type: "cedula",
        title: "Practica tu voto (evita nulo)",
        benefit: "Entiende la regla clave en segundos y detecta alertas instantáneas.",
        proof: "Experiencia de simulación con validaciones por diseño.",
        cta: { label: "Simular cédula", href: "/cedula" },
        preview: { key: "CedulaPreviewMini", props: {} },
      };
    case "comparador":
      return {
        type: "comparador",
        title: "Comparador (elige con dimensiones)",
        benefit: "Compara perfiles lado a lado y decide con claridad, no con ruido.",
        proof: "Vista comparativa por dimensiones que ves y auditas.",
        cta: { label: "Abrir comparador", href: "/comparador" },
        preview: { key: "ComparadorPreviewMini", props: {} },
      };
    case "verificador":
      return {
        type: "verificador",
        title: "Verificador (evidencia sobre frases)",
        benefit: "Chequea afirmaciones con explicación y fuentes para auditar.",
        proof: "Incluye toggle de fuentes en el demo.",
        cta: { label: "Abrir verificador", href: "/verificador" },
        preview: { key: "VerificadorPreviewMini", props: {} },
      };
    case "planes":
      return {
        type: "planes",
        title: "Planes de gobierno (sin perderte)",
        benefit: "Filtra por temas y mira prioridades antes de abrir PDFs completos.",
        proof: "Vista ligera con detalle y CTA a /planes.",
        cta: { label: "Revisar planes", href: "/planes" },
        preview: { key: "PlanesPreviewMini", props: {} },
      };
    case "encuestas":
      return {
        type: "encuestas",
        title: "Encuestas en vivo (tendencias)",
        benefit: "Lee movimiento, momentum y señales de segunda vuelta.",
        proof: "Snapshot con metodología visible y actualización (Marzo 2026).",
        cta: { label: "Ver dashboard", href: "/encuestas" },
        preview: { key: "EncuestasPreviewMini", props: {} },
      };
    case "desafio":
      return {
        type: "desafio",
        title: "Desafío diario (aprende rápido)",
        benefit: "Micro-quiz con XP y rachas para mantenerte afilado.",
        proof: "Gamificación integrada, con feedback inmediato.",
        cta: { label: "Jugar desafío", href: "/desafio" },
        preview: { key: "DesafioPreviewMini", props: {} },
      };
    case "academia":
      return {
        type: "academia",
        title: "Academia Cívica (aprende jugando)",
        benefit: "Rutas de aprendizaje y tags para empezar con intención.",
        proof: "Preview con ruta rápida y CTA a cursos.",
        cta: { label: "Ir a Academia", href: "/academia" },
        preview: { key: "AcademiaPreviewMini", props: {} },
      };
    case "radar":
      return {
        type: "radar",
        title: "Radar Tech (viabilidad y ejecución)",
        benefit: "Cruza agenda digital, ejecución y oportunidad por perfil.",
        proof: "Panel que traduce señales en decisiones.",
        cta: { label: "Abrir radar", href: "/radar-oportunidad" },
        preview: { key: "DigitalOpportunityRadar", props: {} },
      };
    case "watchlist":
      return {
        type: "watchlist",
        title: "Watchlist (monitorea señales)",
        benefit: "Guarda candidatos y detecta cambios relevantes con snapshot local.",
        proof: "Persistencia local en tu navegador.",
        cta: { label: "Abrir watchlist", href: "/watchlist" },
        preview: { key: "WatchlistPanel", props: {} },
      };
    case "segunda-vuelta":
      return {
        type: "segunda-vuelta",
        title: "Segunda vuelta (escenarios)",
        benefit: "Simula balotaje y entiende quién tiene más probabilidad de ganar.",
        proof: "Modelo heurístico con explicación por componentes.",
        cta: { label: "Simular balotaje", href: "/segunda-vuelta" },
        preview: { key: "SecondRoundSimulatorPanel", props: {} },
      };
    case "comparador-estrategico":
      return {
        type: "comparador-estrategico",
        title: "Comparador Estratégico (pesos)",
        benefit: "Asigna pesos a tu narrativa y descubre quién encaja con tu estrategia.",
        proof: "Recalcula rankings con tus prioridades.",
        cta: { label: "Calibrar estrategia", href: "/comparador-estrategico" },
        preview: { key: "StrategicComparatorPanel", props: {} },
      };
    case "analisis-2026":
      return {
        type: "analisis-2026",
        title: "Análisis 2026 (contexto)",
        benefit: "Tablero con guía estratégica para reducir incertidumbre.",
        proof: "Secciones con navegación y resume de señales.",
        cta: { label: "Abrir análisis", href: "/analisis-2026" },
        preview: { key: "AnalisisPreviewMini", props: {} },
      };
    default: {
      const _exhaustive: never = t;
      throw new Error(`Unsupported feed card template type: ${String(_exhaustive)}`);
    }
  }
};

export const FEED_CARD_TYPES: FeedCardType[] = [
  "match",
  "cedula",
  "comparador",
  "verificador",
  "planes",
  "encuestas",
  "desafio",
  "academia",
  "radar",
  "watchlist",
  "segunda-vuelta",
  "comparador-estrategico",
  "analisis-2026",
];

export const FEED_CARD_CATALOG: Record<FeedCardType, FeedCardTemplate> = Object.fromEntries(
  FEED_CARD_TYPES.map((t) => [t, tpl(t)]),
) as Record<FeedCardType, FeedCardTemplate>;

