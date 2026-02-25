"use client";

interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  color?: string;
}

export function ProgressBar({
  current,
  total,
  showLabel = true,
  color = "#2D5BFF",
}: ProgressBarProps) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="space-y-1">
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            Pregunta {current} de {total}
          </span>
          <span className="font-semibold" style={{ color }}>
            {percent}%
          </span>
        </div>
      )}
      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div
          className="h-full rounded-full progress-fill"
          style={{
            width: `${percent}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}
