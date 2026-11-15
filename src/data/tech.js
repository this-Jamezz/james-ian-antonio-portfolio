const SIMPLE = 'https://cdn.simpleicons.org';
const INFO_HEX = 'd4d4d4';
const ICON = (slug) => `${SIMPLE}/${slug}/${INFO_HEX}`;

export const techGroups = [
  {
    title: 'Programming Languages',
    items: [
      { name: 'JavaScript', icon: ICON('javascript') },
      { name: 'TypeScript', icon: ICON('typescript') },
      { name: 'Python', icon: ICON('python') },
      { name: 'Java', mask: 'icon-java' },
    ],
  },
  {
    title: 'Markup & Styling',
    items: [
      { name: 'HTML', icon: ICON('html5') },
      { name: 'CSS', icon: ICON('css') },
      { name: 'Tailwind CSS', icon: ICON('tailwindcss') },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    items: [
      { name: 'React.js', icon: ICON('react') },
      { name: 'React Native', icon: ICON('react') },
      { name: 'Node.js', icon: ICON('nodedotjs') },
      { name: 'Express.js', icon: ICON('express') },
    ],
  },
  {
    title: 'Databases & Backend',
    items: [
      { name: 'PostgreSQL', icon: ICON('postgresql') },
      { name: 'Prisma', icon: ICON('prisma') },
      { name: 'Supabase', icon: ICON('supabase') },
      { name: 'Firebase', icon: ICON('firebase') },
      { name: 'REST APIs', icon: null, glyph: 'REST' },
      { name: 'JWT', icon: null, glyph: 'JWT' },
    ],
  },
  {
    title: 'Developer Tools',
    items: [
      { name: 'Git', icon: ICON('git') },
      { name: 'GitHub', icon: ICON('github') },
      { name: 'Postman', icon: ICON('postman') },
      { name: 'VS Code', mask: 'icon-vscode' },
      { name: 'Vercel', icon: ICON('vercel') },
    ],
  },
  {
    title: 'AI & Productivity',
    items: [
      { name: 'Claude', icon: ICON('claude') },
      { name: 'ChatGPT', mask: 'icon-chatgpt' },
      { name: 'Gemini', icon: ICON('googlegemini') },
      { name: 'ClickUp', icon: ICON('clickup') },
    ],
  },
];