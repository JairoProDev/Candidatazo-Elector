import Link from "next/link";
import { VERDICT_CONFIG } from "@candidatazo/types";
import type { VerdictType } from "@candidatazo/types";

// Hardcoded fact-checks for offline-first reliability
const FACT_CHECKS: {
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
  featured: boolean;
}[] = [
  {
    id: "fc-001",
    claim: "El 70% de la economia peruana es informal",
    context: "Debate presidencial sobre economia y empleo",
    source: "Debate TV",
    verdict: "TRUE",
    explanation: "Segun el INEI (Instituto Nacional de Estadistica e Informatica), el empleo informal en Peru alcanza el 72.7% de la fuerza laboral (2023). Esta cifra es una de las mas altas de America Latina y se ha mantenido relativamente estable en los ultimos años.",
    candidateName: "Hernando de Soto",
    candidateSlug: "hernando-de-soto",
    candidateParty: "Avanza Pais",
    confidence: 0.95,
    sources: [
      { title: "INEI - Produccion y Empleo Informal en el Peru 2023", url: "https://www.inei.gob.pe" },
      { title: "OIT - Economia Informal en America Latina", url: "https://www.ilo.org" },
    ],
    publishedAt: "2026-01-15",
    upvotes: 342,
    downvotes: 12,
    featured: true,
  },
  {
    id: "fc-002",
    claim: "Durante el gobierno de mi padre, la economia crecio 7% anual",
    context: "Entrevista en RPP sobre modelo economico",
    source: "Entrevista RPP",
    verdict: "HALF_TRUE",
    explanation: "El crecimiento promedio durante el gobierno de Alberto Fujimori (1990-2000) fue de aproximadamente 4.5% anual. Si bien hubo años excepcionales como 1994 (12.8%) y 1997 (6.9%), tambien hubo años de recesion como 1990 (-5.1%) y 1998 (-0.7%). La cifra de 7% es una exageracion del promedio real.",
    candidateName: "Keiko Fujimori",
    candidateSlug: "keiko-fujimori",
    candidateParty: "Fuerza Popular",
    confidence: 0.92,
    sources: [
      { title: "BCRP - Series Historicas de PBI", url: "https://www.bcrp.gob.pe" },
      { title: "Banco Mundial - Datos de Peru", url: "https://data.worldbank.org" },
    ],
    publishedAt: "2026-01-20",
    upvotes: 567,
    downvotes: 89,
    featured: true,
  },
  {
    id: "fc-003",
    claim: "El 1% mas rico del Peru tiene tanto como el 90% mas pobre",
    context: "Mitin en Cusco sobre desigualdad",
    source: "Mitin politico",
    verdict: "MOSTLY_TRUE",
    explanation: "Segun el informe de Oxfam 'Desigualdad en America Latina', el 1% mas rico de Peru concentra aproximadamente el 30% de la riqueza nacional. Si bien la comparacion exacta con el 90% varia segun metodologia (Credit Suisse estima diferente), la tendencia de extrema concentracion es real y documentada.",
    candidateName: "Veronika Mendoza",
    candidateSlug: "veronika-mendoza",
    candidateParty: "Juntos por el Peru",
    confidence: 0.78,
    sources: [
      { title: "Oxfam - Desigualdad en America Latina 2024", url: "https://www.oxfam.org" },
      { title: "Credit Suisse - Global Wealth Report", url: "https://www.credit-suisse.com" },
    ],
    publishedAt: "2026-01-25",
    upvotes: 423,
    downvotes: 45,
    featured: true,
  },
  {
    id: "fc-004",
    claim: "El 80% de la riqueza del Peru se va al extranjero",
    context: "Discurso en plaza de armas",
    source: "Discurso publico",
    verdict: "FALSE",
    explanation: "Las utilidades repatriadas por empresas extranjeras representan aproximadamente el 5-6% del PBI segun datos del BCRP. La inversion extranjera directa genera empleo y tributos en el pais. La cifra del 80% no tiene sustento en ningun indicador economico oficial.",
    candidateName: "Antauro Humala",
    candidateSlug: "antauro-humala",
    candidateParty: "Frente Patriotico",
    confidence: 0.97,
    sources: [
      { title: "BCRP - Balanza de Pagos", url: "https://www.bcrp.gob.pe" },
      { title: "ProInversion - Reporte de IED", url: "https://www.proinversion.gob.pe" },
    ],
    publishedAt: "2026-02-01",
    upvotes: 789,
    downvotes: 156,
    featured: true,
  },
  {
    id: "fc-005",
    claim: "Como alcalde reduje el crimen en La Victoria en un 40%",
    context: "Debate sobre seguridad ciudadana",
    source: "Debate TV",
    verdict: "HALF_TRUE",
    explanation: "Durante la gestion de Forsyth como alcalde de La Victoria (2019-2022), hubo mejoras visibles en orden publico y limpieza del distrito. Sin embargo, las estadisticas oficiales de la PNP muestran una reduccion del crimen menor al 40% declarado, y algunos indicadores como robos se mantuvieron o aumentaron.",
    candidateName: "George Forsyth",
    candidateSlug: "george-forsyth",
    candidateParty: "Somos Peru",
    confidence: 0.72,
    sources: [
      { title: "PNP - Estadisticas de Criminalidad por Distrito", url: "https://www.policia.gob.pe" },
      { title: "INEI - Encuesta de Seguridad Ciudadana", url: "https://www.inei.gob.pe" },
    ],
    publishedAt: "2026-02-03",
    upvotes: 234,
    downvotes: 67,
    featured: false,
  },
  {
    id: "fc-006",
    claim: "Las mineras pagan menos impuestos que en Chile y Bolivia",
    context: "Entrevista sobre politica tributaria",
    source: "Entrevista",
    verdict: "HALF_TRUE",
    explanation: "La carga tributaria efectiva sobre la mineria en Peru es comparable a la de Chile pero significativamente menor que en Bolivia. Peru cobra impuesto a la renta (29.5%), regalias (1-12%) y impuesto especial a la mineria. Chile tiene un royalty minero reciente que elevo su carga. Bolivia tiene un regimen estatal mas pesado.",
    candidateName: "Veronika Mendoza",
    candidateSlug: "veronika-mendoza",
    candidateParty: "Juntos por el Peru",
    confidence: 0.68,
    sources: [
      { title: "SUNAT - Recaudacion Tributaria Minera", url: "https://www.sunat.gob.pe" },
      { title: "CEPAL - Tributacion Minera en America Latina", url: "https://www.cepal.org" },
    ],
    publishedAt: "2026-02-05",
    upvotes: 156,
    downvotes: 34,
    featured: false,
  },
  {
    id: "fc-007",
    claim: "La UCV es la universidad con mas alumnos del Peru",
    context: "Discurso sobre educacion",
    source: "Mitin",
    verdict: "TRUE",
    explanation: "La Universidad Cesar Vallejo, fundada por Cesar Acuña, tiene mas de 100,000 alumnos matriculados, siendo efectivamente una de las universidades mas grandes del Peru y de America Latina por numero de estudiantes.",
    candidateName: "Cesar Acuña",
    candidateSlug: "cesar-acuna",
    candidateParty: "Alianza para el Progreso",
    confidence: 0.90,
    sources: [
      { title: "SUNEDU - Estadisticas Universitarias", url: "https://www.sunedu.gob.pe" },
    ],
    publishedAt: "2026-02-07",
    upvotes: 123,
    downvotes: 8,
    featured: false,
  },
  {
    id: "fc-008",
    claim: "La pobreza se redujo a 11% con el modelo economico de la Constitucion del 93",
    context: "Debate sobre Constitucion",
    source: "Debate TV",
    verdict: "MISLEADING",
    explanation: "La pobreza en Peru se redujo de 58% (2004) a 20.2% (2019), pero nunca llego a 11%. Ademas, la reduccion se debio a multiples factores: boom de commodities, politicas sociales, crecimiento global favorable, y no exclusivamente al modelo constitucional. Post-pandemia la pobreza subio a 27.5%.",
    candidateName: "Keiko Fujimori",
    candidateSlug: "keiko-fujimori",
    candidateParty: "Fuerza Popular",
    confidence: 0.88,
    sources: [
      { title: "INEI - Evolucion de la Pobreza Monetaria 2004-2023", url: "https://www.inei.gob.pe" },
      { title: "Banco Mundial - Peru Overview", url: "https://www.worldbank.org" },
    ],
    publishedAt: "2026-02-08",
    upvotes: 445,
    downvotes: 98,
    featured: true,
  },
];

const VERDICT_ORDER: VerdictType[] = [
  "TRUE", "MOSTLY_TRUE", "HALF_TRUE", "MOSTLY_FALSE", "FALSE", "MISLEADING", "UNVERIFIABLE",
];

export default function VerificadorPage() {
  // Stats
  const totalChecks = FACT_CHECKS.length;
  const verdictCounts: Record<string, number> = {};
  for (const fc of FACT_CHECKS) {
    verdictCounts[fc.verdict] = (verdictCounts[fc.verdict] || 0) + 1;
  }

  const featured = FACT_CHECKS.filter((fc) => fc.featured);
  const recent = [...FACT_CHECKS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-success/10 text-success rounded-full px-3 py-1 text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Verificacion independiente
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Verificador de Datos
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              Verificamos las declaraciones de los candidatos con fuentes
              oficiales. Cada fact-check incluye contexto, fuentes y nivel de
              confianza.
            </p>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-6 overflow-x-auto pb-1">
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-2xl font-extrabold text-gray-800">{totalChecks}</span>
              <span className="text-sm text-gray-500">verificaciones</span>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            {VERDICT_ORDER.map((verdict) => {
              const count = verdictCounts[verdict] || 0;
              if (count === 0) return null;
              const config = VERDICT_CONFIG[verdict];
              return (
                <div key={verdict} className="flex items-center gap-1.5 flex-shrink-0">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: config.color }}
                  />
                  <span className="text-sm font-medium" style={{ color: config.color }}>
                    {count}
                  </span>
                  <span className="text-xs text-gray-400">{config.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Featured */}
        {featured.length > 0 && (
          <div className="mb-12">
            <h2 className="section-title mb-6">Destacados</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featured.slice(0, 4).map((fc) => (
                <FactCheckCard key={fc.id} factCheck={fc} size="large" />
              ))}
            </div>
          </div>
        )}

        {/* All fact-checks */}
        <div>
          <h2 className="section-title mb-6">Todas las verificaciones</h2>
          <div className="space-y-4">
            {recent.map((fc) => (
              <FactCheckCard key={fc.id} factCheck={fc} size="compact" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FactCheckCard({
  factCheck,
  size,
}: {
  factCheck: (typeof FACT_CHECKS)[0];
  size: "large" | "compact";
}) {
  const verdictConfig = VERDICT_CONFIG[factCheck.verdict];

  if (size === "compact") {
    return (
      <Link href={`/verificador/${factCheck.id}`} className="card p-5 flex gap-4 group">
        {/* Verdict indicator */}
        <div className="flex-shrink-0 pt-1">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: verdictConfig.color }}
          >
            {factCheck.verdict === "TRUE" ? "\u2713" : factCheck.verdict === "FALSE" ? "\u2717" : "~"}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: verdictConfig.bgColor, color: verdictConfig.color }}
            >
              {verdictConfig.label}
            </span>
            <span className="text-xs text-gray-400">{factCheck.source}</span>
          </div>
          <p className="font-medium text-gray-800 group-hover:text-primary transition-colors line-clamp-2 mb-1">
            &ldquo;{factCheck.claim}&rdquo;
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>{factCheck.candidateName} - {factCheck.candidateParty}</span>
            <span>{formatDate(factCheck.publishedAt)}</span>
          </div>
        </div>

        {/* Votes */}
        <div className="flex-shrink-0 flex items-center gap-3 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            {factCheck.upvotes}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {factCheck.downvotes}
          </span>
        </div>
      </Link>
    );
  }

  // Large card
  return (
    <Link href={`/verificador/${factCheck.id}`} className="card group cursor-pointer">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full"
          style={{ backgroundColor: verdictConfig.bgColor, color: verdictConfig.color }}
        >
          {verdictConfig.label}
        </span>
        <span className="text-xs text-gray-400">{factCheck.source}</span>
      </div>

      {/* Claim */}
      <p className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors mb-3 leading-snug">
        &ldquo;{factCheck.claim}&rdquo;
      </p>

      {/* Explanation preview */}
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
        {factCheck.explanation}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-500">
              {factCheck.candidateName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">{factCheck.candidateName}</p>
            <p className="text-xs text-gray-400">{factCheck.candidateParty}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            {factCheck.upvotes}
          </span>
          <span>{formatDate(factCheck.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-PE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
