# Rollout Progresivo (/feed)

## Control actual
- Feature flag MVP implementado en `apps/web/src/app/feed/FeedClient.tsx`
- Bucket persistente en localStorage para coherencia por usuario
- Env: `NEXT_PUBLIC_FEED_ROLLOUT_PERCENT` (default 20)

## Qué hacer en producción
1. Subir a % pequeño (5-20%)
2. Acompañar con:
   - dashboards de retención (scroll depth)
   - CTR por CTA
   - tasa de errores (error boundary)
3. Ajustar ranker v2 y copy con datos de comportamiento

## QA
- Usar `?forceFeed=1` (cuando aplique) o testear por bucket local.

