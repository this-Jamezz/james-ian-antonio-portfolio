export default function ProjectStatus({ isLive, className = '' }) {
  return (
    <span
      title={isLive ? 'Deployed and live' : 'Not deployed yet'}
      className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-white/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest ${
        isLive ? 'text-primary/70' : 'text-primary/40'
      } ${className}`}
    >
      {/* live indicator dot */}
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${isLive ? 'bg-emerald-500' : 'bg-primary/25'}`}
      />
      {isLive ? 'Deployed' : 'Not Deployed'}
    </span>
  );
}
