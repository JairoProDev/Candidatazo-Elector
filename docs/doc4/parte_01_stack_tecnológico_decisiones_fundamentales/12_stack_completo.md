### **1.2 - STACK COMPLETO**
#### **FRONTEND (Mobile + Web)**

**Framework Principal: React Native + Expo**
```
Por qué:
✅ Un código → iOS + Android + Web
✅ Hot reload = desarrollo rápido
✅ Expo = sin Xcode/Android Studio
✅ Massive community
✅ Performance nativa con Hermes
✅ OTA updates sin app store

Alternativa descartada:
❌ Flutter: Dart es nicho, menos devs
❌ Native (Swift/Kotlin): 3x tiempo dev
❌ Ionic: Performance issues
```

**UI Library: React Native Paper + Tailwind (NativeWind)**
```
React Native Paper:
- Material Design out-of-box
- Components pre-built (cards, buttons, etc)
- Theming system
- Accessibility built-in

NativeWind:
- Tailwind en React Native
- Utility-first styling
- Responsive design fácil
- Consistency con web
```

**State Management: Zustand**
```
Por qué NO Redux:
- Boilerplate masivo
- Overkill para nuestro caso

Zustand:
- Minimal boilerplate
- Hooks-based
- TypeScript perfecto
- Small bundle (3kb)
- Persist fácil
```

**Navigation: React Navigation v6**
```
Stack Navigator: Screens principales
Tab Navigator: Bottom tabs
Drawer Navigator: Side menu (desktop)
Deep Linking: Para shares virales
```

**Data Fetching: TanStack Query (React Query)**
```
Features:
- Caching automático
- Background refetch
- Optimistic updates
- Infinite scroll built-in
- Offline support
```

**Forms: React Hook Form + Zod**
```
React Hook Form:
- Performance (uncontrolled)
- Less re-renders
- Validation integrada

Zod:
- TypeScript schema
- Runtime validation
- Type inference
- Error messages custom
```

**Animations: React Native Reanimated + Moti**
```
Reanimated:
- 60fps guaranteed
- Runs on UI thread
- Gesture handler integration

Moti:
- Framer Motion for RN
- Declarative animations
- Spring physics
```

**Charts: Victory Native**
```
- React Native optimized
- Beautiful defaults
- Radar charts (para DNA)
- Customizable
- Accessible
```

#### **BACKEND**

**Runtime: Node.js 20 LTS**
```
Por qué:
✅ JavaScript full-stack
✅ NPM ecosystem
✅ Non-blocking I/O (perfect for API calls)
✅ Huge community
```

**Framework: Fastify**
```
Por qué NO Express:
- Express es lento
- No TypeScript nativo

Fastify:
- 3x más rápido que Express
- TypeScript first-class
- Schema validation built-in
- Plugin architecture
- Auto-documentation (Swagger)
```

**ORM: Prisma**
```
Features:
- TypeScript perfecto
- Auto-completion
- Migration system
- Seeding fácil
- Multi-database support
- GraphQL ready (futuro)

Schema example:
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  dnaTest   DnaTest?
  matches   Match[]
  createdAt DateTime @default(now())
}
```
```

**Database: PostgreSQL 16 + Redis**
```
PostgreSQL:
- ACID compliance
- JSON support (para responses dinámicos)
- Full-text search
- Partitioning (para escala)
- Extensions (PostGIS para geo)

Redis:
- Session storage
- Rate limiting
- Caching hot data
- Real-time features (debates live)
- Job queues
```

**File Storage: Supabase Storage**
```
Por qué:
- S3-compatible
- CDN integrado
- Image optimization auto
- Generous free tier
- Resize on-the-fly

Alternativa:
- Cloudflare R2 (cheaper egress)
```

**Search: PostgreSQL Full-Text + Typesense (futuro)**
```
Fase 1: Postgres FTS
- Built-in
- Good enough para MVP

Fase 2: Typesense
- Typo tolerance
- Faceted search
- Fast (< 50ms)
- Self-hosted option
```

#### **AI & ML**

**Primary LLM: Google Gemini 2.0 Flash**
```
API Endpoint: https://generativelanguage.googleapis.com/v1beta

Por qué Gemini Flash:
✅ $0.075 / 1M tokens input
✅ $0.30 / 1M tokens output
✅ 1M context window
✅ Grounded search built-in
✅ JSON mode nativo
✅ Function calling
✅ Streaming

Use Cases en GobApp:
1. AI Debate Simulator
   - Fine-tuned per candidate
   - Streaming responses
   
2. Fact-Check Automation
   - Grounded search = fuentes auto
   - JSON structured output
   
3. Summarization
   - Planes de gobierno → bullets
   - Debates → highlights
   
4. Semantic Search
   - Embeddings para matching
   - Similar users/positions

Rate Limits:
- Free tier: 15 RPM, 1M TPM
- Paid: 2000 RPM, 4M TPM
```

**Fallback LLM: OpenAI GPT-4o-mini**
```
Cuando usar:
- Gemini rate limit hit
- Gemini down
- Specific tasks better at GPT

Budget: $4.98 actual
Pricing: $0.15 / 1M input, $0.60 / 1M output
```

**Embedding Model: text-embedding-004 (Gemini)**
```
Use cases:
- Political DNA similarity
- Candidate matching algorithm
- Semantic search candidates
- Similar users clustering

Dimensiones: 768
Cost: $0.00001 / 1K tokens (casi gratis)
```

**Local AI (futuro): Llama 3.2 3B**
```
Para:
- Offline mode
- Privacy-sensitive features
- Cost reduction at scale

Hosting: Cloudflare Workers AI
```

#### **AUTHENTICATION & AUTHORIZATION**

**Auth Provider: Clerk**
```
Por qué:
✅ Social logins (Google, Facebook, Apple)
✅ Magic links (no password)
✅ React Native SDK
✅ User management UI
✅ Webhooks for sync
✅ Free: 10K MAU

Features usadas:
- Email/Password
- OAuth (Google, Facebook)
- Phone (SMS) - Perú
- Session management
- JWT tokens
```

**Authorization: Casbin (RBAC)**
```
Roles:
- user (default)
- premium (paid)
- moderator (community)
- admin (team)

Permissions example:
user can read posts
user can create posts (rate-limited)
premium can create unlimited posts
moderator can delete posts
admin can do anything
```

#### **ANALYTICS & MONITORING**

**Analytics: PostHog (Self-Hosted)**
```
Features:
- Event tracking
- Session replay
- Feature flags
- A/B testing
- Funnels
- Cohorts
- SQL queries

Self-hosted:
- Free unlimited events
- Data ownership
- GDPR compliant

Events a trackear:
- dna_test_started
- dna_test_completed
- candidate_matched
- result_shared
- fact_check_viewed
- debate_watched
- premium_upgraded
```

**Error Tracking: Sentry**
```
Features:
- Error grouping
- Source maps
- Release tracking
- Performance monitoring
- User feedback

Free tier: 5K errors/month
```

**Logging: Better Stack (Logtail)**
```
- Centralized logs
- Live tail
- SQL queries
- Alerts
- 1GB free/month

Log levels:
error > warn > info > debug
```

**Uptime: BetterUptime**
```
- Status page
- Incident management
- SSL monitoring
- 10 monitors free
```

**APM: New Relic (Free Tier)**
```
- Request tracing
- Database queries
- External services
- Slow transactions
- 100GB free/month
```

#### **INFRASTRUCTURE**

**Hosting: Railway.app**
```
Por qué NO Vercel/Netlify:
- No WebSocket support
- Serverless cold starts
- Database limitations

Railway:
✅ $5 credit/month free
✅ Postgres included
✅ Redis included
✅ Automatic deploys
✅ Preview environments
✅ No cold starts
✅ WebSocket support

Services:
- API (Fastify)
- Database (Postgres)
- Cache (Redis)
- Worker (Background jobs)
```

**CDN: Cloudflare**
```
Free tier:
- Unlimited bandwidth
- DDoS protection
- SSL
- Caching
- Workers (edge compute)
- R2 storage option

Setup:
- Proxy all traffic
- Cache static assets
- Rate limiting
- Bot protection
```

**Domain: .pe + .com**
```
gobapp.pe - Principal (Perú focus)
gobapp.com - Global expansion
```

**Email: Resend**
```
Features:
- React Email templates
- 3K emails/month free
- API simple
- Analytics

Use cases:
- Welcome email
- DNA test results
- Debate reminders
- Weekly digest
- Password reset
```

**SMS: Twilio**
```
Para:
- Phone verification
- Fact-check alerts (opt-in)
- Election day reminders

Pricing: $0.0117/SMS Perú
Budget: 1000 SMS = $12
```

**Push Notifications: Expo Push**
```
Built into Expo:
- Free unlimited
- iOS + Android
- Delivery tracking
- Scheduling

Use cases:
- Debate starting
- Fact-check published
- Friend matched
- Weekly engagement
```

#### **PAYMENT PROCESSING**

**Provider: Mercado Pago (Perú)**
```
Por qué:
- #1 en LATAM
- Soles (PEN)
- Yape integration
- Low fees (5.9% + S/0.50)

Plans:
- Premium: S/9.90/mes
- Annual: S/49.90/año (save 58%)
```

**Billing: Stripe (international)**
```
Para:
- Expansion global
- Subscriptions management
- Tax automation
- Invoicing

Integration:
- Stripe Checkout
- Customer Portal
```

#### **DEVOPS & CI/CD**

**Version Control: GitHub**
```
Repos:
- gobapp-mobile (React Native)
- gobapp-api (Fastify)
- gobapp-admin (React)
- gobapp-docs (Markdown)

Branch strategy:
main → production
staging → preview
feature/* → development
```

**CI/CD: GitHub Actions**
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        run: railway up
      - name: Run tests
        run: npm test
      - name: Build mobile
        run: eas build
```

**Testing: Vitest + React Native Testing Library**
```
Unit tests: Vitest (fast)
Integration: Supertest
E2E: Detox (mobile)

Coverage target: >80%
```

**Code Quality: ESLint + Prettier + TypeScript**
```
ESLint:
- @typescript-eslint
- react-hooks rules
- import sorting

Prettier:
- Consistent formatting
- Pre-commit hook

TypeScript:
- Strict mode
- No any
- Path aliases (@/components)
```

---