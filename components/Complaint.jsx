import React from "react";

function Complain() {
  return (
    <div className="bg-white max-w-6xl mt-56 flex flex-col gap-12  mx-auto  p-12 shadow-xl mb-12">
      <div className="text-center ">
        <h2 className=" font-bold text-2xl text-gray-400 mb-4">
          Write your complaint and our admin will contact you soon{" "}
        </h2>
        <textarea className="border resize-none w-full h-36 mb-4 p-4 focus:outline-none text-xl "></textarea>
        <button className="py-2 px-16 bg-black text-white">Send</button>
      </div>
    </div>
  );
}

export default Complain;
