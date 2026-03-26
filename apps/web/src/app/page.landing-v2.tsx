import Link from "next/link";
import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/landing/ScrollReveal";

function Pill({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-gold-100 bg-gold-50 px-4 py-1 text-xs font-extrabold uppercase tracking-wide text-gold">
      <span className="inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
      {children}
    </div>
  );
}

function GoldMockPanel({
  title,
  subtitle,
  bullets,
}: {
  title: string;
  subtitle: string;
  bullets: string[];
}) {
  return (
    <div className="rounded-[2rem] border border-gold-100 bg-white/70 backdrop-blur p-5 shadow-card overflow-hidden relative">
      <div className="absolute -top-20 -right-24 w-56 h-56 rounded-full bg-gold-100/50 blur-2xl animate-pulse" />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-extrabold text-gray-900 truncate">{title}</div>
            <div className="text-xs text-gray-500 mt-1 leading-relaxed">{subtitle}</div>
          </div>
          <div className="shrink-0 rounded-2xl border border-gold-100 bg-gold-50 px-3 py-2 text-center">
            <div className="text-[11px] font-extrabold text-gold uppercase tracking-wide">Premium</div>
            <div className="text-lg font-extrabold text-secondary mt-1">Oro</div>
          </div>
        </div>
        <div className="mt-4 grid gap-2">
          {bullets.map((b) => (
            <div key={b} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-0.5 inline-flex w-4 h-4 rounded-full bg-primary/10 border border-primary-100" aria-hidden="true" />
              <span>{b}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 h-px bg-gradient-to-r from-gold-200/60 via-primary/10 to-transparent" />
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <span className="inline-flex items-center justify-center rounded-full w-7 h-7 border border-gold-100 bg-white">
            ✦
          </span>
          <span>CTA incluido: abre la herramienta y pruébala real.</span>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[86vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-50 via-white to-gold-50" />
        <div className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-primary-100/20 blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full bg-gold-100/40 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-[360px] h-[360px] rounded-full bg-secondary-50/20 blur-3xl" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal className="max-w-xl">
              <Pill>Elecciones Perú 2026 · Estrategia premium</Pill>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-secondary leading-[1.04]">
                Decisiones con{" "}
                <span className="bg-gradient-to-r from-gold via-primary to-primary-600 bg-clip-text text-transparent">
                  oro
                </span>
                : datos, señales y acción.
              </h1>

              <p className="mt-5 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
                Tu kit completo: <strong className="text-gray-900">Mi Match</strong>, segunda vuelta, transferencia,
                comparadores, radar tech, verificador, academia y más.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/quiz"
                  className="group inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-600 text-white font-extrabold py-3.5 px-7 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Hacer Mi Match <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/segunda-vuelta"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-extrabold py-3.5 px-7 rounded-xl border border-gray-200 transition-all duration-300 hover:border-gold-200 hover:text-primary"
                >
                  Ver estrategia <span aria-hidden="true">↗</span>
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 text-sm">
                {[
                  { v: "36", l: "candidatos" },
                  { v: "2ª vuelta", l: "simulación" },
                  { v: "XP", l: "gamificación" },
                ].map((x) => (
                  <div key={x.l} className="rounded-2xl border border-gray-100 bg-white/70 p-4">
                    <div className="text-xl font-extrabold text-secondary">{x.v}</div>
                    <div className="text-xs text-gray-500 mt-1 font-semibold">{x.l}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={120}>
              <GoldMockPanel
                title="Tu tablero en oro"
                subtitle="No te mostramos “cosas”. Te mostramos decisiones."
                bullets={[
                  "Señales y heurísticas explicadas (no caja negra).",
                  "Badges para riesgo / tech / transferencia.",
                  "CTAs directos a cada herramienta real.",
                ]}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mi Match */}
      <section className="py-16 bg-gradient-to-b from-white to-gold-50/20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal>
              <div>
                <Pill>Mi Match</Pill>
                <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                  Tu ADN político → candidaturas con señales claras.
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
                  Responde el quiz rápido, recibe tu match y obtén una explicación que puedes usar para debatir y decidir.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/quiz"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-5 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Ir al quiz <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/comparador-estrategico"
                    className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-extrabold py-2.5 px-5 rounded-xl border border-gold-100 hover:border-gold-200 hover:text-primary transition-colors"
                  >
                    Ver comparador <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={120}>
              <GoldMockPanel
                title="Match · Vista rápida"
                subtitle="Una recomendación que se entiende y se puede auditar."
                bullets={[
                  "10 propuestas reales, sin ruido.",
                  "Compatibilidad con explicación por dimensión.",
                  "CTA a share y siguientes herramientas.",
                ]}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Candidatos */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal>
              <div>
                <Pill>Candidatos 2026</Pill>
                <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                  Filtra por señales: antivoto, veracidad, agenda digital y riesgo.
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
                  Encuentra el partido y abre el perfil cuando ya tengas criterio. Con búsqueda en tiempo real y orden inteligente.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/candidatos"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-5 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Abrir tablero <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/analisis-2026"
                    className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-extrabold py-2.5 px-5 rounded-xl border border-gold-100 hover:border-gold-200 hover:text-primary transition-colors"
                  >
                    Leer contexto 2026 <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={120}>
              <GoldMockPanel
                title="Buscar · Ordenar · Decidir"
                subtitle="Tu lista se vuelve estrategia."
                bullets={[
                  "Búsqueda por nombre o partido (en vivo).",
                  "Orden por antivoto / agenda digital.",
                  "Toggle de enumeración cuando lo necesitas.",
                ]}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Cédula */}
      <section className="py-16 bg-gradient-to-b from-white to-gold-50/20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal>
              <div>
                <Pill>Cédula</Pill>
                <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                  Practica la regla que te protege: el voto nulo.
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
                  Comprende cómo se valida tu voto en presidencial. Entrena la cédula y toma decisiones con seguridad.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/cedula"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-5 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Abrir simulador <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={120}>
              <GoldMockPanel
                title="Prevención de errores"
                subtitle="Tu decisión cuenta exactamente como planeas."
                bullets={[
                  "Detecta combinaciones que anulan tu intención.",
                  "Vista clara de reglas y efecto en tu voto.",
                  "CTA directo al simulador completo.",
                ]}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Comparador */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal>
              <div>
                <Pill>Comparador</Pill>
                <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                  Compara dos candidatos con pesos por dimensión.
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
                  Ajusta el peso de economía/social/seguridad e institucional y mira quién gana con tu narrativa.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/comparador"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-5 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Abrir comparador <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/quiz"
                    className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-extrabold py-2.5 px-5 rounded-xl border border-gold-100 hover:border-gold-200 hover:text-primary transition-colors"
                  >
                    Conectar con tu match <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={120}>
              <GoldMockPanel
                title="Tu narrativa · Tu ranking"
                subtitle="Transparencia: qué pesa y por qué."
                bullets={[
                  "Pesos por dimensión con resultado visible.",
                  "Comparación rápida y entendible.",
                  "CTA al comparador completo.",
                ]}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Comparador estratégico */}
      <section className="py-16 bg-gradient-to-b from-white to-gold-50/20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal>
              <div>
                <Pill>Comparador estratégico</Pill>
                <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                  Seguridad, digital, antivoto y riesgo: pon el peso exacto.
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
                  Tu ranking cambia cuando cambias tu narrativa. El módulo recalcula y muestra qué candidatos te encajan mejor.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/comparador-estrategico"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-5 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Abrir comparador <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={120}>
              <GoldMockPanel
                title="Pesos · Ranking · Lectura"
                subtitle="Estrategia que se ajusta a tu visión."
                bullets={[
                  "Sliders/pesos por dimensiones estratégicas.",
                  "Comparación con top recomendado y ranking auditado.",
                  "CTA directo al módulo completo.",
                ]}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Segunda vuelta */}
      <section className="py-16 bg-gradient-to-b from-white to-gold-50/20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal>
              <div>
                <Pill>Segunda vuelta</Pill>
                <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                  Simula balotaje con pivot, continuidad y probabilidades.
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
                  Un módulo para entender escenarios. Otro para descubrir rivales peligrosos y promisorios.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/segunda-vuelta"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-5 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Abrir módulo <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={120}>
              <GoldMockPanel
                title="Pivot · Rival · Lectura"
                subtitle="Probabilidades heurísticas, explicadas."
                bullets={[
                  "Simulador: pivot vs rival.",
                  "Matriz: top rivales en un vistazo.",
                  "CTA al módulo completo con todos los paneles.",
                ]}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Transferencia */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal>
              <div>
                <Pill>Transferencia</Pill>
                <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                  Heatmap + tabla con badges: señales para transferencia de votos.
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
                  Identifica “Top transferencia”, “Riesgo alto” y “Choque alto” con umbrales configurables.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/segunda-vuelta"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-5 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Ver heatmap <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={120}>
              <GoldMockPanel
                title="Badges que orientan"
                subtitle="Más señal, menos interpretación manual."
                bullets={[
                  "Umbrales para que aparezcan badges relevantes.",
                  "Heatmap visual + tabla auditable.",
                  "CTA al panel real dentro de segunda vuelta.",
                ]}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Radar tech */}
      <section className="py-16 bg-gradient-to-b from-white to-gold-50/20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal>
              <div>
                <Pill>Radar Tech</Pill>
                <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                  Agenda digital + viabilidad: quién ejecuta de verdad.
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
                  Radar con ejes normalizados y recomendación para narrativa tech con credibilidad.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/radar-oportunidad"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-5 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Abrir radar <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={120}>
              <GoldMockPanel
                title="Ejes · señales · recomendación"
                subtitle="Lo digital bien hecho se nota."
                bullets={[
                  "Radar por candidato (Digital / Veracidad / Seguridad / Institucional / Antivoto).",
                  "Top lista por agenda digital.",
                  "CTA al radar real.",
                ]}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Watchlist */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal>
              <div>
                <Pill>Watchlist</Pill>
                <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                  Guarda candidatos y recibe alertas cuando cambie el tablero.
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
                  Monitoreo local y snapshot: cambios en riesgo legal, estado de candidatura, agenda digital y antivoto.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/watchlist"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-5 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Crear watchlist <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={120}>
              <GoldMockPanel
                title="Alertas con intención"
                subtitle="No es ruido: son cambios que importan."
                bullets={[
                  "Alertas basadas en snapshots (localStorage).",
                  "Resumen del portafolio cuando lo necesitas.",
                  "CTA al panel real.",
                ]}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Verificador */}
      <section className="py-16 bg-gradient-to-b from-white to-gold-50/20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal>
              <div>
                <Pill>Verificador</Pill>
                <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                  Convierte afirmaciones en evidencia con veredicto y fuentes.
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
                  Fact-check con explicación, fuentes y nivel de confianza. Perfecto para auditar antes de compartir.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/verificador"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-5 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Abrir verificador <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={120}>
              <GoldMockPanel
                title="Veredicto con contexto"
                subtitle="Menos opiniones, más trazabilidad."
                bullets={[
                  "Veredicto (True / Half / False / No verificable).",
                  "Fuentes abiertas para auditar.",
                  "CTA al módulo real.",
                ]}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Academia */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal>
              <div>
                <Pill>Academia Cívica</Pill>
                <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                  Aprende política jugando: cursos, lecciones y XP.
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
                  Rutas de aprendizaje, mini-quizzes, examen final y sistema de niveles. El conocimiento se vuelve hábito.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/academia"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-5 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Ver cursos <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={120}>
              <GoldMockPanel
                title="XP que acompaña"
                subtitle="No estudies: completa y sube nivel."
                bullets={[
                  "Cursos con lecciones y evaluaciones.",
                  "XP para motivación sostenida.",
                  "CTA al sistema real en /academia.",
                ]}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Planes */}
      <section className="py-16 bg-gradient-to-b from-white to-gold-50/20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal>
              <div>
                <Pill>Planes de gobierno</Pill>
                <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                  PDFs por partido con enfoque por temas.
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
                  Filtra por temas y abre el plan en modal. Con esto pasas de “promesa” a “propuesta”.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/planes"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-5 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Abrir planes <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={120}>
              <GoldMockPanel
                title="Propuestas en serio"
                subtitle="Ordena el caos en documentos accionables."
                bullets={[
                  "Filtro por temas.",
                  "PDF viewer con modal premium.",
                  "CTA al repositorio real en /planes.",
                ]}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Encuestas */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal>
              <div>
                <Pill>Encuestas</Pill>
                <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                  Tendencias que mueven decisiones (no solo titulares).
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
                  Selecciona candidato y mira el movimiento mensual. Úsalo para entender por qué tu estrategia debe ajustarse.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/encuestas"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-5 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Abrir encuestas <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={120}>
              <GoldMockPanel
                title="Movimiento medible"
                subtitle="3 meses: claridad para segunda vuelta."
                bullets={[
                  "Comparación por candidato.",
                  "Tendencia y variación mes a mes.",
                  "CTA al módulo real en /encuestas.",
                ]}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Desafio */}
      <section className="py-16 bg-gradient-to-b from-white to-gold-50/20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal>
              <div>
                <Pill>Desafío diario</Pill>
                <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                  Mini-juegos para aprender rápido y acumular XP.
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
                  Responde preguntas, sube tu racha y convierte conocimiento en motivación real.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/desafio"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-5 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Jugar desafío <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={120}>
              <GoldMockPanel
                title="Racha + XP"
                subtitle="Aprende sin fricción."
                bullets={[
                  "Juego rápido y claro.",
                  "Racha que premia consistencia.",
                  "CTA al módulo real en /desafio.",
                ]}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Analisis */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal>
              <div>
                <Pill>Análisis 2026</Pill>
                <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                  El tablero mental: fragmentación, antivoto, continuidad y riesgo.
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
                  Busca dentro del tablero y obtén el contexto con un UX pensado para lectura profunda y decisiones.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/analisis-2026"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-5 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Abrir análisis <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={120}>
              <GoldMockPanel
                title="Estrategia primero"
                subtitle="Lee para decidir, no para opinar."
                bullets={[
                  "Tablero con bloques y búsqueda interna.",
                  "Contexto para entender el caos electoral.",
                  "CTA al análisis completo en /analisis-2026.",
                ]}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-gold-100 bg-gradient-to-br from-primary-50 via-white to-gold-50 p-7 md:p-10 shadow-card">
              <div className="absolute -top-24 -right-20 w-60 h-60 rounded-full bg-primary-100/40 blur-2xl" />
              <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-gold-100/50 blur-2xl" />
              <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-gold-50 border border-gold-100 text-gold rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wide">
                    Tu estrategia, en oro
                  </div>
                  <h3 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                    Haz que el caos electoral se convierta en decisiones con señal.
                  </h3>
                  <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
                    Empieza por <strong>Mi Match</strong> y luego conecta segunda vuelta + transferencia + verificación para cerrar el ciclo.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/quiz"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-3.5 px-7 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Empezar ahora <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/candidatos"
                    className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-extrabold py-3.5 px-7 rounded-xl border border-gold-100 hover:border-gold-200 hover:text-primary transition-colors"
                  >
                    Explorar candidatos <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

