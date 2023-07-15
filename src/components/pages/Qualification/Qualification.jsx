import React from "react";
import QualificationList from "./QualificationList";
import ScientInstituteOfEngineering from "../../../images/blog/ScientInstituteOfTechnology.jpg";
import CSU from "../../../images/blog/ChicagoStateUniversity.jpg";

const QualificationData = [
  {
    id: 1,
    title: "Bachelors.",
    image:ScientInstituteOfEngineering,
    description:
    "Bachelor of Technology in IT from Scient Institute of Technology Affiliated to JNTUH TELANGANA INDIA .",
    link:"https://www.scient.ac.in/"
  },
  {
    id: 2,
    title: "Masters.",
    image:CSU,
    description: "Master of Science in Computer Science Engineering from Chicago state University United States of America",
    link:"https://www.csu.edu/"
  },
  ];
const Qualification = () => {
  return (
    <section className="pb-10">
      <div className="flex flex-wrap md:px-4">
        {QualificationData.map((desc, id) => (
          <QualificationList desc={desc} key={id}/>
        ))}
      </div>
    </section>
  );
};

export default Qualification;