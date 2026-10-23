import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectDetailsModal from '../components/ProjectDetailsModal';
import { projects } from '../data/projects';

export default function Projects() {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsIndex, setDetailsIndex] = useState(0);

  const openDetails = (index) => {
    setDetailsIndex(index);
    setDetailsOpen(true);
  };

  return (
    <section id="projects" className="min-h-screen scroll-mt-24 px-6 py-24 flex items-center justify-center">
      <div className="mx-auto w-full max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-mute">Projects</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-primary md:text-5xl">
          Things I've built
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              onOpenDetails={() => openDetails(index)}
            />
          ))}
        </div>
      </div>

      <ProjectDetailsModal
        open={detailsOpen}
        projects={projects}
        index={detailsIndex}
        onIndexChange={setDetailsIndex}
        onClose={() => setDetailsOpen(false)}
      />
    </section>
  );
}
