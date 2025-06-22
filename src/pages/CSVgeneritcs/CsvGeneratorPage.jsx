import { useState } from "react";
import { GeneratorButton } from "./GenerateButton/GenerateButton";
import { StatusMessage } from "./StatusMessage/StatusMessage";
import styles from "./CSVgeneritcsPage.module.css";
import { Header } from "../../components/Header/Header";

export const CsvGeneratorPage = () => {
  const [status, setStatus] = useState("start");

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <>
      <Header></Header>
      <div className={styles.container}>
        <h2 className={styles.csvheading}>
          Сгенерируйте готовый csv-файл нажатием одной кнопки
        </h2>
        <GeneratorButton status={status} onGenerate={handleStatusChange} />
        <StatusMessage status={status} />
      </div>
    </>
  );
};
