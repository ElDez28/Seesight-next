import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { registerActions, profileActions } from "@/store/store";
import { AnimatePresence, motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import Cookie from "js-cookie";

function Navbar(props) {
  const dispatch = useDispatch();
  const setRegisterToTrue = () => {
    dispatch(registerActions.setRegisterToTrue());
  };
  const setRegisterToFalse = () => {
    dispatch(registerActions.setRegisterToFalse());
  };

  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    hidden: {
      translateY: "-100%",
      translateX: "-5%",
    },
    visible: {
      translateY: "40%",
      translateX: "-5%",
      transition: {
        ease: "easeInOut",
        duration: 0.4,
      },
    },
    exit: {
      translateY: "-100%",
      transition: {
        ease: "easeInOut",
        duration: 0.4,
      },
    },
  };
  const logout = () => {
    Cookie.set("userId", null);
    window.location.reload();
  };
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
        <div className="gap-6 hidden lg:flex">
          <Link
            onClick={() => dispatch(profileActions.setPage(1))}
            href={props.user.role === "admin" ? "/users/admin" : "/users/me"}
            className="text-white border-b transition-all duration-100 flex items-center justify-center"
          >
            My profile
          </Link>
          {props.user.role === "user" && (
            <Link
              onClick={() => dispatch(profileActions.setPage(4))}
              href="/users/me"
              className="text-white border-b transition-all duration-100 flex items-center justify-center"
            >
              My reservations
            </Link>
          )}
          {props.user.role === "user" && (
            <Link
              onClick={() => dispatch(profileActions.setPage(3))}
              href="/users/me"
              className="text-white border-b transition-all duration-100 flex items-center justify-center"
            >
              My wishlist
            </Link>
          )}
          {props.user.role === "admin" && (
            <Link
              onClick={() => dispatch(profileActions.setPage(6))}
              href="/users/admin"
              className="text-white border-b transition-all duration-100 flex items-center justify-center"
            >
              Admin Panel
            </Link>
          )}

          <button
            onClick={logout}
            className="text-white border-b transition-all duration-100 flex items-center justify-center"
          >
            Logout
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden ">
            <Image
              className="w-full"
              src={`${process.env.NEXT_PUBLIC_BACKEND_SHORT}/images/users/${props.user.image}`}
              width={100}
              height={100}
              alt=""
            ></Image>
          </div>
        </div>
      )}
      {props.user && (
        <>
          <div
            onClick={() => setIsOpen(true)}
            className="gap-6 flex lg:hidden cursor-pointer"
          >
            <MenuIcon className="text-white"></MenuIcon>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            {isOpen && (
              <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute lg:hidden  bg-black z-40 w-[105%]  flex  py-24 flex-col items-center justify-center gap-12"
              >
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
                <button
                  className="text-white"
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </nav>
  );
}

export default Navbar;
