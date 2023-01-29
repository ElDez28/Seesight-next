import React, { useState } from "react";
import mapboxgl from "!mapbox-gl";
import Map, { Marker } from "react-map-gl";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";

function Location(props) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZWxkaW4zMCIsImEiOiJjbDhxeDJpZzcwdm5kM29ydWJ6cXc3angwIn0.cACTQJ_pot0fZjU-f4VlTg";

  const [zoom, setZoom] = useState(7);

  return (
    <section className="font-rest mt-10 md:mt-4">
      <div className="flex flex-col gap-10 md:gap-0 md:flex-row">
        <div className="item flex flex-col items-center justify-center gap-4">
          <h3 className="text-3xl font-semibold text-gray-400">Our route</h3>
          <div className="flex flex-col items-center justify-center gap-2 w-full px-10">
            <div className="flex gap-2 w-full items-center justify-center px-4">
              {props.coordinates.map((item, i) => {
                return (
                  <div className="w-full flex items-center gap-2 item" key={i}>
                    <div className="border-2   border-black w-4 h-4 rounded-full "></div>
                    <div className="h-1 flex-1 bg-black"></div>
                  </div>
                );
              })}
              <div className="border-2  flex items-center justify-center border-orange-400 0 w-4 h-4 rounded-full"></div>
            </div>
            <div className="flex justify-between w-full text-center text-gray-400 font-medium mb-6">
              {props.coordinates.map((item, i) => {
                return (
                  <span key={i} className="text-center">
                    {item.name}
                  </span>
                );
              })}
              <span className="text-orange-400">{props.name}</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-400">
              Estimated trip duration
            </h3>
            <div className="flex gap-4 items-center justify-between l mb-4">
              <AirportShuttleIcon className="w-8 h-8 text-green-500"></AirportShuttleIcon>
              <span className="text-2xl font-bold text-green-500">
                {props.duration}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-center justify-between l">
              <h3 className="text-2xl font-semibold text-gray-400">
                Price of the trip
              </h3>
              <span className="text-xl font-bold text-orange-500">
                <span className="font-bold text-orange-500 text-4xl">
                  {props.price}$
                </span>
                /day
              </span>
            </div>
          </div>
        </div>
        <div className="item w-full min-h-[30rem] pl-2">
          <Map
            initialViewState={{
              longitude: props.lng,
              latitude: props.lat,
              zoom,
            }}
            style={{ width: "100%", height: "30rem" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Marker longitude={props.lng} latitude={props.lat} anchor="bottom">
              <FmdGoodIcon className="text-green-600 h-12 w-8"></FmdGoodIcon>
            </Marker>
            {props.coordinates.map((coordinate, i) => {
              return (
                <Marker
                  key={i}
                  longitude={coordinate.lng}
                  latitude={coordinate.lat}
                  anchor="bottom"
                >
                  <FmdGoodIcon className="text-blue-600 h-12 w-8"></FmdGoodIcon>
                </Marker>
              );
            })}
          </Map>
        </div>
      </div>
    </section>
  );
}

export default Location;
