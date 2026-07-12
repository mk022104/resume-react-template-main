import React, { useState } from 'react';
import JSZip from 'jszip';

const loadPdfJs = () => {
  return new Promise((resolve, reject) => {
    if (window.pdfjsLib) return resolve(window.pdfjsLib);
    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.min.js';
    script.async = true;
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js';
      resolve(window.pdfjsLib);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const extractTextFromPdf = async (arrayBuffer) => {
  const pdfjsLib = await loadPdfJs();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items.map((item) => item.str).join(' ');
    pages.push(text.trim());
  }

  return pages;
};

const escapeXml = (text) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const buildDocxBlob = async (pageTexts) => {
  const paragraphs = pageTexts
    .map((text) => {
      const safeText = escapeXml(text || '(empty page)');
      return `<w:p><w:r><w:t xml:space="preserve">${safeText}</w:t></w:r></w:p>`;
    })
    .join('');

  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${paragraphs}
    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/>
    </w:sectPr>
  </w:body>
</w:document>`;

  const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

  const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

  const zip = new JSZip();
  zip.file('[Content_Types].xml', contentTypesXml);
  zip.folder('_rels').file('.rels', relsXml);
  zip.folder('word').file('document.xml', documentXml);

  return zip.generateAsync({
    type: 'blob',
    mimeType:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
};

const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export default function PDFToWord() {
  const [fileName, setFileName] = useState(null);
  const [pageTexts, setPageTexts] = useState([]);
  const [error, setError] = useState('');
  const [converting, setConverting] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    setPageTexts([]);
    setFileName(file.name);

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Please upload a PDF file.');
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pages = await extractTextFromPdf(arrayBuffer);
      if (pages.every((p) => !p)) {
        setError(
          'No text found in this PDF. Scanned/image-only PDFs cannot be converted.'
        );
        return;
      }
      setPageTexts(pages);
    } catch (err) {
      setError('Failed to read PDF file. Make sure it is a valid PDF.');
      console.error(err);
    }
  };

  const handleDownload = async () => {
    if (!pageTexts.length) return;

    setConverting(true);
    setError('');

    try {
      const blob = await buildDocxBlob(pageTexts);
      const baseName = fileName ? fileName.replace(/\.pdf$/i, '') : 'document';
      downloadBlob(blob, `${baseName}.docx`);
    } catch (err) {
      setError('Failed to generate Word file. Please try again.');
      console.error(err);
    } finally {
      setConverting(false);
    }
  };

  const handleReset = () => {
    setFileName(null);
    setPageTexts([]);
    setError('');
  };

  return (
    <div className="converter-panel">
      <div className="converter-toolbar">
        {pageTexts.length > 0 && (
          <>
            <button type="button" onClick={handleDownload} disabled={converting}>
              {converting ? 'Converting…' : 'Download Word (.docx)'}
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
        {!pageTexts.length ? (
          <div className="pdf-editor-empty">
            <label className="pdf-upload-card">
              <div className="pdf-upload-icon">📄</div>
              <div className="pdf-upload-title">Choose PDF file</div>
              <div className="pdf-upload-caption">
                Upload a text-based PDF to convert it to Word (.docx).
              </div>
              <input
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleFile}
              />
            </label>
          </div>
        ) : (
          <div className="converter-preview-wrap">
            <div className="word-preview pdf-text-preview">
              {pageTexts.map((text, index) => (
                <div key={index} className="pdf-text-page">
                  <div className="pdf-text-page-label">Page {index + 1}</div>
                  <p>{text || '(empty page)'}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
