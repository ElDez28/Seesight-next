import React from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { useHttp } from "@/hooks/useHttp";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  minWidth: "40%",
};
import { useRef, useState } from "react";
const ForgotPassword = (props) => {
  const [sent, setSent] = useState(false);
  const emailRef = useRef();
  const { isLoading, sendRequest, error, clearError } = useHttp();
  const sendToken = async () => {
    try {
      const res = await sendRequest(
        "post",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/forgotPassword`,
        { email: emailRef.current.value }
      );
      setSent(true);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal
      open={props.isOpen}
      onClose={props.closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex items-center justify-center flex-col gap-4 ">
          <label htmlFor="email" className="font-bold text-xl text-gray-400">
            Enter your email
          </label>
          <input
            ref={emailRef}
            id="email"
            type="email"
            className="border p-2 focus:outline-none w-full "
          ></input>
          <div className="flex-col flex w-full text-center">
            <button
              type="button"
              onClick={sendToken}
              className="bg-orange-400 text-white px-6 py-2 "
            >
              {isLoading ? <span className="loader"></span> : "Submit"}
            </button>

            <span className="text-green-500 font-bold h-2 text-sm mt-1">
              {sent ? "Reset token has been sent to your email!" : ""}
            </span>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ForgotPassword;
