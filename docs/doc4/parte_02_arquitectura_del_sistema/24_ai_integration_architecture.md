### **2.4 - AI INTEGRATION ARCHITECTURE**
**Gemini API Wrapper Service:**

```typescript
// services/gemini.service.ts

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export class GeminiService {
  
  // DNA Test Personalization
  async generatePersonalizedSummary(scores: DnaScores): Promise<string> {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });
    
    const prompt = `
Eres un analista político peruano. Basado en este perfil político:
- Economía: ${scores.economic}% liberal
- Social: ${scores.social}% progresista
- Ambiente: ${scores.environment}% conservacionista
- Seguridad: ${scores.security}% mano dura
- Institucional: ${scores.institutional}% reformista

Genera un resumen de 2-3 párrafos que:
1. Describe la orientación política general
2. Identifica contradicciones interesantes
3. Sugiere qué tipo de candidato podría resonar

Tono: amigable, conversacional, sin jerga académica.
    `;
    
    const result = await model.generateContent(prompt);
    return result.response.text();
  }
  
  // Candidate AI Chat
  async simulateCandidateResponse(
    candidateId: string,
    userMessage: string,
    conversationHistory: Message[]
  ): Promise<string> {
    
    // Get candidate data
    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
      include: { promises: true }
    });
    
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 300,
      },
      systemInstruction: `
Eres ${candidate.name}, candidato presidencial de ${candidate.party}.

Tu plataforma:
${candidate.planSummary}

Tus promesas clave:
${candidate.promises.map(p => `- ${p.title}`).join('\n')}

Tu postura política:
- Económica: ${candidate.positions.economic > 0 ? 'Liberal' : 'Intervencionista'}
- Social: ${candidate.positions.social > 0 ? 'Progresista' : 'Conservador'}

Responde como este candidato respondería:
- Usa su vocabulario y estilo
- Mantén coherencia con sus posiciones
- Si no sabes algo, admítelo
- Máximo 100 palabras por respuesta
- Tono conversacional
      `
    });
    
    const chat = model.startChat({
      history: conversationHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }))
    });
    
    const result = await chat.sendMessage(userMessage);
    return result.response.text();
  }
  
  // Fact-Check Automation
  async generateFactCheck(claim: string): Promise<FactCheckResult> {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'object',
          properties: {
            verdict: { 
              type: 'string', 
              enum: ['TRUE', 'MOSTLY_TRUE', 'HALF_TRUE', 'MOSTLY_FALSE', 'FALSE', 'MISLEADING']
            },
            explanation: { type: 'string' },
            sources: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  url: { type: 'string' },
                  snippet: { type: 'string' }
                }
              }
            },
            confidence: { type: 'number' }
          }
        }
      }
    });
    
    const prompt = `
Verifica esta afirmación hecha por un candidato político peruano:

"${claim}"

Busca en fuentes confiables (BCRP, INEI, MINEDU, reportes oficiales).
Proporciona un veredicto basado en evidencia.
    `;
    
    const result = await model.generateContent(prompt);
    const json = JSON.parse(result.response.text());
    
    return {
      verdict: json.verdict,
      explanation: json.explanation,
      sources: json.sources,
      confidence: json.confidence,
      aiGenerated: true
    };
  }
  
  // Semantic Search with Embeddings
  async getEmbedding(text: string): Promise<number[]> {
    const model = genAI.getGenerativeModel({ 
      model: 'text-embedding-004' 
    });
    
    const result = await model.embedContent(text);
    return result.embedding.values;
  }
  
  // Batch embeddings for matching
  async calculateSimilarity(
    userEmbedding: number[],
    candidateEmbeddings: CandidateEmbedding[]
  ): Promise<Match[]> {
    // Cosine similarity
    return candidateEmbeddings.map(ce => ({
      candidateId: ce.id,
      score: cosineSimilarity(userEmbedding, ce.embedding)
    })).sort((a, b) => b.score - a.score);
  }
  
  // Cost tracking
  async trackUsage(
    operation: string,
    inputTokens: number,
    outputTokens: number
  ) {
    const cost = (inputTokens * 0.075 + outputTokens * 0.30) / 1_000_000;
    
    await prisma.aiUsage.create({
      data: {
        operation,
        inputTokens,
        outputTokens,
        cost,
        model: 'gemini-2.0-flash'
      }
    });
  }
}

// Rate limiting for AI
export class AIRateLimiter {
  private redis: Redis;
  
  async checkLimit(userId: string, operation: string): Promise<boolean> {
    const key = `ai:${operation}:${userId}`;
    const limit = this.getLimitForUser(userId, operation);
    
    const current = await this.redis.incr(key);
    
    if (current === 1) {
      await this.redis.expire(key, limit.window);
    }
    
    return current <= limit.requests;
  }
  
  private getLimitForUser(userId: string, operation: string) {
    const user = await getUserPlan(userId);
    
    if (user.premium) {
      return { requests: 100, window: 86400 }; // 100/day
    }
    return { requests: 10, window: 86400 }; // 10/day
  }
}
```

---