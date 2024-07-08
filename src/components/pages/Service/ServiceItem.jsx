import React from "react";

const ServiceItem = (props) => {
  const { icon, title, description } = props.service;
  return (
    <div className="w-full lg:w-1/2">
      <div className="my-4 md:mx-4 shadow p-10 lg:p-6 md:p-10 rounded-md bg-white group hover:shadow-md">
        <div className="w-16 h-16 flex items-center justify-center rounded-md text-3xl mb-5 bg-gray-300 bg-opacity-500 text-pink-400 transition duration-100 group-hover:bg-indigo-900">
          {icon}
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2 hover:text-indigo-400">
          {title}
        </h3>
        <p className="text-gray-400 serviceFontDecoration">{description}</p>
      </div>
    </div>
  );
};

export default ServiceItem;
