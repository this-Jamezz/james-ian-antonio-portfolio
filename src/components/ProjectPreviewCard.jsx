export default function ProjectPreviewCard({ src, label, alt, className = '', showChrome = false }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border bg-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)] ${className}`}
    >
      {showChrome && (
        <div className="flex items-center gap-1 border-b border-border bg-white/60 px-2.5 py-1.5" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
        </div>
      )}

      <div className="flex aspect-[4/3] w-full items-center justify-center bg-linear-to-br from-black/5 to-accent/10">
        {src ? (
          <img src={src} alt={alt || label} className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-primary/50">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0 0 21.75 19.5V4.5A1.5 1.5 0 0 0 20.25 3H3.75A1.5 1.5 0 0 0 2.25 4.5v15A1.5 1.5 0 0 0 3.75 21Zm10.5-11.25h.008v.008h-.008V9.75Z"
              />
            </svg>
            <span className="text-xs font-medium">{label}</span>
          </div>
        )}
      </div>
    </div>
  );
}