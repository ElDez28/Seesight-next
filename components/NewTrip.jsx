import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";

import Image from "next/image";
import { useFormik } from "formik";

const NewTrip = () => {
  const locationRef = useRef();
  const newLocationRef = useRef();
  const [finalLocation, setFinalLocation] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [newCoordinates, setNewCoordinates] = useState([]);
  const [error, setError] = useState("");
  const createTrip = async () => {
    console.log("hi");
  };
  const initialValues = {
    title: "",
    descOne: "",
    descTwo: "",
    desc: "",
    icon: 0,
    theme: 0,
    tripDuration: "",
    isFeatured: false,
    price: 100,
    finalLocation: {
      coordinates,
    },
    locations: newCoordinates,
    imageCover: "",
    images: [],
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: createTrip,
  });
  console.log(formik.values.locations);
  useEffect(() => {
    if (finalLocation !== "") {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${finalLocation}.json?access_token=${process.env.NEXT_PUBLIC_API_KEY}`;
      (async () => {
        try {
          const res = await axios.get(endpoint);
          const data = res?.data.features.filter((item) =>
            item.place_name.includes("Bosnia")
          );

          if (data.length === 0) {
            setError("Location not found. Please check your spelling!");
            return;
          }

          setCoordinates(data[0].center);
        } catch (err) {
          setError(err.response.data.message);
        }
      })();
    }
  }, [finalLocation]);
  const removeLocation = (name) => {
    const newList = newCoordinates.filter((coord) => {
      return coord.name !== name;
    });
    setNewCoordinates(newList);
  };
  const addLocation = async () => {
    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${newLocationRef.current.value}.json?access_token=${process.env.NEXT_PUBLIC_API_KEY}`;

    try {
      const res = await axios.get(endpoint);
      const data = res?.data.features.filter((item) =>
        item.place_name.includes("Bosnia")
      );

      if (data.length === 0) {
        setError("Location not found. Please check your spelling!");
        return;
      }
      const newLocationInfo = {
        name: newLocationRef.current.value,
        coordinates: data[0].center,
      };
      setNewCoordinates((prev) => [...prev, newLocationInfo]);
    } catch (err) {}
  };
  const pickHandler = (e) => {
    formik.setFieldValue("imageCover", e.target.files[0]);
  };
  console.log(formik.values.imageCover);
  return (
    <form className="w-96  md:w-auto bg-white rounded-xl py-6 px-12 mt-20 shadow-2xl text-gray-500 flex flex-col gap-2">
      <div className="flex gap-4 mb-2">
        <div className="flex flex-col gap-1">
          <label className="italic">Title</label>
          <input
            className="border px-4 py-2 focus:outline-none"
            type="text"
            value={formik.values.title}
            onChange={formik.handleChange}
            id="title"
          ></input>
        </div>
        <div className="flex flex-col gap-1">
          <label className="italic">descOne</label>
          <input
            id="descOne"
            value={formik.values.descOne}
            onChange={formik.handleChange}
            className="border px-4 py-2 focus:outline-none"
            type="text"
          ></input>
        </div>
        <div className="flex flex-col gap-1">
          <label className="italic">descTwo</label>
          <input
            id="descTwo"
            value={formik.values.descTwo}
            onChange={formik.handleChange}
            className="border px-4 py-2 focus:outline-none"
            type="text"
          ></input>
        </div>
      </div>
      <div className="flex flex-col mb-2">
        <label className="italic">Description</label>
        <textarea
          value={formik.values.desc}
          id="desc"
          onChange={formik.handleChange}
          className="resize-none outline-none border h-24"
        ></textarea>
      </div>
      <div className="flex gap-2 w-full mb-2">
        <div className="flex flex-col item gap-1">
          <label className="italic">Choose icon</label>
          <select
            id="icon"
            onChange={formik.handleChange}
            value={formik.values.icon}
            className="focus:outline-none border py-2 px-4 text-gray-400"
          >
            <option value={0}>faBridgeWater</option>
            <option value={1}>faSailboat</option>
            <option value={2}>faWater</option>
            <option value={3}>faBridgeWater</option>
            <option value={4}>faSailboat</option>
            <option value={5}>faWater</option>
            <option value={6}>faVideo</option>
            <option value={7}>faMosque</option>
            <option value={8}>faWind</option>
            <option value={9}>faHeart</option>
            <option value={10}>faBook</option>
            <option value={11}>faCampground</option>
          </select>
        </div>
        <div className="flex flex-col item gap-1">
          <label className="italic">Choose theme</label>
          <select
            id="theme"
            value={formik.values.theme}
            onChange={formik.handleChange}
            className="focus:outline-none border py-2 px-4 text-gray-400"
          >
            <option value={0}>Green</option>
            <option value={1}>Yellow</option>
            <option value={2}>Violet</option>
            <option value={3}>Blue</option>
            <option value={4}>Red</option>
            <option value={5}>Orange</option>
          </select>
        </div>
      </div>
      <div className="flex gap-2 w-full mb-2">
        <div className="flex flex-col item gap-1">
          <label className="italic">Trip duration</label>
          <input
            value={formik.values.tripDuration}
            id="tripDuration"
            onChange={formik.handleChange}
            className="border px-4 py-2 focus:outline-none"
            type="text"
          ></input>
        </div>
        <div className="flex flex-col item gap-1">
          <label className="italic">isFeatured</label>
          <select
            value={formik.values.isFeatured}
            id="isFeatured"
            onChange={formik.handleChange}
            className="border px-4 py-2 focus:outline-none h-full"
          >
            <option value={false}>False</option>
            <option value={true}>True</option>
          </select>
        </div>
        <div className="flex flex-col item gap-1">
          <label className="italic">Price</label>
          <input
            value={formik.values.price}
            id="price"
            onChange={formik.handleChange}
            className="border px-4 py-2 focus:outline-none"
            type="text"
          ></input>
        </div>
      </div>

      <div className="flex gap-2 w-full mb-2">
        <div className="flex flex-col item gap-1 item">
          <label className="italic">Final Location</label>
          <input
            ref={locationRef}
            className="border px-4 py-2 focus:outline-none"
            type="text"
          ></input>
          <button
            type="button"
            onClick={() => {
              setError("");
              setFinalLocation(locationRef.current?.value);
            }}
            className="bg-green-400 text-white py-2"
          >
            Add Final Location
          </button>
        </div>
        <div className="item flex justify-center items-center">
          {error === "" && locationRef.current?.value && (
            <div className="flex flex-col  gap-1 item items-center justify-end text-gray-400">
              <h2 className="font-bold text-2xl italic ">
                {locationRef.current?.value}
              </h2>
              <span>lng: {coordinates[0]}</span>
              <span>lat: {coordinates[1]}</span>
            </div>
          )}
          {error !== "" && (
            <div className="flex gap-1 item items-center justify-center text-gray-400">
              <span className="text-center text-red-400 font-bold">
                {error}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col item gap-1 item">
        <label className="italic">Route locations</label>
        <input
          ref={newLocationRef}
          className="border px-4 py-2 focus:outline-none"
          type="text"
        ></input>
        <button
          onClick={addLocation}
          type="button"
          className="bg-green-400 text-white py-2"
        >
          Add route locations
        </button>
      </div>
      <div className="grid grid-cols-4 justify-between items-center gap-4">
        {newCoordinates?.map((coordinate, i) => {
          return (
            <div
              key={i}
              className="flex flex-col gap-1 relative bg-orange-400 text-white p-4"
            >
              <h3>{coordinate.name}</h3>
              <span>lng: {coordinate.coordinates[0]}</span>
              <span>lat: {coordinate.coordinates[1]}</span>
              <div
                onClick={() => removeLocation(coordinate.name)}
                className="absolute top-0 right-1 cursor-pointer"
              >
                <CancelIcon className="   h-4 w-4"></CancelIcon>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex w-full justify-between ">
        <div className="item flex items-left flex-col justify-center">
          <label
            htmlFor="cover"
            className="flex items-center justify-center gap-2 flex-col"
          >
            <span>Add cover image</span>
            <div className="w-[12.5rem] h-[12.5rem] relative overflow-hidden group cursor-pointer">
              <div className="w-full bg-gray-100 h-full">
                {formik.values.imageCover !== "" && (
                  <Image
                    src={URL.createObjectURL(formik.values.imageCover)}
                    width={197}
                    height={197}
                  ></Image>
                )}
              </div>
              <div className="absolute  w-full bg-gradient-to-b from-transparent to-gray-400 top-0 opacity-0 h-full group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
                <span className="pb-4 text-white">
                  {formik.values.imageCover === ""
                    ? "Add cover image"
                    : "Replace cover image"}{" "}
                  <PhotoSizeSelectActualIcon></PhotoSizeSelectActualIcon>
                </span>
              </div>
            </div>
          </label>
          <input
            onChange={pickHandler}
            className="hidden"
            id="cover"
            type="file"
          ></input>
        </div>
        <div className="item flex flex-col  justify-center items-center">
          <h3 className="mb-2">Add Gallery Images</h3>
          <div className="flex gap-2 mb-2">
            <div className="item flex items-left flex-col justify-center">
              <label
                htmlFor="cover"
                className="flex items-left justify-center gap-2 flex-col"
              >
                <div className="w-24 h-24 relative overflow-hidden group cursor-pointer">
                  <div className="w-full bg-gray-100 h-full"></div>
                  <div className="absolute  w-full bg-gradient-to-b from-transparent to-gray-400 top-0 opacity-0 h-full group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
                    <span className="pb-4 text-sm">
                      image-1{" "}
                      <PhotoSizeSelectActualIcon></PhotoSizeSelectActualIcon>
                    </span>
                  </div>
                </div>
              </label>
              <input className="hidden" id="cover" type="file"></input>
            </div>
            <div className="item flex items-left flex-col justify-center">
              <label
                htmlFor="cover"
                className="flex items-left justify-center gap-2 flex-col"
              >
                <div className="w-24 h-24 relative overflow-hidden group cursor-pointer">
                  <div className="w-full bg-gray-100 h-full"></div>
                  <div className="absolute  w-full bg-gradient-to-b from-transparent to-gray-400 top-0 opacity-0 h-full group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
                    <span className="pb-4 text-sm">
                      image-2{" "}
                      <PhotoSizeSelectActualIcon></PhotoSizeSelectActualIcon>
                    </span>
                  </div>
                </div>
              </label>
              <input className="hidden" id="cover" type="file"></input>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="item flex items-left flex-col justify-center">
              <label
                htmlFor="cover"
                className="flex items-left justify-center gap-2 flex-col"
              >
                <div className="w-24 h-24 relative overflow-hidden group cursor-pointer">
                  <div className="w-full bg-gray-100 h-full"></div>
                  <div className="absolute  w-full bg-gradient-to-b from-transparent to-gray-400 top-0 opacity-0 h-full group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
                    <span className="pb-4 text-sm">
                      image-3{" "}
                      <PhotoSizeSelectActualIcon></PhotoSizeSelectActualIcon>
                    </span>
                  </div>
                </div>
              </label>
              <input className="hidden" id="cover" type="file"></input>
            </div>
            <div className="item flex items-left flex-col justify-center">
              <label
                htmlFor="cover"
                className="flex items-left justify-center gap-2 flex-col"
              >
                <div className="w-24 h-24 relative overflow-hidden group cursor-pointer">
                  <div className="w-full bg-gray-100 h-full"></div>
                  <div className="absolute  w-full bg-gradient-to-b from-transparent to-gray-400 top-0 opacity-0 h-full group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
                    <span className="pb-4 text-sm">
                      image-4{" "}
                      <PhotoSizeSelectActualIcon></PhotoSizeSelectActualIcon>
                    </span>
                  </div>
                </div>
              </label>
              <input className="hidden" id="cover" type="file"></input>
            </div>
          </div>
        </div>
      </div>
      <button className="mt-6 bg-orange-400 text-white w-36 mx-auto py-2 hover:bg-orange-600 transition-all duration-700">
        Submit
      </button>
    </form>
  );
};

export default NewTrip;
