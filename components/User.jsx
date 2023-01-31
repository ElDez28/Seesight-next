import React, { useEffect } from "react";
import Image from "next/image";
import user from "../public/images/user.png";
import { useHttp } from "@/hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "@/store/store";
import { useState } from "react";
function User(props) {
  const { users } = useSelector((state) => state.admin);
  const user = users.find((user) => user._id === props.user._id);

  const { sendRequest, isLoading, error, clearError } = useHttp();
  const dispatch = useDispatch();
  const deactivateUser = async () => {
    try {
      await sendRequest(
        "patch",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${props.user._id}`,
        {
          isActive: false,
        }
      );
      dispatch(
        adminActions.changeUserStatus({ id: props.user._id, status: false })
      );
    } catch (err) {}
  };
  const activateUser = async () => {
    try {
      await sendRequest(
        "patch",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${props.user._id}`,
        {
          isActive: true,
        }
      );
      dispatch(
        adminActions.changeUserStatus({ id: props.user._id, status: true })
      );
    } catch (err) {}
  };

  return (
    <div className="flex flex-col items-center justify-center mv-6 shadow-sm p-4">
      <div className="flex flex-col md:flex-row items-center  gap-4 md:gap-12 w-full justify-between ">
        <div className="w-12 h-12 overflow-hidden rounded-full">
          <Image
            className="object-cover "
            width={48}
            height={48}
            src={props.image}
            alt=""
          ></Image>
        </div>
        <div className="flex justify-center items-center flex-col ">
          <h2 className="font-medium ">Email</h2>
          <span>{props.email}</span>
        </div>
        <div className="flex justify-center items-center flex-col">
          <h2>Phone</h2>
          <span>{props.phone || "No number"}</span>
        </div>
        <div className="flex justify-center items-center flex-col">
          {user?.isActive && (
            <button
              type="button"
              onClick={deactivateUser}
              className="px-4 py-1 bg-red-400 rounded-lg text-white w-36 flex items-center justify-center"
            >
              {isLoading ? <span className="loader"></span> : "Deactivate user"}
            </button>
          )}
          {!user?.isActive && (
            <button
              type="button"
              onClick={activateUser}
              className="px-4 py-1 bg-green-400 rounded-lg w-36 text-white  flex items-center justify-center"
            >
              {isLoading ? <span className="loader"></span> : "Activate user"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
