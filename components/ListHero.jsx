import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { navActions } from "@/store/store";

function ListHero(props) {
  const dispatch = useDispatch();
  const [searchBy, setSearchBy] = useState("city");
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(1000);
  const bg = useSelector((state) => state.navbar.bg);
  const { ref, inView } = useInView({
    threshold: 0.9,
  });
  useEffect(() => {
    if (searchBy === "city") {
      props.setTrips(props.locations);
    } else {
      const searchedTrips = props.trips
        .filter((trip) => {
          return Number(trip.price) >= from && Number(trip.price) <= to;
        })
        .sort((a, b) => Number(a.price) - Number(b.price));

      if (searchedTrips.length === 0) {
        props.setTrips("No results");
      } else {
        props.setTrips(searchedTrips);
      }
    }
  }, [from, to, searchBy]);
  useEffect(() => {
    if (inView) {
      dispatch(navActions.setBg("bg-transparent"));
    } else {
      dispatch(navActions.setBg("bg-black"));
    }
  }, [inView]);
  return (
    <header ref={ref} className="font-rest">
      <Navbar user={props.user} bg={bg}></Navbar>
      <div className="h-[768px] bg-[url('/images/voz.png')] bg-cover bg-no-repeat flex items-center justify-center">
        <div className="max-w-6xl   py-20 px-10 rounded-xl text-white text-center">
          <h1 className="text-6xl  font-bold">Find your dream trip</h1>
          <span>ENJOY AND DISCOVER</span>
        </div>
      </div>
      <div className="flex justify-center flex-col max-w-3xl mx-auto -mt-24">
        <div className="w-full flex flex-col gap-4 mx-auto items-center bg-[#2b2d42] px-8 py-8 ">
          <h2 className="text-white font-semibold">FIND CITIES</h2>
          {searchBy === "city" && (
            <input
              onChange={(e) => {
                const searchedCities = props.locations.filter((location) =>
                  location.title
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                );
                if (e.target.value === "") {
                  props.setTrips(props.locations);
                } else if (
                  e.target.value !== "" &&
                  searchedCities.length === 0
                ) {
                  props.setTrips("No results");
                } else {
                  props.setTrips(searchedCities);
                }
              }}
              placeholder="Enter city name"
              type="search"
              className="text-sm focus:outline-none px-4 py-2 border-none w-full"
            ></input>
          )}
          {searchBy === "price" && (
            <div className="w-full flex gap-4">
              <select
                onChange={(e) => {
                  setFrom(e.target.value);
                }}
                id="from"
                className="bg-gray-50 py-2 border focus:outline-none border-none text-gray-900 text-sm  focus:ring-blue-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option className="text-lg " defaultValue={0}>
                  From
                </option>
                <option className="text-lg " value={100}>
                  100
                </option>
                <option className="text-lg" value={200}>
                  200
                </option>
                <option className="text-lg" value={300}>
                  300
                </option>
                <option className="text-lg" value={400}>
                  400
                </option>
                <option className="text-lg" value={500}>
                  500
                </option>
                <option className="text-lg" value={600}>
                  600
                </option>
                <option className="text-lg" value={700}>
                  700
                </option>
                <option className="text-lg" value={800}>
                  800
                </option>
                <option className="text-lg" value={900}>
                  900
                </option>
                <option className="text-lg" value={1000}>
                  1000
                </option>
              </select>

              <select
                onChange={(e) => setTo(e.target.value)}
                id="to"
                className="bg-gray-50 py-2 border focus:outline-none border-none text-gray-900 text-sm  focus:ring-blue-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option className="text-lg " defaultValue={0}>
                  To
                </option>
                <option className="text-lg " value={100}>
                  100
                </option>
                <option className="text-lg" value={200}>
                  200
                </option>
                <option className="text-lg" value={300}>
                  300
                </option>
                <option className="text-lg" value={400}>
                  400
                </option>
                <option className="text-lg" value={500}>
                  500
                </option>
                <option className="text-lg" value={600}>
                  600
                </option>
                <option className="text-lg" value={700}>
                  700
                </option>
                <option className="text-lg" value={800}>
                  800
                </option>
                <option className="text-lg" value={900}>
                  900
                </option>
                <option className="text-lg" value={1000}>
                  1000
                </option>
              </select>
            </div>
          )}
          <select
            onChange={(e) => {
              setSearchBy(e.target.value);
              setFrom(0);
              setTo(1000);
            }}
            id="locations"
            className="bg-gray-50 py-2 border focus:outline-none border-none text-gray-900 text-sm  focus:ring-blue-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option className="text-lg " value="city">
              Search by city
            </option>
            <option className="text-lg" value="price">
              Search by price
            </option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default ListHero;
