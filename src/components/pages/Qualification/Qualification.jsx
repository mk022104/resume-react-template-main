import React from "react";
import QualificationList from "./QualificationList";
import "./Qualification.css";
import { usePortfolioData } from '../../../context/PortfolioContext';

const Qualification = () => {
  const { education } = usePortfolioData();
  return (
    <section className="qualification-section pb-10">
      <div className="qualification-grid flex flex-wrap md:px-4 fontDecoration">
        {education.map((qualification) => (
          <QualificationList
            qualification={qualification}
            key={qualification.id}
          />
        ))}
      </div>
    </section>
  );
};

export default Qualification;