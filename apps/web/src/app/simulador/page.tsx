"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Candidate {
  id: string;
  name: string;
  shortName: string;
  party: string;
  initials: string;
  color: string;
  bgColor: string;
  personality: {
    formality: "formal" | "informal" | "muy_informal";
    aggressiveness: "agresivo" | "moderado" | "pacifico";
    populism: "populista" | "tecnocrata" | "mixto";
    style: string; // extra flavor description
  };
  greeting: string;
  genericResponses: string[];
  topicResponses: Record<string, string[]>;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ---------------------------------------------------------------------------
// Candidate data with positions, personality & canned responses
// ---------------------------------------------------------------------------

const CANDIDATES: Candidate[] = [
  {
    id: "keiko",
    name: "Keiko Fujimori",
    shortName: "Keiko",
    party: "Fuerza Popular",
    initials: "KF",
    color: "#FF6B00",
    bgColor: "#FFF3E8",
    personality: {
      formality: "formal",
      aggressiveness: "moderado",
      populism: "mixto",
      style: "Habla de forma calculada, mezcla tecnicismos con apelaciones emocionales. Frecuentemente menciona el legado de su padre.",
    },
    greeting:
      "Buenas tardes. Soy Keiko Fujimori, lideresa de Fuerza Popular. Estoy aquí para responder sus preguntas sobre mi plan de gobierno para el Perú. Adelante.",
    genericResponses: [
      "Mire, lo que el Perú necesita es orden y mano firme. Mi padre demostro que se puede pacificar el pais y reactivar la economia. Yo voy a continuar con esa vision, pero con las lecciones aprendidas. Fuerza Popular tiene un plan integral para cada peruano.",
      "Le agradezco la pregunta. Como lideresa de Fuerza Popular, mi compromiso es con cada familia peruana. Hemos recorrido el pais entero, hemos escuchado a la gente, y nuestro plan de gobierno refleja esas necesidades reales.",
      "Es una pregunta importante. Dejeme decirle que he aprendido mucho en estos anos. El Perú necesita una lideresa que conozca los problemas del pais de primera mano, y yo he estado en cada rincon del Perú escuchando a la gente.",
    ],
    topicResponses: {
      economia: [
        "La economia peruana necesita reactivarse con urgencia. Mi plan contempla reducir el IGV al 15%, destrabar inversiones por más de 20 mil millones de dolares y crear un programa de empleo masivo llamado 'Trabaja Perú Ya'. En los 90, mi padre estabilizo la economia cuando estaba en ruinas, y nosotros vamos a repetir ese exito.",
        "Vamos a impulsar la inversion privada con seguridad juridica. El Perú tiene un potencial enorme en mineria, agroindustria y turismo. Necesitamos un gobierno que de confianza a los inversionistas, no que los ahuyente con discursos radicales.",
      ],
      seguridad: [
        "La seguridad es mi prioridad número uno. Vamos a implementar el plan 'Mano Dura': más policias en las calles, cadena perpetua para sicarios, y un estado de emergencia permanente en las zonas más peligrosas. Mi padre acabo con el terrorismo y yo voy a acabar con la delincuencia.",
        "Propongo que las Fuerzas Armadas apoyen a la policia en la lucha contra la criminalidad. Necesitamos control territorial, inteligencia operativa y penas más severas. La población pide mano dura y eso es exactamente lo que vamos a dar.",
      ],
      educación: [
        "La educación es la base del desarrollo. Vamos a implementar el programa 'Escuela Digna' para modernizar la infraestructura educativa en todo el pais. También queremos que la educación tecnica tenga más presupuesto, porque el Perú necesita tecnicos calificados, no solo universitarios.",
        "Hay que cerrar la brecha digital en educación. Cada escuela debe tener internet y cada alumno acceso a tecnologia. Ademas, los maestros necesitan mejores sueldos, pero condicionados a evaluaciones de desempeño.",
      ],
      corrupcion: [
        "Nadie me puede hablar de persecución política porque yo la he vivido en carne propia. Pero eso no me ha detenido. Mi compromiso es con la transparencia. Vamos a fortalecer la Contraloria y digitalizar todas las compras del Estado para que cada sol se pueda rastrear.",
        "La corrupción es un problema sistemico que requiere reformas estructurales. Propongo una reforma integral del sistema de justicia, mayor independencia del Ministerio Publico y penas más severas para los funcionarios corruptos.",
      ],
      salud: [
        "La pandemia desnudo las carencias de nuestro sistema de salud. Vamos a construir 500 centros de salud en zonas rurales, equipar hospitales con tecnologia moderna y garantizar el abastecimiento de medicinas. La salud es un derecho, no un privilegio.",
        "Necesitamos un sistema de salud universal y eficiente. Vamos a unificar SIS y EsSalud en un sistema unico que cubra a todos los peruanos, con atención de calidad y sin colas interminables.",
      ],
      mineria: [
        "La mineria es el motor de nuestra economia y debemos impulsarla con responsabilidad ambiental. Vamos a destrabar los proyectos mineros paralizados como Tia Maria y Conga, garantizando que las comunidades reciban beneficios directos.",
        "El Perú es un pais minero y debemos aprovecharlo. Pero también necesitamos agregar valor: no podemos seguir exportando solo concentrados. Vamos a promover la industrialización de nuestros minerales.",
      ],
      constitucion: [
        "No necesitamos una nueva constitucion. La constitución del 93 nos ha dado estabilidad economica y ha permitido el crecimiento del pais. Lo que necesitamos son reformas puntuales, no aventuras constituyentes que generan incertidumbre.",
        "La constitución actual funciona. Lo que falla son las personas que la aplican. Mejoremosla con reformas especificas, pero no la tiremos por la borda. Eso solo beneficia a los radicales.",
      ],
    },
  },
  {
    id: "antauro",
    name: "Antauro Humala",
    shortName: "Antauro",
    party: "Union por el Perú",
    initials: "AH",
    color: "#8B0000",
    bgColor: "#FDE8E8",
    personality: {
      formality: "informal",
      aggressiveness: "agresivo",
      populism: "populista",
      style: "Habla de forma directa y confrontacional. Usa lenguaje militar. Frecuentemente invoca el etnonacionalismo y la reivindicación del 'Perú profundo'.",
    },
    greeting:
      "Compatriota, soy Antauro Humala. El reservista que no se rinde. Vengo a hablar claro, sin medias tintas, como siempre. Pregunte lo que quiera, que aquí no se tiene miedo a la verdad.",
    genericResponses: [
      "Mira, compatriota, aquí hay que hablar claro. Este sistema esta podrido. Los mismos de siempre se roban el pais mientras el pueblo pasa hambre. Yo vengo del Perú profundo, del pueblo, y voy a gobernar para el pueblo, no para las elites limenas.",
      "Aquí lo que falta es un gobierno con pantalones. No más tibios, no más de lo mismo. El Perú necesita una revolución etnocacerista que devuelva la dignidad a los peruanos de a pie. Y eso es exactamente lo que vamos a hacer.",
      "Compatriota, yo no soy político de salon. Yo he estado preso por mis ideales, he luchado por este pais. Los que me critican son los mismos que se benefician del sistema corrupto. Pero el pueblo ya desperto.",
    ],
    topicResponses: {
      economia: [
        "La economia tiene que estar al servicio del pueblo, no de las transnacionales. Vamos a nacionalizar los recursos estrategicos: gas, petroleo, minerales. Es inaceptable que Chile y otros paises lucren con nuestras riquezas mientras nuestro pueblo vive en pobreza.",
        "Hay que acabar con el modelo neoliberal que solo beneficia a los ricos. Vamos a crear un banco nacional de fomento, impulsar la industria nacional y proteger la producción peruana de la competencia desleal. El Perú para los peruanos.",
      ],
      seguridad: [
        "La inseguridad se combate con mano de hierro. Voy a militarizar las zonas criticas, implementar el servicio militar obligatorio y aplicar la pena de muerte para violadores y narcotraficantes. Nada de derechos humanos para los criminales.",
        "Hay que limpiar este pais de la delincuencia. Propongo rondas urbanas, como las rondas campesinas pero en las ciudades. El pueblo organizado vigilando su propio barrio, con apoyo del Ejercito. Asi se acaba la inseguridad.",
      ],
      educación: [
        "La educación tiene que ser gratuita y de calidad, desde inicial hasta la universidad. Vamos a triplicar el presupuesto en educación y crear escuelas tecnicas militares en cada provincia. La juventud necesita disciplina y conocimiento.",
        "Hay que descolonizar la educación. Nuestros jovenes deben aprender la verdadera historia del Perú, no la version que cuentan los colonizadores. Educación bilingue obligatoria y revalorización de nuestras lenguas originarias.",
      ],
      corrupcion: [
        "A los corruptos hay que fusilarlos. Asi de simple. Pena de muerte para todo funcionario que robe al Estado. Confiscación de bienes. Y que los jueces corruptos vayan presos de por vida. Aquí se acabo la impunidad.",
        "Yo propongo que los presos por corrupción trabajen en obras públicas. Que paguen su deuda con el pueblo con su sudor. Y todo funcionario debe declarar su patrimonio antes y despues de cada cargo. Cero tolerancia.",
      ],
      salud: [
        "La salud es un derecho del pueblo, no un negocio. Vamos a nacionalizar las clinicas privadas si es necesario y garantizar atención gratuita para todos. Los hospitales militares se abriran al pueblo.",
        "El sistema de salud esta colapsado porque los gobiernos neoliberales lo han desmantelado. Vamos a construir hospitales en cada provincia, con medicos militares si es necesario. La salud del pueblo no puede esperar.",
      ],
      mineria: [
        "Los recursos naturales son del pueblo peruano, no de las transnacionales. Vamos a renegociar todos los contratos mineros y si no aceptan condiciones justas, nacionalizamos. Basta de regalar nuestras riquezas.",
        "La mineria ilegal hay que combatirla con el Ejercito, pero la gran mineria también tiene que pagar lo justo. Propongo que el 50% de las ganancias mineras se queden en las comunidades donde se extrae. Es lo minimo.",
      ],
      constitucion: [
        "Necesitamos una nueva constitucion, escrita por el pueblo, no por los abogados de las transnacionales. Una constitución etnonacionalista que reconozca al Perú profundo y devuelva los recursos al pueblo.",
        "La constitución del 93 es una constitución fujimorista, hecha para beneficiar a los de arriba. Hay que cambiarla de raiz. Asamblea constituyente con representación de todas las naciones originarias del Perú.",
      ],
    },
  },
  {
    id: "acuna",
    name: "Cesar Acuna",
    shortName: "Cesar",
    party: "Alianza para el Progreso",
    initials: "CA",
    color: "#0055A4",
    bgColor: "#E8F0FE",
    personality: {
      formality: "informal",
      aggressiveness: "moderado",
      populism: "populista",
      style: "Habla de forma simple y directa, con acento norteno. Frecuentemente menciona su origen humilde y su exito empresarial. Usa frases motivacionales.",
    },
    greeting:
      "Hola, como estan todos! Soy Cesar Acuna, el cholo que empezo sin nada y que ahora quiere devolverle al Perú todo lo que le dio. Como digo yo: plata como cancha para la educación! Pregunten nomas.",
    genericResponses: [
      "Miren, yo soy un hombre que empezo de abajo. Vendi periodicos, lustré zapatos, y ahora tengo universidades. Si yo pude salir adelante, todos los peruanos pueden. Solo necesitan oportunidades, y eso es lo que voy a dar.",
      "Yo no soy político de escritorio. Yo he sido alcalde, gobernador, y he demostrado que se puede hacer obra. En La Libertad la gente me quiere porque he cumplido. Y ahora quiero hacer lo mismo por todo el Perú.",
      "Como siempre digo: el que quiere, puede. Y yo quiero un Perú mejor para todos. Con trabajo, con educación, con oportunidades. Eso es lo que le ofrezco al pueblo peruano, y tengo la experiencia para cumplir.",
    ],
    topicResponses: {
      economia: [
        "La economia se reactiva con trabajo, pues! Voy a crear un millon de empleos en mi primer ano. Como? Con obra publica, con apoyo a los emprendedores, con creditos blandos para las mypes. Yo soy empresario, yo se como generar riqueza.",
        "Plata como cancha para los emprendedores! Vamos a crear un fondo de 5 mil millones para prestamos a pequenos empresarios con tasas bajas. El Perú es un pais de emprendedores y hay que apoyarlos, no ponerles trabas.",
      ],
      seguridad: [
        "Más policias, mejor pagados, mejor equipados. Asi de simple. También hay que poner camaras de vigilancia en todas las ciudades y crear un sistema de patrullaje inteligente. En La Libertad redujimos la delincuencia con tecnologia.",
        "La seguridad se combate con prevención y con fuerza. Más programas para los jovenes, más deporte, más educación tecnica. Pero también mano dura con los delincuentes. Las dos cosas van juntas.",
      ],
      educación: [
        "La educación es mi pasion! Yo he creado universidades, colegios, institutos. Se lo que se necesita. Vamos a dar becas completas para los mejores alumnos de colegios públicos, internet gratis en todas las escuelas y tablets para cada estudiante.",
        "Plata como cancha para la educación! Hay que duplicar el sueldo de los profesores, modernizar las escuelas y crear más institutos tecnicos. El Perú necesita tecnicos, ingenieros, gente que trabaje con sus manos. Eso saca adelante al pais.",
      ],
      corrupcion: [
        "La corrupción se combate con transparencia. Hay que digitalizar todo el Estado, que cada compra se pueda ver por internet, que cada obra tenga seguimiento ciudadano. Como empresario, yo se manejar presupuestos con eficiencia.",
        "Miren, yo he sido acusado de muchas cosas, pero sigo aquí, dando la cara. Los que realmente roban son los que nunca los descubren. Vamos a poner sistemas anticorrupción con tecnologia de punta.",
      ],
      salud: [
        "Plata como cancha para la salud! Hay que construir hospitales modernos en cada provincia, y que funcionen bien, con medicinas y doctores. Yo como gobernador mejore los hospitales de La Libertad y voy a hacer lo mismo en todo el Perú.",
        "La salud es lo primero. Vamos a hacer que el SIS funcione de verdad, sin colas, sin falta de medicinas. Y vamos a traer medicos especialistas a las zonas rurales con buenos sueldos e incentivos.",
      ],
      mineria: [
        "La mineria es importante para la economia, pero tiene que convivir con la agricultura y las comunidades. Hay que buscar el equilibrio. Más canon minero para las regiones y más vigilancia ambiental.",
        "Yo vengo de una region minera y agropecuaria. Se que las dos pueden convivir. Hay que impulsar la mineria responsable y asegurar que los beneficios lleguen a la gente, no solo a Lima.",
      ],
      constitucion: [
        "No creo que necesitemos cambiar toda la constitucion. Hay que hacer reformas puntuales: más descentralizacion, más presupuesto para las regiones, más poder a los gobiernos locales. Eso si es urgente.",
        "Miren, el problema no es la constitucion, es la gestion. Hay que gobernar mejor, con gente preparada y honesta. Yo he demostrado que se puede hacer buena gestion con las reglas actuales.",
      ],
    },
  },
  {
    id: "urresti",
    name: "Daniel Urresti",
    shortName: "Urresti",
    party: "Podemos Perú",
    initials: "DU",
    color: "#4A148C",
    bgColor: "#F3E5F5",
    personality: {
      formality: "informal",
      aggressiveness: "agresivo",
      populism: "populista",
      style: "Habla de forma directa, casi militar. Es confrontacional con sus rivales. Proyecta imagen de hombre de acción y mano dura.",
    },
    greeting:
      "Que tal, soy Daniel Urresti. Ex ministro del Interior, militar de carrera. Yo no ando con rodeos. Lo que este pais necesita es orden y autoridad. Pregunten directamente, que yo respondo directamente.",
    genericResponses: [
      "Mira, yo soy un hombre de accion, no de discursos. Como ministro del Interior reduje la criminalidad. Tengo experiencia real, no promesas vacias. El Perú necesita a alguien que ya haya demostrado que puede resolver los problemas.",
      "Los políticos tradicionales han fracasado. El Perú necesita un lider con experiencia militar y de gestion. Yo he combatido el terrorismo, he enfrentado la delincuencia, y no le tengo miedo a nadie. Eso es lo que se necesita.",
      "Aquí hay que hablar claro: el pais esta en crisis y se necesita a alguien que ponga orden. Yo tengo el caracter y la experiencia para hacerlo. No vengo a hacer amigos, vengo a salvar al Perú.",
    ],
    topicResponses: {
      economia: [
        "La economia se reactiva cuando hay seguridad. Ningun inversionista va a traer su plata a un pais donde te asaltan a cada rato. Primero pongamos orden, y la economia se recupera sola. Ademas, hay que desburocratizar el Estado para facilitar los negocios.",
        "Hay que ser pragmaticos. Inversion privada con reglas claras, apoyo a las pymes con menos tramites, y un Estado eficiente que no sea una traba sino un aliado del emprendedor. Como militar, yo se de eficiencia.",
      ],
      seguridad: [
        "Este es mi tema. Yo baje la criminalidad como ministro del Interior y lo voy a hacer como presidente. Plan de choque: policias en cada esquina, drones de vigilancia, inteligencia operativa contra las bandas criminales. Cero tolerancia con el crimen.",
        "Hay que meter a los delincuentes presos, asi de simple. Cadena perpetua para extorsionadores, pena maxima para sicarios. Y las carceles tienen que ser carceles, no hoteles. El criminal tiene que tenerle miedo al Estado, no al reves.",
      ],
      educación: [
        "La educación necesita disciplina. Propongo incluir valores civicos y militares en la curricula escolar. Los jovenes de hoy necesitan estructura, respeto y conocimiento practico, no teorias abstractas.",
        "Hay que mejorar la infraestructura educativa y pagar bien a los maestros, pero también exigirles resultados. Evaluaciones estrictas y meritocracia. El que no da la talla, fuera. Asi funciona en el Ejercito y funciona bien.",
      ],
      corrupcion: [
        "A los corruptos hay que meterlos presos, sin contemplaciones. Yo propongo un sistema de control interno en cada ministerio, con personal especializado y protección para los denunciantes. Que nadie se atreva a robar sabiendo que lo van a descubrir.",
        "La corrupción se combate con investigación y castigo ejemplar. Hay que fortalecer la Procuraduria y darle dientes a la Contraloria. Y los funcionarios corruptos deben devolver hasta el ultimo centavo. Tolerancia cero.",
      ],
      salud: [
        "El sistema de salud necesita una gestion tipo militar: eficiente, sin desperdicios, con logistica impecable. Hospitales que funcionen como maquínas bien aceitadas, con abastecimiento constante y personal comprometido.",
        "Hay que reformar el sistema de salud de raiz. Un solo sistema integrado, bien gestionado, con presupuesto suficiente. Y hay que llevar salud a las zonas más alejadas con brigadas médicas, como hacemos en el Ejercito.",
      ],
      mineria: [
        "La mineria es clave para el Perú. Hay que impulsarla con seguridad juridica y control ambiental estricto. No podemos permitir que grupos antimineros paralicen el desarrollo del pais. Orden y progreso, esa es la formula.",
        "Los conflictos mineros se resuelven con dialogo pero también con firmeza. El Estado debe garantizar que las inversiones se ejecuten, protegiendo a las comunidades pero sin permitir que unos pocos bloqueen el beneficio de todos.",
      ],
      constitucion: [
        "No estoy de acuerdo con cambiar la constitucion. Lo que hay que cambiar son a los malos funcionarios. La constitución nos da las herramientas, el problema es que no se aplican. Más accion, menos teoria.",
        "El Perú no necesita una asamblea constituyente, necesita un gobierno que haga cumplir las leyes. Con la constitución actual se puede gobernar bien, siempre que haya voluntad y mano firme.",
      ],
    },
  },
  {
    id: "mendoza",
    name: "Veronika Mendoza",
    shortName: "Veronika",
    party: "Nuevo Perú",
    initials: "VM",
    color: "#E91E63",
    bgColor: "#FCE4EC",
    personality: {
      formality: "formal",
      aggressiveness: "pacifico",
      populism: "mixto",
      style: "Habla de forma articulada y academica. Enfatiza derechos sociales, igualdad de género y medio ambiente. Usa un tono empatico y progresista.",
    },
    greeting:
      "Buenas tardes, compañero, compañera. Soy Veronika Mendoza, de Nuevo Perú. Creo en un pais más justo, más igualitario y más sostenible. Conversemos sobre como podemos transformar el Perú juntos.",
    genericResponses: [
      "Creo firmemente que el Perú necesita un cambio estructural. No más parches, no más de lo mismo. Necesitamos un Estado que ponga al centro a las personas, especialmente a quienes han sido historicamente excluidos: mujeres, pueblos originarios, comunidades rurales.",
      "Nuestro proyecto es construir un Perú donde todos y todas tengamos las mismas oportunidades. Eso implica reformar el modelo economico, fortalecer los servicios públicos y garantizar los derechos de todas las personas sin discriminacion.",
      "El Perú tiene una riqueza enorme, pero esta mal distribuida. No es justo que unos pocos acumulen tanto mientras millones viven en pobreza. Nuevo Perú propone un modelo más equitativo, más solidario, más humano.",
    ],
    topicResponses: {
      economia: [
        "Necesitamos una economia que funcione para todos y todas, no solo para los grandes grupos economicos. Propongo una reforma tributaria progresiva donde los que más ganan, más contribuyan. Aumentar la presion tributaria al 20% del PBI para financiar servicios públicos de calidad.",
        "El modelo neoliberal ha profundizado las desigualdades. Necesitamos un Estado más activo en la economia: empresas públicas estrategicas, banca de fomento para las mypes, y políticas industriales que diversifiquen nuestra economia. No podemos seguir dependiendo solo de la exportación de materias primas.",
      ],
      seguridad: [
        "La seguridad ciudadana no se resuelve solo con más policias y mano dura. Hay que atacar las causas estructurales: pobreza, desempleo, falta de oportunidades. Propongo prevención con inversion social, programas para jovenes en riesgo y reforma integral de la policia.",
        "Necesitamos una reforma policial profunda que acabe con la corrupción dentro de la institucion. Policias mejor formados, mejor pagados y con enfoque de derechos humanos. La seguridad se construye con justicia social.",
      ],
      educación: [
        "La educación es un derecho, no un negocio. Propongo educación pública gratuita y de calidad en todos los niveles, incluyendo la universidad. Hay que invertir al menos el 6% del PBI en educación, con enfoque intercultural y de género.",
        "Necesitamos una revolución educativa que forme ciudadanos y ciudadanas criticos, creativos y comprometidos con el bien comun. Educación bilingue intercultural, educación sexual integral, y una curricula que valore nuestra diversidad cultural.",
      ],
      corrupcion: [
        "La corrupción es un problema estructural que esta vinculado al modelo economico. Cuando el Estado es debil y capturado por intereses privados, la corrupción prolifera. Hay que fortalecer las instituciones, garantizar su independencia y promover la participación ciudadana en la fiscalizacion.",
        "Propongo reformas profundas: financiamiento publico exclusivo para partidos políticos, eliminación de la inmunidad parlamentaria, y un sistema de justicia verdaderamente independiente. La corrupción se combate con democracia y transparencia.",
      ],
      salud: [
        "La salud es un derecho fundamental. Propongo un sistema unico de salud, publico y universal, que garantice atención de calidad para todos y todas sin importar su condición economica. Hay que acabar con el negocio de la salud.",
        "La pandemia demostro que nuestro sistema de salud es un desastre. Necesitamos invertir al menos el 6% del PBI en salud, construir hospitales y postas en zonas rurales, y garantizar que ningún peruano ni peruana muera por falta de atención médica.",
      ],
      mineria: [
        "La mineria debe ser responsable con el medio ambiente y respetar los derechos de las comunidades. Propongo consulta previa vinculante para todos los proyectos extractivos y un impuesto a las sobreganancias mineras para financiar el desarrollo de las regiones.",
        "No estamos en contra de la mineria, pero si en contra de la mineria irresponsable que contamina rios, destruye ecosistemas y atropella los derechos de las comunidades. El agua vale más que el oro.",
      ],
      constitucion: [
        "El Perú necesita una nueva constitucion, elaborada por una asamblea constituyente plurinacional con paridad de género. Una constitución que reconozca el Perú como un Estado plurinacional, que garantice derechos sociales y que proteja el medio ambiente.",
        "La constitución del 93 fue impuesta por una dictadura y esta hecha a medida de los grandes intereses economicos. Necesitamos una constitución que ponga al centro los derechos de las personas y la protección del medio ambiente, no las ganancias de las corporaciones.",
      ],
    },
  },
  {
    id: "desoto",
    name: "Hernando de Soto",
    shortName: "Hernando",
    party: "Avanza Pais",
    initials: "HS",
    color: "#1565C0",
    bgColor: "#E3F2FD",
    personality: {
      formality: "formal",
      aggressiveness: "moderado",
      populism: "tecnocrata",
      style: "Habla como economista e intelectual. Usa datos, estadisticas y referencias internacionales. Enfatiza la formalización y los derechos de propiedad.",
    },
    greeting:
      "Buenas tardes. Soy Hernando de Soto. He dedicado mi vida a estudiar como los paises salen de la pobreza. La clave esta en formalizar la economia y dar derechos de propiedad a los más pobres. Conversemos.",
    genericResponses: [
      "El Perú tiene un enorme capital muerto. Millones de peruanos tienen activos informales que no pueden convertir en capital porque el sistema legal no los reconoce. Mi mision es cambiar eso, como lo he propuesto durante decades y como lo han implementado más de 40 paises siguiendo mis recomendaciones.",
      "Los peruanos no son pobres por falta de esfuerzo, sino por falta de un marco legal que reconozca sus derechos. Cuando le das titulo de propiedad a una familia, le das acceso al credito, a la inversion, al progreso. Esa es la verdadera revolucion.",
      "He trabajado con gobiernos de todo el mundo y he visto que la formula funciona: derechos de propiedad, formalizacion, simplificación burocratica. El Perú puede ser un pais desarrollado si aplicamos estas reformas con decisión.",
    ],
    topicResponses: {
      economia: [
        "El 70% de la economia peruana es informal. Eso significa que millones de peruanos trabajan sin proteccion, sin acceso al credito, sin seguridad juridica. Mi plan es formalizar la economia no con multas y persecucion, sino dando incentivos: titulos de propiedad, simplificación de tramites, acceso al sistema financiero.",
        "El Perú tiene más de 300 mil millones de dolares en capital muerto: propiedades sin titulo, negocios sin registro. Si formalizamos esos activos, podemos generar un boom economico sin precedentes. No necesitamos estatizar nada, necesitamos liberar el potencial de los peruanos.",
      ],
      seguridad: [
        "La inseguridad tiene raices economicas. Cuando la gente no tiene oportunidades formales, recurre a la informalidad y a la ilegalidad. Si formalizamos la economia y damos oportunidades reales, la delincuencia se reduce naturalmente. Pero también necesitamos un sistema judicial que funcione.",
        "La seguridad requiere un enfoque integral. Necesitamos una policia profesional, un poder judicial eficiente y, sobre todo, una economia formal que ofrezca oportunidades. Los paises más seguros son los más formales.",
      ],
      educación: [
        "La educación es fundamental, pero tiene que estar conectada con el mercado laboral. No sirve de nada tener profesionales si no hay empleos formales para ellos. Propongo una educación tecnica y universitaria alineada con las necesidades productivas del pais.",
        "Hay que invertir en educación de calidad, especialmente en zonas rurales. Pero también hay que reformar el sistema educativo para que forme emprendedores y profesionales que puedan participar en una economia formal y competitiva.",
      ],
      corrupcion: [
        "La corrupción florece donde hay burocracia excesiva. Si simplificas los tramites, reduces las oportunidades de corrupcion. Cada tramite innecesario es una oportunidad para que un funcionario pida coima. Hay que digitalizar y simplificar el Estado.",
        "La mejor herramienta anticorrupción es la transparencia y la simplificacion. En los paises desarrollados, la corrupción es menor porque los tramites son simples y digitales. Hay que aplicar la misma formula en el Perú.",
      ],
      salud: [
        "El sistema de salud necesita eficiencia y competencia. Propongo un sistema mixto con un piso basico universal publico y la posibilidad de que el sector privado compita en calidad y precio. La clave es que el peruano pueda elegir.",
        "Hay que invertir en salud preventiva y en infraestructura, pero también hay que permitir que el sector privado participe. La competencia mejora la calidad. Un sistema exclusivamente estatal tiende a la ineficiencia.",
      ],
      mineria: [
        "La mineria es crucial para el Perú, pero los conflictos se generan porque las comunidades no tienen derechos de propiedad claros sobre la superficie. Si les damos titulos formales, pueden negociar de igual a igual con las empresas mineras. Ese es el camino.",
        "El problema minero en el Perú no es la mineria en si, sino la falta de derechos de propiedad. Cuando las comunidades son duenas formales de su tierra, pueden negociar mejores condiciones. La formalización es la solucion.",
      ],
      constitucion: [
        "La constitución actual tiene aspectos positivos que han permitido estabilidad economica. No creo en cambiar toda la constitucion, sino en hacer reformas puntuales que fortalezcan los derechos de propiedad y simplifiquen el marco regulatorio.",
        "Una nueva constitución es innecesaria y riesgosa. Lo que necesitamos son reformas legales que faciliten la formalizacion, protejan la propiedad y reduzcan la burocracia. El marco constitucional actual permite esas reformas.",
      ],
    },
  },
  {
    id: "guzman",
    name: "Julio Guzman",
    shortName: "Julio",
    party: "Partido Morado",
    initials: "JG",
    color: "#7B1FA2",
    bgColor: "#F3E5F5",
    personality: {
      formality: "formal",
      aggressiveness: "pacifico",
      populism: "tecnocrata",
      style: "Habla como tecnócrata moderno. Usa datos y propuestas especificas. Apela a los jovenes y la clase media. Proyecta imagen de renovación politica.",
    },
    greeting:
      "Hola! Soy Julio Guzman, del Partido Morado. Represento una nueva generación de politica: tecnica, transparente y con vision de futuro. Estoy aquí para conversar sobre como modernizar el Perú. Adelante con las preguntas.",
    genericResponses: [
      "Creo en una política basada en evidencia, no en ideologias extremas. El Perú necesita un centro reformista que combine crecimiento economico con inclusion social. No somos ni de izquierda ni de derecha, somos de lo que funciona.",
      "El Perú necesita renovación politica. Llevamos decadas con los mismos actores y los mismos resultados. El Partido Morado representa una nueva forma de hacer politica: tecnica, transparente, moderna y con propuestas basadas en datos.",
      "Mi vision es la de un Perú moderno, conectado al mundo, con un Estado eficiente que sirva al ciudadano. No necesitamos revoluciones ni mano dura, necesitamos reformas inteligentes y bien ejecutadas.",
    ],
    topicResponses: {
      economia: [
        "Necesitamos una economia competitiva e inclusiva. Propongo reformas para mejorar la productividad: simplificación regulatoria, inversion en infraestructura digital, y apoyo a la innovación y el emprendimiento tecnologico. El Perú puede ser un hub tecnologico regional.",
        "Hay que modernizar la economia peruana. Propongo la creación de zonas economicas especiales para la industria tecnologica, incentivos tributarios para startups, y un fondo de inversion en innovacion. El futuro es la economia del conocimiento.",
      ],
      seguridad: [
        "La seguridad ciudadana requiere un enfoque integral y basado en datos. Propongo un sistema de policia predictiva usando inteligencia artificial, reforma de la carrera policial con mejores sueldos y evaluaciones, y programas de reinserción para reducir la reincidencia.",
        "Hay que profesionalizar la lucha contra el crimen. Propongo una policia moderna, con tecnologia de punta, bien pagada y con controles internos estrictos. También necesitamos un sistema penitenciario que realmente rehabilite.",
      ],
      educación: [
        "La educación es la inversion más rentable que puede hacer un pais. Propongo triplicar la inversion en educación publica, universalizar la educación inicial, y crear un programa de becas masivo para estudiantes de alto rendimiento de escuelas públicas.",
        "Necesitamos una educación del siglo XXI: programacion, pensamiento critico, creatividad, idiomas. Propongo reformar la curricula, capacitar a los maestros en nuevas metodologias, y conectar todas las escuelas a internet de alta velocidad.",
      ],
      corrupcion: [
        "La lucha anticorrupción es central en nuestra propuesta. Propongo gobierno abierto con datos públicos en tiempo real, fiscalización ciudadana digital, eliminación del secreto bancario para funcionarios públicos, y un sistema de protección efectiva para denunciantes.",
        "Hay que usar la tecnologia para combatir la corrupcion. Blockchain para las compras del Estado, inteligencia artificial para detectar patrones de corrupcion, y total transparencia en el uso de recursos públicos. Cada sol del Estado debe ser rastreable.",
      ],
      salud: [
        "El sistema de salud necesita una reforma integral basada en evidencia. Propongo un sistema de historia clinica digital universal, telemedicina para zonas rurales, y una red de atención primaria fortalecida que reduzca la presion sobre los hospitales.",
        "Hay que invertir en salud preventiva y en tecnologia médica. Propongo que cada peruano tenga una tarjeta unica de salud digital, acceso a telemedicina, y que se implemente la receta electrónica en todo el pais. Modernizar para servir mejor.",
      ],
      mineria: [
        "La mineria debe ser un motor de desarrollo sostenible. Propongo estandares ambientales internacionales, un fondo soberano con parte de las ganancias mineras, y programas de desarrollo alternativo para las comunidades. Minería si, pero bien hecha.",
        "Hay que profesionalizar la gestion de conflictos mineros con dialogo temprano, estudios de impacto ambiental rigurosos y distribución justa de beneficios. La mineria puede ser compatible con el medio ambiente si se hace con los mejores estandares.",
      ],
      constitucion: [
        "No creo en una asamblea constituyente, pero si en reformas constitucionales puntuales y necesarias. Hay que fortalecer la independencia del poder judicial, mejorar el sistema electoral y modernizar el marco regulatorio. Reformas si, aventuras no.",
        "La constitución se puede mejorar con reformas especificas aprobadas por el Congreso. Necesitamos fortalecer la descentralizacion, mejorar el equilibrio de poderes y actualizar el capitulo economico para incluir la economia digital.",
      ],
    },
  },
  {
    id: "forsyth",
    name: "George Forsyth",
    shortName: "George",
    party: "Somos Perú",
    initials: "GF",
    color: "#00897B",
    bgColor: "#E0F2F1",
    personality: {
      formality: "informal",
      aggressiveness: "moderado",
      populism: "populista",
      style: "Habla de forma cercana y juvenil. Usa referencias deportivas. Se presenta como un outsider que conoce los problemas de la calle. Apela a la juventud.",
    },
    greeting:
      "Que tal, gente! Soy George Forsyth. Ex futbolista, ex alcalde de La Victoria, y ahora candidato presidencial. Yo conozco la calle, conozco los problemas del barrio. Estoy aquí para escucharlos. Pregunten con confianza.",
    genericResponses: [
      "Mira, yo vengo de la calle, del barrio. Como alcalde de La Victoria recupere Gamarra, ordene el distrito. No soy un político tradicional, soy alguien que quiere hacer las cosas bien y que tiene la energia para hacerlo.",
      "Yo no soy un político de toda la vida. Fui futbolista, fui alcalde, y en cada cosa que he hecho le he puesto garra. El Perú necesita esa misma garra, esa misma entrega. Y yo la tengo.",
      "La gente esta cansada de los mismos de siempre. Yo represento el cambio, la renovacion. Soy joven, tengo energia, y conozco los problemas reales de la gente porque los he vivido y los he enfrentado como alcalde.",
    ],
    topicResponses: {
      economia: [
        "La economia se reactiva desde lo local. Como alcalde impulse la formalización de Gamarra, apoye a los comerciantes, y genere empleo. Hay que hacer lo mismo a nivel nacional: apoyar a las pymes, reducir los tramites y generar oportunidades para los jovenes.",
        "Hay que impulsar el emprendimiento juvenil. Los jovenes peruanos son creativos e innovadores, pero el Estado les pone trabas. Propongo creditos blandos, capacitación gratuita y menos burocracia para que puedan echar a andar sus negocios.",
      ],
      seguridad: [
        "La seguridad es lo que mejor conozco. Como alcalde de La Victoria recupere zonas que eran tierra de nadie. Lo hice con patrullaje constante, camaras, iluminación y trabajo con la comunidad. Ese modelo se puede replicar en todo el Perú.",
        "Hay que combatir la inseguridad barrio por barrio. Más serenazgo, más camaras, más iluminacion, y sobre todo, más oportunidades para los jovenes que hoy son captados por las bandas criminales. Prevención y accion, las dos cosas.",
      ],
      educación: [
        "La educación tiene que preparar a los jovenes para el mundo real. Más educación tecnica, más deporte, más arte. No todo el mundo tiene que ir a la universidad. Hay que valorar los oficios tecnicos porque el Perú los necesita.",
        "Como deportista se lo importante que es la disciplina y el trabajo en equipo. Hay que meter más deporte en las escuelas, más actividades extracurriculares, y darles a los jovenes alternativas positivas.",
      ],
      corrupcion: [
        "Yo entre a la política para cambiar las cosas, no para robar. Como alcalde fui transparente con los fondos públicos. Hay que exigir lo mismo a todos los funcionarios: declaración de bienes, auditorias constantes y rendición de cuentas.",
        "La corrupción se combate con ejemplo. Si el presidente es honesto, el mensaje baja a todos los niveles. Propongo un gobierno de puertas abiertas donde cada ciudadano pueda ver como se gasta su plata.",
      ],
      salud: [
        "La salud es un tema urgente. Hay que mejorar los centros de salud de los barrios, que son los más cercanos a la gente. Mejor equipados, con más personal, y con horarios extendidos. La salud no puede esperar.",
        "Hay que acercar la salud a la gente. Propongo brigadas médicas en los barrios más pobres, campañas de salud preventiva, y que los centros de salud funcionen como centros comunitarios donde la gente encuentre atención integral.",
      ],
      mineria: [
        "La mineria es importante pero tiene que respetar a las comunidades y al medio ambiente. Hay que buscar el dialogo, sentarse con todos en la mesa, y encontrar soluciones que beneficien a todos. No es blanco o negro.",
        "Como en el futbol, en la mineria hay que jugar en equipo: empresas, comunidades y Estado. Si los tres trabajan juntos, todos ganan. Pero si uno quiere ganar solo, pierde todo el equipo.",
      ],
      constitucion: [
        "Creo que hay que hacer reformas, pero con calma, sin extremismos. El Perú no esta para experimentos. Reformas puntuales que mejoren la vida de la gente: mejor descentralizacion, más poder a los municipios, más participación ciudadana.",
        "No soy de los que dicen que hay que cambiar todo. Hay cosas que funcionan y hay que mantenerlas. Pero también hay cosas que mejorar. Hagamoslo con sentido comun, sin ideologias extremas.",
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// Topics for suggested questions
// ---------------------------------------------------------------------------

const SUGGESTED_TOPICS = [
  { key: "economia", label: "Economía", icon: "💰", question: "Cual es tu plan economico para el Perú?" },
  { key: "seguridad", label: "Seguridad", icon: "🛡️", question: "Como piensas combatir la inseguridad ciudadana?" },
  { key: "educación", label: "Educación", icon: "📚", question: "Que propones para mejorar la educación?" },
  { key: "corrupcion", label: "Corrupción", icon: "⚖️", question: "Como vas a luchar contra la corrupcion?" },
  { key: "salud", label: "Salud", icon: "🏥", question: "Cual es tu plan para mejorar la salud publica?" },
  { key: "mineria", label: "Minería", icon: "⛏️", question: "Cual es tu posición sobre la mineria?" },
  { key: "constitucion", label: "Constitución", icon: "📜", question: "Crees que el Perú necesita una nueva constitucion?" },
];

// ---------------------------------------------------------------------------
// Keyword detection map
// ---------------------------------------------------------------------------

const KEYWORD_MAP: Record<string, string[]> = {
  economia: [
    "econom", "dinero", "plata", "trabajo", "empleo", "desempleo", "pobreza",
    "sueldo", "salario", "impuesto", "tribut", "pbi", "inflacion", "precio",
    "inversion", "empresa", "negocio", "pyme", "mype", "comercio", "exporta",
    "importa", "dolar", "sol", "deuda", "presupuesto", "fiscal", "igv",
    "informal", "formal", "emprend",
  ],
  seguridad: [
    "seguridad", "inseguridad", "delincuen", "robo", "asalto", "crimen",
    "criminal", "narco", "droga", "sicari", "extorsion", "policia", "pnp",
    "carcel", "prision", "preso", "pena de muerte", "cadena perpetua",
    "violencia", "feminicidio", "asesin", "homicid", "pandilla",
  ],
  educación: [
    "educación", "escuela", "colegio", "universidad", "profesor", "maestro",
    "docente", "alumno", "estudiante", "beca", "curricula", "sunedu",
    "ensenan", "aprender", "lectura", "matematica", "tecnolog", "digital",
  ],
  corrupcion: [
    "corrupcion", "corrupto", "robar", "roba", "coima", "soborno",
    "lava", "lavado", "odebrecht", "congreso", "congresista", "fiscal",
    "juez", "justicia", "impunidad", "investig", "transparencia",
    "contralor",
  ],
  salud: [
    "salud", "hospital", "clinica", "medico", "doctor", "enferm",
    "medicina", "vacuna", "covid", "pandemia", "sis", "essalud",
    "farmacia", "medicamento", "cancer", "mortalidad", "nutricion",
    "desnutricion", "anemia",
  ],
  mineria: [
    "miner", "mina", "oro", "cobre", "plata mineral", "canon",
    "regalias", "contamin", "medio ambiente", "ambiental", "ecolog",
    "agua", "rio", "lago", "tia maria", "conga", "las bambas",
    "comunidad", "campesino",
  ],
  constitucion: [
    "constitucion", "constituyente", "asamblea", "reforma", "carta magna",
    "ley", "leyes", "congreso", "parlamento", "democracia", "Estado",
    "gobierno", "poder", "descentraliz", "region",
  ],
};

// ---------------------------------------------------------------------------
// Local response generator
// ---------------------------------------------------------------------------

function detectTopic(text: string): string | null {
  const lower = text.toLowerCase();
  let bestTopic: string | null = null;
  let bestScore = 0;

  for (const [topic, keywords] of Object.entries(KEYWORD_MAP)) {
    let score = 0;
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }

  return bestScore > 0 ? bestTopic : null;
}

function addPersonalityFlavor(
  text: string,
  personality: Candidate["personality"]
): string {
  let prefix = "";
  let suffix = "";

  if (personality.formality === "muy_informal") {
    const prefixes = ["Mira pe, ", "A ver, ", "Te digo una cosa, "];
    prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  } else if (personality.formality === "informal") {
    const prefixes = ["Mira, ", "Te cuento, ", "Bueno, "];
    prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  }

  if (personality.aggressiveness === "agresivo") {
    const suffixes = [
      " Y el que no este de acuerdo, que se ponga a un lado, porque vamos con todo.",
      " Aquí no hay medias tintas. O estas con el pueblo o estas contra el pueblo.",
      " Eso es lo que hay, te guste o no.",
    ];
    suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  } else if (personality.aggressiveness === "pacifico") {
    const suffixes = [
      " Creo que juntos podemos construir algo mejor.",
      " Es un camino largo pero estamos comprometidos con el cambio.",
      " Esa es nuestra vision, y estamos abiertos al dialogo.",
    ];
    suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  }

  return prefix + text + suffix;
}

function generateResponse(candidate: Candidate, userMessage: string): string {
  const topic = detectTopic(userMessage);

  let baseResponse: string;

  if (topic && candidate.topicResponses[topic]) {
    const responses = candidate.topicResponses[topic];
    baseResponse = responses[Math.floor(Math.random() * responses.length)];
  } else {
    baseResponse =
      candidate.genericResponses[
      Math.floor(Math.random() * candidate.genericResponses.length)
      ];
  }

  return addPersonalityFlavor(baseResponse, candidate.personality);
}

// ---------------------------------------------------------------------------
// Unique ID helper
// ---------------------------------------------------------------------------

let messageCounter = 0;
function generateId(): string {
  messageCounter++;
  return `msg-${Date.now()}-${messageCounter}`;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function SimuladorPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Store per-candidate chat history
  const [chatHistories, setChatHistories] = useState<
    Record<string, Message[]>
  >({});

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Focus input when candidate is selected
  useEffect(() => {
    if (selectedCandidate) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [selectedCandidate]);

  function selectCandidate(candidate: Candidate) {
    // Save current chat history
    if (selectedCandidate && messages.length > 0) {
      setChatHistories((prev) => ({
        ...prev,
        [selectedCandidate.id]: messages,
      }));
    }

    setSelectedCandidate(candidate);

    // Restore previous chat or start new one
    if (chatHistories[candidate.id]) {
      setMessages(chatHistories[candidate.id]);
    } else {
      const greeting: Message = {
        id: generateId(),
        role: "assistant",
        content: candidate.greeting,
        timestamp: new Date(),
      };
      setMessages([greeting]);
    }
  }

  function goBackToSelector() {
    // Save current chat
    if (selectedCandidate && messages.length > 0) {
      setChatHistories((prev) => ({
        ...prev,
        [selectedCandidate.id]: messages,
      }));
    }
    setSelectedCandidate(null);
  }

  async function sendMessage(text?: string) {
    const messageText = text || inputValue.trim();
    if (!messageText || !selectedCandidate || isTyping) return;

    const userMsg: Message = {
      id: generateId(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay (800-2000ms)
    const delay = 800 + Math.random() * 1200;
    await new Promise((resolve) => setTimeout(resolve, delay));

    const response = generateResponse(selectedCandidate, messageText);

    const assistantMsg: Message = {
      id: generateId(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setIsTyping(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // -------------------------------------------------------------------------
  // RENDER: Candidate selector
  // -------------------------------------------------------------------------

  if (!selectedCandidate) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#D91023] to-[#8B0000] opacity-95" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#D4A017] rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#D4A017] rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white/90 font-medium mb-6">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Simulador de Debate con IA
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Conversa con los{" "}
              <span className="text-[#D4A017]">candidatos</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-2">
              Selecciona un candidato presidencial y hazle las preguntas que
              quieras. La IA simula sus respuestas basándose en sus posiciones
              públicas conocidas.
            </p>
          </div>
        </div>

        {/* Candidate grid */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {CANDIDATES.map((candidate) => {
              const hasHistory = !!chatHistories[candidate.id];
              return (
                <button
                  key={candidate.id}
                  onClick={() => selectCandidate(candidate)}
                  className="group relative bg-white rounded-2xl p-5 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 text-left"
                >
                  {hasHistory && (
                    <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-green-400 rounded-full ring-2 ring-white" />
                  )}
                  {/* Avatar */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 mx-auto transition-transform group-hover:scale-110"
                    style={{ backgroundColor: candidate.color }}
                  >
                    {candidate.initials}
                  </div>
                  {/* Info */}
                  <div className="text-center">
                    <h3 className="font-bold text-gray-800 text-sm leading-tight">
                      {candidate.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {candidate.party}
                    </p>
                  </div>
                  {/* Hover hint */}
                  <div className="mt-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span
                      className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: candidate.color }}
                    >
                      {hasHistory ? "Continuar chat" : "Iniciar chat"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Disclaimer */}
          <div className="mt-10 bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-amber-700 text-sm font-medium mb-1">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              Aviso importante
            </div>
            <p className="text-amber-600 text-xs leading-relaxed max-w-xl mx-auto">
              Las respuestas son generadas por IA basándose en declaraciones
              públicas del candidato. No representan opiniones reales.
            </p>
          </div>

          {/* Back to home */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // RENDER: Chat interface
  // -------------------------------------------------------------------------

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">
      {/* Chat header */}
      <div
        className="flex-shrink-0 border-b shadow-sm"
        style={{ backgroundColor: selectedCandidate.bgColor }}
      >
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          {/* Back button */}
          <button
            onClick={goBackToSelector}
            className="flex-shrink-0 w-9 h-9 rounded-full bg-white/70 hover:bg-white flex items-center justify-center transition-colors shadow-sm"
            aria-label="Volver a seleccionar candidato"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Candidate avatar */}
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ring-2 ring-white shadow-md"
            style={{ backgroundColor: selectedCandidate.color }}
          >
            {selectedCandidate.initials}
          </div>

          {/* Candidate info */}
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-gray-800 text-sm truncate">
              {selectedCandidate.name}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {selectedCandidate.party}
              </span>
              {isTyping && (
                <span className="text-xs text-green-600 font-medium">
                  escribiendo...
                </span>
              )}
            </div>
          </div>

          {/* Personality badge */}
          <div className="hidden sm:flex flex-shrink-0 items-center gap-1.5">
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium text-white"
              style={{ backgroundColor: selectedCandidate.color }}
            >
              {selectedCandidate.personality.formality === "formal"
                ? "Formal"
                : selectedCandidate.personality.formality === "informal"
                  ? "Informal"
                  : "Coloquial"}
            </span>
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium bg-white/70 text-gray-600"
            >
              {selectedCandidate.personality.aggressiveness === "agresivo"
                ? "Directo"
                : selectedCandidate.personality.aggressiveness === "moderado"
                  ? "Moderado"
                  : "Conciliador"}
            </span>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto"
      >
        <div className="max-w-3xl mx-auto px-4 py-4 space-y-4">
          {/* Date stamp */}
          <div className="text-center">
            <span className="inline-block text-xs text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm">
              Simulador de Debate - Elecciones Perú 2026
            </span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              {msg.role === "assistant" && (
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mr-2 mt-1"
                  style={{ backgroundColor: selectedCandidate.color }}
                >
                  {selectedCandidate.initials}
                </div>
              )}
              <div
                className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 ${msg.role === "user"
                  ? "bg-[#D91023] text-white rounded-br-md"
                  : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md"
                  }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>
                <p
                  className={`text-[10px] mt-1.5 ${msg.role === "user"
                    ? "text-white/60"
                    : "text-gray-300"
                    }`}
                >
                  {msg.timestamp.toLocaleTimeString("es-PE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div
                className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mr-2 mt-1"
                style={{ backgroundColor: selectedCandidate.color }}
              >
                {selectedCandidate.initials}
              </div>
              <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested questions */}
      <div className="flex-shrink-0 border-t border-gray-100 bg-white">
        <div className="max-w-3xl mx-auto px-4 pt-2 pb-1">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {SUGGESTED_TOPICS.map((topic) => (
              <button
                key={topic.key}
                onClick={() => sendMessage(topic.question)}
                disabled={isTyping}
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-gray-600 hover:bg-[#D91023] hover:text-white hover:border-[#D91023] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{topic.icon}</span>
                {topic.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Preguntale a ${selectedCandidate.shortName}...`}
              disabled={isTyping}
              className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#D91023] focus:ring-2 focus:ring-[#D91023]/20 transition-all disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-[#D91023] text-white flex items-center justify-center hover:bg-[#C40D1F] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
              aria-label="Enviar mensaje"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>

          {/* Disclaimer */}
          <p className="text-[10px] text-gray-300 text-center mt-2 leading-tight">
            Las respuestas son generadas por IA basándose en declaraciones
            públicas del candidato. No representan opiniones reales.
          </p>
        </div>
      </div>
    </div>
  );
}
