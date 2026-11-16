import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import pfp from '../assets/pfp.jpg';
import { scrollToSectionId } from '../lib/smooth-scroll';
import { homeBgIcons } from '../data/homeBg';

const GRID_ROWS = 12;
// columns derive from the container's aspect ratio so the horizontal pitch
// between icons matches the vertical one (clamped for very wide/tall screens)
function deriveCols(width, height) {
  const cellH = height / GRID_ROWS;
  return Math.max(5, Math.min(32, Math.round(width / cellH)));
}
// useLayoutEffect without the SSR warning
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export default function Home() {
  const containerRef = useRef(null);
  const spansRef = useRef([]);
  const animRefs = useRef([]);
  const portraitRef = useRef(null);
  const [cols, setCols] = useState(16);

  const homeTechSpread = useMemo(
    () => Array.from({ length: cols * GRID_ROWS }, (_, i) => homeBgIcons[i % homeBgIcons.length]),
    [cols]
  );

  // keep horizontal icon pitch proportional to the vertical one: recompute
  // the column count from the section's aspect ratio as the viewport changes
  useIsoLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const sync = () => setCols(deriveCols(el.clientWidth, el.clientHeight));
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const cellW = rect.width / cols;
      const cellH = rect.height / GRID_ROWS;
      // smaller active area around the cursor
      const radius = Math.hypot(cellW, cellH) * 1.4;
      spansRef.current.forEach((span, i) => {
        // skip icons removed by the keep-clear zones
        if (!span || span.classList.contains('is-hidden')) return;
        const col = i % cols;
        const row = Math.floor(i / cols);
        const cx = (col + 0.5) * cellW;
        const cy = (row + 0.5) * cellH;
        const dist = Math.hypot(mx - cx, my - cy);
        const lit = span.classList.contains('is-lit');
        if (dist <= radius && !lit) {
          // entering the active area: light up + play the icon's animation
          span.classList.add('is-lit');
          animRefs.current[i]?.startAnimation?.();
        } else if (dist > radius && lit) {
          // leaving the active area: settle back down
          span.classList.remove('is-lit');
          animRefs.current[i]?.stopAnimation?.();
        }
      });
    };

    const onLeave = () => {
      spansRef.current.forEach((span, i) => {
        if (!span) return;
        if (span.classList.contains('is-lit')) {
          span.classList.remove('is-lit');
          animRefs.current[i]?.stopAnimation?.();
        }
      });
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, [cols]);

  // hide background icons that would sit under the hero's transparent text
  // (data-bgzone elements) or the portrait, so content never overlaps a
  // (half-cut) icon — icons keep filling every gap around the content.
  // Re-measured on font load, resize and layout changes: Montserrat loads async
  // (display=swap), so the first paint measures a smaller text block than the
  // final one and icons under the headline/description must be re-hidden.
  useEffect(() => {
    // icons are h-5 w-5 (20px) and scale to 1.25 when lit → half-extent ≈ 13px
    const ICON_HALF = 13;
    const pad = 8;

    const hideUnderContent = () => {
      const grid = containerRef.current;
      if (!grid) return;
      const gridRect = grid.getBoundingClientRect();
      // keep-clear zones = the transparent text elements (marked data-bgzone)
      // plus the portrait; opaque elements (button, social chips) mask icons
      // themselves, and icons keep filling every gap around the content
      const section = grid.parentElement;
      const zones = [
        ...(section ? Array.from(section.querySelectorAll('[data-bgzone]')) : []),
        portraitRef.current,
      ]
        .filter(Boolean)
        .map((el) => {
          const r = el.getBoundingClientRect();
          return {
            left: r.left - gridRect.left - pad,
            right: r.right - gridRect.left + pad,
            top: r.top - gridRect.top - pad,
            bottom: r.bottom - gridRect.top + pad,
          };
        });
      const cellW = gridRect.width / cols;
      const cellH = gridRect.height / GRID_ROWS;
      spansRef.current.forEach((span, i) => {
        if (!span) return;
        const col = i % cols;
        const row = Math.floor(i / cols);
        const cx = (col + 0.5) * cellW;
        const cy = (row + 0.5) * cellH;
        // test the icon's own extent (not the cell center) so icons that only
        // brush the content edge are hidden too — no half-cut icons
        const under = zones.some(
          (z) =>
            cx + ICON_HALF >= z.left &&
            cx - ICON_HALF <= z.right &&
            cy + ICON_HALF >= z.top &&
            cy - ICON_HALF <= z.bottom
        );
        span.classList.toggle('is-hidden', under);
      });
    };

    // coalesce bursts (resize streams, font swap, RO ticks) into one paint
    let raf = 0;
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        hideUnderContent();
      });
    };

    hideUnderContent();

    // layout changes: font swap grows the text, section resizes with viewport
    const ro = new ResizeObserver(schedule);
    const sectionEl = containerRef.current?.parentElement;
    if (sectionEl) ro.observe(sectionEl);

    // Montserrat swaps in after first paint → text reflows larger
    let disposed = false;
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!disposed) schedule();
      });
    }

    // the enter animation lifts the portrait ~16px while it plays; re-measure
    // after it settles so edge icons are hidden at the final position
    const settleTimer = setTimeout(schedule, 1100);

    window.addEventListener('resize', schedule);
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      clearTimeout(settleTimer);
      window.removeEventListener('resize', schedule);
    };
  }, [cols]);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center px-6 bg-bg overflow-hidden">
      {/* spread of tech-stack icons filling the whole home page, icon-only, no borders, no halo */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className="pointer-events-auto absolute inset-0 z-0 grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
        }}
      >
        {homeTechSpread.map((item, i) => {
          // build-in delay grows with column + row distance → diagonal wave
          const col = i % cols;
          const row = Math.floor(i / cols);
          return (
            <span
              key={i}
              ref={(el) => { spansRef.current[i] = el; }}
              title={item.name}
              style={{
                ...(item.litHex ? { '--lit': item.litHex } : {}),
                animationDelay: `${(col + row) * 25}ms`,
              }}
              className="icon-in relative flex items-center justify-center"
            >
              <item.Anim
                ref={(el) => { animRefs.current[i] = el; }}
                className="tech-anim relative h-5 w-5"
              />
            </span>
          );
        })}
      </div>
      <div className="pointer-events-none relative z-10 flex w-full max-w-5xl flex-1 flex-col pt-8 md:pt-14">
        <p data-bgzone className="self-center text-xs font-semibold uppercase tracking-widest text-mute animate-enter md:self-start">Home</p>
        {/* details block centers itself in the space under the label — the leftover
            height becomes the big margin between the tab name and the details */}
        <div className="flex flex-1 flex-col items-center md:items-start justify-center text-center md:text-left gap-3 md:gap-4 pb-8 md:pb-14">
          {/* 1:1 portrait directly under the section label — static, no hover effects */}
          <div ref={portraitRef} className="relative w-22 md:w-28 animate-enter [animation-delay:100ms]">
            <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-xl bg-info" aria-hidden="true"></div>
            <img src={pfp} alt="Portrait of James Ian Antonio" className="relative aspect-square w-full rounded-xl bg-bg object-cover shadow-lg" />
          </div>
          <div data-bgzone className="flex flex-col items-center md:items-start text-4xl md:text-5xl font-black tracking-tight text-primary animate-enter [animation-delay:200ms]">
            <p>I am James Ian Antonio,</p>
            {/* third-tone highlight instead of an underline */}
            <span className="w-fit rounded-lg bg-info px-1.5 text-ink">
              a Web and Mobile Developer
            </span>
          </div>
          {/* TODO: add one concrete proof point (users served, load-time win, project outcome) */}
          <p data-bgzone className="mt-3 md:mt-4 font-medium text-sm md:text-base max-w-xl text-mute animate-enter [animation-delay:300ms]">
            I'm a full-stack developer specializing in web and mobile development.
            I turn ideas into practical software solutions by combining thoughtful
            designs, reliable backend systems, and modern technologies.
          </p>
          <div className="pointer-events-auto mt-3 md:mt-4 animate-enter [animation-delay:400ms]">
            <button
              onClick={() => scrollToSectionId('projects')}
              className="cursor-pointer rounded-xl bg-primary px-6 py-3 text-sm font-bold text-bg transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/85 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              View Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
