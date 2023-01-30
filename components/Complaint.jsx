import React from "react";
import { useHttp } from "@/hooks/useHttp";
import { useEffect, useState, useRef } from "react";

function Complaint() {
  const { sendRequest, error, isLoading, clearError } = useHttp();
  const complaintRef = useRef();
  const [success, setSuccess] = useState(false);
  const createComplaint = async () => {
    try {
      await sendRequest(
        "post",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/complaints`,
        { text: complaintRef.current.value }
      );
      setSuccess(true);
    } catch (err) {}
  };
  useEffect(() => {
    if (success === true) {
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    }
  }, [success]);

  return (
    <div className="bg-white max-w-6xl mt-56 flex flex-col gap-12  mx-auto  p-12 shadow-xl mb-12">
      <div className="text-center ">
        <h2 className=" font-bold text-2xl text-gray-400 mb-4">
          Write your complaint and our admin will contact you soon{" "}
        </h2>
        <textarea
          ref={complaintRef}
          className="border resize-none w-full h-36 mb-4 p-4 focus:outline-none text-xl "
        ></textarea>
        <button
          type="button"
          onClick={createComplaint}
          className="py-2 px-16 bg-black text-white flex items-center justify-center w-48 mx-auto mb-4"
        >
          {isLoading ? <span className="loader"></span> : "Send"}
        </button>
        {success && <span className="text-green-400">Success!</span>}
        {error && (
          <span className="text-red-400 font-bold">
            {error.response.data.message}
          </span>
        )}
      </div>
    </div>
  );
}

export default Complaint;
