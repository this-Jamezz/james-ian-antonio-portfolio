import FoundNestThumbNail from '../assets/FoundNestThumbnail.jpg';
import iManageThumbnail from '../assets/iManageThumbnail.jpg';

// TODO: uncomment ClinicMate below once it has a real screenshot.
// Set `link` to the live URL — '#' or null marks the project as not deployed.
export const projects = [
  {
    label: 'FoundNest',
    src: FoundNestThumbNail,
    title: 'FoundNest',
    description:
      'A cross-platform lost and found management system utilizing AI image matching and QR smart tagging to streamline item recovery for users.',
    tech: ['React', 'React Native', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'JavaScript'],
    link: 'https://foundnest.vercel.app/',
  },
  // {
  //   label: 'ClinicMate',
  //   src: null,
  //   title: 'ClinicMate',
  //   description:
  //     'A responsive clinic management system utilizing Firebase and Tailwind CSS to centralize patient records and optimize clinic operations.',
  //   tech: ['React.js', 'Tailwind CSS', 'Firebase'],
  //   link: '#',
  // },
  {
    label: 'iManage',
    src: iManageThumbnail,
    title: 'iManage',
    description:
      'An AI-powered project management platform featuring collaborative workspaces, drag-and-drop Kanban boards, and real-time task updates.',
    tech: ['React', 'Tailwind CSS', 'TypeScript', 'Express', 'PostgreSQL', 'Prisma', 'Gemini AI'],
    link: 'https://imanage-projectmanager.vercel.app/',
  },
];

// Tech pills shown on the card. The rest collapse into a "+N others" pill —
// clicking it (or the card button) opens the modal with the full list.
export const VISIBLE_TECH_COUNT = 3;

// A project counts as deployed only when it has a real URL — '#'/null/'' do not.
export function isProjectLive(project) {
  return Boolean(project.link) && project.link !== '#';
}
