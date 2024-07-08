import React from "react";
import mountain from "./mountain.jpg"
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Group =()=>{
    return (
        // <div className="relative w-full bg-neutral-200 dark:bg-neutral-600 overflow-hidden">
        //   <div className="mx-1 mr-14">
        //    <img src="mountain.jpg" className="rounded-sm rounded-md rounded-lg shadow-md shadow-lg mr-6 ml-6 h-96 w-full"alt="Waterfalls"/>
        //    <p className="text-left hover:text-center"></p>
        //   </div>
        // </div>
        <div className="bg-cover bg-center h-96 mr-6 ml-6 mb-8 lg:mb-8" style={{ backgroundImage: `url(${mountain})`  }}>
          <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
             <h1 className="text-white font-serif text-left	text-center">
                <div className="flex items-center space-x-4 p-4"> <AiOutlineInfoCircle className="h-5 w-5"/><div className="text-l">Madhukar Reddy Gangapuram</div></div>
                <div className="flex items-center space-x-4 p-4"><AiOutlineMail className="h-5 w-5"/><div className="text-l">madhu.ganga2018@gmail.com</div></div>
                <div className="flex items-center space-x-4 p-4"><BsFillTelephoneFill className="h-5 w-5"/><p className="text-l">984-377-1236</p></div>&nbsp;
             </h1>
         </div>
       </div>
    )
}

export default Group;