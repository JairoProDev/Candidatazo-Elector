# FUENTES, APIs E INTEGRACIONES PARA CANDIDATAZO
## Guía técnica para el equipo de desarrollo

---

## 1. FUENTES OFICIALES DEL ESTADO PERUANO

### 1.1 Jurado Nacional de Elecciones (JNE)

| Recurso | URL | Tipo de data | Integración |
|---------|-----|-------------|-------------|
| Voto Informado | `votoinformado.jne.gob.pe` | Candidatos, planes de gobierno, hojas de vida | Web scraping (SPA React) |
| Plataforma Electoral | `plataformaelectoral.jne.gob.pe` | Candidatos inscritos, estados, formularios | Web scraping |
| Infogob | `infogob.jne.gob.pe` | Historial electoral, autoridades electas, datos históricos | API REST disponible |
| Declaración Jurada de Vida | `djv.jne.gob.pe` | Patrimonio, educación, experiencia, antecedentes | PDF / Web scraping |
| Portal JNE | `portal.jne.gob.pe` | Resoluciones, normativa, cronograma | RSS / Web scraping |
| Datos Abiertos JNE | `datosabiertos.jne.gob.pe` (verificar existencia) | Datasets electorales | Descarga directa CSV/JSON |

**Infogob es la joya:** Tiene datos históricos de TODAS las elecciones, autoridades electas, partidos, etc. Posiblemente la fuente más rica para alimentar la plataforma.

### 1.2 Oficina Nacional de Procesos Electorales (ONPE)

| Recurso | URL | Tipo de data |
|---------|-----|-------------|
| Portal Elecciones 2026 | `eg2026.onpe.gob.pe` | Información oficial del proceso |
| Resultados electorales | `resultados.onpe.gob.pe` (el día de la elección) | Resultados en tiempo real |
| Financiamiento político | `www.onpe.gob.pe` (sección financiamiento) | Ingresos y gastos de partidos |
| Franja electoral | ONPE | Propaganda en medios |

**El día de la elección:** ONPE publica resultados en tiempo real. Esta es una integración CRÍTICA para el día 12 de abril.

### 1.3 RENIEC

| Recurso | Tipo | Uso |
|---------|------|-----|
| Consulta DNI | API (requiere convenio) | Verificación de identidad de usuarios |
| Padrón electoral | Datos agregados | Estadísticas demográficas |

### 1.4 Otras fuentes estatales

| Fuente | URL | Datos útiles |
|--------|-----|-------------|
| Sunedu | `sunedu.gob.pe` | Verificación de grados académicos de candidatos |
| Poder Judicial | `pj.gob.pe` | Antecedentes judiciales |
| Ministerio Público | `mpfn.gob.pe` | Investigaciones fiscales |
| Contraloría General | `contraloria.gob.pe` | Declaraciones juradas de funcionarios |
| BCRP | `bcrp.gob.pe` | Datos económicos para verificar claims |
| INEI | `inei.gob.pe` | Estadísticas nacionales para fact-checking |
| Congreso | `congreso.gob.pe` | Votaciones y proyectos de ley (historial de congresistas-candidatos) |

---

## 2. ENCUESTADORAS — FUENTES DE DATOS DE ENCUESTAS

| Encuestadora | URL | Frecuencia | Acceso |
|-------------|-----|-----------|--------|
| IEP | `estudiosdeopinion.iep.org.pe` | Mensual | Informes PDF públicos |
| Datum Internacional | `datum.com.pe` | Quincenal en campaña | Publicados en El Comercio/América TV |
| Ipsos Perú | `ipsos.com/es-pe` | Quincenal en campaña | Publicados en Perú21 |
| CPI | `cpi.pe` | Mensual | Publicados en RPP |

**Compilación de encuestas:** Wikipedia mantiene una tabla actualizada con TODAS las encuestas: `es.wikipedia.org/wiki/Anexo:Sondeos_de_intención_de_voto_para_las_elecciones_presidenciales_de_Perú_de_2026`

---

## 3. MEDIOS DE COMUNICACIÓN — FUENTES DE NOTICIAS

### Confiables para fact-checking

| Medio | URL | Orientación | Uso |
|-------|-----|-------------|-----|
| El Comercio | `elcomercio.pe` | Centro-derecha | Noticias, data, ECData |
| RPP Noticias | `rpp.pe` | Neutral-centro | Radio/digital, muy confiable |
| La República | `larepublica.pe` | Centro-izquierda | Análisis político |
| Gestión | `gestion.pe` | Económico-empresarial | Datos económicos |
| Convoca | `convoca.pe` | Periodismo investigativo | Investigaciones profundas |
| Ojo Público | `ojo-publico.com` | Fact-checking | Verificación de datos |
| IDL Reporteros | `idl-reporteros.pe` | Investigativo | Investigaciones anticorrupción |

### Verificadores de datos peruanos

| Verificador | URL | Uso |
|-------------|-----|-----|
| Convoca Verifica | `convoca.pe/verifica` | Fact-checking electoral |
| Ojo Público | `ojo-publico.com` | Verificación de declaraciones |
| AFP Factual | `factual.afp.com` | Verificación internacional con foco LATAM |
| LaRepública Verificador | Dentro de larepublica.pe | Verificación de noticias |

---

## 4. APIs Y SERVICIOS TÉCNICOS INTEGRABLES

### 4.1 Para datos en tiempo real

```
GEMINI FLASH 2.0 API (ya en tu stack)
- Moderación de contenido
- Análisis de sentimiento de declaraciones
- Generación de resúmenes de planes de gobierno
- Fact-checking asistido por IA
```

```
GOOGLE TRENDS API
- Medir interés de búsqueda por candidato
- Detectar tendencias emergentes
- Comparar popularidad online vs encuestas
URL: trends.google.com (scraping o API no oficial)
```

```
SOCIAL MEDIA APIs
- Twitter/X API: Monitorear menciones de candidatos
- TikTok Research API: Contenido electoral viral
- Facebook/Instagram Graph API: Páginas oficiales de candidatos
- YouTube Data API: Debates, entrevistas, contenido de campaña
```

### 4.2 Para procesamiento de datos

```
SUNEDU WEB (Verificación académica)
- Scraping de títulos registrados
- URL: https://enlinea.sunedu.gob.pe/
- Uso: Verificar grados de TODOS los candidatos
```

```
PODER JUDICIAL - Consulta de expedientes
- URL: cej.pj.gob.pe (Consulta de Expedientes Judiciales)
- Uso: Verificar antecedentes judiciales de candidatos
```

```
DATOS ABIERTOS PERÚ
- URL: datosabiertos.gob.pe
- Datasets de múltiples instituciones
- Posibles datos electorales, demográficos, etc.
```

### 4.3 Para la plataforma

```
MAPBOX / GOOGLE MAPS API
- Visualización de resultados por región
- Mapa de calor de intención de voto
- Localización de mesas de votación
```

```
CHART.JS / D3.JS
- Visualización de encuestas
- Gráficos de tendencias
- Comparadores de candidatos
```

```
WEB PUSH NOTIFICATIONS (OneSignal / Firebase)
- Alertas de fact-checks nuevos
- Notificaciones de encuestas
- Recordatorios de votación
```

---

## 5. ESTRATEGIA DE SCRAPING RECOMENDADA

### Prioridad ALTA (implementar primero)

1. **JNE Voto Informado** — Datos de candidatos, planes de gobierno
   - Tecnología: Puppeteer/Playwright (es SPA)
   - Frecuencia: Diaria durante campaña
   - Datos: Nombre, partido, propuestas, hojas de vida

2. **Encuestadoras** — Nuevas encuestas
   - Monitorear RSS/web de IEP, Datum, Ipsos, CPI
   - Parsear PDFs de informes
   - Actualización: Cada vez que publiquen

3. **Sunedu** — Verificación académica
   - Scraping del buscador de títulos
   - Una sola vez para los 36 candidatos + vicepresidentes

### Prioridad MEDIA

4. **Medios de comunicación** — Noticias de campaña
   - RSS feeds de El Comercio, RPP, La República
   - Filtrar por keywords electorales
   - Para el feed de noticias de la plataforma

5. **Google Trends** — Interés online
   - Comparar candidatos por búsqueda
   - Detectar picos de interés

### Prioridad BAJA (post-lanzamiento)

6. **Redes sociales** — Sentimiento online
   - Twitter/X mentions
   - TikTok trending
   - YouTube debates/entrevistas

---

## 6. APIs DE REFERENCIA INTERNACIONAL

Plataformas similares en otros países que pueden servir de referencia técnica:

| Plataforma | País | URL | Inspiración |
|-----------|------|-----|-------------|
| ISideWith | USA | `isidewith.com` | Political quiz matching |
| Vote Compass | Canadá/AU | `votecompass.com` | Political compass tool |
| Wahl-O-Mat | Alemania | `wahl-o-mat.de` | Voting advice application |
| Decide Chile | Chile | `decidechile.cl` | Datos electorales chilenos |
| TSE Brasil | Brasil | `tse.jus.br` | Datos abiertos electorales |

---

## 7. INTEGRACIONES PARA EL DÍA DE LA ELECCIÓN (12 ABRIL)

### Plan para cobertura en tiempo real

1. **ONPE Resultados** (`resultados.onpe.gob.pe`)
   - Monitorear desde las 4pm (cierre de votación)
   - Scrapear resultados cada 5 minutos
   - Mostrar avance de conteo en el Predictor

2. **Boca de urna** (exit polls)
   - Ipsos y Datum publican a las 4pm
   - Capturar y mostrar inmediatamente

3. **Social media monitoring**
   - Trending topics electorales
   - Detección de desinformación en tiempo real

4. **Push notifications**
   - Alertas de resultados parciales
   - Confirmación de segunda vuelta
   - Comparación con predicciones de usuarios

---

*Documento técnico generado el 18 de marzo de 2026*
*Para: Equipo de desarrollo Candidatazo / ADIS Technological Platforms*
