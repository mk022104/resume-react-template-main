import { askChatGPTStyle } from './askAI';

const originalFetch = global.fetch;
const originalApiKey = process.env.REACT_APP_GEMINI_API_KEY;
const jsonResponse = (body, ok = true) => ({
  ok,
  status: ok ? 200 : 503,
  json: jest.fn().mockResolvedValue(body),
});

beforeEach(() => {
  global.fetch = jest.fn();
  delete process.env.REACT_APP_GEMINI_API_KEY;
});

afterEach(() => {
  global.fetch = originalFetch;
  if (originalApiKey === undefined) {
    delete process.env.REACT_APP_GEMINI_API_KEY;
  } else {
    process.env.REACT_APP_GEMINI_API_KEY = originalApiKey;
  }
  jest.restoreAllMocks();
});

test('returns the Netlify chat reply when the endpoint succeeds', async () => {
  global.fetch.mockResolvedValue(jsonResponse({ reply: 'Hello from Netlify' }));

  await expect(askChatGPTStyle('hello')).resolves.toBe('Hello from Netlify');
  expect(global.fetch).toHaveBeenCalledWith(
    '/api/chat',
    expect.objectContaining({ method: 'POST' })
  );
});

test('returns null when Netlify fails and no Gemini API key is configured', async () => {
  global.fetch.mockResolvedValue(jsonResponse({}, false));

  await expect(askChatGPTStyle('hello')).resolves.toBeNull();
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

test('falls back to Gemini and joins response text parts', async () => {
  process.env.REACT_APP_GEMINI_API_KEY = 'test key';
  global.fetch
    .mockRejectedValueOnce(new Error('Netlify unavailable'))
    .mockResolvedValueOnce(
      jsonResponse({
        candidates: [
          {
            content: {
              parts: [{ text: 'First part' }, {}, { text: 'Second part' }],
            },
          },
        ],
      })
    );

  await expect(askChatGPTStyle('hello')).resolves.toBe(
    'First part\nSecond part'
  );
  expect(global.fetch).toHaveBeenCalledTimes(2);
  expect(global.fetch.mock.calls[1][0]).toContain('key=test%20key');
});

test('returns null when Gemini returns an empty response', async () => {
  process.env.REACT_APP_GEMINI_API_KEY = 'test-key';
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  global.fetch
    .mockResolvedValueOnce(jsonResponse({}, false))
    .mockResolvedValueOnce(jsonResponse({ candidates: [] }));

  await expect(askChatGPTStyle('hello')).resolves.toBeNull();
  expect(global.fetch).toHaveBeenCalledTimes(2);
});

test('handles a thrown Gemini request and returns null', async () => {
  process.env.REACT_APP_GEMINI_API_KEY = 'test-key';
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  global.fetch
    .mockResolvedValueOnce(jsonResponse({}, false))
    .mockRejectedValueOnce(new Error('Gemini unavailable'));

  await expect(askChatGPTStyle('hello')).resolves.toBeNull();
  expect(console.warn).toHaveBeenCalledWith(
    'Gemini fallback error',
    expect.any(Error)
  );
});
