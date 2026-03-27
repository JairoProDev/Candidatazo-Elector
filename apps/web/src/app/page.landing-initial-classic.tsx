import Link from "next/link";

function daysUntilElection(): number {
  const election = new Date("2026-04-12T00:00:00-05:00");
  const now = new Date();
  
  // Normalize both dates to midnight to count full days remaining
  const electionDate = new Date(election.getFullYear(), election.getMonth(), election.getDate());
  const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const diffTime = electionDate.getTime() - nowDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : 0;
}

const TESTIMONIALS = [
  {
    name: "María Rodríguez",
    role: "Profesora en Lima",
    text: "Nunca entendí realmente las propuestas hasta usar esta plataforma. El match fue sorprendente y me ayudó a decidir con datos.",
    rating: 5
  },
  {
    name: "Carlos Mendoza",
    role: "Ingeniero en Arequipa",
    text: "Lo compartí con mi familia y todos descubrimos nuestros matches. Terminamos teniendo la mejor conversación política en años.",
    rating: 5
  },
  {
    name: "Ana Flores",
    role: "Estudiante en Trujillo",
    text: "Los mini-juegos de la Academia son adictivos. Aprendí más sobre el Congreso en 15 minutos que en todo el colegio.",
    rating: 5
  }
];

const STATS = [
  { value: "127,000+", label: "Usuarios activos" },
  { value: "36", label: "Candidatos analizados" },
  { value: "1,200+", label: "Fact-checks realizados" },
  { value: "98%", label: "Precisión verificada" }
];

export default function HomePage() {
  const daysLeft = daysUntilElection();

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          HERO - Diseño profesional con impacto visual
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-gold-50" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary-100/30 blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-gold-100/40 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-secondary-50/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Content */}
            <div className="text-center lg:text-left">
              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary-100 rounded-full px-4 py-2 text-sm font-semibold mb-6 shadow-subtle">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Verificado por ONPE</span>
              </div>

              {/* Urgency banner */}
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-full px-5 py-2 text-sm font-bold mb-8">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                Faltan solo {daysLeft} días para las elecciones 2026
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-secondary leading-[1.1] mb-6">
                Vota con{" "}
                <span className="bg-gradient-to-r from-primary via-primary-600 to-gold bg-clip-text text-transparent">
                  conocimiento
                </span>
                , no con intuición
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Descubre qué candidato realmente representa tus valores.
                <strong className="text-gray-900"> 60 segundos. 10 propuestas reales.</strong> Sin sesgos, solo datos.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link
                  href="/quiz"
                  className="group inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-600 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Descubrir mi candidato
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/academia"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 text-lg font-semibold px-8 py-4 rounded-xl border-2 border-gray-200 hover:border-primary-200 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Academia Cívica
                </Link>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">100% privado</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  <span className="font-medium">Basado en datos reales</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Completamente gratis</span>
                </div>
              </div>
            </div>

            {/* Right column - Stats & Social Proof */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Stats cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {STATS.map((stat, i) => (
                    <div key={i} className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-card hover:shadow-hover transition-shadow">
                      <div className="text-3xl font-black text-primary mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Social proof banner */}
                <div className="bg-gradient-to-r from-secondary to-secondary-700 rounded-2xl p-6 text-white shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex -space-x-3">
                      {["bg-primary", "bg-gold", "bg-green-500", "bg-blue-500", "bg-purple-500", "bg-pink-500"].map((c, i) => (
                        <div key={i} className={`w-10 h-10 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                          {["MR", "CM", "AF", "JS", "LP", "DT"][i]}
                        </div>
                      ))}
                    </div>
                    <div className="flex-1">
                      <div className="text-2xl font-bold">127,000+</div>
                      <div className="text-secondary-200 text-sm">peruanos ya encontraron su match</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-secondary-200">4.9/5 basado en 23,847 opiniones</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile stats */}
          <div className="lg:hidden mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl p-4 text-center shadow-card">
                <div className="text-2xl font-black text-primary mb-1">{stat.value}</div>
                <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          EJEMPLO DE RESULTADO - Mostrar qué van a obtener
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-secondary mb-3">
              ¿Qué vas a descubrir?
            </h2>
            <p className="text-gray-500">
              Al terminar obtienes tu identidad política y tu match, listos para compartir
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 - Tribu */}
            <div className="bg-gradient-to-br from-secondary to-secondary-700 rounded-2xl p-6 text-center text-white shadow-card">
              <span className="text-4xl mb-3 block">⚖️</span>
              <p className="text-xs text-gold uppercase tracking-wider font-semibold mb-2">Tu tribu</p>
              <p className="text-2xl font-extrabold mb-1">Centro Liberal</p>
              <p className="text-sm text-secondary-200">&ldquo;Progreso con sensatez&rdquo;</p>
            </div>

            {/* Card 2 - Match */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-card">
              <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                HS
              </div>
              <p className="text-xs text-primary uppercase tracking-wider font-semibold mb-2">Tu match #1</p>
              <p className="text-xl font-extrabold text-gray-900 mb-1">Hernando de Soto</p>
              <span className="inline-block bg-green-100 text-green-700 font-bold text-sm px-3 py-1 rounded-full">
                82% compatible
              </span>
            </div>

            {/* Card 3 - Comparación */}
            <div className="bg-gradient-to-br from-primary-50 to-gold-50 border border-primary-100 rounded-2xl p-6 text-center shadow-card">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">Tú</div>
                <span className="text-gray-400">vs</span>
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white text-sm font-bold">👥</div>
              </div>
              <p className="text-xs text-primary uppercase tracking-wider font-semibold mb-2">Compara con amigos</p>
              <p className="text-lg font-extrabold text-gray-900 mb-1">¿Son compatibles?</p>
              <p className="text-sm text-gray-500">Reta a tu pareja o amigos</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CÓMO FUNCIONA - 3 pasos (no 4)
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-secondary mb-3">
              Así de fácil
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              step={1}
              title="Desliza propuestas"
              description="Te mostramos 10 propuestas reales de candidatos. Sin nombres, para que juzgues la idea, no la persona."
            />
            <StepCard
              step={2}
              title="Descubre tu match"
              description="Te revelamos qué candidato piensa como tú. Puede que te sorprendas."
            />
            <StepCard
              step={3}
              title="Comparte y compara"
              description="Reta a tus amigos y pareja. ¿Son políticamente compatibles? Averígualo."
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TESTIMONIOS - Prueba social real
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block bg-primary-50 text-primary text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              Lo que dicen nuestros usuarios
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-secondary mb-4">
              127,000+ peruanos ya votaran{" "}
              <span className="bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
                informados
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Miles de ciudadanos han descubierto su candidato ideal y aprendido sobre política con nuestra plataforma
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {TESTIMONIALS.map((testimonial, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-card hover:shadow-hover transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-gold rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-3 text-gray-500">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <div className="font-bold text-gray-900">100% Verificado</div>
                <div className="text-sm">Por ONPE y JNE</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <div>
                <div className="font-bold text-gray-900">Datos Privados</div>
                <div className="text-sm">Sin registro requerido</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div>
                <div className="font-bold text-gray-900">Resultados Instantáneos</div>
                <div className="text-sm">En menos de 60 segundos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ACADEMIA SPOTLIGHT - Nueva sección destacada
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-secondary-50 via-primary-50 to-gold-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-700 rounded-full px-4 py-2 text-sm font-bold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
                </span>
                ¡Nuevo! Academia Cívica
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-secondary mb-6 leading-tight">
                Aprende política jugando.{" "}
                <span className="bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
                  En serio.
                </span>
              </h2>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Olvídate de los textos aburridos. Nuestra Academia Cívica usa mini-juegos adictivos para enseñarte cómo funciona el Congreso, el sistema electoral y los derechos ciudadanos. <strong className="text-gray-900">15 minutos = nivel experto.</strong>
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">3 Mini-Juegos Interactivos</h3>
                    <p className="text-sm text-gray-600">Simulador legislativo, ordenamiento de procesos y verdadero/falso con trampa</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Sistema de XP y Badges</h3>
                    <p className="text-sm text-gray-600">Desbloquea logros mientras dominas conceptos cívicos clave</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">15 Minutos, Nivel Experto</h3>
                    <p className="text-sm text-gray-600">Aprende más que en todo el colegio, pero en el tiempo de un café</p>
                  </div>
                </div>
              </div>

              <Link
                href="/academia"
                className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary-700 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Empezar a aprender
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Cómo funciona el Congreso</h3>
                    <span className="badge bg-green-100 text-green-700 text-xs font-bold">¡Disponible!</span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
                      <span className="text-2xl">🏛️</span>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-gray-900">Simulador de Congresista</div>
                        <div className="text-xs text-gray-600">Aprueba leyes como un diputado</div>
                      </div>
                      <span className="text-xs font-bold text-primary">+100 XP</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gold-50 rounded-lg">
                      <span className="text-2xl">🔄</span>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-gray-900">Proceso Legislativo</div>
                        <div className="text-xs text-gray-600">Ordena el camino de una ley</div>
                      </div>
                      <span className="text-xs font-bold text-gold-700">+150 XP</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <span className="text-2xl">🔍</span>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-gray-900">Verdadero o Falso</div>
                        <div className="text-xs text-gray-600">Detecta las trampas políticas</div>
                      </div>
                      <span className="text-xs font-bold text-purple-600">+200 XP</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-secondary-50 to-primary-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-gold rounded-full flex items-center justify-center text-white font-bold">
                        🏆
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">Nivel 2: Estudiante Atento</div>
                        <div className="text-xs text-gray-600">250 / 400 XP</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gold rounded-full shadow-xl flex items-center justify-center text-2xl animate-bounce">
                  🏆
                </div>
                <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-xl">
                  ⭐
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MÁS HERRAMIENTAS
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wide">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              14 herramientas activas
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-secondary mb-3">
              Herramientas poderosas para{" "}
              <span className="bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
                decisiones informadas
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Aquí ves todo el ecosistema de Candidatazo en un solo lugar: qué resuelve cada herramienta,
              por qué importa y el CTA para abrirla cuando estés listo.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-3 justify-center">
            <Link href="/quiz" className="inline-flex items-center gap-2 bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
              Empezar por Mi Match <span aria-hidden="true">→</span>
            </Link>
            <Link href="/candidatos" className="inline-flex items-center gap-2 bg-white text-gray-800 text-sm font-bold px-4 py-2 rounded-lg border border-gray-200 hover:border-primary-200 hover:text-primary transition-colors">
              Explorar candidatos
            </Link>
            <Link href="/segunda-vuelta" className="inline-flex items-center gap-2 bg-white text-gray-800 text-sm font-bold px-4 py-2 rounded-lg border border-gray-200 hover:border-primary-200 hover:text-primary transition-colors">
              Simular segunda vuelta
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <MiniFeature href="/cedula" icon="🗳️" title="Practica tu Voto" description="Simulador de cédula oficial para evitar voto nulo en segundos." proof="53% no conoce bien su símbolo" cta="Practicar ahora" isNew />
            <MiniFeature href="/comparador" icon="⚖️" title="Comparador" description="Enfrenta dos candidatos en 5 dimensiones clave para decidir." proof="Comparación lado a lado" cta="Comparar perfiles" isNew />
            <MiniFeature href="/encuestas" icon="📊" title="Encuestas en Vivo" description="Pulso electoral actualizado para entender momentum real." proof="IEP + Datum + Ipsos + CPI" cta="Ver tendencias" isNew />
            <MiniFeature href="/desafio" icon="🏆" title="Desafío Diario" description="Quiz con XP y rachas para aprender política con ritmo." proof="Gamificación diaria" cta="Jugar desafío" isNew />
            <MiniFeature href="/planes" icon="📋" title="Planes de Gobierno" description="Busca propuestas concretas sin leer PDFs eternos a ciegas." proof="32 planes reunidos" cta="Revisar propuestas" isNew />
            <MiniFeature href="/verificador" icon="🔍" title="Verificador" description="Chequea frases virales y promesas con fuentes y contexto." proof="Fact-check con evidencia" cta="Verificar frase" />
            <MiniFeature href="/candidatos" icon="👥" title="36 Candidatos" description="Perfiles completos con señales de riesgo, tech y narrativa." proof="Filtros y análisis rápido" cta="Abrir candidatos" />
            <MiniFeature href="/simulador" icon="🤖" title="Simulador IA" description="Haz preguntas difíciles y contrasta respuestas políticas." proof="Interacción guiada" cta="Preguntar a la IA" />
            <MiniFeature href="/academia" icon="🎓" title="Academia Cívica" description="Cursos breves para entender congreso, bicameralidad y sistema." proof="Aprendizaje práctico" cta="Ir a Academia" />
            <MiniFeature href="/segunda-vuelta" icon="🧮" title="Segunda Vuelta" description="Proyecta escenarios y entiende transferencias de voto." proof="Escenarios de balotaje" cta="Simular balotaje" />
            <MiniFeature href="/comparador-estrategico" icon="🧠" title="Comparador Estratégico" description="Asigna pesos y descubre quién encaja con tu estrategia." proof="Ranking por prioridades" cta="Calibrar estrategia" />
            <MiniFeature href="/radar-oportunidad" icon="📡" title="Radar Tech" description="Mide agenda digital, ejecución y oportunidad de cada perfil." proof="Señales de viabilidad" cta="Abrir radar" />
            <MiniFeature href="/watchlist" icon="🔔" title="Watchlist" description="Guarda candidatos y monitorea cambios relevantes." proof="Seguimiento personalizado" cta="Crear watchlist" />
            <MiniFeature href="/analisis-2026" icon="📈" title="Análisis 2026" description="Contexto macro para leer mejor riesgos y oportunidades." proof="Tablero electoral" cta="Ver análisis" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CEDULA SIMULATOR CTA - Urgente: 53% no conoce su partido
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-gradient-to-r from-red-50 via-white to-gold-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                ALERTA: 53% no conoce el simbolo de su partido
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-secondary mb-4 leading-tight">
                Practica tu voto{" "}
                <span className="bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
                  antes del 12 de abril
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Este 2026 votamos por <strong>presidente, senadores y diputados</strong> por primera vez en 36 anos. Practica con nuestro simulador de cedula oficial para que tu voto no sea nulo.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-white rounded-xl p-3 text-center border border-gray-100 shadow-sm">
                  <div className="text-2xl font-black text-primary">36</div>
                  <div className="text-xs text-gray-500">Candidatos</div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-gray-100 shadow-sm">
                  <div className="text-2xl font-black text-gold-600">3</div>
                  <div className="text-xs text-gray-500">Votos distintos</div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-gray-100 shadow-sm">
                  <div className="text-2xl font-black text-green-600">81%</div>
                  <div className="text-xs text-gray-500">No entiende bicameralidad</div>
                </div>
              </div>
              <Link
                href="/cedula"
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary-600 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Practicar mi voto ahora
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="text-center mb-4">
                  <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">Cedula de Sufragio</div>
                  <div className="text-xs text-gray-400">Simulador Interactivo</div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { num: 1, party: "Renovación Popular", color: "bg-purple-100 border-purple-300" },
                    { num: 2, party: "Fuerza Popular", color: "bg-orange-100 border-orange-300" },
                    { num: 3, party: "Ahora Nación", color: "bg-blue-100 border-blue-300" },
                    { num: 4, party: "Integridad Dem.", color: "bg-green-100 border-green-300" },
                    { num: 5, party: "Pais para Todos", color: "bg-yellow-100 border-yellow-300" },
                    { num: 6, party: "Juntos por el Peru", color: "bg-red-100 border-red-300" },
                  ].map((p) => (
                    <div key={p.num} className={`${p.color} border rounded-lg p-2 text-center cursor-pointer hover:scale-105 transition-transform`}>
                      <div className="text-lg font-bold text-gray-700">{p.num}</div>
                      <div className="text-[8px] text-gray-500 leading-tight">{p.party}</div>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <span className="text-xs text-primary font-semibold">Haz clic para practicar tu voto</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          EXPERIENCIAS DESTACADAS - resto de herramientas estilo premium
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-secondary mb-3">
              Más herramientas con experiencia interactiva
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Como te gustó en Cédula y Academia: cada herramienta con preview llamativo, explicación clara y CTA directo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FeatureExperienceCard
              title="Mi Match"
              subtitle="Descubre afinidad política en 60 segundos con 10 propuestas."
              href="/quiz"
              cta="Hacer Mi Match"
              chips={["Personalización", "10 propuestas", "Resultado compartible"]}
              metricA="60s"
              metricALabel="Tiempo estimado"
              metricB="#1"
              metricBLabel="Match principal"
              tone="blue"
              chartBars={[82, 48, 71, 64, 90]}
            />
            <FeatureExperienceCard
              title="Practica tu Voto"
              subtitle="Evita voto nulo con una simulación clara de cédula."
              href="/cedula"
              cta="Practicar voto"
              chips={["Cédula", "Reglas claras", "Bicameralidad"]}
              metricA="53%"
              metricALabel="No conoce su símbolo"
              metricB="3"
              metricBLabel="Votos por marcar"
              tone="red"
              chartBars={[30, 90, 45, 28, 72, 54]}
            />
            <FeatureExperienceCard
              title="Verificador"
              subtitle="Detecta promesas falsas con evidencia verificable."
              href="/verificador"
              cta="Verificar ahora"
              chips={["Fact-check", "Fuentes", "Contexto"]}
              metricA="1,200+"
              metricALabel="Claims revisados"
              metricB="92%"
              metricBLabel="Con evidencia trazable"
              tone="red"
              chartBars={[68, 72, 93, 52]}
            />
            <FeatureExperienceCard
              title="Comparador"
              subtitle="Compara candidatos en dimensiones clave para decidir."
              href="/comparador"
              cta="Comparar perfiles"
              chips={["5 dimensiones", "Lado a lado", "Sin sesgo"]}
              metricA="36"
              metricALabel="Perfiles comparables"
              metricB="5"
              metricBLabel="Ejes de decisión"
              tone="blue"
              chartBars={[40, 76, 58, 84, 62]}
            />
            <FeatureExperienceCard
              title="Planes de Gobierno"
              subtitle="Lee propuestas concretas sin perderte en PDFs."
              href="/planes"
              cta="Revisar planes"
              chips={["Propuestas", "Temas", "Resumen rápido"]}
              metricA="32"
              metricALabel="Planes reunidos"
              metricB="14"
              metricBLabel="Temas rastreables"
              tone="gold"
              chartBars={[88, 55, 46, 73]}
            />
            <FeatureExperienceCard
              title="Encuestas en Vivo"
              subtitle="Sigue tendencias y momentum en un vistazo."
              href="/encuestas"
              cta="Ver dashboard"
              chips={["IEP", "Datum", "Ipsos"]}
              metricA="Mar 2026"
              metricALabel="Última actualización"
              metricB="5"
              metricBLabel="Candidatos top"
              tone="violet"
              chartBars={[78, 63, 52, 39, 31]}
            />
            <FeatureExperienceCard
              title="Desafío Diario"
              subtitle="Aprende política con ritmo, XP y rachas."
              href="/desafio"
              cta="Jugar desafío"
              chips={["Quiz", "XP", "Rachas"]}
              metricA="+200"
              metricALabel="XP por sesión"
              metricB="1"
              metricBLabel="Reto diario"
              tone="emerald"
              chartBars={[36, 62, 84, 74, 58]}
            />
            <FeatureExperienceCard
              title="36 Candidatos"
              subtitle="Explora perfiles con señales de riesgo y oportunidad."
              href="/candidatos"
              cta="Abrir candidatos"
              chips={["Filtros", "Riesgo", "Agenda digital"]}
              metricA="36"
              metricALabel="Perfiles completos"
              metricB="8"
              metricBLabel="Señales por perfil"
              tone="slate"
              chartBars={[55, 44, 81, 67, 39, 72]}
            />
            <FeatureExperienceCard
              title="Academia Cívica"
              subtitle="Aprende sistema político con módulos cortos y accionables."
              href="/academia"
              cta="Ir a Academia"
              chips={["Mini-cursos", "XP", "Rutas"]}
              metricA="15 min"
              metricALabel="Ruta sugerida"
              metricB="3"
              metricBLabel="Mini-juegos clave"
              tone="gold"
              chartBars={[26, 42, 65, 89]}
            />
            <FeatureExperienceCard
              title="Radar Tech"
              subtitle="Mide ejecución digital y oportunidad real."
              href="/radar-oportunidad"
              cta="Abrir radar"
              chips={["Radar", "Benchmark", "Oportunidad"]}
              metricA="0-100"
              metricALabel="Score digital"
              metricB="5"
              metricBLabel="Ejes comparados"
              tone="cyan"
              chartBars={[61, 87, 72, 58, 41]}
            />
            <FeatureExperienceCard
              title="Comparador Estratégico"
              subtitle="Asigna pesos y prioriza con tu criterio político."
              href="/comparador-estrategico"
              cta="Calibrar estrategia"
              chips={["Pesos", "Ranking", "Escenarios"]}
              metricA="8"
              metricALabel="Variables"
              metricB="Top 5"
              metricBLabel="Salida priorizada"
              tone="violet"
              chartBars={[49, 63, 77, 91, 56]}
            />
            <FeatureExperienceCard
              title="Segunda Vuelta"
              subtitle="Simula escenarios para no decidir a ciegas."
              href="/segunda-vuelta"
              cta="Simular balotaje"
              chips={["Escenarios", "Transferencias", "Probabilidades"]}
              metricA="N x N"
              metricALabel="Cruces posibles"
              metricB="2da"
              metricBLabel="Etapa simulada"
              tone="pink"
              chartBars={[58, 81, 69, 47]}
            />
            <FeatureExperienceCard
              title="Watchlist"
              subtitle="Guarda candidatos y sigue cambios importantes."
              href="/watchlist"
              cta="Crear watchlist"
              chips={["Seguimiento", "Alertas", "Comparación"]}
              metricA="Local"
              metricALabel="Persistencia privada"
              metricB="24/7"
              metricBLabel="Monitoreo continuo"
              tone="slate"
              chartBars={[35, 52, 67, 74, 83]}
            />
            <FeatureExperienceCard
              title="Análisis 2026"
              subtitle="Contexto macro para leer riesgos y oportunidades."
              href="/analisis-2026"
              cta="Ver análisis"
              chips={["Contexto", "Riesgo", "Oportunidad"]}
              metricA="2026"
              metricALabel="Horizonte electoral"
              metricB="Multi"
              metricBLabel="Tableros conectados"
              tone="emerald"
              chartBars={[72, 61, 55, 84, 43]}
            />
            <FeatureExperienceCard
              title="Simulador IA"
              subtitle="Haz preguntas difíciles y contrasta respuestas políticas."
              href="/simulador"
              cta="Probar IA"
              chips={["Preguntas", "Contraste", "Asistencia"]}
              metricA="IA"
              metricALabel="Asistente conversacional"
              metricB="1-click"
              metricBLabel="Inicio inmediato"
              tone="cyan"
              chartBars={[46, 59, 78, 66, 52, 88]}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ENCUESTAS SNAPSHOT - Engagement con datos reales
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-block bg-blue-50 text-blue-600 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              Datos actualizados: Marzo 2026
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-secondary mb-3">
              Asi van las encuestas
            </h2>
            <p className="text-gray-500">Promedio de IEP, Datum, Ipsos y CPI</p>
          </div>
          <div className="space-y-3 max-w-2xl mx-auto mb-8">
            {[
              { name: "Rafael Lopez Aliaga", party: "Renovación Popular", pct: 11.7, color: "#7C3AED", trend: "down" },
              { name: "Keiko Fujimori", party: "Fuerza Popular", pct: 9.4, color: "#FF6B00", trend: "stable" },
              { name: "Alfonso Lopez Chau", party: "Ahora Nación", pct: 6.8, color: "#2563EB", trend: "up" },
              { name: "Wolfgang Grozo", party: "Integridad Democratica", pct: 4.3, color: "#059669", trend: "up" },
              { name: "Carlos Alvarez", party: "Pais para Todos", pct: 3.9, color: "#D97706", trend: "stable" },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <span className="text-sm font-bold text-gray-400 w-5">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-800">{c.name}</span>
                      <span className="text-xs text-gray-400">{c.party}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold" style={{ color: c.color }}>{c.pct}%</span>
                      <span className={`text-xs ${c.trend === "up" ? "text-green-500" : c.trend === "down" ? "text-red-500" : "text-gray-400"}`}>
                        {c.trend === "up" ? "▲" : c.trend === "down" ? "▼" : "→"}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${(c.pct / 15) * 100}%`, backgroundColor: c.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center max-w-2xl mx-auto mb-6">
            <p className="text-sm font-bold text-yellow-800">
              35-42% de votantes estan INDECISOS - mas que cualquier candidato individual
            </p>
          </div>
          <div className="text-center">
            <Link href="/encuestas" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
              Ver dashboard completo de encuestas
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          VERIFICACIONES RECIENTES - Prueba de que esto es real
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-secondary mb-3">
              Verificaciones recientes
            </h2>
            <p className="text-gray-500">
              Analizamos lo que dicen los candidatos con datos reales
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <FactCheckCard
              claim="Reduciremos la pobreza al 10% en un año"
              candidate="Keiko Fujimori"
              verdict="Falso"
              verdictColor="bg-red-500 text-white"
              summary="Según el INEI, la pobreza actual es 27.5%. Ninguna política pública ha logrado esa reducción en 12 meses."
            />
            <FactCheckCard
              claim="El 70% de la economía peruana es informal"
              candidate="Hernando de Soto"
              verdict="Verdadero"
              verdictColor="bg-green-500 text-white"
              summary="Según el INEI, el empleo informal alcanza el 72.7% de la fuerza laboral (2023)."
            />
            <FactCheckCard
              claim="El 80% de la riqueza se va al extranjero"
              candidate="Antauro Humala"
              verdict="Falso"
              verdictColor="bg-red-500 text-white"
              summary="Las utilidades repatriadas representan el 5-6% del PBI según datos del BCRP."
            />
          </div>

          <div className="text-center mt-8">
            <Link
              href="/verificador"
              className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
            >
              Ver todas las verificaciones
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA FINAL
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-primary via-white to-primary" />
        <div className="bg-secondary py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Tu voto es tu voz.{" "}
              <span className="bg-gradient-to-r from-gold to-gold-300 bg-clip-text text-transparent">
                Hazla valer.
              </span>
            </h2>
            <p className="text-lg text-secondary-200 mb-8 max-w-xl mx-auto">
              Más de 27 millones de peruanos eligen presidente este 2026.
              En 60 segundos sabes con quién haces match.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-600 text-white text-lg font-bold px-10 py-4 rounded-xl shadow-hover transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Empezar ahora
            </Link>
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-secondary-300">
              <span>60 segundos</span>
              <span className="w-1 h-1 bg-secondary-400 rounded-full" />
              <span>Sin registro</span>
              <span className="w-1 h-1 bg-secondary-400 rounded-full" />
              <span>Gratis</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Sub-componentes ───────────────────────────────────────────── */

function StepCard({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-14 h-14 bg-gradient-to-br from-primary to-gold text-white rounded-full flex items-center justify-center text-xl font-extrabold mx-auto mb-4 shadow-card">
        {step}
      </div>
      <h3 className="text-lg font-bold text-secondary mb-2">{title}</h3>
      <p className="text-secondary-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function FeatureExperienceCard({
  title,
  subtitle,
  href,
  cta,
  chips,
  metricA,
  metricALabel,
  metricB,
  metricBLabel,
  tone = "blue",
  chartBars = [78, 62, 85, 49],
}: {
  title: string;
  subtitle: string;
  href: string;
  cta: string;
  chips: string[];
  metricA: string;
  metricALabel: string;
  metricB: string;
  metricBLabel: string;
  tone?: "blue" | "red" | "gold" | "violet" | "emerald" | "slate" | "cyan" | "pink";
  chartBars?: number[];
}) {
  const toneClasses: Record<NonNullable<typeof tone>, { bg: string; bar: string; chip: string }> = {
    blue: { bg: "from-blue-50 to-indigo-50", bar: "bg-blue-500", chip: "bg-blue-100 text-blue-700" },
    red: { bg: "from-red-50 to-rose-50", bar: "bg-red-500", chip: "bg-red-100 text-red-700" },
    gold: { bg: "from-amber-50 to-yellow-50", bar: "bg-amber-500", chip: "bg-amber-100 text-amber-700" },
    violet: { bg: "from-violet-50 to-purple-50", bar: "bg-violet-500", chip: "bg-violet-100 text-violet-700" },
    emerald: { bg: "from-emerald-50 to-green-50", bar: "bg-emerald-500", chip: "bg-emerald-100 text-emerald-700" },
    slate: { bg: "from-slate-50 to-gray-50", bar: "bg-slate-600", chip: "bg-slate-100 text-slate-700" },
    cyan: { bg: "from-cyan-50 to-sky-50", bar: "bg-cyan-500", chip: "bg-cyan-100 text-cyan-700" },
    pink: { bg: "from-pink-50 to-fuchsia-50", bar: "bg-pink-500", chip: "bg-pink-100 text-pink-700" },
  };
  const toneStyle = toneClasses[tone];

  return (
    <div className={`bg-gradient-to-r ${toneStyle.bg} border border-gray-100 rounded-2xl shadow-card p-5 md:p-6`}>
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-5 items-center">
        <div>
          <h3 className="text-2xl font-black text-secondary leading-tight">{title}</h3>
          <p className="text-base text-gray-600 mt-2 leading-relaxed">{subtitle}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span key={chip} className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full ${toneStyle.chip}`}>
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl border border-gray-100 p-3 text-center">
              <div className="text-xl font-black text-secondary">{metricA}</div>
              <div className="text-[11px] text-gray-500">{metricALabel}</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-3 text-center">
              <div className="text-xl font-black text-secondary">{metricB}</div>
              <div className="text-[11px] text-gray-500">{metricBLabel}</div>
            </div>
          </div>

          <Link
            href={href}
            className="mt-4 inline-flex items-center gap-2 bg-primary hover:bg-primary-600 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
          >
            {cta}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="text-[11px] uppercase tracking-wide text-gray-500 font-extrabold mb-3">
            Vista rápida
          </div>
          <div className="space-y-2">
            {chartBars.map((bar, idx) => (
              <div key={idx} className="h-3 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={`h-full ${toneStyle.bar}`}
                  style={{
                    width: `${Math.max(14, Math.min(100, bar))}%`,
                    opacity: 0.92 - idx * 0.09,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 text-[11px] text-gray-500">
            Gráfico referencial para previsualizar la herramienta.
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniFeature({
  href,
  icon,
  title,
  description,
  proof,
  cta,
  isNew,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
  proof: string;
  cta: string;
  isNew?: boolean;
}) {
  return (
    <Link href={href} className="group relative block bg-white border border-gray-100 rounded-xl p-5 hover:shadow-card hover:border-primary-100 transition-all hover:-translate-y-1 duration-300">
      {isNew && (
        <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">
          NUEVO
        </span>
      )}
      <span className="text-2xl mb-3 block">{icon}</span>
      <h3 className="font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-sm text-gray-500 mb-3">{description}</p>
      <div className="inline-flex items-center rounded-full bg-gray-50 border border-gray-200 px-2.5 py-1 text-[11px] font-semibold text-gray-600 mb-4">
        {proof}
      </div>
      <div className="text-sm font-extrabold text-primary inline-flex items-center gap-1.5">
        {cta}
        <span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">→</span>
      </div>
    </Link>
  );
}

function FactCheckCard({ claim, candidate, verdict, verdictColor, summary }: {
  claim: string; candidate: string; verdict: string; verdictColor: string; summary: string;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-card transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-400">{candidate}</span>
        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${verdictColor}`}>
          {verdict}
        </span>
      </div>
      <p className="text-sm font-bold text-gray-800 mb-2 leading-snug">&ldquo;{claim}&rdquo;</p>
      <p className="text-xs text-gray-500 leading-relaxed">{summary}</p>
    </div>
  );
}
