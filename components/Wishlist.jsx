import React, { useState } from "react";
import AccHeader from "./AccHeader";
import WishItem from "./WishItem";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";

function Wishlist(props) {
  const { wishlist } = useSelector((state) => state.user);
  console.log(wishlist);
  return (
    <>
      <AccHeader desc="wishlist" user={props.user}></AccHeader>
      <div className="mt-20">
        {wishlist.length > 0 &&
          wishlist.map((item, i) => {
            const coordinates = [];
            item.locations.forEach((element) => {
              coordinates.push({
                lng: element.coordinates[0],
                lat: element.coordinates[1],
                name: element.name,
              });
            });
            return (
              <>
                <WishItem
                  key={i}
                  item={item}
                  id={item._id}
                  image={item.imageCover}
                  name={item.title}
                  theme={item.theme}
                  duration={item.tripDuration}
                  price={item.price}
                  coordinates={coordinates}
                ></WishItem>
              </>
            );
          })}
        {wishlist.length === 0 && (
          <div className="bg-red-400 px-6 py-4 rounded-xl mt-40 ">
            <h2 className="text-4xl text-white">Wishlist is empty!</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default Wishlist;
