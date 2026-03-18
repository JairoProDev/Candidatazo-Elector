# PLAN MAESTRO DE DOCUMENTACIÓN - CANDIDATAZO
## Elecciones Generales Perú 2026 | 18 de marzo de 2026 | 25 días restantes

---

## CONTEXTO
- **Fecha actual:** 18 de marzo de 2026
- **Primera vuelta:** 12 de abril de 2026 (25 días)
- **Segunda vuelta:** 7 de junio de 2026 (si necesaria)
- **Candidatos inscritos:** 36 fórmulas presidenciales
- **Partidos aptos:** 38 organizaciones (2 sin candidato presidencial)
- **Padrón electoral:** ~27.3 millones de electores
- **Plataforma:** Candidatazo - Transparencia Electoral

---

## ESTRUCTURA DE ARCHIVOS

### DOCUMENTOS GENERADOS

| # | Archivo | Contenido | Uso en Plataforma |
|---|---------|-----------|-------------------|
| 00 | `00_PLAN_MAESTRO.md` | Este documento - índice general | Referencia interna |
| 01 | `01_RESUMEN_EJECUTIVO.md` | Situación política actual, análisis de coyuntura | Contexto para equipo dev |
| 02 | `02_CANDIDATOS_36_COMPLETO.md` | Las 36 fórmulas presidenciales con datos completos | Base de datos de candidatos |
| 03 | `03_TOP10_PERFILES_JSON.md` | Perfiles profundos del Top 10 en formato JSON | Import directo a DB |
| 04 | `04_ENCUESTAS_MARZO_2026.md` | Todas las encuestas Datum, IEP, Ipsos, CPI marzo 2026 | Feature Predictor Electoral |
| 05 | `05_ANALISIS_COYUNTURA.md` | Fragmentación, indecisos, debates, tendencias | Contenido editorial |
| 06 | `06_FUENTES_APIS_INTEGRACIONES.md` | Fuentes oficiales, APIs, servicios conectables | Dev - Integraciones técnicas |
| 07 | `07_IDEAS_FEATURES_NUEVAS.md` | Funcionalidades adicionales para la plataforma | Product roadmap |
| 08 | `08_VERIFICACION_CORRECCIONES.md` | Datos erróneos identificados y correcciones | Quality assurance de data |
| 09 | `09_ESTADISTICAS_ELECTORALES.md` | Padrón, demografía, regiones, voto extranjero | Feature estadísticas |

---

## DATOS CLAVE ACTUALIZADOS (18 marzo 2026)

### Encuesta IEP - Marzo 2026
1. Rafael López Aliaga (Renovación Popular): 11.7% (↓2.9)
2. Keiko Fujimori (Fuerza Popular): 9.4% (↓0.9)
3. Alfonso López Chau (Ahora Nación): 6.8% (↑1.5)
4. Wolfgang Grozo (Integridad Democrática): 4.3% (↑3.1)
5. Carlos Álvarez (País para Todos): 3.9% (↓1.0)
6. Roberto Sánchez (Juntos por el Perú): 3.7% (↑1.3)
7. Mario Vizcarra (Perú Primero): 3.1% (↓0.9)
8. César Acuña (APP): 2.7% (↑0.4)

### Encuesta Datum - Marzo 2026 (6-10 marzo)
1. Rafael López Aliaga: 11.4%
2. Keiko Fujimori: 10.9%
3. Alfonso López Chau: 6.5%
4. Wolfgang Grozo: 5.1%
5. Ninguno/blanco/viciado: 21.5%
6. No sabe: 15.2%

### Simulacro Ipsos - Marzo 2026 (5-6 marzo, votos válidos)
1. Rafael López Aliaga: 17.2%
2. Keiko Fujimori: 14.2%
3. Carlos Álvarez: 8.9%
4. Blancos/viciados/ninguno baja de 28% a 20%

### ALERTAS CRÍTICAS PARA LA PLATAFORMA
- 53% de electores NO conoce el símbolo del partido por el que votará
- 35.2% aún no elige a nadie (IEP marzo)
- 39% dice tener su voto decidido
- Wolfgang Grozo: caso Villaverde puede impactar su tendencia alcista
- Acción Popular fue EXCLUIDA por irregularidades en internas
- Vladimir Cerrón (Perú Libre) es candidato estando PRÓFUGO de la justicia
- La cédula será de ~40cm con 36+ opciones

---

## INSTRUCCIONES PARA CLAUDE CODE

Todos estos archivos están diseñados para ser consumidos directamente por Claude Code para implementación técnica:

1. **02_CANDIDATOS_36_COMPLETO.md** → Poblar base de datos PostgreSQL tabla `candidates`
2. **03_TOP10_PERFILES_JSON.md** → JSON listo para importar con datos enriquecidos
3. **04_ENCUESTAS_MARZO_2026.md** → Poblar tabla `polls` y `poll_results`
4. **06_FUENTES_APIS_INTEGRACIONES.md** → Configurar servicios externos y scrapers
5. **09_ESTADISTICAS_ELECTORALES.md** → Poblar datos estáticos de referencia

---

## ESTADO DE VERIFICACIÓN

| Dato | Estado | Fuente | Confianza |
|------|--------|--------|-----------|
| 36 candidatos inscritos | ✅ Verificado | JNE Voto Informado, Convoca | Alta |
| Acción Popular excluida | ✅ Verificado | Wikipedia, medios múltiples | Alta |
| Encuestas marzo 2026 | ✅ Verificado | IEP, Datum, Ipsos directos | Alta |
| Fórmulas vicepresidenciales | ✅ Verificado | Convoca.pe detalle completo | Alta |
| Caso Grozo-Villaverde | ⚠️ En desarrollo | Datum nota, Infobae | Media |
| Cerrón prófugo candidato | ✅ Verificado | Múltiples fuentes | Alta |
| Padrón 27.3M | ✅ Verificado | RENIEC/ONPE | Alta |

---

*Generado el 18 de marzo de 2026 para ADIS Technological Platforms / Candidatazo*
*Analista: Claude AI - Investigación Electoral*
