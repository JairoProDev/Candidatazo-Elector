# API Integración Roadmap (Feed)

## Objetivo
Migrar gradualmente datasets hardcoded de cada herramienta (por ejemplo `verificador`, `encuestas`, `planes`) hacia endpoints reales, manteniendo:
- `offline-first` (fallback a previews actuales)
- caché y resiliencia (timeouts, retries)
- compatibilidad con el contrato del feed (`FeedCard` + `preview key`)

## Fases
1. **Adapters (API -> Preview model)**  
   Crear adaptadores por `FeedCardType` y mapearlos a `previewProps` que ya soportan los componentes existentes.
   - Usar `apps/web/src/lib/feed/apiAdapters.ts`
2. **Cache layer**  
   Activar caché por herramienta (TTL por tipo + invalidación por eventos).
   - Placeholder actual: `apps/web/src/lib/feed/cacheLayer.ts`
3. **Reemplazo por dataset**  
   Reemplazar datasets hardcoded en cada preview/panel con consumo desde adaptadores.
4. **Observabilidad y flags**  
   Instrumentar errores por herramienta y activar por feature flag (por % o por cohortes).

## Contrato de resiliencia
- Si un endpoint falla: usar preview hardcoded (sin bloquear scroll).
- Si el usuario está en modo offline: renderizar previews estáticos.

