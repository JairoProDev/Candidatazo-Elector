### **2.3 - DATABASE SCHEMA COMPLETO**
```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==================== USERS ====================

model User {
  id              String    @id @default(cuid())
  clerkId         String    @unique // From Clerk
  email           String    @unique
  phone           String?   @unique
  name            String?
  avatar          String?
  
  // Preferences
  language        String    @default("es")
  location        Location?
  ageRange        AgeRange?
  
  // Engagement
  onboardingDone  Boolean   @default(false)
  premium         Boolean   @default(false)
  premiumUntil    DateTime?
  
  // Stats
  xp              Int       @default(0)
  level           Int       @default(1)
  streak          Int       @default(0)
  lastActive      DateTime  @default(now())
  
  // Relations
  dnaTests        DnaTest[]
  matches         Match[]
  factCheckVotes  FactCheckVote[]
  posts           Post[]
  comments        Comment[]
  tribes          TribeMembership[]
  achievements    UserAchievement[]
  referrals       Referral[]
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@index([clerkId])
  @@index([email])
}

model Location {
  id          String   @id @default(cuid())
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id])
  
  department  String   // Lima, Cusco, etc.
  province    String
  district    String?
  lat         Float?
  lng         Float?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum AgeRange {
  RANGE_18_25
  RANGE_26_40
  RANGE_41_55
  RANGE_56_PLUS
}

// ==================== DNA TEST ====================

model DnaTest {
  id            String        @id @default(cuid())
  userId        String
  user          User          @relation(fields: [userId], references: [id])
  
  status        TestStatus    @default(IN_PROGRESS)
  currentStep   Int           @default(0)
  totalSteps    Int           @default(30)
  
  // Responses
  answers       Json          // Array of {questionId, value, importance}
  
  // Results
  scores        Json?         // {economic: 73, social: 62, ...}
  tribe         String?       // "Centro Progresista"
  summary       String?       // AI-generated summary
  
  // Metadata
  timeSpent     Int?          // seconds
  completedAt   DateTime?
  
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  
  @@index([userId])
  @@index([status])
}

enum TestStatus {
  IN_PROGRESS
  COMPLETED
  ABANDONED
}

// ==================== CANDIDATES ====================

model Candidate {
  id            String    @id @default(cuid())
  
  // Basic info
  name          String
  party         String
  photo         String
  age           Int
  bio           String    @db.Text
  
  // Political positions (normalized -100 to 100)
  positions     Json      // {economic: 75, social: -30, ...}
  
  // Platform
  planUrl       String?
  planSummary   String?   @db.Text
  promises      Promise[]
  
  // Truth metrics
  truthScore    Float     @default(0)
  factChecks    FactCheck[]
  
  // Social
  twitter       String?
  facebook      String?
  website       String?
  
  // Metadata
  active        Boolean   @default(true)
  position      String    @default("PRESIDENTIAL") // or SENATE, etc
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([active])
}

model Promise {
  id            String     @id @default(cuid())
  candidateId   String
  candidate     Candidate  @relation(fields: [candidateId], references: [id])
  
  title         String
  description   String     @db.Text
  category      Category
  
  // Tracking
  status        PromiseStatus @default(PENDING)
  evidence      String?    @db.Text
  lastChecked   DateTime?
  
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  
  @@index([candidateId])
  @@index([status])
}

enum Category {
  ECONOMY
  EDUCATION
  HEALTH
  SECURITY
  ENVIRONMENT
  SOCIAL
  INFRASTRUCTURE
  FOREIGN_POLICY
}

enum PromiseStatus {
  PENDING
  IN_PROGRESS
  FULFILLED
  BROKEN
  COMPROMISED
}

// ==================== MATCHING ====================

model Match {
  id            String     @id @default(cuid())
  userId        String
  user          User       @relation(fields: [userId], references: [id])
  candidateId   String
  
  // Match score
  overallScore  Float      // 0-100
  breakdown     Json       // {economic: 92, social: 34, ...}
  
  // Insights
  agreements    Json       // Array of position agreements
  disagreements Json       // Array of position disagreements
  
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  
  @@unique([userId, candidateId])
  @@index([userId])
  @@index([overallScore])
}

// ==================== FACT-CHECKING ====================

model FactCheck {
  id            String        @id @default(cuid())
  
  // Subject
  candidateId   String?
  candidate     Candidate?    @relation(fields: [candidateId], references: [id])
  
  // Claim
  claim         String        @db.Text
  context       String?       @db.Text
  claimedAt     DateTime?
  source        String?       // debate, interview, tweet
  
  // Verdict
  verdict       Verdict
  explanation   String        @db.Text
  sources       Json          // Array of {title, url, type}
  
  // AI metadata
  confidence    Float?        // 0-1
  aiGenerated   Boolean       @default(false)
  
  // Community
  votes         FactCheckVote[]
  upvotes       Int           @default(0)
  downvotes     Int           @default(0)
  
  // Meta
  featured      Boolean       @default(false)
  publishedAt   DateTime      @default(now())
  
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  
  @@index([verdict])
  @@index([publishedAt])
  @@index([featured])
}

enum Verdict {
  TRUE
  MOSTLY_TRUE
  HALF_TRUE
  MOSTLY_FALSE
  FALSE
  MISLEADING
  UNVERIFIABLE
}

model FactCheckVote {
  id            String     @id @default(cuid())
  userId        String
  user          User       @relation(fields: [userId], references: [id])
  factCheckId   String
  factCheck     FactCheck  @relation(fields: [factCheckId], references: [id])
  
  agrees        Boolean    // agree with verdict
  
  createdAt     DateTime   @default(now())
  
  @@unique([userId, factCheckId])
}

// ==================== COMMUNITY ====================

model Tribe {
  id            String            @id @default(cuid())
  
  name          String
  description   String            @db.Text
  icon          String?
  color         String?
  
  // Criteria (auto-generated based on DNA)
  criteria      Json              // {economic: [min, max], ...}
  
  // Stats
  memberCount   Int               @default(0)
  
  members       TribeMembership[]
  posts         Post[]
  
  createdAt     DateTime          @default(now())
  updatedAt     DateTime          @updatedAt
  
  @@index([memberCount])
}

model TribeMembership {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  tribeId       String
  tribe         Tribe     @relation(fields: [tribeId], references: [id])
  
  role          TribeRole @default(MEMBER)
  
  joinedAt      DateTime  @default(now())
  
  @@unique([userId, tribeId])
}

enum TribeRole {
  MEMBER
  MODERATOR
  ADMIN
}

model Post {
  id            String     @id @default(cuid())
  userId        String
  user          User       @relation(fields: [userId], references: [id])
  tribeId       String?
  tribe         Tribe?     @relation(fields: [tribeId], references: [id])
  
  content       String     @db.Text
  type          PostType   @default(TEXT)
  media         Json?      // Array of {type, url}
  
  // Engagement
  likes         Int        @default(0)
  comments      Comment[]
  
  // Moderation
  flagged       Boolean    @default(false)
  removed       Boolean    @default(false)
  
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  
  @@index([userId])
  @@index([tribeId])
  @@index([createdAt])
}

enum PostType {
  TEXT
  POLL
  SHARE_DNA
  SHARE_MATCH
  SHARE_FACTCHECK
}

model Comment {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  postId        String
  post          Post      @relation(fields: [postId], references: [id])
  parentId      String?   // for nested comments
  
  content       String    @db.Text
  
  likes         Int       @default(0)
  
  flagged       Boolean   @default(false)
  removed       Boolean   @default(false)
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([postId])
  @@index([userId])
}

// ==================== GAMIFICATION ====================

model Achievement {
  id            String              @id @default(cuid())
  
  key           String              @unique // "dna_complete"
  name          String
  description   String
  icon          String
  rarity        Rarity
  xp            Int
  
  users         UserAchievement[]
  
  createdAt     DateTime            @default(now())
}

enum Rarity {
  COMMON
  UNCOMMON
  RARE
  EPIC
  LEGENDARY
}

model UserAchievement {
  id              String       @id @default(cuid())
  userId          String
  user            User         @relation(fields: [userId], references: [id])
  achievementId   String
  achievement     Achievement  @relation(fields: [achievementId], references: [id])
  
  unlockedAt      DateTime     @default(now())
  
  @@unique([userId, achievementId])
}

model Referral {
  id            String    @id @default(cuid())
  referrerId    String
  referrer      User      @relation(fields: [referrerId], references: [id])
  
  code          String    @unique
  
  // Stats
  clicks        Int       @default(0)
  signups       Int       @default(0)
  conversions   Int       @default(0)
  
  createdAt     DateTime  @default(now())
  
  @@index([referrerId])
  @@index([code])
}

// ==================== ANALYTICS ====================

model Event {
  id            String    @id @default(cuid())
  userId        String?
  
  name          String    // "dna_test_completed"
  properties    Json?
  
  // Session
  sessionId     String?
  
  // Device
  platform      String?   // ios, android, web
  appVersion    String?
  
  createdAt     DateTime  @default(now())
  
  @@index([name])
  @@index([userId])
  @@index([createdAt])
}

// ==================== BACKGROUND JOBS ====================

model Job {
  id            String      @id @default(cuid())
  
  type          JobType
  status        JobStatus   @default(PENDING)
  
  data          Json
  result        Json?
  error         String?     @db.Text
  
  attempts      Int         @default(0)
  maxAttempts   Int         @default(3)
  
  scheduledFor  DateTime    @default(now())
  startedAt     DateTime?
  completedAt   DateTime?
  
  createdAt     DateTime    @default(now())
  
  @@index([type, status])
  @@index([scheduledFor])
}

enum JobType {
  CALCULATE_MATCHES
  GENERATE_SUMMARY
  SEND_EMAIL
  UPDATE_TRUTH_SCORE
  PROCESS_FACTCHECK
  GENERATE_SHAREABLE
}

enum JobStatus {
  PENDING
  RUNNING
  COMPLETED
  FAILED
  CANCELLED
}
```