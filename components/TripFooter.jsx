import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import footerOne from "../public/images/footer-bg.jpg";
import footerTwo from "../public/images/footer-sm-bg.png";
function TripFooter(props) {
  const router = useRouter();
  return (
    <footer className=" mt-2 py-0 pb-12 md:pb-0  md:py-12 font-rest overflow-hidden relative mx-2 md:mx-0">
      <Image
        src={footerOne}
        alt=""
        className="hidden md:block object-cover absolute -z-10 -translate-y-12  w-full"
      ></Image>
      <Image
        src={footerTwo}
        alt=""
        className="md:hidden object-cover absolute -z-10   w-full"
      ></Image>
      <div className="max-w-2xl flex-col gap-4 mx-auto text-gray-200 md:text-gray-600 font-bold  flex items-center justify-center py-10">
        <h2 className="text-center text-4xl md:text-6xl px-4">
          We are with you at every stage of your yourney
        </h2>
        <p className=" text-sm px-4  text-center font-medium ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
          saepe nam eveniet alias ex, sint quod, sed recusandae eum architecto
          sapiente sequi, cum explicabo illum nisi amet nulla ducimus corrupti.
        </p>
      </div>
      <div className="w-full items-center justify-center flex">
        <button
          onClick={() => {
            props.user ? props.setOpen(true) : router.push("/signin");
          }}
          className="mx-auto py-2 px-4 bg-orange-500 mb-4 text-white font-bold bg-top transition-all duration-300 hover:shadow-2xl"
        >
          Book your trip
        </button>
      </div>
    </footer>
  );
}

export default TripFooter;
