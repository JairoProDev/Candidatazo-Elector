import type { FeedCardType } from "./feedTypes";

/**
 * Adaptadores API -> "preview model".
 *
 * Hoy el feed usa previews hardcoded que viven en los componentes existentes.
 * Este archivo define el contrato y sirve como punto de migración:
 * - cuando exista dataset real por herramienta, lo consumimos aquí,
 * - y adaptamos el shape a props que ya soporten los PreviewMini/Panel.
 */

export type PreviewModel = Record<string, unknown>;

export async function getPreviewModelByCardType(type: FeedCardType): Promise<PreviewModel> {
  // Placeholder: devolvemos el tipo para que el renderer pueda evolucionar
  // sin tocar el contrato del FeedEngine/FeedCard.
  return { type, source: "offline-hardcoded" };
}

