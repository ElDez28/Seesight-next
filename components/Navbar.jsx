import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { registerActions, profileActions } from "@/store/store";
function Navbar(props) {
  const dispatch = useDispatch();
  const setRegisterToTrue = () => {
    dispatch(registerActions.setRegisterToTrue());
  };
  const setRegisterToFalse = () => {
    dispatch(registerActions.setRegisterToFalse());
  };
  const { user } = useSelector((state) => state.user);

  return (
    <nav
      className={`navbar z-30 w-full px-6 py-4 flex justify-between items-center  fixed ${props.bg} transition-all duration-600 ease-in font-rest`}
    >
      <Link href={"/"}>
        <Image width={36} height={36} src="/images/4153548.png" alt=""></Image>
      </Link>

      {!props.user && (
        <div className="flex gap-2 ">
          <Link
            onClick={setRegisterToFalse}
            href="/signin"
            className="transition-all duration-300  px-4 bg-transparent border border-white py-2  text-white hover:bg-white hover:text-black"
          >
            Sign In
          </Link>
          <Link
            onClick={setRegisterToTrue}
            href="/signin"
            className="transition-all duration-700 px-4  bg-green-600 hover:bg-green-500 py-2  text-white"
          >
            Register
          </Link>
        </div>
      )}
      {props.user && (
        <div className="flex gap-6 ">
          <Link
            onClick={() => dispatch(profileActions.setPage(1))}
            href="/users/me"
            className="text-white border-b transition-all duration-100 flex items-center justify-center"
          >
            My profile
          </Link>
          <Link
            onClick={() => dispatch(profileActions.setPage(4))}
            href="/users/me"
            className="text-white border-b transition-all duration-100 flex items-center justify-center"
          >
            My reservations
          </Link>
          <Link
            onClick={() => dispatch(profileActions.setPage(3))}
            href="/users/me"
            className="text-white border-b transition-all duration-100 flex items-center justify-center"
          >
            My wishlist
          </Link>
          <div className="w-10 h-10 rounded-full overflow-hidden ">
            <img
              className="w-full"
              src={`${process.env.NEXT_PUBLIC_BACKEND_SHORT}/images/users/${props.user.image}`}
            ></img>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
