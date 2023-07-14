import React from "react";

const QualificationData = [
    {
      id: 1,
      title: "Bachelors",
      description:
        "BTECH IT from Scient Institute of Technology Affiliated to JNTUH TELANGANA INDIA .",
    },
    {
      id: 2,
      title: "Ms",
      description: "Ms CSE Chicago state University USA",
    },
  ];
const Qualification = () => {
  return (
    <section className="pb-10">
      <div className="flex flex-wrap md:px-4">
        {QualificationData.map((blog, id) => (
          <div blog={blog} key={id} />
        ))}
      </div>
    </section>
  );
};

export default Qualification;