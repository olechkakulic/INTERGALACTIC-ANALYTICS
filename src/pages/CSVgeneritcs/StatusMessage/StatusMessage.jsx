import styles from "./StatusMessage.module.css";

export const StatusMessage = ({ status }) => {
  if (status === "start") return null;

  const messages = {
    loading: "идёт процесс генерации...",
    success: "файл сгенерирован!",
    error: "упс, не то...",
  };

  return (
    <div className={`${styles.statusMessage} ${styles[status]}`}>
      {messages[status]}
    </div>
  );
};