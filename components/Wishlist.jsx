import React from "react";
import AccHeader from "./AccHeader";
import WishItem from "./WishItem";

function Wishlist(props) {
  return (
    <>
      <AccHeader desc="wishlist" user={props.user}></AccHeader>
      <div className="mt-20">
        <WishItem
          border="border-[#3c096c]"
          text="text-[#3c096c]"
          hover="hover:bg-[#3c096c]"
        ></WishItem>
      </div>
    </>
  );
}

export default Wishlist;
