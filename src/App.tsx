import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Form from "./pages/Form";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/formulario" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
