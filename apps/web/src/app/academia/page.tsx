import Link from "next/link";
import { COURSES } from "./data/courses";

const LEVELS = [
  {
    name: "Ciudadano",
    description: "Completa 1 curso",
    xp: "0 - 100 XP",
    color: "bg-gray-200 text-gray-700",
    slug: "ciudadano"
  },
  {
    name: "Analista",
    description: "Completa 3 cursos",
    xp: "100 - 300 XP",
    color: "bg-blue-100 text-blue-700",
    slug: "analista"
  },
  {
    name: "Experto",
    description: "Completa 6 cursos",
    xp: "300 - 600 XP",
    color: "bg-purple-100 text-purple-700",
    slug: "experto"
  },
  {
    name: "Líder de Opinión",
    description: "Completa todos + quizzes",
    xp: "600+ XP",
    color: "bg-gold-100 text-gold-700",
    slug: "lider"
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
            <span className="text-gray-700 font-medium">Academia Cívica</span>
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
              {COURSES.length} cursos disponibles
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Academia{" "}
              <span className="bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
                Cívica
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Aprende, entiende, decide. Cursos cortos y accesibles sobre política, gobierno y
              ciudadanía para que votes con conocimiento.
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
            {COURSES.map((course) => {
              // Logic for course availability and URL
              const isBicameralidad = course.slug === "bicameralidad";
              const hasContent = course.lessons && course.lessons.length > 0;
              const isAvailable = isBicameralidad || hasContent;

              const courseUrl = isBicameralidad
                ? "/academia/bicameralidad"
                : `/academia/courses/${course.slug}`;

              const courseCard = (
                <div
                  className={`card group relative overflow-hidden h-full flex flex-col ${isAvailable ? 'cursor-pointer hover:shadow-lg hover:border-primary-200' : 'opacity-75'} transition-all duration-200`}
                >
                  {/* Status badge */}
                  {!isAvailable && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="badge bg-gold-100 text-gold-700 text-xs font-semibold">
                        Próximamente
                      </span>
                    </div>
                  )}
                  {isAvailable && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="badge bg-green-100 text-green-700 text-xs font-semibold">
                        ¡Disponible!
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-4 text-primary ${isAvailable ? 'group-hover:scale-110' : ''} transition-transform`}>
                    {course.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-800 mb-2 pr-20 leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-grow">
                    {course.description}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {course.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
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

                  {/* Available indicator */}
                  {isAvailable && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              );

              return isAvailable ? (
                <Link href={courseUrl} key={course.id} className="block h-full">
                  {courseCard}
                </Link>
              ) : (
                <div key={course.id} className="block h-full">
                  {courseCard}
                </div>
              );
            })}
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
              Cada día una pregunta sobre política, gobierno o ciudadanía.
              Gana puntos y sube de nivel mientras aprendes.
            </p>
            <span className="badge bg-secondary-100 text-secondary-600 text-sm font-semibold">
              Próximamente
            </span>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <div className="card bg-gradient-to-r from-primary-50 to-gold-50 border border-primary-100 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Ya sabes lo básico? Pon a prueba tu perfil
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              Aplica lo que aprendiste y descubre tu ADN Político con nuestro test de 30 preguntas.
            </p>
            <Link href="/test" className="btn-primary">
              Hacer el ADN Test
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
