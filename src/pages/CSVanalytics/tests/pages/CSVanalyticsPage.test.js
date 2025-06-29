import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CSVanalytics } from '../../CSVanalyticsPage';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../api/useCSVProcessing', () => ({
  useCSVProcessing: jest.fn(),
}));

jest.mock('../../ResultsDisplay/ResultsDisplay', () => ({
  ResultsDisplay: () => <div data-testid="results-display" />,
}));

describe('Страница аналитики CSV (CSVanalytics)', () => {
  const mockProcessFile = jest.fn();
  const mockHandleFileChange = jest.fn();
  const mockReset = jest.fn();

  const baseMockReturn = {
    file: null,
    status: 'idle',
    results: null,
    handleFileChange: mockHandleFileChange,
    processFile: mockProcessFile,
    reset: mockReset,
  };

  const renderPage = () =>
    render(
      <MemoryRouter>
        <CSVanalytics />
      </MemoryRouter>
    );

  beforeEach(() => {
    jest.clearAllMocks();
    require('../../api/useCSVProcessing').useCSVProcessing.mockReturnValue(baseMockReturn);
  });

  it('отображает заголовок и неактивную кнопку отправки', () => {
    renderPage();

    expect(screen.getByText(/Загрузите/)).toBeInTheDocument();
    expect(screen.getByText(/полную информацию/)).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: /Отправить/i });
    expect(submitBtn).toBeDisabled();
  });

  it('активирует кнопку отправки при выборе файла', () => {
    require('../../api/useCSVProcessing').useCSVProcessing.mockReturnValue({
      ...baseMockReturn,
      file: new File(['test'], 'file.csv'),
    });

    renderPage();
    const submitBtn = screen.getByRole('button', { name: /Отправить/i });
    expect(submitBtn).toBeEnabled();
  });

  it('вызывает processFile при отправке', async () => {
    const file = new File(['test'], 'file.csv');
    require('../../api/useCSVProcessing').useCSVProcessing.mockReturnValue({
      ...baseMockReturn,
      file,
    });

    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Отправить/i }));

    await waitFor(() => {
      expect(mockProcessFile).toHaveBeenCalledWith(file);
    });
  });

  it('отображает компонент результатов при успешной обработке', () => {
    require('../../api/useCSVProcessing').useCSVProcessing.mockReturnValue({
      ...baseMockReturn,
      file: new File(['test'], 'file.csv'),
      status: 'success',
      results: { },
    });

    renderPage();
    expect(screen.getByTestId('results-display')).toBeInTheDocument();
  });

  it('отображает заглушку для результатов при их отсутствии', () => {
    renderPage();
    expect(screen.getByText('Здесь появятся хайлайты')).toBeInTheDocument();
  });
});
