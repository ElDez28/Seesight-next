import React from "react";
import Card from "@/components/Card";
import Link from "next/link";
import { colors } from "../utils/colors";
import {
  faBridgeWater,
  faSailboat,
  faWater,
  faVideo,
  faMosque,
  faWind,
  faHeart,
  faBook,
  faCampground,
} from "@fortawesome/free-solid-svg-icons";

function List(props) {
  const icons = [
    faBridgeWater,
    faSailboat,
    faWater,
    faBridgeWater,
    faSailboat,
    faWater,
    faVideo,
    faMosque,
    faWind,
    faHeart,
    faBook,
    faCampground,
  ];

  return (
    <section id="list" className="my-20 font-rest">
      <h2 className="text-center mb-10 font-bold text-6xl text-gray-400">
        Featured Trips
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-10 mb-10">
        {props.locations.map((location, i) => (
          <Card
            key={i}
            image={location.imageCover}
            icon={icons[location.icon]}
            theme={location.theme}
            bg={colors[location.theme].bg}
            title={location.title}
            descOne={location.descOne}
            descTwo={location.descTwo}
            rating={location.ratingsAverage}
            price={location.price}
            desc={location.desc}
          ></Card>
        ))}
      </div>
      <div className="text-center">
        <Link
          className="border-2 border-gray-800 px-4 py-2 hover:bg-gray-800 hover:text-white transition-all duration-400"
          href="/trips"
        >
          Show All
        </Link>
      </div>
    </section>
  );
}

export default List;
