import styles from "./Request.module.css";

export function Request({ title, data, status, onDelete }) {
  return (
    <div className={styles.requestRow}>

      <div className={styles.titleCell}>
        <img src="assets/history/akar-icons_file.png" alt="file" />
        <span>{title}</span>
      </div>


      <div className={styles.dataCell}>
        <span>{data}</span>
      </div>

      <div className={styles.statusCell}>
        <div className={`${styles.status} ${status ? styles.active : styles.inactive}`}>
          <img src="assets/history/Smaile.png" alt="success" />
          <span>Обработан Успешно</span>
        </div>
        <div className={`${styles.status} ${!status ? styles.active : styles.inactive}`}>
          <img src="assets/history/ph_smiley-sad.png" alt="failed" />
          <span>Не удалось обработать</span>
        </div>
      </div>

      <div className={styles.deleteCell}>
        <button className={styles.deleteButton} onClick={onDelete}>
          <img src="assets/history/Trash.png" alt="trash" />
        </button>
      </div>
    </div>
  );
}