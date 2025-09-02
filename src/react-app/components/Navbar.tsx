import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <Link to="/" className="brand-link">
              <span className="brand-text">FitSM.dev</span>
            </Link>
          </div>

          <div className="navbar-menu">
            <div className="navbar-nav">
              <Link
                to="/"
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              >
                Home
              </Link>
              <Link
                to="/terms"
                className={`nav-link ${location.pathname.startsWith("/terms") ? "active" : ""}`}
              >
                Terms
              </Link>
              <a
                href="/docs"
                className="nav-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                API Docs
              </a>
              <a
                href="/api/openapi.json"
                className="nav-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                OpenAPI
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
