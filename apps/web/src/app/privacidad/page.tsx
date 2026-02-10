import Link from "next/link";

const SECTIONS = [
  {
    title: "1. Informacion que recopilamos",
    content: [
      "Respuestas del DNA Test: Tus respuestas a las 30 preguntas del test de perfil politico. Estas se procesan de forma anonima para calcular tu perfil y match con candidatos.",
      "Datos de uso: Informacion anonima sobre como navegas la plataforma (paginas visitadas, tiempo en pagina) para mejorar la experiencia.",
      "Preferencias: Si eliges crear una cuenta, almacenamos tu nombre, email y preferencias para personalizar tu experiencia.",
      "No recopilamos informacion de pago, ubicacion precisa, ni datos biometricos.",
    ],
  },
  {
    title: "2. Como usamos tu informacion",
    content: [
      "Calcular tu perfil DNA politico y tu match con los candidatos.",
      "Mejorar la calidad y precision de nuestras herramientas.",
      "Generar estadisticas agregadas y anonimas sobre tendencias politicas (sin identificar individuos).",
      "Enviarte notificaciones sobre nuevas funcionalidades si aceptas recibirlas.",
    ],
  },
  {
    title: "3. Lo que NO hacemos",
    content: [
      "NO vendemos tus datos personales a terceros.",
      "NO compartimos tu perfil politico con partidos, candidatos o campanas.",
      "NO usamos tus datos para publicidad politica dirigida.",
      "NO almacenamos tus respuestas del test si no creas una cuenta - se procesan localmente en tu dispositivo.",
    ],
  },
  {
    title: "4. Almacenamiento y seguridad",
    content: [
      "Los datos se almacenan en servidores seguros con encriptacion en transito (HTTPS/TLS) y en reposo.",
      "El DNA Test funciona localmente en tu dispositivo - tus respuestas no se envian a ningun servidor a menos que crees una cuenta.",
      "Implementamos medidas de seguridad estandar de la industria para proteger tus datos.",
      "Realizamos auditorias de seguridad periodicas.",
    ],
  },
  {
    title: "5. Tus derechos",
    content: [
      "Acceso: Puedes solicitar una copia de todos los datos que tenemos sobre ti.",
      "Rectificacion: Puedes corregir cualquier dato incorrecto.",
      "Eliminacion: Puedes solicitar que eliminemos todos tus datos en cualquier momento.",
      "Portabilidad: Puedes exportar tus datos en formato estandar.",
    ],
  },
  {
    title: "6. Cookies y tecnologias similares",
    content: [
      "Usamos cookies estrictamente necesarias para el funcionamiento de la plataforma.",
      "No usamos cookies de rastreo de terceros ni publicidad.",
      "Puedes desactivar las cookies en tu navegador sin afectar la funcionalidad basica.",
    ],
  },
  {
    title: "7. Cambios a esta politica",
    content: [
      "Si modificamos esta politica de privacidad, publicaremos los cambios en esta pagina con la fecha de actualizacion.",
      "Para cambios significativos, notificaremos a los usuarios registrados por email.",
    ],
  },
];

export default function PrivacidadPage() {
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
            <span className="text-gray-700 font-medium">Privacidad</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary-50 via-white to-primary-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Politica de{" "}
            <span className="bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
              Privacidad
            </span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            Tu privacidad es fundamental. Aqui explicamos de forma clara y
            transparente como manejamos tu informacion en Candidatazo.
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Ultima actualizacion: Febrero 2026
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Key highlights */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <div className="card p-4 text-center bg-green-50 border border-green-200">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-green-800 text-sm">No vendemos datos</h3>
            <p className="text-xs text-green-600 mt-1">Jamas vendemos informacion personal</p>
          </div>
          <div className="card p-4 text-center bg-blue-50 border border-blue-200">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-bold text-blue-800 text-sm">Test local</h3>
            <p className="text-xs text-blue-600 mt-1">El test se procesa en tu dispositivo</p>
          </div>
          <div className="card p-4 text-center bg-purple-50 border border-purple-200">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="font-bold text-purple-800 text-sm">Derecho al olvido</h3>
            <p className="text-xs text-purple-600 mt-1">Puedes borrar tus datos cuando quieras</p>
          </div>
        </div>

        {/* Policy sections */}
        <div className="space-y-8">
          {SECTIONS.map((section) => (
            <section key={section.title} className="card">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.content.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Contact */}
        <section className="mt-12 text-center">
          <div className="card bg-gradient-to-r from-primary-50 to-gold-50 border border-primary-100 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Preguntas sobre privacidad?
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              Si tienes preguntas sobre como manejamos tus datos, contactanos.
            </p>
            <a
              href="mailto:privacidad@candidatazo.pe"
              className="btn-primary inline-flex"
            >
              privacidad@candidatazo.pe
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
