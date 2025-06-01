import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import Madhukar from '../../../images/portfolio/Madhukar.jpg';
import Tooltip from './Tooltip';

const coxurl = 'https://www.coxautoinc.com';

const socials = [
  {
    id: 1,
    icon: FaFacebookF,
    link: 'https://www.facebook.com/?react=AQAZDm4XIn_VKrxMR10',
    text: 'Facebook',
  },
  {
    id: 2,
    icon: FaGithub,
    link: 'https://github.com/mk022104/resume-react-template-main',
    text: 'Github',
  },
  {
    id: 3,
    icon: FaLinkedinIn,
    link: 'https://www.linkedin.com/in/ganga1935/',
    text: 'LinkedIn',
  },
  {
    id: 4,
    icon: FaInstagram,
    link: 'https://www.instagram.com/',
    text: 'Instagram',
  },
];

// Reusable Avatar component
const Avatar = ({ src, alt }) => (
  <div className="w-24 h-24 rounded-md overflow-hidden mx-auto mb-5">
    <img src={src} alt={alt} className="w-full cursor-pointer" />
  </div>
);

// Reusable DownloadButton component
const DownloadButton = ({ href, filename, children }) => (
  <a
    href={href}
    className="inline-flex mb-3 rounded bg-blue-900 text-center border-0 py-2 px-6 text-white leading-7 tracking-wide active:bg-blue-900 hover:bg-blue-900"
    download={filename}
  >
    <svg
      className="fill-current w-4 h-7 mr-2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
    </svg>
    {children}
  </a>
);

// Reusable SocialLinks component
const SocialLinks = ({ socials }) => (
  <ul className="flex flex-wrap justify-center">
    {socials.map(({ id, icon: Icon, link, text }) => (
      <Tooltip key={id} text={text} link={link} icon={<Icon />} />
    ))}
  </ul>
);

// Reusable AboutSection component
const AboutSection = ({ title, children }) => (
  <div className="text-start pt-4">
    <h3 className="text-md mb-2 uppercase font-medium text-gray-800 hover:text-indigo-400">
      {title}
    </h3>
    <p className="text-gray-900 leading-relaxed fontDecoration">{children}</p>
  </div>
);

// Main Sidebar component using reusable components
const Sidebar = () => (
  <aside className="sticky top-0 bg-white md:mx-8 lg:mx-4 mb-8 p-6 shadow-md rounded-md -mt-40">
    <Avatar src={Madhukar} alt="Madhukar Ganga" />
    <div className="text-center">
      <h1 className="text-xl text-gray-800 font-bold mb-1">Madhukar Ganga</h1>
      <p className="text-sm text-gray-700 mb-3">
        Frontend React Developer at
        <a href={coxurl} className="text-purple-600 pl-1">
          Cox Auto Inc.
        </a>
      </p>
      <DownloadButton
        href="/MadhuResumeUpdated.docx"
        filename="MadhuResumeUpdated"
      >
        Download Resume
      </DownloadButton>
      <SocialLinks socials={socials} />
    </div>
    <AboutSection title="About Me">
      I specialize in React and Redux development and have extensive experience
      in building robust and efficient web applications using these
      technologies. I possess a deep understanding of React's component-based
      architecture, virtual DOM, and its ecosystem of libraries and tools.
      Additionally, I'm well-versed in Redux, a state management library
      commonly used with React to handle complex application states. I can
      assist you with designing scalable application architectures, optimizing
      performance, implementing best practices, and tackling any challenges you
      may encounter during your development journey. Feel free to ask me
      anything related to React or Redux development—I'm here to lend a hand!
    </AboutSection>
  </aside>
);

export default Sidebar;
