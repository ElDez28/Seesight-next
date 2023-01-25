import React from "react";
import CheckIcon from "@mui/icons-material/Check";
function Option(props) {
  return (
    <div
      className={`flex gap-3 flex-col border px-6 py-4 ${props.primary} ${props.bg} relative overflow-hidden`}
    >
      {props.best === true && (
        <div className="absolute flex items-center justify-center bg-yellow-400 text-black w-full rotate-45 left-[4.5rem] top-6">
          <span className="text-center text-sm">Best value</span>
        </div>
      )}
      <div>
        <h2
          className={`text-center mb-2 font-semibold ${props.primary} text-xl`}
        >
          {props.title}
        </h2>
      </div>
      <div className="flex items-center justify-between ">
        <CheckIcon className={props.primary}></CheckIcon>
        <span>{`${props.stars} star Hotel`}</span>
      </div>
      <div className="flex items-center justify-between">
        <CheckIcon className={props.primary}></CheckIcon>
        <span>{`${props.days} days`}</span>
      </div>
      <div className="flex items-center gap-2 justify-between">
        <CheckIcon className={props.primary}></CheckIcon>
        <span>{props.group}</span>
      </div>
      <div className="flex items-center  justify-between mb-4">
        <CheckIcon className={props.primary}></CheckIcon>
        <span>${props.price}</span>
      </div>
      <div className="flex gap-2 items-center justify-center">
        <button className={`py-2 px-4 ${props.btnBg} ${props.secondary} `}>
          Make reservation
        </button>
      </div>
    </div>
  );
}

export default Option;
