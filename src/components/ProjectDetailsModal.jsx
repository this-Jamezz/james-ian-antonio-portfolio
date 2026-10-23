import { useState } from 'react';
import ProjectPreviewCard from './ProjectPreviewCard';
import ProjectStatus from './ProjectStatus';
import ConfirmRedirectModal from './ConfirmRedirectModal';
import useModalDismiss from '../lib/use-modal';
import { isProjectLive } from '../data/projects';

export default function ProjectDetailsModal({ open, projects, index, onIndexChange, onClose }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const panelRef = useModalDismiss(open, onClose);

  if (!open) return null;

  const project = projects[index];
  if (!project) return null;

  const isLive = isProjectLive(project);
  const hasNav = projects.length > 1;

  // close any pending confirm so it can't leak across projects while paging
  const goTo = (next) => {
    setConfirmOpen(false);
    onIndexChange((next + projects.length) % projects.length);
  };

  const openLiveSite = () => {
    setConfirmOpen(false);
    window.open(project.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close project details"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-primary/40 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="details-title"
        aria-describedby="details-desc"
        className="animate-modal relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-y-auto rounded-2xl border border-border bg-surface/60 p-5 shadow-lg backdrop-blur-md"
      >
        {/* header */}
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-mute">
            Project details
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mt-1.5 -mr-1.5 shrink-0 rounded-xl border border-primary/15 bg-surface/60 p-2 text-mute backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface hover:text-primary active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
        </div>

        {/* thumbnail — capped so the panel fits the viewport without scrolling */}
        <div className="mt-3">
          <ProjectPreviewCard
            src={project.src}
            label={project.label}
            showChrome
            className="mx-auto max-w-[16rem]"
          />
        </div>

        {/* title + status */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <h2
            id="details-title"
            className="text-2xl font-semibold tracking-tight text-primary"
          >
            {project.title}
          </h2>
          <ProjectStatus isLive={isLive} />
        </div>

        {/* description */}
        <p id="details-desc" className="mt-3 text-sm leading-relaxed text-mute">
          {project.description}
        </p>

        {/* full tech stack */}
        <h3 className="mt-4 text-xs font-semibold uppercase tracking-widest text-mute-2">
          Tech stack
        </h3>
        <ul className="mt-2 flex flex-wrap gap-2" aria-label={`${project.title} full tech stack`}>
          {project.tech.map((item) => (
            <li
              key={item}
              className="rounded-full border border-border bg-surface/60 px-3 py-0.5 text-xs font-medium text-mute"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* live site CTA */}
        <div className="mt-5">
          {isLive ? (
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              aria-haspopup="dialog"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-bg transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/85 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18 13.5v1.5a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3H7.5" />
                <path d="M14 4h6v6" />
                <path d="M20 4 10.5 13.5" />
              </svg>
              Open live site
            </button>
          ) : (
            <span className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-primary/15 bg-surface/40 px-5 py-3 text-sm font-bold text-mute-2 backdrop-blur-md">
              Not deployed yet
            </span>
          )}
        </div>

        {/* pager — browse every project, including the ones not shown in the grid */}
        {hasNav && (
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-primary/20 bg-surface/60 px-4 py-2 text-sm font-bold text-primary backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              Prev
            </button>

            <span className="text-xs font-medium tracking-wide text-mute-2">
              {index + 1} / {projects.length}
            </span>

            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-primary/20 bg-surface/60 px-4 py-2 text-sm font-bold text-primary backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Next
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <ConfirmRedirectModal
        open={confirmOpen}
        project={project}
        onConfirm={openLiveSite}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
