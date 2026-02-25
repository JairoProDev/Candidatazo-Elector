"use client";

import { DIMENSION_CONFIG } from "@candidatazo/types";
import type { Dimension } from "@candidatazo/types";

interface DimensionBarProps {
  dimension: Dimension;
  score: number;
  showLabel?: boolean;
  compact?: boolean;
  candidateScore?: number;
}

export function DimensionBar({
  dimension,
  score,
  showLabel = true,
  compact = false,
  candidateScore,
}: DimensionBarProps) {
  const config = DIMENSION_CONFIG[dimension];
  const height = compact ? "h-2" : "h-3";

  return (
    <div className="space-y-1.5">
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            {config.label}
          </span>
          <span className="text-sm font-semibold" style={{ color: config.color }}>
            {Math.round(score)}%
          </span>
        </div>
      )}
      <div className={`w-full bg-gray-100 rounded-full ${height} relative overflow-hidden`}>
        <div
          className={`${height} rounded-full progress-fill`}
          style={{
            width: `${score}%`,
            backgroundColor: config.color,
          }}
        />
        {candidateScore !== undefined && (
          <div
            className="absolute top-0 w-0.5 h-full bg-gray-800"
            style={{ left: `${candidateScore}%` }}
            title={`Candidato: ${candidateScore}%`}
          />
        )}
      </div>
      {showLabel && !compact && (
        <div className="flex justify-between text-xs text-gray-400">
          <span>{getLeftLabel(dimension)}</span>
          <span>{getRightLabel(dimension)}</span>
        </div>
      )}
    </div>
  );
}

function getLeftLabel(dimension: Dimension): string {
  const labels: Record<Dimension, string> = {
    ECONOMIC: "Intervencionista",
    SOCIAL: "Conservador",
    ENVIRONMENT: "Desarrollo",
    SECURITY: "Derechos civiles",
    INSTITUTIONAL: "Status quo",
  };
  return labels[dimension];
}

function getRightLabel(dimension: Dimension): string {
  const labels: Record<Dimension, string> = {
    ECONOMIC: "Libre mercado",
    SOCIAL: "Progresista",
    ENVIRONMENT: "Conservacionista",
    SECURITY: "Mano dura",
    INSTITUTIONAL: "Reformista",
  };
  return labels[dimension];
}
