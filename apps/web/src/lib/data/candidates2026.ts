export type CandidateDimension = "economic" | "social" | "environment" | "security" | "institutional";

export interface Candidate2026ListItem {
  rank: number;
  slug: string;
  name: string;
  party: string;
  age: number;
  positions: Record<CandidateDimension, number>;
  truthScore: number;
  promiseCount: number;
  antiVote: number;
  continuityBlock: "continuidad" | "disrupcion" | "mixto";
  legalRisk: "bajo" | "medio" | "alto";
  digitalAgendaScore: number;
  candidacyStatus: "estable" | "incierta";
}

export const OFFICIAL_CANDIDATES_2026: Candidate2026ListItem[] = [
  { rank: 1, slug: "rafael-lopez-aliaga", name: "Rafael Lopez Aliaga", party: "Renovacion Popular", age: 65, positions: { economic: 82, social: 20, environment: 28, security: 86, institutional: 35 }, truthScore: 35, promiseCount: 14, antiVote: 52, continuityBlock: "continuidad", legalRisk: "medio", digitalAgendaScore: 34, candidacyStatus: "estable" },
  { rank: 2, slug: "keiko-fujimori", name: "Keiko Fujimori", party: "Fuerza Popular", age: 50, positions: { economic: 72, social: 28, environment: 35, security: 85, institutional: 30 }, truthScore: 45, promiseCount: 12, antiVote: 62, continuityBlock: "continuidad", legalRisk: "alto", digitalAgendaScore: 35, candidacyStatus: "estable" },
  { rank: 3, slug: "alfonso-lopez-chau", name: "Alfonso Lopez-Chau", party: "Ahora Nacion", age: 70, positions: { economic: 30, social: 72, environment: 65, security: 45, institutional: 70 }, truthScore: 58, promiseCount: 13, antiVote: 24, continuityBlock: "disrupcion", legalRisk: "bajo", digitalAgendaScore: 49, candidacyStatus: "estable" },
  { rank: 4, slug: "cesar-acuna", name: "Cesar Acuna", party: "Alianza para el Progreso (APP)", age: 72, positions: { economic: 60, social: 40, environment: 30, security: 55, institutional: 35 }, truthScore: 38, promiseCount: 15, antiVote: 54, continuityBlock: "continuidad", legalRisk: "alto", digitalAgendaScore: 33, candidacyStatus: "estable" },
  { rank: 5, slug: "carlos-alvarez", name: "Carlos Alvarez", party: "Pais para Todos", age: 58, positions: { economic: 45, social: 65, environment: 50, security: 50, institutional: 55 }, truthScore: 48, promiseCount: 12, antiVote: 21, continuityBlock: "mixto", legalRisk: "bajo", digitalAgendaScore: 44, candidacyStatus: "estable" },
  { rank: 6, slug: "roberto-chiabra", name: "Roberto Chiabra", party: "Alianza Unidad Nacional", age: 74, positions: { economic: 62, social: 38, environment: 35, security: 82, institutional: 50 }, truthScore: 49, promiseCount: 10, antiVote: 26, continuityBlock: "continuidad", legalRisk: "bajo", digitalAgendaScore: 36, candidacyStatus: "estable" },
  { rank: 7, slug: "jorge-nieto", name: "Jorge Nieto", party: "Partido del Buen Gobierno", age: 69, positions: { economic: 58, social: 55, environment: 52, security: 48, institutional: 74 }, truthScore: 56, promiseCount: 11, antiVote: 22, continuityBlock: "mixto", legalRisk: "bajo", digitalAgendaScore: 46, candidacyStatus: "estable" },
  { rank: 8, slug: "george-forsyth", name: "George Forsyth", party: "Somos Peru", age: 42, positions: { economic: 55, social: 55, environment: 50, security: 65, institutional: 50 }, truthScore: 44, promiseCount: 11, antiVote: 31, continuityBlock: "mixto", legalRisk: "medio", digitalAgendaScore: 42, candidacyStatus: "estable" },
  { rank: 9, slug: "jose-luna-galvez", name: "Jose Luna Galvez", party: "Podemos Peru", age: 56, positions: { economic: 65, social: 35, environment: 28, security: 55, institutional: 30 }, truthScore: 32, promiseCount: 9, antiVote: 48, continuityBlock: "continuidad", legalRisk: "medio", digitalAgendaScore: 31, candidacyStatus: "estable" },
  { rank: 10, slug: "mario-vizcarra", name: "Mario Vizcarra", party: "Peru Primero", age: 63, positions: { economic: 58, social: 55, environment: 55, security: 50, institutional: 72 }, truthScore: 45, promiseCount: 13, antiVote: 43, continuityBlock: "mixto", legalRisk: "alto", digitalAgendaScore: 41, candidacyStatus: "estable" },
  { rank: 11, slug: "ricardo-belmont", name: "Ricardo Belmont", party: "Partido Civico OBRAS", age: 80, positions: { economic: 55, social: 30, environment: 32, security: 60, institutional: 40 }, truthScore: 30, promiseCount: 8, antiVote: 47, continuityBlock: "mixto", legalRisk: "medio", digitalAgendaScore: 28, candidacyStatus: "estable" },
  { rank: 12, slug: "mesias-guevara", name: "Mesias Guevara", party: "Partido Morado", age: 61, positions: { economic: 62, social: 58, environment: 60, security: 45, institutional: 70 }, truthScore: 50, promiseCount: 12, antiVote: 27, continuityBlock: "mixto", legalRisk: "bajo", digitalAgendaScore: 58, candidacyStatus: "estable" },
  { rank: 13, slug: "yonhy-lescano", name: "Yonhy Lescano", party: "Cooperacion Popular", age: 64, positions: { economic: 35, social: 55, environment: 60, security: 45, institutional: 70 }, truthScore: 42, promiseCount: 13, antiVote: 36, continuityBlock: "mixto", legalRisk: "bajo", digitalAgendaScore: 38, candidacyStatus: "estable" },
  { rank: 14, slug: "marisol-perez-tello", name: "Marisol Perez Tello", party: "Primero la Gente", age: 57, positions: { economic: 52, social: 70, environment: 60, security: 46, institutional: 73 }, truthScore: 54, promiseCount: 12, antiVote: 18, continuityBlock: "disrupcion", legalRisk: "bajo", digitalAgendaScore: 55, candidacyStatus: "estable" },
  { rank: 15, slug: "roberto-sanchez", name: "Roberto Sanchez", party: "Juntos por el Peru", age: 55, positions: { economic: 20, social: 80, environment: 82, security: 35, institutional: 75 }, truthScore: 40, promiseCount: 12, antiVote: 35, continuityBlock: "disrupcion", legalRisk: "medio", digitalAgendaScore: 40, candidacyStatus: "estable" },
  { rank: 16, slug: "jose-williams", name: "Jose Williams", party: "Avanza Pais", age: 72, positions: { economic: 70, social: 30, environment: 35, security: 88, institutional: 45 }, truthScore: 46, promiseCount: 10, antiVote: 33, continuityBlock: "continuidad", legalRisk: "medio", digitalAgendaScore: 29, candidacyStatus: "estable" },
  { rank: 17, slug: "fernando-olivera", name: "Fernando Olivera", party: "Frente de la Esperanza 2021", age: 66, positions: { economic: 49, social: 57, environment: 51, security: 52, institutional: 79 }, truthScore: 53, promiseCount: 10, antiVote: 25, continuityBlock: "mixto", legalRisk: "bajo", digitalAgendaScore: 43, candidacyStatus: "estable" },
  { rank: 18, slug: "rafael-belaunde-llosa", name: "Rafael Belaunde Llosa", party: "Libertad Popular", age: 59, positions: { economic: 69, social: 39, environment: 44, security: 62, institutional: 58 }, truthScore: 47, promiseCount: 11, antiVote: 24, continuityBlock: "continuidad", legalRisk: "bajo", digitalAgendaScore: 45, candidacyStatus: "estable" },
  { rank: 19, slug: "vladimir-cerron", name: "Vladimir Cerron", party: "Peru Libre", age: 54, positions: { economic: 18, social: 30, environment: 52, security: 57, institutional: 90 }, truthScore: 27, promiseCount: 10, antiVote: 58, continuityBlock: "disrupcion", legalRisk: "alto", digitalAgendaScore: 24, candidacyStatus: "incierta" },
  { rank: 20, slug: "fiorella-molinelli", name: "Fiorella Molinelli", party: "Fuerza y Libertad", age: 50, positions: { economic: 63, social: 56, environment: 50, security: 53, institutional: 65 }, truthScore: 51, promiseCount: 10, antiVote: 19, continuityBlock: "mixto", legalRisk: "medio", digitalAgendaScore: 51, candidacyStatus: "estable" },
  { rank: 21, slug: "rosario-fernandez", name: "Rosario Fernandez", party: "Un Camino Diferente", age: 69, positions: { economic: 57, social: 58, environment: 47, security: 50, institutional: 76 }, truthScore: 55, promiseCount: 9, antiVote: 20, continuityBlock: "mixto", legalRisk: "bajo", digitalAgendaScore: 47, candidacyStatus: "estable" },
  { rank: 22, slug: "enrique-valderrama", name: "Enrique Valderrama", party: "Partido Aprista Peruano (APRA)", age: 62, positions: { economic: 60, social: 52, environment: 42, security: 54, institutional: 60 }, truthScore: 46, promiseCount: 10, antiVote: 32, continuityBlock: "continuidad", legalRisk: "medio", digitalAgendaScore: 34, candidacyStatus: "estable" },
  { rank: 23, slug: "alvaro-paz-de-la-barra", name: "Alvaro Paz de la Barra", party: "Fe en el Peru", age: 41, positions: { economic: 56, social: 50, environment: 45, security: 58, institutional: 52 }, truthScore: 43, promiseCount: 11, antiVote: 26, continuityBlock: "mixto", legalRisk: "medio", digitalAgendaScore: 50, candidacyStatus: "estable" },
  { rank: 24, slug: "ronald-atencio", name: "Ronald Atencio", party: "Alianza Electoral Venceremos", age: 47, positions: { economic: 48, social: 46, environment: 40, security: 72, institutional: 48 }, truthScore: 39, promiseCount: 9, antiVote: 29, continuityBlock: "disrupcion", legalRisk: "medio", digitalAgendaScore: 30, candidacyStatus: "estable" },
  { rank: 25, slug: "carlos-jaico", name: "Carlos Jaico", party: "Peru Moderno", age: 44, positions: { economic: 67, social: 46, environment: 42, security: 52, institutional: 50 }, truthScore: 44, promiseCount: 10, antiVote: 18, continuityBlock: "mixto", legalRisk: "bajo", digitalAgendaScore: 57, candidacyStatus: "estable" },
  { rank: 26, slug: "paul-jaimes", name: "Paul Jaimes", party: "Progresemos", age: 46, positions: { economic: 53, social: 60, environment: 50, security: 47, institutional: 57 }, truthScore: 47, promiseCount: 9, antiVote: 17, continuityBlock: "mixto", legalRisk: "bajo", digitalAgendaScore: 53, candidacyStatus: "estable" },
  { rank: 27, slug: "antonio-ortiz-villano", name: "Antonio Ortiz Villano", party: "Salvemos al Peru", age: 52, positions: { economic: 46, social: 49, environment: 44, security: 59, institutional: 55 }, truthScore: 41, promiseCount: 8, antiVote: 22, continuityBlock: "mixto", legalRisk: "bajo", digitalAgendaScore: 37, candidacyStatus: "estable" },
  { rank: 28, slug: "herbert-caller", name: "Herbert Caller", party: "Partido Patriotico del Peru", age: 57, positions: { economic: 51, social: 43, environment: 38, security: 76, institutional: 45 }, truthScore: 37, promiseCount: 9, antiVote: 30, continuityBlock: "continuidad", legalRisk: "medio", digitalAgendaScore: 32, candidacyStatus: "estable" },
  { rank: 29, slug: "charlie-carrasco", name: "Charlie Carrasco", party: "Partido Democrata Unido Peru", age: 45, positions: { economic: 54, social: 53, environment: 47, security: 50, institutional: 56 }, truthScore: 45, promiseCount: 8, antiVote: 16, continuityBlock: "mixto", legalRisk: "bajo", digitalAgendaScore: 48, candidacyStatus: "estable" },
  { rank: 30, slug: "armando-joaquin-masse", name: "Armando Joaquin Masse", party: "Partido Democratico Federal", age: 63, positions: { economic: 52, social: 47, environment: 40, security: 48, institutional: 52 }, truthScore: 40, promiseCount: 8, antiVote: 19, continuityBlock: "mixto", legalRisk: "bajo", digitalAgendaScore: 31, candidacyStatus: "estable" },
  { rank: 31, slug: "alex-gonzales", name: "Alex Gonzales", party: "Partido Democrata Verde", age: 55, positions: { economic: 50, social: 62, environment: 80, security: 44, institutional: 60 }, truthScore: 49, promiseCount: 10, antiVote: 21, continuityBlock: "disrupcion", legalRisk: "bajo", digitalAgendaScore: 46, candidacyStatus: "estable" },
  { rank: 32, slug: "wolfgang-grozo", name: "Wolfgang Grozo", party: "Integridad Democratica", age: 42, positions: { economic: 50, social: 60, environment: 70, security: 55, institutional: 90 }, truthScore: 52, promiseCount: 11, antiVote: 19, continuityBlock: "disrupcion", legalRisk: "bajo", digitalAgendaScore: 62, candidacyStatus: "estable" },
  { rank: 33, slug: "walter-chirinos", name: "Walter Chirinos", party: "PRIN", age: 53, positions: { economic: 47, social: 45, environment: 43, security: 57, institutional: 48 }, truthScore: 39, promiseCount: 8, antiVote: 17, continuityBlock: "mixto", legalRisk: "bajo", digitalAgendaScore: 33, candidacyStatus: "estable" },
  { rank: 34, slug: "alfonso-carlos-espa", name: "Alfonso Carlos Espa", party: "SiCreo", age: 58, positions: { economic: 61, social: 52, environment: 49, security: 51, institutional: 55 }, truthScore: 46, promiseCount: 9, antiVote: 15, continuityBlock: "mixto", legalRisk: "bajo", digitalAgendaScore: 41, candidacyStatus: "estable" },
  { rank: 35, slug: "francisco-diez-canseco", name: "Francisco Diez-Canseco", party: "Peru Accion", age: 74, positions: { economic: 66, social: 44, environment: 41, security: 53, institutional: 62 }, truthScore: 43, promiseCount: 9, antiVote: 23, continuityBlock: "continuidad", legalRisk: "bajo", digitalAgendaScore: 39, candidacyStatus: "estable" },
  { rank: 36, slug: "napoleon-becerra", name: "Napoleon Becerra", party: "PTE - Peru", age: 60, positions: { economic: 45, social: 48, environment: 46, security: 49, institutional: 50 }, truthScore: 38, promiseCount: 8, antiVote: 14, continuityBlock: "mixto", legalRisk: "bajo", digitalAgendaScore: 36, candidacyStatus: "estable" },
];

export const ELECTION_2026_CONTEXT = {
  dateLabel: "19 de marzo de 2026",
  firstRoundDate: "12 de abril de 2026",
  totalCandidates: 36,
  fragmentationNote:
    "Oferta electoral mas fragmentada de la historia reciente; la segunda vuelta podria definirse entre 12% y 15%.",
  bicameralSeats: { senate: 60, deputies: 130 },
  electoralThreshold: {
    votePercent: 5,
    congressionalSeats: 7,
    rule: "en mas de un distrito electoral",
  },
  blackSwanNote:
    "La ultima semana concentra la mayor volatilidad: indecisos y voto emocional alteran el tablero.",
  digitalOpportunityNote:
    "Pocos planes tienen agenda digital robusta; existe brecha para liderazgo de opinion en tecnologia publica.",
} as const;

export const INSIDER_INSIGHTS_2026 = [
  "Con 36 candidaturas, la atomizacion favorece sorpresas de ultima semana.",
  "La clave no es solo quien lidera hoy: es quien llega con menor antivoto al balotaje.",
  "La bicameralidad cambia el calculo politico: Senado y Diputados pueden fragmentarse distinto.",
  "La valla electoral anticipa una masacre de partidos tras abril.",
  "Outsiders con estrategia digital pueden ser antifragiles en un sistema caotico.",
] as const;

export function getCandidateBySlug(slug: string) {
  return OFFICIAL_CANDIDATES_2026.find((candidate) => candidate.slug === slug);
}

