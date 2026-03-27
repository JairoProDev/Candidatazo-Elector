# Observabilidad (Feed)

## Eventos mínimos (YA IMPLEMENTADO en MVP)
- `feed_view_card`
- `feed_cta_click`
- `feed_interact_card`
- `feed_time_on_card`
- `feed_overlay_open` / `feed_overlay_close`
- `feed_error_boundary` (cuando falla una preview)

## Qué faltaría para V2
- Latencia por dataset (p50/p95)
- Contadores: render cards, errores por tipo de tarjeta
- Correlación por `chunk id` y `rankingReason`

