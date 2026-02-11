/**
 * Analytics para trackear métricas del módulo Academia: Bicameralidad
 * KPIs: Completion Rate, Share Rate, Retention, Time on Module, Game Completion
 */

export interface ModuleAnalyticsEvent {
  eventType:
    | "module_started"
    | "module_completed"
    | "content_scrolled"
    | "audio_played"
    | "audio_completed"
    | "game_started"
    | "game_completed"
    | "question_answered"
    | "result_shared"
    | "badge_earned";
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface ModuleSession {
  sessionId: string;
  userId?: string;
  startTime: number;
  endTime?: number;
  eventsTracked: ModuleAnalyticsEvent[];
  completionRate: number;
}

class ModuleAnalytics {
  private sessionId: string;
  private startTime: number;
  private events: ModuleAnalyticsEvent[] = [];

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.trackEvent("module_started");
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  trackEvent(
    eventType: ModuleAnalyticsEvent["eventType"],
    metadata?: Record<string, any>
  ): void {
    const event: ModuleAnalyticsEvent = {
      eventType,
      timestamp: Date.now(),
      metadata
    };

    this.events.push(event);

    // Log para debugging (remover en producción o usar logger apropiado)
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      console.log(`[Analytics] ${eventType}`, metadata);
    }

    // Aquí iría la integración con tu sistema de analytics
    // Por ejemplo: Google Analytics, Mixpanel, Amplitude, etc.
    this.sendToAnalytics(event);
  }

  private sendToAnalytics(event: ModuleAnalyticsEvent): void {
    // Placeholder para integración real con analytics
    // Ejemplo con Google Analytics:
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", event.eventType, {
        event_category: "Academia_Bicameralidad",
        event_label: event.metadata?.label || "",
        value: event.metadata?.value || 0,
        ...event.metadata
      });
    }

    // O con un endpoint custom:
    // fetch("/api/analytics", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ sessionId: this.sessionId, event })
    // });
  }

  // Métodos específicos para cada tipo de evento

  trackContentScrolled(percentage: number): void {
    this.trackEvent("content_scrolled", {
      scrollPercentage: percentage,
      label: `scrolled_${Math.round(percentage)}%`
    });
  }

  trackAudioPlayed(audioPosition: number): void {
    this.trackEvent("audio_played", {
      audioPosition,
      label: "audio_interaction"
    });
  }

  trackAudioCompleted(totalDuration: number): void {
    this.trackEvent("audio_completed", {
      duration: totalDuration,
      label: "audio_finished"
    });
  }

  trackGameStarted(gameType: "simulador" | "ordenar" | "verdadero-falso"): void {
    this.trackEvent("game_started", {
      gameType,
      label: `game_${gameType}_started`
    });
  }

  trackGameCompleted(
    gameType: "simulador" | "ordenar" | "verdadero-falso",
    score: number,
    correctAnswers: number,
    totalQuestions: number
  ): void {
    this.trackEvent("game_completed", {
      gameType,
      score,
      correctAnswers,
      totalQuestions,
      accuracy: Math.round((correctAnswers / totalQuestions) * 100),
      label: `game_${gameType}_completed`
    });
  }

  trackQuestionAnswered(
    gameType: string,
    questionId: string,
    isCorrect: boolean,
    attemptNumber: number
  ): void {
    this.trackEvent("question_answered", {
      gameType,
      questionId,
      isCorrect,
      attemptNumber,
      label: isCorrect ? "answer_correct" : "answer_incorrect"
    });
  }

  trackResultShared(platform: "twitter" | "facebook" | "whatsapp" | "copy"): void {
    this.trackEvent("result_shared", {
      platform,
      label: `shared_${platform}`,
      value: 1
    });
  }

  trackBadgeEarned(badgeId: string, badgeName: string): void {
    this.trackEvent("badge_earned", {
      badgeId,
      badgeName,
      label: `badge_${badgeId}`,
      value: 1
    });
  }

  trackModuleCompleted(stats: {
    totalXP: number;
    badgesEarned: number;
    gamesCompleted: number;
    timeSpent: number;
  }): void {
    this.trackEvent("module_completed", {
      ...stats,
      sessionDuration: Date.now() - this.startTime,
      label: "module_finished"
    });
  }

  // Métricas calculadas

  getTimeSpent(): number {
    return Math.round((Date.now() - this.startTime) / 1000); // segundos
  }

  getCompletionRate(): number {
    // Calcula % de completitud basado en eventos clave
    const keyEvents = {
      contentScrolled: this.events.some(e => e.eventType === "content_scrolled" && (e.metadata?.scrollPercentage || 0) >= 80),
      audioPlayed: this.events.some(e => e.eventType === "audio_played" || e.eventType === "audio_completed"),
      gameCompleted: this.events.some(e => e.eventType === "game_completed")
    };

    const completedEvents = Object.values(keyEvents).filter(Boolean).length;
    return Math.round((completedEvents / Object.keys(keyEvents).length) * 100);
  }

  getSession(): ModuleSession {
    return {
      sessionId: this.sessionId,
      startTime: this.startTime,
      endTime: Date.now(),
      eventsTracked: this.events,
      completionRate: this.getCompletionRate()
    };
  }
}

// Singleton para uso global en el módulo
let analyticsInstance: ModuleAnalytics | null = null;

export function getAnalytics(): ModuleAnalytics {
  if (!analyticsInstance) {
    analyticsInstance = new ModuleAnalytics();
  }
  return analyticsInstance;
}

export function resetAnalytics(): void {
  analyticsInstance = null;
}

// Hook personalizado para React (opcional)
export function useModuleAnalytics() {
  const analytics = getAnalytics();

  return {
    trackContentScrolled: analytics.trackContentScrolled.bind(analytics),
    trackAudioPlayed: analytics.trackAudioPlayed.bind(analytics),
    trackAudioCompleted: analytics.trackAudioCompleted.bind(analytics),
    trackGameStarted: analytics.trackGameStarted.bind(analytics),
    trackGameCompleted: analytics.trackGameCompleted.bind(analytics),
    trackQuestionAnswered: analytics.trackQuestionAnswered.bind(analytics),
    trackResultShared: analytics.trackResultShared.bind(analytics),
    trackBadgeEarned: analytics.trackBadgeEarned.bind(analytics),
    trackModuleCompleted: analytics.trackModuleCompleted.bind(analytics),
    getTimeSpent: analytics.getTimeSpent.bind(analytics),
    getCompletionRate: analytics.getCompletionRate.bind(analytics)
  };
}
