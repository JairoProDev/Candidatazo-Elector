/**
 * Datos para el Juego 3: Verdadero o Falso con Trampa
 * "¿Congresista o Farsante?"
 */

export interface Statement {
  id: string;
  afirmacion: string;
  esVerdadero: boolean;
  tieneTrampa: boolean;
  explicacion: string;
  contextoAdicional?: string;
  xp: number;
}

export const STATEMENTS: Statement[] = [
  {
    id: "senador-propone-ley",
    afirmacion: "Un senador de 50 años puede proponer una ley para aumentar las pensiones y esperar que se apruebe en su cámara.",
    esVerdadero: false,
    tieneTrampa: true,
    explicacion: "Casi correcta, PERO hay trampa. Un senador SÍ puede proponer una ley de pensiones (es ley orgánica), PERO el Senado NO vota leyes en primera instancia. Solo las REVISA. Las leyes ordinarias las inician los DIPUTADOS. El Senado solo puede presentar reformas constitucionales o leyes orgánicas, que igual deben pasar por Diputados primero en la mayoría de casos.",
    contextoAdicional: "Muchos candidatos al Senado prometen 'hacer leyes', pero técnicamente el Senado no las inicia, solo las revisa y aprueba/modifica/rechaza.",
    xp: 200
  },
  {
    id: "senado-anula-censura",
    afirmacion: "Si la Cámara de Diputados censura a un ministro, el Senado puede anular esa censura.",
    esVerdadero: false,
    tieneTrampa: false,
    explicacion: "¡Falso! La censura ministerial es EXCLUSIVA de la Cámara de Diputados. El Senado NO tiene poder para interpelar, censurar ni dar voto de confianza al gabinete. Estas son armas políticas que solo manejan los Diputados. El Senado tiene otras atribuciones (nombramientos, revisión de decretos), pero NO control político directo.",
    contextoAdicional: "Esta separación de poderes es clave: Diputados controlan al gobierno día a día, Senado nombra autoridades de largo plazo.",
    xp: 200
  },
  {
    id: "mayoria-simple-senado",
    afirmacion: "El Senado tiene 60 miembros, por lo tanto necesita 31 votos para aprobar cualquier ley.",
    esVerdadero: true,
    tieneTrampa: true,
    explicacion: "Técnicamente verdadero para mayoría simple (31 de 60 = 50% + 1). PERO cuidado: no todas las decisiones requieren mayoría simple. Por ejemplo:\n• Reformas constitucionales: 2/3 (40 votos)\n• Acusaciones constitucionales: 2/3 (40 votos)\n• Suspender funcionarios: mayoría absoluta\n\nAsí que la trampa aquí es asumir que 31 votos sirven para TODO. No es así.",
    contextoAdicional: "Siempre pregunta: ¿qué tipo de votación es? ¿Mayoría simple, absoluta o calificada?",
    xp: 200
  },
  {
    id: "disolucion-ambas-camaras",
    afirmacion: "Si el Presidente disuelve el Congreso en una crisis política, ambas cámaras deben cerrar.",
    esVerdadero: false,
    tieneTrampa: true,
    explicacion: "¡Gran trampa! La Constitución reformada establece que el Senado NO puede ser disuelto bajo ninguna circunstancia. Solo la Cámara de Diputados puede ser disuelta (si niegan confianza a dos gabinetes). El Senado sigue funcionando incluso en crisis. Esto le da más estabilidad... y más poder.",
    contextoAdicional: "En crisis institucionales, el Senado se convierte en el 'ancla' de estabilidad del sistema. No puede ser tocado.",
    xp: 200
  },
  {
    id: "edad-congresista-actual",
    afirmacion: "Un candidato puede postular al Senado si tiene 40 años, siempre y cuando sea congresista actual.",
    esVerdadero: true,
    tieneTrampa: false,
    explicacion: "Correcto, aunque suene injusto. La Ley 31988 incluye una 'disposición transitoria' que permite a los congresistas actuales postular al Senado SIN cumplir el requisito de 45 años. Un ciudadano común de 44 años NO puede postular, pero un congresista de 40 años SÍ puede. Esto fue criticado por constitucionalistas como 'privilegio institucionalizado'.",
    contextoAdicional: "Casos reales: Américo Gonza (43 años) y Elvis Vergara (43 años) pueden postular gracias a esta excepción.",
    xp: 200
  },
  {
    id: "senado-ultima-palabra",
    afirmacion: "En caso de conflicto entre las dos cámaras sobre una ley, siempre se forma un referéndum para que el pueblo decida.",
    esVerdadero: false,
    tieneTrampa: false,
    explicacion: "Falso. Cuando hay conflicto, primero se forma una Comisión Mixta (mitad senadores, mitad diputados) para negociar. Si persiste el desacuerdo, el Senado tiene la última palabra EN LA MAYORÍA DE CASOS. No se hace referéndum. Esto significa que el Senado tiene más poder que los Diputados en el sistema peruano (bicameralismo imperfecto).",
    contextoAdicional: "El pueblo solo vota en referéndums para reformas constitucionales específicas, no para resolver conflictos legislativos cotidianos.",
    xp: 200
  },
  {
    id: "referendum-2018",
    afirmacion: "En 2018, la mayoría de peruanos votó A FAVOR de la bicameralidad en un referéndum.",
    esVerdadero: false,
    tieneTrampa: false,
    explicacion: "¡Totalmente falso! En 2018, el 90.5% (13,949,831 peruanos) votó CONTRA la bicameralidad. Solo el 9.5% votó a favor. Fue el rechazo más contundente de las 4 preguntas del referéndum. Sin embargo, en 2024 el Congreso la aprobó sin consultar de nuevo, usando una cláusula constitucional que permite omitir el referéndum si hay 2/3 de votos en dos legislaturas.",
    contextoAdicional: "Este es un punto clave de legitimidad democrática que muchos críticos señalan.",
    xp: 200
  },
  {
    id: "senado-mayor-presupuesto",
    afirmacion: "Pasar de 130 a 190 parlamentarios aumentará significativamente el presupuesto del Congreso.",
    esVerdadero: true,
    tieneTrampa: false,
    explicacion: "Verdadero. 60 parlamentarios adicionales significa:\n• 60 sueldos más (cada congresista gana ~S/15,600/mes)\n• 60 equipos de asesores más\n• Más oficinas, más personal administrativo\n• Dos edificios separados para cada cámara\n\nLos críticos estiman que el costo aumentará en millones de soles anuales. Los defensores argumentan que el costo se justifica por mayor control y contrapesos.",
    contextoAdicional: "El Congreso nunca publicó un estudio de impacto presupuestal antes de aprobar la reforma.",
    xp: 200
  }
];

export const FEEDBACK_MESSAGES = {
  CORRECT_NO_TRAP: "¡Correcto! Captaste la respuesta.",
  CORRECT_WITH_TRAP: "¡Excelente! Detectaste la trampa escondida.",
  INCORRECT_TRAP_EXISTS: "Uy, había una trampa aquí. Lee con más cuidado.",
  INCORRECT_STRAIGHTFORWARD: "No exactamente. Revisa la explicación."
};

export const BADGE = {
  id: "cazador-de-falacias",
  nombre: "Cazador de Falacias",
  descripcion: "Acertar 4 de 5 preguntas en el juego Verdadero/Falso",
  icono: "🔍",
  requisito: 4,
  xp: 200
};

export const SCORING = {
  CORRECT_FIRST: 200,
  CORRECT_SECOND: 100,
  INCORRECT: 0
};
