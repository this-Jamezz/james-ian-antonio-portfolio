// TODO: replace with your real certificates — set `src` to a photo in public/, `link` to the credential URL
const certificates = [
  {
    title: 'Certificate Name',
    issuer: 'Issuing Organization',
    year: '2024',
    description:
      'One or two lines on what this certification covers and the skills it validates.',
    skills: ['Skill one', 'Skill two'],
    src: null,
    link: '#',
  },
  {
    title: 'Certificate Name',
    issuer: 'Issuing Organization',
    year: '2024',
    description:
      'One or two lines on what this certification covers and the skills it validates.',
    skills: ['Skill one', 'Skill two'],
    src: null,
    link: '#',
  },
  {
    title: 'Certificate Name',
    issuer: 'Issuing Organization',
    year: '2025',
    description:
      'One or two lines on what this certification covers and the skills it validates.',
    skills: ['Skill one', 'Skill two'],
    src: null,
    link: '#',
  },
];

export default function Certificates() {
  return (
    <section id="certificates" className="min-h-screen scroll-mt-24 px-6 py-24 flex items-center justify-center">
      <div className="mx-auto w-full max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Certificates</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-primary md:text-5xl">
          Proof of work
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary/60 md:text-base">
          Certifications and courses that back up the stack above.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <article
              key={`${cert.title}-${cert.issuer}-${cert.year}-${i}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white/60 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Photo / placeholder */}
              <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden border-b border-border bg-gradient-to-br from-black/5 to-accent/10">
                {cert.src ? (
                  <img
                    src={cert.src}
                    alt={`${cert.title} certificate`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1.5 px-4 text-center text-primary/40">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0 0 21.75 19.5V4.5A1.5 1.5 0 0 0 20.25 3H3.75A1.5 1.5 0 0 0 2.25 4.5v15A1.5 1.5 0 0 0 3.75 21Z"
                      />
                    </svg>
                    <span className="text-xs font-medium">Certificate photo</span>
                  </div>
                )}
                <span className="absolute right-3 top-3 rounded-full border border-border bg-white/80 px-3 py-1 text-xs font-semibold tabular-nums text-primary/60 backdrop-blur-md">
                  {cert.year}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <svg
                      className="h-4.5 w-4.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                      />
                    </svg>
                  </span>
                  <p className="text-sm font-medium text-primary/60">{cert.issuer}</p>
                </div>

                <h3 className="mt-3 font-bold leading-snug text-primary">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {cert.title}
                  </a>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-primary/70">
                  {cert.description}
                </p>

                {cert.skills?.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${cert.title} skills`}>
                    {cert.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-border bg-white/70 px-3 py-0.5 text-xs font-medium text-primary/70"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}

                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors duration-200 hover:text-accent/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-md w-fit"
                  aria-label={`View ${cert.title} credential`}
                >
                  View credential
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
