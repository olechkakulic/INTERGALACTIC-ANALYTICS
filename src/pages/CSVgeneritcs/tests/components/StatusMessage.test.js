import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatusMessage } from '../../StatusMessage/StatusMessage'

describe('StatusMessage', () => {
  it('нет рендера пока статус === начало', () => {
    const { container } = render(<StatusMessage status="start" />);
    expect(container.firstChild).toBeNull();
  });

  it('показывать сообщение загрузки', () => {
    render(<StatusMessage status="loading" />);
    expect(screen.getByText('идёт процесс генерации...')).toBeInTheDocument();
  });

  it('показывать сообщение о нашей успешности', () => {
    render(<StatusMessage status="success" />);
    expect(screen.getByText('файл сгенерирован!')).toBeInTheDocument();
  });

  it('показывать сообщение с ошибкой', () => {
    render(<StatusMessage status="error" />);
    expect(screen.getByText('упс, не то...')).toBeInTheDocument();
  });
});