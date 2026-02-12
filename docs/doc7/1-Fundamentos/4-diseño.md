# 4. PRINCIPIOS DE DISEÑO CORE

## 4.1 - Principio #1: UTILIDAD ANTES QUE SOCIAL

**Definición:**
Cada feature debe tener valor individual ANTES de agregar componente social.

**Aplicación:**

❌ **MAL:** "Únete a una tribu política" (requiere otros users)  
✅ **BIEN:** "Descubre tu DNA político" → luego "Compara con tu tribu"

❌ **MAL:** "Debate con otros users" (requiere masa crítica)  
✅ **BIEN:** "Ve análisis de propuestas" → luego "Debate con expertos"

**Test de Validación:**
> Si eres el ÚNICO usuario en la app, ¿todavía tiene valor? Si NO, rediseña el feature.

---

## 4.2 - Principio #2: FRICCIÓN POSITIVA

**Definición:**
Agregar pasos que MEJORAN la calidad del engagement, aunque ralenticen el proceso.

**Ejemplos:**

**Fricción Positiva #1: DNA Test Obligatorio**
- Para postear en debates, debes completar DNA test
- ¿Ralentiza adoption? Sí
- ¿Mejora calidad? ABSOLUTAMENTE
- Resultado: Solo gente que invirtió tiempo puede postear = mejor discourse

**Fricción Positiva #2: Delay en Posts Emocionales**
- AI detecta enojo en texto
- "Tu mensaje parece emocional. Espera 30 segundos o edita."
- ¿Molesto? Un poco
- ¿Evita toxicidad? Mucho
- Resultado: Menos peleas, más civilidad

**Fricción Positiva #3: Fuentes Obligatorias**
- Para hacer claim político, debes citar fuente
- "Dice que economía creció 7% → ¿Fuente?"
- ¿Extra trabajo? Sí
- ¿Menos desinformación? Definitivamente

**Cuando ELIMINAR Fricción:**
- Share (debe ser 1 tap)
- Login (social login, no email/password)
- Invite friends (pre-filled messages)

**Regla:** Fricción en CALIDAD, zero fricción en VIRALIDAD

---

## 4.3 - Principio #3: TRANSPARENCIA SOBRE ENGAGEMENT

**Definición:**
Priorizar transparencia algorítmica sobre maximizar engagement.

**Facebook/Twitter Approach:**
- Algoritmo opaco
- Maximiza time-on-app
- Polarización como efecto secundario

**Candidatazo Approach:**
- Algoritmo explicable
- "Ves esto porque X"
- Exposición a viewpoints opuestos aunque reduzcca engagement

**Ejemplo:**

**Tradicional:**
- Feed optimizado para clicks
- Echo chamber
- +30 min/sesión

**Candidatazo:**
- Feed balanceado (75% tu ideología, 25% opuesto)
- Exposición a diversidad
- Tal vez -5 min/sesión
- **PERO: Mejor para democracia**

**Trade-off Consciente:**
> Priorizamos ser BUENOS para democracia sobre maximizar engagement.

---

## 4.4 - Principio #4: MOBILE-FIRST, MOBILE-ONLY (al inicio)

**Decisión:** NO hacer web version hasta tener 1M mobile users

**Por Qué:**

1. **Focus:** Mejor 1 plataforma excelente que 2 mediocres
2. **Viral:** Mobile sharing (Stories, TikTok) > web sharing
3. **Engagement:** Mobile users abren app 5X más que web
4. **Notificaciones:** Mobile push > email
5. **Resources:** Team pequeño, no dividir esfuerzo

**Desktop Strategy:**
- Responsive web para info (landing, about, FAQs)
- NO app web completa
- Solo cuando tengamos product-market fit perfecto en mobile

---

## 4.5 - Principio #5: EDUCACIÓN INTEGRADA, NO APÉNDICE

**Anti-Pattern:**
- Sección separada "Educación Cívica"
- Nadie la usa
- Contenido aburrido

**Candidatazo Approach:**
- Educación DENTRO del flow natural
- Ejemplo: Estás viendo propuesta de candidato
- Tooltip aparece: "¿Qué es bicameral?" [Aprende en 30 seg]
- Mini-lesson contextual
- XP por aprender

**Micro-Learning:**
- Lessons de 30-90 segundos
- Gamificadas (quiz al final)
- Contextualmente relevantes
- Acumulan a "Civic Knowledge Score"

---

## 4.6 - Principio #6: DATOS COMO ARTE

**Inspiración:** Strava hace que tu historial de carreras sea visualmente hermoso

**Aplicación a Candidatazo:**

**Tu DNA Político = Obra de Arte**
- Gráfico radial hermoso
- Colores vibrantes
- Shareable (Instagram-worthy)
- "Mi DNA político es una pieza de arte"

**Tu Historial de Votos (futuro)**
- Timeline visual
- "He votado en 3 elecciones"
- "Mi ideología ha evolucionado así:"
- Gráficos de cambio temporal

**Tu Tribe = Identidad Visual**
- Cada tribe tiene color/logo único
- Badge de pertenencia
- "Soy parte de Progresistas Económicos"

---

## 4.7 - Principio #7: ALGORITMO ANTI-POLARIZACIÓN

**Problema en Otras Plataformas:**
- Algoritmos optimizan engagement
- Engagement = controversia = polarización
- Users en echo chambers

**Candidatazo Algorithm:**

**Regla 75/25:**
- 75% contenido que te gusta (similar ideología)
- 25% contenido que te desafía (opuesto)

**Por Qué 75/25:**
- 100% tu ideología = echo chamber (aburrido)
- 50/50 = demasiado conflicto (agotador)
- 75/25 = sweet spot (cómodo pero expuesto)

**Implementation:**
```
if user.dna.economic > 70: # Usuario de derecha económica
    feed = [
        75% from users where economic > 50
        25% from users where economic < 50
    ]
```

**Benefit:**
- Users ven ambos lados
- Menos polarización
- Mejor democracia

---

## 4.8 - Principio #8: COMMUNITY-DRIVEN TRUTH

**Filosofía:** La verdad emerge de la colectividad, no de una autoridad

**Fact-Checking de 3 Capas:**

**CAPA 1: AI Automático (Gemini Flash)**
- Verifica vs base de datos oficial
- INEI, JNE, Contraloría, Banco Central
- Instant fact-check

**CAPA 2: Partnerships Profesionales**
- OjoPúblico
- Convoca
- Verificación profesional

**CAPA 3: Community Voting**
- Users votan si claim es verdadero
- Requieren presentar evidencia
- Trust score basado en historial

**Stack Overflow Model:**
- Users con buen historial = más peso en votos
- Reputación pública
- Incentivos para fact-checking correcto

---

## 4.9 - Principio #9: DISEÑO PARA ABUELITA

**Test de Usabilidad:**
> Si tu abuelita de 70 años no puede usar la app, rediseñala.

**Guidelines:**

1. **Texto Grande:**
   - Default: 18pt
   - Adjustable: hasta 24pt
   - Alto contraste

2. **Botones Grandes:**
   - Mínimo 60x60px
   - Touch targets generosos
   - Spacing adecuado

3. **Lenguaje Simple:**
   - Sin jerga técnica
   - Explicaciones en tooltips
   - "Bicameral" → "Dos cámaras: Senado y Diputados"

4. **Onboarding Guiado:**
   - Tutorial paso a paso
   - Skippable pero disponible
   - Video opcional

5. **Modo Asistido:**
   - "Help" button en cada pantalla
   - Chatbot para ayuda
   - Call-to-action claros

---

## 4.10 - Principio #10: 10X MEJOR EN ALGO, NO 10% MEJOR EN TODO

**Steve Jobs Philosophy:**
> "It's better to be awesome at one thing than mediocre at everything."

**Candidatazo's 10X:**

**En Matching Político:**
- Twitter: No tiene matching (0X)
- Facebook: No tiene matching (0X)
- iSideWith: Tiene matching pero UX de 2010 (1X)
- **Candidatazo: Matching + UI hermosa + integrado con todo (10X)**

**En Fact-Checking:**
- Twitter: Community Notes (inconsistente, lento) (2X)
- Facebook: Banners externos (3X)
- Medios: Artículos de fact-check (5X)
- **Candidatazo: AI + Profesional + Community, en tiempo real (10X)**

**En Debates:**
- Twitter: Caos total (1X)
- Facebook: Comments sin estructura (2X)
- **Candidatazo: Estructurados, moderados, con votación (10X)**

**Cosas Donde NO Competimos:**
- General social networking (Facebook es 10X mejor)
- News discovery (Twitter es 10X mejor)
- Photo sharing (Instagram es 10X mejor)

**Focus:** Somos 10X en POLÍTICA ESPECÍFICAMENTE

---
