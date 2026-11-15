// Background icon field for the Home section — animated stroke icons from
// itshover (https://www.itshover.com), converted to plain JSX under
// src/components/animated. Each plays its library hover animation when its
// grid cell is hovered (startAnimation/stopAnimation via ref).
// `litHex` is the brand color shown while lit; icons without a usable brand
// color (monochrome marks / generic stand-ins) light up in the primary tone.
import BrandAnthropicIcon from '../components/animated/brand-anthropic-icon.jsx';
import BrandGeminiIcon from '../components/animated/brand-gemini-icon.jsx';
import BrandOpenaiIcon from '../components/animated/brand-openai-icon.jsx';
import BrandReactIcon from '../components/animated/brand-react-icon.jsx';
import BrandReactNativeIcon from '../components/animated/brand-react-native-icon.jsx';
import BrandVercelIcon from '../components/animated/brand-vercel-icon.jsx';
import CheckedIcon from '../components/animated/checked-icon.jsx';
import CodeIcon from '../components/animated/code-icon.jsx';
import CodeXmlIcon from '../components/animated/code-xml-icon.jsx';
import CoffeeIcon from '../components/animated/coffee-icon.jsx';
import FlameIcon from '../components/animated/flame-icon.jsx';
import GithubIcon from '../components/animated/github-icon.jsx';
import HistoryCircleIcon from '../components/animated/history-circle-icon.jsx';
import JavascriptIcon from '../components/animated/javascript-icon.jsx';
import LayersIcon from '../components/animated/layers-icon.jsx';
import NodejsIcon from '../components/animated/nodejs-icon.jsx';
import PaintIcon from '../components/animated/paint-icon.jsx';
import PythonIcon from '../components/animated/python-icon.jsx';
import RainbowIcon from '../components/animated/rainbow-icon.jsx';
import SendIcon from '../components/animated/send-icon.jsx';
import Stack3Icon from '../components/animated/stack-3-icon.jsx';
import StackIcon from '../components/animated/stack-icon.jsx';
import TerminalIcon from '../components/animated/terminal-icon.jsx';
import TypescriptIcon from '../components/animated/typescript-icon.jsx';

export const homeBgIcons = [
  { name: 'JavaScript', litHex: '#f7df1e', Anim: JavascriptIcon },
  { name: 'TypeScript', litHex: '#3178c6', Anim: TypescriptIcon },
  { name: 'Python', litHex: '#4b8bbe', Anim: PythonIcon },
  // Simple Icons' Java logo is a coffee cup — coffee icon keeps the pun
  { name: 'Java', litHex: '#c98a3d', Anim: CoffeeIcon },
  { name: 'HTML', litHex: '#e44d26', Anim: CodeXmlIcon },
  { name: 'CSS', litHex: '#8b5cf6', Anim: PaintIcon },
  { name: 'Tailwind CSS', litHex: '#38bdf8', Anim: RainbowIcon },
  { name: 'React.js', litHex: '#61dafb', Anim: BrandReactIcon },
  { name: 'React Native', litHex: '#61dafb', Anim: BrandReactNativeIcon },
  { name: 'Node.js', litHex: '#5fa04e', Anim: NodejsIcon },
  { name: 'Express.js', Anim: TerminalIcon },
  { name: 'PostgreSQL', litHex: '#699eca', Anim: StackIcon },
  { name: 'Prisma', Anim: LayersIcon },
  { name: 'Supabase', litHex: '#3ecf8e', Anim: Stack3Icon },
  { name: 'Firebase', litHex: '#ffca28', Anim: FlameIcon },
  { name: 'Git', litHex: '#f05133', Anim: HistoryCircleIcon },
  // monochrome brand marks read best in the primary tone in both themes
  { name: 'GitHub', Anim: GithubIcon },
  { name: 'Postman', litHex: '#ff6c37', Anim: SendIcon },
  { name: 'VS Code', litHex: '#0098ff', Anim: CodeIcon },
  { name: 'Vercel', Anim: BrandVercelIcon },
  { name: 'Claude', litHex: '#d97757', Anim: BrandAnthropicIcon },
  { name: 'ChatGPT', litHex: '#74aa9c', Anim: BrandOpenaiIcon },
  { name: 'Gemini', litHex: '#8e75f7', Anim: BrandGeminiIcon },
  { name: 'ClickUp', litHex: '#7b68ee', Anim: CheckedIcon },
];
