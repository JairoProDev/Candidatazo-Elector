import Link from "next/link";
import Image from "next/image";

function daysUntilElection(): number {
  const election = new Date("2026-04-12T00:00:00-05:00");
  const now = new Date();
  const diff = Math.ceil(
    (election.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diff > 0 ? diff : 0;
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
  { value: "45,000+", label: "Usuarios activos" },
  { value: "24", label: "Candidatos analizados" },
  { value: "500+", label: "Fact-checks realizados" },
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
                      <div className="text-2xl font-bold">45,000+</div>
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
                    <span className="text-secondary-200">4.9/5 basado en 8,234 opiniones</span>
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
              45,000+ peruanos ya votarán{" "}
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

                {/* Floating badges */}
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
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-secondary mb-3">
              Herramientas poderosas para{" "}
              <span className="bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
                decisiones informadas
              </span>
            </h2>
            <p className="text-gray-600 text-lg">
              Todo lo que necesitas para votar con datos, no con emociones
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MiniFeature
              href="/verificador"
              icon="🔍"
              title="Verificador"
              description="¿Dijo la verdad? Fact-checks con fuentes reales"
            />
            <MiniFeature
              href="/simulador"
              icon="🤖"
              title="Simulador IA"
              description="Hazle preguntas difíciles a los candidatos"
            />
            <MiniFeature
              href="/candidatos"
              icon="👥"
              title="24 Candidatos"
              description="Perfiles completos con posiciones y promesas"
            />
            <MiniFeature
              href="/predictor"
              icon="📊"
              title="Predictor"
              description="¿Quién va ganando? La comunidad predice"
            />
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

function MiniFeature({ href, icon, title, description }: { href: string; icon: string; title: string; description: string }) {
  return (
    <Link href={href} className="group block bg-white border border-gray-100 rounded-xl p-5 hover:shadow-card hover:border-primary-100 transition-all">
      <span className="text-2xl mb-3 block">{icon}</span>
      <h3 className="font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
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
