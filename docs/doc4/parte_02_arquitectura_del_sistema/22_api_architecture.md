### **2.2 - API ARCHITECTURE**
**RESTful API Design**

```
Base URL: https://api.gobapp.pe/v1

Estructura:
/auth          - Authentication
/users         - User management
/dna           - Political DNA tests
/candidates    - Candidate info
/matches       - Matching algorithm
/factchecks    - Fact-checking
/debates       - Live debates
/tribes        - Communities
/achievements  - Gamification
/feed          - Personalized feed
/analytics     - User analytics
```

**Endpoint Examples:**

```typescript
// DNA Test
POST   /dna/start           // Start new test
GET    /dna/:id             // Get test progress
POST   /dna/:id/answer      // Submit answer
POST   /dna/:id/complete    // Finalize test
GET    /dna/:id/results     // Get results

// Matching
POST   /matches/calculate   // Calculate matches
GET    /matches/top         // Get top matches
GET    /matches/:candidateId/details // Deep comparison

// Fact-Checks
GET    /factchecks          // List fact-checks
GET    /factchecks/:id      // Single fact-check
POST   /factchecks/:id/vote // Community vote
POST   /factchecks/request  // Request fact-check

// AI Features
POST   /ai/debate           // Chat with AI candidate
POST   /ai/summarize        // Summarize plan
POST   /ai/explain          // Explain position
```

**Authentication Flow:**

```
1. User signs up/in via Clerk
2. Clerk returns JWT
3. Mobile app stores JWT in secure storage
4. Every API request includes:
   Authorization: Bearer <JWT>
5. API validates JWT with Clerk
6. Extract user_id from claims
7. Proceed with request
```

**Rate Limiting:**

```typescript
// Redis-based rate limiting
const limits = {
  anonymous: {
    requests: 100,
    window: '15m'
  },
  authenticated: {
    requests: 1000,
    window: '15m'
  },
  premium: {
    requests: 10000,
    window: '15m'
  }
}

// AI endpoints (expensive)
const aiLimits = {
  free: {
    requests: 10,
    window: '1d'
  },
  premium: {
    requests: 100,
    window: '1d'
  }
}
```