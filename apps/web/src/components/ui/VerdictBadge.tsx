import { VERDICT_CONFIG } from "@candidatazo/types";
import type { VerdictType } from "@candidatazo/types";

interface VerdictBadgeProps {
  verdict: VerdictType;
  size?: "sm" | "md" | "lg";
}

export function VerdictBadge({ verdict, size = "md" }: VerdictBadgeProps) {
  const config = VERDICT_CONFIG[verdict];
  if (!config) return null;

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${sizeClasses[size]}`}
      style={{
        backgroundColor: config.bgColor,
        color: config.color,
      }}
    >
      <VerdictIcon verdict={verdict} />
      {config.label}
    </span>
  );
}

function VerdictIcon({ verdict }: { verdict: VerdictType }) {
  const iconMap: Record<VerdictType, string> = {
    TRUE: "\u2713",
    MOSTLY_TRUE: "\u2713",
    HALF_TRUE: "\u26A0",
    MOSTLY_FALSE: "\u2717",
    FALSE: "\u2717",
    MISLEADING: "?",
    UNVERIFIABLE: "\u2014",
  };
  return <span className="text-xs">{iconMap[verdict]}</span>;
}
