import React from "react";
import mountain from "./mountain.jpg"
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

const Group =()=>{
    return (
        <div className="bg-cover bg-center h-96 md:mr-8 md:ml-8 md:mb-8 lg:mb-8 sm:mx-0 shadow-md shadow-l shadow
          rounded-sm rounded-md rounded-lg" style={{ backgroundImage: `url(${mountain})`  }}>
          <div className="flex items-center justify-center h-full bg-black bg-opacity-10">
             <h1 className="text-white font-serif text-left	text-center">
                <div className="flex items-center space-x-4 p-4">
                  <svg class="w-5 h-5 mb-1 text-white-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                  </svg>
                <div className="text-l hover:text-purple-40">Madhukar Reddy Gangapuram</div></div>
                
                <div className="flex items-center space-x-4 p-4"><AiOutlineMail className="h-5 w-5"/><div className="text-l">madhu.ganga2018@gmail.com</div></div>
                <div className="flex items-center space-x-4 p-4"><BsFillTelephoneFill className="h-5 w-5"/><p className="text-l">984-377-1236</p></div>&nbsp;
             </h1>
         </div>
       </div>
    )
}

export default Group;