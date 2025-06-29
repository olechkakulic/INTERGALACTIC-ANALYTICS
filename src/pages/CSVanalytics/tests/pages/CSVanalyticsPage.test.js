import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CSVanalytics } from '../../CSVanalyticsPage';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../api/useCSVProcessing', () => ({
  useCSVProcessing: jest.fn(),
}));

describe('CSVanalytics Page', () => {
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

  it('renders title and submit button (disabled)', () => {
    renderPage();
    
    // Используем более гибкий поиск текста
    expect(
      screen.getByText((content, element) => {
        return content.includes('Загрузите') && 
               content.includes('csv') && 
               content.includes('полную информацию');
      })
    ).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: /отправить/i });
    expect(submitBtn).toBeDisabled();
  });

  it('enables submit button when file is selected', () => {
    require('../../api/useCSVProcessing').useCSVProcessing.mockReturnValue({
      ...baseMockReturn,
      file: new File(['test'], 'file.csv'),
    });

    renderPage();
    const submitBtn = screen.getByRole('button', { name: /отправить/i });
    expect(submitBtn).toBeEnabled();
  });

  it('calls processFile on submit', async () => {
    const file = new File(['test'], 'file.csv');
    require('../../api/useCSVProcessing').useCSVProcessing.mockReturnValue({
      ...baseMockReturn,
      file,
    });

    renderPage();
    const submitBtn = screen.getByRole('button', { name: /отправить/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockProcessFile).toHaveBeenCalledWith(file);
    });
  });

  it('shows ResultsDisplay when results are available', () => {
    require('../../api/useCSVProcessing').useCSVProcessing.mockReturnValue({
      ...baseMockReturn,
      file: new File(['test'], 'file.csv'),
      status: 'success',
      results: { rows: 42, columns: 3 },
    });

    renderPage();
    
    // Ищем конкретные числа в результатах
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('shows highlights placeholder when no results yet', () => {
    renderPage();
    expect(screen.getByText('Здесь появятся хайлайты')).toBeInTheDocument();
  });
});