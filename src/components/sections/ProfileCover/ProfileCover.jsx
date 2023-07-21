import React from "react";
import unsplash from "../../../images/Nature.jpg";

const ProfileCover = () => {
  return (
    <div className="h-60 w-full">
      <img
        src={unsplash}
        alt="cover"
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
};

export default ProfileCover;
