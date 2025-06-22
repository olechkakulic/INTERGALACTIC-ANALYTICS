import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CSVanalytics } from "./pages/CSVanalytics/CSVanalyticsPage";
import { CsvGeneratorPage } from "./pages/CSVgeneritcs/CsvGeneratorPage";
import { History } from "./pages/History/HistoryPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<CSVanalytics />}></Route>
        <Route path="/csvgenerate" element={<CsvGeneratorPage />}></Route>
        <Route path="/history" element={<History />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
