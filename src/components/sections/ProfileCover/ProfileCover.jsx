import React from "react";
import { usePortfolioData } from '../../../context/PortfolioContext';

const ProfileCover = () => {
  const { profile } = usePortfolioData();
  return (
    <div className="relative h-64 w-full overflow-hidden md:h-72">
      <img
        src={profile.coverImage}
        alt="cover"
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/35 to-indigo-900/20" />
    </div>
  );
};

export default ProfileCover;
