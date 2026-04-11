import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { Navigation } from "./components/Navigation";
import { Home } from "./pages/Home";
import { UseStateExamples } from "./pages/UseStateExamples";
import { UseEffectExamples } from "./pages/UseEffectExamples";
import { PropsStateManagement } from "./pages/PropsStateManagement";
import { APIIntegration } from "./pages/APIIntegration";
import { CustomHooks } from "./pages/CustomHooks";
import { ContextAPIExample } from "./pages/ContextAPIExample";
import "./App.css";
import "./styles/pages.css";

function App() {
  return (
    <ThemeProvider>
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
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
