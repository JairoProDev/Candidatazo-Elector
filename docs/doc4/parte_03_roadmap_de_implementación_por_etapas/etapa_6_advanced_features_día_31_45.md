### **ETAPA 6: ADVANCED FEATURES (Día 31-45)**
#### **6.1 - Promise Tracker (Post-Election)**

```typescript
// screens/PromiseTrackerScreen.tsx
export function PromiseTrackerScreen() {
  const [promises, setPromises] = useState([]);
  const [filter, setFilter] = useState('all'); // all, fulfilled, broken
  
  const { data } = useQuery(['promises', filter], () =>
    api.get(`/promises?status=${filter}`)
  );
  
  return (
    <View>
      <SegmentedButtons
        value={filter}
        onValueChange={setFilter}
        buttons={[
          { value: 'all', label: 'Todas' },
          { value: 'fulfilled', label: 'Cumplidas' },
          { value: 'broken', label: 'Rotas' }
        ]}
      />
      
      <FlatList
        data={data}
        renderItem={({ item: promise }) => (
          <PromiseCard
            promise={promise}
            onVote={(status) => voteOnPromise(promise.id, status)}
            onReportEvidence={() => reportEvidence(promise.id)}
          />
        )}
      />
    </View>
  );
}

// Community voting on promises
async function voteOnPromise(promiseId: string, status: PromiseStatus) {
  await api.post(`/promises/${promiseId}/vote`, { status });
  
  // Update optimistically
  queryClient.invalidateQueries(['promises']);
}
```

#### **6.2 - Regional Expansion (Multi-Election)**

```typescript
// Add to schema
model Election {
  id          String   @id @default(cuid())
  type        ElectionType
  country     String
  region      String?
  date        DateTime
  active      Boolean  @default(true)
  
  candidates  Candidate[]
  dnaTests    DnaTest[]
  
  createdAt   DateTime @default(now())
}

enum ElectionType {
  PRESIDENTIAL
  REGIONAL
  MUNICIPAL
  REFERENDUM
}

// Context-aware app
export function useCurrentElection() {
  const location = useUserLocation();
  
  return useQuery(['election', location], async () => {
    const elections = await api.get('/elections/active', {
      params: { country: 'PE', region: location.department }
    });
    
    // Priority: Regional > National
    return elections[0];
  });
}
```

#### **6.3 - White-Label Platform**

```typescript
// Multi-tenant architecture
model Tenant {
  id          String   @id @default(cuid())
  slug        String   @unique // 'peru', 'ecuador', 'colombia'
  name        String
  domain      String?  // gobapp.pe, gobapp.ec
  
  // Branding
  logo        String
  primaryColor String
  
  // Config
  config      Json     // currency, language, features
  
  elections   Election[]
  
  createdAt   DateTime @default(now())
}

// Middleware
fastify.addHook('onRequest', async (request, reply) => {
  const host = request.hostname;
  
  const tenant = await prisma.tenant.findFirst({
    where: {
      OR: [
        { domain: host },
        { slug: host.split('.')[0] }
      ]
    }
  });
  
  request.tenant = tenant;
});
```

#### **6.4 - Corruption Reporting System**

```typescript
// model
model CorruptionReport {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  title       String
  description String   @db.Text
  category    ReportCategory
  location    String
  
  // Evidence
  evidence    Json     // URLs, documents, photos
  
  // Verification
  verified    Boolean  @default(false)
  upvotes     Int      @default(0)
  downvotes   Int      @default(0)
  
  // Actions taken
  forwarded   Boolean  @default(false)
  forwardedTo String[] // Contraloría, Fiscalía, etc
  
  createdAt   DateTime @default(now())
}

enum ReportCategory {
  BRIBERY
  EMBEZZLEMENT
  NEPOTISM
  CONTRACT_FRAUD
  OTHER
}

// API
fastify.post('/corruption/report', async (request, reply) => {
  const { title, description, category, evidence } = request.body;
  
  const report = await prisma.corruptionReport.create({
    data: {
      userId: request.user.id,
      title,
      description,
      category,
      evidence
    }
  });
  
  // Notify moderators
  await notifyModerators('new_corruption_report', report);
  
  return report;
});
```

---