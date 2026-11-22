import React, { useState } from "react";
import { FaBootstrap, FaCode, FaHtml5, FaReact } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import ServiceItem from "./ServiceItem";
import "./Service.css";

const serviceData = [
  {
    id: 1,
    icon: <FaCode />,
    title: "Web Design",
    categories: ["Design"],
    description:
      "Web design refers to the process of creating and designing websites. It involves planning and arranging various elements such as layout, colors, graphics, fonts, and interactive features to create an aesthetically appealing and user-friendly website.",
  },
  {
    id: 2,
    icon: <FaHtml5 />,
    title: "Web Development",
    categories: ["Development"],
    description:
      "Web development refers to the process of building and maintaining websites and web applications. It involves the creation of both the front-end (client-side) and back-end (server-side) components of a website or web application.",
  },
  {
    id: 3,
    icon: <FaReact />,
    title: "Frontend Development",
    categories: ["Development", "React"],
    description:
      "Front-end development focuses on the visual and interactive aspects of a website. It involves writing code in languages such as HTML (Hypertext Markup Language), CSS (Cascading Style Sheets), and JavaScript to create the user interface and implement interactive features.",
  },
  {
    id: 4,
    icon: <FaBootstrap />,
    title: "Bootstrap Template",
    categories: ["Templates"],
    description:
      "Bootstrap offers a wide range of pre-built components and styles, it's essential to customize it to match your project's specific requirements. By modifying the default styles and adding your branding elements, you can create a unique and professional look for your website.",
  },
  {
    id: 5,
    icon: <SiTailwindcss />,
    title: "Tailwindcss Template",
    categories: ["Templates"],
    description:
      "Tailwind CSS can generate extensive CSS files, you can optimize the build by purging unused classes. Tailwind CSS includes a purge feature that removes unused styles from your production build, resulting in smaller file sizes and improved performance. ",
  },
  {
    id: 6,
    icon: <FaReact />,
    title: "React Template",
    categories: ["React", "Templates"],
    description:
      "React's popularity stems from its ability to efficiently build complex, interactive, and high-performance user interfaces. It provides a declarative and component-based approach, making it easier to reason about and maintain code.",
  },
];

const Service = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Design", "Development", "React", "Templates"];
  const visibleServices =
    activeFilter === "All"
      ? serviceData
      : serviceData.filter((service) =>
          service.categories.includes(activeFilter)
        );

  return (
    <section className="service-section px-5 py-8 md:px-8">
      <header className="service-intro mb-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
          What I can help with
        </p>
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-slate-900">
          Services
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
          Thoughtful design and reliable frontend development, tailored to your
          project.
        </p>
      </header>
      <div className="service-filters" role="group" aria-label="Filter services">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`service-filter-button ${
              activeFilter === filter ? "service-filter-button--active" : ""
            }`}
            aria-pressed={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visibleServices.length}{" "}
        {visibleServices.length === 1 ? "service" : "services"}.
      </p>
      <div className="service-grid flex flex-wrap md:-mx-2">
        {visibleServices.map((service) => (
          <ServiceItem service={service} key={service.id} />
        ))}
      </div>
    </section>
  );
};

export default Service;
