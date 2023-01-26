import React from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Cookie from "js-cookie";
import { useFormik } from "formik";
import { useHttp } from "@/hooks/useHttp";
import updateSchema from "../schemas/updateSchema";
import AccHeader from "./AccHeader";
function Account(props) {
  const { error, isLoading, clearError, sendRequest } = useHttp();
  const user = props.user;
  const initialValues = {
    username: user.username,
    email: user.email,
    phone: user.phone,
    image: "",
  };

  const updateMe = async (values = formikOne.values) => {
    console.log(error);
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("username", values.username);
    if (values.image !== "") {
      formData.append("image", values.image);
    }
    try {
      const res = await sendRequest(
        "patch",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/updateMe`,
        formData,
        { "Content-Type": "multipart/form-data" }
      );

      Cookie.set("user", JSON.stringify(res.data.user));
      Cookie.set("expDate", Date.now() + 24 * 60 * 60 * 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const formikOne = useFormik({
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    initialValues,
    validationSchema: updateSchema,
    onSubmit: updateMe,
  });
  const pickHandler = (e) => {
    formikOne.setFieldValue("image", e.target.files[0]);
  };

  return (
    <>
      <AccHeader desc="profile page" user={props.user}></AccHeader>
      <div className="lg:bg-gray-400 p-0 bg-transparent max-w-6xl max-h-xl mx-auto mt-20 lg:p-12 lg:bg-opacity-50 ">
        <div className="flex gap-12 flex-row">
          <form
            onSubmit={formikOne.handleSubmit}
            className=" bg-white flex flex-col lg:flex-row justify-between items-center shadow-xl "
          >
            <label htmlFor="file" className="item relative cursor-pointer ">
              {user != null && (
                <img
                  className="w-full h-full object-cover"
                  src={
                    formikOne.values.image === ""
                      ? `${process.env.NEXT_PUBLIC_BACKEND_SHORT}/images/users/${user.image}`
                      : URL.createObjectURL(formikOne.values.image)
                  }
                ></img>
              )}

              <AddPhotoAlternateIcon className="absolute text-white bottom-4 left-2 h-10 w-10 cursor-pointer"></AddPhotoAlternateIcon>
            </label>
            <input
              onChange={pickHandler}
              className="hidden"
              id="file"
              accept=".jpg, .png, .jpeg"
              type="file"
            ></input>
            <div className="p-10 flex flex-col  gap-6 item w-full">
              <span className="font-bold text-xl text-gray-400">
                My Profile
              </span>
              <div
                className={`max-w-full  items-center  flex justify-between  border-b-gray-200 ${
                  formikOne.errors.username &&
                  formikOne.touched.username &&
                  "border-b-red-400"
                } border-b-2 gap-4 bg-white`}
              >
                <span>Username:</span>
                <input
                  onBlur={formikOne.handleBlur}
                  onChange={formikOne.handleChange}
                  value={formikOne.values.username}
                  id="username"
                  type="text"
                  className={` focus:outline-none text-right ${
                    formikOne.errors.username &&
                    formikOne.touched.username &&
                    "border-b-red-400"
                  }`}
                ></input>
              </div>
              <div
                className={`w-full flex justify-between border-b-gray-200 border-b-2 gap-4 bg-white`}
              >
                <span>Email:</span>
                <input
                  id="email"
                  onBlur={formikOne.handleBlur}
                  onChange={formikOne.handleChange}
                  value={formikOne.values.email}
                  className={`focus:outline-none w-full border-b-gray-200 text-right ${
                    formikOne.errors.email &&
                    formikOne.touched.email &&
                    "border-b-red-400"
                  }`}
                ></input>
              </div>
              <div className="w-full flex justify-between border-b-2 bg-white">
                <span>Phone:</span>
                <input
                  id="phone"
                  onBlur={formikOne.handleBlur}
                  onChange={formikOne.handleChange}
                  value={formikOne.values.phone}
                  className="focus:outline-none text-right"
                ></input>
              </div>
              <button
                type="submit"
                onClick={() => updateMe()}
                className="bg-gradient-to-r from-orange-400 to-orange-500 text-white py-2 "
              >
                {isLoading ? "Saving" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Account;
