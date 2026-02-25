const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;

  let url = `${API_BASE}/api/v1${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        searchParams.set(key, String(value));
      }
    }
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error en la solicitud");
  }

  return data;
}

// ==================== Candidates ====================

export async function getCandidates(params?: { page?: number; limit?: number; search?: string }) {
  return apiFetch<{
    success: boolean;
    data: CandidateFromAPI[];
    pagination: Pagination;
  }>("/candidates", { params: params as Record<string, string | number> });
}

export async function getCandidate(slug: string) {
  return apiFetch<{ success: boolean; data: CandidateDetailFromAPI }>(`/candidates/${slug}`);
}

// ==================== ADN Test ====================

export async function getDnaQuestions() {
  return apiFetch<{ success: boolean; data: DnaQuestionFromAPI[] }>("/dna/questions");
}

export async function startDnaTest(userId?: string) {
  return apiFetch<{
    success: boolean;
    data: { testId: string; totalSteps: number; questions: DnaQuestionFromAPI[] };
  }>("/dna/start", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
}

export async function submitDnaAnswer(
  testId: string,
  answer: { questionId: string; value: number; importance: number }
) {
  return apiFetch<{
    success: boolean;
    data: { testId: string; currentStep: number; totalSteps: number; progress: number };
  }>(`/dna/${testId}/answer`, {
    method: "POST",
    body: JSON.stringify(answer),
  });
}

export async function completeDnaTest(testId: string) {
  return apiFetch<{
    success: boolean;
    data: DnaResultFromAPI;
  }>(`/dna/${testId}/complete`, {
    method: "POST",
  });
}

export async function getDnaResults(testId: string) {
  return apiFetch<{
    success: boolean;
    data: DnaResultFromAPI;
  }>(`/dna/${testId}/results`);
}

// ==================== Fact-Checks ====================

export async function getFactChecks(params?: {
  page?: number;
  limit?: number;
  verdict?: string;
  featured?: boolean;
  candidateSlug?: string;
}) {
  return apiFetch<{
    success: boolean;
    data: FactCheckFromAPI[];
    pagination: Pagination;
  }>("/factchecks", {
    params: params as Record<string, string | number | boolean>,
  });
}

export async function getFeaturedFactChecks() {
  return apiFetch<{ success: boolean; data: FactCheckFromAPI[] }>("/factchecks/featured");
}

export async function getFactCheck(id: string) {
  return apiFetch<{ success: boolean; data: FactCheckFromAPI }>(`/factchecks/${id}`);
}

export async function voteFactCheck(id: string, userId: string, agrees: boolean) {
  return apiFetch<{
    success: boolean;
    data: { upvotes: number; downvotes: number };
  }>(`/factchecks/${id}/vote`, {
    method: "POST",
    body: JSON.stringify({ userId, agrees }),
  });
}

// ==================== Types ====================

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface CandidateFromAPI {
  id: string;
  name: string;
  slug: string;
  party: string;
  partyLogo: string | null;
  photo: string;
  age: number;
  bio: string;
  positions: Record<string, number>;
  truthScore: number;
  active: boolean;
  featured: boolean;
  _count: { promises: number; factChecks: number };
}

interface CandidateDetailFromAPI extends CandidateFromAPI {
  planUrl: string | null;
  planSummary: string | null;
  twitter: string | null;
  facebook: string | null;
  instagram: string | null;
  tiktok: string | null;
  website: string | null;
  promises: PromiseFromAPI[];
  factChecks: FactCheckFromAPI[];
  _count: { promises: number; factChecks: number; matches: number };
}

interface PromiseFromAPI {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  evidence: string | null;
}

interface DnaQuestionFromAPI {
  id: string;
  text: string;
  description: string | null;
  dimension: string;
  order: number;
  options: { value: number; label: string }[];
  context: string | null;
}

interface DnaResultFromAPI {
  testId: string;
  scores: Record<string, number>;
  tribe: string;
  summary?: string;
  topMatches: MatchPreview[];
  allMatches: MatchPreview[];
  completedAt?: string;
}

interface MatchPreview {
  candidateId: string;
  candidateName: string;
  candidatePhoto: string;
  candidateParty: string;
  overallScore: number;
  breakdown: Record<string, number>;
}

interface FactCheckFromAPI {
  id: string;
  claim: string;
  context: string | null;
  claimedAt: string | null;
  source: string | null;
  verdict: string;
  explanation: string;
  sources: { title: string; url: string; snippet?: string }[];
  confidence: number | null;
  aiGenerated: boolean;
  upvotes: number;
  downvotes: number;
  featured: boolean;
  publishedAt: string;
  candidate?: {
    id: string;
    name: string;
    slug: string;
    party: string;
    photo: string;
  };
}

export type {
  CandidateFromAPI,
  CandidateDetailFromAPI,
  PromiseFromAPI,
  DnaQuestionFromAPI,
  DnaResultFromAPI,
  MatchPreview,
  FactCheckFromAPI,
  Pagination,
};
