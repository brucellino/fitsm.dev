import React, { useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
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

export const TermsByLetterPage: React.FC = () => {
  const { initial } = useParams<{ initial: string }>();
  const navigate = useNavigate();
  const { data: termsData, loading, error } = useTermsDetailed();

  // Convert terms data
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

  // Filter terms by the initial letter
  const filteredTerms = useMemo(() => {
    if (!initial) return [];

    const targetLetter = initial.toUpperCase();

    return terms
      .filter((term) => {
        const firstChar = term.term.charAt(0).toUpperCase();
        if (targetLetter === "0-9") {
          return /[0-9]/.test(firstChar);
        }
        return firstChar === targetLetter;
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [terms, initial]);

  // Get display letter for UI
  const displayLetter = initial?.toUpperCase() || "";

  // Handle invalid initial
  if (initial && !filteredTerms.length && terms.length > 0) {
    return (
      <>
        <Navbar />
        <div className="terms-by-letter-page">
          <div className="container">
            <div className="not-found-content">
              <div className="not-found-header">
                <h1>No Terms Found</h1>
                <p>No FitSM terms start with "{displayLetter}"</p>
              </div>
              <div className="not-found-actions">
                <button
                  onClick={() => navigate("/terms")}
                  className="btn btn-primary"
                >
                  Browse All Categories
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="terms-by-letter-page">
        {/* Hero Section */}
        <header className="terms-by-letter-hero">
          <div className="container">
            <div className="terms-hero-content">
              <div className="terms-breadcrumb">
                <Link to="/">FitSM.dev</Link>
                <span className="breadcrumb-separator">→</span>
                <Link to="/terms">Terms</Link>
                <span className="breadcrumb-separator">→</span>
                <span className="current-page">
                  {displayLetter === "0-9" ? "Numbers" : `Letter ${displayLetter}`}
                </span>
              </div>

              <div className="terms-header">
                <h1 className="terms-title">
                  Terms Starting with "{displayLetter}"
                </h1>
                <p className="terms-subtitle">
                  {filteredTerms.length} FitSM terms beginning with {displayLetter === "0-9" ? "numbers" : `the letter ${displayLetter}`}
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
              {/* Back Button */}
              <section className="back-navigation">
                <Link to="/terms" className="back-btn">
                  ← Back to All Categories
                </Link>
              </section>

              {/* Terms Grid */}
              <section className="letter-terms-section">
                {filteredTerms.length === 0 ? (
                  <div className="no-results">
                    <div className="no-results-content">
                      <div className="no-results-icon">📚</div>
                      <h3 className="no-results-title">No terms found</h3>
                      <p className="no-results-message">
                        There are no FitSM terms starting with "{displayLetter}".
                      </p>
                      <Link to="/terms" className="back-to-categories-btn">
                        Browse All Categories
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="letter-terms-grid">
                    {filteredTerms.map((term) => (
                      <Link
                        key={term.id}
                        to={`/terms/${term.slug}`}
                        className="letter-term-card"
                      >
                        <div className="letter-term-header">
                          <div className="term-number">
                            <span className="fitsm-number">{term.number}</span>
                          </div>
                          {term.category && (
                            <div className="term-category">{term.category}</div>
                          )}
                        </div>

                        <div className="letter-term-body">
                          <h3 className="term-name">{term.term}</h3>
                          <p className="term-preview">
                            {term.definition.length > 150
                              ? `${term.definition.substring(0, 150)}...`
                              : term.definition}
                          </p>
                        </div>

                        <div className="letter-term-footer">
                          <span className="view-details">View Details →</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </section>

              {/* Navigation to Other Letters */}
              <section className="letter-navigation">
                <div className="letter-nav-content">
                  <h3 className="letter-nav-title">Browse Other Categories</h3>
                  <div className="letter-nav-buttons">
                    <Link to="/terms" className="view-all-btn">
                      View All Categories
                    </Link>
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

export default TermsByLetterPage;
