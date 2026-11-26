export default function ProjectPreviewCard({ src, label, alt, className = '', showChrome = false }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-[0_8px_24px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)] ${className}`}
    >
      {showChrome && (
        <div className="flex items-center gap-1 border-b border-border bg-surface/60 px-2.5 py-1.5" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-info" />
          <span className="h-1.5 w-1.5 rounded-full bg-info" />
          <span className="h-1.5 w-1.5 rounded-full bg-info" />
        </div>
      )}

      <div
        className="relative flex aspect-[1678/937] w-full items-center justify-center overflow-hidden bg-linear-to-br from-primary/5 to-info/30"
      >
        {label === 'Linewise' ? (
          <div className="@container relative aspect-[1678/937] w-full overflow-hidden bg-[#09090b] text-white">
            <div className="absolute inset-y-[10%] left-[5%] z-10 flex w-[40%] flex-col justify-between">
              <p className="text-[2.5cqw] font-semibold uppercase tracking-widest text-white/50">Local AI · Call QA</p>
              <p className="text-[7cqw] font-bold leading-[1.05] tracking-tight">Every call,<br />checked <span className="text-[#8298ff]">on-device.</span></p>
              <div className="flex items-center gap-[5%]">
                <img src="/assets/linewise-logo.png" alt="" className="w-[18%] rounded-[20%]" />
                <p className="text-[5cqw] font-bold">Linewise</p>
              </div>
            </div>
            <div aria-hidden="true" className="absolute left-[52%] top-[9%] h-[68%] w-[65%] rotate-[-8deg] rounded-md border border-white/10 bg-[#17171a] p-[3%] shadow-xl">
              <div className="flex gap-1"><span className="h-1 w-1 rounded-full bg-red-400" /><span className="h-1 w-1 rounded-full bg-amber-400" /><span className="h-1 w-1 rounded-full bg-green-400" /></div>
              <p className="mt-[8%] text-[3cqw] font-semibold">Calls list</p>
              <div className="mt-[6%] space-y-[6%] text-[1.8cqw] text-white/55">
                <p className="border-b border-white/10 pb-[4%]">Call review <span className="float-right text-emerald-400">Passed</span></p>
                <p className="border-b border-white/10 pb-[4%]">Call review <span className="float-right text-amber-400">Needs review</span></p>
                <p>Call review <span className="float-right text-emerald-400">Passed</span></p>
              </div>
            </div>
            <div aria-hidden="true" className="absolute left-[62%] top-[47%] h-[65%] w-[62%] rotate-[-8deg] rounded-md border border-white/10 bg-[#202024] p-[3%] shadow-xl">
              <p className="text-[2cqw] font-semibold uppercase tracking-widest text-[#8298ff]">Call detail</p>
              <p className="mt-[7%] text-[3cqw] font-semibold">Transcript &amp; scorecard</p>
              <div className="mt-[8%] h-px bg-white/20" />
              <div className="mt-[7%] space-y-[5%]"><div className="h-1 w-[80%] rounded bg-white/20" /><div className="h-1 w-[65%] rounded bg-white/15" /><div className="h-1 w-[75%] rounded bg-white/15" /></div>
            </div>
          </div>
        ) : src ? (
          label === 'iManage' ? (
            <svg viewBox="0 0 1678 937" role="img" aria-label={alt || label} className="block h-auto w-full">
              <image href={src} width="1678" height="937" />
              <image href="/assets/imanage-mark.svg" x="64" y="735" width="130" height="130" />
              <text x="220" y="835" fill="white" fontFamily="Arial, sans-serif" fontSize="92" fontWeight="700">iMANAGE</text>
            </svg>
          ) : (
            <img src={src} alt={alt || label} className="block h-full w-full object-cover" />
          )
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-mute">
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
