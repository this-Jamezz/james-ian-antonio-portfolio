import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let lenis = null;
let rafId = 0;

export function initSmoothScroll() {
  if (typeof window === 'undefined') return null;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  const loop = (time) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(loop);
  };
  rafId = requestAnimationFrame(loop);

  return lenis;
}

export function destroySmoothScroll() {
  cancelAnimationFrame(rafId);
  lenis?.destroy();
  lenis = null;
}

export function scrollToSectionId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -96, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
