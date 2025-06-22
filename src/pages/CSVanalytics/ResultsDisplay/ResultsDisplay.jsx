import styles from "./ResultsDisplay.module.css";

export const ResultsDisplay = ({ results }) => {
  const resultItems = [
    {
      key: "totalSpendGalactic",
      label: "общие расходы в галактических кредитах",
    },
    {
      key: "processedRecords",
      label: "количество обработанных записей",
    },
    {
      key: "minSpendingDay",
      label: "день года с минимальными расходами",
    },
    {
      key: "maxSpendingCivilization",
      label: "цивилизация с максимальными расходами",
    },
    {
      key: "minSpendingCivilization",
      label: "цивилизация с минимальными расходами",
    },
    {
      key: "maxSpendingDay",
      label: "день года с максимальными расходами",
    },
    {
      key: "maxDailySpending",
      label: "максимальная сумма расходов за день",
    },
    {
      key: "avgSpending",
      label: "средние расходы в галактических кредитах",
    },
  ];

  return (
    <div className={styles.resultsContainer}>
      {resultItems.map(
        (item) =>
          results[item.key] !== undefined && (
            <div key={item.key} className={styles.resultItem}>
              <span className={styles.resultValue}>
                {item.key === "totalSpendGalactic" || item.key === "avgSpending"
                  ? results[item.key].toLocaleString() 
                  : results[item.key]}
              </span>
              <span className={styles.resultLabel}>{item.label}</span>
            </div>
          )
      )}
    </div>
  );
};
