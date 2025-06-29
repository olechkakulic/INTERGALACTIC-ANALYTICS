import React from "react";
import { render, screen } from "@testing-library/react";
import { StatusMessage } from "../../StatusMessage/StatusMessage";

describe("Компонент StatusMessage", () => {
  it('не рендерится при статусе "start"', () => {
    const { container } = render(<StatusMessage status="start" />);
    expect(container.firstChild).toBeNull();
  });

  it('показывает сообщение загрузки при статусе "loading"', () => {
    render(<StatusMessage status="loading" />);
    expect(screen.getByText("идёт процесс генерации...")).toBeInTheDocument();
  });

  it('показывает сообщение об успешной генерации при статусе "success"', () => {
    render(<StatusMessage status="success" />);
    expect(screen.getByText("файл сгенерирован!")).toBeInTheDocument();
  });

  it('показывает сообщение об ошибке при статусе "error"', () => {
    render(<StatusMessage status="error" />);
    expect(screen.getByText("упс, не то...")).toBeInTheDocument();
  });
});
