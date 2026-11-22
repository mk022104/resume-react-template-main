import React from "react";
import "./SkillItem.css";

const SkillItem = (props) => {
  const { title, percentage } = props.skill;
  return (
    <div className="skill-item w-full">
      <div className="mb-4 md:mx-4">
        <div className="flex justify-between items-center mb-1">
          <h5 className="text-sm font-medium text-slate-700">{title}</h5>
          <span className="text-xs font-semibold text-indigo-700">
            {percentage}
          </span>
        </div>
        <div className="relative h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="skill-progress-fill h-full rounded-full"
            style={{ width: `${percentage}` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillItem;
