import React, { useState } from "react";
import { useHttp } from "@/hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "@/store/store";

const Reservation = (props) => {
  const dispatch = useDispatch();
  const { sendRequest, error, isLoading, clearError } = useHttp();
  const [loadingOne, setLoadingOne] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);
  const [loadingThree, setLoadingThree] = useState(false);
  let status;
  if (props.reservation.status === "pending") {
    status = "considering";
  } else if (props.reservation.status === "considering") {
    status = "aproved";
  } else {
    status = "pending";
  }
  const changeResStatus = async () => {
    try {
      setLoadingOne(true);
      const res = await sendRequest(
        "patch",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${props.reservation._id}`,
        {
          status,
        }
      );

      setLoadingOne(false);
      dispatch(
        adminActions.changeResStatus({ id: props.reservation._id, status })
      );
    } catch (err) {
      setLoadingOne(false);
    }
  };
  const changeStatusToRejected = async () => {
    try {
      setLoadingTwo(true);
      const res = await sendRequest(
        "patch",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${props.reservation._id}`,
        {
          status: "rejected",
        }
      );

      setLoadingTwo(false);
      dispatch(
        adminActions.changeResStatus({
          id: props.reservation._id,
          status: "rejected",
        })
      );
    } catch (err) {
      setLoadingTwo(false);
    }
  };
  const deleteReservation = async () => {
    try {
      setLoadingThree(true);
      const res = await sendRequest(
        "delete",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${props.reservation._id}`
      );

      setLoadingThree(false);
      dispatch(adminActions.deleteRes(props.reservation._id));
    } catch (err) {
      setLoadingThree(false);
    }
  };
  return (
    <div className="flex flex-col gap-2 shadow-sm p-4 ">
      <div className="flex flex-col justify-between gap-6 md:flex-row ">
        <div className="flex flex-col gap-1 items-center justify-center item">
          <div className="flex gap-2 justify-center items-center">
            <h3>Trip to:</h3>
            <span>{props.trip}</span>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <h3>Reservation from:</h3>
            <span>{props.user}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center item w-full">
          <div className="flex gap-2 w-full text-center justify-between">
            <h3 className="item">Starting date</h3>
            <h3 className="item">Ending Date</h3>
          </div>
          <div className="flex gap-2 text-center w-full justify-between">
            <span className="item">{props.startingDate}</span>
            <span className="item">{props.endingDate}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center item">
          <div className="flex gap-2">
            <h3>Price:</h3>
            <span>{props.price} $</span>
          </div>
          <div className="flex gap-2">
            <h3 className="">Reservation status:</h3>
            <span
              className={`${
                props.reservation.status === "pending"
                  ? "text-orange-500"
                  : props.reservation.status === "aproved"
                  ? "text-green-500"
                  : "text-red-500"
              } font-bold`}
            >
              {props.reservation.status}
            </span>
          </div>
        </div>
      </div>
      <div className="lg:w-[48rem] flex gap-4 flex-col lg:flex-row  justify-between">
        <button
          type="button"
          className="flex item items-center justify-center bg-green-400 text-white py-2 hover:bg-green-500 transition-all duration-150"
          onClick={changeResStatus}
        >
          {loadingOne ? <span className="loader"></span> : "Update status"}
        </button>
        <button
          onClick={changeStatusToRejected}
          type="button"
          className="flex item items-center justify-center bg-red-400 text-white py-2 hover:bg-red-500 transition-all duration-150"
        >
          {loadingTwo ? <span className="loader"></span> : "Reject reservation"}
        </button>
        <button
          onClick={deleteReservation}
          type="button"
          className="flex item items-center justify-center bg-orange-400 text-white py-2 hover:bg-orange-500 transition-all duration-150"
        >
          {loadingThree ? (
            <span className="loader"></span>
          ) : (
            "Delete reservation"
          )}
        </button>
      </div>
    </div>
  );
};

export default Reservation;
