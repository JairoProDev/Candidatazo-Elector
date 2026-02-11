/**
 * Datos para el Juego 1: Simulador de Poder Legislativo
 * "Eres Congresista por un Día"
 */

export interface LawProjectQuestion {
  id: string;
  contexto: string;
  pregunta: string;
  opciones: {
    id: string;
    texto: string;
  }[];
  respuestaCorrecta: string;
  explicacion: string;
  xp: number;
}

export const LAW_PROJECTS: LawProjectQuestion[] = [
  {
    id: "proyecto-salario-minimo-1",
    contexto: "El diputado Juan Pérez ha propuesto aumentar el salario mínimo de S/1,025 a S/1,500. La propuesta ya fue aprobada en la Cámara de Diputados con 75 votos a favor.",
    pregunta: "¿Qué sucede ahora con este proyecto de ley?",
    opciones: [
      { id: "a", texto: "Va directo al Presidente para ser promulgado" },
      { id: "b", texto: "Pasa al Senado para revisión" },
      { id: "c", texto: "Necesita un referéndum" },
      { id: "d", texto: "Se archiva automáticamente" }
    ],
    respuestaCorrecta: "b",
    explicacion: "¡Correcto! En el sistema bicameral, TODAS las leyes que aprueba la Cámara de Diputados deben pasar al Senado para revisión. El Senado puede aprobarla, modificarla o rechazarla. Solo después de la aprobación del Senado va al Presidente.",
    xp: 100
  },
  {
    id: "proyecto-salario-minimo-2",
    contexto: "El Senado decide MODIFICAR la propuesta: en lugar de S/1,500, propone S/1,300.",
    pregunta: "¿Qué pasa?",
    opciones: [
      { id: "a", texto: "La ley se aprueba automáticamente con S/1,300" },
      { id: "b", texto: "Vuelve a la Cámara de Diputados para revisar los cambios" },
      { id: "c", texto: "Se forma un referéndum popular" },
      { id: "d", texto: "El Presidente decide el monto final" }
    ],
    respuestaCorrecta: "b",
    explicacion: "Exacto. Cuando el Senado modifica un proyecto, este REGRESA a la Cámara de Diputados. Los diputados pueden aceptar los cambios del Senado o insistir en su versión original. Si no hay acuerdo, se forma una Comisión Mixta (mitad senadores, mitad diputados) para negociar.",
    xp: 100
  },
  {
    id: "defensor-del-pueblo",
    contexto: "La actual Defensora del Pueblo, Josefina Miró Quesada, termina su periodo en julio de 2026. Se necesita elegir un nuevo Defensor.",
    pregunta: "¿Qué cámara es responsable de elegir al nuevo Defensor del Pueblo?",
    opciones: [
      { id: "a", texto: "Cámara de Diputados" },
      { id: "b", texto: "Senado" },
      { id: "c", texto: "Ambas cámaras votan en conjunto" },
      { id: "d", texto: "El Presidente lo nombra directamente" }
    ],
    respuestaCorrecta: "b",
    explicacion: "¡Perfecto! El Senado tiene la atribución EXCLUSIVA de elegir al Defensor del Pueblo, además de los magistrados del Tribunal Constitucional, el Contralor General y 3 directores del Banco Central. Los Diputados NO participan en estos nombramientos.",
    xp: 100
  },
  {
    id: "crisis-ministerial",
    contexto: "El Ministro de Educación ha sido acusado de malversación de fondos. Los ciudadanos exigen su renuncia.",
    pregunta: "¿Qué cámara puede interpelar y censurar al ministro, obligándolo a renunciar?",
    opciones: [
      { id: "a", texto: "Senado" },
      { id: "b", texto: "Cámara de Diputados" },
      { id: "c", texto: "Ambas cámaras en votación conjunta" },
      { id: "d", texto: "Solo el Presidente puede destituirlo" }
    ],
    respuestaCorrecta: "b",
    explicacion: "¡Correcto! Solo la Cámara de Diputados tiene poder para interpelar (llamar a dar explicaciones) y censurar (obligar a renunciar) a los ministros. El Senado NO tiene estas atribuciones. Esto es crítico: el control político DIRECTO del gobierno está en manos de los Diputados.",
    xp: 100
  },
  {
    id: "proyecto-educacion",
    contexto: "Un senador quiere crear una ley para mejorar la educación pública, aumentando el presupuesto en 20%.",
    pregunta: "¿Puede un senador INICIAR este tipo de ley?",
    opciones: [
      { id: "a", texto: "Sí, los senadores pueden proponer cualquier ley" },
      { id: "b", texto: "No, solo los diputados pueden iniciar leyes ordinarias" },
      { id: "c", texto: "Sí, pero necesita aprobación del Presidente primero" },
      { id: "d", texto: "Sí, pero solo si es senador de la región con más población" }
    ],
    respuestaCorrecta: "b",
    explicacion: "Correcto. En el sistema bicameral peruano, el Senado NO puede iniciar leyes ordinarias. Solo la Cámara de Diputados puede hacerlo. El Senado actúa como 'cámara de revisión'. Los senadores pueden proponer reformas constitucionales o leyes orgánicas, pero las leyes ordinarias (como esta sobre educación) deben iniciar en Diputados.",
    xp: 100
  },
  {
    id: "disolucion-congreso",
    contexto: "El Presidente está en una crisis política grave. La Cámara de Diputados rechazó dos gabinetes consecutivos.",
    pregunta: "¿Qué cámaras puede disolver el Presidente?",
    opciones: [
      { id: "a", texto: "Ambas cámaras (Senado y Diputados)" },
      { id: "b", texto: "Solo la Cámara de Diputados" },
      { id: "c", texto: "Solo el Senado" },
      { id: "d", texto: "Ninguna, la disolución ya no existe" }
    ],
    respuestaCorrecta: "b",
    explicacion: "¡Exacto! Según la reforma constitucional, el Senado NO puede ser disuelto bajo ninguna circunstancia. Solo la Cámara de Diputados puede ser disuelta si niega confianza a dos gabinetes. Esto le da al Senado mucha más estabilidad y poder institucional.",
    xp: 100
  }
];

export const SCORING = {
  PRIMERA_INTENCION: 100,
  SEGUNDO_INTENTO: 50,
  ERROR: 0
};

export const BADGES = {
  MAESTRO_LEGISLATIVO: {
    id: "maestro-legislativo",
    nombre: "Maestro Legislativo",
    descripcion: "Completa 3 proyectos sin errores",
    icono: "🏆",
    requisito: "3_perfect_answers"
  }
};
