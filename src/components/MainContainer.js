import React from 'react'
import HomeContainer from './HomeContainer'
import {motion} from "framer-motion"
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import RowContainer from './RowContainer';
import MenuContainer from './MenuContainer';
import { useState } from 'react';
import { useStateValue } from '../context/StateProvider';
import CartContainer from './CartContainer';

const MainContainer = () => {
  const [{ products, cartShow }, dispatch] = useStateValue();

  const [scrollValue, setScrollValue] = useState(0);

  
  return (
     <div className="w-full h-auto flex flex-col items-center justify-center ">
    <HomeContainer />

    <section className="w-full my-6">
      <div className="w-full flex items-center justify-between">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-cyan-500 to-blue-600 transition-all ease-in-out duration-100">
          Our Exclusive Picks
        </p>

        <div className="hidden md:flex gap-3 items-center">
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-lg bg-blue-500 hover:bg-sky-400 cursor-pointer  hover:shadow-lg flex items-center justify-center"
            onClick={() => setScrollValue(-200)}
          >
            <AiFillCaretLeft className="text-lg text-white" />
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-lg  bg-blue-500 hover:bg-sky-400  cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
            onClick={() => setScrollValue(200)}
          >
            <AiFillCaretRight className="text-lg text-white" />
          </motion.div>
        </div>
      </div>
      <RowContainer
        scrollValue={scrollValue}
        flag={true}
        data={products?.filter((n) => n.category === "exclusivepicks")}
      />
    </section>

    <MenuContainer />

    {cartShow && <CartContainer />}
    
    
  </div>

    
  )
}

export default MainContainer