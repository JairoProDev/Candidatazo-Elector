### **5.2 - Key Metrics Dashboard**
```typescript
// Analytics dashboard queries
export const metrics = {
  
  // Acquisition
  async getSignups(period: string) {
    return prisma.user.count({
      where: {
        createdAt: { gte: getPeriodStart(period) }
      }
    });
  },
  
  // Activation
  async getDnaCompletionRate() {
    const total = await prisma.user.count();
    const completed = await prisma.dnaTest.count({
      where: { status: 'COMPLETED' }
    });
    
    return (completed / total) * 100;
  },
  
  // Retention
  async getWAU() {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    return prisma.event.findMany({
      where: {
        createdAt: { gte: weekAgo }
      },
      distinct: ['userId']
    }).then(events => events.length);
  },
  
  // Revenue
  async getMRR() {
    const monthlySubscribers = await prisma.user.count({
      where: {
        premium: true,
        premiumUntil: { gte: new Date() }
      }
    });
    
    return monthlySubscribers * 9.90; // Assuming all monthly
  },
  
  // Referral
  async getViralCoefficient() {
    const totalUsers = await prisma.user.count();
    const totalReferrals = await prisma.referral.sum({
      _sum: { signups: true }
    });
    
    return totalReferrals._sum.signups / totalUsers;
  }
};
```