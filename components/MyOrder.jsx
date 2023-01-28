import React from "react";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useHttp } from "@/hooks/useHttp";
import { useState } from "react";
function MyOrder(props) {
  const day = 24 * 60 * 60 * 1000;
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const price = props.order.price;
  const [status, setStatus] = useState(props.order.status);
  const [reservation, setReservation] = useState(props.order);
  const startingDate = new Date(props.order.startingDate).toLocaleString(
    "default",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
  const endingDate = new Date(props.order.endingDate).toLocaleString(
    "default",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const cancelOrder = async () => {
    try {
      const { data } = await sendRequest(
        "patch",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${props.order._id}`,
        {
          status: "canceled",
        }
      );
      const filteredData = props.orders.filter(
        (order) => order._id !== data._id
      );
      props.setOrders([...filteredData, data]);
      setStatus("canceled");
    } catch (err) {}
  };
  return (
    <div className="bg-white max-w-6xl  flex  gap-12  mx-auto mt-20 p-12 shadow-xl ">
      <div className="flex font-rest gap-6 flex-col lg:flex-row  ">
        <div className={`item flex  items-center p-0`}>
          <img
            className=" w-full h-full object-cover "
            src={`${process.env.NEXT_PUBLIC_BACKEND_SHORT}/images/cities/${reservation.trip.imageCover}`}
          ></img>
        </div>

        <div className="itemTwo flex flex-col items-start justify-start gap-4">
          <div className="flex justify-between w-full">
            <h3 className="text-3xl font-semibold text-gray-400 ">
              {reservation.trip.title}
            </h3>
            <button
              onClick={cancelOrder}
              type="button"
              className="text-white bg-red-600 px-4"
            >
              {isLoading ? <span className="loader"></span> : "Cancel"}
            </button>
          </div>
          <div className="flex justify-center w-full">
            <h3 className="md:block hidden text-xl text-gray-400 font-medium">
              Trip details
            </h3>
          </div>
          <div className="flex justify-between w-full flex-col">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mt-2">
              <div className="flex flex-col mx-auto items-center">
                <p className="text-lg font-bold text-gray-400 ">
                  Starting date
                </p>
                <span className={`text-gray-400  text-sm`}>{startingDate}</span>
              </div>
              <div className="flex flex-col mx-auto items-center">
                <p className="text-lg font-bold text-gray-400 ">Ending date</p>
                <span className={`text-gray-400  text-sm`}>{endingDate}</span>
              </div>
              <div className="flex flex-col mx-auto items-center justify-center">
                <p className="text-lg font-bold text-gray-400 ">
                  Estimated travel time
                </p>
                <span className={`text-orange-400 font-bold  text-sm`}>
                  {reservation.trip.tripDuration}
                </span>
              </div>
              <div className="flex flex-col mx-auto items-center">
                <p className="text-lg font-bold text-gray-400 ">Price</p>
                <span className={`text-orange-400 font-bold text-sm`}>
                  {price}$
                </span>
              </div>
            </div>
          </div>
          <div className="w-full">
            <h2 className=" text-center text-gray-400">Reservation status</h2>
          </div>
          <div className="w-full flex justify-between px-6">
            <div
              className={`flex flex-col items-center justify-center ${
                status === "pending"
                  ? "animate-pulse text-orange-400"
                  : "text-gray-300"
              }`}
            >
              <span className="text-sm ">Pending</span>
              <PendingActionsIcon
                className={`w-12 h-12  `}
              ></PendingActionsIcon>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${
                status === "considering"
                  ? "animate-pulse text-orange-400"
                  : "text-gray-300"
              }`}
            >
              <span className="text-sm ">Considering</span>
              <RemoveRedEyeIcon className="w-12 h-12 "></RemoveRedEyeIcon>
            </div>
            {status !== "canceled" && (
              <div
                className={`flex flex-col items-center justify-center ${
                  status === "aproved"
                    ? "animate-pulse text-green-500"
                    : "text-gray-300"
                }`}
              >
                <span className="text-sm">Aproved</span>
                <FactCheckIcon className="w-12 h-12"></FactCheckIcon>
              </div>
            )}
            {status === "canceled" && (
              <div
                className={`flex flex-col items-center justify-center ${
                  status === "canceled"
                    ? "animate-pulse text-red-400"
                    : "text-gray-300"
                }`}
              >
                <span className="text-sm">Canceled</span>
                <DisabledByDefaultIcon className="w-12 h-12"></DisabledByDefaultIcon>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyOrder;
