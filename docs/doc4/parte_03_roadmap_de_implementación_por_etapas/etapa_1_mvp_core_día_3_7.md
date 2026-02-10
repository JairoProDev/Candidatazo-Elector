### **ETAPA 1: MVP CORE (Día 3-7)**
**Objetivo:** Political ADN Test + Candidate Matching + Basic Sharing

#### **1.1 - Database Schema & Seed**
```bash
# Migrate
npx prisma migrate dev --name init

# Seed candidates
npx prisma db seed
```

**Seed data:**
```typescript
// prisma/seed.ts
const candidates = [
  {
    name: "María González",
    party: "Fuerza Popular",
    photo: "https://...",
    positions: {
      economic: 75,      // 0-100, 100 = muy liberal
      social: -30,       // -100 a 100
      environment: 20,
      security: 80,
      institutional: 40
    },
    promises: [
      {
        title: "Reducir impuestos empresariales 20%",
        category: "ECONOMY"
      },
      // ... más promesas
    ]
  },
  // ... 35 candidatos más
];

await prisma.candidate.createMany({ data: candidates });
```

#### **1.2 - Auth Implementation**
```typescript
// apps/mobile/App.tsx
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_KEY}>
      <SignedIn>
        <MainNavigator />
      </SignedIn>
      <SignedOut>
        <AuthScreen />
      </SignedOut>
    </ClerkProvider>
  );
}
```

#### **1.3 - ADN Test Flow**

**Questions Data:**
```typescript
// data/questions.ts
export const dnaQuestions = [
  {
    id: 'econ_1',
    category: 'economic',
    text: '¿El Estado debería controlar los precios de productos básicos?',
    options: [
      { value: -100, label: 'Totalmente de acuerdo' },
      { value: -50, label: 'De acuerdo' },
      { value: 0, label: 'Neutral' },
      { value: 50, label: 'En desacuerdo' },
      { value: 100, label: 'Totalmente en desacuerdo' }
    ],
    explanation: 'Esta pregunta mide tu postura sobre intervención estatal en economía.'
  },
  // ... 29 más
];
```

**UI Components:**
```typescript
// screens/DnaTestScreen.tsx
export function DnaTestScreen() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  
  const handleAnswer = (value: number) => {
    setAnswers([...answers, { 
      questionId: questions[currentQ].id,
      value,
      importance: 'high' // TODO: add importance selector
    }]);
    
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Complete test
      completeTest();
    }
  };
  
  return (
    <View>
      <Progress value={(currentQ / 30) * 100} />
      
      <Question
        question={questions[currentQ]}
        onAnswer={handleAnswer}
      />
      
      <Button onPress={() => setCurrentQ(currentQ - 1)}>
        Atrás
      </Button>
    </View>
  );
}
```

**Algorithm:**
```typescript
// services/matching.service.ts
export class MatchingService {
  
  calculateDnaScores(answers: Answer[]): DnaScores {
    const categories = ['economic', 'social', 'environment', 'security', 'institutional'];
    
    const scores = {};
    
    categories.forEach(cat => {
      const catAnswers = answers.filter(a => 
        questions.find(q => q.id === a.questionId)?.category === cat
      );
      
      const avg = catAnswers.reduce((sum, a) => sum + a.value, 0) / catAnswers.length;
      
      // Normalize to 0-100
      scores[cat] = ((avg + 100) / 2);
    });
    
    return scores;
  }
  
  async calculateMatches(userId: string): Promise<Match[]> {
    const dnaTest = await prisma.dnaTest.findFirst({
      where: { userId, status: 'COMPLETED' }
    });
    
    const candidates = await prisma.candidate.findMany();
    
    const matches = candidates.map(candidate => {
      const score = this.calculateMatchScore(
        dnaTest.scores,
        candidate.positions
      );
      
      return {
        userId,
        candidateId: candidate.id,
        overallScore: score.overall,
        breakdown: score.breakdown,
        agreements: score.agreements,
        disagreements: score.disagreements
      };
    });
    
    // Save to DB
    await prisma.match.createMany({ data: matches });
    
    return matches.sort((a, b) => b.overallScore - a.overallScore);
  }
  
  private calculateMatchScore(userScores, candidatePositions) {
    const categories = Object.keys(userScores);
    
    const breakdown = {};
    const agreements = [];
    const disagreements = [];
    
    categories.forEach(cat => {
      const userVal = userScores[cat];
      const candVal = ((candidatePositions[cat] + 100) / 2); // normalize
      
      // Score: 100 - absolute difference
      const score = 100 - Math.abs(userVal - candVal);
      breakdown[cat] = score;
      
      if (score > 70) {
        agreements.push({
          category: cat,
          score,
          userPosition: userVal,
          candidatePosition: candVal
        });
      } else if (score < 40) {
        disagreements.push({
          category: cat,
          score,
          userPosition: userVal,
          candidatePosition: candVal
        });
      }
    });
    
    const overall = Object.values(breakdown).reduce((sum, s) => sum + s, 0) / categories.length;
    
    return {
      overall,
      breakdown,
      agreements,
      disagreements
    };
  }
}
```

#### **1.4 - Results Screen**
```typescript
// screens/ResultsScreen.tsx
export function ResultsScreen({ route }) {
  const { testId } = route.params;
  const { data: results } = useQuery(['dna-results', testId], 
    () => api.get(`/dna/${testId}/results`)
  );
  
  return (
    <ScrollView>
      {/* Radar Chart */}
      <VictoryChart polar>
        <VictoryPolarAxis />
        <VictoryArea
          data={Object.entries(results.scores).map(([key, val]) => ({
            x: key,
            y: val
          }))}
        />
      </VictoryChart>
      
      {/* Tribe */}
      <Card>
        <Text variant="headlineMedium">Tu Tribu Política</Text>
        <Text variant="titleLarge">{results.tribe}</Text>
        <Text>{results.summary}</Text>
      </Card>
      
      {/* Top Matches */}
      <Text variant="headlineSmall">Tus Top 3 Matches</Text>
      {results.topMatches.map(match => (
        <CandidateCard
          key={match.candidateId}
          candidate={match.candidate}
          score={match.overallScore}
        />
      ))}
      
      {/* Share Button */}
      <Button onPress={shareResults}>
        📤 Compartir Resultados
      </Button>
    </ScrollView>
  );
}
```

#### **1.5 - Shareable Image Generation**
```typescript
// services/shareable.service.ts
import { captureRef } from 'react-native-view-shot';

export async function generateShareableImage(results: DnaResults) {
  // Render special component
  const ShareableCard = () => (
    <View ref={viewRef} style={styles.shareable}>
      <Image source={require('./logo.png')} />
      <Text>MI ADN POLÍTICO</Text>
      <RadarChart data={results.scores} />
      <Text>{results.tribe}</Text>
      <QRCode value={`https://gobapp.pe/join/${results.userId}`} />
    </View>
  );
  
  // Capture as image
  const uri = await captureRef(viewRef, {
    format: 'png',
    quality: 1,
    width: 1080,
    height: 1920
  });
  
  return uri;
}

// Share
import * as Sharing from 'expo-sharing';

async function shareResults() {
  const imageUri = await generateShareableImage(results);
  
  await Sharing.shareAsync(imageUri, {
    mimeType: 'image/png',
    dialogTitle: 'Compartir mi ADN Político'
  });
}
```

#### **1.6 - API Endpoints (MVP)**
```typescript
// apps/api/src/routes/dna.ts
import { FastifyInstance } from 'fastify';

export async function dnaRoutes(fastify: FastifyInstance) {
  
  // Start test
  fastify.post('/dna/start', async (request, reply) => {
    const userId = request.user.id;
    
    const test = await prisma.dnaTest.create({
      data: {
        userId,
        status: 'IN_PROGRESS',
        answers: []
      }
    });
    
    return test;
  });
  
  // Submit answer
  fastify.post('/dna/:id/answer', async (request, reply) => {
    const { id } = request.params;
    const { questionId, value, importance } = request.body;
    
    const test = await prisma.dnaTest.findUnique({ where: { id } });
    
    const answers = [...test.answers, { questionId, value, importance }];
    
    await prisma.dnaTest.update({
      where: { id },
      data: {
        answers,
        currentStep: answers.length
      }
    });
    
    return { success: true };
  });
  
  // Complete test
  fastify.post('/dna/:id/complete', async (request, reply) => {
    const { id } = request.params;
    
    const test = await prisma.dnaTest.findUnique({ where: { id } });
    
    // Calculate scores
    const scores = matchingService.calculateDnaScores(test.answers);
    
    // Determine tribe
    const tribe = determineTribe(scores);
    
    // Generate AI summary
    const summary = await geminiService.generatePersonalizedSummary(scores);
    
    // Update test
    await prisma.dnaTest.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        scores,
        tribe,
        summary,
        completedAt: new Date()
      }
    });
    
    // Calculate matches (async job)
    await jobQueue.add('calculate-matches', { userId: test.userId });
    
    // Award XP
    await awardXP(test.userId, 500, 'dna_complete');
    
    return { success: true };
  });
  
  // Get results
  fastify.get('/dna/:id/results', async (request, reply) => {
    const { id } = request.params;
    
    const test = await prisma.dnaTest.findUnique({ where: { id } });
    
    const matches = await prisma.match.findMany({
      where: { userId: test.userId },
      orderBy: { overallScore: 'desc' },
      take: 5,
      include: { candidate: true }
    });
    
    return {
      ...test,
      topMatches: matches
    };
  });
}
```

---