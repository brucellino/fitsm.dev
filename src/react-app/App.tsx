import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import TermPage from "./pages/TermPage";
import TermsListPage from "./pages/TermsListPage";
import TermsByLetterPage from "./pages/TermsByLetterPage";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/terms" element={<TermsListPage />} />
          <Route
            path="/terms/letter/:initial"
            element={<TermsByLetterPage />}
          />
          <Route path="/terms/:slug" element={<TermPage />} />
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <LandingPage />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
