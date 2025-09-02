// Type definitions for FitSM vocabulary and API responses

export interface TermSource {
  document: string;
  section: string;
  page?: number;
}

// Canonical term structure from JSON file
export interface CanonicalTerm {
  "@id": string;
  "@type": string;
  fitsmId: number;
  fitsmNumber: string;
  prefLabel: string;
  definition: string;
  broader?: string[];
  narrower?: string[];
  related?: string[];
  notes?: string[];
  language: string;
  source: TermSource;
  acronym?: {
    short: string;
    full: string;
  };
}

// API response term structure
export interface Term {
  "@id": string;
  "@type": string;
  fitsmId: number;
  fitsmNumber: string;
  prefLabel: string;
  definition: string;
  broader?: string[];
  narrower?: string[];
  related?: string[];
  notes?: string[];
  language: string;
  source: TermSource;
  // Computed fields for API responses
  id: number;
  term: string;
  slug: string;
  number: string;
  acronym_expansion?: string;
}

export interface RelationshipType {
  "@id": string;
  "@type": string;
  prefLabel: string;
  definition: string;
  inverse?: string;
  transitive?: boolean;
}

export interface SemanticRelationship {
  type: string;
  label: string;
  terms: Array<{
    id: string;
    prefLabel: string;
    slug: string;
  }>;
}

export interface SemanticRelationships {
  broader?: SemanticRelationship;
  narrower?: SemanticRelationship;
  related?: SemanticRelationship;
}

export interface VocabularyMetadata {
  version: string;
  title: string;
  description: string;
  source: string;
  publisher: string;
  license: string;
  lastModified: string;
  termCount: number;
  relationshipCount: number;
}

export interface CanonicalVocabularyDataset {
  "@context": Record<string, string>;
  "@type": string;
  "@id": string;
  metadata: VocabularyMetadata;
  relationshipTypes: RelationshipType[];
  terms: CanonicalTerm[];
}

export interface VocabularyDataset {
  "@context": Record<string, string>;
  "@type": string;
  "@id": string;
  metadata: VocabularyMetadata;
  relationshipTypes: RelationshipType[];
  terms: Term[];
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface TermListResponse {
  terms: string[];
  total: number;
}

export interface TermDetailResponse {
  "@id": string;
  "@type": string;
  fitsmId: number;
  fitsmNumber: string;
  prefLabel: string;
  definition: string;
  broader?: string[];
  narrower?: string[];
  related?: string[];
  notes?: string[];
  language: string;
  source: TermSource;
  // Computed fields for API compatibility
  id: number;
  term: string;
  slug: string;
  number: string;
  acronym_expansion?: string;
  category?: string;
}

export interface TermRelationshipsResponse {
  termId: number;
  relationships: SemanticRelationships;
}

// Hook return types
export type LoadingState = "idle" | "loading" | "success" | "error";

export interface UseApiResult<T> {
  data: T | null;
  loading: LoadingState;
  error: string | null;
  refetch: () => void;
}

// Component prop types
export interface SemanticLink {
  id: string;
  term: string;
  slug: string;
}

export interface LoadingSpinnerProps {
  loading: boolean;
  error: string | null;
  loadingMessage?: string;
  children: React.ReactNode;
}
