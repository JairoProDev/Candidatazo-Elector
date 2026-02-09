### **ETAPA 0: SETUP & FOUNDATION (Día 1-2)**
**Objetivo:** Infraestructura lista para desarrollar

#### **0.1 - Repository Setup**
```bash
# Create repos
mkdir gobapp-monorepo && cd gobapp-monorepo

# Initialize
pnpm init
pnpm add -D turbo

# Workspace structure
/apps
  /mobile      # React Native
  /api         # Fastify
  /admin       # React admin panel
  /landing     # Marketing site
/packages
  /ui          # Shared components
  /config      # Shared config
  /types       # TypeScript types
  /utils       # Shared utilities
```

#### **0.2 - Mobile App Bootstrap**
```bash
npx create-expo-app apps/mobile --template

# Install core deps
cd apps/mobile
pnpm add react-navigation @react-navigation/native @react-navigation/stack
pnpm add zustand @tanstack/react-query
pnpm add react-native-paper nativewind
pnpm add @clerk/clerk-expo
pnpm add victory-native react-native-reanimated
```

#### **0.3 - API Bootstrap**
```bash
cd apps/api

# Initialize
pnpm init
pnpm add fastify @fastify/cors @fastify/jwt
pnpm add prisma @prisma/client
pnpm add @google/generative-ai
pnpm add bullmq ioredis
pnpm add -D tsx @types/node

# Init Prisma
npx prisma init
```

#### **0.4 - Infrastructure**
```yaml
# railway.json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "numReplicas": 1,
    "startCommand": "pnpm start",
    "restartPolicyType": "ON_FAILURE"
  }
}

# Services to create:
- API (Node.js)
- Postgres
- Redis
- Worker (for background jobs)
```

#### **0.5 - Environment Variables**
```bash
# .env.example
DATABASE_URL=
REDIS_URL=
GEMINI_API_KEY=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
POSTHOG_API_KEY=
SENTRY_DSN=
```

---