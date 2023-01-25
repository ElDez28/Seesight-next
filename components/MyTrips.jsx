import React from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBridgeWater,
  faSailboat,
  faWater,
} from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";

import MyTrip from "./MyTrip";
import AccHeader from "./AccHeader";
function MyTrips(props) {
  return (
    <>
      <AccHeader desc="trips" user={props.user}></AccHeader>
      <div className="mt-20">
        <MyTrip></MyTrip>
      </div>
    </>
  );
}

export default MyTrips;
