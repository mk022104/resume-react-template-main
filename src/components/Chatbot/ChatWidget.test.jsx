import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { getAssistantReply } from './portfolioKnowledge';
import ChatWidget from './ChatWidget';

jest.mock('./portfolioKnowledge', () => ({
  getAssistantReply: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

test('opens the chat panel, focuses the input, and closes the panel', () => {
  render(<ChatWidget />);

  fireEvent.click(screen.getByRole('button', { name: 'Open chat' }));
  expect(
    screen.getByRole('dialog', { name: 'Portfolio chatbot' })
  ).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText('Ask anything like ChatGPT…')
  ).toHaveFocus();
  expect(
    screen.getByText(/Ask me about Madhukar's resume/)
  ).toBeInTheDocument();

  fireEvent.click(
    screen
      .getByRole('dialog', { name: 'Portfolio chatbot' })
      .querySelector('.chat-close')
  );
  expect(
    screen.queryByRole('dialog', { name: 'Portfolio chatbot' })
  ).not.toBeInTheDocument();
});

test('sends a trimmed message and displays the assistant reply', async () => {
  getAssistantReply.mockResolvedValue('Madhukar is a Senior UI Developer.');
  render(<ChatWidget />);
  fireEvent.click(screen.getByRole('button', { name: 'Open chat' }));

  fireEvent.change(screen.getByPlaceholderText('Ask anything like ChatGPT…'), {
    target: { value: '  Who is Madhukar?  ' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Send' }));

  expect(screen.getByText('Who is Madhukar?')).toBeInTheDocument();
  await waitFor(() => {
    expect(
      screen.getByText('Madhukar is a Senior UI Developer.')
    ).toBeInTheDocument();
  });
  expect(getAssistantReply).toHaveBeenCalledWith('Who is Madhukar?');
  expect(screen.getByPlaceholderText('Ask anything like ChatGPT…')).toHaveValue(
    ''
  );
});

test('does not send blank input and shows a fallback when the assistant throws', async () => {
  render(<ChatWidget />);
  fireEvent.click(screen.getByRole('button', { name: 'Open chat' }));
  fireEvent.click(screen.getByRole('button', { name: 'Send' }));
  expect(getAssistantReply).not.toHaveBeenCalled();

  getAssistantReply.mockRejectedValue(new Error('offline'));
  fireEvent.change(screen.getByPlaceholderText('Ask anything like ChatGPT…'), {
    target: { value: 'help' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Send' }));

  await waitFor(() => {
    expect(
      screen.getByText('Something went wrong answering that. Please try again.')
    ).toBeInTheDocument();
  });
});

test('shows a thinking state and ignores repeated submits while loading', async () => {
  let resolveReply;
  getAssistantReply.mockReturnValue(
    new Promise((resolve) => {
      resolveReply = resolve;
    })
  );
  render(<ChatWidget />);
  fireEvent.click(screen.getByRole('button', { name: 'Open chat' }));
  fireEvent.change(screen.getByPlaceholderText('Ask anything like ChatGPT…'), {
    target: { value: 'hello' },
  });

  const form = screen.getByRole('button', { name: 'Send' }).closest('form');
  fireEvent.submit(form);
  expect(screen.getByText('Thinking…')).toBeInTheDocument();
  fireEvent.submit(form);
  expect(getAssistantReply).toHaveBeenCalledTimes(1);

  resolveReply('Hi there!');
  await waitFor(() =>
    expect(screen.getByText('Hi there!')).toBeInTheDocument()
  );
});
