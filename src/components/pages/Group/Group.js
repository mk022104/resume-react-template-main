import React from "react";
import mountain from "./mountain.jpg"
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Group =()=>{
    return (
        <div className="bg-cover bg-center h-96 mr-8 ml-8 mb-8 lg:mb-8 rounded-sm rounded-md rounded-lg" style={{ backgroundImage: `url(${mountain})`  }}>
          <div className="flex items-center justify-center h-full bg-black bg-opacity-10">
             <h1 className="text-white font-serif text-left	text-center">
                <div className="flex items-center space-x-4 p-4"> <AiOutlineInfoCircle className="h-5 w-5"/><div className="text-l hover:text-purple-40">Madhukar Reddy Gangapuram</div></div>
                <div className="flex items-center space-x-4 p-4"><AiOutlineMail className="h-5 w-5"/><div className="text-l">madhu.ganga2018@gmail.com</div></div>
                <div className="flex items-center space-x-4 p-4"><BsFillTelephoneFill className="h-5 w-5"/><p className="text-l">984-377-1236</p></div>&nbsp;
             </h1>
         </div>
       </div>
    )
}

export default Group;