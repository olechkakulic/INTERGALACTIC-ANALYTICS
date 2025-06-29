import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FileDropzone } from '../../FileDropZone/FileDropZone';

describe('Компонент FileDropzone', () => {
  it('отклоняет файлы, не являющиеся CSV', () => {
    const mockOnFileSelect = jest.fn();
    const { container } = render(
      <FileDropzone onFileSelect={mockOnFileSelect} status="idle" />
    );
    
    const input = container.querySelector('input[type="file"]');
    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    
    fireEvent.change(input, { target: { files: [file] } });
    expect(mockOnFileSelect).toHaveBeenCalledWith(null, 'error');
  });
});
