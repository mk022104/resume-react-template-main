import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import "./Group.css";

const textFragments = ["top-left", "top-right", "bottom-left", "bottom-right"];

const ContactText = ({ children, className = "" }) => (
  <span className={`group-contact-text ${className}`}>
    <span className="group-contact-text__accessible">{children}</span>
    {textFragments.map((fragment) => (
      <span
        key={fragment}
        className={`group-contact-fragment group-contact-fragment--${fragment}`}
        aria-hidden="true"
      >
        {children}
      </span>
    ))}
  </span>
);

const Group =()=>{
    return (
        <div className="group-card h-96 w-full overflow-hidden shadow-lg">
          <div className="group-water" aria-hidden="true" />
          <div className="group-card-content flex h-full items-center justify-center">
             <h1 className="text-white font-serif text-left	text-center">
                <div className="group-contact-row group-contact-row--name flex items-center space-x-4 p-4">
                  <svg className="group-contact-icon group-contact-icon--top w-5 h-5 mb-1 text-white-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                  </svg>
                <ContactText className="text-l hover:text-purple-40">Madhukar Reddy Gangapuram</ContactText></div>
                
                <div className="group-contact-row group-contact-row--email flex items-center space-x-4 p-4"><AiOutlineMail className="group-contact-icon group-contact-icon--top h-5 w-5"/><ContactText className="text-l">madhu.ganga2018@gmail.com</ContactText></div>
                <div className="group-contact-row group-contact-row--phone flex items-center space-x-4 p-4"><BsFillTelephoneFill className="group-contact-icon group-contact-icon--top h-5 w-5"/><ContactText className="text-l">984-377-1236</ContactText></div>&nbsp;
             </h1>
         </div>
       </div>
    )
}

export default Group;