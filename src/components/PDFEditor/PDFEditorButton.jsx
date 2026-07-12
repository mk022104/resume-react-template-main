import React, { useState } from 'react';
import DocumentTools from './DocumentTools';

export default function PDFEditorButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          right: 20,
          bottom: 20,
          zIndex: 1100,
          background: '#2563eb',
          color: 'white',
          border: 'none',
          padding: '10px 14px',
          borderRadius: 12,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 10px 30px rgba(37,99,235,0.3)',
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 2H14L18 6V22H6V2Z" fill="white" opacity="0.9" />
          <path d="M14 2V6H18" fill="white" opacity="0.7" />
          <path d="M8 13H16" stroke="#2563eb" strokeWidth="2" />
          <path d="M8 17H16" stroke="#2563eb" strokeWidth="2" />
          <path d="M8 9H12" stroke="#2563eb" strokeWidth="2" />
        </svg>
        Document Tools
      </button>
      {open && <DocumentTools onClose={() => setOpen(false)} />}
    </>
  );
}
