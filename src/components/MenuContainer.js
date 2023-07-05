import React, { useEffect, useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";

const MenuContainer = () => {
  const [filter, setFilter] = useState("watches");

  const [{ products }, dispatch] = useStateValue();

  return (
    <section className="w-full my-6" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr  from-cyan-500 to-blue-600 transition-all ease-in-out duration-100 mr-auto">
          Our Fashion Finds
        </p>

        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((category) => {
              if (category.urlParamName === "exclusivepicks") {
                return null; // Skip rendering this category
              }
              return (
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  key={category.id}
                  className={`group ${
                    filter === category.urlParamName ? "bg-blue-600" : "bg-card"
                  } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-blue-600 `}
                  onClick={() => setFilter(category.urlParamName)}
                >
                  <div
                    className={`w-10 h-10 rounded-full shadow-lg ${
                      filter === category.urlParamName
                        ? "bg-white"
                        : "bg-blue-600"
                    } group-hover:bg-white flex items-center justify-center`}
                  >
                    <BiShoppingBag
                      className={`${
                        filter === category.urlParamName
                          ? "text-textColor"
                          : "text-white"
                      } group-hover:text-textColor text-lg`}
                    />
                  </div>
                  <p
                    className={`text-sm ${
                      filter === category.urlParamName
                        ? "text-white"
                        : "text-textColor"
                    } group-hover:text-white`}
                  >
                    {category.name}
                  </p>
                </motion.div>
              );
            })}
        </div>

        <div className="w-full">
          <RowContainer
            flag={false}
            data={products?.filter((n) => n.category === filter)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
