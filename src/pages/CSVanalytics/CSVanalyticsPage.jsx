import { Header } from "../../components/Header/Header";
import styles from "./CSVanalyticsPage.module.css";
import { FileDropzone } from "./FileDropZone/FileDropZone";
import { ResultsDisplay } from "./ResultsDisplay/ResultsDisplay";
import {useCSVProcessing } from "./api/useCSVProcessing.js";


export function CSVanalytics() {
  const fixedFileName = "file_uploaded_1.csv";
  const {
    file,
    status,
    results,
    handleFileChange,
    processFile,
    reset,
  } = useCSVProcessing(fixedFileName);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    await processFile(file);
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
          onReset={reset}
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
