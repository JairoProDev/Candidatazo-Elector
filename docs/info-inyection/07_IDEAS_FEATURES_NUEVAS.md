# IDEAS Y FEATURES ADICIONALES PARA CANDIDATAZO
## Recomendaciones basadas en el análisis de coyuntura marzo 2026

---

## FEATURES DE ALTO IMPACTO — URGENTES (Implementar antes del 12 abril)

### 1. SIMULADOR DE CÉDULA INTERACTIVA
**Por qué:** 53% no conoce el símbolo de su partido. La cédula será de 40cm con 36+ opciones.
**Qué hace:** Réplica exacta de la cédula de votación (presidencial, Senado, Diputados) donde el usuario puede practicar su voto.
**Viralidad:** "¿Sabrías encontrar a tu candidato en la cédula? El 53% no puede." → Share en redes
**Implementación:** React component con la lista real de partidos y sus símbolos. Scroll horizontal como la cédula real. Timer para medir cuánto tardas.
**Datos necesarios:** Símbolos oficiales de los 36+ partidos (disponibles en JNE)

### 2. ALERTA DE VALLA ELECTORAL
**Por qué:** Votar por un partido que no pasa la valla (5%) = voto que no cuenta para el Congreso.
**Qué hace:** Cuando un usuario hace match con un candidato cuyo partido tiene <2% en encuestas, la plataforma le avisa: "Este candidato podría no pasar la valla electoral. Tus votos congresales podrían perderse."
**Valor:** Servicio REAL que ninguna otra plataforma ofrece. Genera confianza y autoridad.

### 3. GUÍA BICAMERAL SIMPLIFICADA
**Por qué:** 81% no sabe cuántos senadores se eligen. Es la primera vez en 36 años.
**Qué hace:** Explainer visual e interactivo sobre qué es el Senado, qué son los Diputados, y cómo votar en la nueva cédula bicameral.
**Formato:** Video corto (60s) + infografía interactiva + quiz de 5 preguntas.
**Ya tienes:** El curso "Cómo funciona el Congreso" en la Academia Cívica. Extraer contenido clave y hacerlo más visual/shareble.

### 4. STEELMAN ARGUMENT (Recomendación de Gemini)
**Por qué:** Percepción de neutralidad es CRÍTICA para la credibilidad.
**Qué hace:** Para cada candidato del top 10, la plataforma muestra:
- **Argumento de acero (steelman):** La mejor versión posible de sus propuestas
- **Contraparte:** Los puntos débiles y cuestionamientos legítimos
**Implementación:** Contenido editorial curado (no generado por IA en producción) para los top 10. Para el resto, estructura simplificada.
**Diferenciador:** Ninguna plataforma peruana hace esto. Posiciona a Candidatazo como la fuente más neutral y de alta calidad.

### 5. CANDIDATOS EXCLUIDOS/TACHADOS — TRACKER
**Por qué:** El JNE aún puede excluir candidaturas. Acción Popular ya fue excluida. Cerrón podría ser detenido.
**Qué hace:** Sección de "Estado de candidaturas" que muestra en tiempo real qué candidatos están inscritos, en revisión, excluidos o tachados.
**Datos:** JNE resoluciones + monitoreo de noticias

---

## FEATURES DE MEDIO IMPACTO — POST-LANZAMIENTO

### 6. COMPARADOR DE CANDIDATOS LADO A LADO
**Qué hace:** Selecciona 2-4 candidatos y compara sus posiciones en las 5 dimensiones (Economía, Social, Medio Ambiente, Seguridad, Instituciones).
**Formato:** Tabla o gráfico radar superpuesto.
**Ya tienes:** La estructura de dimensiones en tu ADN Test. Solo falta implementar la vista comparativa.

### 7. TRACKER DE PROMESAS ELECTORALES
**Qué hace:** Lista las 5 promesas principales de cada candidato del top 10 con un sistema de seguimiento (similar al "promise tracker" de FactCheck.org).
**Post-elecciones:** Se convierte en tracker de cumplimiento para el gobierno entrante.
**Longterm value:** Da razón para que los usuarios vuelvan DESPUÉS de las elecciones.

### 8. MAPA INTERACTIVO DE INTENCIÓN DE VOTO
**Qué hace:** Mapa del Perú con colores por región mostrando qué candidato lidera en cada zona.
**Datos:** Encuestas regionales + datos del predictor comunitario.
**Viralidad:** "¿Tu región piensa como tú?" → Share
**Implementación:** Mapbox/Leaflet con geojson de regiones peruanas + overlay de datos

### 9. QUIZ DIARIO ELECTORAL
**Qué hace:** Una pregunta diaria sobre política, candidatos o sistema electoral.
**Gamificación:** Racha de respuestas correctas, XP, badges.
**Engagement:** Razón para volver a la app todos los días durante los 25 días restantes.
**Ya tienes:** La estructura de quiz en la Academia Cívica. Solo falta un servicio que entregue 1 pregunta diaria.

### 10. NOTIFICACIONES DE DEBATE EN VIVO
**Qué hace:** Push notification cuando empieza un debate. Feed en vivo con fact-checks durante el debate.
**Engagement:** Los debates son los momentos de mayor atención política. Captarlos en tu plataforma es oro.

---

## FEATURES AVANZADAS — DIFERENCIADORES DE LARGO PLAZO

### 11. CALCULADORA DE "VOTO ÚTIL"
**Qué hace:** Basado en tus respuestas del ADN Test y las encuestas actuales, te sugiere si tu candidato ideal tiene posibilidades reales o si un "voto estratégico" por un candidato similar con más opciones podría ser más efectivo.
**Controversia:** Es polémico (puede verse como manipulación). Pero genera MUCHO debate y shares.
**Mitigación:** Presentarlo como "información, no recomendación." Mostrar los datos y dejar que el usuario decida.

### 12. PERFIL DE CONGRESISTAS (para bicameralismo)
**Qué hace:** Además de candidatos presidenciales, perfilar candidatos al Senado y Cámara de Diputados por distrito.
**Escala:** Esto multiplicaría el contenido de la plataforma por 10x (190 congresistas a elegir).
**Prioridad:** Post-lanzamiento, enfocarse primero en candidatos al Senado por distrito nacional.

### 13. REALIDAD AUMENTADA (AR) PARA LA CÉDULA
**Qué hace:** Apunta tu cámara a la cédula de votación real y la app te muestra información del candidato en overlay.
**Tech:** React Native Camera + ML de reconocimiento de imágenes.
**Viralidad:** EXTREMA. "La app que te dice quién es quién en la cédula."
**Complejidad:** Alta. Considerar solo si hay tiempo y recursos.

### 14. CHATBOT ELECTORAL
**Qué hace:** "Pregúntale a Candidatazo" — Chatbot que responde preguntas sobre candidatos, sistema electoral, dónde votar, etc.
**Tech:** Gemini Flash 2.0 con RAG usando los datos de la plataforma como contexto.
**Valor:** Reduce fricción para usuarios que no quieren navegar múltiples secciones.

### 15. WIDGET EMBEDDABLE PARA MEDIOS
**Qué hace:** Widget de "Match político" que medios de comunicación pueden embeder en sus sitios.
**Growth:** Distribución a través de medios = tráfico masivo sin costo.
**Ejemplo:** "Haz el test de Candidatazo" embebido en El Comercio, RPP, La República.

---

## RECOMENDACIONES DE GEMINI IMPLEMENTADAS

### A. Data Scraping vs. LLM
**Recomendación:** No confiar ciegamente en lo que la IA "sabe." Cada dato debe tener fuente verificable.
**Implementación:** Campo `fuente` y `verificado` en cada dato de la base de datos. El Verificador muestra la fuente al usuario.

### B. Steelman Argument (ya descrito arriba como Feature #4)

### C. Candidatos inscritos vs excluidos/tachados (ya descrito como Feature #5)

### D. Moderación de contenido
**Recomendación:** La moderación inconsistente es un killer de redes sociales políticas.
**Implementación:** Gemini Flash 2.0 para pre-moderación + reglas claras de comunidad + reportes de usuarios + moderación humana para escalamientos.

---

## MONETIZACIÓN DURANTE ELECCIONES

### Opciones éticas de monetización

1. **Publicadis Integration:** Banner ads no intrusivos de anunciantes verificados (NO partidos políticos)
2. **Premium sin ads:** S/9.99/mes por experiencia sin publicidad + analytics avanzados
3. **Widget licensing:** Cobrar a medios por el widget embeddable
4. **Data insights (anonimizados):** Vender análisis agregados a encuestadoras/analistas
5. **Merchandise:** "Yo ya hice mi ADN Político" — stickers, pins, camisetas
6. **Patrocinio institucional:** ONGs, organismos internacionales (NDI, IDEA Internacional) que apoyan transparencia electoral

### Lo que NO debes monetizar
- Datos personales de usuarios
- Acceso preferencial a partidos políticos
- Contenido patrocinado que parezca editorial
- Anything que comprometa la neutralidad

---

*Generado el 18 de marzo de 2026*
*Para: Product roadmap Candidatazo*
