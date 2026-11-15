import heroIcon from '../assets/heroIcon.png';
import { scrollToSectionId } from '../lib/smooth-scroll';

/** Alpha-masked third-tone brand icon (the SVG files carry a brand fill we ignore). */
function SocialIcon({ icon, className = 'h-6 w-6' }) {
  return <span aria-hidden="true" className={`brand-icon icon-${icon} ${className}`} />;
}

export default function Home() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 bg-bg overflow-hidden">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0 max-w-5xl w-full">
        {/* md:-mr-56 pulls the text column into the portrait so the text overlaps ~70% of it.
            The column itself ignores pointer events so hovering the portrait works through it;
            interactive rows opt back in below. */}
        <div className="pointer-events-none relative z-20 flex-1 min-w-0 flex flex-col items-center md:items-start text-center md:text-left gap-6 md:gap-8 md:-mr-56">
          <div className="flex flex-col items-center md:items-start text-4xl md:text-6xl font-black tracking-tight text-primary animate-enter [animation-delay:50ms]">
            <p> I solve real-life problems, {" "}</p>
            {/* third-tone highlight instead of an underline */}
            <span className="w-fit rounded-lg bg-info px-2.5 text-ink">
              at scale
            </span>
          </div>
          {/* TODO: add one concrete proof point (users served, load-time win, project outcome) */}
          <p className="font-medium text-base md:text-lg max-w-xl text-mute animate-enter [animation-delay:100ms]">
            I&rsquo;m James Ian Antonio, a full-stack developer. I design and build web and mobile
            applications end to end — frontend, backend, and everything needed to ship and keep
            them running.
          </p>
          <div className="pointer-events-auto animate-enter [animation-delay:200ms]">
            <button
              onClick={() => scrollToSectionId('projects')}
              className="cursor-pointer rounded-xl bg-primary px-6 py-3 text-sm font-bold text-bg transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/85 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              View Projects
            </button>
          </div>
          {/* TODO: replace "#" with real profile URLs */}
          <div className="pointer-events-auto flex flex-col items-center md:items-start gap-3 animate-enter [animation-delay:300ms]">
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
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/10 text-info transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] hover:border-info hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <SocialIcon icon="facebook" />
              </a>
              <a
                href="https://www.instagram.com/jamezz_iyann/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
                title="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/10 text-info transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] hover:border-info hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <SocialIcon icon="instagram" />
              </a>
              <a
                href="https://www.linkedin.com/in/james-ian-antonio-73b844367/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                title="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/10 text-info transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] hover:border-info hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <SocialIcon icon="linkedin" />
              </a>
              <a
                href="https://github.com/this-Jamezz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                title="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/10 text-info transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] hover:border-info hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <SocialIcon icon="github" />
              </a>
              <a
                href="https://ph.jobstreet.com/profiles/jamesian-antonio-9zq6gj4387"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JobStreet profile"
                title="JobStreet"
                className="flex h-10 items-center gap-2 px-4 rounded-xl border border-primary/10 text-info transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] hover:border-info hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-semibold text-primary">JobStreet</span>
              </a>
            </div>
          </div>
        </div>
        {/* portrait starts under the headline; hovering it raises the whole stack above the text */}
        <div className="relative z-10 shrink-0 animate-enter [animation-delay:150ms] hover:z-30">
          <div className="group relative w-56 md:w-80">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-info transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" aria-hidden="true"></div>
            <img src={heroIcon} alt="Portrait of James Ian Antonio" className="relative aspect-[4/5] w-full rounded-3xl bg-bg object-cover object-top opacity-70 shadow-lg transition-[transform,opacity] duration-500 group-hover:-translate-y-1 group-hover:scale-[1.02] group-hover:opacity-100" />
          </div>
        </div>
      </div>
    </section>
  );
}
