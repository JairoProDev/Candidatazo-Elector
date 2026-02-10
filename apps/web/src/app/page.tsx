import Link from "next/link";

/* ------------------------------------------------------------------
   Countdown helper – computes days remaining until April 12, 2026.
   Because this is a server component the value is computed at
   request-time (SSR / ISR).
   ------------------------------------------------------------------ */
function daysUntilElection(): number {
  const election = new Date("2026-04-12T00:00:00-05:00"); // Perú time
  const now = new Date();
  const diff = Math.ceil(
    (election.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diff > 0 ? diff : 0;
}

/* ================================================================== */

export default function HomePage() {
  const daysLeft = daysUntilElection();

  return (
    <>
      {/* ============================================================
          HERO SECTION
          ============================================================ */}
      <section className="relative overflow-hidden">
        {/* Background: red gradient fading to white */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 via-white to-white" />
        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-100/40 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-gold-100/50 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Election badge */}
            <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary rounded-full px-5 py-2 text-sm font-semibold mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Elecciones Perú 2026 &mdash; Primera vuelta: 12 de abril
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-secondary leading-tight mb-6 animate-slide-up">
              Elige con{" "}
              <span className="bg-gradient-to-r from-primary via-primary-600 to-gold bg-clip-text text-transparent">
                conocimiento
              </span>
              ,<br className="hidden sm:block" /> no con intuición
            </h1>

            <p className="text-lg sm:text-xl text-secondary-300 mb-10 max-w-2xl mx-auto animate-slide-up">
              Descubre tu perfil político, compara a los 36 candidatos y
              verifica lo que dicen &mdash; con inteligencia artificial y datos
              reales.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
              <Link
                href="/test"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-600 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-card hover:shadow-hover transition-all duration-200 w-full sm:w-auto justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Descubrir mi ADN Politico
              </Link>
              <Link
                href="/candidatos"
                className="inline-flex items-center gap-2 border-2 border-secondary hover:bg-secondary hover:text-white text-secondary text-lg font-bold px-8 py-4 rounded-xl transition-all duration-200 w-full sm:w-auto justify-center"
              >
                Ver los 36 candidatos
              </Link>
            </div>

            {/* Countdown */}
            <div className="mt-12 inline-flex items-center gap-4 bg-white border border-primary-100 rounded-2xl shadow-card px-8 py-4 animate-fade-in">
              <div className="text-center">
                <span className="block text-3xl sm:text-4xl font-extrabold text-primary">
                  {daysLeft}
                </span>
                <span className="text-xs font-medium text-secondary-300 uppercase tracking-wider">
                  dias restantes
                </span>
              </div>
              <div className="w-px h-10 bg-primary-100" />
              <div className="text-left">
                <span className="block text-sm font-bold text-secondary">
                  12 de abril, 2026
                </span>
                <span className="text-xs text-secondary-300">
                  Primera vuelta electoral
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          STATS BAR
          ============================================================ */}
      <section className="bg-secondary py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <StatItem value="27M+" label="votantes" />
            <StatItem value="36" label="candidatos" />
            <StatItem value="5" label="dimensiones" />
            <StatItem value="IA" label="verificadora" />
          </div>
        </div>
      </section>

      {/* ============================================================
          6 FEATURE CARDS
          ============================================================ */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4">
              Todo lo que necesitas para decidir bien
            </h2>
            <p className="text-lg text-secondary-300 max-w-2xl mx-auto">
              Herramientas potentes, imparciales y basadas en datos para que
              tomes la mejor decision electoral.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1 - ADN Test */}
            <FeatureCard
              href="/test"
              iconBg="bg-primary-50"
              iconColor="text-primary"
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              }
              title="ADN Politico"
              description="30 preguntas con contexto peruano real. Analisis en 5 dimensiones: economia, social, ambiente, seguridad e instituciones."
              cta="Hacer el test"
              ctaColor="text-primary"
            />

            {/* 2 - Match Candidatos */}
            <FeatureCard
              href="/candidatos"
              iconBg="bg-gold-50"
              iconColor="text-gold"
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              }
              title="Match Candidatos"
              description="Compara tus posiciones con los 36 candidatos. Entiende donde coincides y donde no, con explicaciones claras."
              cta="Ver candidatos"
              ctaColor="text-gold-600"
            />

            {/* 3 - Verificador */}
            <FeatureCard
              href="/verificador"
              iconBg="bg-green-50"
              iconColor="text-success"
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              }
              title="Verificador de Datos"
              description="Fact-checking con IA de las declaraciones de los candidatos. Fuentes verificables y veredictos transparentes."
              cta="Verificar datos"
              ctaColor="text-success"
            />

            {/* 4 - Simulador IA */}
            <FeatureCard
              href="/simulador"
              iconBg="bg-secondary-50"
              iconColor="text-secondary"
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              }
              title="Simulador IA"
              description="Conversa con versiones IA de los candidatos. Hazles preguntas difíciles y compara sus respuestas en vivo."
              cta="Simular debate"
              ctaColor="text-secondary"
            />

            {/* 5 - Presidente Ideal */}
            <FeatureCard
              href="/presidente-ideal"
              iconBg="bg-primary-50"
              iconColor="text-primary-600"
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              }
              title="Presidente Ideal"
              description="Basado en tu ADN politico, construimos el perfil de tu presidente ideal y lo comparamos con los candidatos reales."
              cta="Descubrir ideal"
              ctaColor="text-primary-600"
            />

            {/* 6 - Predictor Electoral */}
            <FeatureCard
              href="/predictor"
              iconBg="bg-gold-50"
              iconColor="text-gold-600"
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              }
              title="Predictor Electoral"
              description="Proyecciones basadas en datos, encuestas y tendencias. Visualiza escenarios de primera y segunda vuelta."
              cta="Ver predicciones"
              ctaColor="text-gold-600"
            />
          </div>
        </div>
      </section>

      {/* ============================================================
          COMO FUNCIONA - 4 STEPS
          ============================================================ */}
      <section className="py-20 bg-gradient-to-b from-primary-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4">
              Como funciona
            </h2>
            <p className="text-lg text-secondary-300 max-w-2xl mx-auto">
              En 4 pasos simples, toma la decision electoral mas informada de tu
              vida.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <StepCard
              step={1}
              title="Responde el test"
              description="30 preguntas sobre temas reales del Perú. Cada una con contexto para que entiendas de que se trata."
            />
            <StepCard
              step={2}
              title="Descubre tu perfil"
              description="Obten tu ADN politico en 5 dimensiones con visualizaciones claras y tu tribu politica."
            />
            <StepCard
              step={3}
              title="Compara candidatos"
              description="Ve tu match con cada candidato, entiende coincidencias y diferencias con datos reales."
            />
            <StepCard
              step={4}
              title="Verifica y decide"
              description="Usa el verificador de datos y el simulador IA para tomar una decision informada y responsable."
            />
          </div>
        </div>
      </section>

      {/* ============================================================
          LIVE FACT-CHECK PREVIEW
          ============================================================ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4">
              Verificaciones recientes
            </h2>
            <p className="text-lg text-secondary-300 max-w-2xl mx-auto">
              Nuestro verificador con IA analiza las declaraciones de los
              candidatos en tiempo real.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <FactCheckCard
              claim="Reduciremos la pobreza al 10% en un ano"
              candidate="Candidato A"
              verdict="Falso"
              verdictColor="bg-primary text-white"
              summary="Segun el INEI, la pobreza actual es 27.5%. Ninguna politica publica ha logrado una reducción de esa magnitud en 12 meses."
            />
            <FactCheckCard
              claim="El Perú es el pais con mas biodiversidad del mundo"
              candidate="Candidato B"
              verdict="Parcial"
              verdictColor="bg-gold text-white"
              summary="Perú es uno de los 17 paises megadiversos, pero Brasil y Colombia tienen mayor biodiversidad total registrada."
            />
            <FactCheckCard
              claim="La inversion extranjera crecio 15% este ano"
              candidate="Candidato C"
              verdict="Verdadero"
              verdictColor="bg-success text-white"
              summary="Segun ProInversion, la IED crecio 14.8% interanual, confirmando la tendencia positiva del ultimo trimestre."
            />
          </div>

          <div className="text-center mt-10">
            <Link
              href="/verificador"
              className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
            >
              Ver todas las verificaciones
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA BANNER WITH FLAG STRIPE
          ============================================================ */}
      <section className="relative overflow-hidden">
        {/* Perú flag stripe accent at top */}
        <div className="h-2 bg-gradient-to-r from-primary via-white to-primary" />

        <div className="bg-secondary py-20">
          {/* Decorative gold circles */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Tu voto es tu voz.{" "}
              <span className="bg-gradient-to-r from-gold to-gold-300 bg-clip-text text-transparent">
                Hazla valer.
              </span>
            </h2>
            <p className="text-lg text-secondary-200 mb-10 max-w-2xl mx-auto">
              Mas de 27 millones de peruanos eligen presidente este 2026.
              Asegurate de que tu voto refleje lo que realmente piensas.
            </p>
            <Link
              href="/test"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-600 text-white text-lg font-bold px-10 py-4 rounded-xl shadow-hover transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Empezar el Test Ahora
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          SOCIAL PROOF NUMBERS
          ============================================================ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <ProofItem value="30" label="preguntas en el test" />
            <ProofItem value="5 min" label="para completarlo" />
            <ProofItem value="100%" label="gratuito y sin registro" />
            <ProofItem value="0" label="afiliación politica" />
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------
   SUB-COMPONENTS (server-compatible, no "use client" needed)
   ------------------------------------------------------------------ */

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <span className="block text-2xl sm:text-3xl font-extrabold text-white">
        {value}
      </span>
      <span className="text-sm text-secondary-200 font-medium uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

function FeatureCard({
  href,
  iconBg,
  iconColor,
  icon,
  title,
  description,
  cta,
  ctaColor,
}: {
  href: string;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
  ctaColor: string;
}) {
  return (
    <Link
      href={href}
      className="group block bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-hover hover:border-primary-100 transition-all duration-300"
    >
      <div
        className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
      >
        <svg
          className={`w-7 h-7 ${iconColor}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {icon}
        </svg>
      </div>
      <h3 className="text-xl font-bold text-secondary mb-2">{title}</h3>
      <p className="text-secondary-300 leading-relaxed mb-4 text-sm">
        {description}
      </p>
      <div
        className={`flex items-center gap-2 ${ctaColor} font-semibold text-sm group-hover:gap-3 transition-all`}
      >
        {cta}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
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
      <div className="w-14 h-14 bg-gradient-to-br from-primary to-gold text-white rounded-full flex items-center justify-center text-xl font-extrabold mx-auto mb-4 shadow-card">
        {step}
      </div>
      <h3 className="text-lg font-bold text-secondary mb-2">{title}</h3>
      <p className="text-secondary-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function FactCheckCard({
  claim,
  candidate,
  verdict,
  verdictColor,
  summary,
}: {
  claim: string;
  candidate: string;
  verdict: string;
  verdictColor: string;
  summary: string;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-card transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-secondary-300 uppercase tracking-wider">
          {candidate}
        </span>
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${verdictColor}`}
        >
          {verdict}
        </span>
      </div>
      <p className="text-secondary font-bold text-sm mb-3 leading-snug">
        &ldquo;{claim}&rdquo;
      </p>
      <p className="text-secondary-300 text-xs leading-relaxed">{summary}</p>
    </div>
  );
}

function ProofItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <span className="block text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
        {value}
      </span>
      <span className="text-sm text-secondary-300 font-medium mt-1 block">
        {label}
      </span>
    </div>
  );
}
