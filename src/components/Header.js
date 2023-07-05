import React, { useState,useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { MdAdd, MdLogout } from "react-icons/md";

import { Link } from "react-router-dom";
import User from "../product images/delivery pictures/userimg.png"

import { motion } from "framer-motion";

import { BsFillBasket2Fill } from "react-icons/bs";
import fashion from "../product images/delivery pictures/fashion1.png";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";


const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  //scroll to menu container(fashion finds)
  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight * 1.5,
      behavior: "smooth",
    });
  };

  //scroll to top of page
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  

  const login = async () => {
    if (user === null) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  
  

  return (
    <div className="fixed z-50 w-screen bg-slate-300 p-6 px-16 h-24">
      {/*Large Screen device */}
      <div className="hidden md:flex w-full h-full items-center justify-between ">
        <Link to={"/"} className="flex items-center gap-3">
          <img src={fashion} className="w-12 object-cover" alt="logo" />
          <p className="text-headingColor text-2xl font-bold ">Glamoré</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            // animation 1
            // initial={{ opacity: 0, scale: 0.6 }}
            // animate={{ opacity: 1, scale: 1 }}
            // exit={{ opacity: 0, scale: 0.6 }}

            //animation 2
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            
            <li  className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Home
            </li>
            
            
            <li
            className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
            onClick={scrollDown}
          >
            Menu
          </li>
            
          </motion.ul>

         

<div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <BsFillBasket2Fill className="text-textColor text-2xl  cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <motion.img
              src={user ? user.photoURL : User}
              className="w-11 min-w-[40px] h-11 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="avatar"
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.2 }}
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {user && user.email === "anandbhairavi59@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/*Small Screen device */}
      <div className="flex items-center justify-between md:hidden w-full h-full ">
        <div
          className="relative flex items-center justify-center"
          onClick={showCart}
        >
          <BsFillBasket2Fill className="text-textColor text-2xl  cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>

        <Link to={"/"} className="flex items-center gap-2">
          <img src={fashion} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold"> Foody</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : User}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            alt="userprofile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
            >
              {user && user.email === "anandbhairavi59@gmail.com" && (
                <Link to={"/createItem"}>
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col ">
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  Home
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  Menu
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  About Us
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  Service
                </li>
              </ul>

              <p
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Header;
