import { useState, useCallback } from "react";
import { processCSVFile } from "./processCSV"; 

import useHistoryStore from "../../../store/historyStore";
export function useCSVProcessing(fixedFileName = "file_uploaded_1.csv") {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [results, setResults] = useState(null);
  const { addRequest } = useHistoryStore();

  const formatDayOfYear = (dayNumber) => {
    const date = new Date(2023, 0);
    date.setDate(dayNumber);
    const monthNames = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    return `${date.getDate()} ${monthNames[date.getMonth()]}`;
  };

  const handleFileChange = useCallback(
    (selectedFile) => {
      if (selectedFile?.name.endsWith(".csv")) {
        setFile(selectedFile);
        setStatus("fileSelected");
        setResults(null);
      } else {
        setFile(null);
        setStatus("error");
        addRequest({
          id: Date.now(),
          fileName: fixedFileName,
          date: new Date().toISOString(),
          status: false,
        });
      }
    },
    [addRequest, fixedFileName]
  );

  const processFile = useCallback(
    async (file) => {
      try {
        setStatus("uploading");
        setResults(null);

        const finalResults = await processCSVFile(
          file,
          formatDayOfYear,
          (chunk) => setResults(chunk)
        );

        setStatus("success");
        addRequest({
          id: Date.now(),
          fileName: fixedFileName,
          date: new Date().toISOString(),
          data: finalResults,
          status: true,
        });
      } catch {
        setStatus("error");
        addRequest({
          id: Date.now(),
          fileName: fixedFileName,
          date: new Date().toISOString(),
          status: false,
        });
      }
    },
    [addRequest, fixedFileName]
  );

  const reset = () => {
    setFile(null);
    setStatus("idle");
    setResults(null);
  };

  return {
    file,
    status,
    results,
    handleFileChange,
    processFile,
    reset,
  };
}
