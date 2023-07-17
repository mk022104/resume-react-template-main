import React from "react";
import Skills from "./Skills/Skills";

const About = () => {
  return (
    <section className="py-8">
      <div className="flex flex-wrap md:px-4">
        <div className="w-full">
          <div className="md:mx-4">
            <h3 className="text-2xl text-gray-800 font-bold mb-4 hover:text-indigo-400">Who am I?</h3>
            <p className="text-sm text-gray-400 leading-6 mb-3 aboutFontDecoration">
              Highly skilled React JS developer with 8 years of experience in
              building robust and user-friendly web applications. Seeking a
              challenging role to utilize my expertise in React JS, along with
              proficiency in Docker, JIRA, Slack, GitHub, GitLab, and CI/CD, to
              contribute to the success of a dynamic and innovative development
              team.
            </p>
            <p className="text-sm text-gray-400 leading-6 mb-3 aboutFontDecoration">
              Developed and maintained React applications, utilizing Redux for
              state management. Implemented responsive user interfaces based on
              UI/UX designs, ensuring optimal user experience. Collaborated with
              cross-functional teams to analyze requirements and deliver
              solutions. Integrated RESTful APIs to fetch and update data,
              ensuring seamless communication with the backend. Conducted unit
              tests and debugging to identify and resolve issues, ensuring
              application stability. Contributed to code reviews, adhering to
              best practices and maintaining high code quality standards.
              Participated in agile development methodologies, attending
              stand-ups and providing status updates.
            </p>
          </div>
          <Skills />
        </div>
      </div>
    </section>
  );
};

export default About;
