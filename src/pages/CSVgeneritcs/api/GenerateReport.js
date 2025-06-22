export const generateReport = async () => {
  try {
    const params = {
      size: 0.01,
      withErrors: Math.random() > 0.5 ? "on" : "off",
      maxSpend: 1000,
    };

    const response = await fetch(
      `http://localhost:3000/report?${new URLSearchParams(params)}`,
      {
        method: "GET",
      }
    );
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    return { success: true };
  } catch (error) {
    console.error("Ошибка генерации отчета:", error);
    return { success: false, error: error.message };
  }
};
