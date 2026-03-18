# VERIFICACIÓN DE DATOS Y CORRECCIONES
## Quality Assurance para la base de datos de Candidatazo

---

## 1. DATOS VERIFICADOS ✅

| Dato | Valor | Fuente | Fecha verificación |
|------|-------|--------|-------------------|
| Número de candidatos presidenciales inscritos | 36 | JNE Voto Informado, Convoca, RPP | 18-mar-2026 |
| Fecha primera vuelta | 12 de abril de 2026 | ONPE, JNE, Decreto Supremo | 18-mar-2026 |
| Fecha segunda vuelta | 7 de junio de 2026 | ONPE, JNE | 18-mar-2026 |
| Partidos aptos totales | 38 (2 sin candidato presidencial) | JNE, Convoca | 18-mar-2026 |
| Frepap y Ciudadanos por el Perú sin candidato presidencial | Confirmado | Convoca, Infobae, RPP | 18-mar-2026 |
| Acción Popular excluido | Confirmado — internas anuladas | Wikipedia, Infobae | 18-mar-2026 |
| Fórmulas vicepresidenciales de los 36 | Listado completo | Convoca.pe (verificado ítem por ítem) | 18-mar-2026 |
| Encuesta IEP marzo: López Aliaga 11.7% | Confirmado | IEP PDF oficial, La República | 18-mar-2026 |
| Encuesta Datum marzo: López Aliaga 11.4% | Confirmado | RPP, Infobae | 18-mar-2026 |
| Simulacro Ipsos marzo: López Aliaga 17.2% v.v. | Confirmado | Ipsos.com/es-pe | 18-mar-2026 |
| Vladimir Cerrón prófugo | Confirmado desde 2023 | Múltiples fuentes | 18-mar-2026 |
| Candidatura de Salvemos al Perú definida por moneda | Confirmado | Wikipedia, Infobae | 18-mar-2026 |
| 53% no conoce símbolo de su partido | Confirmado | Datum marzo, Infobae | 18-mar-2026 |
| Presupuesto ONPE S/864 millones | Confirmado | Wikipedia, ONPE | 18-mar-2026 |
| Senado: 60 senadores (30 nacional + 30 múltiple) | Confirmado | JNE, ONPE, Ley | 18-mar-2026 |
| Diputados: 130 (28 directos + 102 proporcionales) | Confirmado | JNE, ONPE | 18-mar-2026 |

---

## 2. DATOS CON POSIBLES ERRORES O DESACTUALIZACIONES ⚠️

### 2.1 Número de candidatos: ¿35 o 36?
**Estado actual en tu plataforma (screenshots):** Muestra más de 36 candidatos con nombres que podrían no estar inscritos.
**Dato correcto:** 36 fórmulas presidenciales inscritas. PERO el JNE podría excluir más durante la revisión final de marzo.
**Acción:** Verificar periódicamente con JNE si algún candidato ha sido excluido después del 18 de marzo.

### 2.2 Nombres de candidatos — Errores comunes
| Error potencial | Corrección |
|----------------|------------|
| "Antauro Humala" como candidato | ⚠️ Verificar si Antauro Humala (hermano de Ollanta) está inscrito. NO aparece en la lista de Convoca de 36 candidatos. Podría haber sido excluido o no inscrito. |
| "Pedro Castillo" como candidato | ❌ Pedro Castillo está PRESO. No es candidato. |
| "Alejandro Toledo" como candidato | ❌ Verificar — probablemente no inscrito en 2026 |
| "Martín Vizcarra" como candidato | ⚠️ Está MARIO Vizcarra (Perú Primero), NO Martín Vizcarra (expresidente). Confusión frecuente por apellido. |
| "Hernando de Soto" como candidato | ⚠️ NO aparece como candidato presidencial 2026. Avanza País inscribió a José Williams Zapata. De Soto podría haberse retirado o no postulado. |
| "Verónika Mendoza" como candidata | ⚠️ NO aparece en la lista de 36 candidatos. Juntos por el Perú inscribió a Roberto Sánchez Palomino. Verificar si Mendoza se retiró o cambió de partido. |

### 2.3 Partidos con nombres confusos
| En tu plataforma | Nombre oficial JNE |
|------------------|--------------------|
| "Frente Patriótico" | Verificar — podría ser "Partido Patriótico del Perú" (Herbert Caller) o "Frente Patriótico" (no aparece) |
| "Perú Nación" | Podría ser "Ahora Nación" (López Chau). Verificar nombre oficial |
| "Unión por el Perú" | Verificar si es distinto de "Unidad Nacional" (Chiabra) |

---

## 3. DATOS QUE NECESITAN ACTUALIZACIÓN URGENTE

### 3.1 En los screenshots de tu plataforma
Observo en las imágenes que tu plataforma actual muestra:
- **"Antauro Humala - Frente Patriótico"** → Verificar si realmente está inscrito como candidato presidencial 2026
- **"Daniel Urresti - Podemos Perú"** → El candidato de Podemos Perú es **José Luna Gálvez**, no Urresti
- **"Verónika Mendoza - Juntos por el Perú"** → El candidato es **Roberto Sánchez Palomino**
- **"Hernando de Soto - Avanza País"** → El candidato es **José Williams Zapata**
- **"Julio Guzmán - Partido Morado"** → El candidato es **Mesías Guevara Amasifuén**
- **"Yonhy Lescano - Acción Popular"** → Lescano está por **Cooperación Popular**. Acción Popular fue **excluido**
- **"Flor Pablo - Juntos por el Perú"** → Verificar — no aparece en fórmulas presidenciales
- **"Patricia Chirinos - Avanza País"** → Verificar — no aparece como candidata presidencial
- **"Sigrid Bazán - Cambio Democrático"** → Verificar — no aparece en lista de 36
- **"José Vega - Unión por el Perú"** → Verificar partido y estado de inscripción

**⚠️ ACCIÓN URGENTE:** Muchos de estos candidatos son de elecciones 2021, NO de 2026. La base de datos parece tener datos de la elección anterior mezclados.

### 3.2 Contador de días restantes
- En los screenshots se muestra "25 DIAS RESTANTES" en uno y "60 DIAS RESTANTES" en otro
- **Dato correcto al 18 marzo 2026:** 25 días restantes
- **Implementación:** El contador debe ser dinámico, calculado en frontend

---

## 4. LISTA DE VERIFICACIÓN ANTES DE PUBLICAR

### Para cada candidato:
- [ ] Nombre completo correcto (coincidir con JNE Voto Informado exacto)
- [ ] Partido político correcto y actualizado
- [ ] Estado de inscripción actual (inscrito/excluido/tachado)
- [ ] Fórmula vicepresidencial correcta
- [ ] Foto actualizada de campaña 2026
- [ ] Redes sociales oficiales de campaña verificadas
- [ ] Plan de gobierno descargado del JNE
- [ ] Declaración Jurada de Vida revisada
- [ ] Grados académicos verificados en Sunedu
- [ ] Antecedentes judiciales verificados
- [ ] Encuestas actualizadas (marzo 2026)

### Para la plataforma en general:
- [ ] Remover candidatos de elecciones anteriores (2021)
- [ ] Verificar que Acción Popular no aparezca como partido con candidato
- [ ] Actualizar todos los nombres según lista oficial JNE
- [ ] Verificar que el número de propuestas por candidato sea real (no inventado)
- [ ] Asegurar neutralidad en la presentación

---

## 5. FUENTES PARA VERIFICACIÓN CONTINUA

| Fuente | Qué verificar | Frecuencia |
|--------|---------------|-----------|
| `votoinformado.jne.gob.pe` | Estado de candidaturas | Diaria |
| `plataformaelectoral.jne.gob.pe` | Resoluciones de exclusión/tacha | Diaria |
| `sunedu.gob.pe` → Registro Nacional de Grados | Títulos de candidatos | Una vez + validar |
| `cej.pj.gob.pe` | Procesos judiciales | Semanal |
| `eg2026.onpe.gob.pe` | Actualizaciones del proceso | Diaria |
| Encuestadoras (IEP, Datum, Ipsos) | Nuevas encuestas | Cuando publiquen |

---

*Documento generado el 18 de marzo de 2026*
*Acción prioritaria: Corregir la base de datos de candidatos para reflejar la lista real de 36 inscritos en 2026*
