import React from "react";
import {
  faChevronCircleRight,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import facebook from "../public/images/facebook.png";
import twitter from "../public/images/twitter.png";
import instagram from "../public/images/instagram.png";
import youtube from "../public/images/youtube.png";
import logo from "../public/images/4153548.png";
function Footer() {
  return (
    <footer className="bg-gray-700 font-rest">
      <div className="max-w-7xl mx-auto grid md:grid-cols-1 items-center justify-center lg:grid-cols-3">
        <div className="flex  text-gray-200 py-6 justify-center items-center">
          <div className="flex flex-col items-center lg:items-start">
            <span className="mb-2">About Us</span>
            <div className="flex items-center gap-2 mb-2">
              <Image className="w-8 h-8" src={logo} alt=""></Image>
              <span className="font-logo">Seesight Travel</span>
            </div>
            <p className="leading-tight max-w-sm text-center lg:text-left mb-2">
              The leading bosnian travel company that is providing luxiorious
              trips for customers who know how to enjoy
            </p>
            <div className="flex gap-2 ">
              <div className="w-8 cursor-pointer">
                <Image src={twitter} alt=""></Image>
              </div>
              <div className="w-8 cursor-pointer">
                <Image src={instagram} alt=""></Image>
              </div>
              <div className="w-8 cursor-pointer">
                <Image src={facebook} alt=""></Image>
              </div>
              <div className="w-8 cursor-pointer">
                <Image src={youtube} alt=""></Image>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center py-6 text-gray-200">
          <div className="flex flex-col gap-1">
            <h3>Travel Categories</h3>
            <span className="flex items-center gap-2 text-gray-200">
              <FontAwesomeIcon
                className="h-4 w-4"
                icon={faChevronCircleRight}
              ></FontAwesomeIcon>
              Honeymoon
            </span>
            <span className="flex items-center gap-2 text-gray-200">
              <FontAwesomeIcon
                className="h-4 w-4"
                icon={faChevronCircleRight}
              ></FontAwesomeIcon>
              Winter Sun Holidays
            </span>
            <span className="flex items-center gap-2 text-gray-200">
              <FontAwesomeIcon
                className="h-4 w-4"
                icon={faChevronCircleRight}
              ></FontAwesomeIcon>
              Camping Season
            </span>
            <span className="flex items-center gap-2 text-gray-200">
              <FontAwesomeIcon
                className="h-4 w-4"
                icon={faChevronCircleRight}
              ></FontAwesomeIcon>
              Luxury Cities
            </span>
            <span className="flex items-center gap-2 text-gray-200">
              <FontAwesomeIcon
                className="h-4 w-4"
                icon={faChevronCircleRight}
              ></FontAwesomeIcon>
              Family Holidays
            </span>
            <span className="flex items-center gap-2 text-gray-200">
              <FontAwesomeIcon
                className="h-4 w-4"
                icon={faChevronCircleRight}
              ></FontAwesomeIcon>
              Culture Trips
            </span>
            <span className="flex items-center gap-2 text-gray-200">
              <FontAwesomeIcon
                className="h-4 w-4"
                icon={faChevronCircleRight}
              ></FontAwesomeIcon>
              Forest adeventures
            </span>
          </div>
        </div>
        <div className="py-6 flex items-center justify-center flex-col gap-2">
          <div className="mb-4">
            <input
              placeholder="Subscribe to newsletter"
              type="email"
              className="py-2 px-4 focus:outline-none"
            ></input>
            <button className="bg-green-600 py-2 px-4 text-white">
              Submit
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-white text-2xl">Customer Support</span>
            <div className="flex items-center gap-2 mb-2">
              <FontAwesomeIcon
                className="w-6 h-6 text-green-600"
                icon={faPhone}
              ></FontAwesomeIcon>
              <span className="text-white text-xl">+1 234 567 890</span>
            </div>
            <span className="text-gray-200">seesighttravel@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
