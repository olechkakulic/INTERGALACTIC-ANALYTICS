import { useState, useRef } from "react";
import styles from "./FileDropzone.module.css";

export const FileDropzone = ({ onFileSelect, status, onReset }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleReset = (e) => {
    e.stopPropagation();
    onReset();
  };

  const processFile = (file) => {
    if (!file.name.toLowerCase().endsWith(".csv")) {
      onFileSelect(null, "error");
      return;
    }

    const renamedFile = new File([file], "file_uploaded_1.csv", {
      type: file.type,
      lastModified: file.lastModified,
    });
    onFileSelect(renamedFile, "success");
  };

  const buttonText = {
    idle: "Загрузить файл",
    fileSelected: "file_uploaded_1.csv",
    uploading: "",
    success: "file_uploaded_1.csv",
    error: "Ошибка",
  };

  const statusMessages = {
    idle: "или перетащите сюда",
    fileSelected: "файл загружен!",
    uploading: "идёт парсинг файла...",
    success: "файл обработан!",
    error: "упс, не то...",
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.dropzone} ${isDragging ? styles.dragging : ""} ${
          styles[status]
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          className={styles.fileInput}
          onChange={handleChange}
          ref={fileInputRef}
        />
        <div className={styles.dropzoneContent}>
          <div className={styles.buttonWithStatus}>
            <button
              className={`${styles.uploadButton} ${styles[status]}`}
              disabled={status === "uploading"}
            >
              {status === "uploading" ? (
                <img
                  src="assets/csvAnal/mingcute_loading-3-line.png"
                  alt="Загрузка"
                  className={styles.loadingIcon}
                />
              ) : (
                buttonText[status]
              )}
            </button>
            <span className={`${styles.statusText} ${styles[status]}`}>
              {statusMessages[status]}
            </span>
          </div>

          {(status === "success" ||
            status === "error" ||
            status === "fileSelected") && (
            <button className={styles.resetButton} onClick={handleReset}>
              <img
                src="assets/csvGenerate/Clear.png"
                alt="Сбросить"
                className={styles.resetIcon}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
