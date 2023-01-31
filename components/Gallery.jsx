import React, { useState } from "react";
import Image from "next/image";

function Gallery(props) {
  const [featuredImg, setFeaturedImg] = useState(0);
  const active = "opacity-50";
  return (
    <section className="transition-all duration-500 my-2 ">
      <div className="flex gap-2 flex-col md:flex-row">
        <div className="item transition-all duration-1000">
          <Image
            className=" w-full object-cover h-full cursor-pointer"
            src={`${process.env.NEXT_PUBLIC_BACKEND_SHORT}/images/cities/${props.images[featuredImg]}.png`}
            alt=""
            height="100"
            width="100"
            unoptimized={true}
          ></Image>
        </div>
        <div className="item grid grid-cols-2 gap-2 ">
          <Image
            className={`${
              featuredImg === 0 && active
            } w-full object-cover h-full cursor-pointer transition-opacity duration-700`}
            onClick={() => {
              setFeaturedImg(0);
            }}
            src={`${process.env.NEXT_PUBLIC_BACKEND_SHORT}/images/cities/${props.images[0]}.png`}
            alt=""
            height="100"
            width="100"
          ></Image>
          <Image
            onClick={() => setFeaturedImg(1)}
            className={`${
              featuredImg === 1 && active
            } w-full object-cover h-full cursor-pointer transition-opacity duration-700`}
            src={`${process.env.NEXT_PUBLIC_BACKEND_SHORT}/images/cities/${props.images[1]}.png`}
            alt=""
            height="100"
            width="100"
          ></Image>
          <Image
            onClick={() => setFeaturedImg(2)}
            className={`${
              featuredImg === 2 && active
            } w-full object-cover h-full cursor-pointer transition-opacity duration-700`}
            src={`${process.env.NEXT_PUBLIC_BACKEND_SHORT}/images/cities/${props.images[2]}.png`}
            alt=""
            height="100"
            width="100"
          ></Image>
          <Image
            onClick={() => setFeaturedImg(3)}
            className={`${
              featuredImg === 3 && active
            } w-full object-cover h-full cursor-pointer transition-opacity duration-700`}
            src={`${process.env.NEXT_PUBLIC_BACKEND_SHORT}/images/cities/${props.images[3]}.png`}
            alt=""
            height="100"
            width="100"
          ></Image>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
