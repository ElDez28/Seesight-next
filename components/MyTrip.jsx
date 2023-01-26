import React from "react";
import Rating from "./Rating";
function MyTrip(props) {
  return (
    <div className="bg-white max-w-6xl  flex flex-col gap-12  mx-auto  p-12 shadow-xl ">
      <form>
        <div className="flex flex-col md:flex-row gap-12 text-gray-500 font-medium font-rest mb-8">
          <div className="item">
            <img
              src={`${process.env.NEXT_PUBLIC_BACKEND_SHORT}/images/cities/${props.image}`}
              alt=""
            ></img>
          </div>
          <div className="item flex flex-col items-center justify-center gap-12">
            <div>
              <h2 className="text-2xl text-green-600">{props.title}</h2>
            </div>
            <div className="flex gap-12 border-b-2 py-4">
              <div>
                <h2 className="">Starting Date</h2>
                <span>{props.startingDate}</span>
              </div>
              <div>
                <h2 className="">Ending Date</h2>
                <span>{props.endingDate}</span>
              </div>
              <div>
                <h2 className="">Days spent</h2>
                <span>
                  {(props.endingDate - props.startingDate) *
                    1000 *
                    60 *
                    60 *
                    24}
                </span>
              </div>
              <div>
                <h2 className="">Price</h2>
                <span>$ {props.price}</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <h2 className="font-bold text-xl ">Your rating of the trip</h2>
              <Rating></Rating>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-12 ">
          <div className="item">
            <h2 className="text-3xl font-semibold text-gray-400">
              Your review of the trip
            </h2>
            <p className="text-gray-400">
              Tell us how you feel about this trip
            </p>
          </div>
          <div className="item w-full">
            <textarea className=" resize-none focus:outline-none px-4 py-2 w-full border  h-36"></textarea>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-orange-500 py-2 px-6 text-white hover:bg-orange-400 transition-all duration-300 mb-4">
            Submit Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default MyTrip;
