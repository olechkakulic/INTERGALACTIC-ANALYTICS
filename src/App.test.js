import { Link } from "react-router-dom";

jest.mock("./pages/CSVanalytics/CSVanalyticsPage", () => ({
  CSVanalytics: () => (
    <div>
      <div>CSV Analytics Page</div>
      <nav>
        <Link to="/csvgenerate">CSV Генератор</Link>
        <Link to="/history">История</Link>
      </nav>
    </div>
  ),
}));

jest.mock("./pages/CSVgeneritcs/CsvGeneratorPage", () => ({
  CsvGeneratorPage: () => <div>CSV Generator Page Mock</div>,
}));

jest.mock("./pages/History/HistoryPage", () => ({
  History: () => <div>History Page Mock</div>,
}));

describe("Навигация по приложению", () => {
  test("по умолчанию отображается страница аналитики CSV", async () => {
    render(<App />);
    expect(await screen.findByText("CSV Analytics Page")).toBeInTheDocument();
  });

  test("переход на страницу генератора CSV при клике по ссылке", async () => {
    render(<App />);

    await screen.findByText("CSV Analytics Page");
    const generateLink = screen.getByRole("link", { name: /CSV Генератор/i });

    await userEvent.click(generateLink);
    expect(
      await screen.findByText("CSV Generator Page Mock")
    ).toBeInTheDocument();
  });

  test("переход на страницу истории при клике по ссылке", async () => {
    render(<App />);

    await screen.findByText("CSV Analytics Page");
    const historyLink = screen.getByRole("link", { name: /История/i });

    await userEvent.click(historyLink);
    expect(await screen.findByText("History Page Mock")).toBeInTheDocument();
  });
});
