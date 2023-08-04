import React from "react";
import Mountains from "../../../images/Mountains.jpeg";

const ProfileCover = () => {
  return (
    <div className="h-60 w-full">    
         <img
          src={Mountains}
          alt="cover"
          className="w-full h-full object-cover object-center"
         />
    </div>
  );
};

export default ProfileCover;
