import Link from "next/link";
import { DIMENSION_CONFIG } from "@candidatazo/types";
import type { Dimension } from "@candidatazo/types";

// Candidate data - 24 candidates for Peru 2026 elections
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
    name: "Cesar Acuna",
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
  {
    slug: "rafael-lopez-aliaga",
    name: "Rafael Lopez Aliaga",
    party: "Renovacion Popular",
    photo: "/candidates/rla.jpg",
    age: 62,
    bio: "Empresario y actual alcalde de Lima. Conservador y religioso. Propone libre mercado, valores tradicionales y mano dura contra la delincuencia.",
    positions: { economic: 82, social: 12, environment: 25, security: 88, institutional: 20 },
    truthScore: 35,
    promiseCount: 14,
  },
  {
    slug: "carlos-ananos",
    name: "Carlos Ananos",
    party: "Peru Moderno",
    photo: "/candidates/ananos.jpg",
    age: 56,
    bio: "Empresario fundador de Kola Real / AJE Group. Propone emprendimiento, innovacion y apoyo a mypes con experiencia empresarial.",
    positions: { economic: 78, social: 50, environment: 45, security: 50, institutional: 45 },
    truthScore: 44,
    promiseCount: 10,
  },
  {
    slug: "pedro-castillo",
    name: "Pedro Castillo",
    party: "Peru Libre",
    photo: "/candidates/castillo.jpg",
    age: 55,
    bio: "Expresidente del Peru (2021-2022). Maestro rural de Cajamarca. Propone nueva constitucion, asamblea constituyente y apoyo al agro.",
    positions: { economic: 18, social: 35, environment: 55, security: 50, institutional: 95 },
    truthScore: 25,
    promiseCount: 8,
  },
  {
    slug: "alberto-otarola",
    name: "Alberto Otarola",
    party: "Peru Primero",
    photo: "/candidates/otarola.jpg",
    age: 56,
    bio: "Abogado y exprimer ministro. Enfocado en seguridad nacional, defensa y estabilidad institucional.",
    positions: { economic: 62, social: 38, environment: 35, security: 78, institutional: 35 },
    truthScore: 40,
    promiseCount: 9,
  },
  {
    slug: "yonhy-lescano",
    name: "Yonhy Lescano",
    party: "Accion Popular",
    photo: "/candidates/lescano.jpg",
    age: 64,
    bio: "Excongresista por Puno. Abogado defensor de derechos del consumidor. Propone descentralizacion y defensa de los mas pobres.",
    positions: { economic: 35, social: 55, environment: 60, security: 45, institutional: 70 },
    truthScore: 42,
    promiseCount: 13,
  },
  {
    slug: "patricia-chirinos",
    name: "Patricia Chirinos",
    party: "Avanza Pais",
    photo: "/candidates/chirinos.jpg",
    age: 58,
    bio: "Excongresista y exgobernadora del Callao. Enfocada en lucha anticorrupcion, seguridad y derechos de la mujer.",
    positions: { economic: 68, social: 55, environment: 40, security: 72, institutional: 55 },
    truthScore: 44,
    promiseCount: 11,
  },
  {
    slug: "flor-pablo",
    name: "Flor Pablo",
    party: "Juntos por el Peru",
    photo: "/candidates/florpablo.jpg",
    age: 58,
    bio: "Educadora y excongresista. Exministra de Educacion. Propone reforma educativa integral, igualdad de genero y derechos sociales.",
    positions: { economic: 35, social: 78, environment: 72, security: 28, institutional: 75 },
    truthScore: 52,
    promiseCount: 16,
  },
  {
    slug: "jose-luna",
    name: "Jose Luna",
    party: "Podemos Peru",
    photo: "/candidates/luna.jpg",
    age: 56,
    bio: "Empresario educativo y excongresista. Fundador de la Universidad Telesup. Propone educacion tecnica y empleo juvenil.",
    positions: { economic: 65, social: 35, environment: 28, security: 55, institutional: 30 },
    truthScore: 32,
    promiseCount: 9,
  },
  {
    slug: "marco-arana",
    name: "Marco Arana",
    party: "Frente Amplio",
    photo: "/candidates/arana.jpg",
    age: 64,
    bio: "Sacerdote y ambientalista de Cajamarca. Lider en la defensa del agua y contra la mineria contaminante. Propone proteccion ambiental radical.",
    positions: { economic: 20, social: 75, environment: 95, security: 25, institutional: 82 },
    truthScore: 50,
    promiseCount: 12,
  },
  {
    slug: "roberto-sanchez",
    name: "Roberto Sanchez",
    party: "Juntos por el Peru",
    photo: "/candidates/sanchez.jpg",
    age: 58,
    bio: "Empresario turistico y exministro de Comercio Exterior. Propone turismo como motor economico y descentralizacion productiva.",
    positions: { economic: 45, social: 55, environment: 65, security: 40, institutional: 60 },
    truthScore: 40,
    promiseCount: 10,
  },
  {
    slug: "luis-arce",
    name: "Luis Arce",
    party: "Peru Patria Segura",
    photo: "/candidates/arce.jpg",
    age: 58,
    bio: "Militar retirado. Especialista en seguridad y defensa nacional. Propone militarizar la lucha contra el narcotrafico.",
    positions: { economic: 50, social: 25, environment: 30, security: 92, institutional: 35 },
    truthScore: 38,
    promiseCount: 7,
  },
  {
    slug: "alejandro-toledo",
    name: "Alejandro Toledo",
    party: "Peru Posible",
    photo: "/candidates/toledo.jpg",
    age: 80,
    bio: "Expresidente del Peru (2001-2006). Economista formado en Stanford. Propone inversion en infraestructura y educacion.",
    positions: { economic: 70, social: 58, environment: 48, security: 42, institutional: 55 },
    truthScore: 28,
    promiseCount: 11,
  },
  {
    slug: "ricardo-belmont",
    name: "Ricardo Belmont",
    party: "Peru en Accion",
    photo: "/candidates/belmont.jpg",
    age: 80,
    bio: "Comunicador y exalcalde de Lima. Figura mediatica. Propone obras publicas, empleo directo y comunicacion con el pueblo.",
    positions: { economic: 55, social: 30, environment: 32, security: 60, institutional: 40 },
    truthScore: 30,
    promiseCount: 8,
  },
  {
    slug: "sigrid-bazan",
    name: "Sigrid Bazan",
    party: "Cambio Democratico",
    photo: "/candidates/bazan.jpg",
    age: 31,
    bio: "Excongresista y periodista. La candidata mas joven. Propone derechos laborales, igualdad de genero y reforma politica.",
    positions: { economic: 30, social: 85, environment: 78, security: 30, institutional: 80 },
    truthScore: 48,
    promiseCount: 15,
  },
  {
    slug: "jose-vega",
    name: "Jose Vega",
    party: "Union por el Peru",
    photo: "/candidates/vega.jpg",
    age: 62,
    bio: "Excongresista y lider de UPP. Vinculado al etnocacerismo. Propone nacionalismo y reivindicacion del Peru profundo.",
    positions: { economic: 22, social: 25, environment: 45, security: 80, institutional: 85 },
    truthScore: 30,
    promiseCount: 7,
  },
  {
    slug: "martin-vizcarra",
    name: "Martin Vizcarra",
    party: "Peru Primero",
    photo: "/candidates/vizcarra.jpg",
    age: 63,
    bio: "Expresidente del Peru (2018-2020). Ingeniero de Moquegua. Propone lucha anticorrupcion, reforma politica y descentralizacion.",
    positions: { economic: 58, social: 55, environment: 55, security: 50, institutional: 72 },
    truthScore: 45,
    promiseCount: 13,
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
