import React from "react";
import Image from "next/image";
function Trip(props) {
  return (
    <div className="cursor-pointer flex gap-6 items-center justify-between shadow-sm border-b-2 p-2">
      <div className="w-32  flex justify-start">
        <Image src={props.image}></Image>
      </div>
      <div className="text-sm font-semibold text-gray-400 flex flex-col gap-2">
        <p>{props.timing}</p>
        <span>{props.date}</span>
      </div>
      <div className="text-sm font-semibold text-gray-400 flex flex-col gap-2 ">
        <p>Place:</p>
        <span>{props.title}</span>
      </div>
      <div className="text-sm font-semibold text-gray-400 flex flex-col items-center justify-center gap-2">
        <p>{props.days}</p>
        <span
          className={`bg-gradient-to-r ${props.gradient} text-white  h-6 w-6 text-sm flex items-center justify-center rounded-full`}
        >
          {props.duration}
        </span>
      </div>
    </div>
  );
}

export default Trip;
