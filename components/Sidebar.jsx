import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { profileActions } from "@/store/store";
import Image from "next/image";
import logo from "../public/images/4153548.png";
function Sidebar(props) {
  const [hide, setHide] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      {!hide && (
        <div
          className="lg:hidden flex absolute bg-white z-40"
          onClick={() => setHide((prev) => !prev)}
        >
          <MenuIcon className="mt-10 ml-6"></MenuIcon>
        </div>
      )}

      <div
        className={`${
          !hide ? "-translate-x-96" : "translate-x-0"
        }  lg:flex flex-col items-center px-4 py-6  w-64 min-h-screen fixed lg:translate-x-0 lg:relative  bg-white z-10 border-r transition-transform duration-300 ease`}
      >
        <div className="flex w-full justify-between">
          <div className="w-12 h-12 flex items-center  bg-black rounded-full p-2 mb-12">
            <Link href="/">
              <Image className="" src={logo} alt=""></Image>
            </Link>
          </div>
          <div className="lg:hidden z-20 " onClick={() => setHide(false)}>
            {" "}
            <CancelIcon className=""></CancelIcon>
          </div>
        </div>
        <ul className="font-semibold text-gray-700 flex flex-col gap-4">
          <li
            onClick={() => {
              setHide(false);
              dispatch(profileActions.setPage(1));
            }}
            className={`cursor-pointer border-b-2 ${
              props.page === 1 && "border-orange-400"
            }`}
          >
            My Account
          </li>
          {props.user.role === "user" && (
            <li
              onClick={() => {
                setHide(false);
                dispatch(profileActions.setPage(2));
              }}
              className={`cursor-pointer border-b-2 ${
                props.page === 2 && "border-orange-400"
              }`}
            >
              My Trips
            </li>
          )}
          {props.user.role === "user" && (
            <li
              onClick={() => {
                setHide(false);
                dispatch(profileActions.setPage(3));
              }}
              className={`cursor-pointer border-b-2 ${
                props.page === 3 && "border-orange-400"
              }`}
            >
              My Wishlist
            </li>
          )}
          {props.user.role === "user" && (
            <li
              onClick={() => {
                setHide(false);
                dispatch(profileActions.setPage(4));
              }}
              className={`cursor-pointer border-b-2 ${
                props.page === 4 && "border-orange-400"
              }`}
            >
              My Reservations
            </li>
          )}
          {props.user.role === "user" && (
            <li
              onClick={() => {
                setHide(false);
                dispatch(profileActions.setPage(5));
              }}
              className={`cursor-pointer border-b-2 ${
                props.page === 5 && "border-orange-400"
              }`}
            >
              My Complaints
            </li>
          )}
          {props.user.role === "admin" && (
            <li
              onClick={() => {
                setHide(false);
                setOpenAdmin(true);
                dispatch(profileActions.setPage(6));
              }}
              className={`cursor-pointer border-b-2 ${
                props.page === 6 && "border-orange-400"
              }`}
            >
              Users
            </li>
          )}
          {props.user.role === "admin" && (
            <li
              onClick={() => {
                setHide(false);
                setOpenAdmin(true);
                dispatch(profileActions.setPage(7));
              }}
              className={`cursor-pointer border-b-2 ${
                props.page === 7 && "border-orange-400"
              }`}
            >
              Reservations
            </li>
          )}
          {props.user.role === "admin" && (
            <li
              onClick={() => {
                setHide(false);
                setOpenAdmin(true);
                dispatch(profileActions.setPage(8));
              }}
              className={`cursor-pointer border-b-2 ${
                props.page === 8 && "border-orange-400"
              }`}
            >
              Complaints
            </li>
          )}
          {props.user.role === "admin" && (
            <li
              onClick={() => {
                setHide(false);
                setOpenAdmin(true);
                dispatch(profileActions.setPage(9));
              }}
              className={`cursor-pointer border-b-2 ${
                props.page === 9 && "border-orange-400"
              }`}
            >
              Add new trip
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
