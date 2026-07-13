import React, { useEffect, useRef, useState } from 'react';
import { getChatReply } from './portfolioKnowledge';
import './ChatWidget.css';

const WELCOME =
  "Hi! Ask me anything about Madhukar — skills, experience, education, services, or how to get in touch.";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', text: WELCOME },
  ]);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const sendMessage = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMsg = { id: Date.now(), role: 'user', text };
    const botMsg = {
      id: Date.now() + 1,
      role: 'bot',
      text: getChatReply(text),
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  return (
    <>
      <button
        type="button"
        className="chat-fab"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M4 6a3 3 0 013-3h10a3 3 0 013 3v8a3 3 0 01-3 3H9l-4 3v-3a3 3 0 01-3-3V6z"
            fill="white"
          />
        </svg>
        Chat
      </button>

      {open && (
        <div className="chat-panel" role="dialog" aria-label="Portfolio chatbot">
          <div className="chat-header">
            <div>
              <div className="chat-title">Ask Madhukar</div>
              <div className="chat-subtitle">Portfolio assistant</div>
            </div>
            <button
              type="button"
              className="chat-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              &times;
            </button>
          </div>

          <div className="chat-messages" ref={listRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={
                  msg.role === 'user' ? 'chat-bubble chat-bubble-user' : 'chat-bubble chat-bubble-bot'
                }
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form className="chat-form" onSubmit={sendMessage}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, experience..."
              className="chat-input"
              maxLength={500}
              autoComplete="off"
            />
            <button type="submit" className="chat-send">
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
