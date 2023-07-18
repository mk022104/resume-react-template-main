import React from "react";
import SkillItem from "./SkillItem";

const skillData = [
  {
    id: 1,
    title: "Html, Css, Scss, Sass",
    percentage: "90%",
  },
  {
    id: 2,
    title: "Bootstrap",
    percentage: "80%",
  },
  {
    id: 3,
    title: "Material UI, TailwindCSS",
    percentage: "80%",
  },
  {
    id: 4,
    title: "Javascript",
    percentage: "70%",
  },
  {
    id: 5,
    title: "Typescript",
    percentage: "70%",
  },
  {
    id: 6,
    title: "ReactJS",
    percentage: "80%",
  },
  {
    id: 7,
    title: "Redux, Thunk, Redux-Saga",
    percentage: "80%",
  },
  {
    id: 8,
    title: "JIRA, Slack, Agile Methodologies",
    percentage: "70%",
  },
  {
    id: 9,
    title: "Git, Github",
    percentage: "80%",
  },
  {
    id: 10,
    title: "Jest, Mocha, Chai, testing-library",
    percentage: "80%",
  },
  {
    id: 11,
    title: "Rest, Graph Ql,Aws",
    percentage: "70%",
  },
];

const Skills = () => {
  return (
    <div className="py-4">
      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="md:mx-4">
            <h3 className="text-2xl text-gray-800 font-bold mb-4 hover:text-indigo-400">
              Skills
            </h3>
          </div>
        </div>
        {skillData.map((skill, id) => (
          <SkillItem skill={skill} key={id} />
        ))}
      </div>
    </div>
  );
};

export default Skills;
