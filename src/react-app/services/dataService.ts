// Data service to load and transform canonical FitSM JSON data
import canonicalData from "../../data/canonical-fitsm-vocabulary.json";
import {
  CanonicalVocabularyDataset,
  CanonicalTerm,
  TermDetailResponse,
  TermListResponse,
  SemanticRelationships,
  TermRelationshipsResponse,
} from "../types";

// Cache for processed data
let processedTerms: TermDetailResponse[] | null = null;
let termsBySlug: Map<string, TermDetailResponse> | null = null;
let termsByFitsmId: Map<number, TermDetailResponse> | null = null;
let termsByAtId: Map<string, CanonicalTerm> | null = null;
let relationshipsCache: Map<number, TermRelationshipsResponse> | null = null;

// Helper function to create slug from term name
function createSlug(termName: string): string {
  return termName
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters except hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with single
    .trim();
}

// Helper function to extract category from term definition or relationships
function inferCategory(term: CanonicalTerm): string {
  const termName = term.prefLabel.toLowerCase();
  const definition = term.definition.toLowerCase();
  const combined = termName + " " + definition;

  // Define category patterns - check most specific first
  if (combined.includes("process")) {
    return "Process Management";
  } else if (combined.includes("service")) {
    return "Service Management";
  } else if (
    combined.includes("incident") ||
    combined.includes("problem") ||
    combined.includes("change")
  ) {
    return "Service Operation";
  } else if (combined.includes("configuration") || combined.includes("asset")) {
    return "Configuration Management";
  } else if (
    combined.includes("capacity") ||
    combined.includes("availability") ||
    combined.includes("performance")
  ) {
    return "Service Quality";
  } else if (
    combined.includes("customer") ||
    combined.includes("supplier") ||
    combined.includes("agreement")
  ) {
    return "Service Delivery";
  } else if (
    combined.includes("audit") ||
    combined.includes("review") ||
    combined.includes("assessment")
  ) {
    return "Governance";
  } else if (combined.includes("security") || combined.includes("risk")) {
    return "Security & Risk";
  } else if (
    combined.includes("financial") ||
    combined.includes("cost") ||
    combined.includes("budget")
  ) {
    return "Financial Management";
  } else {
    return "General";
  }
}

// Transform canonical term to our internal format
function transformTerm(canonicalTerm: CanonicalTerm): TermDetailResponse {
  const slug = createSlug(canonicalTerm.prefLabel);

  // Handle acronym expansion
  let acronymExpansion: string | undefined;
  if (canonicalTerm.acronym) {
    acronymExpansion = canonicalTerm.acronym.full;
  } else if (
    canonicalTerm.prefLabel.includes("(") &&
    canonicalTerm.prefLabel.includes(")")
  ) {
    // Extract acronym from title like "Configuration item (CI)"
    const match = canonicalTerm.prefLabel.match(/\(([^)]+)\)/);
    if (match) {
      acronymExpansion = canonicalTerm.prefLabel.replace(/\s*\([^)]+\)/, "");
    }
  }

  return {
    "@id": canonicalTerm["@id"],
    "@type": canonicalTerm["@type"],
    fitsmId: canonicalTerm.fitsmId,
    fitsmNumber: canonicalTerm.fitsmNumber,
    prefLabel: canonicalTerm.prefLabel,
    definition: canonicalTerm.definition,
    broader: canonicalTerm.broader || [],
    narrower: canonicalTerm.narrower || [],
    related: canonicalTerm.related || [],
    notes: canonicalTerm.notes || [],
    language: canonicalTerm.language,
    source: canonicalTerm.source,
    // Computed fields for API compatibility
    id: canonicalTerm.fitsmId,
    term: canonicalTerm.prefLabel,
    slug: slug,
    number: canonicalTerm.fitsmNumber,
    acronym_expansion: acronymExpansion,
    category: inferCategory(canonicalTerm),
  };
}

// Initialize processed data
function initializeData(): void {
  if (processedTerms !== null) return; // Already initialized

  const dataset = canonicalData as CanonicalVocabularyDataset;

  // Transform all terms
  processedTerms = dataset.terms.map(transformTerm);

  // Create lookup maps
  termsBySlug = new Map();
  termsByFitsmId = new Map();
  termsByAtId = new Map();
  relationshipsCache = new Map();

  processedTerms.forEach((term) => {
    termsBySlug!.set(term.slug, term);
    termsByFitsmId!.set(term.fitsmId, term);
  });

  // Create efficient lookup by @id for relationship processing
  dataset.terms.forEach((term) => {
    termsByAtId!.set(term["@id"], term);
  });
}

// Get all terms for list page
export function getAllTerms(): TermListResponse {
  initializeData();

  return {
    terms: processedTerms!.map((term) => term.term),
    total: processedTerms!.length,
  };
}

// Get detailed terms data (for internal use)
export function getAllTermsDetailed(): TermDetailResponse[] {
  initializeData();
  return processedTerms!;
}

// Get term by slug
export function getTermBySlug(slug: string): TermDetailResponse | null {
  initializeData();
  return termsBySlug!.get(slug) || null;
}

// Get term by FitSM ID
export function getTermById(fitsmId: number): TermDetailResponse | null {
  initializeData();
  return termsByFitsmId!.get(fitsmId) || null;
}

// Search terms by query
export function searchTerms(query: string): TermListResponse {
  initializeData();

  const lowercaseQuery = query.toLowerCase();
  const matchingTerms = processedTerms!.filter(
    (term) =>
      term.term.toLowerCase().includes(lowercaseQuery) ||
      term.definition.toLowerCase().includes(lowercaseQuery) ||
      (term.notes &&
        term.notes.some((note) => note.toLowerCase().includes(lowercaseQuery))),
  );

  return {
    terms: matchingTerms.map((term) => term.term),
    total: matchingTerms.length,
  };
}

// Get semantic relationships for a term
export function getTermRelationships(
  fitsmId: number,
): TermRelationshipsResponse | null {
  initializeData();

  // Check cache first
  if (relationshipsCache!.has(fitsmId)) {
    return relationshipsCache!.get(fitsmId)!;
  }

  const term = getTermById(fitsmId);
  if (!term) {
    return null;
  }

  const relationships: SemanticRelationships = {};

  // Helper function to efficiently lookup and transform terms
  const lookupAndTransform = (atIds: string[]) => {
    return atIds
      .map((atId) => {
        const foundTerm = termsByAtId!.get(atId);
        return foundTerm
          ? {
              id: foundTerm["@id"],
              prefLabel: foundTerm.prefLabel,
              slug: createSlug(foundTerm.prefLabel),
            }
          : null;
      })
      .filter((term): term is NonNullable<typeof term> => term !== null);
  };

  // Process broader terms
  if (term.broader && term.broader.length > 0) {
    const broaderTerms = lookupAndTransform(term.broader);
    if (broaderTerms.length > 0) {
      relationships.broader = {
        type: "broader",
        label: "Broader Terms",
        terms: broaderTerms,
      };
    }
  }

  // Process narrower terms
  if (term.narrower && term.narrower.length > 0) {
    const narrowerTerms = lookupAndTransform(term.narrower);
    if (narrowerTerms.length > 0) {
      relationships.narrower = {
        type: "narrower",
        label: "Narrower Terms",
        terms: narrowerTerms,
      };
    }
  }

  // Process related terms
  if (term.related && term.related.length > 0) {
    const relatedTerms = lookupAndTransform(term.related);
    if (relatedTerms.length > 0) {
      relationships.related = {
        type: "related",
        label: "Related Terms",
        terms: relatedTerms,
      };
    }
  }

  const result: TermRelationshipsResponse = {
    termId: fitsmId,
    relationships: relationships,
  };

  // Cache the result
  relationshipsCache!.set(fitsmId, result);

  return result;
}

// Get terms by category
export function getTermsByCategory(category: string): TermDetailResponse[] {
  initializeData();

  if (category === "all") {
    return processedTerms!;
  }

  return processedTerms!.filter(
    (term) =>
      (term as TermDetailResponse & { category?: string }).category ===
      category,
  );
}

// Get all unique categories
export function getCategories(): string[] {
  initializeData();

  const categories = new Set<string>();
  processedTerms!.forEach((term) => {
    const termWithCategory = term as TermDetailResponse & { category?: string };
    if (termWithCategory.category) {
      categories.add(termWithCategory.category);
    }
  });

  return Array.from(categories).sort();
}

// Get vocabulary metadata
export function getVocabularyMetadata() {
  const dataset = canonicalData as CanonicalVocabularyDataset;
  return dataset.metadata;
}
