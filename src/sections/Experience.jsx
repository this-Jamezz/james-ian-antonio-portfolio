// TODO: replace with your real experience — most recent first
const roles = [
  {
    title: 'Salesforce Virtual Internship',
    company: 'Salesforce',
    period: 'Oct 2025 — Dec 2025',
    description: 'Completed a virtual internship focused on Salesforce ecosystem fundamentals, Trailhead learning, and hands-on project development.',
  },
  {
    title: 'Freelance Web Developer',
    company: 'Freelance',
    period: '2026 — Present',
    description: 'Provided custom web development services to clients, delivering responsive and user-friendly websites using modern technologies.',
  },

];

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen scroll-mt-24 px-6 py-24 flex items-center justify-center">
      <div className="mx-auto w-full max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Experience</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-primary md:text-5xl">
          Where I&rsquo;ve worked
        </h2>
        <ol className="mt-10 border-t border-primary/10">
          {roles.map((role) => (
            <li
              key={`${role.company}-${role.period}`}
              className="grid gap-2 border-b border-primary/10 py-6 md:grid-cols-[1fr_auto] md:items-baseline md:gap-6"
            >
              <div>
                <h3 className="font-bold text-primary">{role.title}</h3>
                <p className="text-sm text-primary/60">{role.company}</p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary/70">{role.description}</p>
              </div>
              <span className="text-sm tabular-nums text-primary/50">{role.period}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
