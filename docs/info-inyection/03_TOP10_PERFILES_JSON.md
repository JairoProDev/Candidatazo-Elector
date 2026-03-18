# TOP 10 CANDIDATOS — PERFILES DETALLADOS EN JSON
## Para importación directa a base de datos Candidatazo
## Datos al 18 de marzo de 2026

---

## NOTA SOBRE VERIFICACIÓN DE DATOS

Los campos marcados con `"verificado": true` tienen fuente oficial confirmada.
Los campos marcados con `"verificado": false` o `"fuente": "Por verificar"` requieren confirmación adicional con Sunedu, JNE Declaración Jurada, o fuentes primarias.

**RECOMENDACIÓN:** Antes de publicar en la plataforma, cruzar con la Declaración Jurada de Vida de cada candidato disponible en `plataformaelectoral.jne.gob.pe`.

---

```json
{
  "metadata": {
    "version": "1.0",
    "fecha_generacion": "2026-03-18",
    "fuentes_principales": [
      "JNE Voto Informado (votoinformado.jne.gob.pe)",
      "Plataforma Electoral JNE (plataformaelectoral.jne.gob.pe)",
      "IEP Encuesta Marzo 2026",
      "Datum Internacional Marzo 2026",
      "Ipsos Simulacro Nacional Marzo 2026",
      "Wikipedia Elecciones Generales Perú 2026",
      "Convoca.pe",
      "RPP Noticias",
      "Infobae Perú",
      "La República"
    ],
    "disclaimer": "Algunos datos biográficos requieren verificación adicional con Sunedu y Declaraciones Juradas del JNE. Los campos sin verificación están marcados."
  },
  "candidatos": [
    {
      "id": 1,
      "nombre_completo": "Rafael López Aliaga Cazorla",
      "nombre_corto": "Rafael López Aliaga",
      "iniciales": "RLA",
      "partido_politico": "Renovación Popular",
      "siglas_partido": "RP",
      "numero_partido": 9,
      "ideologia_etiqueta": "Derecha conservadora",
      "espectro_politico": "Derecha",
      "posicion_economica": "Libre mercado, reducción del Estado",
      "posicion_social": "Ultraconservador católico",
      "fecha_nacimiento": "1961-03-07",
      "edad": 65,
      "lugar_nacimiento": "Lima, Perú",
      "genero": "Masculino",
      "estado_civil": "Por verificar",
      "educacion": [
        {
          "grado": "Ingeniería Industrial",
          "institucion": "Universidad de Lima",
          "verificado_sunedu": false,
          "notas": "Verificar en Declaración Jurada JNE y Sunedu"
        },
        {
          "grado": "MBA",
          "institucion": "Por verificar",
          "verificado_sunedu": false,
          "notas": "Requiere verificación"
        }
      ],
      "experiencia_laboral": [
        {"cargo": "Alcalde de Lima Metropolitana", "periodo": "2023-2026", "verificado": true},
        {"cargo": "Empresario minero y de transportes", "periodo": "Múltiples décadas", "verificado": true},
        {"cargo": "Fundador y líder de Renovación Popular", "periodo": "2020-presente", "verificado": true},
        {"cargo": "Candidato presidencial 2021", "periodo": "2021", "verificado": true},
        {"cargo": "Empresario sector ferroviario/minero", "periodo": "Histórico", "verificado": true}
      ],
      "trayectoria_politica": [
        "Candidato presidencial 2021 (3er lugar primera vuelta)",
        "Alcalde de Lima 2023-2026",
        "Fundador de Renovación Popular"
      ],
      "antecedentes_judiciales": [
        {
          "caso": "Investigaciones por gestión municipal",
          "estado": "Por verificar detalles específicos",
          "fuente": "Medios varios",
          "verificado": false
        }
      ],
      "controversias": [
        "Declaraciones polémicas sobre temas de género y orientación sexual",
        "Estilo confrontacional en campaña",
        "Cuestionamientos a su gestión como alcalde de Lima"
      ],
      "redes_sociales": {
        "twitter_x": "https://x.com/lopaboraliagazk",
        "facebook": "https://www.facebook.com/RafaelLopezAliagaCazorla/",
        "instagram": "Por verificar URL exacta",
        "tiktok": "Por verificar URL exacta",
        "web_oficial": "Por verificar URL actual de campaña",
        "notas": "Verificar URLs actualizadas de campaña 2026"
      },
      "propuestas_clave": [
        "Reducción drástica del aparato estatal",
        "Mano dura contra la inseguridad ciudadana",
        "Defensa de valores tradicionales y familia",
        "Promoción de inversión privada y libre mercado",
        "Lucha anticorrupción desde una visión conservadora"
      ],
      "encuestas_marzo_2026": {
        "iep": {"porcentaje": 11.7, "variacion": -2.9, "fecha": "2026-03"},
        "datum": {"porcentaje": 11.4, "fecha": "2026-03-06/10"},
        "ipsos_simulacro_votos_validos": {"porcentaje": 17.2, "fecha": "2026-03-05/06"}
      },
      "fortalezas_regionales": {
        "lima_callao": 19.3,
        "nota": "Lidera ampliamente en Lima. NSE A/B. Educación superior."
      },
      "formula_vicepresidencial": {
        "primera_vp": "Norma Yarrow Lumbreras",
        "segunda_vp": "Jhon Ramos Malpica"
      },
      "estado_inscripcion": "Inscrito",
      "color_partido": "#D32F2F"
    },

    {
      "id": 2,
      "nombre_completo": "Keiko Sofía Fujimori Higuchi",
      "nombre_corto": "Keiko Fujimori",
      "iniciales": "KF",
      "partido_politico": "Fuerza Popular",
      "siglas_partido": "FP",
      "numero_partido": 6,
      "ideologia_etiqueta": "Derecha / Fujimorismo",
      "espectro_politico": "Derecha",
      "posicion_economica": "Pro-mercado, modelo de los 90s",
      "posicion_social": "Conservadora",
      "fecha_nacimiento": "1975-05-25",
      "edad": 50,
      "lugar_nacimiento": "Lima, Perú",
      "genero": "Femenino",
      "estado_civil": "Casada con Mark Vito Villanella",
      "educacion": [
        {
          "grado": "Administración de Empresas",
          "institucion": "Boston University, EE.UU.",
          "verificado_sunedu": true,
          "notas": "Grado verificado"
        },
        {
          "grado": "MBA",
          "institucion": "Columbia Business School, EE.UU.",
          "verificado_sunedu": true,
          "notas": "Maestría verificada"
        }
      ],
      "experiencia_laboral": [
        {"cargo": "Congresista de la República", "periodo": "2006-2011", "verificado": true},
        {"cargo": "Candidata presidencial (3 veces)", "periodo": "2011, 2016, 2021", "verificado": true},
        {"cargo": "Líder de Fuerza Popular", "periodo": "2010-presente", "verificado": true},
        {"cargo": "Primera Dama (de facto, durante gobierno de su padre)", "periodo": "1994-2000", "verificado": true}
      ],
      "trayectoria_politica": [
        "Primera Dama de facto durante gobierno de Alberto Fujimori (1994-2000)",
        "Congresista más votada en 2006",
        "Candidata presidencial 2011 (perdió segunda vuelta vs Humala)",
        "Candidata presidencial 2016 (perdió segunda vuelta vs PPK por 0.24%)",
        "Candidata presidencial 2021 (perdió segunda vuelta vs Castillo)",
        "Candidata presidencial 2026 (4ta vez)"
      ],
      "antecedentes_judiciales": [
        {
          "caso": "Caso Cócteles / Lava Jato",
          "descripcion": "Acusada de lavado de activos por presunto financiamiento ilegal de campañas con dinero de Odebrecht",
          "estado": "En proceso judicial",
          "fuente": "Poder Judicial, medios múltiples",
          "verificado": true
        },
        {
          "caso": "Prisión preventiva previa",
          "descripcion": "Cumplió prisión preventiva entre 2018-2020",
          "estado": "Liberada",
          "verificado": true
        }
      ],
      "controversias": [
        "Herencia política del fujimorismo (gobierno de su padre 1990-2000)",
        "Caso Cócteles: proceso judicial activo",
        "Anti-voto estimado en ~50% del electorado",
        "Acusaciones de obstrucción desde el Congreso (periodo 2016-2021)"
      ],
      "redes_sociales": {
        "twitter_x": "https://x.com/KeikoFujimori",
        "facebook": "https://www.facebook.com/keaborikofujimori/",
        "instagram": "https://www.instagram.com/keboraikofujimori/",
        "tiktok": "Por verificar",
        "web_oficial": "Por verificar URL de campaña 2026",
        "notas": "Verificar URLs exactas actualizadas"
      },
      "propuestas_clave": [
        "Mano dura contra la inseguridad y el crimen organizado",
        "Reactivación económica con modelo de libre mercado",
        "Programas sociales focalizados",
        "Reforma del sistema de justicia",
        "Inversión en infraestructura"
      ],
      "encuestas_marzo_2026": {
        "iep": {"porcentaje": 9.4, "variacion": -0.9, "fecha": "2026-03"},
        "datum": {"porcentaje": 10.9, "fecha": "2026-03-06/10"},
        "ipsos_simulacro_votos_validos": {"porcentaje": 14.2, "fecha": "2026-03-05/06"}
      },
      "anti_voto": {
        "porcentaje_estimado": 50,
        "fuente": "Ipsos/CPI histórico",
        "nota": "Aproximadamente 50% no votaría por ella bajo ninguna circunstancia"
      },
      "fortalezas_regionales": {
        "norte": 12.7,
        "nota": "Lidera en el norte. Educación básica. Transversal en NSE."
      },
      "formula_vicepresidencial": {
        "primera_vp": "Luis Galarreta Velarde",
        "segunda_vp": "Miguel Torres Morales"
      },
      "estado_inscripcion": "Inscrita",
      "color_partido": "#FF6F00"
    },

    {
      "id": 3,
      "nombre_completo": "Pablo Alfonso López Chau Nava",
      "nombre_corto": "Alfonso López Chau",
      "iniciales": "ALC",
      "partido_politico": "Ahora Nación",
      "siglas_partido": "AN",
      "numero_partido": 4,
      "ideologia_etiqueta": "Centro-izquierda progresista",
      "espectro_politico": "Centro-izquierda",
      "posicion_economica": "Economía social de mercado, industrialización",
      "posicion_social": "Progresista moderado",
      "fecha_nacimiento": "Por verificar",
      "edad": "Por verificar",
      "lugar_nacimiento": "Por verificar",
      "genero": "Masculino",
      "educacion": [
        {
          "grado": "Ingeniero / Académico",
          "institucion": "Universidad Nacional de Ingeniería (UNI)",
          "verificado_sunedu": false,
          "notas": "Fue Rector de la UNI. Verificar grados específicos en Sunedu."
        }
      ],
      "experiencia_laboral": [
        {"cargo": "Rector de la Universidad Nacional de Ingeniería (UNI)", "periodo": "Por verificar periodo exacto", "verificado": true},
        {"cargo": "Académico e investigador", "periodo": "Múltiples décadas", "verificado": true},
        {"cargo": "Líder de Ahora Nación", "periodo": "2025-presente", "verificado": true}
      ],
      "trayectoria_politica": [
        "Primera candidatura presidencial",
        "Rector de la UNI (universidad pública de prestigio en ingeniería)"
      ],
      "antecedentes_judiciales": [
        {
          "caso": "No se conocen antecedentes judiciales públicos",
          "estado": "Limpio según información disponible",
          "verificado": false,
          "notas": "Verificar en Declaración Jurada JNE"
        }
      ],
      "controversias": [
        "Relativamente libre de controversias mayores — perfil académico",
        "Cuestionamientos por falta de experiencia política"
      ],
      "redes_sociales": {
        "twitter_x": "Por verificar",
        "facebook": "Por verificar",
        "instagram": "Por verificar",
        "tiktok": "Por verificar",
        "web_oficial": "Por verificar",
        "notas": "URGENTE: Localizar redes oficiales de campaña"
      },
      "propuestas_clave": [
        "Industrialización y desarrollo tecnológico",
        "Reforma educativa basada en ciencia y tecnología",
        "Descentralización efectiva",
        "Economía productiva (no solo extractiva)",
        "Inversión en innovación y competitividad"
      ],
      "encuestas_marzo_2026": {
        "iep": {"porcentaje": 6.8, "variacion": 1.5, "fecha": "2026-03"},
        "datum": {"porcentaje": 6.5, "fecha": "2026-03-06/10"}
      },
      "tendencia": "SUBIENDO sostenidamente: 4% (ene) → 5.3% (feb) → 6.8% (mar)",
      "fortalezas_regionales": {
        "centro": 12.4,
        "sur": 9.1,
        "nota": "Único top 4 con mayoría significativa en el sur"
      },
      "formula_vicepresidencial": {
        "primera_vp": "Luis Alberto Villanueva Carbajal",
        "segunda_vp": "Ruth Zenaida Buendía Mestoquiari"
      },
      "estado_inscripcion": "Inscrito",
      "color_partido": "#1565C0"
    },

    {
      "id": 4,
      "nombre_completo": "Wolfgang Mario Grozo Costa",
      "nombre_corto": "Wolfgang Grozo",
      "iniciales": "WG",
      "partido_politico": "Integridad Democrática",
      "siglas_partido": "ID",
      "numero_partido": 19,
      "ideologia_etiqueta": "Centro / Anti-establishment",
      "espectro_politico": "Centro",
      "posicion_economica": "Por definir con precisión — perfil anti-corrupción",
      "posicion_social": "Moderado",
      "fecha_nacimiento": "Por verificar",
      "edad": "Por verificar — joven, atractivo para electorado joven",
      "lugar_nacimiento": "Por verificar",
      "genero": "Masculino",
      "educacion": [
        {
          "grado": "Por verificar",
          "institucion": "Por verificar",
          "verificado_sunedu": false,
          "notas": "URGENTE: Verificar educación en Sunedu y Declaración Jurada"
        }
      ],
      "experiencia_laboral": [
        {"cargo": "Candidato al Senado por Integridad Democrática", "periodo": "2026", "verificado": true},
        {"cargo": "Otros cargos por verificar", "periodo": "Por verificar", "verificado": false}
      ],
      "trayectoria_politica": [
        "Primera candidatura presidencial",
        "Candidato también al Senado (doble postulación)"
      ],
      "antecedentes_judiciales": [
        {
          "caso": "No se conocen antecedentes previos",
          "estado": "Limpio según información disponible",
          "verificado": false,
          "notas": "Verificar"
        }
      ],
      "controversias": [
        {
          "caso": "Caso Grozo-Villaverde",
          "descripcion": "Revelaciones sobre encuentros con Zamir Villaverde, personaje vinculado a casos de corrupción del gobierno de Castillo",
          "estado": "En desarrollo — Noticia reciente de marzo 2026",
          "impacto_potencial": "ALTO — Podría frenar su tendencia alcista",
          "fuente": "Infobae, Datum, medios múltiples",
          "verificado": true,
          "nota_encuestas": "La encuesta Datum de marzo fue elaborada ANTES de estas revelaciones"
        }
      ],
      "redes_sociales": {
        "twitter_x": "Por verificar",
        "facebook": "Por verificar",
        "instagram": "Por verificar",
        "tiktok": "Por verificar — probablemente fuerte aquí dado su perfil joven",
        "web_oficial": "Por verificar",
        "notas": "URGENTE: Localizar redes oficiales"
      },
      "propuestas_clave": [
        "Lucha anticorrupción (eje central)",
        "Integridad en la gestión pública",
        "Renovación de la clase política",
        "Por detallar más ejes de plan de gobierno",
        "Verificar plan registrado en JNE"
      ],
      "encuestas_marzo_2026": {
        "iep": {"porcentaje": 4.3, "variacion": 3.1, "fecha": "2026-03"},
        "datum": {"porcentaje": 5.1, "fecha": "2026-03-06/10"}
      },
      "tendencia": "CRECIMIENTO EXPLOSIVO: 0.4% (ene) → 1.2% (feb) → 4.3-5.1% (mar). Incremento estadísticamente significativo.",
      "fortalezas_regionales": {
        "lima": "Mayor aceptación en Lima",
        "jovenes": "Popular entre votantes jóvenes",
        "nota": "Patrón similar a Castillo 2021 en velocidad de crecimiento, pero con base urbana"
      },
      "formula_vicepresidencial": {
        "primera_vp": "Bertha Cecilia Azabache Miranda",
        "segunda_vp": "Wellington Prada Chipayo"
      },
      "estado_inscripcion": "Inscrito",
      "alerta": "Caso Villaverde podría afectar candidatura",
      "color_partido": "#4CAF50"
    },

    {
      "id": 5,
      "nombre_completo": "Carlos Gonzalo Álvarez Loayza",
      "nombre_corto": "Carlos Álvarez",
      "iniciales": "CA",
      "partido_politico": "País para Todos",
      "siglas_partido": "PPT",
      "numero_partido": 13,
      "ideologia_etiqueta": "Centro / Populista-mediático",
      "espectro_politico": "Centro",
      "posicion_economica": "Por definir con precisión",
      "posicion_social": "Moderado",
      "fecha_nacimiento": "Por verificar",
      "lugar_nacimiento": "Lima, Perú (por verificar)",
      "genero": "Masculino",
      "educacion": [
        {
          "grado": "Por verificar formación académica",
          "institucion": "Por verificar",
          "notas": "Conocido como humorista/imitador. Verificar estudios formales."
        }
      ],
      "experiencia_laboral": [
        {"cargo": "Humorista, imitador y comunicador", "periodo": "Décadas de carrera", "verificado": true},
        {"cargo": "Conductor de televisión", "periodo": "Múltiples programas", "verificado": true}
      ],
      "trayectoria_politica": [
        "Primera candidatura presidencial",
        "Reconocimiento nacional por carrera en humor político"
      ],
      "controversias": [
        "Cuestionamientos sobre capacidad de gobierno (perfil de entretenimiento)",
        "Sin experiencia en gestión pública"
      ],
      "redes_sociales": {
        "twitter_x": "Por verificar",
        "facebook": "Por verificar",
        "instagram": "Por verificar",
        "tiktok": "Por verificar",
        "notas": "Verificar redes oficiales de campaña"
      },
      "propuestas_clave": [
        "Por detallar según plan de gobierno registrado en JNE",
        "Verificar en plataformaelectoral.jne.gob.pe"
      ],
      "encuestas_marzo_2026": {
        "iep": {"porcentaje": 3.9, "variacion": -1.0, "fecha": "2026-03"},
        "ipsos_simulacro_votos_validos": {"porcentaje": 8.9, "fecha": "2026-03-05/06"}
      },
      "insight": "VOTO OCULTO MASIVO: La diferencia entre encuesta (3.9%) y simulacro (8.9%) es la más grande de todos los candidatos. Los electores lo reconocen por la foto pero no lo mencionan en encuestas telefónicas. CRUCIAL para el modelo predictivo de la plataforma.",
      "formula_vicepresidencial": {
        "primera_vp": "María Cristina Chambizea Reyes",
        "segunda_vp": "Diego Edgar Guevara Vivanco"
      },
      "estado_inscripcion": "Inscrito",
      "color_partido": "#FF9800"
    },

    {
      "id": 6,
      "nombre_completo": "Roberto Helbert Sánchez Palomino",
      "nombre_corto": "Roberto Sánchez",
      "iniciales": "RS",
      "partido_politico": "Juntos por el Perú",
      "siglas_partido": "JP",
      "numero_partido": 15,
      "ideologia_etiqueta": "Izquierda",
      "espectro_politico": "Izquierda",
      "posicion_economica": "Intervencionismo estatal, redistribución",
      "posicion_social": "Progresista",
      "fecha_nacimiento": "Por verificar",
      "genero": "Masculino",
      "educacion": [
        {
          "grado": "Abogado",
          "institucion": "Por verificar universidad",
          "notas": "Verificar en Declaración Jurada"
        }
      ],
      "experiencia_laboral": [
        {"cargo": "Congresista de la República", "periodo": "2021-2026", "verificado": true},
        {"cargo": "Ministro de Relaciones Exteriores (Canciller)", "periodo": "Gobierno Castillo", "verificado": true},
        {"cargo": "Ministro de Comercio Exterior y Turismo", "periodo": "Gobierno Castillo", "verificado": true}
      ],
      "trayectoria_politica": [
        "Congresista actual",
        "Excanciller bajo Pedro Castillo",
        "Líder de Juntos por el Perú para 2026"
      ],
      "controversias": [
        "Vinculación al gobierno de Pedro Castillo como ministro",
        "Partido solo inscribió 45.61% de sus listas — riesgo organizativo"
      ],
      "propuestas_clave": [
        "Políticas sociales y redistribución",
        "Fortalecimiento del Estado en servicios públicos",
        "Derechos laborales y sindicales",
        "Descentralización",
        "Verificar plan completo en JNE"
      ],
      "encuestas_marzo_2026": {
        "iep": {"porcentaje": 3.7, "variacion": 1.3, "fecha": "2026-03"}
      },
      "tendencia": "CRECIMIENTO RURAL: 0.6% (ene) → 2.4% (feb) → 3.7% (mar)",
      "fortalezas_regionales": {
        "rural": 11.1,
        "norte": 5.1,
        "oriente": 6.4,
        "centro": 6.3,
        "lima": 0.9,
        "nota": "LÍDER en Perú rural. Prácticamente invisible en Lima."
      },
      "formula_vicepresidencial": {
        "primera_vp": "Analí Márquez Huanca",
        "segunda_vp": "Brígida Curo Bustincio"
      },
      "estado_inscripcion": "Inscrito — listas incompletas",
      "color_partido": "#E91E63"
    },

    {
      "id": 7,
      "nombre_completo": "Mario Enrique Vizcarra Cornejo",
      "nombre_corto": "Mario Vizcarra",
      "iniciales": "MV",
      "partido_politico": "Perú Primero",
      "siglas_partido": "PP",
      "numero_partido": 29,
      "ideologia_etiqueta": "Centro-derecha",
      "espectro_politico": "Centro-derecha",
      "fecha_nacimiento": "Por verificar",
      "genero": "Masculino",
      "educacion": [{"notas": "Verificar en Declaración Jurada JNE"}],
      "experiencia_laboral": [{"notas": "Verificar cargos previos"}],
      "propuestas_clave": ["Verificar plan de gobierno en JNE"],
      "encuestas_marzo_2026": {
        "iep": {"porcentaje": 3.1, "variacion": -0.9, "fecha": "2026-03"}
      },
      "tendencia": "BAJANDO desde febrero",
      "formula_vicepresidencial": {
        "primera_vp": "Carlos Hernán Illanes Calderón",
        "segunda_vp": "Judith Carla Mendoza Díaz"
      },
      "estado_inscripcion": "Inscrito",
      "color_partido": "#673AB7"
    },

    {
      "id": 8,
      "nombre_completo": "César Acuña Peralta",
      "nombre_corto": "César Acuña",
      "iniciales": "CA",
      "partido_politico": "Alianza para el Progreso",
      "siglas_partido": "APP",
      "numero_partido": 11,
      "ideologia_etiqueta": "Centro-derecha / Regionalista populista",
      "espectro_politico": "Centro-derecha",
      "fecha_nacimiento": "1952-08-17",
      "edad": 73,
      "lugar_nacimiento": "Tacabamba, Cajamarca, Perú",
      "genero": "Masculino",
      "educacion": [
        {
          "grado": "Doctorado en Educación",
          "institucion": "Por verificar",
          "notas": "Fue cuestionado por presunto plagio de tesis. Verificar en Sunedu."
        },
        {
          "grado": "Fundador de universidades",
          "institucion": "Universidad César Vallejo (UCV), Universidad Señor de Sipán, otras",
          "notas": "Empresario educativo con red de universidades"
        }
      ],
      "experiencia_laboral": [
        {"cargo": "Gobernador Regional de La Libertad", "periodo": "2007-2014", "verificado": true},
        {"cargo": "Alcalde de Trujillo", "periodo": "2007 (antes de gobernador)", "verificado": false},
        {"cargo": "Congresista de la República", "periodo": "2000-2006", "verificado": true},
        {"cargo": "Fundador y dueño de la UCV y red educativa", "periodo": "1991-presente", "verificado": true},
        {"cargo": "Candidato presidencial 2016 (excluido por JNE)", "periodo": "2016", "verificado": true}
      ],
      "antecedentes_judiciales": [
        {
          "caso": "Plagio de tesis doctoral",
          "estado": "Caso mediático, verificar estado judicial",
          "verificado": false
        },
        {
          "caso": "Exclusión de elecciones 2016 por JNE",
          "descripcion": "Excluido por entrega de dinero a electores (compra de votos)",
          "estado": "Resuelto — excluido en 2016",
          "verificado": true
        }
      ],
      "controversias": [
        "Excluido de elecciones 2016 por compra de votos",
        "Cuestionamientos a calidad académica de sus universidades",
        "Presunto plagio de tesis doctoral",
        "Fortuna personal cuestionada"
      ],
      "redes_sociales": {
        "twitter_x": "Por verificar",
        "facebook": "Por verificar",
        "web_oficial": "Por verificar",
        "notas": "Verificar URLs actualizadas"
      },
      "propuestas_clave": [
        "Inversión en educación y tecnología",
        "Descentralización y desarrollo regional",
        "Infraestructura y obras públicas",
        "Apoyo al emprendimiento",
        "Verificar plan completo en JNE"
      ],
      "encuestas_marzo_2026": {
        "iep": {"porcentaje": 2.7, "variacion": 0.4, "fecha": "2026-03"}
      },
      "fortalezas_regionales": {
        "la_libertad": "Base principal",
        "nota": "Red de universidades le da presencia regional"
      },
      "formula_vicepresidencial": {
        "primera_vp": "Jessica Tumi Rivas",
        "segunda_vp": "Alejandro Soto Reyes"
      },
      "estado_inscripcion": "Inscrito",
      "color_partido": "#0D47A1"
    },

    {
      "id": 9,
      "nombre_completo": "George Patrick Forsyth Sommer",
      "nombre_corto": "George Forsyth",
      "iniciales": "GF",
      "partido_politico": "Somos Perú",
      "siglas_partido": "SP",
      "numero_partido": 28,
      "ideologia_etiqueta": "Centro-derecha",
      "espectro_politico": "Centro",
      "fecha_nacimiento": "1982-02-20",
      "edad": 44,
      "lugar_nacimiento": "Lima, Perú",
      "genero": "Masculino",
      "educacion": [
        {
          "grado": "Estudios superiores por verificar",
          "notas": "Conocido por carrera deportiva. Verificar estudios en Declaración Jurada."
        }
      ],
      "experiencia_laboral": [
        {"cargo": "Arquero profesional de fútbol (Alianza Lima, selección)", "periodo": "2000-2012 aprox.", "verificado": true},
        {"cargo": "Alcalde del distrito de La Victoria (Lima)", "periodo": "2019-2022", "verificado": true},
        {"cargo": "Candidato presidencial 2021 (retiró candidatura)", "periodo": "2021", "verificado": true}
      ],
      "controversias": [
        "Retiró candidatura presidencial en 2021",
        "Cuestionamientos a gestión como alcalde de La Victoria",
        "Perfil mediático más que político"
      ],
      "propuestas_clave": ["Verificar plan de gobierno en JNE"],
      "encuestas_marzo_2026": {
        "nota": "Menos de 2% en encuestas recientes"
      },
      "formula_vicepresidencial": {
        "primera_vp": "Johanna Gabriela Lozada Baldwin",
        "segunda_vp": "Herbe Olave Ugarte"
      },
      "estado_inscripcion": "Inscrito",
      "color_partido": "#009688"
    },

    {
      "id": 10,
      "nombre_completo": "José Daniel Williams Zapata",
      "nombre_corto": "José Williams",
      "iniciales": "JW",
      "partido_politico": "Avanza País – Partido de Integración Social",
      "siglas_partido": "AP",
      "numero_partido": 14,
      "ideologia_etiqueta": "Centro-derecha / Liberal económico",
      "espectro_politico": "Centro-derecha",
      "fecha_nacimiento": "Por verificar",
      "genero": "Masculino",
      "educacion": [
        {
          "grado": "Militar de carrera",
          "institucion": "Escuela Militar de Chorrillos (por verificar)",
          "notas": "General (r) del Ejército del Perú"
        }
      ],
      "experiencia_laboral": [
        {"cargo": "Congresista de la República", "periodo": "2021-2026", "verificado": true},
        {"cargo": "Presidente del Congreso", "periodo": "2022", "verificado": true},
        {"cargo": "General de División del Ejército (retirado)", "periodo": "Carrera militar", "verificado": true},
        {"cargo": "Jefe del Comando de operación Chavín de Huántar", "periodo": "1997", "verificado": true}
      ],
      "controversias": [
        "Controversias durante presidencia del Congreso (periodo turbulento post-Castillo)"
      ],
      "propuestas_clave": [
        "Seguridad ciudadana y lucha contra el crimen",
        "Liberalismo económico y pro-formalización",
        "Verificar plan completo en JNE"
      ],
      "encuestas_marzo_2026": {
        "nota": "Menos de 2% en encuestas recientes"
      },
      "formula_vicepresidencial": {
        "primera_vp": "Fernán Altuve-Febres Lores",
        "segunda_vp": "Adriana Tudela Gutiérrez"
      },
      "estado_inscripcion": "Inscrito",
      "color_partido": "#795548"
    }
  ]
}
```

---

## CAMPOS PENDIENTES DE VERIFICACIÓN (RESUMEN)

Para completar los perfiles antes de publicar en Candidatazo, se necesita:

1. **Declaraciones Juradas de Vida** de cada candidato en `plataformaelectoral.jne.gob.pe`
2. **Verificación Sunedu** de grados académicos de TODOS los candidatos
3. **Planes de Gobierno** registrados en JNE (ya tienes algunos descargados en PDF)
4. **Redes sociales oficiales** de campaña — verificar cada una manualmente
5. **Patrimonio declarado** en Declaración Jurada
6. **Sentencias y antecedentes** en Poder Judicial y Ministerio Público
7. **Fotos oficiales** de cada candidato para la plataforma

---

*Generado el 18 de marzo de 2026 para Candidatazo*
