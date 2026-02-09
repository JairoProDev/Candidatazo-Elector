### **ETAPA 2: FACT-CHECKING & AI FEATURES (Día 8-12)**
#### **2.1 - Fact-Check Data Scraping**
```typescript
// scripts/scrape-factchecks.ts
import { JSDOM } from 'jsdom';

// Scrape from OjoPúblico, JNE, etc.
async function scrapeFact Checks() {
  const sources = [
    'https://ojo-publico.com/fact-check',
    'https://factchecking.jne.gob.pe'
  ];
  
  for (const url of sources) {
    const html = await fetch(url).then(r => r.text());
    const dom = new JSDOM(html);
    
    // Extract fact-checks
    const factchecks = Array.from(dom.window.document.querySelectorAll('.factcheck')).map(el => ({
      claim: el.querySelector('.claim').textContent,
      verdict: parseVerdict(el.querySelector('.verdict').textContent),
      explanation: el.querySelector('.explanation').textContent,
      sources: Array.from(el.querySelectorAll('.source')).map(s => ({
        title: s.textContent,
        url: s.href
      }))
    }));
    
    // Save to DB
    await prisma.factCheck.createMany({ data: factchecks });
  }
}
```

#### **2.2 - AI Fact-Check Generator**
```typescript
// api/routes/factcheck.ts
fastify.post('/factchecks/generate', async (request, reply) => {
  const { claim, candidateId } = request.body;
  
  // Rate limit check
  const canUseAI = await aiRateLimiter.checkLimit(request.user.id, 'factcheck');
  if (!canUseAI) {
    return reply.code(429).send({ error: 'Rate limit exceeded' });
  }
  
  // Generate with Gemini
  const result = await geminiService.generateFactCheck(claim);
  
  // Save to DB
  const factcheck = await prisma.factCheck.create({
    data: {
      candidateId,
      claim,
      verdict: result.verdict,
      explanation: result.explanation,
      sources: result.sources,
      confidence: result.confidence,
      aiGenerated: true
    }
  });
  
  // Track usage
  await geminiService.trackUsage('factcheck', 500, 800);
  
  return factcheck;
});
```

#### **2.3 - Live Debate Fact-Checking**
```typescript
// screens/DebateLiveScreen.tsx
export function DebateLiveScreen() {
  const [factchecks, setFactchecks] = useState([]);
  
  // WebSocket connection
  useEffect(() => {
    const ws = new WebSocket('wss://api.gobapp.pe/debates/live');
    
    ws.onmessage = (event) => {
      const factcheck = JSON.parse(event.data);
      setFactchecks(prev => [factcheck, ...prev]);
    };
    
    return () => ws.close();
  }, []);
  
  return (
    <View>
      {/* Video stream */}
      <Video source={{ uri: debateStreamUrl }} />
      
      {/* Real-time fact-checks */}
      <ScrollView>
        {factchecks.map(fc => (
          <FactCheckCard
            key={fc.id}
            factcheck={fc}
            onVote={(agrees) => voteOnFactCheck(fc.id, agrees)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
```

#### **2.4 - AI Candidate Chat**
```typescript
// screens/CandidateChatScreen.tsx
export function CandidateChatScreen({ route }) {
  const { candidateId } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const sendMessage = async () => {
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      const response = await api.post('/ai/debate', {
        candidateId,
        message: input,
        history: messages
      });
      
      const aiMessage = { role: 'assistant', content: response.data.message };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      // Handle rate limit
      if (error.status === 429) {
        Alert.alert('Límite alcanzado', 'Actualiza a Premium para más chats con IA');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageBubble message={item} />
        )}
      />
      
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Pregunta algo al candidato..."
      />
      
      <Button onPress={sendMessage} disabled={loading}>
        {loading ? 'Pensando...' : 'Enviar'}
      </Button>
    </View>
  );
}
```

---