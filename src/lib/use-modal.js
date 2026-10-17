import { useEffect, useRef } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled])';

/**
 * Shared modal behaviour for every dialog in the app:
 * - Escape closes
 * - Tab / Shift+Tab is trapped inside the panel
 * - background scroll is locked while open
 * - focus moves into the dialog on open and returns to the trigger on close
 *
 * @param {boolean} open
 * @param {Function} onClose
 * @param {{ current: HTMLElement | null }} [initialFocusRef] element to focus on open (defaults to first focusable)
 * @returns {{ current: HTMLElement | null }} ref to attach to the dialog panel
 */
export default function useModalDismiss(open, onClose, initialFocusRef) {
  const panelRef = useRef(null);

  // Keep the latest callback in a ref so callers can pass an inline function
  // without re-running the effect (re-locking scroll and stealing focus).
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const target = initialFocusRef?.current ?? panelRef.current?.querySelector(FOCUSABLE);
    target?.focus();

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = panelRef.current?.querySelectorAll(FOCUSABLE);
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [open, initialFocusRef]);

  return panelRef;
}
