import React from "react";
import User from "./User";
const Users = (props) => {
  const users = props.users?.filter((user) => user.role === "user");
  return (
    <div className="w-96  md:w-auto bg-white rounded-xl py-6 px-12 mt-20 shadow-2xl text-gray-500 flex flex-col gap-8">
      <h2 className="italic ">All Users</h2>
      {users.map((user) => {
        return (
          <User
            email={user.email}
            phone={user.phone}
            image={`${process.env.NEXT_PUBLIC_BACKEND_SHORT}/images/users/${user.image}`}
            user={user}
          ></User>
        );
      })}
    </div>
  );
};

export default Users;
