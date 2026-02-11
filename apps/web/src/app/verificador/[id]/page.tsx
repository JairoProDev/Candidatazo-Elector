import { notFound } from "next/navigation";
import Link from "next/link";
import { VERDICT_CONFIG } from "@candidatazo/types";
import type { VerdictType } from "@candidatazo/types";

// Same data as verificador page - in production this would come from API
const FACT_CHECKS: Record<string, {
  id: string;
  claim: string;
  context: string;
  source: string;
  verdict: VerdictType;
  explanation: string;
  candidateName: string;
  candidateSlug: string;
  candidateParty: string;
  confidence: number;
  sources: { title: string; url: string }[];
  publishedAt: string;
  upvotes: number;
  downvotes: number;
}> = {
  "fc-001": {
    id: "fc-001",
    claim: "El 70% de la economía peruana es informal",
    context: "Debate presidencial sobre economía y empleo. El candidato usó esta estadística para justificar su propuesta de formalización masiva.",
    source: "Debate TV - Canal N",
    verdict: "TRUE",
    explanation: "Según el INEI (Instituto Nacional de Estadística e Informática), el empleo informal en Perú alcanza el 72.7% de la fuerza laboral (2023). Esta cifra es una de las más altas de América Latina. La informalidad afecta tanto al sector urbano (65%) como rural (95%). Es un problema estructural que lleva décadas sin solución significativa.",
    candidateName: "Hernando de Soto",
    candidateSlug: "hernando-de-soto",
    candidateParty: "Avanza País",
    confidence: 0.95,
    sources: [
      { title: "INEI - Producción y Empleo Informal en el Perú 2023", url: "https://www.inei.gob.pe" },
      { title: "OIT - Economía Informal en América Latina", url: "https://www.ilo.org" },
      { title: "Banco Mundial - Perú Informal Economy Report", url: "https://www.worldbank.org" },
    ],
    publishedAt: "2026-01-15",
    upvotes: 342,
    downvotes: 12,
  },
  "fc-002": {
    id: "fc-002",
    claim: "Durante el gobierno de mi padre, la economía creció 7% anual",
    context: "Entrevista en RPP donde la candidata defendía el modelo económico de la Constitución de 1993.",
    source: "Entrevista RPP Noticias",
    verdict: "HALF_TRUE",
    explanation: "El crecimiento promedio durante el gobierno de Alberto Fujimori (1990-2000) fue de aproximadamente 4.5% anual. Si bien hubo años excepcionales como 1994 (12.8%) y 1997 (6.9%), también hubo años de recesión como 1990 (-5.1%) y 1998 (-0.7%). La cifra de 7% es una exageración del promedio real, aunque sí hubo un periodo de fuerte crecimiento entre 1993-1997.",
    candidateName: "Keiko Fujimori",
    candidateSlug: "keiko-fujimori",
    candidateParty: "Fuerza Popular",
    confidence: 0.92,
    sources: [
      { title: "BCRP - Series Históricas de PBI 1990-2000", url: "https://www.bcrp.gob.pe" },
      { title: "Banco Mundial - PIB Perú (datos históricos)", url: "https://data.worldbank.org" },
      { title: "FMI - World Economic Outlook Database", url: "https://www.imf.org" },
    ],
    publishedAt: "2026-01-20",
    upvotes: 567,
    downvotes: 89,
  },
  "fc-003": {
    id: "fc-003",
    claim: "El 1% más rico del Perú tiene tanto como el 90% más pobre",
    context: "Mitin en Cusco durante campaña sobre desigualdad y justicia social.",
    source: "Mitin político - Cusco",
    verdict: "MOSTLY_TRUE",
    explanation: "Según el informe de Oxfam 'Desigualdad en América Latina', el 1% más rico de Perú concentra aproximadamente el 30% de la riqueza nacional. El World Inequality Database muestra que el 10% más rico posee más del 60% de la riqueza. Si bien la comparación exacta con el 90% varía según metodología, la tendencia de extrema concentración de riqueza es real y documentada por múltiples fuentes internacionales.",
    candidateName: "Veronika Mendoza",
    candidateSlug: "veronika-mendoza",
    candidateParty: "Juntos por el Perú",
    confidence: 0.78,
    sources: [
      { title: "Oxfam - Desigualdad en América Latina 2024", url: "https://www.oxfam.org" },
      { title: "Credit Suisse - Global Wealth Report 2024", url: "https://www.credit-suisse.com" },
      { title: "World Inequality Database - Perú", url: "https://wid.world" },
    ],
    publishedAt: "2026-01-25",
    upvotes: 423,
    downvotes: 45,
  },
  "fc-004": {
    id: "fc-004",
    claim: "El 80% de la riqueza del Perú se va al extranjero",
    context: "Discurso nacionalista en plaza de armas sobre soberanía económica.",
    source: "Discurso público",
    verdict: "FALSE",
    explanation: "Las utilidades repatriadas por empresas extranjeras representan aproximadamente el 5-6% del PBI según datos del Banco Central de Reserva del Perú. La inversión extranjera directa (IED) genera empleo, tributos y transferencia tecnológica. La cifra del 80% no tiene sustento en ningún indicador económico oficial y exagera enormemente la fuga de capitales real.",
    candidateName: "Antauro Humala",
    candidateSlug: "antauro-humala",
    candidateParty: "Frente Patriótico",
    confidence: 0.97,
    sources: [
      { title: "BCRP - Balanza de Pagos 2023", url: "https://www.bcrp.gob.pe" },
      { title: "ProInversión - Reporte de IED en Perú", url: "https://www.proinversion.gob.pe" },
      { title: "UNCTAD - World Investment Report", url: "https://unctad.org" },
    ],
    publishedAt: "2026-02-01",
    upvotes: 789,
    downvotes: 156,
  },
  "fc-008": {
    id: "fc-008",
    claim: "La pobreza se redujo a 11% con el modelo económico de la Constitución del 93",
    context: "Debate sobre Constitución y modelo económico",
    source: "Debate TV",
    verdict: "MISLEADING",
    explanation: "La pobreza en Perú se redujo de 58% (2004) a 20.2% (2019), pero nunca llegó a 11%. Además, la reducción se debió a múltiples factores: boom de commodities, políticas sociales de gobiernos de diferente signo, crecimiento global favorable, y no exclusivamente al modelo constitucional. Post-pandemia la pobreza subió a 27.5% (2020) y se ha recuperado parcialmente.",
    candidateName: "Keiko Fujimori",
    candidateSlug: "keiko-fujimori",
    candidateParty: "Fuerza Popular",
    confidence: 0.88,
    sources: [
      { title: "INEI - Evolución de la Pobreza Monetaria 2004-2023", url: "https://www.inei.gob.pe" },
      { title: "Banco Mundial - Perú Overview", url: "https://www.worldbank.org" },
    ],
    publishedAt: "2026-02-08",
    upvotes: 445,
    downvotes: 98,
  },
};

interface FactCheckPageProps {
  params: Promise<{ id: string }>;
}

export default async function FactCheckDetailPage({ params }: FactCheckPageProps) {
  const { id } = await params;
  const factCheck = FACT_CHECKS[id];

  if (!factCheck) {
    notFound();
  }

  const verdictConfig = VERDICT_CONFIG[factCheck.verdict];
  const confidencePercent = Math.round(factCheck.confidence * 100);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link href="/verificador" className="text-sm text-gray-400 hover:text-gray-600 mb-4 inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Todas las verificaciones
          </Link>

          <div className="mt-4">
            {/* Verdict badge */}
            <span
              className="inline-flex items-center gap-2 text-lg font-bold px-5 py-2 rounded-full mb-6"
              style={{ backgroundColor: verdictConfig.bgColor, color: verdictConfig.color }}
            >
              {verdictConfig.label}
            </span>

            {/* Claim */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-snug mb-4">
              &ldquo;{factCheck.claim}&rdquo;
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <Link
                href={`/candidatos/${factCheck.candidateSlug}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-gray-500">
                    {factCheck.candidateName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </span>
                </div>
                {factCheck.candidateName} ({factCheck.candidateParty})
              </Link>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span>{factCheck.source}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span>{formatDate(factCheck.publishedAt)}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Context */}
            <div className="card">
              <h2 className="font-bold text-gray-800 mb-3">Contexto</h2>
              <p className="text-gray-600 leading-relaxed">{factCheck.context}</p>
            </div>

            {/* Explanation */}
            <div className="card">
              <h2 className="font-bold text-gray-800 mb-3">Análisis</h2>
              <p className="text-gray-600 leading-relaxed">{factCheck.explanation}</p>
            </div>

            {/* Sources */}
            <div className="card">
              <h2 className="font-bold text-gray-800 mb-4">Fuentes ({factCheck.sources.length})</h2>
              <div className="space-y-3">
                {factCheck.sources.map((source, i) => (
                  <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                    <div className="w-8 h-8 rounded bg-primary-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700 text-sm">{source.title}</p>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">{source.url}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community voting */}
            <div className="card">
              <h2 className="font-bold text-gray-800 mb-3">Opinión de la comunidad</h2>
              <p className="text-sm text-gray-500 mb-4">
                ¿Estás de acuerdo con este veredicto?
              </p>
              <div className="flex items-center gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-gray-200 hover:border-success hover:bg-green-50 transition-all text-gray-600 hover:text-success font-medium">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  De acuerdo ({factCheck.upvotes})
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-gray-200 hover:border-error hover:bg-red-50 transition-all text-gray-600 hover:text-error font-medium">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  En desacuerdo ({factCheck.downvotes})
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Confidence */}
            <div className="card text-center">
              <h3 className="font-bold text-gray-700 mb-3">Nivel de confianza</h3>
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg width={96} height={96} className="transform -rotate-90">
                  <circle cx={48} cy={48} r={40} fill="none" stroke="#e5e5e5" strokeWidth={6} />
                  <circle
                    cx={48}
                    cy={48}
                    r={40}
                    fill="none"
                    stroke={verdictConfig.color}
                    strokeWidth={6}
                    strokeLinecap="round"
                    strokeDasharray={251.3}
                    strokeDashoffset={251.3 - (factCheck.confidence) * 251.3}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-extrabold" style={{ color: verdictConfig.color }}>
                    {confidencePercent}%
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-400">
                Basado en la calidad y cantidad de fuentes disponibles
              </p>
            </div>

            {/* Candidate link */}
            <Link
              href={`/candidatos/${factCheck.candidateSlug}`}
              className="card block group hover:border-primary/30"
            >
              <h3 className="font-bold text-gray-700 mb-2">Sobre el candidato</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {factCheck.candidateName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-800 group-hover:text-primary transition-colors">
                    {factCheck.candidateName}
                  </p>
                  <p className="text-sm text-gray-500">{factCheck.candidateParty}</p>
                </div>
              </div>
            </Link>

            {/* Methodology */}
            <div className="card-flat text-sm">
              <h3 className="font-bold text-gray-700 mb-2">Metodología</h3>
              <p className="text-gray-500 leading-relaxed">
                Cada verificación compara la declaración con fuentes oficiales
                (INEI, BCRP, organismos internacionales). El nivel de confianza
                refleja la solidez de la evidencia disponible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
