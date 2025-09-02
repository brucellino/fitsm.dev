import React from "react";
import { TermRelationshipsResponse, SemanticRelationship } from "../types";

interface SemanticRelationshipsProps {
  termName: string;
  relationships?: TermRelationshipsResponse | null;
}

export const SemanticRelationships: React.FC<SemanticRelationshipsProps> = ({
  termName,
  relationships,
}) => {
  if (!relationships) {
    return (
      <div className="semantic-relationships">
        <h2>Semantic Relationships</h2>
        <p className="no-relationships">
          No semantic relationships found for this term.
        </p>
      </div>
    );
  }

  // Define relationship metadata for better display
  const relationshipMeta: Record<
    string,
    { label: string; description: string; icon: string; color: string }
  > = {
    broader: {
      label: "Broader Terms",
      description: "This term is a type of",
      icon: "⬆️",
      color: "blue",
    },
    narrower: {
      label: "Narrower Terms",
      description: "Types of this term",
      icon: "⬇️",
      color: "green",
    },
    related: {
      label: "Related Terms",
      description: "Related concepts",
      icon: "🔗",
      color: "purple",
    },
  };

  // Process relationships into a consistent format
  const activeRelationships = Object.entries(relationships.relationships)
    .filter(
      ([, value]: [string, SemanticRelationship]) =>
        value && value.terms && value.terms.length > 0,
    )
    .map(([type, relationship]: [string, SemanticRelationship]) => ({
      type,
      terms: relationship.terms,
      label: relationship.label,
      meta: relationshipMeta[type] || {
        label: relationship.label || type,
        description: `Related through ${type}`,
        icon: "🔗",
        color: "gray",
      },
    }));

  if (activeRelationships.length === 0) {
    return (
      <div className="semantic-relationships">
        <h2>Semantic Relationships</h2>
        <p className="no-relationships">
          No semantic relationships found for this term.
        </p>
      </div>
    );
  }

  return (
    <div className="semantic-relationships">
      <div className="relationships-header">
        <h2>Semantic Relationships</h2>
        <p className="relationships-intro">
          Understanding how <strong>{termName}</strong> relates to other FitSM
          terms
        </p>
      </div>

      <div className="relationships-grid">
        {activeRelationships.map(({ type, terms, meta }) => (
          <div
            key={type}
            className={`relationship-group relationship-${meta.color}`}
          >
            <div className="relationship-header">
              <span className="relationship-icon">{meta.icon}</span>
              <div className="relationship-info">
                <h3 className="relationship-title">{meta.label}</h3>
                <p className="relationship-description">{meta.description}</p>
              </div>
              <span className="relationship-count">{terms.length}</span>
            </div>

            <div className="relationship-terms">
              {terms.map((relatedTerm, index: number) => (
                <div key={index} className="related-term">
                  <a
                    href={`/terms/${relatedTerm.slug}`}
                    className="related-term-link"
                  >
                    <div className="related-term-content">
                      <h4 className="related-term-name">
                        {relatedTerm.prefLabel}
                      </h4>
                    </div>
                    <div className="related-term-meta">
                      <span className="relationship-arrow">→</span>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="relationships-legend">
        <h4>Understanding Relationships</h4>
        <div className="legend-items">
          <span className="legend-item">
            <span className="confidence-high">Direct</span> Explicitly defined
            in FitSM standard
          </span>
          <span className="legend-item">
            <span className="confidence-medium">Inferred</span> Logically
            derived from the standard
          </span>
        </div>
      </div>
    </div>
  );
};

export default SemanticRelationships;
