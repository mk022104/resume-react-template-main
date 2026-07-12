import React, { useEffect, useState, useRef } from 'react';
import './PDFEditor.css';

const loadScript = (src, globalName) => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined')
      return reject(new Error('No window object'));
    if (globalName && window[globalName]) return resolve(window[globalName]);
    const existing = Array.from(document.scripts).find((s) => s.src === src);
    if (existing) {
      existing.addEventListener('load', () =>
        resolve(globalName ? window[globalName] : undefined)
      );
      existing.addEventListener('error', reject);
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve(globalName ? window[globalName] : undefined);
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const loadPdfJs = async () => {
  const pdfjsLib =
    window.pdfjsLib ||
    (await loadScript(
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.min.js',
      'pdfjsLib'
    ));
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js';
  return pdfjsLib;
};

const loadPdfLib = async () => {
  const pdfLib =
    window.PDFLib ||
    (await loadScript(
      'https://unpkg.com/pdf-lib/dist/pdf-lib.min.js',
      'PDFLib'
    ));
  return pdfLib;
};

const hexToRgb = (hex) => {
  const normalized = hex.replace('#', '');
  const bigint = parseInt(normalized, 16);
  return {
    r: ((bigint >> 16) & 255) / 255,
    g: ((bigint >> 8) & 255) / 255,
    b: (bigint & 255) / 255,
  };
};

export default function PDFEditor({ onClose, embedded = false }) {
  const [fileName, setFileName] = useState(null);
  const [originalBytes, setOriginalBytes] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [mode, setMode] = useState('read');
  const [fontSize, setFontSize] = useState(14);
  const [fontColor, setFontColor] = useState('#000000');
  const containerRef = useRef(null);
  const canvasesRef = useRef({});
  const canvasSizesRef = useRef({});
  const overlayRefs = useRef({});
  const addingTextRef = useRef(false);
  const fontSizeRef = useRef(fontSize);
  const fontColorRef = useRef(fontColor);
  const modeRef = useRef(mode);
  const [annotations, setAnnotations] = useState([]);
  const [addingText, setAddingText] = useState(false);
  const pdfjsRef = useRef(null);

  useEffect(() => {
    return () => {
      // cleanup
      canvasesRef.current = {};
      canvasSizesRef.current = {};
    };
  }, []);

  useEffect(() => {
    addingTextRef.current = addingText;
  }, [addingText]);

  useEffect(() => {
    fontSizeRef.current = fontSize;
  }, [fontSize]);

  useEffect(() => {
    fontColorRef.current = fontColor;
  }, [fontColor]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  const handleFile = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFileName(f.name);
    const ab = await f.arrayBuffer();
    setOriginalBytes(ab);
    const pdfjsLib = pdfjsRef.current || (await loadPdfJs());
    pdfjsRef.current = pdfjsLib;
    const loadingTask = pdfjsLib.getDocument({ data: ab });
    const pdf = await loadingTask.promise;
    setPdfDoc(pdf);
    setPageCount(pdf.numPages);
    setMode('read');
    setAnnotations([]);
  };

  useEffect(() => {
    if (!pdfDoc) return;
    (async () => {
      // render each page into canvas
      const container = containerRef.current;
      container.innerHTML = '';
      for (let p = 1; p <= pdfDoc.numPages; ++p) {
        const page = await pdfDoc.getPage(p);
        const viewport = page.getViewport({ scale: 1.5 });
        const wrap = document.createElement('div');
        wrap.className = 'pdf-page-canvas-wrap';
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        canvas.dataset.page = p;
        canvasSizesRef.current[p] = {
          width: viewport.width,
          height: viewport.height,
        };
        const ctx = canvas.getContext('2d');
        const renderContext = { canvasContext: ctx, viewport };
        await page.render(renderContext).promise;

        wrap.appendChild(canvas);
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.left = '0';
        overlay.style.top = '0';
        overlay.style.width = `${viewport.width}px`;
        overlay.style.height = `${viewport.height}px`;
        overlay.style.pointerEvents = 'auto';
        overlay.className = 'pdf-overlay';
        overlay.addEventListener('click', (ev) => {
          if (modeRef.current !== 'edit' || !addingTextRef.current) return;
          const rect = overlay.getBoundingClientRect();
          const x = ev.clientX - rect.left;
          const y = ev.clientY - rect.top;
          const text = prompt('Text to add:', '');
          if (!text) return;
          const ann = {
            page: p,
            x,
            y,
            text,
            fontSize: fontSizeRef.current,
            color: fontColorRef.current,
          };
          setAnnotations((a) => [...a, ann]);
          setAddingText(false);
        });
        wrap.style.position = 'relative';
        wrap.appendChild(overlay);
        overlayRefs.current[p] = overlay;
        container.appendChild(wrap);
      }
    })();
  }, [pdfDoc]);

  useEffect(() => {
    if (!pdfDoc) return;
    Object.values(overlayRefs.current).forEach((overlay) => {
      overlay.innerHTML = '';
    });

    annotations.forEach((ann, idx) => {
      const overlay = overlayRefs.current[ann.page];
      if (!overlay) return;
      const annElement = document.createElement('div');
      annElement.className = 'annotation';
      annElement.style.left = `${ann.x}px`;
      annElement.style.top = `${ann.y}px`;
      annElement.style.fontSize = `${ann.fontSize}px`;
      annElement.style.color = ann.color || '#000';
      annElement.style.pointerEvents = 'auto';
      annElement.textContent = ann.text;
      annElement.addEventListener('click', (event) => {
        event.stopPropagation();
        if (modeRef.current !== 'edit') return;
        const newText = prompt('Edit text:', ann.text);
        if (newText === null) return;
        setAnnotations((prev) =>
          prev.map((a, i) => (i === idx ? { ...a, text: newText } : a))
        );
      });
      overlay.appendChild(annElement);
    });
  }, [annotations, pdfDoc, mode]);

  const handleSave = async () => {
    if (!originalBytes) return alert('No PDF loaded');
    const PDFLib = await loadPdfLib();
    const { PDFDocument, StandardFonts, rgb } = PDFLib;
    const pdfLibDoc = await PDFDocument.load(originalBytes);
    const helvetica = await pdfLibDoc.embedFont(StandardFonts.Helvetica);
    for (const ann of annotations) {
      const page = pdfLibDoc.getPage(ann.page - 1);
      const { width: pdfWidth, height: pdfHeight } = page.getSize();
      const canvasSize = canvasSizesRef.current[ann.page];
      if (!canvasSize) continue;
      const scaleX = pdfWidth / canvasSize.width;
      const scaleY = pdfHeight / canvasSize.height;
      const x = ann.x * scaleX;
      const y = pdfHeight - ann.y * scaleY - (ann.fontSize || 12);
      const color = ann.color ? hexToRgb(ann.color) : { r: 0, g: 0, b: 0 };
      page.drawText(ann.text, {
        x,
        y,
        size: ann.fontSize || 12,
        font: helvetica,
        color: rgb(color.r, color.g, color.b),
      });
    }
    const modified = await pdfLibDoc.save();
    const blob = new Blob([modified], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName ? `edited-${fileName}` : 'edited.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const content = (
    <>
        <div className="pdf-editor-toolbar">
          {pdfDoc && (
            <>
              <button
                type="button"
                onClick={() => {
                  setMode('read');
                  setAddingText(false);
                }}
                className={
                  mode === 'read' ? 'pdf-mode-button active' : 'pdf-mode-button'
                }
              >
                Read
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('edit');
                  setAddingText(false);
                }}
                className={
                  mode === 'edit' ? 'pdf-mode-button active' : 'pdf-mode-button'
                }
              >
                Edit
              </button>
              {mode === 'edit' && (
                <>
                  <button type="button" onClick={() => setAddingText(true)}>
                    Add Text
                  </button>
                  <span className="pdf-edit-instruction">
                    Click on the document to place text.
                  </span>
                  <label className="pdf-setting">
                    Font size
                    <select
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                    >
                      {[12, 14, 16, 18, 20, 24].map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="pdf-setting">
                    Color
                    <input
                      type="color"
                      value={fontColor}
                      onChange={(e) => setFontColor(e.target.value)}
                    />
                  </label>
                </>
              )}
              <button type="button" onClick={handleSave}>
                Save PDF
              </button>
              <div className="pdf-editor-status">Pages: {pageCount}</div>
              <div className="pdf-editor-filename">{fileName}</div>
            </>
          )}
        </div>
        <div className="pdf-editor-body">
          {!pdfDoc ? (
            <div className="pdf-editor-empty">
              <label className="pdf-upload-card">
                <div className="pdf-upload-icon">📄</div>
                <div className="pdf-upload-title">Choose PDF file</div>
                <div className="pdf-upload-caption">
                  Only PDF files are supported.
                </div>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFile}
                />
              </label>
            </div>
          ) : (
            <div ref={containerRef} className="pdf-editor-canvas-list"></div>
          )}
        </div>
    </>
  );

  if (embedded) {
    return <div className="pdf-editor-embedded">{content}</div>;
  }

  return (
    <div className="pdf-editor-overlay">
      <div className="pdf-editor-modal">
        <button
          className="pdf-editor-close"
          onClick={() => onClose && onClose()}
          type="button"
        >
          ×
        </button>
        {content}
      </div>
    </div>
  );
}
