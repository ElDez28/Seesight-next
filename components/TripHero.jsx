import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useInView } from "react-intersection-observer";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "@/hooks/useHttp";
import { navActions } from "@/store/store";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Cookie from "js-cookie";

import { userActions } from "@/store/store";

function TripHero(props) {
  const { error, isLoading, clearError, sendRequest } = useHttp();
  const { wishlist } = useSelector((state) => state.user);
  const defaultValue = Date.now() + 24 * 60 * 60 * 1000;
  const [value, setValue] = useState(defaultValue);
  const [inWishlist, setInWishlist] = useState(false);
  const [secondValue, setSecondValue] = useState(
    Date.now() + 48 * 60 * 60 * 1000
  );
  const [price, setPrice] = useState(0);
  console.log(inWishlist);
  useEffect(() => {
    if (secondValue - value > 0) {
      setPrice(
        Math.round(((secondValue - value) / 24 / 60 / 60 / 1000) * props.price)
      );
    } else {
      setPrice(0);
    }
  }, [value, secondValue]);
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const handleSecondInputChange = (newValue) => {
    setSecondValue(newValue);
  };

  const dispatch = useDispatch();
  const bg = useSelector((state) => state.navbar.bg);
  const { ref, inView } = useInView({
    threshold: 0.9,
  });
  useEffect(() => {
    if (inView) {
      dispatch(navActions.setBg("bg-transparent"));
    } else {
      dispatch(navActions.setBg("bg-black"));
    }
  }, [inView]);

  useEffect(() => {
    setInWishlist(wishlist.some((item) => item._id === props.id));
  }, [wishlist.length]);

  const addToWishlist = async () => {
    try {
      const { data } = await sendRequest(
        "patch",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${props.id}/add`
      );

      dispatch(userActions.addItem(props.item));
      Cookie.set("user", JSON.stringify(data));
    } catch (err) {}
  };
  const removeFromWishlist = async () => {
    try {
      const { data } = await sendRequest(
        "patch",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${props.id}/remove`
      );

      dispatch(userActions.removeItem(props.item._id));
      Cookie.set("user", JSON.stringify(data));
    } catch (err) {}
  };
  return (
    <>
      <Navbar user={props.user} bg={bg}></Navbar>
      <header ref={ref} className="flex items-center font-rest ">
        <div className="w-full flex items-center justify-center min-h-[90vh] overflow-hidden relative">
          <div className="absolute w-full h-full bg-black bg-opacity-70"></div>
          <img
            className="absolute  h-full w-full object-cover -z-10"
            src="/images/tripHero1.jpg"
            alt=""
          ></img>
          <div className="bg-black px-12 py-8  max-w-6xl  rounded-2xl z-10 text-white text-center mx-4 md:mx-auto -mt-14">
            <h1 className="text-6xl font-bold ">{props.title}</h1>
            <h2 className="font-logo text-orange-400 text-3xl -rotate-6 mb-6">
              Seesight Travel
            </h2>
            <p className="max-w-2xl text-center mx-auto text-sm mb-6">
              {props.desc}
            </p>
            <div className="bg-transparent hover:bg-white hover:text-black py-3 px-4 border border-white transition-all duration-300 inline-block">
              <Link href="#list" scroll={false}>
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </header>
      <section className="font-rest relative">
        <div className="flex  flex-col   max-w-full items-center gap-6 justify-center mx-auto py-10 bg-black  ">
          <div className="flex max-w-6xl  flex-col  items-center gap-2 justify-center py-2  px-3  shadow-lg ">
            <div className="flex justify-between w-full gap-4 items-center bg-white py-4 px-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack className="" spacing={3}>
                  <DesktopDatePicker
                    minDate={defaultValue}
                    className="bg-white "
                    inputFormat="MM/DD/YYYY"
                    label="Starting date"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
              <LocalizationProvider className="item" dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    minDate={value + 24 * 60 * 60 * 1000}
                    className="bg-white "
                    inputFormat="MM/DD/YYYY"
                    label="Return date"
                    value={secondValue}
                    onChange={handleSecondInputChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>

              <div className="item flex flex-col items-center justify-center text-xl font-bol text-gray-400">
                <p>Price: </p>
                <p>{price}$</p>
              </div>
            </div>

            <div className="flex gap-2 flex-col md:flex-row bg-black w-full">
              {props.user && !inWishlist && (
                <button
                  type="button"
                  onClick={addToWishlist}
                  className="bg-orange-500 py-4 px-6 item  text-white font-bold flex items-center justify-center gap-4"
                >
                  {isLoading ? (
                    <span class="loader"></span>
                  ) : (
                    <>
                      Add to wishlist
                      <FavoriteBorderIcon></FavoriteBorderIcon>
                    </>
                  )}
                </button>
              )}

              {props.user && inWishlist && (
                <button
                  type="button"
                  onClick={removeFromWishlist}
                  className="bg-red-400 py-4 px-6 item  text-white font-bold flex items-center justify-center gap-4"
                >
                  {isLoading ? (
                    <span class="loader"></span>
                  ) : (
                    <>
                      {" "}
                      Remove from wishlist
                      <DeleteForeverIcon></DeleteForeverIcon>
                    </>
                  )}
                </button>
              )}

              <button className="py-4 px-6  item bg-green-500 text-white font-bold ">
                Make Reservation
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TripHero;
