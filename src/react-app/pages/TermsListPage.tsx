import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { TextInput } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";

import { useTermsDetailed } from "../hooks/useApi";
import { LoadingState } from "../components/LoadingSpinner";
import { TermDetailResponse } from "../types";
import Navbar from "../components/Navbar";

interface TermForDisplay {
  id: number;
  term: string;
  slug: string;
  definition: string;
  number: string;
  category?: string;
}

interface AlphabeticalCategory {
  letter: string;
  terms: TermForDisplay[];
  count: number;
}

export const TermsListPage: React.FC = () => {
  const { data: termsData, loading, error } = useTermsDetailed();
  const [searchQuery, setSearchQuery] = useState("");

  // Use real data from canonical JSON - wrapped in useMemo to prevent dependency issues
  const terms: TermForDisplay[] = useMemo(() => {
    return termsData
      ? termsData.map((term) => ({
          id: term.id,
          term: term.term,
          slug: term.slug,
          definition: term.definition,
          number: term.number,
          category: (term as TermDetailResponse & { category?: string })
            .category,
        }))
      : [];
  }, [termsData]);

  // Create alphabetical categories (0-9, A-Z)
  const alphabeticalCategories: AlphabeticalCategory[] = useMemo(() => {
    const categoryMap: Record<string, TermForDisplay[]> = {};

    // Initialize all possible categories
    const allLetters = [
      "0-9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    allLetters.forEach((letter) => {
      categoryMap[letter] = [];
    });

    // Group terms by first letter/number
    terms.forEach((term) => {
      const firstChar = term.term.charAt(0).toUpperCase();
      if (/[0-9]/.test(firstChar)) {
        categoryMap["0-9"].push(term);
      } else if (/[A-Z]/.test(firstChar)) {
        categoryMap[firstChar].push(term);
      }
    });

    // Convert to array and sort terms within each category
    // Only include categories that have terms
    return allLetters
      .map((letter) => ({
        letter,
        terms: categoryMap[letter].sort((a, b) => a.term.localeCompare(b.term)),
        count: categoryMap[letter].length,
      }))
      .filter((category) => category.count > 0);
  }, [terms]);

  // Filter categories based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return alphabeticalCategories;
    }

    return alphabeticalCategories
      .map((category) => ({
        ...category,
        terms: category.terms.filter(
          (term) =>
            term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
            term.definition.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      }))
      .map((category) => ({
        ...category,
        count: category.terms.length,
      }))
      .filter((category) => category.count > 0);
  }, [alphabeticalCategories, searchQuery]);

  // Get total filtered terms count
  const totalFilteredTerms = useMemo(() => {
    return filteredCategories.reduce(
      (sum, category) => sum + category.count,
      0,
    );
  }, [filteredCategories]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      <Navbar />
      <div className="terms-list-page">
        {/* Hero Section */}
        <header className="terms-hero">
          <div className="container">
            <div className="terms-hero-content">
              <div className="terms-breadcrumb">
                <Link to="/">FitSM.dev</Link>
                <span className="breadcrumb-separator">→</span>
                <span className="current-page">Terms</span>
              </div>

              <div className="terms-header">
                <h1 className="terms-title">FitSM Vocabulary</h1>
                <p className="terms-subtitle">
                  Browse all {terms.length} terms from the FitSM standard
                  organized alphabetically
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="terms-content">
          <div className="container">
            <LoadingState
              loading={loading === "loading"}
              error={error}
              loadingMessage="Loading FitSM terms..."
            >
              {/* Search Control */}
              <section className="terms-search-section">
                <div className="search-control">
                  <TextInput
                    label="Search Terms"
                    placeholder="Type to filter terms and categories..."
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(event.currentTarget.value)
                    }
                    leftSection={<IconSearch size={16} />}
                    rightSection={
                      searchQuery && (
                        <IconX
                          size={16}
                          onClick={clearSearch}
                          style={{ cursor: "pointer" }}
                        />
                      )
                    }
                  />
                  {searchQuery && (
                    <div className="search-results-summary">
                      Found {totalFilteredTerms} terms across{" "}
                      {filteredCategories.length} categories
                    </div>
                  )}
                </div>
              </section>

              {/* Alphabetical Categories Grid */}
              <section className="alphabet-categories-section">
                {filteredCategories.length === 0 ? (
                  <div className="no-results">
                    <div className="no-results-content">
                      <div className="no-results-icon">🔍</div>
                      <h3 className="no-results-title">No terms found</h3>
                      <p className="no-results-message">
                        No terms match your search criteria. Try a different
                        search term.
                      </p>
                      <button
                        onClick={clearSearch}
                        className="reset-search-btn"
                      >
                        Clear Search
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="alphabet-grid">
                      {filteredCategories.map((category) => (
                        <div key={category.letter} className="alphabet-card">
                          <Link
                            to={`/terms/letter/${category.letter.toLowerCase()}`}
                            className="alphabet-card-link"
                          >
                            <div className="alphabet-card-header">
                              <div className="letter-display">
                                {category.letter}
                              </div>
                              <div className="term-count">
                                {category.count}{" "}
                                {category.count === 1 ? "term" : "terms"}
                              </div>
                            </div>

                            <div className="alphabet-card-preview">
                              {category.terms.slice(0, 3).map((term) => (
                                <div key={term.id} className="preview-term">
                                  {term.term}
                                </div>
                              ))}
                              {category.terms.length > 3 && (
                                <div className="preview-more">
                                  +{category.terms.length - 3} more
                                </div>
                              )}
                            </div>

                            <div className="alphabet-card-action">
                              Click to view all terms
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </section>

              {/* Quick Stats */}
              <section className="terms-stats">
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-number">{terms.length}</div>
                    <div className="stat-label">Total Terms</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">
                      {alphabeticalCategories.length}
                    </div>
                    <div className="stat-label">Active Categories</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">v3.0</div>
                    <div className="stat-label">FitSM Version</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">CC BY 4.0</div>
                    <div className="stat-label">License</div>
                  </div>
                </div>
              </section>
            </LoadingState>
          </div>
        </main>
      </div>
    </>
  );
};

export default TermsListPage;
