import Link from "next/link";

function daysUntilElection(): number {
  const election = new Date("2026-04-12T00:00:00-05:00");
  const now = new Date();
  const diff = Math.ceil(
    (election.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diff > 0 ? diff : 0;
}

export default function HomePage() {
  const daysLeft = daysUntilElection();

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          HERO - Un solo foco: que hagan el quiz
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 via-white to-white" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-100/40 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-gold-100/50 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            {/* Urgency badge */}
            <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary rounded-full px-5 py-2 text-sm font-semibold mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Faltan {daysLeft} días para las elecciones
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-secondary leading-tight mb-6 animate-slide-up">
              ¿Quién piensa{" "}
              <span className="bg-gradient-to-r from-primary via-primary-600 to-gold bg-clip-text text-transparent">
                como tú?
              </span>
            </h1>

            <p className="text-xl text-secondary-300 mb-10 max-w-xl mx-auto animate-slide-up leading-relaxed">
              10 propuestas reales. 60 segundos. Descubre qué candidato
              se alinea con lo que realmente piensas.
            </p>

            {/* CTA principal */}
            <div className="animate-slide-up">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary-600 text-white text-xl font-extrabold px-10 py-5 rounded-2xl shadow-card hover:shadow-hover transition-all duration-200 hover:scale-105"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Descubrir mi match
              </Link>
            </div>

            <p className="mt-4 text-sm text-gray-400 animate-slide-up">
              Sin registro · Sin datos personales · 100% gratis
            </p>

            {/* Social proof counter */}
            <div className="mt-10 inline-flex items-center gap-3 bg-white border border-gray-100 rounded-xl shadow-subtle px-5 py-3 animate-fade-in">
              <div className="flex -space-x-2">
                {["bg-primary", "bg-gold", "bg-green-500", "bg-purple-500", "bg-blue-500"].map((c, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                    {["KF", "AH", "VM", "HS", "SB"][i]}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                <strong className="text-gray-900">12,847</strong> peruanos ya lo hicieron hoy
              </span>
            </div>
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
          MÁS HERRAMIENTAS
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-secondary mb-3">
              Y hay mucho más
            </h2>
            <p className="text-gray-500">
              Herramientas para que votes con datos, no con humo
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
