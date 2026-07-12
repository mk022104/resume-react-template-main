import React, { useState } from 'react';
import PDFEditor from './PDFEditor';
import WordToPDF from './WordToPDF';
import PDFToWord from './PDFToWord';
import './PDFEditor.css';

const TABS = [
  { id: 'editor', label: 'PDF Editor' },
  { id: 'word-to-pdf', label: 'Word → PDF' },
  { id: 'pdf-to-word', label: 'PDF → Word' },
];

export default function DocumentTools({ onClose }) {
  const [activeTab, setActiveTab] = useState('editor');

  return (
    <div
      className="pdf-editor-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div className="pdf-editor-modal document-tools-modal">
        <button
          className="pdf-editor-close"
          onClick={(e) => {
            e.stopPropagation();
            if (onClose) onClose();
          }}
          type="button"
          aria-label="Close"
        >
          ×
        </button>

        <div className="document-tools-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={
                activeTab === tab.id
                  ? 'document-tab active'
                  : 'document-tab'
              }
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="document-tools-content">
          {activeTab === 'editor' && <PDFEditor embedded />}
          {activeTab === 'word-to-pdf' && <WordToPDF />}
          {activeTab === 'pdf-to-word' && <PDFToWord />}
        </div>
      </div>
    </div>
  );
}
