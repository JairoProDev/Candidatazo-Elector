🎨 PARTE 2: SISTEMA DE DISEÑO - FUNDAMENTOS VISUALES
2.1 - FILOSOFÍA DE DISEÑO: "TRANSPARENT DEMOCRACY"
Principios Core:
CLARIDAD SOBRE COMPLEJIDAD


La política es compleja, el diseño no debe serlo
Cada pantalla tiene UN objetivo claro
Jerarquía visual obvia: qué ver primero, segundo, tercero
CONFIANZA A TRAVÉS DE TRANSPARENCIA


Mostrar cómo funciona la IA (no caja negra)
Fuentes visibles, metodología explicada
Sin dark patterns, sin manipulación
INCLUSIÓN SIN INFANTILIZACIÓN


Accesible ≠ simplón
Respetar inteligencia del usuario
Opciones avanzadas disponibles, no obligatorias
VIRAL POR DISEÑO, NO POR ACCIDENTE


Cada resultado es shareable por default
Belleza visual = orgullo al compartir
Social proof integrado naturalmente
EMOCIÓN + RAZÓN


Política es emocional - aceptarlo, no esconderlo
Pero balancear con datos y hechos
Colores, animaciones transmiten seriedad + energía
2.2 - PALETA DE COLORES: "BIPARTISAN BALANCE"
Problema a Resolver:
Rojo/Azul = izquierda/derecha (polarizante)
Verde = ambientalista (sesgado)
Colores patrios = nacionalista (limitante)
Solución: Paleta Neutral + Acentos Dinámicos
COLORES BASE (Neutros, No-Políticos):
PRIMARY - "Democracy Blue" #2D5BFF
- Azul vibrante pero no "político"
- RGB: 45, 91, 255
- Connotación: Confianza, tecnología, modernidad
- Uso: CTAs principales, links, elementos interactivos

SECONDARY - "Civic Purple" #7C3AED  
- Púrpura: mezcla de rojo+azul = balance
- RGB: 124, 58, 237
- Connotación: Sabiduría, creatividad, unión
- Uso: Achievements, gamificación, premium features

NEUTRAL GRAYS (Escala de 9 tonos):
- Gray 50: #FAFAFA (backgrounds)
- Gray 100: #F5F5F5 (subtle dividers)
- Gray 200: #E5E5E5 (borders)
- Gray 300: #D4D4D4 (disabled)
- Gray 400: #A3A3A3 (placeholders)
- Gray 500: #737373 (secondary text)
- Gray 600: #525252 (body text)
- Gray 700: #404040 (headings)
- Gray 800: #262626 (hero text)
- Gray 900: #171717 (max contrast)

SEMANTIC COLORS (Funcionales, No-Políticos):

SUCCESS - "Verified Green" #10B981
- Para fact-checks verdaderos, matches altos
- RGB: 16, 185, 129

WARNING - "Question Yellow" #F59E0B
- Para información dudosa, áreas de desacuerdo
- RGB: 245, 158, 11

ERROR - "Falsehood Red" #EF4444
- Para fact-checks falsos, incompatibilidades
- RGB: 239, 68, 68

INFO - "Insight Teal" #06B6D4
- Para tips, información adicional
- RGB: 6, 182, 212

COLORES DINÁMICOS (Se adaptan al contexto):
POLITICAL SPECTRUM GRADIENT:
- Extrema Izquierda: #DC2626 (Red 600)
- Centro Izquierda: #F97316 (Orange 500)  
- Centro: #A855F7 (Purple 500)
- Centro Derecha: #3B82F6 (Blue 500)
- Extrema Derecha: #1E40AF (Blue 800)

Nota: NUNCA usar estos colores para UI elements.
Solo para visualizaciones de espectro político.

BACKGROUNDS (Jerarquía de Profundidad):
Level 0 (Base): #FFFFFF (puro blanco)
Level 1 (Cards): #FAFAFA (casi blanco)
Level 2 (Nested): #F5F5F5 (gris muy suave)
Level 3 (Tertiary): #E5E5E5 (gris suave)

Dark Mode (para jóvenes que lo piden):
Level 0: #0A0A0A
Level 1: #171717
Level 2: #262626
Level 3: #404040

2.3 - TIPOGRAFÍA: "DEMOCRATIC LEGIBILITY"
Requerimientos:
Legible en pantallas chicas (abuelitas en mobile)
Moderna pero no trendy (longevidad)
Soporte completo español (tildes, ñ)
Variable font para performance
Múltiples pesos para jerarquía
SISTEMA TIPOGRÁFICO:
HEADING FONT - Inter Variable
Justificación:
✓ Google Fonts = gratis, rápido CDN
✓ Variable font = un archivo, múltiples pesos
✓ Diseñado para pantallas
✓ Neutro, profesional, moderno
✓ Excelente legibilidad 12px-72px

Pesos a usar:
- 800 (Extra Bold): Headlines principales
- 700 (Bold): Subheadlines
- 600 (Semi Bold): Section headers
- 500 (Medium): Buttons, labels

Escala de Tamaños (Mobile):
- H1: 32px / 38px line-height / -0.5px letter-spacing
- H2: 24px / 32px / -0.3px
- H3: 20px / 28px / -0.2px
- H4: 18px / 26px / 0px
- H5: 16px / 24px / 0px

Escala de Tamaños (Desktop):
- H1: 48px / 56px / -0.8px
- H2: 36px / 44px / -0.5px
- H3: 28px / 36px / -0.3px
- H4: 24px / 32px / 0px
- H5: 20px / 28px / 0px

BODY FONT - Inter Variable (mismo, por consistencia)
Pesos:
- 400 (Regular): Body text principal
- 500 (Medium): Enfasis ligero
- 600 (Semi Bold): Strong emphasis

Tamaños (Mobile):
- Large Body: 18px / 28px / 0px (para mayores, onboarding)
- Body: 16px / 24px / 0px (default)
- Small Body: 14px / 20px / 0px (captions, secondary)
- Tiny: 12px / 16px / 0.3px (legal, timestamps)

Tamaños (Desktop):
- Large Body: 20px / 32px
- Body: 18px / 28px (más grande que mobile = mejor lectura)
- Small: 16px / 24px
- Tiny: 14px / 20px

MONOSPACE - JetBrains Mono (para datos técnicos)
Uso específico:
- Fact-check sources (URLs)
- Statistics, numbers
- Code snippets (si mostramos API)
- Timestamps precisos

Solo peso 400 y 700

2.4 - ESPACIADO: "8-POINT GRID SYSTEM"
Sistema Base: Múltiplos de 8px
SPACING SCALE:
- 0: 0px (none)
- 1: 4px (micro - entre icon y text)
- 2: 8px (tight - dentro de componentes)
- 3: 12px (snug - entre elementos relacionados)
- 4: 16px (normal - default spacing)
- 5: 24px (relaxed - entre secciones)
- 6: 32px (loose - separación mayor)
- 8: 48px (spacious - entre bloques)
- 12: 64px (generous - hero sections)
- 16: 96px (extra - landing pages)

MARGINS (Mobile):
- Container padding: 16px (tight en mobile)
- Section spacing: 32px
- Block spacing: 24px

MARGINS (Desktop):
- Container padding: 48px
- Max width: 1280px (centered)
- Section spacing: 64px
- Block spacing: 32px

2.5 - BORDES, SOMBRAS, ELEVACIÓN
BORDER RADIUS (Friendliness):
- Micro (Pills, Badges): 100px (fully rounded)
- Small (Buttons, Inputs): 8px
- Medium (Cards): 12px
- Large (Modals, Sheets): 16px
- XL (Hero cards): 24px

Nota: Más redondeado = más amigable
Perfecto para usuarios no-tech

SHADOWS (Elevación Z-axis):
- Level 0 (Flat): none
- Level 1 (Subtle): 0 1px 3px rgba(0,0,0,0.1)
- Level 2 (Cards): 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.05)
- Level 3 (Hover): 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)
- Level 4 (Modal): 0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.04)
- Level 5 (Dropdown): 0 25px 50px rgba(0,0,0,0.25)

HOVER STATES:
- Elevar un nivel (Level 1 → Level 2)
- Aumentar scale 102% (transform: scale(1.02))
- Transition: all 0.2s ease

BORDERS:
Default: 1px solid Gray 200
Focus: 2px solid Primary
Error: 2px solid Error
Success: 2px solid Success

Uso: Mínimo, solo donde necesario
Preferir shadows para separación