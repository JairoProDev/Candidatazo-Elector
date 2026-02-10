import { notFound } from "next/navigation";
import Link from "next/link";
import { DIMENSION_CONFIG, VERDICT_CONFIG } from "@candidatazo/types";
import type { Dimension, VerdictType } from "@candidatazo/types";

// Full candidate data
const CANDIDATES_DETAIL: Record<string, {
  name: string;
  party: string;
  age: number;
  bio: string;
  positions: Record<string, number>;
  truthScore: number;
  planSummary: string;
  promises: { title: string; description: string; category: string; status: string }[];
  factChecks: { claim: string; verdict: VerdictType; explanation: string }[];
  twitter?: string;
  website?: string;
}> = {
  "keiko-fujimori": {
    name: "Keiko Fujimori",
    party: "Fuerza Popular",
    age: 50,
    bio: "Keiko Sofia Fujimori Higuchi es una politica peruana, lideresa del partido Fuerza Popular. Hija del expresidente Alberto Fujimori, ha sido candidata presidencial en 2011, 2016 y 2021. Congresista en el periodo 2006-2011. Estudio Administracion de Empresas en Boston University y tiene un MBA de Columbia Business School.",
    positions: { economic: 72, social: 28, environment: 35, security: 85, institutional: 30 },
    truthScore: 45,
    planSummary: "Plan centrado en seguridad ciudadana con participacion de Fuerzas Armadas, reactivacion economica mediante inversion privada, programas sociales focalizados y lucha frontal contra el narcotrafico. Propone mantener el modelo economico constitucional con ajustes.",
    promises: [
      { title: "Declarar estado de emergencia en seguridad", description: "Desplegar Fuerzas Armadas en zonas de alta criminalidad y declarar emergencia nacional en seguridad ciudadana en los primeros 30 dias.", category: "SECURITY", status: "PENDING" },
      { title: "Crear 1 millon de empleos formales", description: "A traves de incentivos tributarios a empresas, simplificacion de tramites y promocion de la inversion privada.", category: "ECONOMY", status: "PENDING" },
      { title: "Internet para todos los colegios", description: "Conectar al 100% de escuelas publicas con internet de alta velocidad en 3 años.", category: "EDUCATION", status: "PENDING" },
      { title: "Construir 50 penales de maxima seguridad", description: "Nuevos centros penitenciarios para reducir hacinamiento y separar reos peligrosos.", category: "SECURITY", status: "PENDING" },
      { title: "Reducir la pobreza al 15%", description: "Mediante programas sociales focalizados y reactivacion economica.", category: "SOCIAL", status: "PENDING" },
      { title: "Reforma del sistema de salud", description: "Unificar los sistemas de salud SIS, EsSalud y privado en un sistema universal.", category: "HEALTH", status: "PENDING" },
    ],
    factChecks: [
      { claim: "Durante el gobierno de mi padre, la economia crecio 7% anual", verdict: "HALF_TRUE", explanation: "El crecimiento promedio fue de 4.5% durante el gobierno de Fujimori (1990-2000), con picos de 12.8% en 1994 pero tambien años de recesion." },
      { claim: "Fuerza Popular ha presentado mas proyectos de ley que cualquier otra bancada", verdict: "MOSTLY_TRUE", explanation: "En el periodo 2016-2019, Fuerza Popular presento 762 proyectos, siendo la bancada mas numerosa con 73 congresistas." },
      { claim: "La pobreza se redujo a 11% con el modelo economico de la Constitucion del 93", verdict: "MISLEADING", explanation: "La pobreza se redujo de 58% a 20.2% (2019), pero no a 11%. Ademas, otros factores como el boom de commodities contribuyeron significativamente." },
    ],
    twitter: "@KeikoFujimori",
    website: "https://fuerzapopular.pe",
  },
  "veronika-mendoza": {
    name: "Veronika Mendoza",
    party: "Juntos por el Peru",
    age: 41,
    bio: "Veronika Fanny Mendoza Frisch es una politica y politologa peruana. Fue congresista de 2011 a 2016 por Cusco. Lideresa de Nuevo Peru y la izquierda democratica. Estudio en la Sorbona de Paris y en la PUCP. Candidata presidencial en 2016 y 2021.",
    positions: { economic: 25, social: 82, environment: 85, security: 30, institutional: 88 },
    truthScore: 55,
    planSummary: "Plan centrado en nueva Constitucion con Asamblea Constituyente, renegociacion de contratos mineros, segundo aguinaldo, impuesto a las grandes fortunas, derechos de pueblos indigenas, matrimonio igualitario y transicion energetica.",
    promises: [
      { title: "Asamblea Constituyente", description: "Convocar a una Asamblea Constituyente paritaria, plurinacional e independiente para redactar una nueva Constitucion.", category: "INSTITUTIONAL", status: "PENDING" },
      { title: "Segundo aguinaldo para trabajadores", description: "Establecer un segundo aguinaldo en julio para todos los trabajadores formales.", category: "ECONOMY", status: "PENDING" },
      { title: "Impuesto a las grandes fortunas", description: "Crear un impuesto temporal a patrimonios superiores a 10 millones de soles.", category: "ECONOMY", status: "PENDING" },
      { title: "Matrimonio igualitario", description: "Aprobar el matrimonio civil para parejas del mismo sexo en Peru.", category: "SOCIAL", status: "PENDING" },
      { title: "Renegociar contratos mineros", description: "Renegociar contratos con las grandes mineras para obtener mayor participacion del Estado en las ganancias.", category: "ECONOMY", status: "PENDING" },
      { title: "Internet como derecho fundamental", description: "Consagrar el acceso a internet como derecho fundamental y llevar conectividad a zonas rurales.", category: "TECHNOLOGY", status: "PENDING" },
    ],
    factChecks: [
      { claim: "El 1% mas rico del Peru tiene tanto como el 90% mas pobre", verdict: "MOSTLY_TRUE", explanation: "Segun Oxfam, el 1% mas rico concentra el 30% de la riqueza nacional, pero la comparacion exacta con el 90% varia segun la metodologia." },
      { claim: "Las mineras pagan menos impuestos que en Chile y Bolivia", verdict: "HALF_TRUE", explanation: "La carga tributaria minera peruana es comparable a la de Chile pero menor que Bolivia. Sin embargo, los regimenes son diferentes y dificiles de comparar directamente." },
      { claim: "500,000 familias perdieron sus ahorros durante la pandemia", verdict: "MOSTLY_TRUE", explanation: "Segun el BCRP, los retiros de AFP y la caida de ingresos afectaron a cientos de miles de familias, aunque la cifra exacta es aproximada." },
    ],
    twitter: "@VeronikaMendworthy",
  },
  "hernando-de-soto": {
    name: "Hernando de Soto",
    party: "Avanza Pais",
    age: 84,
    bio: "Hernando de Soto Polar es un economista peruano reconocido internacionalmente. Autor de 'El Otro Sendero' y 'El Misterio del Capital'. Presidente del Instituto Libertad y Democracia (ILD). Asesor de gobiernos de mas de 30 paises en formalizacion y derechos de propiedad.",
    positions: { economic: 88, social: 55, environment: 45, security: 45, institutional: 65 },
    truthScore: 52,
    planSummary: "Plan centrado en la formalizacion masiva de la economia, derechos de propiedad para todos, tecnologia blockchain para registros publicos, simplificacion tributaria radical y apertura a mercados internacionales.",
    promises: [
      { title: "Formalizar a 12 millones de peruanos", description: "Programa masivo de formalizacion con tecnologia digital, reduciendo tramites de meses a dias.", category: "ECONOMY", status: "PENDING" },
      { title: "Titulos de propiedad digitales", description: "Entregar titulos de propiedad digitales con blockchain a millones de familias que viven en informalidad.", category: "ECONOMY", status: "PENDING" },
      { title: "Simplificacion tributaria radical", description: "Reducir el numero de impuestos y crear un regimen simplificado para micro y pequeñas empresas.", category: "ECONOMY", status: "PENDING" },
      { title: "Gobierno digital al 100%", description: "Todos los tramites gubernamentales disponibles en linea en 2 años.", category: "TECHNOLOGY", status: "PENDING" },
    ],
    factChecks: [
      { claim: "El 70% de la economia peruana es informal", verdict: "TRUE", explanation: "Segun el INEI, aproximadamente el 72.7% del empleo en Peru es informal (2023), lo que respalda esta afirmacion." },
      { claim: "He asesorado a mas de 30 gobiernos en el mundo", verdict: "TRUE", explanation: "Documentado por el ILD y medios internacionales. De Soto ha trabajado con gobiernos en Africa, Asia, Europa del Este y Latinoamerica." },
    ],
    twitter: "@HernandoDeSoto",
    website: "https://ild.org.pe",
  },
};

// Fallback for slugs not in detail
const BASIC_CANDIDATES: Record<string, { name: string; party: string; age: number; bio: string; positions: Record<string, number>; truthScore: number; planSummary: string; promises: { title: string; description: string; category: string; status: string }[]; factChecks: { claim: string; verdict: VerdictType; explanation: string }[] }> = {
  "antauro-humala": {
    name: "Antauro Humala",
    party: "Frente Patriotico",
    age: 61,
    bio: "Exmilitar y lider etnocacerista. Propone nacionalizacion radical y refundacion del Estado peruano.",
    positions: { economic: 15, social: 20, environment: 40, security: 95, institutional: 90 },
    truthScore: 30,
    planSummary: "Nacionalizacion de recursos naturales, pena de muerte, servicio militar obligatorio, expulsion de empresas transnacionales.",
    promises: [
      { title: "Nacionalizar recursos naturales", description: "Expropiar minas y yacimientos de empresas extranjeras.", category: "ECONOMY", status: "PENDING" },
      { title: "Pena de muerte para corruptos", description: "Implementar pena de muerte para funcionarios corruptos.", category: "SECURITY", status: "PENDING" },
    ],
    factChecks: [
      { claim: "El 80% de la riqueza del Peru se va al extranjero", verdict: "FALSE", explanation: "Las utilidades repatriadas por empresas extranjeras representan aprox. 5-6% del PBI, no 80%." },
    ],
  },
  "cesar-acuna": {
    name: "Cesar Acuña",
    party: "Alianza para el Progreso",
    age: 72,
    bio: "Empresario educativo, fundador de la Universidad Cesar Vallejo. Exgobernador de La Libertad.",
    positions: { economic: 60, social: 40, environment: 30, security: 55, institutional: 35 },
    truthScore: 38,
    planSummary: "Obras publicas, educacion tecnica, empleo juvenil y programas sociales.",
    promises: [
      { title: "Becas para 1 millon de jovenes", description: "Programa de becas para educacion tecnica y superior.", category: "EDUCATION", status: "PENDING" },
    ],
    factChecks: [
      { claim: "La UCV es la universidad con mas alumnos del Peru", verdict: "TRUE", explanation: "La Universidad Cesar Vallejo tiene mas de 100,000 alumnos, siendo una de las mas grandes del pais." },
    ],
  },
  "daniel-urresti": {
    name: "Daniel Urresti",
    party: "Podemos Peru",
    age: 67,
    bio: "General retirado. Se enfoca en seguridad ciudadana y lucha contra la criminalidad.",
    positions: { economic: 55, social: 35, environment: 30, security: 90, institutional: 40 },
    truthScore: 42,
    planSummary: "Militarizacion de la seguridad, penas mas duras, modernizacion policial.",
    promises: [
      { title: "Reducir la criminalidad en 50%", description: "Despliegue militar y policial masivo en los primeros 100 dias.", category: "SECURITY", status: "PENDING" },
    ],
    factChecks: [
      { claim: "Como ministro reduje el crimen en Lima en un 30%", verdict: "HALF_TRUE", explanation: "Hubo reduccion en algunos indicadores durante su gestion pero no en la magnitud señalada." },
    ],
  },
  "julio-guzman": {
    name: "Julio Guzman",
    party: "Partido Morado",
    age: 51,
    bio: "Tecnocrata y ex funcionario publico. Lider del centro-liberal peruano.",
    positions: { economic: 65, social: 70, environment: 65, security: 40, institutional: 75 },
    truthScore: 50,
    planSummary: "Modernizacion del Estado, gobierno digital, reforma educativa, lucha anticorrupcion.",
    promises: [
      { title: "Gobierno 100% digital", description: "Digitalizar todos los servicios del Estado en 4 años.", category: "TECHNOLOGY", status: "PENDING" },
      { title: "Reforma educativa integral", description: "Incrementar el presupuesto de educacion al 6% del PBI.", category: "EDUCATION", status: "PENDING" },
    ],
    factChecks: [
      { claim: "El Partido Morado es el unico que no tiene investigados por corrupcion", verdict: "MOSTLY_FALSE", explanation: "Si bien tiene menos casos, ha habido investigaciones a miembros del partido." },
    ],
  },
  "george-forsyth": {
    name: "George Forsyth",
    party: "Somos Peru",
    age: 43,
    bio: "Exfutbolista profesional y exalcalde de La Victoria. Enfoque en gestion municipal y seguridad.",
    positions: { economic: 58, social: 48, environment: 42, security: 70, institutional: 50 },
    truthScore: 43,
    planSummary: "Seguridad basada en tecnologia, empleo juvenil, infraestructura y deporte.",
    promises: [
      { title: "Camaras inteligentes en todo el Peru", description: "Instalar un sistema de videovigilancia con IA en las 50 ciudades mas grandes.", category: "SECURITY", status: "PENDING" },
    ],
    factChecks: [
      { claim: "Como alcalde reduje el crimen en La Victoria en un 40%", verdict: "HALF_TRUE", explanation: "Hubo mejoras en orden pero las cifras oficiales de reduccion del crimen son menores." },
    ],
  },
};

const ALL_CANDIDATES = { ...CANDIDATES_DETAIL, ...BASIC_CANDIDATES };

interface CandidatePageProps {
  params: Promise<{ slug: string }>;
}

export default async function CandidatePage({ params }: CandidatePageProps) {
  const { slug } = await params;
  const candidate = ALL_CANDIDATES[slug];

  if (!candidate) {
    notFound();
  }

  const dimensions: { key: string; dimension: Dimension }[] = [
    { key: "economic", dimension: "ECONOMIC" },
    { key: "social", dimension: "SOCIAL" },
    { key: "environment", dimension: "ENVIRONMENT" },
    { key: "security", dimension: "SECURITY" },
    { key: "institutional", dimension: "INSTITUTIONAL" },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link href="/candidatos" className="text-sm text-gray-400 hover:text-gray-600 mb-4 inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Todos los candidatos
          </Link>

          <div className="flex items-start gap-6 mt-4">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-bold text-primary">
                {candidate.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
                {candidate.name}
              </h1>
              <p className="text-lg text-gray-500 mb-2">{candidate.party} &middot; {candidate.age} años</p>
              <div className="flex items-center gap-3">
                <span className="badge bg-gray-100 text-gray-600 text-xs">
                  Presidencial 2026
                </span>
                <span className="flex items-center gap-1.5 text-sm">
                  <span className="text-gray-400">Veracidad:</span>
                  <span className={`font-bold ${candidate.truthScore > 60 ? "text-success" : candidate.truthScore > 40 ? "text-warning" : "text-error"}`}>
                    {candidate.truthScore}%
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <div className="card">
              <h2 className="font-bold text-gray-800 mb-3">Biografia</h2>
              <p className="text-gray-600 leading-relaxed">{candidate.bio}</p>
            </div>

            {/* Plan */}
            <div className="card">
              <h2 className="font-bold text-gray-800 mb-3">Plan de Gobierno</h2>
              <p className="text-gray-600 leading-relaxed">{candidate.planSummary}</p>
            </div>

            {/* Promises */}
            <div className="card">
              <h2 className="font-bold text-gray-800 mb-4">
                Propuestas ({candidate.promises.length})
              </h2>
              <div className="space-y-3">
                {candidate.promises.map((promise: { title: string; description: string; category: string; status: string }, i: number) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h4 className="font-semibold text-gray-800">{promise.title}</h4>
                      <span className="badge bg-gray-200 text-gray-600 text-xs flex-shrink-0">
                        {promise.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{promise.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fact checks */}
            <div className="card">
              <h2 className="font-bold text-gray-800 mb-4">
                Verificacion de Datos ({candidate.factChecks.length})
              </h2>
              <div className="space-y-4">
                {candidate.factChecks.map((fc: { claim: string; verdict: VerdictType; explanation: string }, i: number) => {
                  const verdictConfig = VERDICT_CONFIG[fc.verdict];
                  return (
                    <div key={i} className="border border-gray-200 rounded-lg p-4">
                      <p className="font-medium text-gray-800 mb-2 italic">
                        &ldquo;{fc.claim}&rdquo;
                      </p>
                      <span
                        className="inline-flex items-center gap-1 rounded-full text-xs font-semibold px-3 py-1 mb-2"
                        style={{ backgroundColor: verdictConfig.bgColor, color: verdictConfig.color }}
                      >
                        {verdictConfig.label}
                      </span>
                      <p className="text-sm text-gray-500">{fc.explanation}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Political profile */}
            <div className="card">
              <h3 className="font-bold text-gray-800 mb-4">Perfil Politico</h3>
              <div className="space-y-4">
                {dimensions.map(({ key, dimension }) => {
                  const config = DIMENSION_CONFIG[dimension];
                  const score = candidate.positions[key as keyof typeof candidate.positions] as number;
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-gray-600">
                          {config.label}
                        </span>
                        <span className="text-sm font-bold" style={{ color: config.color }}>
                          {score}
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${score}%`,
                            backgroundColor: config.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="card bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-100 text-center">
              <h3 className="font-bold text-gray-800 mb-2">Tu match con {candidate.name.split(" ")[0]}</h3>
              <p className="text-sm text-gray-500 mb-4">
                Completa el DNA Test para ver tu porcentaje de compatibilidad.
              </p>
              <Link href="/test" className="btn-primary text-sm w-full">
                Hacer DNA Test
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
