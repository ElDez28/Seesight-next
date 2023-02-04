import React from "react";
import { useHttp } from "@/hooks/useHttp";
import Link from "next/link";
import { userActions } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
function WishItem(props) {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.user);
  const { isLoading, error, sendRequest, clearError } = useHttp();

  const removeFromWishlist = async () => {
    try {
      const { data } = await sendRequest(
        "patch",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${props.id}/remove`
      );
      dispatch(userActions.removeItem(props.id));
    } catch (err) {}
  };

  let source;
  if (props.image.includes("https")) {
    source = props.image;
  } else {
    source = `${process.env.NEXT_PUBLIC_BACKEND_SHORT}/images/cities/${props.image}`;
  }
  return (
    <>
      <div className="bg-white max-w-6xl  flex  gap-12  mx-auto  p-12 shadow-xl mb-12">
        <div className="flex font-rest gap-6 flex-col lg:flex-row  ">
          <div className="item flex flex-col items-center justify-between">
            <Image
              className="object-cover h-full pb-4"
              src={source}
              width={600}
              height={600}
              alt=""
            ></Image>
            <Link
              href={`/trips/${props.name}`}
              className={`py-2 w-full bg-transparent border b-${props.theme}  hover:text-white transition-all duration-300 flex justify-center items-center`}
            >
              See more info
            </Link>
          </div>

          <div className="itemTwo flex flex-col items-start justify-start gap-4">
            <div className="flex justify-between w-full">
              <h3 className="text-3xl font-semibold text-gray-400 ">
                {props.name}
              </h3>
              <button
                type="button"
                onClick={removeFromWishlist}
                className="text-white bg-red-600 px-4 flex items-center justify-center w-36"
              >
                {isLoading ? <span className="loader"></span> : "Delete"}
              </button>
            </div>
            <div className="flex justify-center w-full">
              <h3 className="md:block hidden text-xl text-gray-400 font-medium">
                Trip details
              </h3>
            </div>
            <div className="flex justify-between w-full flex-col">
              <p className=" hidden md:block text-xl font-bold text-gray-400 mb-2">
                Trip route
              </p>
              <div className="hidden md:flex gap-2 w-full items-center justify-center px-4">
                {props.coordinates.map((item, i) => {
                  return (
                    <>
                      <div className="border-2  flex items-center justify-center border-black w-4 h-4 rounded-full text-gray-400 font-medium"></div>
                      <div className="h-1 flex-1 bg-black"></div>
                    </>
                  );
                })}
                <div className="border-2  flex items-center justify-center border-orange-400 0 w-4 h-4 rounded-full"></div>
              </div>
              <div className="hidden md:flex justify-between w-full text-center text-gray-400 font-medium mb-6">
                {props.coordinates.map((item, i) => {
                  return (
                    <span key={i} className="text-center">
                      {item.name}
                    </span>
                  );
                })}
                <span className="text-orange-400">{props.name}</span>
              </div>
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center mt-2">
                <div className="flex flex-col mx-auto items-center">
                  <p className="text-xl font-bold text-gray-400 ">
                    Estimated travel time
                  </p>
                  <span className={`text-orange-400 font-bold text-2xl`}>
                    {props.duration}
                  </span>
                </div>
                <div className="flex flex-col mx-auto items-center">
                  <p className="text-xl font-bold text-gray-400 ">
                    Price per day
                  </p>
                  <span className={`text-orange-400 font-bold text-2xl`}>
                    {props.price} $
                  </span>
                </div>

                <div className="flex flex-col mx-auto items-center">
                  <Link
                    href={`/trips/${props.name}`}
                    type="button"
                    className="py-2 px-4 text-white bg-orange-600 hover:bg-orange-400 transition-all duration-300"
                  >
                    Make a reservation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WishItem;
