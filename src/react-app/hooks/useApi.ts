import { useState, useEffect, useCallback } from "react";
import {
  UseApiResult,
  TermDetailResponse,
  TermRelationshipsResponse,
  TermListResponse,
} from "../types";
import {
  getAllTerms,
  getAllTermsDetailed,
  getTermBySlug,
  getTermRelationships,
  searchTerms,
} from "../services/dataService";

// Generic hook for API calls (now using local data service)
function useLocalData<T>(
  dataFetcher: () => T | null,
  dependencies: unknown[] = [],
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    setLoading("loading");
    setError(null);

    try {
      const result = dataFetcher();
      if (result === null) {
        setError("404: Not Found");
        setLoading("error");
      } else {
        setData(result);
        setLoading("success");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      setLoading("error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFetcher, ...dependencies]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

// Hook for fetching a single term by slug
export function useTerm(
  slug: string | undefined,
): UseApiResult<TermDetailResponse> {
  return useLocalData(() => (slug ? getTermBySlug(slug) : null), [slug]);
}

// Hook for fetching term relationships
export function useTermRelationships(
  termId: number | undefined,
): UseApiResult<TermRelationshipsResponse> {
  return useLocalData(
    () => (termId ? getTermRelationships(termId) : null),
    [termId],
  );
}

// Hook for fetching all term names
export function useTermList(): UseApiResult<TermListResponse> {
  return useLocalData(() => getAllTerms(), []);
}

// Hook for searching terms
export function useTermSearch(query: string): UseApiResult<TermListResponse> {
  return useLocalData(
    () => (query.trim() ? searchTerms(query) : null),
    [query],
  );
}

// Hook for fetching detailed terms data (for use in lists)
export function useTermsDetailed(): UseApiResult<TermDetailResponse[]> {
  return useLocalData(() => getAllTermsDetailed(), []);
}
