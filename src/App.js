import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryPage from "./components/CategoryPage";
import SideBar from "./components/SideBar";
import store from "./redux/store";
import { Provider } from "react-redux";
import productsData from "./data.json";
import Navigation from "./components/Navigation";

const navigation = [
  { navigationPath: "/category/electronics", name: "electronics" },
  { navigationPath: "/category/candies", name: "candies" },
  { navigationPath: "/category/clothing", name: "clothing" },
];

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    store.dispatch({ type: "SET_PRODUCTS", payload: productsData });
  }, []);

  return (
    <Provider store={store}>
      <button onClick={toggleSidebar}>
        {showSidebar ? "Скрыть" : "Показать"} удаленные элементы
      </button>
      <SideBar show={showSidebar} />
      <Router>
        {navigation.map(({ navigationPath, name }) => (
          <Navigation key={name} navigationPath={navigationPath} name={name} />
        ))}
        <Routes>
          <Route path="/category/:categoryName" element={<CategoryPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
