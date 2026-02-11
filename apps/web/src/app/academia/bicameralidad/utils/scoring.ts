/**
 * Utilidades para sistema de XP y badges del módulo
 */

export interface UserProgress {
  xpGanado: number;
  badgesObtenidos: string[];
  juegoCompletado: {
    simulador: boolean;
    ordenar: boolean;
    verdaderoFalso: boolean;
  };
  respuestasCorrectas: number;
  respuestasTotales: number;
}

export interface Badge {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  obtenido: boolean;
}

export const BADGES_DISPONIBLES: Badge[] = [
  {
    id: "maestro-legislativo",
    nombre: "Maestro Legislativo",
    descripcion: "Completa 3 proyectos de ley sin errores",
    icono: "🏆",
    obtenido: false
  },
  {
    id: "arquitecto-legislativo",
    nombre: "Arquitecto Legislativo",
    descripcion: "Ordena correctamente el proceso legislativo",
    icono: "🏗️",
    obtenido: false
  },
  {
    id: "cazador-de-falacias",
    nombre: "Cazador de Falacias",
    descripcion: "Acertar 4 de 5 en Verdadero/Falso",
    icono: "🔍",
    obtenido: false
  },
  {
    id: "completista",
    nombre: "Completista",
    descripcion: "Finaliza los 3 mini-juegos",
    icono: "⭐",
    obtenido: false
  }
];

export const XP_LEVELS = [
  { level: 1, xpRequerido: 0, titulo: "Novato Cívico" },
  { level: 2, xpRequerido: 200, titulo: "Estudiante Atento" },
  { level: 3, xpRequerido: 400, titulo: "Ciudadano Informado" },
  { level: 4, xpRequerido: 600, titulo: "Experto Legislativo" },
  { level: 5, xpRequerido: 800, titulo: "Maestro del Congreso" }
];

export function calcularNivel(xp: number): { level: number; titulo: string; progreso: number } {
  let nivelActual = XP_LEVELS[0];
  let siguienteNivel = XP_LEVELS[1];

  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= XP_LEVELS[i].xpRequerido) {
      nivelActual = XP_LEVELS[i];
      siguienteNivel = XP_LEVELS[i + 1] || XP_LEVELS[i];
      break;
    }
  }

  const xpEnNivelActual = xp - nivelActual.xpRequerido;
  const xpNecesarioParaSiguiente = siguienteNivel.xpRequerido - nivelActual.xpRequerido;
  const progreso = Math.min((xpEnNivelActual / xpNecesarioParaSiguiente) * 100, 100);

  return {
    level: nivelActual.level,
    titulo: nivelActual.titulo,
    progreso: Math.round(progreso)
  };
}

export function verificarBadge(
  badgeId: string,
  progress: UserProgress
): boolean {
  switch (badgeId) {
    case "maestro-legislativo":
      // 3 proyectos perfectos en el simulador (asumimos que se trackea externamente)
      return progress.juegoCompletado.simulador && progress.respuestasCorrectas >= 3;

    case "arquitecto-legislativo":
      return progress.juegoCompletado.ordenar;

    case "cazador-de-falacias":
      // 4 de 5 correctas en verdadero/falso (asumimos que se trackea externamente)
      return progress.juegoCompletado.verdaderoFalso && progress.respuestasCorrectas >= 4;

    case "completista":
      return (
        progress.juegoCompletado.simulador &&
        progress.juegoCompletado.ordenar &&
        progress.juegoCompletado.verdaderoFalso
      );

    default:
      return false;
  }
}

export function generarMensajeXP(xpGanado: number, totalAcumulado: number): string {
  const mensajes = [
    `¡+${xpGanado} XP! Vas dominando el tema.`,
    `¡Excelente! +${xpGanado} XP agregados.`,
    `¡Sigue así! +${xpGanado} XP ganados.`,
    `¡Imparable! +${xpGanado} XP más a tu cuenta.`
  ];

  return mensajes[Math.floor(Math.random() * mensajes.length)];
}

export function calcularPorcentajeAcierto(correctas: number, totales: number): number {
  if (totales === 0) return 0;
  return Math.round((correctas / totales) * 100);
}

export function obtenerMensajeRendimiento(porcentaje: number): {
  mensaje: string;
  emoji: string;
  color: string;
} {
  if (porcentaje >= 90) {
    return {
      mensaje: "¡Rendimiento excepcional! Entiendes mejor el Congreso que la mayoría de políticos.",
      emoji: "🏆",
      color: "text-gold"
    };
  } else if (porcentaje >= 75) {
    return {
      mensaje: "¡Muy bien! Tienes un conocimiento sólido del sistema bicameral.",
      emoji: "🌟",
      color: "text-green-600"
    };
  } else if (porcentaje >= 60) {
    return {
      mensaje: "Buen progreso. Con un poco más de práctica serás un experto.",
      emoji: "👍",
      color: "text-blue-600"
    };
  } else if (porcentaje >= 40) {
    return {
      mensaje: "Vas por buen camino. Repasa el contenido y vuelve a intentarlo.",
      emoji: "📚",
      color: "text-yellow-600"
    };
  } else {
    return {
      mensaje: "Es un tema complejo. Lee el contenido con calma y vuelve a los juegos.",
      emoji: "💪",
      color: "text-orange-600"
    };
  }
}
