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
      "Lorem ipsum dolor sit aconsect dipisicing elit, sed do eiusmod to incididunt uabore etdolore magna aliqua.",
  },
  {
    id: 4,
    icon: <FaBootstrap />,
    title: "Bootstrap Template",
    description:
      "Lorem ipsum dolor sit aconsect dipisicing elit, sed do eiusmod to incididunt uabore etdolore magna aliqua.",
  },
  {
    id: 4,
    icon: <SiTailwindcss />,
    title: "Tailwindcss Template",
    description:
      "Lorem ipsum dolor sit aconsect dipisicing elit, sed do eiusmod to incididunt uabore etdolore magna aliqua.",
  },
  {
    id: 4,
    icon: <FaReact />,
    title: "React Template",
    description:
      "Lorem ipsum dolor sit aconsect dipisicing elit, sed do eiusmod to incididunt uabore etdolore magna aliqua.",
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
