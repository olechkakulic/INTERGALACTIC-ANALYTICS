import { generateReport } from '../../api/GenerateReport';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
  window.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
  window.HTMLAnchorElement.prototype.click = jest.fn();
});

describe('generateReport API', () => {
  it('должна быть успешная генерация', async () => {
    const mockBlob = new Blob(['id,name\n1,Alice'], { type: 'text/csv' });

    fetch.mockResolvedValue({
      ok: true,
      blob: async () => mockBlob,
    });

    const result = await generateReport();

    expect(result.success).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(window.HTMLAnchorElement.prototype.click).toHaveBeenCalled();
  });

  it('должно справляться с ошибками сети', async () => {
    fetch.mockReject(new Error('Network error'));

    const result = await generateReport();
    expect(result.success).toBe(false);
    expect(result.error).toBe('Network error');
  });

  it('должен вызывать апи с правильными параметрами', async () => {
    const mockBlob = new Blob(['test'], { type: 'text/csv' });

    fetch.mockResolvedValue({
      ok: true,
      blob: async () => mockBlob,
    });

    await generateReport();

    const calledUrl = fetch.mock.calls[0][0];
    expect(calledUrl).toContain('size=0.01');
    expect(calledUrl).toContain('maxSpend=1000');
    expect(calledUrl).toMatch(/withErrors=(on|off)/);
  });
});
