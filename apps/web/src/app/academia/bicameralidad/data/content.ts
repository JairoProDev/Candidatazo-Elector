/**
 * Contenido magistral del módulo de Bicameralidad 2026
 * Basado en fuentes oficiales: ONPE, Ley N° 31988, Constitución Política del Perú
 */

export const INTRO_HOOK = {
  title: "El secreto que el 90% de peruanos ignoró",
  text: `¿Sabías que en 2018 tú—o tus padres—votaron para que el Congreso siguiera siendo UNA sola cámara? 9 de cada 10 peruanos dijeron "NO" a la bicameralidad.

Pero el 12 de abril de 2026, cuando votes, ya no habrá una sola papeleta para congresistas. Habrá dos: una para Senadores y otra para Diputados.

¿Qué pasó? El mismo Congreso que el pueblo quería controlar decidió dividirse en dos sin preguntarte de nuevo. Y aquí está el dato que casi nadie te ha contado...`,
  audioStart: 0,
  audioEnd: 45
};

export const DATO_MAESTRO = {
  title: "De 130 a 190: El Congreso creció (y nadie lo pidió)",
  sections: [
    {
      id: "contexto",
      subtitle: "",
      text: `Desde 1993, Perú tuvo un Congreso unicameral: 130 congresistas en una sola cámara. Pero el 6 de marzo de 2024, con 91 votos a favor, el Congreso aprobó la Ley 31988 que cambia TODO.`,
      audioStart: 45,
      audioEnd: 75
    },
    {
      id: "nueva-estructura",
      subtitle: "A partir del 28 de julio de 2026:",
      highlights: [
        { number: "60", label: "Senadores (la Cámara Alta)" },
        { number: "130", label: "Diputados (la Cámara Baja)" },
        { number: "190", label: "parlamentarios (antes eran 130)" }
      ],
      text: `¿Por qué es importante? No es solo "más políticos". Es un sistema de contrapesos donde cada cámara tiene poderes exclusivos. Pero también es más presupuesto, más sueldos, más asesores.`,
      audioStart: 75,
      audioEnd: 115
    }
  ]
};

export const SENADO_VS_DIPUTADOS = {
  title: "Senado vs. Diputados: ¿Quién manda?",
  intro: "Aquí está el truco que los candidatos no te explican:",
  senado: {
    title: "SENADO",
    miembros: 60,
    color: "#2C3E50",
    poderes: [
      "Revisa las leyes que aprueban los diputados (puede rechazarlas o modificarlas)",
      "Elige autoridades clave: Defensor del Pueblo, Tribunal Constitucional, Contralor General, 3 directores del BCR",
      "Aprueba viajes presidenciales al extranjero",
      "Juzga acusaciones constitucionales (puede destituir ministros, congresistas, jueces)",
      "NO puede ser disuelto por el presidente (los diputados sí)"
    ],
    requisitos: "45 años MÍNIMO (o haber sido congresista antes)",
    icon: "⚖️"
  },
  diputados: {
    title: "CÁMARA DE DIPUTADOS",
    miembros: 130,
    color: "#E74C3C",
    poderes: [
      "Inicia las leyes (el Senado solo las revisa)",
      "Interpela y censura ministros (control político directo al gobierno)",
      "Vota confianza al gabinete (puede tumbar al primer ministro)",
      "Acusa constitucionalmente a autoridades (el Senado las juzga)"
    ],
    requisitos: "25 años mínimo",
    icon: "📢"
  },
  audioStart: 115,
  audioEnd: 190
};

export const DATO_MIND_BLOWING = {
  title: 'El dato "Mind-Blowing": La trampa de la edad',
  intro: `La ley dice que para ser senador necesitas 45 años. Suena razonable, ¿no? Experiencia, madurez, trayectoria.

PERO hay una cláusula escondida:`,
  revelacion: '"Los congresistas actuales pueden postular al Senado SIN CUMPLIR el requisito de edad."',
  explicacion: `Esto significa que congresistas de 30, 35, 40 años pueden postular al Senado mientras que un ciudadano común de 44 años NO PUEDE. Es un privilegio exclusivo para los políticos en ejercicio.`,
  casosReales: [
    { nombre: "Américo Gonza", partido: "Perú Libre", edad: 43, puede: true },
    { nombre: "Elvis Vergara", partido: "Acción Popular", edad: 43, puede: true },
    { nombre: "Alejandro Cavero", partido: "Avanza País", edad: null, nota: "evaluando postular" }
  ],
  cita: {
    texto: "Institucionalizar un privilegio que frena la renovación generacional",
    autor: "Óscar Matutti",
    cargo: "Abogado constitucionalista"
  },
  audioStart: 190,
  audioEnd: 230
};

export const REFERENDUM_2018 = {
  title: "El referéndum que ignoraron",
  intro: "Retrocedamos a 2018. El presidente Martín Vizcarra propuso 4 reformas en un referéndum:",
  resultados: [
    { reforma: "Reforma de la Junta Nacional de Justicia", aprobada: true, porcentaje: 86 },
    { reforma: "Regular financiamiento de partidos", aprobada: true, porcentaje: 85 },
    { reforma: "Prohibir reelección inmediata de congresistas", aprobada: true, porcentaje: 85 },
    { reforma: "Bicameralidad", aprobada: false, porcentaje: 9.5 }
  ],
  estadistica: {
    votosContra: "13,949,831",
    porcentaje: "90.5%",
    mensaje: "peruanos votaron CONTRA la bicameralidad"
  },
  queOcurrio: `Pero en 2024, el Congreso la aprobó sin nuevo referéndum. ¿Cómo? Porque la Constitución permite omitir el referéndum si el Congreso vota con 2/3 en DOS legislaturas. Lo lograron con exactamente 91 votos (de 87 necesarios).`,
  contextoHistorico: `El presidente Vizcarra mismo pidió votar "NO" en 2018 porque el Congreso "desnaturalizó" la propuesta incluyendo la reelección parlamentaria (que la gente había rechazado). Pero 6 años después, el nuevo Congreso la impuso igual.`,
  audioStart: 230,
  audioEnd: 290
};

export const ARGUMENTOS_PRO_CONTRA = {
  title: "¿Es bueno o malo?",
  aFavor: {
    titulo: "Argumentos A FAVOR",
    subtitulo: "(lo que dicen los defensores)",
    puntos: [
      "Doble revisión = menos leyes improvisadas",
      "Contrapesos internos = una cámara frena a la otra",
      "Especialización: Diputados hacen control político; Senadores nombran autoridades",
      "Mejor representación: Senadores por distrito único nacional + regional"
    ]
  },
  enContra: {
    titulo: "Argumentos EN CONTRA",
    subtitulo: "(lo que dicen los críticos)",
    puntos: [
      "Mayor costo: más parlamentarios = más presupuesto, más asesores, más burocracia",
      "Deslegitimado: 90% lo rechazó en 2018, se impuso sin consultar de nuevo",
      "Privilegios: excepciones de edad para congresistas actuales",
      "Desequilibrio de poder: el Senado tiene MÁS poder que los Diputados (sistema 'bicameral imperfecto')"
    ]
  },
  opinionPublica: "En febrero 2024, el 86% de peruanos rechazaba al Congreso según Datum. La aprobación estaba en mínimos históricos.",
  audioStart: 290,
  audioEnd: 340
};

export const APLICACION_PRACTICA = {
  title: "¿Qué significa esto para ti el 12 de abril de 2026?",
  cedulaVotacion: {
    texto: "Cuando votes, tendrás que elegir:",
    opciones: [
      "Presidente y Vicepresidentes",
      "60 Senadores (30 nacionales + 30 regionales)",
      "130 Diputados (por tu región)",
      "Parlamentarios Andinos"
    ],
    tamano: "La cédula de votación medirá 40 centímetros. Será la más grande de la historia."
  },
  detectarMentiras: {
    titulo: "Cómo detectar cuando un político te miente sobre el Congreso",
    senado: {
      titulo: "Si postula al SENADO:",
      preguntasClave: [
        '¿Tiene 45 años o es congresista actual? (Si no, está violando la ley)',
        '¿Promete "hacer leyes"? (FALSO: el Senado NO inicia leyes, solo las revisa)',
        '¿Dice que va a "fiscalizar al gobierno"? (FALSO: eso lo hacen los DIPUTADOS)'
      ]
    },
    diputados: {
      titulo: "Si postula a DIPUTADO:",
      preguntasClave: [
        '¿Promete "nombrar al Defensor del Pueblo"? (FALSO: eso lo hace el SENADO)',
        '¿Dice que su cámara "no puede ser disuelta"? (FALSO: solo el Senado es indisoluble)'
      ]
    }
  },
  audioStart: 340,
  audioEnd: 390
};

export const PROCESO_LEGISLATIVO = {
  title: "El nuevo proceso legislativo (paso a paso)",
  pasos: [
    {
      numero: 1,
      texto: "Un diputado propone una ley",
      detalle: "Solo los diputados pueden iniciar leyes ordinarias"
    },
    {
      numero: 2,
      texto: "La Cámara de Diputados debate y vota",
      detalle: "Requieren mayoría simple (66 votos de 130)"
    },
    {
      numero: 3,
      texto: "Si aprueba → pasa al Senado",
      detalle: "Todas las leyes deben pasar por el Senado"
    },
    {
      numero: 4,
      texto: "El Senado puede:",
      opciones: [
        "✅ Aprobarla (va al Presidente para promulgación)",
        "❌ Rechazarla (muere el proyecto)",
        "✏️ Modificarla (vuelve a Diputados para revisar cambios)"
      ]
    },
    {
      numero: 5,
      texto: "Si hay desacuerdo → se forma una Comisión Mixta",
      detalle: "(mitad senadores, mitad diputados)"
    },
    {
      numero: 6,
      texto: "Si persiste el desacuerdo → el Senado tiene la última palabra",
      detalle: "en la mayoría de casos"
    }
  ],
  excepcionCritica: "Solo los Diputados pueden interpelar/censurar ministros. El Senado no puede tumbar gabinetes.",
  audioStart: 390,
  audioEnd: 440
};

export const CIERRE_IMPACTANTE = {
  title: "Por qué esto importa AHORA",
  mensaje: "En 2026 elegirás por primera vez en 36 años a dos cámaras. La última vez fue en 1990.",
  datoHistorico: "En 1992, Fujimori cerró el Congreso bicameral (el 'autogolpe'). En 1993, la nueva Constitución creó el sistema unicameral que funcionó hasta hoy.",
  preguntaFinal: "¿Vas a votar por personas que entienden la diferencia entre ser Senador y Diputado? ¿O por candidatos que prometen cosas que su cámara NO puede hacer?",
  audioStart: 440,
  audioEnd: 470
};

export const MODULE_METADATA = {
  id: "bicameralidad-2026",
  titulo: "Cómo funciona el Congreso del Perú",
  subtitulo: "Bicameralidad 2026 - La Reforma que Casi Nadie Entiende",
  duracionAudio: 470, // segundos (7:50)
  duracionLectura: 6, // minutos estimados
  nivel: "Intermedio-Avanzado",
  xpTotal: 500,
  badges: ["Maestro Legislativo", "Arquitecto Legislativo", "Cazador de Falacias"],
  tags: ["Congreso", "Bicameralidad", "Senado", "Diputados", "Elecciones 2026", "Sistema Político"],
  fuentes: [
    { nombre: "ONPE - Bicameralidad", url: "https://eg2026.onpe.gob.pe/lo-nuevo/bicameralidad/" },
    { nombre: "Ley N° 31988", url: "https://busquedas.elperuano.pe/dispositivo/NL/2272076-2" },
    { nombre: "Constitución Política del Perú", url: "https://www.congreso.gob.pe/Docs/constitucion/constitucion/" }
  ]
};
