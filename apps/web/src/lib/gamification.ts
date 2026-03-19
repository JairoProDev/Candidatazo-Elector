import { create } from "zustand";
import { persist } from "zustand/middleware";

// ==================== Types ====================

export type AchievementRarity = "COMMON" | "UNCOMMON" | "RARE" | "EPIC" | "LEGENDARY";

export interface Achievement {
  key: string;
  name: string;
  description: string;
  rarity: AchievementRarity;
  xpReward: number;
  icon: string;
  condition?: (state: GamificationState) => boolean;
}

export interface LevelInfo {
  level: number;
  name: string;
  minXP: number;
  maxXP: number;
}

// ==================== Constants ====================

export const XP_REWARDS = {
  QUIZ_COMPLETE: 100,
  DNA_TEST_COMPLETE: 250,
  VIEW_CANDIDATE: 10,
  COMPARE_CANDIDATES: 25,
  VOTE_FACTCHECK: 15,
  CEDULA_COMPLETE: 200,
  SHARE_RESULT: 50,
  DAILY_LOGIN: 25,
  ACADEMIA_LESSON: 75,
  DAILY_CHALLENGE: 100,
  REFER_FRIEND: 500,
} as const;

export const LEVELS: LevelInfo[] = [
  { level: 1, name: "Ciudadano Novato", minXP: 0, maxXP: 100 },
  { level: 2, name: "Estudiante Atento", minXP: 101, maxXP: 300 },
  { level: 3, name: "Votante Informado", minXP: 301, maxXP: 600 },
  { level: 4, name: "Analista Pol\u00edtico", minXP: 601, maxXP: 1000 },
  { level: 5, name: "Verificador Experto", minXP: 1001, maxXP: 1500 },
  { level: 6, name: "Senador C\u00edvico", minXP: 1501, maxXP: 2500 },
  { level: 7, name: "Embajador Electoral", minXP: 2501, maxXP: 4000 },
  { level: 8, name: "Guardi\u00e1n Democr\u00e1tico", minXP: 4001, maxXP: 6000 },
  { level: 9, name: "Maestro de la Democracia", minXP: 6001, maxXP: 10000 },
  { level: 10, name: "Leyenda C\u00edvica", minXP: 10001, maxXP: Infinity },
];

export const ACHIEVEMENTS: Achievement[] = [
  // ── COMMON (10) ──
  {
    key: "primer_voto",
    name: "Primer Voto",
    description: "Practica tu voto en el simulador",
    rarity: "COMMON",
    xpReward: 50,
    icon: "\u{1F5F3}\uFE0F",
    condition: (s) => s.cedulaCompleted,
  },
  {
    key: "dna_completo",
    name: "ADN Descubierto",
    description: "Completa el test de ADN pol\u00edtico",
    rarity: "COMMON",
    xpReward: 100,
    icon: "\u{1F9EC}",
    condition: (s) => s.quizzesCompleted >= 1,
  },
  {
    key: "primer_perfil",
    name: "Curioso",
    description: "Visita tu primer perfil de candidato",
    rarity: "COMMON",
    xpReward: 25,
    icon: "\u{1F50D}",
    condition: (s) => s.candidatesViewed >= 1,
  },
  {
    key: "primer_share",
    name: "Comunicador",
    description: "Comparte un resultado por primera vez",
    rarity: "COMMON",
    xpReward: 30,
    icon: "\u{1F4E4}",
    condition: (s) => s.sharesCount >= 1,
  },
  {
    key: "primer_factcheck",
    name: "Detective Novato",
    description: "Vota en tu primer fact-check",
    rarity: "COMMON",
    xpReward: 25,
    icon: "\u{1F50E}",
    condition: (s) => s.factChecksVoted >= 1,
  },
  {
    key: "primer_quiz",
    name: "Estudiante",
    description: "Completa tu primer quiz de la academia",
    rarity: "COMMON",
    xpReward: 50,
    icon: "\u{1F4DA}",
    condition: (s) => s.academiaLessonsCompleted >= 1,
  },
  {
    key: "primera_comparacion",
    name: "Comparador",
    description: "Compara dos candidatos por primera vez",
    rarity: "COMMON",
    xpReward: 30,
    icon: "\u2696\uFE0F",
    condition: (s) => s.comparisonsCount >= 1,
  },
  {
    key: "primer_reto",
    name: "Retador",
    description: "Completa tu primer reto diario",
    rarity: "COMMON",
    xpReward: 50,
    icon: "\u{1F3AF}",
    condition: (s) => s.dailyChallengesCompleted >= 1,
  },
  {
    key: "nivel_2",
    name: "Subiendo de Nivel",
    description: "Alcanza el nivel 2",
    rarity: "COMMON",
    xpReward: 50,
    icon: "\u2B50",
    condition: (s) => s.level >= 2,
  },
  {
    key: "bienvenida",
    name: "Bienvenido",
    description: "Inicia sesi\u00f3n por primera vez",
    rarity: "COMMON",
    xpReward: 10,
    icon: "\u{1F44B}",
  },

  // ── UNCOMMON (7) ──
  {
    key: "quick_match",
    name: "Match R\u00e1pido",
    description: "Completa el Quick Match en menos de 60 segundos",
    rarity: "UNCOMMON",
    xpReward: 75,
    icon: "\u26A1",
  },
  {
    key: "cinco_perfiles",
    name: "Investigador",
    description: "Visita 5 perfiles de candidatos",
    rarity: "UNCOMMON",
    xpReward: 75,
    icon: "\u{1F575}\uFE0F",
    condition: (s) => s.candidatesViewed >= 5,
  },
  {
    key: "cinco_factchecks",
    name: "Escrutador",
    description: "Vota en 5 fact-checks",
    rarity: "UNCOMMON",
    xpReward: 100,
    icon: "\u{1F9D0}",
    condition: (s) => s.factChecksVoted >= 5,
  },
  {
    key: "tres_shares",
    name: "Influencer Local",
    description: "Comparte tus resultados 3 veces",
    rarity: "UNCOMMON",
    xpReward: 75,
    icon: "\u{1F4F1}",
    condition: (s) => s.sharesCount >= 3,
  },
  {
    key: "racha_3",
    name: "Constante",
    description: "3 d\u00edas seguidos usando la app",
    rarity: "UNCOMMON",
    xpReward: 100,
    icon: "\u{1F525}",
    condition: (s) => s.streak >= 3,
  },
  {
    key: "cinco_comparaciones",
    name: "Anal\u00edtico",
    description: "Compara candidatos 5 veces",
    rarity: "UNCOMMON",
    xpReward: 75,
    icon: "\u{1F4CA}",
    condition: (s) => s.comparisonsCount >= 5,
  },
  {
    key: "academia_5",
    name: "Buen Alumno",
    description: "Completa 5 lecciones de la academia",
    rarity: "UNCOMMON",
    xpReward: 125,
    icon: "\u{1F393}",
    condition: (s) => s.academiaLessonsCompleted >= 5,
  },

  // ── RARE (6) ──
  {
    key: "explorador",
    name: "Explorador",
    description: "Visita los 36 perfiles de candidatos",
    rarity: "RARE",
    xpReward: 300,
    icon: "\u{1F30D}",
    condition: (s) => s.candidatesViewed >= 36,
  },
  {
    key: "verificador",
    name: "Verificador Pro",
    description: "Vota en 20 fact-checks",
    rarity: "RARE",
    xpReward: 200,
    icon: "\u2705",
    condition: (s) => s.factChecksVoted >= 20,
  },
  {
    key: "nivel_5",
    name: "Veterano",
    description: "Alcanza el nivel 5",
    rarity: "RARE",
    xpReward: 200,
    icon: "\u{1F396}\uFE0F",
    condition: (s) => s.level >= 5,
  },
  {
    key: "retos_10",
    name: "Retador Imparable",
    description: "Completa 10 retos diarios",
    rarity: "RARE",
    xpReward: 250,
    icon: "\u{1F4AA}",
    condition: (s) => s.dailyChallengesCompleted >= 10,
  },
  {
    key: "primer_referido",
    name: "Reclutador",
    description: "Invita a tu primer amigo con tu c\u00f3digo",
    rarity: "RARE",
    xpReward: 200,
    icon: "\u{1F91D}",
    condition: (s) => s.referralCount >= 1,
  },
  {
    key: "todo_en_uno",
    name: "Todo en Uno",
    description: "Completa el ADN, la c\u00e9dula y un quiz en un d\u00eda",
    rarity: "RARE",
    xpReward: 300,
    icon: "\u{1F3C6}",
  },

  // ── EPIC (4) ──
  {
    key: "compartidor_viral",
    name: "Viral",
    description: "Comparte 10 veces tus resultados",
    rarity: "EPIC",
    xpReward: 500,
    icon: "\u{1F680}",
    condition: (s) => s.sharesCount >= 10,
  },
  {
    key: "racha_7",
    name: "En Racha",
    description: "7 d\u00edas seguidos usando la app",
    rarity: "EPIC",
    xpReward: 350,
    icon: "\u{1F525}",
    condition: (s) => s.streak >= 7,
  },
  {
    key: "embajador",
    name: "Embajador",
    description: "Invita a 5 amigos exitosamente",
    rarity: "EPIC",
    xpReward: 500,
    icon: "\u{1F3C5}",
    condition: (s) => s.referralCount >= 5,
  },
  {
    key: "nivel_8",
    name: "Guardi\u00e1n",
    description: "Alcanza el nivel 8",
    rarity: "EPIC",
    xpReward: 400,
    icon: "\u{1F6E1}\uFE0F",
    condition: (s) => s.level >= 8,
  },

  // ── LEGENDARY (3) ──
  {
    key: "senador_civico",
    name: "Senador C\u00edvico",
    description: "Completa TODA la academia",
    rarity: "LEGENDARY",
    xpReward: 1000,
    icon: "\u{1F451}",
  },
  {
    key: "pionero",
    name: "Pionero",
    description: "Entre los primeros 1000 usuarios",
    rarity: "LEGENDARY",
    xpReward: 2000,
    icon: "\u{1F31F}",
  },
  {
    key: "leyenda",
    name: "Leyenda C\u00edvica",
    description: "Alcanza el nivel 10 y desbloquea 25 logros",
    rarity: "LEGENDARY",
    xpReward: 2000,
    icon: "\u{1F48E}",
    condition: (s) => s.level >= 10 && s.achievements.length >= 25,
  },
];

// ==================== Helpers ====================

function getLevelForXP(xp: number): number {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) return LEVELS[i].level;
  }
  return 1;
}

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "CAND-";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// ==================== XP Event Emitter ====================

export type XPEventType = "xp" | "level_up" | "achievement";

export interface XPEvent {
  type: XPEventType;
  amount?: number;
  source?: string;
  newLevel?: number;
  levelName?: string;
  achievement?: Achievement;
}

type XPEventListener = (event: XPEvent) => void;

const listeners: Set<XPEventListener> = new Set();

export function onXPEvent(listener: XPEventListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function emitXPEvent(event: XPEvent) {
  listeners.forEach((fn) => fn(event));
}

// ==================== Store Interface ====================

export interface GamificationState {
  // Core XP system
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string | null;

  // Achievements
  achievements: string[];

  // Activity tracking
  quizzesCompleted: number;
  candidatesViewed: number;
  factChecksVoted: number;
  sharesCount: number;
  referralCount: number;
  cedulaCompleted: boolean;
  comparisonsCount: number;
  dailyChallengesCompleted: number;
  academiaLessonsCompleted: number;

  // Social
  referralCode: string;

  // Actions
  addXP: (amount: number, source: string) => void;
  checkStreak: () => void;
  unlockAchievement: (key: string) => void;
  incrementStat: (stat: StatKey) => void;
  getLevel: () => {
    level: number;
    name: string;
    currentXP: number;
    nextLevelXP: number;
    progress: number;
  };
  getAvailableAchievements: () => Achievement[];
  generateReferralCode: () => string;
}

type StatKey =
  | "quizzesCompleted"
  | "candidatesViewed"
  | "factChecksVoted"
  | "sharesCount"
  | "referralCount"
  | "comparisonsCount"
  | "dailyChallengesCompleted"
  | "academiaLessonsCompleted";

// ==================== Store ====================

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      // ── Initial State ──
      xp: 0,
      level: 1,
      streak: 0,
      lastActiveDate: null,
      achievements: [],
      quizzesCompleted: 0,
      candidatesViewed: 0,
      factChecksVoted: 0,
      sharesCount: 0,
      referralCount: 0,
      cedulaCompleted: false,
      comparisonsCount: 0,
      dailyChallengesCompleted: 0,
      academiaLessonsCompleted: 0,
      referralCode: "",

      // ── Add XP ──
      addXP: (amount: number, source: string) => {
        const state = get();
        const newXP = state.xp + amount;
        const oldLevel = state.level;
        const newLevel = getLevelForXP(newXP);

        set({ xp: newXP, level: newLevel });

        // Emit XP event for notifications
        emitXPEvent({ type: "xp", amount, source });

        // Check level-up
        if (newLevel > oldLevel) {
          const levelInfo = LEVELS[newLevel - 1];
          emitXPEvent({
            type: "level_up",
            newLevel,
            levelName: levelInfo?.name ?? `Nivel ${newLevel}`,
          });
        }

        // Auto-check achievements after XP gain
        const updatedState = get();
        ACHIEVEMENTS.forEach((achievement) => {
          if (
            !updatedState.achievements.includes(achievement.key) &&
            achievement.condition &&
            achievement.condition(updatedState)
          ) {
            get().unlockAchievement(achievement.key);
          }
        });
      },

      // ── Check & Update Streak ──
      checkStreak: () => {
        const state = get();
        const today = getTodayDate();

        if (state.lastActiveDate === today) return;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        let newStreak: number;
        if (state.lastActiveDate === yesterdayStr) {
          newStreak = state.streak + 1;
        } else {
          newStreak = 1;
        }

        set({ streak: newStreak, lastActiveDate: today });

        // Award streak XP with multiplier (capped at 5x)
        const multiplier = Math.min(newStreak, 5);
        const streakXP = XP_REWARDS.DAILY_LOGIN * multiplier;
        get().addXP(streakXP, `Racha de ${newStreak} d\u00eda(s)`);
      },

      // ── Unlock Achievement ──
      unlockAchievement: (key: string) => {
        const state = get();
        if (state.achievements.includes(key)) return;

        const achievement = ACHIEVEMENTS.find((a) => a.key === key);
        if (!achievement) return;

        set({ achievements: [...state.achievements, key] });

        // Emit achievement event
        emitXPEvent({ type: "achievement", achievement });

        // Award achievement XP (but don't trigger recursive achievement checks)
        const current = get();
        const newXP = current.xp + achievement.xpReward;
        const newLevel = getLevelForXP(newXP);
        set({ xp: newXP, level: newLevel });

        if (newLevel > current.level) {
          const levelInfo = LEVELS[newLevel - 1];
          emitXPEvent({
            type: "level_up",
            newLevel,
            levelName: levelInfo?.name ?? `Nivel ${newLevel}`,
          });
        }
      },

      // ── Increment Stat ──
      incrementStat: (stat: StatKey) => {
        const state = get();
        const currentVal = state[stat];
        if (typeof currentVal === "number") {
          set({ [stat]: currentVal + 1 } as Partial<GamificationState>);
        }

        // Auto-check condition-based achievements
        const updatedState = get();
        ACHIEVEMENTS.forEach((achievement) => {
          if (
            !updatedState.achievements.includes(achievement.key) &&
            achievement.condition &&
            achievement.condition(updatedState)
          ) {
            get().unlockAchievement(achievement.key);
          }
        });
      },

      // ── Get Level Details ──
      getLevel: () => {
        const { xp } = get();
        const level = getLevelForXP(xp);
        const currentLevelInfo = LEVELS[level - 1];
        const nextLevelInfo = LEVELS[level] ?? null;

        const currentXP = xp - currentLevelInfo.minXP;
        const nextLevelXP = nextLevelInfo
          ? nextLevelInfo.minXP - currentLevelInfo.minXP
          : 0;
        const progress = nextLevelXP > 0 ? Math.min(currentXP / nextLevelXP, 1) : 1;

        return {
          level,
          name: currentLevelInfo.name,
          currentXP,
          nextLevelXP,
          progress,
        };
      },

      // ── Get Available (locked) Achievements ──
      getAvailableAchievements: () => {
        const { achievements } = get();
        return ACHIEVEMENTS.filter((a) => !achievements.includes(a.key));
      },

      // ── Generate Referral Code ──
      generateReferralCode: () => {
        const state = get();
        if (state.referralCode) return state.referralCode;
        const code = generateCode();
        set({ referralCode: code });
        return code;
      },
    }),
    {
      name: "candidatazo-gamification",
      partialize: (state) => ({
        xp: state.xp,
        level: state.level,
        streak: state.streak,
        lastActiveDate: state.lastActiveDate,
        achievements: state.achievements,
        quizzesCompleted: state.quizzesCompleted,
        candidatesViewed: state.candidatesViewed,
        factChecksVoted: state.factChecksVoted,
        sharesCount: state.sharesCount,
        referralCount: state.referralCount,
        cedulaCompleted: state.cedulaCompleted,
        comparisonsCount: state.comparisonsCount,
        dailyChallengesCompleted: state.dailyChallengesCompleted,
        academiaLessonsCompleted: state.academiaLessonsCompleted,
        referralCode: state.referralCode,
      }),
    }
  )
);

// ==================== Convenience Helpers ====================

/** Get rarity color for UI rendering */
export function getRarityColor(rarity: AchievementRarity): string {
  switch (rarity) {
    case "COMMON":
      return "#9ca3af"; // gray-400
    case "UNCOMMON":
      return "#22c55e"; // green-500
    case "RARE":
      return "#3b82f6"; // blue-500
    case "EPIC":
      return "#a855f7"; // purple-500
    case "LEGENDARY":
      return "#f59e0b"; // amber-500
    default:
      return "#9ca3af";
  }
}

/** Get rarity label in Spanish */
export function getRarityLabel(rarity: AchievementRarity): string {
  switch (rarity) {
    case "COMMON":
      return "Com\u00fan";
    case "UNCOMMON":
      return "Poco Com\u00fan";
    case "RARE":
      return "Raro";
    case "EPIC":
      return "\u00c9pico";
    case "LEGENDARY":
      return "Legendario";
    default:
      return rarity;
  }
}

/** Get achievement by key */
export function getAchievementByKey(key: string): Achievement | undefined {
  return ACHIEVEMENTS.find((a) => a.key === key);
}
