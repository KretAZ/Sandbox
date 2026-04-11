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
import { UseCallbackExample } from "./pages/UseCallbackExample";
import { UseMemoExample } from "./pages/UseMemoExample";
import { UseRefExample } from "./pages/UseRefExample";
import { UseReducerExample } from "./pages/UseReducerExample";
import { ErrorBoundaryExample } from "./pages/ErrorBoundaryExample";
import { SuspenseExample } from "./pages/SuspenseExample";
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
                <Route path="/usecallback" element={<UseCallbackExample />} />
                <Route path="/usememo" element={<UseMemoExample />} />
                <Route path="/useref" element={<UseRefExample />} />
                <Route path="/usereducer" element={<UseReducerExample />} />
                <Route path="/error-boundary" element={<ErrorBoundaryExample />} />
                <Route path="/suspense" element={<SuspenseExample />} />
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
