import ProjectPreviewCard from '../components/ProjectPreviewCard';
import FoundNestThumbNail from '../assets/FoundNestThumbnail.jpg';

// TODO: replace with your real projects — set `src` to a screenshot in public/
const projects = [
  {
  label: 'FoundNest',
  src: FoundNestThumbNail,
  title: 'FoundNest',
  description: 'A cross-platform lost and found management system utilizing AI image matching and QR smart tagging to streamline item recovery for users.',
  tech: ['React', 'React Native', 'Node.js', 'PostgreSQL'],
  link: 'https://foundnest.vercel.app/',
},
{
  label: 'ClinicMate',
  src: null,
  title: 'ClinicMate',
  description: 'A responsive clinic management system utilizing Firebase and Tailwind CSS to centralize patient records and optimize clinic operations.',
  tech: ['React.js', 'Tailwind CSS', 'Firebase'],
  link: '#',
},
  {
    label: 'Project Three',
    src: null,
    title: 'Project Three',
    description: 'One or two lines on what it does and who it serves. Replace with your real project.',
    tech: ['React', 'Express', 'MongoDB'],
    link: '#',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen scroll-mt-24 px-6 py-24 flex items-center justify-center">
      <div className="mx-auto w-full max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Projects</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-primary md:text-5xl">
          Things I've built
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="group flex flex-col">
              <ProjectPreviewCard src={project.src} label={project.label} showChrome />
              <h3 className="mt-4 font-bold text-primary">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-md"
                >
                  {project.title}
                </a>
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-primary/60">{project.description}</p>
              <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${project.title} tech stack`}>
                {project.tech.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-white/60 px-3 py-0.5 text-xs font-medium text-primary/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
