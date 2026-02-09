### **4.2 - Content Moderation**
```typescript
// AI-powered moderation
import Perspective from 'perspective-api-client';

const perspective = new Perspective({ apiKey: process.env.PERSPECTIVE_API_KEY });

async function moderateContent(text: string) {
  const result = await perspective.analyze(text, {
    attributes: [
      'TOXICITY',
      'SEVERE_TOXICITY',
      'IDENTITY_ATTACK',
      'INSULT',
      'PROFANITY',
      'THREAT'
    ]
  });
  
  const scores = result.attributeScores;
  
  // Flag if any score > 0.7
  const flagged = Object.values(scores).some((attr: any) => 
    attr.summaryScore.value > 0.7
  );
  
  return {
    flagged,
    scores: Object.entries(scores).reduce((acc, [key, val]: any) => ({
      ...acc,
      [key]: val.summaryScore.value
    }), {})
  };
}

// Apply before posting
fastify.post('/posts', async (request, reply) => {
  const { content } = request.body;
  
  const moderation = await moderateContent(content);
  
  if (moderation.flagged) {
    return reply.code(400).send({
      error: 'Content violates community guidelines',
      details: moderation.scores
    });
  }
  
  // Create post...
});
```

---