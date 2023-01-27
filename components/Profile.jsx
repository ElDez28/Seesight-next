import React, { useState } from "react";

import Account from "./Account";
import MyTrips from "./MyTrips";
import Sidebar from "./Sidebar";
import Wishlist from "./Wishlist";
import Complaint from "./Complaint";
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "@/store/store";
import MyOrders from "./MyOrders";
function Profile(props) {
  const page = useSelector((state) => state.profile.page);

  return (
    <div className="flex font-rest">
      <Sidebar page={page}></Sidebar>
      <div className="flex-1 pt-10 px-10 relative flex flex-col items-center">
        <img
          className="absolute -z-10 min-w-screen min-h-screen object-cover "
          src="/images/cover2.jpg"
        ></img>
        {page === 1 && <Account user={props.user}></Account>}
        {page === 2 && <MyTrips user={props.user}></MyTrips>}
        {page === 3 && (
          <Wishlist wishlist={props.wishlist} user={props.user}></Wishlist>
        )}
        {page === 4 && (
          <MyOrders orders={props.orders} user={props.user}></MyOrders>
        )}
        {page === 5 && <Complaint user={props.user}></Complaint>}
      </div>
    </div>
  );
}

export default Profile;
