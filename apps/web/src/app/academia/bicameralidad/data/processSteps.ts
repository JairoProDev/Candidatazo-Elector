/**
 * Datos para el Juego 2: Arrastra y Ordena el Proceso Legislativo
 * "De la Idea a la Ley"
 */

export interface ProcessStep {
  id: string;
  ordenCorrecto: number;
  texto: string;
  explicacion: string;
  icon: string;
  color: "red" | "blue" | "green";
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "step-1",
    ordenCorrecto: 1,
    texto: "Un diputado presenta un proyecto de ley",
    explicacion: "Solo los diputados pueden INICIAR leyes ordinarias. Los senadores pueden proponer reformas constitucionales o leyes orgánicas, pero NO leyes ordinarias.",
    icon: "📝",
    color: "red"
  },
  {
    id: "step-2",
    ordenCorrecto: 2,
    texto: "La Cámara de Diputados debate y vota",
    explicacion: "El debate legislativo comienza siempre en la Cámara Baja. Aquí se discute, se modifican artículos y se vota. Necesitan mayoría simple (66 votos de 130) para aprobar.",
    icon: "🗣️",
    color: "red"
  },
  {
    id: "step-3",
    ordenCorrecto: 3,
    texto: "El proyecto pasa al Senado",
    explicacion: "Una vez aprobado por Diputados, el proyecto DEBE pasar al Senado para la 'segunda lectura'. No puede saltarse este paso.",
    icon: "➡️",
    color: "blue"
  },
  {
    id: "step-4",
    ordenCorrecto: 4,
    texto: "El Senado aprueba, modifica o rechaza",
    explicacion: "El Senado actúa como 'cámara de reflexión'. Puede: Aprobar tal cual (pasa al Presidente), Modificar (vuelve a Diputados), o Rechazar (muere el proyecto).",
    icon: "⚖️",
    color: "blue"
  },
  {
    id: "step-5",
    ordenCorrecto: 5,
    texto: "Si hay modificaciones, regresa a Diputados",
    explicacion: "Si el Senado cambió algo, los Diputados deben revisar y aceptar o rechazar los cambios. Si insisten en su versión, se forma una Comisión Mixta.",
    icon: "🔄",
    color: "red"
  },
  {
    id: "step-6",
    ordenCorrecto: 6,
    texto: "El proyecto aprobado va al Presidente",
    explicacion: "Solo cuando AMBAS cámaras aprueban el mismo texto, el proyecto va al Poder Ejecutivo.",
    icon: "📋",
    color: "green"
  },
  {
    id: "step-7",
    ordenCorrecto: 7,
    texto: "El Presidente promulga u observa la ley",
    explicacion: "El Presidente puede firmar la ley (promulgación) o devolverla al Congreso con observaciones. El Congreso puede insistir con 2/3 de votos y la ley se promulga automáticamente.",
    icon: "✍️",
    color: "green"
  }
];

export const ADVANCED_STEPS: ProcessStep[] = [
  ...PROCESS_STEPS,
  {
    id: "step-comision",
    ordenCorrecto: 5.5,
    texto: "Se forma Comisión Mixta si persiste el desacuerdo",
    explicacion: "Cuando Diputados y Senado no llegan a acuerdo, se forma una comisión con representantes de ambas cámaras para negociar una versión consensuada.",
    icon: "🤝",
    color: "blue"
  },
  {
    id: "step-publicacion",
    ordenCorrecto: 8,
    texto: "Publicación en El Peruano",
    explicacion: "La ley entra en vigencia al día siguiente de su publicación en el diario oficial El Peruano, salvo que la propia ley establezca otra fecha.",
    icon: "📰",
    color: "green"
  }
];

export const HINTS = {
  WRONG_ORDER: "Este paso no va aquí. Recuerda: las leyes siempre inician en Diputados.",
  SKIPPED_SENATE: "No puedes saltarte al Senado. Todas las leyes deben pasar por revisión senatorial.",
  PRESIDENT_TOO_EARLY: "El Presidente solo interviene DESPUÉS de que ambas cámaras aprueban el mismo texto."
};

export const SUCCESS_MESSAGES = [
  "¡Perfecto! Entiendes el proceso legislativo mejor que la mayoría de políticos.",
  "¡Excelente! Ahora sabes cómo se crean las leyes en el Perú bicameral.",
  "¡Impresionante! Ya puedes explicarle a tus amigos cómo funciona el Congreso."
];

export const BADGE = {
  id: "arquitecto-legislativo",
  nombre: "Arquitecto Legislativo",
  descripcion: "Ordena correctamente el proceso legislativo sin errores",
  icono: "🏗️",
  xp: 150
};
