import heroIcon from '../assets/heroIcon.png';
import { scrollToSectionId } from '../lib/smooth-scroll';

export default function Home() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 bg-bg overflow-hidden">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14 max-w-5xl w-full">
        <div className="flex-1 min-w-0 flex flex-col items-center md:items-start text-center md:text-left gap-6 md:gap-8">
          <div className="flex flex-col items-center md:items-start text-4xl md:text-6xl font-black tracking-tight text-primary animate-enter [animation-delay:50ms]">
            <p> I solve real-life problems, {" "}</p>
            <span className="relative w-fit text-accent">
              at scale
              <svg className="absolute -bottom-3 left-0 h-3 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M6 8 Q 100 2 194 7"
                  fill="none"
                  strokeWidth="4"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  className="stroke-accent"
                />
              </svg>
            </span>
          </div>
          {/* TODO: add one concrete proof point (users served, load-time win, project outcome) */}
          <p className="font-medium text-base md:text-lg max-w-xl text-primary/70 animate-enter [animation-delay:100ms]">
            I&rsquo;m James Ian Antonio, a full-stack developer. I design and build web and mobile
            applications end to end — frontend, backend, and everything needed to ship and keep
            them running.
          </p>
          <div className="animate-enter [animation-delay:200ms]">
            <button
              onClick={() => scrollToSectionId('projects')}
              className="cursor-pointer rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/85 hover:shadow-lg hover:shadow-accent/25 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              View Projects
            </button>
          </div>
          {/* TODO: replace "#" with real profile URLs */}
          <div className="flex flex-col items-center md:items-start gap-3 animate-enter [animation-delay:300ms]">
            <p className="text-xs font-medium tracking-wide text-primary/60">
              Connect with me
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook profile"
                title="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/10 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <img src="/assets/facebook.svg" alt="" className="h-6 w-6" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
                title="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/10 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <img src="/assets/instagram.svg" alt="" className="h-6 w-6" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                title="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/10 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <img src="/assets/linkedin.svg" alt="" className="h-6 w-6" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                title="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/10 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <img src="/assets/github.svg" alt="" className="h-6 w-6" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JobStreet profile"
                title="JobStreet"
                className="flex h-10 items-center gap-2 px-4 rounded-xl border border-primary/10 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <svg className="h-5 w-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-semibold text-primary">JobStreet</span>
              </a>
            </div>
          </div>
        </div>
        <div className="shrink-0 animate-enter [animation-delay:150ms]">
          <div className="group relative w-56 md:w-80">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-accent/10 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" aria-hidden="true"></div>
            <img src={heroIcon} alt="Portrait of James Ian Antonio" className="relative aspect-[4/5] w-full rounded-3xl bg-white/40 object-cover object-top shadow-lg transition-transform duration-500 group-hover:scale-[1.015]" />
          </div>
        </div>
      </div>
      <a
        href="#experience"
        onClick={(e) => {
          e.preventDefault();
          scrollToSectionId('experience');
        }}
        aria-label="Scroll to Experience section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/40 transition-[color,transform] duration-200 hover:translate-y-0.5 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19.5 13.5-7.5 7.5-7.5-7.5M12 21V3" />
        </svg>
      </a>
    </section>
  );
}
