import React from "react";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Madhukar from "../../../images/portfolio/Madhukar.jpg";

const coxurl = "https://www.coxautoinc.com";
const socials = [
  {
    id: 1,
    icon: <FaFacebookF />,
    link: "https://www.facebook.com/?react=AQAZDm4XIn_VKrxMR10",
  },
  {
    id: 2,
    icon: <FaGithub />,
    link: "https://github.com/madhukarGanga?tab=repositories",
  },
  {
    id: 3,
    icon: <FaLinkedinIn />,
    link: "https://www.linkedin.com/in/madhukar-g-61865a160",
  },
  {
    id: 4,
    icon: <FaInstagram />,
    link: "https://www.instagram.com/",
  },
];

const Sidebar = () => {
  return (
    <aside className="sticky top-0 bg-white md:mx-8 lg:mx-4 mb-8 p-6 shadow-md rounded-md -mt-40">
      <div className="w-24 h-24 rounded-md overflow-hidden mx-auto mb-5">
        <img src={Madhukar} alt="shafiqhammad" className="w-full" />
      </div>
      <div className="text-center">
        <h1 className="text-xl text-gray-800 font-bold mb-1">Madhukar Ganga </h1>
        <p className="text-sm text-gray-700 mb-3">
          Frontend React Developer at
          <a href={coxurl} className="text-purple-600 pl-1">
            Cox Auto Inc.
          </a>
        </p>
        <p className="text-sm text-gray-700 mb-3">
          Email and Phone Number details madhu.ganga2018@gmail.com, 
          PH:984-377-1236</p>
        <a
          href="/MadhuDevsReactResume.docx"
          className="inline-block mb-3 rounded bg-blue-900 text-center border-0 py-2 px-6 text-white leading-7 tracking-wide active:bg-blue-900 hover:bg-blue-900"
          download="MadhuDevsReactResume"
        >
          Download Resume
        </a>
        <ul className="flex flex-wrap justify-center">
          {socials.map((social, id) => (
            <SocialIcon social={social} key={id} />
          ))}
        </ul>
      </div>
      <div className="text-start pt-4">
        <h3 className="text-md mb-2 uppercase font-medium text-gray-800 hover:text-indigo-400">
          About Me
        </h3>
        <p className="text-gray-900 leading-relaxed fontDecoration">
          I specialize in React and Redux development and have extensive
          experience in building robust and efficient web applications using
          these technologies. I possess a deep understanding of React's
          component-based architecture, virtual DOM, and its ecosystem of
          libraries and tools. Additionally, I'm well-versed in Redux, a state
          management library commonly used with React to handle complex
          application states. I can assist you with designing scalable
          application architectures, optimizing performance, implementing best
          practices, and tackling any challenges you may encounter during your
          development journey. Feel free to ask me anything related to React or
          Redux development—I'm here to lend a hand!
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;

const SocialIcon = (props) => {
  const { icon, link } = props.social;
  return (
    <li className="m-2">
      <a
        href={link}
        className="w-8 h-8 bg-white-100 rounded text-black-800 flex items-center justify-center hover:text-white hover:bg-blue-600"
      >
        {icon}
      </a>
    </li>
  );
};
