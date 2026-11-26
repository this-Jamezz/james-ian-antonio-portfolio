const roles = [
  {
    title: '6th Place out of 1,200+',
    company: 'App Builders PH Local AI Hackathon 2026',
    period: 'Oct 2026',
    highlights: [
      'Built Linewise, an offline-first AI-powered quality assurance platform that runs entirely on-device, eliminating cloud dependencies and API costs.',
      'Implemented real-time transcription with Whisper and local AI-powered call scoring using Qwen 2.5 3B via Ollama, featuring live rule-violation detection and objective rubric-based evaluations.',
      'Developed automated PII redaction, multilingual call detection, and evidence-based coaching notes to help protect sensitive customer data and improve agent performance.',
      'Delivered a complete QA workflow with direct recording uploads over a local network, per-agent analytics, customizable scorecards, and one-click redacted PDF report exports.',
    ],
  },
  {
    title: 'Salesforce Virtual Internship',
    company: 'Salesforce',
    period: 'Oct 2025 — Dec 2025',
    description: 'Completed a virtual internship focused on Salesforce ecosystem fundamentals, Trailhead learning, and hands-on project development.',
  },
  {
    title: 'Freelance Web Developer',
    company: 'Freelance',
    period: 'Jan 2026 — Present',
    description: 'Provided custom web development services to clients, delivering responsive and user-friendly websites using modern technologies.',
  },

];

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen scroll-mt-24 px-6 py-24 flex items-center justify-center">
      <div className="mx-auto w-full max-w-5xl">
        <div data-scroll-reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-mute">Experience</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-primary md:text-5xl">
            Where I&rsquo;ve worked
          </h2>
        </div>
        <ol className="mt-10 border-t border-primary/10">
          {roles.map((role) => (
            <li
              key={`${role.company}-${role.period}`}
              data-scroll-reveal
              className="grid gap-2 border-b border-primary/10 py-6 md:grid-cols-[1fr_auto] md:items-baseline md:gap-6"
            >
              <div>
                <h3 className="font-bold text-primary">{role.title}</h3>
                <p className="text-sm text-mute">{role.company}</p>
                {role.description && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mute">{role.description}</p>}
                {role.highlights && (
                  <ul className="mt-3 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-relaxed text-mute">
                    {role.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                )}
              </div>
              <span className="text-sm tabular-nums text-mute-2">{role.period}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
