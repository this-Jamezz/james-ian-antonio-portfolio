import ProjectPreviewCard from './ProjectPreviewCard';
import ProjectStatus from './ProjectStatus';
import { VISIBLE_TECH_COUNT, isProjectLive } from '../data/projects';

export default function ProjectCard({ project, onOpenDetails }) {
  const isLive = isProjectLive(project);

  // Only the first few tech pills render on the card so every card keeps the
  // same height. The remainder collapse into a "+N others" pill.
  const visibleTech = project.tech.slice(0, VISIBLE_TECH_COUNT);
  const hiddenTechCount = project.tech.length - visibleTech.length;

  return (
    <article className="group flex h-full flex-col">
      <ProjectPreviewCard src={project.src} label={project.label} showChrome />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-bold text-primary">{project.title}</h3>
        <ProjectStatus isLive={isLive} />
      </div>

      <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-mute">
        {project.description}
      </p>

      <ul className="mt-3 flex flex-wrap items-center gap-2" aria-label={`${project.title} tech stack`}>
        {visibleTech.map((item) => (
          <li
            key={item}
            className="rounded-full border border-border bg-surface/60 px-3 py-0.5 text-xs font-medium text-mute"
          >
            {item}
          </li>
        ))}

        {hiddenTechCount > 0 && (
          <li>
            <button
              type="button"
              onClick={onOpenDetails}
              aria-haspopup="dialog"
              aria-label={`Show ${hiddenTechCount} more technologies used in ${project.title}`}
              title={`${project.tech.slice(VISIBLE_TECH_COUNT).join(', ')}`}
              className="cursor-pointer rounded-full border border-dashed border-primary/25 bg-surface/60 px-3 py-0.5 text-xs font-medium text-mute transition-colors duration-200 hover:border-info hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              +{hiddenTechCount} others
            </button>
          </li>
        )}
      </ul>

      {/* mt-auto keeps every card's button aligned to the bottom of the row */}
      <div className="mt-auto pt-5">
        <button
          type="button"
          onClick={onOpenDetails}
          aria-haspopup="dialog"
          className={
            isLive
              ? 'inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-bg transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/85 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
              : 'inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-surface/60 px-4 py-2 text-sm font-bold text-primary backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface hover:shadow-lg active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
          }
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
            {isLive ? (
              <>
                <path d="M18 13.5v1.5a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3H7.5" />
                <path d="M14 4h6v6" />
                <path d="M20 4 10.5 13.5" />
              </>
            ) : (
              <>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8h.008M12 11v5" />
              </>
            )}
          </svg>
          {isLive ? 'View live site' : 'View details'}
        </button>
      </div>
    </article>
  );
}
