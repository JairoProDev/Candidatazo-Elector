### **ETAPA 4: MONETIZATION & PREMIUM (Día 18-22)**
#### **4.1 - Premium Features**
```typescript
// Paywall component
export function PaywallModal({ feature }) {
  const user = useUser();
  
  if (user.premium) return null;
  
  const features = {
    'ai_chat': {
      title: 'Chats ilimitados con IA',
      description: 'Habla con versiones IA de todos los candidatos sin límite',
      included: ['Premium']
    },
    'advanced_analysis': {
      title: 'Análisis político profundo',
      description: 'Reportes semanales personalizados de tu perfil político',
      included: ['Premium']
    },
    'no_ads': {
      title: 'Sin publicidad',
      description: 'Experiencia libre de anuncios',
      included: ['Premium']
    }
  };
  
  return (
    <Modal>
      <Text variant="headlineMedium">
        {features[feature].title}
      </Text>
      <Text>{features[feature].description}</Text>
      
      <PricingCards />
      
      <Button onPress={upgradeToPremium}>
        Actualizar a Premium
      </Button>
    </Modal>
  );
}
```

#### **4.2 - Payment Integration (Mercado Pago)**
```typescript
// api/routes/payments.ts
fastify.post('/payments/create-preference', async (request, reply) => {
  const { plan } = request.body; // 'monthly' or 'annual'
  const userId = request.user.id;
  
  const prices = {
    monthly: 9.90,
    annual: 49.90
  };
  
  const preference = await mercadopago.preferences.create({
    items: [
      {
        title: `GobApp Premium - ${plan}`,
        quantity: 1,
        unit_price: prices[plan],
        currency_id: 'PEN'
      }
    ],
    back_urls: {
      success: `https://gobapp.pe/payment/success`,
      failure: `https://gobapp.pe/payment/failure`,
      pending: `https://gobapp.pe/payment/pending`
    },
    auto_return: 'approved',
    metadata: {
      user_id: userId,
      plan
    }
  });
  
  return { preferenceId: preference.id };
});

// Webhook
fastify.post('/webhooks/mercadopago', async (request, reply) => {
  const { type, data } = request.body;
  
  if (type === 'payment') {
    const payment = await mercadopago.payment.get(data.id);
    
    if (payment.status === 'approved') {
      const userId = payment.metadata.user_id;
      const plan = payment.metadata.plan;
      
      const durationDays = plan === 'monthly' ? 30 : 365;
      
      await prisma.user.update({
        where: { id: userId },
        data: {
          premium: true,
          premiumUntil: new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000)
        }
      });
      
      // Send confirmation email
      await emailService.send({
        to: payment.payer.email,
        subject: '¡Bienvenido a GobApp Premium!',
        template: 'premium-activated',
        data: { plan }
      });
    }
  }
  
  return { received: true };
});
```

#### **4.3 - Analytics & Revenue Tracking**
```typescript
// services/analytics.service.ts
export class AnalyticsService {
  
  async trackEvent(userId: string, eventName: string, properties: any) {
    // PostHog
    await posthog.capture({
      distinctId: userId,
      event: eventName,
      properties
    });
    
    // Internal DB
    await prisma.event.create({
      data: {
        userId,
        name: eventName,
        properties,
        platform: properties.platform,
        appVersion: properties.appVersion
      }
    });
  }
  
  async trackRevenue(userId: string, amount: number, source: string) {
    await this.trackEvent(userId, 'revenue', {
      amount,
      currency: 'PEN',
      source // 'premium_subscription', 'political_ad', etc
    });
    
    // Update internal metrics
    await prisma.revenueMetric.create({
      data: {
        userId,
        amount,
        source,
        date: new Date()
      }
    });
  }
  
  // Cohort analysis
  async getCohortRetention(cohortMonth: string) {
    const cohortUsers = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: new Date(`${cohortMonth}-01`),
          lt: new Date(`${cohortMonth}-31`)
        }
      }
    });
    
    const retention = {};
    
    for (let week = 0; week < 12; week++) {
      const weekStart = new Date(`${cohortMonth}-01`);
      weekStart.setDate(weekStart.getDate() + week * 7);
      
      const activeUsers = await prisma.event.groupBy({
        by: ['userId'],
        where: {
          userId: { in: cohortUsers.map(u => u.id) },
          createdAt: {
            gte: weekStart,
            lt: new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000)
          }
        }
      });
      
      retention[`week_${week}`] = (activeUsers.length / cohortUsers.length) * 100;
    }
    
    return retention;
  }
}
```

---