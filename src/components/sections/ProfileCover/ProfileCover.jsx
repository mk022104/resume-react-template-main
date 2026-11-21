import React from "react";
import londonbuilding from '../../../images/londonbuilding.jpg';

const ProfileCover = () => {
  return (
    <div className="relative h-64 w-full overflow-hidden md:h-72">
      <img
        src={londonbuilding}
        alt=""
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/35 to-indigo-900/20" />
    </div>
  );
};

export default ProfileCover;
