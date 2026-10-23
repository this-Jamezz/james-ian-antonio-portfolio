import ProjectPreviewCard from './ProjectPreviewCard';

export default function ProjectStack({ projects, targetId = 'projects' }) {
  const [back, middle, front] = projects;

  return (
    <a
      href={`#${targetId}`}
      aria-label="View projects"
      className="group relative block w-full max-w-[14rem] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:max-w-none"
    >
      {/* Back card — rotates on hover */}
      <ProjectPreviewCard
        {...back}
        className="pointer-events-none absolute inset-x-10 top-4 hidden -translate-x-7 -rotate-[8deg] transition-transform duration-500 ease-out group-hover:-translate-x-10 group-hover:-translate-y-1.5 group-hover:rotate-[-4deg] md:block"
      />

      {/* Middle card — rotates on hover */}
      <ProjectPreviewCard
        {...middle}
        className="pointer-events-none absolute inset-x-10 top-4 hidden translate-x-7 rotate-[6deg] transition-transform duration-500 ease-out group-hover:translate-x-10 group-hover:-translate-y-1.5 group-hover:rotate-[3deg] md:block"
      />

      {/* Front card */}
      <ProjectPreviewCard {...front} showChrome className="relative" />
    </a>
  );
}