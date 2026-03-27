# Monitoreo Post-Release (/feed)

## Métricas de funnel recomendadas
- `feed_view_card`: vistas por tipo
- `feed_cta_click`: CTR por tipo (por variante de copy)
- `feed_time_on_card`: distribución de tiempo (p50/p95)
- `feed_overlay_open`: intención de enfoque
- `feed_error_boundary`: tasa de errores por tipo de card/preview

## Alerts
- Spike de errores (por encima de baseline)
- Caída de CTR de CTA (indicador de copy/layout roto)
- Latencia anómala si se activa API/Cache layer

