import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { navActions } from "@/store/store";

function Hero(props) {
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
  return (
    <header
      ref={ref}
      className=" min-h-screen bg-gradient-to-t from-[#d1d6db] to-[#415a77]"
    >
      <Navbar user={props.user} bg={bg}></Navbar>
      <div className="h-screen bg-[url('https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover flex justify-center items-center flex-col">
        <div className="absolute bg-black opacity-60  w-full h-full "></div>
        <div className="bg-black py-16 px-10  rounded-2xl font-rest z-10 flex-col text-white text-center max-w-3xl">
          <h1 className="text-white text-5xl  font-bold mb-6">
            Most beautifle locations in Bosnia
          </h1>
          <p className="text-xl mb-6 px-10">
            Join hundreds of people on their journey to the wonderland. Be aware
            that life is a book and those who don't travel read only one page
          </p>
          <Link
            href="#list"
            scroll={false}
            className="bg-transparent hover:bg-white hover:text-black py-3 px-4  border border-white transition-all duration-300"
          >
            Learn more
          </Link>
        </div>
        <h2 className=" z-10 font-logo text-6xl text-orange-600 -skew-y-6">
          Seesight Travel
        </h2>
      </div>
    </header>
  );
}

export default Hero;
