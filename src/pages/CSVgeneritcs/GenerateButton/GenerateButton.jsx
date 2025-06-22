import styles from "./GeneratorButton.module.css";
import { generateReport } from "../api/GenerateReport.js";
import { ResetButton } from "../ResetButton/ResetButton";

export const GeneratorButton = ({ status, onGenerate }) => {
  const handleClick = async () => {
    onGenerate("loading");
    const result = await generateReport();
    onGenerate(result.success ? "success" : "error");
  };

  const handleReset = () => {
    onGenerate("start");
  };

  const buttonText = {
    start: "Начать генерацию",
    loading: "",
    success: "done!",
    error: "Ошибка",
  };

  return (
    <div className={styles.buttonWrapper}>
      <button
        className={`${styles.button} ${styles[status]}`}
        onClick={handleClick}
        disabled={status === "loading" || status === "success"}
      >
        {status === "loading" ? (
          <img
            src="assets/csvAnal/mingcute_loading-3-line.png"
            alt="Загрузка"
            className={styles.loadingIcon}
          />
        ) : (
          buttonText[status]
        )}
      </button>

      {(status === "success" || status === "error") && (
        <ResetButton onClick={handleReset} />
      )}
    </div>
  );
};
