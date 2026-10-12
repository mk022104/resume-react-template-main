import { askChatGPTStyle } from './askAI';
import {
  PROFILE,
  getAssistantReply,
  getChatReply,
  getGeneralReply,
  getPersonalReply,
  getSpecificFieldReply,
  getWikipediaReply,
} from './portfolioKnowledge';

jest.mock('./askAI', () => ({
  askChatGPTStyle: jest.fn(),
}));

const originalFetch = global.fetch;
const response = (body, ok = true) => ({
  ok,
  json: jest.fn().mockResolvedValue(body),
});

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

describe('portfolio knowledge replies', () => {
  test('builds a profile from resume information', () => {
    expect(PROFILE.fullName).toBe('Madhukar Reddy Gangapuram');
    expect(PROFILE.skills).toContain('React.js');
    expect(PROFILE.experience[0].company).toBe('Pearson');
    expect(PROFILE.contact).toContain(PROFILE.email);
  });

  test('handles empty questions, greetings, and general questions', () => {
    expect(getPersonalReply('  ')).toMatchObject({ matched: true });
    expect(getPersonalReply('Hello there').answer).toContain(
      "Madhukar's assistant"
    );
    expect(getPersonalReply('What is React?')).toEqual({
      matched: false,
      answer: null,
    });
    expect(getPersonalReply('React')).toMatchObject({
      matched: true,
      answer: expect.stringContaining('Senior React JS / Frontend Developer'),
    });
  });

  test('answers personal resume FAQs and provides a deprecated fallback reply', () => {
    expect(getPersonalReply('What are Madhukar skills?').answer).toContain(
      "Technical skills from Madhukar's resume"
    );
    expect(getPersonalReply('Who is Madhukar?').answer).toContain(
      'Madhukar Reddy Gangapuram'
    );
    expect(getChatReply('an unrelated question')).toContain(
      'I can answer questions about Madhukar Ganga'
    );
  });

  test('answers direct fields, projects, years, and work locations', () => {
    expect(getSpecificFieldReply('phone number')).toBe('984-377-1236');
    expect(getSpecificFieldReply('email address')).toBe(
      'Madhu.ganga2018@gmail.com'
    );
    expect(getSpecificFieldReply('current role')).toContain(
      'Senior UI Developer at Pearson'
    );
    expect(getSpecificFieldReply('previous project')).toContain(
      'Cox Automotive'
    );
    expect(getSpecificFieldReply('project in 2020')).toContain('State Farm');
    expect(getSpecificFieldReply('project in 2099')).toContain(
      'No resume project listed for 2099.'
    );
    expect(getSpecificFieldReply('Cox fleet project')).toContain(
      'Fleet Management & Vehicle Maintenance Platform'
    );
    expect(getSpecificFieldReply('Durham')).toContain('Fidelity Investments');
    expect(getSpecificFieldReply('all work locations')).toContain('Cary, NC');
    expect(getSpecificFieldReply('something unrelated')).toBeNull();
    expect(getSpecificFieldReply('')).toBeNull();
  });

  test('uses Wikipedia search and summary results when available', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(response([null, ['React (software)']]))
      .mockResolvedValueOnce(
        response({
          extract: 'React is a JavaScript library.',
          content_urls: { desktop: { page: 'https://example.test/react' } },
        })
      );

    await expect(getWikipediaReply('What is React?')).resolves.toContain(
      'React is a JavaScript library.\n\nSource: https://example.test/react'
    );
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  test('returns Wikipedia descriptions and handles missing or failed responses', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(response([null, ['Topic']]))
      .mockResolvedValueOnce(response({ description: 'A short description.' }));
    await expect(getWikipediaReply('Topic')).resolves.toBe(
      'A short description.'
    );

    global.fetch = jest.fn().mockResolvedValue(response({}, false));
    await expect(getWikipediaReply('Topic')).resolves.toBeNull();

    global.fetch = jest.fn().mockResolvedValue(response([null, []]));
    await expect(getWikipediaReply('Topic')).resolves.toBeNull();

    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(response([null, ['Topic']]))
      .mockResolvedValueOnce(response({}, false));
    await expect(getWikipediaReply('Topic')).resolves.toBeNull();

    global.fetch = jest.fn().mockRejectedValue(new Error('offline'));
    await expect(getWikipediaReply('Topic')).resolves.toBeNull();
    await expect(getWikipediaReply('')).resolves.toBeNull();
  });

  test('prefers AI for general replies and returns null when all sources miss', async () => {
    askChatGPTStyle.mockResolvedValueOnce('AI answer');
    await expect(getGeneralReply('What is React?')).resolves.toBe('AI answer');

    askChatGPTStyle.mockResolvedValueOnce(null);
    global.fetch = jest.fn().mockResolvedValue(response([null, []]));
    await expect(
      getGeneralReply('What is an unknown topic?')
    ).resolves.toBeNull();
  });

  test('tries specific answers, AI, FAQ, and general fallbacks in order', async () => {
    await expect(getAssistantReply('')).resolves.toContain(
      'Please type a question'
    );
    await expect(getAssistantReply('phone')).resolves.toBe('984-377-1236');

    askChatGPTStyle.mockResolvedValueOnce('AI response');
    await expect(getAssistantReply('Tell me something general')).resolves.toBe(
      'AI response'
    );

    askChatGPTStyle.mockResolvedValueOnce(null);
    await expect(getAssistantReply('hello')).resolves.toContain(
      "Madhukar's assistant"
    );

    askChatGPTStyle.mockResolvedValueOnce(null);
    global.fetch = jest.fn().mockResolvedValue(response([null, []]));
    await expect(
      getAssistantReply('What is an unknown topic?')
    ).resolves.toContain('AI is not connected yet.');
  });
});
