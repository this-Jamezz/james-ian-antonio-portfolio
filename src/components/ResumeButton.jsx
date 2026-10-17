import { useState } from 'react';
import PdfModal from './PdfModal';
import { RESUME_FILENAME, RESUME_SRC } from '../data/resume';

export default function ResumeButton({ className = '', label = 'Download CV', iconClassName = 'w-4 h-4' }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label="Preview and download CV"
        className={className}
      >
        <svg
          className={iconClassName}
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
        <span>{label}</span>
      </button>

      <PdfModal
        open={open}
        src={RESUME_SRC}
        label="Résumé"
        title={RESUME_FILENAME.replace(/\.pdf$/i, '')}
        downloadName={RESUME_FILENAME}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
