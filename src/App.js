import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import CreateContainer from "./components/CreateContainer";
import { useStateValue } from "./context/StateProvider";
import { getAllProducts } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";

const App = () => {
  const [{ products }, dispatch] = useStateValue();
  // This allows you to access and update the products state value and dispatch actions to modify the state.

  const fetchData = async () => {
    await getAllProducts().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        products: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
