import React from 'react';
import SkillItem from './SkillItem';
import { usePortfolioData } from '../../../../context/PortfolioContext';

const Skills = () => {
  const { skills } = usePortfolioData();
  return (
    <div className="py-4">
      <div className="skills-list flex flex-wrap gap-y-1">
        <div className="w-full">
          <div className="md:mx-4">
            <h3 className="text-2xl text-gray-800 font-bold mb-4 hover:text-indigo-400">
              Skills
            </h3>
          </div>
        </div>
        {skills.map((skill) => (
          <SkillItem skill={skill} key={skill.id} />
        ))}
      </div>
    </div>
  );
};

export default Skills;
