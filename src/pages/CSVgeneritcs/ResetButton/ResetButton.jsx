import styles from "./ResetButton.module.css";

export const ResetButton = ({ onClick }) => {
  return (
    <button className={styles.resetButton} onClick={onClick}>
      <img
        src="assets/csvGenerate/Clear.png"
        alt="Сбросить"
        className={styles.resetIcon}
      />
    </button>
  );
};
