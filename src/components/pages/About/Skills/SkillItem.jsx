import React from "react";
// import ProgressBar from "@ramonak/react-progress-bar";

const SkillItem = (props) => {
  const { title, percentage } = props.skill;
  return (
    <div className="w-full">
      <div className="mb-4 md:mx-4">
        <div className="flex justify-between items-center mb-1">
          <h5 className="text-sm font-medium text-slate-700">{title}</h5>
          <span className="text-xs font-semibold text-indigo-700">
            {percentage}
          </span>
        </div>
        <div className="relative h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="animate h-full rounded-full bg-gradient-to-r from-indigo-700 to-violet-500"
            style={{ width: `${percentage}` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillItem;
