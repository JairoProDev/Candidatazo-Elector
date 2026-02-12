## 8. ARQUITECTURA TÉCNICA

### 8.1 STACK TECNOLÓGICO - Decisiones y Justificaciones

#### Frontend Mobile (React Native + Expo)

```
ESTRUCTURA DEL PROYECTO

candidatazo-mobile/
├── app/                          # Expo Router (file-based routing)
│   ├── (tabs)/                   # Tab navigation
│   │   ├── index.tsx             # Home/Feed
│   │   ├── explore.tsx           # Discover/Search
│   │   ├── debates.tsx           # Debates activos
│   │   ├── candidates.tsx        # Candidatos
│   │   └── profile.tsx           # Mi perfil
│   ├── (auth)/                   # Auth flow
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── onboarding.tsx
│   ├── dna-test/                 # Test político
│   │   ├── intro.tsx
│   │   ├── questions.tsx
│   │   └── results.tsx
│   ├── candidate/
│   │   └── [id].tsx              # Dynamic route
│   └── _layout.tsx               # Root layout
├── components/
│   ├── ui/                       # Componentes reutilizables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── ...
│   ├── feed/
│   │   ├── PostCard.tsx
│   │   ├── DebateCard.tsx
│   │   ├── PollCard.tsx
│   │   └── ...
│   ├── candidate/
│   │   ├── ProfileHeader.tsx
│   │   ├── ProposalCard.tsx
│   │   ├── MatchScore.tsx
│   │   └── ...
│   └── dna-test/
│       ├── QuestionCard.tsx
│       ├── ProgressBar.tsx
│       └── ResultsChart.tsx
├── lib/
│   ├── api.ts                    # API client
│   ├── auth.ts                   # Auth utilities
│   ├── analytics.ts              # Analytics wrapper
│   └── utils.ts
├── hooks/
│   ├── useUser.ts
│   ├── useFeed.ts
│   ├── useCandidates.ts
│   └── useDebate.ts
├── store/                        # State management (Zustand)
│   ├── userStore.ts
│   ├── feedStore.ts
│   └── notificationStore.ts
├── constants/
│   ├── Colors.ts
│   ├── Layout.ts
│   └── Config.ts
├── assets/
│   ├── images/
│   └── fonts/
└── app.config.ts                 # Expo config
```

**Decisiones Clave:**

1. **¿Por qué React Native + Expo?**
   - ✅ Single codebase para iOS y Android
   - ✅ Ecosystem maduro con bibliotecas probadas
   - ✅ Hot reload para desarrollo rápido
   - ✅ EAS (Expo Application Services) para builds y updates OTA
   - ✅ Expo Router para navigation moderna
   - ❌ Performance ligeramente inferior a native (acceptable para nuestro caso)

2. **¿Por qué Expo Router vs React Navigation?**
   - ✅ File-based routing (más intuitivo)
   - ✅ Deep linking automático
   - ✅ Type-safe navigation
   - ✅ Better developer experience

3. **¿Por qué Zustand vs Redux/MobX?**
   - ✅ Minimal boilerplate
   - ✅ TypeScript-first
   - ✅ Hook-based API
   - ✅ Excellent performance
   - ✅ Small bundle size (1KB)

**Dependencies Core:**
```json
{
  "dependencies": {
    "expo": "~51.0.0",
    "expo-router": "~3.5.0",
    "react-native": "0.74.0",
    "react-native-reanimated": "~3.10.0",
    "zustand": "^4.5.0",
    "@tanstack/react-query": "^5.28.0",
    "axios": "^1.6.0",
    "expo-secure-store": "~13.0.0",
    "expo-notifications": "~0.28.0",
    "expo-linking": "~6.3.0",
    "@react-native-async-storage/async-storage": "1.23.0",
    "react-native-gesture-handler": "~2.16.0",
    "react-native-svg": "15.2.0",
    "react-native-charts-wrapper": "^0.6.0"
  }
}
```

---

#### Backend (Fastify + Node.js)

```
ESTRUCTURA DEL BACKEND

candidatazo-api/
├── src/
│   ├── index.ts                  # Entry point
│   ├── server.ts                 # Fastify server config
│   ├── config/
│   │   ├── database.ts           # Prisma client
│   │   ├── redis.ts              # Redis client
│   │   └── env.ts                # Environment variables
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── users.routes.ts
│   │   ├── candidates.routes.ts
│   │   ├── dna-test.routes.ts
│   │   ├── feed.routes.ts
│   │   ├── debates.routes.ts
│   │   ├── predictions.routes.ts
│   │   └── notifications.routes.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── users.controller.ts
│   │   ├── candidates.controller.ts
│   │   └── ...
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── dna-matching.service.ts
│   │   ├── feed-algorithm.service.ts
│   │   ├── moderation.service.ts
│   │   ├── notification.service.ts
│   │   └── gemini.service.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── rate-limit.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── error.middleware.ts
│   ├── models/                   # Prisma models
│   │   └── schema.prisma
│   ├── types/
│   │   ├── user.types.ts
│   │   ├── candidate.types.ts
│   │   └── ...
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── crypto.ts
│   │   └── validators.ts
│   └── jobs/                     # Background jobs
│       ├── notification-sender.ts
│       ├── feed-generator.ts
│       └── data-sync.ts
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── package.json
```

**Decisiones Clave:**

1. **¿Por qué Fastify vs Express?**
   - ✅ 2-3x más rápido que Express
   - ✅ TypeScript-first design
   - ✅ Built-in schema validation (JSON Schema)
   - ✅ Plugin architecture
   - ✅ Logging integrado
   - ❌ Ecosystem más pequeño (pero suficiente)

2. **¿Por qué Prisma ORM?**
   - ✅ Type-safe database access
   - ✅ Auto-generated types
   - ✅ Excellent migration system
   - ✅ Query optimization
   - ✅ Great developer experience
   - ✅ PostgreSQL features support (JSON, full-text search)

3. **¿Por qué PostgreSQL?**
   - ✅ ACID compliance (crítico para datos electorales)
   - ✅ JSON/JSONB support (flexible schema para propuestas)
   - ✅ Full-text search (búsqueda de candidatos/propuestas)
   - ✅ PostGIS potential (geolocalización de eventos)
   - ✅ Mature, production-proven
   - ✅ Great Prisma integration

4. **¿Por qué Redis?**
   - ✅ Feed caching (ultra-fast)
   - ✅ Session management
   - ✅ Rate limiting
   - ✅ Real-time features (pub/sub para debates)
   - ✅ Leaderboards (sorted sets)

**Dependencies Core:**
```json
{
  "dependencies": {
    "fastify": "^4.26.0",
    "@fastify/cors": "^9.0.0",
    "@fastify/jwt": "^8.0.0",
    "@fastify/rate-limit": "^9.1.0",
    "@fastify/multipart": "^8.1.0",
    "@prisma/client": "^5.10.0",
    "prisma": "^5.10.0",
    "redis": "^4.6.0",
    "ioredis": "^5.3.0",
    "bcrypt": "^5.1.0",
    "zod": "^3.22.0",
    "pino": "^8.18.0",
    "bullmq": "^5.1.0",
    "@google/generative-ai": "^0.1.0",
    "node-cron": "^3.0.0"
  }
}
```

---

#### Database Schema (Prisma)

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// USERS & AUTH
// ============================================

model User {
  id                String    @id @default(cuid())
  email             String    @unique
  username          String    @unique
  passwordHash      String?   // null for OAuth users
  
  // Profile
  fullName          String
  avatar            String?
  bio               String?
  birthDate         DateTime?
  district          String    // Electoral district
  
  // OAuth
  googleId          String?   @unique
  facebookId        String?   @unique
  
  // Verification
  emailVerified     Boolean   @default(false)
  phoneNumber       String?
  phoneVerified     Boolean   @default(false)
  
  // Settings
  notifications     Json      @default("{\"push\": true, \"email\": false}")
  privacy           Json      @default("{\"profile\": \"public\"}")
  
  // Gamification
  reputation        Float     @default(5.0)
  points            Int       @default(0)
  badges            Badge[]
  
  // Relations
  dnaTest           DnaTest?
  posts             Post[]
  comments          Comment[]
  votes             Vote[]
  debates           DebateParticipation[]
  predictions       Prediction[]
  following         Follow[]  @relation("Following")
  followers         Follow[]  @relation("Followers")
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([district])
  @@index([reputation])
}

model Badge {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  type        String   // "debater", "voter", "engaged", etc.
  level       Int      // 1-5
  earnedAt    DateTime @default(now())
  
  @@index([userId])
}

// ============================================
// DNA TEST & MATCHING
// ============================================

model DnaTest {
  id          String   @id @default(cuid())
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Responses (30 questions)
  responses   Json     // Array of {questionId, value, importance}
  
  // Calculated profile (8 axes)
  profile     Json     // {economic, social, institutional, environmental, ...}
  
  // Matches cache
  matches     Json     // [{candidateId, score, breakdown}]
  
  completedAt DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([userId])
}

// ============================================
// CANDIDATES
// ============================================

model Candidate {
  id              String    @id @default(cuid())
  
  // Basic info
  fullName        String
  username        String    @unique
  avatar          String?
  party           String
  
  // Electoral info
  position        String    // "president", "senator", "congressman"
  district        String?   // For congress
  circumscription String?   // For senate
  
  // Profile
  bio             String?
  birthDate       DateTime?
  education       Json?     // [{institution, degree, year}]
  experience      Json?     // [{position, organization, years}]
  
  // Legal declarations
  legalRecords    Json?     // Court records
  assets          Json?     // Financial declaration
  
  // DNA (positions on issues)
  dnaProfile      Json      // Same structure as user DNA
  
  // Verification
  verified        Boolean   @default(false)
  verifiedBy      String?   // JNE, RENIEC, etc.
  
  // Relations
  proposals       Proposal[]
  posts           Post[]
  factChecks      FactCheck[]
  
  // Stats
  followerCount   Int       @default(0)
  averageMatch    Float?    // Average match with users
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@index([position, district])
  @@index([verified])
}

model Proposal {
  id            String    @id @default(cuid())
  candidateId   String
  candidate     Candidate @relation(fields: [candidateId], references: [id], onDelete: Cascade)
  
  title         String
  description   String    @db.Text
  category      String    // "health", "education", "economy", etc.
  
  // Details
  budget        Float?
  timeline      Json?     // {start, milestones, end}
  feasibility   Json?     // {technical, financial, political}
  sources       Json?     // [{url, title, type}]
  
  // Engagement
  views         Int       @default(0)
  supportCount  Int       @default(0)
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([candidateId])
  @@index([category])
  @@fulltext([title, description])
}

model FactCheck {
  id            String    @id @default(cuid())
  candidateId   String
  candidate     Candidate @relation(fields: [candidateId], references: [id], onDelete: Cascade)
  
  claim         String    @db.Text
  verdict       String    // "true", "false", "misleading", "unverifiable"
  explanation   String    @db.Text
  sources       Json      // [{url, title, organization}]
  
  checkedBy     String    // Organization (OjoPúblico, etc.)
  checkedAt     DateTime  @default(now())
  
  @@index([candidateId])
  @@index([verdict])
}

// ============================================
// SOCIAL FEATURES
// ============================================

model Post {
  id            String    @id @default(cuid())
  authorId      String?
  candidateId   String?
  
  author        User?     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  candidate     Candidate? @relation(fields: [candidateId], references: [id], onDelete: Cascade)
  
  type          String    // "text", "image", "video", "poll", "proposal"
  content       String    @db.Text
  media         Json?     // [{url, type, thumbnail}]
  
  // Engagement
  likes         Int       @default(0)
  comments      Comment[]
  shares        Int       @default(0)
  views         Int       @default(0)
  
  // Metadata
  hashtags      String[]
  mentions      String[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([authorId])
  @@index([candidateId])
  @@index([createdAt])
  @@fulltext([content])
}

model Comment {
  id          String   @id @default(cuid())
  postId      String
  post        Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  
  authorId    String
  author      User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  
  content     String   @db.Text
  
  // Nested comments
  parentId    String?
  parent      Comment? @relation("CommentReplies", fields: [parentId], references: [id])
  replies     Comment[] @relation("CommentReplies")
  
  // Engagement
  likes       Int      @default(0)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([postId])
  @@index([authorId])
  @@index([parentId])
}

model Vote {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  targetId    String   // postId, commentId, argumentId
  targetType  String   // "post", "comment", "argument"
  value       Int      // 1 for upvote, -1 for downvote
  
  createdAt   DateTime @default(now())
  
  @@unique([userId, targetId, targetType])
  @@index([targetId, targetType])
}

model Follow {
  id          String   @id @default(cuid())
  followerId  String
  followingId String
  
  follower    User     @relation("Following", fields: [followerId], references: [id], onDelete: Cascade)
  following   User     @relation("Followers", fields: [followingId], references: [id], onDelete: Cascade)
  
  createdAt   DateTime @default(now())
  
  @@unique([followerId, followingId])
  @@index([followerId])
  @@index([followingId])
}

// ============================================
// DEBATES
// ============================================

model Debate {
  id              String    @id @default(cuid())
  
  title           String
  question        String    @db.Text
  category        String
  
  // Debate structure
  postures        Json      // [{id, label, description}]
  
  // Settings
  endDate         DateTime
  requireSources  Boolean   @default(true)
  moderationType  String    @default("ai_assisted")
  
  // Participants
  participants    DebateParticipation[]
  arguments       Argument[]
  
  // Stats
  viewCount       Int       @default(0)
  participantCount Int      @default(0)
  argumentCount   Int       @default(0)
  
  // Status
  status          String    @default("active") // active, closed, archived
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@index([status, endDate])
  @@index([category])
  @@fulltext([title, question])
}

model DebateParticipation {
  id          String   @id @default(cuid())
  debateId    String
  debate      Debate   @relation(fields: [debateId], references: [id], onDelete: Cascade)
  
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  posture     String   // ID from debate.postures
  joinedAt    DateTime @default(now())
  
  @@unique([debateId, userId])
  @@index([debateId])
  @@index([userId])
}

model Argument {
  id            String   @id @default(cuid())
  debateId      String
  debate        Debate   @relation(fields: [debateId], references: [id], onDelete: Cascade)
  
  authorId      String
  author        User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  
  content       String   @db.Text
  posture       String   // ID from debate.postures
  sources       Json?    // [{url, title, verified}]
  
  // Moderation
  flagged       Boolean  @default(false)
  flagReason    String?
  approved      Boolean  @default(false)
  
  // Engagement
  upvotes       Int      @default(0)
  downvotes     Int      @default(0)
  replies       Int      @default(0)
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@index([debateId])
  @@index([authorId])
  @@index([approved])
}

// ============================================
// PREDICTION MARKETS
// ============================================

model PredictionMarket {
  id            String       @id @default(cuid())
  
  question      String       @db.Text
  category      String
  district      String?      // Optional location filter
  
  // Options
  outcomes      Json         // [{id, label, currentPrice}]
  
  // Settings
  closeDate     DateTime
  resolutionDate DateTime?
  resolved      Boolean      @default(false)
  winner        String?      // Outcome ID
  
  // Predictions
  predictions   Prediction[]
  
  // Stats
  totalVolume   Int          @default(0) // Total predictions placed
  participantCount Int       @default(0)
  
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
  
  @@index([category])
  @@index([resolved, closeDate])
}

model Prediction {
  id              String           @id @default(cuid())
  marketId        String
  market          PredictionMarket @relation(fields: [marketId], references: [id], onDelete: Cascade)
  
  userId          String
  user            User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  outcomeId       String
  shares          Int              // Amount "invested"
  priceAtPurchase Float            // Price when purchased
  
  createdAt       DateTime         @default(now())
  
  @@index([marketId])
  @@index([userId])
}

// ============================================
// NOTIFICATIONS
// ============================================

model Notification {
  id          String   @id @default(cuid())
  userId      String
  
  type        String   // "mention", "reply", "match", "debate", etc.
  title       String
  body        String
  data        Json?    // Additional data for deep linking
  
  read        Boolean  @default(false)
  
  createdAt   DateTime @default(now())
  
  @@index([userId, read])
  @@index([createdAt])
}

// ============================================
// ANALYTICS & TRACKING
// ============================================

model Event {
  id          String   @id @default(cuid())
  userId      String?
  
  type        String   // "page_view", "button_click", "share", etc.
  name        String
  properties  Json?
  
  // Session info
  sessionId   String
  deviceInfo  Json?
  
  createdAt   DateTime @default(now())
  
  @@index([userId])
  @@index([type, createdAt])
}
```

**Key Schema Decisions:**

1. **Flexible JSON Fields**:
   - `dnaProfile`, `proposals.timeline`, `education`, etc.
   - Allows schema evolution without migrations
   - Still queryable with PostgreSQL JSON operators

2. **Denormalized Counters**:
   - `followerCount`, `likes`, `shares`, etc.
   - Trade consistency for performance
   - Background jobs keep them updated

3. **Full-Text Search**:
   - `@@fulltext` on searchable fields
   - PostgreSQL native FTS (faster than LIKE)

4. **Proper Indexing**:
   - All foreign keys indexed
   - Composite indexes for common queries
   - Keeps queries fast even at scale

---

### 8.2 AI INTEGRATION - Gemini Flash 2.0

#### Use Cases y Implementación

```typescript
// src/services/gemini.service.ts

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

class GeminiService {
  private model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash-exp" 
  });
  
  // ============================================
  // USE CASE 1: MODERATION DE CONTENIDO
  // ============================================
  
  async moderateContent(content: string, type: "post" | "comment" | "argument") {
    const prompt = `
Eres un moderador experto en contenido político peruano. Analiza el siguiente ${type}:

"${content}"

Determina si viola alguna de estas reglas:
1. Lenguaje ofensivo o insultos
2. Ataques personales a usuarios o candidatos
3. Desinformación clara y verificable
4. Incitación a la violencia
5. Spam o contenido irrelevante

Responde SOLO en JSON:
{
  "approved": boolean,
  "violations": string[],  // IDs de reglas violadas
  "severity": "low" | "medium" | "high",
  "suggestedEdit": string | null  // Sugerencia si es editable
}
`;

    const result = await this.model.generateContent(prompt);
    const response = result.response.text();
    return JSON.parse(response);
  }
  
  // ============================================
  // USE CASE 2: RESUMEN DE DEBATES
  // ============================================
  
  async summarizeDebate(debateId: string, arguments: Argument[]) {
    const argumentTexts = arguments.map((arg, i) => 
      `[Argumento ${i + 1} - Postura ${arg.posture}]
${arg.content}
Fuentes: ${JSON.stringify(arg.sources)}`
    ).join("\n\n");
    
    const prompt = `
Eres un analista político experto. Resume este debate político peruano:

${argumentTexts}

Genera un resumen estructurado en JSON:
{
  "mainPoints": [
    {
      "posture": string,
      "summary": string,
      "keyArguments": string[],
      "strengths": string[],
      "weaknesses": string[]
    }
  ],
  "commonGround": string[],  // Puntos de acuerdo
  "keyDifferences": string[],
  "factualClaims": [
    {
      "claim": string,
      "source": string,
      "needsVerification": boolean
    }
  ]
}
`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }
  
  // ============================================
  // USE CASE 3: COMPARACIÓN DE CANDIDATOS
  // ============================================
  
  async compareProposals(
    candidate1Proposals: Proposal[], 
    candidate2Proposals: Proposal[],
    category: string
  ) {
    const prompt = `
Compara las propuestas de dos candidatos peruanos en ${category}:

CANDIDATO 1:
${candidate1Proposals.map(p => `- ${p.title}: ${p.description}`).join("\n")}

CANDIDATO 2:
${candidate2Proposals.map(p => `- ${p.title}: ${p.description}`).join("\n")}

Genera un análisis comparativo en JSON:
{
  "similarities": string[],
  "differences": [
    {
      "aspect": string,
      "candidate1": string,
      "candidate2": string,
      "significance": "low" | "medium" | "high"
    }
  ],
  "budgetComparison": {
    "candidate1Total": number,
    "candidate2Total": number,
    "analysis": string
  },
  "feasibilityAnalysis": {
    "candidate1": string,
    "candidate2": string
  },
  "recommendation": {
    "forProgressives": string,
    "forConservatives": string,
    "forCentrists": string
  }
}
`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }
  
  // ============================================
  // USE CASE 4: GENERACIÓN DE PREGUNTAS DNA TEST
  // ============================================
  
  async generateDnaQuestions(existingQuestions: any[], topic: string) {
    const prompt = `
Genera 5 preguntas nuevas y relevantes para un test de ADN político peruano sobre ${topic}.

Contexto de Perú 2026:
- Nuevo sistema bicameral
- Crisis política reciente
- Prioridades: anticorrupción, economía, educación

Evita duplicar estas preguntas existentes:
${existingQuestions.map(q => q.text).join("\n")}

Formato JSON:
{
  "questions": [
    {
      "text": string,
      "category": string,
      "axis": string,  // economic, social, institutional, etc.
      "explanation": string,
      "options": [
        {"value": -2, "label": "Totalmente en contra"},
        {"value": -1, "label": "En contra"},
        {"value": 0, "label": "Neutral"},
        {"value": 1, "label": "De acuerdo"},
        {"value": 2, "label": "Totalmente de acuerdo"}
      ]
    }
  ]
}
`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }
  
  // ============================================
  // USE CASE 5: FACT-CHECKING ASISTIDO
  // ============================================
  
  async assistFactCheck(claim: string, context?: string) {
    const prompt = `
Analiza esta afirmación política peruana:

"${claim}"

${context ? `Contexto: ${context}` : ""}

Como asistente de fact-checking, identifica:
1. Claims verificables específicos
2. Posibles fuentes para verificar
3. Red flags de desinformación
4. Contexto necesario

Responde en JSON:
{
  "verifiableClaims": [
    {
      "claim": string,
      "type": "statistical" | "historical" | "policy" | "quote",
      "suggestedSources": string[]
    }
  ],
  "redFlags": string[],
  "contextNeeded": string[],
  "preliminaryVerdict": "likely_true" | "needs_verification" | "likely_false" | "misleading",
  "reasoning": string
}
`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }
  
  // ============================================
  // USE CASE 6: CONTENT PERSONALIZATION
  // ============================================
  
  async generatePersonalizedInsight(user: User, candidate: Candidate) {
    const userDna = user.dnaTest?.profile || {};
    const candidateDna = candidate.dnaProfile;
    
    const prompt = `
Genera un insight personalizado comparando:

USUARIO (perfil político):
${JSON.stringify(userDna)}

CANDIDATO (perfil político):
${JSON.stringify(candidateDna)}

Genera un mensaje personalizado en JSON:
{
  "headline": string,  // Título llamativo
  "insight": string,   // 2-3 oraciones explicando match
  "keyAlignment": string[],  // 3 áreas de coincidencia
  "keyDifference": string,   // 1 diferencia principal
  "actionable": string  // Qué debería hacer el usuario
}

Tono: amigable, informativo, no partidista.
`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }
}

export default new GeminiService();
```

**Rate Limiting y Costos:**

```typescript
// Rate limiting para Gemini API
import { RateLimiterRedis } from "rate-limiter-flexible";

const geminiRateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "gemini_api",
  points: 60,  // 60 requests
  duration: 60, // per 60 seconds
  blockDuration: 60,
});

// Wrapper con rate limiting
async function callGeminiWithLimit(fn: () => Promise<any>, userId: string) {
  try {
    await geminiRateLimiter.consume(userId);
    return await fn();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Rate limit exceeded. Try again in a minute.");
    }
    throw error;
  }
}

// Estimated costs (Gemini Flash 2.0 pricing)
// Input: $0.075 / 1M tokens
// Output: $0.30 / 1M tokens

// Average use:
// - Moderation: ~500 tokens total = $0.000187
// - Debate summary: ~2000 tokens total = $0.00075
// - Comparison: ~1500 tokens total = $0.000562

// Monthly estimate (100K active users):
// - 1M moderations = $187
// - 100K summaries = $75
// - 50K comparisons = $28
// TOTAL: ~$300/month for AI
```

---

### 8.3 CACHING STRATEGY

```typescript
// src/services/cache.service.ts

import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

class CacheService {
  // ============================================
  // FEED CACHING - Critical for performance
  // ============================================
  
  async getUserFeed(userId: string, page: number = 1) {
    const cacheKey = `feed:user:${userId}:page:${page}`;
    const cached = await redis.get(cacheKey);
    
    if (cached) {
      return JSON.parse(cached);
    }
    
    // Generate feed (expensive operation)
    const feed = await this.generateFeed(userId, page);
    
    // Cache for 5 minutes
    await redis.setex(cacheKey, 300, JSON.stringify(feed));
    
    return feed;
  }
  
  async invalidateUserFeed(userId: string) {
    const keys = await redis.keys(`feed:user:${userId}:*`);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  }
  
  // ============================================
  // DNA MATCH CACHING
  // ============================================
  
  async getCandidateMatches(userId: string) {
    const cacheKey = `dna:matches:${userId}`;
    const cached = await redis.get(cacheKey);
    
    if (cached) {
      return JSON.parse(cached);
    }
    
    // Calculate matches (expensive)
    const matches = await this.calculateAllMatches(userId);
    
    // Cache for 24 hours (DNA doesn't change often)
    await redis.setex(cacheKey, 86400, JSON.stringify(matches));
    
    return matches;
  }
  
  // ============================================
  // LEADERBOARDS - Sorted Sets
  // ============================================
  
  async updateUserPoints(userId: string, points: number) {
    await redis.zadd("leaderboard:global", points, userId);
    
    // Also update weekly leaderboard
    const weekKey = `leaderboard:week:${this.getCurrentWeek()}`;
    await redis.zadd(weekKey, points, userId);
    await redis.expire(weekKey, 604800); // Expire after 1 week
  }
  
  async getLeaderboard(type: "global" | "weekly", limit: number = 100) {
    const key = type === "global" 
      ? "leaderboard:global"
      : `leaderboard:week:${this.getCurrentWeek()}`;
    
    return await redis.zrevrange(key, 0, limit - 1, "WITHSCORES");
  }
  
  // ============================================
  // REAL-TIME COUNTERS
  // ============================================
  
  async incrementPostViews(postId: string) {
    await redis.incr(`post:views:${postId}`);
  }
  
  async getPostViews(postId: string): Promise<number> {
    const views = await redis.get(`post:views:${postId}`);
    return parseInt(views || "0");
  }
  
  // Batch sync to database every hour
  async syncViewsToDB() {
    const keys = await redis.keys("post:views:*");
    
    for (const key of keys) {
      const postId = key.split(":")[2];
      const views = await redis.get(key);
      
      await prisma.post.update({
        where: { id: postId },
        data: { views: parseInt(views || "0") }
      });
      
      await redis.del(key);
    }
  }
  
  // ============================================
  // TRENDING CONTENT - Time Decay
  // ============================================
  
  async updateTrendingScore(contentId: string, engagementScore: number) {
    const now = Date.now();
    const ageHours = 0; // Fresh content
    
    // Score decays exponentially with age
    const score = engagementScore * Math.exp(-ageHours / 24);
    
    await redis.zadd("trending:content", score, contentId);
    
    // Auto-expire old entries
    const yesterday = now - 86400000;
    await redis.zremrangebyscore("trending:content", 0, yesterday);
  }
  
  async getTrendingContent(limit: number = 20) {
    return await redis.zrevrange("trending:content", 0, limit - 1);
  }
  
  private getCurrentWeek(): string {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - start.getTime();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return `${now.getFullYear()}-W${Math.floor(diff / oneWeek)}`;
  }
}

export default new CacheService();
```

---

### 8.4 REAL-TIME FEATURES - WebSockets

```typescript
// src/services/realtime.service.ts

import { Server as SocketServer } from "socket.io";
import { Server } from "http";

class RealtimeService {
  private io: SocketServer;
  
  initialize(server: Server) {
    this.io = new SocketServer(server, {
      cors: {
        origin: process.env.ALLOWED_ORIGINS?.split(","),
        credentials: true
      }
    });
    
    this.io.use(this.authenticateSocket);
    this.io.on("connection", this.handleConnection);
  }
  
  private authenticateSocket = async (socket: any, next: any) => {
    const token = socket.handshake.auth.token;
    
    try {
      const decoded = await verifyJWT(token);
      socket.userId = decoded.userId;
      next();
    } catch (error) {
      next(new Error("Authentication failed"));
    }
  };
  
  private handleConnection = (socket: any) => {
    console.log(`User ${socket.userId} connected`);
    
    // Join personal room
    socket.join(`user:${socket.userId}`);
    
    // ============================================
    // DEBATES EN VIVO
    // ============================================
    
    socket.on("debate:join", async (debateId: string) => {
      socket.join(`debate:${debateId}`);
      
      // Notificar a otros
      socket.to(`debate:${debateId}`).emit("debate:user_joined", {
        userId: socket.userId,
        timestamp: Date.now()
      });
      
      // Incrementar contador
      await redis.incr(`debate:${debateId}:live_count`);
      
      // Enviar conteo actual
      const liveCount = await redis.get(`debate:${debateId}:live_count`);
      this.io.to(`debate:${debateId}`).emit("debate:live_count", {
        count: parseInt(liveCount || "0")
      });
    });
    
    socket.on("debate:leave", async (debateId: string) => {
      socket.leave(`debate:${debateId}`);
      await redis.decr(`debate:${debateId}:live_count`);
      
      const liveCount = await redis.get(`debate:${debateId}:live_count`);
      this.io.to(`debate:${debateId}`).emit("debate:live_count", {
        count: parseInt(liveCount || "0")
      });
    });
    
    socket.on("debate:new_argument", (data: any) => {
      // Broadcast nuevo argumento a todos en el debate
      socket.to(`debate:${data.debateId}`).emit("debate:argument_added", data);
    });
    
    // ============================================
    // TYPING INDICATORS
    // ============================================
    
    socket.on("debate:typing", (debateId: string) => {
      socket.to(`debate:${debateId}`).emit("debate:user_typing", {
        userId: socket.userId
      });
    });
    
    socket.on("debate:stop_typing", (debateId: string) => {
      socket.to(`debate:${debateId}`).emit("debate:user_stopped_typing", {
        userId: socket.userId
      });
    });
    
    // ============================================
    // LIVE POLLS
    // ============================================
    
    socket.on("poll:vote", async (data: { pollId: string, option: number }) => {
      // Update poll count in real-time
      await redis.hincrby(`poll:${data.pollId}:votes`, data.option.toString(), 1);
      
      // Get updated results
      const results = await redis.hgetall(`poll:${data.pollId}:votes`);
      
      // Broadcast to all users
      this.io.emit("poll:updated", {
        pollId: data.pollId,
        results
      });
    });
    
    // ============================================
    // NOTIFICATIONS
    // ============================================
    
    socket.on("disconnect", async () => {
      console.log(`User ${socket.userId} disconnected`);
      
      // Cleanup any debate rooms
      const rooms = Array.from(socket.rooms).filter(r => r.startsWith("debate:"));
      for (const room of rooms) {
        const debateId = room.split(":")[1];
        await redis.decr(`debate:${debateId}:live_count`);
      }
    });
  };
  
  // ============================================
  // PUBLIC API - Para usar desde controladores
  // ============================================
  
  sendNotification(userId: string, notification: any) {
    this.io.to(`user:${userId}`).emit("notification", notification);
  }
  
  broadcastDebateUpdate(debateId: string, update: any) {
    this.io.to(`debate:${debateId}`).emit("debate:update", update);
  }
  
  broadcastGlobalEvent(event: string, data: any) {
    this.io.emit(event, data);
  }
}

export default new RealtimeService();
```

---

### 8.5 MONITORING & OBSERVABILITY

```typescript
// src/utils/logger.ts

import pino from "pino";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "HH:MM:ss Z",
      ignore: "pid,hostname"
    }
  }
});

export default logger;

// Usage in controllers:
logger.info({ userId, action: "dna_test_completed" }, "DNA test completed");
logger.error({ error, userId }, "Failed to generate feed");
```

```typescript
// src/middleware/metrics.middleware.ts

import { FastifyRequest, FastifyReply } from "fastify";

export async function metricsMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const start = Date.now();
  
  reply.raw.on("finish", () => {
    const duration = Date.now() - start;
    const route = request.routeOptions.url;
    const method = request.method;
    const statusCode = reply.statusCode;
    
    // Log request metrics
    logger.info({
      method,
      route,
      statusCode,
      duration,
      userId: request.user?.id
    }, "Request completed");
    
    // Send to external monitoring (Datadog, New Relic, etc.)
    if (process.env.DATADOG_API_KEY) {
      sendToDatadog({
        metric: "candidatazo.api.request",
        points: [[Date.now() / 1000, duration]],
        tags: [`route:${route}`, `method:${method}`, `status:${statusCode}`]
      });
    }
  });
}
```

**Key Metrics to Track:**
1. **Performance**:
   - API response times (p50, p95, p99)
   - Database query performance
   - Cache hit rates
   - Feed generation time

2. **Business**:
   - DAU/MAU
   - DNA test completion rate
   - Debate participation rate
   - Candidate follow rate
   - Share/viral coefficient

3. **Technical Health**:
   - Error rates
   - WebSocket connection stability
   - Background job success rate
   - Third-party API latency (Gemini, etc.)

---

Esto completa la PARTE 2 (continuación). ¿Continuamos con la PARTE 3 (Growth Strategy) o quieres revisar/ajustar algo de esta sección?
