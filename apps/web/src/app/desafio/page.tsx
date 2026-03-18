"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ============================================
   Question Bank - 35 questions about Peru 2026
   ============================================ */

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTION_BANK: Question[] = [
  {
    id: 1,
    category: "Sistema electoral",
    question: "¿Cuántos senadores elegiremos en las elecciones 2026?",
    options: ["40", "50", "60", "80"],
    correctIndex: 2,
    explanation: "El nuevo Senado de la República tendrá 60 senadores elegidos en distrito único nacional.",
  },
  {
    id: 2,
    category: "Sistema electoral",
    question: "¿Cuántos diputados tendrá el nuevo Congreso bicameral?",
    options: ["100", "120", "130", "150"],
    correctIndex: 2,
    explanation: "La Cámara de Diputados tendrá 130 representantes elegidos por distrito múltiple.",
  },
  {
    id: 3,
    category: "Historia política",
    question: "¿En qué año fue la última vez que Perú tuvo un Congreso bicameral?",
    options: ["1990", "1992", "1993", "1995"],
    correctIndex: 1,
    explanation: "El Congreso bicameral fue disuelto en 1992 tras el autogolpe de Alberto Fujimori.",
  },
  {
    id: 4,
    category: "Candidatos 2026",
    question: "¿Cuántos candidatos presidenciales se inscribieron para las elecciones 2026?",
    options: ["24", "30", "36", "42"],
    correctIndex: 2,
    explanation: "Un total de 36 candidatos presidenciales se inscribieron ante el JNE para las elecciones generales 2026.",
  },
  {
    id: 5,
    category: "Sistema electoral",
    question: "¿Qué es la valla electoral en Perú?",
    options: [
      "3% de votos válidos",
      "5% de votos válidos",
      "7% de votos válidos",
      "10% de votos válidos",
    ],
    correctIndex: 1,
    explanation: "La valla electoral es el 5% de los votos válidos que un partido necesita para obtener representación congresal.",
  },
  {
    id: 6,
    category: "Datos electorales",
    question: "¿Cuántos electores tiene aproximadamente el padrón electoral 2026?",
    options: ["22 millones", "25 millones", "27.3 millones", "30 millones"],
    correctIndex: 2,
    explanation: "El padrón electoral 2026 tiene aproximadamente 27.3 millones de electores hábiles.",
  },
  {
    id: 7,
    category: "Candidatos 2026",
    question: "¿Quién lidera las encuestas presidenciales a marzo de 2026?",
    options: [
      "Keiko Fujimori",
      "Rafael López Aliaga",
      "Hernando de Soto",
      "César Acuña",
    ],
    correctIndex: 1,
    explanation: "Rafael López Aliaga, del partido Renovación Popular, lidera las encuestas con intención de voto significativa.",
  },
  {
    id: 8,
    category: "Candidatos 2026",
    question: "¿Qué candidato creció de 0.4% a 4.3% en intención de voto en solo 3 meses?",
    options: [
      "Carlos Añaños",
      "Wolfgang Grozo",
      "José Luna",
      "Daniel Urresti",
    ],
    correctIndex: 1,
    explanation: "Wolfgang Grozo tuvo un crecimiento sorprendente en las encuestas, pasando de 0.4% a 4.3% entre diciembre 2025 y marzo 2026.",
  },
  {
    id: 9,
    category: "Datos electorales",
    question: "¿Qué porcentaje de votantes no reconoce el símbolo de su propio partido?",
    options: ["25%", "38%", "53%", "67%"],
    correctIndex: 2,
    explanation: "Según encuestas, el 53% de los votantes no reconoce el símbolo del partido por el que planea votar.",
  },
  {
    id: 10,
    category: "Candidatos 2026",
    question: "¿Cuál es el anti-voto más alto entre los candidatos presidenciales 2026?",
    options: [
      "Rafael López Aliaga (~45%)",
      "Keiko Fujimori (~50%)",
      "César Acuña (~40%)",
      "Antauro Humala (~55%)",
    ],
    correctIndex: 1,
    explanation: "Keiko Fujimori tiene el anti-voto más alto, con aproximadamente el 50% del electorado declarando que nunca votaría por ella.",
  },
  {
    id: 11,
    category: "Constitución",
    question: "¿Qué artículo de la Constitución peruana establece que el voto es obligatorio?",
    options: ["Artículo 21", "Artículo 31", "Artículo 45", "Artículo 52"],
    correctIndex: 1,
    explanation: "El Artículo 31 de la Constitución establece que el voto es personal, igual, libre, secreto y obligatorio hasta los 70 años.",
  },
  {
    id: 12,
    category: "Historia política",
    question: "¿Cuántas constituciones ha tenido el Perú en su historia republicana?",
    options: ["8", "10", "12", "15"],
    correctIndex: 2,
    explanation: "Perú ha tenido 12 constituciones desde su independencia, siendo la actual la de 1993.",
  },
  {
    id: 13,
    category: "Sistema electoral",
    question: "¿Qué organismo es el encargado de organizar los procesos electorales en Perú?",
    options: ["JNE", "ONPE", "RENIEC", "Congreso"],
    correctIndex: 1,
    explanation: "La ONPE (Oficina Nacional de Procesos Electorales) es la encargada de organizar y ejecutar los procesos electorales.",
  },
  {
    id: 14,
    category: "Datos electorales",
    question: "¿Cuál es la multa por no votar para ciudadanos que viven en zonas no pobres?",
    options: ["S/ 22", "S/ 44", "S/ 88", "S/ 176"],
    correctIndex: 2,
    explanation: "La multa por no votar es de S/ 88 para ciudadanos en zonas no consideradas de pobreza.",
  },
  {
    id: 15,
    category: "Candidatos 2026",
    question: "¿Qué partido político postuló a Hernando de Soto en 2026?",
    options: [
      "Fuerza Popular",
      "Avanza País",
      "Progresemos",
      "Renovación Popular",
    ],
    correctIndex: 2,
    explanation: "Hernando de Soto postuló a la presidencia por el partido Progresemos en las elecciones 2026.",
  },
  {
    id: 16,
    category: "Sistema electoral",
    question: "¿A partir de qué edad se puede votar de forma facultativa en Perú?",
    options: ["16 años", "18 años", "70 años", "75 años"],
    correctIndex: 2,
    explanation: "A partir de los 70 años el voto se convierte en facultativo (opcional) en Perú.",
  },
  {
    id: 17,
    category: "Historia política",
    question: "¿Quién fue el último presidente del Perú antes de las elecciones 2026?",
    options: [
      "Pedro Castillo",
      "Dina Boluarte",
      "Martín Vizcarra",
      "Manuel Merino",
    ],
    correctIndex: 1,
    explanation: "Dina Boluarte asumió la presidencia en diciembre de 2022 tras la destitución de Pedro Castillo.",
  },
  {
    id: 18,
    category: "Datos electorales",
    question: "¿Cuál es el porcentaje de indecisos para las elecciones presidenciales 2026?",
    options: ["15%", "25%", "35%", "Más de 40%"],
    correctIndex: 3,
    explanation: "Más del 40% del electorado se declara indeciso o planea votar en blanco/nulo, uno de los niveles más altos de las últimas elecciones.",
  },
  {
    id: 19,
    category: "Constitución",
    question: "¿Cuántos años dura el mandato presidencial en Perú?",
    options: ["4 años", "5 años", "6 años", "4 años con reelección"],
    correctIndex: 1,
    explanation: "El mandato presidencial en Perú dura 5 años, sin reelección inmediata según la Constitución de 1993.",
  },
  {
    id: 20,
    category: "Sistema electoral",
    question: "¿Qué sistema se usa para elegir a los diputados en 2026?",
    options: [
      "Distrito único",
      "Distrito múltiple",
      "Lista cerrada nacional",
      "Voto preferencial doble",
    ],
    correctIndex: 1,
    explanation: "Los diputados se eligen por distrito electoral múltiple, con circunscripciones departamentales.",
  },
  {
    id: 21,
    category: "Candidatos 2026",
    question: "¿Qué candidato es conocido como el 'porfiado' por postular varias veces?",
    options: [
      "César Acuña",
      "Keiko Fujimori",
      "Lourdes Flores Nano",
      "Alejandro Toledo",
    ],
    correctIndex: 1,
    explanation: "Keiko Fujimori postula por tercera vez a la presidencia en 2026, tras perder en 2011 y 2021.",
  },
  {
    id: 22,
    category: "Datos electorales",
    question: "¿Cuántos partidos políticos tienen inscripción vigente ante el JNE para 2026?",
    options: ["18", "24", "36", "40"],
    correctIndex: 2,
    explanation: "Hay 36 partidos políticos con inscripción vigente que participan en las elecciones generales 2026.",
  },
  {
    id: 23,
    category: "Historia política",
    question: "¿Cuántos presidentes tuvo el Perú entre 2016 y 2026?",
    options: ["3", "4", "5", "6"],
    correctIndex: 3,
    explanation: "Perú tuvo 6 presidentes en una década: PPK, Vizcarra, Merino, Sagasti, Castillo y Boluarte.",
  },
  {
    id: 24,
    category: "Constitución",
    question: "¿Qué se necesita para ir a segunda vuelta presidencial en Perú?",
    options: [
      "Que nadie supere el 30%",
      "Que nadie supere el 50%",
      "Que haya más de 3 candidatos",
      "Que el primero no saque 10% de ventaja",
    ],
    correctIndex: 1,
    explanation: "Si ningún candidato supera el 50% de votos válidos, los dos candidatos más votados pasan a segunda vuelta.",
  },
  {
    id: 25,
    category: "Sistema electoral",
    question: "¿Qué organismo resuelve las controversias electorales en última instancia?",
    options: [
      "Tribunal Constitucional",
      "Poder Judicial",
      "JNE",
      "Defensoría del Pueblo",
    ],
    correctIndex: 2,
    explanation: "El Jurado Nacional de Elecciones (JNE) es la máxima autoridad en materia electoral y sus resoluciones son irrevisables.",
  },
  {
    id: 26,
    category: "Datos electorales",
    question: "¿Cuántos peruanos en el extranjero están habilitados para votar en 2026?",
    options: ["500 mil", "800 mil", "1 millón", "1.5 millones"],
    correctIndex: 2,
    explanation: "Aproximadamente 1 millón de peruanos residentes en el extranjero están habilitados para votar en 2026.",
  },
  {
    id: 27,
    category: "Candidatos 2026",
    question: "¿Qué empresario de la industria de bebidas postuló a la presidencia en 2026?",
    options: [
      "Carlos Añaños",
      "Dionisio Romero",
      "Roque Benavides",
      "Alberto Benavides",
    ],
    correctIndex: 0,
    explanation: "Carlos Añaños, cofundador de Ajegroup (Kola Real / Big Cola), postuló a la presidencia en 2026.",
  },
  {
    id: 28,
    category: "Historia política",
    question: "¿En qué año se realizó el autogolpe que cerró el Congreso bicameral?",
    options: ["1990", "1992", "1993", "1995"],
    correctIndex: 1,
    explanation: "El 5 de abril de 1992, Alberto Fujimori disolvió el Congreso bicameral en un autogolpe de Estado.",
  },
  {
    id: 29,
    category: "Constitución",
    question: "¿Quién promulga la ley de retorno al bicameralismo?",
    options: [
      "El Presidente",
      "El Congreso",
      "Se aprobó por referéndum",
      "El Tribunal Constitucional",
    ],
    correctIndex: 1,
    explanation: "El Congreso aprobó la ley de retorno al sistema bicameral mediante reforma constitucional.",
  },
  {
    id: 30,
    category: "Datos electorales",
    question: "¿Cuál es el distrito electoral más grande del Perú por número de electores?",
    options: ["Lima", "Arequipa", "La Libertad", "Piura"],
    correctIndex: 0,
    explanation: "Lima es el distrito electoral más grande con más de 7 millones de electores, representando cerca del 30% del padrón.",
  },
  {
    id: 31,
    category: "Sistema electoral",
    question: "¿Qué porcentaje de candidaturas deben ser mujeres según la cuota de género?",
    options: ["30%", "40%", "50%", "No hay cuota"],
    correctIndex: 2,
    explanation: "La ley de paridad y alternancia exige que al menos el 50% de candidaturas en las listas sean mujeres.",
  },
  {
    id: 32,
    category: "Candidatos 2026",
    question: "¿Qué excongresista lideró el partido Podemos Perú en las elecciones 2026?",
    options: [
      "José Luna Gálvez",
      "Daniel Urresti",
      "Julio Guzmán",
      "George Forsyth",
    ],
    correctIndex: 0,
    explanation: "José Luna Gálvez, fundador de la Universidad Telesup, lidera el partido Podemos Perú.",
  },
  {
    id: 33,
    category: "Historia política",
    question: "¿Cuántos meses duró el gobierno más corto del Perú reciente (Manuel Merino)?",
    options: [
      "3 días",
      "5 días",
      "1 semana",
      "2 semanas",
    ],
    correctIndex: 1,
    explanation: "Manuel Merino gobernó solo 5 días (del 10 al 15 de noviembre de 2020) antes de renunciar por las protestas ciudadanas.",
  },
  {
    id: 34,
    category: "Datos electorales",
    question: "¿Qué porcentaje del electorado peruano tiene entre 18 y 29 años?",
    options: ["15%", "22%", "28%", "35%"],
    correctIndex: 2,
    explanation: "Aproximadamente el 28% del electorado peruano está conformado por jóvenes de 18 a 29 años, un bloque demográfico decisivo.",
  },
  {
    id: 35,
    category: "Constitución",
    question: "¿Qué institución se encarga del registro de identidad y padrón electoral?",
    options: ["ONPE", "JNE", "RENIEC", "Ministerio del Interior"],
    correctIndex: 2,
    explanation: "El RENIEC (Registro Nacional de Identificación y Estado Civil) elabora y mantiene el padrón electoral.",
  },
];

const QUESTIONS_PER_DAY = 5;

/* ============================================
   Helper Functions
   ============================================ */

function getDayIndex(): number {
  const start = new Date("2026-01-01").getTime();
  const now = new Date().getTime();
  const daysSinceStart = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  return daysSinceStart;
}

function getDailyQuestions(): Question[] {
  const dayIndex = getDayIndex();
  const questions: Question[] = [];
  const totalQuestions = QUESTION_BANK.length;

  for (let i = 0; i < QUESTIONS_PER_DAY; i++) {
    const qIndex = (dayIndex * QUESTIONS_PER_DAY + i) % totalQuestions;
    questions.push(QUESTION_BANK[qIndex]);
  }
  return questions;
}

function getTodayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function getStoredData(): {
  lastPlayedDate: string;
  streak: number;
  totalXp: number;
} {
  if (typeof window === "undefined") return { lastPlayedDate: "", streak: 0, totalXp: 0 };
  try {
    const raw = localStorage.getItem("candidatazo-desafio");
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return { lastPlayedDate: "", streak: 0, totalXp: 0 };
}

function saveData(data: { lastPlayedDate: string; streak: number; totalXp: number }) {
  if (typeof window === "undefined") return;
  localStorage.setItem("candidatazo-desafio", JSON.stringify(data));
}

/* ============================================
   Category Badge Colors
   ============================================ */

const CATEGORY_COLORS: Record<string, string> = {
  "Datos electorales": "bg-blue-100 text-blue-700",
  "Historia política": "bg-amber-100 text-amber-700",
  "Constitución": "bg-purple-100 text-purple-700",
  "Candidatos 2026": "bg-rose-100 text-rose-700",
  "Sistema electoral": "bg-emerald-100 text-emerald-700",
};

/* ============================================
   Confetti Component
   ============================================ */

function ConfettiEffect() {
  const colors = ["#D91023", "#D4A017", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899"];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="confetti-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${60 + Math.random() * 30}%`,
            backgroundColor: colors[i % colors.length],
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${0.8 + Math.random() * 0.6}s`,
            width: `${6 + Math.random() * 6}px`,
            height: `${6 + Math.random() * 6}px`,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}

/* ============================================
   Timer Circle Component
   ============================================ */

function TimerCircle({ timeLeft, total }: { timeLeft: number; total: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / total) * circumference;
  const isLow = timeLeft <= 5;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="96" height="96" className="-rotate-90">
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="6"
        />
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke={isLow ? "#EF4444" : "#D91023"}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          className="timer-circle"
        />
      </svg>
      <span
        className={`absolute text-2xl font-extrabold ${
          isLow ? "text-red-500" : "text-gray-800"
        } ${isLow ? "animate-pulse" : ""}`}
      >
        {timeLeft}
      </span>
    </div>
  );
}

/* ============================================
   Main Component
   ============================================ */

type GamePhase = "intro" | "playing" | "result";

export default function DesafioPage() {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [showXpAnimation, setShowXpAnimation] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);
  const [dailyQuestions] = useState<Question[]>(getDailyQuestions);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const TIMER_TOTAL = 15;

  // Load stored data on mount
  useEffect(() => {
    const data = getStoredData();
    setStreak(data.streak);
    setTotalXp(data.totalXp);

    const todayKey = getTodayKey();
    if (data.lastPlayedDate === todayKey) {
      setAlreadyPlayed(true);
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (phase !== "playing" || showAnswer) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time ran out
          clearInterval(timerRef.current!);
          setShowAnswer(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, showAnswer, currentIndex]);

  const handleStart = useCallback(() => {
    setPhase("playing");
    setCurrentIndex(0);
    setCorrectCount(0);
    setXpEarned(0);
    setTimeLeft(TIMER_TOTAL);
    setSelectedOption(null);
    setShowAnswer(false);
  }, []);

  const handleSelectOption = useCallback(
    (optionIndex: number) => {
      if (showAnswer || selectedOption !== null) return;

      if (timerRef.current) clearInterval(timerRef.current);
      setSelectedOption(optionIndex);
      setShowAnswer(true);

      const question = dailyQuestions[currentIndex];
      const isCorrect = optionIndex === question.correctIndex;

      if (isCorrect) {
        const streakMultiplier = Math.max(1, streak >= 3 ? 1.5 : 1);
        const xpGained = Math.round(100 * streakMultiplier);
        setCorrectCount((prev) => prev + 1);
        setXpEarned((prev) => prev + xpGained);
        setShowConfetti(true);
        setShowXpAnimation(true);

        setTimeout(() => {
          setShowConfetti(false);
          setShowXpAnimation(false);
        }, 1200);
      }
    },
    [showAnswer, selectedOption, currentIndex, dailyQuestions, streak]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < QUESTIONS_PER_DAY - 1) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(TIMER_TOTAL);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      // Game over
      const todayKey = getTodayKey();
      const data = getStoredData();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;

      let newStreak = 1;
      if (data.lastPlayedDate === yesterdayKey) {
        newStreak = data.streak + 1;
      } else if (data.lastPlayedDate === todayKey) {
        newStreak = data.streak;
      }

      const newTotalXp = data.totalXp + xpEarned;

      saveData({
        lastPlayedDate: todayKey,
        streak: newStreak,
        totalXp: newTotalXp,
      });

      setStreak(newStreak);
      setTotalXp(newTotalXp);
      setAlreadyPlayed(true);
      setPhase("result");
    }
  }, [currentIndex, xpEarned]);

  const handleShare = useCallback(() => {
    const text = `🇵🇪 ¡Acerté ${correctCount}/${QUESTIONS_PER_DAY} en el desafío diario de Candidatazo! ¿Puedes superarme?\n\nhttps://candidatazo.pe/desafio`;
    if (navigator.share) {
      navigator.share({ text }).catch(() => {
        navigator.clipboard.writeText(text);
      });
    } else {
      navigator.clipboard.writeText(text);
    }
  }, [correctCount]);

  /* ============================================
     RENDER - Intro Phase
     ============================================ */

  if (phase === "intro") {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-lg mx-auto px-4 py-12">
          <div className="animate-slide-up text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Desafío diario
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              ¿Cuánto sabes de las
              <span className="text-primary"> elecciones 2026</span>?
            </h1>
            <p className="text-lg text-gray-500 max-w-md mx-auto">
              5 preguntas, 15 segundos cada una. Demuestra que eres un experto en política peruana.
            </p>
          </div>

          {/* Streak Banner */}
          {streak > 0 && (
            <div className="animate-scale-in bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-6 text-center">
              <span className={`text-2xl ${streak >= 3 ? "animate-streak-fire" : ""} inline-block`}>
                🔥
              </span>
              <span className="ml-2 font-bold text-amber-700">
                Racha de {streak} día{streak !== 1 ? "s" : ""}
              </span>
              {streak >= 3 && (
                <span className="ml-2 text-sm text-amber-600 font-medium">
                  ¡Multiplicador x1.5 XP!
                </span>
              )}
            </div>
          )}

          {/* XP Display */}
          <div className="animate-fade-in bg-white rounded-xl shadow-md p-5 mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tu XP total</p>
              <p className="text-2xl font-extrabold text-gray-900">{totalXp.toLocaleString()} XP</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>

          {/* Stats */}
          <div className="animate-fade-in stagger-2 grid grid-cols-2 gap-3 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-xs text-gray-500">Preguntas</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">15s</p>
              <p className="text-xs text-gray-500">Por pregunta</p>
            </div>
          </div>

          {/* CTA Button */}
          {alreadyPlayed ? (
            <div className="text-center">
              <div className="bg-gray-100 rounded-xl p-6 mb-4">
                <p className="text-lg font-bold text-gray-700 mb-1">
                  ¡Ya completaste el desafío de hoy!
                </p>
                <p className="text-sm text-gray-500">
                  Vuelve mañana para mantener tu racha 🔥
                </p>
              </div>
              <button
                onClick={handleStart}
                className="btn-outline w-full text-sm"
              >
                Practicar de nuevo (sin XP)
              </button>
            </div>
          ) : (
            <button
              onClick={handleStart}
              className="btn-primary w-full text-lg py-4 animate-pulse-glow tap-feedback"
            >
              Comenzar desafío
            </button>
          )}

          {/* Community Stats */}
          <div className="mt-8 text-center text-sm text-gray-400 space-y-1 animate-fade-in stagger-3">
            <p>Hoy <span className="font-semibold text-gray-500">3,847</span> personas han completado el desafío</p>
            <p>Promedio de aciertos: <span className="font-semibold text-gray-500">3.2/{QUESTIONS_PER_DAY}</span></p>
          </div>
        </div>
      </main>
    );
  }

  /* ============================================
     RENDER - Playing Phase
     ============================================ */

  if (phase === "playing") {
    const question = dailyQuestions[currentIndex];
    const categoryColor = CATEGORY_COLORS[question.category] || "bg-gray-100 text-gray-700";

    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6 animate-fade-in">
            {/* Progress */}
            <div className="flex items-center gap-2">
              {Array.from({ length: QUESTIONS_PER_DAY }).map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-1.5 rounded-full transition-all duration-300 ${
                    i < currentIndex
                      ? "bg-primary"
                      : i === currentIndex
                      ? "bg-primary/60"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            {/* Question counter */}
            <span className="text-sm font-semibold text-gray-400">
              {currentIndex + 1}/{QUESTIONS_PER_DAY}
            </span>
          </div>

          {/* Timer */}
          <div className="flex justify-center mb-6">
            <TimerCircle timeLeft={timeLeft} total={TIMER_TOTAL} />
          </div>

          {/* Category Badge */}
          <div className="flex justify-center mb-4 animate-slide-down">
            <span className={`badge ${categoryColor}`}>{question.category}</span>
          </div>

          {/* Question */}
          <div className="relative animate-scale-in">
            {showConfetti && <ConfettiEffect />}

            <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-8 leading-tight">
              {question.question}
            </h2>

            {/* XP Gain Animation */}
            {showXpAnimation && (
              <div className="absolute top-0 right-4 animate-xp-gain">
                <span className="text-lg font-extrabold text-primary">
                  +{streak >= 3 ? 150 : 100} XP
                </span>
              </div>
            )}

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, i) => {
                let optionStyles = "bg-white border-2 border-gray-200 hover:border-primary/40 hover:bg-primary/5";

                if (showAnswer) {
                  if (i === question.correctIndex) {
                    optionStyles = "bg-green-50 border-2 border-green-400 text-green-800";
                  } else if (i === selectedOption && i !== question.correctIndex) {
                    optionStyles = "bg-red-50 border-2 border-red-400 text-red-800 animate-shake";
                  } else {
                    optionStyles = "bg-gray-50 border-2 border-gray-200 opacity-50";
                  }
                }

                const letter = ["A", "B", "C", "D"][i];

                return (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(i)}
                    disabled={showAnswer}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 tap-feedback flex items-center gap-4 ${optionStyles}`}
                  >
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                        showAnswer && i === question.correctIndex
                          ? "bg-green-400 text-white"
                          : showAnswer && i === selectedOption && i !== question.correctIndex
                          ? "bg-red-400 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {showAnswer && i === question.correctIndex ? "✓" : showAnswer && i === selectedOption && i !== question.correctIndex ? "✗" : letter}
                    </span>
                    <span className="font-medium">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showAnswer && (
              <div className="mt-6 animate-slide-up">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 mt-0.5 shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <p className="text-sm text-blue-800">{question.explanation}</p>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="btn-primary w-full mt-4 tap-feedback"
                >
                  {currentIndex < QUESTIONS_PER_DAY - 1 ? "Siguiente pregunta" : "Ver resultados"}
                </button>
              </div>
            )}

            {/* Time ran out message */}
            {showAnswer && selectedOption === null && (
              <div className="mt-4 text-center animate-fade-in">
                <p className="text-sm font-semibold text-red-500">
                  ¡Se acabó el tiempo!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  /* ============================================
     RENDER - Result Phase
     ============================================ */

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-lg mx-auto px-4 py-12">
        {/* Result Card */}
        <div className="animate-bounce-in bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          {/* Header gradient */}
          <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: `${20 + Math.random() * 40}px`,
                    height: `${20 + Math.random() * 40}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: 0.3,
                  }}
                />
              ))}
            </div>
            <div className="relative">
              <p className="text-sm font-medium text-white/80 mb-2">Desafío diario completado</p>
              <div className="animate-number">
                <span className="text-6xl font-extrabold">
                  {correctCount}/{QUESTIONS_PER_DAY}
                </span>
              </div>
              <p className="mt-2 text-white/90 font-medium">
                {correctCount === QUESTIONS_PER_DAY
                  ? "¡Perfecto! Eres un experto electoral"
                  : correctCount >= 4
                  ? "¡Excelente! Casi perfecto"
                  : correctCount >= 3
                  ? "¡Bien hecho! Sabes bastante"
                  : correctCount >= 2
                  ? "No está mal, sigue practicando"
                  : "Hay que estudiar más, ¡tú puedes!"}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center animate-count-up stagger-1">
                <p className="text-2xl font-extrabold text-primary">{xpEarned}</p>
                <p className="text-xs text-gray-500">XP ganados</p>
              </div>
              <div className="text-center animate-count-up stagger-2">
                <div className="flex items-center justify-center gap-1">
                  <span className={`text-2xl font-extrabold text-amber-500 ${streak >= 3 ? "animate-streak-fire" : ""}`}>
                    {streak}
                  </span>
                  {streak >= 3 && <span className="text-lg">🔥</span>}
                </div>
                <p className="text-xs text-gray-500">Racha</p>
              </div>
              <div className="text-center animate-count-up stagger-3">
                <p className="text-2xl font-extrabold text-gray-900">{totalXp.toLocaleString()}</p>
                <p className="text-xs text-gray-500">XP total</p>
              </div>
            </div>

            {/* Streak Message */}
            {streak >= 3 && (
              <div className="animate-scale-in bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-3 text-center mb-6 border border-amber-200">
                <span className="text-sm font-semibold text-amber-700">
                  🔥 ¡Racha de {streak} días! Multiplicador x1.5 XP activo
                </span>
              </div>
            )}

            {/* Separator */}
            <div className="border-t border-gray-100 pt-4 mb-4">
              <p className="text-xs text-gray-400 text-center mb-4">
                Hoy <span className="font-semibold text-gray-500">3,847</span> personas completaron el desafío
                &middot; Promedio: <span className="font-semibold text-gray-500">3.2/{QUESTIONS_PER_DAY}</span>
              </p>
            </div>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="w-full bg-gradient-to-r from-primary to-primary/90 text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity tap-feedback flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Compartir resultado
            </button>

            {/* Shareable Text Preview */}
            <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                &quot;¡Acerté {correctCount}/{QUESTIONS_PER_DAY} en el desafío diario de Candidatazo! ¿Puedes superarme?&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center space-y-3 animate-fade-in stagger-4">
          <a
            href="/"
            className="btn-outline w-full inline-flex"
          >
            Volver al inicio
          </a>
          <p className="text-sm text-gray-400">
            Nuevo desafío mañana a las 00:00
          </p>
        </div>
      </div>
    </main>
  );
}
