import Link from "next/link";

const COURSES = [
  {
    id: 1,
    title: "Como funciona el Congreso",
    description:
      "Bicameralidad, funciones legislativas, fiscalizacion y representacion. Entiende el rol del Congreso en la democracia peruana.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    difficulty: "Basico",
    difficultyColor: "bg-green-100 text-green-700",
    time: "15 min",
    topics: ["Unicameralidad vs Bicameralidad", "Comisiones", "Proceso legislativo"],
  },
  {
    id: 2,
    title: "El poder del voto",
    description:
      "Tu voto cambia el Peru. Conoce como funciona el sistema de votacion, que impacto tiene tu voto y por que cada eleccion importa.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    difficulty: "Basico",
    difficultyColor: "bg-green-100 text-green-700",
    time: "10 min",
    topics: ["Voto obligatorio", "Cifra repartidora", "Segunda vuelta"],
  },
  {
    id: 3,
    title: "Que es la Constitucion?",
    description:
      "La carta magna explicada en terminos simples. Derechos, deberes, organizacion del Estado y como se modifica.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    difficulty: "Basico",
    difficultyColor: "bg-green-100 text-green-700",
    time: "20 min",
    topics: ["Derechos fundamentales", "Poderes del Estado", "Reforma constitucional"],
  },
  {
    id: 4,
    title: "Partidos politicos en Peru",
    description:
      "Historia y actualidad del sistema de partidos. Desde los primeros partidos hasta la fragmentacion actual.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    difficulty: "Intermedio",
    difficultyColor: "bg-yellow-100 text-yellow-700",
    time: "25 min",
    topics: ["APRA y su legado", "Fragmentacion", "Partidos vientre de alquiler"],
  },
  {
    id: 5,
    title: "Corrupcion: como combatirla",
    description:
      "Herramientas civicas contra la corrupcion. Mecanismos de fiscalizacion, transparencia y participacion ciudadana.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    difficulty: "Intermedio",
    difficultyColor: "bg-yellow-100 text-yellow-700",
    time: "20 min",
    topics: ["Odebrecht", "Contraloria", "Denuncia ciudadana"],
  },
  {
    id: 6,
    title: "Derechos fundamentales",
    description:
      "Conoce tus derechos como ciudadano peruano. Derechos civiles, politicos, economicos y sociales que la Constitucion te garantiza.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    difficulty: "Basico",
    difficultyColor: "bg-green-100 text-green-700",
    time: "15 min",
    topics: ["Habeas corpus", "Libertad de expresion", "Derecho a la salud"],
  },
  {
    id: 7,
    title: "El sistema electoral peruano",
    description:
      "JNE, ONPE, RENIEC: las tres instituciones que hacen posible las elecciones. Como se organizan, se cuentan votos y se resuelven disputas.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    difficulty: "Intermedio",
    difficultyColor: "bg-yellow-100 text-yellow-700",
    time: "20 min",
    topics: ["JNE", "ONPE", "RENIEC", "Actas electorales"],
  },
  {
    id: 8,
    title: "Economia para ciudadanos",
    description:
      "PBI, inflacion, impuestos y presupuesto explicados sin jerga. Entiende la economia para evaluar las propuestas de los candidatos.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    difficulty: "Avanzado",
    difficultyColor: "bg-primary-100 text-primary-700",
    time: "30 min",
    topics: ["PBI", "Inflacion", "Politica fiscal", "Deuda publica"],
  },
];

const LEVELS = [
  {
    name: "Ciudadano",
    description: "Completa 1 curso",
    xp: "0 - 100 XP",
    color: "bg-gray-200 text-gray-700",
  },
  {
    name: "Analista",
    description: "Completa 3 cursos",
    xp: "100 - 300 XP",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Experto",
    description: "Completa 6 cursos",
    xp: "300 - 600 XP",
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Lider de Opinion",
    description: "Completa todos + quizzes",
    xp: "600+ XP",
    color: "bg-gold-100 text-gold-700",
  },
];

export default function AcademiaPage() {
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
            <span className="text-gray-700 font-medium">Academia Civica</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary-50 via-white to-primary-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-700 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              8 cursos disponibles
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Academia{" "}
              <span className="bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
                Civica
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Aprende, entiende, decide. Cursos cortos y accesibles sobre politica, gobierno y
              ciudadania para que votes con conocimiento.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Level system */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Sistema de Niveles
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {LEVELS.map((level, index) => (
              <div key={level.name} className="card text-center p-5">
                <div className="flex items-center justify-center mb-3">
                  {index > 0 && (
                    <div className="hidden md:block w-8 h-0.5 bg-gray-200 absolute -left-4" />
                  )}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${level.color}`}
                  >
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-bold text-gray-800 text-sm">{level.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{level.description}</p>
                <span className="inline-block mt-2 text-xs font-semibold text-gray-400">
                  {level.xp}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Course grid */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Cursos Disponibles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {COURSES.map((course) => (
              <div key={course.id} className="card group relative overflow-hidden">
                {/* Proximamente badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="badge bg-gold-100 text-gold-700 text-xs font-semibold">
                    Proximamente
                  </span>
                </div>

                {/* Icon */}
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                  {course.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 pr-20 leading-snug">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {course.description}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {course.topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className={`badge text-xs ${course.difficultyColor}`}>
                    {course.difficulty}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Daily quiz placeholder */}
        <section className="mt-12">
          <div className="card bg-gradient-to-r from-secondary-50 to-primary-50 border border-secondary-100 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Quiz Diario
            </h3>
            <p className="text-gray-500 mb-4 text-sm max-w-md mx-auto">
              Cada dia una pregunta sobre politica, gobierno o ciudadania.
              Gana puntos y sube de nivel mientras aprendes.
            </p>
            <span className="badge bg-secondary-100 text-secondary-600 text-sm font-semibold">
              Proximamente
            </span>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <div className="card bg-gradient-to-r from-primary-50 to-gold-50 border border-primary-100 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Ya sabes lo basico? Pon a prueba tu perfil
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              Aplica lo que aprendiste y descubre tu DNA Politico con nuestro test de 30 preguntas.
            </p>
            <Link href="/test" className="btn-primary">
              Hacer el DNA Test
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
