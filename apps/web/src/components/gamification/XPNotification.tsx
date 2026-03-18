"use client";

import { useEffect, useState, useCallback } from "react";
import {
  onXPEvent,
  type XPEvent,
  type Achievement,
  getRarityColor,
  getRarityLabel,
} from "@/lib/gamification";

// ==================== Notification Types ====================

interface Notification {
  id: string;
  type: "xp" | "level_up" | "achievement";
  amount?: number;
  source?: string;
  newLevel?: number;
  levelName?: string;
  achievement?: Achievement;
  createdAt: number;
}

// ==================== Main Component ====================

export default function XPNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((event: XPEvent) => {
    const notification: Notification = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type: event.type,
      amount: event.amount,
      source: event.source,
      newLevel: event.newLevel,
      levelName: event.levelName,
      achievement: event.achievement,
      createdAt: Date.now(),
    };

    setNotifications((prev) => [...prev, notification]);
  }, []);

  // Subscribe to XP events
  useEffect(() => {
    const unsubscribe = onXPEvent(addNotification);
    return unsubscribe;
  }, [addNotification]);

  // Auto-dismiss after 3 seconds
  useEffect(() => {
    if (notifications.length === 0) return;

    const timer = setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 3000);

    return () => clearTimeout(timer);
  }, [notifications]);

  if (notifications.length === 0) return null;

  return (
    <>
      <style>{notificationStyles}</style>
      <div className="fixed bottom-6 left-1/2 z-[9999] flex -translate-x-1/2 flex-col-reverse items-center gap-3 pointer-events-none">
        {notifications.slice(0, 4).map((notif, index) => (
          <div
            key={notif.id}
            className="xp-notification pointer-events-auto"
            style={{
              animationDelay: `${index * 80}ms`,
              opacity: 0,
            }}
          >
            {notif.type === "xp" && <XPGainCard amount={notif.amount ?? 0} source={notif.source} />}
            {notif.type === "level_up" && (
              <LevelUpCard level={notif.newLevel ?? 1} name={notif.levelName ?? ""} />
            )}
            {notif.type === "achievement" && notif.achievement && (
              <AchievementCard achievement={notif.achievement} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

// ==================== Sub-components ====================

function XPGainCard({ amount, source }: { amount: number; source?: string }) {
  return (
    <div className="xp-card flex items-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 px-6 py-3 shadow-lg shadow-amber-500/30">
      <div className="xp-icon flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xl font-bold text-white">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 1l2.39 4.84L18 6.78l-4 3.9.94 5.5L10 13.57l-4.94 2.6.94-5.5-4-3.9 5.61-.94L10 1z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="xp-amount text-2xl font-black text-white tracking-tight">
          +{amount} XP
        </span>
        {source && (
          <span className="text-xs font-medium text-white/80">{source}</span>
        )}
      </div>
    </div>
  );
}

function LevelUpCard({ level, name }: { level: number; name: string }) {
  return (
    <div className="level-up-card flex items-center gap-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 px-6 py-4 shadow-lg shadow-purple-500/40">
      <div className="level-up-badge flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-3xl">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="white"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">
          Subiste de Nivel
        </span>
        <span className="text-xl font-black text-white">
          Nivel {level}: {name}
        </span>
      </div>
    </div>
  );
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const rarityColor = getRarityColor(achievement.rarity);
  const rarityLabel = getRarityLabel(achievement.rarity);

  return (
    <div
      className="achievement-card flex items-center gap-4 rounded-2xl border px-6 py-4 shadow-lg backdrop-blur-sm"
      style={{
        background: `linear-gradient(135deg, ${rarityColor}22, ${rarityColor}11)`,
        borderColor: `${rarityColor}44`,
        boxShadow: `0 10px 30px -10px ${rarityColor}33`,
      }}
    >
      <div
        className="achievement-badge flex h-14 w-14 items-center justify-center rounded-full text-3xl"
        style={{ background: `${rarityColor}22` }}
      >
        {achievement.icon}
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: rarityColor }}>
          {rarityLabel} Desbloqueado
        </span>
        <span className="text-lg font-black text-white">{achievement.name}</span>
        <span className="text-xs text-gray-300">{achievement.description}</span>
      </div>
      <div className="ml-2 text-sm font-bold text-amber-400">+{achievement.xpReward} XP</div>
    </div>
  );
}

// ==================== CSS Animations ====================

const notificationStyles = `
  @keyframes xp-slide-up {
    0% {
      opacity: 0;
      transform: translateY(40px) scale(0.85);
    }
    15% {
      opacity: 1;
      transform: translateY(-8px) scale(1.05);
    }
    25% {
      transform: translateY(0) scale(1);
    }
    85% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-30px) scale(0.9);
    }
  }

  @keyframes xp-glow-pulse {
    0%, 100% {
      box-shadow: 0 0 15px rgba(245, 158, 11, 0.3);
    }
    50% {
      box-shadow: 0 0 30px rgba(245, 158, 11, 0.6), 0 0 60px rgba(245, 158, 11, 0.2);
    }
  }

  @keyframes xp-number-pop {
    0% { transform: scale(0.5); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }

  @keyframes level-up-shine {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  @keyframes badge-bounce {
    0%, 100% { transform: scale(1) rotate(0deg); }
    25% { transform: scale(1.15) rotate(-5deg); }
    50% { transform: scale(1.1) rotate(5deg); }
    75% { transform: scale(1.05) rotate(-2deg); }
  }

  .xp-notification {
    animation: xp-slide-up 3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .xp-card {
    animation: xp-glow-pulse 1.5s ease-in-out infinite;
  }

  .xp-amount {
    animation: xp-number-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .xp-icon {
    animation: badge-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .level-up-card {
    background-size: 200% auto;
    animation: level-up-shine 2s linear infinite, xp-glow-pulse 1.5s ease-in-out infinite;
  }

  .level-up-badge {
    animation: badge-bounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .achievement-badge {
    animation: badge-bounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
`;
