import { render } from '@testing-library/react';
import { ResultsDisplay } from '../../ResultsDisplay/ResultsDisplay';
import React from 'react';

describe('Компонент отображения результатов ResultsDisplay', () => {
  const mockResults = {
    totalSpendGalactic: 1000,
    processedRecords: 50,
    minSpendingDay: '1 января',
    maxSpendingCivilization: 'monsters',
  };

  it('корректно отображает все результаты', () => {
    const { getByText } = render(<ResultsDisplay results={mockResults} />);
    
    expect(getByText('1,000')).toBeInTheDocument();
    expect(getByText('50')).toBeInTheDocument();
    expect(getByText('1 января')).toBeInTheDocument();
    expect(getByText('monsters')).toBeInTheDocument();
  });
});
