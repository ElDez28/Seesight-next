import React, { useState, useEffect } from "react";
import { useHttp } from "@/hooks/useHttp";
import MyTrip from "./MyTrip";
import AccHeader from "./AccHeader";
function MyTrips(props) {
  const { sendRequest, isLoading, error, clearError } = useHttp();
  const reviews = props.user.myReviews;
  const trips = props.orders.filter((item) => {
    return item.status === "aproved" && new Date(item.endingDate) < Date.now();
  });

  return (
    <>
      <AccHeader desc="trips" user={props.user}></AccHeader>
      <div className="mt-20">
        {trips.map((item) => {
          return (
            <MyTrip
              key={item._id}
              id={item.trip._id}
              startingDate={item.startingDate}
              endingDate={item.endingDate}
              price={item.price}
              image={item.trip.imageCover}
              reviews={reviews}
            ></MyTrip>
          );
        })}
      </div>
    </>
  );
}

export default MyTrips;
