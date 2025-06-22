import { createPortal } from "react-dom";
import styles from "./ResultModal.module.css";
import { ResultsDisplay } from "../../CSVanalytics/ResultsDisplay/ResultsDisplay";


const modalRoot = document.getElementById("modal-root");

export function ResultModal({ request, onClose }) {
  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>×</button>
        {request.data ? (
          <ResultsDisplay results={request.data} />
        ) : (
          <p>Нет данных</p>
        )}
      </div>
    </div>,
    modalRoot
  );
}
