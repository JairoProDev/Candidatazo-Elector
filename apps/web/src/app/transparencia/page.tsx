import Link from "next/link";

const PRINCIPLES = [
  {
    title: "Imparcialidad política",
    description:
      "Candidatazo no está afiliado ni financiado por ningún partido político, candidato o grupo de interés. Todos los candidatos reciben el mismo tratamiento y cobertura.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    ),
  },
  {
    title: "Datos verificables",
    description:
      "Toda información presentada está respaldada por fuentes oficiales y verificables. Citamos nuestras fuentes y proporcionamos enlaces para que puedas verificar por tu cuenta.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    title: "Código abierto",
    description:
      "El código fuente de Candidatazo es público y abierto a revisión. Cualquier persona puede inspeccionar nuestros algoritmos, verificar nuestros cálculos y proponer mejoras.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    ),
  },
  {
    title: "Sin publicidad política",
    description:
      "No aceptamos publicidad de partidos políticos ni de candidatos. Nuestro modelo se basa en la contribución comunitaria y el apoyo de organizaciones cívicas.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    ),
  },
  {
    title: "Protección de datos",
    description:
      "Los datos de los usuarios se manejan con estricta confidencialidad. No vendemos datos personales ni los compartimos con terceros. Las respuestas del test son anónimas.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    ),
  },
  {
    title: "Mejora continua",
    description:
      "Actualizamos constantemente nuestros datos y metodología. Escuchamos críticas constructivas y realizamos correcciones cuando se identifican errores.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    ),
  },
];

const TEAM_ROLES = [
  { role: "Desarrollo", desc: "Ingenieros de software que construyen y mantienen la plataforma" },
  { role: "Análisis político", desc: "Politólogos que clasifican posiciones de candidatos" },
  { role: "Fact-checking", desc: "Periodistas que verifican declaraciones de candidatos" },
  { role: "Diseño", desc: "Diseñadores que crean una experiencia accesible para todos" },
  { role: "Datos", desc: "Analistas que recopilan y procesan información electoral" },
];

export default function TransparenciaPage() {
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
            <span className="text-gray-700 font-medium">Transparencia</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-gold-50 via-white to-primary-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-700 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Transparencia total
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Nuestro Compromiso de{" "}
            <span className="bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent">
              Transparencia
            </span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            Creemos que una plataforma de información electoral debe predicar con
            el ejemplo. Aquí explicamos quiénes somos, cómo trabajamos y cómo
            puedes verificar todo lo que hacemos.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Principles */}
        <section className="mb-16">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
            Nuestros Principios
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {PRINCIPLES.map((principle) => (
              <div key={principle.title} className="card">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {principle.icon}
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{principle.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Funding */}
        <section className="mb-16">
          <div className="card bg-gradient-to-br from-gold-50 to-white border border-gold-200">
            <h2 className="text-xl font-extrabold text-gray-900 mb-4">
              Financiamiento
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Candidatazo es un proyecto cívico sin fines de lucro. No recibimos
              dinero de partidos políticos, candidatos ni grupos de interés. El
              proyecto se financia mediante:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                Contribuciones voluntarias de la comunidad
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                Apoyo de organizaciones cívicas y educativas
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                Trabajo voluntario del equipo
              </li>
            </ul>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
            Equipo
          </h2>
          <p className="text-gray-500 mb-6">
            Candidatazo está construido por un equipo multidisciplinario de peruanos
            comprometidos con la democracia.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEAM_ROLES.map((member) => (
              <div key={member.role} className="card p-4">
                <h4 className="font-bold text-gray-800 text-sm">{member.role}</h4>
                <p className="text-xs text-gray-500 mt-1">{member.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <div className="card bg-gradient-to-r from-primary-50 to-gold-50 border border-primary-100 text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Tienes preguntas o sugerencias?
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              Estamos abiertos al diálogo y la colaboración. Escribe a nuestro equipo.
            </p>
            <a
              href="mailto:contacto@candidatazo.pe"
              className="btn-primary inline-flex"
            >
              contacto@candidatazo.pe
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
