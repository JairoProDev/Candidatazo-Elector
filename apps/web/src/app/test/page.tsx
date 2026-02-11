"use client";

import { useState, useCallback } from "react";
import { useDnaStore } from "@/lib/store";
import { DIMENSION_CONFIG } from "@candidatazo/types";
import type { Dimension } from "@candidatazo/types";
import { ProgressBar } from "@/components/ui/ProgressBar";
import Link from "next/link";

// ADN Questions - hardcoded for offline-first reliability
const DNA_QUESTIONS: {
  id: string;
  text: string;
  description: string;
  dimension: Dimension;
  context: string;
  options: { value: number; label: string }[];
}[] = [
    // ECONOMIC (6 questions)
    {
      id: "eco_1",
      text: "El Estado debería controlar los precios de productos basicos como el gas y los alimentos?",
      description: "Control de precios vs libre mercado",
      dimension: "ECONOMIC",
      context: "En Perú, el precio del balon de gas fluctua entre S/40-60 y afecta directamente a familias de bajos recursos.",
      options: [
        { value: -100, label: "Si, el Estado debe fijar precios" },
        { value: -50, label: "Solo en productos esenciales" },
        { value: 0, label: "No estoy seguro" },
        { value: 50, label: "Prefiero incentivos al mercado" },
        { value: 100, label: "El mercado debe regularse solo" },
      ],
    },
    {
      id: "eco_2",
      text: "Que debería hacer el Estado con las empresas publicas como Petroperu?",
      description: "Privatización vs empresa estatal",
      dimension: "ECONOMIC",
      context: "Petroperu acumula perdidas por miles de millones y ha requerido rescates estatales, pero provee combustible a zonas alejadas.",
      options: [
        { value: -100, label: "Mantenerla publica y fortalecerla" },
        { value: -50, label: "Mantenerla pero con reforma profunda" },
        { value: 0, label: "No tengo una posición clara" },
        { value: 50, label: "Privatizar parcialmente" },
        { value: 100, label: "Privatizar completamente" },
      ],
    },
    {
      id: "eco_3",
      text: "Se deberían aumentar los impuestos a los mas ricos para financiar programas sociales?",
      description: "Politica tributaria",
      dimension: "ECONOMIC",
      context: "Perú recauda solo 16.8% del PBI en impuestos, uno de los mas bajos de Latinoamerica. La evasion es alta.",
      options: [
        { value: -100, label: "Si, impuestos mucho mas altos a ricos" },
        { value: -50, label: "Aumentar moderadamente y combatir evasion" },
        { value: 0, label: "Mantener como esta" },
        { value: 50, label: "Reducir impuestos para fomentar inversion" },
        { value: 100, label: "Reducir impuestos drasticamente" },
      ],
    },
    {
      id: "eco_4",
      text: "El salario minimo debería aumentar significativamente?",
      description: "Politica salarial",
      dimension: "ECONOMIC",
      context: "El salario minimo en Perú es S/1,025. El 70% de trabajadores son informales y no les aplica.",
      options: [
        { value: -100, label: "Si, a S/1,500 o mas" },
        { value: -50, label: "Un aumento moderado" },
        { value: 0, label: "Depende de la economia" },
        { value: 50, label: "Mejor formalizar antes de subir" },
        { value: 100, label: "No, el mercado debe definir salarios" },
      ],
    },
    {
      id: "eco_5",
      text: "Que opinas del libre comercio y los tratados como el TLC?",
      description: "Apertura comercial",
      dimension: "ECONOMIC",
      context: "Perú tiene TLCs con EE.UU., China, UE y otros. Han impulsado exportaciones pero algunos sectores locales han sufrido.",
      options: [
        { value: -100, label: "Renegociar para proteger industria local" },
        { value: -50, label: "Mantener pero con mas protecciones" },
        { value: 0, label: "No tengo opinion formada" },
        { value: 50, label: "Son positivos en general" },
        { value: 100, label: "Abrir aun mas la economia" },
      ],
    },
    {
      id: "eco_6",
      text: "El Estado debería dar bonos y transferencias directas a las familias pobres?",
      description: "Programas sociales",
      dimension: "ECONOMIC",
      context: "Programas como Juntos y Pension 65 llegan a millones pero hay criticas por clientelismo y filtraciones.",
      options: [
        { value: -100, label: "Si, ampliar todos los programas" },
        { value: -50, label: "Mantener pero mejorar focalizacion" },
        { value: 0, label: "Depende del programa" },
        { value: 50, label: "Reemplazar por empleo y capacitacion" },
        { value: 100, label: "Eliminar, generan dependencia" },
      ],
    },
    // SOCIAL (6 questions)
    {
      id: "soc_1",
      text: "Debería legalizarse el matrimonio entre personas del mismo sexo en Perú?",
      description: "Derechos LGBTQ+",
      dimension: "SOCIAL",
      context: "Perú es uno de los pocos paises de Sudamerica sin union civil ni matrimonio igualitario.",
      options: [
        { value: 100, label: "Si, matrimonio pleno" },
        { value: 50, label: "Al menos union civil" },
        { value: 0, label: "No tengo opinion definida" },
        { value: -50, label: "Prefiero no cambiar la ley" },
        { value: -100, label: "No, el matrimonio es hombre y mujer" },
      ],
    },
    {
      id: "soc_2",
      text: "El enfoque de genero debería incluirse en el curriculo escolar?",
      description: "Educación y genero",
      dimension: "SOCIAL",
      context: "El curriculo con enfoque de genero busca igualdad y prevenir violencia. Movimientos como 'Con mis hijos no te metas' se oponen.",
      options: [
        { value: 100, label: "Si, es fundamental para la igualdad" },
        { value: 50, label: "Con ajustes y dialogo con padres" },
        { value: 0, label: "No estoy seguro" },
        { value: -50, label: "Solo valores tradicionales" },
        { value: -100, label: "No, los padres deciden" },
      ],
    },
    {
      id: "soc_3",
      text: "Debería despenalizarse el aborto en caso de violacion?",
      description: "Derechos reproductivos",
      dimension: "SOCIAL",
      context: "En Perú el aborto es ilegal salvo terapeutico. Se estiman 400,000 abortos clandestinos por año.",
      options: [
        { value: 100, label: "Si, y ampliar a mas causales" },
        { value: 50, label: "Solo violación e inviabilidad fetal" },
        { value: 0, label: "No tengo posición clara" },
        { value: -50, label: "Solo mantener el terapeutico actual" },
        { value: -100, label: "No, en ningun caso" },
      ],
    },
    {
      id: "soc_4",
      text: "Se debería regular el consumo de marihuana?",
      description: "Politica de drogas",
      dimension: "SOCIAL",
      context: "Perú permite uso medicinal limitado. Uruguay y Colombia han avanzado en regulacion.",
      options: [
        { value: 100, label: "Legalizar uso recreativo y medicinal" },
        { value: 50, label: "Solo medicinal con mas acceso" },
        { value: 0, label: "No tengo opinion definida" },
        { value: -50, label: "Mantener como esta" },
        { value: -100, label: "Endurecer penas" },
      ],
    },
    {
      id: "soc_5",
      text: "Que rol debería tener la religion en las decisiones del gobierno?",
      description: "Estado laico",
      dimension: "SOCIAL",
      context: "Perú tiene un concordato con el Vaticano. La Iglesia Catolica tiene influencia en politicas publicas.",
      options: [
        { value: 100, label: "Separación total Iglesia-Estado" },
        { value: 50, label: "Respetar tradiciones pero no imponer" },
        { value: 0, label: "Balance entre ambos" },
        { value: -50, label: "Los valores religiosos son importantes" },
        { value: -100, label: "La fe debe guiar las politicas" },
      ],
    },
    {
      id: "soc_6",
      text: "Como debería manejar Perú la inmigración venezolana?",
      description: "Politica migratoria",
      dimension: "SOCIAL",
      context: "Mas de 1.5 millones de venezolanos viven en Perú. Hay debates sobre su impacto en empleo y seguridad.",
      options: [
        { value: 100, label: "Integrarlos con mas derechos" },
        { value: 50, label: "Regularizar y dar oportunidades" },
        { value: 0, label: "Depende del caso" },
        { value: -50, label: "Restringir nueva migracion" },
        { value: -100, label: "Deportar a quienes no cumplan leyes" },
      ],
    },
    // ENVIRONMENT (6 questions)
    {
      id: "env_1",
      text: "Debería priorizarse la protección ambiental sobre proyectos mineros?",
      description: "Mineria vs ambiente",
      dimension: "ENVIRONMENT",
      context: "La mineria representa el 10% del PBI peruano pero ha causado conflictos como Conga y Tia Maria.",
      options: [
        { value: 100, label: "Si, proteger el medio ambiente primero" },
        { value: 50, label: "Regulación mas estricta pero permitir mineria" },
        { value: 0, label: "Buscar equilibrio caso por caso" },
        { value: -50, label: "La mineria es clave para el desarrollo" },
        { value: -100, label: "Priorizar la mineria y el empleo" },
      ],
    },
    {
      id: "env_2",
      text: "Perú debería comprometerse a eliminar la deforestación en la Amazonia?",
      description: "Deforestación amazonica",
      dimension: "ENVIRONMENT",
      context: "Perú pierde 150,000+ hectareas de bosque por año. La Amazonia peruana es clave para el clima global.",
      options: [
        { value: 100, label: "Deforestación cero inmediata" },
        { value: 50, label: "Reducción gradual con alternativas" },
        { value: 0, label: "No tengo posición clara" },
        { value: -50, label: "Permitir uso sostenible del bosque" },
        { value: -100, label: "El desarrollo necesita esas tierras" },
      ],
    },
    {
      id: "env_3",
      text: "El gobierno debería invertir fuertemente en energia renovable?",
      description: "Transición energetica",
      dimension: "ENVIRONMENT",
      context: "Perú tiene enorme potencial solar, eolico e hidrico. Actualmente depende mucho de combustibles fosiles.",
      options: [
        { value: 100, label: "Si, transición acelerada" },
        { value: 50, label: "Invertir pero sin abandonar lo actual" },
        { value: 0, label: "Depende del costo" },
        { value: -50, label: "Priorizar lo economico" },
        { value: -100, label: "No es prioridad ahora" },
      ],
    },
    {
      id: "env_4",
      text: "Las comunidades nativas deberían tener poder de veto sobre proyectos en sus territorios?",
      description: "Consulta previa",
      dimension: "ENVIRONMENT",
      context: "La consulta previa existe pero no es vinculante. Comunidades nativas han sido desplazadas por proyectos extractivos.",
      options: [
        { value: 100, label: "Si, veto absoluto" },
        { value: 50, label: "Consulta vinculante con compensacion" },
        { value: 0, label: "Dialogo equilibrado" },
        { value: -50, label: "Consulta pero no veto" },
        { value: -100, label: "El interes nacional prevalece" },
      ],
    },
    {
      id: "env_5",
      text: "Deberían prohibirse los plasticos de un solo uso en Perú?",
      description: "Contaminación por plasticos",
      dimension: "ENVIRONMENT",
      context: "Perú genera 6.8 millones de toneladas de residuos al año. Existe una ley pero con poca implementacion.",
      options: [
        { value: 100, label: "Prohibición total e inmediata" },
        { value: 50, label: "Prohibición gradual con alternativas" },
        { value: 0, label: "No tengo opinion" },
        { value: -50, label: "Solo incentivar reduccion" },
        { value: -100, label: "No prohibir, afecta a negocios" },
      ],
    },
    {
      id: "env_6",
      text: "El agua debería ser un derecho constitucional prioritario sobre su uso comercial?",
      description: "Derecho al agua",
      dimension: "ENVIRONMENT",
      context: "Millones de peruanos carecen de agua potable mientras grandes industrias consumen enormes cantidades.",
      options: [
        { value: 100, label: "Si, derecho humano sobre todo" },
        { value: 50, label: "Priorizar consumo humano pero regular" },
        { value: 0, label: "Balance entre ambos" },
        { value: -50, label: "El mercado puede asignar mejor" },
        { value: -100, label: "No limitar el uso productivo" },
      ],
    },
    // SECURITY (6 questions)
    {
      id: "sec_1",
      text: "Deberían endurecerse las penas para delitos violentos?",
      description: "Severidad penal",
      dimension: "SECURITY",
      context: "Perú tiene una tasa de 25 homicidios por 100,000 hab. La percepción de inseguridad supera el 85%.",
      options: [
        { value: 100, label: "Si, penas mucho mas duras" },
        { value: 50, label: "Endurecer para delitos graves" },
        { value: 0, label: "Depende del delito" },
        { value: -50, label: "Mejor prevención que castigo" },
        { value: -100, label: "Rehabilitación sobre todo" },
      ],
    },
    {
      id: "sec_2",
      text: "Las Fuerzas Armadas deberían salir a las calles para combatir la delincuencia?",
      description: "Militarización de seguridad",
      dimension: "SECURITY",
      context: "Varios candidatos proponen que los militares apoyen a la policia. Criticos advierten riesgos a derechos humanos.",
      options: [
        { value: 100, label: "Si, situación lo amerita" },
        { value: 50, label: "Solo en zonas criticas y temporal" },
        { value: 0, label: "No estoy seguro" },
        { value: -50, label: "Fortalecer policia, no militarizar" },
        { value: -100, label: "Nunca, riesgo autoritario" },
      ],
    },
    {
      id: "sec_3",
      text: "Debería existir pena de muerte para violadores de menores?",
      description: "Pena de muerte",
      dimension: "SECURITY",
      context: "Perú firmo la Convención Americana que prohibe reinstaurar pena de muerte. Casos de violación generan indignación publica.",
      options: [
        { value: 100, label: "Si, pena de muerte" },
        { value: 50, label: "Cadena perpetua efectiva" },
        { value: 0, label: "No estoy seguro" },
        { value: -50, label: "Penas duras pero no muerte" },
        { value: -100, label: "No, los derechos son inviolables" },
      ],
    },
    {
      id: "sec_4",
      text: "Los ciudadanos deberían poder portar armas de fuego para defensa?",
      description: "Tenencia de armas",
      dimension: "SECURITY",
      context: "La legislación peruana permite armas con licencia estricta. Los asaltos armados han aumentado.",
      options: [
        { value: 100, label: "Si, derecho a defensa propia" },
        { value: 50, label: "Con regulación estricta" },
        { value: 0, label: "No estoy seguro" },
        { value: -50, label: "Restringir mas el acceso" },
        { value: -100, label: "Prohibir completamente" },
      ],
    },
    {
      id: "sec_5",
      text: "Debería implementarse vigilancia masiva con camaras y reconocimiento facial?",
      description: "Vigilancia y privacidad",
      dimension: "SECURITY",
      context: "Ciudades como Lima instalan cada vez mas camaras. China usa reconocimiento facial masivo.",
      options: [
        { value: 100, label: "Si, mas camaras y tecnologia" },
        { value: 50, label: "Camaras si, reconocimiento facial no" },
        { value: 0, label: "No tengo posicion" },
        { value: -50, label: "Limitar vigilancia, proteger privacidad" },
        { value: -100, label: "No, es vigilancia autoritaria" },
      ],
    },
    {
      id: "sec_6",
      text: "Se debería negociar con el narcotrafico o combatirlo militarmente?",
      description: "Politica antidrogas",
      dimension: "SECURITY",
      context: "Perú es el segundo productor de coca del mundo. El VRAEM concentra la mayor produccion.",
      options: [
        { value: 100, label: "Combate militar total" },
        { value: 50, label: "Combate pero con desarrollo alternativo" },
        { value: 0, label: "Estrategia integral" },
        { value: -50, label: "Priorizar desarrollo sobre represion" },
        { value: -100, label: "Legalizar y regular" },
      ],
    },
    // INSTITUTIONAL (6 questions)
    {
      id: "ins_1",
      text: "Debería convocarse una Asamblea Constituyente para una nueva Constitucion?",
      description: "Cambio constitucional",
      dimension: "INSTITUTIONAL",
      context: "La Constitución de 1993 fue promulgada por Fujimori. Sectores piden cambiarla, otros defenderla.",
      options: [
        { value: 100, label: "Si, nueva Constitucion" },
        { value: 50, label: "Reformas profundas pero no nueva" },
        { value: 0, label: "No tengo posición clara" },
        { value: -50, label: "Solo reformas puntuales" },
        { value: -100, label: "Mantener la actual" },
      ],
    },
    {
      id: "ins_2",
      text: "El Congreso debería volver a tener dos camaras (Senado y Diputados)?",
      description: "Bicameralidad",
      dimension: "INSTITUTIONAL",
      context: "Perú tiene un Congreso unicameral de 130 miembros. La bicameralidad fue eliminada en 1993.",
      options: [
        { value: 100, label: "Si, dos camaras mejoran las leyes" },
        { value: 50, label: "Probablemente si, con reformas" },
        { value: 0, label: "No tengo opinion" },
        { value: -50, label: "No, una camara es suficiente" },
        { value: -100, label: "No, seria mas burocracia" },
      ],
    },
    {
      id: "ins_3",
      text: "Debería eliminarse la inmunidad parlamentaria?",
      description: "Inmunidad parlamentaria",
      dimension: "INSTITUTIONAL",
      context: "Congresistas investigados por corrupción usan la inmunidad para evitar procesos judiciales.",
      options: [
        { value: 100, label: "Si, eliminarla completamente" },
        { value: 50, label: "Limitarla mucho mas" },
        { value: 0, label: "Reformarla" },
        { value: -50, label: "Mantener con ajustes" },
        { value: -100, label: "Mantener como esta, protege la democracia" },
      ],
    },
    {
      id: "ins_4",
      text: "Los partidos politicos deberían recibir financiamiento publico?",
      description: "Financiamiento politico",
      dimension: "INSTITUTIONAL",
      context: "Actualmente los partidos dependen de donaciones privadas, muchas veces de fuentes cuestionables.",
      options: [
        { value: 100, label: "Si, financiamiento publico con fiscalizacion" },
        { value: 50, label: "Mixto: publico y privado regulado" },
        { value: 0, label: "No estoy seguro" },
        { value: -50, label: "Solo privado pero regulado" },
        { value: -100, label: "No, los impuestos no deben ir a partidos" },
      ],
    },
    {
      id: "ins_5",
      text: "Debería ser obligatorio el voto o debería ser voluntario?",
      description: "Voto obligatorio",
      dimension: "INSTITUTIONAL",
      context: "Perú tiene voto obligatorio con multa de S/88 por no votar. Algunos paises han pasado a voto voluntario.",
      options: [
        { value: 100, label: "Mantener obligatorio con sanciones" },
        { value: 50, label: "Obligatorio pero sin multa" },
        { value: 0, label: "No tengo posicion" },
        { value: -50, label: "Transición a voluntario" },
        { value: -100, label: "Voluntario inmediatamente" },
      ],
    },
    {
      id: "ins_6",
      text: "Debería descentralizarse mas el poder hacia las regiones?",
      description: "Descentralizacion",
      dimension: "INSTITUTIONAL",
      context: "Lima concentra el 52% del PBI. Las regiones reclaman mas recursos y autonomia.",
      options: [
        { value: 100, label: "Si, mucha mas autonomia regional" },
        { value: 50, label: "Mas recursos pero con fiscalizacion" },
        { value: 0, label: "Depende de la capacidad" },
        { value: -50, label: "Primero mejorar gestion regional" },
        { value: -100, label: "Centralizar mas, hay mucha corrupcion" },
      ],
    },
  ];

type TestPhase = "intro" | "questions" | "calculating" | "results";

export default function DnaTestPage() {
  const [phase, setPhase] = useState<TestPhase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { value: number; importance: number }>>({});
  const [results, setResults] = useState<{
    scores: Record<string, number>;
    tribe: string;
  } | null>(null);
  const { setResults: setStoreResults } = useDnaStore();

  const currentQuestion = DNA_QUESTIONS[currentIndex];
  const totalQuestions = DNA_QUESTIONS.length;
  const progress = Object.keys(answers).length;

  const handleAnswer = useCallback(
    (value: number) => {
      const questionId = currentQuestion.id;
      setAnswers((prev) => ({
        ...prev,
        [questionId]: { value, importance: 3 },
      }));

      // Auto-advance after short delay
      setTimeout(() => {
        if (currentIndex < totalQuestions - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
      }, 300);
    },
    [currentQuestion, currentIndex, totalQuestions]
  );

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    setPhase("calculating");

    // Calculate scores locally
    setTimeout(() => {
      const dimensionTotals: Record<string, { sum: number; count: number }> = {};

      for (const question of DNA_QUESTIONS) {
        const answer = answers[question.id];
        if (!answer) continue;

        if (!dimensionTotals[question.dimension]) {
          dimensionTotals[question.dimension] = { sum: 0, count: 0 };
        }
        dimensionTotals[question.dimension].sum += answer.value;
        dimensionTotals[question.dimension].count += 1;
      }

      const scores: Record<string, number> = {};
      for (const [dim, totals] of Object.entries(dimensionTotals)) {
        const raw = totals.count > 0 ? totals.sum / totals.count : 0;
        scores[dim.toLowerCase()] = Math.round(((raw + 100) / 200) * 100);
      }

      // Determine tribe
      const tribe = determineTribeLocal(scores);

      setResults({ scores, tribe });
      setPhase("results");
    }, 2500);
  };

  if (phase === "intro") {
    return <IntroPhase onStart={() => setPhase("questions")} />;
  }

  if (phase === "calculating") {
    return <CalculatingPhase />;
  }

  if (phase === "results" && results) {
    return <ResultsPhase scores={results.scores} tribe={results.tribe} />;
  }

  // Questions phase
  const selectedValue = answers[currentQuestion.id]?.value;
  const allAnswered = progress >= totalQuestions;
  const dimConfig = DIMENSION_CONFIG[currentQuestion.dimension];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Progress */}
        <ProgressBar current={progress} total={totalQuestions} />

        {/* Dimension badge */}
        <div className="mt-6 mb-8 flex items-center gap-3">
          <span
            className="badge"
            style={{ backgroundColor: dimConfig.color + "15", color: dimConfig.color }}
          >
            {dimConfig.label}
          </span>
          <span className="text-sm text-gray-400">
            {currentQuestion.description}
          </span>
        </div>

        {/* Question card */}
        <div className="card mb-6 animate-fade-in" key={currentQuestion.id}>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 leading-snug">
            {currentQuestion.text}
          </h2>

          {/* Context box */}
          <div className="bg-info/5 border border-info/20 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-info mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-gray-600 leading-relaxed">
                {currentQuestion.context}
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedValue === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 ${isSelected
                    ? "border-primary bg-primary-50 text-primary-700 shadow-subtle"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                    }`}
                >
                  <span className="font-medium">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="btn-ghost disabled:opacity-30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Anterior
          </button>

          <span className="text-sm text-gray-400">
            {currentIndex + 1} / {totalQuestions}
          </span>

          {allAnswered ? (
            <button onClick={handleComplete} className="btn-primary">
              Ver resultados
            </button>
          ) : currentIndex < totalQuestions - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              disabled={!answers[currentQuestion.id]}
              className="btn-ghost disabled:opacity-30"
            >
              Siguiente
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={progress < 20}
              className="btn-primary disabled:opacity-50"
              title={progress < 20 ? "Responde al menos 20 preguntas" : ""}
            >
              Calcular ({progress}/{totalQuestions})
            </button>
          )}
        </div>

        {/* Skip note */}
        {!allAnswered && progress >= 20 && currentIndex === totalQuestions - 1 && (
          <p className="text-center text-sm text-gray-400 mt-4">
            Ya puedes ver tus resultados, pero mas preguntas = resultados mas precisos
          </p>
        )}
      </div>
    </div>
  );
}

function IntroPhase({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center">
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-primary-50 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          5 minutos - 30 preguntas - 100% gratuito
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Descubre tu{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ADN Politico
          </span>
        </h1>

        <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
          Responde preguntas sobre temas reales del Perú en 5 dimensiones.
          Obtendras tu perfil politico y match con candidatos.
        </p>

        {/* Dimensions preview */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10 max-w-2xl mx-auto">
          {(Object.entries(DIMENSION_CONFIG) as [Dimension, typeof DIMENSION_CONFIG[Dimension]][]).map(
            ([key, config]) => (
              <div
                key={key}
                className="bg-white rounded-xl p-3 shadow-subtle text-center"
              >
                <div
                  className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center text-white text-lg font-bold"
                  style={{ backgroundColor: config.color }}
                >
                  {config.label[0]}
                </div>
                <p className="text-xs font-medium text-gray-600">
                  {config.label}
                </p>
              </div>
            )
          )}
        </div>

        <button onClick={onStart} className="btn-primary text-lg px-10 py-4">
          Empezar el Test
        </button>

        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-400">
          <span>Sin registro</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span>Anonimo</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span>Sin sesgo</span>
        </div>
      </div>
    </div>
  );
}

function CalculatingPhase() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Animated ADN helix placeholder */}
        <div className="w-24 h-24 mx-auto mb-8 relative">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse" />
          <div className="absolute inset-2 rounded-full border-4 border-secondary/30 animate-spin" style={{ animationDuration: "3s" }} />
          <div className="absolute inset-4 rounded-full border-4 border-primary/40 animate-spin" style={{ animationDuration: "2s", animationDirection: "reverse" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">🧬</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Analizando tu ADN Politico...
        </h2>
        <p className="text-gray-500">
          Calculando tu perfil en 5 dimensiones y buscando tu match con los candidatos.
        </p>

        <div className="mt-8 space-y-2">
          <LoadingStep text="Procesando respuestas" delay={0} />
          <LoadingStep text="Calculando dimensiones" delay={500} />
          <LoadingStep text="Determinando tu tribu" delay={1000} />
          <LoadingStep text="Comparando con candidatos" delay={1500} />
          <LoadingStep text="Generando resultados" delay={2000} />
        </div>
      </div>
    </div>
  );
}

function LoadingStep({ text, delay }: { text: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);

  useState(() => {
    const t1 = setTimeout(() => setVisible(true), delay);
    const t2 = setTimeout(() => setDone(true), delay + 400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  });

  if (!visible) return null;

  return (
    <div className="flex items-center gap-3 text-sm animate-fade-in">
      {done ? (
        <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      )}
      <span className={done ? "text-gray-800" : "text-gray-500"}>{text}</span>
    </div>
  );
}

function ResultsPhase({
  scores,
  tribe,
}: {
  scores: Record<string, number>;
  tribe: string;
}) {
  const dimensions: { key: string; dimension: Dimension }[] = [
    { key: "economic", dimension: "ECONOMIC" },
    { key: "social", dimension: "SOCIAL" },
    { key: "environment", dimension: "ENVIRONMENT" },
    { key: "security", dimension: "SECURITY" },
    { key: "institutional", dimension: "INSTITUTIONAL" },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-secondary-50 text-secondary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            Tu ADN Politico
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Tu tribu:{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {tribe}
            </span>
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Este es tu perfil politico basado en tus respuestas. Explora cada
            dimension para entender tu posicion.
          </p>
        </div>

        {/* Score circles */}
        <div className="card mb-8 animate-slide-up">
          <h3 className="font-bold text-gray-700 mb-6 text-center">Tu perfil en 5 dimensiones</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
            {dimensions.map(({ key, dimension }) => {
              const config = DIMENSION_CONFIG[dimension];
              const score = scores[key] || 50;
              return (
                <div key={key} className="flex flex-col items-center gap-2">
                  <div className="relative w-20 h-20">
                    <svg width={80} height={80} className="transform -rotate-90">
                      <circle cx={40} cy={40} r={34} fill="none" stroke="#e5e5e5" strokeWidth={6} />
                      <circle
                        cx={40}
                        cy={40}
                        r={34}
                        fill="none"
                        stroke={config.color}
                        strokeWidth={6}
                        strokeLinecap="round"
                        strokeDasharray={213.6}
                        strokeDashoffset={213.6 - (score / 100) * 213.6}
                        style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold" style={{ color: config.color }}>
                        {score}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-600 text-center">
                    {config.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed bars */}
        <div className="card mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h3 className="font-bold text-gray-700 mb-6">Detalle por dimension</h3>
          <div className="space-y-6">
            {dimensions.map(({ key, dimension }) => {
              const config = DIMENSION_CONFIG[dimension];
              const score = scores[key] || 50;
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: config.color }}
                      />
                      <span className="font-medium text-gray-700">{config.label}</span>
                    </div>
                    <span className="font-bold" style={{ color: config.color }}>
                      {score}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full rounded-full progress-fill"
                      style={{
                        width: `${score}%`,
                        backgroundColor: config.color,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{getLeftLabelByKey(key)}</span>
                    <span>{getRightLabelByKey(key)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Share + Next actions */}
        <div className="card animate-slide-up text-center" style={{ animationDelay: "0.4s" }}>
          <h3 className="font-bold text-gray-700 mb-2">Siguiente paso</h3>
          <p className="text-gray-500 mb-6 text-sm">
            Ahora compara tu perfil con los candidatos y ve con quien haces mas match.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/candidatos" className="btn-primary">
              Ver match con candidatos
            </Link>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `Mi ADN Politico: ${tribe}`,
                    text: `Soy ${tribe}! Economia: ${scores.economic}%, Social: ${scores.social}%, Ambiente: ${scores.environment}%. Descubre tu perfil en Candidatazo.`,
                    url: window.location.origin,
                  });
                }
              }}
              className="btn-outline"
            >
              Compartir resultado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function determineTribeLocal(scores: Record<string, number>): string {
  const economic = scores.economic || 50;
  const social = scores.social || 50;
  const environment = scores.environment || 50;
  const security = scores.security || 50;
  const institutional = scores.institutional || 50;

  const isCentrist = [economic, social, environment, security, institutional].every(
    (s) => s >= 35 && s <= 65
  );
  if (isCentrist) return "Centro Pragmatico";

  if (social > 65 && environment > 60) {
    if (economic > 60) return "Liberal Progresista";
    return "Izquierda Progresista";
  }

  if (social < 40) {
    if (economic > 60) return "Derecha Conservadora";
    if (security > 65) return "Conservador Autoritario";
    return "Conservador Tradicional";
  }

  if (economic > 70 && social > 55) return "Libertario";
  if (institutional > 70) {
    if (social > 55) return "Reformista Progresista";
    return "Reformista Moderado";
  }
  if (environment > 75) return "Ambientalista";
  if (economic < 40 && security > 60) return "Populista";
  if (economic > 55) return "Centro Derecha";
  return "Centro Izquierda";
}

function getLeftLabelByKey(key: string): string {
  const labels: Record<string, string> = {
    economic: "Intervencionista",
    social: "Conservador",
    environment: "Desarrollo",
    security: "Derechos civiles",
    institutional: "Status quo",
  };
  return labels[key] || "";
}

function getRightLabelByKey(key: string): string {
  const labels: Record<string, string> = {
    economic: "Libre mercado",
    social: "Progresista",
    environment: "Conservacionista",
    security: "Mano dura",
    institutional: "Reformista",
  };
  return labels[key] || "";
}
