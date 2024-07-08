import React from "react";
import Souvenirpixels from "../../../images/pexels-souvenirpixels.jpg";

const ProfileCover = () => {
  return (
    <div className="h-60 w-full">    
         <img
          src={Souvenirpixels}
          alt="cover"
          className="w-full h-full object-cover object-center"
         />
    </div>
  );
};

export default ProfileCover;
