import React from "react";
import Link from "next/link";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Card(props) {
  return (
    <div className="w-full mx-auto  font-rest shadow-lg  ">
      <div className="w-full relative ">
        <img
          className="w-full"
          src={`${process.env.NEXT_PUBLIC_BACKEND_SHORT}/images/cities/${props.image}`}
          alt=""
        ></img>
        <div
          className={`theme-${props.theme} w-10 h-10 text-white   p-2 rounded-full text-center absolute flex items-center justify-center
          -bottom-4 right-2 `}
        >
          <FontAwesomeIcon
            className="max-w-full max-h-full"
            icon={props.icon}
          />
        </div>
      </div>
      <div className="p-6 flex flex-col gap-4">
        <div className="border-b-2 pb-4">
          <h3 className="font-bold text-lg text-gray-700">{props.title}</h3>
          <div className=" text-gray-400 flex items-center gap-1 text-sm">
            <FontAwesomeIcon
              className="h-4"
              icon={faLocationDot}
            ></FontAwesomeIcon>
            Bosnia
          </div>
        </div>
        <div className="border-b-2 pb-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            <h3>{props.descOne?.toUpperCase()}</h3>
            <div className="flex gap-2">
              <h3>{props.descTwo?.toUpperCase()}</h3>
              <span
                className={`bg-${props.theme} rounded-2xl px-4 text-white flex items-center justify-center`}
              >
                {props.rating}
              </span>
            </div>
          </div>
          <span className="text-2xl text-gray-600 font-medium">
            {props.price} $
          </span>
        </div>
        <div className=" pb-4 ">
          <p className="mb-4 text-gray-600">{props.desc}</p>
          <Link
            className={`bg-${props.theme} text-white px-4 py-1 rounded-2xl`}
            href={`/trips/${props.title}`}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
