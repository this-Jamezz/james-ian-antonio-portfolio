import { useState } from 'react';

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const SIMPLE = 'https://cdn.simpleicons.org';

const techGroups = [
  {
    title: 'Programming Languages',
    items: [
      { name: 'JavaScript', icon: `${DEVICON}/javascript/javascript-original.svg` },
      { name: 'TypeScript', icon: `${DEVICON}/typescript/typescript-original.svg` },
      { name: 'Python', icon: `${DEVICON}/python/python-original.svg` },
      { name: 'Java', icon: `${DEVICON}/java/java-original.svg` },
    ],
  },
  {
    title: 'Markup & Styling',
    items: [
      { name: 'HTML', icon: `${DEVICON}/html5/html5-original.svg` },
      { name: 'CSS', icon: `${DEVICON}/css3/css3-original.svg` },
      { name: 'Tailwind CSS', icon: `${DEVICON}/tailwindcss/tailwindcss-original.svg` },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    items: [
      { name: 'React.js', icon: `${DEVICON}/react/react-original.svg` },
      { name: 'React Native', icon: `${DEVICON}/react/react-original.svg` },
      { name: 'Node.js', icon: `${DEVICON}/nodejs/nodejs-original.svg` },
      { name: 'Express.js', icon: `${DEVICON}/express/express-original.svg` },
    ],
  },
  {
    title: 'Databases & Backend',
    items: [
      { name: 'PostgreSQL', icon: `${DEVICON}/postgresql/postgresql-original.svg` },
      { name: 'Prisma', icon: `${DEVICON}/prisma/prisma-original.svg` },
      { name: 'Supabase', icon: `${DEVICON}/supabase/supabase-original.svg` },
      { name: 'Firebase', icon: `${DEVICON}/firebase/firebase-plain.svg` },
      { name: 'REST APIs', icon: null, glyph: 'REST' },
      { name: 'JWT', icon: null, glyph: 'JWT' },
    ],
  },
  {
    title: 'Developer Tools',
    items: [
      { name: 'Git', icon: `${DEVICON}/git/git-original.svg` },
      { name: 'GitHub', icon: `${DEVICON}/github/github-original.svg` },
      { name: 'Postman', icon: `${DEVICON}/postman/postman-original.svg` },
      { name: 'VS Code', icon: `${DEVICON}/vscode/vscode-original.svg` },
      { name: 'Vercel', icon: `${DEVICON}/vercel/vercel-original.svg` },
    ],
  },
  {
    title: 'AI & Productivity',
    items: [
      { name: 'Claude', icon: `${SIMPLE}/claude` },
      { name: 'ChatGPT', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
      { name: 'ClickUp', icon: `${SIMPLE}/clickup` },
    ],
  },
];

function TechIcon({ name, icon, glyph }) {
  const [failed, setFailed] = useState(false);

  if (!icon || failed) {
    return (
      <span
        aria-hidden="true"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white px-1 text-[10px] font-bold tracking-wide text-primary"
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
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Tech</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-primary md:text-5xl">
          Tools I reach for
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary/60 md:text-base">
          Grouped the way I actually use them — languages, styling, frameworks, backend, tooling,
          and the AI / productivity apps in my daily workflow.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {techGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-2xl border border-border bg-white/60 p-6 backdrop-blur-md"
            >
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary/50">
                {group.title}
              </h3>
              <ul className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
                {group.items.map((item) => (
                  <li
                    key={`${group.title}-${item.name}`}
                    title={item.name}
                    className="group flex flex-col items-center gap-2 rounded-xl p-3 text-center transition-colors duration-200 hover:bg-black/5"
                  >
                    <TechIcon name={item.name} icon={item.icon} glyph={item.glyph} />
                    <span className="text-xs font-medium leading-tight text-primary/80">
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
