import React from "react";
import { FaBootstrap, FaCode, FaHtml5, FaReact } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import ServiceItem from "./ServiceItem";

const serviceData = [
  {
    id: 1,
    icon: <FaCode />,
    title: "Web Design",
    description:
      "Web design refers to the process of creating and designing websites. It involves planning and arranging various elements such as layout, colors, graphics, fonts, and interactive features to create an aesthetically appealing and user-friendly website.",
  },
  {
    id: 2,
    icon: <FaHtml5 />,
    title: "Web Development",
    description:
      "Web development refers to the process of building and maintaining websites and web applications. It involves the creation of both the front-end (client-side) and back-end (server-side) components of a website or web application.",
  },
  {
    id: 3,
    icon: <FaReact />,
    title: "Frontend Development",
    description:
      "Front-end development focuses on the visual and interactive aspects of a website. It involves writing code in languages such as HTML (Hypertext Markup Language), CSS (Cascading Style Sheets), and JavaScript to create the user interface and implement interactive features.",
  },
  {
    id: 4,
    icon: <FaBootstrap />,
    title: "Bootstrap Template",
    description:
      "Bootstrap offers a wide range of pre-built components and styles, it's essential to customize it to match your project's specific requirements. By modifying the default styles and adding your branding elements, you can create a unique and professional look for your website.",
  },
  {
    id: 4,
    icon: <SiTailwindcss />,
    title: "Tailwindcss Template",
    description:
      "Tailwind CSS can generate extensive CSS files, you can optimize the build by purging unused classes. Tailwind CSS includes a purge feature that removes unused styles from your production build, resulting in smaller file sizes and improved performance. ",
  },
  {
    id: 4,
    icon: <FaReact />,
    title: "React Template",
    description:
      "React's popularity stems from its ability to efficiently build complex, interactive, and high-performance user interfaces. It provides a declarative and component-based approach, making it easier to reason about and maintain code.",
  },
];

const Service = () => {
  return (
    <section className="pb-10">
      <div className="flex flex-wrap md:px-4">
        {serviceData.map((service, id) => (
          <ServiceItem service={service} key={id} />
        ))}
      </div>
    </section>
  );
};

export default Service;
