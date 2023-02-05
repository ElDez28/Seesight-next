import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Image from "next/image";
import { useFormik } from "formik";
import { useHttp } from "@/hooks/useHttp";
import { uploadCloudinary } from "@/utils/upload";
import newTripSchema from "@/schemas/newTripSchema";
const NewTrip = () => {
  const locationRef = useRef();
  const titleRef = useRef();
  const descOneRef = useRef();
  const descTwoRef = useRef();
  const descRef = useRef();
  const iconRef = useRef();
  const themeRef = useRef();
  const priceRef = useRef();
  const tripDurationRef = useRef();
  const isFeaturedRef = useRef();
  const imageCoverRef = useRef();
  const imageOneRef = useRef();
  const imageTwoRef = useRef();
  const imageThreeRef = useRef();
  const imageFourRef = useRef();
  const multipleImagesRef = useRef();
  const { sendRequest, error, isLoading, clearError, success } = useHttp();
  const newLocationRef = useRef();
  const [finalLocation, setFinalLocation] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [newCoordinates, setNewCoordinates] = useState([]);
  const [geoError, setGeoError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const initialValues = {
    title: titleRef.current?.value || "",
    descOne: descOneRef.current?.value,
    descTwo: descTwoRef.current?.value,
    desc: descRef.current?.value,
    icon: iconRef.current?.value,
    theme: themeRef.current?.value,
    tripDuration: tripDurationRef.current?.value,
    isFeatured: isFeaturedRef.current?.value,
    price: priceRef.current?.value,
    finalLocation: {
      coordinates,
    },
    locations: newCoordinates,
    imageCover: imageCoverRef.current?.files[0],
    imageOne:
      imageOneRef.current?.files[0] || multipleImagesRef.current?.files[0],
    imageTwo:
      imageTwoRef.current?.files[0] || multipleImagesRef.current?.files[1],
    imageThree:
      imageThreeRef.current?.files[0] || multipleImagesRef.current?.files[2],
    imageFour:
      imageFourRef.current?.files[0] || multipleImagesRef.current?.files[3],
  };

  const uploadImages = async (e) => {
    const images = [
      formik.values.imageOne,
      formik.values.imageTwo,
      formik.values.imageThree,
      formik.values.imageFour,
    ];
    try {
      let arr = [];
      setIsUploading(true);
      for (let i = 0; i < images.length; i++) {
        const { url } = await uploadCloudinary(images[i]);
        arr.push(url);
      }
      const { url } = await uploadCloudinary(formik.values.imageCover);

      const data = {
        title: formik.values.title,
        descOne: formik.values.descOne,
        descTwo: formik.values.descTwo,
        desc: formik.values.desc,
        icon: formik.values.icon,
        theme: formik.values.theme,
        tripDuration: formik.values.tripDuration,
        isFeatured: formik.values.isFeatured,
        price: formik.values.price,
        finalLocation: formik.values.finalLocation,
        imageCover: url,
        locations: formik.values.locations,
        images: arr,
      };

      setIsUploading(false);
      await sendRequest(
        "post",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tours`,
        data
      );
    } catch (err) {
      setUploadError(err.response.data.error.message);

      setIsUploading(false);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues,
    onSubmit: uploadImages,
    validationSchema: newTripSchema,
  });
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
            setGeoError("Location not found. Please check your spelling!");
            return;
          }

          setCoordinates(data[0].center);
        } catch (err) {
          setGeoError(err.response.data.message);
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
  const addLocation = async (e) => {
    e.preventDefault();
    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${newLocationRef.current.value}.json?access_token=${process.env.NEXT_PUBLIC_API_KEY}`;

    try {
      const res = await axios.get(endpoint);
      const data = res?.data.features.filter((item) =>
        item.place_name.includes("Bosnia")
      );

      if (data.length === 0) {
        setGeoError("Location not found. Please check your spelling!");
        return;
      }
      const newLocationInfo = {
        name: newLocationRef.current.value,
        coordinates: data[0].center,
      };
      setNewCoordinates((prev) => [...prev, newLocationInfo]);
    } catch (err) {}
  };
  const pickHandler = (e, field) => {
    formik.setFieldValue(field, e.target.files[0]);
  };
  const pickMultipleImages = (e) => {
    multipleImagesRef.current?.files[0] &&
      formik.setFieldValue("imageOne", multipleImagesRef.current?.files[0]);
    multipleImagesRef.current?.files[1] &&
      formik.setFieldValue("imageTwo", multipleImagesRef.current?.files[1]);
    multipleImagesRef.current?.files[2] &&
      formik.setFieldValue("imageThree", multipleImagesRef.current?.files[2]);
    multipleImagesRef.current?.files[3] &&
      formik.setFieldValue("imageFour", multipleImagesRef.current?.files[3]);
  };
  console.log(formik.errors);
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="w-96  md:w-auto bg-white rounded-xl py-6 px-12 my-20 shadow-2xl text-gray-500 flex flex-col gap-2"
      >
        <div className="flex gap-4 mb-2 flex-col lg:flex-row">
          <div className="flex flex-col gap-1">
            <label className="italic">Title</label>
            <input
              className="border px-4 py-2 focus:outline-none"
              type="text"
              ref={titleRef}
              onChange={formik.handleChange}
              id="title"
            ></input>
          </div>
          <div className="flex flex-col gap-1">
            <label className="italic">descOne</label>
            <input
              id="descOne"
              ref={descOneRef}
              onChange={formik.handleChange}
              className="border px-4 py-2 focus:outline-none"
              type="text"
            ></input>
          </div>
          <div className="flex flex-col gap-1">
            <label className="italic">descTwo</label>
            <input
              ref={descTwoRef}
              id="descTwo"
              onChange={formik.handleChange}
              className="border px-4 py-2 focus:outline-none"
              type="text"
            ></input>
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <label className="italic">Description</label>
          <textarea
            ref={descRef}
            id="desc"
            onChange={formik.handleChange}
            className="resize-none outline-none border h-24"
          ></textarea>
        </div>
        <div className="flex gap-2 w-full mb-2">
          <div className="flex flex-col item gap-1">
            <label className="italic">Choose icon</label>
            <select
              defaultValue={0}
              ref={iconRef}
              id="icon"
              onChange={formik.handleChange}
              className="focus:outline-none border py-2 px-4 text-gray-400"
            >
              <option value={0}>faBridgeWater</option>
              <option value={1}>faSailboat</option>
              <option value={2}>faWater</option>
              <option value={3}>faVideo</option>
              <option value={4}>faMosque</option>
              <option value={5}>faWind</option>
              <option value={6}>faHeart</option>
              <option value={7}>faBook</option>
              <option value={8}>faCampground</option>
            </select>
          </div>
          <div className="flex flex-col item gap-1">
            <label className="italic">Choose theme</label>
            <select
              ref={themeRef}
              id="theme"
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
        <div className="flex gap-2 w-full mb-2 flex-col lg:flex-row">
          <div className="flex flex-col item gap-1">
            <label className="italic">Trip duration</label>
            <input
              ref={tripDurationRef}
              id="tripDuration"
              onChange={formik.handleChange}
              className="border px-4 py-2 focus:outline-none"
              type="text"
            ></input>
          </div>
          <div className="flex flex-col item gap-1">
            <label className="italic">isFeatured</label>
            <select
              ref={isFeaturedRef}
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
              ref={priceRef}
              id="price"
              onChange={formik.handleChange}
              className="border px-4 py-2 focus:outline-none"
              type="text"
            ></input>
          </div>
        </div>

        <div className="flex gap-2 w-full mb-2 flex-col lg:flex-row">
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
                setGeoError("");
                setFinalLocation(locationRef.current?.value);
              }}
              className="bg-green-400 text-white py-2"
            >
              Add Final Location
            </button>
          </div>
          <div className="item flex justify-center items-center">
            {geoError === "" && locationRef.current?.value && (
              <div className="flex flex-col  gap-1 item items-center justify-end text-gray-400">
                <h2 className="font-bold text-2xl italic ">
                  {locationRef.current?.value}
                </h2>
                <span>lng: {coordinates[0]}</span>
                <span>lat: {coordinates[1]}</span>
              </div>
            )}
            {geoError !== "" && (
              <div className="flex gap-1 item items-center justify-center text-gray-400">
                <span className="text-center text-red-400 font-bold">
                  {geoError}
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
        <div className="grid grid-cols-1 lg:grid-cols-4 justify-between items-center gap-4">
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
        <div className="flex w-full justify-between flex-col lg:flex-row ">
          <div className="item flex items-left flex-col justify-center">
            <label
              htmlFor="cover"
              className="flex items-center justify-center gap-2 flex-col"
            >
              <span>Add cover image</span>
              <div className="w-[12.5rem] h-[12.5rem] relative overflow-hidden group cursor-pointer">
                <div className="w-full bg-gray-100 h-full">
                  {formik.values.imageCover !== undefined && (
                    <Image
                      src={URL.createObjectURL(formik.values.imageCover)}
                      width={197}
                      height={197}
                      alt=""
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
              ref={imageCoverRef}
              onBlur={formik.handleBlur}
              onChange={(e) => pickHandler(e, "imageCover")}
              className="hidden"
              id="cover"
              type="file"
            ></input>
          </div>
          <div className="item flex flex-col  justify-center items-center text-white">
            <h3 className="mb-2">Add Gallery Images</h3>
            <div className="flex gap-2 mb-2">
              <div className="item flex items-left flex-col justify-center">
                <label
                  htmlFor="imageOne"
                  className="flex items-left justify-center gap-2 flex-col"
                >
                  <div className="w-24 h-24 relative overflow-hidden group cursor-pointer">
                    <div className="w-full bg-gray-100 h-full">
                      {formik.values.imageOne !== undefined && (
                        <Image
                          className="object-cover w-full h-full"
                          src={URL.createObjectURL(formik.values.imageOne)}
                          width={96}
                          height={96}
                          alt=""
                        ></Image>
                      )}
                    </div>
                    <div className="absolute  w-full bg-gradient-to-b from-transparent to-gray-400 top-0 opacity-0 h-full group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
                      <span className="pb-4 text-sm">
                        image-1{" "}
                        <PhotoSizeSelectActualIcon></PhotoSizeSelectActualIcon>
                      </span>
                    </div>
                  </div>
                </label>
                <input
                  ref={imageOneRef}
                  className="hidden"
                  id="imageOne"
                  type="file"
                  onChange={(e) => pickHandler(e, "imageOne")}
                ></input>
              </div>
              <div className="item flex items-left flex-col justify-center">
                <label
                  htmlFor="imageTwo"
                  className="flex items-left justify-center gap-2 flex-col"
                >
                  <div className="w-24 h-24 relative overflow-hidden group cursor-pointer">
                    <div className="w-full bg-gray-100 h-full">
                      {formik.values.imageTwo !== undefined && (
                        <Image
                          className="object-cover w-full h-full"
                          src={URL.createObjectURL(formik.values.imageTwo)}
                          width={96}
                          height={96}
                          alt=""
                        ></Image>
                      )}
                    </div>
                    <div className="absolute  w-full bg-gradient-to-b from-transparent to-gray-400 top-0 opacity-0 h-full group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
                      <span className="pb-4 text-sm">
                        image-2{" "}
                        <PhotoSizeSelectActualIcon></PhotoSizeSelectActualIcon>
                      </span>
                    </div>
                  </div>
                </label>
                <input
                  ref={imageTwoRef}
                  className="hidden"
                  id="imageTwo"
                  type="file"
                  onChange={(e) => pickHandler(e, "imageTwo")}
                ></input>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="item flex items-left flex-col justify-center">
                <label
                  htmlFor="imageThree"
                  className="flex items-left justify-center gap-2 flex-col"
                >
                  <div className="w-24 h-24 relative overflow-hidden group cursor-pointer">
                    <div className="w-full bg-gray-100 h-full">
                      {formik.values.imageThree !== undefined && (
                        <Image
                          className="object-cover w-full h-full"
                          src={URL.createObjectURL(formik.values.imageThree)}
                          width={96}
                          height={96}
                          alt=""
                        ></Image>
                      )}
                    </div>
                    <div className="absolute  w-full bg-gradient-to-b from-transparent to-gray-400 top-0 opacity-0 h-full group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
                      <span className="pb-4 text-sm">
                        image-3{" "}
                        <PhotoSizeSelectActualIcon></PhotoSizeSelectActualIcon>
                      </span>
                    </div>
                  </div>
                </label>
                <input
                  ref={imageThreeRef}
                  className="hidden"
                  id="imageThree"
                  type="file"
                  onChange={(e) => pickHandler(e, "imageThree")}
                ></input>
              </div>
              <div className="item flex items-left flex-col justify-center">
                <label
                  htmlFor="imageFour"
                  className="flex items-left justify-center gap-2 flex-col"
                >
                  <div className="w-24 h-24 relative overflow-hidden group cursor-pointer">
                    <div className="w-full bg-gray-100 h-full">
                      {formik.values.imageFour !== undefined && (
                        <Image
                          className="object-cover w-full h-full"
                          src={URL.createObjectURL(formik.values.imageFour)}
                          width={96}
                          height={96}
                          alt=""
                        ></Image>
                      )}
                    </div>
                    <div className="absolute  w-full bg-gradient-to-b from-transparent to-gray-400 top-0 opacity-0 h-full group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
                      <span className="pb-4 text-sm">
                        image-4{" "}
                        <PhotoSizeSelectActualIcon></PhotoSizeSelectActualIcon>
                      </span>
                    </div>
                  </div>
                </label>
                <input
                  ref={imageFourRef}
                  className="hidden"
                  id="imageFour"
                  type="file"
                  onChange={(e) => pickHandler(e, "imageFour")}
                ></input>
              </div>
            </div>
          </div>
          <label
            htmlFor="images"
            className=" text-gray-600 flex items-center lg:flex-col justify-center cursor-pointer flex-row mt-4 lg:mt-0"
          >
            <FileUploadIcon className="w-12 h-12"></FileUploadIcon>
            <span className="text-sm italic flex lg:flex-col gap-1">
              <span>Upload</span>
              <span>multiple </span>
              <span>images</span>
              <span>at once</span>
            </span>
          </label>
          <input
            onChange={pickMultipleImages}
            type="file"
            multiple="multiple"
            className="hidden"
            ref={multipleImagesRef}
            id="images"
          ></input>
        </div>
        <button
          type="submit"
          className="mt-6 bg-orange-400 text-white w-36 mx-auto py-2 hover:bg-orange-600 transition-all duration-700"
        >
          {isUploading || isLoading ? (
            <span className="loader"></span>
          ) : (
            "Submit"
          )}
        </button>
        <span
          className={`${
            isUploading || isLoading
              ? "text-orange-500"
              : success
              ? "text-green-500"
              : "text-red-500"
          } font-bold w-full flex justify-center items-center`}
        >
          {isUploading
            ? "Uploading images to cloudinary... This can take a while!"
            : isLoading
            ? "Creating document"
            : success
            ? "Success"
            : uploadError
            ? uploadError
            : error
            ? error.response.data.error.message
            : formik.errors.imageCover ||
              formik.errors.imageOne ||
              formik.errors.imageTwo ||
              formik.errors.imageThree ||
              formik.errors.imageFour
            ? "You have to provide all images"
            : ""}
        </span>
      </form>
    </>
  );
};

export default NewTrip;
