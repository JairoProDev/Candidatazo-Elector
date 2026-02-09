### **ETAPA 3: COMMUNITY & GAMIFICATION (Día 13-17)**
#### **3.1 - Political Tribes Auto-Creation**
```typescript
// services/tribe.service.ts
export class TribeService {
  
  async assignUserToTribe(userId: string) {
    const dnaTest = await prisma.dnaTest.findFirst({
      where: { userId, status: 'COMPLETED' }
    });
    
    // Find matching tribe
    let tribe = await this.findMatchingTribe(dnaTest.scores);
    
    // Create new tribe if no match
    if (!tribe) {
      tribe = await this.createTribe(dnaTest.scores);
    }
    
    // Add user to tribe
    await prisma.tribeMembership.create({
      data: {
        userId,
        tribeId: tribe.id
      }
    });
    
    // Update member count
    await prisma.tribe.update({
      where: { id: tribe.id },
      data: { memberCount: { increment: 1 } }
    });
    
    return tribe;
  }
  
  private async findMatchingTribe(scores: DnaScores) {
    // Find tribes with similar criteria
    const tribes = await prisma.tribe.findMany();
    
    for (const tribe of tribes) {
      if (this.matchesCriteria(scores, tribe.criteria)) {
        return tribe;
      }
    }
    
    return null;
  }
  
  private matchesCriteria(scores: DnaScores, criteria: any): boolean {
    // Check if scores fall within tribe's ranges
    return Object.entries(criteria).every(([category, range]: any) => {
      const score = scores[category];
      return score >= range.min && score <= range.max;
    });
  }
  
  private async createTribe(scores: DnaScores) {
    // Generate tribe name with AI
    const name = await this.generateTribeName(scores);
    
    // Define criteria (±20 points from user scores)
    const criteria = {};
    Object.entries(scores).forEach(([cat, score]) => {
      criteria[cat] = {
        min: Math.max(0, score - 20),
        max: Math.min(100, score + 20)
      };
    });
    
    return prisma.tribe.create({
      data: {
        name,
        description: `Grupo de ciudadanos con orientación política similar`,
        criteria,
        memberCount: 0
      }
    });
  }
  
  private async generateTribeName(scores: DnaScores): Promise<string> {
    // Simple algorithm (can be AI-enhanced)
    const labels = {
      economic: scores.economic > 50 ? 'Liberal' : 'Progresista',
      social: scores.social > 50 ? 'Conservador' : 'Progresista',
      overall: (scores.economic + scores.social) / 2 > 50 ? 'Derecha' : 'Izquierda'
    };
    
    return `${labels.overall} ${labels.economic}`;
  }
}
```

#### **3.2 - Feed Algorithm**
```typescript
// services/feed.service.ts
export class FeedService {
  
  async getPersonalizedFeed(userId: string, page = 1, limit = 20) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { 
        dnaTests: { where: { status: 'COMPLETED' } },
        tribes: true 
      }
    });
    
    // Feed sources (weighted)
    const sources = [
      // 1. Tribe posts (40%)
      this.getTribePosts(user.tribes.map(t => t.tribeId), limit * 0.4),
      
      // 2. Fact-checks on user's interests (30%)
      this.getRelevantFactChecks(user.dnaTests[0].scores, limit * 0.3),
      
      // 3. Debates/Events (20%)
      this.getUpcomingEvents(limit * 0.2),
      
      // 4. Discovery (10%)
      this.getTrendingContent(limit * 0.1)
    ];
    
    const items = await Promise.all(sources);
    
    // Merge and shuffle
    const feed = this.interleave(items.flat());
    
    // Paginate
    const start = (page - 1) * limit;
    return feed.slice(start, start + limit);
  }
  
  private async getTribePosts(tribeIds: string[], limit: number) {
    return prisma.post.findMany({
      where: { tribeId: { in: tribeIds } },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { user: true, comments: { take: 3 } }
    });
  }
  
  private interleave(arrays: any[][]) {
    // Round-robin merge
    const result = [];
    const maxLength = Math.max(...arrays.map(a => a.length));
    
    for (let i = 0; i < maxLength; i++) {
      arrays.forEach(arr => {
        if (arr[i]) result.push(arr[i]);
      });
    }
    
    return result;
  }
}
```

#### **3.3 - Gamification System**
```typescript
// services/gamification.service.ts
export class GamificationService {
  
  async awardXP(userId: string, amount: number, reason: string) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: amount }
      }
    });
    
    // Check for level up
    const newLevel = this.calculateLevel(user.xp);
    
    if (newLevel > user.level) {
      await this.levelUp(userId, newLevel);
    }
    
    // Track event
    await this.trackEvent(userId, 'xp_earned', { amount, reason });
  }
  
  private calculateLevel(xp: number): number {
    // Exponential curve: Level = sqrt(XP / 100)
    return Math.floor(Math.sqrt(xp / 100));
  }
  
  private async levelUp(userId: string, newLevel: number) {
    await prisma.user.update({
      where: { id: userId },
      data: { level: newLevel }
    });
    
    // Send notification
    await this.sendNotification(userId, {
      title: `¡Nivel ${newLevel}!`,
      body: `Has alcanzado el nivel ${newLevel}. Sigue participando!`,
      data: { type: 'level_up', level: newLevel }
    });
    
    // Check for achievement unlock
    await this.checkAchievements(userId);
  }
  
  async checkAchievements(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        dnaTests: true,
        matches: true,
        factCheckVotes: true,
        posts: true,
        achievements: true
      }
    });
    
    const rules = [
      {
        key: 'dna_complete',
        condition: () => user.dnaTests.some(t => t.status === 'COMPLETED'),
        xp: 500
      },
      {
        key: 'first_match',
        condition: () => user.matches.length > 0,
        xp: 100
      },
      {
        key: 'fact_checker',
        condition: () => user.factCheckVotes.length >= 10,
        xp: 200
      },
      {
        key: 'community_voice',
        condition: () => user.posts.length >= 5,
        xp: 300
      },
      {
        key: 'week_streak',
        condition: () => user.streak >= 7,
        xp: 500
      }
    ];
    
    for (const rule of rules) {
      const alreadyUnlocked = user.achievements.some(a => a.achievement.key === rule.key);
      
      if (!alreadyUnlocked && rule.condition()) {
        await this.unlockAchievement(userId, rule.key);
      }
    }
  }
  
  private async unlockAchievement(userId: string, achievementKey: string) {
    const achievement = await prisma.achievement.findUnique({
      where: { key: achievementKey }
    });
    
    await prisma.userAchievement.create({
      data: {
        userId,
        achievementId: achievement.id
      }
    });
    
    await this.awardXP(userId, achievement.xp, `achievement_${achievementKey}`);
    
    // Send notification
    await this.sendNotification(userId, {
      title: `🏆 ${achievement.name}`,
      body: achievement.description
    });
  }
}
```

#### **3.4 - Referral System**
```typescript
// services/referral.service.ts
export class ReferralService {
  
  async createReferralCode(userId: string): Promise<string> {
    // Generate unique code
    const code = nanoid(8).toUpperCase();
    
    await prisma.referral.create({
      data: {
        referrerId: userId,
        code
      }
    });
    
    return code;
  }
  
  async trackReferral(code: string, event: 'click' | 'signup' | 'conversion') {
    const referral = await prisma.referral.findUnique({
      where: { code }
    });
    
    if (!referral) return;
    
    await prisma.referral.update({
      where: { code },
      data: {
        [`${event}s`]: { increment: 1 }
      }
    });
    
    // Award XP for milestones
    if (event === 'signup') {
      await gamificationService.awardXP(referral.referrerId, 100, 'referral_signup');
    }
    
    if (event === 'conversion') {
      await gamificationService.awardXP(referral.referrerId, 500, 'referral_conversion');
    }
    
    // Unlock achievements
    const totalReferrals = referral.signups + 1;
    
    if (totalReferrals === 1) {
      await gamificationService.unlockAchievement(referral.referrerId, 'first_referral');
    }
    
    if (totalReferrals === 10) {
      await gamificationService.unlockAchievement(referral.referrerId, 'influencer');
    }
  }
  
  async applyReferralReward(referrerId: string, newUserId: string) {
    // Referrer gets 1 month premium
    await prisma.user.update({
      where: { id: referrerId },
      data: {
        premium: true,
        premiumUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    });
    
    // New user gets 100 XP
    await gamificationService.awardXP(newUserId, 100, 'referred_by_friend');
  }
}
```

---