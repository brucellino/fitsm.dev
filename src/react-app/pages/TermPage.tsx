import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTerm, useTermRelationships } from "../hooks/useApi";
import { LoadingState } from "../components/LoadingSpinner";
import SemanticRelationships from "../components/SemanticRelationships";
import Navbar from "../components/Navbar";

export const TermPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: term, loading: termLoading, error: termError } = useTerm(slug);
  const {
    data: relationships,
    loading: relLoading,
    error: relError,
  } = useTermRelationships(term?.id);

  const [showFullDefinition, setShowFullDefinition] = useState(false);

  // Update document title and meta
  useEffect(() => {
    if (term) {
      document.title = `${term.term} - FitSM Term | FitSM.dev`;

      // Update meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          "content",
          `${term.definition.substring(0, 155)}...`,
        );
      }
    }
  }, [term]);

  // Handle 404 cases
  if (termError && typeof termError === "string" && termError.includes("404")) {
    return (
      <>
        <Navbar />
        <div className="term-page term-not-found">
          <div className="container">
            <div className="not-found-content">
              <h1>Term Not Found</h1>
              <p>The FitSM term "{slug}" could not be found.</p>
              <div className="not-found-actions">
                <button
                  onClick={() => navigate("/terms")}
                  className="btn btn-primary"
                >
                  Browse All Terms
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="btn btn-secondary"
                >
                  Return Home
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
      <div className="term-page">
        <LoadingState
          loading={termLoading === "loading"}
          error={termError}
          loadingMessage="Loading FitSM term..."
        >
          {term && (
            <>
              {/* Hero Section */}
              <header className="term-hero">
                <div className="container">
                  <div className="term-hero-content">
                    <div className="term-breadcrumb">
                      <Link to="/">FitSM.dev</Link>
                      <span className="breadcrumb-separator">→</span>
                      <Link to="/terms">Terms</Link>
                      <span className="breadcrumb-separator">→</span>
                      <span className="current-term">{term.term}</span>
                    </div>

                    <div className="term-header">
                      <div className="term-number">
                        <span className="fitsm-number">{term.number}</span>
                      </div>

                      <div className="term-title-section">
                        <h1 className="term-title">{term.term}</h1>
                        {term.acronym_expansion && (
                          <div className="term-acronym">
                            <span className="acronym-label">Acronym:</span>
                            <span className="acronym-expansion">
                              {term.acronym_expansion}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </header>

              {/* Main Content */}
              <main className="term-content">
                <div className="container">
                  <div className="term-layout">
                    {/* Primary Content */}
                    <section className="term-primary">
                      <div className="term-definition-section">
                        <h2>Definition</h2>
                        <div className="term-definition">
                          <p className="definition-text">
                            {showFullDefinition || term.definition.length <= 200
                              ? term.definition
                              : `${term.definition.substring(0, 200)}...`}
                          </p>

                          {term.definition.length > 200 && (
                            <button
                              className="definition-toggle"
                              onClick={() =>
                                setShowFullDefinition(!showFullDefinition)
                              }
                            >
                              {showFullDefinition
                                ? "Show Less"
                                : "Show Full Definition"}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Notes Section */}
                      {term.notes && term.notes.length > 0 && (
                        <section className="term-notes-section">
                          <h2>Additional Notes</h2>
                          <div className="term-notes">
                            {term.notes.map((note: string, index: number) => (
                              <div key={index} className="note-item">
                                <div className="note-number">{index + 1}</div>
                                <p className="note-text">{note}</p>
                              </div>
                            ))}
                          </div>
                        </section>
                      )}

                      {/* Semantic Relationships Section */}
                      <section className="term-relationships-section">
                        <LoadingState
                          loading={relLoading === "loading"}
                          error={relError}
                          loadingMessage="Loading relationships..."
                        >
                          <SemanticRelationships
                            termName={term.term}
                            relationships={relationships}
                          />
                        </LoadingState>
                      </section>
                    </section>

                    {/* Sidebar */}
                    <aside className="term-sidebar">
                      <div className="term-meta-card">
                        <h3>Term Information</h3>

                        <div className="meta-item">
                          <label>FitSM Number</label>
                          <span className="meta-value">{term.number}</span>
                        </div>

                        <div className="meta-item">
                          <label>Term ID</label>
                          <span className="meta-value">#{term.id}</span>
                        </div>

                        <div className="meta-item">
                          <label>URL Slug</label>
                          <span className="meta-value code">{term.slug}</span>
                        </div>

                        {term.acronym_expansion && (
                          <div className="meta-item">
                            <label>Acronym</label>
                            <span className="meta-value">
                              {term.acronym_expansion}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* API Reference Card */}
                      <div className="api-reference-card">
                        <h3>API Reference</h3>
                        <p>Access this term programmatically:</p>

                        <div className="api-endpoint">
                          <label>Endpoint</label>
                          <code className="endpoint-url">
                            GET /api/v1/terms/{term.slug}
                          </code>
                        </div>

                        <div className="api-actions">
                          <a
                            href={`/api/v1/terms/${term.slug}`}
                            className="btn btn-sm btn-outline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View JSON Response
                          </a>
                        </div>
                      </div>

                      {/* Standard Reference Card */}
                      <div className="standard-reference-card">
                        <h3>FitSM Standard</h3>
                        <p>This term is defined in:</p>

                        <div className="standard-info">
                          <div className="standard-item">
                            <label>Document</label>
                            <span className="meta-value">
                              FitSM-0: Overview and vocabulary V3.0-2
                            </span>
                          </div>

                          <div className="standard-item">
                            <label>Section</label>
                            <span className="meta-value">{term.number}</span>
                          </div>

                          <div className="standard-item">
                            <label>License</label>
                            <span className="meta-value">
                              <a
                                href="https://creativecommons.org/licenses/by/4.0/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                CC BY 4.0
                              </a>
                            </span>
                          </div>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              </main>
            </>
          )}
        </LoadingState>
      </div>
    </>
  );
};

export default TermPage;
