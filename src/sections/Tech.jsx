import { useState } from 'react';
import { techGroups } from '../data/tech';

function TechIcon({ name, icon, glyph, mask }) {
  const [failed, setFailed] = useState(false);

  if (mask) {
    return <span aria-hidden="true" className={`brand-icon ${mask} h-10 w-10 text-info`} />;
  }

  if (!icon || failed) {
    return (
      <span
        aria-hidden="true"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-info px-1 text-[10px] font-bold tracking-wide text-ink"
      >
        {glyph || name.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={icon}
      alt=""
      loading="lazy"
      className="h-10 w-10 object-contain"
      onError={() => setFailed(true)}
    />
  );
}

export default function Tech() {
  return (
    <section id="tech" className="min-h-screen scroll-mt-24 px-6 py-24 flex items-center justify-center">
      <div className="mx-auto w-full max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-mute">Tech</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-primary md:text-5xl">
          Tools I reach for
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mute md:text-base">
          Grouped the way I actually use them — languages, styling, frameworks, backend, tooling,
          and the AI / productivity apps in my daily workflow.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {techGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur-md"
            >
              <h3 className="text-sm font-bold uppercase tracking-widest text-mute-2">
                {group.title}
              </h3>
              <ul className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
                {group.items.map((item) => (
                  <li
                    key={`${group.title}-${item.name}`}
                    title={item.name}
                    className="group flex flex-col items-center gap-2 rounded-xl p-3 text-center transition-colors duration-200 hover:bg-primary/5"
                  >
                    <TechIcon
                      name={item.name}
                      icon={item.icon}
                      glyph={item.glyph}
                      mask={item.mask}
                    />
                    <span className="text-xs font-medium leading-tight text-mute">
                      {item.name}
                    </span>
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