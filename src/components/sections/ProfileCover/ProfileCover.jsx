import React from "react";
import pond from '../../../images/pond.jpg';

const ProfileCover = () => {
  return (
    <div className="h-60 w-full">
      <img
        src={pond}
        alt="cover"
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
};

export default ProfileCover;
