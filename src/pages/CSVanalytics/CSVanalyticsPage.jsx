import { useCallback, useState } from "react";
import { Header } from "../../components/Header/Header";
import styles from "./CSVanalyticsPage.module.css";
import { FileDropzone } from "./FileDropZone/FileDropZone";
import { ResultsDisplay } from "./ResultsDisplay/ResultsDisplay";
import { processCSVFile } from "./api/processCSV";
import useHistoryStore from "../../store/historyStore";

export function CSVanalytics() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [results, setResults] = useState(null);
  const { addRequest } = useHistoryStore();
  const fixedFileName = "file_uploaded_1.csv";

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
    [addRequest]
  );

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
    [addRequest]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    await processFile(file);
  };

  const handleReset = () => {
    setFile(null);
    setStatus("idle");
    setResults(null);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <span className={styles.title}>
          Загрузите <span className={styles.highlithed}>csv</span> файл и
          получите <span className={styles.highlithed}>полную информацию</span>{" "}
          о нём за сверхнизкое время
        </span>

        <FileDropzone
          onFileSelect={handleFileChange}
          status={status}
          file={file}
          onReset={handleReset}
          fixedFileName={fixedFileName}
        />

        {status === "fileSelected" && (
          <button className={styles.submitButton} onClick={handleSubmit}>
            Отправить
          </button>
        )}

        {(status === "uploading" || status === "success") && results && (
          <ResultsDisplay results={results} />
        )}
      </div>
    </>
  );
}
