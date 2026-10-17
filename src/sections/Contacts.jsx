export default function Contacts() {
  return (
    <section id="contacts" className="min-h-screen scroll-mt-24 px-6 py-24 flex items-center justify-center">
      <div className="mx-auto w-full max-w-5xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Contact</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-primary md:text-5xl">
          Let's build something together
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-primary/60">
          Currently open to internships, freelance work, and junior roles. Replace this line with your
          real availability.
        </p>
        {/* TODO: replace "#" with your real email and profile URLs */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="mailto:youremail@example.com"
            className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            j.iansanchezantonio@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/james-ian-antonio-73b844367"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-primary/20 bg-white/70 px-6 py-3 text-sm font-bold text-primary backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
