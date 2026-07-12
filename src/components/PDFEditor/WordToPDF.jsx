import React, { useRef, useState } from 'react';
import mammoth from 'mammoth';

const loadHtml2Pdf = () => {
  return new Promise((resolve, reject) => {
    if (window.html2pdf) return resolve(window.html2pdf);
    const existing = Array.from(document.scripts).find((s) =>
      s.src.includes('html2pdf')
    );
    if (existing) {
      existing.addEventListener('load', () => resolve(window.html2pdf));
      existing.addEventListener('error', reject);
      return;
    }
    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.async = true;
    script.onload = () => resolve(window.html2pdf);
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

export default function WordToPDF() {
  const [fileName, setFileName] = useState(null);
  const [htmlContent, setHtmlContent] = useState('');
  const [error, setError] = useState('');
  const [converting, setConverting] = useState(false);
  const previewRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    setHtmlContent('');
    setFileName(file.name);

    const extension = file.name.split('.').pop().toLowerCase();
    if (!['docx', 'doc'].includes(extension)) {
      setError('Please upload a .docx Word document.');
      return;
    }

    if (extension === 'doc') {
      setError(
        'Legacy .doc files are not supported. Please save as .docx and try again.'
      );
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setHtmlContent(result.value);
      if (result.messages.length > 0) {
        console.warn('Word conversion warnings:', result.messages);
      }
    } catch (err) {
      setError('Failed to read Word file. Make sure it is a valid .docx document.');
      console.error(err);
    }
  };

  const handleDownload = async () => {
    if (!previewRef.current || !htmlContent) return;

    setConverting(true);
    setError('');

    try {
      const baseName = fileName ? fileName.replace(/\.docx?$/i, '') : 'document';
      const options = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `${baseName}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };

      const html2pdf = await loadHtml2Pdf();
      await html2pdf().set(options).from(previewRef.current).save();
    } catch (err) {
      setError('Failed to generate PDF. Please try again.');
      console.error(err);
    } finally {
      setConverting(false);
    }
  };

  const handleReset = () => {
    setFileName(null);
    setHtmlContent('');
    setError('');
  };

  return (
    <div className="converter-panel">
      <div className="converter-toolbar">
        {htmlContent && (
          <>
            <button type="button" onClick={handleDownload} disabled={converting}>
              {converting ? 'Converting…' : 'Download PDF'}
            </button>
            <button type="button" onClick={handleReset}>
              Choose another file
            </button>
            <div className="pdf-editor-filename">{fileName}</div>
          </>
        )}
      </div>

      {error && <div className="converter-error">{error}</div>}

      <div className="converter-body">
        {!htmlContent ? (
          <div className="pdf-editor-empty">
            <label className="pdf-upload-card">
              <div className="pdf-upload-icon">📝</div>
              <div className="pdf-upload-title">Choose Word file</div>
              <div className="pdf-upload-caption">
                Upload a .docx file to convert it to PDF.
              </div>
              <input
                type="file"
                accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFile}
              />
            </label>
          </div>
        ) : (
          <div className="converter-preview-wrap">
            <div
              ref={previewRef}
              className="word-preview"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
