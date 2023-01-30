import React, { useState } from "react";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useHttp } from "@/hooks/useHttp";
import { useSelector, useDispatch } from "react-redux";
import { registerActions, userActions } from "@/store/store";
import loginSchema from "@/schemas/loginSchema";
import signupSchema from "@/schemas/signupSchema";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import Image from "next/image";
import cover from "../../public/images/cover.png";
import logo from "../../public/images/logo2.png";
import vector from "../../public/images/vector2.png";

function SignIn() {
  const router = useRouter();
  const { sendRequest, error, isLoading, clearError } = useHttp();
  const { register } = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState("Choose your image");
  const regex = /([^\\]+$)/;

  //formik
  const initialValues = {
    email: "dezmic91@gmail.com",
    password: "test1234",
  };
  const loginFormSubmit = async (values) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    try {
      const res = await sendRequest(
        "post",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`,
        formData
      );

      Cookie.set("expDate", Date.now() + 24 * 60 * 60 * 1000);
      Cookie.set("userId", res.data.user._id);

      router.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
  const signupFormSubmit = async (values) => {
    const formData = new FormData();

    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("passwordConfirm", values.passwordConfirm);
    formData.append("username", values.username);
    if (values.image !== "") {
      formData.append("image", values.image);
    }
    try {
      const res = await sendRequest(
        "post",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signup`,
        formData,
        { "Content-Type": "multipart/form-data" }
      );

      Cookie.set("userId", res.data.user._id);
      Cookie.set("expDate", Date.now() + 24 * 60 * 60 * 1000);

      router.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
  const formikOne = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    initialValues,
    validationSchema: loginSchema,
    onSubmit: loginFormSubmit,
  });
  const formikTwo = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    initialValues: {
      username: "",
      password: "",
      passwordConfirm: "",
      email: "",
      image: "",
    },
    validationSchema: signupSchema,
    onSubmit: signupFormSubmit,
  });
  const filePicker = (e) => {
    setFileName(e.target.value?.match(regex)[0]);
    formikTwo.setFieldValue("image", e.target.files[0]);
  }; ///////////////////////////////////////
  return (
    <div className="lg:h-screen relative  flex justify-center items-center  font-rest">
      <Image
        className="w-full h-full absolute -z-10"
        src={cover}
        alt=""
      ></Image>
      <div className="max-w-5xl bg-[#f6f5f5] flex p-10 text-gray-600 gap-10 shadow-xl flex-col lg:flex-row ">
        <div className="flex flex-col gap-4 w-full  justify-center">
          <div className="flex gap-2 items-center justify-left">
            <Image className="w-8 h-8" src={logo}></Image>
            <span className="font-logo text-orange-400">Seesight Travel</span>
          </div>
          <h3>
            If you’re looking to go all out for your next vacation, these
            especially luxurious trips are sure to fit the bill.
          </h3>
          <div className="">
            <Image className="w-full" src={vector}></Image>
          </div>
        </div>
        <div className="bg-white w-full px-4 py-6 flex flex-col justify-between gap-12 mx-auto shadow-xl  ">
          <div className=" bg-[#def1ef] relative flex  w-max  rounded-3xl overflow-hidden">
            <span
              onClick={() => dispatch(registerActions.setRegisterToFalse())}
              className={` cursor-pointer  px-4 py-2 text-sm flex items-center rounded-3xl ${
                register === false
                  ? "bg-green-600 text-gray-200 shadow-lg"
                  : "bg-transparent text-gray-600"
              }`}
            >
              Login
            </span>
            <span
              onClick={() => dispatch(registerActions.setRegisterToTrue())}
              className={` cursor-pointer px-4 py-2 text-sm rounded-3xl ${
                register === true
                  ? "bg-green-600 text-gray-200 shadow-lg"
                  : "bg-transparent text-gray-600"
              }`}
            >
              Signup
            </span>
          </div>
          {!register && (
            <form
              onSubmit={formikOne.handleSubmit}
              className="flex flex-col gap-4"
            >
              <div>
                <label htmlFor="email" className="text-gray-500 font-semibold ">
                  Email
                </label>
                <input
                  onBlur={formikOne.handleBlur}
                  onChange={formikOne.handleChange}
                  value={formikOne.values.email}
                  id="email"
                  className={`border w-full py-2 px-2 ${
                    formikOne.errors.email && formikOne.touched.email
                      ? "border-red-600"
                      : "border-gray-200"
                  } focus:outline-none mt-1`}
                  type="email"
                ></input>

                <p className="text-xs h-2 text-red-600">{`${
                  formikOne.errors.email && formikOne.touched.email
                    ? `*${formikOne.errors.email}`
                    : ""
                }`}</p>
              </div>
              <div>
                <label htmlFor="pass" className="text-gray-500 font-semibold">
                  Password
                </label>
                <input
                  onBlur={formikOne.handleBlur}
                  onChange={formikOne.handleChange}
                  value={formikOne.values.password}
                  id="password"
                  className={`border w-full py-2 px-2 focus:outline-none mt-1 ${
                    formikOne.errors.password && formikOne.touched.password
                      ? "border-red-600"
                      : "border-gray-200"
                  }`}
                  type="text"
                ></input>
                <p className="text-xs h-2 text-red-600">{`${
                  formikOne.errors.password && formikOne.touched.password
                    ? `*${formikOne.errors.password}`
                    : ""
                }`}</p>

                <span className="text-sm text-green-700 cursor-pointer flex items-center justify-end">
                  Forgot Password?
                </span>
              </div>
              {!register && (
                <button className="bg-black  hover:bg-gray-700 transition-all duration-300 py-2 text-sm text-gray-200 mt-8">
                  {formikOne.isSubmitting ? (
                    <span className="loader"></span>
                  ) : (
                    "Login"
                  )}
                </button>
              )}
            </form>
          )}
          {register && (
            <form
              onSubmit={formikTwo.handleSubmit}
              className="flex flex-col gap-4"
            >
              <div>
                <input
                  id="username"
                  className={`border w-full py-2 px-2 ${
                    formikTwo.errors.username && formikTwo.touched.username
                      ? "border-red-600"
                      : "border-gray-200"
                  } focus:outline-none mt-1`}
                  type="text"
                  value={formikTwo.values.username}
                  placeholder="Enter your username"
                  onBlur={formikTwo.handleBlur}
                  onChange={formikTwo.handleChange}
                ></input>
                <p className="text-xs h-2 text-red-600">{`${
                  formikTwo.errors.username && formikTwo.touched.username
                    ? `*${formikTwo.errors.username}`
                    : ""
                }`}</p>
              </div>
              <div>
                <input
                  onBlur={formikTwo.handleBlur}
                  onChange={formikTwo.handleChange}
                  id="email"
                  className={`border w-full py-2 px-2 ${
                    formikTwo.errors.email && formikTwo.touched.email
                      ? "border-red-600"
                      : "border-gray-200"
                  } focus:outline-none mt-1`}
                  type="email"
                  placeholder="Enter a valid email"
                  value={formikTwo.values.email}
                ></input>
                <p className="text-xs h-2 text-red-600">{`${
                  formikTwo.errors.email && formikTwo.touched.email
                    ? `*${formikTwo.errors.email}`
                    : ""
                }`}</p>
              </div>
              <div>
                <input
                  onBlur={formikTwo.handleBlur}
                  onChange={formikTwo.handleChange}
                  value={formikTwo.values.password}
                  id="password"
                  className={`border w-full py-2 px-2 ${
                    formikTwo.errors.password && formikTwo.touched.password
                      ? "border-red-600"
                      : "border-gray-200"
                  } focus:outline-none mt-1`}
                  type="text"
                  placeholder="Enter a password"
                ></input>
                <p className="text-xs h-2 text-red-600">{`${
                  formikTwo.errors.password && formikTwo.touched.password
                    ? `*${formikTwo.errors.password}`
                    : ""
                }`}</p>
              </div>
              <div>
                <input
                  onBlur={formikTwo.handleBlur}
                  onChange={formikTwo.handleChange}
                  value={formikTwo.values.passwordConfirm}
                  id="passwordConfirm"
                  className={`border w-full py-2 px-2 ${
                    formikTwo.errors.passwordConfirm &&
                    formikTwo.touched.passwordConfirm
                      ? "border-red-600"
                      : "border-gray-200"
                  } focus:outline-none mt-1`}
                  type="text"
                  placeholder="Confirm your password"
                ></input>
                <p className="text-xs h-2 text-red-600">{`${
                  formikTwo.errors.passwordConfirm &&
                  formikTwo.touched.passwordConfirm
                    ? `*${formikTwo.errors.passwordConfirm}`
                    : ""
                }`}</p>
              </div>
              <div className="mb-4">
                <label
                  className=" flex items-center gap-4 text-gray-400 cursor-pointer  border px-4 py-2"
                  htmlFor="file"
                >
                  <FontAwesomeIcon
                    className="w-8 h-8"
                    icon={faImages}
                  ></FontAwesomeIcon>
                  <span>{fileName}</span>
                </label>
                <input
                  onChange={filePicker}
                  id="file"
                  className="hidden w-full py-2 px-2 focus:outline-none mt-1 "
                  type="file"
                ></input>
              </div>
              <button
                type="submit"
                className="bg-black hover:bg-gray-700 transition-all duration-300 py-2 text-sm text-gray-200 "
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
