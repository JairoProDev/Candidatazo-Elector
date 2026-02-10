import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 rounded-full px-4 py-1.5 text-sm font-medium mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Elecciones Peru 2026 - Primera vuelta: 12 de abril
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6 animate-slide-up">
              Vota con{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                conocimiento
              </span>
              , no con intuicion
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-2xl mx-auto animate-slide-up">
              Descubre tu perfil politico, encuentra al candidato que mejor te
              representa y verifica lo que dicen con inteligencia artificial.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
              <Link href="/test" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                Descubrir mi DNA Politico
              </Link>
              <Link href="/candidatos" className="btn-outline text-lg px-8 py-4 w-full sm:w-auto">
                Ver candidatos
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center justify-center gap-6 text-sm text-gray-400 animate-fade-in">
              <span>30 preguntas</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span>5 minutos</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span>100% gratuito</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              Todo lo que necesitas para decidir bien
            </h2>
            <p className="section-subtitle mx-auto">
              Herramientas potentes, imparciales y basadas en datos para que
              tomes la mejor decision electoral.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* DNA Test */}
            <Link href="/test" className="card group cursor-pointer">
              <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                DNA Politico
              </h3>
              <p className="text-gray-500 leading-relaxed mb-4">
                30 preguntas con contexto peruano real. Analisis en 5
                dimensiones: economia, social, ambiente, seguridad e
                instituciones.
              </p>
              <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                Hacer el test
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* Matching */}
            <Link href="/candidatos" className="card group cursor-pointer">
              <div className="w-14 h-14 bg-secondary-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Match con Candidatos
              </h3>
              <p className="text-gray-500 leading-relaxed mb-4">
                Compara tus posiciones con todos los candidatos. Entiende
                donde coincides y donde no, con explicaciones claras.
              </p>
              <div className="flex items-center gap-2 text-secondary font-medium text-sm group-hover:gap-3 transition-all">
                Ver candidatos
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* Fact-checking */}
            <Link href="/verificador" className="card group cursor-pointer">
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Verificador de Datos
              </h3>
              <p className="text-gray-500 leading-relaxed mb-4">
                Fact-checking con IA de las declaraciones de los candidatos.
                Fuentes verificables y veredictos transparentes.
              </p>
              <div className="flex items-center gap-2 text-success font-medium text-sm group-hover:gap-3 transition-all">
                Verificar datos
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Como funciona</h2>
            <p className="section-subtitle mx-auto">
              En 3 pasos simples, toma la decision electoral mas informada de
              tu vida.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StepCard
              step={1}
              title="Responde el test"
              description="30 preguntas sobre temas reales del Peru. Cada una con contexto para que entiendas de que se trata."
            />
            <StepCard
              step={2}
              title="Descubre tu perfil"
              description="Obten tu DNA politico en 5 dimensiones con visualizaciones claras y tu tribu politica."
            />
            <StepCard
              step={3}
              title="Compara candidatos"
              description="Ve tu match con cada candidato, entiende coincidencias y diferencias, y verifica sus datos."
            />
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Tu voto es tu voz. Hazla valer.
          </h2>
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            Mas de 27 millones de peruanos eligen presidente este 2026.
            Asegurate de que tu voto refleje lo que realmente piensas.
          </p>
          <Link href="/test" className="btn-primary text-lg px-10 py-4">
            Empezar el Test Ahora
          </Link>
        </div>
      </section>
    </>
  );
}

function StepCard({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
        {step}
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
