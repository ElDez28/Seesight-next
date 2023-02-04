import React from "react";
import ComplaintItem from "./ComplaintItem";
import { useSelector } from "react-redux";
const Complaints = (props) => {
  const { complaints } = useSelector((state) => state.admin);
  return (
    <div className="w-96  md:w-auto bg-white rounded-xl max-w-6xl py-6 px-12 mt-20 shadow-2xl text-gray-500 flex flex-col gap-8">
      <h2 className="italic text-center">Complaints</h2>
      {complaints.map((item) => {
        return (
          <ComplaintItem
            key={item._id}
            text={item.text}
            name={item.user.username}
            email={item.user.email}
            id={item._id}
          ></ComplaintItem>
        );
      })}
    </div>
  );
};

export default Complaints;
