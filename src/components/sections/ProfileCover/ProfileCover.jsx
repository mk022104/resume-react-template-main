import React from "react";
import Nature from "../../../images/Nature.jpg";
import Flowers from "../../../images/portfolio/Flowers.jpeg";
import Greenway from "../../../images/portfolio/Greenway.jpeg";
import Mountains from "../../../images/portfolio/Mountains.jpeg";
import Rocks from "../../../images/portfolio/Rocks.jpeg";
import Trees from "../../../images/portfolio/Trees.jpeg";
import lateNight from "../../../images/portfolio/lateNight.jpeg";
import sun from "../../../images/portfolio/sun.jpeg";
// import Carousel from 'nuka-carousel';

const ProfileCover = () => {
  //const pictures = [Nature,Flowers, Greenway, Mountains, Rocks, Trees, lateNight,sun];
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
