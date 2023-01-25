import React from "react";

function AccHeader(props) {
  return (
    <div className="flex flex-col lg:flex-row items-end justify-between w-full bg-white p-2">
      <div className="flex flex-col order-2 lg:order-1">
        <h2 className="font-semibold text-gray-400 text-right lg:text-left">
          My Profile Info
        </h2>
        <span className="text-gray-400 text-right lg:text-left -mt-1">
          Welcome to your {props.desc}
        </span>
      </div>
      <div className="text-gray-400 font-medium flex items-center gap-2 order-1 lg:order-2">
        <img
          className=" w-12 h-12 object-cover rounded-full"
          src={`${process.env.NEXT_PUBLIC_BACKEND_SHORT}/images/users/${props.user.image}`}
          alt=""
        ></img>
        <h2>Hello {props.user.username}</h2>
      </div>
    </div>
  );
}

export default AccHeader;
