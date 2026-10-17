import { createPortal } from 'react-dom';
import useModalDismiss from '../lib/use-modal';
import { PDF_PREVIEW_PARAMS } from '../lib/pdf';

/**
 * Generic PDF preview dialog — used for the résumé and for certificates.
 * `downloadName` is deliberately NOT appended to the preview src, because a
 * fragment on a download link makes some browsers ignore `download`.
 */
export default function PdfModal({ open, src, label, title, downloadName, onClose }) {
  const panelRef = useModalDismiss(open, onClose);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* backdrop */}
      <button
        type="button"
        aria-label={`Close ${label.toLowerCase()} preview`}
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-primary/40 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdf-modal-title"
        className="animate-modal relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl border border-border bg-white/60 p-6 shadow-lg backdrop-blur-md"
      >
        {/* header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              {label}
            </p>
            <h2
              id="pdf-modal-title"
              className="mt-3 truncate text-2xl font-semibold tracking-tight text-primary"
            >
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mt-1.5 -mr-1.5 shrink-0 rounded-xl border border-primary/15 bg-white/60 p-2 text-primary/60 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-primary active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* preview — techy catch: browser chrome dots, viewer toolbar suppressed */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-white/40">
          <div
            className="flex items-center gap-1 border-b border-border bg-white/60 px-2.5 py-1.5"
            aria-hidden="true"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
          </div>
          <iframe
            src={`${src}${PDF_PREVIEW_PARAMS}`}
            title={`Preview of ${title}`}
            className="h-[52vh] w-full bg-white"
          />
        </div>

        {/* footer actions */}
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-white/60 px-5 py-2.5 text-sm font-bold text-primary backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Open in new tab
          </a>
          <a
            href={src}
            download={downloadName ?? title}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/85 hover:shadow-lg hover:shadow-accent/25 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-4-4 4m0 0-4-4m4 4V4" />
            </svg>
            Download PDF
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
