import React, { useState } from "react";

import Account from "./Account";
import MyTrips from "./MyTrips";
import Sidebar from "./Sidebar";
import Wishlist from "./Wishlist";
import Complaint from "./Complaint";
import { useSelector } from "react-redux";
import cover from "../public/images/cover2.jpg";
import MyOrders from "./MyOrders";
import Image from "next/image";
function Profile(props) {
  const page = useSelector((state) => state.profile.page);
  const [orders, setOrders] = useState(props.orders);

  return (
    <div className="flex font-rest">
      <Sidebar user={props.user} page={page}></Sidebar>
      <div className="flex-1 pt-10 px-10 relative flex flex-col items-center">
        <Image
          className="absolute -z-10 min-w-screen min-h-screen object-cover "
          src={cover}
          alt=""
        ></Image>
        {page === 1 && <Account user={props.user}></Account>}
        {page === 2 && (
          <MyTrips orders={props.orders} user={props.user}></MyTrips>
        )}
        {page === 3 && (
          <Wishlist wishlist={props.wishlist} user={props.user}></Wishlist>
        )}
        {page === 4 && (
          <MyOrders
            setOrders={setOrders}
            orders={orders}
            user={props.user}
          ></MyOrders>
        )}
        {page === 5 && <Complaint user={props.user}></Complaint>}
      </div>
    </div>
  );
}

export default Profile;
