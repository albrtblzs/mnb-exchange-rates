import { BrowserRouter, Routes, Route  } from "react-router-dom";
import ExchangeRates from "./pages/ExchangeRates";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route  path="/" element={<ExchangeRates />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
