import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('./pages/CSVanalytics/CSVanalyticsPage', () => {
  const { Link } = require('react-router-dom');
  return {
    CSVanalytics: () => (
      <div data-testid="analytics-page">
        <div>CSV Analytics Page</div>
        <nav>
          <Link to="/csvgenerate">CSV Генератор</Link>
          <Link to="/history">История</Link>
        </nav>
      </div>
    ),
  };
});


jest.mock('./pages/CSVgeneritcs/CsvGeneratorPage', () => ({
  CsvGeneratorPage: () => <div data-testid="generator-page">CSV Generator Page Mock</div>,
}));

jest.mock('./pages/History/HistoryPage', () => ({
  History: () => <div data-testid="history-page">History Page Mock</div>,
}));

describe('Навигация по приложению', () => {
  test('по умолчанию отображается страница аналитики CSV', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('analytics-page')).toBeInTheDocument();
  });

  test('переход на страницу генератора CSV', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    await user.click(screen.getByText('CSV Генератор'));
    expect(screen.getByTestId('generator-page')).toBeInTheDocument();
  });

  test('переход на страницу истории', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    await user.click(screen.getByText('История'));
    expect(screen.getByTestId('history-page')).toBeInTheDocument();
  });
});
