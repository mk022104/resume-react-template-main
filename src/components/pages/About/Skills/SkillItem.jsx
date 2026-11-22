import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
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
        <ProgressBar
          completed={numericPercentage}
          bgColor="#4338ca"
          baseBgColor="#e2e8f0"
          height="20px"
          borderRadius="9999px"
          labelAlignment="center"
          labelColor="#fff"
          labelSize="11px"
          transitionDuration="1.15s"
          transitionTimingFunction="ease-in-out"
          animateOnRender
          className="skill-progressbar"
          barContainerClassName="skill-progress-track"
          labelClassName="skill-progress-label"
        />
      </div>
    </div>
  );
};

export default SkillItem;
