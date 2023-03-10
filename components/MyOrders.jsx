import React from "react";
import MyOrder from "./MyOrder";
import AccHeader from "./AccHeader";
function MyOrders(props) {
  return (
    <>
      <AccHeader desc="orders" user={props.user}></AccHeader>
      {props.orders.map((order) => {
        return (
          <MyOrder
            setOrders={props.setOrders}
            orders={props.orders}
            key={order._id}
            order={order}
          ></MyOrder>
        );
      })}
    </>
  );
}

export default MyOrders;
