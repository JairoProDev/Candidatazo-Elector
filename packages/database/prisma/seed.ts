import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ==================== CANDIDATES ====================
  console.log("Creating candidates...");

  const candidates = [
    {
      name: "Keiko Fujimori",
      slug: "keiko-fujimori",
      party: "Fuerza Popular",
      photo: "/candidates/keiko.jpg",
      age: 50,
      bio: "Keiko Sofia Fujimori Higuchi es una politica peruana, lideresa del partido Fuerza Popular. Hija del expresidente Alberto Fujimori, ha sido candidata presidencial en 2011, 2016 y 2021. Congresista en el periodo 2006-2011. Estudio Administracion en Boston University y MBA de Columbia Business School.",
      positions: { economic: 72, social: 28, environment: 35, security: 85, institutional: 30 },
      truthScore: 45,
      planSummary: "Plan centrado en seguridad ciudadana, reactivacion economica mediante inversion privada, programas sociales focalizados y lucha frontal contra el narcotrafico.",
      twitter: "@KeikoFujimori",
      website: "https://fuerzapopular.pe",
      featured: true,
    },
    {
      name: "Antauro Humala",
      slug: "antauro-humala",
      party: "Frente Patriotico",
      photo: "/candidates/antauro.jpg",
      age: 61,
      bio: "Exmilitar y lider etnocacerista. Estuvo preso por el Andahuaylazo. Propone nacionalizacion de recursos, pena de muerte y refundacion del Estado.",
      positions: { economic: 15, social: 20, environment: 40, security: 95, institutional: 90 },
      truthScore: 30,
      planSummary: "Nacionalizacion de recursos naturales, pena de muerte, servicio militar obligatorio.",
      featured: false,
    },
    {
      name: "Cesar Acuña",
      slug: "cesar-acuna",
      party: "Alianza para el Progreso",
      photo: "/candidates/acuna.jpg",
      age: 72,
      bio: "Empresario y fundador de la Universidad Cesar Vallejo. Exgobernador de La Libertad.",
      positions: { economic: 60, social: 40, environment: 30, security: 55, institutional: 35 },
      truthScore: 38,
      planSummary: "Obras publicas, educacion tecnica, empleo juvenil y programas sociales.",
      featured: false,
    },
    {
      name: "Daniel Urresti",
      slug: "daniel-urresti",
      party: "Podemos Peru",
      photo: "/candidates/urresti.jpg",
      age: 67,
      bio: "General retirado del Ejercito. Enfocado en seguridad ciudadana y lucha contra el crimen.",
      positions: { economic: 55, social: 35, environment: 30, security: 90, institutional: 40 },
      truthScore: 42,
      planSummary: "Militarizacion de la seguridad, penas mas duras, modernizacion policial.",
      featured: false,
    },
    {
      name: "Veronika Mendoza",
      slug: "veronika-mendoza",
      party: "Juntos por el Peru",
      photo: "/candidates/mendoza.jpg",
      age: 41,
      bio: "Excongresista y politologa. Lideresa de la izquierda democratica. Propone nueva Constitucion y derechos sociales.",
      positions: { economic: 25, social: 82, environment: 85, security: 30, institutional: 88 },
      truthScore: 55,
      planSummary: "Nueva Constitucion, renegociacion de contratos mineros, matrimonio igualitario y transicion energetica.",
      twitter: "@VeronikaMendworthy",
      featured: true,
    },
    {
      name: "Hernando de Soto",
      slug: "hernando-de-soto",
      party: "Avanza Pais",
      photo: "/candidates/desoto.jpg",
      age: 84,
      bio: "Economista reconocido internacionalmente. Autor de 'El Misterio del Capital'. Propone formalizacion masiva.",
      positions: { economic: 88, social: 55, environment: 45, security: 45, institutional: 65 },
      truthScore: 52,
      planSummary: "Formalizacion masiva, derechos de propiedad digitales, simplificacion tributaria.",
      twitter: "@HernandoDeSoto",
      website: "https://ild.org.pe",
      featured: true,
    },
    {
      name: "Julio Guzman",
      slug: "julio-guzman",
      party: "Partido Morado",
      photo: "/candidates/guzman.jpg",
      age: 51,
      bio: "Tecnocrata y ex funcionario publico. Lider del centro-liberal peruano.",
      positions: { economic: 65, social: 70, environment: 65, security: 40, institutional: 75 },
      truthScore: 50,
      planSummary: "Modernizacion del Estado, gobierno digital, reforma educativa, lucha anticorrupcion.",
      featured: false,
    },
    {
      name: "George Forsyth",
      slug: "george-forsyth",
      party: "Somos Peru",
      photo: "/candidates/forsyth.jpg",
      age: 43,
      bio: "Exfutbolista profesional y exalcalde de La Victoria. Enfoque en gestion municipal y seguridad.",
      positions: { economic: 58, social: 48, environment: 42, security: 70, institutional: 50 },
      truthScore: 43,
      planSummary: "Seguridad basada en tecnologia, empleo juvenil, infraestructura y deporte.",
      featured: false,
    },
  ];

  const createdCandidates: Record<string, string> = {};

  for (const c of candidates) {
    const candidate = await prisma.candidate.upsert({
      where: { slug: c.slug },
      create: c,
      update: c,
    });
    createdCandidates[c.slug] = candidate.id;
  }

  // ==================== PROMISES ====================
  console.log("Creating promises...");

  const promises = [
    { candidateSlug: "keiko-fujimori", title: "Declarar estado de emergencia en seguridad", description: "Desplegar Fuerzas Armadas en zonas de alta criminalidad.", category: "SECURITY" as const },
    { candidateSlug: "keiko-fujimori", title: "Crear 1 millon de empleos formales", description: "Incentivos tributarios y simplificacion de tramites.", category: "ECONOMY" as const },
    { candidateSlug: "keiko-fujimori", title: "Internet para todos los colegios", description: "Conectar al 100% de escuelas publicas con internet.", category: "EDUCATION" as const },
    { candidateSlug: "keiko-fujimori", title: "Reforma del sistema de salud", description: "Unificar SIS, EsSalud en un sistema universal.", category: "HEALTH" as const },
    { candidateSlug: "veronika-mendoza", title: "Asamblea Constituyente", description: "Convocar a una Asamblea Constituyente paritaria y plurinacional.", category: "INSTITUTIONAL" as const },
    { candidateSlug: "veronika-mendoza", title: "Segundo aguinaldo", description: "Establecer un segundo aguinaldo para trabajadores formales.", category: "ECONOMY" as const },
    { candidateSlug: "veronika-mendoza", title: "Matrimonio igualitario", description: "Aprobar matrimonio civil para parejas del mismo sexo.", category: "SOCIAL" as const },
    { candidateSlug: "veronika-mendoza", title: "Renegociar contratos mineros", description: "Mayor participacion del Estado en ganancias mineras.", category: "ECONOMY" as const },
    { candidateSlug: "hernando-de-soto", title: "Formalizar 12 millones de peruanos", description: "Programa masivo de formalizacion con tecnologia digital.", category: "ECONOMY" as const },
    { candidateSlug: "hernando-de-soto", title: "Titulos de propiedad digitales", description: "Blockchain para titulos de propiedad.", category: "ECONOMY" as const },
    { candidateSlug: "hernando-de-soto", title: "Gobierno digital al 100%", description: "Todos los tramites gubernamentales disponibles en linea.", category: "TECHNOLOGY" as const },
    { candidateSlug: "antauro-humala", title: "Nacionalizar recursos naturales", description: "Expropiar minas de empresas extranjeras.", category: "ECONOMY" as const },
    { candidateSlug: "antauro-humala", title: "Pena de muerte para corruptos", description: "Implementar pena de muerte para funcionarios corruptos.", category: "SECURITY" as const },
    { candidateSlug: "julio-guzman", title: "Gobierno 100% digital", description: "Digitalizar todos los servicios del Estado.", category: "TECHNOLOGY" as const },
    { candidateSlug: "julio-guzman", title: "Reforma educativa integral", description: "Incrementar presupuesto de educacion al 6% del PBI.", category: "EDUCATION" as const },
  ];

  for (const p of promises) {
    const candidateId = createdCandidates[p.candidateSlug];
    if (candidateId) {
      await prisma.promise.create({
        data: {
          candidateId,
          title: p.title,
          description: p.description,
          category: p.category,
        },
      });
    }
  }

  // ==================== DNA QUESTIONS ====================
  console.log("Creating DNA questions...");

  const questions = [
    // ECONOMIC
    { text: "El Estado deberia controlar los precios de productos basicos?", dimension: "ECONOMIC" as const, order: 1, options: [{ value: -100, label: "Si, fijar precios" }, { value: -50, label: "Solo esenciales" }, { value: 0, label: "No estoy seguro" }, { value: 50, label: "Incentivos al mercado" }, { value: 100, label: "Mercado se regula solo" }], context: "El precio del balon de gas fluctua entre S/40-60." },
    { text: "Que hacer con empresas publicas como Petroperu?", dimension: "ECONOMIC" as const, order: 2, options: [{ value: -100, label: "Mantener publica" }, { value: -50, label: "Reforma profunda" }, { value: 0, label: "Sin posicion" }, { value: 50, label: "Privatizar parcialmente" }, { value: 100, label: "Privatizar totalmente" }], context: "Petroperu acumula miles de millones en perdidas." },
    { text: "Aumentar impuestos a los mas ricos?", dimension: "ECONOMIC" as const, order: 3, options: [{ value: -100, label: "Mucho mas altos" }, { value: -50, label: "Moderadamente" }, { value: 0, label: "Mantener" }, { value: 50, label: "Reducir para inversion" }, { value: 100, label: "Reducir drasticamente" }], context: "Peru recauda 16.8% del PBI, bajo en la region." },
    { text: "El salario minimo deberia aumentar significativamente?", dimension: "ECONOMIC" as const, order: 4, options: [{ value: -100, label: "Si, a S/1,500+" }, { value: -50, label: "Aumento moderado" }, { value: 0, label: "Depende" }, { value: 50, label: "Formalizar primero" }, { value: 100, label: "El mercado define" }], context: "Salario minimo: S/1,025. 70% son informales." },
    { text: "Bonos y transferencias a familias pobres?", dimension: "ECONOMIC" as const, order: 5, options: [{ value: -100, label: "Ampliar programas" }, { value: -50, label: "Mejorar focalizacion" }, { value: 0, label: "Depende" }, { value: 50, label: "Reemplazar por empleo" }, { value: 100, label: "Eliminar" }], context: "Juntos y Pension 65 tienen criticas por filtraciones." },
    { text: "Libre comercio y TLCs?", dimension: "ECONOMIC" as const, order: 6, options: [{ value: -100, label: "Renegociar" }, { value: -50, label: "Mas protecciones" }, { value: 0, label: "Sin opinion" }, { value: 50, label: "Son positivos" }, { value: 100, label: "Mas apertura" }], context: "Peru tiene TLCs con EE.UU., China y la UE." },
    // SOCIAL
    { text: "Matrimonio entre personas del mismo sexo?", dimension: "SOCIAL" as const, order: 1, options: [{ value: 100, label: "Matrimonio pleno" }, { value: 50, label: "Union civil" }, { value: 0, label: "Sin opinion" }, { value: -50, label: "No cambiar la ley" }, { value: -100, label: "No, hombre y mujer" }], context: "Peru no tiene union civil ni matrimonio igualitario." },
    { text: "Enfoque de genero en el curriculo escolar?", dimension: "SOCIAL" as const, order: 2, options: [{ value: 100, label: "Fundamental" }, { value: 50, label: "Con ajustes" }, { value: 0, label: "No seguro" }, { value: -50, label: "Valores tradicionales" }, { value: -100, label: "Padres deciden" }], context: "Movimientos como 'Con mis hijos no te metas' se oponen." },
    { text: "Despenalizar aborto en caso de violacion?", dimension: "SOCIAL" as const, order: 3, options: [{ value: 100, label: "Si, mas causales" }, { value: 50, label: "Violacion e inviabilidad" }, { value: 0, label: "Sin posicion" }, { value: -50, label: "Solo terapeutico" }, { value: -100, label: "En ningun caso" }], context: "400,000 abortos clandestinos estimados por año." },
    { text: "Regular consumo de marihuana?", dimension: "SOCIAL" as const, order: 4, options: [{ value: 100, label: "Uso recreativo" }, { value: 50, label: "Solo medicinal" }, { value: 0, label: "Sin opinion" }, { value: -50, label: "Mantener" }, { value: -100, label: "Endurecer penas" }], context: "Peru permite uso medicinal limitado." },
    { text: "Rol de la religion en el gobierno?", dimension: "SOCIAL" as const, order: 5, options: [{ value: 100, label: "Separacion total" }, { value: 50, label: "Respetar sin imponer" }, { value: 0, label: "Balance" }, { value: -50, label: "Valores religiosos importan" }, { value: -100, label: "Fe guia politicas" }], context: "Peru tiene concordato con el Vaticano." },
    { text: "Inmigracion venezolana?", dimension: "SOCIAL" as const, order: 6, options: [{ value: 100, label: "Integrar con derechos" }, { value: 50, label: "Regularizar" }, { value: 0, label: "Depende" }, { value: -50, label: "Restringir" }, { value: -100, label: "Deportar" }], context: "1.5 millones de venezolanos en Peru." },
    // ENVIRONMENT
    { text: "Proteccion ambiental sobre mineria?", dimension: "ENVIRONMENT" as const, order: 1, options: [{ value: 100, label: "Ambiente primero" }, { value: 50, label: "Regulacion estricta" }, { value: 0, label: "Equilibrio" }, { value: -50, label: "Mineria es clave" }, { value: -100, label: "Priorizar mineria" }], context: "Mineria = 10% del PBI pero genera conflictos." },
    { text: "Eliminar deforestacion en la Amazonia?", dimension: "ENVIRONMENT" as const, order: 2, options: [{ value: 100, label: "Cero inmediata" }, { value: 50, label: "Reduccion gradual" }, { value: 0, label: "Sin posicion" }, { value: -50, label: "Uso sostenible" }, { value: -100, label: "Desarrollo necesita tierras" }], context: "150,000+ hectareas perdidas por año." },
    { text: "Inversion en energia renovable?", dimension: "ENVIRONMENT" as const, order: 3, options: [{ value: 100, label: "Transicion acelerada" }, { value: 50, label: "Invertir gradualmente" }, { value: 0, label: "Depende del costo" }, { value: -50, label: "Priorizar economia" }, { value: -100, label: "No es prioridad" }], context: "Peru tiene enorme potencial solar y eolico." },
    { text: "Comunidades nativas con poder de veto?", dimension: "ENVIRONMENT" as const, order: 4, options: [{ value: 100, label: "Veto absoluto" }, { value: 50, label: "Consulta vinculante" }, { value: 0, label: "Dialogo" }, { value: -50, label: "Consulta no veto" }, { value: -100, label: "Interes nacional" }], context: "La consulta previa existe pero no es vinculante." },
    { text: "Prohibir plasticos de un solo uso?", dimension: "ENVIRONMENT" as const, order: 5, options: [{ value: 100, label: "Prohibicion total" }, { value: 50, label: "Gradual" }, { value: 0, label: "Sin opinion" }, { value: -50, label: "Solo incentivos" }, { value: -100, label: "No prohibir" }], context: "6.8 millones toneladas de residuos/año." },
    { text: "Agua como derecho prioritario?", dimension: "ENVIRONMENT" as const, order: 6, options: [{ value: 100, label: "Derecho humano" }, { value: 50, label: "Priorizar consumo" }, { value: 0, label: "Balance" }, { value: -50, label: "Mercado asigna" }, { value: -100, label: "No limitar uso" }], context: "Millones sin agua potable." },
    // SECURITY
    { text: "Endurecer penas para delitos violentos?", dimension: "SECURITY" as const, order: 1, options: [{ value: 100, label: "Mucho mas duras" }, { value: 50, label: "Delitos graves" }, { value: 0, label: "Depende" }, { value: -50, label: "Prevencion" }, { value: -100, label: "Rehabilitacion" }], context: "85% de percepcion de inseguridad." },
    { text: "Fuerzas Armadas en las calles?", dimension: "SECURITY" as const, order: 2, options: [{ value: 100, label: "Si, situacion amerita" }, { value: 50, label: "Zonas criticas" }, { value: 0, label: "No seguro" }, { value: -50, label: "Fortalecer policia" }, { value: -100, label: "Riesgo autoritario" }], context: "Varios candidatos proponen militarizacion." },
    { text: "Pena de muerte para violadores de menores?", dimension: "SECURITY" as const, order: 3, options: [{ value: 100, label: "Si" }, { value: 50, label: "Cadena perpetua" }, { value: 0, label: "No seguro" }, { value: -50, label: "Penas duras" }, { value: -100, label: "Derechos inviolables" }], context: "Peru firmo convencion que prohibe reinstaurar pena de muerte." },
    { text: "Ciudadanos portando armas?", dimension: "SECURITY" as const, order: 4, options: [{ value: 100, label: "Derecho a defensa" }, { value: 50, label: "Con regulacion" }, { value: 0, label: "No seguro" }, { value: -50, label: "Restringir" }, { value: -100, label: "Prohibir" }], context: "Asaltos armados han aumentado." },
    { text: "Vigilancia masiva con camaras?", dimension: "SECURITY" as const, order: 5, options: [{ value: 100, label: "Mas tecnologia" }, { value: 50, label: "Camaras sin reconocimiento" }, { value: 0, label: "Sin posicion" }, { value: -50, label: "Proteger privacidad" }, { value: -100, label: "Vigilancia autoritaria" }], context: "Lima instala cada vez mas camaras." },
    { text: "Negociar o combatir el narcotrafico?", dimension: "SECURITY" as const, order: 6, options: [{ value: 100, label: "Combate militar" }, { value: 50, label: "Combate + desarrollo" }, { value: 0, label: "Estrategia integral" }, { value: -50, label: "Desarrollo sobre represion" }, { value: -100, label: "Legalizar" }], context: "Peru es 2do productor de coca mundial." },
    // INSTITUTIONAL
    { text: "Asamblea Constituyente para nueva Constitucion?", dimension: "INSTITUTIONAL" as const, order: 1, options: [{ value: 100, label: "Nueva Constitucion" }, { value: 50, label: "Reformas profundas" }, { value: 0, label: "Sin posicion" }, { value: -50, label: "Reformas puntuales" }, { value: -100, label: "Mantener actual" }], context: "Constitucion de 1993 de Fujimori." },
    { text: "Congreso bicameral?", dimension: "INSTITUTIONAL" as const, order: 2, options: [{ value: 100, label: "Dos camaras" }, { value: 50, label: "Probablemente si" }, { value: 0, label: "Sin opinion" }, { value: -50, label: "Una es suficiente" }, { value: -100, label: "Mas burocracia" }], context: "Bicameralidad eliminada en 1993." },
    { text: "Eliminar inmunidad parlamentaria?", dimension: "INSTITUTIONAL" as const, order: 3, options: [{ value: 100, label: "Eliminar" }, { value: 50, label: "Limitar mucho" }, { value: 0, label: "Reformar" }, { value: -50, label: "Mantener con ajustes" }, { value: -100, label: "Mantener" }], context: "Congresistas usan inmunidad para evitar justicia." },
    { text: "Financiamiento publico a partidos?", dimension: "INSTITUTIONAL" as const, order: 4, options: [{ value: 100, label: "Si, con fiscalizacion" }, { value: 50, label: "Mixto" }, { value: 0, label: "No seguro" }, { value: -50, label: "Solo privado regulado" }, { value: -100, label: "No impuestos a partidos" }], context: "Partidos dependen de donaciones cuestionables." },
    { text: "Voto obligatorio o voluntario?", dimension: "INSTITUTIONAL" as const, order: 5, options: [{ value: 100, label: "Obligatorio con sancion" }, { value: 50, label: "Obligatorio sin multa" }, { value: 0, label: "Sin posicion" }, { value: -50, label: "Transicion a voluntario" }, { value: -100, label: "Voluntario ya" }], context: "Multa de S/88 por no votar." },
    { text: "Descentralizar mas hacia regiones?", dimension: "INSTITUTIONAL" as const, order: 6, options: [{ value: 100, label: "Mas autonomia" }, { value: 50, label: "Mas recursos con control" }, { value: 0, label: "Depende" }, { value: -50, label: "Mejorar gestion primero" }, { value: -100, label: "Centralizar" }], context: "Lima concentra 52% del PBI." },
  ];

  for (const q of questions) {
    await prisma.dnaQuestion.create({
      data: {
        text: q.text,
        dimension: q.dimension,
        order: q.order,
        options: q.options,
        context: q.context,
      },
    });
  }

  // ==================== FACT CHECKS ====================
  console.log("Creating fact-checks...");

  const factChecks = [
    { candidateSlug: "hernando-de-soto", claim: "El 70% de la economia peruana es informal", verdict: "TRUE" as const, explanation: "Segun el INEI, el empleo informal alcanza el 72.7%.", sources: [{ title: "INEI 2023", url: "https://www.inei.gob.pe" }], confidence: 0.95, featured: true },
    { candidateSlug: "keiko-fujimori", claim: "Durante el gobierno de mi padre la economia crecio 7% anual", verdict: "HALF_TRUE" as const, explanation: "El crecimiento promedio fue 4.5%, no 7%.", sources: [{ title: "BCRP", url: "https://www.bcrp.gob.pe" }], confidence: 0.92, featured: true },
    { candidateSlug: "veronika-mendoza", claim: "El 1% mas rico tiene tanto como el 90% mas pobre", verdict: "MOSTLY_TRUE" as const, explanation: "La tendencia es real segun Oxfam, aunque las cifras exactas varian.", sources: [{ title: "Oxfam 2024", url: "https://www.oxfam.org" }], confidence: 0.78, featured: true },
    { candidateSlug: "antauro-humala", claim: "El 80% de la riqueza del Peru se va al extranjero", verdict: "FALSE" as const, explanation: "Las utilidades repatriadas son ~5-6% del PBI.", sources: [{ title: "BCRP Balanza de Pagos", url: "https://www.bcrp.gob.pe" }], confidence: 0.97, featured: true },
    { candidateSlug: "keiko-fujimori", claim: "La pobreza se redujo a 11% con el modelo del 93", verdict: "MISLEADING" as const, explanation: "Nunca llego a 11%. La reduccion tuvo multiples causas.", sources: [{ title: "INEI", url: "https://www.inei.gob.pe" }], confidence: 0.88, featured: true },
    { candidateSlug: "cesar-acuna", claim: "La UCV es la universidad con mas alumnos del Peru", verdict: "TRUE" as const, explanation: "Con mas de 100,000 alumnos es una de las mas grandes.", sources: [{ title: "SUNEDU", url: "https://www.sunedu.gob.pe" }], confidence: 0.90, featured: false },
    { candidateSlug: "george-forsyth", claim: "Reduje el crimen en La Victoria en un 40%", verdict: "HALF_TRUE" as const, explanation: "Hubo mejoras pero la reduccion fue menor al 40%.", sources: [{ title: "PNP", url: "https://www.policia.gob.pe" }], confidence: 0.72, featured: false },
    { candidateSlug: "veronika-mendoza", claim: "Las mineras pagan menos impuestos que en Chile", verdict: "HALF_TRUE" as const, explanation: "Comparable a Chile pero Chile recien elevo su carga.", sources: [{ title: "CEPAL", url: "https://www.cepal.org" }], confidence: 0.68, featured: false },
  ];

  for (const fc of factChecks) {
    const candidateId = createdCandidates[fc.candidateSlug];
    await prisma.factCheck.create({
      data: {
        candidateId,
        claim: fc.claim,
        verdict: fc.verdict,
        explanation: fc.explanation,
        sources: fc.sources,
        confidence: fc.confidence,
        featured: fc.featured,
        aiGenerated: true,
      },
    });
  }

  // ==================== TRIBES ====================
  console.log("Creating tribes...");

  const tribes = [
    { name: "Centro Pragmatico", slug: "centro-pragmatico", description: "Pragmaticos que buscan soluciones basadas en evidencia sin dogmas ideologicos.", color: "#A855F7", criteria: { economic: [35, 65], social: [35, 65], environment: [35, 65], security: [35, 65], institutional: [35, 65] } },
    { name: "Liberal Progresista", slug: "liberal-progresista", description: "Creen en libertad economica y progreso social. Modernos y tolerantes.", color: "#3B82F6", criteria: { economic: [60, 100], social: [65, 100], environment: [50, 100] } },
    { name: "Izquierda Progresista", slug: "izquierda-progresista", description: "Justicia social, derechos humanos y proteccion ambiental como prioridades.", color: "#EF4444", criteria: { economic: [0, 40], social: [65, 100], environment: [60, 100] } },
    { name: "Derecha Conservadora", slug: "derecha-conservadora", description: "Libre mercado, valores tradicionales y orden.", color: "#1E40AF", criteria: { economic: [60, 100], social: [0, 40] } },
    { name: "Conservador Tradicional", slug: "conservador-tradicional", description: "Valores familiares, tradicion y estabilidad.", color: "#7C3AED", criteria: { social: [0, 40] } },
    { name: "Libertario", slug: "libertario", description: "Maxima libertad individual en lo economico y lo social.", color: "#F59E0B", criteria: { economic: [70, 100], social: [55, 100] } },
    { name: "Reformista Progresista", slug: "reformista-progresista", description: "Quieren cambiar las instituciones para hacerlas mas justas e inclusivas.", color: "#10B981", criteria: { institutional: [70, 100], social: [55, 100] } },
    { name: "Ambientalista", slug: "ambientalista", description: "La proteccion del planeta como prioridad numero uno.", color: "#059669", criteria: { environment: [75, 100] } },
    { name: "Populista", slug: "populista", description: "Estado fuerte, soberania nacional y seguridad.", color: "#DC2626", criteria: { economic: [0, 40], security: [60, 100] } },
    { name: "Centro Derecha", slug: "centro-derecha", description: "Moderados con inclinacion hacia el libre mercado.", color: "#6366F1", criteria: { economic: [55, 70] } },
    { name: "Centro Izquierda", slug: "centro-izquierda", description: "Moderados con inclinacion hacia la justicia social.", color: "#F97316", criteria: { economic: [30, 50] } },
  ];

  for (const t of tribes) {
    await prisma.tribe.upsert({
      where: { slug: t.slug },
      create: t,
      update: t,
    });
  }

  // ==================== ACHIEVEMENTS ====================
  console.log("Creating achievements...");

  const achievements = [
    { key: "dna_complete", name: "DNA Descubierto", description: "Completaste tu DNA Politico", icon: "dna", rarity: "COMMON" as const, xp: 100 },
    { key: "first_match", name: "Primer Match", description: "Comparaste con tu primer candidato", icon: "heart", rarity: "COMMON" as const, xp: 50 },
    { key: "fact_checker", name: "Verificador", description: "Votaste en 10 fact-checks", icon: "check", rarity: "UNCOMMON" as const, xp: 150 },
    { key: "tribe_member", name: "Miembro de Tribu", description: "Te uniste a tu primera tribu", icon: "users", rarity: "COMMON" as const, xp: 75 },
    { key: "share_results", name: "Evangelista", description: "Compartiste tus resultados", icon: "share", rarity: "UNCOMMON" as const, xp: 200 },
    { key: "all_candidates", name: "Investigador", description: "Revisaste todos los candidatos", icon: "search", rarity: "RARE" as const, xp: 300 },
    { key: "invite_friends", name: "Reclutador", description: "Invitaste a 5 amigos", icon: "gift", rarity: "RARE" as const, xp: 500 },
    { key: "civic_expert", name: "Experto Civico", description: "Completaste toda la Academia Civica", icon: "award", rarity: "EPIC" as const, xp: 1000 },
    { key: "early_adopter", name: "Pionero", description: "Entre los primeros 1000 usuarios", icon: "star", rarity: "LEGENDARY" as const, xp: 2000 },
  ];

  for (const a of achievements) {
    await prisma.achievement.upsert({
      where: { key: a.key },
      create: a,
      update: a,
    });
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
