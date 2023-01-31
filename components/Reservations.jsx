import React from "react";
import Reservation from "./Reservation";
import { useSelector } from "react-redux";
const Reservations = () => {
  const { reservations } = useSelector((state) => state.admin);

  return (
    <div className="w-96  md:w-auto bg-white rounded-xl py-6 px-12 mt-20 shadow-2xl text-gray-500 flex flex-col gap-8">
      <h2 className="italic text-center">Reservations</h2>
      {reservations.length > 0 &&
        reservations.map((res) => {
          const startingDate = new Date(res.startingDate).toLocaleString(
            "default",
            {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            }
          );
          const endingDate = new Date(res.endingDate).toLocaleString(
            "default",
            {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            }
          );
          return (
            <Reservation
              key={res._id}
              reservation={res}
              user={res.user.username}
              trip={res.trip.title}
              price={res.price}
              startingDate={startingDate}
              endingDate={endingDate}
            ></Reservation>
          );
        })}
    </div>
  );
};

export default Reservations;
