import React from "react";
import { useHttp } from "@/hooks/useHttp";
import { useDispatch } from "react-redux";
import { adminActions } from "@/store/store";
const ComplaintItem = (props) => {
  const dispatch = useDispatch();
  const { sendRequest, error, isLoading, clearError } = useHttp();
  const eraseComplaint = async () => {
    try {
      await sendRequest(
        "delete",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/complaints/${props.id}`
      );
      dispatch(adminActions.deleteComplaint(props.id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col shadow-sm p-4">
      <p>{props.text}</p>
      <div
        className="flex flex-col  w-full justify-end items-end text-gray-300
      "
      >
        <span>{props.name}</span>
        <span className="italic">{props.email}</span>
      </div>
      <button
        type="button"
        onClick={eraseComplaint}
        className="w-24 bg-red-400 mx-auto text-white py-2"
      >
        {isLoading ? <span className="loader"></span> : "Delete"}
      </button>
    </div>
  );
};

export default ComplaintItem;
