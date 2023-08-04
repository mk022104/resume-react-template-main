import React from "react";
import Nature from "../../../images/Nature.jpg";

const ProfileCover = () => {
  return (
    <div className="h-60 w-full">    
         <img
          src={Nature}
          alt="cover"
          className="w-full h-full object-cover object-center"
         />
    </div>
  );
};

export default ProfileCover;
