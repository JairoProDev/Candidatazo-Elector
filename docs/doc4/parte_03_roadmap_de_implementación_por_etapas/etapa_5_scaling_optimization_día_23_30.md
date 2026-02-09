### **ETAPA 5: SCALING & OPTIMIZATION (Día 23-30)**
#### **5.1 - Performance Optimization**

**Database Indexing:**
```sql
-- Add indexes for common queries
CREATE INDEX idx_user_clerk_id ON "User"("clerkId");
CREATE INDEX idx_dna_test_user_status ON "DnaTest"("userId", "status");
CREATE INDEX idx_match_user_score ON "Match"("userId", "overallScore");
CREATE INDEX idx_factcheck_published ON "FactCheck"("publishedAt");
CREATE INDEX idx_post_tribe_created ON "Post"("tribeId", "createdAt");
CREATE INDEX idx_event_name_created ON "Event"("name", "createdAt");

-- Composite indexes for feed queries
CREATE INDEX idx_post_tribe_created_flagged ON "Post"("tribeId", "createdAt", "flagged");

-- Partial indexes
CREATE INDEX idx_active_candidates ON "Candidate"("active") WHERE "active" = true;
```

**Query Optimization:**
```typescript
// Bad: N+1 query
const users = await prisma.user.findMany();
for (const user of users) {
  const dnaTest = await prisma.dnaTest.findFirst({ where: { userId: user.id } });
}

// Good: Eager loading
const users = await prisma.user.findMany({
  include: { dnaTests: { take: 1 } }
});
```

**Caching Strategy:**
```typescript
// services/cache.service.ts
import Redis from 'ioredis';

export class CacheService {
  private redis: Redis;
  
  async get<T>(key: string): Promise<T | null> {
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }
  
  async set(key: string, value: any, ttl = 3600) {
    await this.redis.setex(key, ttl, JSON.stringify(value));
  }
  
  async remember<T>(key: string, ttl: number, fn: () => Promise<T>): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached) return cached;
    
    const fresh = await fn();
    await this.set(key, fresh, ttl);
    return fresh;
  }
}

// Usage
const candidates = await cacheService.remember(
  'candidates:active',
  3600, // 1 hour
  () => prisma.candidate.findMany({ where: { active: true } })
);
```

**CDN for Static Assets:**
```typescript
// Upload shareable images to CDN
async function uploadToCDN(localPath: string): Promise<string> {
  const file = await fs.readFile(localPath);
  
  const { data, error } = await supabase.storage
    .from('shareables')
    .upload(`${userId}/${Date.now()}.png`, file, {
      contentType: 'image/png',
      cacheControl: '31536000' // 1 year
    });
  
  return supabase.storage.from('shareables').getPublicUrl(data.path).data.publicUrl;
}
```

#### **5.2 - Background Jobs System**

```typescript
// services/queue.service.ts
import { Queue, Worker } from 'bullmq';

const connection = {
  host: process.env.REDIS_HOST,
  port: 6379
};

// Define queues
export const queues = {
  matches: new Queue('matches', { connection }),
  emails: new Queue('emails', { connection }),
  ai: new Queue('ai', { connection })
};

// Workers
const matchWorker = new Worker('matches', async (job) => {
  const { userId } = job.data;
  
  await matchingService.calculateMatches(userId);
  
  // Send notification
  await notificationService.send(userId, {
    title: '¡Tus matches están listos!',
    body: 'Descubre con qué candidatos tienes más afinidad'
  });
}, { connection });

const emailWorker = new Worker('emails', async (job) => {
  const { to, subject, template, data } = job.data;
  
  await emailService.send({ to, subject, template, data });
}, { connection });

const aiWorker = new Worker('ai', async (job) => {
  const { operation, payload } = job.data;
  
  switch (operation) {
    case 'generate_summary':
      return await geminiService.generatePersonalizedSummary(payload.scores);
    case 'factcheck':
      return await geminiService.generateFactCheck(payload.claim);
    case 'chat_response':
      return await geminiService.simulateCandidateResponse(
        payload.candidateId,
        payload.message,
        payload.history
      );
  }
}, { connection, concurrency: 5 });

// Add job
await queues.matches.add('calculate', { userId: '123' });
```

#### **5.3 - Rate Limiting**

```typescript
// middleware/rate-limit.ts
import rateLimit from '@fastify/rate-limit';

export const rateLimitConfig = {
  global: true,
  max: 100,
  timeWindow: '15 minutes',
  redis: redisClient,
  skipOnError: true,
  keyGenerator: (request) => {
    return request.user?.id || request.ip;
  },
  errorResponseBuilder: (request, context) => {
    return {
      statusCode: 429,
      error: 'Too Many Requests',
      message: `Rate limit exceeded. Try again in ${context.after}`,
      retryAfter: context.after
    };
  }
};

// Per-route limits
fastify.register(rateLimit, rateLimitConfig);

// Specific endpoint
fastify.post('/ai/chat', {
  config: {
    rateLimit: {
      max: 10,
      timeWindow: '1 day',
      keyGenerator: (req) => `ai_chat:${req.user.id}`
    }
  }
}, handler);
```

#### **5.4 - Monitoring & Alerts**

```typescript
// services/monitoring.service.ts
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  integrations: [
    new ProfilingIntegration(),
  ],
});

// Custom metrics
export async function recordMetric(name: string, value: number, tags: any = {}) {
  // PostHog
  await posthog.capture({
    distinctId: 'system',
    event: `metric:${name}`,
    properties: { value, ...tags }
  });
  
  // Datadog (optional)
  if (process.env.DD_API_KEY) {
    await fetch('https://api.datadoghq.com/api/v1/series', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'DD-API-KEY': process.env.DD_API_KEY
      },
      body: JSON.stringify({
        series: [{
          metric: `gobapp.${name}`,
          points: [[Date.now() / 1000, value]],
          tags: Object.entries(tags).map(([k, v]) => `${k}:${v}`)
        }]
      })
    });
  }
}

// Track AI usage
await recordMetric('ai.tokens.used', inputTokens + outputTokens, {
  operation: 'factcheck',
  model: 'gemini-2.0-flash'
});

// Track revenue
await recordMetric('revenue.earned', amount, {
  source: 'premium_subscription',
  currency: 'PEN'
});
```

---