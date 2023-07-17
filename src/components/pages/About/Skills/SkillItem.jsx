import React, { useTransition } from "react";
// import ProgressBar from "@ramonak/react-progress-bar";

const SkillItem = (props) => {
  const { title, percentage } = props.skill;
  return (
    <div className="w-full bg-neutral-200 dark:bg-neutral-600">
      <div className="mb-4 md:mx-4">
        <div className="flex justify-between items-center mb-1">
          <h5 className="text-md text-black-400 font-light">{title}</h5>
          <span className="bg-primary p-0.5 text-center text-xs font-medium leading-none text-primary-100">
            {percentage}
          </span>
        </div>
        <div class="relative rounded-full bg-gray-200">
          <div
            class="animate h-5 rounded-full bg-purple-600"
            style={{ width: `${percentage}` }}
          ></div>
          <span class="absolute inset-0 flex items-center justify-center text-sm font-medium text-blue-100">
            {percentage}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SkillItem;
