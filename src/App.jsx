// App.jsx
import { Routes, Route } from "react-router-dom";
import { CSVanalytics } from "./pages/CSVanalytics/CSVanalyticsPage";
import { CsvGeneratorPage } from "./pages/CSVgeneritcs/CsvGeneratorPage";
import { History } from "./pages/History/HistoryPage";

function App() {
  return (
    <Routes>
      <Route index element={<CSVanalytics />} />
      <Route path="/csvgenerate" element={<CsvGeneratorPage />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}

export default App;