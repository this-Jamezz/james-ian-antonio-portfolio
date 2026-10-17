import { useRef } from 'react';
import useModalDismiss from '../lib/use-modal';

export default function ConfirmRedirectModal({ open, project, onConfirm, onCancel }) {
  const confirmRef = useRef(null);
  const panelRef = useModalDismiss(open, onCancel, confirmRef);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      {/* backdrop */}
      <button
        type="button"
        aria-label="Cancel redirect"
        tabIndex={-1}
        onClick={onCancel}
        className="absolute inset-0 cursor-default bg-primary/40 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="redirect-title"
        aria-describedby="redirect-desc"
        className="animate-modal relative w-full max-w-sm rounded-2xl border border-border bg-white/60 p-6 shadow-lg backdrop-blur-md"
      >
        {/* techy catch: terminal-style label */}
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          Leave site
        </p>

        <h2 id="redirect-title" className="mt-3 text-xl font-bold tracking-tight text-primary">
          Open {project.title}?
        </h2>

        <p id="redirect-desc" className="mt-3 text-sm leading-relaxed text-primary/70">
          You&apos;re about to visit the live deployment in a new tab.
        </p>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-primary/20 bg-white/60 px-5 py-2.5 text-sm font-bold text-primary backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Cancel
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/85 hover:shadow-lg hover:shadow-accent/25 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Open live site
          </button>
        </div>
      </div>
    </div>
  );
}
