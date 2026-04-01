import React from "react";
import tajmahal from '../../../images/tajmahal.jpg';

const ProfileCover = () => {
  return (
    <div className="h-60 w-full">
      <img
        src={tajmahal}
        alt="cover"
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
};

export default ProfileCover;
