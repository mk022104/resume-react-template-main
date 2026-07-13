import React from "react";
import londonbuilding from '../../../images/londonbuilding.jpg';

const ProfileCover = () => {
  return (
    <div className="h-60 w-full">
      <img
        src={londonbuilding}
        alt="cover"
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
};

export default ProfileCover;
