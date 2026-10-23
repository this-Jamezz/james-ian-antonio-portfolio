import { createPortal } from 'react-dom';
import useModalDismiss from '../lib/use-modal';

/** Full-size viewer for certificate images (used when there is no PDF). */
export default function ImageModal({ open, src, alt, label, onClose }) {
  const panelRef = useModalDismiss(open, onClose);

  if (!open || typeof document === 'undefined') return null;

  // Portalled to <body> so the fixed overlay escapes any backdrop-filter ancestor.
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
        aria-label={`${label} preview`}
        className="animate-modal relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl border border-border bg-surface/60 p-4 shadow-lg backdrop-blur-md sm:p-6"
      >
        {/* close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 rounded-xl border border-border bg-surface/80 p-2 text-mute backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface hover:text-primary active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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

        <img
          src={src}
          alt={alt}
          className="max-h-[80vh] w-full rounded-xl bg-white object-contain"
        />

        <div className="mt-4 flex justify-end">
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-surface/60 px-5 py-2.5 text-sm font-bold text-primary backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Open in new tab
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
