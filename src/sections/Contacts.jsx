/** Alpha-masked third-tone brand icon (the SVG files carry a brand fill we ignore). */
function SocialIcon({ icon, className = 'h-6 w-6' }) {
  return <span aria-hidden="true" className={`brand-icon icon-${icon} ${className}`} />;
}

export default function Contacts() {
  return (
    <section id="contacts" className="min-h-screen scroll-mt-24 px-6 py-24 flex items-center justify-center">
      <div className="mx-auto w-full max-w-5xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-mute">Contact</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-primary md:text-5xl">
          Let's build something together
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-mute">
          Currently open to internships, freelance work, and junior roles.
        </p>
        {/* TODO: replace "#" with your real email and profile URLs */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="mailto:youremail@example.com"
            className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-bg transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            j.iansanchezantonio@gmail.com
          </a>
        </div>
        {/* moved here from the Home hero */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-xs font-medium tracking-wide text-mute">
            Connect with me
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/jamesian.antonio.581"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook profile"
              title="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/10 bg-surface text-info transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] hover:border-info hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <SocialIcon icon="facebook" />
            </a>
            <a
              href="https://www.instagram.com/jamezz_iyann/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram profile"
              title="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/10 bg-surface text-info transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] hover:border-info hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <SocialIcon icon="instagram" />
            </a>
            <a
              href="https://www.linkedin.com/in/james-ian-antonio-73b844367/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              title="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/10 bg-surface text-info transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] hover:border-info hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <SocialIcon icon="linkedin" />
            </a>
            <a
              href="https://github.com/this-Jamezz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              title="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/10 bg-surface text-info transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] hover:border-info hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <SocialIcon icon="github" />
            </a>
            <a
              href="https://ph.jobstreet.com/profiles/jamesian-antonio-9zq6gj4387"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="JobStreet profile"
              title="JobStreet"
              className="flex h-10 items-center gap-2 px-4 rounded-xl border border-primary/10 bg-surface text-info transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] hover:border-info hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-semibold text-primary">JobStreet</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
