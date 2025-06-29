import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CsvGeneratorPage } from "../../CsvGeneratorPage";
import * as api from "../../api/GenerateReport";
import { MemoryRouter } from "react-router-dom";
jest.mock("../../api/GenerateReport");

describe("CsvGeneratorPage", () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it("корректно отображает начальное состояние", () => {
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

  it("завершаем поток с генерацией", async () => {
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

  it("управление ошибками", async () => {
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
