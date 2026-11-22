import React, { useState } from "react";
import { FaBootstrap, FaCode, FaHtml5, FaReact } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import ServiceItem from "./ServiceItem";
import "./Service.css";
import { usePortfolioData } from '../../../context/PortfolioContext';

const Service = () => {
  const { services } = usePortfolioData();
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = services.filters;
  const iconMap = { code: <FaCode />, html: <FaHtml5 />, react: <FaReact />, bootstrap: <FaBootstrap />, tailwind: <SiTailwindcss /> };
  const serviceData = services.items.map((service) => ({ ...service, icon: iconMap[service.icon] }));
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
          {services.eyebrow}
        </p>
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-slate-900">
          {services.heading}
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
          {services.summary}
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
