import Link from "next/link";

const DIMENSIONS = [
  {
    name: "Economía",
    color: "#D4A017",
    description:
      "Mide la posición en el eje intervencionismo estatal vs libre mercado. Incluye política fiscal, tributaria, comercial, regulación y rol del Estado en la economía.",
    examples: [
      "Política tributaria y fiscal",
      "Rol del Estado en empresas",
      "Regulación de mercados",
      "Programas sociales vs libre competencia",
    ],
  },
  {
    name: "Social",
    color: "#EC4899",
    description:
      "Evalúa la posición en temas de derechos civiles, diversidad, género, migración y libertades individuales. Va de conservador a progresista.",
    examples: [
      "Derechos LGBTQ+",
      "Igualdad de género",
      "Política migratoria",
      "Libertad de expresión",
    ],
  },
  {
    name: "Ambiente",
    color: "#10B981",
    description:
      "Mide la prioridad que se da a la protección ambiental vs desarrollo extractivo. Incluye minería, energía, recursos naturales y cambio climático.",
    examples: [
      "Minería vs medio ambiente",
      "Energías renovables",
      "Recursos hídricos",
      "Áreas naturales protegidas",
    ],
  },
  {
    name: "Seguridad",
    color: "#D91023",
    description:
      "Evalúa la posición entre garantismo y mano dura. Incluye política criminal, fuerzas armadas, pena de muerte y derechos de los acusados.",
    examples: [
      "Pena de muerte",
      "Fuerzas Armadas en calles",
      "Política antidrogas",
      "Derechos del acusado",
    ],
  },
  {
    name: "Institucional",
    color: "#7C3AED",
    description:
      "Mide la posición respecto a reformas del Estado, constitución, descentralización y equilibrio de poderes. Va de status quo a refundación.",
    examples: [
      "Nueva constitución",
      "Descentralización",
      "Reforma del Congreso",
      "Independencia judicial",
    ],
  },
];

const METHODOLOGY_STEPS = [
  {
    step: 1,
    title: "Recopilación de posiciones",
    description:
      "Analizamos planes de gobierno oficiales inscritos ante el JNE, declaraciones públicas verificables, entrevistas en medios de comunicación y votaciones legislativas previas de cada candidato.",
  },
  {
    step: 2,
    title: "Clasificación en 5 dimensiones",
    description:
      "Cada posición se mapea a una de las 5 dimensiones políticas en una escala de 0 a 100. Dos analistas independientes clasifican cada posición y se promedian los resultados.",
  },
  {
    step: 3,
    title: "Construcción de preguntas",
    description:
      "Las 30 preguntas del ADN Test se diseñan para cubrir las 5 dimensiones de forma balanceada (6 preguntas por dimensión), con contexto peruano real y opciones no binarias.",
  },
  {
    step: 4,
    title: "Cálculo del matching",
    description:
      "El matching se calcula usando similitud coseno ponderada entre el perfil del usuario y el de cada candidato. Se normalizan las dimensiones para evitar sesgos y se genera un porcentaje de compatibilidad.",
  },
  {
    step: 5,
    title: "Verificación de datos",
    description:
      "Las declaraciones se verifican contra fuentes oficiales (INEI, BCR, MEF, JNE) y fuentes periodísticas de primera línea. Se asigna un veredicto con nivel de confianza.",
  },
];

export default function MetodologiaPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-700 font-medium">Metodología</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-gold-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Nuestra{" "}
            <span className="bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
              Metodología
            </span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            Candidatazo utiliza un enfoque riguroso, transparente y basado en datos
            para analizar a los candidatos, clasificar posiciones políticas y
            verificar declaraciones. Aquí explicamos cómo funciona todo.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 5 Dimensions */}
        <section className="mb-16">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
            Las 5 Dimensiones Políticas
          </h2>
          <p className="text-gray-500 mb-8">
            Todo candidato y todo usuario se evalúa en estas 5 dimensiones independientes.
            No usamos un eje izquierda-derecha simple, porque la realidad política peruana
            es multidimensional.
          </p>

          <div className="space-y-6">
            {DIMENSIONS.map((dim) => (
              <div key={dim.name} className="card">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: dim.color }}
                  />
                  <h3 className="text-lg font-bold text-gray-900">{dim.name}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  {dim.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {dim.examples.map((ex) => (
                    <span
                      key={ex}
                      className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process steps */}
        <section className="mb-16">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
            Proceso Metodológico
          </h2>
          <p className="text-gray-500 mb-8">
            Cada dato que ves en Candidatazo pasa por este proceso de 5 pasos.
          </p>

          <div className="space-y-6">
            {METHODOLOGY_STEPS.map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center text-white font-extrabold text-sm">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Scoring formula */}
        <section className="mb-16">
          <div className="card bg-gradient-to-br from-secondary-50 to-white border border-secondary-100">
            <h2 className="text-xl font-extrabold text-gray-900 mb-4">
              Fórmula de Matching
            </h2>
            <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4 font-mono text-sm text-gray-700">
              <p>compatibilidad = 100 - promedio(|usuario[d] - candidato[d]|)</p>
              <p className="text-gray-400 mt-1">para cada dimensión d en [eco, soc, amb, seg, inst]</p>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              El porcentaje de compatibilidad se calcula como la diferencia absoluta
              promedio entre las posiciones del usuario y del candidato en cada
              dimensión, restada de 100. Un match del 90% significa que en promedio
              solo difieren en 10 puntos por dimensión.
            </p>
          </div>
        </section>

        {/* Sources */}
        <section className="mb-16">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
            Fuentes de Datos
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: "JNE", desc: "Planes de gobierno oficiales y hojas de vida" },
              { name: "INEI", desc: "Estadísticas nacionales y datos de pobreza" },
              { name: "BCR", desc: "Indicadores económicos y financieros" },
              { name: "MEF", desc: "Presupuesto público y datos fiscales" },
              { name: "ONPE", desc: "Datos electorales y resultados históricos" },
              { name: "Medios verificados", desc: "RPP, El Comercio, La República, Gestión" },
            ].map((source) => (
              <div key={source.name} className="card p-4">
                <h4 className="font-bold text-gray-800 text-sm">{source.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{source.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="card bg-gradient-to-r from-primary-50 to-gold-50 border border-primary-100 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Transparencia ante todo
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              Si tienes dudas sobre nuestra metodología o quieres sugerir mejoras,
              contáctanos. Creemos en la mejora continua.
            </p>
            <Link href="/transparencia" className="btn-primary">
              Ver nuestro compromiso de transparencia
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
