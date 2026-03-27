# Experimentos A/B (Feed Copy + Orden)

## Qué probamos
- Variantes de copy vendedora (`benefit`, `proof`, `rankingReason`)
- Orden dentro del chunk (diversidad por grupos)

## Cómo medimos
- Retención: scroll depth y tiempo por tarjeta (`time_on_card`)
- Conversión: CTR por CTA (`cta_click`)
- Calidad: shares (`ShareCard`) y eventos de enfoque (`overlay_open`)

## Cómo hacemos el asignamiento
- Asignación por usuario (bucket persistente en localStorage)
- Mantener consistencia por sesión y con `resume` (reingreso)

## Nota MVP
Este MVP usa determinismo por seeds y ajuste incremental en el ranker v2;
los experimentos reales se conectan cuando los datos/copy vivan en una fuente remota.

