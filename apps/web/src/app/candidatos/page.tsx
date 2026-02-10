import Link from "next/link";
import { DIMENSION_CONFIG } from "@candidatazo/types";
import type { Dimension } from "@candidatazo/types";

// Candidate seed data - same as what will be in the database
const CANDIDATES = [
  {
    slug: "keiko-fujimori",
    name: "Keiko Fujimori",
    party: "Fuerza Popular",
    photo: "/candidates/keiko.jpg",
    age: 50,
    bio: "Lideresa de Fuerza Popular, hija de Alberto Fujimori. Tres veces candidata presidencial. Propone seguridad ciudadana, libre mercado y mano dura contra la delincuencia.",
    positions: { economic: 72, social: 28, environment: 35, security: 85, institutional: 30 },
    truthScore: 45,
    promiseCount: 12,
  },
  {
    slug: "antauro-humala",
    name: "Antauro Humala",
    party: "Frente Patriotico",
    photo: "/candidates/antauro.jpg",
    age: 61,
    bio: "Exmilitar y lider etnocacerista. Estuvo preso por el Andahuaylazo. Propone nacionalizacion de recursos, pena de muerte y refundacion del Estado.",
    positions: { economic: 15, social: 20, environment: 40, security: 95, institutional: 90 },
    truthScore: 30,
    promiseCount: 8,
  },
  {
    slug: "cesar-acuna",
    name: "Cesar Acuña",
    party: "Alianza para el Progreso",
    photo: "/candidates/acuna.jpg",
    age: 72,
    bio: "Empresario y fundador de la Universidad Cesar Vallejo. Exgobernador de La Libertad. Propone educacion, empleo y obras publicas.",
    positions: { economic: 60, social: 40, environment: 30, security: 55, institutional: 35 },
    truthScore: 38,
    promiseCount: 15,
  },
  {
    slug: "daniel-urresti",
    name: "Daniel Urresti",
    party: "Podemos Peru",
    photo: "/candidates/urresti.jpg",
    age: 67,
    bio: "General retirado del Ejercito. Enfocado en seguridad ciudadana y lucha contra el crimen. Propone mano dura y militarizacion.",
    positions: { economic: 55, social: 35, environment: 30, security: 90, institutional: 40 },
    truthScore: 42,
    promiseCount: 10,
  },
  {
    slug: "veronika-mendoza",
    name: "Veronika Mendoza",
    party: "Juntos por el Peru",
    photo: "/candidates/mendoza.jpg",
    age: 41,
    bio: "Excongresista y politologa. Lideresa de la izquierda democratica. Propone nueva Constitucion, derechos sociales y proteccion ambiental.",
    positions: { economic: 25, social: 82, environment: 85, security: 30, institutional: 88 },
    truthScore: 55,
    promiseCount: 18,
  },
  {
    slug: "hernando-de-soto",
    name: "Hernando de Soto",
    party: "Avanza Pais",
    photo: "/candidates/desoto.jpg",
    age: 84,
    bio: "Economista reconocido internacionalmente. Autor de 'El Misterio del Capital'. Propone formalizacion, derechos de propiedad y libre mercado.",
    positions: { economic: 88, social: 55, environment: 45, security: 45, institutional: 65 },
    truthScore: 52,
    promiseCount: 9,
  },
  {
    slug: "julio-guzman",
    name: "Julio Guzman",
    party: "Partido Morado",
    photo: "/candidates/guzman.jpg",
    age: 51,
    bio: "Exfuncionario publico y tecnocrata. Lider del centro-liberal. Propone modernizacion del Estado, educacion y tecnologia.",
    positions: { economic: 65, social: 70, environment: 65, security: 40, institutional: 75 },
    truthScore: 50,
    promiseCount: 14,
  },
  {
    slug: "george-forsyth",
    name: "George Forsyth",
    party: "Somos Peru",
    photo: "/candidates/forsyth.jpg",
    age: 43,
    bio: "Exfutbolista y exalcalde de La Victoria. Enfocado en seguridad y gestion municipal. Propone orden, tecnologia y trabajo.",
    positions: { economic: 58, social: 48, environment: 42, security: 70, institutional: 50 },
    truthScore: 43,
    promiseCount: 11,
  },
];

export default function CandidatosPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Candidatos Presidenciales 2026
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              Conoce las posiciones politicas de cada candidato en 5
              dimensiones. Compara sus propuestas, verifica sus datos y
              encuentra tu match.
            </p>
          </div>
        </div>
      </section>

      {/* Candidates grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CANDIDATES.map((candidate) => (
            <CandidateCard key={candidate.slug} candidate={candidate} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Quieres saber con quien haces match?
          </h3>
          <p className="text-gray-500 mb-6">
            Completa el DNA Test para comparar tu perfil con todos los candidatos.
          </p>
          <Link href="/test" className="btn-primary">
            Hacer el DNA Test
          </Link>
        </div>
      </section>
    </div>
  );
}

function CandidateCard({
  candidate,
}: {
  candidate: (typeof CANDIDATES)[0];
}) {
  const dimensions: { key: string; dimension: Dimension }[] = [
    { key: "economic", dimension: "ECONOMIC" },
    { key: "social", dimension: "SOCIAL" },
    { key: "environment", dimension: "ENVIRONMENT" },
    { key: "security", dimension: "SECURITY" },
    { key: "institutional", dimension: "INSTITUTIONAL" },
  ];

  return (
    <Link
      href={`/candidatos/${candidate.slug}`}
      className="card group p-5 cursor-pointer"
    >
      {/* Photo + Name */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
          <span className="text-2xl font-bold text-primary">
            {candidate.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-gray-800 group-hover:text-primary transition-colors truncate">
            {candidate.name}
          </h3>
          <p className="text-sm text-gray-500 truncate">{candidate.party}</p>
        </div>
      </div>

      {/* Truth Score */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-gray-500">Veracidad:</span>
        <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${candidate.truthScore}%`,
              backgroundColor:
                candidate.truthScore > 60
                  ? "#10B981"
                  : candidate.truthScore > 40
                    ? "#F59E0B"
                    : "#EF4444",
            }}
          />
        </div>
        <span className="text-xs font-semibold text-gray-600">
          {candidate.truthScore}%
        </span>
      </div>

      {/* Mini dimension bars */}
      <div className="space-y-2">
        {dimensions.map(({ key, dimension }) => {
          const config = DIMENSION_CONFIG[dimension];
          const score = candidate.positions[key as keyof typeof candidate.positions];
          return (
            <div key={key} className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 w-16 truncate">
                {config.label}
              </span>
              <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${score}%`,
                    backgroundColor: config.color,
                  }}
                />
              </div>
              <span className="text-[10px] font-medium text-gray-500 w-7 text-right">
                {score}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {candidate.promiseCount} propuestas
        </span>
        <span className="text-xs font-medium text-primary group-hover:underline">
          Ver perfil
        </span>
      </div>
    </Link>
  );
}
