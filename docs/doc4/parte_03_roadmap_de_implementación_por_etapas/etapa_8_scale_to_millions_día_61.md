### **ETAPA 8: SCALE TO MILLIONS (Día 61+)**
#### **8.1 - Database Scaling**

**Read Replicas:**
```typescript
// Prisma config for read replicas
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL // Primary (writes)
    }
  }
});

const prismaReplica = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_REPLICA_URL // Read replica
    }
  }
});

// Route reads to replica
export async function getCandidates() {
  return prismaReplica.candidate.findMany(); // Read
}

export async function updateCandidate(id: string, data: any) {
  return prisma.candidate.update({ where: { id }, data }); // Write
}
```

**Partitioning:**
```sql
-- Partition events table by month
CREATE TABLE events_2026_02 PARTITION OF events
FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');

CREATE TABLE events_2026_03 PARTITION OF events
FOR VALUES FROM ('2026-03-01') TO ('2026-04-01');

-- Auto-create new partitions
CREATE OR REPLACE FUNCTION create_monthly_partition()
RETURNS void AS $$
DECLARE
  partition_date date;
  partition_name text;
BEGIN
  partition_date := date_trunc('month', CURRENT_DATE + interval '1 month');
  partition_name := 'events_' || to_char(partition_date, 'YYYY_MM');
  
  EXECUTE format('CREATE TABLE IF NOT EXISTS %I PARTITION OF events
    FOR VALUES FROM (%L) TO (%L)',
    partition_name,
    partition_date,
    partition_date + interval '1 month'
  );
END;
$$ LANGUAGE plpgsql;

-- Schedule monthly
SELECT cron.schedule('create-partition', '0 0 1 * *', 'SELECT create_monthly_partition()');
```

#### **8.2 - Horizontal Scaling**

**API Servers:**
```yaml
# Railway or Kubernetes
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gobapp-api
spec:
  replicas: 5  # Scale based on load
  selector:
    matchLabels:
      app: gobapp-api
  template:
    spec:
      containers:
      - name: api
        image: gobapp/api:latest
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: database-secret
              key: url
```

**Load Balancing:**
```
Cloudflare Load Balancer
│
├─ API Server 1 (Railway US East)
├─ API Server 2 (Railway US West)
└─ API Server 3 (Railway EU)

Health checks: /health every 30s
Failover: Automatic
Geo-steering: Enabled (route to nearest)
```

#### **8.3 - Caching Strategy (Advanced)**

```typescript
// Multi-layer cache
class CacheService {
  
  // L1: In-memory (fastest)
  private memoryCache = new Map();
  
  // L2: Redis (shared)
  private redis: Redis;
  
  // L3: Database (slowest)
  
  async get(key: string) {
    // Try L1
    if (this.memoryCache.has(key)) {
      return this.memoryCache.get(key);
    }
    
    // Try L2
    const cached = await this.redis.get(key);
    if (cached) {
      const value = JSON.parse(cached);
      this.memoryCache.set(key, value); // Promote to L1
      return value;
    }
    
    // L3: Database
    return null;
  }
  
  async set(key: string, value: any, ttl = 3600) {
    // Set all layers
    this.memoryCache.set(key, value);
    await this.redis.setex(key, ttl, JSON.stringify(value));
  }
  
  // Cache invalidation
  async invalidate(pattern: string) {
    // Clear L1
    for (const key of this.memoryCache.keys()) {
      if (key.startsWith(pattern)) {
        this.memoryCache.delete(key);
      }
    }
    
    // Clear L2
    const keys = await this.redis.keys(`${pattern}*`);
    if (keys.length) {
      await this.redis.del(...keys);
    }
  }
}

// Smart invalidation
async function updateCandidate(id: string, data: any) {
  const updated = await prisma.candidate.update({ where: { id }, data });
  
  // Invalidate related caches
  await cacheService.invalidate(`candidate:${id}`);
  await cacheService.invalidate('candidates:active');
  await cacheService.invalidate(`matches:*:${id}`); // All matches with this candidate
  
  return updated;
}
```

#### **8.4 - AI Cost Optimization**

```typescript
// Batch AI requests
class GeminiBatcher {
  private queue: Array<{ request: any, resolve: Function }> = [];
  private batchSize = 10;
  private batchTimeout = 100; // ms
  
  async request(prompt: string) {
    return new Promise((resolve) => {
      this.queue.push({ request: prompt, resolve });
      
      if (this.queue.length >= this.batchSize) {
        this.flush();
      } else {
        setTimeout(() => this.flush(), this.batchTimeout);
      }
    });
  }
  
  private async flush() {
    if (this.queue.length === 0) return;
    
    const batch = this.queue.splice(0, this.batchSize);
    
    // Batch request to Gemini
    const results = await Promise.all(
      batch.map(item => geminiService.generate(item.request))
    );
    
    // Resolve promises
    batch.forEach((item, i) => item.resolve(results[i]));
  }
}

// Cache AI responses
async function getAIResponse(prompt: string) {
  const cacheKey = `ai:${hashPrompt(prompt)}`;
  
  const cached = await cache.get(cacheKey);
  if (cached) return cached;
  
  const response = await geminiService.generate(prompt);
  
  await cache.set(cacheKey, response, 86400); // 24h
  
  return response;
}

// Use cheaper models for simple tasks
async function categorizeText(text: string): Promise<Category> {
  // Use Gemini Flash (cheaper) for classification
  // Use Gemini Pro only for generation
  
  const result = await genAI.getGenerativeModel({ 
    model: 'gemini-2.0-flash-exp' // Not Pro
  }).generateContent(`Categorize: ${text}`);
  
  return parseCategory(result);
}
```

---