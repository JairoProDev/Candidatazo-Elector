# 6. FEATURES DETALLADAS - ESPECIFICACIONES COMPLETAS

## 6.1 - Onboarding Flow

**Objetivo:** 80%+ de instalaciones completan onboarding

**Paso 1: Splash Screen (2 segundos)**
```
Logo animado de Candidatazo
Tagline: "Tu match político en 5 minutos"
```

**Paso 2: Benefit Screens (3 screens, swipeable)**

Screen 1:
```
🧬 DESCUBRE TU DNA POLÍTICO
Test de 5 minutos te dice con qué 
candidato tienes más match

[Siguiente →]
```

Screen 2:
```
✅ VERIFICA TODO
Fact-checking automático de promesas
y propuestas

[Siguiente →]
```

Screen 3:
```
💬 DEBATE CON SENTIDO
No más trolls. Solo debates 
estructurados y civilizados

[Empezar DNA Test →]
```

**Paso 3: Login (Social Auth)**
```
┌───────────────────────────────┐
│  Regístrate en segundos       │
│                               │
│  [Continuar con Google]       │
│  [Continuar con Facebook]     │
│  [Continuar con Apple]        │
│                               │
│  ────── o ──────              │
│                               │
│  [Email]                      │
│                               │
│  ✓ Al registrarte aceptas     │
│    Términos y Privacidad      │
└───────────────────────────────┘
```

**Por Qué Social Auth:**
- Friction mínimo
- No recordar passwords
- Profile pic automático
- Viral (conexiones de Google/FB)

**Paso 4: Permis os (Opcionales)**
```
Notificaciones: "Para avisarte de debates en vivo"
[Permitir] [Después]

Contactos: "Para encontrar amigos en Candidatazo"
[Permitir] [Después]
```

**CRITICAL: Todo opcional, no bloquea el flow**

---

## 6.2 - DNA Test - Specs Técnicas Completas

### Database Schema

```sql
CREATE TABLE dna_tests (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    completed BOOLEAN DEFAULT FALSE,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    
    -- Scores (0-100 each)
    economic_score INTEGER,
    social_score INTEGER,
    political_score INTEGER,
    environmental_score INTEGER,
    
    -- Metadata
    version INTEGER, -- Test version (for updates)
    time_taken_seconds INTEGER,
    
    UNIQUE(user_id, version)
);

CREATE TABLE dna_answers (
    id UUID PRIMARY KEY,
    test_id UUID REFERENCES dna_tests(id),
    question_id INTEGER,
    answer_value INTEGER, -- 1-5 scale
    time_taken_seconds INTEGER,
    skipped BOOLEAN DEFAULT FALSE
);
```

### Algorithm

**Calculating Scores:**

```javascript
function calculateDNAScore(answers) {
    const categories = {
        economic: [1, 2, 3, 4, 5],      // Question IDs
        social: [6, 7, 8, 9, 10],
        political: [11, 12, 13, 14, 15],
        environmental: [16, 17, 18, 19, 20]
    };
    
    const scores = {};
    
    for (const [category, questionIds] of Object.entries(categories)) {
        const relevantAnswers = answers.filter(a => 
            questionIds.includes(a.question_id) && !a.skipped
        );
        
        if (relevantAnswers.length === 0) {
            scores[category] = 50; // Neutral if no answers
            continue;
        }
        
        // Average of answers, scaled to 0-100
        const sum = relevantAnswers.reduce((acc, a) => acc + a.answer_value, 0);
        const avg = sum / relevantAnswers.length; // 1-5
        scores[category] = ((avg - 1) / 4) * 100; // Scale to 0-100
    }
    
    return scores;
}
```

**Generating Profile Label:**

```javascript
function generateProfileLabel(scores) {
    let label = "";
    
    // Economic axis
    if (scores.economic < 35) label += "Izquierda";
    else if (scores.economic > 65) label += "Derecha";
    else label += "Centro";
    
    // Social modifier
    if (scores.social > 60) label += " Progresista";
    else if (scores.social < 40) label += " Conservador";
    
    // Environmental modifier
    if (scores.environmental > 70) label += " Verde";
    
    return label || "Centro Pragmático";
}
```

### Visual Generation

**Radar Chart for DNA Result:**

Using Chart.js or similar:

```javascript
const radarData = {
    labels: ['Económico', 'Social', 'Político', 'Ambiental'],
    datasets: [{
        label: 'Tu DNA Político',
        data: [
            scores.economic,
            scores.social,
            scores.political,
            scores.environmental
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
    }]
};
```

**Shareable Image Generation:**

API endpoint: `POST /api/dna/generate-share-image`

Response: Image URL (uploaded to S3/Supabase Storage)

Specs:
- 1080x1920px (Instagram Stories)
- Radar chart centered
- Profile label as headline
- User name
- Watermark: "candidatazo.com"
- Brand colors

---

## 6.3 - Matching Algorithm - Specs Completas

### Candidate Data Schema

```sql
CREATE TABLE candidates (
    id UUID PRIMARY KEY,
    full_name VARCHAR(255),
    party VARCHAR(255),
    photo_url TEXT,
    
    -- DNA scores (curated by editorial team)
    economic_score INTEGER,
    social_score INTEGER,
    political_score INTEGER,
    environmental_score INTEGER,
    
    -- Metadata
    biografia TEXT,
    plan_gobierno_url TEXT,
    website_url TEXT,
    social_media JSONB, -- {twitter: "@...", instagram: "@..."}
    
    -- Fact-checking
    promesas_cumplidas INTEGER DEFAULT 0,
    promesas_incumplidas INTEGER DEFAULT 0,
    
    -- Status
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Matching Algorithm

```javascript
async function calculateMatch(userId, candidateId) {
    const userTest = await getDNATest(userId);
    const candidate = await getCandidate(candidateId);
    
    if (!userTest.completed) return null;
    
    // Weighted similarity
    const weights = {
        economic: 0.30,
        social: 0.25,
        political: 0.25,
        environmental: 0.20
    };
    
    let totalMatch = 0;
    
    for (const [dimension, weight] of Object.entries(weights)) {
        const userScore = userTest[`${dimension}_score`];
        const candidateScore = candidate[`${dimension}_score`];
        
        // Similarity: 100 - absolute difference
        const similarity = 100 - Math.abs(userScore - candidateScore);
        
        totalMatch += similarity * weight;
    }
    
    // Round to integer
    return Math.round(totalMatch);
}
```

**Example:**

User scores: {economic: 70, social: 45, political: 61, environmental: 82}
Candidate scores: {economic: 85, social: 30, political: 55, environmental: 90}

```
Economic match: 100 - |70-85| = 85
Social match: 100 - |45-30| = 85  
Political match: 100 - |61-55| = 94
Environmental match: 100 - |82-90| = 92

Total: (85*0.30) + (85*0.25) + (94*0.25) + (92*0.20)
     = 25.5 + 21.25 + 23.5 + 18.4
     = 88.65
     ≈ 89% match
```

---

## 6.4 - Feed Algorithm - Complete Specs

### Post Schema

```sql
CREATE TABLE posts (
    id UUID PRIMARY KEY,
    author_id UUID REFERENCES users(id),
    content TEXT,
    post_type VARCHAR(50), -- 'text', 'analysis', 'fact_check', 'poll', 'proposal'
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    edited_at TIMESTAMP,
    
    -- Engagement
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    
    -- Moderation
    flagged BOOLEAN DEFAULT FALSE,
    removed BOOLEAN DEFAULT FALSE,
    
    -- Targeting
    tribe_ids UUID[], -- If posted to specific tribes
    
    -- Fact-checking (if applicable)
    factcheck_status VARCHAR(50), -- 'pending', 'verified', 'false', etc.
    factcheck_score INTEGER, -- 0-100
    
    INDEX(created_at),
    INDEX(author_id),
    INDEX(flagged)
);
```

### Feed Generation Algorithm

```javascript
async function generateFeed(userId, limit = 20, offset = 0) {
    const user = await getUser(userId);
    const userDNA = await getDNATest(userId);
    const userTribes = await getUserTribes(userId);
    
    // Get candidate posts from different sources
    const candidatePosts = [];
    
    // 1. Tribe posts (40%)
    const tribePosts = await getPostsFromTribes(userTribes, Math.floor(limit * 0.4));
    candidatePosts.push(...tribePosts.map(p => ({...p, source: 'tribe'})));
    
    // 2. Similar DNA posts (25%)
    const similarDNAPosts = await getPostsFromSimilarUsers(userDNA, Math.floor(limit * 0.25));
    candidatePosts.push(...similarDNAPosts.map(p => ({...p, source: 'similar_dna'})));
    
    // 3. Trending (20%)
    const trendingPosts = await getTrendingPosts(Math.floor(limit * 0.20));
    candidatePosts.push(...trendingPosts.map(p => ({...p, source: 'trending'})));
    
    // 4. Followed candidates (10%)
    const candidatePosts = await getPostsFromFollowedCandidates(userId, Math.floor(limit * 0.10));
    candidatePosts.push(...candidatePosts.map(p => ({...p, source: 'candidate'})));
    
    // 5. Opposing viewpoints (5%) - ANTI-ECHO CHAMBER
    const opposingPosts = await getPostsFromOpposingViews(userDNA, Math.floor(limit * 0.05));
    candidatePosts.push(...opposingPosts.map(p => ({...p, source: 'opposing'})));
    
    // Score each post
    const scoredPosts = candidatePosts.map(post => ({
        ...post,
        score: calculateFeedScore(user, userDNA, post)
    }));
    
    // Sort by score, apply diversity filter
    const rankedPosts = scoredPosts
        .sort((a, b) => b.score - a.score)
        .filter(diversityFilter); // No more than 2 posts from same author in top 20
    
    return rankedPosts.slice(offset, offset + limit);
}

function calculateFeedScore(user, userDNA, post) {
    const postAuthorDNA = post.author.dna_test;
    
    // Ideological match
    const ideoMatch = calculateDNASimilarity(userDNA, postAuthorDNA) / 100; // 0-1
    
    // Engagement rate
    const engagementRate = (post.likes_count + post.comments_count * 2 + post.shares_count * 3) 
                         / Math.max(1, post.author.followers_count);
    
    // Recency (decay function)
    const hoursSincePost = (Date.now() - post.created_at) / (1000 * 60 * 60);
    const recencyScore = Math.max(0, 1 - (hoursSincePost / 48)); // Decay over 48 hours
    
    // Fact-check score (if applicable)
    const factCheckBonus = post.factcheck_status === 'verified' ? 1.2 : 1.0;
    
    // Diversity bonus (for opposing views)
    const diversityBonus = post.source === 'opposing' ? 1.15 : 1.0;
    
    // Past interactions with this author
    const authorInteractionScore = user.interactions[post.author_id] || 0;
    
    // Weighted combination
    return (
        ideoMatch * 0.30 +
        engagementRate * 0.20 +
        recencyScore * 0.15 +
        authorInteractionScore * 0.10
    ) * factCheckBonus * diversityBonus;
}
```

**Anti-Echo Chamber Mechanism:**

```javascript
async function getPostsFromOpposingViews(userDNA, limit) {
    // Find users with opposite DNA
    const opposingUsers = await db.query(`
        SELECT u.id, u.dna_test
        FROM users u
        WHERE (
            ABS(u.dna_test->>'economic_score' - $1) > 40 OR
            ABS(u.dna_test->>'social_score' - $2) > 40
        )
        AND u.post_count > 5
        ORDER BY RANDOM()
        LIMIT 100
    `, [userDNA.economic_score, userDNA.social_score]);
    
    // Get their recent quality posts
    const posts = await getPostsFromUsers(opposingUsers.map(u => u.id), {
        factcheck_status: 'verified', // Only verified posts from opposing views
        min_engagement: 10,
        limit
    });
    
    return posts;
}
```