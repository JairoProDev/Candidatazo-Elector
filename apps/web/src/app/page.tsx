import Link from "next/link";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { LandingPriorityGame } from "@/components/landing/LandingPriorityGame";
import { CandidatesPreviewMini } from "@/components/landing/CandidatesPreviewMini";
import { CedulaPreviewMini } from "@/components/landing/CedulaPreviewMini";
import { ComparadorPreviewMini } from "@/components/landing/ComparadorPreviewMini";
import { VerificadorPreviewMini } from "@/components/landing/VerificadorPreviewMini";
import { AcademiaPreviewMini } from "@/components/landing/AcademiaPreviewMini";
import { PlanesPreviewMini } from "@/components/landing/PlanesPreviewMini";
import { EncuestasPreviewMini } from "@/components/landing/EncuestasPreviewMini";
import { DesafioPreviewMini } from "@/components/landing/DesafioPreviewMini";
import { AnalisisPreviewMini } from "@/components/landing/AnalisisPreviewMini";

import SecondRoundSimulatorPanel from "@/components/strategy/SecondRoundSimulatorPanel";
import SecondRoundMatrixPanel from "@/components/strategy/SecondRoundMatrixPanel";
import TransferCompatibilityPanel from "@/components/strategy/TransferCompatibilityPanel";
import StrategicComparatorPanel from "@/components/strategy/StrategicComparatorPanel";
import DigitalOpportunityRadar from "@/components/strategy/DigitalOpportunityRadar";
import WatchlistPanel from "@/components/strategy/WatchlistPanel";

export default function HomePage() {
  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[86vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-gold-50" />
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-primary-100/30 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full bg-gold-100/40 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-[340px] h-[340px] rounded-full bg-secondary-50/20 blur-3xl" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal className="max-w-xl">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary-100 rounded-full px-5 py-2 text-sm font-semibold shadow-subtle">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
                Plataforma 2026: decisiones con datos, no con intuición.
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-secondary leading-[1.05]">
                Vota con{" "}
                <span className="bg-gradient-to-r from-primary via-primary-600 to-gold bg-clip-text text-transparent">
                  conocimiento
                </span>
                .
              </h1>

              <p className="mt-5 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
                Mi Match + segunda vuelta + transferencia + agenda digital + verificación.
                Una experiencia gamificada para navegar tu estrategia electoral.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/quiz"
                  className="group inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-600 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Jugar “Mi Match” <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/candidatos"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-extrabold py-3.5 px-6 rounded-xl border border-gray-200 transition-all duration-300"
                >
                  Explorar candidatos <span aria-hidden="true">↗</span>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 text-sm text-gray-600">
                {[
                  { t: "Datos con heurística", d: "Explica y muestra señales" },
                  { t: "Interactividad real", d: "Demos dentro de la landing" },
                  { t: "Privacidad primero", d: "Watchlist local en tu navegador" },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="rounded-2xl border border-gray-100 bg-white/70 px-4 py-3"
                  >
                    <div className="font-extrabold text-gray-900">{x.t}</div>
                    <div className="text-xs text-gray-500 mt-1">{x.d}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={120} className="pt-2">
              <LandingPriorityGame />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Candidatos */}
      <section id="candidatos" className="py-16 bg-gradient-to-b from-white to-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal>
              <div>
                <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wide">
                  Candidatos 2026
                </div>
                <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                  Busca, filtra y descubre las <span className="text-primary">señales</span> detrás de cada partido.
                </h2>
                <p className="mt-4 text-gray-600 text-base leading-relaxed max-w-xl">
                  Entra por nombre o partido, ordena por antivoto/digital y abre perfiles completos con un clic.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/candidatos"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-4 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Abrir tablero completo <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/analisis-2026"
                    className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-extrabold py-2.5 px-4 rounded-xl border border-gray-200 hover:border-primary-200 hover:text-primary transition-colors"
                  >
                    Ver contexto 2026 <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={120}>
              <CandidatesPreviewMini />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Cédula */}
      <section id="cedula" className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal>
              <div>
                <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wide">
                  Practica tu voto
                </div>
                <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                  Simula tu cédula y evita errores que cuestan tu voto.
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed max-w-xl">
                  Demo interactiva de la regla crítica: si marcas más de un candidato presidencial, el voto es nulo.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/cedula"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-4 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Abrir simulador completo <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={120}>
              <CedulaPreviewMini />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Comparador */}
      <section id="comparador" className="py-16 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal>
              <div>
                <div className="inline-flex items-center gap-2 bg-secondary-50 border border-secondary-100 text-secondary rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wide">
                  Comparador
                </div>
                <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                  Compara dos candidatos y decide por dimensiones que importan.
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed max-w-xl">
                  Ajusta prioridades por economía/social/seguridad e institucional y mira la ventaja relativa.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/comparador"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-4 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Abrir comparador completo <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={120}>
              <ComparadorPreviewMini />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Segunda Vuelta - Simulador */}
      <section id="segunda-vuelta-sim" className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-secondary-50 border border-secondary-100 text-secondary rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wide">
                Segunda vuelta
              </div>
              <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                Simula un balotaje y entiende quién tiene más probabilidad de ganar.
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl">
                Selecciona pivot y rival, ajusta continuidad y pesos. La probabilidad se actualiza con el modelo heurístico.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={120}>
            <SecondRoundSimulatorPanel />
          </ScrollReveal>
        </div>
      </section>

      {/* Matriz - Oportunidad */}
      <section id="segunda-vuelta-matriz" className="py-16 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wide">
                Matriz de oportunidad
              </div>
              <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                Pivot vs rivales: encuentra “los escenarios” más peligrosos y más prometedores.
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl">
                Selecciona pivot, preset de pesos y continuidad. Luego usa el click para enviar rivales al simulador.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={120}>
            <SecondRoundMatrixPanel />
          </ScrollReveal>
        </div>
      </section>

      {/* Transferencia */}
      <section id="transferencia" className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wide">
                Transferencia 2026
              </div>
              <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                Heatmap + tabla con badges: señala quién encaja como transferencia.
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl">
                Usa pivot, continuidad y umbrales para que “Top transferencia”, “Riesgo alto” y “Choque alto” aparezcan como señales.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={120}>
            <TransferCompatibilityPanel />
          </ScrollReveal>
        </div>
      </section>

      {/* Comparador Estratégico */}
      <section id="comparador-estrategico" className="py-16 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-secondary-50 border border-secondary-100 text-secondary rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wide">
                Comparador estratégico
              </div>
              <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                Pon pesos a tu narrativa: seguridad, antifragilidad, digital, antivoto y riesgo.
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl">
                El panel recalcula rankings, muestra top recomendado y habilita comparación bidireccional.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={120}>
            <StrategicComparatorPanel />
          </ScrollReveal>
        </div>
      </section>

      {/* Radar Tech */}
      <section id="radar" className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wide">
                Radar Tech
              </div>
              <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                Agenda digital + viabilidad: quién puede ejecutar y comunicar con tecnología.
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl">
                Selecciona candidato, observa ejes normalizados y cruza con credibilidad y “mejor antivoto”.
              </p>
              <div className="mt-6">
                <Link
                  href="/radar-oportunidad"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-4 rounded-xl hover:bg-primary-600 transition-colors"
                >
                  Abrir radar completo <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={120}>
            <DigitalOpportunityRadar />
          </ScrollReveal>
        </div>
      </section>

      {/* Watchlist */}
      <section id="watchlist" className="py-16 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wide">
                Watchlist
              </div>
              <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                Guarda candidatos y recibe alertas por cambios en riesgo y agenda.
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl">
                Monitoreo local: si cambia `legalRisk`, `candidacyStatus`, `digitalAgendaScore` o `antiVote`, aparece una alerta.
              </p>
              <div className="mt-6">
                <Link
                  href="/watchlist"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-4 rounded-xl hover:bg-primary-600 transition-colors"
                >
                  Abrir watchlist completo <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={120}>
            <div className="max-h-[680px] overflow-auto">
              <WatchlistPanel />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Verificador */}
      <section id="verificador" className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-secondary-50 border border-secondary-100 text-secondary rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wide">
                Verificador
              </div>
              <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                Veredicto con fuentes: convierte “ruido” en evidencia.
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl">
                Selecciona una afirmación y mira el veredicto y la explicación. Expande fuentes cuando quieras auditar.
              </p>
              <div className="mt-6">
                <Link
                  href="/verificador"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-4 rounded-xl hover:bg-primary-600 transition-colors"
                >
                  Abrir verificador completo <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={120}>
            <VerificadorPreviewMini />
          </ScrollReveal>
        </div>
      </section>

      {/* Academia */}
      <section id="academia" className="py-16 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wide">
                Academia Cívica
              </div>
              <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                Aprende política jugando: XP, rutas y mini-quizzes.
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl">
                En esta preview elige un curso, mira tags y ruta de aprendizaje para empezar con intención.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={120}>
            <AcademiaPreviewMini />
          </ScrollReveal>
        </div>
      </section>

      {/* Planes */}
      <section id="planes" className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wide">
                Planes de gobierno
              </div>
              <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                Filtra por temas y encuentra qué propuestas se alinean con tu foco.
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl">
                Un vistazo interactivo antes de abrir los PDFs completos en /planes.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delayMs={120}>
            <PlanesPreviewMini />
          </ScrollReveal>
        </div>
      </section>

      {/* Encuestas */}
      <section id="encuestas" className="py-16 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-secondary-50 border border-secondary-100 text-secondary rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wide">
                Encuestas
              </div>
              <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                Tendencias en movimiento: quién sube, quién cae y por qué importa para la segunda vuelta.
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl">
                Selecciona candidato y mira el movimiento en 3 meses.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delayMs={120}>
            <EncuestasPreviewMini />
          </ScrollReveal>
        </div>
      </section>

      {/* Desafío */}
      <section id="desafio" className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wide">
                Desafío diario
              </div>
              <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                Micro-juegos que te dan intuición real: responde y sube tu racha.
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl">
                Demo: responde una mini ruta de preguntas con XP.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delayMs={120}>
            <DesafioPreviewMini />
          </ScrollReveal>
        </div>
      </section>

      {/* Analisis 2026 */}
      <section id="analisis-2026" className="py-16 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-secondary-50 border border-secondary-100 text-secondary rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wide">
                Análisis 2026
              </div>
              <h2 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                Tablero de ajedrez: fragmentación, antivoto, continuidad y riesgo.
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl">
                Busca dentro del tablero y abre el análisis completo cuando estés listo.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delayMs={120}>
            <AnalisisPreviewMini />
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-gradient-to-br from-primary-50 via-white to-gold-50 p-7 md:p-10">
              <div className="absolute -top-24 -right-20 w-56 h-56 rounded-full bg-primary-100/40 blur-2xl" />
              <div className="absolute -bottom-24 -left-24 w-56 h-56 rounded-full bg-gold-100/40 blur-2xl" />

              <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wide">
                    Listo para tu estrategia
                  </div>
                  <h3 className="mt-5 text-3xl md:text-4xl font-black text-secondary leading-tight">
                    Abre tu herramienta favorita y haz que el caos se vuelva decisión.
                  </h3>
                  <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
                    Si quieres empezar rápido: usa “Mi Match”, luego ve a segunda vuelta y cierra con transferencia.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/quiz"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-3.5 px-6 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Mi Match <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/segunda-vuelta"
                    className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-extrabold py-3.5 px-6 rounded-xl border border-gray-200 hover:border-primary-200 hover:text-primary transition-colors"
                  >
                    Segunda vuelta <span aria-hidden="true">↗</span>
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

