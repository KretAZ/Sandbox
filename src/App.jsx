import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ProgressProvider } from "./context/ProgressContext";
import { SearchProvider } from "./context/SearchContext";
import { QuizProvider } from "./context/QuizContext";
import { Navigation } from "./components/Navigation";
import { Home } from "./pages/Home";
import { UseStateExamples } from "./pages/UseStateExamples";
import { UseEffectExamples } from "./pages/UseEffectExamples";
import { PropsStateManagement } from "./pages/PropsStateManagement";
import { APIIntegration } from "./pages/APIIntegration";
import { CustomHooks } from "./pages/CustomHooks";
import { ContextAPIExample } from "./pages/ContextAPIExample";
import { SearchResultsPage } from "./pages/SearchResults";
import { Quizzes } from "./pages/Quizzes";
import { Challenges } from "./pages/Challenges";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <SearchProvider>
          <QuizProvider>
            <Router>
              <Navigation />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/usestate" element={<UseStateExamples />} />
                <Route path="/useeffect" element={<UseEffectExamples />} />
                <Route path="/props" element={<PropsStateManagement />} />
                <Route path="/api" element={<APIIntegration />} />
                <Route path="/custom-hooks" element={<CustomHooks />} />
                <Route path="/context" element={<ContextAPIExample />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/quiz/:concept" element={<Quizzes />} />
                <Route path="/quiz" element={<Quizzes />} />
                <Route path="/challenges/:concept" element={<Challenges />} />
                <Route path="/challenges" element={<Challenges />} />
              </Routes>
            </Router>
          </QuizProvider>
        </SearchProvider>
      </ProgressProvider>
    </ThemeProvider>
  );
}

export default App;
