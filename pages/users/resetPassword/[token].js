import React, { useRef, useState } from "react";
import Image from "next/image";
import cover from "../../../public/images/cover.png";
import { useHttp } from "@/hooks/useHttp";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
const ResetPassword = () => {
  const router = useRouter();
  const params = router.query.token;
  const newPasswordRef = useRef();
  const newPasswordConfirmRef = useRef();

  const { isLoading, clearError, error, sendRequest, success } = useHttp();
  const changePassword = async () => {
    try {
      const res = await sendRequest(
        "patch",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/resetPassword/${params}`,
        {
          password: newPasswordRef.current.value,
          passwordConfirm: newPasswordConfirmRef.current.value,
        }
      );

      const userId = res.data.user.id;
      Cookie.set("userId", userId);
      router.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" relative h-screen flex items-center justify-center font-rest ">
      <Image
        className="w-full h-full absolute -z-10"
        src={cover}
        alt=""
      ></Image>
      <div className="bg-white flex flex-col px-6 py-4 gap-4 text-gray-500 min-w-[40%]">
        <div className="flex flex-col">
          <label htmlFor="newpassword">New Password</label>
          <input
            ref={newPasswordRef}
            id="newpassword"
            className="border focus:outline-none px-4 py-2"
            type="text"
          ></input>
        </div>
        <div className="flex flex-col">
          <label htmlFor="newPasswordConfirm">Confirm new password</label>
          <input
            ref={newPasswordConfirmRef}
            id="newPasswordConfirm"
            className="border focus:outline-none px-4 py-2"
            type="text"
          ></input>
        </div>
        <button
          type="button"
          onClick={changePassword}
          className="bg-orange-400 text-white px-4 py-2"
        >
          {isLoading ? <span className="loader"></span> : "Submit"}
        </button>
        {error && (
          <span className="w-full text-center font-bold text-red-500">
            {error.response.data.message}
          </span>
        )}
        {success && (
          <span className="w-full text-center font-bold text-green-500">
            Success!
          </span>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
