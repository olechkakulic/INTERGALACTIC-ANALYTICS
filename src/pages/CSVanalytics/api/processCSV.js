export async function processCSVFile(file, formatDayOfYear, onChunk, onError) {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("http://localhost:3000/aggregate?rows=1000", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) throw new Error(await response.text());
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let finalResults = null;
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
  
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
  
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const data = JSON.parse(line);
            finalResults = {
              totalSpendGalactic: data.total_spend_galactic,
              processedRecords: data.rows_affected,
              minSpendingDay: formatDayOfYear(data.less_spent_at),
              maxSpendingCivilization: data.big_spent_civ,
              minSpendingCivilization: data.less_spent_civ,
              maxSpendingDay: formatDayOfYear(data.big_spent_at),
              maxDailySpending: data.big_spent_value,
              avgSpending: data.average_spend_galactic,
            };
            onChunk({ ...finalResults });
          } catch (e) {
            console.error("Ошибка парсинга JSON:", e, "Данные:", line);
          }
        }
      }
  
      if (buffer.trim()) {
        try {
          const data = JSON.parse(buffer);
          finalResults = {
            totalSpendGalactic: data.total_spend_galactic,
            processedRecords: data.rows_affected,
            minSpendingDay: formatDayOfYear(data.less_spent_at),
            maxSpendingCivilization: data.big_spent_civ,
            minSpendingCivilization: data.less_spent_civ,
            maxSpendingDay: formatDayOfYear(data.big_spent_at),
            maxDailySpending: data.big_spent_value,
            avgSpending: data.average_spend_galactic,
          };
          onChunk(finalResults);
        } catch (e) {
          console.error("Ошибка парсинга оставшихся данных:", e);
        }
      }
  
      return finalResults;
    } catch (err) {
      console.error("Ошибка обработки файла:", err);
      onError?.(err.message || "Ошибка при обработке файла");
      throw err;
    }
  }
  