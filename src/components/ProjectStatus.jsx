export default function ProjectStatus({ isLive, className = '' }) {
  return (
    <span
      title={isLive ? 'Deployed and live' : 'Not deployed yet'}
      className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest ${
        isLive ? 'text-mute' : 'text-mute-2'
      } ${className}`}
    >
      {/* live indicator dot */}
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${isLive ? 'bg-primary' : 'bg-primary/25'}`}
      />
      {isLive ? 'Deployed' : 'Not Deployed'}
    </span>
  );
}
