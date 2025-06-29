import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CsvGeneratorPage } from "../../CsvGeneratorPage";
import * as api from "../../api/GenerateReport";
import { MemoryRouter } from "react-router-dom";
jest.mock("../../api/GenerateReport");

describe("Страница генератора CSV (CsvGeneratorPage)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("отображает начальное состояние", () => {
    render(
      <MemoryRouter>
        <CsvGeneratorPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Сгенерируйте готовый csv-файл нажатием одной кнопки")
    ).toBeInTheDocument();
    expect(screen.getByText("Начать генерацию")).toBeInTheDocument();
    expect(
      screen.queryByText("идёт процесс генерации...")
    ).not.toBeInTheDocument();
  });

  it("показывает индикатор загрузки и успешно завершает генерацию", async () => {
    api.generateReport.mockResolvedValue({ success: true });

    render(
      <MemoryRouter>
        <CsvGeneratorPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Начать генерацию"));
    expect(screen.getByAltText("Загрузка")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("файл сгенерирован!")).toBeInTheDocument();
    });
  });

  it("отображает сообщение об ошибке при неудаче генерации", async () => {
    api.generateReport.mockResolvedValue({ success: false, error: "Error" });

    render(
      <MemoryRouter>
        <CsvGeneratorPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Начать генерацию"));

    await waitFor(() => {
      expect(screen.getByText("упс, не то...")).toBeInTheDocument();
    });
  });
});
