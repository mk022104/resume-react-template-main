import React from "react";
import "./SkillItem.css";

const SkillItem = (props) => {
  const { title, percentage } = props.skill;
  const numericPercentage = Number.parseInt(percentage, 10);
  return (
    <div className="skill-item w-full">
      <div className="mb-4 md:mx-4">
        <div className="mb-1">
          <h5 className="text-sm font-medium text-slate-700">{title}</h5>
        </div>
        <div
          className="skill-progress-track"
          role="progressbar"
          aria-label={title}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={numericPercentage}
        >
          <div
            className="skill-progress-fill h-full rounded-full"
            style={{ width: `${percentage}` }}
          />
          <span className="skill-progress-label">{percentage}</span>
        </div>
      </div>
    </div>
  );
};

export default SkillItem;
