import { render, screen } from '@testing-library/react';
import { GeneratorButton } from '../../GenerateButton/GenerateButton';

describe('GeneratorButton', () => {
  it('кнопка должна быть неактивной вовремя загрузки и после успешной генерации', () => {
    const mockOnGenerate = jest.fn();

    const { rerender } = render(
      <GeneratorButton status="loading" onGenerate={mockOnGenerate} />
    );

    const [mainButton] = screen.getAllByRole('button');
    expect(mainButton).toBeDisabled();

    rerender(
      <GeneratorButton status="success" onGenerate={mockOnGenerate} />
    );

    const [doneButton, resetButton] = screen.getAllByRole('button');
    expect(doneButton).toBeDisabled();
    expect(resetButton).toBeEnabled(); 
  });
});
